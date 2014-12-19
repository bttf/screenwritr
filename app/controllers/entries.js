import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: 'index',
  sortProperties: ['modified'],
  sortAscending: false,

  actions: {
    deleteEntry: function(entry) {
      // delete entry from user.entries 
      this.get('store').find('user', this.get('session.uid')).then(function(user) {
        user.get('entries').removeObject(entry);
        user.save();
      });
    
      entry.deleteRecord();
      entry.save().then(function() {
      }, function(err) {
        // TODO propogate error to UI
        console.log('error deleting', err);
      });
    }
  }
});
