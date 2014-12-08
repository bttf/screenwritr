import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  title: attr('string'),
  body: attr('string'),
  created: attr('date'),
  modified: attr('date')
});

