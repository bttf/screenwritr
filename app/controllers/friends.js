import Ember from 'ember';

export default Ember.ObjectController.extend({
  searchTerm: '',
  searchResults: [],
  pendingFriends: Ember.computed.alias('model.pendingFriends'),

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
    sendFriendRequest: function(friend) {
      var user = this.get('model');
      friend.get('pendingFriends').then(function(pFriends) {
        pFriends.addObject(user);
        friend.save();
      });
    },

    acceptFriend: function(friend) {
      var user = this.get('model');
      user.reload().then(function(user) {
        user.get('pendingFriends').then(function(pFriends) {
          pFriends.removeObject(friend);
          user.save().then(function() {
            // enter workaround
            // https://github.com/firebase/emberfire/issues/166
            pFriends.removeObject(friend);
            console.log('we deleted a pendingFriend supposedly');
          });
        });
      });
      user.get('friends').then(function(friends) {
        friends.addObject(friend);
        user.save();
      });
      friend.get('friends').then(function(friends) {
        friends.addObject(user);
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
