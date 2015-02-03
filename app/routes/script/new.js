import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('script', {
      body: 'Script goes here'
    });
  },

  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('controllers.application.script', model);
  }
});
