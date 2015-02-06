import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    clearScript: function() {
      this.set('controller.script', undefined);
    },

    sessionAuthenticationSucceeded: function() {
      this.refresh();
    }
  }
});
