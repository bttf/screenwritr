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
        userExists(this, email).then(function(user) {
          _this.get('session').authenticate('authenticator:firebase', {
            user: user,
            password: pass
          }).then(function() {
            console.log('authentication successful');
          }, function(err) {
            _this.set('loginError', err);
          });
        }, 
        
        function() {
          var newUser = _this.get('store').createRecord('user', {
            email: email,
            password: pass
          });
          _this.transitionToRoute('createUser', newUser);
        });
      } 
      
      else {
        this.set('loginError', 'Please fill in all fields');
      }
    },

    logout: function() {
      var _this = this;
      this.get('session').invalidate('authenticator:firebase').then(function() {
        console.log('authentication invalidated');
        _this.transitionToRoute('index');
      }, function(err) {
        console.log('I\'m afraid I can\'t do that');
      });

    }
  }
});

function userExists(_this, email) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    _this.get('store').find('user').then(function(users) {
      var user = users.filter(function(user) {
        return user.get('email').toLowerCase() === email.toLowerCase();
      });
      console.log('user:', user.length);
      if (user.length > 0) {
        resolve(user.objectAt(0));
      } else {
        reject('No users found');
      }
    });
  });
}
