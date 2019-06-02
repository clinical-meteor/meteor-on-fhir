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
var DDP = Package['ddp-client'].DDP;
var fetch = Package.fetch.fetch;
var check = Package.check.check;
var Match = Package.check.Match;
var WebApp = Package.webapp.WebApp;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Promise = Package.promise.Promise;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

/* Package-scope variables */
var _i18n, i18n;

var require = meteorInstall({"node_modules":{"meteor":{"universe:i18n":{"lib":{"i18n.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe_i18n/lib/i18n.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  i18n: function () {
    return i18n;
  }
});
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 0);
var Emitter, get, set, RecursiveIterator, deepExtend;
module.link("./utilities", {
  Emitter: function (v) {
    Emitter = v;
  },
  get: function (v) {
    get = v;
  },
  set: function (v) {
    set = v;
  },
  RecursiveIterator: function (v) {
    RecursiveIterator = v;
  },
  deepExtend: function (v) {
    deepExtend = v;
  }
}, 1);
var LOCALES, CURRENCIES, SYMBOLS;
module.link("./locales", {
  LOCALES: function (v) {
    LOCALES = v;
  },
  CURRENCIES: function (v) {
    CURRENCIES = v;
  },
  SYMBOLS: function (v) {
    SYMBOLS = v;
  }
}, 2);
var contextualLocale = new Meteor.EnvironmentVariable();

var _events = new Emitter();

var i18n = {
  _isLoaded: {},
  normalize: function (locale) {
    locale = locale.toLowerCase();
    locale = locale.replace('_', '-');
    return LOCALES[locale] && LOCALES[locale][0];
  },
  setLocale: function (locale) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    locale = locale || '';
    i18n._locale = i18n.normalize(locale);

    if (!i18n._locale) {
      console.error('Wrong locale:', locale, '[Should be xx-yy or xx]');
      return Promise.reject(new Error('Wrong locale: ' + locale + ' [Should be xx-yy or xx]'));
    }

    var sameLocaleOnServerConnection = i18n.options.sameLocaleOnServerConnection;
    var _options$noDownload = options.noDownload,
        noDownload = _options$noDownload === void 0 ? false : _options$noDownload,
        _options$silent = options.silent,
        silent = _options$silent === void 0 ? false : _options$silent;

    if (Meteor.isClient) {
      sameLocaleOnServerConnection && Meteor.call('universe.i18n.setServerLocaleForConnection', locale);

      if (!noDownload) {
        var promise;
        i18n._isLoaded[i18n._locale] = false;
        options.silent = true;

        if (i18n._locale.indexOf('-') !== -1) {
          promise = i18n.loadLocale(i18n._locale.replace(/\-.*$/, ''), options).then(function () {
            return i18n.loadLocale(i18n._locale, options);
          });
        } else {
          promise = i18n.loadLocale(i18n._locale, options);
        }

        if (!silent) {
          promise = promise.then(function () {
            i18n._emitChange();
          });
        }

        return promise.catch(console.error.bind(console)).then(function () {
          return i18n._isLoaded[i18n._locale] = true;
        });
      }
    }

    if (!silent) {
      i18n._emitChange();
    }

    return Promise.resolve();
  },

  /**
   * @param {string} locale
   * @param {function} func that will be launched in locale context
   */
  runWithLocale: function (locale, func) {
    locale = i18n.normalize(locale);
    return contextualLocale.withValue(locale, func);
  },
  _emitChange: function () {
    var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : i18n._locale;

    _events.emit('changeLocale', locale); // Only if is active


    i18n._deps && i18n._deps.changed();
  },
  getLocale: function () {
    return contextualLocale.get() || i18n._locale || i18n.options.defaultLocale;
  },
  createComponent: function () {
    var translator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : i18n.createTranslator();
    var locale = arguments.length > 1 ? arguments[1] : undefined;
    var reactjs = arguments.length > 2 ? arguments[2] : undefined;
    var type = arguments.length > 3 ? arguments[3] : undefined;

    if (typeof translator === 'string') {
      translator = i18n.createTranslator(translator, locale);
    }

    if (!reactjs) {
      if (typeof React !== 'undefined') {
        reactjs = React;
      } else {
        try {
          reactjs = require('react');
        } catch (e) {//ignore, will be checked later
        }
      }

      if (!reactjs) {
        console.error('React is not detected!');
      }
    }

    var T =
    /*#__PURE__*/
    function (_reactjs$Component) {
      (0, _inheritsLoose2.default)(T, _reactjs$Component);

      function T() {
        return _reactjs$Component.apply(this, arguments) || this;
      }

      var _proto = T.prototype;

      _proto.render = function () {
        function render() {
          var _this$props = this.props,
              children = _this$props.children,
              _translateProps = _this$props._translateProps,
              _containerType = _this$props._containerType,
              _tagType = _this$props._tagType,
              _this$props$_props = _this$props._props,
              _props = _this$props$_props === void 0 ? {} : _this$props$_props,
              params = (0, _objectWithoutProperties2.default)(_this$props, ["children", "_translateProps", "_containerType", "_tagType", "_props"]);

          var tagType = _tagType || type || 'span';
          var items = reactjs.Children.map(children, function (item, index) {
            if (typeof item === 'string' || typeof item === 'number') {
              return reactjs.createElement(tagType, (0, _objectSpread2.default)({}, _props, {
                dangerouslySetInnerHTML: {
                  // `translator` in browser will sanitize string as a PCDATA
                  __html: translator(item, params)
                },
                key: '_' + index
              }));
            }

            if (Array.isArray(_translateProps)) {
              var newProps = {};

              _translateProps.forEach(function (propName) {
                var prop = item.props[propName];

                if (prop && typeof prop === 'string') {
                  newProps[propName] = translator(prop, params);
                }
              });

              return reactjs.cloneElement(item, newProps);
            }

            return item;
          });

          if (items.length === 1) {
            return items[0];
          }

          var containerType = _containerType || type || 'div';
          return reactjs.createElement(containerType, (0, _objectSpread2.default)({}, _props), items);
        }

        return render;
      }();

      _proto.componentDidMount = function () {
        function componentDidMount() {
          var _this = this;

          this._invalidate = function () {
            return _this.forceUpdate();
          };

          _events.on('changeLocale', this._invalidate);
        }

        return componentDidMount;
      }();

      _proto.componentWillUnmount = function () {
        function componentWillUnmount() {
          _events.off('changeLocale', this._invalidate);
        }

        return componentWillUnmount;
      }();

      return T;
    }(reactjs.Component);

    T.__ = function (translationStr, props) {
      return translator(translationStr, props);
    };

    return T;
  },
  createTranslator: function (namespace) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    if (typeof options === 'string' && options) {
      options = {
        _locale: options
      };
    }

    return function () {
      var _namespace = namespace;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if ((0, _typeof2.default)(args[args.length - 1]) === 'object') {
        _namespace = args[args.length - 1]._namespace || _namespace;
        args[args.length - 1] = (0, _objectSpread2.default)({}, options, args[args.length - 1]);
      } else if (options) {
        args.push(options);
      }

      if (_namespace) {
        args.unshift(_namespace);
      }

      return i18n.getTranslation.apply(i18n, args);
    };
  },
  _translations: {},
  setOptions: function (options) {
    i18n.options = (0, _objectSpread2.default)({}, i18n.options || {}, options);
  },
  //For blaze and autoruns
  createReactiveTranslator: function (namespace, locale) {
    var _require = require('meteor/tracker'),
        Tracker = _require.Tracker;

    var translator = i18n.createTranslator(namespace, locale);

    if (!i18n._deps) {
      i18n._deps = new Tracker.Dependency();
    }

    return function () {
      i18n._deps.depend();

      return translator.apply(void 0, arguments);
    };
  },
  getTranslation: function ()
  /*namespace, key, params*/
  {
    var open = i18n.options.open;
    var close = i18n.options.close;
    var args = [].slice.call(arguments);
    var keysArr = args.filter(function (prop) {
      return typeof prop === 'string' && prop;
    });
    var key = keysArr.join('.');
    var params;

    if ((0, _typeof2.default)(args[args.length - 1]) === 'object') {
      params = (0, _objectSpread2.default)({}, args[args.length - 1]);
    } else {
      params = {};
    }

    var currentLang = params._locale || i18n.getLocale();
    var token = currentLang + '.' + key;
    var string = get(i18n._translations, token);
    delete params._locale;
    delete params._namespace;

    if (!string) {
      token = currentLang.replace(/-.+$/, '') + '.' + key;
      string = get(i18n._translations, token);

      if (!string) {
        token = i18n.options.defaultLocale + '.' + key;
        string = get(i18n._translations, token);

        if (!string) {
          token = i18n.options.defaultLocale.replace(/-.+$/, '') + '.' + key;
          string = get(i18n._translations, token, i18n.options.hideMissing ? '' : key);
        }
      }
    }

    Object.keys(params).forEach(function (param) {
      string = ('' + string).split(open + param + close).join(params[param]);
    });

    var _params = params,
        _params$_purify = _params._purify,
        _purify = _params$_purify === void 0 ? i18n.options.purify : _params$_purify;

    if (typeof _purify === 'function') {
      return _purify(string);
    }

    return string;
  },
  getTranslations: function (namespace) {
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : i18n.getLocale();

    if (locale) {
      namespace = locale + '.' + namespace;
    }

    return get(i18n._translations, namespace, {});
  },
  addTranslation: function (locale)
  /*, translation */
  {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var translation = args.pop();
    var path = args.join('.').replace(/(^\.)|(\.\.)|(\.$)/g, '');
    locale = locale.toLowerCase().replace('_', '-');

    if (LOCALES[locale]) {
      locale = LOCALES[locale][0];
    }

    if (typeof translation === 'string') {
      set(i18n._translations, [locale, path].join('.'), translation);
    } else if ((0, _typeof2.default)(translation) === 'object' && !!translation) {
      Object.keys(translation).sort().forEach(function (key) {
        return i18n.addTranslation(locale, path, '' + key, translation[key]);
      });
    }

    return i18n._translations;
  },

  /**
   * parseNumber('7013217.715'); // 7,013,217.715
   * parseNumber('16217 and 17217,715'); // 16,217 and 17,217.715
   * parseNumber('7013217.715', 'ru-ru'); // 7 013 217,715
   */
  parseNumber: function (number) {
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : i18n.getLocale();
    number = '' + number;
    locale = locale || '';
    var sep = LOCALES[locale.toLowerCase()];
    if (!sep) return number;
    sep = sep[4];
    return number.replace(/(\d+)[\.,]*(\d*)/gim, function (match, num, dec) {
      return format(+num, sep.charAt(0)) + (dec ? sep.charAt(1) + dec : '');
    }) || '0';
  },
  _locales: LOCALES,

  /**
   * Return array with used languages
   * @param {string} [type='code'] - what type of data should be returned, language code by default.
   * @return {string[]}
   */
  getLanguages: function () {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'code';
    var codes = Object.keys(i18n._translations);

    switch (type) {
      case 'code':
        return codes;

      case 'name':
        return codes.map(i18n.getLanguageName);

      case 'nativeName':
        return codes.map(i18n.getLanguageNativeName);

      default:
        return [];
    }
  },
  getCurrencyCodes: function () {
    var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : i18n.getLocale();
    var countryCode = locale.substr(locale.lastIndexOf('-') + 1).toUpperCase();
    return CURRENCIES[countryCode];
  },
  getCurrencySymbol: function () {
    var localeOrCurrCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : i18n.getLocale();
    var code = i18n.getCurrencyCodes(localeOrCurrCode);
    code = code && code[0] || localeOrCurrCode;
    return SYMBOLS[code];
  },
  getLanguageName: function () {
    var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : i18n.getLocale();
    locale = locale.toLowerCase().replace('_', '-');
    return LOCALES[locale] && LOCALES[locale][1];
  },
  getLanguageNativeName: function () {
    var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : i18n.getLocale();
    locale = locale.toLowerCase().replace('_', '-');
    return LOCALES[locale] && LOCALES[locale][2];
  },
  isRTL: function () {
    var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : i18n.getLocale();
    locale = locale.toLowerCase().replace('_', '-');
    return LOCALES[locale] && LOCALES[locale][3];
  },
  onChangeLocale: function (fn) {
    if (typeof fn !== 'function') {
      return console.error('Handler must be function');
    }

    _events.on('changeLocale', fn);
  },
  onceChangeLocale: function (fn) {
    if (typeof fn !== 'function') {
      return console.error('Handler must be function');
    }

    _events.once('changeLocale', fn);
  },
  offChangeLocale: function (fn) {
    _events.off('changeLocale', fn);
  },
  getAllKeysForLocale: function () {
    var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : i18n.getLocale();
    var exactlyThis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var iterator = new RecursiveIterator(i18n._translations[locale]);
    var keys = Object.create(null);

    for (var _iterator = iterator, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var _ref5 = _ref2;
      var _node2 = _ref5.node;
      var _path2 = _ref5.path;

      if (iterator.isLeaf(_node2)) {
        keys[_path2.join('.')] = true;
      }
    }

    var indx = locale.indexOf('-');

    if (!exactlyThis && indx >= 2) {
      locale = locale.substr(0, indx);
      iterator = new RecursiveIterator(i18n._translations[locale]);

      for (var _iterator2 = iterator, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref4 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref4 = _i2.value;
        }

        var _ref3 = _ref4;
        var node = _ref3.node,
            path = _ref3.path;

        if (iterator.isLeaf(node)) {
          keys[path.join('.')] = true;
        }
      }
    }

    return Object.keys(keys);
  }
};

