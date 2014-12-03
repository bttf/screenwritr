import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    loginFb: function() {
      this.get('session').authenticate('authenticator:fb', {});
    },

    logout: function() {
      this.get('session').invalidate('authenticator:fb');
    },

    debugLoginStatus: function() {
      FB.getLoginStatus(function(res) {
        console.dir(res);
      });
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
