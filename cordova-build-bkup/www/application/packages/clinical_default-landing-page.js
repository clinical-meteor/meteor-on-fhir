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
var ReactMeteorData = Package['react-meteor-data'].ReactMeteorData;
var Session = Package.session.Session;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var WebApp = Package.webapp.WebApp;
var DDP = Package['ddp-client'].DDP;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;
var Autoupdate = Package.autoupdate.Autoupdate;
var Reload = Package.reload.Reload;

/* Package-scope variables */
var LandingPageConfig;

var require = meteorInstall({"node_modules":{"meteor":{"clinical:default-landing-page":{"lib":{"LandingPage.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/clinical_default-landing-page/lib/LandingPage.js                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.exportDefault(LandingPageConfig = {});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"index.jsx":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/clinical_default-landing-page/index.jsx                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({
  DynamicRoutes: function () {
    return DynamicRoutes;
  },
  LandingPage: function () {
    return LandingPage;
  }
});
var LandingPage;
module.link("./client/LandingPage.jsx", {
  "default": function (v) {
    LandingPage = v;
  }
}, 0);
var FhirCachingLayerIntroPage;
module.link("./client/FhirCachingLayerIntroPage.jsx", {
  "default": function (v) {
    FhirCachingLayerIntroPage = v;
  }
}, 1);
var DynamicRoutes = [{
  'name': 'LandingPage',
  'path': '/landing-page',
  'component': LandingPage
}, {
  'name': 'TutorialBoardPage',
  'path': '/tutorial-board',
  'component': LandingPage
}];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"client":{"FhirCachingLayerIntroPage.jsx":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/clinical_default-landing-page/client/FhirCachingLayerIntroPage.jsx                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  FhirCachingLayerIntroPage: function () {
    return FhirCachingLayerIntroPage;
  }
});
var Col, Grid, Row;
module.link("react-bootstrap", {
  Col: function (v) {
    Col = v;
  },
  Grid: function (v) {
    Grid = v;
  },
  Row: function (v) {
    Row = v;
  }
}, 0);
var Avatar, Card, CardHeader, CardText, CardTitle, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn;
module.link("material-ui", {
  Avatar: function (v) {
    Avatar = v;
  },
  Card: function (v) {
    Card = v;
  },
  CardHeader: function (v) {
    CardHeader = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  },
  Table: function (v) {
    Table = v;
  },
  TableBody: function (v) {
    TableBody = v;
  },
  TableHeader: function (v) {
    TableHeader = v;
  },
  TableHeaderColumn: function (v) {
    TableHeaderColumn = v;
  },
  TableRow: function (v) {
    TableRow = v;
  },
  TableRowColumn: function (v) {
    TableRowColumn = v;
  }
}, 1);
var FullPageCanvas, GlassCard;
module.link("meteor/clinical:glass-ui", {
  FullPageCanvas: function (v) {
    FullPageCanvas = v;
  },
  GlassCard: function (v) {
    GlassCard = v;
  }
}, 2);
var OrbitalGlyph;
module.link("../components/orbital/OrbitalGlyph", {
  "default": function (v) {
    OrbitalGlyph = v;
  }
}, 3);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 4);
var height = window.innerHeight;

var FhirCachingLayerIntroPage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(FhirCachingLayerIntroPage, _React$Component);

  function FhirCachingLayerIntroPage(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      selected: [],
      description: ''
    };
    return _this;
  }

  var _proto = FhirCachingLayerIntroPage.prototype;

  _proto.isSelected = function () {
    function isSelected(index) {
      return this.state.selected.indexOf(index) !== -1;
    }

    return isSelected;
  }();

  _proto.handleRowSelection = function () {
    function handleRowSelection(selectedRows) {
      this.state.selected = selectedRows;
      console.log('this.state', this.state);
    }

    return handleRowSelection;
  }();

  _proto.scrollToDynamicText = function () {
    function scrollToDynamicText() {// scrolltoElement({
      //   element: document.querySelector('#dynamicText'),
      //   offset: -100, // default is 0 
      //   bezier: [0.19, 1, 0.22, 1], // default is [0.19, 1, 0.22, 1] 
      //   duration: 1000, // default is 100 
      //   then () {
      //     console.log('Finished~')
      //   }
      // });    
    }

    return scrollToDynamicText;
  }();

  _proto.scrollToCore = function () {
    function scrollToCore() {// scrolltoElement({
      //   element: document.querySelector('#coreModule'),
      //   offset: -100, // default is 0 
      //   bezier: [0.19, 1, 0.22, 1], // default is [0.19, 1, 0.22, 1] 
      //   duration: 1000, // default is 100 
      //   then () {
      //     console.log('Finished~')
      //   }
      // });    
    }

    return scrollToCore;
  }();

  _proto.scrollToArchitectureCard = function () {
    function scrollToArchitectureCard() {// scrolltoElement({
      //   element: document.querySelector('#architectureCard'),
      //   offset: -100, // default is 0 
      //   bezier: [0.19, 1, 0.22, 1], // default is [0.19, 1, 0.22, 1] 
      //   duration: 1000, // default is 100 
      //   then () {
      //     console.log('Finished~')
      //   }
      // });
    }

    return scrollToArchitectureCard;
  }();

  _proto.scrollToMeaningfulUse = function () {
    function scrollToMeaningfulUse() {// scrolltoElement({
      //   element: document.querySelector('#meaningfulUseCard'),
      //   offset: -100, // default is 0 
      //   bezier: [0.19, 1, 0.22, 1], // default is [0.19, 1, 0.22, 1] 
      //   duration: 1000, // default is 100 
      //   then () {
      //     console.log('Finished~')
      //   }
      // });    
    }

    return scrollToMeaningfulUse;
  }();

  _proto.scrollToPremiumModule = function () {
    function scrollToPremiumModule() {// scrolltoElement({
      //   element: document.querySelector('#premiumModulesCard'),
      //   offset: -100, // default is 0 
      //   bezier: [0.19, 1, 0.22, 1], // default is [0.19, 1, 0.22, 1] 
      //   duration: 1000, // default is 100 
      //   then () {
      //     console.log('Finished~')
      //   }
      // });        
    }

    return scrollToPremiumModule;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        id: "FhirCachingLayerIntroPage"
      }, React.createElement(FullPageCanvas, {
        width: "wide"
      }, React.createElement(GlassCard, {
        id: "architectureCard",
        style: {
          height: '100%'
        },
        onClick: this.scrollToMeaningfulUse
      }, React.createElement(CardTitle, {
        title: "Getting Started",
        subtitle: "Welcome to Meteor on FHIR.  This is the default landing page.  Please read through the following materials to get started.",
        style: {
          textAlign: 'center'
        }
      }), React.createElement(CardText, {
        style: {
          textAlign: 'center',
          height: window.innerHeight - 260
        }
      }, React.createElement(Row, null, React.createElement(Col, {
        mdOffset: 3,
        md: 6,
        style: {
          textAlign: 'center'
        }
      }, React.createElement("ul", {
        style: {
          textAlign: 'left'
        }
      }, React.createElement("li", null, "Read the ", React.createElement("a", {
        href: "https://github.com/clinical-meteor/meteor-on-fhir"
      }, "Meteor on FHIR README"), "."), React.createElement("li", null, "Read through the ", React.createElement("a", {
        href: "https://github.com/clinical-meteor/software-development-kit/blob/master/documentation/getting.started.md"
      }, "Clinical Meteor Quickstart to set up your development environment."), " "), React.createElement("li", null, "Familiarize yourself with the ", React.createElement("a", {
        href: "https://guide.meteor.com/"
      }, "Meteor Guide"), " to get started with developing Meteor."), React.createElement("li", null, "Reference the ", React.createElement("a", {
        href: "https://github.com/clinical-meteor/software-development-kit"
      }, "Software Development Kit as needed."), " "), React.createElement("li", null, "Update the ", React.createElement("a", {
        href: "https://github.com/clinical-meteor/meteor-on-fhir/blob/development/webapp/packages/plugin-default-landing-page/client/FullPageCanvas.jsx"
      }, "Landing Page"), " and replace with your custom content."), React.createElement("li", null, "Copy and modify the ", React.createElement("a", {
        href: "https://github.com/clinical-meteor/meteor-on-fhir/tree/development/webapp/packages/plugin-default-landing-page"
      }, "Default Landing Page Plugin"), " to create your first plugin.")))))), React.createElement("br", null), React.createElement("br", null), React.createElement("br", null), React.createElement("br", null)));
    }

    return render;
  }();

  return FhirCachingLayerIntroPage;
}(React.Component);

