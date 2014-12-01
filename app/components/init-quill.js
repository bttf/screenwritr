import Ember from 'ember';

export default Ember.Component.extend({
  initQuill: function() {
    (new window.Quill('#editor'));
  }.on('didInsertElement')
});
