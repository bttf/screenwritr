import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    return Ember.RSVP.hash({
      entry: this.get('store').createRecord('entry')
    });
  },

  afterModel: function(model) {
    if (this.get('session.isAuthenticated')) {
      this.get('store').find('user', this.get('session.authData.uid')).then(function(user) {
        Ember.set(model, 'user', user);
        Ember.set(model, 'entries', user.get('entries'));
      });
    }
  }
});
