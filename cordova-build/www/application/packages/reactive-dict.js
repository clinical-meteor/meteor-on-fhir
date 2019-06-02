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
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var EJSON = Package.ejson.EJSON;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

/* Package-scope variables */
var ReactiveDict;

var require = meteorInstall({"node_modules":{"meteor":{"reactive-dict":{"migration.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// packages/reactive-dict/migration.js                                                       //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
module.export({
  ReactiveDict: function () {
    return ReactiveDict;
  }
});
var ReactiveDict;
module.link("./reactive-dict", {
  ReactiveDict: function (v) {
    ReactiveDict = v;
  }
}, 0);
var hasOwn = Object.prototype.hasOwnProperty;
ReactiveDict._migratedDictData = {}; // name -> data

ReactiveDict._dictsToMigrate = {}; // name -> ReactiveDict

ReactiveDict._loadMigratedDict = function (dictName) {
  if (hasOwn.call(ReactiveDict._migratedDictData, dictName)) {
    var data = ReactiveDict._migratedDictData[dictName];
    delete ReactiveDict._migratedDictData[dictName];
    return data;
  }

  return null;
};

ReactiveDict._registerDictForMigrate = function (dictName, dict) {
  if (hasOwn.call(ReactiveDict._dictsToMigrate, dictName)) throw new Error("Duplicate ReactiveDict name: " + dictName);
  ReactiveDict._dictsToMigrate[dictName] = dict;
};

if (Meteor.isClient && Package.reload) {
  // Put old migrated data into ReactiveDict._migratedDictData,
  // where it can be accessed by ReactiveDict._loadMigratedDict.
  var migrationData = Package.reload.Reload._migrationData('reactive-dict');

  if (migrationData && migrationData.dicts) ReactiveDict._migratedDictData = migrationData.dicts; // On migration, assemble the data from all the dicts that have been
  // registered.

  Package.reload.Reload._onMigrate('reactive-dict', function () {
    var dictsToMigrate = ReactiveDict._dictsToMigrate;
    var dataToMigrate = {};

    for (var dictName in meteorBabelHelpers.sanitizeForInObject(dictsToMigrate)) {
      dataToMigrate[dictName] = dictsToMigrate[dictName]._getMigrationData();
    }

    return [true, {
      dicts: dataToMigrate
    }];
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////

},"reactive-dict.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// packages/reactive-dict/reactive-dict.js                                                   //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

module.export({
  ReactiveDict: function () {
    return ReactiveDict;
  }
});
var hasOwn = Object.prototype.hasOwnProperty; // XXX come up with a serialization method which canonicalizes object key
// order, which would allow us to use objects as values for equals.

function stringify(value) {
  if (value === undefined) {
    return 'undefined';
  }

  return EJSON.stringify(value);
}

function parse(serialized) {
  if (serialized === undefined || serialized === 'undefined') {
    return undefined;
  }

  return EJSON.parse(serialized);
}

function changed(v) {
  v && v.changed();
} // XXX COMPAT WITH 0.9.1 : accept migrationData instead of dictName


var ReactiveDict =
/*#__PURE__*/
function () {
  function ReactiveDict(dictName, dictData) {
    // this.keys: key -> value
    this.keys = {};

    if (dictName) {
      // name given; migration will be performed
      if (typeof dictName === 'string') {
        // the normal case, argument is a string name.
        // Only run migration logic on client, it will cause
        // duplicate name errors on server during reloads.
        // _registerDictForMigrate will throw an error on duplicate name.
        Meteor.isClient && ReactiveDict._registerDictForMigrate(dictName, this);

        var migratedData = Meteor.isClient && ReactiveDict._loadMigratedDict(dictName);

        if (migratedData) {
          // Don't stringify migrated data
          this.keys = migratedData;
        } else {
          // Use _setObject to make sure values are stringified
          this._setObject(dictData || {});
        }

        this.name = dictName;
      } else if ((0, _typeof2.default)(dictName) === 'object') {
        // back-compat case: dictName is actually migrationData
        // Use _setObject to make sure values are stringified
        this._setObject(dictName);
      } else {
        throw new Error("Invalid ReactiveDict argument: " + dictName);
      }
    } else if ((0, _typeof2.default)(dictData) === 'object') {
      this._setObject(dictData);
    }

    this.allDeps = new Tracker.Dependency();
    this.keyDeps = {}; // key -> Dependency

    this.keyValueDeps = {}; // key -> Dependency
  } // set() began as a key/value method, but we are now overloading it
  // to take an object of key/value pairs, similar to backbone
  // http://backbonejs.org/#Model-set


  var _proto = ReactiveDict.prototype;

  _proto.set = function () {
    function set(keyOrObject, value) {
      if ((0, _typeof2.default)(keyOrObject) === 'object' && value === undefined) {
        // Called as `dict.set({...})`
        this._setObject(keyOrObject);

        return;
      } // the input isn't an object, so it must be a key
      // and we resume with the rest of the function


      var key = keyOrObject;
      value = stringify(value);
      var keyExisted = hasOwn.call(this.keys, key);
      var oldSerializedValue = keyExisted ? this.keys[key] : 'undefined';
      var isNewValue = value !== oldSerializedValue;
      this.keys[key] = value;

      if (isNewValue || !keyExisted) {
        // Using the changed utility function here because this.allDeps might not exist yet,
        // when setting initial data from constructor
        changed(this.allDeps);
      } // Don't trigger changes when setting initial data from constructor,
      // this.KeyDeps is undefined in this case


      if (isNewValue && this.keyDeps) {
        changed(this.keyDeps[key]);

        if (this.keyValueDeps[key]) {
          changed(this.keyValueDeps[key][oldSerializedValue]);
          changed(this.keyValueDeps[key][value]);
        }
      }
    }

    return set;
  }();

  _proto.setDefault = function () {
    function setDefault(keyOrObject, value) {
      if ((0, _typeof2.default)(keyOrObject) === 'object' && value === undefined) {
        // Called as `dict.setDefault({...})`
        this._setDefaultObject(keyOrObject);

        return;
      } // the input isn't an object, so it must be a key
      // and we resume with the rest of the function


      var key = keyOrObject;

      if (!hasOwn.call(this.keys, key)) {
        this.set(key, value);
      }
    }

    return setDefault;
  }();

  _proto.get = function () {
    function get(key) {
      this._ensureKey(key);

      this.keyDeps[key].depend();
      return parse(this.keys[key]);
    }

    return get;
  }();

  _proto.equals = function () {
    function equals(key, value) {
      var _this = this;

      // Mongo.ObjectID is in the 'mongo' package
      var ObjectID = null;

      if (Package.mongo) {
        ObjectID = Package.mongo.Mongo.ObjectID;
      } // We don't allow objects (or arrays that might include objects) for
      // .equals, because JSON.stringify doesn't canonicalize object key
      // order. (We can make equals have the right return value by parsing the
      // current value and using EJSON.equals, but we won't have a canonical
      // element of keyValueDeps[key] to store the dependency.) You can still use
      // "EJSON.equals(reactiveDict.get(key), value)".
      //
      // XXX we could allow arrays as long as we recursively check that there
      // are no objects


      if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean' && typeof value !== 'undefined' && !(value instanceof Date) && !(ObjectID && value instanceof ObjectID) && value !== null) {
        throw new Error("ReactiveDict.equals: value must be scalar");
      }

      var serializedValue = stringify(value);

      if (Tracker.active) {
        this._ensureKey(key);

        if (!hasOwn.call(this.keyValueDeps[key], serializedValue)) {
          this.keyValueDeps[key][serializedValue] = new Tracker.Dependency();
        }

        var isNew = this.keyValueDeps[key][serializedValue].depend();

        if (isNew) {
          Tracker.onInvalidate(function () {
            // clean up [key][serializedValue] if it's now empty, so we don't
            // use O(n) memory for n = values seen ever
            if (!_this.keyValueDeps[key][serializedValue].hasDependents()) {
              delete _this.keyValueDeps[key][serializedValue];
            }
          });
        }
      }

      var oldValue = undefined;

      if (hasOwn.call(this.keys, key)) {
        oldValue = parse(this.keys[key]);
      }

      return EJSON.equals(oldValue, value);
    }

    return equals;
  }();

  _proto.all = function () {
    function all() {
      var _this2 = this;

      this.allDeps.depend();
      var ret = {};
      Object.keys(this.keys).forEach(function (key) {
        ret[key] = parse(_this2.keys[key]);
      });
      return ret;
    }

    return all;
  }();

  _proto.clear = function () {
    function clear() {
      var _this3 = this;

      var oldKeys = this.keys;
      this.keys = {};
      this.allDeps.changed();
      Object.keys(oldKeys).forEach(function (key) {
        changed(_this3.keyDeps[key]);

        if (_this3.keyValueDeps[key]) {
          changed(_this3.keyValueDeps[key][oldKeys[key]]);
          changed(_this3.keyValueDeps[key]['undefined']);
        }
      });
    }

    return clear;
  }();

  _proto.delete = function () {
    function _delete(key) {
      var didRemove = false;

      if (hasOwn.call(this.keys, key)) {
        var oldValue = this.keys[key];
        delete this.keys[key];
        changed(this.keyDeps[key]);

        if (this.keyValueDeps[key]) {
          changed(this.keyValueDeps[key][oldValue]);
          changed(this.keyValueDeps[key]['undefined']);
        }

        this.allDeps.changed();
        didRemove = true;
      }

      return didRemove;
    }

    return _delete;
  }();

  _proto.destroy = function () {
    function destroy() {
      this.clear();

      if (this.name && hasOwn.call(ReactiveDict._dictsToMigrate, this.name)) {
        delete ReactiveDict._dictsToMigrate[this.name];
      }
    }

    return destroy;
  }();

  _proto._setObject = function () {
    function _setObject(object) {
      var _this4 = this;

      Object.keys(object).forEach(function (key) {
        _this4.set(key, object[key]);
      });
    }

    return _setObject;
  }();

  _proto._setDefaultObject = function () {
    function _setDefaultObject(object) {
      var _this5 = this;

      Object.keys(object).forEach(function (key) {
        _this5.setDefault(key, object[key]);
      });
    }

    return _setDefaultObject;
  }();

  _proto._ensureKey = function () {
    function _ensureKey(key) {
      if (!(key in this.keyDeps)) {
        this.keyDeps[key] = new Tracker.Dependency();
        this.keyValueDeps[key] = {};
      }
    }

    return _ensureKey;
  }(); // Get a JSON value that can be passed to the constructor to
  // create a new ReactiveDict with the same contents as this one


  _proto._getMigrationData = function () {
    function _getMigrationData() {
      // XXX sanitize and make sure it's JSONible?
      return this.keys;
    }

    return _getMigrationData;
  }();

  return ReactiveDict;
}();
///////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/reactive-dict/migration.js");

/* Exports */
Package._define("reactive-dict", exports, {
  ReactiveDict: ReactiveDict
});

})();
