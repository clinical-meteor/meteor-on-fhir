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
var URL = Package.url.URL;
var meteorInstall = Package.modules.meteorInstall;

/* Package-scope variables */
var HTTP;

var require = meteorInstall({"node_modules":{"meteor":{"http":{"httpcall_client.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/http/httpcall_client.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var URL = require("meteor/url").URL;
var common = require("./httpcall_common.js");
var HTTP = exports.HTTP = common.HTTP;
var hasOwn = Object.prototype.hasOwnProperty;

/**
 * @summary Perform an outbound HTTP request.
 * @locus Anywhere
 * @param {String} method The [HTTP method](http://en.wikipedia.org/wiki/HTTP_method) to use, such as "`GET`", "`POST`", or "`HEAD`".
 * @param {String} url The URL to retrieve.
 * @param {Object} [options]
 * @param {String} options.content String to use as the HTTP request body.
 * @param {Object} options.data JSON-able object to stringify and use as the HTTP request body. Overwrites `content`.
 * @param {String} options.query Query string to go in the URL. Overwrites any query string in `url`.
 * @param {Object} options.params Dictionary of request parameters to be encoded and placed in the URL (for GETs) or request body (for POSTs).  If `content` or `data` is specified, `params` will always be placed in the URL.
 * @param {String} options.auth HTTP basic authentication string of the form `"username:password"`
 * @param {Object} options.headers Dictionary of strings, headers to add to the HTTP request.
 * @param {Number} options.timeout Maximum time in milliseconds to wait for the request before failing.  There is no timeout by default.
 * @param {Boolean} options.followRedirects If `true`, transparently follow HTTP redirects. Cannot be set to `false` on the client. Default `true`.
 * @param {Object} options.npmRequestOptions On the server, `HTTP.call` is implemented by using the [npm `request` module](https://www.npmjs.com/package/request). Any options in this object will be passed directly to the `request` invocation.
 * @param {Function} options.beforeSend On the client, this will be called before the request is sent to allow for more direct manipulation of the underlying XMLHttpRequest object, which will be passed as the first argument. If the callback returns `false`, the request will be not be sent.
 * @param {Function} [asyncCallback] Optional callback.  If passed, the method runs asynchronously, instead of synchronously, and calls asyncCallback.  On the client, this callback is required.
 */
HTTP.call = function(method, url, options, callback) {

  ////////// Process arguments //////////

  if (! callback && typeof options === "function") {
    // support (method, url, callback) argument list
    callback = options;
    options = null;
  }

  options = options || {};

  if (typeof callback !== "function")
    throw new Error(
      "Can't make a blocking HTTP call from the client; callback required.");

  method = (method || "").toUpperCase();

  var headers = {};

  var content = options.content;
  if (options.data) {
    content = JSON.stringify(options.data);
    headers['Content-Type'] = 'application/json';
  }

  var params_for_url, params_for_body;
  if (content || method === "GET" || method === "HEAD")
    params_for_url = options.params;
  else
    params_for_body = options.params;

  url = URL._constructUrl(url, options.query, params_for_url);

  if (options.followRedirects === false)
    throw new Error("Option followRedirects:false not supported on client.");

  if (hasOwn.call(options, 'npmRequestOptions')) {
    throw new Error("Option npmRequestOptions not supported on client.");
  }

  var username, password;
  if (options.auth) {
    var colonLoc = options.auth.indexOf(':');
    if (colonLoc < 0)
      throw new Error('Option auth should be of the form "username:password"');
    username = options.auth.substring(0, colonLoc);
    password = options.auth.substring(colonLoc+1);
  }

  if (params_for_body) {
    content = URL._encodeParams(params_for_body);
  }

  if (options.headers) {
    Object.keys(options.headers).forEach(function (key) {
      headers[key] = options.headers[key];
    });
  }

  ////////// Callback wrapping //////////

  // wrap callback to add a 'response' property on an error, in case
  // we have both (http 4xx/5xx error, which has a response payload)
  callback = (function(callback) {
    var called = false;
    return function(error, response) {
      if (! called) {
        called = true;
        if (error && response) {
          error.response = response;
        }
        callback(error, response);
      }
    };
  })(callback);

  ////////// Kickoff! //////////

  // from this point on, errors are because of something remote, not
  // something we should check in advance. Turn exceptions into error
  // results.
  try {
    // setup XHR object
    var xhr;
    if (typeof XMLHttpRequest !== "undefined")
      xhr = new XMLHttpRequest();
    else if (typeof ActiveXObject !== "undefined")
      xhr = new ActiveXObject("Microsoft.XMLHttp"); // IE6
    else
      throw new Error("Can't create XMLHttpRequest"); // ???

    xhr.open(method, url, true, username, password);

    for (var k in headers)
      xhr.setRequestHeader(k, headers[k]);


    // setup timeout
    var timed_out = false;
    var timer;
    if (options.timeout) {
      timer = Meteor.setTimeout(function() {
        timed_out = true;
        xhr.abort();
      }, options.timeout);
    };

    // callback on complete
    xhr.onreadystatechange = function(evt) {
      if (xhr.readyState === 4) { // COMPLETE
        if (timer)
          Meteor.clearTimeout(timer);

        if (timed_out) {
          callback(new Error("Connection timeout"));
        } else if (! xhr.status) {
          // no HTTP response
          callback(new Error("Connection lost"));
        } else {

          var response = {};
          response.statusCode = xhr.status;
          response.content = xhr.responseText;

          response.headers = {};
          var header_str = xhr.getAllResponseHeaders();

          // https://github.com/meteor/meteor/issues/553
          //
          // In Firefox there is a weird issue, sometimes
          // getAllResponseHeaders returns the empty string, but
          // getResponseHeader returns correct results. Possibly this
          // issue:
          // https://bugzilla.mozilla.org/show_bug.cgi?id=608735
          //
          // If this happens we can't get a full list of headers, but
          // at least get content-type so our JSON decoding happens
          // correctly. In theory, we could try and rescue more header
          // values with a list of common headers, but content-type is
          // the only vital one for now.
          if ("" === header_str && xhr.getResponseHeader("content-type"))
            header_str =
            "content-type: " + xhr.getResponseHeader("content-type");

          var headers_raw = header_str.split(/\r?\n/);
          headers_raw.forEach(function (h) {
            var m = /^(.*?):(?:\s+)(.*)$/.exec(h);
            if (m && m.length === 3) {
              response.headers[m[1].toLowerCase()] = m[2];
            }
          });

          common.populateData(response);

          var error = null;
          if (response.statusCode >= 400) {
            error = common.makeErrorByStatus(
              response.statusCode,
              response.content
            );
          }

          callback(error, response);
        }
      }
    };

    // Allow custom control over XHR and abort early.
    if (typeof options.beforeSend === "function") {
      // Call the callback and check to see if the request was aborted
      if (false === options.beforeSend.call(null, xhr, options)) {
        return xhr.abort();
      }
    }

    // send it on its way
    xhr.send(content);

  } catch (err) {
    callback(err);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"httpcall_common.js":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/http/httpcall_common.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var MAX_LENGTH = 500; // if you change this, also change the appropriate test
var slice = Array.prototype.slice;

exports.makeErrorByStatus = function(statusCode, content) {
  var message = "failed [" + statusCode + "]";

  if (content) {
    var stringContent = typeof content == "string" ?
      content : content.toString();

    message += ' ' + truncate(stringContent.replace(/\n/g, ' '), MAX_LENGTH);
  }

  return new Error(message);
};

function truncate(str, length) {
  return str.length > length ? str.slice(0, length) + '...' : str;
}

// Fill in `response.data` if the content-type is JSON.
exports.populateData = function(response) {
  // Read Content-Type header, up to a ';' if there is one.
  // A typical header might be "application/json; charset=utf-8"
  // or just "application/json".
  var contentType = (response.headers['content-type'] || ';').split(';')[0];

  // Only try to parse data as JSON if server sets correct content type.
  if (['application/json',
       'text/javascript',
       'application/javascript',
       'application/x-javascript',
      ].indexOf(contentType) >= 0) {
    try {
      response.data = JSON.parse(response.content);
    } catch (err) {
      response.data = null;
    }
  } else {
    response.data = null;
  }
};

var HTTP = exports.HTTP = {};

/**
 * @summary Send an HTTP `GET` request. Equivalent to calling [`HTTP.call`](#http_call) with "GET" as the first argument.
 * @param {String} url The URL to which the request should be sent.
 * @param {Object} [callOptions] Options passed on to [`HTTP.call`](#http_call).
 * @param {Function} [asyncCallback] Callback that is called when the request is completed. Required on the client.
 * @locus Anywhere
 */
HTTP.get = function (/* varargs */) {
  return HTTP.call.apply(this, ["GET"].concat(slice.call(arguments)));
};

/**
 * @summary Send an HTTP `POST` request. Equivalent to calling [`HTTP.call`](#http_call) with "POST" as the first argument.
 * @param {String} url The URL to which the request should be sent.
 * @param {Object} [callOptions] Options passed on to [`HTTP.call`](#http_call).
 * @param {Function} [asyncCallback] Callback that is called when the request is completed. Required on the client.
 * @locus Anywhere
 */
HTTP.post = function (/* varargs */) {
  return HTTP.call.apply(this, ["POST"].concat(slice.call(arguments)));
};

/**
 * @summary Send an HTTP `PUT` request. Equivalent to calling [`HTTP.call`](#http_call) with "PUT" as the first argument.
 * @param {String} url The URL to which the request should be sent.
 * @param {Object} [callOptions] Options passed on to [`HTTP.call`](#http_call).
 * @param {Function} [asyncCallback] Callback that is called when the request is completed. Required on the client.
 * @locus Anywhere
 */
HTTP.put = function (/* varargs */) {
  return HTTP.call.apply(this, ["PUT"].concat(slice.call(arguments)));
};

/**
 * @summary Send an HTTP `DELETE` request. Equivalent to calling [`HTTP.call`](#http_call) with "DELETE" as the first argument. (Named `del` to avoid conflict with the Javascript keyword `delete`)
 * @param {String} url The URL to which the request should be sent.
 * @param {Object} [callOptions] Options passed on to [`HTTP.call`](#http_call).
 * @param {Function} [asyncCallback] Callback that is called when the request is completed. Required on the client.
 * @locus Anywhere
 */
HTTP.del = function (/* varargs */) {
  return HTTP.call.apply(this, ["DELETE"].concat(slice.call(arguments)));
};

/**
 * @summary Send an HTTP `PATCH` request. Equivalent to calling [`HTTP.call`](#http_call) with "PATCH" as the first argument.
 * @param {String} url The URL to which the request should be sent.
 * @param {Object} [callOptions] Options passed on to [`HTTP.call`](#http_call).
 * @param {Function} [asyncCallback] Callback that is called when the request is completed. Required on the client.
 * @locus Anywhere
 */
HTTP.patch = function (/* varargs */) {
  return HTTP.call.apply(this, ["PATCH"].concat(slice.call(arguments)));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/http/httpcall_client.js");

/* Exports */
Package._define("http", exports, {
  HTTP: HTTP
});

})();
