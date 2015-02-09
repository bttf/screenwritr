import Ember from 'ember';

var $ = Ember.$;

export default Ember.Component.extend({
  classNames: ['user-prompt'],

  toggleAnimation: function() {
    var userPrompt = $('.user-prompt');
    if (this.get('toggle')) {
      var left = (window.innerWidth - userPrompt.width()) / 2;
      userPrompt.show();
      userPrompt.animate({ 'left': left + 'px' }, 250);
    } else {
      userPrompt.animate({ 'left': '-500px' }, 250, function() {
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
