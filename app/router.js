import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("login");

  this.resource("script", function() {
    this.route("new");
    this.route("index", { path: "/script/:slug_id" });
    this.route("edit", { path: "/script/:slug_id/edit" });
  });
});

export default Router;
