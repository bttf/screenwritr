import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row', 'friend-result'],
  classNameBindings: ['selected'],
  selected: false,
  mouseEnter: function() {
    this.set('selected', true);
  },
  mouseLeave: function() {
    this.set('selected', false);
  }
});
