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
var Mongo = Package.mongo.Mongo;
var ReactMeteorData = Package['react-meteor-data'].ReactMeteorData;
var Session = Package.session.Session;
var WebApp = Package.webapp.WebApp;
var Log = Package.logging.Log;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
var DDP = Package['ddp-client'].DDP;
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
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var HTML = Package.htmljs.HTML;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

/* Package-scope variables */
var Glass, canvasWidth;

var require = meteorInstall({"node_modules":{"meteor":{"clinical:glass-ui":{"index.jsx":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_glass-ui/index.jsx                                                                     //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
module.export({
  GlassCard: function () {
    return GlassCard;
  },
  VerticalCanvas: function () {
    return VerticalCanvas;
  },
  FullPageCanvas: function () {
    return FullPageCanvas;
  },
  Glass: function () {
    return Glass;
  },
  DynamicSpacer: function () {
    return DynamicSpacer;
  },
  TableNoData: function () {
    return TableNoData;
  }
});
var GlassCard;
module.link("./client/react/GlassCard.jsx", {
  "default": function (v) {
    GlassCard = v;
  }
}, 0);
var VerticalCanvas;
module.link("./client/react/VerticalCanvas.jsx", {
  "default": function (v) {
    VerticalCanvas = v;
  }
}, 1);
var FullPageCanvas;
module.link("./client/react/FullPageCanvas.jsx", {
  "default": function (v) {
    FullPageCanvas = v;
  }
}, 2);
var DynamicSpacer;
module.link("./client/react/DynamicSpacer.jsx", {
  "default": function (v) {
    DynamicSpacer = v;
  }
}, 3);
var TableNoData;
module.link("./client/react/TableNoData.jsx", {
  "default": function (v) {
    TableNoData = v;
  }
}, 4);
var Glass;
module.link("./client/lib/Glass.js", {
  "default": function (v) {
    Glass = v;
  }
}, 5);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"client":{"lib":{"Glass.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_glass-ui/client/lib/Glass.js                                                           //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 0);
module.exportDefault(Glass = {
  getOpacity: function () {
    return Session.get('globalOpacity');
  },
  setOpacity: function (opacity) {
    return Session.set('globalOpacity', opacity);
  },
  blur: function (style) {
    if (style) {
      if (Session.get('glassBlurEnabled')) {
        style.filter = 'blur(3px)';
        style.WebkitFilter = 'blur(3px)';
      }
    }

    return style;
  },
  backgroundBlur: function (style) {
    if (style) {
      if (Session.get('backgroundBlurEnabled')) {
        style.backdropFilter = 'blur(5px)';
      }
    }

    return style;
  },
  darkroom: function (style) {
    if (!style) {
      style = {};
    }

    if (Session.get('darkroomEnabled')) {
      style.color = 'black';
      style.background = 'white';
    } else {
      style.color = 'white';
      style.background = 'black';
    }

    return style;
  },
  defaultStyle: function (style) {
    if (!style) {
      style = {};
    }

    this.blur(style);
    this.darkroom(style);
    return style;
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"react":{"DynamicSpacer.jsx":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_glass-ui/client/react/DynamicSpacer.jsx                                                //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  DynamicSpacer: function () {
    return DynamicSpacer;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 1);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 2);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 3);

var DynamicSpacer =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(DynamicSpacer, _React$Component);

  function DynamicSpacer() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = DynamicSpacer.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          // height: '0rem',
          height: '1px',
          'WebkitTransition': 'ease .2s',
          'transition': 'ease .2s'
        }
      };

      if (Session.get('hasPageVerticalPadding')) {
        data.style.height = '3.2rem';
      }

      return data;
    }

    return getMeteorData;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        className: "spacer",
        style: this.data.style
      });
    }

    return render;
  }();

  return DynamicSpacer;
}(React.Component);

ReactMixin(DynamicSpacer.prototype, ReactMeteorData);
module.exportDefault(DynamicSpacer);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"FullPageCanvas.jsx":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_glass-ui/client/react/FullPageCanvas.jsx                                               //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  FullPageCanvas: function () {
    return FullPageCanvas;
  }
});
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 0);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 1);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 2);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 3);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 4);

