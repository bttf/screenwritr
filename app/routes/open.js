import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    return this.store.find('user', this.get('session.authData.uid')).then(function(user) {
      return user.get('scripts').filter(function(item) {
        return !item.get('isNew');
      });
    });
  },

  setupController(controller, model) {
    controller.set('model', model);
    controller.send('clearScript');
  }
});
