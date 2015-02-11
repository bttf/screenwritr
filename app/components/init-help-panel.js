import Ember from 'ember';

export default Ember.Component.extend({
  initialize: function() {
    this.sendAction('toggleHelpPanel');
  }.on('didInsertElement')
});
