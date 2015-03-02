import Ember from 'ember';

var $ = Ember.$,
    helpPanelClassName = 'help-panel';

export default Ember.Component.extend({
  classNames: [helpPanelClassName],

  initStuff: function() {
    var helpPanel = $('.' + helpPanelClassName);

    helpPanel.css('height', window.innerHeight);

    $(window).resize(function() {
      helpPanel.css('height', window.innerHeight);
    });

    if (this.get('hideHelpPanel')) {
      var width = helpPanel.width() + 200;
      helpPanel.css('right', '-' + width + 'px');
      helpPanel.hide();
    } 

    // toggle on onload
    if (this.get('showHelpOnStartup')) {
      this.sendAction('toggleHelpPanel');
    }
  }.on('didInsertElement'),

  actions: {
    closePanel: function() {
      this.sendAction('toggleHelpPanel');
    }
  }
});
