import Ember from 'ember';

var $ = Ember.$;

export default Ember.Component.extend({
  classNames: ['about-screenwritr'],

  toggleEffects: function() {
    var speed = 200;
    var aboutDialog = $('.about-screenwritr');
    if (this.get('hideAboutDialog')) {
      aboutDialog.animate({ 'right': '-50%' }, speed, function() {
        aboutDialog.hide();
      });
    } else {
      var right = (window.innerWidth - aboutDialog.width()) / 2;
      aboutDialog.show();
      aboutDialog.animate({ 'right': right + 'px' }, speed);
    }
  }.observes('hideAboutDialog'),

  actions: {
    toggleAboutDialog: function() {
      this.sendAction('toggleAboutDialog');
    }
  }
});
