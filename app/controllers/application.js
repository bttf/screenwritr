import Ember from 'ember';

var $ = Ember.$;

export default Ember.Controller.extend({
  hideHelpPanel: true,
  hideSavePrompt: true,
  afterSaveTransitionToRoute: '',
  saved: '',
  error: '',

  actions: {
    saveScript: function() {
      this.send('saveScriptThenTransition', null);
    },

    saveScriptThenTransition: function(route) {
      if (this.get('script')) {
        var _this = this;
        this.get('script').save().then(function() {
          var prettyDate = window.moment(new Date()).format('HH:mm, MM/DD/YYYY');
          _this.set('saved', 'Saved successfully @ ' + prettyDate);
          if (!Ember.isEmpty(route)) {
            _this.send('transition', route);
          }
        }, function(err) {
          _this.set('error', err);
        });
      }
    },

    transition: function(route) {
      console.log('debug: transitioning to ' + route);
      this.transitionToRoute(route);
    },

    toggleSavePrompt: function() {
      this.send('toggleSavePromptThenTransition', null);
    },

    toggleSavePromptThenTransition: function(route) {
      this.toggleProperty('hideSavePrompt');
      var savePrompt = $('.save-prompt');

      if (!this.get('hideSavePrompt')) {
        var left = (window.innerWidth - savePrompt.width()) / 2;
        savePrompt.show();
        savePrompt.animate({ 'left': left + 'px' }, 250);
        if (!Ember.isEmpty(route)) {
          this.set('afterSaveTransitionToRoute', route);
        }
      } else {
        this.set('afterSaveTransitionToRoute', '');
        savePrompt.animate({ 'left': '-500px' }, 250, function() {
          savePrompt.hide();
        });
      }
    },

    toggleHelpPanel: function() {
      this.toggleProperty('hideHelpPanel');

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
    },

    logout: function() {
      var controller = this;
      var authenticator = this.get('session.authenticator');

      this.get('session').invalidate(authenticator).then(function() {
        controller.transitionToRoute('login');
      });
    }
  }
});
