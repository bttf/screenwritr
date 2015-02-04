import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';
import ENV from 'screenwritr/config/environment';

export default Base.extend({
  restore: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var ref = new window.Firebase('https://' + ENV.APP.firebaseInstance + '.firebaseio.com');
      var authData = ref.getAuth();
      if (authData) {
        resolve({ uid: data.uid, user: data.user, authData: authData });
      } else { 
        reject();
      }
    });
  },

  authenticate: function(/* options */) {
    var ref = new window.Firebase('https://' + ENV.APP.firebaseInstance + '.firebaseio.com');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      ref.authWithOAuthPopup("twitter", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
          reject(error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          resolve({ authData: authData });
        }
      });
    });
  },

  invalidate: function() {
    return new Ember.RSVP.Promise(function(resolve) {
      var ref = new window.Firebase('https://' + ENV.APP.firebaseInstance + '.firebaseio.com');
      ref.unauth();
      resolve();
    });
  }
});
