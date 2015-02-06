import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['menu-bar'],

  actions: {
    newScript: function() {
      if (this.get('script.isDirty')) {
        this.sendAction('toggleSavePromptThenTransition', 'script.new');
      } else {
        this.sendAction('transition', 'script.new');
      }
    },

    openScript: function() {
      if (this.get('script.isDirty')) {
        this.sendAction('toggleSavePromptThenTransition', 'open');
      } else {
        this.sendAction('transition', 'open');
      }
    },

    saveScript: function() {
      if (!Ember.isEmpty(this.get('script'))) {
        this.sendAction('saveScript');
      }
    },

    toggleAutoSave: function() {
      this.sendAction('toggleAutoSave');
    },

    logout: function() {
      this.sendAction('logout');
    },

    toggleHelpPanel: function() {
      this.sendAction('help');
    }
  }
});
