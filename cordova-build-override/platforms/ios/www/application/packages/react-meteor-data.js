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
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

/* Package-scope variables */
var ReactMeteorData;

var require = meteorInstall({"node_modules":{"meteor":{"react-meteor-data":{"react-meteor-data.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/react-meteor-data/react-meteor-data.jsx                                                          //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
var checkNpmVersions;
module.link("meteor/tmeasday:check-npm-versions", {
  checkNpmVersions: function (v) {
    checkNpmVersions = v;
  }
}, 0);
module.link("./createContainer.jsx", {
  "default": "createContainer"
}, 1);
module.link("./ReactMeteorData.jsx", {
  "default": "withTracker"
}, 2);
module.link("./ReactMeteorData.jsx", {
  ReactMeteorData: "ReactMeteorData"
}, 3);
checkNpmVersions({
  react: '15.3 - 16'
}, 'react-meteor-data');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ReactMeteorData.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/react-meteor-data/ReactMeteorData.jsx                                                            //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

module.export({
  ReactMeteorData: function () {
    return ReactMeteorData;
  },
  "default": function () {
    return connect;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 1);
var Tracker;
module.link("meteor/tracker", {
  Tracker: function (v) {
    Tracker = v;
  }
}, 2);

// A class to keep the state and utility methods needed to manage
// the Meteor data for a component.
var MeteorDataManager =
/*#__PURE__*/
function () {
  function MeteorDataManager(component) {
    this.component = component;
    this.computation = null;
    this.oldData = null;
  }

  var _proto = MeteorDataManager.prototype;

  _proto.dispose = function () {
    function dispose() {
      if (this.computation) {
        this.computation.stop();
        this.computation = null;
      }
    }

    return dispose;
  }();

  _proto.calculateData = function () {
    function calculateData() {
      var component = this.component;

      if (!component.getMeteorData) {
        return null;
      } // When rendering on the server, we don't want to use the Tracker.
      // We only do the first rendering on the server so we can get the data right away


      if (Meteor.isServer) {
        return component.getMeteorData();
      }

      if (this.computation) {
        this.computation.stop();
        this.computation = null;
      }

      var data; // Use Tracker.nonreactive in case we are inside a Tracker Computation.
      // This can happen if someone calls `ReactDOM.render` inside a Computation.
      // In that case, we want to opt out of the normal behavior of nested
      // Computations, where if the outer one is invalidated or stopped,
      // it stops the inner one.

      this.computation = Tracker.nonreactive(function () {
        return Tracker.autorun(function (c) {
          if (c.firstRun) {
            var savedSetState = component.setState;

            try {
              component.setState = function () {
                throw new Error('Can\'t call `setState` inside `getMeteorData` as this could ' + 'cause an endless loop. To respond to Meteor data changing, ' + 'consider making this component a \"wrapper component\" that ' + 'only fetches data and passes it in as props to a child ' + 'component. Then you can use `componentWillReceiveProps` in ' + 'that child component.');
              };

              data = component.getMeteorData();
            } finally {
              component.setState = savedSetState;
            }
          } else {
            // Stop this computation instead of using the re-run.
            // We use a brand-new autorun for each call to getMeteorData
            // to capture dependencies on any reactive data sources that
            // are accessed.  The reason we can't use a single autorun
            // for the lifetime of the component is that Tracker only
            // re-runs autoruns at flush time, while we need to be able to
            // re-call getMeteorData synchronously whenever we want, e.g.
            // from componentWillUpdate.
            c.stop(); // Calling forceUpdate() triggers componentWillUpdate which
            // recalculates getMeteorData() and re-renders the component.

            component.forceUpdate();
          }
        });
      });

      if (Package.mongo && Package.mongo.Mongo) {
        Object.keys(data).forEach(function (key) {
          if (data[key] instanceof Package.mongo.Mongo.Cursor) {
            console.warn('Warning: you are returning a Mongo cursor from getMeteorData. ' + 'This value will not be reactive. You probably want to call ' + '`.fetch()` on the cursor before returning it.');
          }
        });
      }

      return data;
    }

    return calculateData;
  }();

  _proto.updateData = function () {
    function updateData(newData) {
      var component = this.component;
      var oldData = this.oldData;

      if (!(newData && (0, _typeof2.default)(newData) === 'object')) {
        throw new Error('Expected object returned from getMeteorData');
      } // update componentData in place based on newData


      for (var key in meteorBabelHelpers.sanitizeForInObject(newData)) {
        component.data[key] = newData[key];
      } // if there is oldData (which is every time this method is called
      // except the first), delete keys in newData that aren't in
      // oldData.  don't interfere with other keys, in case we are
      // co-existing with something else that writes to a component's
      // this.data.


      if (oldData) {
        for (var _key in meteorBabelHelpers.sanitizeForInObject(oldData)) {
          if (!(_key in newData)) {
            delete component.data[_key];
          }
        }
      }

      this.oldData = newData;
    }

    return updateData;
  }();

  return MeteorDataManager;
}();

var ReactMeteorData = {
  componentWillMount: function () {
    this.data = {};
    this._meteorDataManager = new MeteorDataManager(this);

    var newData = this._meteorDataManager.calculateData();

    this._meteorDataManager.updateData(newData);
  },
  componentWillUpdate: function (nextProps, nextState) {
    var saveProps = this.props;
    var saveState = this.state;
    var newData;

    try {
      // Temporarily assign this.state and this.props,
      // so that they are seen by getMeteorData!
      // This is a simulation of how the proposed Observe API
      // for React will work, which calls observe() after
      // componentWillUpdate and after props and state are
      // updated, but before render() is called.
      // See https://github.com/facebook/react/issues/3398.
      this.props = nextProps;
      this.state = nextState;
      newData = this._meteorDataManager.calculateData();
    } finally {
      this.props = saveProps;
      this.state = saveState;
    }

    this._meteorDataManager.updateData(newData);
  },
  componentWillUnmount: function () {
    this._meteorDataManager.dispose();
  }
};

var ReactComponent =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ReactComponent, _React$Component);

  function ReactComponent() {
    return _React$Component.apply(this, arguments) || this;
  }

  return ReactComponent;
}(React.Component);

Object.assign(ReactComponent.prototype, ReactMeteorData);

var ReactPureComponent =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inheritsLoose2.default)(ReactPureComponent, _React$PureComponent);

  function ReactPureComponent() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  return ReactPureComponent;
}(React.PureComponent);

Object.assign(ReactPureComponent.prototype, ReactMeteorData);

function connect(options) {
  var expandedOptions = options;

  if (typeof options === 'function') {
    expandedOptions = {
      getMeteorData: options
    };
  }

  var _expandedOptions = expandedOptions,
      _getMeteorData = _expandedOptions.getMeteorData,
      _expandedOptions$pure = _expandedOptions.pure,
      pure = _expandedOptions$pure === void 0 ? true : _expandedOptions$pure;
  var BaseComponent = pure ? ReactPureComponent : ReactComponent;
  return function (WrappedComponent) {
    return (
      /*#__PURE__*/
      function (_BaseComponent) {
        (0, _inheritsLoose2.default)(ReactMeteorDataComponent, _BaseComponent);

        function ReactMeteorDataComponent() {
          return _BaseComponent.apply(this, arguments) || this;
        }

        var _proto2 = ReactMeteorDataComponent.prototype;

        _proto2.getMeteorData = function () {
          function getMeteorData() {
            return _getMeteorData(this.props);
          }

          return getMeteorData;
        }();

        _proto2.render = function () {
          function render() {
            return React.createElement(WrappedComponent, (0, _extends2.default)({}, this.props, this.data));
          }

          return render;
        }();

        return ReactMeteorDataComponent;
      }(BaseComponent)
    );
  };
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"createContainer.jsx":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/react-meteor-data/createContainer.jsx                                                            //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
module.export({
  "default": function () {
    return createContainer;
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
var connect;
module.link("./ReactMeteorData.jsx", {
  "default": function (v) {
    connect = v;
  }
}, 2);
var hasDisplayedWarning = false;

function createContainer(options, Component) {
  if (!hasDisplayedWarning && Meteor.isDevelopment) {
    console.warn('Warning: createContainer was deprecated in react-meteor-data@0.2.13. Use withTracker instead.\n' + 'https://github.com/meteor/react-packages/tree/devel/packages/react-meteor-data#usage');
    hasDisplayedWarning = true;
  }

  return connect(options)(Component);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".jsx"
  ]
});

var exports = require("/node_modules/meteor/react-meteor-data/react-meteor-data.jsx");

/* Exports */
Package._define("react-meteor-data", exports, {
  ReactMeteorData: ReactMeteorData
});

})();
