import Base from 'simple-auth/authenticators/base';
import ENV from 'screenwritr/config/environment';

export default Base.extend({
  restore: function(data) {
  },

  authenticate: function(options) {
    var ref = new window.Firebase('https://' + ENV.APP.firebaseInstance + '.firebaseio.com');
    console.log(options.user.get('password'));
    return new Ember.RSVP.Promise(function(resolve, reject) {
      ref.authWithPassword({
        email: options.user.get('email'),
        password:  options.user.get('password'),
      }, function(error, authData) {
        if (error === null) {
          resolve({ user: options.user, authData: authData });
        } else {
          reject(error);
        }
      });
    });
  },

  invalidate: function(data) {
  }
});
