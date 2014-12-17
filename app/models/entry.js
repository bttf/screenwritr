import DS from 'ember-data';

var attr = DS.attr,
  belongsTo = DS.belongsTo;

export default DS.Model.extend({
  title: attr('string'),
  body: attr('string'),
  created: attr('date'),
  modified: attr('date'),
  user: belongsTo('user'),

  userName: function() {
    return this.get('user.fullName');
  }.property('user')
});

