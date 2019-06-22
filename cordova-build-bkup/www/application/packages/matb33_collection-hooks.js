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
var _ = Package.underscore._;
var EJSON = Package.ejson.EJSON;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;

/* Package-scope variables */
var CollectionHooks;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/matb33_collection-hooks/packages/matb33_collection-hooks //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/matb33:collection-hooks/collection-hooks.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Relevant AOP terminology:                                                                                           // 1
// Aspect: User code that runs before/after (hook)                                                                     // 2
// Advice: Wrapper code that knows when to call user code (aspects)                                                    // 3
// Pointcut: before/after                                                                                              // 4
                                                                                                                       // 5
var advices = {};                                                                                                      // 6
var Tracker = Package.tracker && Package.tracker.Tracker || Package.deps.Deps;                                         // 7
var publishUserId = Meteor.isServer && new Meteor.EnvironmentVariable();                                               // 8
                                                                                                                       // 9
var directEnv = new Meteor.EnvironmentVariable();                                                                      // 10
var directOp = function (func) {                                                                                       // 11
  return directEnv.withValue(true, func);                                                                              // 12
};                                                                                                                     // 13
                                                                                                                       // 14
CollectionHooks = {                                                                                                    // 15
  defaults: {                                                                                                          // 16
    before: { insert: {}, update: {}, remove: {}, find: {}, findOne: {}, all: {}},                                     // 17
    after: { insert: {}, update: {}, remove: {}, find: {}, findOne: {}, all: {}},                                      // 18
    all: { insert: {}, update: {}, remove: {}, find: {}, findOne: {}, all: {}}                                         // 19
  }                                                                                                                    // 20
};                                                                                                                     // 21
                                                                                                                       // 22
CollectionHooks.getUserId = function () {                                                                              // 23
  var userId;                                                                                                          // 24
                                                                                                                       // 25
  if (Meteor.isClient) {                                                                                               // 26
    Tracker.nonreactive(function () {                                                                                  // 27
      userId = Meteor.userId && Meteor.userId();                                                                       // 28
    });                                                                                                                // 29
  }                                                                                                                    // 30
                                                                                                                       // 31
  if (Meteor.isServer) {                                                                                               // 32
    try {                                                                                                              // 33
      // Will throw an error unless within method call.                                                                // 34
      // Attempt to recover gracefully by catching:                                                                    // 35
      userId = Meteor.userId && Meteor.userId();                                                                       // 36
    } catch (e) {}                                                                                                     // 37
                                                                                                                       // 38
    if (!userId) {                                                                                                     // 39
      // Get the userId if we are in a publish function.                                                               // 40
      userId = publishUserId.get();                                                                                    // 41
    }                                                                                                                  // 42
  }                                                                                                                    // 43
                                                                                                                       // 44
  return userId;                                                                                                       // 45
};                                                                                                                     // 46
                                                                                                                       // 47
