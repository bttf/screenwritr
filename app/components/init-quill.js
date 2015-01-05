import Ember from 'ember';

export default Ember.Component.extend({
  initQuill: function() {
    var sizeRatio = 0.66;

    Ember.$('#editor').height(sizeRatio * window.innerHeight);

    $(window).resize(function() {
      Ember.$('#editor').height(sizeRatio * window.innerHeight);
    });

    window.quillEditor = new window.Quill('#editor');
    window.quillEditor.focus();

  }.on('didInsertElement')
});
