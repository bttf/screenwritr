import Ember from 'ember';

export default Ember.ArrayController.extend({
  selectedScript: '',
  showDeletePrompt: false,

  deleteScriptPromptMsg: function() {
    return 'Are you sure you want to delete \'' + this.get('selectedScript.title') + '\'?';
  }.property('selectedScript'),

  actions: {
    selectScript: function(script) {
      this.set('selectedScript', script);
    },

    openScript: function() {
      if (!Ember.isEmpty('selectedScript')) {
        this.transitionToRoute('script.edit', this.get('selectedScript'));
      }
    },

    toggleDeletePrompt: function(script) {
      this.send('selectScript', script);
      this.toggleProperty('showDeletePrompt');
    },

    deleteScript: function() {
      if (!Ember.isEmpty(this.get('selectedScript'))) {
        var _this = this;
        var script = this.get('selectedScript');
        script.get('uid').then(function(user) {
          user.get('scripts').removeObject(script);
          user.save().then(function() {
            script.destroyRecord();
            _this.send('refresh');
          });
        });
      }
      this.set('showDeletePrompt', false);
    }
  }
});
