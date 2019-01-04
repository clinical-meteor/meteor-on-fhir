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

/* Package-scope variables */
var URL;

var require = meteorInstall({"node_modules":{"meteor":{"url":{"url_client.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
// packages/url/url_client.js                                                  //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////
                                                                               //
var common = require("./url_common.js");
var URL = exports.URL = common.URL;

URL._constructUrl = function (url, query, params) {
  var query_match = /^(.*?)(\?.*)?$/.exec(url);
  return common.buildUrl(
    query_match[1],
    query_match[2],
    query,
    params
  );
};

/////////////////////////////////////////////////////////////////////////////////

},"url_common.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
// packages/url/url_common.js                                                  //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////
                                                                               //
var URL = exports.URL = {};

function encodeString(str) {
  return encodeURIComponent(str).replace(/\*/g, '%2A');
}

// Encode URL paramaters into a query string, handling nested objects and
// arrays properly.
URL._encodeParams = function (params, prefix) {
  var str = [];
  var isParamsArray = Array.isArray(params);
  for (var p in params) {
    if (Object.prototype.hasOwnProperty.call(params, p)) {
      var k = prefix ? prefix + '[' + (isParamsArray ? '' : p) + ']' : p;
      var v = params[p];
      if (typeof v === 'object') {
        str.push(this._encodeParams(v, k));
      } else {
        var encodedKey =
          encodeString(k).replace('%5B', '[').replace('%5D', ']');
        str.push(encodedKey + '=' + encodeString(v));
      }
    }
  }
  return str.join('&').replace(/%20/g, '+');
};

exports.buildUrl = function(before_qmark, from_qmark, opt_query, opt_params) {
  var url_without_query = before_qmark;
  var query = from_qmark ? from_qmark.slice(1) : null;

  if (typeof opt_query === "string")
    query = String(opt_query);

  if (opt_params) {
    query = query || "";
    var prms = URL._encodeParams(opt_params);
    if (query && prms)
      query += '&';
    query += prms;
  }

  var url = url_without_query;
  if (query !== null)
    url += ("?"+query);

  return url;
};

/////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/url/url_client.js");

/* Exports */
Package._define("url", exports, {
  URL: URL
});

})();
