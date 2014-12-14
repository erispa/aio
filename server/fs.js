var PATH = require('path');
var FS = require('fs-extra');
var _ = require('./utils');

var fs = module.exports = exports = {};

_.merge(fs, FS);

fs.dirname = PATH.dirname;
fs.basename = PATH.basename;
fs.extname = PATH.extname;

function toForwardSlashes ( path ) {
  return path.replace(/\\/g, '/');
}

fs.join = function ( ) {
  return toForwardSlashes(PATH.join.apply(null, arguments));
};

fs.resolve = function ( ) {
  return toForwardSlashes(PATH.resolve.apply(null, arguments));
};

fs.writeFile = function ( filename, data, options, callback ) {
  if ( typeof options === 'function' ) {
    callback = options;
    options = null;
  }
  fs.mkdir(fs.dirname(filename), function(err){
    if ( err )
      callback(err);
    else
      FS.writeFile(filename, data, options, callback);
  });
};

fs.writeFileSync = function ( filename, data, options ) {
  fs.mkdirSync(fs.dirname(filename));
  return FS.writeFileSync(filename, data, optionss);
};

fs.walk = require('walker');
fs.watch = require('chokidar').watch;
