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
var ServerTime;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/socialize_server-time/packages/socialize_server-time.js                              //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
(function () {

/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
// packages/socialize:server-time/common/server-time.js                                    //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////
                                                                                           //
ServerTime = {                                                                             // 1
    _timeDifference: 0                                                                     // 2
};                                                                                         // 3
                                                                                           // 4
ServerTime.now = function () {                                                             // 5
    return Date.now() + this._timeDifference;                                              // 6
};                                                                                         // 7
                                                                                           // 8
ServerTime.date = function() {                                                             // 9
    return new Date(this.now());                                                           // 10
};                                                                                         // 11
/////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
// packages/socialize:server-time/client/server-time.js                                    //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////
                                                                                           //
ServerTime.init = function() {                                                             // 1
    ServerTime._diffStart = Date.now();                                                    // 2
                                                                                           // 3
    Meteor.call("socialize:getServerTime", function(error,serverTimeStamp){                // 4
        if(!error){                                                                        // 5
            var now = Date.now();                                                          // 6
            var latency = now - ServerTime._diffStart;                                     // 7
                                                                                           // 8
            ServerTime._timeDifference = serverTimeStamp + latency - now;                  // 9
        }else{                                                                             // 10
            throw(error);                                                                  // 11
        }                                                                                  // 12
    });                                                                                    // 13
};                                                                                         // 14
                                                                                           // 15
//At startup, wait a couple seconds so that we can get a more accurate latency estimation. // 16
//This is far from optimal but should work.                                                // 17
Meteor.startup(function(){                                                                 // 18
    Meteor.setTimeout(function(){                                                          // 19
        ServerTime.init();                                                                 // 20
    }, 2000);                                                                              // 21
});                                                                                        // 22
                                                                                           // 23
/////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

///////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("socialize:server-time", {
  ServerTime: ServerTime
});

})();
