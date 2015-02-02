import Ember from 'ember';

var $ = Ember.$;

export default Ember.Controller.extend({
  hideHelpPanel: true,
  actions: {
    logout: function() {
      var controller = this;
      var authenticator = this.get('session.authenticator');
      this.get('session').invalidate(authenticator).then(function() {
        controller.transitionToRoute('login');
      });
    },

    toggleHelpPanel: function() {
      this.set('hideHelpPanel', !this.get('hideHelpPanel'));

      if (!this.get('hideHelpPanel')) {
        $('.help-panel').show();
        $('.help-panel').animate({ 'right': '0px' }, 250);
      } else {
        var panelWidth = $('.help-panel').width() + 200;
        $('.help-panel').animate({
          'right': '-' + panelWidth + 'px'
        }, 250, function() {
          $('.help-panel').hide();
        });
      }
    }
  }
});
