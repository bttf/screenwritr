import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    loginFb: function() {
      //window.location.href = 'https://www.facebook.com/dialog/oauth?client_id=996369437044844&redirect_uri=http://chewbonga.com'; 
      var _this = this;
      this.get('session').authenticate('simple-auth-authenticator:torii', 'facebook-oauth2').then(function(provider, data) {
        console.log('authentication successful');
        console.log(_this.get('session.authorizationCode'));
        console.dir(_this.get('session'));
      });
    },

    doShit: function() {
      console.log('here be ye session');
      console.dir(this.get('session'));
      console.dir(this.get('session.content'));
      console.dir(this.get('session.isAuthenticated'));
      console.dir(this.get('session.store'));
      console.log('hey: ' + this.get('session.authorizationCode'));
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
