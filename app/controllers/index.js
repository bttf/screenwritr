import Ember from 'ember';

export default Ember.ObjectController.extend({
  saveTimeout: false,
  listTimeouts: [],
  actions: {
    toggleSaveTimeout: function() {
      // fn for timeout
      var saveFn = (function(_this) {
        return function() {
          _this.set('body', JSON.stringify(window.quillEditor.getContents()));
          _this.get('model').save().then(function() {
            _this.set('lastSave', 'Saved, right now.');
          }, function (err) {
            _this.set('saveError', 'You fucked it up.');
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
