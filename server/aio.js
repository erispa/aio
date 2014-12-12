// required modules
var express = require('express');
var _ = require('./utils');
var extensions = require('./extensions');
var fs = require('./fs');

// paths to this module. who knows what they could be used for, but meh...
var __aio = fs.join(__dirname, '..');
var __client = fs.join(__aio, 'client');
var __exts = fs.join(__aio, 'extensions');

// creates a new editor instance
function middleware ( app, options ) {
  
  // setup the options or use defaults
  options = _.defaults(options || {}, middleware.options);
  
  // home directory of databases, user files, projects, and other stuff
  if ( !_.isString(options, 'home') || !fs.existsSync(options.home) ) {
    throw new Error("The 'options.home' value must be set to a valid path");
  }
  
  // directory where temporary files like uploads are stored before moving them
  if ( _.has(options, 'temp') ) {
    if ( !_.isString(options, 'temp') || !fs.existsSync(options.temp) ) {
      throw new Error("The 'options.temp' value must be set to a valid path");
    }
  } else {
    options.temp = fs.join(options.home, 'temp', _.uuid());
    fs.mkdirSync(options.temp);
  }
  
  // set some paths
  app.set("aio.paths.root", __aio);
  app.set("aio.paths.client", __client);
  app.set("aio.paths.extensions", __exts);
  app.set("aio.paths.server", __dirname);
  
  // ensure system enviroment variables are passed
  app.set("system.env", options.env || process.env);
  
  // init the aio extensions middleware
  app.set("aio.extension-paths'", [__exts]);
  extensions.init(app, options);
  
  // load the client
  require(__client)(app, options.signups);
  
}

middleware.options = {
  home: null,
  temp: null,
  debug: false,
  signups: true
};

module.exports = middleware;