module.exportDefault(FhirCachingLayerIntroPage);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"LandingPage.jsx":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/clinical_default-landing-page/client/LandingPage.jsx                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  LandingPage: function () {
    return LandingPage;
  }
});
var Col, Grid, Row;
module.link("react-bootstrap", {
  Col: function (v) {
    Col = v;
  },
  Grid: function (v) {
    Grid = v;
  },
  Row: function (v) {
    Row = v;
  }
}, 0);
var Avatar, Card, CardHeader, CardText, CardTitle, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn;
module.link("material-ui", {
  Avatar: function (v) {
    Avatar = v;
  },
  Card: function (v) {
    Card = v;
  },
  CardHeader: function (v) {
    CardHeader = v;
  },
  CardText: function (v) {
    CardText = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  },
  Table: function (v) {
    Table = v;
  },
  TableBody: function (v) {
    TableBody = v;
  },
  TableHeader: function (v) {
    TableHeader = v;
  },
  TableHeaderColumn: function (v) {
    TableHeaderColumn = v;
  },
  TableRow: function (v) {
    TableRow = v;
  },
  TableRowColumn: function (v) {
    TableRowColumn = v;
  }
}, 1);
var FullPageCanvas, GlassCard, DynamicSpacer;
module.link("meteor/clinical:glass-ui", {
  FullPageCanvas: function (v) {
    FullPageCanvas = v;
  },
  GlassCard: function (v) {
    GlassCard = v;
  },
  DynamicSpacer: function (v) {
    DynamicSpacer = v;
  }
}, 2);
var OrbitalGlyph;
module.link("../components/orbital/OrbitalGlyph", {
  "default": function (v) {
    OrbitalGlyph = v;
  }
}, 3);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 4);
var height = window.innerHeight;

