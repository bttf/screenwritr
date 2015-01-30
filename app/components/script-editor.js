import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['script-editor'],
  editMode: true,
  actions: {
    toggleEditMode: function() {
      this.set('editMode', !this.get('editMode'));
    }
  }

  // keyUp: function() {
  //   if (this.get('isAuthenticated')) {
  //     console.log('debug, auto-saving');
  //     this.sendAction('autoSaveAction', true);
  //   }
  // },
  // 
  // actions: {
  //   manualSave: function() {
  //     this.sendAction('manualSaveAction');
  //   }
  // }
});
