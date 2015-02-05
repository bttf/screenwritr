import Ember from 'ember';

export default Ember.Component.extend({
  initTooltips: function() {
    Ember.$('[data-toggle="tooltip"]').tooltip();
  }.on('didInsertElement')
});
