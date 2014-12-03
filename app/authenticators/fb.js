import Base from 'simple-auth/authenticators/base';

export default Base.extend({
  authenticate: function(options) {
    console.log('i suppose this will alwyas occur?');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      FB.login(function(response) {
        if (response.authResponse.userID) {
          resolve({
            authResponse: response.authResponse,
            userId: response.authResponse.userID
          });
        } else {
          reject();
        }
      });
    });
  },
  invalidate: function(data) {
  }
});
