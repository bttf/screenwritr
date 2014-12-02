import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    loginFb: function() {
      window.location.href = 'https://www.facebook.com/dialog/oauth?client_id=996369437044844&redirect_uri=http://chewbonga.com'; 
    },

    save: function() {
      //console.log('body: %s', this.get('body'));
      //console.log('title: %s', this.get('title'));

      this.store.createRecord('entry', {
        body: this.get('body'),
        title: 'a_title'
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
