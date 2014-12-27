import Ember from 'ember';

export default Ember.ObjectController.extend({
  searchTerm: '',
  searchResults: [],
  pendingFriends: Em.computed.alias('model.pendingFriends'),

  validEmail: function() {
    var searchTerm = this.get('searchTerm');
    var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(searchTerm);
  }.property('searchTerm'),

  fetchUser: function() {
    var _this = this;
    if (this.get('validEmail')) {
      var email = this.get('searchTerm');
      this.get('store').find('user', {
        orderBy: 'email',
        equalTo: email.toLowerCase()
      }).then(function(users) {
        // callbacks from previous searches i.e. test@test.co / test@test.com
        // may cause previous null results to overwrite subsequent valid results. 
        // workaround implemented
        if (email === _this.get('searchTerm')) {
          _this.set('searchResults', users);
        }
      });
    } else {
      // clean up leftovers from previous searches
      this.set('searchResults', Ember.A([]));
    }
  }.observes('validEmail'),

  actions: {
    debugReload: function() {
      var user = this.get('model');

      console.log('isLoading:', user.get('isLoading'));
      console.log('isLoaded', user.get('isLoaded'));
      console.log('isDirty', user.get('isDirty'));
      console.log('isSaving', user.get('isSaving'));

      user.reload().then(function(user) {
        console.log('user:', user);
        console.log('user.friends.length:', user.get('friends.length'));
        console.log('user.pendingFriends.length:', user.get('pendingFriends.length'));
      });
      this.get('model.pendingFriends').reload().then(function() {
        console.log('reloaded pendingFriends');
      });
    }, 

    debugSave: function() {
      this.get('model').save().then(function(user) {
      });
    },

    sendFriendRequest: function(friend) {
      // seems to be needed only when developing/directly manipulating backend
      if (friend.get('friends').contains(this.get('model'))) {
        friend.get('friends').removeObject(this.get('model'));
      }

      friend.get('pendingFriends').pushObject(this.get('model'));
      friend.save();
    },

    acceptFriend: function(friend) {
      var user = this.get('model');
      user.get('friends').pushObject(friend);

      // workaround; see https://github.com/firebase/emberfire/issues/143
      user.reload().then(function(user) {
        user.get('pendingFriends').removeObject(friend);
        user.save().then(function(user) {
          user.get('pendingFriends').removeObject(friend);
        });
        friend.save();
      });
    },

    denyFriends: function() {
      console.log('deny friend');
      this.get('model').save();
    },

    debug: function() {
      console.log('debug shite brutha');
      console.log('no model i bet', this.get('model'));
    }
  }
});
