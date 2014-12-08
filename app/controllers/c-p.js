import Ember from 'ember';
import ENV from 'screenwritr/config/environment';

export default Ember.ObjectController.extend({
  //needs: 'index',
  loginError: false,
  actions: {
    login: function() {
      console.log('debug, c-p controller, login action');
      var ref = new window.Firebase('https://' + ENV.APP.firebaseInstance + '.firebaseio.com')

      if (validateFields()) {
        var email = $('#email').val();
        var pass = $('#password').val();

        if (this.get('loginError')) this.set('loginError', false);

        var _this = this;
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
      else {
        this.set('loginError', 'Invalid credentials');
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
