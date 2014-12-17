import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['selected'],
  selected: false,

  click: function() {
    this.sendAction('action', this.get('entry'));
  },

  actions: {
    toggleSelect: function() {
      this.set('selected', !this.get('selected'));
    }
  }
});
