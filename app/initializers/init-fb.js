import ENV from 'screenwritr/config/environment';

export function initialize(/* container, application */) {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : ENV.facebook.apiKey,
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
}

export default {
  name: 'init-fb',
  initialize: initialize
};
