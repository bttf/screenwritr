import DS from 'ember-data';
import ENV from 'screenwritr/config/environment';

export default DS.FirebaseAdapter.extend({
  firebase: new window.Firebase('https://' + ENV.APP.firebase_instance + '.firebaseio.com')
});
