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
        if (this.get('loginError')) this.set('loginError', false);

      }
      else {
        console.log('debug, c-p controller, login action, loginError, Fields not valid');
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
