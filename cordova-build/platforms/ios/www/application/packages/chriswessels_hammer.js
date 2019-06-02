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
var _ = Package.underscore._;
var Template = Package['templating-runtime'].Template;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Random = Package.random.Random;
var HTML = Package.htmljs.HTML;
var Spacebars = Package.spacebars.Spacebars;

/* Package-scope variables */
var Hammer;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/chriswessels_hammer/packages/chriswessels_hammer.js      //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/chriswessels:hammer/lib/hammer.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/*! Hammer.JS - v2.0.4 - 2014-09-28                                                                                   // 1
 * http://hammerjs.github.io/                                                                                         // 2
 *                                                                                                                    // 3
 * Copyright (c) 2014 Jorik Tangelder;                                                                                // 4
 * Licensed under the MIT license */                                                                                  // 5
(function(window, document, exportName, undefined) {                                                                  // 6
  'use strict';                                                                                                       // 7
                                                                                                                      // 8
var VENDOR_PREFIXES = ['', 'webkit', 'moz', 'MS', 'ms', 'o'];                                                         // 9
var TEST_ELEMENT = document.createElement('div');                                                                     // 10
                                                                                                                      // 11
var TYPE_FUNCTION = 'function';                                                                                       // 12
                                                                                                                      // 13
var round = Math.round;                                                                                               // 14
var abs = Math.abs;                                                                                                   // 15
var now = Date.now;                                                                                                   // 16
                                                                                                                      // 17
/**                                                                                                                   // 18
 * set a timeout with a given scope                                                                                   // 19
 * @param {Function} fn                                                                                               // 20
 * @param {Number} timeout                                                                                            // 21
 * @param {Object} context                                                                                            // 22
 * @returns {number}                                                                                                  // 23
 */                                                                                                                   // 24
function setTimeoutContext(fn, timeout, context) {                                                                    // 25
    return setTimeout(bindFn(fn, context), timeout);                                                                  // 26
}                                                                                                                     // 27
                                                                                                                      // 28
/**                                                                                                                   // 29
 * if the argument is an array, we want to execute the fn on each entry                                               // 30
 * if it aint an array we don't want to do a thing.                                                                   // 31
 * this is used by all the methods that accept a single and array argument.                                           // 32
 * @param {*|Array} arg                                                                                               // 33
 * @param {String} fn                                                                                                 // 34
 * @param {Object} [context]                                                                                          // 35
 * @returns {Boolean}                                                                                                 // 36
 */                                                                                                                   // 37
function invokeArrayArg(arg, fn, context) {                                                                           // 38
    if (Array.isArray(arg)) {                                                                                         // 39
        each(arg, context[fn], context);                                                                              // 40
        return true;                                                                                                  // 41
    }                                                                                                                 // 42
    return false;                                                                                                     // 43
}                                                                                                                     // 44
                                                                                                                      // 45
/**                                                                                                                   // 46
 * walk objects and arrays                                                                                            // 47
 * @param {Object} obj                                                                                                // 48
 * @param {Function} iterator                                                                                         // 49
 * @param {Object} context                                                                                            // 50
 */                                                                                                                   // 51
function each(obj, iterator, context) {                                                                               // 52
    var i;                                                                                                            // 53
                                                                                                                      // 54
    if (!obj) {                                                                                                       // 55
        return;                                                                                                       // 56
    }                                                                                                                 // 57
                                                                                                                      // 58
    if (obj.forEach) {                                                                                                // 59
        obj.forEach(iterator, context);                                                                               // 60
    } else if (obj.length !== undefined) {                                                                            // 61
        i = 0;                                                                                                        // 62
        while (i < obj.length) {                                                                                      // 63
            iterator.call(context, obj[i], i, obj);                                                                   // 64
            i++;                                                                                                      // 65
        }                                                                                                             // 66
    } else {                                                                                                          // 67
        for (i in obj) {                                                                                              // 68
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);                                          // 69
        }                                                                                                             // 70
    }                                                                                                                 // 71
}                                                                                                                     // 72
                                                                                                                      // 73
/**                                                                                                                   // 74
 * extend object.                                                                                                     // 75
 * means that properties in dest will be overwritten by the ones in src.                                              // 76
 * @param {Object} dest                                                                                               // 77
 * @param {Object} src                                                                                                // 78
 * @param {Boolean} [merge]                                                                                           // 79
 * @returns {Object} dest                                                                                             // 80
 */                                                                                                                   // 81
function extend(dest, src, merge) {                                                                                   // 82
    var keys = Object.keys(src);                                                                                      // 83
    var i = 0;                                                                                                        // 84
    while (i < keys.length) {                                                                                         // 85
        if (!merge || (merge && dest[keys[i]] === undefined)) {                                                       // 86
            dest[keys[i]] = src[keys[i]];                                                                             // 87
        }                                                                                                             // 88
        i++;                                                                                                          // 89
    }                                                                                                                 // 90
    return dest;                                                                                                      // 91
}                                                                                                                     // 92
                                                                                                                      // 93
/**                                                                                                                   // 94
 * merge the values from src in the dest.                                                                             // 95
 * means that properties that exist in dest will not be overwritten by src                                            // 96
 * @param {Object} dest                                                                                               // 97
 * @param {Object} src                                                                                                // 98
 * @returns {Object} dest                                                                                             // 99
 */                                                                                                                   // 100
function merge(dest, src) {                                                                                           // 101
    return extend(dest, src, true);                                                                                   // 102
}                                                                                                                     // 103
                                                                                                                      // 104
/**                                                                                                                   // 105
 * simple class inheritance                                                                                           // 106
 * @param {Function} child                                                                                            // 107
 * @param {Function} base                                                                                             // 108
 * @param {Object} [properties]                                                                                       // 109
 */                                                                                                                   // 110
function inherit(child, base, properties) {                                                                           // 111
    var baseP = base.prototype,                                                                                       // 112
        childP;                                                                                                       // 113
                                                                                                                      // 114
    childP = child.prototype = Object.create(baseP);                                                                  // 115
    childP.constructor = child;                                                                                       // 116
    childP._super = baseP;                                                                                            // 117
                                                                                                                      // 118
    if (properties) {                                                                                                 // 119
        extend(childP, properties);                                                                                   // 120
    }                                                                                                                 // 121
}                                                                                                                     // 122
                                                                                                                      // 123
/**                                                                                                                   // 124
 * simple function bind                                                                                               // 125
 * @param {Function} fn                                                                                               // 126
 * @param {Object} context                                                                                            // 127
 * @returns {Function}                                                                                                // 128
 */                                                                                                                   // 129
function bindFn(fn, context) {                                                                                        // 130
    return function boundFn() {                                                                                       // 131
        return fn.apply(context, arguments);                                                                          // 132
    };                                                                                                                // 133
}                                                                                                                     // 134
                                                                                                                      // 135
/**                                                                                                                   // 136
 * let a boolean value also be a function that must return a boolean                                                  // 137
 * this first item in args will be used as the context                                                                // 138
 * @param {Boolean|Function} val                                                                                      // 139
 * @param {Array} [args]                                                                                              // 140
 * @returns {Boolean}                                                                                                 // 141
 */                                                                                                                   // 142
function boolOrFn(val, args) {                                                                                        // 143
    if (typeof val == TYPE_FUNCTION) {                                                                                // 144
        return val.apply(args ? args[0] || undefined : undefined, args);                                              // 145
    }                                                                                                                 // 146
    return val;                                                                                                       // 147
}                                                                                                                     // 148
                                                                                                                      // 149
/**                                                                                                                   // 150
 * use the val2 when val1 is undefined                                                                                // 151
 * @param {*} val1                                                                                                    // 152
 * @param {*} val2                                                                                                    // 153
 * @returns {*}                                                                                                       // 154
 */                                                                                                                   // 155
function ifUndefined(val1, val2) {                                                                                    // 156
    return (val1 === undefined) ? val2 : val1;                                                                        // 157
}                                                                                                                     // 158
                                                                                                                      // 159
/**                                                                                                                   // 160
 * addEventListener with multiple events at once                                                                      // 161
 * @param {EventTarget} target                                                                                        // 162
 * @param {String} types                                                                                              // 163
 * @param {Function} handler                                                                                          // 164
 */                                                                                                                   // 165
function addEventListeners(target, types, handler) {                                                                  // 166
    each(splitStr(types), function(type) {                                                                            // 167
        target.addEventListener(type, handler, false);                                                                // 168
    });                                                                                                               // 169
}                                                                                                                     // 170
                                                                                                                      // 171
/**                                                                                                                   // 172
 * removeEventListener with multiple events at once                                                                   // 173
 * @param {EventTarget} target                                                                                        // 174
 * @param {String} types                                                                                              // 175
 * @param {Function} handler                                                                                          // 176
 */                                                                                                                   // 177
function removeEventListeners(target, types, handler) {                                                               // 178
    each(splitStr(types), function(type) {                                                                            // 179
        target.removeEventListener(type, handler, false);                                                             // 180
    });                                                                                                               // 181
}                                                                                                                     // 182
                                                                                                                      // 183
/**                                                                                                                   // 184
 * find if a node is in the given parent                                                                              // 185
 * @method hasParent                                                                                                  // 186
 * @param {HTMLElement} node                                                                                          // 187
 * @param {HTMLElement} parent                                                                                        // 188
 * @return {Boolean} found                                                                                            // 189
 */                                                                                                                   // 190
function hasParent(node, parent) {                                                                                    // 191
    while (node) {                                                                                                    // 192
        if (node == parent) {                                                                                         // 193
            return true;                                                                                              // 194
        }                                                                                                             // 195
        node = node.parentNode;                                                                                       // 196
    }                                                                                                                 // 197
    return false;                                                                                                     // 198
}                                                                                                                     // 199
                                                                                                                      // 200
/**                                                                                                                   // 201
 * small indexOf wrapper                                                                                              // 202
 * @param {String} str                                                                                                // 203
 * @param {String} find                                                                                               // 204
 * @returns {Boolean} found                                                                                           // 205
 */                                                                                                                   // 206
function inStr(str, find) {                                                                                           // 207
    return str.indexOf(find) > -1;                                                                                    // 208
}                                                                                                                     // 209
                                                                                                                      // 210
/**                                                                                                                   // 211
 * split string on whitespace                                                                                         // 212
 * @param {String} str                                                                                                // 213
 * @returns {Array} words                                                                                             // 214
 */                                                                                                                   // 215
function splitStr(str) {                                                                                              // 216
    return str.trim().split(/\s+/g);                                                                                  // 217
}                                                                                                                     // 218
                                                                                                                      // 219
/**                                                                                                                   // 220
 * find if a array contains the object using indexOf or a simple polyFill                                             // 221
 * @param {Array} src                                                                                                 // 222
 * @param {String} find                                                                                               // 223
 * @param {String} [findByKey]                                                                                        // 224
 * @return {Boolean|Number} false when not found, or the index                                                        // 225
 */                                                                                                                   // 226
function inArray(src, find, findByKey) {                                                                              // 227
    if (src.indexOf && !findByKey) {                                                                                  // 228
        return src.indexOf(find);                                                                                     // 229
    } else {                                                                                                          // 230
        var i = 0;                                                                                                    // 231
        while (i < src.length) {                                                                                      // 232
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {                        // 233
                return i;                                                                                             // 234
            }                                                                                                         // 235
            i++;                                                                                                      // 236
        }                                                                                                             // 237
        return -1;                                                                                                    // 238
    }                                                                                                                 // 239
}                                                                                                                     // 240
                                                                                                                      // 241
/**                                                                                                                   // 242
 * convert array-like objects to real arrays                                                                          // 243
 * @param {Object} obj                                                                                                // 244
 * @returns {Array}                                                                                                   // 245
 */                                                                                                                   // 246
function toArray(obj) {                                                                                               // 247
    return Array.prototype.slice.call(obj, 0);                                                                        // 248
}                                                                                                                     // 249
                                                                                                                      // 250
/**                                                                                                                   // 251
 * unique array with objects based on a key (like 'id') or just by the array's value                                  // 252
 * @param {Array} src [{id:1},{id:2},{id:1}]                                                                          // 253
 * @param {String} [key]                                                                                              // 254
 * @param {Boolean} [sort=False]                                                                                      // 255
 * @returns {Array} [{id:1},{id:2}]                                                                                   // 256
 */                                                                                                                   // 257
function uniqueArray(src, key, sort) {                                                                                // 258
    var results = [];                                                                                                 // 259
    var values = [];                                                                                                  // 260
    var i = 0;                                                                                                        // 261
                                                                                                                      // 262
    while (i < src.length) {                                                                                          // 263
        var val = key ? src[i][key] : src[i];                                                                         // 264
        if (inArray(values, val) < 0) {                                                                               // 265
            results.push(src[i]);                                                                                     // 266
        }                                                                                                             // 267
        values[i] = val;                                                                                              // 268
        i++;                                                                                                          // 269
    }                                                                                                                 // 270
                                                                                                                      // 271
    if (sort) {                                                                                                       // 272
        if (!key) {                                                                                                   // 273
            results = results.sort();                                                                                 // 274
        } else {                                                                                                      // 275
            results = results.sort(function sortUniqueArray(a, b) {                                                   // 276
                return a[key] > b[key];                                                                               // 277
            });                                                                                                       // 278
        }                                                                                                             // 279
    }                                                                                                                 // 280
                                                                                                                      // 281
    return results;                                                                                                   // 282
}                                                                                                                     // 283
                                                                                                                      // 284
/**                                                                                                                   // 285
 * get the prefixed property                                                                                          // 286
 * @param {Object} obj                                                                                                // 287
 * @param {String} property                                                                                           // 288
 * @returns {String|Undefined} prefixed                                                                               // 289
 */                                                                                                                   // 290
function prefixed(obj, property) {                                                                                    // 291
    var prefix, prop;                                                                                                 // 292
    var camelProp = property[0].toUpperCase() + property.slice(1);                                                    // 293
                                                                                                                      // 294
    var i = 0;                                                                                                        // 295
    while (i < VENDOR_PREFIXES.length) {                                                                              // 296
        prefix = VENDOR_PREFIXES[i];                                                                                  // 297
        prop = (prefix) ? prefix + camelProp : property;                                                              // 298
                                                                                                                      // 299
        if (prop in obj) {                                                                                            // 300
            return prop;                                                                                              // 301
        }                                                                                                             // 302
        i++;                                                                                                          // 303
    }                                                                                                                 // 304
    return undefined;                                                                                                 // 305
}                                                                                                                     // 306
                                                                                                                      // 307
/**                                                                                                                   // 308
 * get a unique id                                                                                                    // 309
 * @returns {number} uniqueId                                                                                         // 310
 */                                                                                                                   // 311
var _uniqueId = 1;                                                                                                    // 312
function uniqueId() {                                                                                                 // 313
    return _uniqueId++;                                                                                               // 314
}                                                                                                                     // 315
                                                                                                                      // 316
/**                                                                                                                   // 317
 * get the window object of an element                                                                                // 318
 * @param {HTMLElement} element                                                                                       // 319
 * @returns {DocumentView|Window}                                                                                     // 320
 */                                                                                                                   // 321
function getWindowForElement(element) {                                                                               // 322
    var doc = element.ownerDocument;                                                                                  // 323
    return (doc.defaultView || doc.parentWindow);                                                                     // 324
}                                                                                                                     // 325
                                                                                                                      // 326
var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;                                                           // 327
                                                                                                                      // 328
var SUPPORT_TOUCH = ('ontouchstart' in window);                                                                       // 329
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;                                          // 330
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);                                     // 331
                                                                                                                      // 332
var INPUT_TYPE_TOUCH = 'touch';                                                                                       // 333
var INPUT_TYPE_PEN = 'pen';                                                                                           // 334
var INPUT_TYPE_MOUSE = 'mouse';                                                                                       // 335
var INPUT_TYPE_KINECT = 'kinect';                                                                                     // 336
                                                                                                                      // 337
var COMPUTE_INTERVAL = 25;                                                                                            // 338
                                                                                                                      // 339
