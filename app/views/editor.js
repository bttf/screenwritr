import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'editor',

  // auto-save feature
  keyUp: function(evt) {
    this.get('controller').send('toggleSaveTimeout', true);
  }
});
