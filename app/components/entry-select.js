import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['entry-select'],
  classNameBindings: ['selected'],

  click: function() {
    this.sendAction('action', this.get('entry'));
  },
});
