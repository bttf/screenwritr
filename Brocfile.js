var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');

/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
app.import('bower_components/bootstrap/dist/css/bootstrap.min.css');
app.import('bower_components/font-awesome/css/font-awesome.css');

app.import('bower_components/quill/dist/quill.min.js');
app.import('bower_components/momentjs/moment.js');

// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

var fontAwesomeAssets = pickFiles('bower_components/font-awesome/fonts', {
  srcDir: '/',
  files: ['fontawesome-webfont.*'],
  destDir: '/fonts'
});

module.exports = mergeTrees([app.toTree(), fontAwesomeAssets]);
