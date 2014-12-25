import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row', 'friend-result'],
  classNameBindings: ['selected', 'isPending:pending'],
  selected: false,

  sameUser: function() {
    var friend = this.get('friend');
    var uid = this.get('uid');
    return friend.get('id') === uid;
  }.property(),

  actions: {
    sendFr: function() {
      this.sendAction('friendRequest', this.get('friend'));
    },

    acceptFr: function() {
      this.sendAction('accept', this.get('friend'));
      this.set('isPending', false);
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
