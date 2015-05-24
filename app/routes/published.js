import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('script', params.id);
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    if (Ember.isEmpty(model.get('body'))) {
      controller.set('isScriptEmpty', true);
    }
  }
});
