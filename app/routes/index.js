import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.transitionToRoute('script.new');
  },

  beforeModel: function(transition) {
    this._super(transition);
    return addUserIfDoesNotExist(this, this.get('session.authData.uid'));
  }
});

function addUserIfDoesNotExist(_this, uid) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    _this.get('store').find('user', uid).then(function(user) {
      if (user) {
        console.log('user exists');
        resolve(user);
      }
    }, function(err) {
      if (err.message.indexOf('no record was found') !== -1) {
        var user = _this.store.createRecord('user', {
          uid: uid
        });
        user.set('id', uid);
        user.set('newUser', true);
        user.save().then(function(user) {
          resolve(user);
        }, function(err) {
          reject(err);
        });
      } else {
        reject(err);
      }
    });
  });
}
