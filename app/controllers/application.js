import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    logout: function() {
      var controller = this;
      var authenticator = this.get('session.authenticator');
      this.get('session').invalidate(authenticator).then(function() {
        controller.transitionToRoute('login');
      });
    }
  }
});
