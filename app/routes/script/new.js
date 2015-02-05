import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var _this = this;
    return this.store.find('user', this.get('session.authData.uid')).then(function(user) {
      return _this.store.createRecord('script', {
        body: 'Script here',
        uid: user
      });
    });
  },

  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('controllers.application.script', model);
  }
});