var INPUT_START = 1;                                                                                                  // 340
var INPUT_MOVE = 2;                                                                                                   // 341
var INPUT_END = 4;                                                                                                    // 342
var INPUT_CANCEL = 8;                                                                                                 // 343
                                                                                                                      // 344
var DIRECTION_NONE = 1;                                                                                               // 345
var DIRECTION_LEFT = 2;                                                                                               // 346
var DIRECTION_RIGHT = 4;                                                                                              // 347
var DIRECTION_UP = 8;                                                                                                 // 348
var DIRECTION_DOWN = 16;                                                                                              // 349
                                                                                                                      // 350
var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;                                                          // 351
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;                                                               // 352
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;                                                        // 353
                                                                                                                      // 354
var PROPS_XY = ['x', 'y'];                                                                                            // 355
var PROPS_CLIENT_XY = ['clientX', 'clientY'];                                                                         // 356
                                                                                                                      // 357
/**                                                                                                                   // 358
 * create new input type manager                                                                                      // 359
 * @param {Manager} manager                                                                                           // 360
 * @param {Function} callback                                                                                         // 361
 * @returns {Input}                                                                                                   // 362
 * @constructor                                                                                                       // 363
 */                                                                                                                   // 364
function Input(manager, callback) {                                                                                   // 365
    var self = this;                                                                                                  // 366
    this.manager = manager;                                                                                           // 367
    this.callback = callback;                                                                                         // 368
    this.element = manager.element;                                                                                   // 369
    this.target = manager.options.inputTarget;                                                                        // 370
                                                                                                                      // 371
    // smaller wrapper around the handler, for the scope and the enabled state of the manager,                        // 372
    // so when disabled the input events are completely bypassed.                                                     // 373
    this.domHandler = function(ev) {                                                                                  // 374
        if (boolOrFn(manager.options.enable, [manager])) {                                                            // 375
            self.handler(ev);                                                                                         // 376
        }                                                                                                             // 377
    };                                                                                                                // 378
                                                                                                                      // 379
    this.init();                                                                                                      // 380
                                                                                                                      // 381
}                                                                                                                     // 382
                                                                                                                      // 383
Input.prototype = {                                                                                                   // 384
    /**                                                                                                               // 385
     * should handle the inputEvent data and trigger the callback                                                     // 386
     * @virtual                                                                                                       // 387
     */                                                                                                               // 388
    handler: function() { },                                                                                          // 389
                                                                                                                      // 390
    /**                                                                                                               // 391
     * bind the events                                                                                                // 392
     */                                                                                                               // 393
    init: function() {                                                                                                // 394
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);                                     // 395
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);                              // 396
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);              // 397
    },                                                                                                                // 398
                                                                                                                      // 399
    /**                                                                                                               // 400
     * unbind the events                                                                                              // 401
     */                                                                                                               // 402
    destroy: function() {                                                                                             // 403
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);                                  // 404
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);                           // 405
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);           // 406
    }                                                                                                                 // 407
};                                                                                                                    // 408
                                                                                                                      // 409
/**                                                                                                                   // 410
 * create new input type manager                                                                                      // 411
 * called by the Manager constructor                                                                                  // 412
 * @param {Hammer} manager                                                                                            // 413
 * @returns {Input}                                                                                                   // 414
 */                                                                                                                   // 415
function createInputInstance(manager) {                                                                               // 416
    var Type;                                                                                                         // 417
    var inputClass = manager.options.inputClass;                                                                      // 418
                                                                                                                      // 419
    if (inputClass) {                                                                                                 // 420
        Type = inputClass;                                                                                            // 421
    } else if (SUPPORT_POINTER_EVENTS) {                                                                              // 422
        Type = PointerEventInput;                                                                                     // 423
    } else if (SUPPORT_ONLY_TOUCH) {                                                                                  // 424
        Type = TouchInput;                                                                                            // 425
    } else if (!SUPPORT_TOUCH) {                                                                                      // 426
        Type = MouseInput;                                                                                            // 427
    } else {                                                                                                          // 428
        Type = TouchMouseInput;                                                                                       // 429
    }                                                                                                                 // 430
    return new (Type)(manager, inputHandler);                                                                         // 431
}                                                                                                                     // 432
                                                                                                                      // 433
/**                                                                                                                   // 434
 * handle input events                                                                                                // 435
 * @param {Manager} manager                                                                                           // 436
 * @param {String} eventType                                                                                          // 437
 * @param {Object} input                                                                                              // 438
 */                                                                                                                   // 439
function inputHandler(manager, eventType, input) {                                                                    // 440
    var pointersLen = input.pointers.length;                                                                          // 441
    var changedPointersLen = input.changedPointers.length;                                                            // 442
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));                              // 443
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));               // 444
                                                                                                                      // 445
    input.isFirst = !!isFirst;                                                                                        // 446
    input.isFinal = !!isFinal;                                                                                        // 447
                                                                                                                      // 448
    if (isFirst) {                                                                                                    // 449
        manager.session = {};                                                                                         // 450
    }                                                                                                                 // 451
                                                                                                                      // 452
    // source event is the normalized value of the domEvents                                                          // 453
    // like 'touchstart, mouseup, pointerdown'                                                                        // 454
    input.eventType = eventType;                                                                                      // 455
                                                                                                                      // 456
    // compute scale, rotation etc                                                                                    // 457
    computeInputData(manager, input);                                                                                 // 458
                                                                                                                      // 459
    // emit secret event                                                                                              // 460
    manager.emit('hammer.input', input);                                                                              // 461
                                                                                                                      // 462
    manager.recognize(input);                                                                                         // 463
    manager.session.prevInput = input;                                                                                // 464
}                                                                                                                     // 465
                                                                                                                      // 466
/**                                                                                                                   // 467
 * extend the data with some usable properties like scale, rotate, velocity etc                                       // 468
 * @param {Object} manager                                                                                            // 469
 * @param {Object} input                                                                                              // 470
 */                                                                                                                   // 471
function computeInputData(manager, input) {                                                                           // 472
    var session = manager.session;                                                                                    // 473
    var pointers = input.pointers;                                                                                    // 474
    var pointersLength = pointers.length;                                                                             // 475
                                                                                                                      // 476
    // store the first input to calculate the distance and direction                                                  // 477
    if (!session.firstInput) {                                                                                        // 478
        session.firstInput = simpleCloneInputData(input);                                                             // 479
    }                                                                                                                 // 480
                                                                                                                      // 481
    // to compute scale and rotation we need to store the multiple touches                                            // 482
    if (pointersLength > 1 && !session.firstMultiple) {                                                               // 483
        session.firstMultiple = simpleCloneInputData(input);                                                          // 484
    } else if (pointersLength === 1) {                                                                                // 485
        session.firstMultiple = false;                                                                                // 486
    }                                                                                                                 // 487
                                                                                                                      // 488
    var firstInput = session.firstInput;                                                                              // 489
    var firstMultiple = session.firstMultiple;                                                                        // 490
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;                                      // 491
                                                                                                                      // 492
    var center = input.center = getCenter(pointers);                                                                  // 493
    input.timeStamp = now();                                                                                          // 494
    input.deltaTime = input.timeStamp - firstInput.timeStamp;                                                         // 495
                                                                                                                      // 496
    input.angle = getAngle(offsetCenter, center);                                                                     // 497
    input.distance = getDistance(offsetCenter, center);                                                               // 498
                                                                                                                      // 499
    computeDeltaXY(session, input);                                                                                   // 500
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);                                                 // 501
                                                                                                                      // 502
    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;                                     // 503
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;                               // 504
                                                                                                                      // 505
    computeIntervalInputData(session, input);                                                                         // 506
                                                                                                                      // 507
    // find the correct target                                                                                        // 508
    var target = manager.element;                                                                                     // 509
    if (hasParent(input.srcEvent.target, target)) {                                                                   // 510
        target = input.srcEvent.target;                                                                               // 511
    }                                                                                                                 // 512
    input.target = target;                                                                                            // 513
}                                                                                                                     // 514
                                                                                                                      // 515
function computeDeltaXY(session, input) {                                                                             // 516
    var center = input.center;                                                                                        // 517
    var offset = session.offsetDelta || {};                                                                           // 518
    var prevDelta = session.prevDelta || {};                                                                          // 519
    var prevInput = session.prevInput || {};                                                                          // 520
                                                                                                                      // 521
    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {                                       // 522
        prevDelta = session.prevDelta = {                                                                             // 523
            x: prevInput.deltaX || 0,                                                                                 // 524
            y: prevInput.deltaY || 0                                                                                  // 525
        };                                                                                                            // 526
                                                                                                                      // 527
        offset = session.offsetDelta = {                                                                              // 528
            x: center.x,                                                                                              // 529
            y: center.y                                                                                               // 530
        };                                                                                                            // 531
    }                                                                                                                 // 532
                                                                                                                      // 533
    input.deltaX = prevDelta.x + (center.x - offset.x);                                                               // 534
    input.deltaY = prevDelta.y + (center.y - offset.y);                                                               // 535
}                                                                                                                     // 536
                                                                                                                      // 537
/**                                                                                                                   // 538
 * velocity is calculated every x ms                                                                                  // 539
 * @param {Object} session                                                                                            // 540
 * @param {Object} input                                                                                              // 541
 */                                                                                                                   // 542
function computeIntervalInputData(session, input) {                                                                   // 543
    var last = session.lastInterval || input,                                                                         // 544
        deltaTime = input.timeStamp - last.timeStamp,                                                                 // 545
        velocity, velocityX, velocityY, direction;                                                                    // 546
                                                                                                                      // 547
    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {           // 548
        var deltaX = last.deltaX - input.deltaX;                                                                      // 549
        var deltaY = last.deltaY - input.deltaY;                                                                      // 550
                                                                                                                      // 551
        var v = getVelocity(deltaTime, deltaX, deltaY);                                                               // 552
        velocityX = v.x;                                                                                              // 553
        velocityY = v.y;                                                                                              // 554
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;                                                                 // 555
        direction = getDirection(deltaX, deltaY);                                                                     // 556
                                                                                                                      // 557
        session.lastInterval = input;                                                                                 // 558
    } else {                                                                                                          // 559
        // use latest velocity info if it doesn't overtake a minimum period                                           // 560
        velocity = last.velocity;                                                                                     // 561
        velocityX = last.velocityX;                                                                                   // 562
        velocityY = last.velocityY;                                                                                   // 563
        direction = last.direction;                                                                                   // 564
    }                                                                                                                 // 565
                                                                                                                      // 566
    input.velocity = velocity;                                                                                        // 567
    input.velocityX = velocityX;                                                                                      // 568
    input.velocityY = velocityY;                                                                                      // 569
    input.direction = direction;                                                                                      // 570
}                                                                                                                     // 571
                                                                                                                      // 572
/**                                                                                                                   // 573
 * create a simple clone from the input used for storage of firstInput and firstMultiple                              // 574
 * @param {Object} input                                                                                              // 575
 * @returns {Object} clonedInputData                                                                                  // 576
 */                                                                                                                   // 577
function simpleCloneInputData(input) {                                                                                // 578
    // make a simple copy of the pointers because we will get a reference if we don't                                 // 579
    // we only need clientXY for the calculations                                                                     // 580
    var pointers = [];                                                                                                // 581
    var i = 0;                                                                                                        // 582
    while (i < input.pointers.length) {                                                                               // 583
        pointers[i] = {                                                                                               // 584
            clientX: round(input.pointers[i].clientX),                                                                // 585
            clientY: round(input.pointers[i].clientY)                                                                 // 586
        };                                                                                                            // 587
        i++;                                                                                                          // 588
    }                                                                                                                 // 589
                                                                                                                      // 590
    return {                                                                                                          // 591
        timeStamp: now(),                                                                                             // 592
        pointers: pointers,                                                                                           // 593
        center: getCenter(pointers),                                                                                  // 594
        deltaX: input.deltaX,                                                                                         // 595
        deltaY: input.deltaY                                                                                          // 596
    };                                                                                                                // 597
}                                                                                                                     // 598
                                                                                                                      // 599
/**                                                                                                                   // 600
 * get the center of all the pointers                                                                                 // 601
 * @param {Array} pointers                                                                                            // 602
 * @return {Object} center contains `x` and `y` properties                                                            // 603
 */                                                                                                                   // 604
function getCenter(pointers) {                                                                                        // 605
    var pointersLength = pointers.length;                                                                             // 606
                                                                                                                      // 607
    // no need to loop when only one touch                                                                            // 608
    if (pointersLength === 1) {                                                                                       // 609
        return {                                                                                                      // 610
            x: round(pointers[0].clientX),                                                                            // 611
            y: round(pointers[0].clientY)                                                                             // 612
        };                                                                                                            // 613
    }                                                                                                                 // 614
                                                                                                                      // 615
    var x = 0, y = 0, i = 0;                                                                                          // 616
    while (i < pointersLength) {                                                                                      // 617
        x += pointers[i].clientX;                                                                                     // 618
        y += pointers[i].clientY;                                                                                     // 619
        i++;                                                                                                          // 620
    }                                                                                                                 // 621
                                                                                                                      // 622
    return {                                                                                                          // 623
        x: round(x / pointersLength),                                                                                 // 624
        y: round(y / pointersLength)                                                                                  // 625
    };                                                                                                                // 626
}                                                                                                                     // 627
                                                                                                                      // 628
/**                                                                                                                   // 629
 * calculate the velocity between two points. unit is in px per ms.                                                   // 630
 * @param {Number} deltaTime                                                                                          // 631
 * @param {Number} x                                                                                                  // 632
 * @param {Number} y                                                                                                  // 633
 * @return {Object} velocity `x` and `y`                                                                              // 634
 */                                                                                                                   // 635
function getVelocity(deltaTime, x, y) {                                                                               // 636
    return {                                                                                                          // 637
        x: x / deltaTime || 0,                                                                                        // 638
        y: y / deltaTime || 0                                                                                         // 639
    };                                                                                                                // 640
}                                                                                                                     // 641
                                                                                                                      // 642
/**                                                                                                                   // 643
 * get the direction between two points                                                                               // 644
 * @param {Number} x                                                                                                  // 645
 * @param {Number} y                                                                                                  // 646
 * @return {Number} direction                                                                                         // 647
 */                                                                                                                   // 648
function getDirection(x, y) {                                                                                         // 649
    if (x === y) {                                                                                                    // 650
        return DIRECTION_NONE;                                                                                        // 651
    }                                                                                                                 // 652
                                                                                                                      // 653
    if (abs(x) >= abs(y)) {                                                                                           // 654
        return x > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;                                                              // 655
    }                                                                                                                 // 656
    return y > 0 ? DIRECTION_UP : DIRECTION_DOWN;                                                                     // 657
}                                                                                                                     // 658
                                                                                                                      // 659
/**                                                                                                                   // 660
 * calculate the absolute distance between two points                                                                 // 661
 * @param {Object} p1 {x, y}                                                                                          // 662
 * @param {Object} p2 {x, y}                                                                                          // 663
 * @param {Array} [props] containing x and y keys                                                                     // 664
 * @return {Number} distance                                                                                          // 665
 */                                                                                                                   // 666
function getDistance(p1, p2, props) {                                                                                 // 667
    if (!props) {                                                                                                     // 668
        props = PROPS_XY;                                                                                             // 669
    }                                                                                                                 // 670
    var x = p2[props[0]] - p1[props[0]],                                                                              // 671
        y = p2[props[1]] - p1[props[1]];                                                                              // 672
                                                                                                                      // 673
    return Math.sqrt((x * x) + (y * y));                                                                              // 674
}                                                                                                                     // 675
                                                                                                                      // 676
/**                                                                                                                   // 677
 * calculate the angle between two coordinates                                                                        // 678
 * @param {Object} p1                                                                                                 // 679
 * @param {Object} p2                                                                                                 // 680
 * @param {Array} [props] containing x and y keys                                                                     // 681
 * @return {Number} angle                                                                                             // 682
 */                                                                                                                   // 683
