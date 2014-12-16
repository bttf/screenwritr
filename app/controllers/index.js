import Ember from 'ember';

export default Ember.ObjectController.extend({
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
    var body = JSON.stringify(window.quillEditor.getContents()),
      title = this.generateTitle(body);
    
    _this.set('body', body);
    _this.set('title', title);

    if (Ember.isEmpty(_this.get('created'))) {
      _this.set('created', new Date());
      _this.set('modified', new Date());
    } else {
      _this.set('modified', new Date());
    }

    _this.get('store').find('user', _this.get('session.uid')).then(function(user) {
      _this.set('user', user);

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
    }
  }
});
