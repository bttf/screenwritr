import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: 'index',
  sortProperties: ['modified'],
  sortAscending: false,

  actions: {
    deleteEntry: function(entry) {
      var _this = this;

      // delete entry from user.entries 
      this.get('store').find('user', this.get('session.uid')).then(function(user) {
        user.get('entries').removeObject(entry);
        user.save();
      });

      // reset entry
      this.set('controllers.index.entry', this.get('store').createRecord('entry'));
      window.quillEditor.deleteText(0, window.quillEditor.getLength());

      entry.deleteRecord();
      entry.save().then(function() {
      }, function(err) {
        console.log('error deleting', err);
        _this.set('controllers.index.saveError', 'Delete error: ' + err);
      });
    }
  }
});