function getAngle(p1, p2, props) {                                                                                    // 684
    if (!props) {                                                                                                     // 685
        props = PROPS_XY;                                                                                             // 686
    }                                                                                                                 // 687
    var x = p2[props[0]] - p1[props[0]],                                                                              // 688
        y = p2[props[1]] - p1[props[1]];                                                                              // 689
    return Math.atan2(y, x) * 180 / Math.PI;                                                                          // 690
}                                                                                                                     // 691
                                                                                                                      // 692
/**                                                                                                                   // 693
 * calculate the rotation degrees between two pointersets                                                             // 694
 * @param {Array} start array of pointers                                                                             // 695
 * @param {Array} end array of pointers                                                                               // 696
 * @return {Number} rotation                                                                                          // 697
 */                                                                                                                   // 698
function getRotation(start, end) {                                                                                    // 699
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) - getAngle(start[1], start[0], PROPS_CLIENT_XY);                 // 700
}                                                                                                                     // 701
                                                                                                                      // 702
/**                                                                                                                   // 703
 * calculate the scale factor between two pointersets                                                                 // 704
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out                               // 705
 * @param {Array} start array of pointers                                                                             // 706
 * @param {Array} end array of pointers                                                                               // 707
 * @return {Number} scale                                                                                             // 708
 */                                                                                                                   // 709
function getScale(start, end) {                                                                                       // 710
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);           // 711
}                                                                                                                     // 712
                                                                                                                      // 713
var MOUSE_INPUT_MAP = {                                                                                               // 714
    mousedown: INPUT_START,                                                                                           // 715
    mousemove: INPUT_MOVE,                                                                                            // 716
    mouseup: INPUT_END                                                                                                // 717
};                                                                                                                    // 718
                                                                                                                      // 719
var MOUSE_ELEMENT_EVENTS = 'mousedown';                                                                               // 720
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';                                                                        // 721
                                                                                                                      // 722
/**                                                                                                                   // 723
 * Mouse events input                                                                                                 // 724
 * @constructor                                                                                                       // 725
 * @extends Input                                                                                                     // 726
 */                                                                                                                   // 727
function MouseInput() {                                                                                               // 728
    this.evEl = MOUSE_ELEMENT_EVENTS;                                                                                 // 729
    this.evWin = MOUSE_WINDOW_EVENTS;                                                                                 // 730
                                                                                                                      // 731
    this.allow = true; // used by Input.TouchMouse to disable mouse events                                            // 732
    this.pressed = false; // mousedown state                                                                          // 733
                                                                                                                      // 734
    Input.apply(this, arguments);                                                                                     // 735
}                                                                                                                     // 736
                                                                                                                      // 737
inherit(MouseInput, Input, {                                                                                          // 738
    /**                                                                                                               // 739
     * handle mouse events                                                                                            // 740
     * @param {Object} ev                                                                                             // 741
     */                                                                                                               // 742
    handler: function MEhandler(ev) {                                                                                 // 743
        var eventType = MOUSE_INPUT_MAP[ev.type];                                                                     // 744
                                                                                                                      // 745
        // on start we want to have the left mouse button down                                                        // 746
        if (eventType & INPUT_START && ev.button === 0) {                                                             // 747
            this.pressed = true;                                                                                      // 748
        }                                                                                                             // 749
                                                                                                                      // 750
        if (eventType & INPUT_MOVE && ev.which !== 1) {                                                               // 751
            eventType = INPUT_END;                                                                                    // 752
        }                                                                                                             // 753
                                                                                                                      // 754
        // mouse must be down, and mouse events are allowed (see the TouchMouse input)                                // 755
        if (!this.pressed || !this.allow) {                                                                           // 756
            return;                                                                                                   // 757
        }                                                                                                             // 758
                                                                                                                      // 759
        if (eventType & INPUT_END) {                                                                                  // 760
            this.pressed = false;                                                                                     // 761
        }                                                                                                             // 762
                                                                                                                      // 763
        this.callback(this.manager, eventType, {                                                                      // 764
            pointers: [ev],                                                                                           // 765
            changedPointers: [ev],                                                                                    // 766
            pointerType: INPUT_TYPE_MOUSE,                                                                            // 767
            srcEvent: ev                                                                                              // 768
        });                                                                                                           // 769
    }                                                                                                                 // 770
});                                                                                                                   // 771
                                                                                                                      // 772
var POINTER_INPUT_MAP = {                                                                                             // 773
    pointerdown: INPUT_START,                                                                                         // 774
    pointermove: INPUT_MOVE,                                                                                          // 775
    pointerup: INPUT_END,                                                                                             // 776
    pointercancel: INPUT_CANCEL,                                                                                      // 777
    pointerout: INPUT_CANCEL                                                                                          // 778
};                                                                                                                    // 779
                                                                                                                      // 780
// in IE10 the pointer types is defined as an enum                                                                    // 781
var IE10_POINTER_TYPE_ENUM = {                                                                                        // 782
    2: INPUT_TYPE_TOUCH,                                                                                              // 783
    3: INPUT_TYPE_PEN,                                                                                                // 784
    4: INPUT_TYPE_MOUSE,                                                                                              // 785
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816                              // 786
};                                                                                                                    // 787
                                                                                                                      // 788
var POINTER_ELEMENT_EVENTS = 'pointerdown';                                                                           // 789
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';                                                    // 790
                                                                                                                      // 791
// IE10 has prefixed support, and case-sensitive                                                                      // 792
if (window.MSPointerEvent) {                                                                                          // 793
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';                                                                         // 794
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';                                              // 795
}                                                                                                                     // 796
                                                                                                                      // 797
/**                                                                                                                   // 798
 * Pointer events input                                                                                               // 799
 * @constructor                                                                                                       // 800
 * @extends Input                                                                                                     // 801
 */                                                                                                                   // 802
function PointerEventInput() {                                                                                        // 803
    this.evEl = POINTER_ELEMENT_EVENTS;                                                                               // 804
    this.evWin = POINTER_WINDOW_EVENTS;                                                                               // 805
                                                                                                                      // 806
    Input.apply(this, arguments);                                                                                     // 807
                                                                                                                      // 808
    this.store = (this.manager.session.pointerEvents = []);                                                           // 809
}                                                                                                                     // 810
                                                                                                                      // 811
inherit(PointerEventInput, Input, {                                                                                   // 812
    /**                                                                                                               // 813
     * handle mouse events                                                                                            // 814
     * @param {Object} ev                                                                                             // 815
     */                                                                                                               // 816
    handler: function PEhandler(ev) {                                                                                 // 817
        var store = this.store;                                                                                       // 818
        var removePointer = false;                                                                                    // 819
                                                                                                                      // 820
        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');                                            // 821
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];                                                       // 822
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;                                   // 823
                                                                                                                      // 824
        var isTouch = (pointerType == INPUT_TYPE_TOUCH);                                                              // 825
                                                                                                                      // 826
        // get index of the event in the store                                                                        // 827
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');                                                   // 828
                                                                                                                      // 829
        // start and mouse must be down                                                                               // 830
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {                                                // 831
            if (storeIndex < 0) {                                                                                     // 832
                store.push(ev);                                                                                       // 833
                storeIndex = store.length - 1;                                                                        // 834
            }                                                                                                         // 835
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {                                                          // 836
            removePointer = true;                                                                                     // 837
        }                                                                                                             // 838
                                                                                                                      // 839
        // it not found, so the pointer hasn't been down (so it's probably a hover)                                   // 840
        if (storeIndex < 0) {                                                                                         // 841
            return;                                                                                                   // 842
        }                                                                                                             // 843
                                                                                                                      // 844
        // update the event in the store                                                                              // 845
        store[storeIndex] = ev;                                                                                       // 846
                                                                                                                      // 847
        this.callback(this.manager, eventType, {                                                                      // 848
            pointers: store,                                                                                          // 849
            changedPointers: [ev],                                                                                    // 850
            pointerType: pointerType,                                                                                 // 851
            srcEvent: ev                                                                                              // 852
        });                                                                                                           // 853
                                                                                                                      // 854
        if (removePointer) {                                                                                          // 855
            // remove from the store                                                                                  // 856
            store.splice(storeIndex, 1);                                                                              // 857
        }                                                                                                             // 858
    }                                                                                                                 // 859
});                                                                                                                   // 860
                                                                                                                      // 861
var SINGLE_TOUCH_INPUT_MAP = {                                                                                        // 862
    touchstart: INPUT_START,                                                                                          // 863
    touchmove: INPUT_MOVE,                                                                                            // 864
    touchend: INPUT_END,                                                                                              // 865
    touchcancel: INPUT_CANCEL                                                                                         // 866
};                                                                                                                    // 867
                                                                                                                      // 868
var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';                                                                        // 869
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';                                         // 870
                                                                                                                      // 871
/**                                                                                                                   // 872
 * Touch events input                                                                                                 // 873
 * @constructor                                                                                                       // 874
 * @extends Input                                                                                                     // 875
 */                                                                                                                   // 876
function SingleTouchInput() {                                                                                         // 877
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;                                                                       // 878
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;                                                                          // 879
    this.started = false;                                                                                             // 880
                                                                                                                      // 881
    Input.apply(this, arguments);                                                                                     // 882
}                                                                                                                     // 883
                                                                                                                      // 884
inherit(SingleTouchInput, Input, {                                                                                    // 885
    handler: function TEhandler(ev) {                                                                                 // 886
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];                                                                   // 887
                                                                                                                      // 888
        // should we handle the touch events?                                                                         // 889
        if (type === INPUT_START) {                                                                                   // 890
            this.started = true;                                                                                      // 891
        }                                                                                                             // 892
                                                                                                                      // 893
        if (!this.started) {                                                                                          // 894
            return;                                                                                                   // 895
        }                                                                                                             // 896
                                                                                                                      // 897
        var touches = normalizeSingleTouches.call(this, ev, type);                                                    // 898
                                                                                                                      // 899
        // when done, reset the started state                                                                         // 900
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {                       // 901
            this.started = false;                                                                                     // 902
        }                                                                                                             // 903
                                                                                                                      // 904
        this.callback(this.manager, type, {                                                                           // 905
            pointers: touches[0],                                                                                     // 906
            changedPointers: touches[1],                                                                              // 907
            pointerType: INPUT_TYPE_TOUCH,                                                                            // 908
            srcEvent: ev                                                                                              // 909
        });                                                                                                           // 910
    }                                                                                                                 // 911
});                                                                                                                   // 912
                                                                                                                      // 913
/**                                                                                                                   // 914
 * @this {TouchInput}                                                                                                 // 915
 * @param {Object} ev                                                                                                 // 916
 * @param {Number} type flag                                                                                          // 917
 * @returns {undefined|Array} [all, changed]                                                                          // 918
 */                                                                                                                   // 919
function normalizeSingleTouches(ev, type) {                                                                           // 920
    var all = toArray(ev.touches);                                                                                    // 921
    var changed = toArray(ev.changedTouches);                                                                         // 922
                                                                                                                      // 923
    if (type & (INPUT_END | INPUT_CANCEL)) {                                                                          // 924
        all = uniqueArray(all.concat(changed), 'identifier', true);                                                   // 925
    }                                                                                                                 // 926
                                                                                                                      // 927
    return [all, changed];                                                                                            // 928
}                                                                                                                     // 929
                                                                                                                      // 930
var TOUCH_INPUT_MAP = {                                                                                               // 931
    touchstart: INPUT_START,                                                                                          // 932
    touchmove: INPUT_MOVE,                                                                                            // 933
    touchend: INPUT_END,                                                                                              // 934
    touchcancel: INPUT_CANCEL                                                                                         // 935
};                                                                                                                    // 936
                                                                                                                      // 937
var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';                                                // 938
                                                                                                                      // 939
/**                                                                                                                   // 940
 * Multi-user touch events input                                                                                      // 941
 * @constructor                                                                                                       // 942
 * @extends Input                                                                                                     // 943
 */                                                                                                                   // 944
function TouchInput() {                                                                                               // 945
    this.evTarget = TOUCH_TARGET_EVENTS;                                                                              // 946
    this.targetIds = {};                                                                                              // 947
                                                                                                                      // 948
    Input.apply(this, arguments);                                                                                     // 949
}                                                                                                                     // 950
                                                                                                                      // 951
inherit(TouchInput, Input, {                                                                                          // 952
    handler: function MTEhandler(ev) {                                                                                // 953
        var type = TOUCH_INPUT_MAP[ev.type];                                                                          // 954
        var touches = getTouches.call(this, ev, type);                                                                // 955
        if (!touches) {                                                                                               // 956
            return;                                                                                                   // 957
        }                                                                                                             // 958
                                                                                                                      // 959
        this.callback(this.manager, type, {                                                                           // 960
            pointers: touches[0],                                                                                     // 961
            changedPointers: touches[1],                                                                              // 962
            pointerType: INPUT_TYPE_TOUCH,                                                                            // 963
            srcEvent: ev                                                                                              // 964
        });                                                                                                           // 965
    }                                                                                                                 // 966
});                                                                                                                   // 967
                                                                                                                      // 968
/**                                                                                                                   // 969
 * @this {TouchInput}                                                                                                 // 970
 * @param {Object} ev                                                                                                 // 971
 * @param {Number} type flag                                                                                          // 972
 * @returns {undefined|Array} [all, changed]                                                                          // 973
 */                                                                                                                   // 974
function getTouches(ev, type) {                                                                                       // 975
    var allTouches = toArray(ev.touches);                                                                             // 976
    var targetIds = this.targetIds;                                                                                   // 977
                                                                                                                      // 978
    // when there is only one touch, the process can be simplified                                                    // 979
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {                                               // 980
        targetIds[allTouches[0].identifier] = true;                                                                   // 981
        return [allTouches, allTouches];                                                                              // 982
    }                                                                                                                 // 983
                                                                                                                      // 984
    var i,                                                                                                            // 985
        targetTouches,                                                                                                // 986
        changedTouches = toArray(ev.changedTouches),                                                                  // 987
        changedTargetTouches = [],                                                                                    // 988
        target = this.target;                                                                                         // 989
                                                                                                                      // 990
    // get target touches from touches                                                                                // 991
    targetTouches = allTouches.filter(function(touch) {                                                               // 992
        return hasParent(touch.target, target);                                                                       // 993
    });                                                                                                               // 994
                                                                                                                      // 995
    // collect touches                                                                                                // 996
    if (type === INPUT_START) {                                                                                       // 997
        i = 0;                                                                                                        // 998
        while (i < targetTouches.length) {                                                                            // 999
            targetIds[targetTouches[i].identifier] = true;                                                            // 1000
            i++;                                                                                                      // 1001
        }                                                                                                             // 1002
    }                                                                                                                 // 1003
                                                                                                                      // 1004
    // filter changed touches to only contain touches that exist in the collected target ids                          // 1005
    i = 0;                                                                                                            // 1006
    while (i < changedTouches.length) {                                                                               // 1007
        if (targetIds[changedTouches[i].identifier]) {                                                                // 1008
            changedTargetTouches.push(changedTouches[i]);                                                             // 1009
        }                                                                                                             // 1010
                                                                                                                      // 1011
        // cleanup removed touches                                                                                    // 1012
        if (type & (INPUT_END | INPUT_CANCEL)) {                                                                      // 1013
            delete targetIds[changedTouches[i].identifier];                                                           // 1014
        }                                                                                                             // 1015
        i++;                                                                                                          // 1016
    }                                                                                                                 // 1017
                                                                                                                      // 1018
    if (!changedTargetTouches.length) {                                                                               // 1019
        return;                                                                                                       // 1020
    }                                                                                                                 // 1021
                                                                                                                      // 1022
    return [                                                                                                          // 1023
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'     // 1024
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),                                  // 1025
        changedTargetTouches                                                                                          // 1026
    ];                                                                                                                // 1027
}                                                                                                                     // 1028
                                                                                                                      // 1029
/**                                                                                                                   // 1030
 * Combined touch and mouse input                                                                                     // 1031
 *                                                                                                                    // 1032
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.                            // 1033
 * This because touch devices also emit mouse events while doing a touch.                                             // 1034
 *                                                                                                                    // 1035
 * @constructor                                                                                                       // 1036
 * @extends Input                                                                                                     // 1037
 */                                                                                                                   // 1038
