import Ember from 'ember';

export default Ember.Component.extend({
  keyUp: function() {
    if (this.get('isAuthenticated')) {
      console.log('debug, auto-saving');
      this.sendAction('autoSaveAction', true);
    }
  },
  
  actions: {
    manualSave: function() {
      this.sendAction('manualSaveAction');
    }
  }
});