var LandingPage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(LandingPage, _React$Component);

  function LandingPage(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      selected: [],
      description: ''
    };
    return _this;
  }

  var _proto = LandingPage.prototype;

  _proto.isSelected = function () {
    function isSelected(index) {
      return this.state.selected.indexOf(index) !== -1;
    }

    return isSelected;
  }();

  _proto.handleRowSelection = function () {
    function handleRowSelection(selectedRows) {
      this.state.selected = selectedRows;
      console.log('this.state', this.state);
    }

    return handleRowSelection;
  }();

  _proto.scrollToDynamicText = function () {
    function scrollToDynamicText() {// scrolltoElement({
      //   element: document.querySelector('#dynamicText'),
      //   offset: -100, // default is 0 
      //   bezier: [0.19, 1, 0.22, 1], // default is [0.19, 1, 0.22, 1] 
      //   duration: 1000, // default is 100 
      //   then () {
      //     console.log('Finished~')
      //   }
      // });    
    }

    return scrollToDynamicText;
  }();

  _proto.scrollToCore = function () {
    function scrollToCore() {// scrolltoElement({
      //   element: document.querySelector('#coreModule'),
      //   offset: -100, // default is 0 
      //   bezier: [0.19, 1, 0.22, 1], // default is [0.19, 1, 0.22, 1] 
      //   duration: 1000, // default is 100 
      //   then () {
      //     console.log('Finished~')
      //   }
      // });    
    }

    return scrollToCore;
  }();

  _proto.scrollToArchitectureCard = function () {
    function scrollToArchitectureCard() {// scrolltoElement({
      //   element: document.querySelector('#architectureCard'),
      //   offset: -100, // default is 0 
      //   bezier: [0.19, 1, 0.22, 1], // default is [0.19, 1, 0.22, 1] 
      //   duration: 1000, // default is 100 
      //   then () {
      //     console.log('Finished~')
      //   }
      // });
    }

    return scrollToArchitectureCard;
  }();

  _proto.scrollToMeaningfulUse = function () {
    function scrollToMeaningfulUse() {// scrolltoElement({
      //   element: document.querySelector('#meaningfulUseCard'),
      //   offset: -100, // default is 0 
      //   bezier: [0.19, 1, 0.22, 1], // default is [0.19, 1, 0.22, 1] 
      //   duration: 1000, // default is 100 
      //   then () {
      //     console.log('Finished~')
      //   }
      // });    
    }

    return scrollToMeaningfulUse;
  }();

  _proto.scrollToPremiumModule = function () {
    function scrollToPremiumModule() {// scrolltoElement({
      //   element: document.querySelector('#premiumModulesCard'),
      //   offset: -100, // default is 0 
      //   bezier: [0.19, 1, 0.22, 1], // default is [0.19, 1, 0.22, 1] 
      //   duration: 1000, // default is 100 
      //   then () {
      //     console.log('Finished~')
      //   }
      // });        
    }

    return scrollToPremiumModule;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        id: "LandingPage"
      }, React.createElement(FullPageCanvas, {
        width: "wide"
      }, React.createElement(Row, null, React.createElement(Col, {
        md: 4
      }, React.createElement(GlassCard, {
        id: "importCcd",
        onClick: this.scrollToMeaningfulUse
      }, React.createElement(CardTitle, {
        title: "Welcome!",
        style: {
          textAlign: 'left'
        }
      }), React.createElement(CardText, {
        style: {
          textAlign: 'left'
        }
      }, React.createElement(Row, null))), React.createElement(DynamicSpacer, null), React.createElement(GlassCard, {
        id: "security",
        onClick: this.scrollToMeaningfulUse
      }, React.createElement(CardTitle, {
        title: "Security:  Enable FileVault",
        style: {
          textAlign: 'left'
        }
      }), React.createElement(CardText, {
        style: {
          textAlign: 'left'
        }
      }, React.createElement("img", {
        src: "/packages/clinical_default-landing-page/assets/FileVaultOff.png",
        style: {
          width: '100%'
        }
      }))), React.createElement(DynamicSpacer, null), React.createElement(GlassCard, {
        id: "importCcd",
        onClick: this.scrollToMeaningfulUse
      }, React.createElement(CardTitle, {
        title: "Data:  Importing a Continuity of Care Document",
        style: {
          textAlign: 'left'
        }
      }), React.createElement(CardText, {
        style: {
          textAlign: 'left'
        }
      }, React.createElement(Row, null, React.createElement(Col, {
        mdOffset: 3,
        md: 6,
        style: {
          textAlign: 'left'
        }
      })))), React.createElement(DynamicSpacer, null)), React.createElement(Col, {
        md: 4
      }, React.createElement(GlassCard, {
        id: "importFacebookProfile",
        onClick: this.scrollToMeaningfulUse
      }, React.createElement(CardTitle, {
        title: "Data: Exporting a Facebook Profile",
        style: {
          textAlign: 'left'
        }
      }), React.createElement(CardText, {
        style: {
          textAlign: 'left'
        }
      }, React.createElement("img", {
        src: "/packages/clinical_default-landing-page/assets/FacebookExport.png",
        style: {
          width: '100%',
          filter: 'drop-shadow(4px 4px 5px lightgray)',
          marginLeft: '10px',
          marginRight: '10px'
        }
      }))), React.createElement(DynamicSpacer, null), React.createElement(GlassCard, {
        id: "importCcd",
        onClick: this.scrollToMeaningfulUse
      }, React.createElement(CardTitle, {
        title: "Data:  Importing a Facebook Profile",
        style: {
          textAlign: 'left'
        }
      }), React.createElement(CardText, {
        style: {
          textAlign: 'left'
        }
      }, React.createElement(Row, null, React.createElement(Col, {
        mdOffset: 3,
        md: 6,
        style: {
          textAlign: 'left'
        }
      }))))), React.createElement(Col, {
        md: 4
      }, React.createElement(GlassCard, {
        id: "writingPlugins",
        onClick: this.scrollToMeaningfulUse
      }, React.createElement(CardTitle, {
        title: "Writing A Plugin",
        subtitle: "Welcome to Meteor on FHIR.  This is the default landing page.  Please read through the following materials to get started.",
        style: {
          textAlign: 'left'
        }
      }), React.createElement(CardText, {
        style: {
          textAlign: 'left'
        }
      }, React.createElement("ul", {
        style: {
          textAlign: 'left'
        }
      }, React.createElement("li", null, "Read the ", React.createElement("a", {
        href: "https://github.com/clinical-meteor/meteor-on-fhir"
      }, "Meteor on FHIR README"), "."), React.createElement("li", null, "Read through the ", React.createElement("a", {
        href: "https://github.com/clinical-meteor/software-development-kit/blob/master/documentation/getting.started.md"
      }, "Clinical Meteor Quickstart to set up your development environment."), " "), React.createElement("li", null, "Familiarize yourself with the ", React.createElement("a", {
        href: "https://guide.meteor.com/"
      }, "Meteor Guide"), " to get started with developing Meteor."), React.createElement("li", null, "Reference the ", React.createElement("a", {
        href: "https://github.com/clinical-meteor/software-development-kit"
      }, "Software Development Kit as needed."), " "), React.createElement("li", null, "Update the ", React.createElement("a", {
        href: "https://github.com/clinical-meteor/meteor-on-fhir/blob/development/webapp/packages/plugin-default-landing-page/client/FullPageCanvas.jsx"
      }, "Landing Page"), " and replace with your custom content."), React.createElement("li", null, "Copy and modify the ", React.createElement("a", {
        href: "https://github.com/clinical-meteor/meteor-on-fhir/tree/development/webapp/packages/plugin-default-landing-page"
      }, "Default Landing Page Plugin"), " to create your first plugin.")))))), React.createElement("br", null), React.createElement("br", null), React.createElement("br", null), React.createElement("br", null)));
    }

    return render;
  }();

  return LandingPage;
}(React.Component);