function TouchMouseInput() {                                                                                          // 1039
    Input.apply(this, arguments);                                                                                     // 1040
                                                                                                                      // 1041
    var handler = bindFn(this.handler, this);                                                                         // 1042
    this.touch = new TouchInput(this.manager, handler);                                                               // 1043
    this.mouse = new MouseInput(this.manager, handler);                                                               // 1044
}                                                                                                                     // 1045
                                                                                                                      // 1046
inherit(TouchMouseInput, Input, {                                                                                     // 1047
    /**                                                                                                               // 1048
     * handle mouse and touch events                                                                                  // 1049
     * @param {Hammer} manager                                                                                        // 1050
     * @param {String} inputEvent                                                                                     // 1051
     * @param {Object} inputData                                                                                      // 1052
     */                                                                                                               // 1053
    handler: function TMEhandler(manager, inputEvent, inputData) {                                                    // 1054
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),                                                    // 1055
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);                                                    // 1056
                                                                                                                      // 1057
        // when we're in a touch event, so  block all upcoming mouse events                                           // 1058
        // most mobile browser also emit mouseevents, right after touchstart                                          // 1059
        if (isTouch) {                                                                                                // 1060
            this.mouse.allow = false;                                                                                 // 1061
        } else if (isMouse && !this.mouse.allow) {                                                                    // 1062
            return;                                                                                                   // 1063
        }                                                                                                             // 1064
                                                                                                                      // 1065
        // reset the allowMouse when we're done                                                                       // 1066
        if (inputEvent & (INPUT_END | INPUT_CANCEL)) {                                                                // 1067
            this.mouse.allow = true;                                                                                  // 1068
        }                                                                                                             // 1069
                                                                                                                      // 1070
        this.callback(manager, inputEvent, inputData);                                                                // 1071
    },                                                                                                                // 1072
                                                                                                                      // 1073
    /**                                                                                                               // 1074
     * remove the event listeners                                                                                     // 1075
     */                                                                                                               // 1076
    destroy: function destroy() {                                                                                     // 1077
        this.touch.destroy();                                                                                         // 1078
        this.mouse.destroy();                                                                                         // 1079
    }                                                                                                                 // 1080
});                                                                                                                   // 1081
                                                                                                                      // 1082
var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');                                              // 1083
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;                                                        // 1084
                                                                                                                      // 1085
// magical touchAction value                                                                                          // 1086
var TOUCH_ACTION_COMPUTE = 'compute';                                                                                 // 1087
var TOUCH_ACTION_AUTO = 'auto';                                                                                       // 1088
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented                                                    // 1089
var TOUCH_ACTION_NONE = 'none';                                                                                       // 1090
var TOUCH_ACTION_PAN_X = 'pan-x';                                                                                     // 1091
var TOUCH_ACTION_PAN_Y = 'pan-y';                                                                                     // 1092
                                                                                                                      // 1093
/**                                                                                                                   // 1094
 * Touch Action                                                                                                       // 1095
 * sets the touchAction property or uses the js alternative                                                           // 1096
 * @param {Manager} manager                                                                                           // 1097
 * @param {String} value                                                                                              // 1098
 * @constructor                                                                                                       // 1099
 */                                                                                                                   // 1100
function TouchAction(manager, value) {                                                                                // 1101
    this.manager = manager;                                                                                           // 1102
    this.set(value);                                                                                                  // 1103
}                                                                                                                     // 1104
                                                                                                                      // 1105
TouchAction.prototype = {                                                                                             // 1106
    /**                                                                                                               // 1107
     * set the touchAction value on the element or enable the polyfill                                                // 1108
     * @param {String} value                                                                                          // 1109
     */                                                                                                               // 1110
    set: function(value) {                                                                                            // 1111
        // find out the touch-action by the event handlers                                                            // 1112
        if (value == TOUCH_ACTION_COMPUTE) {                                                                          // 1113
            value = this.compute();                                                                                   // 1114
        }                                                                                                             // 1115
                                                                                                                      // 1116
        if (NATIVE_TOUCH_ACTION) {                                                                                    // 1117
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;                                                // 1118
        }                                                                                                             // 1119
        this.actions = value.toLowerCase().trim();                                                                    // 1120
    },                                                                                                                // 1121
                                                                                                                      // 1122
    /**                                                                                                               // 1123
     * just re-set the touchAction value                                                                              // 1124
     */                                                                                                               // 1125
    update: function() {                                                                                              // 1126
        this.set(this.manager.options.touchAction);                                                                   // 1127
    },                                                                                                                // 1128
                                                                                                                      // 1129
    /**                                                                                                               // 1130
     * compute the value for the touchAction property based on the recognizer's settings                              // 1131
     * @returns {String} value                                                                                        // 1132
     */                                                                                                               // 1133
    compute: function() {                                                                                             // 1134
        var actions = [];                                                                                             // 1135
        each(this.manager.recognizers, function(recognizer) {                                                         // 1136
            if (boolOrFn(recognizer.options.enable, [recognizer])) {                                                  // 1137
                actions = actions.concat(recognizer.getTouchAction());                                                // 1138
            }                                                                                                         // 1139
        });                                                                                                           // 1140
        return cleanTouchActions(actions.join(' '));                                                                  // 1141
    },                                                                                                                // 1142
                                                                                                                      // 1143
    /**                                                                                                               // 1144
     * this method is called on each input cycle and provides the preventing of the browser behavior                  // 1145
     * @param {Object} input                                                                                          // 1146
     */                                                                                                               // 1147
    preventDefaults: function(input) {                                                                                // 1148
        // not needed with native support for the touchAction property                                                // 1149
        if (NATIVE_TOUCH_ACTION) {                                                                                    // 1150
            return;                                                                                                   // 1151
        }                                                                                                             // 1152
                                                                                                                      // 1153
        var srcEvent = input.srcEvent;                                                                                // 1154
        var direction = input.offsetDirection;                                                                        // 1155
                                                                                                                      // 1156
        // if the touch action did prevented once this session                                                        // 1157
        if (this.manager.session.prevented) {                                                                         // 1158
            srcEvent.preventDefault();                                                                                // 1159
            return;                                                                                                   // 1160
        }                                                                                                             // 1161
                                                                                                                      // 1162
        var actions = this.actions;                                                                                   // 1163
        var hasNone = inStr(actions, TOUCH_ACTION_NONE);                                                              // 1164
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);                                                             // 1165
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);                                                             // 1166
                                                                                                                      // 1167
        if (hasNone ||                                                                                                // 1168
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||                                                          // 1169
            (hasPanX && direction & DIRECTION_VERTICAL)) {                                                            // 1170
            return this.preventSrc(srcEvent);                                                                         // 1171
        }                                                                                                             // 1172
    },                                                                                                                // 1173
                                                                                                                      // 1174
    /**                                                                                                               // 1175
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)                        // 1176
     * @param {Object} srcEvent                                                                                       // 1177
     */                                                                                                               // 1178
    preventSrc: function(srcEvent) {                                                                                  // 1179
        this.manager.session.prevented = true;                                                                        // 1180
        srcEvent.preventDefault();                                                                                    // 1181
    }                                                                                                                 // 1182
};                                                                                                                    // 1183
                                                                                                                      // 1184
/**                                                                                                                   // 1185
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *                   // 1186
 * @param {String} actions                                                                                            // 1187
 * @returns {*}                                                                                                       // 1188
 */                                                                                                                   // 1189
function cleanTouchActions(actions) {                                                                                 // 1190
    // none                                                                                                           // 1191
    if (inStr(actions, TOUCH_ACTION_NONE)) {                                                                          // 1192
        return TOUCH_ACTION_NONE;                                                                                     // 1193
    }                                                                                                                 // 1194
                                                                                                                      // 1195
    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);                                                                 // 1196
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);                                                                 // 1197
                                                                                                                      // 1198
    // pan-x and pan-y can be combined                                                                                // 1199
    if (hasPanX && hasPanY) {                                                                                         // 1200
        return TOUCH_ACTION_PAN_X + ' ' + TOUCH_ACTION_PAN_Y;                                                         // 1201
    }                                                                                                                 // 1202
                                                                                                                      // 1203
    // pan-x OR pan-y                                                                                                 // 1204
    if (hasPanX || hasPanY) {                                                                                         // 1205
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;                                                     // 1206
    }                                                                                                                 // 1207
                                                                                                                      // 1208
    // manipulation                                                                                                   // 1209
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {                                                                  // 1210
        return TOUCH_ACTION_MANIPULATION;                                                                             // 1211
    }                                                                                                                 // 1212
                                                                                                                      // 1213
    return TOUCH_ACTION_AUTO;                                                                                         // 1214
}                                                                                                                     // 1215
                                                                                                                      // 1216
/**                                                                                                                   // 1217
 * Recognizer flow explained; *                                                                                       // 1218
 * All recognizers have the initial state of POSSIBLE when a input session starts.                                    // 1219
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *    // 1220
 * Example session for mouse-input: mousedown -> mousemove -> mouseup                                                 // 1221
 *                                                                                                                    // 1222
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed                              // 1223
 * which determines with state it should be.                                                                          // 1224
 *                                                                                                                    // 1225
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to                     // 1226
 * POSSIBLE to give it another change on the next cycle.                                                              // 1227
 *                                                                                                                    // 1228
 *               Possible                                                                                             // 1229
 *                  |                                                                                                 // 1230
 *            +-----+---------------+                                                                                 // 1231
 *            |                     |                                                                                 // 1232
 *      +-----+-----+               |                                                                                 // 1233
 *      |           |               |                                                                                 // 1234
 *   Failed      Cancelled          |                                                                                 // 1235
 *                          +-------+------+                                                                          // 1236
 *                          |              |                                                                          // 1237
 *                      Recognized       Began                                                                        // 1238
 *                                         |                                                                          // 1239
 *                                      Changed                                                                       // 1240
 *                                         |                                                                          // 1241
 *                                  Ended/Recognized                                                                  // 1242
 */                                                                                                                   // 1243
var STATE_POSSIBLE = 1;                                                                                               // 1244
var STATE_BEGAN = 2;                                                                                                  // 1245
var STATE_CHANGED = 4;                                                                                                // 1246
var STATE_ENDED = 8;                                                                                                  // 1247
var STATE_RECOGNIZED = STATE_ENDED;                                                                                   // 1248
var STATE_CANCELLED = 16;                                                                                             // 1249
var STATE_FAILED = 32;                                                                                                // 1250
                                                                                                                      // 1251
/**                                                                                                                   // 1252
 * Recognizer                                                                                                         // 1253
 * Every recognizer needs to extend from this class.                                                                  // 1254
 * @constructor                                                                                                       // 1255
 * @param {Object} options                                                                                            // 1256
 */                                                                                                                   // 1257
function Recognizer(options) {                                                                                        // 1258
    this.id = uniqueId();                                                                                             // 1259
                                                                                                                      // 1260
    this.manager = null;                                                                                              // 1261
    this.options = merge(options || {}, this.defaults);                                                               // 1262
                                                                                                                      // 1263
    // default is enable true                                                                                         // 1264
    this.options.enable = ifUndefined(this.options.enable, true);                                                     // 1265
                                                                                                                      // 1266
    this.state = STATE_POSSIBLE;                                                                                      // 1267
                                                                                                                      // 1268
    this.simultaneous = {};                                                                                           // 1269
    this.requireFail = [];                                                                                            // 1270
}                                                                                                                     // 1271
                                                                                                                      // 1272
