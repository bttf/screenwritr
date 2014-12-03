import Ember from 'ember';
import ENV from 'screenwritr/config/environment';

export default Ember.Component.extend({
  initFb: function() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : ENV.torii.providers['facebook-oauth2'].apiKey,
        cookie     : true,  
        //xfbml      : true,  
        version    : 'v2.1' 
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }.on('didInsertElement')
});
