import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("users");

  this.route("createUser", {
    path: "/createUser/:email"
  });

  this.route("user", {
    path: "/user/:user_id"
  });

  this.route("login");
});

export default Router;