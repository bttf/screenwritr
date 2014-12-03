import Base from 'simple-auth/authenticators/base';

export default Base.extend({
  restore: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(data.accessToken)) {
        console.log('hey');
        console.log(typeof FB);
        resolve(data);
      } else {
        console.log('REEEJECTED!');
        reject();
      }
    });
  },

  authenticate: function(options) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      FB.login(function(response) {
        if (response.authResponse.accessToken) {
          console.dir(response);
          resolve({
            accessToken: response.authResponse.accessToken
          });
        } else {
          reject();
        }
      });
    });
  },

  invalidate: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      FB.logout(function(res) {
        resolve();
      });
      reject();
    });
  }
});
