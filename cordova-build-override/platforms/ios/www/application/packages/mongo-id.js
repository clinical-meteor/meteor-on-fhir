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
var EJSON = Package.ejson.EJSON;
var IdMap = Package['id-map'].IdMap;
var Random = Package.random.Random;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

/* Package-scope variables */
var MongoID;

var require = meteorInstall({"node_modules":{"meteor":{"mongo-id":{"id.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// packages/mongo-id/id.js                                                                   //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

module.export({
  MongoID: function () {
    return MongoID;
  }
});
var EJSON;
module.link("meteor/ejson", {
  EJSON: function (v) {
    EJSON = v;
  }
}, 0);
var Random;
module.link("meteor/random", {
  Random: function (v) {
    Random = v;
  }
}, 1);
var MongoID = {};

MongoID._looksLikeObjectID = function (str) {
  return str.length === 24 && str.match(/^[0-9a-f]*$/);
};

MongoID.ObjectID =
/*#__PURE__*/
function () {
  function ObjectID(hexString) {
    //random-based impl of Mongo ObjectID
    if (hexString) {
      hexString = hexString.toLowerCase();

      if (!MongoID._looksLikeObjectID(hexString)) {
        throw new Error('Invalid hexadecimal string for creating an ObjectID');
      } // meant to work with _.isEqual(), which relies on structural equality


      this._str = hexString;
    } else {
      this._str = Random.hexString(24);
    }
  }

  var _proto = ObjectID.prototype;

  _proto.equals = function () {
    function equals(other) {
      return other instanceof MongoID.ObjectID && this.valueOf() === other.valueOf();
    }

    return equals;
  }();

  _proto.toString = function () {
    function toString() {
      return "ObjectID(\"" + this._str + "\")";
    }

    return toString;
  }();

  _proto.clone = function () {
    function clone() {
      return new MongoID.ObjectID(this._str);
    }

    return clone;
  }();

  _proto.typeName = function () {
    function typeName() {
      return 'oid';
    }

    return typeName;
  }();

  _proto.getTimestamp = function () {
    function getTimestamp() {
      return Number.parseInt(this._str.substr(0, 8), 16);
    }

    return getTimestamp;
  }();

  _proto.valueOf = function () {
    function valueOf() {
      return this._str;
    }

    return valueOf;
  }();

  _proto.toJSONValue = function () {
    function toJSONValue() {
      return this.valueOf();
    }

    return toJSONValue;
  }();

  _proto.toHexString = function () {
    function toHexString() {
      return this.valueOf();
    }

    return toHexString;
  }();

  return ObjectID;
}();

EJSON.addType('oid', function (str) {
  return new MongoID.ObjectID(str);
});

MongoID.idStringify = function (id) {
  if (id instanceof MongoID.ObjectID) {
    return id.valueOf();
  } else if (typeof id === 'string') {
    if (id === '') {
      return id;
    } else if (id.startsWith('-') || // escape previously dashed strings
    id.startsWith('~') || // escape escaped numbers, true, false
    MongoID._looksLikeObjectID(id) || // escape object-id-form strings
    id.startsWith('{')) {
      // escape object-form strings, for maybe implementing later
      return "-" + id;
    } else {
      return id; // other strings go through unchanged.
    }
  } else if (id === undefined) {
    return '-';
  } else if ((0, _typeof2.default)(id) === 'object' && id !== null) {
    throw new Error('Meteor does not currently support objects other than ObjectID as ids');
  } else {
    // Numbers, true, false, null
    return "~" + JSON.stringify(id);
  }
};

MongoID.idParse = function (id) {
  if (id === '') {
    return id;
  } else if (id === '-') {
    return undefined;
  } else if (id.startsWith('-')) {
    return id.substr(1);
  } else if (id.startsWith('~')) {
    return JSON.parse(id.substr(1));
  } else if (MongoID._looksLikeObjectID(id)) {
    return new MongoID.ObjectID(id);
  } else {
    return id;
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/mongo-id/id.js");

/* Exports */
Package._define("mongo-id", exports, {
  MongoID: MongoID
});

})();
