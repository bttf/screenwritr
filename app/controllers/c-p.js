import Ember from 'ember';
import ENV from 'screenwritr/config/environment';

export default Ember.ObjectController.extend({
  loginError: false,
  actions: {
    login: function() {
      var email = $('#email').val();
      var pass = $('#password').val();

      if (!Ember.isEmpty(email) && !Ember.isEmpty(pass)) {
        // toggle off error state if exists
        if (this.get('loginError')) this.set('loginError', false);

        // if user exists, log in, otherwise create user 
        var _this = this;
        userExists(this, email).then(function(userExists) {
          if (userExists) {
            _this.get('session').authenticate('authenticator:firebase', { 
              email: email, 
              password: pass 
            }).then(function(res) {
              console.log('Authentication successful');
            }, function(err) {
              _this.set('loginError', err);
            });

          } else {
            var newUser = _this.get('store').createRecord('user', {
              email: email,
              password: pass
            });
            _this.transitionToRoute('createUser', newUser);
          }
        });
      } else {
        this.set('loginError', 'Invalid credentials');
      }
    }
  }
});

function userExists(_this, email) {
  return _this.get('store').find('user').then(function(users) {
    if (users) {
      var list = users.filter(function(user) {
        return user.get('email').toLowerCase() === email.toLowerCase();
      });
      if (list.length > 0) 
        return true;
      else
        return false;
    }
    return false;
  });
}

function createUser(_this, email, pass) {
  var ref = new window.Firebase('https://' + ENV.APP.firebaseInstance + '.firebaseio.com');
  return new Ember.RSVP.Promise(function(resolve, reject) {
    ref.createUser({
      email: email,
      password: pass
    }, function(err) {
      if (err === null) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
}
