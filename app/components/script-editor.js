import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['script-editor'],
  editMode: true,
  initialize: function() {
    var sizeRatio = 0.66;

    Ember.$('.editor').height(sizeRatio * window.innerHeight);

    Ember.$(window).resize(function() {
      Ember.$('.editor').height(sizeRatio * window.innerHeight);
    });

    // unsure about quill editor atm
    //
    // window.quillEditor = new window.Quill('.editor');
    // window.quillEditor.focus();
  }.on('didInsertElement'),

  actions: {
    toggleEditMode: function() {
      this.set('editMode', !this.get('editMode'));
    }
  },

  keyUp: function() {
    // this.set('script.body', JSON.stringify(window.quillEditor.getContents()));
  },
  // 
  // actions: {
  //   manualSave: function() {
  //     this.sendAction('manualSaveAction');
  //   }
  // }
});