CollectionHooks.extendCollectionInstance = function (self, constructor) {                                              // 48
  var collection = Meteor.isClient ? self : self._collection;                                                          // 49
                                                                                                                       // 50
  // Offer a public API to allow the user to define aspects                                                            // 51
  // Example: collection.before.insert(func);                                                                          // 52
  _.each(["before", "after"], function (pointcut) {                                                                    // 53
    _.each(advices, function (advice, method) {                                                                        // 54
      Meteor._ensure(self, pointcut, method);                                                                          // 55
      Meteor._ensure(self, "_hookAspects", method);                                                                    // 56
                                                                                                                       // 57
      self._hookAspects[method][pointcut] = [];                                                                        // 58
      self[pointcut][method] = function (aspect, options) {                                                            // 59
        var len = self._hookAspects[method][pointcut].push({                                                           // 60
          aspect: aspect,                                                                                              // 61
          options: CollectionHooks.initOptions(options, pointcut, method)                                              // 62
        });                                                                                                            // 63
                                                                                                                       // 64
        return {                                                                                                       // 65
          replace: function (aspect, options) {                                                                        // 66
            self._hookAspects[method][pointcut].splice(len - 1, 1, {                                                   // 67
              aspect: aspect,                                                                                          // 68
              options: CollectionHooks.initOptions(options, pointcut, method)                                          // 69
            });                                                                                                        // 70
          },                                                                                                           // 71
          remove: function () {                                                                                        // 72
            self._hookAspects[method][pointcut].splice(len - 1, 1);                                                    // 73
          }                                                                                                            // 74
        };                                                                                                             // 75
      };                                                                                                               // 76
    });                                                                                                                // 77
  });                                                                                                                  // 78
                                                                                                                       // 79
  // Offer a publicly accessible object to allow the user to define                                                    // 80
  // collection-wide hook options.                                                                                     // 81
  // Example: collection.hookOptions.after.update = {fetchPrevious: false};                                            // 82
  self.hookOptions = EJSON.clone(CollectionHooks.defaults);                                                            // 83
                                                                                                                       // 84
  // Wrap mutator methods, letting the defined advice do the work                                                      // 85
  _.each(advices, function (advice, method) {                                                                          // 86
    // Store a reference to the mutator method in a publicly reachable location                                        // 87
    var _super = collection[method];                                                                                   // 88
                                                                                                                       // 89
    Meteor._ensure(self, "direct", method);                                                                            // 90
    self.direct[method] = function () {                                                                                // 91
      var args = arguments;                                                                                            // 92
      return directOp(function () {                                                                                    // 93
        return constructor.prototype[method].apply(self, args);                                                        // 94
      });                                                                                                              // 95
    };                                                                                                                 // 96
                                                                                                                       // 97
    collection[method] = function () {                                                                                 // 98
      if (directEnv.get() === true) {                                                                                  // 99
        return _super.apply(collection, arguments);                                                                    // 100
      }                                                                                                                // 101
                                                                                                                       // 102
      return advice.call(this,                                                                                         // 103
        CollectionHooks.getUserId(),                                                                                   // 104
        _super,                                                                                                        // 105
        self,                                                                                                          // 106
        self._hookAspects[method] || {},                                                                               // 107
        function (doc) {                                                                                               // 108
          return  _.isFunction(self._transform)                                                                        // 109
                  ? function (d) { return self._transform(d || doc); }                                                 // 110
                  : function (d) { return d || doc; };                                                                 // 111
        },                                                                                                             // 112
        _.toArray(arguments),                                                                                          // 113
        false                                                                                                          // 114
      );                                                                                                               // 115
    };                                                                                                                 // 116
  });                                                                                                                  // 117
};                                                                                                                     // 118
                                                                                                                       // 119
CollectionHooks.defineAdvice = function (method, advice) {                                                             // 120
  advices[method] = advice;                                                                                            // 121
};                                                                                                                     // 122
                                                                                                                       // 123
CollectionHooks.initOptions = function (options, pointcut, method) {                                                   // 124
  return CollectionHooks.extendOptions(CollectionHooks.defaults, options, pointcut, method);                           // 125
};                                                                                                                     // 126
                                                                                                                       // 127
CollectionHooks.extendOptions = function (source, options, pointcut, method) {                                         // 128
  options = _.extend(options || {}, source.all.all);                                                                   // 129
  options = _.extend(options, source[pointcut].all);                                                                   // 130
  options = _.extend(options, source.all[method]);                                                                     // 131
  options = _.extend(options, source[pointcut][method]);                                                               // 132
  return options;                                                                                                      // 133
};                                                                                                                     // 134
                                                                                                                       // 135
CollectionHooks.getDocs = function (collection, selector, options) {                                                   // 136
  var self = this;                                                                                                     // 137
                                                                                                                       // 138
  var findOptions = {transform: null, reactive: false}; // added reactive: false                                       // 139
                                                                                                                       // 140
  /*                                                                                                                   // 141
  // No "fetch" support at this time.                                                                                  // 142
  if (!self._validators.fetchAllFields) {                                                                              // 143
    findOptions.fields = {};                                                                                           // 144
    _.each(self._validators.fetch, function(fieldName) {                                                               // 145
      findOptions.fields[fieldName] = 1;                                                                               // 146
    });                                                                                                                // 147
  }                                                                                                                    // 148
  */                                                                                                                   // 149
                                                                                                                       // 150
  // Bit of a magic condition here... only "update" passes options, so this is                                         // 151
  // only relevant to when update calls getDocs:                                                                       // 152
  if (options) {                                                                                                       // 153
    // This was added because in our case, we are potentially iterating over                                           // 154
    // multiple docs. If multi isn't enabled, force a limit (almost like                                               // 155
    // findOne), as the default for update without multi enabled is to affect                                          // 156
    // only the first matched document:                                                                                // 157
    if (!options.multi) {                                                                                              // 158
      findOptions.limit = 1;                                                                                           // 159
    }                                                                                                                  // 160
  }                                                                                                                    // 161
                                                                                                                       // 162
  // Unlike validators, we iterate over multiple docs, so use                                                          // 163
  // find instead of findOne:                                                                                          // 164
  return collection.find(selector, findOptions);                                                                       // 165
};                                                                                                                     // 166
                                                                                                                       // 167
