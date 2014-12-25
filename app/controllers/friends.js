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
    sendFriendRequest: function(friend) {
      friend.get('pendingFriends').pushObject(this.get('model'));
      friend.save();
    }
  }
});
