import Ember from 'ember';
import ENV from 'screenwritr/config/environment';

export default Ember.ObjectController.extend({
  loginError: false,

  // auto-save timeouts
  saveTimeout: false,
  listTimeouts: [],

  generateTitle: function(body) {
    var title = [];
    var strBody = JSON.parse(body).ops[0].insert.split(' ');
    for (var i = 0; i < 3 && i < strBody.length; i++) {
      title.push(strBody[i].replace('\n', ''));
    }
    title.push('...');
    return title.join(' ');
  },

  saveEntry: function(_this) {
    var body = JSON.stringify(window.quillEditor.getContents());
    var title = this.generateTitle(body);

    _this.set('model.body', body);
    _this.set('model.title', title);

    if (Ember.isEmpty(_this.get('created'))) {
      _this.set('model.created', new Date());
      _this.set('model.modified', new Date());
    } else {
      _this.set('model.modified', new Date());
    }

    _this.get('store').find('user', _this.get('session.uid')).then(function(user) {
      _this.set('model.user', user);

      _this.get('model').save().then(function(entry) {
        user.get('entries').pushObject(entry);
        user.save();
        _this.set('lastSave', 'Saved, ' + moment().format('h:mm:ss a'));
      }, function(err) {
        _this.set('saveError', err);
      });
    });
  },

  actions: {
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
      var email = $('#email').val();
      var pass = $('#password').val();

      if (!Ember.isEmpty(email) && !Ember.isEmpty(pass)) {
        // toggle off error state if exists
        if (this.get('loginError')) this.set('loginError', false);

        // if user exists, log in, otherwise create user 
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
      });

    }
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
