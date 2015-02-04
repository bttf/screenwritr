import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['menu-bar'],

  initStuff: function() {
    Ember.$('[data-toggle="tooltip"]').tooltip();
  }.on('didInsertElement'),

  actions: {
    newScript: function() {
      this.sendAction('saveAndTransition', this.get('script'), 'script.new');
    },

    logout: function() {
      this.sendAction('logout');
    },
    toggleHelpPanel: function() {
      this.sendAction('help');
    }
  }

});
