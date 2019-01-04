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
var _ = Package.underscore._;
var check = Package.check.check;
var Match = Package.check.Match;
var Random = Package.random.Random;

/* Package-scope variables */
var MongoObject, Utility, S, SimpleSchema, doValidation1, doValidation2, SimpleSchemaValidationContext;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/aldeed_simple-schema/packages/aldeed_simple-schema.js    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:simple-schema/string.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
string.js - Copyright (C) 2012-2013, JP Richardson <jprichardson@gmail.com>                                            // 2
*/                                                                                                                     // 3
                                                                                                                       // 4
!(function() {                                                                                                         // 5
  "use strict";                                                                                                        // 6
                                                                                                                       // 7
  var VERSION = '1.5.0';                                                                                               // 8
                                                                                                                       // 9
  var ENTITIES = {};                                                                                                   // 10
                                                                                                                       // 11
  function S(s) {                                                                                                      // 12
    if (s !== null && s !== undefined) {                                                                               // 13
      if (typeof s === 'string')                                                                                       // 14
        this.s = s;                                                                                                    // 15
      else                                                                                                             // 16
        this.s = s.toString();                                                                                         // 17
    } else {                                                                                                           // 18
      this.s = s; //null or undefined                                                                                  // 19
    }                                                                                                                  // 20
                                                                                                                       // 21
    this.orig = s; //original object, currently only used by toCSV() and toBoolean()                                   // 22
                                                                                                                       // 23
    if (s !== null && s !== undefined) {                                                                               // 24
      if (this.__defineGetter__) {                                                                                     // 25
        this.__defineGetter__('length', function() {                                                                   // 26
          return this.s.length;                                                                                        // 27
        })                                                                                                             // 28
      } else {                                                                                                         // 29
        this.length = s.length;                                                                                        // 30
      }                                                                                                                // 31
    } else {                                                                                                           // 32
      this.length = -1;                                                                                                // 33
    }                                                                                                                  // 34
  }                                                                                                                    // 35
                                                                                                                       // 36
  var __nsp = String.prototype;                                                                                        // 37
  var __sp = S.prototype = {                                                                                           // 38
                                                                                                                       // 39
    between: function(left, right) {                                                                                   // 40
      var s = this.s;                                                                                                  // 41
      var startPos = s.indexOf(left);                                                                                  // 42
      var endPos = s.indexOf(right);                                                                                   // 43
      var start = startPos + left.length;                                                                              // 44
      return new S(endPos > startPos ?  s.slice(start, endPos) : "");                                                  // 45
    },                                                                                                                 // 46
                                                                                                                       // 47
    //# modified slightly from https://github.com/epeli/underscore.string                                              // 48
    camelize: function() {                                                                                             // 49
      var s = this.trim().s.replace(/(\-|_|\s)+(.)?/g, function(mathc, sep, c) {                                       // 50
        return (c ? c.toUpperCase() : '');                                                                             // 51
      });                                                                                                              // 52
      return new S(s);                                                                                                 // 53
    },                                                                                                                 // 54
                                                                                                                       // 55
    capitalize: function() {                                                                                           // 56
      return new S(this.s.substr(0, 1).toUpperCase() + this.s.substring(1).toLowerCase());                             // 57
    },                                                                                                                 // 58
                                                                                                                       // 59
    charAt: function(index) {                                                                                          // 60
      return this.s.charAt(index);                                                                                     // 61
    },                                                                                                                 // 62
                                                                                                                       // 63
    chompLeft: function(prefix) {                                                                                      // 64
      var s = this.s;                                                                                                  // 65
      if (s.indexOf(prefix) === 0) {                                                                                   // 66
         s = s.slice(prefix.length);                                                                                   // 67
         return new S(s);                                                                                              // 68
      } else {                                                                                                         // 69
        return this;                                                                                                   // 70
      }                                                                                                                // 71
    },                                                                                                                 // 72
                                                                                                                       // 73
    chompRight: function(suffix) {                                                                                     // 74
      if (this.endsWith(suffix)) {                                                                                     // 75
        var s = this.s;                                                                                                // 76
        s = s.slice(0, s.length - suffix.length);                                                                      // 77
        return new S(s);                                                                                               // 78
      } else {                                                                                                         // 79
        return this;                                                                                                   // 80
      }                                                                                                                // 81
    },                                                                                                                 // 82
                                                                                                                       // 83
    //#thanks Google                                                                                                   // 84
    collapseWhitespace: function() {                                                                                   // 85
      var s = this.s.replace(/[\s\xa0]+/g, ' ').replace(/^\s+|\s+$/g, '');                                             // 86
      return new S(s);                                                                                                 // 87
    },                                                                                                                 // 88
                                                                                                                       // 89
    contains: function(ss) {                                                                                           // 90
      return this.s.indexOf(ss) >= 0;                                                                                  // 91
    },                                                                                                                 // 92
                                                                                                                       // 93
    count: function(ss) {                                                                                              // 94
      var count = 0                                                                                                    // 95
        , pos = this.s.indexOf(ss)                                                                                     // 96
                                                                                                                       // 97
      while (pos >= 0) {                                                                                               // 98
        count += 1                                                                                                     // 99
        pos = this.s.indexOf(ss, pos + 1)                                                                              // 100
      }                                                                                                                // 101
                                                                                                                       // 102
      return count                                                                                                     // 103
    },                                                                                                                 // 104
                                                                                                                       // 105
    //#modified from https://github.com/epeli/underscore.string                                                        // 106
    dasherize: function() {                                                                                            // 107
      var s = this.trim().s.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase();      // 108
      return new S(s);                                                                                                 // 109
    },                                                                                                                 // 110
                                                                                                                       // 111
    decodeHtmlEntities: function() { //https://github.com/substack/node-ent/blob/master/index.js                       // 112
      var s = this.s;                                                                                                  // 113
      s = s.replace(/&#(\d+);?/g, function (_, code) {                                                                 // 114
        return String.fromCharCode(code);                                                                              // 115
      })                                                                                                               // 116
      .replace(/&#[xX]([A-Fa-f0-9]+);?/g, function (_, hex) {                                                          // 117
        return String.fromCharCode(parseInt(hex, 16));                                                                 // 118
      })                                                                                                               // 119
      .replace(/&([^;\W]+;?)/g, function (m, e) {                                                                      // 120
        var ee = e.replace(/;$/, '');                                                                                  // 121
        var target = ENTITIES[e] || (e.match(/;$/) && ENTITIES[ee]);                                                   // 122
                                                                                                                       // 123
        if (typeof target === 'number') {                                                                              // 124
          return String.fromCharCode(target);                                                                          // 125
        }                                                                                                              // 126
        else if (typeof target === 'string') {                                                                         // 127
          return target;                                                                                               // 128
        }                                                                                                              // 129
        else {                                                                                                         // 130
          return m;                                                                                                    // 131
        }                                                                                                              // 132
      })                                                                                                               // 133
                                                                                                                       // 134
      return new S(s);                                                                                                 // 135
    },                                                                                                                 // 136
                                                                                                                       // 137
    endsWith: function(suffix) {                                                                                       // 138
      var l  = this.s.length - suffix.length;                                                                          // 139
      return l >= 0 && this.s.indexOf(suffix, l) === l;                                                                // 140
    },                                                                                                                 // 141
                                                                                                                       // 142
    escapeHTML: function() { //from underscore.string                                                                  // 143
      return new S(this.s.replace(/[&<>"']/g, function(m){ return '&' + reversedEscapeChars[m] + ';'; }));             // 144
    },                                                                                                                 // 145
                                                                                                                       // 146
    ensureLeft: function(prefix) {                                                                                     // 147
      var s = this.s;                                                                                                  // 148
      if (s.indexOf(prefix) === 0) {                                                                                   // 149
        return this;                                                                                                   // 150
      } else {                                                                                                         // 151
        return new S(prefix + s);                                                                                      // 152
      }                                                                                                                // 153
    },                                                                                                                 // 154
                                                                                                                       // 155
    ensureRight: function(suffix) {                                                                                    // 156
      var s = this.s;                                                                                                  // 157
      if (this.endsWith(suffix))  {                                                                                    // 158
        return this;                                                                                                   // 159
      } else {                                                                                                         // 160
        return new S(s + suffix);                                                                                      // 161
      }                                                                                                                // 162
    },                                                                                                                 // 163
                                                                                                                       // 164
    humanize: function() { //modified from underscore.string                                                           // 165
      if (this.s === null || this.s === undefined)                                                                     // 166
        return new S('')                                                                                               // 167
      var s = this.underscore().replace(/_id$/,'').replace(/_/g, ' ').trim().capitalize()                              // 168
      return new S(s)                                                                                                  // 169
    },                                                                                                                 // 170
                                                                                                                       // 171
    isAlpha: function() {                                                                                              // 172
      return !/[^a-z\xC0-\xFF]/.test(this.s.toLowerCase());                                                            // 173
    },                                                                                                                 // 174
                                                                                                                       // 175
    isAlphaNumeric: function() {                                                                                       // 176
      return !/[^0-9a-z\xC0-\xFF]/.test(this.s.toLowerCase());                                                         // 177
    },                                                                                                                 // 178
                                                                                                                       // 179
    isEmpty: function() {                                                                                              // 180
      return this.s === null || this.s === undefined ? true : /^[\s\xa0]*$/.test(this.s);                              // 181
    },                                                                                                                 // 182
                                                                                                                       // 183
    isLower: function() {                                                                                              // 184
      return this.isAlpha() && this.s.toLowerCase() === this.s;                                                        // 185
    },                                                                                                                 // 186
                                                                                                                       // 187
    isNumeric: function() {                                                                                            // 188
      return !/[^0-9]/.test(this.s);                                                                                   // 189
    },                                                                                                                 // 190
                                                                                                                       // 191
    isUpper: function() {                                                                                              // 192
      return this.isAlpha() && this.s.toUpperCase() === this.s;                                                        // 193
    },                                                                                                                 // 194
                                                                                                                       // 195
    left: function(N) {                                                                                                // 196
      if (N >= 0) {                                                                                                    // 197
        var s = this.s.substr(0, N);                                                                                   // 198
        return new S(s);                                                                                               // 199
      } else {                                                                                                         // 200
        return this.right(-N);                                                                                         // 201
      }                                                                                                                // 202
    },                                                                                                                 // 203
                                                                                                                       // 204
    lines: function() { //convert windows newlines to unix newlines then convert to an Array of lines                  // 205
      return this.replaceAll('\r\n', '\n').s.split('\n');                                                              // 206
    },                                                                                                                 // 207
                                                                                                                       // 208
    pad: function(len, ch) { //https://github.com/component/pad                                                        // 209
      ch = ch || ' ';                                                                                                  // 210
      if (this.s.length >= len) return new S(this.s);                                                                  // 211
      len = len - this.s.length;                                                                                       // 212
      var left = Array(Math.ceil(len / 2) + 1).join(ch);                                                               // 213
      var right = Array(Math.floor(len / 2) + 1).join(ch);                                                             // 214
      return new S(left + this.s + right);                                                                             // 215
    },                                                                                                                 // 216
                                                                                                                       // 217
    padLeft: function(len, ch) { //https://github.com/component/pad                                                    // 218
      ch = ch || ' ';                                                                                                  // 219
      if (this.s.length >= len) return new S(this.s);                                                                  // 220
      return new S(Array(len - this.s.length + 1).join(ch) + this.s);                                                  // 221
    },                                                                                                                 // 222
                                                                                                                       // 223
    padRight: function(len, ch) { //https://github.com/component/pad                                                   // 224
      ch = ch || ' ';                                                                                                  // 225
      if (this.s.length >= len) return new S(this.s);                                                                  // 226
      return new S(this.s + Array(len - this.s.length + 1).join(ch));                                                  // 227
    },                                                                                                                 // 228
                                                                                                                       // 229
    parseCSV: function(delimiter, qualifier, escape, lineDelimiter) { //try to parse no matter what                    // 230
      delimiter = delimiter || ',';                                                                                    // 231
      escape = escape || '\\'                                                                                          // 232
      if (typeof qualifier == 'undefined')                                                                             // 233
        qualifier = '"';                                                                                               // 234
                                                                                                                       // 235
      var i = 0, fieldBuffer = [], fields = [], len = this.s.length, inField = false, self = this;                     // 236
      var ca = function(i){return self.s.charAt(i)};                                                                   // 237
      if (typeof lineDelimiter !== 'undefined') var rows = [];                                                         // 238
                                                                                                                       // 239
      if (!qualifier)                                                                                                  // 240
        inField = true;                                                                                                // 241
                                                                                                                       // 242
      while (i < len) {                                                                                                // 243
        var current = ca(i);                                                                                           // 244
        switch (current) {                                                                                             // 245
          case escape:                                                                                                 // 246
          //fix for issues #32 and #35                                                                                 // 247
          if (inField && ((escape !== qualifier) || ca(i+1) === qualifier)) {                                          // 248
              i += 1;                                                                                                  // 249
              fieldBuffer.push(ca(i));                                                                                 // 250
              break;                                                                                                   // 251
          }                                                                                                            // 252
          if (escape !== qualifier) break;                                                                             // 253
          case qualifier:                                                                                              // 254
            inField = !inField;                                                                                        // 255
            break;                                                                                                     // 256
          case delimiter:                                                                                              // 257
            if (inField && qualifier)                                                                                  // 258
              fieldBuffer.push(current);                                                                               // 259
            else {                                                                                                     // 260
              fields.push(fieldBuffer.join(''))                                                                        // 261
              fieldBuffer.length = 0;                                                                                  // 262
            }                                                                                                          // 263
            break;                                                                                                     // 264
          case lineDelimiter:                                                                                          // 265
            if (inField) {                                                                                             // 266
                fieldBuffer.push(current);                                                                             // 267
            } else {                                                                                                   // 268
                if (rows) {                                                                                            // 269
                    fields.push(fieldBuffer.join(''))                                                                  // 270
                    rows.push(fields);                                                                                 // 271
                    fields = [];                                                                                       // 272
                    fieldBuffer.length = 0;                                                                            // 273
                }                                                                                                      // 274
            }                                                                                                          // 275
            break;                                                                                                     // 276
          default:                                                                                                     // 277
            if (inField)                                                                                               // 278
              fieldBuffer.push(current);                                                                               // 279
            break;                                                                                                     // 280
        }                                                                                                              // 281
        i += 1;                                                                                                        // 282
      }                                                                                                                // 283
                                                                                                                       // 284
      fields.push(fieldBuffer.join(''));                                                                               // 285
      if (rows) {                                                                                                      // 286
        rows.push(fields);                                                                                             // 287
        return rows;                                                                                                   // 288
      }                                                                                                                // 289
      return fields;                                                                                                   // 290
    },                                                                                                                 // 291
                                                                                                                       // 292
    replaceAll: function(ss, r) {                                                                                      // 293
      //var s = this.s.replace(new RegExp(ss, 'g'), r);                                                                // 294
      var s = this.s.split(ss).join(r)                                                                                 // 295
      return new S(s);                                                                                                 // 296
    },                                                                                                                 // 297
                                                                                                                       // 298
    right: function(N) {                                                                                               // 299
      if (N >= 0) {                                                                                                    // 300
        var s = this.s.substr(this.s.length - N, N);                                                                   // 301
        return new S(s);                                                                                               // 302
      } else {                                                                                                         // 303
        return this.left(-N);                                                                                          // 304
      }                                                                                                                // 305
    },                                                                                                                 // 306
                                                                                                                       // 307
    slugify: function() {                                                                                              // 308
      var sl = (new S(this.s.replace(/[^\w\s-]/g, '').toLowerCase())).dasherize().s;                                   // 309
      if (sl.charAt(0) === '-')                                                                                        // 310
        sl = sl.substr(1);                                                                                             // 311
      return new S(sl);                                                                                                // 312
    },                                                                                                                 // 313
                                                                                                                       // 314
    startsWith: function(prefix) {                                                                                     // 315
      return this.s.lastIndexOf(prefix, 0) === 0;                                                                      // 316
    },                                                                                                                 // 317
                                                                                                                       // 318
    stripPunctuation: function() {                                                                                     // 319
      //return new S(this.s.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""));                                             // 320
      return new S(this.s.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "));                                             // 321
    },                                                                                                                 // 322
                                                                                                                       // 323
    stripTags: function() { //from sugar.js                                                                            // 324
      var s = this.s, args = arguments.length > 0 ? arguments : [''];                                                  // 325
      multiArgs(args, function(tag) {                                                                                  // 326
        s = s.replace(RegExp('<\/?' + tag + '[^<>]*>', 'gi'), '');                                                     // 327
      });                                                                                                              // 328
      return new S(s);                                                                                                 // 329
    },                                                                                                                 // 330
                                                                                                                       // 331
    template: function(values, opening, closing) {                                                                     // 332
      var s = this.s                                                                                                   // 333
      var opening = opening || Export.TMPL_OPEN                                                                        // 334
      var closing = closing || Export.TMPL_CLOSE                                                                       // 335
      var r = new RegExp(opening + '(.+?)' + closing, 'g')                                                             // 336
        //, r = /\{\{(.+?)\}\}/g                                                                                       // 337
      var matches = s.match(r) || [];                                                                                  // 338
                                                                                                                       // 339
      matches.forEach(function(match) {                                                                                // 340
        var key = match.substring(opening.length, match.length - closing.length);//chop {{ and }}                      // 341
        if (values[key])                                                                                               // 342
          s = s.replace(match, values[key]);                                                                           // 343
      });                                                                                                              // 344
      return new S(s);                                                                                                 // 345
    },                                                                                                                 // 346
                                                                                                                       // 347
    times: function(n) {                                                                                               // 348
      return new S(new Array(n + 1).join(this.s));                                                                     // 349
    },                                                                                                                 // 350
                                                                                                                       // 351
    toBoolean: function() {                                                                                            // 352
      if (typeof this.orig === 'string') {                                                                             // 353
        var s = this.s.toLowerCase();                                                                                  // 354
        return s === 'true' || s === 'yes' || s === 'on';                                                              // 355
      } else                                                                                                           // 356
        return this.orig === true || this.orig === 1;                                                                  // 357
    },                                                                                                                 // 358
                                                                                                                       // 359
    toFloat: function(precision) {                                                                                     // 360
      var num = parseFloat(this.s)                                                                                     // 361
      if (precision)                                                                                                   // 362
        return parseFloat(num.toFixed(precision))                                                                      // 363
      else                                                                                                             // 364
        return num                                                                                                     // 365
    },                                                                                                                 // 366
                                                                                                                       // 367
    toInt: function() { //thanks Google                                                                                // 368
      // If the string starts with '0x' or '-0x', parse as hex.                                                        // 369
      return /^\s*-?0x/i.test(this.s) ? parseInt(this.s, 16) : parseInt(this.s, 10)                                    // 370
    },                                                                                                                 // 371
                                                                                                                       // 372
    trim: function() {                                                                                                 // 373
      var s;                                                                                                           // 374
      if (typeof __nsp.trim === 'undefined')                                                                           // 375
        s = this.s.replace(/(^\s*|\s*$)/g, '')                                                                         // 376
      else                                                                                                             // 377
        s = this.s.trim()                                                                                              // 378
      return new S(s);                                                                                                 // 379
    },                                                                                                                 // 380
                                                                                                                       // 381
    trimLeft: function() {                                                                                             // 382
      var s;                                                                                                           // 383
      if (__nsp.trimLeft)                                                                                              // 384
        s = this.s.trimLeft();                                                                                         // 385
      else                                                                                                             // 386
        s = this.s.replace(/(^\s*)/g, '');                                                                             // 387
      return new S(s);                                                                                                 // 388
    },                                                                                                                 // 389
                                                                                                                       // 390
    trimRight: function() {                                                                                            // 391
      var s;                                                                                                           // 392
      if (__nsp.trimRight)                                                                                             // 393
        s = this.s.trimRight();                                                                                        // 394
      else                                                                                                             // 395
        s = this.s.replace(/\s+$/, '');                                                                                // 396
      return new S(s);                                                                                                 // 397
    },                                                                                                                 // 398
                                                                                                                       // 399
    truncate: function(length, pruneStr) { //from underscore.string, author: github.com/rwz                            // 400
      var str = this.s;                                                                                                // 401
                                                                                                                       // 402
      length = ~~length;                                                                                               // 403
      pruneStr = pruneStr || '...';                                                                                    // 404
                                                                                                                       // 405
      if (str.length <= length) return new S(str);                                                                     // 406
                                                                                                                       // 407
      var tmpl = function(c){ return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' '; },                               // 408
        template = str.slice(0, length+1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'          // 409
                                                                                                                       // 410
      if (template.slice(template.length-2).match(/\w\w/))                                                             // 411
        template = template.replace(/\s*\S+$/, '');                                                                    // 412
      else                                                                                                             // 413
        template = new S(template.slice(0, template.length-1)).trimRight().s;                                          // 414
                                                                                                                       // 415
      return (template+pruneStr).length > str.length ? new S(str) : new S(str.slice(0, template.length)+pruneStr);     // 416
    },                                                                                                                 // 417
                                                                                                                       // 418
    toCSV: function() {                                                                                                // 419
      var delim = ',', qualifier = '"', escape = '\\', encloseNumbers = true, keys = false;                            // 420
      var dataArray = [];                                                                                              // 421
                                                                                                                       // 422
      function hasVal(it) {                                                                                            // 423
        return it !== null && it !== '';                                                                               // 424
      }                                                                                                                // 425
                                                                                                                       // 426
      if (typeof arguments[0] === 'object') {                                                                          // 427
        delim = arguments[0].delimiter || delim;                                                                       // 428
        delim = arguments[0].separator || delim;                                                                       // 429
        qualifier = arguments[0].qualifier || qualifier;                                                               // 430
        encloseNumbers = !!arguments[0].encloseNumbers;                                                                // 431
        escape = arguments[0].escape || escape;                                                                        // 432
        keys = !!arguments[0].keys;                                                                                    // 433
      } else if (typeof arguments[0] === 'string') {                                                                   // 434
        delim = arguments[0];                                                                                          // 435
      }                                                                                                                // 436
                                                                                                                       // 437
      if (typeof arguments[1] === 'string')                                                                            // 438
        qualifier = arguments[1];                                                                                      // 439
                                                                                                                       // 440
      if (arguments[1] === null)                                                                                       // 441
        qualifier = null;                                                                                              // 442
                                                                                                                       // 443
       if (this.orig instanceof Array)                                                                                 // 444
        dataArray  = this.orig;                                                                                        // 445
      else { //object                                                                                                  // 446
        for (var key in this.orig)                                                                                     // 447
          if (this.orig.hasOwnProperty(key))                                                                           // 448
            if (keys)                                                                                                  // 449
              dataArray.push(key);                                                                                     // 450
            else                                                                                                       // 451
              dataArray.push(this.orig[key]);                                                                          // 452
      }                                                                                                                // 453
                                                                                                                       // 454
      var rep = escape + qualifier;                                                                                    // 455
      var buildString = [];                                                                                            // 456
      for (var i = 0; i < dataArray.length; ++i) {                                                                     // 457
        var shouldQualify = hasVal(qualifier)                                                                          // 458
        if (typeof dataArray[i] == 'number')                                                                           // 459
          shouldQualify &= encloseNumbers;                                                                             // 460
                                                                                                                       // 461
        if (shouldQualify)                                                                                             // 462
          buildString.push(qualifier);                                                                                 // 463
                                                                                                                       // 464
        if (dataArray[i] !== null && dataArray[i] !== undefined) {                                                     // 465
          var d = new S(dataArray[i]).replaceAll(qualifier, rep).s;                                                    // 466
          buildString.push(d);                                                                                         // 467
        } else                                                                                                         // 468
          buildString.push('')                                                                                         // 469
                                                                                                                       // 470
        if (shouldQualify)                                                                                             // 471
          buildString.push(qualifier);                                                                                 // 472
                                                                                                                       // 473
        if (delim)                                                                                                     // 474
          buildString.push(delim);                                                                                     // 475
      }                                                                                                                // 476
                                                                                                                       // 477
      //chop last delim                                                                                                // 478
      //console.log(buildString.length)                                                                                // 479
      buildString.length = buildString.length - 1;                                                                     // 480
      return new S(buildString.join(''));                                                                              // 481
    },                                                                                                                 // 482
                                                                                                                       // 483
    toString: function() {                                                                                             // 484
      return this.s;                                                                                                   // 485
    },                                                                                                                 // 486
                                                                                                                       // 487
    //#modified from https://github.com/epeli/underscore.string                                                        // 488
    underscore: function() {                                                                                           // 489
      var s = this.trim().s.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();              // 490
      if ((new S(this.s.charAt(0))).isUpper()) {                                                                       // 491
        s = '_' + s;                                                                                                   // 492
      }                                                                                                                // 493
      return new S(s);                                                                                                 // 494
    },                                                                                                                 // 495
                                                                                                                       // 496
    unescapeHTML: function() { //from underscore.string                                                                // 497
      return new S(this.s.replace(/\&([^;]+);/g, function(entity, entityCode){                                         // 498
        var match;                                                                                                     // 499
                                                                                                                       // 500
        if (entityCode in escapeChars) {                                                                               // 501
          return escapeChars[entityCode];                                                                              // 502
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {                                                    // 503
          return String.fromCharCode(parseInt(match[1], 16));                                                          // 504
        } else if (match = entityCode.match(/^#(\d+)$/)) {                                                             // 505
          return String.fromCharCode(~~match[1]);                                                                      // 506
        } else {                                                                                                       // 507
          return entity;                                                                                               // 508
        }                                                                                                              // 509
      }));                                                                                                             // 510
    },                                                                                                                 // 511
                                                                                                                       // 512
    valueOf: function() {                                                                                              // 513
      return this.s.valueOf();                                                                                         // 514
    }                                                                                                                  // 515
                                                                                                                       // 516
  }                                                                                                                    // 517
                                                                                                                       // 518
  var methodsAdded = [];                                                                                               // 519
  function extendPrototype() {                                                                                         // 520
    for (var name in __sp) {                                                                                           // 521
      (function(name){                                                                                                 // 522
        var func = __sp[name];                                                                                         // 523
        if (!__nsp.hasOwnProperty(name)) {                                                                             // 524
          methodsAdded.push(name);                                                                                     // 525
          __nsp[name] = function() {                                                                                   // 526
            String.prototype.s = this;                                                                                 // 527
            return func.apply(this, arguments);                                                                        // 528
          }                                                                                                            // 529
        }                                                                                                              // 530
      })(name);                                                                                                        // 531
    }                                                                                                                  // 532
  }                                                                                                                    // 533
                                                                                                                       // 534
  function restorePrototype() {                                                                                        // 535
    for (var i = 0; i < methodsAdded.length; ++i)                                                                      // 536
      delete String.prototype[methodsAdded[i]];                                                                        // 537
    methodsAdded.length = 0;                                                                                           // 538
  }                                                                                                                    // 539
                                                                                                                       // 540
                                                                                                                       // 541
/*************************************                                                                                 // 542
/* Attach Native JavaScript String Properties                                                                          // 543
/*************************************/                                                                                // 544
                                                                                                                       // 545
  var nativeProperties = getNativeStringProperties();                                                                  // 546
  for (var name in nativeProperties) {                                                                                 // 547
    (function(name) {                                                                                                  // 548
      var stringProp = __nsp[name];                                                                                    // 549
      if (typeof stringProp == 'function') {                                                                           // 550
        //console.log(stringProp)                                                                                      // 551
        if (!__sp[name]) {                                                                                             // 552
          if (nativeProperties[name] === 'string') {                                                                   // 553
            __sp[name] = function() {                                                                                  // 554
              //console.log(name)                                                                                      // 555
              return new S(stringProp.apply(this, arguments));                                                         // 556
            }                                                                                                          // 557
          } else {                                                                                                     // 558
            __sp[name] = stringProp;                                                                                   // 559
          }                                                                                                            // 560
        }                                                                                                              // 561
      }                                                                                                                // 562
    })(name);                                                                                                          // 563
  }                                                                                                                    // 564
                                                                                                                       // 565
                                                                                                                       // 566
/*************************************                                                                                 // 567
/* Function Aliases                                                                                                    // 568
/*************************************/                                                                                // 569
                                                                                                                       // 570
  __sp.repeat = __sp.times;                                                                                            // 571
  __sp.include = __sp.contains;                                                                                        // 572
  __sp.toInteger = __sp.toInt;                                                                                         // 573
  __sp.toBool = __sp.toBoolean;                                                                                        // 574
  __sp.decodeHTMLEntities = __sp.decodeHtmlEntities //ensure consistent casing scheme of 'HTML'                        // 575
                                                                                                                       // 576
                                                                                                                       // 577
/*************************************                                                                                 // 578
/* Private Functions                                                                                                   // 579
/*************************************/                                                                                // 580
                                                                                                                       // 581
  function getNativeStringProperties() {                                                                               // 582
    var names = getNativeStringPropertyNames();                                                                        // 583
    var retObj = {};                                                                                                   // 584
                                                                                                                       // 585
    for (var i = 0; i < names.length; ++i) {                                                                           // 586
      var name = names[i];                                                                                             // 587
      var func = __nsp[name];                                                                                          // 588
      try {                                                                                                            // 589
        var type = typeof func.apply('teststring', []);                                                                // 590
        retObj[name] = type;                                                                                           // 591
      } catch (e) {}                                                                                                   // 592
    }                                                                                                                  // 593
    return retObj;                                                                                                     // 594
  }                                                                                                                    // 595
                                                                                                                       // 596
  function getNativeStringPropertyNames() {                                                                            // 597
    var results = [];                                                                                                  // 598
    if (Object.getOwnPropertyNames) {                                                                                  // 599
      results = Object.getOwnPropertyNames(__nsp);                                                                     // 600
      results.splice(results.indexOf('valueOf'), 1);                                                                   // 601
      results.splice(results.indexOf('toString'), 1);                                                                  // 602
      return results;                                                                                                  // 603
    } else { //meant for legacy cruft, this could probably be made more efficient                                      // 604
      var stringNames = {};                                                                                            // 605
      var objectNames = [];                                                                                            // 606
      for (var name in String.prototype)                                                                               // 607
        stringNames[name] = name;                                                                                      // 608
                                                                                                                       // 609
      for (var name in Object.prototype)                                                                               // 610
        delete stringNames[name];                                                                                      // 611
                                                                                                                       // 612
      //stringNames['toString'] = 'toString'; //this was deleted with the rest of the object names                     // 613
      for (var name in stringNames) {                                                                                  // 614
        results.push(name);                                                                                            // 615
      }                                                                                                                // 616
      return results;                                                                                                  // 617
    }                                                                                                                  // 618
  }                                                                                                                    // 619
                                                                                                                       // 620
  function Export(str) {                                                                                               // 621
    return new S(str);                                                                                                 // 622
  };                                                                                                                   // 623
                                                                                                                       // 624
  //attach exports to StringJSWrapper                                                                                  // 625
  Export.extendPrototype = extendPrototype;                                                                            // 626
  Export.restorePrototype = restorePrototype;                                                                          // 627
  Export.VERSION = VERSION;                                                                                            // 628
  Export.TMPL_OPEN = '{{';                                                                                             // 629
  Export.TMPL_CLOSE = '}}';                                                                                            // 630
  Export.ENTITIES = ENTITIES;                                                                                          // 631
                                                                                                                       // 632
                                                                                                                       // 633
                                                                                                                       // 634
/*************************************                                                                                 // 635
/* Exports                                                                                                             // 636
/*************************************/                                                                                // 637
                                                                                                                       // 638
  if (typeof module !== 'undefined'  && typeof module.exports !== 'undefined') {                                       // 639
    module.exports = Export;                                                                                           // 640
                                                                                                                       // 641
  } else {                                                                                                             // 642
                                                                                                                       // 643
    if(typeof define === "function" && define.amd) {                                                                   // 644
      define([], function() {                                                                                          // 645
        return Export;                                                                                                 // 646
      });                                                                                                              // 647
    } else {                                                                                                           // 648
      window.S = Export;                                                                                               // 649
    }                                                                                                                  // 650
  }                                                                                                                    // 651
                                                                                                                       // 652
                                                                                                                       // 653
/*************************************                                                                                 // 654
/* 3rd Party Private Functions                                                                                         // 655
/*************************************/                                                                                // 656
                                                                                                                       // 657
  //from sugar.js                                                                                                      // 658
  function multiArgs(args, fn) {                                                                                       // 659
    var result = [], i;                                                                                                // 660
    for(i = 0; i < args.length; i++) {                                                                                 // 661
      result.push(args[i]);                                                                                            // 662
      if(fn) fn.call(args, args[i], i);                                                                                // 663
    }                                                                                                                  // 664
    return result;                                                                                                     // 665
  }                                                                                                                    // 666
                                                                                                                       // 667
  //from underscore.string                                                                                             // 668
  var escapeChars = {                                                                                                  // 669
    lt: '<',                                                                                                           // 670
    gt: '>',                                                                                                           // 671
    quot: '"',                                                                                                         // 672
    apos: "'",                                                                                                         // 673
    amp: '&'                                                                                                           // 674
  };                                                                                                                   // 675
                                                                                                                       // 676
  //from underscore.string                                                                                             // 677
  var reversedEscapeChars = {};                                                                                        // 678
  for(var key in escapeChars){ reversedEscapeChars[escapeChars[key]] = key; }                                          // 679
                                                                                                                       // 680
  ENTITIES = {                                                                                                         // 681
    "amp" : "&",                                                                                                       // 682
    "gt" : ">",                                                                                                        // 683
    "lt" : "<",                                                                                                        // 684
    "quot" : "\"",                                                                                                     // 685
    "apos" : "'",                                                                                                      // 686
    "AElig" : 198,                                                                                                     // 687
    "Aacute" : 193,                                                                                                    // 688
    "Acirc" : 194,                                                                                                     // 689
    "Agrave" : 192,                                                                                                    // 690
    "Aring" : 197,                                                                                                     // 691
    "Atilde" : 195,                                                                                                    // 692
    "Auml" : 196,                                                                                                      // 693
    "Ccedil" : 199,                                                                                                    // 694
    "ETH" : 208,                                                                                                       // 695
    "Eacute" : 201,                                                                                                    // 696
    "Ecirc" : 202,                                                                                                     // 697
    "Egrave" : 200,                                                                                                    // 698
    "Euml" : 203,                                                                                                      // 699
    "Iacute" : 205,                                                                                                    // 700
    "Icirc" : 206,                                                                                                     // 701
    "Igrave" : 204,                                                                                                    // 702
    "Iuml" : 207,                                                                                                      // 703
    "Ntilde" : 209,                                                                                                    // 704
    "Oacute" : 211,                                                                                                    // 705
    "Ocirc" : 212,                                                                                                     // 706
    "Ograve" : 210,                                                                                                    // 707
    "Oslash" : 216,                                                                                                    // 708
    "Otilde" : 213,                                                                                                    // 709
    "Ouml" : 214,                                                                                                      // 710
    "THORN" : 222,                                                                                                     // 711
    "Uacute" : 218,                                                                                                    // 712
    "Ucirc" : 219,                                                                                                     // 713
    "Ugrave" : 217,                                                                                                    // 714
    "Uuml" : 220,                                                                                                      // 715
    "Yacute" : 221,                                                                                                    // 716
    "aacute" : 225,                                                                                                    // 717
    "acirc" : 226,                                                                                                     // 718
    "aelig" : 230,                                                                                                     // 719
    "agrave" : 224,                                                                                                    // 720
    "aring" : 229,                                                                                                     // 721
    "atilde" : 227,                                                                                                    // 722
    "auml" : 228,                                                                                                      // 723
    "ccedil" : 231,                                                                                                    // 724
    "eacute" : 233,                                                                                                    // 725
    "ecirc" : 234,                                                                                                     // 726
    "egrave" : 232,                                                                                                    // 727
    "eth" : 240,                                                                                                       // 728
    "euml" : 235,                                                                                                      // 729
    "iacute" : 237,                                                                                                    // 730
    "icirc" : 238,                                                                                                     // 731
    "igrave" : 236,                                                                                                    // 732
    "iuml" : 239,                                                                                                      // 733
    "ntilde" : 241,                                                                                                    // 734
    "oacute" : 243,                                                                                                    // 735
    "ocirc" : 244,                                                                                                     // 736
    "ograve" : 242,                                                                                                    // 737
    "oslash" : 248,                                                                                                    // 738
    "otilde" : 245,                                                                                                    // 739
    "ouml" : 246,                                                                                                      // 740
    "szlig" : 223,                                                                                                     // 741
    "thorn" : 254,                                                                                                     // 742
    "uacute" : 250,                                                                                                    // 743
    "ucirc" : 251,                                                                                                     // 744
    "ugrave" : 249,                                                                                                    // 745
    "uuml" : 252,                                                                                                      // 746
    "yacute" : 253,                                                                                                    // 747
    "yuml" : 255,                                                                                                      // 748
    "copy" : 169,                                                                                                      // 749
    "reg" : 174,                                                                                                       // 750
    "nbsp" : 160,                                                                                                      // 751
    "iexcl" : 161,                                                                                                     // 752
    "cent" : 162,                                                                                                      // 753
    "pound" : 163,                                                                                                     // 754
    "curren" : 164,                                                                                                    // 755
    "yen" : 165,                                                                                                       // 756
    "brvbar" : 166,                                                                                                    // 757
    "sect" : 167,                                                                                                      // 758
    "uml" : 168,                                                                                                       // 759
    "ordf" : 170,                                                                                                      // 760
    "laquo" : 171,                                                                                                     // 761
    "not" : 172,                                                                                                       // 762
    "shy" : 173,                                                                                                       // 763
    "macr" : 175,                                                                                                      // 764
    "deg" : 176,                                                                                                       // 765
    "plusmn" : 177,                                                                                                    // 766
    "sup1" : 185,                                                                                                      // 767
    "sup2" : 178,                                                                                                      // 768
    "sup3" : 179,                                                                                                      // 769
    "acute" : 180,                                                                                                     // 770
    "micro" : 181,                                                                                                     // 771
    "para" : 182,                                                                                                      // 772
    "middot" : 183,                                                                                                    // 773
    "cedil" : 184,                                                                                                     // 774
    "ordm" : 186,                                                                                                      // 775
    "raquo" : 187,                                                                                                     // 776
    "frac14" : 188,                                                                                                    // 777
    "frac12" : 189,                                                                                                    // 778
    "frac34" : 190,                                                                                                    // 779
    "iquest" : 191,                                                                                                    // 780
    "times" : 215,                                                                                                     // 781
    "divide" : 247,                                                                                                    // 782
    "OElig;" : 338,                                                                                                    // 783
    "oelig;" : 339,                                                                                                    // 784
    "Scaron;" : 352,                                                                                                   // 785
    "scaron;" : 353,                                                                                                   // 786
    "Yuml;" : 376,                                                                                                     // 787
    "fnof;" : 402,                                                                                                     // 788
    "circ;" : 710,                                                                                                     // 789
    "tilde;" : 732,                                                                                                    // 790
    "Alpha;" : 913,                                                                                                    // 791
    "Beta;" : 914,                                                                                                     // 792
    "Gamma;" : 915,                                                                                                    // 793
    "Delta;" : 916,                                                                                                    // 794
    "Epsilon;" : 917,                                                                                                  // 795
    "Zeta;" : 918,                                                                                                     // 796
    "Eta;" : 919,                                                                                                      // 797
    "Theta;" : 920,                                                                                                    // 798
    "Iota;" : 921,                                                                                                     // 799
    "Kappa;" : 922,                                                                                                    // 800
    "Lambda;" : 923,                                                                                                   // 801
    "Mu;" : 924,                                                                                                       // 802
    "Nu;" : 925,                                                                                                       // 803
    "Xi;" : 926,                                                                                                       // 804
    "Omicron;" : 927,                                                                                                  // 805
    "Pi;" : 928,                                                                                                       // 806
    "Rho;" : 929,                                                                                                      // 807
    "Sigma;" : 931,                                                                                                    // 808
    "Tau;" : 932,                                                                                                      // 809
    "Upsilon;" : 933,                                                                                                  // 810
    "Phi;" : 934,                                                                                                      // 811
    "Chi;" : 935,                                                                                                      // 812
    "Psi;" : 936,                                                                                                      // 813
    "Omega;" : 937,                                                                                                    // 814
    "alpha;" : 945,                                                                                                    // 815
    "beta;" : 946,                                                                                                     // 816
    "gamma;" : 947,                                                                                                    // 817
    "delta;" : 948,                                                                                                    // 818
    "epsilon;" : 949,                                                                                                  // 819
    "zeta;" : 950,                                                                                                     // 820
    "eta;" : 951,                                                                                                      // 821
    "theta;" : 952,                                                                                                    // 822
    "iota;" : 953,                                                                                                     // 823
    "kappa;" : 954,                                                                                                    // 824
    "lambda;" : 955,                                                                                                   // 825
    "mu;" : 956,                                                                                                       // 826
    "nu;" : 957,                                                                                                       // 827
    "xi;" : 958,                                                                                                       // 828
    "omicron;" : 959,                                                                                                  // 829
    "pi;" : 960,                                                                                                       // 830
    "rho;" : 961,                                                                                                      // 831
    "sigmaf;" : 962,                                                                                                   // 832
    "sigma;" : 963,                                                                                                    // 833
    "tau;" : 964,                                                                                                      // 834
    "upsilon;" : 965,                                                                                                  // 835
    "phi;" : 966,                                                                                                      // 836
    "chi;" : 967,                                                                                                      // 837
    "psi;" : 968,                                                                                                      // 838
    "omega;" : 969,                                                                                                    // 839
    "thetasym;" : 977,                                                                                                 // 840
    "upsih;" : 978,                                                                                                    // 841
    "piv;" : 982,                                                                                                      // 842
    "ensp;" : 8194,                                                                                                    // 843
    "emsp;" : 8195,                                                                                                    // 844
    "thinsp;" : 8201,                                                                                                  // 845
    "zwnj;" : 8204,                                                                                                    // 846
    "zwj;" : 8205,                                                                                                     // 847
    "lrm;" : 8206,                                                                                                     // 848
    "rlm;" : 8207,                                                                                                     // 849
    "ndash;" : 8211,                                                                                                   // 850
    "mdash;" : 8212,                                                                                                   // 851
    "lsquo;" : 8216,                                                                                                   // 852
    "rsquo;" : 8217,                                                                                                   // 853
    "sbquo;" : 8218,                                                                                                   // 854
    "ldquo;" : 8220,                                                                                                   // 855
    "rdquo;" : 8221,                                                                                                   // 856
    "bdquo;" : 8222,                                                                                                   // 857
    "dagger;" : 8224,                                                                                                  // 858
    "Dagger;" : 8225,                                                                                                  // 859
    "bull;" : 8226,                                                                                                    // 860
    "hellip;" : 8230,                                                                                                  // 861
    "permil;" : 8240,                                                                                                  // 862
    "prime;" : 8242,                                                                                                   // 863
    "Prime;" : 8243,                                                                                                   // 864
    "lsaquo;" : 8249,                                                                                                  // 865
    "rsaquo;" : 8250,                                                                                                  // 866
    "oline;" : 8254,                                                                                                   // 867
    "frasl;" : 8260,                                                                                                   // 868
    "euro;" : 8364,                                                                                                    // 869
    "image;" : 8465,                                                                                                   // 870
    "weierp;" : 8472,                                                                                                  // 871
    "real;" : 8476,                                                                                                    // 872
    "trade;" : 8482,                                                                                                   // 873
    "alefsym;" : 8501,                                                                                                 // 874
    "larr;" : 8592,                                                                                                    // 875
    "uarr;" : 8593,                                                                                                    // 876
    "rarr;" : 8594,                                                                                                    // 877
    "darr;" : 8595,                                                                                                    // 878
    "harr;" : 8596,                                                                                                    // 879
    "crarr;" : 8629,                                                                                                   // 880
    "lArr;" : 8656,                                                                                                    // 881
    "uArr;" : 8657,                                                                                                    // 882
    "rArr;" : 8658,                                                                                                    // 883
    "dArr;" : 8659,                                                                                                    // 884
    "hArr;" : 8660,                                                                                                    // 885
    "forall;" : 8704,                                                                                                  // 886
    "part;" : 8706,                                                                                                    // 887
    "exist;" : 8707,                                                                                                   // 888
    "empty;" : 8709,                                                                                                   // 889
    "nabla;" : 8711,                                                                                                   // 890
    "isin;" : 8712,                                                                                                    // 891
    "notin;" : 8713,                                                                                                   // 892
    "ni;" : 8715,                                                                                                      // 893
    "prod;" : 8719,                                                                                                    // 894
    "sum;" : 8721,                                                                                                     // 895
    "minus;" : 8722,                                                                                                   // 896
    "lowast;" : 8727,                                                                                                  // 897
    "radic;" : 8730,                                                                                                   // 898
    "prop;" : 8733,                                                                                                    // 899
    "infin;" : 8734,                                                                                                   // 900
    "ang;" : 8736,                                                                                                     // 901
    "and;" : 8743,                                                                                                     // 902
    "or;" : 8744,                                                                                                      // 903
    "cap;" : 8745,                                                                                                     // 904
    "cup;" : 8746,                                                                                                     // 905
    "int;" : 8747,                                                                                                     // 906
    "there4;" : 8756,                                                                                                  // 907
    "sim;" : 8764,                                                                                                     // 908
    "cong;" : 8773,                                                                                                    // 909
    "asymp;" : 8776,                                                                                                   // 910
    "ne;" : 8800,                                                                                                      // 911
    "equiv;" : 8801,                                                                                                   // 912
    "le;" : 8804,                                                                                                      // 913
    "ge;" : 8805,                                                                                                      // 914
    "sub;" : 8834,                                                                                                     // 915
    "sup;" : 8835,                                                                                                     // 916
    "nsub;" : 8836,                                                                                                    // 917
    "sube;" : 8838,                                                                                                    // 918
    "supe;" : 8839,                                                                                                    // 919
    "oplus;" : 8853,                                                                                                   // 920
    "otimes;" : 8855,                                                                                                  // 921
    "perp;" : 8869,                                                                                                    // 922
    "sdot;" : 8901,                                                                                                    // 923
    "lceil;" : 8968,                                                                                                   // 924
    "rceil;" : 8969,                                                                                                   // 925
    "lfloor;" : 8970,                                                                                                  // 926
    "rfloor;" : 8971,                                                                                                  // 927
    "lang;" : 9001,                                                                                                    // 928
    "rang;" : 9002,                                                                                                    // 929
    "loz;" : 9674,                                                                                                     // 930
    "spades;" : 9824,                                                                                                  // 931
    "clubs;" : 9827,                                                                                                   // 932
    "hearts;" : 9829,                                                                                                  // 933
    "diams;" : 9830                                                                                                    // 934
  }                                                                                                                    // 935
                                                                                                                       // 936
                                                                                                                       // 937
}).call(this);                                                                                                         // 938
                                                                                                                       // 939
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:simple-schema/mongo-object.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* global MongoObject:true */                                                                                          // 1
                                                                                                                       // 2
                                                                                                                       // 3
var isObject = function(obj) {                                                                                         // 4
  return obj === Object(obj);                                                                                          // 5
};                                                                                                                     // 6
                                                                                                                       // 7
// getPrototypeOf polyfill                                                                                             // 8
if (typeof Object.getPrototypeOf !== "function") {                                                                     // 9
  if (typeof "".__proto__ === "object") {                                                                              // 10
    Object.getPrototypeOf = function(object) {                                                                         // 11
      return object.__proto__;                                                                                         // 12
    };                                                                                                                 // 13
  } else {                                                                                                             // 14
    Object.getPrototypeOf = function(object) {                                                                         // 15
      // May break if the constructor has been tampered with                                                           // 16
      return object.constructor.prototype;                                                                             // 17
    };                                                                                                                 // 18
  }                                                                                                                    // 19
}                                                                                                                      // 20
                                                                                                                       // 21
/* Tests whether "obj" is an Object as opposed to                                                                      // 22
 * something that inherits from Object                                                                                 // 23
 *                                                                                                                     // 24
 * @param {any} obj                                                                                                    // 25
 * @returns {Boolean}                                                                                                  // 26
 */                                                                                                                    // 27
var isBasicObject = function(obj) {                                                                                    // 28
  return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;                                             // 29
};                                                                                                                     // 30
                                                                                                                       // 31
/* Takes a specific string that uses mongo-style dot notation                                                          // 32
 * and returns a generic string equivalent. Replaces all numeric                                                       // 33
 * "pieces" with a dollar sign ($).                                                                                    // 34
 *                                                                                                                     // 35
 * @param {type} name                                                                                                  // 36
 * @returns {unresolved}                                                                                               // 37
 */                                                                                                                    // 38
var makeGeneric = function makeGeneric(name) {                                                                         // 39
  if (typeof name !== "string") {                                                                                      // 40
    return null;                                                                                                       // 41
  }                                                                                                                    // 42
  return name.replace(/\.[0-9]+\./g, '.$.').replace(/\.[0-9]+$/g, '.$');                                               // 43
};                                                                                                                     // 44
                                                                                                                       // 45
var appendAffectedKey = function appendAffectedKey(affectedKey, key) {                                                 // 46
  if (key === "$each") {                                                                                               // 47
    return affectedKey;                                                                                                // 48
  } else {                                                                                                             // 49
    return (affectedKey ? affectedKey + "." + key : key);                                                              // 50
  }                                                                                                                    // 51
};                                                                                                                     // 52
                                                                                                                       // 53
// Extracts operator piece, if present, from position string                                                           // 54
var extractOp = function extractOp(position) {                                                                         // 55
  var firstPositionPiece = position.slice(0, position.indexOf("["));                                                   // 56
  return (firstPositionPiece.substring(0, 1) === "$") ? firstPositionPiece : null;                                     // 57
};                                                                                                                     // 58
                                                                                                                       // 59
/*                                                                                                                     // 60
 * @constructor                                                                                                        // 61
 * @param {Object} objOrModifier                                                                                       // 62
 * @param {string[]} blackBoxKeys - A list of the names of keys that shouldn't be traversed                            // 63
 * @returns {undefined}                                                                                                // 64
 *                                                                                                                     // 65
 * Creates a new MongoObject instance. The object passed as the first argument                                         // 66
 * will be modified in place by calls to instance methods. Also, immediately                                           // 67
 * upon creation of the instance, the object will have any `undefined` keys                                            // 68
 * removed recursively.                                                                                                // 69
 */                                                                                                                    // 70
MongoObject = function(objOrModifier, blackBoxKeys) {                                                                  // 71
  var self = this;                                                                                                     // 72
  self._obj = objOrModifier;                                                                                           // 73
  self._affectedKeys = {};                                                                                             // 74
  self._genericAffectedKeys = {};                                                                                      // 75
  self._parentPositions = [];                                                                                          // 76
  self._positionsInsideArrays = [];                                                                                    // 77
  self._objectPositions = [];                                                                                          // 78
                                                                                                                       // 79
  function parseObj(val, currentPosition, affectedKey, operator, adjusted, isWithinArray) {                            // 80
                                                                                                                       // 81
    // Adjust for first-level modifier operators                                                                       // 82
    if (!operator && affectedKey && affectedKey.substring(0, 1) === "$") {                                             // 83
      operator = affectedKey;                                                                                          // 84
      affectedKey = null;                                                                                              // 85
    }                                                                                                                  // 86
                                                                                                                       // 87
    var affectedKeyIsBlackBox = false;                                                                                 // 88
    var affectedKeyGeneric;                                                                                            // 89
    var stop = false;                                                                                                  // 90
    if (affectedKey) {                                                                                                 // 91
                                                                                                                       // 92
      // Adjust for $push and $addToSet and $pull and $pop                                                             // 93
      if (!adjusted) {                                                                                                 // 94
        if (operator === "$push" || operator === "$addToSet" || operator === "$pop") {                                 // 95
          // Adjust for $each                                                                                          // 96
          // We can simply jump forward and pretend like the $each array                                               // 97
          // is the array for the field. This has the added benefit of                                                 // 98
          // skipping past any $slice, which we also don't care about.                                                 // 99
          if (isBasicObject(val) && "$each" in val) {                                                                  // 100
            val = val.$each;                                                                                           // 101
            currentPosition = currentPosition + "[$each]";                                                             // 102
          } else {                                                                                                     // 103
            affectedKey = affectedKey + ".0";                                                                          // 104
          }                                                                                                            // 105
          adjusted = true;                                                                                             // 106
        } else if (operator === "$pull") {                                                                             // 107
          affectedKey = affectedKey + ".0";                                                                            // 108
          if (isBasicObject(val)) {                                                                                    // 109
            stop = true;                                                                                               // 110
          }                                                                                                            // 111
          adjusted = true;                                                                                             // 112
        }                                                                                                              // 113
      }                                                                                                                // 114
                                                                                                                       // 115
      // Make generic key                                                                                              // 116
      affectedKeyGeneric = makeGeneric(affectedKey);                                                                   // 117
                                                                                                                       // 118
      // Determine whether affected key should be treated as a black box                                               // 119
      affectedKeyIsBlackBox = _.contains(blackBoxKeys, affectedKeyGeneric);                                            // 120
                                                                                                                       // 121
      // Mark that this position affects this generic and non-generic key                                              // 122
      if (currentPosition) {                                                                                           // 123
        self._affectedKeys[currentPosition] = affectedKey;                                                             // 124
        self._genericAffectedKeys[currentPosition] = affectedKeyGeneric;                                               // 125
                                                                                                                       // 126
        // If we're within an array, mark this position so we can omit it from flat docs                               // 127
        isWithinArray && self._positionsInsideArrays.push(currentPosition);                                            // 128
      }                                                                                                                // 129
    }                                                                                                                  // 130
                                                                                                                       // 131
    if (stop) {                                                                                                        // 132
      return;                                                                                                          // 133
    }                                                                                                                  // 134
                                                                                                                       // 135
    // Loop through arrays                                                                                             // 136
    if (_.isArray(val) && !_.isEmpty(val)) {                                                                           // 137
      if (currentPosition) {                                                                                           // 138
        // Mark positions with arrays that should be ignored when we want endpoints only                               // 139
        self._parentPositions.push(currentPosition);                                                                   // 140
      }                                                                                                                // 141
                                                                                                                       // 142
      // Loop                                                                                                          // 143
      _.each(val, function(v, i) {                                                                                     // 144
        parseObj(v, (currentPosition ? currentPosition + "[" + i + "]" : i), affectedKey + '.' + i, operator, adjusted, true);
      });                                                                                                              // 146
    }                                                                                                                  // 147
                                                                                                                       // 148
    // Loop through object keys, only for basic objects,                                                               // 149
    // but always for the passed-in object, even if it                                                                 // 150
    // is a custom object.                                                                                             // 151
    else if ((isBasicObject(val) && !affectedKeyIsBlackBox) || !currentPosition) {                                     // 152
      if (currentPosition && !_.isEmpty(val)) {                                                                        // 153
        // Mark positions with objects that should be ignored when we want endpoints only                              // 154
        self._parentPositions.push(currentPosition);                                                                   // 155
        // Mark positions with objects that should be left out of flat docs.                                           // 156
        self._objectPositions.push(currentPosition);                                                                   // 157
      }                                                                                                                // 158
      // Loop                                                                                                          // 159
      _.each(val, function(v, k) {                                                                                     // 160
        if (v === void 0) {                                                                                            // 161
          delete val[k];                                                                                               // 162
        } else if (k !== "$slice") {                                                                                   // 163
          parseObj(v, (currentPosition ? currentPosition + "[" + k + "]" : k), appendAffectedKey(affectedKey, k), operator, adjusted, isWithinArray);
        }                                                                                                              // 165
      });                                                                                                              // 166
    }                                                                                                                  // 167
                                                                                                                       // 168
  }                                                                                                                    // 169
  parseObj(self._obj);                                                                                                 // 170
                                                                                                                       // 171
  function reParseObj() {                                                                                              // 172
    self._affectedKeys = {};                                                                                           // 173
    self._genericAffectedKeys = {};                                                                                    // 174
    self._parentPositions = [];                                                                                        // 175
    self._positionsInsideArrays = [];                                                                                  // 176
    self._objectPositions = [];                                                                                        // 177
    parseObj(self._obj);                                                                                               // 178
  }                                                                                                                    // 179
                                                                                                                       // 180
  /**                                                                                                                  // 181
   * @method MongoObject.forEachNode                                                                                   // 182
   * @param {Function} func                                                                                            // 183
   * @param {Object} [options]                                                                                         // 184
   * @param {Boolean} [options.endPointsOnly=true] - Only call function for endpoints and not for nodes that contain other nodes
   * @returns {undefined}                                                                                              // 186
   *                                                                                                                   // 187
   * Runs a function for each endpoint node in the object tree, including all items in every array.                    // 188
   * The function arguments are                                                                                        // 189
   * (1) the value at this node                                                                                        // 190
   * (2) a string representing the node position                                                                       // 191
   * (3) the representation of what would be changed in mongo, using mongo dot notation                                // 192
   * (4) the generic equivalent of argument 3, with "$" instead of numeric pieces                                      // 193
   */                                                                                                                  // 194
  self.forEachNode = function(func, options) {                                                                         // 195
    if (typeof func !== "function") {                                                                                  // 196
      throw new Error("filter requires a loop function");                                                              // 197
    }                                                                                                                  // 198
                                                                                                                       // 199
    options = _.extend({                                                                                               // 200
      endPointsOnly: true                                                                                              // 201
    }, options);                                                                                                       // 202
                                                                                                                       // 203
    var updatedValues = {};                                                                                            // 204
    _.each(self._affectedKeys, function(affectedKey, position) {                                                       // 205
      if (options.endPointsOnly && _.contains(self._parentPositions, position)) {                                      // 206
        return; //only endpoints                                                                                       // 207
      }                                                                                                                // 208
      func.call({                                                                                                      // 209
        value: self.getValueForPosition(position),                                                                     // 210
        operator: extractOp(position),                                                                                 // 211
        position: position,                                                                                            // 212
        key: affectedKey,                                                                                              // 213
        genericKey: self._genericAffectedKeys[position],                                                               // 214
        updateValue: function(newVal) {                                                                                // 215
          updatedValues[position] = newVal;                                                                            // 216
        },                                                                                                             // 217
        remove: function() {                                                                                           // 218
          updatedValues[position] = void 0;                                                                            // 219
        }                                                                                                              // 220
      });                                                                                                              // 221
    });                                                                                                                // 222
                                                                                                                       // 223
    // Actually update/remove values as instructed                                                                     // 224
    _.each(updatedValues, function(newVal, position) {                                                                 // 225
      self.setValueForPosition(position, newVal);                                                                      // 226
    });                                                                                                                // 227
                                                                                                                       // 228
  };                                                                                                                   // 229
                                                                                                                       // 230
  self.getValueForPosition = function(position) {                                                                      // 231
    var subkey, subkeys = position.split("["), current = self._obj;                                                    // 232
    for (var i = 0, ln = subkeys.length; i < ln; i++) {                                                                // 233
      subkey = subkeys[i];                                                                                             // 234
      // If the subkey ends in "]", remove the ending                                                                  // 235
      if (subkey.slice(-1) === "]") {                                                                                  // 236
        subkey = subkey.slice(0, -1);                                                                                  // 237
      }                                                                                                                // 238
      current = current[subkey];                                                                                       // 239
      if (!_.isArray(current) && !isBasicObject(current) && i < ln - 1) {                                              // 240
        return;                                                                                                        // 241
      }                                                                                                                // 242
    }                                                                                                                  // 243
    return current;                                                                                                    // 244
  };                                                                                                                   // 245
                                                                                                                       // 246
  /**                                                                                                                  // 247
   * @method MongoObject.prototype.setValueForPosition                                                                 // 248
   * @param {String} position                                                                                          // 249
   * @param {Any} value                                                                                                // 250
   * @returns {undefined}                                                                                              // 251
   */                                                                                                                  // 252
  self.setValueForPosition = function(position, value) {                                                               // 253
    var nextPiece, subkey, subkeys = position.split("["), current = self._obj;                                         // 254
                                                                                                                       // 255
    for (var i = 0, ln = subkeys.length; i < ln; i++) {                                                                // 256
      subkey = subkeys[i];                                                                                             // 257
      // If the subkey ends in "]", remove the ending                                                                  // 258
      if (subkey.slice(-1) === "]") {                                                                                  // 259
        subkey = subkey.slice(0, -1);                                                                                  // 260
      }                                                                                                                // 261
      // If we've reached the key in the object tree that needs setting or                                             // 262
      // deleting, do it.                                                                                              // 263
      if (i === ln - 1) {                                                                                              // 264
        current[subkey] = value;                                                                                       // 265
        //if value is undefined, delete the property                                                                   // 266
        if (value === void 0) {                                                                                        // 267
          delete current[subkey];                                                                                      // 268
        }                                                                                                              // 269
      }                                                                                                                // 270
      // Otherwise attempt to keep moving deeper into the object.                                                      // 271
      else {                                                                                                           // 272
        // If we're setting (as opposed to deleting) a key and we hit a place                                          // 273
        // in the ancestor chain where the keys are not yet created, create them.                                      // 274
        if (current[subkey] === void 0 && value !== void 0) {                                                          // 275
          //see if the next piece is a number                                                                          // 276
          nextPiece = subkeys[i + 1];                                                                                  // 277
          nextPiece = parseInt(nextPiece, 10);                                                                         // 278
          current[subkey] = isNaN(nextPiece) ? {} : [];                                                                // 279
        }                                                                                                              // 280
                                                                                                                       // 281
        // Move deeper into the object                                                                                 // 282
        current = current[subkey];                                                                                     // 283
                                                                                                                       // 284
        // If we can go no further, then quit                                                                          // 285
        if (!_.isArray(current) && !isBasicObject(current) && i < ln - 1) {                                            // 286
          return;                                                                                                      // 287
        }                                                                                                              // 288
      }                                                                                                                // 289
    }                                                                                                                  // 290
                                                                                                                       // 291
    reParseObj();                                                                                                      // 292
  };                                                                                                                   // 293
                                                                                                                       // 294
  /**                                                                                                                  // 295
   * @method MongoObject.prototype.removeValueForPosition                                                              // 296
   * @param {String} position                                                                                          // 297
   * @returns {undefined}                                                                                              // 298
   */                                                                                                                  // 299
  self.removeValueForPosition = function(position) {                                                                   // 300
    self.setValueForPosition(position, void 0);                                                                        // 301
  };                                                                                                                   // 302
                                                                                                                       // 303
  /**                                                                                                                  // 304
   * @method MongoObject.prototype.getKeyForPosition                                                                   // 305
   * @param {String} position                                                                                          // 306
   * @returns {undefined}                                                                                              // 307
   */                                                                                                                  // 308
  self.getKeyForPosition = function(position) {                                                                        // 309
    return self._affectedKeys[position];                                                                               // 310
  };                                                                                                                   // 311
                                                                                                                       // 312
  /**                                                                                                                  // 313
   * @method MongoObject.prototype.getGenericKeyForPosition                                                            // 314
   * @param {String} position                                                                                          // 315
   * @returns {undefined}                                                                                              // 316
   */                                                                                                                  // 317
  self.getGenericKeyForPosition = function(position) {                                                                 // 318
    return self._genericAffectedKeys[position];                                                                        // 319
  };                                                                                                                   // 320
                                                                                                                       // 321
  /**                                                                                                                  // 322
   * @method MongoObject.getInfoForKey                                                                                 // 323
   * @param {String} key - Non-generic key                                                                             // 324
   * @returns {undefined|Object}                                                                                       // 325
   *                                                                                                                   // 326
   * Returns the value and operator of the requested non-generic key.                                                  // 327
   * Example: {value: 1, operator: "$pull"}                                                                            // 328
   */                                                                                                                  // 329
  self.getInfoForKey = function(key) {                                                                                 // 330
    // Get the info                                                                                                    // 331
    var position = self.getPositionForKey(key);                                                                        // 332
    if (position) {                                                                                                    // 333
      return {                                                                                                         // 334
        value: self.getValueForPosition(position),                                                                     // 335
        operator: extractOp(position)                                                                                  // 336
      };                                                                                                               // 337
    }                                                                                                                  // 338
                                                                                                                       // 339
    // If we haven't returned yet, check to see if there is an array value                                             // 340
    // corresponding to this key                                                                                       // 341
    // We find the first item within the array, strip the last piece off the                                           // 342
    // position string, and then return whatever is at that new position in                                            // 343
    // the original object.                                                                                            // 344
    var positions = self.getPositionsForGenericKey(key + ".$"), p, v;                                                  // 345
    for (var i = 0, ln = positions.length; i < ln; i++) {                                                              // 346
      p = positions[i];                                                                                                // 347
      v = self.getValueForPosition(p) || self.getValueForPosition(p.slice(0, p.lastIndexOf("[")));                     // 348
      if (v) {                                                                                                         // 349
        return {                                                                                                       // 350
          value: v,                                                                                                    // 351
          operator: extractOp(p)                                                                                       // 352
        };                                                                                                             // 353
      }                                                                                                                // 354
    }                                                                                                                  // 355
  };                                                                                                                   // 356
                                                                                                                       // 357
  /**                                                                                                                  // 358
   * @method MongoObject.getPositionForKey                                                                             // 359
   * @param {String} key - Non-generic key                                                                             // 360
   * @returns {undefined|String} Position string                                                                       // 361
   *                                                                                                                   // 362
   * Returns the position string for the place in the object that                                                      // 363
   * affects the requested non-generic key.                                                                            // 364
   * Example: 'foo[bar][0]'                                                                                            // 365
   */                                                                                                                  // 366
  self.getPositionForKey = function(key) {                                                                             // 367
    // Get the info                                                                                                    // 368
    for (var position in self._affectedKeys) {                                                                         // 369
      if (self._affectedKeys.hasOwnProperty(position)) {                                                               // 370
        if (self._affectedKeys[position] === key) {                                                                    // 371
          // We return the first one we find. While it's                                                               // 372
          // possible that multiple update operators could                                                             // 373
          // affect the same non-generic key, we'll assume that's not the case.                                        // 374
          return position;                                                                                             // 375
        }                                                                                                              // 376
      }                                                                                                                // 377
    }                                                                                                                  // 378
                                                                                                                       // 379
    // If we haven't returned yet, we need to check for affected keys                                                  // 380
  };                                                                                                                   // 381
                                                                                                                       // 382
  /**                                                                                                                  // 383
   * @method MongoObject.getPositionsForGenericKey                                                                     // 384
   * @param {String} key - Generic key                                                                                 // 385
   * @returns {String[]} Array of position strings                                                                     // 386
   *                                                                                                                   // 387
   * Returns an array of position strings for the places in the object that                                            // 388
   * affect the requested generic key.                                                                                 // 389
   * Example: ['foo[bar][0]']                                                                                          // 390
   */                                                                                                                  // 391
  self.getPositionsForGenericKey = function(key) {                                                                     // 392
    // Get the info                                                                                                    // 393
    var list = [];                                                                                                     // 394
    for (var position in self._genericAffectedKeys) {                                                                  // 395
      if (self._genericAffectedKeys.hasOwnProperty(position)) {                                                        // 396
        if (self._genericAffectedKeys[position] === key) {                                                             // 397
          list.push(position);                                                                                         // 398
        }                                                                                                              // 399
      }                                                                                                                // 400
    }                                                                                                                  // 401
                                                                                                                       // 402
    return list;                                                                                                       // 403
  };                                                                                                                   // 404
                                                                                                                       // 405
  /**                                                                                                                  // 406
   * @deprecated Use getInfoForKey                                                                                     // 407
   * @method MongoObject.getValueForKey                                                                                // 408
   * @param {String} key - Non-generic key                                                                             // 409
   * @returns {undefined|Any}                                                                                          // 410
   *                                                                                                                   // 411
   * Returns the value of the requested non-generic key                                                                // 412
   */                                                                                                                  // 413
  self.getValueForKey = function(key) {                                                                                // 414
    var position = self.getPositionForKey(key);                                                                        // 415
    if (position) {                                                                                                    // 416
      return self.getValueForPosition(position);                                                                       // 417
    }                                                                                                                  // 418
  };                                                                                                                   // 419
                                                                                                                       // 420
  /**                                                                                                                  // 421
   * @method MongoObject.prototype.addKey                                                                              // 422
   * @param {String} key - Key to set                                                                                  // 423
   * @param {Any} val - Value to give this key                                                                         // 424
   * @param {String} op - Operator under which to set it, or `null` for a non-modifier object                          // 425
   * @returns {undefined}                                                                                              // 426
   *                                                                                                                   // 427
   * Adds `key` with value `val` under operator `op` to the source object.                                             // 428
   */                                                                                                                  // 429
  self.addKey = function(key, val, op) {                                                                               // 430
    var position = op ? op + "[" + key + "]" : MongoObject._keyToPosition(key);                                        // 431
    self.setValueForPosition(position, val);                                                                           // 432
  };                                                                                                                   // 433
                                                                                                                       // 434
  /**                                                                                                                  // 435
   * @method MongoObject.prototype.removeGenericKeys                                                                   // 436
   * @param {String[]} keys                                                                                            // 437
   * @returns {undefined}                                                                                              // 438
   *                                                                                                                   // 439
   * Removes anything that affects any of the generic keys in the list                                                 // 440
   */                                                                                                                  // 441
  self.removeGenericKeys = function(keys) {                                                                            // 442
    for (var position in self._genericAffectedKeys) {                                                                  // 443
      if (self._genericAffectedKeys.hasOwnProperty(position)) {                                                        // 444
        if (_.contains(keys, self._genericAffectedKeys[position])) {                                                   // 445
          self.removeValueForPosition(position);                                                                       // 446
        }                                                                                                              // 447
      }                                                                                                                // 448
    }                                                                                                                  // 449
  };                                                                                                                   // 450
                                                                                                                       // 451
  /**                                                                                                                  // 452
   * @method MongoObject.removeGenericKey                                                                              // 453
   * @param {String} key                                                                                               // 454
   * @returns {undefined}                                                                                              // 455
   *                                                                                                                   // 456
   * Removes anything that affects the requested generic key                                                           // 457
   */                                                                                                                  // 458
  self.removeGenericKey = function(key) {                                                                              // 459
    for (var position in self._genericAffectedKeys) {                                                                  // 460
      if (self._genericAffectedKeys.hasOwnProperty(position)) {                                                        // 461
        if (self._genericAffectedKeys[position] === key) {                                                             // 462
          self.removeValueForPosition(position);                                                                       // 463
        }                                                                                                              // 464
      }                                                                                                                // 465
    }                                                                                                                  // 466
  };                                                                                                                   // 467
                                                                                                                       // 468
  /**                                                                                                                  // 469
   * @method MongoObject.removeKey                                                                                     // 470
   * @param {String} key                                                                                               // 471
   * @returns {undefined}                                                                                              // 472
   *                                                                                                                   // 473
   * Removes anything that affects the requested non-generic key                                                       // 474
   */                                                                                                                  // 475
  self.removeKey = function(key) {                                                                                     // 476
    // We don't use getPositionForKey here because we want to be sure to                                               // 477
    // remove for all positions if there are multiple.                                                                 // 478
    for (var position in self._affectedKeys) {                                                                         // 479
      if (self._affectedKeys.hasOwnProperty(position)) {                                                               // 480
        if (self._affectedKeys[position] === key) {                                                                    // 481
          self.removeValueForPosition(position);                                                                       // 482
        }                                                                                                              // 483
      }                                                                                                                // 484
    }                                                                                                                  // 485
  };                                                                                                                   // 486
                                                                                                                       // 487
  /**                                                                                                                  // 488
   * @method MongoObject.removeKeys                                                                                    // 489
   * @param {String[]} keys                                                                                            // 490
   * @returns {undefined}                                                                                              // 491
   *                                                                                                                   // 492
   * Removes anything that affects any of the non-generic keys in the list                                             // 493
   */                                                                                                                  // 494
  self.removeKeys = function(keys) {                                                                                   // 495
    for (var i = 0, ln = keys.length; i < ln; i++) {                                                                   // 496
      self.removeKey(keys[i]);                                                                                         // 497
    }                                                                                                                  // 498
  };                                                                                                                   // 499
                                                                                                                       // 500
  /**                                                                                                                  // 501
   * @method MongoObject.filterGenericKeys                                                                             // 502
   * @param {Function} test - Test function                                                                            // 503
   * @returns {undefined}                                                                                              // 504
   *                                                                                                                   // 505
   * Passes all affected keys to a test function, which                                                                // 506
   * should return false to remove whatever is affecting that key                                                      // 507
   */                                                                                                                  // 508
  self.filterGenericKeys = function(test) {                                                                            // 509
    var gk, checkedKeys = [], keysToRemove = [];                                                                       // 510
    for (var position in self._genericAffectedKeys) {                                                                  // 511
      if (self._genericAffectedKeys.hasOwnProperty(position)) {                                                        // 512
        gk = self._genericAffectedKeys[position];                                                                      // 513
        if (!_.contains(checkedKeys, gk)) {                                                                            // 514
          checkedKeys.push(gk);                                                                                        // 515
          if (gk && !test(gk)) {                                                                                       // 516
            keysToRemove.push(gk);                                                                                     // 517
          }                                                                                                            // 518
        }                                                                                                              // 519
      }                                                                                                                // 520
    }                                                                                                                  // 521
                                                                                                                       // 522
    _.each(keysToRemove, function(key) {                                                                               // 523
      self.removeGenericKey(key);                                                                                      // 524
    });                                                                                                                // 525
  };                                                                                                                   // 526
                                                                                                                       // 527
  /**                                                                                                                  // 528
   * @method MongoObject.setValueForKey                                                                                // 529
   * @param {String} key                                                                                               // 530
   * @param {Any} val                                                                                                  // 531
   * @returns {undefined}                                                                                              // 532
   *                                                                                                                   // 533
   * Sets the value for every place in the object that affects                                                         // 534
   * the requested non-generic key                                                                                     // 535
   */                                                                                                                  // 536
  self.setValueForKey = function(key, val) {                                                                           // 537
    // We don't use getPositionForKey here because we want to be sure to                                               // 538
    // set the value for all positions if there are multiple.                                                          // 539
    for (var position in self._affectedKeys) {                                                                         // 540
      if (self._affectedKeys.hasOwnProperty(position)) {                                                               // 541
        if (self._affectedKeys[position] === key) {                                                                    // 542
          self.setValueForPosition(position, val);                                                                     // 543
        }                                                                                                              // 544
      }                                                                                                                // 545
    }                                                                                                                  // 546
  };                                                                                                                   // 547
                                                                                                                       // 548
  /**                                                                                                                  // 549
   * @method MongoObject.setValueForGenericKey                                                                         // 550
   * @param {String} key                                                                                               // 551
   * @param {Any} val                                                                                                  // 552
   * @returns {undefined}                                                                                              // 553
   *                                                                                                                   // 554
   * Sets the value for every place in the object that affects                                                         // 555
   * the requested generic key                                                                                         // 556
   */                                                                                                                  // 557
  self.setValueForGenericKey = function(key, val) {                                                                    // 558
    // We don't use getPositionForKey here because we want to be sure to                                               // 559
    // set the value for all positions if there are multiple.                                                          // 560
    for (var position in self._genericAffectedKeys) {                                                                  // 561
      if (self._genericAffectedKeys.hasOwnProperty(position)) {                                                        // 562
        if (self._genericAffectedKeys[position] === key) {                                                             // 563
          self.setValueForPosition(position, val);                                                                     // 564
        }                                                                                                              // 565
      }                                                                                                                // 566
    }                                                                                                                  // 567
  };                                                                                                                   // 568
                                                                                                                       // 569
  /**                                                                                                                  // 570
   * @method MongoObject.getObject                                                                                     // 571
   * @returns {Object}                                                                                                 // 572
   *                                                                                                                   // 573
   * Get the source object, potentially modified by other method calls on this                                         // 574
   * MongoObject instance.                                                                                             // 575
   */                                                                                                                  // 576
  self.getObject = function() {                                                                                        // 577
    return self._obj;                                                                                                  // 578
  };                                                                                                                   // 579
                                                                                                                       // 580
  /**                                                                                                                  // 581
   * @method MongoObject.getFlatObject                                                                                 // 582
   * @returns {Object}                                                                                                 // 583
   *                                                                                                                   // 584
   * Gets a flat object based on the MongoObject instance.                                                             // 585
   * In a flat object, the key is the name of the non-generic affectedKey,                                             // 586
   * with mongo dot notation if necessary, and the value is the value for                                              // 587
   * that key.                                                                                                         // 588
   *                                                                                                                   // 589
   * With `keepArrays: true`, we don't flatten within arrays. Currently                                                // 590
   * MongoDB does not see a key such as `a.0.b` and automatically assume                                               // 591
   * an array. Instead it would create an object with key "0" if there                                                 // 592
   * wasn't already an array saved as the value of `a`, which is rarely                                                // 593
   * if ever what we actually want. To avoid this confusion, we                                                        // 594
   * set entire arrays.                                                                                                // 595
   */                                                                                                                  // 596
  self.getFlatObject = function(options) {                                                                             // 597
    options = options || {};                                                                                           // 598
    var newObj = {};                                                                                                   // 599
    _.each(self._affectedKeys, function(affectedKey, position) {                                                       // 600
      if (typeof affectedKey === "string" &&                                                                           // 601
        (options.keepArrays === true && !_.contains(self._positionsInsideArrays, position) && !_.contains(self._objectPositions, position)) ||
        (!options.keepArrays && !_.contains(self._parentPositions, position))                                          // 603
        ) {                                                                                                            // 604
        newObj[affectedKey] = self.getValueForPosition(position);                                                      // 605
      }                                                                                                                // 606
    });                                                                                                                // 607
    return newObj;                                                                                                     // 608
  };                                                                                                                   // 609
                                                                                                                       // 610
  /**                                                                                                                  // 611
   * @method MongoObject.affectsKey                                                                                    // 612
   * @param {String} key                                                                                               // 613
   * @returns {Object}                                                                                                 // 614
   *                                                                                                                   // 615
   * Returns true if the non-generic key is affected by this object                                                    // 616
   */                                                                                                                  // 617
  self.affectsKey = function(key) {                                                                                    // 618
    return !!self.getPositionForKey(key);                                                                              // 619
  };                                                                                                                   // 620
                                                                                                                       // 621
  /**                                                                                                                  // 622
   * @method MongoObject.affectsGenericKey                                                                             // 623
   * @param {String} key                                                                                               // 624
   * @returns {Object}                                                                                                 // 625
   *                                                                                                                   // 626
   * Returns true if the generic key is affected by this object                                                        // 627
   */                                                                                                                  // 628
  self.affectsGenericKey = function(key) {                                                                             // 629
    for (var position in self._genericAffectedKeys) {                                                                  // 630
      if (self._genericAffectedKeys.hasOwnProperty(position)) {                                                        // 631
        if (self._genericAffectedKeys[position] === key) {                                                             // 632
          return true;                                                                                                 // 633
        }                                                                                                              // 634
      }                                                                                                                // 635
    }                                                                                                                  // 636
    return false;                                                                                                      // 637
  };                                                                                                                   // 638
                                                                                                                       // 639
  /**                                                                                                                  // 640
   * @method MongoObject.affectsGenericKeyImplicit                                                                     // 641
   * @param {String} key                                                                                               // 642
   * @returns {Object}                                                                                                 // 643
   *                                                                                                                   // 644
   * Like affectsGenericKey, but will return true if a child key is affected                                           // 645
   */                                                                                                                  // 646
  self.affectsGenericKeyImplicit = function(key) {                                                                     // 647
    for (var position in self._genericAffectedKeys) {                                                                  // 648
      if (self._genericAffectedKeys.hasOwnProperty(position)) {                                                        // 649
        var affectedKey = self._genericAffectedKeys[position];                                                         // 650
                                                                                                                       // 651
        // If the affected key is the test key                                                                         // 652
        if (affectedKey === key) {                                                                                     // 653
          return true;                                                                                                 // 654
        }                                                                                                              // 655
                                                                                                                       // 656
        // If the affected key implies the test key because the affected key                                           // 657
        // starts with the test key followed by a period                                                               // 658
        if (affectedKey.substring(0, key.length + 1) === key + ".") {                                                  // 659
          return true;                                                                                                 // 660
        }                                                                                                              // 661
                                                                                                                       // 662
        // If the affected key implies the test key because the affected key                                           // 663
        // starts with the test key and the test key ends with ".$"                                                    // 664
        var lastTwo = key.slice(-2);                                                                                   // 665
        if (lastTwo === ".$" && key.slice(0, -2) === affectedKey) {                                                    // 666
          return true;                                                                                                 // 667
        }                                                                                                              // 668
      }                                                                                                                // 669
    }                                                                                                                  // 670
    return false;                                                                                                      // 671
  };                                                                                                                   // 672
};                                                                                                                     // 673
                                                                                                                       // 674
/** Takes a string representation of an object key and its value                                                       // 675
 *  and updates "obj" to contain that key with that value.                                                             // 676
 *                                                                                                                     // 677
 *  Example keys and results if val is 1:                                                                              // 678
 *    "a" -> {a: 1}                                                                                                    // 679
 *    "a[b]" -> {a: {b: 1}}                                                                                            // 680
 *    "a[b][0]" -> {a: {b: [1]}}                                                                                       // 681
 *    "a[b.0.c]" -> {a: {'b.0.c': 1}}                                                                                  // 682
 */                                                                                                                    // 683
                                                                                                                       // 684
/** Takes a string representation of an object key and its value                                                       // 685
 *  and updates "obj" to contain that key with that value.                                                             // 686
 *                                                                                                                     // 687
 *  Example keys and results if val is 1:                                                                              // 688
 *    "a" -> {a: 1}                                                                                                    // 689
 *    "a[b]" -> {a: {b: 1}}                                                                                            // 690
 *    "a[b][0]" -> {a: {b: [1]}}                                                                                       // 691
 *    "a[b.0.c]" -> {a: {'b.0.c': 1}}                                                                                  // 692
 *                                                                                                                     // 693
 * @param {any} val                                                                                                    // 694
 * @param {String} key                                                                                                 // 695
 * @param {Object} obj                                                                                                 // 696
 * @returns {undefined}                                                                                                // 697
 */                                                                                                                    // 698
MongoObject.expandKey = function(val, key, obj) {                                                                      // 699
  var nextPiece, subkey, subkeys = key.split("["), current = obj;                                                      // 700
  for (var i = 0, ln = subkeys.length; i < ln; i++) {                                                                  // 701
    subkey = subkeys[i];                                                                                               // 702
    if (subkey.slice(-1) === "]") {                                                                                    // 703
      subkey = subkey.slice(0, -1);                                                                                    // 704
    }                                                                                                                  // 705
    if (i === ln - 1) {                                                                                                // 706
      //last iteration; time to set the value; always overwrite                                                        // 707
      current[subkey] = val;                                                                                           // 708
      //if val is undefined, delete the property                                                                       // 709
      if (val === void 0) {                                                                                            // 710
        delete current[subkey];                                                                                        // 711
      }                                                                                                                // 712
    } else {                                                                                                           // 713
      //see if the next piece is a number                                                                              // 714
      nextPiece = subkeys[i + 1];                                                                                      // 715
      nextPiece = parseInt(nextPiece, 10);                                                                             // 716
      if (!current[subkey]) {                                                                                          // 717
        current[subkey] = isNaN(nextPiece) ? {} : [];                                                                  // 718
      }                                                                                                                // 719
    }                                                                                                                  // 720
    current = current[subkey];                                                                                         // 721
  }                                                                                                                    // 722
};                                                                                                                     // 723
                                                                                                                       // 724
MongoObject._keyToPosition = function keyToPosition(key, wrapAll) {                                                    // 725
  var position = '';                                                                                                   // 726
  _.each(key.split("."), function (piece, i) {                                                                         // 727
    if (i === 0 && !wrapAll) {                                                                                         // 728
      position += piece;                                                                                               // 729
    } else {                                                                                                           // 730
      position += "[" + piece + "]";                                                                                   // 731
    }                                                                                                                  // 732
  });                                                                                                                  // 733
  return position;                                                                                                     // 734
};                                                                                                                     // 735
                                                                                                                       // 736
/**                                                                                                                    // 737
 * @method MongoObject._positionToKey                                                                                  // 738
 * @param {String} position                                                                                            // 739
 * @returns {String} The key that this position in an object would affect.                                             // 740
 *                                                                                                                     // 741
 * This is different from MongoObject.prototype.getKeyForPosition in that                                              // 742
 * this method does not depend on the requested position actually being                                                // 743
 * present in any particular MongoObject.                                                                              // 744
 */                                                                                                                    // 745
MongoObject._positionToKey = function positionToKey(position) {                                                        // 746
  //XXX Probably a better way to do this, but this is                                                                  // 747
  //foolproof for now.                                                                                                 // 748
  var mDoc = new MongoObject({});                                                                                      // 749
  mDoc.setValueForPosition(position, 1); //value doesn't matter                                                        // 750
  var key = mDoc.getKeyForPosition(position);                                                                          // 751
  mDoc = null;                                                                                                         // 752
  return key;                                                                                                          // 753
};                                                                                                                     // 754
                                                                                                                       // 755
                                                                                                                       // 756
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:simple-schema/simple-schema-utility.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* global Utility:true */                                                                                              // 1
                                                                                                                       // 2
Utility = {                                                                                                            // 3
  appendAffectedKey: function appendAffectedKey(affectedKey, key) {                                                    // 4
    if (key === "$each") {                                                                                             // 5
      return affectedKey;                                                                                              // 6
    } else {                                                                                                           // 7
      return (affectedKey ? affectedKey + "." + key : key);                                                            // 8
    }                                                                                                                  // 9
  },                                                                                                                   // 10
  shouldCheck: function shouldCheck(key) {                                                                             // 11
    if (key === "$pushAll") {                                                                                          // 12
      throw new Error("$pushAll is not supported; use $push + $each");                                                 // 13
    }                                                                                                                  // 14
    return !_.contains(["$pull", "$pullAll", "$pop", "$slice"], key);                                                  // 15
  },                                                                                                                   // 16
  errorObject: function errorObject(errorType, keyName, keyValue) {                                                    // 17
    return {name: keyName, type: errorType, value: keyValue};                                                          // 18
  },                                                                                                                   // 19
  // Tests whether it's an Object as opposed to something that inherits from Object                                    // 20
  isBasicObject: function isBasicObject(obj) {                                                                         // 21
    return _.isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;                                         // 22
  },                                                                                                                   // 23
  // The latest Safari returns false for Uint8Array, etc. instanceof Function                                          // 24
  // unlike other browsers.                                                                                            // 25
  safariBugFix: function safariBugFix(type) {                                                                          // 26
    return (typeof Uint8Array !== "undefined" && type === Uint8Array) ||                                               // 27
      (typeof Uint16Array !== "undefined" && type === Uint16Array) ||                                                  // 28
      (typeof Uint32Array !== "undefined" && type === Uint32Array) ||                                                  // 29
      (typeof Uint8ClampedArray !== "undefined" && type === Uint8ClampedArray);                                        // 30
  },                                                                                                                   // 31
  isNotNullOrUndefined: function isNotNullOrUndefined(val) {                                                           // 32
    return val !== void 0 && val !== null;                                                                             // 33
  },                                                                                                                   // 34
  // Extracts operator piece, if present, from position string                                                         // 35
  extractOp: function extractOp(position) {                                                                            // 36
    var firstPositionPiece = position.slice(0, position.indexOf("["));                                                 // 37
    return (firstPositionPiece.substring(0, 1) === "$") ? firstPositionPiece : null;                                   // 38
  },                                                                                                                   // 39
  deleteIfPresent: function deleteIfPresent(obj, key) {                                                                // 40
    if (key in obj) {                                                                                                  // 41
      delete obj[key];                                                                                                 // 42
    }                                                                                                                  // 43
  },                                                                                                                   // 44
  looksLikeModifier: function looksLikeModifier(obj) {                                                                 // 45
    for (var key in obj) {                                                                                             // 46
      if (obj.hasOwnProperty(key) && key.substring(0, 1) === "$") {                                                    // 47
        return true;                                                                                                   // 48
      }                                                                                                                // 49
    }                                                                                                                  // 50
    return false;                                                                                                      // 51
  },                                                                                                                   // 52
  dateToDateString: function dateToDateString(date) {                                                                  // 53
    var m = (date.getUTCMonth() + 1);                                                                                  // 54
    if (m < 10) {                                                                                                      // 55
      m = "0" + m;                                                                                                     // 56
    }                                                                                                                  // 57
    var d = date.getUTCDate();                                                                                         // 58
    if (d < 10) {                                                                                                      // 59
      d = "0" + d;                                                                                                     // 60
    }                                                                                                                  // 61
    return date.getUTCFullYear() + '-' + m + '-' + d;                                                                  // 62
  }                                                                                                                    // 63
};                                                                                                                     // 64
                                                                                                                       // 65
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:simple-schema/simple-schema.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* global SimpleSchema:true */                                                                                         // 1
/* global SimpleSchemaValidationContext */                                                                             // 2
/* global MongoObject */                                                                                               // 3
/* global Utility */                                                                                                   // 4
/* global S:true */                                                                                                    // 5
                                                                                                                       // 6
if (Meteor.isServer) {                                                                                                 // 7
  S = Npm.require("string");                                                                                           // 8
}                                                                                                                      // 9
if (Meteor.isClient) {                                                                                                 // 10
  S = window.S;                                                                                                        // 11
}                                                                                                                      // 12
                                                                                                                       // 13
var schemaDefinition = {                                                                                               // 14
  type: Match.Any,                                                                                                     // 15
  label: Match.Optional(Match.OneOf(String, Function)),                                                                // 16
  optional: Match.Optional(Match.OneOf(Boolean, Function)),                                                            // 17
  min: Match.Optional(Match.OneOf(Number, Date, Function)),                                                            // 18
  max: Match.Optional(Match.OneOf(Number, Date, Function)),                                                            // 19
  minCount: Match.Optional(Match.OneOf(Number, Function)),                                                             // 20
  maxCount: Match.Optional(Match.OneOf(Number, Function)),                                                             // 21
  allowedValues: Match.Optional(Match.OneOf([Match.Any], Function)),                                                   // 22
  decimal: Match.Optional(Boolean),                                                                                    // 23
  exclusiveMax: Match.Optional(Boolean),                                                                               // 24
  exclusiveMin: Match.Optional(Boolean),                                                                               // 25
  regEx: Match.Optional(Match.OneOf(RegExp, [RegExp])),                                                                // 26
  custom: Match.Optional(Function),                                                                                    // 27
  blackbox: Match.Optional(Boolean),                                                                                   // 28
  autoValue: Match.Optional(Function),                                                                                 // 29
  defaultValue: Match.Optional(Match.Any),                                                                             // 30
  trim: Match.Optional(Boolean)                                                                                        // 31
};                                                                                                                     // 32
                                                                                                                       // 33
/*                                                                                                                     // 34
 * PRIVATE FUNCTIONS                                                                                                   // 35
 */                                                                                                                    // 36
                                                                                                                       // 37
//called by clean()                                                                                                    // 38
var typeconvert = function(value, type) {                                                                              // 39
  var parsedDate;                                                                                                      // 40
                                                                                                                       // 41
  if (_.isArray(value) || (_.isObject(value) && !(value instanceof Date))) {                                           // 42
    return value; //can't and shouldn't convert arrays or objects                                                      // 43
  }                                                                                                                    // 44
  if (type === String) {                                                                                               // 45
    if (typeof value !== "undefined" && value !== null && typeof value !== "string") {                                 // 46
      return value.toString();                                                                                         // 47
    }                                                                                                                  // 48
    return value;                                                                                                      // 49
  }                                                                                                                    // 50
  if (type === Number) {                                                                                               // 51
    if (typeof value === "string" && !S(value).isEmpty()) {                                                            // 52
      //try to convert numeric strings to numbers                                                                      // 53
      var numberVal = Number(value);                                                                                   // 54
      if (!isNaN(numberVal)) {                                                                                         // 55
        return numberVal;                                                                                              // 56
      } else {                                                                                                         // 57
        return value; //leave string; will fail validation                                                             // 58
      }                                                                                                                // 59
    }                                                                                                                  // 60
    return value;                                                                                                      // 61
  }                                                                                                                    // 62
  //                                                                                                                   // 63
  // If target type is a Date we can safely convert from either a                                                      // 64
  // number (Integer value representing the number of milliseconds                                                     // 65
  // since 1 January 1970 00:00:00 UTC) or a string that can be parsed                                                 // 66
  // by Date.                                                                                                          // 67
  //                                                                                                                   // 68
  if (type === Date) {                                                                                                 // 69
    if (typeof value === "string") {                                                                                   // 70
      parsedDate = Date.parse(value);                                                                                  // 71
      if (isNaN(parsedDate) === false) {                                                                               // 72
        return new Date(parsedDate);                                                                                   // 73
      }                                                                                                                // 74
    }                                                                                                                  // 75
    if (typeof value === "number") {                                                                                   // 76
      return new Date(value);                                                                                          // 77
    }                                                                                                                  // 78
  }                                                                                                                    // 79
  return value;                                                                                                        // 80
};                                                                                                                     // 81
                                                                                                                       // 82
var expandSchema = function(schema) {                                                                                  // 83
  // Flatten schema by inserting nested definitions                                                                    // 84
  _.each(schema, function(val, key) {                                                                                  // 85
    var dot, type;                                                                                                     // 86
    if (!val) {                                                                                                        // 87
      return;                                                                                                          // 88
    }                                                                                                                  // 89
    if (Match.test(val.type, SimpleSchema)) {                                                                          // 90
      dot = '.';                                                                                                       // 91
      type = val.type;                                                                                                 // 92
      val.type = Object;                                                                                               // 93
    } else if (Match.test(val.type, [SimpleSchema])) {                                                                 // 94
      dot = '.$.';                                                                                                     // 95
      type = val.type[0];                                                                                              // 96
      val.type = [Object];                                                                                             // 97
    } else {                                                                                                           // 98
      return;                                                                                                          // 99
    }                                                                                                                  // 100
    //add child schema definitions to parent schema                                                                    // 101
    _.each(type._schema, function(subVal, subKey) {                                                                    // 102
      var newKey = key + dot + subKey;                                                                                 // 103
      if (!(newKey in schema)) {                                                                                       // 104
        schema[newKey] = subVal;                                                                                       // 105
      }                                                                                                                // 106
    });                                                                                                                // 107
  });                                                                                                                  // 108
  return schema;                                                                                                       // 109
};                                                                                                                     // 110
                                                                                                                       // 111
var adjustArrayFields = function(schema) {                                                                             // 112
  _.each(schema, function(def, existingKey) {                                                                          // 113
    if (_.isArray(def.type) || def.type === Array) {                                                                   // 114
      // Copy some options to array-item definition                                                                    // 115
      var itemKey = existingKey + ".$";                                                                                // 116
      if (!(itemKey in schema)) {                                                                                      // 117
        schema[itemKey] = {};                                                                                          // 118
      }                                                                                                                // 119
      if (_.isArray(def.type)) {                                                                                       // 120
        schema[itemKey].type = def.type[0];                                                                            // 121
      }                                                                                                                // 122
      if (def.label) {                                                                                                 // 123
        schema[itemKey].label = def.label;                                                                             // 124
      }                                                                                                                // 125
      schema[itemKey].optional = true;                                                                                 // 126
      if (typeof def.min !== "undefined") {                                                                            // 127
        schema[itemKey].min = def.min;                                                                                 // 128
      }                                                                                                                // 129
      if (typeof def.max !== "undefined") {                                                                            // 130
        schema[itemKey].max = def.max;                                                                                 // 131
      }                                                                                                                // 132
      if (typeof def.allowedValues !== "undefined") {                                                                  // 133
        schema[itemKey].allowedValues = def.allowedValues;                                                             // 134
      }                                                                                                                // 135
      if (typeof def.decimal !== "undefined") {                                                                        // 136
        schema[itemKey].decimal = def.decimal;                                                                         // 137
      }                                                                                                                // 138
      if (typeof def.exclusiveMax !== "undefined") {                                                                   // 139
        schema[itemKey].exclusiveMax = def.exclusiveMax;                                                               // 140
      }                                                                                                                // 141
      if (typeof def.exclusiveMin !== "undefined") {                                                                   // 142
        schema[itemKey].exclusiveMin = def.exclusiveMin;                                                               // 143
      }                                                                                                                // 144
      if (typeof def.regEx !== "undefined") {                                                                          // 145
        schema[itemKey].regEx = def.regEx;                                                                             // 146
      }                                                                                                                // 147
      if (typeof def.blackbox !== "undefined") {                                                                       // 148
        schema[itemKey].blackbox = def.blackbox;                                                                       // 149
      }                                                                                                                // 150
      // Remove copied options and adjust type                                                                         // 151
      def.type = Array;                                                                                                // 152
      _.each(['min', 'max', 'allowedValues', 'decimal', 'exclusiveMax', 'exclusiveMin', 'regEx', 'blackbox'], function(k) {
        Utility.deleteIfPresent(def, k);                                                                               // 154
      });                                                                                                              // 155
    }                                                                                                                  // 156
  });                                                                                                                  // 157
};                                                                                                                     // 158
                                                                                                                       // 159
/**                                                                                                                    // 160
 * Adds implied keys.                                                                                                  // 161
 * * If schema contains a key like "foo.$.bar" but not "foo", adds "foo".                                              // 162
 * * If schema contains a key like "foo" with an array type, adds "foo.$".                                             // 163
 * @param {Object} schema                                                                                              // 164
 * @returns {Object} modified schema                                                                                   // 165
 */                                                                                                                    // 166
var addImplicitKeys = function(schema) {                                                                               // 167
  var arrayKeysToAdd = [], objectKeysToAdd = [], newKey, key, i, ln;                                                   // 168
                                                                                                                       // 169
  // Pass 1 (objects)                                                                                                  // 170
  _.each(schema, function(def, existingKey) {                                                                          // 171
    var pos = existingKey.indexOf(".");                                                                                // 172
    while (pos !== -1) {                                                                                               // 173
      newKey = existingKey.substring(0, pos);                                                                          // 174
                                                                                                                       // 175
      // It's an array item; nothing to add                                                                            // 176
      if (newKey.substring(newKey.length - 2) === ".$") {                                                              // 177
        pos = -1;                                                                                                      // 178
      }                                                                                                                // 179
      // It's an array of objects; add it with type [Object] if not already in the schema                              // 180
      else if (existingKey.substring(pos, pos + 3) === ".$.") {                                                        // 181
        arrayKeysToAdd.push(newKey); // add later, since we are iterating over schema right now                        // 182
        pos = existingKey.indexOf(".", pos + 3); // skip over next dot, find the one after                             // 183
      }                                                                                                                // 184
      // It's an object; add it with type Object if not already in the schema                                          // 185
      else {                                                                                                           // 186
        objectKeysToAdd.push(newKey); // add later, since we are iterating over schema right now                       // 187
        pos = existingKey.indexOf(".", pos + 1); // find next dot                                                      // 188
      }                                                                                                                // 189
    }                                                                                                                  // 190
  });                                                                                                                  // 191
                                                                                                                       // 192
  for (i = 0, ln = arrayKeysToAdd.length; i < ln; i++) {                                                               // 193
    key = arrayKeysToAdd[i];                                                                                           // 194
    if (!(key in schema)) {                                                                                            // 195
      schema[key] = {type: [Object], optional: true};                                                                  // 196
    }                                                                                                                  // 197
  }                                                                                                                    // 198
                                                                                                                       // 199
  for (i = 0, ln = objectKeysToAdd.length; i < ln; i++) {                                                              // 200
    key = objectKeysToAdd[i];                                                                                          // 201
    if (!(key in schema)) {                                                                                            // 202
      schema[key] = {type: Object, optional: true};                                                                    // 203
    }                                                                                                                  // 204
  }                                                                                                                    // 205
                                                                                                                       // 206
  // Pass 2 (arrays)                                                                                                   // 207
  adjustArrayFields(schema);                                                                                           // 208
                                                                                                                       // 209
  return schema;                                                                                                       // 210
};                                                                                                                     // 211
                                                                                                                       // 212
var mergeSchemas = function(schemas) {                                                                                 // 213
                                                                                                                       // 214
  // Merge all provided schema definitions.                                                                            // 215
  // This is effectively a shallow clone of each object, too,                                                          // 216
  // which is what we want since we are going to manipulate it.                                                        // 217
  var mergedSchema = {};                                                                                               // 218
  _.each(schemas, function(schema) {                                                                                   // 219
                                                                                                                       // 220
    // Create a temporary SS instance so that the internal object                                                      // 221
    // we use for merging/extending will be fully expanded                                                             // 222
    if (Match.test(schema, SimpleSchema)) {                                                                            // 223
      schema = schema._schema;                                                                                         // 224
    } else {                                                                                                           // 225
      schema = addImplicitKeys(expandSchema(schema));                                                                  // 226
    }                                                                                                                  // 227
                                                                                                                       // 228
    // Loop through and extend each individual field                                                                   // 229
    // definition. That way you can extend and overwrite                                                               // 230
    // base field definitions.                                                                                         // 231
    _.each(schema, function(def, field) {                                                                              // 232
      mergedSchema[field] = mergedSchema[field] || {};                                                                 // 233
      _.extend(mergedSchema[field], def);                                                                              // 234
    });                                                                                                                // 235
                                                                                                                       // 236
  });                                                                                                                  // 237
                                                                                                                       // 238
  // If we merged some schemas, do this again to make sure                                                             // 239
  // extended definitions are pushed into array item field                                                             // 240
  // definitions properly.                                                                                             // 241
  schemas.length && adjustArrayFields(mergedSchema);                                                                   // 242
                                                                                                                       // 243
  return mergedSchema;                                                                                                 // 244
};                                                                                                                     // 245
                                                                                                                       // 246
// Returns an object relating the keys in the list                                                                     // 247
// to their parent object.                                                                                             // 248
var getObjectKeys = function(schema, schemaKeyList) {                                                                  // 249
  var keyPrefix, remainingText, rKeys = {}, loopArray;                                                                 // 250
  _.each(schema, function(definition, fieldName) {                                                                     // 251
    if (definition.type === Object) {                                                                                  // 252
      //object                                                                                                         // 253
      keyPrefix = fieldName + ".";                                                                                     // 254
    } else {                                                                                                           // 255
      return;                                                                                                          // 256
    }                                                                                                                  // 257
                                                                                                                       // 258
    loopArray = [];                                                                                                    // 259
    _.each(schemaKeyList, function(fieldName2) {                                                                       // 260
      if (S(fieldName2).startsWith(keyPrefix)) {                                                                       // 261
        remainingText = fieldName2.substring(keyPrefix.length);                                                        // 262
        if (remainingText.indexOf(".") === -1) {                                                                       // 263
          loopArray.push(remainingText);                                                                               // 264
        }                                                                                                              // 265
      }                                                                                                                // 266
    });                                                                                                                // 267
    rKeys[keyPrefix] = loopArray;                                                                                      // 268
  });                                                                                                                  // 269
  return rKeys;                                                                                                        // 270
};                                                                                                                     // 271
                                                                                                                       // 272
// returns an inflected version of fieldName to use as the label                                                       // 273
var inflectedLabel = function(fieldName) {                                                                             // 274
  var label = fieldName, lastPeriod = label.lastIndexOf(".");                                                          // 275
  if (lastPeriod !== -1) {                                                                                             // 276
    label = label.substring(lastPeriod + 1);                                                                           // 277
    if (label === "$") {                                                                                               // 278
      var pcs = fieldName.split(".");                                                                                  // 279
      label = pcs[pcs.length - 2];                                                                                     // 280
    }                                                                                                                  // 281
  }                                                                                                                    // 282
  if (label === "_id") {                                                                                               // 283
    return "ID";                                                                                                       // 284
  }                                                                                                                    // 285
  return S(label).humanize().s;                                                                                        // 286
};                                                                                                                     // 287
                                                                                                                       // 288
/**                                                                                                                    // 289
 * @method getAutoValues                                                                                               // 290
 * @private                                                                                                            // 291
 * @param {MongoObject} mDoc                                                                                           // 292
 * @param {Boolean} [isModifier=false] - Is it a modifier doc?                                                         // 293
 * @param {Object} [extendedAutoValueContext] - Object that will be added to the context when calling each autoValue function
 * @returns {undefined}                                                                                                // 295
 *                                                                                                                     // 296
 * Updates doc with automatic values from autoValue functions or default                                               // 297
 * values from defaultValue. Modifies the referenced object in place.                                                  // 298
 */                                                                                                                    // 299
function getAutoValues(mDoc, isModifier, extendedAutoValueContext) {                                                   // 300
  var self = this;                                                                                                     // 301
  var doneKeys = [];                                                                                                   // 302
                                                                                                                       // 303
  //on the client we can add the userId if not already in the custom context                                           // 304
  if (Meteor.isClient && extendedAutoValueContext.userId === void 0) {                                                 // 305
    extendedAutoValueContext.userId = (Meteor.userId && Meteor.userId()) || null;                                      // 306
  }                                                                                                                    // 307
                                                                                                                       // 308
  function runAV(func) {                                                                                               // 309
    var affectedKey = this.key;                                                                                        // 310
    // If already called for this key, skip it                                                                         // 311
    if (_.contains(doneKeys, affectedKey)) {                                                                           // 312
      return;                                                                                                          // 313
    }                                                                                                                  // 314
    var lastDot = affectedKey.lastIndexOf('.');                                                                        // 315
    var fieldParentName = lastDot === -1 ? '' : affectedKey.slice(0, lastDot + 1);                                     // 316
    var doUnset = false;                                                                                               // 317
    var autoValue = func.call(_.extend({                                                                               // 318
      isSet: (this.value !== void 0),                                                                                  // 319
      unset: function() {                                                                                              // 320
        doUnset = true;                                                                                                // 321
      },                                                                                                               // 322
      value: this.value,                                                                                               // 323
      operator: this.operator,                                                                                         // 324
      field: function(fName) {                                                                                         // 325
        var keyInfo = mDoc.getInfoForKey(fName) || {};                                                                 // 326
        return {                                                                                                       // 327
          isSet: (keyInfo.value !== void 0),                                                                           // 328
          value: keyInfo.value,                                                                                        // 329
          operator: keyInfo.operator || null                                                                           // 330
        };                                                                                                             // 331
      },                                                                                                               // 332
      siblingField: function(fName) {                                                                                  // 333
        var keyInfo = mDoc.getInfoForKey(fieldParentName + fName) || {};                                               // 334
        return {                                                                                                       // 335
          isSet: (keyInfo.value !== void 0),                                                                           // 336
          value: keyInfo.value,                                                                                        // 337
          operator: keyInfo.operator || null                                                                           // 338
        };                                                                                                             // 339
      }                                                                                                                // 340
    }, extendedAutoValueContext || {}), mDoc.getObject());                                                             // 341
                                                                                                                       // 342
    // Update tracking of which keys we've run autovalue for                                                           // 343
    doneKeys.push(affectedKey);                                                                                        // 344
                                                                                                                       // 345
    if (autoValue === void 0) {                                                                                        // 346
      if (doUnset) {                                                                                                   // 347
        mDoc.removeValueForPosition(this.position);                                                                    // 348
      }                                                                                                                // 349
      return;                                                                                                          // 350
    }                                                                                                                  // 351
                                                                                                                       // 352
    // If the user's auto value is of the pseudo-modifier format, parse it                                             // 353
    // into operator and value.                                                                                        // 354
    var op, newValue;                                                                                                  // 355
    if (_.isObject(autoValue)) {                                                                                       // 356
      for (var key in autoValue) {                                                                                     // 357
        if (autoValue.hasOwnProperty(key) && key.substring(0, 1) === "$") {                                            // 358
          op = key;                                                                                                    // 359
          newValue = autoValue[key];                                                                                   // 360
          break;                                                                                                       // 361
        }                                                                                                              // 362
      }                                                                                                                // 363
    }                                                                                                                  // 364
                                                                                                                       // 365
    // Add $set for updates and upserts if necessary                                                                   // 366
    if (!op && isModifier && this.position.slice(0, 1) !== '$') {                                                      // 367
      op = "$set";                                                                                                     // 368
      newValue = autoValue;                                                                                            // 369
    }                                                                                                                  // 370
                                                                                                                       // 371
    // Update/change value                                                                                             // 372
    if (op) {                                                                                                          // 373
      mDoc.removeValueForPosition(this.position);                                                                      // 374
      mDoc.setValueForPosition(op + '[' + affectedKey + ']', newValue);                                                // 375
    } else {                                                                                                           // 376
      mDoc.setValueForPosition(this.position, autoValue);                                                              // 377
    }                                                                                                                  // 378
  }                                                                                                                    // 379
                                                                                                                       // 380
  _.each(self._autoValues, function(func, fieldName) {                                                                 // 381
    var positionSuffix, key, keySuffix, positions;                                                                     // 382
                                                                                                                       // 383
    // If we're under an array, run autovalue for all the properties of                                                // 384
    // any objects that are present in the nearest ancestor array.                                                     // 385
    if (fieldName.indexOf("$") !== -1) {                                                                               // 386
      var testField = fieldName.slice(0, fieldName.lastIndexOf("$") + 1);                                              // 387
      keySuffix = fieldName.slice(testField.length + 1);                                                               // 388
      positionSuffix = MongoObject._keyToPosition(keySuffix, true);                                                    // 389
      keySuffix = '.' + keySuffix;                                                                                     // 390
      positions = mDoc.getPositionsForGenericKey(testField);                                                           // 391
    } else {                                                                                                           // 392
                                                                                                                       // 393
      // See if anything in the object affects this key                                                                // 394
      positions = mDoc.getPositionsForGenericKey(fieldName);                                                           // 395
                                                                                                                       // 396
      // Run autovalue for properties that are set in the object                                                       // 397
      if (positions.length) {                                                                                          // 398
        key = fieldName;                                                                                               // 399
        keySuffix = '';                                                                                                // 400
        positionSuffix = '';                                                                                           // 401
      }                                                                                                                // 402
                                                                                                                       // 403
      // Run autovalue for properties that are NOT set in the object                                                   // 404
      else {                                                                                                           // 405
        key = fieldName;                                                                                               // 406
        keySuffix = '';                                                                                                // 407
        positionSuffix = '';                                                                                           // 408
        if (isModifier) {                                                                                              // 409
          positions = ["$set[" + fieldName + "]"];                                                                     // 410
        } else {                                                                                                       // 411
          positions = [MongoObject._keyToPosition(fieldName)];                                                         // 412
        }                                                                                                              // 413
      }                                                                                                                // 414
                                                                                                                       // 415
    }                                                                                                                  // 416
                                                                                                                       // 417
    _.each(positions, function(position) {                                                                             // 418
      runAV.call({                                                                                                     // 419
        key: (key || MongoObject._positionToKey(position)) + keySuffix,                                                // 420
        value: mDoc.getValueForPosition(position + positionSuffix),                                                    // 421
        operator: Utility.extractOp(position),                                                                         // 422
        position: position + positionSuffix                                                                            // 423
      }, func);                                                                                                        // 424
    });                                                                                                                // 425
  });                                                                                                                  // 426
}                                                                                                                      // 427
                                                                                                                       // 428
//exported                                                                                                             // 429
SimpleSchema = function(schemas, options) {                                                                            // 430
  var self = this;                                                                                                     // 431
  var firstLevelSchemaKeys = [];                                                                                       // 432
  var fieldNameRoot;                                                                                                   // 433
  options = options || {};                                                                                             // 434
  schemas = schemas || {};                                                                                             // 435
                                                                                                                       // 436
  if (!_.isArray(schemas)) {                                                                                           // 437
    schemas = [schemas];                                                                                               // 438
  }                                                                                                                    // 439
                                                                                                                       // 440
  // adjust and store a copy of the schema definitions                                                                 // 441
  self._schema = mergeSchemas(schemas);                                                                                // 442
                                                                                                                       // 443
  // store the list of defined keys for speedier checking                                                              // 444
  self._schemaKeys = [];                                                                                               // 445
                                                                                                                       // 446
  // store autoValue functions by key                                                                                  // 447
  self._autoValues = {};                                                                                               // 448
                                                                                                                       // 449
  // store the list of blackbox keys for passing to MongoObject constructor                                            // 450
  self._blackboxKeys = [];                                                                                             // 451
                                                                                                                       // 452
  // a place to store custom validators for this instance                                                              // 453
  self._validators = [];                                                                                               // 454
                                                                                                                       // 455
  // a place to store custom error messages for this schema                                                            // 456
  self._messages = {};                                                                                                 // 457
                                                                                                                       // 458
  self._depsMessages = new Deps.Dependency();                                                                          // 459
  self._depsLabels = {};                                                                                               // 460
                                                                                                                       // 461
  _.each(self._schema, function(definition, fieldName) {                                                               // 462
    // Validate the field definition                                                                                   // 463
    if (!Match.test(definition, schemaDefinition)) {                                                                   // 464
      throw new Error('Invalid definition for ' + fieldName + ' field.');                                              // 465
    }                                                                                                                  // 466
                                                                                                                       // 467
    fieldNameRoot = fieldName.split(".")[0];                                                                           // 468
                                                                                                                       // 469
    self._schemaKeys.push(fieldName);                                                                                  // 470
                                                                                                                       // 471
    // We support defaultValue shortcut by converting it immediately into an                                           // 472
    // autoValue.                                                                                                      // 473
    if ('defaultValue' in definition) {                                                                                // 474
      if ('autoValue' in definition) {                                                                                 // 475
        console.warn('SimpleSchema: Found both autoValue and defaultValue options for "' + fieldName + '". Ignoring defaultValue.');
      } else {                                                                                                         // 477
        if (fieldName.slice(-2) === ".$") {                                                                            // 478
          throw new Error('An array item field (one that ends with ".$") cannot have defaultValue.');                  // 479
        }                                                                                                              // 480
        self._autoValues[fieldName] = (function defineAutoValue(v) {                                                   // 481
          return function() {                                                                                          // 482
            if (this.operator === null && !this.isSet) {                                                               // 483
              return v;                                                                                                // 484
            }                                                                                                          // 485
          };                                                                                                           // 486
        })(definition.defaultValue);                                                                                   // 487
      }                                                                                                                // 488
    }                                                                                                                  // 489
                                                                                                                       // 490
    if ('autoValue' in definition) {                                                                                   // 491
      if (fieldName.slice(-2) === ".$") {                                                                              // 492
        throw new Error('An array item field (one that ends with ".$") cannot have autoValue.');                       // 493
      }                                                                                                                // 494
      self._autoValues[fieldName] = definition.autoValue;                                                              // 495
    }                                                                                                                  // 496
                                                                                                                       // 497
    self._depsLabels[fieldName] = new Deps.Dependency();                                                               // 498
                                                                                                                       // 499
    if (definition.blackbox === true) {                                                                                // 500
      self._blackboxKeys.push(fieldName);                                                                              // 501
    }                                                                                                                  // 502
                                                                                                                       // 503
    if (!_.contains(firstLevelSchemaKeys, fieldNameRoot)) {                                                            // 504
      firstLevelSchemaKeys.push(fieldNameRoot);                                                                        // 505
    }                                                                                                                  // 506
  });                                                                                                                  // 507
                                                                                                                       // 508
                                                                                                                       // 509
  // Cache these lists                                                                                                 // 510
  self._firstLevelSchemaKeys = firstLevelSchemaKeys;                                                                   // 511
  self._objectKeys = getObjectKeys(self._schema, self._schemaKeys);                                                    // 512
                                                                                                                       // 513
  // We will store named validation contexts here                                                                      // 514
  self._validationContexts = {};                                                                                       // 515
};                                                                                                                     // 516
                                                                                                                       // 517
// This allows other packages or users to extend the schema                                                            // 518
// definition options that are supported.                                                                              // 519
SimpleSchema.extendOptions = function(options) {                                                                       // 520
  _.extend(schemaDefinition, options);                                                                                 // 521
};                                                                                                                     // 522
                                                                                                                       // 523
// this domain regex matches all domains that have at least one .                                                      // 524
// sadly IPv4 Adresses will be caught too but technically those are valid domains                                      // 525
// this expression is extracted from the original RFC 5322 mail expression                                             // 526
// a modification enforces that the tld consists only of characters                                                    // 527
var RX_DOMAIN = '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z](?:[a-z-]*[a-z])?';                                       // 528
// this domain regex matches everythign that could be a domain in intranet                                             // 529
// that means "localhost" is a valid domain                                                                            // 530
var RX_NAME_DOMAIN = '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\\.|$))+';                                                  // 531
// strict IPv4 expression which allows 0-255 per oktett                                                                // 532
var RX_IPv4 = '(?:(?:[0-1]?\\d{1,2}|2[0-4]\\d|25[0-5])(?:\\.|$)){4}';                                                  // 533
// strict IPv6 expression which allows (and validates) all shortcuts                                                   // 534
var RX_IPv6 = '(?:(?:[\\dA-Fa-f]{1,4}(?::|$)){8}' // full adress                                                       // 535
  + '|(?=(?:[^:\\s]|:[^:\\s])*::(?:[^:\\s]|:[^:\\s])*$)' // or min/max one '::'                                        // 536
  + '[\\dA-Fa-f]{0,4}(?:::?(?:[\\dA-Fa-f]{1,4}|$)){1,6})'; // and short adress                                         // 537
// this allows domains (also localhost etc) and ip adresses                                                            // 538
var RX_WEAK_DOMAIN = '(?:' + [RX_NAME_DOMAIN,RX_IPv4,RX_IPv6].join('|') + ')';                                         // 539
                                                                                                                       // 540
SimpleSchema.RegEx = {                                                                                                 // 541
  // We use the RegExp suggested by W3C in http://www.w3.org/TR/html5/forms.html#valid-e-mail-address                  // 542
  // This is probably the same logic used by most browsers when type=email, which is our goal. It is                   // 543
  // a very permissive expression. Some apps may wish to be more strict and can write their own RegExp.                // 544
  Email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                                                                                                                       // 546
  Domain: new RegExp('^' + RX_DOMAIN + '$'),                                                                           // 547
  WeakDomain: new RegExp('^' + RX_WEAK_DOMAIN + '$'),                                                                  // 548
                                                                                                                       // 549
  IP: new RegExp('^(?:' + RX_IPv4 + '|' + RX_IPv6 + ')$'),                                                             // 550
  IPv4: new RegExp('^' + RX_IPv4 + '$'),                                                                               // 551
  IPv6: new RegExp('^' + RX_IPv6 + '$'),                                                                               // 552
  // URL RegEx from https://gist.github.com/dperini/729294                                                             // 553
  // http://mathiasbynens.be/demo/url-regex                                                                            // 554
  Url: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i,
  // unique id from the random package also used by minimongo                                                          // 556
  // character list: https://github.com/meteor/meteor/blob/release/0.8.0/packages/random/random.js#L88                 // 557
  // string length: https://github.com/meteor/meteor/blob/release/0.8.0/packages/random/random.js#L143                 // 558
  Id: /^[23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz]{17}$/,                                               // 559
  // allows for a 5 digit zip code followed by a whitespace or dash and then 4 more digits                             // 560
  // matches 11111 and 11111-1111 and 11111 1111                                                                       // 561
  ZipCode: /^\d{5}(?:[-\s]\d{4})?$/                                                                                    // 562
};                                                                                                                     // 563
                                                                                                                       // 564
SimpleSchema._makeGeneric = function(name) {                                                                           // 565
  if (typeof name !== "string") {                                                                                      // 566
    return null;                                                                                                       // 567
  }                                                                                                                    // 568
                                                                                                                       // 569
  return name.replace(/\.[0-9]+(?=\.|$)/g, '.$');                                                                      // 570
};                                                                                                                     // 571
                                                                                                                       // 572
SimpleSchema._depsGlobalMessages = new Deps.Dependency();                                                              // 573
                                                                                                                       // 574
// Inherit from Match.Where                                                                                            // 575
// This allow SimpleSchema instance to be recognized as a Match.Where instance as well                                 // 576
// as a SimpleSchema instance                                                                                          // 577
SimpleSchema.prototype = new Match.Where();                                                                            // 578
                                                                                                                       // 579
// If an object is an instance of Match.Where, Meteor built-in check API will look at                                  // 580
// the function named `condition` and will pass it the document to validate                                            // 581
SimpleSchema.prototype.condition = function(obj) {                                                                     // 582
  var self = this;                                                                                                     // 583
                                                                                                                       // 584
  //determine whether obj is a modifier                                                                                // 585
  var isModifier, isNotModifier;                                                                                       // 586
  _.each(obj, function(val, key) {                                                                                     // 587
    if (key.substring(0, 1) === "$") {                                                                                 // 588
      isModifier = true;                                                                                               // 589
    } else {                                                                                                           // 590
      isNotModifier = true;                                                                                            // 591
    }                                                                                                                  // 592
  });                                                                                                                  // 593
                                                                                                                       // 594
  if (isModifier && isNotModifier) {                                                                                   // 595
    throw new Match.Error("Object cannot contain modifier operators alongside other keys");                            // 596
  }                                                                                                                    // 597
                                                                                                                       // 598
  var ctx = self.newContext();                                                                                         // 599
  if (!ctx.validate(obj, {modifier: isModifier, filter: false, autoConvert: false})) {                                 // 600
    var error = ctx.getErrorObject();                                                                                  // 601
    var matchError = new Match.Error(error.message);                                                                   // 602
    matchError.invalidKeys = error.invalidKeys;                                                                        // 603
    if (Meteor.isServer) {                                                                                             // 604
      matchError.sanitizedError = error.sanitizedError;                                                                // 605
    }                                                                                                                  // 606
    throw matchError;                                                                                                  // 607
  }                                                                                                                    // 608
                                                                                                                       // 609
  return true;                                                                                                         // 610
};                                                                                                                     // 611
                                                                                                                       // 612
function logInvalidKeysForContext(context, name) {                                                                     // 613
  Meteor.startup(function() {                                                                                          // 614
    Deps.autorun(function() {                                                                                          // 615
      if (!context.isValid()) {                                                                                        // 616
        console.log('SimpleSchema invalid keys for "' + name + '" context:', context.invalidKeys());                   // 617
      }                                                                                                                // 618
    });                                                                                                                // 619
  });                                                                                                                  // 620
}                                                                                                                      // 621
                                                                                                                       // 622
SimpleSchema.prototype.namedContext = function(name) {                                                                 // 623
  var self = this;                                                                                                     // 624
  if (typeof name !== "string") {                                                                                      // 625
    name = "default";                                                                                                  // 626
  }                                                                                                                    // 627
  if (!self._validationContexts[name]) {                                                                               // 628
    self._validationContexts[name] = new SimpleSchemaValidationContext(self);                                          // 629
                                                                                                                       // 630
    // In debug mode, log all invalid key errors to the browser console                                                // 631
    if (SimpleSchema.debug && Meteor.isClient) {                                                                       // 632
      Deps.nonreactive(function() {                                                                                    // 633
        logInvalidKeysForContext(self._validationContexts[name], name);                                                // 634
      });                                                                                                              // 635
    }                                                                                                                  // 636
  }                                                                                                                    // 637
  return self._validationContexts[name];                                                                               // 638
};                                                                                                                     // 639
                                                                                                                       // 640
// Global custom validators                                                                                            // 641
SimpleSchema._validators = [];                                                                                         // 642
SimpleSchema.addValidator = function(func) {                                                                           // 643
  SimpleSchema._validators.push(func);                                                                                 // 644
};                                                                                                                     // 645
                                                                                                                       // 646
// Instance custom validators                                                                                          // 647
// validator is deprecated; use addValidator                                                                           // 648
SimpleSchema.prototype.addValidator = SimpleSchema.prototype.validator = function(func) {                              // 649
  this._validators.push(func);                                                                                         // 650
};                                                                                                                     // 651
                                                                                                                       // 652
/**                                                                                                                    // 653
 * @method SimpleSchema.prototype.pick                                                                                 // 654
 * @param {[fields]} The list of fields to pick to instantiate the subschema                                           // 655
 * @returns {SimpleSchema} The subschema                                                                               // 656
 */                                                                                                                    // 657
SimpleSchema.prototype.pick = function(/* arguments */) {                                                              // 658
  var self = this;                                                                                                     // 659
  var args = _.toArray(arguments);                                                                                     // 660
  args.unshift(self._schema);                                                                                          // 661
                                                                                                                       // 662
  var newSchema = _.pick.apply(null, args);                                                                            // 663
  return new SimpleSchema(newSchema);                                                                                  // 664
};                                                                                                                     // 665
                                                                                                                       // 666
/**                                                                                                                    // 667
 * @method SimpleSchema.prototype.clean                                                                                // 668
 * @param {Object} doc - Document or modifier to clean. Referenced object will be modified in place.                   // 669
 * @param {Object} [options]                                                                                           // 670
 * @param {Boolean} [options.filter=true] - Do filtering?                                                              // 671
 * @param {Boolean} [options.autoConvert=true] - Do automatic type converting?                                         // 672
 * @param {Boolean} [options.removeEmptyStrings=true] - Remove keys in normal object or $set where the value is an empty string?
 * @param {Boolean} [options.trimStrings=true] - Trim string values?                                                   // 674
 * @param {Boolean} [options.getAutoValues=true] - Inject automatic and default values?                                // 675
 * @param {Boolean} [options.isModifier=false] - Is doc a modifier object?                                             // 676
 * @param {Object} [options.extendAutoValueContext] - This object will be added to the `this` context of autoValue functions.
 * @returns {Object} The modified doc.                                                                                 // 678
 *                                                                                                                     // 679
 * Cleans a document or modifier object. By default, will filter, automatically                                        // 680
 * type convert where possible, and inject automatic/default values. Use the options                                   // 681
 * to skip one or more of these.                                                                                       // 682
 */                                                                                                                    // 683
SimpleSchema.prototype.clean = function(doc, options) {                                                                // 684
  var self = this;                                                                                                     // 685
                                                                                                                       // 686
  // By default, doc will be filtered and autoconverted                                                                // 687
  options = _.extend({                                                                                                 // 688
    filter: true,                                                                                                      // 689
    autoConvert: true,                                                                                                 // 690
    removeEmptyStrings: true,                                                                                          // 691
    trimStrings: true,                                                                                                 // 692
    getAutoValues: true,                                                                                               // 693
    isModifier: false,                                                                                                 // 694
    extendAutoValueContext: {}                                                                                         // 695
  }, options || {});                                                                                                   // 696
                                                                                                                       // 697
  // Convert $pushAll (deprecated) to $push with $each                                                                 // 698
  if ("$pushAll" in doc) {                                                                                             // 699
    console.warn("SimpleSchema.clean: $pushAll is deprecated; converting to $push with $each");                        // 700
    doc.$push = doc.$push || {};                                                                                       // 701
    for (var field in doc.$pushAll) {                                                                                  // 702
      doc.$push[field] = doc.$push[field] || {};                                                                       // 703
      doc.$push[field].$each = doc.$push[field].$each || [];                                                           // 704
      for (var i = 0, ln = doc.$pushAll[field].length; i < ln; i++) {                                                  // 705
        doc.$push[field].$each.push(doc.$pushAll[field][i]);                                                           // 706
      }                                                                                                                // 707
      delete doc.$pushAll;                                                                                             // 708
    }                                                                                                                  // 709
  }                                                                                                                    // 710
                                                                                                                       // 711
  var mDoc = new MongoObject(doc, self._blackboxKeys);                                                                 // 712
                                                                                                                       // 713
  // Clean loop                                                                                                        // 714
  if (options.filter || options.autoConvert || options.removeEmptyStrings || options.trimStrings) {                    // 715
    mDoc.forEachNode(function() {                                                                                      // 716
      var gKey = this.genericKey, p, def, val;                                                                         // 717
      if (gKey) {                                                                                                      // 718
        def = self._schema[gKey];                                                                                      // 719
        val = this.value;                                                                                              // 720
        // Filter out props if necessary; any property is OK for $unset because we want to                             // 721
        // allow conversions to remove props that have been removed from the schema.                                   // 722
        if (options.filter && this.operator !== "$unset" && !self.allowsKey(gKey)) {                                   // 723
          // XXX Special handling for $each; maybe this could be made nicer                                            // 724
          if (this.position.slice(-7) === "[$each]") {                                                                 // 725
            mDoc.removeValueForPosition(this.position.slice(0, -7));                                                   // 726
          } else {                                                                                                     // 727
            this.remove();                                                                                             // 728
          }                                                                                                            // 729
          if (SimpleSchema.debug) {                                                                                    // 730
            console.info('SimpleSchema.clean: filtered out value that would have affected key "' + gKey + '", which is not allowed by the schema');
          }                                                                                                            // 732
          return; // no reason to do more                                                                              // 733
        }                                                                                                              // 734
        if (val !== void 0) {                                                                                          // 735
          // Autoconvert values if requested and if possible                                                           // 736
          var wasAutoConverted = false;                                                                                // 737
          if (options.autoConvert && this.operator !== "$unset" && def) {                                              // 738
            var newVal = typeconvert(val, def.type);                                                                   // 739
            // trim strings                                                                                            // 740
            if (options.trimStrings && typeof newVal === "string") {                                                   // 741
              newVal = S(newVal).trim().s;                                                                             // 742
            }                                                                                                          // 743
            if (newVal !== void 0 && newVal !== val) {                                                                 // 744
              // remove empty strings                                                                                  // 745
              if (options.removeEmptyStrings && (!this.operator || this.operator === "$set") && typeof newVal === "string" && !newVal.length) {
                // For a document, we remove any fields that are being set to an empty string                          // 747
                newVal = void 0;                                                                                       // 748
                // For a modifier, we $unset any fields that are being set to an empty string                          // 749
                if (this.operator === "$set" && this.position.match(/\[.+?\]/g).length < 2) {                          // 750
                                                                                                                       // 751
                  p = this.position.replace("$set", "$unset");                                                         // 752
                  mDoc.setValueForPosition(p, "");                                                                     // 753
                }                                                                                                      // 754
              }                                                                                                        // 755
                                                                                                                       // 756
              // Change value; if undefined, will remove it                                                            // 757
              SimpleSchema.debug && console.info('SimpleSchema.clean: autoconverted value ' + val + ' from ' + typeof val + ' to ' + typeof newVal + ' for ' + gKey);
              this.updateValue(newVal);                                                                                // 759
              wasAutoConverted = true;                                                                                 // 760
            }                                                                                                          // 761
          }                                                                                                            // 762
          if (!wasAutoConverted) {                                                                                     // 763
            // trim strings                                                                                            // 764
            if (options.trimStrings && typeof val === "string" && (!def || (def && def.trim !== false))) {             // 765
              this.updateValue(S(val).trim().s);                                                                       // 766
            }                                                                                                          // 767
            // remove empty strings                                                                                    // 768
            if (options.removeEmptyStrings && (!this.operator || this.operator === "$set") && typeof val === "string" && !val.length) {
              // For a document, we remove any fields that are being set to an empty string                            // 770
              this.remove();                                                                                           // 771
              // For a modifier, we $unset any fields that are being set to an empty string. But only if we're not already within an entire object that is being set.
              if (this.operator === "$set" && this.position.match(/\[.+?\]/g).length < 2) {                            // 773
                p = this.position.replace("$set", "$unset");                                                           // 774
                mDoc.setValueForPosition(p, "");                                                                       // 775
              }                                                                                                        // 776
            }                                                                                                          // 777
          }                                                                                                            // 778
        }                                                                                                              // 779
      }                                                                                                                // 780
    }, {endPointsOnly: false});                                                                                        // 781
  }                                                                                                                    // 782
                                                                                                                       // 783
  // Set automatic values                                                                                              // 784
  options.getAutoValues && getAutoValues.call(self, mDoc, options.isModifier, options.extendAutoValueContext);         // 785
                                                                                                                       // 786
  // Ensure we don't have any operators set to an empty object                                                         // 787
  // since MongoDB 2.6+ will throw errors.                                                                             // 788
  if (options.isModifier) {                                                                                            // 789
    for (var op in doc) {                                                                                              // 790
      if (doc.hasOwnProperty(op) && _.isEmpty(doc[op])) {                                                              // 791
        delete doc[op];                                                                                                // 792
      }                                                                                                                // 793
    }                                                                                                                  // 794
  }                                                                                                                    // 795
                                                                                                                       // 796
  return doc;                                                                                                          // 797
};                                                                                                                     // 798
                                                                                                                       // 799
// Returns the entire schema object or just the definition for one key                                                 // 800
// in the schema.                                                                                                      // 801
SimpleSchema.prototype.schema = function(key) {                                                                        // 802
  var self = this;                                                                                                     // 803
  // if not null or undefined (more specific)                                                                          // 804
  if (key !== null && key !== void 0) {                                                                                // 805
    return self._schema[SimpleSchema._makeGeneric(key)];                                                               // 806
  } else {                                                                                                             // 807
    return self._schema;                                                                                               // 808
  }                                                                                                                    // 809
};                                                                                                                     // 810
                                                                                                                       // 811
// Returns the evaluated definition for one key in the schema                                                          // 812
// key = non-generic key                                                                                               // 813
// [propList] = props to include in the result, for performance                                                        // 814
// [functionContext] = used for evaluating schema options that are functions                                           // 815
SimpleSchema.prototype.getDefinition = function(key, propList, functionContext) {                                      // 816
  var self = this;                                                                                                     // 817
  var defs = self.schema(key);                                                                                         // 818
  if (!defs) {                                                                                                         // 819
    return;                                                                                                            // 820
  }                                                                                                                    // 821
                                                                                                                       // 822
  if (_.isArray(propList)) {                                                                                           // 823
    defs = _.pick(defs, propList);                                                                                     // 824
  } else {                                                                                                             // 825
    defs = _.clone(defs);                                                                                              // 826
  }                                                                                                                    // 827
                                                                                                                       // 828
  // For any options that support specifying a function,                                                               // 829
  // evaluate the functions.                                                                                           // 830
  _.each(['min', 'max', 'minCount', 'maxCount', 'allowedValues', 'optional', 'label'], function (prop) {               // 831
    if (_.isFunction(defs[prop])) {                                                                                    // 832
      defs[prop] = defs[prop].call(functionContext || {});                                                             // 833
    }                                                                                                                  // 834
  });                                                                                                                  // 835
                                                                                                                       // 836
  // Inflect label if not defined                                                                                      // 837
  defs.label = defs.label || inflectedLabel(key);                                                                      // 838
                                                                                                                       // 839
  return defs;                                                                                                         // 840
};                                                                                                                     // 841
                                                                                                                       // 842
// Check if the key is a nested dot-syntax key inside of a blackbox object                                             // 843
SimpleSchema.prototype.keyIsInBlackBox = function(key) {                                                               // 844
  var self = this;                                                                                                     // 845
  var parentPath = SimpleSchema._makeGeneric(key), lastDot, def;                                                       // 846
                                                                                                                       // 847
  // Iterate the dot-syntax hierarchy until we find a key in our schema                                                // 848
  do {                                                                                                                 // 849
    lastDot = parentPath.lastIndexOf('.');                                                                             // 850
    if (lastDot !== -1) {                                                                                              // 851
      parentPath = parentPath.slice(0, lastDot); // Remove last path component                                         // 852
      def = self.getDefinition(parentPath);                                                                            // 853
    }                                                                                                                  // 854
  } while (lastDot !== -1 && !def);                                                                                    // 855
                                                                                                                       // 856
  return !!(def && def.blackbox);                                                                                      // 857
};                                                                                                                     // 858
                                                                                                                       // 859
// Use to dynamically change the schema labels.                                                                        // 860
SimpleSchema.prototype.labels = function(labels) {                                                                     // 861
  var self = this;                                                                                                     // 862
  _.each(labels, function(label, fieldName) {                                                                          // 863
    if (!_.isString(label) && !_.isFunction(label)) {                                                                  // 864
      return;                                                                                                          // 865
    }                                                                                                                  // 866
                                                                                                                       // 867
    if (!(fieldName in self._schema)) {                                                                                // 868
      return;                                                                                                          // 869
    }                                                                                                                  // 870
                                                                                                                       // 871
    self._schema[fieldName].label = label;                                                                             // 872
    self._depsLabels[fieldName] && self._depsLabels[fieldName].changed();                                              // 873
  });                                                                                                                  // 874
};                                                                                                                     // 875
                                                                                                                       // 876
// should be used to safely get a label as string                                                                      // 877
SimpleSchema.prototype.label = function(key) {                                                                         // 878
  var self = this;                                                                                                     // 879
                                                                                                                       // 880
  // Get all labels                                                                                                    // 881
  if (key === null || key === void 0) {                                                                                // 882
    var result = {};                                                                                                   // 883
    _.each(self.schema(), function(def, fieldName) {                                                                   // 884
      result[fieldName] = self.label(fieldName);                                                                       // 885
    });                                                                                                                // 886
    return result;                                                                                                     // 887
  }                                                                                                                    // 888
                                                                                                                       // 889
  // Get label for one field                                                                                           // 890
  var def = self.getDefinition(key);                                                                                   // 891
  if (def) {                                                                                                           // 892
    var genericKey = SimpleSchema._makeGeneric(key);                                                                   // 893
    self._depsLabels[genericKey] && self._depsLabels[genericKey].depend();                                             // 894
    return def.label;                                                                                                  // 895
  }                                                                                                                    // 896
                                                                                                                       // 897
  return null;                                                                                                         // 898
};                                                                                                                     // 899
                                                                                                                       // 900
// Global messages                                                                                                     // 901
                                                                                                                       // 902
SimpleSchema._globalMessages = {                                                                                       // 903
  required: "[label] is required",                                                                                     // 904
  minString: "[label] must be at least [min] characters",                                                              // 905
  maxString: "[label] cannot exceed [max] characters",                                                                 // 906
  minNumber: "[label] must be at least [min]",                                                                         // 907
  maxNumber: "[label] cannot exceed [max]",                                                                            // 908
  minNumberExclusive: "[label] must be greater than [min]",                                                            // 909
  maxNumberExclusive: "[label] must be less than [max]",                                                               // 910
  minDate: "[label] must be on or after [min]",                                                                        // 911
  maxDate: "[label] cannot be after [max]",                                                                            // 912
  badDate: "[label] is not a valid date",                                                                              // 913
  minCount: "You must specify at least [minCount] values",                                                             // 914
  maxCount: "You cannot specify more than [maxCount] values",                                                          // 915
  noDecimal: "[label] must be an integer",                                                                             // 916
  notAllowed: "[value] is not an allowed value",                                                                       // 917
  expectedString: "[label] must be a string",                                                                          // 918
  expectedNumber: "[label] must be a number",                                                                          // 919
  expectedBoolean: "[label] must be a boolean",                                                                        // 920
  expectedArray: "[label] must be an array",                                                                           // 921
  expectedObject: "[label] must be an object",                                                                         // 922
  expectedConstructor: "[label] must be a [type]",                                                                     // 923
  regEx: [                                                                                                             // 924
    {msg: "[label] failed regular expression validation"},                                                             // 925
    {exp: SimpleSchema.RegEx.Email, msg: "[label] must be a valid e-mail address"},                                    // 926
    {exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address"},                                // 927
    {exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain"},                                           // 928
    {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain"},                                       // 929
    {exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address"},                                 // 930
    {exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address"},                                       // 931
    {exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address"},                                       // 932
    {exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL"},                                                 // 933
    {exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID"}                                       // 934
  ],                                                                                                                   // 935
  keyNotInSchema: "[key] is not allowed by the schema"                                                                 // 936
};                                                                                                                     // 937
                                                                                                                       // 938
SimpleSchema.messages = function(messages) {                                                                           // 939
  _.extend(SimpleSchema._globalMessages, messages);                                                                    // 940
  SimpleSchema._depsGlobalMessages.changed();                                                                          // 941
};                                                                                                                     // 942
                                                                                                                       // 943
// Schema-specific messages                                                                                            // 944
                                                                                                                       // 945
SimpleSchema.prototype.messages = function(messages) {                                                                 // 946
  var self = this;                                                                                                     // 947
  _.extend(self._messages, messages);                                                                                  // 948
  self._depsMessages.changed();                                                                                        // 949
};                                                                                                                     // 950
                                                                                                                       // 951
// Returns a string message for the given error type and key. Uses the                                                 // 952
// def and value arguments to fill in placeholders in the error messages.                                              // 953
SimpleSchema.prototype.messageForError = function(type, key, def, value) {                                             // 954
  var self = this;                                                                                                     // 955
                                                                                                                       // 956
  // We proceed even if we can't get a definition because it might be a keyNotInSchema error                           // 957
  def = def || self.getDefinition(key, ['regEx', 'label', 'minCount', 'maxCount', 'min', 'max', 'type']) || {};        // 958
                                                                                                                       // 959
  // Adjust for complex types, currently only regEx,                                                                   // 960
  // where we might have regEx.1 meaning the second                                                                    // 961
  // expression in the array.                                                                                          // 962
  var firstTypePeriod = type.indexOf("."), index = null;                                                               // 963
  if (firstTypePeriod !== -1) {                                                                                        // 964
    index = type.substring(firstTypePeriod + 1);                                                                       // 965
    index = parseInt(index, 10);                                                                                       // 966
    type = type.substring(0, firstTypePeriod);                                                                         // 967
  }                                                                                                                    // 968
                                                                                                                       // 969
  // Which regExp is it?                                                                                               // 970
  var regExpMatch;                                                                                                     // 971
  if (type === "regEx") {                                                                                              // 972
    if (index !== null && index !== void 0 && !isNaN(index)) {                                                         // 973
      regExpMatch = def.regEx[index];                                                                                  // 974
    } else {                                                                                                           // 975
      regExpMatch = def.regEx;                                                                                         // 976
    }                                                                                                                  // 977
    if (regExpMatch) {                                                                                                 // 978
      regExpMatch = regExpMatch.toString();                                                                            // 979
    }                                                                                                                  // 980
  }                                                                                                                    // 981
                                                                                                                       // 982
  // Prep some strings to be used when finding the correct message for this error                                      // 983
  var typePlusKey = type + " " + key;                                                                                  // 984
  var genericKey = SimpleSchema._makeGeneric(key);                                                                     // 985
  var typePlusGenKey = type + " " + genericKey;                                                                        // 986
                                                                                                                       // 987
  // reactively update when message templates are changed                                                              // 988
  SimpleSchema._depsGlobalMessages.depend();                                                                           // 989
  self._depsMessages.depend();                                                                                         // 990
                                                                                                                       // 991
  // Prep a function that finds the correct message for regEx errors                                                   // 992
  function findRegExError(message) {                                                                                   // 993
    if (type !== "regEx" || !_.isArray(message)) {                                                                     // 994
      return message;                                                                                                  // 995
    }                                                                                                                  // 996
    // Parse regEx messages, which are provided in a special object array format                                       // 997
    // [{exp: RegExp, msg: "Foo"}]                                                                                     // 998
    // Where `exp` is optional                                                                                         // 999
                                                                                                                       // 1000
    var msgObj;                                                                                                        // 1001
    // First see if there's one where exp matches this expression                                                      // 1002
    if (regExpMatch) {                                                                                                 // 1003
      msgObj = _.find(message, function (o) {                                                                          // 1004
        return o.exp && o.exp.toString() === regExpMatch;                                                              // 1005
      });                                                                                                              // 1006
    }                                                                                                                  // 1007
                                                                                                                       // 1008
    // If not, see if there's a default message defined                                                                // 1009
    if (!msgObj) {                                                                                                     // 1010
      msgObj = _.findWhere(message, {exp: null});                                                                      // 1011
      if (!msgObj) {                                                                                                   // 1012
        msgObj = _.findWhere(message, {exp: void 0});                                                                  // 1013
      }                                                                                                                // 1014
    }                                                                                                                  // 1015
                                                                                                                       // 1016
    return msgObj ? msgObj.msg : null;                                                                                 // 1017
  }                                                                                                                    // 1018
                                                                                                                       // 1019
  // Try finding the correct message to use at various levels, from most                                               // 1020
  // specific to least specific.                                                                                       // 1021
  var message = self._messages[typePlusKey] ||                  // (1) Use schema-specific message for specific key    // 1022
                self._messages[typePlusGenKey] ||               // (2) Use schema-specific message for generic key     // 1023
                self._messages[type];                           // (3) Use schema-specific message for type            // 1024
  message = findRegExError(message);                                                                                   // 1025
                                                                                                                       // 1026
  if (!message) {                                                                                                      // 1027
    message = SimpleSchema._globalMessages[typePlusKey] ||      // (4) Use global message for specific key             // 1028
              SimpleSchema._globalMessages[typePlusGenKey] ||   // (5) Use global message for generic key              // 1029
              SimpleSchema._globalMessages[type];               // (6) Use global message for type                     // 1030
    message = findRegExError(message);                                                                                 // 1031
  }                                                                                                                    // 1032
                                                                                                                       // 1033
  if (!message) {                                                                                                      // 1034
    return "Unknown validation error";                                                                                 // 1035
  }                                                                                                                    // 1036
                                                                                                                       // 1037
  // Now replace all placeholders in the message with the correct values                                               // 1038
                                                                                                                       // 1039
  // [key]                                                                                                             // 1040
  message = message.replace("[key]", key);                                                                             // 1041
                                                                                                                       // 1042
  // [label]                                                                                                           // 1043
  // The call to self.label() establishes a reactive dependency, too                                                   // 1044
  message = message.replace("[label]", self.label(key));                                                               // 1045
                                                                                                                       // 1046
  // [minCount]                                                                                                        // 1047
  if (typeof def.minCount !== "undefined") {                                                                           // 1048
    message = message.replace("[minCount]", def.minCount);                                                             // 1049
  }                                                                                                                    // 1050
                                                                                                                       // 1051
  // [maxCount]                                                                                                        // 1052
  if (typeof def.maxCount !== "undefined") {                                                                           // 1053
    message = message.replace("[maxCount]", def.maxCount);                                                             // 1054
  }                                                                                                                    // 1055
                                                                                                                       // 1056
  // [value]                                                                                                           // 1057
  if (value !== void 0 && value !== null) {                                                                            // 1058
    message = message.replace("[value]", value.toString());                                                            // 1059
  } else {                                                                                                             // 1060
    message = message.replace("[value]", 'null');                                                                      // 1061
  }                                                                                                                    // 1062
                                                                                                                       // 1063
  // [min] and [max]                                                                                                   // 1064
  var min = def.min;                                                                                                   // 1065
  var max = def.max;                                                                                                   // 1066
  if (def.type === Date || def.type === [Date]) {                                                                      // 1067
    if (typeof min !== "undefined") {                                                                                  // 1068
      message = message.replace("[min]", Utility.dateToDateString(min));                                               // 1069
    }                                                                                                                  // 1070
    if (typeof max !== "undefined") {                                                                                  // 1071
      message = message.replace("[max]", Utility.dateToDateString(max));                                               // 1072
    }                                                                                                                  // 1073
  } else {                                                                                                             // 1074
    if (typeof min !== "undefined") {                                                                                  // 1075
      message = message.replace("[min]", min);                                                                         // 1076
    }                                                                                                                  // 1077
    if (typeof max !== "undefined") {                                                                                  // 1078
      message = message.replace("[max]", max);                                                                         // 1079
    }                                                                                                                  // 1080
  }                                                                                                                    // 1081
                                                                                                                       // 1082
  // [type]                                                                                                            // 1083
  if (def.type instanceof Function) {                                                                                  // 1084
    message = message.replace("[type]", def.type.name);                                                                // 1085
  }                                                                                                                    // 1086
                                                                                                                       // 1087
  // Now return the message                                                                                            // 1088
  return message;                                                                                                      // 1089
};                                                                                                                     // 1090
                                                                                                                       // 1091
// Returns true if key is explicitly allowed by the schema or implied                                                  // 1092
// by other explicitly allowed keys.                                                                                   // 1093
// The key string should have $ in place of any numeric array positions.                                               // 1094
SimpleSchema.prototype.allowsKey = function(key) {                                                                     // 1095
  var self = this;                                                                                                     // 1096
                                                                                                                       // 1097
  // Loop through all keys in the schema                                                                               // 1098
  return _.any(self._schemaKeys, function(schemaKey) {                                                                 // 1099
                                                                                                                       // 1100
    // If the schema key is the test key, it's allowed.                                                                // 1101
    if (schemaKey === key) {                                                                                           // 1102
      return true;                                                                                                     // 1103
    }                                                                                                                  // 1104
                                                                                                                       // 1105
    // Black box handling                                                                                              // 1106
    if (self.schema(schemaKey).blackbox === true) {                                                                    // 1107
      var kl = schemaKey.length;                                                                                       // 1108
      var compare1 = key.slice(0, kl + 2);                                                                             // 1109
      var compare2 = compare1.slice(0, -1);                                                                            // 1110
                                                                                                                       // 1111
      // If the test key is the black box key + ".$", then the test                                                    // 1112
      // key is NOT allowed because black box keys are by definition                                                   // 1113
      // only for objects, and not for arrays.                                                                         // 1114
      if (compare1 === schemaKey + '.$') {                                                                             // 1115
        return false;                                                                                                  // 1116
      }                                                                                                                // 1117
                                                                                                                       // 1118
      // Otherwise                                                                                                     // 1119
      if (compare2 === schemaKey + '.') {                                                                              // 1120
        return true;                                                                                                   // 1121
      }                                                                                                                // 1122
    }                                                                                                                  // 1123
                                                                                                                       // 1124
    return false;                                                                                                      // 1125
  });                                                                                                                  // 1126
};                                                                                                                     // 1127
                                                                                                                       // 1128
SimpleSchema.prototype.newContext = function() {                                                                       // 1129
  return new SimpleSchemaValidationContext(this);                                                                      // 1130
};                                                                                                                     // 1131
                                                                                                                       // 1132
// Returns all the child keys for the object identified by the generic prefix,                                         // 1133
// or all the top level keys if no prefix is supplied.                                                                 // 1134
SimpleSchema.prototype.objectKeys = function(keyPrefix) {                                                              // 1135
  var self = this;                                                                                                     // 1136
  if (!keyPrefix) {                                                                                                    // 1137
    return self._firstLevelSchemaKeys;                                                                                 // 1138
  }                                                                                                                    // 1139
  return self._objectKeys[keyPrefix + "."] || [];                                                                      // 1140
};                                                                                                                     // 1141
                                                                                                                       // 1142
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:simple-schema/simple-schema-validation.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* global Utility */                                                                                                   // 1
/* global _ */                                                                                                         // 2
/* global SimpleSchema */                                                                                              // 3
/* global MongoObject */                                                                                               // 4
/* global doValidation1:true */                                                                                        // 5
                                                                                                                       // 6
function doTypeChecks(def, keyValue, op) {                                                                             // 7
  var expectedType = def.type;                                                                                         // 8
                                                                                                                       // 9
  // String checks                                                                                                     // 10
  if (expectedType === String) {                                                                                       // 11
    if (typeof keyValue !== "string") {                                                                                // 12
      return "expectedString";                                                                                         // 13
    } else if (def.max !== null && def.max < keyValue.length) {                                                        // 14
      return "maxString";                                                                                              // 15
    } else if (def.min !== null && def.min > keyValue.length) {                                                        // 16
      return "minString";                                                                                              // 17
    } else if (def.regEx instanceof RegExp && !def.regEx.test(keyValue)) {                                             // 18
      return "regEx";                                                                                                  // 19
    } else if (_.isArray(def.regEx)) {                                                                                 // 20
      var regExError;                                                                                                  // 21
      _.every(def.regEx, function(re, i) {                                                                             // 22
        if (!re.test(keyValue)) {                                                                                      // 23
          regExError = "regEx." + i;                                                                                   // 24
          return false;                                                                                                // 25
        }                                                                                                              // 26
        return true;                                                                                                   // 27
      });                                                                                                              // 28
      if (regExError) {                                                                                                // 29
        return regExError;                                                                                             // 30
      }                                                                                                                // 31
    }                                                                                                                  // 32
  }                                                                                                                    // 33
                                                                                                                       // 34
  // Number checks                                                                                                     // 35
  else if (expectedType === Number) {                                                                                  // 36
    if (typeof keyValue !== "number" || isNaN(keyValue)) {                                                             // 37
      return "expectedNumber";                                                                                         // 38
    } else if (op !== "$inc" && def.max !== null && (!!def.exclusiveMax ? def.max <= keyValue : def.max < keyValue)) { // 39
       return !!def.exclusiveMax ? "maxNumberExclusive" : "maxNumber";                                                 // 40
    } else if (op !== "$inc" && def.min !== null && (!!def.exclusiveMin ? def.min >= keyValue : def.min > keyValue)) { // 41
       return !!def.exclusiveMin ? "minNumberExclusive" : "minNumber";                                                 // 42
    } else if (!def.decimal && keyValue.toString().indexOf(".") > -1) {                                                // 43
      return "noDecimal";                                                                                              // 44
    }                                                                                                                  // 45
  }                                                                                                                    // 46
                                                                                                                       // 47
  // Boolean checks                                                                                                    // 48
  else if (expectedType === Boolean) {                                                                                 // 49
    if (typeof keyValue !== "boolean") {                                                                               // 50
      return "expectedBoolean";                                                                                        // 51
    }                                                                                                                  // 52
  }                                                                                                                    // 53
                                                                                                                       // 54
  // Object checks                                                                                                     // 55
  else if (expectedType === Object) {                                                                                  // 56
    if (!Utility.isBasicObject(keyValue)) {                                                                            // 57
      return "expectedObject";                                                                                         // 58
    }                                                                                                                  // 59
  }                                                                                                                    // 60
                                                                                                                       // 61
  // Array checks                                                                                                      // 62
  else if (expectedType === Array) {                                                                                   // 63
    if (!_.isArray(keyValue)) {                                                                                        // 64
      return "expectedArray";                                                                                          // 65
    } else if (def.minCount !== null && keyValue.length < def.minCount) {                                              // 66
      return "minCount";                                                                                               // 67
    } else if (def.maxCount !== null && keyValue.length > def.maxCount) {                                              // 68
      return "maxCount";                                                                                               // 69
    }                                                                                                                  // 70
  }                                                                                                                    // 71
                                                                                                                       // 72
  // Constructor function checks                                                                                       // 73
  else if (expectedType instanceof Function || Utility.safariBugFix(expectedType)) {                                   // 74
                                                                                                                       // 75
    // Generic constructor checks                                                                                      // 76
    if (!(keyValue instanceof expectedType)) {                                                                         // 77
      return "expectedConstructor";                                                                                    // 78
    }                                                                                                                  // 79
                                                                                                                       // 80
    // Date checks                                                                                                     // 81
    else if (expectedType === Date) {                                                                                  // 82
      if (isNaN(keyValue.getTime())) {                                                                                 // 83
        return "badDate";                                                                                              // 84
      }                                                                                                                // 85
                                                                                                                       // 86
      if (_.isDate(def.min) && def.min.getTime() > keyValue.getTime()) {                                               // 87
        return "minDate";                                                                                              // 88
      } else if (_.isDate(def.max) && def.max.getTime() < keyValue.getTime()) {                                        // 89
        return "maxDate";                                                                                              // 90
      }                                                                                                                // 91
    }                                                                                                                  // 92
  }                                                                                                                    // 93
                                                                                                                       // 94
}                                                                                                                      // 95
                                                                                                                       // 96
doValidation1 = function doValidation1(obj, isModifier, isUpsert, keyToValidate, ss, extendedCustomContext) {          // 97
  // First do some basic checks of the object, and throw errors if necessary                                           // 98
  if (!_.isObject(obj)) {                                                                                              // 99
    throw new Error("The first argument of validate() or validateOne() must be an object");                            // 100
  }                                                                                                                    // 101
                                                                                                                       // 102
  if (!isModifier && Utility.looksLikeModifier(obj)) {                                                                 // 103
    throw new Error("When the validation object contains mongo operators, you must set the modifier option to true");  // 104
  }                                                                                                                    // 105
                                                                                                                       // 106
  var invalidKeys = [];                                                                                                // 107
  var mDoc; // for caching the MongoObject if necessary                                                                // 108
                                                                                                                       // 109
  // Validation function called for each affected key                                                                  // 110
  function validate(val, affectedKey, affectedKeyGeneric, def, op, skipRequiredCheck, isInArrayItemObject, isInSubObject) {
                                                                                                                       // 112
    // Get the schema for this key, marking invalid if there isn't one.                                                // 113
    if (!def) {                                                                                                        // 114
      invalidKeys.push(Utility.errorObject("keyNotInSchema", affectedKey, val, def, ss));                              // 115
      return;                                                                                                          // 116
    }                                                                                                                  // 117
                                                                                                                       // 118
    // Check for missing required values. The general logic is this:                                                   // 119
    // * If the operator is $unset or $rename, it's invalid.                                                           // 120
    // * If the value is null, it's invalid.                                                                           // 121
    // * If the value is undefined and one of the following are true, it's invalid:                                    // 122
    //     * We're validating a key of a sub-object.                                                                   // 123
    //     * We're validating a key of an object that is an array item.                                                // 124
    //     * We're validating a document (as opposed to a modifier).                                                   // 125
    //     * We're validating a key under the $set operator in a modifier, and it's an upsert.                         // 126
    if (!skipRequiredCheck && !def.optional) {                                                                         // 127
      if (                                                                                                             // 128
        val === null ||                                                                                                // 129
        op === "$unset" ||                                                                                             // 130
        op === "$rename" ||                                                                                            // 131
        (val === void 0 && (isInArrayItemObject || isInSubObject || !op || op === "$set"))                             // 132
        ) {                                                                                                            // 133
        invalidKeys.push(Utility.errorObject("required", affectedKey, null, def, ss));                                 // 134
        return;                                                                                                        // 135
      }                                                                                                                // 136
    }                                                                                                                  // 137
                                                                                                                       // 138
    // For $rename, make sure that the new name is allowed by the schema                                               // 139
    if (op === "$rename" && typeof val === "string" && !ss.allowsKey(val)) {                                           // 140
      invalidKeys.push(Utility.errorObject("keyNotInSchema", val, null, null, ss));                                    // 141
      return;                                                                                                          // 142
    }                                                                                                                  // 143
                                                                                                                       // 144
    // Value checks are not necessary for null or undefined values                                                     // 145
    // or for $unset or $rename values                                                                                 // 146
    if (op !== "$unset" && op !== "$rename" && Utility.isNotNullOrUndefined(val)) {                                    // 147
                                                                                                                       // 148
      // Check that value is of the correct type                                                                       // 149
      var typeError = doTypeChecks(def, val, op);                                                                      // 150
      if (typeError) {                                                                                                 // 151
        invalidKeys.push(Utility.errorObject(typeError, affectedKey, val, def, ss));                                   // 152
        return;                                                                                                        // 153
      }                                                                                                                // 154
                                                                                                                       // 155
      // Check value against allowedValues array                                                                       // 156
      if (def.allowedValues && !_.contains(def.allowedValues, val)) {                                                  // 157
        invalidKeys.push(Utility.errorObject("notAllowed", affectedKey, val, def, ss));                                // 158
        return;                                                                                                        // 159
      }                                                                                                                // 160
                                                                                                                       // 161
    }                                                                                                                  // 162
                                                                                                                       // 163
    // Perform custom validation                                                                                       // 164
    var lastDot = affectedKey.lastIndexOf('.');                                                                        // 165
    var fieldParentName = lastDot === -1 ? '' : affectedKey.slice(0, lastDot + 1);                                     // 166
    var validators = def.custom ? [def.custom] : [];                                                                   // 167
    validators = validators.concat(ss._validators).concat(SimpleSchema._validators);                                   // 168
    _.every(validators, function(validator) {                                                                          // 169
      var errorType = validator.call(_.extend({                                                                        // 170
        key: affectedKey,                                                                                              // 171
        genericKey: affectedKeyGeneric,                                                                                // 172
        definition: def,                                                                                               // 173
        isSet: (val !== void 0),                                                                                       // 174
        value: val,                                                                                                    // 175
        operator: op,                                                                                                  // 176
        field: function(fName) {                                                                                       // 177
          mDoc = mDoc || new MongoObject(obj, ss._blackboxKeys); //create if necessary, cache for speed                // 178
          var keyInfo = mDoc.getInfoForKey(fName) || {};                                                               // 179
          return {                                                                                                     // 180
            isSet: (keyInfo.value !== void 0),                                                                         // 181
            value: keyInfo.value,                                                                                      // 182
            operator: keyInfo.operator                                                                                 // 183
          };                                                                                                           // 184
        },                                                                                                             // 185
        siblingField: function(fName) {                                                                                // 186
          mDoc = mDoc || new MongoObject(obj, ss._blackboxKeys); //create if necessary, cache for speed                // 187
          var keyInfo = mDoc.getInfoForKey(fieldParentName + fName) || {};                                             // 188
          return {                                                                                                     // 189
            isSet: (keyInfo.value !== void 0),                                                                         // 190
            value: keyInfo.value,                                                                                      // 191
            operator: keyInfo.operator                                                                                 // 192
          };                                                                                                           // 193
        }                                                                                                              // 194
      }, extendedCustomContext || {}));                                                                                // 195
      if (typeof errorType === "string") {                                                                             // 196
        invalidKeys.push(Utility.errorObject(errorType, affectedKey, val, def, ss));                                   // 197
        return false;                                                                                                  // 198
      }                                                                                                                // 199
      return true;                                                                                                     // 200
    });                                                                                                                // 201
  }                                                                                                                    // 202
                                                                                                                       // 203
  // The recursive function                                                                                            // 204
  function checkObj(val, affectedKey, operator, setKeys, isInArrayItemObject, isInSubObject) {                         // 205
    var affectedKeyGeneric, def;                                                                                       // 206
                                                                                                                       // 207
    if (affectedKey) {                                                                                                 // 208
      // When we hit a blackbox key, we don't progress any further                                                     // 209
      if (ss.keyIsInBlackBox(affectedKey)) {                                                                           // 210
        return;                                                                                                        // 211
      }                                                                                                                // 212
                                                                                                                       // 213
      // Make a generic version of the affected key, and use that                                                      // 214
      // to get the schema for this key.                                                                               // 215
      affectedKeyGeneric = SimpleSchema._makeGeneric(affectedKey);                                                     // 216
      def = ss.getDefinition(affectedKey);                                                                             // 217
                                                                                                                       // 218
      // Perform validation for this key                                                                               // 219
      if (!keyToValidate || keyToValidate === affectedKey || keyToValidate === affectedKeyGeneric) {                   // 220
        // We can skip the required check for keys that are ancestors                                                  // 221
        // of those in $set or $setOnInsert because they will be created                                               // 222
        // by MongoDB while setting.                                                                                   // 223
        var skipRequiredCheck = _.some(setKeys, function(sk) {                                                         // 224
          return (sk.slice(0, affectedKey.length + 1) === affectedKey + ".");                                          // 225
        });                                                                                                            // 226
        validate(val, affectedKey, affectedKeyGeneric, def, operator, skipRequiredCheck, isInArrayItemObject, isInSubObject);
      }                                                                                                                // 228
    }                                                                                                                  // 229
                                                                                                                       // 230
    // Temporarily convert missing objects to empty objects                                                            // 231
    // so that the looping code will be called and required                                                            // 232
    // descendent keys can be validated.                                                                               // 233
    if ((val === void 0 || val === null) && (!def || (def.type === Object && !def.optional))) {                        // 234
      val = {};                                                                                                        // 235
    }                                                                                                                  // 236
                                                                                                                       // 237
    // Loop through arrays                                                                                             // 238
    if (_.isArray(val)) {                                                                                              // 239
      _.each(val, function(v, i) {                                                                                     // 240
        checkObj(v, affectedKey + '.' + i, operator, setKeys);                                                         // 241
      });                                                                                                              // 242
    }                                                                                                                  // 243
                                                                                                                       // 244
    // Loop through object keys                                                                                        // 245
    else if (Utility.isBasicObject(val) && (!def || !def.blackbox)) {                                                  // 246
                                                                                                                       // 247
      // Get list of present keys                                                                                      // 248
      var presentKeys = _.keys(val);                                                                                   // 249
                                                                                                                       // 250
      // Check all present keys plus all keys defined by the schema.                                                   // 251
      // This allows us to detect extra keys not allowed by the schema plus                                            // 252
      // any missing required keys, and to run any custom functions for other keys.                                    // 253
      var keysToCheck = _.union(presentKeys, ss.objectKeys(affectedKeyGeneric));                                       // 254
                                                                                                                       // 255
      // If this object is within an array, make sure we check for                                                     // 256
      // required as if it's not a modifier                                                                            // 257
      isInArrayItemObject = (affectedKeyGeneric && affectedKeyGeneric.slice(-2) === ".$");                             // 258
                                                                                                                       // 259
      // Check all keys in the merged list                                                                             // 260
      _.each(keysToCheck, function(key) {                                                                              // 261
        checkObj(val[key], Utility.appendAffectedKey(affectedKey, key), operator, setKeys, isInArrayItemObject, true); // 262
      });                                                                                                              // 263
    }                                                                                                                  // 264
                                                                                                                       // 265
  }                                                                                                                    // 266
                                                                                                                       // 267
  function checkModifier(mod) {                                                                                        // 268
    // Check for empty modifier                                                                                        // 269
    if (_.isEmpty(mod)) {                                                                                              // 270
      throw new Error("When the modifier option is true, validation object must have at least one operator");          // 271
    }                                                                                                                  // 272
                                                                                                                       // 273
    // Get a list of all keys in $set and $setOnInsert combined, for use later                                         // 274
    var setKeys = _.keys(mod.$set || {}).concat(_.keys(mod.$setOnInsert || {}));                                       // 275
                                                                                                                       // 276
    // If this is an upsert, add all the $setOnInsert keys to $set;                                                    // 277
    // since we don't know whether it will be an insert or update, we'll                                               // 278
    // validate upserts as if they will be an insert.                                                                  // 279
    if ("$setOnInsert" in mod) {                                                                                       // 280
      if (isUpsert) {                                                                                                  // 281
        mod.$set = mod.$set || {};                                                                                     // 282
        mod.$set = _.extend(mod.$set, mod.$setOnInsert);                                                               // 283
      }                                                                                                                // 284
      delete mod.$setOnInsert;                                                                                         // 285
    }                                                                                                                  // 286
                                                                                                                       // 287
    // Loop through operators                                                                                          // 288
    _.each(mod, function (opObj, op) {                                                                                 // 289
      // If non-operators are mixed in, throw error                                                                    // 290
      if (op.slice(0, 1) !== "$") {                                                                                    // 291
        throw new Error("When the modifier option is true, all validation object keys must be operators. Did you forget `$set`?");
      }                                                                                                                // 293
      if (Utility.shouldCheck(op)) {                                                                                   // 294
        // For an upsert, missing props would not be set if an insert is performed,                                    // 295
        // so we add null keys to the modifier to force any "required" checks to fail                                  // 296
        if (isUpsert && op === "$set") {                                                                               // 297
          var presentKeys = _.keys(opObj);                                                                             // 298
          _.each(ss.objectKeys(), function (schemaKey) {                                                               // 299
            if (!_.contains(presentKeys, schemaKey)) {                                                                 // 300
              checkObj(void 0, schemaKey, op, setKeys);                                                                // 301
            }                                                                                                          // 302
          });                                                                                                          // 303
        }                                                                                                              // 304
        _.each(opObj, function (v, k) {                                                                                // 305
          if (op === "$push" || op === "$addToSet") {                                                                  // 306
            if (Utility.isBasicObject(v) && "$each" in v) {                                                            // 307
              v = v.$each;                                                                                             // 308
            } else {                                                                                                   // 309
              k = k + ".0";                                                                                            // 310
            }                                                                                                          // 311
          }                                                                                                            // 312
          checkObj(v, k, op, setKeys);                                                                                 // 313
        });                                                                                                            // 314
      }                                                                                                                // 315
    });                                                                                                                // 316
  }                                                                                                                    // 317
                                                                                                                       // 318
  // Kick off the validation                                                                                           // 319
  if (isModifier) {                                                                                                    // 320
    checkModifier(obj);                                                                                                // 321
  } else {                                                                                                             // 322
    checkObj(obj);                                                                                                     // 323
  }                                                                                                                    // 324
                                                                                                                       // 325
  // Make sure there is only one error per fieldName                                                                   // 326
  var addedFieldNames = [];                                                                                            // 327
  invalidKeys = _.filter(invalidKeys, function(errObj) {                                                               // 328
    if (!_.contains(addedFieldNames, errObj.name)) {                                                                   // 329
      addedFieldNames.push(errObj.name);                                                                               // 330
      return true;                                                                                                     // 331
    }                                                                                                                  // 332
    return false;                                                                                                      // 333
  });                                                                                                                  // 334
                                                                                                                       // 335
  return invalidKeys;                                                                                                  // 336
};                                                                                                                     // 337
                                                                                                                       // 338
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:simple-schema/simple-schema-validation-new.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* global Utility */                                                                                                   // 1
/* global _ */                                                                                                         // 2
/* global SimpleSchema */                                                                                              // 3
/* global MongoObject */                                                                                               // 4
/* global Meteor */                                                                                                    // 5
/* global Random */                                                                                                    // 6
/* global doValidation2:true */                                                                                        // 7
                                                                                                                       // 8
function doTypeChecks(def, keyValue, op) {                                                                             // 9
  var expectedType = def.type;                                                                                         // 10
                                                                                                                       // 11
  // String checks                                                                                                     // 12
  if (expectedType === String) {                                                                                       // 13
    if (typeof keyValue !== "string") {                                                                                // 14
      return "expectedString";                                                                                         // 15
    } else if (def.max !== null && def.max < keyValue.length) {                                                        // 16
      return "maxString";                                                                                              // 17
    } else if (def.min !== null && def.min > keyValue.length) {                                                        // 18
      return "minString";                                                                                              // 19
    } else if (def.regEx instanceof RegExp && !def.regEx.test(keyValue)) {                                             // 20
      return "regEx";                                                                                                  // 21
    } else if (_.isArray(def.regEx)) {                                                                                 // 22
      var regExError;                                                                                                  // 23
      _.every(def.regEx, function(re, i) {                                                                             // 24
        if (!re.test(keyValue)) {                                                                                      // 25
          regExError = "regEx." + i;                                                                                   // 26
          return false;                                                                                                // 27
        }                                                                                                              // 28
        return true;                                                                                                   // 29
      });                                                                                                              // 30
      if (regExError) {                                                                                                // 31
        return regExError;                                                                                             // 32
      }                                                                                                                // 33
    }                                                                                                                  // 34
  }                                                                                                                    // 35
                                                                                                                       // 36
  // Number checks                                                                                                     // 37
  else if (expectedType === Number) {                                                                                  // 38
    if (typeof keyValue !== "number" || isNaN(keyValue)) {                                                             // 39
      return "expectedNumber";                                                                                         // 40
    } else if (op !== "$inc" && def.max !== null && (!!def.exclusiveMax ? def.max <= keyValue : def.max < keyValue)) { // 41
       return !!def.exclusiveMax ? "maxNumberExclusive" : "maxNumber";                                                 // 42
    } else if (op !== "$inc" && def.min !== null && (!!def.exclusiveMin ? def.min >= keyValue : def.min > keyValue)) { // 43
       return !!def.exclusiveMin ? "minNumberExclusive" : "minNumber";                                                 // 44
    } else if (!def.decimal && keyValue.toString().indexOf(".") > -1) {                                                // 45
      return "noDecimal";                                                                                              // 46
    }                                                                                                                  // 47
  }                                                                                                                    // 48
                                                                                                                       // 49
  // Boolean checks                                                                                                    // 50
  else if (expectedType === Boolean) {                                                                                 // 51
    if (typeof keyValue !== "boolean") {                                                                               // 52
      return "expectedBoolean";                                                                                        // 53
    }                                                                                                                  // 54
  }                                                                                                                    // 55
                                                                                                                       // 56
  // Object checks                                                                                                     // 57
  else if (expectedType === Object) {                                                                                  // 58
    if (!Utility.isBasicObject(keyValue)) {                                                                            // 59
      return "expectedObject";                                                                                         // 60
    }                                                                                                                  // 61
  }                                                                                                                    // 62
                                                                                                                       // 63
  // Array checks                                                                                                      // 64
  else if (expectedType === Array) {                                                                                   // 65
    if (!_.isArray(keyValue)) {                                                                                        // 66
      return "expectedArray";                                                                                          // 67
    } else if (def.minCount !== null && keyValue.length < def.minCount) {                                              // 68
      return "minCount";                                                                                               // 69
    } else if (def.maxCount !== null && keyValue.length > def.maxCount) {                                              // 70
      return "maxCount";                                                                                               // 71
    }                                                                                                                  // 72
  }                                                                                                                    // 73
                                                                                                                       // 74
  // Constructor function checks                                                                                       // 75
  else if (expectedType instanceof Function || Utility.safariBugFix(expectedType)) {                                   // 76
                                                                                                                       // 77
    // Generic constructor checks                                                                                      // 78
    if (!(keyValue instanceof expectedType)) {                                                                         // 79
      return "expectedConstructor";                                                                                    // 80
    }                                                                                                                  // 81
                                                                                                                       // 82
    // Date checks                                                                                                     // 83
    else if (expectedType === Date) {                                                                                  // 84
      if (isNaN(keyValue.getTime())) {                                                                                 // 85
        return "badDate";                                                                                              // 86
      }                                                                                                                // 87
                                                                                                                       // 88
      if (_.isDate(def.min) && def.min.getTime() > keyValue.getTime()) {                                               // 89
        return "minDate";                                                                                              // 90
      } else if (_.isDate(def.max) && def.max.getTime() < keyValue.getTime()) {                                        // 91
        return "maxDate";                                                                                              // 92
      }                                                                                                                // 93
    }                                                                                                                  // 94
  }                                                                                                                    // 95
                                                                                                                       // 96
}                                                                                                                      // 97
                                                                                                                       // 98
doValidation2 = function doValidation2(obj, isModifier, isUpsert, keyToValidate, ss, extendedCustomContext) {          // 99
                                                                                                                       // 100
  // First do some basic checks of the object, and throw errors if necessary                                           // 101
  if (!_.isObject(obj)) {                                                                                              // 102
    throw new Error("The first argument of validate() or validateOne() must be an object");                            // 103
  }                                                                                                                    // 104
                                                                                                                       // 105
  if (isModifier) {                                                                                                    // 106
    if (_.isEmpty(obj)) {                                                                                              // 107
      throw new Error("When the modifier option is true, validation object must have at least one operator");          // 108
    } else {                                                                                                           // 109
      var allKeysAreOperators = _.every(obj, function(v, k) {                                                          // 110
        return (k.substring(0, 1) === "$");                                                                            // 111
      });                                                                                                              // 112
      if (!allKeysAreOperators) {                                                                                      // 113
        throw new Error("When the modifier option is true, all validation object keys must be operators");             // 114
      }                                                                                                                // 115
                                                                                                                       // 116
      // We use a LocalCollection to figure out what the resulting doc                                                 // 117
      // would be in a worst case scenario. Then we validate that doc                                                  // 118
      // so that we don't have to validate the modifier object directly.                                               // 119
      obj = convertModifierToDoc(obj, ss.schema(), isUpsert);                                                          // 120
    }                                                                                                                  // 121
  } else if (Utility.looksLikeModifier(obj)) {                                                                         // 122
    throw new Error("When the validation object contains mongo operators, you must set the modifier option to true");  // 123
  }                                                                                                                    // 124
                                                                                                                       // 125
  var invalidKeys = [];                                                                                                // 126
  var mDoc; // for caching the MongoObject if necessary                                                                // 127
                                                                                                                       // 128
  // Validation function called for each affected key                                                                  // 129
  function validate(val, affectedKey, affectedKeyGeneric, def, op, skipRequiredCheck, strictRequiredCheck) {           // 130
                                                                                                                       // 131
    // Get the schema for this key, marking invalid if there isn't one.                                                // 132
    if (!def) {                                                                                                        // 133
      invalidKeys.push(Utility.errorObject("keyNotInSchema", affectedKey, val, def, ss));                              // 134
      return;                                                                                                          // 135
    }                                                                                                                  // 136
                                                                                                                       // 137
    // Check for missing required values. The general logic is this:                                                   // 138
    // * If the operator is $unset or $rename, it's invalid.                                                           // 139
    // * If the value is null, it's invalid.                                                                           // 140
    // * If the value is undefined and one of the following are true, it's invalid:                                    // 141
    //     * We're validating a key of a sub-object.                                                                   // 142
    //     * We're validating a key of an object that is an array item.                                                // 143
    //     * We're validating a document (as opposed to a modifier).                                                   // 144
    //     * We're validating a key under the $set operator in a modifier, and it's an upsert.                         // 145
    if (!skipRequiredCheck && !def.optional) {                                                                         // 146
      if (val === null || val === void 0) {                                                                            // 147
        invalidKeys.push(Utility.errorObject("required", affectedKey, null, def, ss));                                 // 148
        return;                                                                                                        // 149
      }                                                                                                                // 150
    }                                                                                                                  // 151
                                                                                                                       // 152
    // Value checks are not necessary for null or undefined values                                                     // 153
    if (Utility.isNotNullOrUndefined(val)) {                                                                           // 154
                                                                                                                       // 155
      // Check that value is of the correct type                                                                       // 156
      var typeError = doTypeChecks(def, val, op);                                                                      // 157
      if (typeError) {                                                                                                 // 158
        invalidKeys.push(Utility.errorObject(typeError, affectedKey, val, def, ss));                                   // 159
        return;                                                                                                        // 160
      }                                                                                                                // 161
                                                                                                                       // 162
      // Check value against allowedValues array                                                                       // 163
      if (def.allowedValues && !_.contains(def.allowedValues, val)) {                                                  // 164
        invalidKeys.push(Utility.errorObject("notAllowed", affectedKey, val, def, ss));                                // 165
        return;                                                                                                        // 166
      }                                                                                                                // 167
                                                                                                                       // 168
    }                                                                                                                  // 169
                                                                                                                       // 170
    // Perform custom validation                                                                                       // 171
    var lastDot = affectedKey.lastIndexOf('.');                                                                        // 172
    var fieldParentName = lastDot === -1 ? '' : affectedKey.slice(0, lastDot + 1);                                     // 173
    var validators = def.custom ? [def.custom] : [];                                                                   // 174
    validators = validators.concat(ss._validators).concat(SimpleSchema._validators);                                   // 175
    _.every(validators, function(validator) {                                                                          // 176
      var errorType = validator.call(_.extend({                                                                        // 177
        key: affectedKey,                                                                                              // 178
        genericKey: affectedKeyGeneric,                                                                                // 179
        definition: def,                                                                                               // 180
        isSet: (val !== void 0),                                                                                       // 181
        value: val,                                                                                                    // 182
        operator: op,                                                                                                  // 183
        field: function(fName) {                                                                                       // 184
          mDoc = mDoc || new MongoObject(obj, ss._blackboxKeys); //create if necessary, cache for speed                // 185
          var keyInfo = mDoc.getInfoForKey(fName) || {};                                                               // 186
          return {                                                                                                     // 187
            isSet: (keyInfo.value !== void 0),                                                                         // 188
            value: keyInfo.value,                                                                                      // 189
            operator: keyInfo.operator                                                                                 // 190
          };                                                                                                           // 191
        },                                                                                                             // 192
        siblingField: function(fName) {                                                                                // 193
          mDoc = mDoc || new MongoObject(obj, ss._blackboxKeys); //create if necessary, cache for speed                // 194
          var keyInfo = mDoc.getInfoForKey(fieldParentName + fName) || {};                                             // 195
          return {                                                                                                     // 196
            isSet: (keyInfo.value !== void 0),                                                                         // 197
            value: keyInfo.value,                                                                                      // 198
            operator: keyInfo.operator                                                                                 // 199
          };                                                                                                           // 200
        }                                                                                                              // 201
      }, extendedCustomContext || {}));                                                                                // 202
      if (typeof errorType === "string") {                                                                             // 203
        invalidKeys.push(Utility.errorObject(errorType, affectedKey, val, def, ss));                                   // 204
        return false;                                                                                                  // 205
      }                                                                                                                // 206
      return true;                                                                                                     // 207
    });                                                                                                                // 208
  }                                                                                                                    // 209
                                                                                                                       // 210
  // The recursive function                                                                                            // 211
  function checkObj(val, affectedKey, skipRequiredCheck, strictRequiredCheck) {                                        // 212
    var affectedKeyGeneric, def;                                                                                       // 213
                                                                                                                       // 214
    if (affectedKey) {                                                                                                 // 215
                                                                                                                       // 216
      // When we hit a blackbox key, we don't progress any further                                                     // 217
      if (ss.keyIsInBlackBox(affectedKey)) {                                                                           // 218
        return;                                                                                                        // 219
      }                                                                                                                // 220
                                                                                                                       // 221
      // Make a generic version of the affected key, and use that                                                      // 222
      // to get the schema for this key.                                                                               // 223
      affectedKeyGeneric = SimpleSchema._makeGeneric(affectedKey);                                                     // 224
      def = ss.getDefinition(affectedKey);                                                                             // 225
                                                                                                                       // 226
      // Perform validation for this key                                                                               // 227
      if (!keyToValidate || keyToValidate === affectedKey || keyToValidate === affectedKeyGeneric) {                   // 228
        validate(val, affectedKey, affectedKeyGeneric, def, null, skipRequiredCheck, strictRequiredCheck);             // 229
      }                                                                                                                // 230
    }                                                                                                                  // 231
                                                                                                                       // 232
    // Temporarily convert missing objects to empty objects                                                            // 233
    // so that the looping code will be called and required                                                            // 234
    // descendent keys can be validated.                                                                               // 235
    if ((val === void 0 || val === null) && (!def || (def.type === Object && !def.optional))) {                        // 236
      val = {};                                                                                                        // 237
    }                                                                                                                  // 238
                                                                                                                       // 239
    // Loop through arrays                                                                                             // 240
    if (_.isArray(val)) {                                                                                              // 241
      _.each(val, function(v, i) {                                                                                     // 242
        checkObj(v, affectedKey + '.' + i);                                                                            // 243
      });                                                                                                              // 244
    }                                                                                                                  // 245
                                                                                                                       // 246
    // Loop through object keys                                                                                        // 247
    else if (Utility.isBasicObject(val) && (!def || !def.blackbox)) {                                                  // 248
                                                                                                                       // 249
      // Get list of present keys                                                                                      // 250
      var presentKeys = _.keys(val);                                                                                   // 251
                                                                                                                       // 252
      // Check all present keys plus all keys defined by the schema.                                                   // 253
      // This allows us to detect extra keys not allowed by the schema plus                                            // 254
      // any missing required keys, and to run any custom functions for other keys.                                    // 255
      var keysToCheck = _.union(presentKeys, ss._schemaKeys);                                                          // 256
                                                                                                                       // 257
      // If this object is within an array, make sure we check for                                                     // 258
      // required as if it's not a modifier                                                                            // 259
      strictRequiredCheck = (affectedKeyGeneric && affectedKeyGeneric.slice(-2) === ".$");                             // 260
                                                                                                                       // 261
      // Check all keys in the merged list                                                                             // 262
      _.each(keysToCheck, function(key) {                                                                              // 263
        if (Utility.shouldCheck(key)) {                                                                                // 264
          checkObj(val[key], Utility.appendAffectedKey(affectedKey, key), skipRequiredCheck, strictRequiredCheck);     // 265
        }                                                                                                              // 266
      });                                                                                                              // 267
    }                                                                                                                  // 268
                                                                                                                       // 269
  }                                                                                                                    // 270
                                                                                                                       // 271
  // Kick off the validation                                                                                           // 272
  checkObj(obj);                                                                                                       // 273
                                                                                                                       // 274
  // Make sure there is only one error per fieldName                                                                   // 275
  var addedFieldNames = [];                                                                                            // 276
  invalidKeys = _.filter(invalidKeys, function(errObj) {                                                               // 277
    if (!_.contains(addedFieldNames, errObj.name)) {                                                                   // 278
      addedFieldNames.push(errObj.name);                                                                               // 279
      return true;                                                                                                     // 280
    }                                                                                                                  // 281
    return false;                                                                                                      // 282
  });                                                                                                                  // 283
                                                                                                                       // 284
  return invalidKeys;                                                                                                  // 285
};                                                                                                                     // 286
                                                                                                                       // 287
function convertModifierToDoc(mod, schema, isUpsert) {                                                                 // 288
  // Create unmanaged LocalCollection as scratchpad                                                                    // 289
  var t = new Meteor.Collection(null);                                                                                 // 290
                                                                                                                       // 291
  // LocalCollections are in memory, and it seems                                                                      // 292
  // that it's fine to use them synchronously on                                                                       // 293
  // either client or server                                                                                           // 294
  var id;                                                                                                              // 295
  if (isUpsert) {                                                                                                      // 296
    // We assume upserts will be inserts (conservative                                                                 // 297
    // validation of requiredness)                                                                                     // 298
    id = Random.id();                                                                                                  // 299
    t.upsert({_id: id}, mod);                                                                                          // 300
  } else {                                                                                                             // 301
    var mDoc = new MongoObject(mod);                                                                                   // 302
    // Create a ficticious existing document                                                                           // 303
    var fakeDoc = new MongoObject({});                                                                                 // 304
    _.each(schema, function (def, fieldName) {                                                                         // 305
      var setVal;                                                                                                      // 306
      // Prefill doc with empty arrays to avoid the                                                                    // 307
      // mongodb issue where it does not understand                                                                    // 308
      // that numeric pieces should create arrays.                                                                     // 309
      if (def.type === Array && mDoc.affectsGenericKey(fieldName)) {                                                   // 310
        setVal = [];                                                                                                   // 311
      }                                                                                                                // 312
      // Set dummy values for required fields because                                                                  // 313
      // we assume any existing data would be valid.                                                                   // 314
      else if (!def.optional) {                                                                                        // 315
        // TODO correct value type based on schema type                                                                // 316
        if (def.type === Boolean) {                                                                                    // 317
          setVal = true;                                                                                               // 318
        } else if (def.type === Number) {                                                                              // 319
          setVal = def.min || 0;                                                                                       // 320
        } else if (def.type === Date) {                                                                                // 321
          setVal = def.min || new Date();                                                                              // 322
        } else if (def.type === Array) {                                                                               // 323
          setVal = [];                                                                                                 // 324
        } else if (def.type === Object) {                                                                              // 325
          setVal = {};                                                                                                 // 326
        } else {                                                                                                       // 327
          setVal = "0";                                                                                                // 328
        }                                                                                                              // 329
      }                                                                                                                // 330
                                                                                                                       // 331
      if (setVal !== void 0) {                                                                                         // 332
        var key = fieldName.replace(/\.\$/g, ".0");                                                                    // 333
        var pos = MongoObject._keyToPosition(key, false);                                                              // 334
        fakeDoc.setValueForPosition(pos, setVal);                                                                      // 335
      }                                                                                                                // 336
    });                                                                                                                // 337
    fakeDoc = fakeDoc.getObject();                                                                                     // 338
    // Insert fake doc into local scratch collection                                                                   // 339
    id = t.insert(fakeDoc);                                                                                            // 340
    // Now update it with the modifier                                                                                 // 341
    t.update(id, mod);                                                                                                 // 342
  }                                                                                                                    // 343
                                                                                                                       // 344
  var doc = t.findOne(id);                                                                                             // 345
  // We're done with it                                                                                                // 346
  t.remove(id);                                                                                                        // 347
  // Currently we don't validate _id unless it is                                                                      // 348
  // explicitly added to the schema                                                                                    // 349
  if (!schema._id) {                                                                                                   // 350
    delete doc._id;                                                                                                    // 351
  }                                                                                                                    // 352
  return doc;                                                                                                          // 353
}                                                                                                                      // 354
                                                                                                                       // 355
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:simple-schema/simple-schema-context.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* global SimpleSchema */                                                                                              // 1
/* global SimpleSchemaValidationContext:true */                                                                        // 2
/* global doValidation1 */                                                                                             // 3
/* global doValidation2 */                                                                                             // 4
                                                                                                                       // 5
function doValidation(obj, isModifier, isUpsert, keyToValidate, ss, extendedCustomContext) {                           // 6
  var useOld = true; //for now this can be manually changed to try the experimental method, which doesn't yet work properly
  var func = useOld ? doValidation1 : doValidation2;                                                                   // 8
  return func(obj, isModifier, isUpsert, keyToValidate, ss, extendedCustomContext);                                    // 9
}                                                                                                                      // 10
                                                                                                                       // 11
/*                                                                                                                     // 12
 * PUBLIC API                                                                                                          // 13
 */                                                                                                                    // 14
                                                                                                                       // 15
SimpleSchemaValidationContext = function SimpleSchemaValidationContext(ss) {                                           // 16
  var self = this;                                                                                                     // 17
  self._simpleSchema = ss;                                                                                             // 18
  self._schema = ss.schema();                                                                                          // 19
  self._schemaKeys = _.keys(self._schema);                                                                             // 20
  self._invalidKeys = [];                                                                                              // 21
  //set up validation dependencies                                                                                     // 22
  self._deps = {};                                                                                                     // 23
  self._depsAny = new Deps.Dependency();                                                                               // 24
  _.each(self._schemaKeys, function(name) {                                                                            // 25
    self._deps[name] = new Deps.Dependency();                                                                          // 26
  });                                                                                                                  // 27
};                                                                                                                     // 28
                                                                                                                       // 29
//validates the object against the simple schema and sets a reactive array of error objects                            // 30
SimpleSchemaValidationContext.prototype.validate = function simpleSchemaValidationContextValidate(doc, options) {      // 31
  var self = this;                                                                                                     // 32
  options = _.extend({                                                                                                 // 33
    modifier: false,                                                                                                   // 34
    upsert: false,                                                                                                     // 35
    extendedCustomContext: {}                                                                                          // 36
  }, options || {});                                                                                                   // 37
                                                                                                                       // 38
  //on the client we can add the userId if not already in the custom context                                           // 39
  if (Meteor.isClient && options.extendedCustomContext.userId === void 0) {                                            // 40
    options.extendedCustomContext.userId = (Meteor.userId && Meteor.userId()) || null;                                 // 41
  }                                                                                                                    // 42
                                                                                                                       // 43
  var invalidKeys = doValidation(doc, options.modifier, options.upsert, null, self._simpleSchema, options.extendedCustomContext);
                                                                                                                       // 45
  //now update self._invalidKeys and dependencies                                                                      // 46
                                                                                                                       // 47
  //note any currently invalid keys so that we can mark them as changed                                                // 48
  //due to new validation (they may be valid now, or invalid in a different way)                                       // 49
  var removedKeys = _.pluck(self._invalidKeys, "name");                                                                // 50
                                                                                                                       // 51
  //update                                                                                                             // 52
  self._invalidKeys = invalidKeys;                                                                                     // 53
                                                                                                                       // 54
  //add newly invalid keys to changedKeys                                                                              // 55
  var addedKeys = _.pluck(self._invalidKeys, "name");                                                                  // 56
                                                                                                                       // 57
  //mark all changed keys as changed                                                                                   // 58
  var changedKeys = _.union(addedKeys, removedKeys);                                                                   // 59
  self._markKeysChanged(changedKeys);                                                                                  // 60
                                                                                                                       // 61
  // Return true if it was valid; otherwise, return false                                                              // 62
  return self._invalidKeys.length === 0;                                                                               // 63
};                                                                                                                     // 64
                                                                                                                       // 65
//validates doc against self._schema for one key and sets a reactive array of error objects                            // 66
SimpleSchemaValidationContext.prototype.validateOne = function simpleSchemaValidationContextValidateOne(doc, keyName, options) {
  var self = this, i, ln, k;                                                                                           // 68
  options = _.extend({                                                                                                 // 69
    modifier: false,                                                                                                   // 70
    upsert: false,                                                                                                     // 71
    extendedCustomContext: {}                                                                                          // 72
  }, options || {});                                                                                                   // 73
                                                                                                                       // 74
  //on the client we can add the userId if not already in the custom context                                           // 75
  if (Meteor.isClient && options.extendedCustomContext.userId === void 0) {                                            // 76
    options.extendedCustomContext.userId = (Meteor.userId && Meteor.userId()) || null;                                 // 77
  }                                                                                                                    // 78
                                                                                                                       // 79
  var invalidKeys = doValidation(doc, options.modifier, options.upsert, keyName, self._simpleSchema, options.extendedCustomContext);
                                                                                                                       // 81
  //now update self._invalidKeys and dependencies                                                                      // 82
                                                                                                                       // 83
  //remove objects from self._invalidKeys where name = keyName                                                         // 84
  var newInvalidKeys = [];                                                                                             // 85
  for (i = 0, ln = self._invalidKeys.length; i < ln; i++) {                                                            // 86
    k = self._invalidKeys[i];                                                                                          // 87
    if (k.name !== keyName) {                                                                                          // 88
      newInvalidKeys.push(k);                                                                                          // 89
    }                                                                                                                  // 90
  }                                                                                                                    // 91
  self._invalidKeys = newInvalidKeys;                                                                                  // 92
                                                                                                                       // 93
  //merge invalidKeys into self._invalidKeys                                                                           // 94
  for (i = 0, ln = invalidKeys.length; i < ln; i++) {                                                                  // 95
    k = invalidKeys[i];                                                                                                // 96
    self._invalidKeys.push(k);                                                                                         // 97
  }                                                                                                                    // 98
                                                                                                                       // 99
  //mark key as changed due to new validation (they may be valid now, or invalid in a different way)                   // 100
  self._markKeysChanged([keyName]);                                                                                    // 101
                                                                                                                       // 102
  // Return true if it was valid; otherwise, return false                                                              // 103
  return !self._keyIsInvalid(keyName);                                                                                 // 104
};                                                                                                                     // 105
                                                                                                                       // 106
//reset the invalidKeys array                                                                                          // 107
SimpleSchemaValidationContext.prototype.resetValidation = function simpleSchemaValidationContextResetValidation() {    // 108
  var self = this;                                                                                                     // 109
  var removedKeys = _.pluck(self._invalidKeys, "name");                                                                // 110
  self._invalidKeys = [];                                                                                              // 111
  self._markKeysChanged(removedKeys);                                                                                  // 112
};                                                                                                                     // 113
                                                                                                                       // 114
SimpleSchemaValidationContext.prototype.isValid = function simpleSchemaValidationContextIsValid() {                    // 115
  var self = this;                                                                                                     // 116
  self._depsAny.depend();                                                                                              // 117
  return !self._invalidKeys.length;                                                                                    // 118
};                                                                                                                     // 119
                                                                                                                       // 120
SimpleSchemaValidationContext.prototype.invalidKeys = function simpleSchemaValidationContextInvalidKeys() {            // 121
  var self = this;                                                                                                     // 122
  self._depsAny.depend();                                                                                              // 123
  return self._invalidKeys;                                                                                            // 124
};                                                                                                                     // 125
                                                                                                                       // 126
SimpleSchemaValidationContext.prototype.addInvalidKeys = function simpleSchemaValidationContextAddInvalidKeys(errors) {
  var self = this;                                                                                                     // 128
                                                                                                                       // 129
  if (!errors || !errors.length) {                                                                                     // 130
    return;                                                                                                            // 131
  }                                                                                                                    // 132
                                                                                                                       // 133
  var changedKeys = [];                                                                                                // 134
  _.each(errors, function (errorObject) {                                                                              // 135
    changedKeys.push(errorObject.name);                                                                                // 136
    self._invalidKeys.push(errorObject);                                                                               // 137
  });                                                                                                                  // 138
                                                                                                                       // 139
  self._markKeysChanged(changedKeys);                                                                                  // 140
};                                                                                                                     // 141
                                                                                                                       // 142
SimpleSchemaValidationContext.prototype._markKeysChanged = function simpleSchemaValidationContextMarkKeysChanged(keys) {
  var self = this;                                                                                                     // 144
                                                                                                                       // 145
  if (!keys || !keys.length) {                                                                                         // 146
    return;                                                                                                            // 147
  }                                                                                                                    // 148
                                                                                                                       // 149
  _.each(keys, function(name) {                                                                                        // 150
    var genericName = SimpleSchema._makeGeneric(name);                                                                 // 151
    if (genericName in self._deps) {                                                                                   // 152
      self._deps[genericName].changed();                                                                               // 153
    }                                                                                                                  // 154
  });                                                                                                                  // 155
  self._depsAny.changed();                                                                                             // 156
};                                                                                                                     // 157
                                                                                                                       // 158
SimpleSchemaValidationContext.prototype._getInvalidKeyObject = function simpleSchemaValidationContextGetInvalidKeyObject(name, genericName) {
  var self = this;                                                                                                     // 160
  genericName = genericName || SimpleSchema._makeGeneric(name);                                                        // 161
                                                                                                                       // 162
  var errorObj = _.findWhere(self._invalidKeys, {name: name});                                                         // 163
  if (!errorObj) {                                                                                                     // 164
    errorObj = _.findWhere(self._invalidKeys, {name: genericName});                                                    // 165
  }                                                                                                                    // 166
  return errorObj;                                                                                                     // 167
};                                                                                                                     // 168
                                                                                                                       // 169
SimpleSchemaValidationContext.prototype._keyIsInvalid = function simpleSchemaValidationContextKeyIsInvalid(name, genericName) {
  return !!this._getInvalidKeyObject(name, genericName);                                                               // 171
};                                                                                                                     // 172
                                                                                                                       // 173
// Like the internal one, but with deps                                                                                // 174
SimpleSchemaValidationContext.prototype.keyIsInvalid = function simpleSchemaValidationContextKeyIsInvalid(name) {      // 175
  var self = this, genericName = SimpleSchema._makeGeneric(name);                                                      // 176
  self._deps[genericName] && self._deps[genericName].depend();                                                         // 177
                                                                                                                       // 178
  return self._keyIsInvalid(name, genericName);                                                                        // 179
};                                                                                                                     // 180
                                                                                                                       // 181
SimpleSchemaValidationContext.prototype.keyErrorMessage = function simpleSchemaValidationContextKeyErrorMessage(name) {
  var self = this, genericName = SimpleSchema._makeGeneric(name);                                                      // 183
  self._deps[genericName] && self._deps[genericName].depend();                                                         // 184
                                                                                                                       // 185
  var errorObj = self._getInvalidKeyObject(name, genericName);                                                         // 186
  if (!errorObj) {                                                                                                     // 187
    return "";                                                                                                         // 188
  }                                                                                                                    // 189
                                                                                                                       // 190
  return self._simpleSchema.messageForError(errorObj.type, errorObj.name, null, errorObj.value);                       // 191
};                                                                                                                     // 192
                                                                                                                       // 193
SimpleSchemaValidationContext.prototype.getErrorObject = function simpleSchemaValidationContextGetErrorObject() {      // 194
  var self = this, message, invalidKeys = this._invalidKeys;                                                           // 195
  if (invalidKeys.length) {                                                                                            // 196
    message = self.keyErrorMessage(invalidKeys[0].name);                                                               // 197
    // We add `message` prop to the invalidKeys.                                                                       // 198
    invalidKeys = _.map(invalidKeys, function (o) {                                                                    // 199
      return _.extend({message: self.keyErrorMessage(o.name)}, o);                                                     // 200
    });                                                                                                                // 201
  } else {                                                                                                             // 202
    message = "Failed validation";                                                                                     // 203
  }                                                                                                                    // 204
  var error = new Error(message);                                                                                      // 205
  error.invalidKeys = invalidKeys;                                                                                     // 206
  // If on the server, we add a sanitized error, too, in case we're                                                    // 207
  // called from a method.                                                                                             // 208
  if (Meteor.isServer) {                                                                                               // 209
    error.sanitizedError = new Meteor.Error(400, message);                                                             // 210
  }                                                                                                                    // 211
  return error;                                                                                                        // 212
};                                                                                                                     // 213
                                                                                                                       // 214
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("aldeed:simple-schema", {
  SimpleSchema: SimpleSchema,
  MongoObject: MongoObject
});

})();
