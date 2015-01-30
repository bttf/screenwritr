import Ember from 'ember';

export default Ember.Controller.extend({
  helpPanel: false,
  actions: {
    logout: function() {
      var controller = this;
      var authenticator = this.get('session.authenticator');
      this.get('session').invalidate(authenticator).then(function() {
        controller.transitionToRoute('login');
      });
    },
    toggleHelpPanel: function() {
      this.set('helpPanel', !this.get('helpPanel'));
    }
  }
});