var FullPageCanvas =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(FullPageCanvas, _React$Component);

  function FullPageCanvas(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = FullPageCanvas.prototype;

  _proto.componentDidMount = function () {
    function componentDidMount() {
      Session.set('appSurfaceOffset', false);
      Session.set('hasPagePadding', true);
    }

    return componentDidMount;
  }();

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          WebkitTransition: 'ease .2s',
          transition: 'ease .2s'
        }
      };
      var canvasWidth = Session.get('appWidth') - 1; // if we're passed in a width via a prop, then overide

      if (this.props.width) {
        if (this.props.width == 'wide') {
          canvasWidth = Session.get('appWidth') - 1;
        } else {
          canvasWidth = this.props.width;
        }
      }

      if (this.props.backgroundColor) {
        data.style.backgroundColor = this.props.backgroundColor;
      }

      if (Session.get('appWidth') > canvasWidth) {
        data.style.position = 'relative';
        data.style.maxWidth = canvasWidth + 'px';
        data.style.width = '100%';
        data.style.left = 0;
      } else {
        data.style.position = 'absolute';
        data.style.width = '100%';
      }

      var paddingTop = 0;
      var paddingBottom = 0;

      if (Session.get('showNavbars')) {
        paddingTop = paddingTop + 64;
        paddingBottom = paddingBottom + 64;
      }

      if (Session.get('showSearchbar')) {
        paddingTop = paddingTop + 60;
      }

      if (Session.get('mainPanelIsCard')) {
        paddingTop = paddingTop + 20;
      }

      data.style.paddingTop = paddingTop + 'px';
      data.style.paddingBottom = paddingBottom + 'px';

      if (Session.get('hasPagePadding')) {
        data.style.paddingLeft = '15px';
        data.style.paddingRight = '15px';
      } else {
        if (Session.get('mainPanelIsCard')) {
          data.style.paddingLeft = '15px';
          data.style.paddingRight = '15px';
        } else {
          data.style.paddingLeft = '0px';
          data.style.paddingRight = '0px';
        }
      }

      data.style.overflowY = 'scroll';
      data.style.WebkitOverflowScrolling = 'touch';
      data.style.WebkitTransform = 'translateZ(0px)';
      data.style.WebkitTransform = 'translate3d(0, 0, 0)';
      data.style.WebkitPerspective = 'translateZ(0px)';
      data.style.height = Session.get('appHeight');
      return data;
    }

    return getMeteorData;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("section", {
        className: "pageContainer fullPageContainer",
        style: this.data.style
      }, this.props.children);
    }

    return render;
  }();

  return FullPageCanvas;
}(React.Component);

ReactMixin(FullPageCanvas.prototype, ReactMeteorData);
module.exportDefault(FullPageCanvas);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"GlassCard.jsx":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_glass-ui/client/react/GlassCard.jsx                                                    //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  GlassCard: function () {
    return GlassCard;
  }
});
var Card;
module.link("material-ui/Card", {
  Card: function (v) {
    Card = v;
  }
}, 0);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 1);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 2);

var GlassCard =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(GlassCard, _React$Component);

  function GlassCard(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = GlassCard.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          overflowY: 'scroll'
        },
        containerStyle: {}
      };

      if (this.props && this.props.style) {
        data.style = this.props.style;
      } // GlassFactory.addOpacity(data.style);


      if (Session.get('globalOpacity')) {
        data.style.opacity = Session.get('globalOpacity');
      } // GlassFactory.addDarkroom(data.style);


      if (Session.get('darkroomEnabled')) {
        data.style.color = 'black';
        data.style.background = 'white';
      } else {
        data.style.color = 'white';
        data.style.background = 'black';
      } // GlassFactory.addBlur(data.style);


      if (Session.get('glassBlurEnabled')) {
        data.containerStyle.filter = 'blur(3px)';
        data.containerStyle.WebkitFilter = 'blur(3px)';
      } // // GlassFactory.addBackgroundBlur(data.style);
      // if (Session.get('backgroundBlurEnabled')) {
      //   data.style.backdropFilter = 'blur(5px)';
      // }


      if (this.props.height === "auto") {
        if (Session.get('hasPagePadding')) {
          // 168 = 2 * 84 
          // 168 = 2 * (64 + 20)
          // 168 = 2 * ( 64px navbar height + 20px margin )
          data.style.height = Session.get('appHeight') - 168 + 'px';
          data.style.overflowY = "scroll";
        } else {
          if (Session.get('mainPanelIsCard')) {
            data.style.height = Session.get('appHeight') - 50 + 'px';
            data.style.overflowY = "scroll";
          } else {
            data.style.height = Session.get('appHeight') + 'px';
            data.style.overflowY = "scroll";
          }
        }
      } else {
        data.style.height = this.props.height;
      }

      data.style.paddingBottom = '0px';
      return data;
    }

    return getMeteorData;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement(Card, {
        id: this.props.id,
        className: "glassCard",
        containerStyle: this.data.containerStyle,
        style: this.data.style,
        onClick: this.props.onClick,
        zDepth: this.props.zDepth
      }, this.props.children);
    }

    return render;
  }();

  return GlassCard;
}(React.Component);

ReactMixin(GlassCard.prototype, ReactMeteorData);
module.exportDefault(GlassCard);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"TableNoData.jsx":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_glass-ui/client/react/TableNoData.jsx                                                  //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  TableNoData: function () {
    return TableNoData;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 1);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 2);
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 3);

