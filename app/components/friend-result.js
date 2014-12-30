import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row', 'friend-result'],
  classNameBindings: ['selected', 'isPending:pending'],
  selected: false,

  sameUserOrFriend: function() {
    var user = this.get('user');
    var friend = this.get('friend');
    return user === friend || user.get('friends').contains(friend);
  }.property(),

  currentFriend: function() {
    var user = this.get('user');
    var friend = this.get('friend');
    return user.get('friends').contains(friend);
  }.property(),

  alreadyPending: function() {
    var friend = this.get('friend');
    var user = this.get('user');
    return friend.get('pendingFriends').contains(user);
  }.property('friend.pendingFriends'),

  actions: {
    sendFr: function() {
      this.sendAction('friendRequest', this.get('friend'));
    },

    acceptFr: function() {
      this.sendAction('accept', this.get('friend'));
    },

    denyFr: function() {
      this.sendAction('deny');
    }
  },

  mouseEnter: function() {
    this.set('selected', true);
  },

  mouseLeave: function() {
    this.set('selected', false);
  }
});
