import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['modified'],
  sortAscending: false
});
