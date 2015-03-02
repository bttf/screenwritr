import Ember from 'ember';

var $ = Ember.$;

export default Ember.Component.extend({
  shareUrl: function() {
    return ['http://', window.location.host, '/published/', this.get('script.id')].join('');
  }.property('script.id'),

  initialize: function() {
    $('.menu-bar .share-menu input').click(function() {
      this.select();
    });

    var _this = this;
    $(document).mouseup(function(e) {
      var shareMenu = $('.menu-bar .share-menu');
      if (!shareMenu.is(e.target) &&
          shareMenu.has(e.target).length === 0) {
        _this.set('showShareMenu', false);
      }
    });
  }.on('didInsertElement'),

  handleShareMenu: function() {
    var shareMenu = $('.menu-bar .share-menu');
    if (this.get('showShareMenu')) {
      var shareLink = $('.menu-bar .share-link');
      var top = shareLink.offset().top + shareLink.height() + 4;
      var left = shareLink.offset().left;
      shareMenu.css({
        'top': top,
        'left': left
      });
      shareMenu.fadeIn({
        duration: 100
      });
    } else {
      shareMenu.fadeOut({
        duration: 100
      });
    }
  }.on('didInsertElement').observes('showShareMenu'),

  reattachEvents: function() {
    $('.menu-bar .share-menu input').click(function() {
      this.select();
    });
  }.observes('script.isNew'),

  actions: {
    toggleScriptUnlisted: function() {
      this.sendAction('toggleScriptUnlisted');
    },

    toggleShareMenu: function() {
      this.sendAction('toggleShareMenu');
    }
  }
});
