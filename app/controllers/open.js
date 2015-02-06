import Ember from 'ember';

export default Ember.ArrayController.extend({
  selectedScript: '',

  actions: {
    selectScript: function(script) {
      this.set('selectedScript', script);
    }
  }
});
