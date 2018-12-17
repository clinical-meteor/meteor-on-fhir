//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Mongo = Package.mongo.Mongo;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;

/* Package-scope variables */
var CollectionExtensions;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/lai_collection-extensions/collection-extensions.js                                                   //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
// The collection extensions namespace
CollectionExtensions = {};

// Stores all the collection extensions
CollectionExtensions._extensions = [];

// This is where you would add custom functionality to
// Mongo.Collection/Meteor.Collection
CollectionExtensions.addExtension = function(customFunction) {
  if (typeof customFunction !== 'function') {
    throw new Meteor.Error(
      'collection-extension-wrong-argument', 
      'You must pass a function \
       into CollectionExtensions.addExtension().');
  }
  CollectionExtensions._extensions.push(customFunction);
  // If Meteor.users exists, apply the extension right away
  if (typeof Meteor.users !== 'undefined') {
    customFunction.apply(Meteor.users, ['users']);
  }
};

// Backwards compatibility
Meteor.addCollectionExtension = function() {
  console.warn('`Meteor.addCollectionExtension` is deprecated, please use `CollectionExtensions.addExtension`');
  CollectionExtensions.addExtension.apply(null, arguments);
};

// Utility function to add a prototype function to your
// Meteor/Mongo.Collection object
CollectionExtensions.addPrototype = function(name, customFunction) {
  if (typeof name !== 'string') {
    throw new Meteor.Error(
      'collection-extension-wrong-argument', 
      'You must pass a string as the first argument \
       into CollectionExtensions.addPrototype().');
  }
  if (typeof customFunction !== 'function') {
    throw new Meteor.Error(
      'collection-extension-wrong-argument', 
      'You must pass a function as the second argument \
       into CollectionExtensions.addPrototype().');
  }
  (typeof Mongo !== 'undefined' ? 
    Mongo.Collection : 
    Meteor.Collection).prototype[name] = customFunction;
};

// Backwards compatibility
Meteor.addCollectionPrototype = function() {
  console.warn('`Meteor.addCollectionPrototype` is deprecated, please use `CollectionExtensions.addPrototype`');
  CollectionExtensions.addPrototype.apply(null, arguments);
};

// This is used to reassign the prototype of unfortunately 
// and unstoppably already instantiated Mongo instances
// i.e. Meteor.users
function reassignCollectionPrototype(instance, constr) {
  var hasSetPrototypeOf = typeof Object.setPrototypeOf === 'function';

  if (!constr) constr = typeof Mongo !== 'undefined' ? Mongo.Collection : Meteor.Collection;

  // __proto__ is not available in < IE11
  // Note: Assigning a prototype dynamically has performance implications
  if (hasSetPrototypeOf) {
    Object.setPrototypeOf(instance, constr.prototype);
  } else if (instance.__proto__) {
    instance.__proto__ = constr.prototype;
  }
};

// This monkey-patches the Collection constructor
// This code is the same monkey-patching code 
// that matb33:collection-hooks uses, which works pretty nicely
function wrapCollection(ns, as) {
  // Save the original prototype
  if (!as._CollectionPrototype) as._CollectionPrototype = new as.Collection(null);

  var constructor = as.Collection;
  var proto = as._CollectionPrototype;

  ns.Collection = function () {
    var ret = constructor.apply(this, arguments);
    // This is where all the collection extensions get processed
    processCollectionExtensions(this, arguments);
    return ret;
  };

  ns.Collection.prototype = proto;
  ns.Collection.prototype.constructor = ns.Collection;

  for (var prop in constructor) {
    if (constructor.hasOwnProperty(prop)) {
      ns.Collection[prop] = constructor[prop];
    }
  }
};

function processCollectionExtensions(self, args) {
  // Using old-school operations for better performance
  // Please don't judge me ;P
  var args = args ? [].slice.call(args, 0) : undefined;
  var extensions = CollectionExtensions._extensions;
  for (var i = 0, len = extensions.length; i < len; i++) {
    extensions[i].apply(self, args);
  }
};

if (typeof Mongo !== 'undefined') {
  wrapCollection(Meteor, Mongo);
  wrapCollection(Mongo, Mongo);
} else {
  wrapCollection(Meteor, Meteor);
}

if (typeof Meteor.users !== 'undefined') {
  // Ensures that Meteor.users instanceof Mongo.Collection
  reassignCollectionPrototype(Meteor.users);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("lai:collection-extensions", {
  CollectionExtensions: CollectionExtensions
});

})();
