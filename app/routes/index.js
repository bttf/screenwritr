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
        Ember.set(model, 'friends', user.get('friends'));
        Ember.set(model, 'entries', user.get('entries'));
      });

      //debug
      // this.get('store').find('user', { 
      //   orderBy: 'email', 
      //   equalTo: 'a@gmail.com'
      // }).then(function(user) {
      //   console.log('debug model, user fullname', user.get('fullName'));
      //   Ember.set(model, 'debug', user);
      // });
    }
  }
});
