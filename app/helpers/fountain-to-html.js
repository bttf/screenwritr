import Ember from 'ember';

export function fountainToHtml(input) {
  if (Ember.isEmpty(input)) {
    return input;
  }

  var output = window.fountain.parse(input);
  var htmlOutput = "";

  if (!Ember.isEmpty(output.html.title_page)) {
    htmlOutput += "<div class='title-page'>" + output.html.title_page + "</div>";
  } 
  if (!Ember.isEmpty(output.html.script)) {
    htmlOutput += "<div class='script-page'>" + output.html.script + "</div>";
  }
  return new Ember.Handlebars.SafeString(htmlOutput);
}

export default Ember.Handlebars.makeBoundHelper(fountainToHtml);
