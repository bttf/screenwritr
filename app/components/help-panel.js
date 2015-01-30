import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['help-panel'],
  autoSize: function() {
    Ember.$('.help-panel').css('height', window.innerHeight);
  }.on('didInsertElement'),

  actions: {
    closePanel: function() {
      this.sendAction('toggleHelpPanel');
    }
  }
});
