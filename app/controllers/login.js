import Ember from 'ember';
import ENV from 'screenwritr/config/environment';

var $ = Ember.$;

export default Ember.Controller.extend({
  actions: {
    simpleLogin: function() {
      var email = $('#email').val(),
          password = $('#password').val(),
          controller = this;

      if (Ember.isEmpty(email) || Ember.isEmpty(password)) {
        var errorMsg = [];
        if (Ember.isEmpty(email)) {
          errorMsg.push('E-mail field not populated.');
        }
        if (Ember.isEmpty(password)) {
          errorMsg.push('Password field not populated.');
        }
        controller.set('loginError', errorMsg.join(' '));
        return;
      }

      if (password.length < 6) {
        controller.set('loginError', 'Password length less than 6 characters');
        return;
      }

      // try and login
      controller.set('loginError', '');
      controller.get('session').authenticate('authenticator:simple', {
        email: email,
        password: password
      }).then(function() {
        console.log('authentication successful');
      }, function(err) {
        if (err.message.indexOf('specified user does not exist') !== -1) {
          var ref = new window.Firebase('https://' + ENV.APP.firebaseInstance + '.firebaseio.com');
          ref.createUser({
            email: email, 
            password: password
          }, function(error) {
            if (error === null) {
              console.log('user created successfully');
              controller.get('session').authenticate('authenticator:simple', {
                email: email,
                password: password
              }).then(function() {
                console.log('authentication successful');
              }, function(err) {
                controller.set('loginError', err);
              });
            }
          });
        } else {
          controller.set('loginError', err);
        }
      });
    },

    fbLogin: function() {
      var controller = this;
      this.get('session').authenticate('authenticator:thirdparty', { provider: 'facebook' }).then(function() {
      }, function(err) {
        controller.set('loginError', err);
      });
    },

    twLogin: function() {
      var controller = this;
      this.get('session').authenticate('authenticator:thirdparty', { provider: 'twitter' }).then(function() {
      }, function(err) {
        controller.set('loginError', err);
      });
    }
  }
});
