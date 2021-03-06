import Ember from 'ember';

export default Ember.ObjectController.extend({
  loginError     : false,
  entry          : Ember.computed.alias('model.entry'),
  entries        : Ember.computed.alias('model.entries'),
  viewingScripts : true,
  saveTimeout    : false,
  listTimeouts   : [],

  actions: {

    newEntry: function() {
      this.set('entry', this.get('store').createRecord('entry'));
      window.quillEditor.deleteText(0, window.quillEditor.getLength());
    },

    viewScripts: function() {
      this.set('viewingScripts', true);
    },

    viewFriends: function() {
      this.set('viewingScripts', false);
    },

    selectEntry: function(entry) {
     this.set('entry', entry); 
     for (var i = 0; i < this.get('entries.length'); i++) {
       if (this.get('entries').objectAt(i) !== entry) {
         this.get('entries').objectAt(i).set('selected', false);
       } else {
         this.get('entries').objectAt(i).set('selected', true);
       }
     }
     window.quillEditor.setContents(JSON.parse(this.get('entry.body'))); //TODO: get rid of this workaround
    },
    
    manualSave: function() {
      this.saveEntry(this);
    },

    toggleSaveTimeout: function() {
      var saveFn = (function(_this) {
        return function() {
          _this.saveEntry(_this);
        };
      })(this);
      // pop existing timeouts
      if (this.get('listTimeouts').length > 0) {
        for (var i = 0; i < this.get('listTimeouts').length; i++) {
          var t = this.get('listTimeouts').pop();
          window.clearTimeout(t);
        }
      }
      // setTimeout, push to list of timeouts
      this.set('timeoutId', window.setTimeout(saveFn, 2000));
      this.get('listTimeouts').push(this.get('timeoutId'));
      return;
    }, 

    login: function() {
      var email = Ember.$('#email').val();
      var pass = Ember.$('#password').val();

      if (!Ember.isEmpty(email) && !Ember.isEmpty(pass)) {
        // toggle off error state if exists
        if (this.get('loginError')) {
          this.set('loginError', false);
        }

        // if user exists, authenticate, otherwise create user 
        var _this = this;
        userExists(this, email).then(function(user) {
          _this.get('session').authenticate('authenticator:firebase', {
            user: user,
            password: pass
          }).then(function() {
            console.log('authentication successful');
          }, function(err) {
            _this.set('loginError', err);
          });
        }, 

        function() {
          var newUser = _this.get('store').createRecord('user', {
            email: email,
            password: pass
          });
          _this.transitionToRoute('createUser', newUser);
        });
      } 
      else {
        this.set('loginError', 'Please fill in all fields');
      }
    },

    logout: function() {
      var _this = this;
      this.get('session').invalidate('authenticator:firebase').then(function() {
        console.log('authentication invalidated');
        _this.transitionToRoute('index');
      }, function(err) {
        console.log('I\'m afraid I can\'t do that');
        console.log(err);
      });

    }
  },

  generateTitle: function(body) {
    var title = [];
    var strBody = JSON.parse(body).ops[0].insert.split(' ');
    for (var i = 0; i < 5 && i < strBody.length; i++) {
      title.push(strBody[i].replace('\n', ' '));
    }
    return title.join(' ') + '...';
  },

  saveEntry: function(_this) {
    var body = JSON.stringify(window.quillEditor.getContents());
    var title = Ember.isEmpty(this.get('entry.title')) ? this.generateTitle(body) : this.get('entry.title');

    _this.set('entry.body', body);
    _this.set('entry.title', title);

    if (Ember.isEmpty(_this.get('created'))) {
      _this.set('entry.created', new Date());
      _this.set('entry.modified', new Date());
    } else {
      _this.set('entry.modified', new Date());
    }

    _this.get('store').find('user', _this.get('session.uid')).then(function(user) {
      _this.set('entry.user', user);

      _this.get('entry').save().then(function(entry) {
        user.get('entries').pushObject(entry);
        user.save();
        _this.set('lastSave', 'Saved, ' + window.moment().format('h:mm:ss a'));
      }, function(err) {
        _this.set('saveError', err);
      });
    });
  }
});

function userExists(_this, email) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    _this.get('store').find('user').then(function(users) {
      var user = users.filter(function(user) {
        return user.get('email').toLowerCase() === email.toLowerCase();
      });
      if (user.length > 0) {
        resolve(user.objectAt(0));
      } else {
        reject('No users found');
      }
    });
  });
}
