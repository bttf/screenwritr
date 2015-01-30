import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['menu-bar'],
  init: function() {
    Ember.$('[data-toggle="tooltip"]').tooltip()
  }.on('didInsertElement')
});
