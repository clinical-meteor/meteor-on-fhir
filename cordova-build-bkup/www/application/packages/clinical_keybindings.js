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
var Session = Package.session.Session;
var Mousetrap = Package['mousetrap:mousetrap'].Mousetrap;
var WebApp = Package.webapp.WebApp;
var Log = Package.logging.Log;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
var DDP = Package['ddp-client'].DDP;
var Mongo = Package.mongo.Mongo;
var Blaze = Package.ui.Blaze;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var Template = Package['templating-runtime'].Template;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var FastClick = Package.fastclick.FastClick;
var LaunchScreen = Package['launch-screen'].LaunchScreen;
var HTML = Package.htmljs.HTML;

(function(){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/clinical_keybindings/client/keybindings.js                    //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
Meteor.startup(function() {
  //console.log('Configuring keybindings...');

  Session.setDefault('show_keybindings', false);
  Session.setDefault('mainPanelIsCard', true);

  Session.setDefault('showSearchbar', false);
  Session.setDefault('showNavbars', true);
  Session.setDefault('showSidebar', false);

  Session.setDefault('showAccountCard', false);
  Session.setDefault('showRightCard', false);

  Session.setDefault('showAlert', false);

  Session.setDefault('useHierarchicalLayout', false);

  Session.setDefault('hasPageVerticalPadding', true);
  Session.setDefault("hasFooterPadding", false);
  Session.setDefault("wideSecondPanel", false);

  Session.setDefault('searchPanelVisible', false);
  Session.setDefault('secondPanelVisible', false);
  Session.setDefault('thirdPanelVisible', false);
  Session.setDefault("showOrbital", false);


  Session.setDefault('zoom', 100);

  Mousetrap.bind('ctrl+command+3', function() {
    Session.toggle('thirdPanelVisible');
  });
  Mousetrap.bind('ctrl+command+2', function() {
    Session.toggle('secondPanelVisible');
  });
  Mousetrap.bind('ctrl+command+1', function() {
    Session.toggle('searchPanelVisible');
  });

  Mousetrap.bind('ctrl+command+t', function() {
    Session.toggle('showThemingControls');
  });
  Mousetrap.bind('ctrl+command+k', function() {
    Session.toggle('show_keybindings');
    Session.toggle('showReactiveOverlay');
  });
  Mousetrap.bind('ctrl+command+l', function() {
    Session.toggle('showInboxCard');
    Session.toggle('showOutboxCard');
    Session.toggle('showFormBuilderCard');
  });
  Mousetrap.bind('ctrl+command+i', function() {
    Session.toggle('showInboxCard');
  });
  Mousetrap.bind('ctrl+command+r', function() {
    Session.toggle('showAccountCard');
    Session.toggle('showRightCard');
  });
  Mousetrap.bind('ctrl+command+n', function() {
    Session.toggle('showNavbars');
  });
  // Mousetrap.bind('ctrl+command+m', function () {
  //   Session.toggle('showSidebar');
  // });
  Mousetrap.bind('ctrl+command+s', function() {
    Session.toggle('showSearchbar');
  });
  Mousetrap.bind('ctrl+command+a', function() {
    Session.toggle('showAlert');
    // Session.toggle('useHierarchicalLayout');
  });
  Mousetrap.bind('ctrl+command+c', function() {
    Session.toggle('mainPanelIsCard');
  });
  Mousetrap.bind('ctrl+command+w', function() {
    Session.toggle('wideCard');
  });

  Mousetrap.bind('ctrl+command+y', function() {
    Session.toggle('showOutboxCard');
    Session.toggle('outboxCardOpen');
  });
  Mousetrap.bind('ctrl+command+g', function() {
    Session.toggle('hasPageBorder');
  });
  Mousetrap.bind('ctrl+command+p', function() {
    Session.toggle('hasPagePadding');
  });
  Mousetrap.bind('ctrl+command+o', function() {
    Session.toggle('isWideHorizontally');
  });

  Mousetrap.bind('ctrl+command+q', function() {
    Session.toggle('navIsFullscreen');
  });

  Mousetrap.bind('ctrl+command+j', function() {
    Session.toggle('pageIsWide');
  });
  Mousetrap.bind('ctrl+command+r', function() {
    Session.toggle('sidebarPinned');  // this is the sidebar on the right
    //Session.toggle('useCardLayout');
  });
  Mousetrap.bind('ctrl+command+m', function() {
    Session.toggle('hasPageVerticalPadding');
  });
  Mousetrap.bind('ctrl+command+f', function() {
    Session.toggle('useVerticalFences');
  });
  Mousetrap.bind('ctrl+command+h', function() {
    Session.toggle('useHorizontalFences');
  });

  Mousetrap.bind('ctrl+command+b', function() {
    Session.toggle('appSurfaceOffset');
  });
  Mousetrap.bind('ctrl+command+e', function() {
    Session.toggle('useEastFence');
  });

  Mousetrap.bind('ctrl+command+z', function() {
    Session.toggle('hasFooterPadding');
  });
  Mousetrap.bind('ctrl+command+x', function() {
    Session.toggle('wideSecondPanel');
  });
  Mousetrap.bind('ctrl+command+v', function() {
    Session.toggle('showVideoBackground');
  });

  Mousetrap.bind('ctrl+command+=', function() {
    Session.set('zoom', Session.get('zoom') + 10);
    console.log('zoom', Session.get('zoom') + "%");
  });
  Mousetrap.bind('ctrl+command+-', function() {
    Session.set('zoom', Session.get('zoom') - 10);
    console.log('zoom', Session.get('zoom') + "%");
  });


  Mousetrap.bind('ctrl+shift+o', function() {
    Session.toggle('showOrbital');
  });  
});


////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("clinical:keybindings");

})();
