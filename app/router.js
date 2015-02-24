import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("login");

  this.resource("script", function() {
    this.route("new");
    this.route("index", { path: "/:id" });
    this.route("edit", { path: "/:id/edit" });
  });

  this.route("open");
  this.route("published", { path: "/published/:id" });
});

export default Router;