module.exportDefault(LandingPage);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"components":{"orbital":{"OrbitalGlyph.jsx":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/clinical_default-landing-page/components/orbital/OrbitalGlyph.jsx                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

module.export({
  circle34: function () {
    return circle34;
  },
  circle14: function () {
    return circle14;
  },
  circle14striped: function () {
    return circle14striped;
  }
});
var Fade, GradientBackground, Parallax, Rotator, Scale, TrackingTiltPlane, Translate, View, Zoom, utils;
module.link("react-scifi", {
  Fade: function (v) {
    Fade = v;
  },
  GradientBackground: function (v) {
    GradientBackground = v;
  },
  Parallax: function (v) {
    Parallax = v;
  },
  Rotator: function (v) {
    Rotator = v;
  },
  Scale: function (v) {
    Scale = v;
  },
  TrackingTiltPlane: function (v) {
    TrackingTiltPlane = v;
  },
  Translate: function (v) {
    Translate = v;
  },
  View: function (v) {
    View = v;
  },
  Zoom: function (v) {
    Zoom = v;
  },
  utils: function (v) {
    utils = v;
  }
}, 0);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 1);
var color;
module.link("onecolor", {
  "default": function (v) {
    color = v;
  }
}, 2);
var createReactClass;
module.link("create-react-class", {
  "default": function (v) {
    createReactClass = v;
  }
}, 3);

function circle34(fillColor) {
  return React.createElement("svg", {
    width: "200px",
    height: "200px",
    viewBox: "0 0 100 100",
    x: "0px",
    y: "0px"
  }, React.createElement("path", {
    fill: fillColor,
    d: "M98.785,48.516C98.8,49.01,98.823,49.502,98.823,50c0,26.921-21.902,48.823-48.823,48.823 C23.079,98.823,1.177,76.921,1.177,50C1.177,23.079,23.079,1.177,50,1.177c8.847,0,17.146,2.378,24.311,6.51l0.595-1.016 C67.565,2.437,59.064,0,50,0C22.43,0,0,22.43,0,50s22.43,50,50,50s50-22.43,50-50c0-0.519-0.022-1.032-0.039-1.547L98.785,48.516z"
  }));
}

function circle14(fillColor) {
  return React.createElement("svg", {
    width: "200px",
    height: "200px",
    viewBox: "0 0 100 100",
    x: "0px",
    y: "0px"
  }, React.createElement("path", {
    fill: fillColor,
    d: "M91.391,50c0,22.859-18.531,41.391-41.391,41.391V100c27.614,0,50-22.386,50-50c0-7.871-1.824-15.314-5.064-21.938 l-7.737,3.777C89.881,37.323,91.391,43.484,91.391,50z"
  }));
}

function circle14striped(fillColor) {
  return React.createElement("svg", {
    width: "200px",
    height: "200px",
    viewBox: "0 0 100 100",
    x: "0px",
    y: "0px"
  }, React.createElement("g", {
    fill: fillColor
  }, React.createElement("path", {
    d: "M63.334,89.183c-0.219,0.074-0.438,0.151-0.658,0.223l2.562,8.222c0.316-0.102,0.629-0.212,0.943-0.319L63.334,89.183z"
  }), React.createElement("path", {
    d: "M66.038,88.167c-0.213,0.089-0.431,0.168-0.646,0.255l3.129,8.02c0.308-0.123,0.621-0.236,0.926-0.365L66.038,88.167z"
  }), React.createElement("path", {
    d: "M59.164,90.359c-0.226,0.052-0.449,0.109-0.677,0.156l1.689,8.445c0.326-0.067,0.646-0.15,0.97-0.224L59.164,90.359z"
  }), React.createElement("path", {
    d: "M74.791,83.146c-0.185,0.139-0.377,0.269-0.564,0.404l4.976,7.023c0.269-0.193,0.542-0.382,0.808-0.581L74.791,83.146z"
  }), React.createElement("path", {
    d: "M61.959,89.629c-0.221,0.066-0.445,0.127-0.668,0.189l2.273,8.304c0.319-0.09,0.641-0.176,0.958-0.271L61.959,89.629z"
  }), React.createElement("path", {
    d: "M60.57,90.023c-0.224,0.059-0.449,0.112-0.675,0.168l1.982,8.377c0.323-0.078,0.646-0.156,0.966-0.241L60.57,90.023z"
  }), React.createElement("path", {
    d: "M64.694,88.696c-0.217,0.083-0.433,0.167-0.65,0.246l2.848,8.125c0.312-0.112,0.621-0.232,0.932-0.351L64.694,88.696z"
  }), React.createElement("path", {
    d: "M67.357,87.574c-0.21,0.098-0.422,0.192-0.634,0.287l3.408,7.907c0.304-0.135,0.606-0.271,0.907-0.41L67.357,87.574z"
  }), React.createElement("path", {
    d: "M71.19,85.555c-0.198,0.119-0.401,0.23-0.603,0.347l4.215,7.506c0.288-0.165,0.578-0.325,0.863-0.495L71.19,85.555z"
  }), React.createElement("path", {
    d: "M73.615,83.985c-0.19,0.132-0.377,0.269-0.569,0.398l4.728,7.193c0.276-0.185,0.545-0.378,0.817-0.568L73.615,83.985z"
  }), React.createElement("path", {
    d: "M72.414,84.788c-0.194,0.126-0.388,0.253-0.584,0.375l4.475,7.355c0.282-0.175,0.56-0.356,0.837-0.536L72.414,84.788z"
  }), React.createElement("path", {
    d: "M68.657,86.944c-0.207,0.104-0.41,0.216-0.619,0.316l3.683,7.786c0.3-0.145,0.591-0.304,0.887-0.454L68.657,86.944z"
  }), React.createElement("path", {
    d: "M69.938,86.275c-0.203,0.111-0.409,0.219-0.614,0.327l3.95,7.648c0.294-0.154,0.588-0.309,0.878-0.47L69.938,86.275z"
  }), React.createElement("path", {
    d: "M91.231,46.548c0.019,0.23,0.045,0.459,0.06,0.691l8.596-0.498c-0.021-0.333-0.059-0.66-0.086-0.991L91.231,46.548z"
  }), React.createElement("path", {
    d: "M90.895,43.68c0.034,0.228,0.068,0.457,0.1,0.687l8.537-1.096c-0.044-0.329-0.092-0.657-0.143-0.984L90.895,43.68z"
  }), React.createElement("path", {
    d: "M91.102,45.109c0.027,0.229,0.041,0.461,0.064,0.691l8.569-0.797c-0.032-0.33-0.057-0.662-0.096-0.99L91.102,45.109z"
  }), React.createElement("path", {
    d: "M90.652,42.255c0.044,0.228,0.095,0.453,0.134,0.682l8.494-1.393c-0.056-0.328-0.125-0.651-0.188-0.977L90.652,42.255z"
  }), React.createElement("path", {
    d: "M99.928,47.491l-8.596,0.498c0.012,0.23,0.014,0.463,0.021,0.694l8.604-0.197C99.946,48.154,99.943,47.82,99.928,47.491z"
  }), React.createElement("path", {
    d: "M90.363,40.84c0.051,0.226,0.092,0.454,0.14,0.681l8.439-1.688c-0.067-0.325-0.126-0.653-0.199-0.976L90.363,40.84z"
  }), React.createElement("path", {
    d: "M75.928,82.254c-0.181,0.146-0.363,0.287-0.547,0.43l5.218,6.847c0.263-0.204,0.525-0.407,0.783-0.615L75.928,82.254z"
  }), React.createElement("path", {
    d: "M89.181,36.673c0.074,0.219,0.145,0.44,0.215,0.66l8.219-2.562c-0.102-0.316-0.201-0.633-0.309-0.946L89.181,36.673z"
  }), React.createElement("path", {
    d: "M55.989,99.631l-1.095-8.538c-0.23,0.027-0.459,0.062-0.69,0.086l0.797,8.571C55.333,99.718,55.66,99.67,55.989,99.631z"
  }), React.createElement("path", {
    d: "M88.689,35.314c0.082,0.217,0.173,0.429,0.252,0.647l8.128-2.849c-0.112-0.313-0.243-0.617-0.361-0.927L88.689,35.314z"
  }), React.createElement("path", {
    d: "M56.328,90.909c-0.229,0.035-0.46,0.058-0.689,0.089l1.096,8.538c0.328-0.045,0.659-0.081,0.986-0.131L56.328,90.909z"
  }), React.createElement("path", {
    d: "M89.629,38.046c0.066,0.221,0.127,0.445,0.19,0.668l8.302-2.273c-0.09-0.32-0.179-0.639-0.274-0.956L89.629,38.046z"
  }), React.createElement("path", {
    d: "M90.011,39.439c0.06,0.224,0.123,0.446,0.178,0.671l8.379-1.982c-0.078-0.323-0.169-0.642-0.254-0.962L90.011,39.439z"
  }), React.createElement("path", {
    d: "M57.75,90.655c-0.228,0.043-0.455,0.083-0.684,0.122l1.393,8.496c0.327-0.057,0.654-0.113,0.979-0.176L57.75,90.655z"
  }), React.createElement("path", {
    d: "M85.405,71.45c-0.12,0.198-0.25,0.389-0.374,0.585l7.245,4.648c0.177-0.28,0.361-0.556,0.533-0.84L85.405,71.45z"
  }), React.createElement("path", {
    d: "M90.603,58.048c-0.045,0.228-0.094,0.454-0.142,0.68l8.398,1.891c0.069-0.323,0.139-0.647,0.202-0.974L90.603,58.048z"
  }), React.createElement("path", {
    d: "M90.292,59.459c-0.053,0.226-0.101,0.453-0.156,0.678l8.331,2.184c0.081-0.321,0.148-0.647,0.224-0.971L90.292,59.459z"
  }), React.createElement("path", {
    d: "M89.086,63.62c-0.076,0.219-0.146,0.44-0.226,0.658l8.056,3.041c0.114-0.311,0.217-0.627,0.325-0.94L89.086,63.62z"
  }), React.createElement("path", {
    d: "M89.941,60.859c-0.061,0.225-0.126,0.446-0.19,0.669l8.247,2.473c0.093-0.318,0.186-0.637,0.272-0.958L89.941,60.859z"
  }), React.createElement("path", {
    d: "M89.546,62.25c-0.068,0.222-0.147,0.438-0.22,0.659l8.155,2.759c0.104-0.315,0.214-0.628,0.312-0.945L89.546,62.25z"
  }), React.createElement("path", {
    d: "M91.055,55.194c-0.029,0.229-0.055,0.46-0.088,0.688l8.512,1.301c0.047-0.327,0.085-0.657,0.126-0.987L91.055,55.194z"
  }), React.createElement("path", {
    d: "M90.856,56.626c-0.037,0.229-0.082,0.456-0.122,0.685l8.459,1.596c0.059-0.326,0.122-0.651,0.175-0.979L90.856,56.626z"
  }), React.createElement("path", {
    d: "M96.436,31.487c-0.464-1.162-0.954-2.309-1.5-3.426l-7.737,3.777c0.443,0.905,0.841,1.836,1.219,2.777L96.436,31.487z"
  }), React.createElement("path", {
    d: "M53.457,91.236c-1.141,0.094-2.292,0.154-3.457,0.154V100c1.435,0,2.851-0.074,4.254-0.193L53.457,91.236z"
  }), React.createElement("path", {
    d: "M99.978,49.235l-8.604,0.197c0.003,0.19,0.017,0.377,0.017,0.568c0,0.042-0.003,0.084-0.003,0.126l8.606,0.104 c0-0.077,0.006-0.152,0.006-0.229C100,49.743,99.981,49.491,99.978,49.235z"
  }), React.createElement("path", {
    d: "M91.213,53.759c-0.021,0.231-0.039,0.462-0.063,0.692l8.549,1.002c0.036-0.329,0.063-0.66,0.093-0.99L91.213,53.759z"
  }), React.createElement("path", {
    d: "M91.368,50.876c-0.005,0.231-0.009,0.463-0.018,0.693l8.6,0.404c0.013-0.331,0.019-0.662,0.025-0.994L91.368,50.876z"
  }), React.createElement("path", {
    d: "M91.322,52.319c-0.013,0.232-0.036,0.461-0.053,0.691l8.578,0.703c0.024-0.33,0.058-0.658,0.076-0.99L91.322,52.319z"
  }), React.createElement("path", {
    d: "M78.114,80.367c-0.17,0.157-0.34,0.314-0.513,0.469l5.683,6.465c0.248-0.221,0.492-0.445,0.735-0.672L78.114,80.367z"
  }), React.createElement("path", {
    d: "M82.962,75.026c-0.14,0.185-0.285,0.364-0.429,0.546l6.719,5.38c0.206-0.26,0.414-0.518,0.615-0.782L82.962,75.026z"
  }), React.createElement("path", {
    d: "M88.586,64.976c-0.084,0.216-0.168,0.432-0.255,0.646l7.944,3.321c0.126-0.306,0.245-0.615,0.365-0.925L88.586,64.976z"
  }), React.createElement("path", {
    d: "M82.07,76.162c-0.146,0.179-0.298,0.354-0.447,0.531l6.526,5.611c0.215-0.253,0.43-0.505,0.64-0.763L82.07,76.162z"
  }), React.createElement("path", {
    d: "M81.132,77.26c-0.152,0.174-0.299,0.354-0.455,0.525l6.33,5.838c0.224-0.245,0.434-0.502,0.652-0.752L81.132,77.26z"
  }), React.createElement("path", {
    d: "M79.16,79.37c-0.164,0.163-0.336,0.319-0.503,0.479l5.904,6.263c0.239-0.229,0.485-0.453,0.721-0.687L79.16,79.37z"
  }), React.createElement("path", {
    d: "M77.035,81.327c-0.176,0.151-0.348,0.306-0.525,0.454l5.455,6.662c0.255-0.212,0.502-0.435,0.753-0.651L77.035,81.327z"
  }), React.createElement("path", {
    d: "M80.162,78.329c-0.158,0.169-0.318,0.337-0.479,0.503l6.12,6.054c0.231-0.237,0.46-0.478,0.688-0.72L80.162,78.329z"
  }), React.createElement("path", {
    d: "M86.807,68.925c-0.105,0.206-0.207,0.415-0.316,0.618l7.555,4.135c0.157-0.292,0.303-0.591,0.454-0.887L86.807,68.925z"
  }), React.createElement("path", {
    d: "M87.45,67.632c-0.099,0.21-0.199,0.418-0.302,0.626l7.691,3.866c0.147-0.297,0.292-0.596,0.433-0.896L87.45,67.632z"
  }), React.createElement("path", {
    d: "M88.046,66.314c-0.092,0.214-0.191,0.423-0.286,0.634l7.822,3.596c0.136-0.302,0.279-0.602,0.41-0.907L88.046,66.314z"
  }), React.createElement("path", {
    d: "M86.125,70.198c-0.113,0.202-0.229,0.402-0.346,0.602l7.403,4.394c0.167-0.285,0.334-0.572,0.496-0.861L86.125,70.198z"
  }), React.createElement("path", {
    d: "M83.812,73.859c-0.134,0.188-0.266,0.379-0.402,0.565l6.904,5.144c0.196-0.267,0.386-0.539,0.577-0.811L83.812,73.859z"
  }), React.createElement("path", {
    d: "M84.627,72.666c-0.127,0.193-0.25,0.39-0.38,0.581l7.078,4.899c0.188-0.274,0.365-0.555,0.547-0.832L84.627,72.666z"
  })));
}

var colors = {
  highlight: {
    light: '#35EDE6',
    medium: '#134141',
    dark: '#102B2C',
    verydark: '#0D1214'
  }
};
var _utils = utils,
    cssVendorPrefix = _utils.cssVendorPrefix;
var OrbitalGlyph = createReactClass({
  displayName: "OrbitalGlyph",
  getInitialState: function () {
    var state = {
      initialMount: false,
      showDemo: false,
      bgEndColor: color(colors.highlight.verydark),
      bgStartColor: color(colors.highlight.dark),
      lightCircle: color(colors.highlight.light),
      mediumCircle: color(colors.highlight.medium)
    };
    console.log("getInitialState", state);
    return state;
  },
  componentDidMount: function () {
    var _this = this;

    setInterval(function () {
      _this.setState(function (prevState) {
        return {
          bgEndColor: prevState.bgEndColor.hue(0.0005, true),
          bgStartColor: prevState.bgStartColor.hue(0.0005, true),
          lightCircle: prevState.lightCircle.hue(0.0005, true),
          mediumCircle: prevState.mediumCircle.hue(0.0005, true)
        };
      });
    }, 25);
    setTimeout(function () {
      _this.showDemo();
    }, 300);
  },
  showDemo: function () {
    this.setState({
      initialMount: true,
      showDemo: true
    });
  },
  hideDemo: function () {
    this.setState({
      showDemo: false
    });
  },
  render: function () {
    var _this2 = this;

    var _this$state = this.state,
        bgStartColor = _this$state.bgStartColor,
        bgEndColor = _this$state.bgEndColor,
        initialMount = _this$state.initialMount,
        showDemo = _this$state.showDemo;
    var lightCircle = this.state.lightCircle;
    var mediumCircle = this.state.mediumCircle;
    var contentStyle = {
      position: 'relative',
      left: '50%',
      top: '50%',
      width: '200px',
      height: '200px',
      minWidth: 200
    };
    var circlePosition = {
      position: 'absolute',
      left: '-50%',
      top: '-50%' // top: 0,
      // left: 0

    };
    var reactIsCool = (0, _objectSpread2.default)({
      color: lightCircle.hex(),
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      textAlign: 'center',
      fontFamily: 'Monaco, fixed-width',
      fontSize: '40px',
      fontWeight: 'bold',
      cursor: 'pointer'
    }, cssVendorPrefix('userSelect', 'none'));
    return (// <GradientBackground
      //   className="orbital"
      //   type="radial"
      //   startColor={bgStartColor.hex()}
      //   endColor={bgEndColor.hex()}
      //   style={{height: "500px"}}
      //   >
      React.createElement(View, {
        flex: true,
        onMouseDown: function () {
          _this2.hideDemo();
        },
        onMouseUp: function () {
          _this2.showDemo();
        },
        onTouchStart: function () {
          _this2.hideDemo();
        },
        onTouchEnd: function () {
          _this2.showDemo();
        }
      }, React.createElement(View, {
        flex: true,
        style: contentStyle
      }, React.createElement(Fade, {
        show: showDemo,
        flex: true
      }, React.createElement(Zoom, {
        show: showDemo,
        stifness: showDemo ? 160 : 170,
        damping: showDemo ? 13 : 26
      }, React.createElement("div", {
        maxTiltDeg: 60
      }, React.createElement(Rotator, {
        spinDuration: 8000,
        spinDirection: "cw",
        style: circlePosition
      }, circle34(lightCircle.hex())), React.createElement(Translate, {
        z: -100,
        style: circlePosition
      }, React.createElement(Rotator, {
        spinDuration: 12000,
        spinDirection: "ccw"
      }, React.createElement(Scale, {
        scale: 1.1
      }, circle34(mediumCircle.hex())))), React.createElement(Rotator, {
        spinDuration: 5000,
        spinDirection: "ccw",
        style: circlePosition
      }, React.createElement(Scale, {
        scale: 0.9
      }, circle14striped(lightCircle.hex())))))))) // <footer className="Footer">
      //   <a href="https://github.com/nygardk/react-scifi" target="_blank">
      //     GitHub: nygardk/react-scifi
      //   </a>
      // </footer>
      // </GradientBackground>

    );
  }
});
module.exportDefault(OrbitalGlyph);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".jsx"
  ]
});

require("/node_modules/meteor/clinical:default-landing-page/lib/LandingPage.js");
var exports = require("/node_modules/meteor/clinical:default-landing-page/index.jsx");

/* Exports */
Package._define("clinical:default-landing-page", exports, {
  LandingPageConfig: LandingPageConfig
});

})();
