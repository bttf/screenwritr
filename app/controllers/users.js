import Ember from 'ember';

export default Ember.Controller.extend({
  newUser: {},
  creatingUser: false,
  actions: {
    createUser: function() {
      this.set('newUser', this.get('store').createRecord('user'));
      this.set('creatingUser', true);
    },
    saveUser: function(user) {
      var _this = this;
      user.save().then(function(res) {
        console.log('user saved');
        _this.set('creatingUser', false);
      }, function(err) {
        console.log('error saving user');
        _this.set('error', err);
        console.log(err);
      });
    }
  }
});
