import Ember from 'ember';

var $ = Ember.$;

export default Ember.Component.extend({
  classNames: ['menu-bar'],
  showShareMenu: false,

  initialize: function() {
    $('.selectpicker').selectpicker();
    $('.font-size-select').change(handleFontSizeChange);
    $('.page-width-select').change(handlePageWidthChange);
  }.on('didInsertElement'),

  actions: {
    toggleShareMenu: function() {
      if (!Ember.isEmpty(this.get('script'))) { 
        this.toggleProperty('showShareMenu');
      } else {
        this.set('showShareMenu', false);
      }
    },

    toggleAboutDialog: function() {
      this.sendAction('toggleAboutDialog');
    },

    newScript: function() {
      if (this.get('script.isDirty')) {
        this.sendAction('toggleSavePromptThenTransition', 'script.new');
      } else {
        this.sendAction('transition', 'script.new');
      }
    },

    openScript: function() {
      if (this.get('script.isDirty')) {
        this.sendAction('toggleSavePromptThenTransition', 'open');
      } else {
        this.sendAction('transition', 'open');
      }
    },

    saveScript: function() {
      if (!Ember.isEmpty(this.get('script'))) {
        this.sendAction('saveScript');
      }
    },

    toggleAutoSave: function() {
      this.sendAction('toggleAutoSave');
    },
    
    toggleScriptUnlisted: function() {
      this.sendAction('toggleScriptUnlisted');
    },

    logout: function() {
      this.sendAction('logout');
    },

    toggleHelpPanel: function() {
      this.sendAction('help');
    }
  }
});

function handleFontSizeChange(e) {
  $('.editor textarea').css('font-size', e.target.value);
}

function handlePageWidthChange(e) {
  var fontSize = 16 * e.target.value;
  $('.title-page').css('font-size', fontSize + 'px');
  $('.script-page').css('font-size', fontSize + 'px');
}