if (Meteor.isServer) {
  // Meteor context must always run within a Fiber.
  var Fiber = Npm.require('fibers');

  var _get = contextualLocale.get.bind(contextualLocale);

  contextualLocale.get = function () {
    if (Fiber.current) {
      return _get() || i18n._getConnectionLocale();
    }
  };
}

i18n._ts = 0;
i18n.__ = i18n.getTranslation;
i18n.addTranslations = i18n.addTranslation;

i18n.getRefreshMixin = function () {
  return {
    _localeChanged: function (locale) {
      this.setState({
        locale: locale
      });
    },
    componentWillMount: function () {
      i18n.onChangeLocale(this._localeChanged);
    },
    componentWillUnmount: function () {
      i18n.offChangeLocale(this._localeChanged);
    }
  };
};

i18n.setOptions({
  defaultLocale: 'en-US',
  open: '{$',
  close: '}',
  pathOnHost: 'universe/locale/',
  hideMissing: false,
  hostUrl: Meteor.absoluteUrl(),
  sameLocaleOnServerConnection: true
});

if (Meteor.isClient && typeof document !== 'undefined' && typeof document.createElement === 'function') {
  var textarea = document.createElement('textarea');

  if (textarea) {
    i18n.setOptions({
      purify: function (str) {
        textarea.innerHTML = str;
        return textarea.innerHTML;
      }
    });
  }
}

function format(int, sep) {
  var str = '';
  var n;

  while (int) {
    n = int % 1e3;
    int = parseInt(int / 1e3);
    if (int === 0) return n + str;
    str = sep + (n < 10 ? '00' : n < 100 ? '0' : '') + n + str;
  }

  return '0';
}

