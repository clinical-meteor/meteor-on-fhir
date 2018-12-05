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

/* Package-scope variables */
var LaunchScreen;

(function(){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/launch-screen/mobile-launch-screen.js                         //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
// XXX This currently implements loading screens for mobile apps only,
// but in the future can be expanded to all apps.

var holdCount = 0;
var alreadyHidden = false;

LaunchScreen = {
  hold: function () {
    if (! Meteor.isCordova) {
      return {
        release: function () { /* noop */ }
      };
    }

    if (alreadyHidden) {
      throw new Error("Can't show launch screen once it's hidden");
    }

    holdCount++;

    var released = false;
    var release = function () {
      if (! Meteor.isCordova)
        return;

      if (! released) {
        released = true;
        holdCount--;
        if (holdCount === 0 &&
            typeof navigator !== 'undefined' && navigator.splashscreen) {
          alreadyHidden = true;
          navigator.splashscreen.hide();
        }
      }
    };

    // Returns a launch screen handle with a release method
    return {
      release: release
    };
  }
};

////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/launch-screen/default-behavior.js                             //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
// Hold launch screen on app load. This reflects the fact that Meteor
// mobile apps that use this package always start with a launch screen
// visible. (see XXX comment at the top of package.js for more
// details)
var handle = LaunchScreen.hold();

var Template = Package.templating && Package.templating.Template;

Meteor.startup(function () {
  if (! Template) {
    handle.release();
  } else if (Package['iron:router']) {
    // XXX Instead of doing this here, this code should be in
    // iron:router directly. Note that since we're in a
    // `Meteor.startup` block it's ok that we don't have a
    // weak dependency on iron:router in package.js.
    Package['iron:router'].Router.onAfterAction(function () {
      handle.release();
    });
  } else {
    Template.body.onRendered(function () {
      handle.release();
    });

    // In case `Template.body` never gets rendered (due to some bug),
    // hide the launch screen after 6 seconds. This matches the
    // observed timeout that Cordova apps on Android (but not iOS)
    // have on hiding the launch screen (even if you don't call
    // `navigator.splashscreen.hide()`)
    setTimeout(function () {
      handle.release();
    }, 6000);
  }
});

////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("launch-screen", {
  LaunchScreen: LaunchScreen
});

})();
