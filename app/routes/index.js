import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.get('store').createRecord('entry');
  },

  afterModel: function(model) {
    if (this.get('session.isAuthenticated')) {
      this.get('store').find('user', this.get('session.uid')).then(function(user) {
        Ember.set(model, 'entries', user.get('entries'));
      });
    }
  }
});
