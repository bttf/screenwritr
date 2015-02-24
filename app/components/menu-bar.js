import Ember from 'ember';

var $ = Ember.$;

export default Ember.Component.extend({
  classNames: ['menu-bar'],
  showShareMenu: false,

  initialize: function() {
    $('.selectpicker').selectpicker();
    $('.font-size-select').change(handleFontSizeChange);
    $('.page-width-select').change(handlePageWidthChange);
    $('.menu-bar .share-menu input').click(function() {
      this.select();
    });
  }.on('didInsertElement'),

  handleShareMenu: function() {
    var shareMenu = $('.menu-bar .share-menu');
    if (this.get('showShareMenu')) {
      var shareLink = $('.menu-bar .share-link');
      var top = shareLink.offset().top + shareLink.height() + 4;
      var left = shareLink.offset().left;
      console.log('top is ', top);
      shareMenu.css({
        'top': top,
        'left': left
      });
      shareMenu.show();
    } else {
      // hide share menu
      shareMenu.hide();
    }
  }.observes('showShareMenu'),

  actions: {
    toggleShareMenu: function() {
      this.toggleProperty('showShareMenu');
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
