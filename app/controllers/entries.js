import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['modified'],
  sortAscending: false,

  actions: {
    deleteEntry: function(entry) {
      console.log('we be deletin out in de entries controlla');
      entry.deleteRecord();
    }
  }
});
