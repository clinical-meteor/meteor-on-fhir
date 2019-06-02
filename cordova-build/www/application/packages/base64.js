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
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

/* Package-scope variables */
var Base64;

var require = meteorInstall({"node_modules":{"meteor":{"base64":{"base64.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/base64/base64.js                                                            //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
module.export({
  Base64: function () {
    return Base64;
  }
});
// Base 64 encoding
var BASE_64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var BASE_64_VALS = Object.create(null);

var getChar = function (val) {
  return BASE_64_CHARS.charAt(val);
};

var getVal = function (ch) {
  return ch === '=' ? -1 : BASE_64_VALS[ch];
};

for (var i = 0; i < BASE_64_CHARS.length; i++) {
  BASE_64_VALS[getChar(i)] = i;
}

;

var encode = function (array) {
  if (typeof array === "string") {
    var str = array;
    array = newBinary(str.length);

    for (var _i = 0; _i < str.length; _i++) {
      var ch = str.charCodeAt(_i);

      if (ch > 0xFF) {
        throw new Error("Not ascii. Base64.encode can only take ascii strings.");
      }

      array[_i] = ch;
    }
  }

  var answer = [];
  var a = null;
  var b = null;
  var c = null;
  var d = null;
  array.forEach(function (elm, i) {
    switch (i % 3) {
      case 0:
        a = elm >> 2 & 0x3F;
        b = (elm & 0x03) << 4;
        break;

      case 1:
        b = b | elm >> 4 & 0xF;
        c = (elm & 0xF) << 2;
        break;

      case 2:
        c = c | elm >> 6 & 0x03;
        d = elm & 0x3F;
        answer.push(getChar(a));
        answer.push(getChar(b));
        answer.push(getChar(c));
        answer.push(getChar(d));
        a = null;
        b = null;
        c = null;
        d = null;
        break;
    }
  });

  if (a != null) {
    answer.push(getChar(a));
    answer.push(getChar(b));

    if (c == null) {
      answer.push('=');
    } else {
      answer.push(getChar(c));
    }

    if (d == null) {
      answer.push('=');
    }
  }

  return answer.join("");
}; // XXX This is a weird place for this to live, but it's used both by
// this package and 'ejson', and we can't put it in 'ejson' without
// introducing a circular dependency. It should probably be in its own
// package or as a helper in a package that both 'base64' and 'ejson'
// use.


var newBinary = function (len) {
  if (typeof Uint8Array === 'undefined' || typeof ArrayBuffer === 'undefined') {
    var ret = [];

    for (var _i2 = 0; _i2 < len; _i2++) {
      ret.push(0);
    }

    ret.$Uint8ArrayPolyfill = true;
    return ret;
  }

  return new Uint8Array(new ArrayBuffer(len));
};

var decode = function (str) {
  var len = Math.floor(str.length * 3 / 4);

  if (str.charAt(str.length - 1) == '=') {
    len--;

    if (str.charAt(str.length - 2) == '=') {
      len--;
    }
  }

  var arr = newBinary(len);
  var one = null;
  var two = null;
  var three = null;
  var j = 0;

  for (var _i3 = 0; _i3 < str.length; _i3++) {
    var c = str.charAt(_i3);
    var v = getVal(c);

    switch (_i3 % 4) {
      case 0:
        if (v < 0) {
          throw new Error('invalid base64 string');
        }

        one = v << 2;
        break;

      case 1:
        if (v < 0) {
          throw new Error('invalid base64 string');
        }

        one = one | v >> 4;
        arr[j++] = one;
        two = (v & 0x0F) << 4;
        break;

      case 2:
        if (v >= 0) {
          two = two | v >> 2;
          arr[j++] = two;
          three = (v & 0x03) << 6;
        }

        break;

      case 3:
        if (v >= 0) {
          arr[j++] = three | v;
        }

        break;
    }
  }

  return arr;
};

var Base64 = {
  encode: encode,
  decode: decode,
  newBinary: newBinary
};
//////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/base64/base64.js");

/* Exports */
Package._define("base64", exports, {
  Base64: Base64
});

})();