CollectionHooks.reassignPrototype = function (instance, constr) {                                                      // 168
  var hasSetPrototypeOf = typeof Object.setPrototypeOf === "function";                                                 // 169
                                                                                                                       // 170
  if (!constr) constr = typeof Mongo !== "undefined" ? Mongo.Collection : Meteor.Collection;                           // 171
                                                                                                                       // 172
  // __proto__ is not available in < IE11                                                                              // 173
  // Note: Assigning a prototype dynamically has performance implications                                              // 174
  if (hasSetPrototypeOf) {                                                                                             // 175
    Object.setPrototypeOf(instance, constr.prototype);                                                                 // 176
  } else if (instance.__proto__) {                                                                                     // 177
    instance.__proto__ = constr.prototype;                                                                             // 178
  }                                                                                                                    // 179
};                                                                                                                     // 180
                                                                                                                       // 181
CollectionHooks.wrapCollection = function (ns, as) {                                                                   // 182
  if (!as._CollectionConstructor) as._CollectionConstructor = as.Collection;                                           // 183
  if (!as._CollectionPrototype) as._CollectionPrototype = new as.Collection(null);                                     // 184
                                                                                                                       // 185
  var constructor = as._CollectionConstructor;                                                                         // 186
  var proto = as._CollectionPrototype;                                                                                 // 187
                                                                                                                       // 188
  ns.Collection = function () {                                                                                        // 189
    var ret = constructor.apply(this, arguments);                                                                      // 190
    CollectionHooks.extendCollectionInstance(this, constructor);                                                       // 191
    return ret;                                                                                                        // 192
  };                                                                                                                   // 193
                                                                                                                       // 194
  ns.Collection.prototype = proto;                                                                                     // 195
  ns.Collection.prototype.constructor = ns.Collection;                                                                 // 196
                                                                                                                       // 197
  for (var prop in constructor) {                                                                                      // 198
    if (constructor.hasOwnProperty(prop)) {                                                                            // 199
      ns.Collection[prop] = constructor[prop];                                                                         // 200
    }                                                                                                                  // 201
  }                                                                                                                    // 202
};                                                                                                                     // 203
                                                                                                                       // 204
if (typeof Mongo !== "undefined") {                                                                                    // 205
  CollectionHooks.wrapCollection(Meteor, Mongo);                                                                       // 206
  CollectionHooks.wrapCollection(Mongo, Mongo);                                                                        // 207
} else {                                                                                                               // 208
  CollectionHooks.wrapCollection(Meteor, Meteor);                                                                      // 209
}                                                                                                                      // 210
                                                                                                                       // 211