Recognizer.prototype = {                                                                                              // 1273
    /**                                                                                                               // 1274
     * @virtual                                                                                                       // 1275
     * @type {Object}                                                                                                 // 1276
     */                                                                                                               // 1277
    defaults: {},                                                                                                     // 1278
                                                                                                                      // 1279
    /**                                                                                                               // 1280
     * set options                                                                                                    // 1281
     * @param {Object} options                                                                                        // 1282
     * @return {Recognizer}                                                                                           // 1283
     */                                                                                                               // 1284
    set: function(options) {                                                                                          // 1285
        extend(this.options, options);                                                                                // 1286
                                                                                                                      // 1287
        // also update the touchAction, in case something changed about the directions/enabled state                  // 1288
        this.manager && this.manager.touchAction.update();                                                            // 1289
        return this;                                                                                                  // 1290
    },                                                                                                                // 1291
                                                                                                                      // 1292
    /**                                                                                                               // 1293
     * recognize simultaneous with an other recognizer.                                                               // 1294
     * @param {Recognizer} otherRecognizer                                                                            // 1295
     * @returns {Recognizer} this                                                                                     // 1296
     */                                                                                                               // 1297
    recognizeWith: function(otherRecognizer) {                                                                        // 1298
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {                                                 // 1299
            return this;                                                                                              // 1300
        }                                                                                                             // 1301
                                                                                                                      // 1302
        var simultaneous = this.simultaneous;                                                                         // 1303
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);                                        // 1304
        if (!simultaneous[otherRecognizer.id]) {                                                                      // 1305
            simultaneous[otherRecognizer.id] = otherRecognizer;                                                       // 1306
            otherRecognizer.recognizeWith(this);                                                                      // 1307
        }                                                                                                             // 1308
        return this;                                                                                                  // 1309
    },                                                                                                                // 1310
                                                                                                                      // 1311
    /**                                                                                                               // 1312
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.                                 // 1313
     * @param {Recognizer} otherRecognizer                                                                            // 1314
     * @returns {Recognizer} this                                                                                     // 1315
     */                                                                                                               // 1316
    dropRecognizeWith: function(otherRecognizer) {                                                                    // 1317
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {                                             // 1318
            return this;                                                                                              // 1319
        }                                                                                                             // 1320
                                                                                                                      // 1321
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);                                        // 1322
        delete this.simultaneous[otherRecognizer.id];                                                                 // 1323
        return this;                                                                                                  // 1324
    },                                                                                                                // 1325
                                                                                                                      // 1326
    /**                                                                                                               // 1327
     * recognizer can only run when an other is failing                                                               // 1328
     * @param {Recognizer} otherRecognizer                                                                            // 1329
     * @returns {Recognizer} this                                                                                     // 1330
     */                                                                                                               // 1331
    requireFailure: function(otherRecognizer) {                                                                       // 1332
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {                                                // 1333
            return this;                                                                                              // 1334
        }                                                                                                             // 1335
                                                                                                                      // 1336
        var requireFail = this.requireFail;                                                                           // 1337
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);                                        // 1338
        if (inArray(requireFail, otherRecognizer) === -1) {                                                           // 1339
            requireFail.push(otherRecognizer);                                                                        // 1340
            otherRecognizer.requireFailure(this);                                                                     // 1341
        }                                                                                                             // 1342
        return this;                                                                                                  // 1343
    },                                                                                                                // 1344
                                                                                                                      // 1345
    /**                                                                                                               // 1346
     * drop the requireFailure link. it does not remove the link on the other recognizer.                             // 1347
     * @param {Recognizer} otherRecognizer                                                                            // 1348
     * @returns {Recognizer} this                                                                                     // 1349
     */                                                                                                               // 1350
    dropRequireFailure: function(otherRecognizer) {                                                                   // 1351
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {                                            // 1352
            return this;                                                                                              // 1353
        }                                                                                                             // 1354
                                                                                                                      // 1355
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);                                        // 1356
        var index = inArray(this.requireFail, otherRecognizer);                                                       // 1357
        if (index > -1) {                                                                                             // 1358
            this.requireFail.splice(index, 1);                                                                        // 1359
        }                                                                                                             // 1360
        return this;                                                                                                  // 1361
    },                                                                                                                // 1362
                                                                                                                      // 1363
    /**                                                                                                               // 1364
     * has require failures boolean                                                                                   // 1365
     * @returns {boolean}                                                                                             // 1366
     */                                                                                                               // 1367
    hasRequireFailures: function() {                                                                                  // 1368
        return this.requireFail.length > 0;                                                                           // 1369
    },                                                                                                                // 1370
                                                                                                                      // 1371
    /**                                                                                                               // 1372
     * if the recognizer can recognize simultaneous with an other recognizer                                          // 1373
     * @param {Recognizer} otherRecognizer                                                                            // 1374
     * @returns {Boolean}                                                                                             // 1375
     */                                                                                                               // 1376
    canRecognizeWith: function(otherRecognizer) {                                                                     // 1377
        return !!this.simultaneous[otherRecognizer.id];                                                               // 1378
    },                                                                                                                // 1379
                                                                                                                      // 1380
    /**                                                                                                               // 1381
     * You should use `tryEmit` instead of `emit` directly to check                                                   // 1382
     * that all the needed recognizers has failed before emitting.                                                    // 1383
     * @param {Object} input                                                                                          // 1384
     */                                                                                                               // 1385
    emit: function(input) {                                                                                           // 1386
        var self = this;                                                                                              // 1387
        var state = this.state;                                                                                       // 1388
                                                                                                                      // 1389
        function emit(withState) {                                                                                    // 1390
            self.manager.emit(self.options.event + (withState ? stateStr(state) : ''), input);                        // 1391
        }                                                                                                             // 1392
                                                                                                                      // 1393
        // 'panstart' and 'panmove'                                                                                   // 1394
        if (state < STATE_ENDED) {                                                                                    // 1395
            emit(true);                                                                                               // 1396
        }                                                                                                             // 1397
                                                                                                                      // 1398
        emit(); // simple 'eventName' events                                                                          // 1399
                                                                                                                      // 1400
        // panend and pancancel                                                                                       // 1401
        if (state >= STATE_ENDED) {                                                                                   // 1402
            emit(true);                                                                                               // 1403
        }                                                                                                             // 1404
    },                                                                                                                // 1405
                                                                                                                      // 1406
    /**                                                                                                               // 1407
     * Check that all the require failure recognizers has failed,                                                     // 1408
     * if true, it emits a gesture event,                                                                             // 1409
     * otherwise, setup the state to FAILED.                                                                          // 1410
     * @param {Object} input                                                                                          // 1411
     */                                                                                                               // 1412
    tryEmit: function(input) {                                                                                        // 1413
        if (this.canEmit()) {                                                                                         // 1414
            return this.emit(input);                                                                                  // 1415
        }                                                                                                             // 1416
        // it's failing anyway                                                                                        // 1417
        this.state = STATE_FAILED;                                                                                    // 1418
    },                                                                                                                // 1419
                                                                                                                      // 1420
    /**                                                                                                               // 1421
     * can we emit?                                                                                                   // 1422
     * @returns {boolean}                                                                                             // 1423
     */                                                                                                               // 1424
    canEmit: function() {                                                                                             // 1425
        var i = 0;                                                                                                    // 1426
        while (i < this.requireFail.length) {                                                                         // 1427
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {                                     // 1428
                return false;                                                                                         // 1429
            }                                                                                                         // 1430
            i++;                                                                                                      // 1431
        }                                                                                                             // 1432
        return true;                                                                                                  // 1433
    },                                                                                                                // 1434
                                                                                                                      // 1435
    /**                                                                                                               // 1436
     * update the recognizer                                                                                          // 1437
     * @param {Object} inputData                                                                                      // 1438
     */                                                                                                               // 1439
    recognize: function(inputData) {                                                                                  // 1440
        // make a new copy of the inputData                                                                           // 1441
        // so we can change the inputData without messing up the other recognizers                                    // 1442
        var inputDataClone = extend({}, inputData);                                                                   // 1443
                                                                                                                      // 1444
        // is is enabled and allow recognizing?                                                                       // 1445
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {                                                 // 1446
            this.reset();                                                                                             // 1447
            this.state = STATE_FAILED;                                                                                // 1448
            return;                                                                                                   // 1449
        }                                                                                                             // 1450
                                                                                                                      // 1451
        // reset when we've reached the end                                                                           // 1452
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {                                       // 1453
            this.state = STATE_POSSIBLE;                                                                              // 1454
        }                                                                                                             // 1455
                                                                                                                      // 1456
        this.state = this.process(inputDataClone);                                                                    // 1457
                                                                                                                      // 1458
        // the recognizer has recognized a gesture                                                                    // 1459
        // so trigger an event                                                                                        // 1460
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {                             // 1461
            this.tryEmit(inputDataClone);                                                                             // 1462
        }                                                                                                             // 1463
    },                                                                                                                // 1464
                                                                                                                      // 1465
    /**                                                                                                               // 1466
     * return the state of the recognizer                                                                             // 1467
     * the actual recognizing happens in this method                                                                  // 1468
     * @virtual                                                                                                       // 1469
     * @param {Object} inputData                                                                                      // 1470
     * @returns {Const} STATE                                                                                         // 1471
     */                                                                                                               // 1472
    process: function(inputData) { }, // jshint ignore:line                                                           // 1473
                                                                                                                      // 1474
    /**                                                                                                               // 1475
     * return the preferred touch-action                                                                              // 1476
     * @virtual                                                                                                       // 1477
     * @returns {Array}                                                                                               // 1478
     */                                                                                                               // 1479
    getTouchAction: function() { },                                                                                   // 1480
                                                                                                                      // 1481
    /**                                                                                                               // 1482
     * called when the gesture isn't allowed to recognize                                                             // 1483
     * like when another is being recognized or it is disabled                                                        // 1484
     * @virtual                                                                                                       // 1485
     */                                                                                                               // 1486
    reset: function() { }                                                                                             // 1487
};                                                                                                                    // 1488
                                                                                                                      // 1489
/**                                                                                                                   // 1490
 * get a usable string, used as event postfix                                                                         // 1491
 * @param {Const} state                                                                                               // 1492
 * @returns {String} state                                                                                            // 1493
 */                                                                                                                   // 1494
function stateStr(state) {                                                                                            // 1495
    if (state & STATE_CANCELLED) {                                                                                    // 1496
        return 'cancel';                                                                                              // 1497
    } else if (state & STATE_ENDED) {                                                                                 // 1498
        return 'end';                                                                                                 // 1499
    } else if (state & STATE_CHANGED) {                                                                               // 1500
        return 'move';                                                                                                // 1501
    } else if (state & STATE_BEGAN) {                                                                                 // 1502
        return 'start';                                                                                               // 1503
    }                                                                                                                 // 1504
    return '';                                                                                                        // 1505
}                                                                                                                     // 1506
                                                                                                                      // 1507
/**                                                                                                                   // 1508
 * direction cons to string                                                                                           // 1509
 * @param {Const} direction                                                                                           // 1510
 * @returns {String}                                                                                                  // 1511
 */                                                                                                                   // 1512
function directionStr(direction) {                                                                                    // 1513
    if (direction == DIRECTION_DOWN) {                                                                                // 1514
        return 'down';                                                                                                // 1515
    } else if (direction == DIRECTION_UP) {                                                                           // 1516
        return 'up';                                                                                                  // 1517
    } else if (direction == DIRECTION_LEFT) {                                                                         // 1518
        return 'left';                                                                                                // 1519
    } else if (direction == DIRECTION_RIGHT) {                                                                        // 1520
        return 'right';                                                                                               // 1521
    }                                                                                                                 // 1522
    return '';                                                                                                        // 1523
}                                                                                                                     // 1524
                                                                                                                      // 1525
/**                                                                                                                   // 1526
 * get a recognizer by name if it is bound to a manager                                                               // 1527
 * @param {Recognizer|String} otherRecognizer                                                                         // 1528
 * @param {Recognizer} recognizer                                                                                     // 1529
 * @returns {Recognizer}                                                                                              // 1530
 */                                                                                                                   // 1531
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {                                                  // 1532
    var manager = recognizer.manager;                                                                                 // 1533
    if (manager) {                                                                                                    // 1534
        return manager.get(otherRecognizer);                                                                          // 1535
    }                                                                                                                 // 1536
    return otherRecognizer;                                                                                           // 1537
}                                                                                                                     // 1538
                                                                                                                      // 1539
/**                                                                                                                   // 1540
 * This recognizer is just used as a base for the simple attribute recognizers.                                       // 1541
 * @constructor                                                                                                       // 1542
 * @extends Recognizer                                                                                                // 1543
 */                                                                                                                   // 1544
function AttrRecognizer() {                                                                                           // 1545
    Recognizer.apply(this, arguments);                                                                                // 1546
}                                                                                                                     // 1547
                                                                                                                      // 1548
inherit(AttrRecognizer, Recognizer, {                                                                                 // 1549
    /**                                                                                                               // 1550
     * @namespace                                                                                                     // 1551
     * @memberof AttrRecognizer                                                                                       // 1552
     */                                                                                                               // 1553
    defaults: {                                                                                                       // 1554
        /**                                                                                                           // 1555
         * @type {Number}                                                                                             // 1556
         * @default 1                                                                                                 // 1557
         */                                                                                                           // 1558
        pointers: 1                                                                                                   // 1559
    },                                                                                                                // 1560
                                                                                                                      // 1561
    /**                                                                                                               // 1562
     * Used to check if it the recognizer receives valid input, like input.distance > 10.                             // 1563
     * @memberof AttrRecognizer                                                                                       // 1564
     * @param {Object} input                                                                                          // 1565
     * @returns {Boolean} recognized                                                                                  // 1566
     */                                                                                                               // 1567
    attrTest: function(input) {                                                                                       // 1568
        var optionPointers = this.options.pointers;                                                                   // 1569
        return optionPointers === 0 || input.pointers.length === optionPointers;                                      // 1570
    },                                                                                                                // 1571
                                                                                                                      // 1572
    /**                                                                                                               // 1573
     * Process the input and return the state for the recognizer                                                      // 1574
     * @memberof AttrRecognizer                                                                                       // 1575
     * @param {Object} input                                                                                          // 1576
     * @returns {*} State                                                                                             // 1577
     */                                                                                                               // 1578
    process: function(input) {                                                                                        // 1579
        var state = this.state;                                                                                       // 1580
        var eventType = input.eventType;                                                                              // 1581
                                                                                                                      // 1582
        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);                                                     // 1583
        var isValid = this.attrTest(input);                                                                           // 1584
                                                                                                                      // 1585
        // on cancel input and we've recognized before, return STATE_CANCELLED                                        // 1586
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {                                                 // 1587
            return state | STATE_CANCELLED;                                                                           // 1588
        } else if (isRecognized || isValid) {                                                                         // 1589
            if (eventType & INPUT_END) {                                                                              // 1590
                return state | STATE_ENDED;                                                                           // 1591
            } else if (!(state & STATE_BEGAN)) {                                                                      // 1592
                return STATE_BEGAN;                                                                                   // 1593
            }                                                                                                         // 1594
            return state | STATE_CHANGED;                                                                             // 1595
        }                                                                                                             // 1596
        return STATE_FAILED;                                                                                          // 1597
    }                                                                                                                 // 1598
});                                                                                                                   // 1599
                                                                                                                      // 1600
/**                                                                                                                   // 1601
 * Pan                                                                                                                // 1602
 * Recognized when the pointer is down and moved in the allowed direction.                                            // 1603
 * @constructor                                                                                                       // 1604
 * @extends AttrRecognizer                                                                                            // 1605
 */                                                                                                                   // 1606
function PanRecognizer() {                                                                                            // 1607
    AttrRecognizer.apply(this, arguments);                                                                            // 1608
                                                                                                                      // 1609
    this.pX = null;                                                                                                   // 1610
    this.pY = null;                                                                                                   // 1611
}                                                                                                                     // 1612
                                                                                                                      // 1613
inherit(PanRecognizer, AttrRecognizer, {                                                                              // 1614
    /**                                                                                                               // 1615
     * @namespace                                                                                                     // 1616
     * @memberof PanRecognizer                                                                                        // 1617
     */                                                                                                               // 1618
    defaults: {                                                                                                       // 1619
        event: 'pan',                                                                                                 // 1620
        threshold: 10,                                                                                                // 1621
        pointers: 1,                                                                                                  // 1622
        direction: DIRECTION_ALL                                                                                      // 1623
    },                                                                                                                // 1624
                                                                                                                      // 1625
    getTouchAction: function() {                                                                                      // 1626
        var direction = this.options.direction;                                                                       // 1627
        var actions = [];                                                                                             // 1628
        if (direction & DIRECTION_HORIZONTAL) {                                                                       // 1629
            actions.push(TOUCH_ACTION_PAN_Y);                                                                         // 1630
        }                                                                                                             // 1631
        if (direction & DIRECTION_VERTICAL) {                                                                         // 1632
            actions.push(TOUCH_ACTION_PAN_X);                                                                         // 1633
        }                                                                                                             // 1634
        return actions;                                                                                               // 1635
    },                                                                                                                // 1636
                                                                                                                      // 1637
    directionTest: function(input) {                                                                                  // 1638
        var options = this.options;                                                                                   // 1639
        var hasMoved = true;                                                                                          // 1640
        var distance = input.distance;                                                                                // 1641
        var direction = input.direction;                                                                              // 1642
        var x = input.deltaX;                                                                                         // 1643
        var y = input.deltaY;                                                                                         // 1644
                                                                                                                      // 1645
        // lock to axis?                                                                                              // 1646
        if (!(direction & options.direction)) {                                                                       // 1647
            if (options.direction & DIRECTION_HORIZONTAL) {                                                           // 1648
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;                  // 1649
                hasMoved = x != this.pX;                                                                              // 1650
                distance = Math.abs(input.deltaX);                                                                    // 1651
            } else {                                                                                                  // 1652
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;                     // 1653
                hasMoved = y != this.pY;                                                                              // 1654
                distance = Math.abs(input.deltaY);                                                                    // 1655
            }                                                                                                         // 1656
        }                                                                                                             // 1657
        input.direction = direction;                                                                                  // 1658
        return hasMoved && distance > options.threshold && direction & options.direction;                             // 1659
    },                                                                                                                // 1660
                                                                                                                      // 1661
    attrTest: function(input) {                                                                                       // 1662
        return AttrRecognizer.prototype.attrTest.call(this, input) &&                                                 // 1663
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));                 // 1664
    },                                                                                                                // 1665
                                                                                                                      // 1666
    emit: function(input) {                                                                                           // 1667
        this.pX = input.deltaX;                                                                                       // 1668
        this.pY = input.deltaY;                                                                                       // 1669
                                                                                                                      // 1670
        var direction = directionStr(input.direction);                                                                // 1671
        if (direction) {                                                                                              // 1672
            this.manager.emit(this.options.event + direction, input);                                                 // 1673
        }                                                                                                             // 1674
                                                                                                                      // 1675
        this._super.emit.call(this, input);                                                                           // 1676
    }                                                                                                                 // 1677
});                                                                                                                   // 1678
                                                                                                                      // 1679
/**                                                                                                                   // 1680
 * Pinch                                                                                                              // 1681
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).               // 1682
 * @constructor                                                                                                       // 1683
 * @extends AttrRecognizer                                                                                            // 1684
 */                                                                                                                   // 1685
function PinchRecognizer() {                                                                                          // 1686
    AttrRecognizer.apply(this, arguments);                                                                            // 1687
}                                                                                                                     // 1688
                                                                                                                      // 1689
inherit(PinchRecognizer, AttrRecognizer, {                                                                            // 1690
    /**                                                                                                               // 1691
     * @namespace                                                                                                     // 1692
     * @memberof PinchRecognizer                                                                                      // 1693
     */                                                                                                               // 1694
    defaults: {                                                                                                       // 1695
        event: 'pinch',                                                                                               // 1696
        threshold: 0,                                                                                                 // 1697
        pointers: 2                                                                                                   // 1698
    },                                                                                                                // 1699
                                                                                                                      // 1700
    getTouchAction: function() {                                                                                      // 1701
        return [TOUCH_ACTION_NONE];                                                                                   // 1702
    },                                                                                                                // 1703
                                                                                                                      // 1704
    attrTest: function(input) {                                                                                       // 1705
        return this._super.attrTest.call(this, input) &&                                                              // 1706
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);                         // 1707
    },                                                                                                                // 1708
                                                                                                                      // 1709
    emit: function(input) {                                                                                           // 1710
        this._super.emit.call(this, input);                                                                           // 1711
        if (input.scale !== 1) {                                                                                      // 1712
            var inOut = input.scale < 1 ? 'in' : 'out';                                                               // 1713
            this.manager.emit(this.options.event + inOut, input);                                                     // 1714
        }                                                                                                             // 1715
    }                                                                                                                 // 1716
});                                                                                                                   // 1717
                                                                                                                      // 1718
