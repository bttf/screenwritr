import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['save-prompt'],

  actions: {
    saveScriptThenTransition: function() {
      this.sendAction('saveScriptThenTransition', this.get('transitionRoute'));
      this.sendAction('toggleSavePrompt');
    },

    justTransition: function() {
      this.sendAction('toggleSavePrompt');
      this.sendAction('transition', this.get('transitionRoute'));
    },
    
    cancel: function() {
      this.sendAction('toggleSavePrompt');
    }
  }
});