_i18n = i18n;
module.exportDefault(i18n);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"locales.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe_i18n/lib/locales.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  LOCALES: function () {
    return LOCALES;
  },
  CURRENCIES: function () {
    return CURRENCIES;
  },
  SYMBOLS: function () {
    return SYMBOLS;
  }
});
var LOCALES = {
  //   key: [code, name, localName, isRTL, numberTypographic, decimal, currency, groupNumberBY]
  "af": ["af", "Afrikaans", "Afrikaans", false, ",.", 2, "R", [3]],
  "af-za": ["af-ZA", "Afrikaans (South Africa)", "Afrikaans (Suid Afrika)", false, ",.", 2, "R", [3]],
  "am": ["am", "Amharic", "አማርኛ", false, ",.", 1, "ETB", [3, 0]],
  "am-et": ["am-ET", "Amharic (Ethiopia)", "አማርኛ (ኢትዮጵያ)", false, ",.", 1, "ETB", [3, 0]],
  "ar": ["ar", "Arabic", "العربية", true, ",.", 2, "ر.س.‏", [3]],
  "ar-ae": ["ar-AE", "Arabic (U.A.E.)", "العربية (الإمارات العربية المتحدة)", true, ",.", 2, "د.إ.‏", [3]],
  "ar-bh": ["ar-BH", "Arabic (Bahrain)", "العربية (البحرين)", true, ",.", 3, "د.ب.‏", [3]],
  "ar-dz": ["ar-DZ", "Arabic (Algeria)", "العربية (الجزائر)", true, ",.", 2, "د.ج.‏", [3]],
  "ar-eg": ["ar-EG", "Arabic (Egypt)", "العربية (مصر)", true, ",.", 3, "ج.م.‏", [3]],
  "ar-iq": ["ar-IQ", "Arabic (Iraq)", "العربية (العراق)", true, ",.", 2, "د.ع.‏", [3]],
  "ar-jo": ["ar-JO", "Arabic (Jordan)", "العربية (الأردن)", true, ",.", 3, "د.ا.‏", [3]],
  "ar-kw": ["ar-KW", "Arabic (Kuwait)", "العربية (الكويت)", true, ",.", 3, "د.ك.‏", [3]],
  "ar-lb": ["ar-LB", "Arabic (Lebanon)", "العربية (لبنان)", true, ",.", 2, "ل.ل.‏", [3]],
  "ar-ly": ["ar-LY", "Arabic (Libya)", "العربية (ليبيا)", true, ",.", 3, "د.ل.‏", [3]],
  "ar-ma": ["ar-MA", "Arabic (Morocco)", "العربية (المملكة المغربية)", true, ",.", 2, "د.م.‏", [3]],
  "ar-om": ["ar-OM", "Arabic (Oman)", "العربية (عمان)", true, ",.", 2, "ر.ع.‏", [3]],
  "ar-qa": ["ar-QA", "Arabic (Qatar)", "العربية (قطر)", true, ",.", 2, "ر.ق.‏", [3]],
  "ar-sa": ["ar-SA", "Arabic (Saudi Arabia)", "العربية (المملكة العربية السعودية)", true, ",.", 2, "ر.س.‏", [3]],
  "ar-sy": ["ar-SY", "Arabic (Syria)", "العربية (سوريا)", true, ",.", 2, "ل.س.‏", [3]],
  "ar-tn": ["ar-TN", "Arabic (Tunisia)", "العربية (تونس)", true, ",.", 3, "د.ت.‏", [3]],
  "ar-ye": ["ar-YE", "Arabic (Yemen)", "العربية (اليمن)", true, ",.", 2, "ر.ي.‏", [3]],
  "arn": ["arn", "Mapudungun", "Mapudungun", false, ".,", 2, "$", [3]],
  "arn-cl": ["arn-CL", "Mapudungun (Chile)", "Mapudungun (Chile)", false, ".,", 2, "$", [3]],
  "as": ["as", "Assamese", "অসমীয়া", false, ",.", 2, "ট", [3, 2]],
  "as-in": ["as-IN", "Assamese (India)", "অসমীয়া (ভাৰত)", false, ",.", 2, "ট", [3, 2]],
  "az": ["az", "Azeri", "Azərbaycan­ılı", false, " ,", 2, "man.", [3]],
  "az-cyrl": ["az-Cyrl", "Azeri (Cyrillic)", "Азәрбајҹан дили", false, " ,", 2, "ман.", [3]],
  "az-cyrl-az": ["az-Cyrl-AZ", "Azeri (Cyrillic, Azerbaijan)", "Азәрбајҹан (Азәрбајҹан)", false, " ,", 2, "ман.", [3]],
  "az-latn": ["az-Latn", "Azeri (Latin)", "Azərbaycan­ılı", false, " ,", 2, "man.", [3]],
  "az-latn-az": ["az-Latn-AZ", "Azeri (Latin, Azerbaijan)", "Azərbaycan­ılı (Azərbaycan)", false, " ,", 2, "man.", [3]],
  "ba": ["ba", "Bashkir", "Башҡорт", false, " ,", 2, "һ.", [3, 0]],
  "ba-ru": ["ba-RU", "Bashkir (Russia)", "Башҡорт (Россия)", false, " ,", 2, "һ.", [3, 0]],
  "be": ["be", "Belarusian", "Беларускі", false, " ,", 2, "р.", [3]],
  "be-by": ["be-BY", "Belarusian (Belarus)", "Беларускі (Беларусь)", false, " ,", 2, "р.", [3]],
  "bg": ["bg", "Bulgarian", "български", false, " ,", 2, "лв.", [3]],
  "bg-bg": ["bg-BG", "Bulgarian (Bulgaria)", "български (България)", false, " ,", 2, "лв.", [3]],
  "bn": ["bn", "Bengali", "বাংলা", false, ",.", 2, "টা", [3, 2]],
  "bn-bd": ["bn-BD", "Bengali (Bangladesh)", "বাংলা (বাংলাদেশ)", false, ",.", 2, "৳", [3, 2]],
  "bn-in": ["bn-IN", "Bengali (India)", "বাংলা (ভারত)", false, ",.", 2, "টা", [3, 2]],
  "bo": ["bo", "Tibetan", "བོད་ཡིག", false, ",.", 2, "¥", [3, 0]],
  "bo-cn": ["bo-CN", "Tibetan (PRC)", "བོད་ཡིག (ཀྲུང་ཧྭ་མི་དམངས་སྤྱི་མཐུན་རྒྱལ་ཁབ།)", false, ",.", 2, "¥", [3, 0]],
  "br": ["br", "Breton", "brezhoneg", false, " ,", 2, "€", [3]],
  "br-fr": ["br-FR", "Breton (France)", "brezhoneg (Frañs)", false, " ,", 2, "€", [3]],
  "bs": ["bs", "Bosnian", "bosanski", false, ".,", 2, "KM", [3]],
  "bs-cyrl": ["bs-Cyrl", "Bosnian (Cyrillic)", "босански", false, ".,", 2, "КМ", [3]],
  "bs-cyrl-ba": ["bs-Cyrl-BA", "Bosnian (Cyrillic, Bosnia and Herzegovina)", "босански (Босна и Херцеговина)", false, ".,", 2, "КМ", [3]],
  "bs-latn": ["bs-Latn", "Bosnian (Latin)", "bosanski", false, ".,", 2, "KM", [3]],
  "bs-latn-ba": ["bs-Latn-BA", "Bosnian (Latin, Bosnia and Herzegovina)", "bosanski (Bosna i Hercegovina)", false, ".,", 2, "KM", [3]],
  "ca": ["ca", "Catalan", "català", false, ".,", 2, "€", [3]],
  "ca-es": ["ca-ES", "Catalan (Catalan)", "català (català)", false, ".,", 2, "€", [3]],
  "co": ["co", "Corsican", "Corsu", false, " ,", 2, "€", [3]],
  "co-fr": ["co-FR", "Corsican (France)", "Corsu (France)", false, " ,", 2, "€", [3]],
  "cs": ["cs", "Czech", "čeština", false, " ,", 2, "Kč", [3]],
  "cs-cz": ["cs-CZ", "Czech (Czech Republic)", "čeština (Česká republika)", false, " ,", 2, "Kč", [3]],
  "cy": ["cy", "Welsh", "Cymraeg", false, ",.", 2, "£", [3]],
  "cy-gb": ["cy-GB", "Welsh (United Kingdom)", "Cymraeg (y Deyrnas Unedig)", false, ",.", 2, "£", [3]],
  "da": ["da", "Danish", "dansk", false, ".,", 2, "kr.", [3]],
  "da-dk": ["da-DK", "Danish (Denmark)", "dansk (Danmark)", false, ".,", 2, "kr.", [3]],
  "de": ["de", "German", "Deutsch", false, ".,", 2, "€", [3]],
  "de-at": ["de-AT", "German (Austria)", "Deutsch (Österreich)", false, ".,", 2, "€", [3]],
  "de-ch": ["de-CH", "German (Switzerland)", "Deutsch (Schweiz)", false, "'.", 2, "Fr.", [3]],
  "de-de": ["de-DE", "German (Germany)", "Deutsch (Deutschland)", false, ".,", 2, "€", [3]],
  "de-li": ["de-LI", "German (Liechtenstein)", "Deutsch (Liechtenstein)", false, "'.", 2, "CHF", [3]],
  "de-lu": ["de-LU", "German (Luxembourg)", "Deutsch (Luxemburg)", false, ".,", 2, "€", [3]],
  "dsb": ["dsb", "Lower Sorbian", "dolnoserbšćina", false, ".,", 2, "€", [3]],
  "dsb-de": ["dsb-DE", "Lower Sorbian (Germany)", "dolnoserbšćina (Nimska)", false, ".,", 2, "€", [3]],
  "dv": ["dv", "Divehi", "ދިވެހިބަސް", true, ",.", 2, "ރ.", [3]],
  "dv-mv": ["dv-MV", "Divehi (Maldives)", "ދިވެހިބަސް (ދިވެހި ރާއްޖެ)", true, ",.", 2, "ރ.", [3]],
  "el": ["el", "Greek", "Ελληνικά", false, ".,", 2, "€", [3]],
  "el-gr": ["el-GR", "Greek (Greece)", "Ελληνικά (Ελλάδα)", false, ".,", 2, "€", [3]],
  "en": ["en", "English", "English", false, ",.", 2, "$", [3]],
  "en-029": ["en-029", "English (Caribbean)", "English (Caribbean)", false, ",.", 2, "$", [3]],
  "en-au": ["en-AU", "English (Australia)", "English (Australia)", false, ",.", 2, "$", [3]],
  "en-bz": ["en-BZ", "English (Belize)", "English (Belize)", false, ",.", 2, "BZ$", [3]],
  "en-ca": ["en-CA", "English (Canada)", "English (Canada)", false, ",.", 2, "$", [3]],
  "en-gb": ["en-GB", "English (United Kingdom)", "English (United Kingdom)", false, ",.", 2, "£", [3]],
  "en-ie": ["en-IE", "English (Ireland)", "English (Ireland)", false, ",.", 2, "€", [3]],
  "en-in": ["en-IN", "English (India)", "English (India)", false, ",.", 2, "Rs.", [3, 2]],
  "en-jm": ["en-JM", "English (Jamaica)", "English (Jamaica)", false, ",.", 2, "J$", [3]],
  "en-my": ["en-MY", "English (Malaysia)", "English (Malaysia)", false, ",.", 2, "RM", [3]],
  "en-nz": ["en-NZ", "English (New Zealand)", "English (New Zealand)", false, ",.", 2, "$", [3]],
  "en-ph": ["en-PH", "English (Republic of the Philippines)", "English (Philippines)", false, ",.", 2, "Php", [3]],
  "en-sg": ["en-SG", "English (Singapore)", "English (Singapore)", false, ",.", 2, "$", [3]],
  "en-tt": ["en-TT", "English (Trinidad and Tobago)", "English (Trinidad y Tobago)", false, ",.", 2, "TT$", [3]],
  "en-us": ["en-US", "English (United States)", "English", false, ",.", 2, "$", [3]],
  "en-za": ["en-ZA", "English (South Africa)", "English (South Africa)", false, " ,", 2, "R", [3]],
  "en-zw": ["en-ZW", "English (Zimbabwe)", "English (Zimbabwe)", false, ",.", 2, "Z$", [3]],
  "es": ["es", "Spanish", "español", false, ".,", 2, "€", [3]],
  "es-ar": ["es-AR", "Spanish (Argentina)", "Español (Argentina)", false, ".,", 2, "$", [3]],
  "es-bo": ["es-BO", "Spanish (Bolivia)", "Español (Bolivia)", false, ".,", 2, "$b", [3]],
  "es-cl": ["es-CL", "Spanish (Chile)", "Español (Chile)", false, ".,", 2, "$", [3]],
  "es-co": ["es-CO", "Spanish (Colombia)", "Español (Colombia)", false, ".,", 2, "$", [3]],
  "es-cr": ["es-CR", "Spanish (Costa Rica)", "Español (Costa Rica)", false, ".,", 2, "₡", [3]],
  "es-do": ["es-DO", "Spanish (Dominican Republic)", "Español (República Dominicana)", false, ",.", 2, "RD$", [3]],
  "es-ec": ["es-EC", "Spanish (Ecuador)", "Español (Ecuador)", false, ".,", 2, "$", [3]],
  "es-es": ["es-ES", "Spanish (Spain, International Sort)", "Español (España, alfabetización internacional)", false, ".,", 2, "€", [3]],
  "es-gt": ["es-GT", "Spanish (Guatemala)", "Español (Guatemala)", false, ",.", 2, "Q", [3]],
  "es-hn": ["es-HN", "Spanish (Honduras)", "Español (Honduras)", false, ",.", 2, "L.", [3]],
  "es-mx": ["es-MX", "Spanish (Mexico)", "Español (México)", false, ",.", 2, "$", [3]],
  "es-ni": ["es-NI", "Spanish (Nicaragua)", "Español (Nicaragua)", false, ",.", 2, "C$", [3]],
  "es-pa": ["es-PA", "Spanish (Panama)", "Español (Panamá)", false, ",.", 2, "B/.", [3]],
  "es-pe": ["es-PE", "Spanish (Peru)", "Español (Perú)", false, ",.", 2, "S/.", [3]],
  "es-pr": ["es-PR", "Spanish (Puerto Rico)", "Español (Puerto Rico)", false, ",.", 2, "$", [3]],
  "es-py": ["es-PY", "Spanish (Paraguay)", "Español (Paraguay)", false, ".,", 2, "Gs", [3]],
  "es-sv": ["es-SV", "Spanish (El Salvador)", "Español (El Salvador)", false, ",.", 2, "$", [3]],
  "es-us": ["es-US", "Spanish (United States)", "Español (Estados Unidos)", false, ",.", 2, "$", [3, 0]],
  "es-uy": ["es-UY", "Spanish (Uruguay)", "Español (Uruguay)", false, ".,", 2, "$U", [3]],
  "es-ve": ["es-VE", "Spanish (Bolivarian Republic of Venezuela)", "Español (Republica Bolivariana de Venezuela)", false, ".,", 2, "Bs. F.", [3]],
  "et": ["et", "Estonian", "eesti", false, " .", 2, "kr", [3]],
  "et-ee": ["et-EE", "Estonian (Estonia)", "eesti (Eesti)", false, " .", 2, "kr", [3]],
  "eu": ["eu", "Basque", "euskara", false, ".,", 2, "€", [3]],
  "eu-es": ["eu-ES", "Basque (Basque)", "euskara (euskara)", false, ".,", 2, "€", [3]],
  "fa": ["fa", "Persian", "فارسى", true, ",/", 2, "ريال", [3]],
  "fa-ir": ["fa-IR", "Persian", "فارسى (ایران)", true, ",/", 2, "ريال", [3]],
  "fi": ["fi", "Finnish", "suomi", false, " ,", 2, "€", [3]],
  "fi-fi": ["fi-FI", "Finnish (Finland)", "suomi (Suomi)", false, " ,", 2, "€", [3]],
  "fil": ["fil", "Filipino", "Filipino", false, ",.", 2, "PhP", [3]],
  "fil-ph": ["fil-PH", "Filipino (Philippines)", "Filipino (Pilipinas)", false, ",.", 2, "PhP", [3]],
  "fo": ["fo", "Faroese", "føroyskt", false, ".,", 2, "kr.", [3]],
  "fo-fo": ["fo-FO", "Faroese (Faroe Islands)", "føroyskt (Føroyar)", false, ".,", 2, "kr.", [3]],
  "fr": ["fr", "French", "Français", false, " ,", 2, "€", [3]],
  "fr-be": ["fr-BE", "French (Belgium)", "Français (Belgique)", false, ".,", 2, "€", [3]],
  "fr-ca": ["fr-CA", "French (Canada)", "Français (Canada)", false, " ,", 2, "$", [3]],
  "fr-ch": ["fr-CH", "French (Switzerland)", "Français (Suisse)", false, "'.", 2, "fr.", [3]],
  "fr-fr": ["fr-FR", "French (France)", "Français (France)", false, " ,", 2, "€", [3]],
  "fr-lu": ["fr-LU", "French (Luxembourg)", "Français (Luxembourg)", false, " ,", 2, "€", [3]],
  "fr-mc": ["fr-MC", "French (Monaco)", "Français (Principauté de Monaco)", false, " ,", 2, "€", [3]],
  "fy": ["fy", "Frisian", "Frysk", false, ".,", 2, "€", [3]],
  "fy-nl": ["fy-NL", "Frisian (Netherlands)", "Frysk (Nederlân)", false, ".,", 2, "€", [3]],
  "ga": ["ga", "Irish", "Gaeilge", false, ",.", 2, "€", [3]],
  "ga-ie": ["ga-IE", "Irish (Ireland)", "Gaeilge (Éire)", false, ",.", 2, "€", [3]],
  "gd": ["gd", "Scottish Gaelic", "Gàidhlig", false, ",.", 2, "£", [3]],
  "gd-gb": ["gd-GB", "Scottish Gaelic (United Kingdom)", "Gàidhlig (An Rìoghachd Aonaichte)", false, ",.", 2, "£", [3]],
  "gl": ["gl", "Galician", "galego", false, ".,", 2, "€", [3]],
  "gl-es": ["gl-ES", "Galician (Galician)", "galego (galego)", false, ".,", 2, "€", [3]],
  "gsw": ["gsw", "Alsatian", "Elsässisch", false, " ,", 2, "€", [3]],
  "gsw-fr": ["gsw-FR", "Alsatian (France)", "Elsässisch (Frànkrisch)", false, " ,", 2, "€", [3]],
  "gu": ["gu", "Gujarati", "ગુજરાતી", false, ",.", 2, "રૂ", [3, 2]],
  "gu-in": ["gu-IN", "Gujarati (India)", "ગુજરાતી (ભારત)", false, ",.", 2, "રૂ", [3, 2]],
  "ha": ["ha", "Hausa", "Hausa", false, ",.", 2, "N", [3]],
  "ha-latn": ["ha-Latn", "Hausa (Latin)", "Hausa", false, ",.", 2, "N", [3]],
  "ha-latn-ng": ["ha-Latn-NG", "Hausa (Latin, Nigeria)", "Hausa (Nigeria)", false, ",.", 2, "N", [3]],
  "he": ["he", "Hebrew", "עברית", true, ",.", 2, "₪", [3]],
  "he-il": ["he-IL", "Hebrew (Israel)", "עברית (ישראל)", true, ",.", 2, "₪", [3]],
  "hi": ["hi", "Hindi", "हिंदी", false, ",.", 2, "रु", [3, 2]],
  "hi-in": ["hi-IN", "Hindi (India)", "हिंदी (भारत)", false, ",.", 2, "रु", [3, 2]],
  "hr": ["hr", "Croatian", "hrvatski", false, ".,", 2, "kn", [3]],
  "hr-ba": ["hr-BA", "Croatian (Latin, Bosnia and Herzegovina)", "hrvatski (Bosna i Hercegovina)", false, ".,", 2, "KM", [3]],
  "hr-hr": ["hr-HR", "Croatian (Croatia)", "hrvatski (Hrvatska)", false, ".,", 2, "kn", [3]],
  "hsb": ["hsb", "Upper Sorbian", "hornjoserbšćina", false, ".,", 2, "€", [3]],
  "hsb-de": ["hsb-DE", "Upper Sorbian (Germany)", "hornjoserbšćina (Němska)", false, ".,", 2, "€", [3]],
  "hu": ["hu", "Hungarian", "magyar", false, " ,", 2, "Ft", [3]],
  "hu-hu": ["hu-HU", "Hungarian (Hungary)", "magyar (Magyarország)", false, " ,", 2, "Ft", [3]],
  "hy": ["hy", "Armenian", "Հայերեն", false, ",.", 2, "դր.", [3]],
  "hy-am": ["hy-AM", "Armenian (Armenia)", "Հայերեն (Հայաստան)", false, ",.", 2, "դր.", [3]],
  "id": ["id", "Indonesian", "Bahasa Indonesia", false, ".,", 2, "Rp", [3]],
  "id-id": ["id-ID", "Indonesian (Indonesia)", "Bahasa Indonesia (Indonesia)", false, ".,", 2, "Rp", [3]],
  "ig": ["ig", "Igbo", "Igbo", false, ",.", 2, "N", [3]],
  "ig-ng": ["ig-NG", "Igbo (Nigeria)", "Igbo (Nigeria)", false, ",.", 2, "N", [3]],
  "ii": ["ii", "Yi", "ꆈꌠꁱꂷ", false, ",.", 2, "¥", [3, 0]],
  "ii-cn": ["ii-CN", "Yi (PRC)", "ꆈꌠꁱꂷ (ꍏꉸꏓꂱꇭꉼꇩ)", false, ",.", 2, "¥", [3, 0]],
  "is": ["is", "Icelandic", "íslenska", false, ".,", 2, "kr.", [3]],
  "is-is": ["is-IS", "Icelandic (Iceland)", "íslenska (Ísland)", false, ".,", 2, "kr.", [3]],
  "it": ["it", "Italian", "italiano", false, ".,", 2, "€", [3]],
  "it-ch": ["it-CH", "Italian (Switzerland)", "italiano (Svizzera)", false, "'.", 2, "fr.", [3]],
  "it-it": ["it-IT", "Italian (Italy)", "italiano (Italia)", false, ".,", 2, "€", [3]],
  "iu": ["iu", "Inuktitut", "Inuktitut", false, ",.", 2, "$", [3, 0]],
  "iu-cans": ["iu-Cans", "Inuktitut (Syllabics)", "ᐃᓄᒃᑎᑐᑦ", false, ",.", 2, "$", [3, 0]],
  "iu-cans-ca": ["iu-Cans-CA", "Inuktitut (Syllabics, Canada)", "ᐃᓄᒃᑎᑐᑦ (ᑲᓇᑕᒥ)", false, ",.", 2, "$", [3, 0]],
  "iu-latn": ["iu-Latn", "Inuktitut (Latin)", "Inuktitut", false, ",.", 2, "$", [3, 0]],
  "iu-latn-ca": ["iu-Latn-CA", "Inuktitut (Latin, Canada)", "Inuktitut (Kanatami)", false, ",.", 2, "$", [3, 0]],
  "ja": ["ja", "Japanese", "日本語", false, ",.", 2, "¥", [3]],
  "ja-jp": ["ja-JP", "Japanese (Japan)", "日本語 (日本)", false, ",.", 2, "¥", [3]],
  "ka": ["ka", "Georgian", "ქართული", false, " ,", 2, "Lari", [3]],
  "ka-ge": ["ka-GE", "Georgian (Georgia)", "ქართული (საქართველო)", false, " ,", 2, "Lari", [3]],
  "kk": ["kk", "Kazakh", "Қазақ", false, " -", 2, "Т", [3]],
  "kk-kz": ["kk-KZ", "Kazakh (Kazakhstan)", "Қазақ (Қазақстан)", false, " -", 2, "Т", [3]],
  "kl": ["kl", "Greenlandic", "kalaallisut", false, ".,", 2, "kr.", [3, 0]],
  "kl-gl": ["kl-GL", "Greenlandic (Greenland)", "kalaallisut (Kalaallit Nunaat)", false, ".,", 2, "kr.", [3, 0]],
  "km": ["km", "Khmer", "ខ្មែរ", false, ",.", 2, "៛", [3, 0]],
  "km-kh": ["km-KH", "Khmer (Cambodia)", "ខ្មែរ (កម្ពុជា)", false, ",.", 2, "៛", [3, 0]],
  "kn": ["kn", "Kannada", "ಕನ್ನಡ", false, ",.", 2, "ರೂ", [3, 2]],
  "kn-in": ["kn-IN", "Kannada (India)", "ಕನ್ನಡ (ಭಾರತ)", false, ",.", 2, "ರೂ", [3, 2]],
  "ko": ["ko", "Korean", "한국어", false, ",.", 2, "₩", [3]],
  "ko-kr": ["ko-KR", "Korean (Korea)", "한국어 (대한민국)", false, ",.", 2, "₩", [3]],
  "kok": ["kok", "Konkani", "कोंकणी", false, ",.", 2, "रु", [3, 2]],
  "kok-in": ["kok-IN", "Konkani (India)", "कोंकणी (भारत)", false, ",.", 2, "रु", [3, 2]],
  "ky": ["ky", "Kyrgyz", "Кыргыз", false, " -", 2, "сом", [3]],
  "ky-kg": ["ky-KG", "Kyrgyz (Kyrgyzstan)", "Кыргыз (Кыргызстан)", false, " -", 2, "сом", [3]],
  "lb": ["lb", "Luxembourgish", "Lëtzebuergesch", false, " ,", 2, "€", [3]],
  "lb-lu": ["lb-LU", "Luxembourgish (Luxembourg)", "Lëtzebuergesch (Luxembourg)", false, " ,", 2, "€", [3]],
  "lo": ["lo", "Lao", "ລາວ", false, ",.", 2, "₭", [3, 0]],
  "lo-la": ["lo-LA", "Lao (Lao P.D.R.)", "ລາວ (ສ.ປ.ປ. ລາວ)", false, ",.", 2, "₭", [3, 0]],
  "lt": ["lt", "Lithuanian", "lietuvių", false, ".,", 2, "Lt", [3]],
  "lt-lt": ["lt-LT", "Lithuanian (Lithuania)", "lietuvių (Lietuva)", false, ".,", 2, "Lt", [3]],
  "lv": ["lv", "Latvian", "latviešu", false, " ,", 2, "Ls", [3]],
  "lv-lv": ["lv-LV", "Latvian (Latvia)", "latviešu (Latvija)", false, " ,", 2, "Ls", [3]],
  "mi": ["mi", "Maori", "Reo Māori", false, ",.", 2, "$", [3]],
  "mi-nz": ["mi-NZ", "Maori (New Zealand)", "Reo Māori (Aotearoa)", false, ",.", 2, "$", [3]],
  "mk": ["mk", "Macedonian (FYROM)", "македонски јазик", false, ".,", 2, "ден.", [3]],
  "mk-mk": ["mk-MK", "Macedonian (Former Yugoslav Republic of Macedonia)", "македонски јазик (Македонија)", false, ".,", 2, "ден.", [3]],
  "ml": ["ml", "Malayalam", "മലയാളം", false, ",.", 2, "ക", [3, 2]],
  "ml-in": ["ml-IN", "Malayalam (India)", "മലയാളം (ഭാരതം)", false, ",.", 2, "ക", [3, 2]],
  "mn": ["mn", "Mongolian", "Монгол хэл", false, " ,", 2, "₮", [3]],
  "mn-cyrl": ["mn-Cyrl", "Mongolian (Cyrillic)", "Монгол хэл", false, " ,", 2, "₮", [3]],
  "mn-mn": ["mn-MN", "Mongolian (Cyrillic, Mongolia)", "Монгол хэл (Монгол улс)", false, " ,", 2, "₮", [3]],
  "mn-mong": ["mn-Mong", "Mongolian (Traditional Mongolian)", "ᠮᠤᠨᠭᠭᠤᠯ ᠬᠡᠯᠡ", false, ",.", 2, "¥", [3, 0]],
  "mn-mong-cn": ["mn-Mong-CN", "Mongolian (Traditional Mongolian, PRC)", "ᠮᠤᠨᠭᠭᠤᠯ ᠬᠡᠯᠡ (ᠪᠦᠭᠦᠳᠡ ᠨᠠᠢᠷᠠᠮᠳᠠᠬᠤ ᠳᠤᠮᠳᠠᠳᠤ ᠠᠷᠠᠳ ᠣᠯᠣᠰ)", false, ",.", 2, "¥", [3, 0]],
  "moh": ["moh", "Mohawk", "Kanien'kéha", false, ",.", 2, "$", [3, 0]],
  "moh-ca": ["moh-CA", "Mohawk (Mohawk)", "Kanien'kéha", false, ",.", 2, "$", [3, 0]],
  "mr": ["mr", "Marathi", "मराठी", false, ",.", 2, "रु", [3, 2]],
  "mr-in": ["mr-IN", "Marathi (India)", "मराठी (भारत)", false, ",.", 2, "रु", [3, 2]],
  "ms": ["ms", "Malay", "Bahasa Melayu", false, ",.", 2, "RM", [3]],
  "ms-bn": ["ms-BN", "Malay (Brunei Darussalam)", "Bahasa Melayu (Brunei Darussalam)", false, ".,", 2, "$", [3]],
  "ms-my": ["ms-MY", "Malay (Malaysia)", "Bahasa Melayu (Malaysia)", false, ",.", 2, "RM", [3]],
  "mt": ["mt", "Maltese", "Malti", false, ",.", 2, "€", [3]],
  "mt-mt": ["mt-MT", "Maltese (Malta)", "Malti (Malta)", false, ",.", 2, "€", [3]],
  "nb": ["nb", "Norwegian (Bokmål)", "norsk (bokmål)", false, " ,", 2, "kr", [3]],
  "nb-no": ["nb-NO", "Norwegian, Bokmål (Norway)", "norsk, bokmål (Norge)", false, " ,", 2, "kr", [3]],
  "ne": ["ne", "Nepali", "नेपाली", false, ",.", 2, "रु", [3, 2]],
  "ne-np": ["ne-NP", "Nepali (Nepal)", "नेपाली (नेपाल)", false, ",.", 2, "रु", [3, 2]],
  "nl": ["nl", "Dutch", "Nederlands", false, ".,", 2, "€", [3]],
  "nl-be": ["nl-BE", "Dutch (Belgium)", "Nederlands (België)", false, ".,", 2, "€", [3]],
  "nl-nl": ["nl-NL", "Dutch (Netherlands)", "Nederlands (Nederland)", false, ".,", 2, "€", [3]],
  "nn": ["nn", "Norwegian (Nynorsk)", "norsk (nynorsk)", false, " ,", 2, "kr", [3]],
  "nn-no": ["nn-NO", "Norwegian, Nynorsk (Norway)", "norsk, nynorsk (Noreg)", false, " ,", 2, "kr", [3]],
  "no": ["no", "Norwegian", "norsk", false, " ,", 2, "kr", [3]],
  "nso": ["nso", "Sesotho sa Leboa", "Sesotho sa Leboa", false, ",.", 2, "R", [3]],
  "nso-za": ["nso-ZA", "Sesotho sa Leboa (South Africa)", "Sesotho sa Leboa (Afrika Borwa)", false, ",.", 2, "R", [3]],
  "oc": ["oc", "Occitan", "Occitan", false, " ,", 2, "€", [3]],
  "oc-fr": ["oc-FR", "Occitan (France)", "Occitan (França)", false, " ,", 2, "€", [3]],
  "or": ["or", "Oriya", "ଓଡ଼ିଆ", false, ",.", 2, "ଟ", [3, 2]],
  "or-in": ["or-IN", "Oriya (India)", "ଓଡ଼ିଆ (ଭାରତ)", false, ",.", 2, "ଟ", [3, 2]],
  "pa": ["pa", "Punjabi", "ਪੰਜਾਬੀ", false, ",.", 2, "ਰੁ", [3, 2]],
  "pa-in": ["pa-IN", "Punjabi (India)", "ਪੰਜਾਬੀ (ਭਾਰਤ)", false, ",.", 2, "ਰੁ", [3, 2]],
  "pl": ["pl", "Polish", "polski", false, " ,", 2, "zł", [3]],
  "pl-pl": ["pl-PL", "Polish (Poland)", "polski (Polska)", false, " ,", 2, "zł", [3]],
  "prs": ["prs", "Dari", "درى", true, ",.", 2, "؋", [3]],
  "prs-af": ["prs-AF", "Dari (Afghanistan)", "درى (افغانستان)", true, ",.", 2, "؋", [3]],
  "ps": ["ps", "Pashto", "پښتو", true, "٬٫", 2, "؋", [3]],
  "ps-af": ["ps-AF", "Pashto (Afghanistan)", "پښتو (افغانستان)", true, "٬٫", 2, "؋", [3]],
  "pt": ["pt", "Portuguese", "Português", false, ".,", 2, "R$", [3]],
  "pt-br": ["pt-BR", "Portuguese (Brazil)", "Português (Brasil)", false, ".,", 2, "R$", [3]],
  "pt-pt": ["pt-PT", "Portuguese (Portugal)", "português (Portugal)", false, ".,", 2, "€", [3]],
  "qut": ["qut", "K'iche", "K'iche", false, ",.", 2, "Q", [3]],
  "qut-gt": ["qut-GT", "K'iche (Guatemala)", "K'iche (Guatemala)", false, ",.", 2, "Q", [3]],
  "quz": ["quz", "Quechua", "runasimi", false, ".,", 2, "$b", [3]],
  "quz-bo": ["quz-BO", "Quechua (Bolivia)", "runasimi (Qullasuyu)", false, ".,", 2, "$b", [3]],
  "quz-ec": ["quz-EC", "Quechua (Ecuador)", "runasimi (Ecuador)", false, ".,", 2, "$", [3]],
  "quz-pe": ["quz-PE", "Quechua (Peru)", "runasimi (Piruw)", false, ",.", 2, "S/.", [3]],
  "rm": ["rm", "Romansh", "Rumantsch", false, "'.", 2, "fr.", [3]],
  "rm-ch": ["rm-CH", "Romansh (Switzerland)", "Rumantsch (Svizra)", false, "'.", 2, "fr.", [3]],
  "ro": ["ro", "Romanian", "română", false, ".,", 2, "lei", [3]],
  "ro-ro": ["ro-RO", "Romanian (Romania)", "română (România)", false, ".,", 2, "lei", [3]],
  "ru": ["ru", "Russian", "русский", false, " ,", 2, "р.", [3]],
  "ru-ru": ["ru-RU", "Russian (Russia)", "русский (Россия)", false, " ,", 2, "р.", [3]],
  "rw": ["rw", "Kinyarwanda", "Kinyarwanda", false, " ,", 2, "RWF", [3]],
  "rw-rw": ["rw-RW", "Kinyarwanda (Rwanda)", "Kinyarwanda (Rwanda)", false, " ,", 2, "RWF", [3]],
  "sa": ["sa", "Sanskrit", "संस्कृत", false, ",.", 2, "रु", [3, 2]],
  "sa-in": ["sa-IN", "Sanskrit (India)", "संस्कृत (भारतम्)", false, ",.", 2, "रु", [3, 2]],
  "sah": ["sah", "Yakut", "саха", false, " ,", 2, "с.", [3]],
  "sah-ru": ["sah-RU", "Yakut (Russia)", "саха (Россия)", false, " ,", 2, "с.", [3]],
  "se": ["se", "Sami (Northern)", "davvisámegiella", false, " ,", 2, "kr", [3]],
  "se-fi": ["se-FI", "Sami, Northern (Finland)", "davvisámegiella (Suopma)", false, " ,", 2, "€", [3]],
  "se-no": ["se-NO", "Sami, Northern (Norway)", "davvisámegiella (Norga)", false, " ,", 2, "kr", [3]],
  "se-se": ["se-SE", "Sami, Northern (Sweden)", "davvisámegiella (Ruoŧŧa)", false, ".,", 2, "kr", [3]],
  "si": ["si", "Sinhala", "සිංහල", false, ",.", 2, "රු.", [3, 2]],
  "si-lk": ["si-LK", "Sinhala (Sri Lanka)", "සිංහල (ශ්‍රී ලංකා)", false, ",.", 2, "රු.", [3, 2]],
  "sk": ["sk", "Slovak", "slovenčina", false, " ,", 2, "€", [3]],
  "sk-sk": ["sk-SK", "Slovak (Slovakia)", "slovenčina (Slovenská republika)", false, " ,", 2, "€", [3]],
  "sl": ["sl", "Slovenian", "slovenski", false, ".,", 2, "€", [3]],
  "sl-si": ["sl-SI", "Slovenian (Slovenia)", "slovenski (Slovenija)", false, ".,", 2, "€", [3]],
  "sma": ["sma", "Sami (Southern)", "åarjelsaemiengiele", false, ".,", 2, "kr", [3]],
  "sma-no": ["sma-NO", "Sami, Southern (Norway)", "åarjelsaemiengiele (Nöörje)", false, " ,", 2, "kr", [3]],
  "sma-se": ["sma-SE", "Sami, Southern (Sweden)", "åarjelsaemiengiele (Sveerje)", false, ".,", 2, "kr", [3]],
  "smj": ["smj", "Sami (Lule)", "julevusámegiella", false, ".,", 2, "kr", [3]],
  "smj-no": ["smj-NO", "Sami, Lule (Norway)", "julevusámegiella (Vuodna)", false, " ,", 2, "kr", [3]],
  "smj-se": ["smj-SE", "Sami, Lule (Sweden)", "julevusámegiella (Svierik)", false, ".,", 2, "kr", [3]],
  "smn": ["smn", "Sami (Inari)", "sämikielâ", false, " ,", 2, "€", [3]],
  "smn-fi": ["smn-FI", "Sami, Inari (Finland)", "sämikielâ (Suomâ)", false, " ,", 2, "€", [3]],
  "sms": ["sms", "Sami (Skolt)", "sääm´ǩiõll", false, " ,", 2, "€", [3]],
  "sms-fi": ["sms-FI", "Sami, Skolt (Finland)", "sääm´ǩiõll (Lää´ddjânnam)", false, " ,", 2, "€", [3]],
  "sq": ["sq", "Albanian", "shqipe", false, ".,", 2, "Lek", [3]],
  "sq-al": ["sq-AL", "Albanian (Albania)", "shqipe (Shqipëria)", false, ".,", 2, "Lek", [3]],
  "sr": ["sr", "Serbian", "srpski", false, ".,", 2, "Din.", [3]],
  "sr-cyrl": ["sr-Cyrl", "Serbian (Cyrillic)", "српски", false, ".,", 2, "Дин.", [3]],
  "sr-cyrl-ba": ["sr-Cyrl-BA", "Serbian (Cyrillic, Bosnia and Herzegovina)", "српски (Босна и Херцеговина)", false, ".,", 2, "КМ", [3]],
  "sr-cyrl-cs": ["sr-Cyrl-CS", "Serbian (Cyrillic, Serbia and Montenegro (Former))", "српски (Србија и Црна Гора (Претходно))", false, ".,", 2, "Дин.", [3]],
  "sr-cyrl-me": ["sr-Cyrl-ME", "Serbian (Cyrillic, Montenegro)", "српски (Црна Гора)", false, ".,", 2, "€", [3]],
  "sr-cyrl-rs": ["sr-Cyrl-RS", "Serbian (Cyrillic, Serbia)", "српски (Србија)", false, ".,", 2, "Дин.", [3]],
  "sr-latn": ["sr-Latn", "Serbian (Latin)", "srpski", false, ".,", 2, "Din.", [3]],
  "sr-latn-ba": ["sr-Latn-BA", "Serbian (Latin, Bosnia and Herzegovina)", "srpski (Bosna i Hercegovina)", false, ".,", 2, "KM", [3]],
  "sr-latn-cs": ["sr-Latn-CS", "Serbian (Latin, Serbia and Montenegro (Former))", "srpski (Srbija i Crna Gora (Prethodno))", false, ".,", 2, "Din.", [3]],
  "sr-latn-me": ["sr-Latn-ME", "Serbian (Latin, Montenegro)", "srpski (Crna Gora)", false, ".,", 2, "€", [3]],
  "sr-latn-rs": ["sr-Latn-RS", "Serbian (Latin, Serbia)", "srpski (Srbija)", false, ".,", 2, "Din.", [3]],
  "sv": ["sv", "Swedish", "svenska", false, ".,", 2, "kr", [3]],
  "sv-fi": ["sv-FI", "Swedish (Finland)", "svenska (Finland)", false, " ,", 2, "€", [3]],
  "sv-se": ["sv-SE", "Swedish (Sweden)", "svenska (Sverige)", false, ".,", 2, "kr", [3]],
  "sw": ["sw", "Kiswahili", "Kiswahili", false, ",.", 2, "S", [3]],
  "sw-ke": ["sw-KE", "Kiswahili (Kenya)", "Kiswahili (Kenya)", false, ",.", 2, "S", [3]],
  "syr": ["syr", "Syriac", "ܣܘܪܝܝܐ", true, ",.", 2, "ل.س.‏", [3]],
  "syr-sy": ["syr-SY", "Syriac (Syria)", "ܣܘܪܝܝܐ (سوريا)", true, ",.", 2, "ل.س.‏", [3]],
  "ta": ["ta", "Tamil", "தமிழ்", false, ",.", 2, "ரூ", [3, 2]],
  "ta-in": ["ta-IN", "Tamil (India)", "தமிழ் (இந்தியா)", false, ",.", 2, "ரூ", [3, 2]],
  "te": ["te", "Telugu", "తెలుగు", false, ",.", 2, "రూ", [3, 2]],
  "te-in": ["te-IN", "Telugu (India)", "తెలుగు (భారత దేశం)", false, ",.", 2, "రూ", [3, 2]],
  "tg": ["tg", "Tajik", "Тоҷикӣ", false, " ;", 2, "т.р.", [3, 0]],
  "tg-cyrl": ["tg-Cyrl", "Tajik (Cyrillic)", "Тоҷикӣ", false, " ;", 2, "т.р.", [3, 0]],
  "tg-cyrl-tj": ["tg-Cyrl-TJ", "Tajik (Cyrillic, Tajikistan)", "Тоҷикӣ (Тоҷикистон)", false, " ;", 2, "т.р.", [3, 0]],
  "th": ["th", "Thai", "ไทย", false, ",.", 2, "฿", [3]],
  "th-th": ["th-TH", "Thai (Thailand)", "ไทย (ไทย)", false, ",.", 2, "฿", [3]],
  "tk": ["tk", "Turkmen", "türkmençe", false, " ,", 2, "m.", [3]],
  "tk-tm": ["tk-TM", "Turkmen (Turkmenistan)", "türkmençe (Türkmenistan)", false, " ,", 2, "m.", [3]],
  "tn": ["tn", "Setswana", "Setswana", false, ",.", 2, "R", [3]],
  "tn-za": ["tn-ZA", "Setswana (South Africa)", "Setswana (Aforika Borwa)", false, ",.", 2, "R", [3]],
  "tr": ["tr", "Turkish", "Türkçe", false, ".,", 2, "TL", [3]],
  "tr-tr": ["tr-TR", "Turkish (Turkey)", "Türkçe (Türkiye)", false, ".,", 2, "TL", [3]],
  "tt": ["tt", "Tatar", "Татар", false, " ,", 2, "р.", [3]],
  "tt-ru": ["tt-RU", "Tatar (Russia)", "Татар (Россия)", false, " ,", 2, "р.", [3]],
  "tzm": ["tzm", "Tamazight", "Tamazight", false, ",.", 2, "DZD", [3]],
  "tzm-latn": ["tzm-Latn", "Tamazight (Latin)", "Tamazight", false, ",.", 2, "DZD", [3]],
  "tzm-latn-dz": ["tzm-Latn-DZ", "Tamazight (Latin, Algeria)", "Tamazight (Djazaïr)", false, ",.", 2, "DZD", [3]],
  "ug": ["ug", "Uyghur", "ئۇيغۇرچە", true, ",.", 2, "¥", [3]],
  "ug-cn": ["ug-CN", "Uyghur (PRC)", "ئۇيغۇرچە (جۇڭخۇا خەلق جۇمھۇرىيىتى)", true, ",.", 2, "¥", [3]],
  "ua": ["ua", "Ukrainian", "українська", false, " ,", 2, "₴", [3]],
  //not iso639-2 but often used
  "uk": ["uk", "Ukrainian", "українська", false, " ,", 2, "₴", [3]],
  "uk-ua": ["uk-UA", "Ukrainian (Ukraine)", "українська (Україна)", false, " ,", 2, "₴", [3]],
  "ur": ["ur", "Urdu", "اُردو", true, ",.", 2, "Rs", [3]],
  "ur-pk": ["ur-PK", "Urdu (Islamic Republic of Pakistan)", "اُردو (پاکستان)", true, ",.", 2, "Rs", [3]],
  "uz": ["uz", "Uzbek", "U'zbek", false, " ,", 2, "so'm", [3]],
  "uz-cyrl": ["uz-Cyrl", "Uzbek (Cyrillic)", "Ўзбек", false, " ,", 2, "сўм", [3]],
  "uz-cyrl-uz": ["uz-Cyrl-UZ", "Uzbek (Cyrillic, Uzbekistan)", "Ўзбек (Ўзбекистон)", false, " ,", 2, "сўм", [3]],
  "uz-latn": ["uz-Latn", "Uzbek (Latin)", "U'zbek", false, " ,", 2, "so'm", [3]],
  "uz-latn-uz": ["uz-Latn-UZ", "Uzbek (Latin, Uzbekistan)", "U'zbek (U'zbekiston Respublikasi)", false, " ,", 2, "so'm", [3]],
  "vi": ["vi", "Vietnamese", "Tiếng Việt", false, ".,", 2, "₫", [3]],
  "vi-vn": ["vi-VN", "Vietnamese (Vietnam)", "Tiếng Việt (Việt Nam)", false, ".,", 2, "₫", [3]],
  "wo": ["wo", "Wolof", "Wolof", false, " ,", 2, "XOF", [3]],
  "wo-sn": ["wo-SN", "Wolof (Senegal)", "Wolof (Sénégal)", false, " ,", 2, "XOF", [3]],
  "xh": ["xh", "isiXhosa", "isiXhosa", false, ",.", 2, "R", [3]],
  "xh-za": ["xh-ZA", "isiXhosa (South Africa)", "isiXhosa (uMzantsi Afrika)", false, ",.", 2, "R", [3]],
  "yo": ["yo", "Yoruba", "Yoruba", false, ",.", 2, "N", [3]],
  "yo-ng": ["yo-NG", "Yoruba (Nigeria)", "Yoruba (Nigeria)", false, ",.", 2, "N", [3]],
  "zh": ["zh", "Chinese", "中文", false, ",.", 2, "¥", [3]],
  "zh-chs": ["zh-CHS", "Chinese (Simplified) Legacy", "中文(简体) 旧版", false, ",.", 2, "¥", [3]],
  "zh-cht": ["zh-CHT", "Chinese (Traditional) Legacy", "中文(繁體) 舊版", false, ",.", 2, "HK$", [3]],
  "zh-cn": ["zh-CN", "Chinese (Simplified, PRC)", "中文(中华人民共和国)", false, ",.", 2, "¥", [3]],
  "zh-hans": ["zh-Hans", "Chinese (Simplified)", "中文(简体)", false, ",.", 2, "¥", [3]],
  "zh-hant": ["zh-Hant", "Chinese (Traditional)", "中文(繁體)", false, ",.", 2, "HK$", [3]],
  "zh-hk": ["zh-HK", "Chinese (Traditional, Hong Kong S.A.R.)", "中文(香港特別行政區)", false, ",.", 2, "HK$", [3]],
  "zh-mo": ["zh-MO", "Chinese (Traditional, Macao S.A.R.)", "中文(澳門特別行政區)", false, ",.", 2, "MOP", [3]],
  "zh-sg": ["zh-SG", "Chinese (Simplified, Singapore)", "中文(新加坡)", false, ",.", 2, "$", [3]],
  "zh-tw": ["zh-TW", "Chinese (Traditional, Taiwan)", "中文(台灣)", false, ",.", 2, "NT$", [3]],
  "zu": ["zu", "isiZulu", "isiZulu", false, ",.", 2, "R", [3]],
  "zu-za": ["zu-ZA", "isiZulu (South Africa)", "isiZulu (iNingizimu Afrika)", false, ",.", 2, "R", [3]]
};
module.exportDefault(LOCALES);
var CURRENCIES = {
  'AW': ['AWG'],
  'AF': ['AFN'],
  'AO': ['AOA'],
  'AI': ['XCD'],
  'AX': ['EUR'],
  'AL': ['ALL'],
  'AD': ['EUR'],
  'AE': ['AED'],
  'AR': ['ARS'],
  'AM': ['AMD'],
  'AS': ['USD'],
  'TF': ['EUR'],
  'AG': ['XCD'],
  'AU': ['AUD'],
  'AT': ['EUR'],
  'AZ': ['AZN'],
  'BI': ['BIF'],
  'BE': ['EUR'],
  'BJ': ['XOF'],
  'BF': ['XOF'],
  'BD': ['BDT'],
  'BG': ['BGN'],
  'BH': ['BHD'],
  'BS': ['BSD'],
  'BA': ['BAM'],
  'BL': ['EUR'],
  'BY': ['BYR'],
  'BZ': ['BZD'],
  'BM': ['BMD'],
  'BO': ['BOB', 'BOV'],
  'BR': ['BRL'],
  'BB': ['BBD'],
  'BN': ['BND'],
  'BT': ['BTN', 'INR'],
  'BV': ['NOK'],
  'BW': ['BWP'],
  'CF': ['XAF'],
  'CA': ['CAD'],
  'CC': ['AUD'],
  'CH': ['CHE', 'CHF', 'CHW'],
  'CL': ['CLF', 'CLP'],
  'CN': ['CNY'],
  'CI': ['XOF'],
  'CM': ['XAF'],
  'CD': ['CDF'],
  'CG': ['XAF'],
  'CK': ['NZD'],
  'CO': ['COP'],
  'KM': ['KMF'],
  'CV': ['CVE'],
  'CR': ['CRC'],
  'CU': ['CUC', 'CUP'],
  'CW': ['ANG'],
  'CX': ['AUD'],
  'KY': ['KYD'],
  'CY': ['EUR'],
  'CZ': ['CZK'],
  'DE': ['EUR'],
  'DJ': ['DJF'],
  'DM': ['XCD'],
  'DK': ['DKK'],
  'DO': ['DOP'],
  'DZ': ['DZD'],
  'EC': ['USD'],
  'EG': ['EGP'],
  'ER': ['ERN'],
  'EH': ['MAD', 'DZD', 'MRO'],
  'ES': ['EUR'],
  'EE': ['EUR'],
  'ET': ['ETB'],
  'FI': ['EUR'],
  'FJ': ['FJD'],
  'FK': ['FKP'],
  'FR': ['EUR'],
  'FO': ['DKK'],
  'FM': ['USD'],
  'GA': ['XAF'],
  'GB': ['GBP'],
  'GE': ['GEL'],
  'GG': ['GBP'],
  'GH': ['GHS'],
  'GI': ['GIP'],
  'GN': ['GNF'],
  'GP': ['EUR'],
  'GM': ['GMD'],
  'GW': ['XOF'],
  'GQ': ['XAF'],
  'GR': ['EUR'],
  'GD': ['XCD'],
  'GL': ['DKK'],
  'GT': ['GTQ'],
  'GF': ['EUR'],
  'GU': ['USD'],
  'GY': ['GYD'],
  'HK': ['HKD'],
  'HM': ['AUD'],
  'HN': ['HNL'],
  'HR': ['HRK'],
  'HT': ['HTG', 'USD'],
  'HU': ['HUF'],
  'ID': ['IDR'],
  'IM': ['GBP'],
  'IN': ['INR'],
  'IO': ['USD'],
  'IE': ['EUR'],
  'IR': ['IRR'],
  'IQ': ['IQD'],
  'IS': ['ISK'],
  'IL': ['ILS'],
  'IT': ['EUR'],
  'JM': ['JMD'],
  'JE': ['GBP'],
  'JO': ['JOD'],
  'JP': ['JPY'],
  'KZ': ['KZT'],
  'KE': ['KES'],
  'KG': ['KGS'],
  'KH': ['KHR'],
  'KI': ['AUD'],
  'KN': ['XCD'],
  'KR': ['KRW'],
  'XK': ['EUR'],
  'KW': ['KWD'],
  'LA': ['LAK'],
  'LB': ['LBP'],
  'LR': ['LRD'],
  'LY': ['LYD'],
  'LC': ['XCD'],
  'LI': ['CHF'],
  'LK': ['LKR'],
  'LS': ['LSL', 'ZAR'],
  'LT': ['EUR'],
  'LU': ['EUR'],
  'LV': ['EUR'],
  'MO': ['MOP'],
  'MF': ['EUR'],
  'MA': ['MAD'],
  'MC': ['EUR'],
  'MD': ['MDL'],
  'MG': ['MGA'],
  'MV': ['MVR'],
  'MX': ['MXN'],
  'MH': ['USD'],
  'MK': ['MKD'],
  'ML': ['XOF'],
  'MT': ['EUR'],
  'MM': ['MMK'],
  'ME': ['EUR'],
  'MN': ['MNT'],
  'MP': ['USD'],
  'MZ': ['MZN'],
  'MR': ['MRO'],
  'MS': ['XCD'],
  'MQ': ['EUR'],
  'MU': ['MUR'],
  'MW': ['MWK'],
  'MY': ['MYR'],
  'YT': ['EUR'],
  'NA': ['NAD', 'ZAR'],
  'NC': ['XPF'],
  'NE': ['XOF'],
  'NF': ['AUD'],
  'NG': ['NGN'],
  'NI': ['NIO'],
  'NU': ['NZD'],
  'NL': ['EUR'],
  'NO': ['NOK'],
  'NP': ['NPR'],
  'NR': ['AUD'],
  'NZ': ['NZD'],
  'OM': ['OMR'],
  'PK': ['PKR'],
  'PA': ['PAB', 'USD'],
  'PN': ['NZD'],
  'PE': ['PEN'],
  'PH': ['PHP'],
  'PW': ['USD'],
  'PG': ['PGK'],
  'PL': ['PLN'],
  'PR': ['USD'],
  'KP': ['KPW'],
  'PT': ['EUR'],
  'PY': ['PYG'],
  'PS': ['ILS'],
  'PF': ['XPF'],
  'QA': ['QAR'],
  'RE': ['EUR'],
  'RO': ['RON'],
  'RU': ['RUB'],
  'RW': ['RWF'],
  'SA': ['SAR'],
  'SD': ['SDG'],
  'SN': ['XOF'],
  'SG': ['SGD'],
  'GS': ['GBP'],
  'SJ': ['NOK'],
  'SB': ['SBD'],
  'SL': ['SLL'],
  'SV': ['SVC', 'USD'],
  'SM': ['EUR'],
  'SO': ['SOS'],
  'PM': ['EUR'],
  'RS': ['RSD'],
  'SS': ['SSP'],
  'ST': ['STD'],
  'SR': ['SRD'],
  'SK': ['EUR'],
  'SI': ['EUR'],
  'SE': ['SEK'],
  'SZ': ['SZL'],
  'SX': ['ANG'],
  'SC': ['SCR'],
  'SY': ['SYP'],
  'TC': ['USD'],
  'TD': ['XAF'],
  'TG': ['XOF'],
  'TH': ['THB'],
  'TJ': ['TJS'],
  'TK': ['NZD'],
  'TM': ['TMT'],
  'TL': ['USD'],
  'TO': ['TOP'],
  'TT': ['TTD'],
  'TN': ['TND'],
  'TR': ['TRY'],
  'TV': ['AUD'],
  'TW': ['TWD'],
  'TZ': ['TZS'],
  'UG': ['UGX'],
  'UA': ['UAH'],
  'UM': ['USD'],
  'UY': ['UYI', 'UYU'],
  'US': ['USD', 'USN', 'USS'],
  'UZ': ['UZS'],
  'VA': ['EUR'],
  'VC': ['XCD'],
  'VE': ['VEF'],
  'VG': ['USD'],
  'VI': ['USD'],
  'VN': ['VND'],
  'VU': ['VUV'],
  'WF': ['XPF'],
  'WS': ['WST'],
  'YE': ['YER'],
  'ZA': ['ZAR'],
  'ZM': ['ZMW'],
  'ZW': ['ZWL']
};
var SYMBOLS = {
  'AED': 'د.إ;',
  'AFN': 'Afs',
  'ALL': 'L',
  'AMD': 'AMD',
  'ANG': 'NAƒ',
  'AOA': 'Kz',
  'ARS': '$',
  'AUD': '$',
  'AWG': 'ƒ',
  'AZN': 'AZN',
  'BAM': 'KM',
  'BBD': 'Bds$',
  'BDT': '৳',
  'BGN': 'BGN',
  'BHD': '.د.ب',
  'BIF': 'FBu',
  'BMD': 'BD$',
  'BND': 'B$',
  'BOB': 'Bs.',
  'BRL': 'R$',
  'BSD': 'B$',
  'BTN': 'Nu.',
  'BWP': 'P',
  'BYR': 'Br',
  'BZD': 'BZ$',
  'CAD': '$',
  'CDF': 'F',
  'CHF': 'Fr.',
  'CLP': '$',
  'CNY': '¥',
  'COP': 'Col$',
  'CRC': '₡',
  'CUC': '$',
  'CVE': 'Esc',
  'CZK': 'Kč',
  'DJF': 'Fdj',
  'DKK': 'Kr',
  'DOP': 'RD$',
  'DZD': 'د.ج',
  'EEK': 'KR',
  'EGP': '£',
  'ERN': 'Nfa',
  'ETB': 'Br',
  'EUR': '€',
  'FJD': 'FJ$',
  'FKP': '£',
  'GBP': '£',
  'GEL': 'GEL',
  'GHS': 'GH₵',
  'GIP': '£',
  'GMD': 'D',
  'GNF': 'FG',
  'GQE': 'CFA',
  'GTQ': 'Q',
  'GYD': 'GY$',
  'HKD': 'HK$',
  'HNL': 'L',
  'HRK': 'kn',
  'HTG': 'G',
  'HUF': 'Ft',
  'IDR': 'Rp',
  'ILS': '₪',
  'INR': '₹',
  'IQD': 'د.ع',
  'IRR': 'IRR',
  'ISK': 'kr',
  'JMD': 'J$',
  'JOD': 'JOD',
  'JPY': '¥',
  'KES': 'KSh',
  'KGS': 'сом',
  'KHR': '៛',
  'KMF': 'KMF',
  'KPW': 'W',
  'KRW': 'W',
  'KWD': 'KWD',
  'KYD': 'KY$',
  'KZT': 'T',
  'LAK': 'KN',
  'LBP': '£',
  'LKR': 'Rs',
  'LRD': 'L$',
  'LSL': 'M',
  'LTL': 'Lt',
  'LVL': 'Ls',
  'LYD': 'LD',
  'MAD': 'MAD',
  'MDL': 'MDL',
  'MGA': 'FMG',
  'MKD': 'MKD',
  'MMK': 'K',
  'MNT': '₮',
  'MOP': 'P',
  'MRO': 'UM',
  'MUR': 'Rs',
  'MVR': 'Rf',
  'MWK': 'MK',
  'MXN': '$',
  'MYR': 'RM',
  'MZM': 'MTn',
  'NAD': 'N$',
  'NGN': '₦',
  'NIO': 'C$',
  'NOK': 'kr',
  'NPR': 'NRs',
  'NZD': 'NZ$',
  'OMR': 'OMR',
  'PAB': 'B./',
  'PEN': 'S/.',
  'PGK': 'K',
  'PHP': '₱',
  'PKR': 'Rs.',
  'PLN': 'zł',
  'PYG': '₲',
  'QAR': 'QR',
  'RON': 'L',
  'RSD': 'din.',
  'RUB': 'R',
  'SAR': 'SR',
  'SBD': 'SI$',
  'SCR': 'SR',
  'SDG': 'SDG',
  'SEK': 'kr',
  'SGD': 'S$',
  'SHP': '£',
  'SLL': 'Le',
  'SOS': 'Sh.',
  'SRD': '$',
  'SYP': 'LS',
  'SZL': 'E',
  'THB': '฿',
  'TJS': 'TJS',
  'TMT': 'm',
  'TND': 'DT',
  'TRY': 'TRY',
  'TTD': 'TT$',
  'TWD': 'NT$',
  'TZS': 'TZS',
  'UAH': 'UAH',
  'UGX': 'USh',
  'USD': '$',
  'UYU': '$U',
  'UZS': 'UZS',
  'VEB': 'Bs',
  'VND': '₫',
  'VUV': 'VT',
  'WST': 'WS$',
  'XAF': 'CFA',
  'XCD': 'EC$',
  'XDR': 'SDR',
  'XOF': 'CFA',
  'XPF': 'F',
  'YER': 'YER',
  'ZAR': 'R',
  'ZMK': 'ZK',
  'ZWR': 'Z$'
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"utilities.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe_i18n/lib/utilities.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

module.export({
  set: function () {
    return set;
  },
  get: function () {
    return get;
  },
  deepExtend: function () {
    return deepExtend;
  },
  Emitter: function () {
    return Emitter;
  },
  RecursiveIterator: function () {
    return RecursiveIterator;
  }
});

function set(object, key, value) {
  if (typeof key !== 'string') {
    console.warn('Key must be string.');
    return object;
  }

  var keys = key.split('.');
  var copy = object;

  while (key = keys.shift()) {
    if (copy[key] === undefined) {
      copy[key] = {};
    }

    if (value !== undefined && keys.length === 0) {
      copy[key] = value;
    }

    copy = copy[key];
  }

  return object;
}

function get(object, key, defaultValue) {
  if ((0, _typeof2.default)(object) !== 'object' || object === null) {
    return defaultValue;
  }

  if (typeof key !== 'string') {
    throw new Error('Key must be string.');
  }

  var keys = key.split('.');
  var last = keys.pop();

  while (key = keys.shift()) {
    object = object[key];

    if ((0, _typeof2.default)(object) !== 'object' || object === null) {
      return defaultValue;
    }
  }

  return object && object[last] !== undefined ? object[last] : defaultValue;
}

function deepExtend()
/*obj_1, [obj_2], [obj_N]*/
{
  if (arguments.length < 1 || (0, _typeof2.default)(arguments[0]) !== 'object') {
    return false;
  }

  if (arguments.length < 2) {
    return arguments[0];
  }

  var target = arguments[0]; // convert arguments to array and cut off target object

  var args = Array.prototype.slice.call(arguments, 1);
  var val, src, clone;
  args.forEach(function (obj) {
    // skip argument if it is array or isn't object
    if ((0, _typeof2.default)(obj) !== 'object' || Array.isArray(obj)) {
      return;
    }

    Object.keys(obj).forEach(function (key) {
      src = target[key]; // source value

      val = obj[key]; // new value
      // recursion prevention

      if (val === target) {
        return;
        /**
         * if new value isn't object then just overwrite by new value
         * instead of extending.
         */
      } else if ((0, _typeof2.default)(val) !== 'object' || val === null) {
        target[key] = val;
        return; // just clone arrays (and recursive clone objects inside)
      } else if (Array.isArray(val)) {
        target[key] = deepCloneArray(val);
        return;
      } else if ((0, _typeof2.default)(src) !== 'object' || src === null || Array.isArray(src)) {
        target[key] = deepExtend({}, val);
        return; // source value and new value is objects both, extending...
      } else {
        target[key] = deepExtend(src, val);
        return;
      }
    });
  });
  return target;
}

/**
 * Recursive cloning array.
 */
function deepCloneArray(arr) {
  var clone = [];
  arr.forEach(function (item, index) {
    if ((0, _typeof2.default)(item) === 'object' && item !== null) {
      if (Array.isArray(item)) {
        clone[index] = deepCloneArray(item);
      } else {
        clone[index] = deepExtend({}, item);
      }
    } else {
      clone[index] = item;
    }
  });
  return clone;
} // PRIVATE PROPERTIES


var BYPASS_MODE = '__bypassMode';
var IGNORE_CIRCULAR = '__ignoreCircular';
var MAX_DEEP = '__maxDeep';
var CACHE = '__cache';
var QUEUE = '__queue';
var STATE = '__state';
var floor = Math.floor;
var keys = Object.keys;
var EMPTY_STATE = {};

function Emitter() {
  this._listeners = {};
}

Emitter.prototype.emit = function () {
  function emit(eventType) {
    if (!Array.isArray(this._listeners[eventType])) {
      return this;
    }

    var args = Array.prototype.slice.call(arguments, 1);

    this._listeners[eventType].forEach(function () {
      function _emit(listener) {
        listener.apply(this, args);
      }

      return _emit;
    }(), this);

    return this;
  }

  return emit;
}();

Emitter.prototype.on = function () {
  function on(eventType, listener) {
    if (!Array.isArray(this._listeners[eventType])) {
      this._listeners[eventType] = [];
    }

    if (this._listeners[eventType].indexOf(listener) === -1) {
      this._listeners[eventType].push(listener);
    }

    return this;
  }

  return on;
}();

Emitter.prototype.once = function () {
  function once(eventType, listener) {
    var self = this;

    function _once() {
      var args = Array.prototype.slice.call(arguments, 0);
      self.off(eventType, _once);
      listener.apply(self, args);
    }

    _once.listener = listener;
    return this.on(eventType, _once);
  }

  return once;
}();

Emitter.prototype.off = function () {
  function off(eventType, listener) {
    if (!Array.isArray(this._listeners[eventType])) {
      return this;
    }

    if (typeof listener === 'undefined') {
      this._listeners[eventType] = [];
      return this;
    }

    var index = this._listeners[eventType].indexOf(listener);

    if (index === -1) {
      for (var i = 0; i < this._listeners[eventType].length; i += 1) {
        if (this._listeners[eventType][i].listener === listener) {
          index = i;
          break;
        }
      }
    }

    this._listeners[eventType].splice(index, 1);

    return this;
  }

  return off;
}();

var RecursiveIterator =
/*#__PURE__*/
function () {
  /**
   * @param {Object|Array} root
   * @param {Number} [bypassMode='vertical']
   * @param {Boolean} [ignoreCircular=false]
   * @param {Number} [maxDeep=100]
   */
  function RecursiveIterator(root) {
    var bypassMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'vertical';
    var ignoreCircular = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var maxDeep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;
    this[BYPASS_MODE] = bypassMode === 'horizontal' || bypassMode === 1;
    this[IGNORE_CIRCULAR] = ignoreCircular;
    this[MAX_DEEP] = maxDeep;
    this[CACHE] = [];
    this[QUEUE] = [];
    this[STATE] = this.getState(undefined, root);

    this.__makeIterable();
  }
  /**
   * @returns {Object}
   */


  var _proto = RecursiveIterator.prototype;

  _proto.next = function () {
    function next() {
      var _ref = this[STATE] || EMPTY_STATE,
          node = _ref.node,
          path = _ref.path,
          deep = _ref.deep;

      if (this[MAX_DEEP] > deep) {
        if (this.isNode(node)) {
          if (this.isCircular(node)) {
            if (this[IGNORE_CIRCULAR]) {// skip
            } else {
              throw new Error('Circular reference');
            }
          } else {
            if (this.onStepInto(this[STATE])) {
              var _this$QUEUE;

              var descriptors = this.getStatesOfChildNodes(node, path, deep);
              var method = this[BYPASS_MODE] ? 'push' : 'unshift';

              (_this$QUEUE = this[QUEUE])[method].apply(_this$QUEUE, (0, _toConsumableArray2.default)(descriptors));

              this[CACHE].push(node);
            }
          }
        }
      }

      var value = this[QUEUE].shift();
      var done = !value;
      this[STATE] = value;
      if (done) this.destroy();
      return {
        value: value,
        done: done
      };
    }

    return next;
  }();
  /**
   *
   */


  _proto.destroy = function () {
    function destroy() {
      this[QUEUE].length = 0;
      this[CACHE].length = 0;
      this[STATE] = null;
    }

    return destroy;
  }();
  /**
   * @param {*} any
   * @returns {Boolean}
   */


  _proto.isNode = function () {
    function isNode(any) {
      return isTrueObject(any);
    }

    return isNode;
  }();
  /**
   * @param {*} any
   * @returns {Boolean}
   */


  _proto.isLeaf = function () {
    function isLeaf(any) {
      return !this.isNode(any);
    }

    return isLeaf;
  }();
  /**
   * @param {*} any
   * @returns {Boolean}
   */


  _proto.isCircular = function () {
    function isCircular(any) {
      return this[CACHE].indexOf(any) !== -1;
    }

    return isCircular;
  }();
  /**
   * Returns states of child nodes
   * @param {Object} node
   * @param {Array} path
   * @param {Number} deep
   * @returns {Array<Object>}
   */


  _proto.getStatesOfChildNodes = function () {
    function getStatesOfChildNodes(node, path, deep) {
      var _this = this;

      return getKeys(node).map(function (key) {
        return _this.getState(node, node[key], key, path.concat(key), deep + 1);
      });
    }

    return getStatesOfChildNodes;
  }();
  /**
   * Returns state of node. Calls for each node
   * @param {Object} [parent]
   * @param {*} [node]
   * @param {String} [key]
   * @param {Array} [path]
   * @param {Number} [deep]
   * @returns {Object}
   */


  _proto.getState = function () {
    function getState(parent, node, key) {
      var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      var deep = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      return {
        parent: parent,
        node: node,
        key: key,
        path: path,
        deep: deep
      };
    }

    return getState;
  }();
  /**
   * Callback
   * @param {Object} state
   * @returns {Boolean}
   */


  _proto.onStepInto = function () {
    function onStepInto(state) {
      return true;
    }

    return onStepInto;
  }();
  /**
   * Only for es6
   * @private
   */


  _proto.__makeIterable = function () {
    function __makeIterable() {
      var _this2 = this;

      try {
        this[Symbol.iterator] = function () {
          return _this2;
        };
      } catch (e) {}
    }

    return __makeIterable;
  }();

  return RecursiveIterator;
}();

;
var GLOBAL_OBJECT = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this;
/**
 * @param {*} any
 * @returns {Boolean}
 */

function isGlobal(any) {
  return any === GLOBAL_OBJECT;
}

function isTrueObject(any) {
  return any !== null && (0, _typeof2.default)(any) === 'object';
}
/**
 * @param {*} any
 * @returns {Boolean}
 */


function isArrayLike(any) {
  if (!isTrueObject(any)) return false;
  if (isGlobal(any)) return false;
  if (!('length' in any)) return false;
  var length = any.length;
  if (length === 0) return true;
  return length - 1 in any;
}
/**
 * @param {Object|Array} object
 * @returns {Array<String>}
 */


function getKeys(object) {
  var keys_ = keys(object);

  if (Array.isArray(object)) {// skip sort
  } else if (isArrayLike(object)) {
    // only integer values
    keys_ = keys_.filter(function (key) {
      return floor(Number(key)) == key;
    }); // skip sort
  } else {
    // sort
    keys_ = keys_.sort();
  }

  return keys_;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"client":{"api.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/universe_i18n/client/api.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var i18n;
module.link("../lib/i18n", {
  "default": function (v) {
    i18n = v;
  }
}, 0);
var locales;
module.link("../lib/locales", {
  "default": function (v) {
    locales = v;
  }
}, 1);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 2);

i18n.loadLocale = function (localeName, options) {
  var _ref = options || {},
      _ref$fresh = _ref.fresh,
      fresh = _ref$fresh === void 0 ? false : _ref$fresh,
      _ref$silent = _ref.silent,
      silent = _ref$silent === void 0 ? false : _ref$silent,
      _ref$host = _ref.host,
      host = _ref$host === void 0 ? i18n.options.hostUrl : _ref$host,
      _ref$pathOnHost = _ref.pathOnHost,
      pathOnHost = _ref$pathOnHost === void 0 ? i18n.options.pathOnHost : _ref$pathOnHost;

  localeName = locales[localeName.toLowerCase()] ? locales[localeName.toLowerCase()][0] : localeName;
  var url = host + pathOnHost + localeName;

  if (fresh) {
    url += '?ts=' + new Date().getTime();
  } else {
    url += '?ts=' + i18n._ts;
  }

  var promise = new Promise(function (resolve, reject) {
    var script = document.querySelector("script[src=\"" + url + "\"]");

    if (script) {
      return resolve(script);
    }

    script = document.createElement('script');
    script.type = 'text/javascript'; // async can't be destructured as it is a reserved keyword for MS Edge (see issue #98)

    if (options && options.async) {
      script.async = options.async;
    }

    script.src = url;
    script.addEventListener('load', function () {
      resolve(script);
    }, false);
    script.addEventListener('error', function () {
      reject(script);
    }, false);
    var head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(script);
  });

  if (!silent) {
    promise.then(function () {
      var locale = i18n.getLocale(); //If current locale is changed we must notify about that.

      if (locale.indexOf(localeName) === 0 || i18n.options.defaultLocale.indexOf(localeName) === 0) {
        i18n._emitChange();
      }
    });
  }

  return promise;
};

var w = this || window; // If translation file added manually before this package

if ((0, _typeof2.default)(w.__uniI18nPre) === 'object') {
  Object.keys(w.__uniI18nPre).map(function (i) {
    if (w.__uniI18nPre[i]) {
      i18n.addTranslations(i, w.__uniI18nPre[i]);
    }
  });
}

i18n.isLoaded = function () {
  var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : i18n.getLocale();
  return i18n._isLoaded[locale];
};

Meteor.connection._stream.on('reset', function () {
  if (i18n.options.sameLocaleOnServerConnection && i18n._locale) {
    Meteor.call('universe.i18n.setServerLocaleForConnection', i18n._locale);
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/universe:i18n/lib/i18n.js");
require("/node_modules/meteor/universe:i18n/client/api.js");

/* Exports */
Package._define("universe:i18n", exports, {
  _i18n: _i18n,
  i18n: i18n
});

})();
