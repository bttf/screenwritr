import Ember from 'ember';

export default Ember.Controller.extend({
  firstName: function() {
    return this.get('session.user.firstName');
  }.property()
});