/**                                                                                                                   // 1719
 * Press                                                                                                              // 1720
 * Recognized when the pointer is down for x ms without any movement.                                                 // 1721
 * @constructor                                                                                                       // 1722
 * @extends Recognizer                                                                                                // 1723
 */                                                                                                                   // 1724
function PressRecognizer() {                                                                                          // 1725
    Recognizer.apply(this, arguments);                                                                                // 1726
                                                                                                                      // 1727
    this._timer = null;                                                                                               // 1728
    this._input = null;                                                                                               // 1729
}                                                                                                                     // 1730
                                                                                                                      // 1731
inherit(PressRecognizer, Recognizer, {                                                                                // 1732
    /**                                                                                                               // 1733
     * @namespace                                                                                                     // 1734
     * @memberof PressRecognizer                                                                                      // 1735
     */                                                                                                               // 1736
    defaults: {                                                                                                       // 1737
        event: 'press',                                                                                               // 1738
        pointers: 1,                                                                                                  // 1739
        time: 500, // minimal time of the pointer to be pressed                                                       // 1740
        threshold: 5 // a minimal movement is ok, but keep it low                                                     // 1741
    },                                                                                                                // 1742
                                                                                                                      // 1743
    getTouchAction: function() {                                                                                      // 1744
        return [TOUCH_ACTION_AUTO];                                                                                   // 1745
    },                                                                                                                // 1746
                                                                                                                      // 1747
    process: function(input) {                                                                                        // 1748
        var options = this.options;                                                                                   // 1749
        var validPointers = input.pointers.length === options.pointers;                                               // 1750
        var validMovement = input.distance < options.threshold;                                                       // 1751
        var validTime = input.deltaTime > options.time;                                                               // 1752
                                                                                                                      // 1753
        this._input = input;                                                                                          // 1754
                                                                                                                      // 1755
        // we only allow little movement                                                                              // 1756
        // and we've reached an end event, so a tap is possible                                                       // 1757
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {       // 1758
            this.reset();                                                                                             // 1759
        } else if (input.eventType & INPUT_START) {                                                                   // 1760
            this.reset();                                                                                             // 1761
            this._timer = setTimeoutContext(function() {                                                              // 1762
                this.state = STATE_RECOGNIZED;                                                                        // 1763
                this.tryEmit();                                                                                       // 1764
            }, options.time, this);                                                                                   // 1765
        } else if (input.eventType & INPUT_END) {                                                                     // 1766
            return STATE_RECOGNIZED;                                                                                  // 1767
        }                                                                                                             // 1768
        return STATE_FAILED;                                                                                          // 1769
    },                                                                                                                // 1770
                                                                                                                      // 1771
    reset: function() {                                                                                               // 1772
        clearTimeout(this._timer);                                                                                    // 1773
    },                                                                                                                // 1774
                                                                                                                      // 1775
    emit: function(input) {                                                                                           // 1776
        if (this.state !== STATE_RECOGNIZED) {                                                                        // 1777
            return;                                                                                                   // 1778
        }                                                                                                             // 1779
                                                                                                                      // 1780
        if (input && (input.eventType & INPUT_END)) {                                                                 // 1781
            this.manager.emit(this.options.event + 'up', input);                                                      // 1782
        } else {                                                                                                      // 1783
            this._input.timeStamp = now();                                                                            // 1784
            this.manager.emit(this.options.event, this._input);                                                       // 1785
        }                                                                                                             // 1786
    }                                                                                                                 // 1787
});                                                                                                                   // 1788
                                                                                                                      // 1789
/**                                                                                                                   // 1790
 * Rotate                                                                                                             // 1791
 * Recognized when two or more pointer are moving in a circular motion.                                               // 1792
 * @constructor                                                                                                       // 1793
 * @extends AttrRecognizer                                                                                            // 1794
 */                                                                                                                   // 1795
function RotateRecognizer() {                                                                                         // 1796
    AttrRecognizer.apply(this, arguments);                                                                            // 1797
}                                                                                                                     // 1798
                                                                                                                      // 1799
inherit(RotateRecognizer, AttrRecognizer, {                                                                           // 1800
    /**                                                                                                               // 1801
     * @namespace                                                                                                     // 1802
     * @memberof RotateRecognizer                                                                                     // 1803
     */                                                                                                               // 1804
    defaults: {                                                                                                       // 1805
        event: 'rotate',                                                                                              // 1806
        threshold: 0,                                                                                                 // 1807
        pointers: 2                                                                                                   // 1808
    },                                                                                                                // 1809
                                                                                                                      // 1810
    getTouchAction: function() {                                                                                      // 1811
        return [TOUCH_ACTION_NONE];                                                                                   // 1812
    },                                                                                                                // 1813
                                                                                                                      // 1814
    attrTest: function(input) {                                                                                       // 1815
        return this._super.attrTest.call(this, input) &&                                                              // 1816
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);                          // 1817
    }                                                                                                                 // 1818
});                                                                                                                   // 1819
                                                                                                                      // 1820
/**                                                                                                                   // 1821
 * Swipe                                                                                                              // 1822
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.              // 1823
 * @constructor                                                                                                       // 1824
 * @extends AttrRecognizer                                                                                            // 1825
 */                                                                                                                   // 1826
function SwipeRecognizer() {                                                                                          // 1827
    AttrRecognizer.apply(this, arguments);                                                                            // 1828
}                                                                                                                     // 1829
                                                                                                                      // 1830
inherit(SwipeRecognizer, AttrRecognizer, {                                                                            // 1831
    /**                                                                                                               // 1832
     * @namespace                                                                                                     // 1833
     * @memberof SwipeRecognizer                                                                                      // 1834
     */                                                                                                               // 1835
    defaults: {                                                                                                       // 1836
        event: 'swipe',                                                                                               // 1837
        threshold: 10,                                                                                                // 1838
        velocity: 0.65,                                                                                               // 1839
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,                                                         // 1840
        pointers: 1                                                                                                   // 1841
    },                                                                                                                // 1842
                                                                                                                      // 1843
    getTouchAction: function() {                                                                                      // 1844
        return PanRecognizer.prototype.getTouchAction.call(this);                                                     // 1845
    },                                                                                                                // 1846
                                                                                                                      // 1847
    attrTest: function(input) {                                                                                       // 1848
        var direction = this.options.direction;                                                                       // 1849
        var velocity;                                                                                                 // 1850
                                                                                                                      // 1851
        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {                                                // 1852
            velocity = input.velocity;                                                                                // 1853
        } else if (direction & DIRECTION_HORIZONTAL) {                                                                // 1854
            velocity = input.velocityX;                                                                               // 1855
        } else if (direction & DIRECTION_VERTICAL) {                                                                  // 1856
            velocity = input.velocityY;                                                                               // 1857
        }                                                                                                             // 1858
                                                                                                                      // 1859
        return this._super.attrTest.call(this, input) &&                                                              // 1860
            direction & input.direction &&                                                                            // 1861
            input.distance > this.options.threshold &&                                                                // 1862
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;                                     // 1863
    },                                                                                                                // 1864
                                                                                                                      // 1865
    emit: function(input) {                                                                                           // 1866
        var direction = directionStr(input.direction);                                                                // 1867
        if (direction) {                                                                                              // 1868
            this.manager.emit(this.options.event + direction, input);                                                 // 1869
        }                                                                                                             // 1870
                                                                                                                      // 1871
        this.manager.emit(this.options.event, input);                                                                 // 1872
    }                                                                                                                 // 1873
});                                                                                                                   // 1874
                                                                                                                      // 1875
/**                                                                                                                   // 1876
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur         // 1877
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing       // 1878
 * a single tap.                                                                                                      // 1879
 *                                                                                                                    // 1880
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of                // 1881
 * multi-taps being recognized.                                                                                       // 1882
 * @constructor                                                                                                       // 1883
 * @extends Recognizer                                                                                                // 1884
 */                                                                                                                   // 1885
function TapRecognizer() {                                                                                            // 1886
    Recognizer.apply(this, arguments);                                                                                // 1887
                                                                                                                      // 1888
    // previous time and center,                                                                                      // 1889
    // used for tap counting                                                                                          // 1890
    this.pTime = false;                                                                                               // 1891
    this.pCenter = false;                                                                                             // 1892
                                                                                                                      // 1893
    this._timer = null;                                                                                               // 1894
    this._input = null;                                                                                               // 1895
    this.count = 0;                                                                                                   // 1896
}                                                                                                                     // 1897
                                                                                                                      // 1898
inherit(TapRecognizer, Recognizer, {                                                                                  // 1899
    /**                                                                                                               // 1900
     * @namespace                                                                                                     // 1901
     * @memberof PinchRecognizer                                                                                      // 1902
     */                                                                                                               // 1903
    defaults: {                                                                                                       // 1904
        event: 'tap',                                                                                                 // 1905
        pointers: 1,                                                                                                  // 1906
        taps: 1,                                                                                                      // 1907
        interval: 300, // max time between the multi-tap taps                                                         // 1908
        time: 250, // max time of the pointer to be down (like finger on the screen)                                  // 1909
        threshold: 2, // a minimal movement is ok, but keep it low                                                    // 1910
        posThreshold: 10 // a multi-tap can be a bit off the initial position                                         // 1911
    },                                                                                                                // 1912
                                                                                                                      // 1913
    getTouchAction: function() {                                                                                      // 1914
        return [TOUCH_ACTION_MANIPULATION];                                                                           // 1915
    },                                                                                                                // 1916
                                                                                                                      // 1917
    process: function(input) {                                                                                        // 1918
        var options = this.options;                                                                                   // 1919
                                                                                                                      // 1920
        var validPointers = input.pointers.length === options.pointers;                                               // 1921
        var validMovement = input.distance < options.threshold;                                                       // 1922
        var validTouchTime = input.deltaTime < options.time;                                                          // 1923
                                                                                                                      // 1924
        this.reset();                                                                                                 // 1925
                                                                                                                      // 1926
        if ((input.eventType & INPUT_START) && (this.count === 0)) {                                                  // 1927
            return this.failTimeout();                                                                                // 1928
        }                                                                                                             // 1929
                                                                                                                      // 1930
        // we only allow little movement                                                                              // 1931
        // and we've reached an end event, so a tap is possible                                                       // 1932
        if (validMovement && validTouchTime && validPointers) {                                                       // 1933
            if (input.eventType != INPUT_END) {                                                                       // 1934
                return this.failTimeout();                                                                            // 1935
            }                                                                                                         // 1936
                                                                                                                      // 1937
            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;                // 1938
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;      // 1939
                                                                                                                      // 1940
            this.pTime = input.timeStamp;                                                                             // 1941
            this.pCenter = input.center;                                                                              // 1942
                                                                                                                      // 1943
            if (!validMultiTap || !validInterval) {                                                                   // 1944
                this.count = 1;                                                                                       // 1945
            } else {                                                                                                  // 1946
                this.count += 1;                                                                                      // 1947
            }                                                                                                         // 1948
                                                                                                                      // 1949
            this._input = input;                                                                                      // 1950
                                                                                                                      // 1951
            // if tap count matches we have recognized it,                                                            // 1952
            // else it has began recognizing...                                                                       // 1953
            var tapCount = this.count % options.taps;                                                                 // 1954
            if (tapCount === 0) {                                                                                     // 1955
                // no failing requirements, immediately trigger the tap event                                         // 1956
                // or wait as long as the multitap interval to trigger                                                // 1957
                if (!this.hasRequireFailures()) {                                                                     // 1958
                    return STATE_RECOGNIZED;                                                                          // 1959
                } else {                                                                                              // 1960
                    this._timer = setTimeoutContext(function() {                                                      // 1961
                        this.state = STATE_RECOGNIZED;                                                                // 1962
                        this.tryEmit();                                                                               // 1963
                    }, options.interval, this);                                                                       // 1964
                    return STATE_BEGAN;                                                                               // 1965
                }                                                                                                     // 1966
            }                                                                                                         // 1967
        }                                                                                                             // 1968
        return STATE_FAILED;                                                                                          // 1969
    },                                                                                                                // 1970
                                                                                                                      // 1971
    failTimeout: function() {                                                                                         // 1972
        this._timer = setTimeoutContext(function() {                                                                  // 1973
            this.state = STATE_FAILED;                                                                                // 1974
        }, this.options.interval, this);                                                                              // 1975
        return STATE_FAILED;                                                                                          // 1976
    },                                                                                                                // 1977
                                                                                                                      // 1978
    reset: function() {                                                                                               // 1979
        clearTimeout(this._timer);                                                                                    // 1980
    },                                                                                                                // 1981
                                                                                                                      // 1982
    emit: function() {                                                                                                // 1983
        if (this.state == STATE_RECOGNIZED ) {                                                                        // 1984
            this._input.tapCount = this.count;                                                                        // 1985
            this.manager.emit(this.options.event, this._input);                                                       // 1986
        }                                                                                                             // 1987
    }                                                                                                                 // 1988
});                                                                                                                   // 1989
                                                                                                                      // 1990
/**                                                                                                                   // 1991
 * Simple way to create an manager with a default set of recognizers.                                                 // 1992
 * @param {HTMLElement} element                                                                                       // 1993
 * @param {Object} [options]                                                                                          // 1994
 * @constructor                                                                                                       // 1995
 */                                                                                                                   // 1996
function Hammer(element, options) {                                                                                   // 1997
    options = options || {};                                                                                          // 1998
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);                                   // 1999
    return new Manager(element, options);                                                                             // 2000
}                                                                                                                     // 2001
                                                                                                                      // 2002
/**                                                                                                                   // 2003
 * @const {string}                                                                                                    // 2004
 */                                                                                                                   // 2005
Hammer.VERSION = '2.0.4';                                                                                             // 2006
                                                                                                                      // 2007
/**                                                                                                                   // 2008
 * default settings                                                                                                   // 2009
 * @namespace                                                                                                         // 2010
 */                                                                                                                   // 2011
