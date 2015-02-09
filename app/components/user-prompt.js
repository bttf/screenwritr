import Ember from 'ember';

var $ = Ember.$;

export default Ember.Component.extend({
  classNames: ['user-prompt'],

  toggleAnimation: function() {
    var userPrompt = $('.user-prompt');
    var speed = 100;
    if (this.get('toggle')) {
      var left = (window.innerWidth - userPrompt.width()) / 2;
      userPrompt.show();
      userPrompt.animate({ 'left': left + 'px' }, speed);
    } else {
      userPrompt.animate({ 'left': '-500px' }, speed, function() {
        userPrompt.hide();
      });
    }
  }.observes('toggle'),

  actions: {
    confirm: function() {
      this.sendAction('confirm');
    },
    
    deny: function() {
      this.sendAction('deny');
    }
  }
});
