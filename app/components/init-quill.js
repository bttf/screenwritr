import Ember from 'ember';

export default Ember.Component.extend({
  initQuill: function() {
    window.quillEditor = new window.Quill('#editor');
    window.quillEditor.focus();
  }.on('didInsertElement')
});
