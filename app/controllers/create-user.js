import Ember from 'ember';
import ENV from 'screenwritr/config/environment';

export default Ember.ObjectController.extend({
  fieldsValid: function() {
    var firstName = this.get('firstName'), lastName = this.get('lastName'),
      email = this.get('email'), bio = this.get('bio');
    if (!Ember.isEmpty(firstName) && !Ember.isEmpty(lastName) &&
        !Ember.isEmpty(email) && !Ember.isEmpty(bio)) 
      return true;
    return false;
  }.property('firstName', 'lastName', 'email', 'bio'),

  actions: {
    saveUser: function() {
      var _this = this;
      var ref = new window.Firebase('https://' + ENV.APP.firebaseInstance + '.firebaseio.com');

      ref.createUser({
        email: _this.get('email'),
        password: _this.get('password')
      }, function(err) {
        if (err === null) {
          // success, save then authenticate
          _this.get('model').save().then(function() {
            _this.get('session').authenticate('authenticator:firebase', {
              user: _this.get('model'),
              password: _this.get('password')
            });
            _this.transitionToRoute('index');
          }, function(err) {
            _this.set('error', err);
          });
        } else {
          _this.set('error', err);
        }
      });
    }
  }
});
