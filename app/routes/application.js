import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    clearScript: function() {
      if (this.get('controller.script.isNew')) {
        this.get('controller.script').deleteRecord();
      }
      this.set('controller.script', '');
    },

    sessionAuthenticationSucceeded: function() {
      this.refresh();
    }
  }
});
