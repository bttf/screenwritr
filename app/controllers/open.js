import Ember from 'ember';

export default Ember.ArrayController.extend({
  selectedScript: '',

  actions: {
    selectScript: function(script) {
      this.set('selectedScript', script);
    },

    openScript: function() {
      if (!Ember.isEmpty('selectedScript')) {
        this.transitionToRoute('script.edit', this.get('selectedScript'));
      }
    }
  }
});
