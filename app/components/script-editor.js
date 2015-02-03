import Ember from 'ember';

var $ = Ember.$;

export default Ember.Component.extend({
  classNames: ['script-editor'],
  editMode: true,

  initialize: function() {
    // auto-size editor to innerHeight
    var sizeRatio = 0.75;
    $('.editor').height(sizeRatio * window.innerHeight);
    $(window).resize(function() {
      $('.editor').height(sizeRatio * window.innerHeight);
    });

    // capture tabs to indent
    $('#scriptInput').keydown(function(e) {
      if (e.keyCode == 9) {
        e.preventDefault();
        var s = this.selectionStart;
        this.value = this.value.substring(0, s) + '\t' + this.value.substring(this.selectionEnd);
        this.selectionEnd = s + 1;
      }
    });
  }.on('didInsertElement'),

  actions: {
    toggleEditMode: function() {
      this.set('editMode', !this.get('editMode'));
    }
  }
});
