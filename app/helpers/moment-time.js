import Ember from 'ember';

export function momentTime(input) {
  if (Ember.isEmpty(input)) {
    return input;
  }

  var time = window.moment(input).calendar();

  return new Ember.Handlebars.SafeString(time);
}

export default Ember.Handlebars.makeBoundHelper(momentTime);