var TableNoData =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(TableNoData, _React$Component);

  function TableNoData() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = TableNoData.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {};
      return data;
    }

    return getMeteorData;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        style: {
          width: '100%',
          paddingTop: get(this, 'props.noDataPadding', 0) + 'px',
          paddingBottom: get(this, 'props.noDataPadding', 0) + 'px',
          textAlign: 'center'
        }
      }, React.createElement("h3", null, "No data."), React.createElement("span", null, "Are you sure you're logged in?"), React.createElement("br", null), React.createElement("span", null, "Do you have an access token?"), React.createElement("br", null), React.createElement("span", null, "Is your search a wide enough scope?"), React.createElement("br", null), React.createElement("span", null, "Are you subscribed to this resource?"), React.createElement("br", null));
    }

    return render;
  }();

  return TableNoData;
}(React.Component);

ReactMixin(TableNoData.prototype, ReactMeteorData);
module.exportDefault(TableNoData);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"VerticalCanvas.jsx":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/clinical_glass-ui/client/react/VerticalCanvas.jsx                                               //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  VerticalCanvas: function () {
    return VerticalCanvas;
  }
});
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 0);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 1);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 2);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 3);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 4);
Session.setDefault('appSurfaceOffset', false);
Session.setDefault('hasPagePadding', true);
Session.setDefault('showCanvas', true);

var VerticalCanvas =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(VerticalCanvas, _React$Component);

  function VerticalCanvas(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = VerticalCanvas.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {}
      };
      data.style.WebkitTransition = 'ease .2s';
      data.style.transition = 'ease .2s'; // figure out if the vertical canvas should be wide or not

      if (Session.get('showCanvas')) {
        data.style.left = '0px';
      } else {
        data.style.left = '-4400px';
      }

      if (this.props.left) {
        data.style.left = this.props.left;
      } // figure out if the vertical canvas should be wide or not


      if (Session.get('isWideHorizontally')) {
        canvasWidth = Session.get('appWidth') - 1;
      } else {
        canvasWidth = 1200;
      } // but if we're passed in a width via a prop, then overide


      if (this.props.width) {
        if (this.props.width == 'wide') {
          canvasWidth = Session.get('appWidth') - 1;
        } else {
          canvasWidth = this.props.width;
        }
      }

      if (Session.get('appWidth') > canvasWidth) {
        data.style.position = 'relative';
        data.style.maxWidth = canvasWidth + 'px';
        data.style.width = '100%';

        if (Session.get('appSurfaceOffset')) {
          // golden ratio
          // data.style.left = (Session.get('appWidth') - canvasWidth) + 40;
          data.style.left = 80;
          data.style.marginRight = '100px';
        } else {
          // centered
          data.style.left = (Session.get('appWidth') - canvasWidth) * 0.5;
        }
      } else {
        data.style.position = 'absolute';
        data.style.width = '100%';
      }

      var paddingTop = 0;
      var paddingBottom = 0;

      if (Session.get('showNavbars')) {
        paddingTop = paddingTop + 64;
        paddingBottom = paddingBottom + 64;
      }

      if (Session.get('showSearchbar')) {
        paddingTop = paddingTop + 60;
      }

      if (Session.get('mainPanelIsCard')) {
        paddingTop = paddingTop + 20;
      }

      data.style.paddingTop = paddingTop + 'px';
      data.style.paddingBottom = paddingBottom + 'px';

      if (Session.get('hasPagePadding')) {
        data.style.paddingLeft = '20px';
        data.style.paddingRight = '20px';
      } else {
        if (Session.get('mainPanelIsCard')) {
          data.style.paddingLeft = '20px';
          data.style.paddingRight = '20px';
        } else {
          data.style.paddingLeft = '0px';
          data.style.paddingRight = '0px';
        }
      }

      data.style.overflowY = 'scroll';
      data.style.WebkitOverflowScrolling = 'touch';
      data.style.WebkitTransform = 'translateZ(0px)';
      data.style.WebkitTransform = 'translate3d(0, 0, 0)';
      data.style.WebkitPerspective = 'translateZ(0px)';
      data.style.height = Session.get('appHeight'); //data.style.border = '1px solid blue';

      return data;
    }

    return getMeteorData;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("section", {
        className: "pageContainer verticalContainer",
        style: this.data.style
      }, this.props.children);
    }

    return render;
  }();

  return VerticalCanvas;
}(React.Component);

ReactMixin(VerticalCanvas.prototype, ReactMeteorData);
module.exportDefault(VerticalCanvas);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".jsx"
  ]
});

var exports = require("/node_modules/meteor/clinical:glass-ui/index.jsx");

/* Exports */
Package._define("clinical:glass-ui", exports);

})();
