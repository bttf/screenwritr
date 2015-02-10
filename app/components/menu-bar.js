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
  if (e.target.value === 'fit-page') {
    var width = $('.script-stage').width() - 32;
    var ratio = width / parseInt($('.title-page').css('width'));
    var height = parseInt($('.title-page').css('height')) * ratio;
    var fontSize = parseInt($('.title-page').css('font-size')) * ratio;
    $('.title-page').css('width', width + 'px');
    $('.title-page').css('height', height + 'px');
    $('.title-page').css('font-size', fontSize + 'px');
  } else {
    var width = 8.5 * e.target.value;
    var height = 11 * e.target.value;
    var fontSize = 12 * e.target.value;
    $('.title-page').css('width', width + 'in');
    $('.title-page').css('height', height + 'in');
    $('.title-page').css('font-size', fontSize + 'px');
  }
}
