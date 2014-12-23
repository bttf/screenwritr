import Ember from 'ember';

export default Ember.ArrayController.extend({
  searchTerm: '',

  validEmail: function() {
    var searchTerm = this.get('searchTerm');
    var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(searchTerm);
  }.property('searchTerm'),

  fetchUser: function() {
    var _this = this;
    if (this.get('validEmail')) {
      this.get('store').find('user', {
        orderBy: 'email',
        equalTo: this.get('searchTerm').toLowerCase()
      }).then(function(users) {
        _this.set('searchResults', users);
      });
    }
  }.observes('validEmail')
});
