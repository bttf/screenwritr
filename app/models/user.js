import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  email: attr('string'),
  bio: attr('string'),

  fullName: function() {
    var fName, lName;
    if (Ember.isEmpty(this.get('firstName')))
      fName = '';
    else
      fName = this.get('firstName');
    if (Ember.isEmpty(this.get('lastName')))
      lName = '';
    else 
      lName = this.get('lastName');

    return fName + ' ' + lName;
  }.property('firstName', 'lastName')
});
