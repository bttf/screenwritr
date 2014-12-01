import Ember from 'ember';

export default Ember.Component.extend({
  initQuill: function() {
    var editor = new Quill('#editor');
  }.on('didInsertElement')
});