if (Meteor.isServer) {                                                                                                 // 212
  var _publish = Meteor.publish;                                                                                       // 213
  Meteor.publish = function (name, func) {                                                                             // 214
    return _publish.call(this, name, function () {                                                                     // 215
      // This function is called repeatedly in publications                                                            // 216
      var ctx = this, args = arguments;                                                                                // 217
      return publishUserId.withValue(ctx && ctx.userId, function () {                                                  // 218
        return func.apply(ctx, args);                                                                                  // 219
      });                                                                                                              // 220
    });                                                                                                                // 221
  };                                                                                                                   // 222
                                                                                                                       // 223
  // Make the above available for packages with hooks that want to determine                                           // 224
  // whether they are running inside a publish function or not.                                                        // 225
  CollectionHooks.isWithinPublish = function () {                                                                      // 226
    return publishUserId.get() !== undefined;                                                                          // 227
  };                                                                                                                   // 228
}                                                                                                                      // 229
                                                                                                                       // 230
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/matb33:collection-hooks/insert.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
CollectionHooks.defineAdvice("insert", function (userId, _super, instance, aspects, getTransform, args, suppressAspects) {
  var self = this;                                                                                                     // 2
  var ctx = {context: self, _super: _super, args: args};                                                               // 3
  var callback = _.last(args);                                                                                         // 4
  var async = _.isFunction(callback);                                                                                  // 5
  var abort, ret;                                                                                                      // 6
                                                                                                                       // 7
  // args[0] : doc                                                                                                     // 8
  // args[1] : callback                                                                                                // 9
                                                                                                                       // 10
  // before                                                                                                            // 11
  if (!suppressAspects) {                                                                                              // 12
    try {                                                                                                              // 13
      _.each(aspects.before, function (o) {                                                                            // 14
        var r = o.aspect.call(_.extend({transform: getTransform(args[0])}, ctx), userId, args[0]);                     // 15
        if (r === false) abort = true;                                                                                 // 16
      });                                                                                                              // 17
                                                                                                                       // 18
      if (abort) return false;                                                                                         // 19
    } catch (e) {                                                                                                      // 20
      if (async) return callback.call(self, e);                                                                        // 21
      throw e;                                                                                                         // 22
    }                                                                                                                  // 23
  }                                                                                                                    // 24
                                                                                                                       // 25
  function after(id, err) {                                                                                            // 26
    var doc = args[0];                                                                                                 // 27
    if (id) {                                                                                                          // 28
      doc = EJSON.clone(args[0]);                                                                                      // 29
      doc._id = id;                                                                                                    // 30
    }                                                                                                                  // 31
    if (!suppressAspects) {                                                                                            // 32
      var lctx = _.extend({transform: getTransform(doc), _id: id, err: err}, ctx);                                     // 33
      _.each(aspects.after, function (o) {                                                                             // 34
        o.aspect.call(lctx, userId, doc);                                                                              // 35
      });                                                                                                              // 36
    }                                                                                                                  // 37
    return id;                                                                                                         // 38
  }                                                                                                                    // 39
                                                                                                                       // 40
  if (async) {                                                                                                         // 41
    args[args.length - 1] = function (err, obj) {                                                                      // 42
      after(obj && obj[0] && obj[0]._id || obj, err);                                                                  // 43
      return callback.apply(this, arguments);                                                                          // 44
    };                                                                                                                 // 45
    return _super.apply(self, args);                                                                                   // 46
  } else {                                                                                                             // 47
    ret = _super.apply(self, args);                                                                                    // 48
    return after(ret && ret[0] && ret[0]._id || ret);                                                                  // 49
  }                                                                                                                    // 50
});                                                                                                                    // 51
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/matb33:collection-hooks/update.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
CollectionHooks.defineAdvice("update", function (userId, _super, instance, aspects, getTransform, args, suppressAspects) {
  var self = this;                                                                                                     // 2
  var ctx = {context: self, _super: _super, args: args};                                                               // 3
  var callback = _.last(args);                                                                                         // 4
  var async = _.isFunction(callback);                                                                                  // 5
  var docs, docIds, fields, abort, prev = {};                                                                          // 6
  var collection = _.has(self, "_collection") ? self._collection : self;                                               // 7
                                                                                                                       // 8
  // args[0] : selector                                                                                                // 9
  // args[1] : mutator                                                                                                 // 10
  // args[2] : options (optional)                                                                                      // 11
  // args[3] : callback                                                                                                // 12
                                                                                                                       // 13
  if (_.isFunction(args[2])) {                                                                                         // 14
    callback = args[2];                                                                                                // 15
    args[2] = {};                                                                                                      // 16
  }                                                                                                                    // 17
                                                                                                                       // 18
  if (!suppressAspects) {                                                                                              // 19
    try {                                                                                                              // 20
      if (aspects.before || aspects.after) {                                                                           // 21
        fields = getFields(args[1]);                                                                                   // 22
        docs = CollectionHooks.getDocs.call(self, collection, args[0], args[2]).fetch();                               // 23
        docIds = _.map(docs, function (doc) { return doc._id; });                                                      // 24
      }                                                                                                                // 25
                                                                                                                       // 26
      // copy originals for convenience for the "after" pointcut                                                       // 27
      if (aspects.after) {                                                                                             // 28
        prev.mutator = EJSON.clone(args[1]);                                                                           // 29
        prev.options = EJSON.clone(args[2]);                                                                           // 30
        if (_.some(aspects.after, function (o) { return o.options.fetchPrevious !== false; }) &&                       // 31
            CollectionHooks.extendOptions(instance.hookOptions, {}, "after", "update").fetchPrevious !== false) {      // 32
          prev.docs = {};                                                                                              // 33
          _.each(docs, function (doc) {                                                                                // 34
            prev.docs[doc._id] = EJSON.clone(doc);                                                                     // 35
          });                                                                                                          // 36
        }                                                                                                              // 37
      }                                                                                                                // 38
                                                                                                                       // 39
      // before                                                                                                        // 40
      _.each(aspects.before, function (o) {                                                                            // 41
        _.each(docs, function (doc) {                                                                                  // 42
          var r = o.aspect.call(_.extend({transform: getTransform(doc)}, ctx), userId, doc, fields, args[1], args[2]); // 43
          if (r === false) abort = true;                                                                               // 44
        });                                                                                                            // 45
      });                                                                                                              // 46
                                                                                                                       // 47
      if (abort) return false;                                                                                         // 48
    } catch (e) {                                                                                                      // 49
      if (async) return callback.call(self, e);                                                                        // 50
      throw e;                                                                                                         // 51
    }                                                                                                                  // 52
  }                                                                                                                    // 53
                                                                                                                       // 54
  function after(affected, err) {                                                                                      // 55
    if (!suppressAspects) {                                                                                            // 56
      var fields = getFields(args[1]);                                                                                 // 57
      var docs = CollectionHooks.getDocs.call(self, collection, {_id: {$in: docIds}}, args[2]).fetch();                // 58
                                                                                                                       // 59
      _.each(aspects.after, function (o) {                                                                             // 60
        _.each(docs, function (doc) {                                                                                  // 61
          o.aspect.call(_.extend({                                                                                     // 62
            transform: getTransform(doc),                                                                              // 63
            previous: prev.docs && prev.docs[doc._id],                                                                 // 64
            affected: affected,                                                                                        // 65
            err: err                                                                                                   // 66
          }, ctx), userId, doc, fields, prev.mutator, prev.options);                                                   // 67
        });                                                                                                            // 68
      });                                                                                                              // 69
    }                                                                                                                  // 70
  }                                                                                                                    // 71
                                                                                                                       // 72
  if (async) {                                                                                                         // 73
    args[args.length - 1] = function (err, affected) {                                                                 // 74
      after(affected, err);                                                                                            // 75
      return callback.apply(this, arguments);                                                                          // 76
    };                                                                                                                 // 77
    return _super.apply(this, args);                                                                                   // 78
  } else {                                                                                                             // 79
    var affected = _super.apply(self, args);                                                                           // 80
    after(affected);                                                                                                   // 81
    return affected;                                                                                                   // 82
  }                                                                                                                    // 83
});                                                                                                                    // 84
                                                                                                                       // 85
