import Ember from 'ember';

var $ = Ember.$;

export default Ember.Component.extend({
  classNames: ['menu-bar'],

  initialize: function() {
    $('.selectpicker').selectpicker();
    $('.font-size-select').change(handleFontSizeChange);
    $('.page-width-select').change(handlePageWidthChange);
  }.on('didInsertElement'),

  actions: {
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
  var width = 8.5 * e.target.value;
  var height = 11 * e.target.value;
  var fontSize = 12 * e.target.value;
  $('.title-page').css('width', width + 'in');
  $('.title-page').css('height', height + 'in');
  $('.title-page').css('font-size', fontSize + 'px');
}
