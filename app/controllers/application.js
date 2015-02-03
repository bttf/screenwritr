import Ember from 'ember';

var $ = Ember.$;

export default Ember.Controller.extend({
  hideHelpPanel: true,
  hideSaveFile: true,
  saveFileRoute: '',
  saved: '',
  error: '',
  actions: {
    transition: function(route) {
      console.log('debug: transitioning to ' + route);
      this.transitionToRoute(route);
    },

    toggleSaveFile: function(script, route) {
      this.set('hideSaveFile', !this.get('hideSaveFile'));
      var savePrompt = $('.save-prompt');
      if (!this.get('hideSaveFile')) {
        var left = (window.innerWidth - savePrompt.width()) / 2;
        savePrompt.show();
        savePrompt.animate({ 'left': left + 'px' }, 250);
        
        if (!Ember.isEmpty(route)) {
          this.set('saveFileRoute', route);
        }
      } else {
        this.set('saveFileRoute', '');
        savePrompt.animate({ 'left': '-500px' }, 250, function() {
          savePrompt.hide();
        });
      }
    },

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