Hammer.defaults = {                                                                                                   // 2012
    /**                                                                                                               // 2013
     * set if DOM events are being triggered.                                                                         // 2014
     * But this is slower and unused by simple implementations, so disabled by default.                               // 2015
     * @type {Boolean}                                                                                                // 2016
     * @default false                                                                                                 // 2017
     */                                                                                                               // 2018
    domEvents: false,                                                                                                 // 2019
                                                                                                                      // 2020
    /**                                                                                                               // 2021
     * The value for the touchAction property/fallback.                                                               // 2022
     * When set to `compute` it will magically set the correct value based on the added recognizers.                  // 2023
     * @type {String}                                                                                                 // 2024
     * @default compute                                                                                               // 2025
     */                                                                                                               // 2026
    touchAction: TOUCH_ACTION_COMPUTE,                                                                                // 2027
                                                                                                                      // 2028
    /**                                                                                                               // 2029
     * @type {Boolean}                                                                                                // 2030
     * @default true                                                                                                  // 2031
     */                                                                                                               // 2032
    enable: true,                                                                                                     // 2033
                                                                                                                      // 2034
    /**                                                                                                               // 2035
     * EXPERIMENTAL FEATURE -- can be removed/changed                                                                 // 2036
     * Change the parent input target element.                                                                        // 2037
     * If Null, then it is being set the to main element.                                                             // 2038
     * @type {Null|EventTarget}                                                                                       // 2039
     * @default null                                                                                                  // 2040
     */                                                                                                               // 2041
    inputTarget: null,                                                                                                // 2042
                                                                                                                      // 2043
    /**                                                                                                               // 2044
     * force an input class                                                                                           // 2045
     * @type {Null|Function}                                                                                          // 2046
     * @default null                                                                                                  // 2047
     */                                                                                                               // 2048
    inputClass: null,                                                                                                 // 2049
                                                                                                                      // 2050
    /**                                                                                                               // 2051
     * Default recognizer setup when calling `Hammer()`                                                               // 2052
     * When creating a new Manager these will be skipped.                                                             // 2053
     * @type {Array}                                                                                                  // 2054
     */                                                                                                               // 2055
    preset: [                                                                                                         // 2056
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]                                      // 2057
        [RotateRecognizer, { enable: false }],                                                                        // 2058
        [PinchRecognizer, { enable: false }, ['rotate']],                                                             // 2059
        [SwipeRecognizer,{ direction: DIRECTION_HORIZONTAL }],                                                        // 2060
        [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']],                                              // 2061
        [TapRecognizer],                                                                                              // 2062
        [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']],                                                    // 2063
        [PressRecognizer]                                                                                             // 2064
    ],                                                                                                                // 2065
                                                                                                                      // 2066
    /**                                                                                                               // 2067
     * Some CSS properties can be used to improve the working of Hammer.                                              // 2068
     * Add them to this method and they will be set when creating a new Manager.                                      // 2069
     * @namespace                                                                                                     // 2070
     */                                                                                                               // 2071
    cssProps: {                                                                                                       // 2072
        /**                                                                                                           // 2073
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.                      // 2074
         * @type {String}                                                                                             // 2075
         * @default 'none'                                                                                            // 2076
         */                                                                                                           // 2077
        userSelect: 'none',                                                                                           // 2078
                                                                                                                      // 2079
        /**                                                                                                           // 2080
         * Disable the Windows Phone grippers when pressing an element.                                               // 2081
         * @type {String}                                                                                             // 2082
         * @default 'none'                                                                                            // 2083
         */                                                                                                           // 2084
        touchSelect: 'none',                                                                                          // 2085
                                                                                                                      // 2086
        /**                                                                                                           // 2087
         * Disables the default callout shown when you touch and hold a touch target.                                 // 2088
         * On iOS, when you touch and hold a touch target such as a link, Safari displays                             // 2089
         * a callout containing information about the link. This property allows you to disable that callout.         // 2090
         * @type {String}                                                                                             // 2091
         * @default 'none'                                                                                            // 2092
         */                                                                                                           // 2093
        touchCallout: 'none',                                                                                         // 2094
                                                                                                                      // 2095
        /**                                                                                                           // 2096
         * Specifies whether zooming is enabled. Used by IE10>                                                        // 2097
         * @type {String}                                                                                             // 2098
         * @default 'none'                                                                                            // 2099
         */                                                                                                           // 2100
        contentZooming: 'none',                                                                                       // 2101
                                                                                                                      // 2102
        /**                                                                                                           // 2103
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers. // 2104
         * @type {String}                                                                                             // 2105
         * @default 'none'                                                                                            // 2106
         */                                                                                                           // 2107
        userDrag: 'none',                                                                                             // 2108
                                                                                                                      // 2109
        /**                                                                                                           // 2110
         * Overrides the highlight color shown when the user taps a link or a JavaScript                              // 2111
         * clickable element in iOS. This property obeys the alpha value, if specified.                               // 2112
         * @type {String}                                                                                             // 2113
         * @default 'rgba(0,0,0,0)'                                                                                   // 2114
         */                                                                                                           // 2115
        tapHighlightColor: 'rgba(0,0,0,0)'                                                                            // 2116
    }                                                                                                                 // 2117
};                                                                                                                    // 2118
                                                                                                                      // 2119
var STOP = 1;                                                                                                         // 2120
var FORCED_STOP = 2;                                                                                                  // 2121
                                                                                                                      // 2122
/**                                                                                                                   // 2123
 * Manager                                                                                                            // 2124
 * @param {HTMLElement} element                                                                                       // 2125
 * @param {Object} [options]                                                                                          // 2126
 * @constructor                                                                                                       // 2127
 */                                                                                                                   // 2128
function Manager(element, options) {                                                                                  // 2129
    options = options || {};                                                                                          // 2130
                                                                                                                      // 2131
    this.options = merge(options, Hammer.defaults);                                                                   // 2132
    this.options.inputTarget = this.options.inputTarget || element;                                                   // 2133
                                                                                                                      // 2134
    this.handlers = {};                                                                                               // 2135
    this.session = {};                                                                                                // 2136
    this.recognizers = [];                                                                                            // 2137
                                                                                                                      // 2138
    this.element = element;                                                                                           // 2139
    this.input = createInputInstance(this);                                                                           // 2140
    this.touchAction = new TouchAction(this, this.options.touchAction);                                               // 2141
                                                                                                                      // 2142
    toggleCssProps(this, true);                                                                                       // 2143
                                                                                                                      // 2144
    each(options.recognizers, function(item) {                                                                        // 2145
        var recognizer = this.add(new (item[0])(item[1]));                                                            // 2146
        item[2] && recognizer.recognizeWith(item[2]);                                                                 // 2147
        item[3] && recognizer.requireFailure(item[3]);                                                                // 2148
    }, this);                                                                                                         // 2149
}                                                                                                                     // 2150
                                                                                                                      // 2151
Manager.prototype = {                                                                                                 // 2152
    /**                                                                                                               // 2153
     * set options                                                                                                    // 2154
     * @param {Object} options                                                                                        // 2155
     * @returns {Manager}                                                                                             // 2156
     */                                                                                                               // 2157
    set: function(options) {                                                                                          // 2158
        extend(this.options, options);                                                                                // 2159
                                                                                                                      // 2160
        // Options that need a little more setup                                                                      // 2161
        if (options.touchAction) {                                                                                    // 2162
            this.touchAction.update();                                                                                // 2163
        }                                                                                                             // 2164
        if (options.inputTarget) {                                                                                    // 2165
            // Clean up existing event listeners and reinitialize                                                     // 2166
            this.input.destroy();                                                                                     // 2167
            this.input.target = options.inputTarget;                                                                  // 2168
            this.input.init();                                                                                        // 2169
        }                                                                                                             // 2170
        return this;                                                                                                  // 2171
    },                                                                                                                // 2172
                                                                                                                      // 2173
    /**                                                                                                               // 2174
     * stop recognizing for this session.                                                                             // 2175
     * This session will be discarded, when a new [input]start event is fired.                                        // 2176
     * When forced, the recognizer cycle is stopped immediately.                                                      // 2177
     * @param {Boolean} [force]                                                                                       // 2178
     */                                                                                                               // 2179
    stop: function(force) {                                                                                           // 2180
        this.session.stopped = force ? FORCED_STOP : STOP;                                                            // 2181
    },                                                                                                                // 2182
                                                                                                                      // 2183
    /**                                                                                                               // 2184
     * run the recognizers!                                                                                           // 2185
     * called by the inputHandler function on every movement of the pointers (touches)                                // 2186
     * it walks through all the recognizers and tries to detect the gesture that is being made                        // 2187
     * @param {Object} inputData                                                                                      // 2188
     */                                                                                                               // 2189
    recognize: function(inputData) {                                                                                  // 2190
        var session = this.session;                                                                                   // 2191
        if (session.stopped) {                                                                                        // 2192
            return;                                                                                                   // 2193
        }                                                                                                             // 2194
                                                                                                                      // 2195
        // run the touch-action polyfill                                                                              // 2196
        this.touchAction.preventDefaults(inputData);                                                                  // 2197
                                                                                                                      // 2198
        var recognizer;                                                                                               // 2199
        var recognizers = this.recognizers;                                                                           // 2200
                                                                                                                      // 2201
        // this holds the recognizer that is being recognized.                                                        // 2202
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED                                  // 2203
        // if no recognizer is detecting a thing, it is set to `null`                                                 // 2204
        var curRecognizer = session.curRecognizer;                                                                    // 2205
                                                                                                                      // 2206
        // reset when the last recognizer is recognized                                                               // 2207
        // or when we're in a new session                                                                             // 2208
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {                            // 2209
            curRecognizer = session.curRecognizer = null;                                                             // 2210
        }                                                                                                             // 2211
                                                                                                                      // 2212
        var i = 0;                                                                                                    // 2213
        while (i < recognizers.length) {                                                                              // 2214
            recognizer = recognizers[i];                                                                              // 2215
                                                                                                                      // 2216
            // find out if we are allowed try to recognize the input for this one.                                    // 2217
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)                               // 2218
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one // 2219
            //      that is being recognized.                                                                         // 2220
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.    // 2221
            //      this can be setup with the `recognizeWith()` method on the recognizer.                            // 2222
            if (session.stopped !== FORCED_STOP && ( // 1                                                             // 2223
                    !curRecognizer || recognizer == curRecognizer || // 2                                             // 2224
                    recognizer.canRecognizeWith(curRecognizer))) { // 3                                               // 2225
                recognizer.recognize(inputData);                                                                      // 2226
            } else {                                                                                                  // 2227
                recognizer.reset();                                                                                   // 2228
            }                                                                                                         // 2229
                                                                                                                      // 2230
            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the  // 2231
            // current active recognizer. but only if we don't already have an active recognizer                      // 2232
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {                   // 2233
                curRecognizer = session.curRecognizer = recognizer;                                                   // 2234
            }                                                                                                         // 2235
            i++;                                                                                                      // 2236
        }                                                                                                             // 2237
    },                                                                                                                // 2238
                                                                                                                      // 2239
    /**                                                                                                               // 2240
     * get a recognizer by its event name.                                                                            // 2241
     * @param {Recognizer|String} recognizer                                                                          // 2242
     * @returns {Recognizer|Null}                                                                                     // 2243
     */                                                                                                               // 2244
    get: function(recognizer) {                                                                                       // 2245
        if (recognizer instanceof Recognizer) {                                                                       // 2246
            return recognizer;                                                                                        // 2247
        }                                                                                                             // 2248
                                                                                                                      // 2249
        var recognizers = this.recognizers;                                                                           // 2250
        for (var i = 0; i < recognizers.length; i++) {                                                                // 2251
            if (recognizers[i].options.event == recognizer) {                                                         // 2252
                return recognizers[i];                                                                                // 2253
            }                                                                                                         // 2254
        }                                                                                                             // 2255
        return null;                                                                                                  // 2256
    },                                                                                                                // 2257
                                                                                                                      // 2258
    /**                                                                                                               // 2259
     * add a recognizer to the manager                                                                                // 2260
     * existing recognizers with the same event name will be removed                                                  // 2261
     * @param {Recognizer} recognizer                                                                                 // 2262
     * @returns {Recognizer|Manager}                                                                                  // 2263
     */                                                                                                               // 2264
    add: function(recognizer) {                                                                                       // 2265
        if (invokeArrayArg(recognizer, 'add', this)) {                                                                // 2266
            return this;                                                                                              // 2267
        }                                                                                                             // 2268
                                                                                                                      // 2269
        // remove existing                                                                                            // 2270
        var existing = this.get(recognizer.options.event);                                                            // 2271
        if (existing) {                                                                                               // 2272
            this.remove(existing);                                                                                    // 2273
        }                                                                                                             // 2274
                                                                                                                      // 2275
        this.recognizers.push(recognizer);                                                                            // 2276
        recognizer.manager = this;                                                                                    // 2277
                                                                                                                      // 2278
        this.touchAction.update();                                                                                    // 2279
        return recognizer;                                                                                            // 2280
    },                                                                                                                // 2281
                                                                                                                      // 2282
    /**                                                                                                               // 2283
     * remove a recognizer by name or instance                                                                        // 2284
     * @param {Recognizer|String} recognizer                                                                          // 2285
     * @returns {Manager}                                                                                             // 2286
     */                                                                                                               // 2287
    remove: function(recognizer) {                                                                                    // 2288
        if (invokeArrayArg(recognizer, 'remove', this)) {                                                             // 2289
            return this;                                                                                              // 2290
        }                                                                                                             // 2291
                                                                                                                      // 2292
        var recognizers = this.recognizers;                                                                           // 2293
        recognizer = this.get(recognizer);                                                                            // 2294
        recognizers.splice(inArray(recognizers, recognizer), 1);                                                      // 2295
                                                                                                                      // 2296
        this.touchAction.update();                                                                                    // 2297
        return this;                                                                                                  // 2298
    },                                                                                                                // 2299
                                                                                                                      // 2300
    /**                                                                                                               // 2301
     * bind event                                                                                                     // 2302
     * @param {String} events                                                                                         // 2303
     * @param {Function} handler                                                                                      // 2304
     * @returns {EventEmitter} this                                                                                   // 2305
     */                                                                                                               // 2306
    on: function(events, handler) {                                                                                   // 2307
        var handlers = this.handlers;                                                                                 // 2308
        each(splitStr(events), function(event) {                                                                      // 2309
            handlers[event] = handlers[event] || [];                                                                  // 2310
            handlers[event].push(handler);                                                                            // 2311
        });                                                                                                           // 2312
        return this;                                                                                                  // 2313
    },                                                                                                                // 2314
                                                                                                                      // 2315
    /**                                                                                                               // 2316
     * unbind event, leave emit blank to remove all handlers                                                          // 2317
     * @param {String} events                                                                                         // 2318
     * @param {Function} [handler]                                                                                    // 2319
     * @returns {EventEmitter} this                                                                                   // 2320
     */                                                                                                               // 2321
    off: function(events, handler) {                                                                                  // 2322
        var handlers = this.handlers;                                                                                 // 2323
        each(splitStr(events), function(event) {                                                                      // 2324
            if (!handler) {                                                                                           // 2325
                delete handlers[event];                                                                               // 2326
            } else {                                                                                                  // 2327
                handlers[event].splice(inArray(handlers[event], handler), 1);                                         // 2328
            }                                                                                                         // 2329
        });                                                                                                           // 2330
        return this;                                                                                                  // 2331
    },                                                                                                                // 2332
                                                                                                                      // 2333
    /**                                                                                                               // 2334
     * emit event to the listeners                                                                                    // 2335
     * @param {String} event                                                                                          // 2336
     * @param {Object} data                                                                                           // 2337
     */                                                                                                               // 2338
    emit: function(event, data) {                                                                                     // 2339
        // we also want to trigger dom events                                                                         // 2340
        if (this.options.domEvents) {                                                                                 // 2341
            triggerDomEvent(event, data);                                                                             // 2342
        }                                                                                                             // 2343
                                                                                                                      // 2344
        // no handlers, so skip it all                                                                                // 2345
        var handlers = this.handlers[event] && this.handlers[event].slice();                                          // 2346
        if (!handlers || !handlers.length) {                                                                          // 2347
            return;                                                                                                   // 2348
        }                                                                                                             // 2349
                                                                                                                      // 2350
        data.type = event;                                                                                            // 2351
        data.preventDefault = function() {                                                                            // 2352
            data.srcEvent.preventDefault();                                                                           // 2353
        };                                                                                                            // 2354
                                                                                                                      // 2355
        var i = 0;                                                                                                    // 2356
        while (i < handlers.length) {                                                                                 // 2357
            handlers[i](data);                                                                                        // 2358
            i++;                                                                                                      // 2359
        }                                                                                                             // 2360
    },                                                                                                                // 2361
                                                                                                                      // 2362
    /**                                                                                                               // 2363
     * destroy the manager and unbinds all events                                                                     // 2364
     * it doesn't unbind dom events, that is the user own responsibility                                              // 2365
     */                                                                                                               // 2366
    destroy: function() {                                                                                             // 2367
        this.element && toggleCssProps(this, false);                                                                  // 2368
                                                                                                                      // 2369
        this.handlers = {};                                                                                           // 2370
        this.session = {};                                                                                            // 2371
        this.input.destroy();                                                                                         // 2372
        this.element = null;                                                                                          // 2373
    }                                                                                                                 // 2374
};                                                                                                                    // 2375
                                                                                                                      // 2376
/**                                                                                                                   // 2377
 * add/remove the css properties as defined in manager.options.cssProps                                               // 2378
 * @param {Manager} manager                                                                                           // 2379
 * @param {Boolean} add                                                                                               // 2380
 */                                                                                                                   // 2381
