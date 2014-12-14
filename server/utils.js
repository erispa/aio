// utils (underscore or lodash or not my thing...)
var _ = {};

// natives
var __hasOwnProperty = Object.prototype.hasOwnProperty;
var __toString = Object.prototype.toString;
var __slice = Array.prototype.slice;

// wrapper for 'Object.prototype.hasOwnProperty'
_.has = function ( object, key ) {
  return __hasOwnProperty.call(object, key);
};

// wrapper for 'Array.prototype.slice'
_.slice = function ( object, from, to ) {
  return __slice.call(object, from || 0, to);
};

// a more general purpose forEach
_.each = function ( object, iterator, context ) {
  if ( Array.isArray(object) ) {
    object.forEach(iterator, context);
  } else {
    for ( var key in object ) {
      if ( __hasOwnProperty.call(object, key) ) {
        iterator.call(context, object[key], key, object);
      }
    }
  }
};

// merge 2 objects
_.merge = function ( target, source ) {
  var key, targetIsArray = Array.isArray(target);
  for ( key in source ) {
    if ( __hasOwnProperty.call(source, key) ) {
      target[targetIsArray ? target.length : key] = source[key];
    }
  }
};

// will insert all object properties that dont exist in target from the source
_.defaults = function ( target, source ) {
  for ( var key in source ) {
    if ( __hasOwnProperty.call(source, key) ) {
      if ( !__hasOwnProperty.call(target, key) ) {
        target[key] = source[key];
      }
    }
  }
};

// what javascripts 'typeof' should be...
_.typeof = function ( object, target ) {
  if ( object != object ) object = 'nan';
  else object = __toString.call(object).slice(8, -1).toLowerCase();
  return target ? object === target : object;
};

// auto add some type-checking methods
["Array", "Object", "String", "Function", "Number", "Boolean", "RegExp", "Date", "Null", "Undefined", "Error", "NaN"].forEach(
  function ( type ) {
    _['is' + type] = function ( object ) { return __toString.call(object) === '[object ' + type + ']'; };
  }
);

// i prefer my own inherits method
_.inherits = function ( klass, parent ) {
  klass.prototype = Object.create(parent.prototype);
  klass.prototype.constructor = klass;
};

// just a convienance method for 'uuid.v4' method
_.uuid = require('uuid').v4;

// export utils
module.exports = _;
