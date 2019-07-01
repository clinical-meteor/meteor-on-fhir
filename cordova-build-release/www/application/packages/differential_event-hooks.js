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
var Hooks, EventHooksMonitoringCollection;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/differential_event-hooks/packages/differential_event-hoo //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/differential:event-hooks/client.js                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
//////////////////////////////////                                                                                    // 1
//= SETUP HOOKS OBJECT                                                                                                // 2
//////////////////////////////////                                                                                    // 3
                                                                                                                      // 4
Hooks = {                                                                                                             // 5
	//////////////////////////////////                                                                                   // 6
	//= OPTIONS                                                                                                          // 7
	//////////////////////////////////                                                                                   // 8
                                                                                                                      // 9
	updateFocus: 0, // Number of milliseconds to wait before checking whether the window is focused                      // 10
	treatCloseAsLogout: false,                                                                                           // 11
                                                                                                                      // 12
                                                                                                                      // 13
	//////////////////////////////////                                                                                   // 14
	//= INTERNAL STATES                                                                                                  // 15
	//////////////////////////////////                                                                                   // 16
                                                                                                                      // 17
	focused: true,                                                                                                       // 18
	loggedIn: false,                                                                                                     // 19
	lastUserId: null,                                                                                                    // 20
                                                                                                                      // 21
                                                                                                                      // 22
	//////////////////////////////////                                                                                   // 23
	//= METHODS                                                                                                          // 24
	//////////////////////////////////                                                                                   // 25
	checkFocus: function () {                                                                                            // 26
		// Check if the window is currently focused                                                                         // 27
		if (document.hasFocus() && Hooks.focused === false) {                                                               // 28
			// We've gained focus                                                                                              // 29
			Hooks.focused = true;                                                                                              // 30
			if (typeof Hooks.onGainFocus !== undefined) Hooks.onGainFocus(); // Fire the event on the client                   // 31
			Meteor.call('eventsOnGainFocus'); // Fire the event on the server                                                  // 32
		} else if (! document.hasFocus() && Hooks.focused === true) {                                                       // 33
			// We've lost focus                                                                                                // 34
			Hooks.focused = false;                                                                                             // 35
			if (typeof Hooks.onLoseFocus !== undefined) Hooks.onLoseFocus(); // Fire the event on the client                   // 36
			Meteor.call('eventsOnLoseFocus'); // Fire the event on the server                                                  // 37
		}                                                                                                                   // 38
	},                                                                                                                   // 39
	init: function (options) {                                                                                           // 40
		//////////////////////////////////                                                                                  // 41
		//= BASIC INITIALIZATION                                                                                            // 42
		//////////////////////////////////                                                                                  // 43
                                                                                                                      // 44
		// Initialize options                                                                                               // 45
		if (typeof options !== 'undefined') {                                                                               // 46
			if (options.updateFocus) Hooks.updateFocus = options.updateFocus;                                                  // 47
			if (options.treatCloseAsLogout) Hooks.treatCloseAsLogout = options.treatCloseAsLogout;                             // 48
		}                                                                                                                   // 49
                                                                                                                      // 50
                                                                                                                      // 51
		//////////////////////////////////                                                                                  // 52
		//= INITIALIZE CLIENT EVENTS                                                                                        // 53
		//////////////////////////////////                                                                                  // 54
                                                                                                                      // 55
		// Start checking for focus if a truthy integer is given                                                            // 56
		if (Hooks.updateFocus != false) {                                                                                   // 57
			Meteor.setInterval(Hooks.checkFocus, Hooks.updateFocus);                                                           // 58
		}                                                                                                                   // 59
                                                                                                                      // 60
		// Close window/tab                                                                                                 // 61
		window.onbeforeunload = function() {                                                                                // 62
			Meteor.call('eventsOnCloseSession'); // Fire the event on the server                                               // 63
                                                                                                                      // 64
			// If we're treating close as logout, fire the logout event as well                                                // 65
			if (Hooks.treatCloseAsLogout === true) {                                                                           // 66
				Meteor.call('eventsOnLoggedOut', Hooks.lastUserId); // Fire the event on the server                               // 67
			}                                                                                                                  // 68
		}                                                                                                                   // 69
                                                                                                                      // 70
                                                                                                                      // 71
                                                                                                                      // 72
		//////////////////////////////////                                                                                  // 73
		//= SETUP LOGIN MONITORING                                                                                          // 74
		//////////////////////////////////                                                                                  // 75
                                                                                                                      // 76
		Deps.autorun(function () {                                                                                          // 77
			if (Meteor.userId()) {                                                                                             // 78
				// User is logged in                                                                                              // 79
				if (Hooks.loggedIn === false) {                                                                                   // 80
					// Update the latest user id                                                                                     // 81
					Hooks.lastUserId = Meteor.userId();                                                                              // 82
					// User wasn't logged in before this updated, so fire the loggedIn event                                         // 83
					if (typeof Hooks.onLoggedIn !== undefined) Hooks.onLoggedIn(); // Fire the event on the client                   // 84
					Meteor.call('eventsOnLoggedIn'); // Fire the event on the server                                                 // 85
				}                                                                                                                 // 86
                                                                                                                      // 87
				Hooks.loggedIn = true; // Now set the proper state                                                                // 88
			} else {                                                                                                           // 89
				// There is no user logged in right now                                                                           // 90
				if (Hooks.loggedIn === true) {                                                                                    // 91
					// User was logged in before this updated, so fire the loggedOut event                                           // 92
					if (typeof Hooks.onLoggedOut !== undefined) Hooks.onLoggedOut(Hooks.lastUserId); // Fire the event on the client // 93
					Meteor.call('eventsOnLoggedOut', Hooks.lastUserId); // Fire the event on the server                              // 94
				}                                                                                                                 // 95
                                                                                                                      // 96
				Hooks.loggedIn = false; // Now set the proper state                                                               // 97
			}                                                                                                                  // 98
		});                                                                                                                 // 99
	},                                                                                                                   // 100
                                                                                                                      // 101
	//////////////////////////////////                                                                                   // 102
	//= DEFINE API METHODS                                                                                               // 103
	//////////////////////////////////                                                                                   // 104
	onLoseFocus:    function(){},                                                                                        // 105
	onGainFocus:    function(){},                                                                                        // 106
	onCloseSession: function(){},                                                                                        // 107
	onLoggedIn:     function(){},                                                                                        // 108
	onLoggedOut:    function(){}                                                                                         // 109
};                                                                                                                    // 110
                                                                                                                      // 111
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/differential:event-hooks/common.js                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// We define this collection as a hack-ish way of                                                                     // 1
// triggering updates on the client from the server                                                                   // 2
EventHooksMonitoringCollection = new Meteor.Collection('eventHooksMonitoringCollection');                             // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("differential:event-hooks", {
  Hooks: Hooks,
  EventHooksMonitoringCollection: EventHooksMonitoringCollection
});

})();
