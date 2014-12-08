import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  email: attr('string'),

  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName')
});
