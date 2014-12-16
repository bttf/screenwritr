import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    sessionAuthenticationSucceeded: function() {
      var _this = this;
      this.get('store').find('user', this.get('session.uid')).then(function(user) {
        _this.controllerFor('index').set('model.entries', user.get('entries'));
      });
    }
  }
});
