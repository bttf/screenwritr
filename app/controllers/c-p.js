import Ember from 'ember';
import ENV from 'screenwritr/config/environment';

export default Ember.ObjectController.extend({
  //needs: 'index',
  loginError: false,
  actions: {
    login: function() {
      if (validateFields()) {
        if (this.get('loginError')) this.set('loginError', false);
        var email = $('#email').val();
        var pass = $('#password').val();

        var _this = this;
        userExists(this, email).then(function(userExists) {
          if (userExists) {
            console.log('' + email + ' already exists; you will need to log in');
          } else {
            authenticate(_this, email, pass);
          }
        });

      } else {
        this.set('loginError', 'Invalid credentials');
      }

      function userExists(_this, email) {
        return _this.store.find('user').then(function(users) {
          var list = users.filter(function(user) {
            return user.get('email').toLowerCase() === email.toLowerCase();
          });
          if (list.length > 0) 
            return true;
          else
            return false;
        });
      }

      function authenticate(_this, email, pass) {
        var ref = new window.Firebase('https://' + ENV.APP.firebaseInstance + '.firebaseio.com');

        ref.createUser({
          email: email,
          password: pass
        }, function(err) {
          if (err === null) {
            console.log('user created successfully');
          } else {
            console.log('error creating user:', err);
            _this.set('loginError', err);
          }
        });
      }

      function validateFields() {
        var email = $('#email').val();
        var pass = $('#password').val();
        if (!email || email === '' ||
            !pass || pass === '')
          return false;
        return true;
      }
    }
  }
});
