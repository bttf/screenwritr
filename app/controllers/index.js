import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    loginFb: function() {
      var _this = this;
      this.get('session').authenticate('authenticator:fb', {}).then(function() {
        console.log(_this.get('session.userId'));
        console.dir(_this.get('session.authResponse'));
      });
    },

    doShit: function() {
      console.log(this.get('userId'));
    },

    save: function() {
      //console.log('body: %s', this.get('body'));
      //console.log('title: %s', this.get('title'));

      this.store.createRecord('entry', {
        body: this.get('body'),
        title: 'a_title'
      }).save().then(function(res) {
        console.log('good');
        console.dir(res);
      }, function(err) {
        console.log('not good');
        console.log(err);
      });
    }
  }

});
