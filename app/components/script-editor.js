import Ember from 'ember';

var $ = Ember.$;

export default Ember.Component.extend({
  classNames: ['script-editor'],
  editMode: true,
  initialize: function() {
    var sizeRatio = 0.75;
    $('.editor').height(sizeRatio * window.innerHeight);
    $(window).resize(function() {
      $('.editor').height(sizeRatio * window.innerHeight);
    });
  }.on('didInsertElement'),

  actions: {
    toggleEditMode: function() {
      this.set('editMode', !this.get('editMode'));
    }
  }
});
