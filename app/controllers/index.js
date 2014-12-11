import Ember from 'ember';

export default Ember.ObjectController.extend({
  saveTimeout: false,
  listTimeouts: [],
  actions: {
    manualSave: function() {
      var _this = this;
      this.set('body', JSON.stringify(window.quillEditor.getContents()));
      this.get('model').save().then(function() {
        _this.set('lastSave', 'Saved, ' + moment().format('h:mm:ss a'));
      }, function(err) {
        _this.set('saveError', err);
      });

    },

    toggleSaveTimeout: function() {
      var saveFn = (function(_this) {
        return function() {
          _this.set('body', JSON.stringify(window.quillEditor.getContents()));
          _this.get('model').save().then(function() {
            _this.set('lastSave', 'Auto-save, ' + moment().format('h:mm:ss a'));
          }, function (err) {
            _this.set('saveError', err);
          });
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
