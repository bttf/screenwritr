import Ember from 'ember';

var $ = Ember.$,
  saveFileClassName = 'save-file';

export default Ember.Component.extend({
  classNames: [saveFileClassName],

  initStuff: function() {
  }.on('didInsertElement'),

  actions: {
    saveThenTransition: function() {
      var _this = this;
      this.get('script').save().then(function() {
        var prettyTime = window.moment(new Date()).format('HH:mm - MM/DD/YYYY');
        _this.set('error', '');
        _this.set('saved', 'Saved successfully @ ' + prettyTime + '.');
        _this.sendAction('toggleSaveFile');
        _this.sendAction('transition', _this.get('transitionRoute'));
      }, function(err) {
        _this.set('saved', '');
        _this.set('error', err);
      });
    },

    justTransition: function() {
      this.sendAction('toggleSaveFile');
      this.sendAction('transition', this.get('transitionRoute'));
    },
    
    cancel: function() {
      this.sendAction('toggleSaveFile');
    }
  }
});