// This function contains a snippet of code pulled and modified from:                                                  // 86
// ~/.meteor/packages/mongo-livedata/collection.js:632-668                                                             // 87
// It's contained in these utility functions to make updates easier for us in                                          // 88
// case this code changes.                                                                                             // 89
var getFields = function (mutator) {                                                                                   // 90
  // compute modified fields                                                                                           // 91
  var fields = [];                                                                                                     // 92
  _.each(mutator, function (params, op) {                                                                              // 93
    _.each(_.keys(params), function (field) {                                                                          // 94
      // treat dotted fields as if they are replacing their                                                            // 95
      // top-level part                                                                                                // 96
      if (field.indexOf('.') !== -1)                                                                                   // 97
        field = field.substring(0, field.indexOf('.'));                                                                // 98
                                                                                                                       // 99
      // record the field we are trying to change                                                                      // 100
      if (!_.contains(fields, field))                                                                                  // 101
        fields.push(field);                                                                                            // 102
    });                                                                                                                // 103
  });                                                                                                                  // 104
                                                                                                                       // 105
  return fields;                                                                                                       // 106
};                                                                                                                     // 107
                                                                                                                       // 108
// This function contains a snippet of code pulled and modified from:                                                  // 109
// ~/.meteor/packages/mongo-livedata/collection.js                                                                     // 110
// It's contained in these utility functions to make updates easier for us in                                          // 111
// case this code changes.                                                                                             // 112
var getFields = function (mutator) {                                                                                   // 113
  // compute modified fields                                                                                           // 114
  var fields = [];                                                                                                     // 115
                                                                                                                       // 116
  _.each(mutator, function (params, op) {                                                                              // 117
    //====ADDED START=======================                                                                           // 118
    if (_.contains(["$set", "$unset", "$inc", "$push", "$pull", "$pop", "$rename", "$pullAll", "$addToSet", "$bit"], op)) {
    //====ADDED END=========================                                                                           // 120
      _.each(_.keys(params), function (field) {                                                                        // 121
        // treat dotted fields as if they are replacing their                                                          // 122
        // top-level part                                                                                              // 123
        if (field.indexOf('.') !== -1)                                                                                 // 124
          field = field.substring(0, field.indexOf('.'));                                                              // 125
                                                                                                                       // 126
        // record the field we are trying to change                                                                    // 127
        if (!_.contains(fields, field))                                                                                // 128
          fields.push(field);                                                                                          // 129
      });                                                                                                              // 130
    //====ADDED START=======================                                                                           // 131
    } else {                                                                                                           // 132
      fields.push(op);                                                                                                 // 133
    }                                                                                                                  // 134
    //====ADDED END=========================                                                                           // 135
  });                                                                                                                  // 136
                                                                                                                       // 137
  return fields;                                                                                                       // 138
};                                                                                                                     // 139
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/matb33:collection-hooks/remove.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
CollectionHooks.defineAdvice("remove", function (userId, _super, instance, aspects, getTransform, args, suppressAspects) {
  var self = this;                                                                                                     // 2
  var ctx = {context: self, _super: _super, args: args};                                                               // 3
  var callback = _.last(args);                                                                                         // 4
  var async = _.isFunction(callback);                                                                                  // 5
  var docs, abort, prev = [];                                                                                          // 6
  var collection = _.has(self, "_collection") ? self._collection : self;                                               // 7
                                                                                                                       // 8
  // args[0] : selector                                                                                                // 9
  // args[1] : callback                                                                                                // 10
                                                                                                                       // 11
  if (!suppressAspects) {                                                                                              // 12
    try {                                                                                                              // 13
      if (aspects.before || aspects.after) {                                                                           // 14
        docs = CollectionHooks.getDocs.call(self, collection, args[0]).fetch();                                        // 15
      }                                                                                                                // 16
                                                                                                                       // 17
      // copy originals for convenience for the "after" pointcut                                                       // 18
      if (aspects.after) {                                                                                             // 19
        _.each(docs, function (doc) {                                                                                  // 20
          prev.push(EJSON.clone(doc));                                                                                 // 21
        });                                                                                                            // 22
      }                                                                                                                // 23
                                                                                                                       // 24
      // before                                                                                                        // 25
      _.each(aspects.before, function (o) {                                                                            // 26
        _.each(docs, function (doc) {                                                                                  // 27
          var r = o.aspect.call(_.extend({transform: getTransform(doc)}, ctx), userId, doc);                           // 28
          if (r === false) abort = true;                                                                               // 29
        });                                                                                                            // 30
      });                                                                                                              // 31
                                                                                                                       // 32
      if (abort) return false;                                                                                         // 33
    } catch (e) {                                                                                                      // 34
      if (async) return callback.call(self, e);                                                                        // 35
      throw e;                                                                                                         // 36
    }                                                                                                                  // 37
  }                                                                                                                    // 38
                                                                                                                       // 39
  function after(err) {                                                                                                // 40
    if (!suppressAspects) {                                                                                            // 41
      _.each(aspects.after, function (o) {                                                                             // 42
        _.each(prev, function (doc) {                                                                                  // 43
          o.aspect.call(_.extend({transform: getTransform(doc), err: err}, ctx), userId, doc);                         // 44
        });                                                                                                            // 45
      });                                                                                                              // 46
    }                                                                                                                  // 47
  }                                                                                                                    // 48
                                                                                                                       // 49
  if (async) {                                                                                                         // 50
    args[args.length - 1] = function (err) {                                                                           // 51
      after(err);                                                                                                      // 52
      return callback.apply(this, arguments);                                                                          // 53
    };                                                                                                                 // 54
    return _super.apply(self, args);                                                                                   // 55
  } else {                                                                                                             // 56
    var result = _super.apply(self, args);                                                                             // 57
    after();                                                                                                           // 58
    return result;                                                                                                     // 59
  }                                                                                                                    // 60
});                                                                                                                    // 61
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/matb33:collection-hooks/find.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
CollectionHooks.defineAdvice("find", function (userId, _super, instance, aspects, getTransform, args, suppressAspects) {
  var self = this;                                                                                                     // 2
  var ctx = {context: self, _super: _super, args: args};                                                               // 3
  var ret, abort;                                                                                                      // 4
                                                                                                                       // 5
  // args[0] : selector                                                                                                // 6
  // args[1] : options                                                                                                 // 7
                                                                                                                       // 8
  // before                                                                                                            // 9
  if (!suppressAspects) {                                                                                              // 10
    _.each(aspects.before, function (o) {                                                                              // 11
      var r = o.aspect.call(ctx, userId, args[0], args[1]);                                                            // 12
      if (r === false) abort = true;                                                                                   // 13
    });                                                                                                                // 14
                                                                                                                       // 15
    if (abort) return false;                                                                                           // 16
  }                                                                                                                    // 17
                                                                                                                       // 18
  function after(cursor) {                                                                                             // 19
    if (!suppressAspects) {                                                                                            // 20
      _.each(aspects.after, function (o) {                                                                             // 21
        o.aspect.call(ctx, userId, args[0], args[1], cursor);                                                          // 22
      });                                                                                                              // 23
    }                                                                                                                  // 24
  }                                                                                                                    // 25
                                                                                                                       // 26
  ret = _super.apply(self, args);                                                                                      // 27
  after(ret);                                                                                                          // 28
                                                                                                                       // 29
  return ret;                                                                                                          // 30
});                                                                                                                    // 31
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/matb33:collection-hooks/findone.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
CollectionHooks.defineAdvice("findOne", function (userId, _super, instance, aspects, getTransform, args, suppressAspects) {
  var self = this;                                                                                                     // 2
  var ctx = {context: self, _super: _super, args: args};                                                               // 3
  var ret, abort;                                                                                                      // 4
                                                                                                                       // 5
  // args[0] : selector                                                                                                // 6
  // args[1] : options                                                                                                 // 7
                                                                                                                       // 8
  // before                                                                                                            // 9
  if (!suppressAspects) {                                                                                              // 10
    _.each(aspects.before, function (o) {                                                                              // 11
      var r = o.aspect.call(ctx, userId, args[0], args[1]);                                                            // 12
      if (r === false) abort = true;                                                                                   // 13
    });                                                                                                                // 14
                                                                                                                       // 15
    if (abort) return false;                                                                                           // 16
  }                                                                                                                    // 17
                                                                                                                       // 18
  function after(doc) {                                                                                                // 19
    if (!suppressAspects) {                                                                                            // 20
      _.each(aspects.after, function (o) {                                                                             // 21
        o.aspect.call(ctx, userId, args[0], args[1], doc);                                                             // 22
      });                                                                                                              // 23
    }                                                                                                                  // 24
  }                                                                                                                    // 25
                                                                                                                       // 26
  ret = _super.apply(self, args);                                                                                      // 27
  after(ret);                                                                                                          // 28
                                                                                                                       // 29
  return ret;                                                                                                          // 30
});                                                                                                                    // 31
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/matb33:collection-hooks/users-compat.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
if (Meteor.users) {                                                                                                    // 1
  // If Meteor.users has been instantiated, attempt to re-assign its prototype:                                        // 2
  CollectionHooks.reassignPrototype(Meteor.users);                                                                     // 3
                                                                                                                       // 4
  // Next, give it the hook aspects:                                                                                   // 5
  var Collection = typeof Mongo !== "undefined" && typeof Mongo.Collection !== "undefined" ? Mongo.Collection : Meteor.Collection;
  CollectionHooks.extendCollectionInstance(Meteor.users, Collection);                                                  // 7
}                                                                                                                      // 8
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("matb33:collection-hooks", {
  CollectionHooks: CollectionHooks
});

})();
