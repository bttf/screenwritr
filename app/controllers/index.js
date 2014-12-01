import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      //console.log('body: %s', this.get('body'));
      //console.log('title: %s', this.get('title'));

      this.store.createRecord('entry', {
        body: this.get('body'),
        title: this.get('title')
      }).save().then(function(res) {
        console.log('good');
        console.dir(res);
      }, function(err) {
        console.log('not good');
        console.log(err);
      });
    }
  }

});
