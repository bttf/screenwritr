import DS from 'ember-data';

var attr = DS.attr,
  belongsTo = DS.belongsTo;

export default DS.Model.extend({
  title: attr('string'),
  body: attr('string'),
  created: attr('date'),
  modified: attr('date'),
  userEmail: attr('string')

  //user: belongsTo('user') 
  // cant use this because emberfire does not have
  // findQuery support ! BLEH
});