function toggleCssProps(manager, add) {                                                                               // 2382
    var element = manager.element;                                                                                    // 2383
    each(manager.options.cssProps, function(value, name) {                                                            // 2384
        element.style[prefixed(element.style, name)] = add ? value : '';                                              // 2385
    });                                                                                                               // 2386
}                                                                                                                     // 2387
                                                                                                                      // 2388
/**                                                                                                                   // 2389
 * trigger dom event                                                                                                  // 2390
 * @param {String} event                                                                                              // 2391
 * @param {Object} data                                                                                               // 2392
 */                                                                                                                   // 2393
function triggerDomEvent(event, data) {                                                                               // 2394
    var gestureEvent = document.createEvent('Event');                                                                 // 2395
    gestureEvent.initEvent(event, true, true);                                                                        // 2396
    gestureEvent.gesture = data;                                                                                      // 2397
    data.target.dispatchEvent(gestureEvent);                                                                          // 2398
}                                                                                                                     // 2399
                                                                                                                      // 2400
extend(Hammer, {                                                                                                      // 2401
    INPUT_START: INPUT_START,                                                                                         // 2402
    INPUT_MOVE: INPUT_MOVE,                                                                                           // 2403
    INPUT_END: INPUT_END,                                                                                             // 2404
    INPUT_CANCEL: INPUT_CANCEL,                                                                                       // 2405
                                                                                                                      // 2406
    STATE_POSSIBLE: STATE_POSSIBLE,                                                                                   // 2407
    STATE_BEGAN: STATE_BEGAN,                                                                                         // 2408
    STATE_CHANGED: STATE_CHANGED,                                                                                     // 2409
    STATE_ENDED: STATE_ENDED,                                                                                         // 2410
    STATE_RECOGNIZED: STATE_RECOGNIZED,                                                                               // 2411
    STATE_CANCELLED: STATE_CANCELLED,                                                                                 // 2412
    STATE_FAILED: STATE_FAILED,                                                                                       // 2413
                                                                                                                      // 2414
    DIRECTION_NONE: DIRECTION_NONE,                                                                                   // 2415
    DIRECTION_LEFT: DIRECTION_LEFT,                                                                                   // 2416
    DIRECTION_RIGHT: DIRECTION_RIGHT,                                                                                 // 2417
    DIRECTION_UP: DIRECTION_UP,                                                                                       // 2418
    DIRECTION_DOWN: DIRECTION_DOWN,                                                                                   // 2419
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,                                                                       // 2420
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,                                                                           // 2421
    DIRECTION_ALL: DIRECTION_ALL,                                                                                     // 2422
                                                                                                                      // 2423
    Manager: Manager,                                                                                                 // 2424
    Input: Input,                                                                                                     // 2425
    TouchAction: TouchAction,                                                                                         // 2426
                                                                                                                      // 2427
    TouchInput: TouchInput,                                                                                           // 2428
    MouseInput: MouseInput,                                                                                           // 2429
    PointerEventInput: PointerEventInput,                                                                             // 2430
    TouchMouseInput: TouchMouseInput,                                                                                 // 2431
    SingleTouchInput: SingleTouchInput,                                                                               // 2432
                                                                                                                      // 2433
    Recognizer: Recognizer,                                                                                           // 2434
    AttrRecognizer: AttrRecognizer,                                                                                   // 2435
    Tap: TapRecognizer,                                                                                               // 2436
    Pan: PanRecognizer,                                                                                               // 2437
    Swipe: SwipeRecognizer,                                                                                           // 2438
    Pinch: PinchRecognizer,                                                                                           // 2439
    Rotate: RotateRecognizer,                                                                                         // 2440
    Press: PressRecognizer,                                                                                           // 2441
                                                                                                                      // 2442
    on: addEventListeners,                                                                                            // 2443
    off: removeEventListeners,                                                                                        // 2444
    each: each,                                                                                                       // 2445
    merge: merge,                                                                                                     // 2446
    extend: extend,                                                                                                   // 2447
    inherit: inherit,                                                                                                 // 2448
    bindFn: bindFn,                                                                                                   // 2449
    prefixed: prefixed                                                                                                // 2450
});                                                                                                                   // 2451
                                                                                                                      // 2452
if (typeof define == TYPE_FUNCTION && define.amd) {                                                                   // 2453
    define(function() {                                                                                               // 2454
        return Hammer;                                                                                                // 2455
    });                                                                                                               // 2456
} else if (typeof module != 'undefined' && module.exports) {                                                          // 2457
    module.exports = Hammer;                                                                                          // 2458
} else {                                                                                                              // 2459
    window[exportName] = Hammer;                                                                                      // 2460
}                                                                                                                     // 2461
                                                                                                                      // 2462
})(window, document, 'Hammer');                                                                                       // 2463
                                                                                                                      // 2464
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/chriswessels:hammer/export.js                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/*global Hammer:true*/                                                                                                // 1
Hammer = window.Hammer;                                                                                               // 2
delete window.Hammer;                                                                                                 // 3
                                                                                                                      // 4
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/chriswessels:hammer/template.hammer_touch_area.js                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("HammerTouchArea");                                                                              // 2
Template["HammerTouchArea"] = new Template("Template.HammerTouchArea", (function() {                                  // 3
  var view = this;                                                                                                    // 4
  return [ Blaze.Unless(function() {                                                                                  // 5
    return Spacebars.call(view.templateContentBlock);                                                                 // 6
  }, function() {                                                                                                     // 7
    return [ "\n    ", HTML.Comment(" No content provided to HammerTouchArea. Use like this: {{#HammerTouchArea}} ... {{/HammerTouchArea}} "), "\n  " ];
  }), "\n  ", HTML.DIV({                                                                                              // 9
    "class": "hammer-touch-area",                                                                                     // 10
    id: function() {                                                                                                  // 11
      return Spacebars.mustache(view.lookup("touchAreaId"));                                                          // 12
    }                                                                                                                 // 13
  }, "\n    ", Blaze._InOuterTemplateScope(view, function() {                                                         // 14
    return Spacebars.include(function() {                                                                             // 15
      return Spacebars.call(view.templateContentBlock);                                                               // 16
    });                                                                                                               // 17
  }), "\n  ") ];                                                                                                      // 18
}));                                                                                                                  // 19
                                                                                                                      // 20
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/chriswessels:hammer/hammer_touch_area.js                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var defaultHammerInitOptions = {};                                                                                    // 1
                                                                                                                      // 2
// Ripped from https://github.com/aldeed/meteor-template-extension/blob/master/template-extension.js                  // 3
// Access parent template instance. "height" is the number of levels beyond the                                       // 4
// current template instance to look. By default block helper template instances                                      // 5
// are skipped, but if "includeBlockHelpers" is set to true, they are not.                                            // 6
// See https://github.com/meteor/meteor/issues/3071                                                                   // 7
function getParentTemplateInstance (currentInstance, height, includeBlockHelpers) {                                   // 8
  function parentView(view, includeBlockHelpers) {                                                                    // 9
    if (includeBlockHelpers) {                                                                                        // 10
      return view.originalParentView || view.parentView;                                                              // 11
    }                                                                                                                 // 12
    else {                                                                                                            // 13
      return view.parentView;                                                                                         // 14
    }                                                                                                                 // 15
  }                                                                                                                   // 16
                                                                                                                      // 17
  // If height is null or undefined, we default to 1, the first parent.                                               // 18
  if (!height) {                                                                                                      // 19
    height = 1;                                                                                                       // 20
  }                                                                                                                   // 21
                                                                                                                      // 22
  var i = 0;                                                                                                          // 23
  var template = currentInstance;                                                                                     // 24
  while (i < height && template) {                                                                                    // 25
    var view = parentView(template.view, includeBlockHelpers);                                                        // 26
    // We skip contentBlock views which are injected by Meteor when using                                             // 27
    // block helpers (in addition to block helper view). This matches more                                            // 28
    // the visual structure of templates and not the internal implementation.                                         // 29
    while (view && (!view.template || view.name === '(contentBlock)' || view.name === '(elseBlock)')) {               // 30
      view = parentView(view, includeBlockHelpers);                                                                   // 31
    }                                                                                                                 // 32
    if (!view) {                                                                                                      // 33
      return null;                                                                                                    // 34
    }                                                                                                                 // 35
    // Body view has template field, but not templateInstance,                                                        // 36
    // which more or less signals that we reached the top.                                                            // 37
    template = typeof view.templateInstance === 'function' ? view.templateInstance() : null;                          // 38
    i++;                                                                                                              // 39
  }                                                                                                                   // 40
  return template;                                                                                                    // 41
}                                                                                                                     // 42
                                                                                                                      // 43
// Return boolean as to whether the provided gesture map is valid or not                                              // 44
function checkGestureMap (gestureMap) {                                                                               // 45
  if (gestureMap && typeof gestureMap === 'object' && Object.keys(gestureMap).length > 0) {                           // 46
    return _.every(Object.keys(gestureMap), function (actionString) {                                                 // 47
      return !!extractActions(actionString) && typeof gestureMap[actionString] === 'function';                        // 48
    });                                                                                                               // 49
  } else {                                                                                                            // 50
    return false;                                                                                                     // 51
  }                                                                                                                   // 52
}                                                                                                                     // 53
// Extract an array of actions, where an action is defined as an object containing                                    // 54
// the gesture name and CSS-based element selector                                                                    // 55
function extractActions (actionString) {                                                                              // 56
  var output = [];                                                                                                    // 57
  function extractSubAction (subActionString) {                                                                       // 58
    var pieces = subActionString.split(' ');                                                                          // 59
    if (pieces.length > 1) {                                                                                          // 60
      output.push({                                                                                                   // 61
        gestureName: pieces[0],                                                                                       // 62
        elementSelector: pieces.slice(1, pieces.length).join(' ')                                                     // 63
      });                                                                                                             // 64
      return true;                                                                                                    // 65
    } else {                                                                                                          // 66
      return false;                                                                                                   // 67
    }                                                                                                                 // 68
  }                                                                                                                   // 69
  if (actionString.indexOf(',') !== -1) {                                                                             // 70
    var subActionStrings = actionString.split(',');                                                                   // 71
    _.each(subActionStrings, function (subActionString) {                                                             // 72
      extractSubAction(subActionString.trim());                                                                       // 73
    });                                                                                                               // 74
    if (output.length > 0) {                                                                                          // 75
      return output;                                                                                                  // 76
    } else {                                                                                                          // 77
      return false;                                                                                                   // 78
    }                                                                                                                 // 79
  } else if (extractSubAction(actionString)) {                                                                        // 80
    return output;                                                                                                    // 81
  } else {                                                                                                            // 82
    return false;                                                                                                     // 83
  }                                                                                                                   // 84
}                                                                                                                     // 85
                                                                                                                      // 86
// Fire the necessary user-defined callbacks when Hammer.js fires associated gesture events                           // 87
function handleGestureEvent (templateInstance, gestureName, event) {                                                  // 88
  _.each(Object.keys(templateInstance._hammer.gestureHandlers[gestureName]), function (selector, index) {             // 89
    var eventElem = event.target;                                                                                     // 90
    if ($(eventElem).is(selector)) {                                                                                  // 91
      templateInstance._hammer.gestureHandlers[gestureName][selector].call(Blaze.getData(eventElem), event);          // 92
    } else {                                                                                                          // 93
      var done = false;                                                                                               // 94
      _.each($(selector), function(selectorElem, index) {                                                             // 95
        if (!done && selectorElem && $.contains(selectorElem, eventElem)) {                                           // 96
          templateInstance._hammer.gestureHandlers[gestureName][selector].call(Blaze.getData(eventElem), event);      // 97
          done = true;                                                                                                // 98
        }                                                                                                             // 99
      });                                                                                                             // 100
    }                                                                                                                 // 101
  });                                                                                                                 // 102
  return true;                                                                                                        // 103
}                                                                                                                     // 104
                                                                                                                      // 105
// Basic setup on template creation                                                                                   // 106
// Add _hammer object to template instance, containing a unique selector ID,                                          // 107
// merged initialisation options (defaults + HammerTouchArea.initOptions),                                            // 108
// and an object of gesture handlers, grouped by gesture event (for handling by handleGestureEvent function)          // 109
Template.HammerTouchArea.onCreated(function () {                                                                      // 110
  var templateInstance = this,                                                                                        // 111
      tagOptions = templateInstance.data || {};                                                                       // 112
                                                                                                                      // 113
  templateInstance._hammer = {                                                                                        // 114
    instanceId: 'touch-' + Random.hexString(6),                                                                       // 115
    instance: null,                                                                                                   // 116
    gestureHandlers: {},                                                                                              // 117
    mergedInitOptions: _.extend({}, defaultHammerInitOptions, tagOptions.initOptions)                                 // 118
  };                                                                                                                  // 119
                                                                                                                      // 120
  if (tagOptions.gestureMap) {                                                                                        // 121
    if (checkGestureMap(tagOptions.gestureMap)) {                                                                     // 122
      _.each(tagOptions.gestureMap, function (handler, actionString) {                                                // 123
        var actions = extractActions(actionString);                                                                   // 124
        _.each(actions, function (action) {                                                                           // 125
          if (!templateInstance._hammer.gestureHandlers[action.gestureName]) {                                        // 126
            templateInstance._hammer.gestureHandlers[action.gestureName] = {};                                        // 127
          }                                                                                                           // 128
          templateInstance._hammer.gestureHandlers[action.gestureName][action.elementSelector] = function (event) {   // 129
            return handler.call(this, event, getParentTemplateInstance(templateInstance, 1, false));                  // 130
          };                                                                                                          // 131
        });                                                                                                           // 132
      });                                                                                                             // 133
    }                                                                                                                 // 134
  } else {                                                                                                            // 135
    console.warn('You haven\'t passed a gesture map into HammerTouchArea using gestureMap property.');                // 136
  }                                                                                                                   // 137
});                                                                                                                   // 138
                                                                                                                      // 139
// Initialise Hammer.js instance on template on render (and re-render)                                                // 140
// Attach event handlers to Hammer.js instance for registered gesture events                                          // 141
Template.HammerTouchArea.onRendered(function () {                                                                     // 142
  var templateInstance = this,                                                                                        // 143
      tagOptions = templateInstance.data || {};                                                                       // 144
                                                                                                                      // 145
  templateInstance._hammer.instance = new Hammer(this.$('#' + this._hammer.instanceId).get(0), this._hammer.mergedInitOptions);
  if (tagOptions.configureCallback) {                                                                                 // 147
    templateInstance._hammer.instance = tagOptions.configureCallback(templateInstance._hammer.instance, getParentTemplateInstance(templateInstance, 1, false));
    if (!templateInstance._hammer.instance) {                                                                         // 149
      console.warn('You forgot to return the Hammer.js instance in your configureCallback passed into HammerTouchArea.');
      return;                                                                                                         // 151
    }                                                                                                                 // 152
  }                                                                                                                   // 153
  _.each(Object.keys(templateInstance._hammer.gestureHandlers), function (gestureName, index) {                       // 154
    templateInstance._hammer.instance.on(gestureName, _.partial(handleGestureEvent, templateInstance, gestureName));  // 155
  });                                                                                                                 // 156
});                                                                                                                   // 157
                                                                                                                      // 158
// Destroy Hammer.js instance on template teardown                                                                    // 159
Template.HammerTouchArea.onDestroyed(function () {                                                                    // 160
  if (this._hammer.instance) {                                                                                        // 161
    this._hammer.instance.destroy();                                                                                  // 162
  }                                                                                                                   // 163
});                                                                                                                   // 164
                                                                                                                      // 165
Template.HammerTouchArea.helpers({                                                                                    // 166
  touchAreaId: function () {                                                                                          // 167
    var templateInstance = Template.instance();                                                                       // 168
    return templateInstance._hammer.instanceId;                                                                       // 169
  }                                                                                                                   // 170
});                                                                                                                   // 171
                                                                                                                      // 172
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("chriswessels:hammer", {
  Hammer: Hammer
});

})();
