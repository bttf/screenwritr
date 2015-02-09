import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  title: attr('string', { 
    defaultValue: function() {
      var date = window.moment(new Date()).format('HH:mm - MM/DD/YYYY');
      return 'Untitled @ ' + date;
    }
  }),
  body: attr('string'),
  uid: belongsTo('user', { async: true })
});
