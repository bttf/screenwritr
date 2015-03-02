import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['save-prompt'],

  actions: {
    saveScriptThenTransition: function() {
      this.sendAction('saveScriptThenTransition', this.get('transitionRoute'));
      this.sendAction('toggleSavePrompt');
    },

    justTransition: function() {
      // if script.new to script.new
      if (this.get('currentRouteName') === this.get('transitionRoute')) {     
        this.sendAction('resetScript');
      }
      this.sendAction('toggleSavePrompt');
      this.sendAction('transition', this.get('transitionRoute'));
    },
    
    cancel: function() {
      this.sendAction('toggleSavePrompt');
    }
  }
});
