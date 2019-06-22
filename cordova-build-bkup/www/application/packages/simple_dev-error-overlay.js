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
var HTTP = Package.http.HTTP;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

var require = meteorInstall({"node_modules":{"meteor":{"simple:dev-error-overlay":{"dev-error-overlay.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/simple_dev-error-overlay/dev-error-overlay.js                                                     //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
// The overlay DOM element
var overlay = null; // The HTML5 notification object

var notification = null; // The content of the overlay iframe

var errorPage = null;
var loadedConfig = loadConfig();
var soundURL = '/packages/simple_dev-error-overlay/assets/negative_beeps.mp3';
var alertSound = new Audio(soundURL); // Poll the server for error

setInterval(checkErrorState, 500); // In development mode a DDP/Websocket disconnection is likely a sign of a
// broken server. In this case we re-check the error state immediately instead
// of waiting on average 250ms (worst case 500ms).

Tracker.autorun(function () {
  if (!Meteor.status().connected) {
    checkErrorState();
  }
});

function checkErrorState() {
  HTTP.get('/', function (err, res) {
    // Don't ring the alert in case of a server disconnection. We only want to
    // alert the developer in case there is a server-side exception breaking the
    // app. If the server is not responding we assume that the developer stopped
    // it on purpose (for instance to test offline mode) and we won't do
    // anything.
    if (err) {
      return;
    }

    var isMeteorApp = res.content.indexOf('__meteor_runtime_config__') !== -1;

    if (!overlay && !isMeteorApp) {
      startErrorReport();
      runAlerts();
    } else if (overlay && !isMeteorApp && errorPage !== res.content) {
      refreshErrorReport();
      runAlerts();
    } else if (overlay && isMeteorApp) {
      stopErrorReport();
    }

    errorPage = res.content;
  });
}

function startErrorReport() {
  overlay = document.createElement('div');
  overlay.className = 'simple-dev-error-overlay'; // Templating! woo. reduce dependencies by not using React, Blaze, or Angular

  overlay.innerHTML = "\n    <div class=\"simple-dev-error-window\">\n      <div class=\"simple-dev-error-controls\">\n        <strong>simple:dev-error-overlay</strong>\n        &nbsp;|&nbsp;\n        <label>\n          <input type=\"checkbox\" id=\"simple-dev-error-play-sound\" data-config=\"playSound\" />\n          Play sound\n        </label>\n        &nbsp;\n        <label>\n          <input type=\"checkbox\" id=\"simple-dev-error-show-notif\" data-config=\"showNotif\" />\n          Show notification\n        </label>\n        &nbsp;|&nbsp;\n        Settings stored in localStorage.\n      </div>\n      <div class=\"simple-dev-error-iframe-wrapper\">\n        <iframe src=\"/\" id=\"simple-dev-error-iframe\"></iframe>\n      </div>\n    </div>\n  ";
  document.body.appendChild(overlay);
  var playSoundCheckbox = document.getElementById('simple-dev-error-play-sound');
  var showNotifCheckbox = document.getElementById('simple-dev-error-show-notif');
  [playSoundCheckbox, showNotifCheckbox].forEach(function (checkbox) {
    var configKey = checkbox.dataset.config;

    if (loadedConfig[configKey]) {
      checkbox.checked = true;
    }

    checkbox.onchange = function () {
      // Edit the config
      loadedConfig[configKey] = checkbox.checked;
      setConfig(loadedConfig); // If the sound notification was activated, play the sound as a discovery
      // mechanism.

      if (configKey === 'playSound' && checkbox.checked) {
        alertSound.play();
      }
    };
  });
} // If we are already reporting an error in the overlay, and we have detected
// a new error on the server, we need refresh the iframe.


function refreshErrorReport() {
  var iframe = document.getElementById('simple-dev-error-iframe');
  ;
  iframe.src = iframe.src;
}

function stopErrorReport() {
  if (overlay) {
    document.body.removeChild(overlay);
    overlay = null;
    errorPage = null;
    Meteor.reconnect();
  }

  if (notification) {
    notification.close();
    notification = null;
  }
}

function runAlerts() {
  if (loadedConfig.showNotif) {
    notifyError('Build error in your app!');
  }

  if (loadedConfig.playSound) {
    alertSound.play();
  }
} // Mostly lifted from https://developer.mozilla.org/en-US/docs/Web/API/notification


function notifyError(message) {
  if (notification) {
    // Already displaying a notification
    return;
  }

  var createNotification = function () {
    var options = {
      body: 'From simple:dev-error-overlay',
      // Prevents notification from showing twice for the same app if you have
      // multiple tabs open
      tag: window.location.host + 'simple:dev-error-overlay'
    };
    notification = new Notification(message, options);

    notification.onclick = function () {
      window.focus();
    };
  }; // Let's check if the browser supports notifications


  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      createNotification();
    } // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            createNotification();
          }
        });
      } // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.

}

function loadConfig() {
  var config = localStorage.simpleDevErrorOverlayConfig;

  if (!config) {
    config = {
      playSound: false,
      showNotif: false
    };
  } else {
    try {
      config = JSON.parse(config);
    } catch (e) {
      // Malformed JSON there, fix it!
      config = {
        playSound: false,
        showNotif: false
      };
      localStorage.simpleDevErrorOverlayConfig = JSON.stringify(config);
    }
  }

  return config;
}

function setConfig(config) {
  localStorage.simpleDevErrorOverlayConfig = JSON.stringify(config);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".less"
  ]
});

require("/node_modules/meteor/simple:dev-error-overlay/dev-error-overlay.js");

/* Exports */
Package._define("simple:dev-error-overlay");

})();
