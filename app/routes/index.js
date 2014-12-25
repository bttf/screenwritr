import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      entry: this.get('store').createRecord('entry', {
        body: 'testing'
      })
    });
  },

  afterModel: function(model) {
    if (this.get('session.isAuthenticated')) {
      this.get('store').find('user', this.get('session.uid')).then(function(user) {
        Ember.set(model, 'user', user);
        Ember.set(model, 'entries', user.get('entries'));
      });
    }
  }
});
