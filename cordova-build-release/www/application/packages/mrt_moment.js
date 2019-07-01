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
var moment;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/mrt_moment/packages/mrt_moment.js                        //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/mrt:moment/lib/moment/moment.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
//! moment.js                                                                                                          // 1
//! version : 2.8.1                                                                                                    // 2
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors                                                         // 3
//! license : MIT                                                                                                      // 4
//! momentjs.com                                                                                                       // 5
                                                                                                                       // 6
(function (undefined) {                                                                                                // 7
    /************************************                                                                              // 8
        Constants                                                                                                      // 9
    ************************************/                                                                              // 10
                                                                                                                       // 11
    var moment,                                                                                                        // 12
        VERSION = '2.8.1',                                                                                             // 13
        // the global-scope this is NOT the global object in Node.js                                                   // 14
        globalScope = typeof global !== 'undefined' ? global : this,                                                   // 15
        oldGlobalMoment,                                                                                               // 16
        round = Math.round,                                                                                            // 17
        i,                                                                                                             // 18
                                                                                                                       // 19
        YEAR = 0,                                                                                                      // 20
        MONTH = 1,                                                                                                     // 21
        DATE = 2,                                                                                                      // 22
        HOUR = 3,                                                                                                      // 23
        MINUTE = 4,                                                                                                    // 24
        SECOND = 5,                                                                                                    // 25
        MILLISECOND = 6,                                                                                               // 26
                                                                                                                       // 27
        // internal storage for locale config files                                                                    // 28
        locales = {},                                                                                                  // 29
                                                                                                                       // 30
        // extra moment internal properties (plugins register props here)                                              // 31
        momentProperties = [],                                                                                         // 32
                                                                                                                       // 33
        // check for nodeJS                                                                                            // 34
        hasModule = (typeof module !== 'undefined' && module.exports),                                                 // 35
                                                                                                                       // 36
        // ASP.NET json date format regex                                                                              // 37
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,                                                                       // 38
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,                              // 39
                                                                                                                       // 40
        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html                   // 41
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere                                   // 42
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,
                                                                                                                       // 44
        // format tokens                                                                                               // 45
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,                                              // 47
                                                                                                                       // 48
        // parsing token regexes                                                                                       // 49
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99                                                                  // 50
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999                                                             // 51
        parseTokenOneToFourDigits = /\d{1,4}/, // 0 - 9999                                                             // 52
        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999                                              // 53
        parseTokenDigits = /\d+/, // nonzero number of digits                                                          // 54
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z                                 // 56
        parseTokenT = /T/i, // T (ISO separator)                                                                       // 57
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123                                   // 58
        parseTokenOrdinal = /\d{1,2}/,                                                                                 // 59
                                                                                                                       // 60
        //strict parsing regexes                                                                                       // 61
        parseTokenOneDigit = /\d/, // 0 - 9                                                                            // 62
        parseTokenTwoDigits = /\d\d/, // 00 - 99                                                                       // 63
        parseTokenThreeDigits = /\d{3}/, // 000 - 999                                                                  // 64
        parseTokenFourDigits = /\d{4}/, // 0000 - 9999                                                                 // 65
        parseTokenSixDigits = /[+-]?\d{6}/, // -999,999 - 999,999                                                      // 66
        parseTokenSignedNumber = /[+-]?\d+/, // -inf - inf                                                             // 67
                                                                                                                       // 68
        // iso 8601 regex                                                                                              // 69
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)   // 70
        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
                                                                                                                       // 72
        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',                                                                            // 73
                                                                                                                       // 74
        isoDates = [                                                                                                   // 75
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],                                                                 // 76
            ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],                                                                       // 77
            ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],                                                                       // 78
            ['GGGG-[W]WW', /\d{4}-W\d{2}/],                                                                            // 79
            ['YYYY-DDD', /\d{4}-\d{3}/]                                                                                // 80
        ],                                                                                                             // 81
                                                                                                                       // 82
        // iso time formats and regexes                                                                                // 83
        isoTimes = [                                                                                                   // 84
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],                                                             // 85
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],                                                                       // 86
            ['HH:mm', /(T| )\d\d:\d\d/],                                                                               // 87
            ['HH', /(T| )\d\d/]                                                                                        // 88
        ],                                                                                                             // 89
                                                                                                                       // 90
        // timezone chunker "+10:00" > ["10", "00"] or "-1530" > ["-15", "30"]                                         // 91
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,                                                                      // 92
                                                                                                                       // 93
        // getter and setter names                                                                                     // 94
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),                                 // 95
        unitMillisecondFactors = {                                                                                     // 96
            'Milliseconds' : 1,                                                                                        // 97
            'Seconds' : 1e3,                                                                                           // 98
            'Minutes' : 6e4,                                                                                           // 99
            'Hours' : 36e5,                                                                                            // 100
            'Days' : 864e5,                                                                                            // 101
            'Months' : 2592e6,                                                                                         // 102
            'Years' : 31536e6                                                                                          // 103
        },                                                                                                             // 104
                                                                                                                       // 105
        unitAliases = {                                                                                                // 106
            ms : 'millisecond',                                                                                        // 107
            s : 'second',                                                                                              // 108
            m : 'minute',                                                                                              // 109
            h : 'hour',                                                                                                // 110
            d : 'day',                                                                                                 // 111
            D : 'date',                                                                                                // 112
            w : 'week',                                                                                                // 113
            W : 'isoWeek',                                                                                             // 114
            M : 'month',                                                                                               // 115
            Q : 'quarter',                                                                                             // 116
            y : 'year',                                                                                                // 117
            DDD : 'dayOfYear',                                                                                         // 118
            e : 'weekday',                                                                                             // 119
            E : 'isoWeekday',                                                                                          // 120
            gg: 'weekYear',                                                                                            // 121
            GG: 'isoWeekYear'                                                                                          // 122
        },                                                                                                             // 123
                                                                                                                       // 124
        camelFunctions = {                                                                                             // 125
            dayofyear : 'dayOfYear',                                                                                   // 126
            isoweekday : 'isoWeekday',                                                                                 // 127
            isoweek : 'isoWeek',                                                                                       // 128
            weekyear : 'weekYear',                                                                                     // 129
            isoweekyear : 'isoWeekYear'                                                                                // 130
        },                                                                                                             // 131
                                                                                                                       // 132
        // format function strings                                                                                     // 133
        formatFunctions = {},                                                                                          // 134
                                                                                                                       // 135
        // default relative time thresholds                                                                            // 136
        relativeTimeThresholds = {                                                                                     // 137
            s: 45,  // seconds to minute                                                                               // 138
            m: 45,  // minutes to hour                                                                                 // 139
            h: 22,  // hours to day                                                                                    // 140
            d: 26,  // days to month                                                                                   // 141
            M: 11   // months to year                                                                                  // 142
        },                                                                                                             // 143
                                                                                                                       // 144
        // tokens to ordinalize and pad                                                                                // 145
        ordinalizeTokens = 'DDD w W M D d'.split(' '),                                                                 // 146
        paddedTokens = 'M D H h m s w W'.split(' '),                                                                   // 147
                                                                                                                       // 148
        formatTokenFunctions = {                                                                                       // 149
            M    : function () {                                                                                       // 150
                return this.month() + 1;                                                                               // 151
            },                                                                                                         // 152
            MMM  : function (format) {                                                                                 // 153
                return this.localeData().monthsShort(this, format);                                                    // 154
            },                                                                                                         // 155
            MMMM : function (format) {                                                                                 // 156
                return this.localeData().months(this, format);                                                         // 157
            },                                                                                                         // 158
            D    : function () {                                                                                       // 159
                return this.date();                                                                                    // 160
            },                                                                                                         // 161
            DDD  : function () {                                                                                       // 162
                return this.dayOfYear();                                                                               // 163
            },                                                                                                         // 164
            d    : function () {                                                                                       // 165
                return this.day();                                                                                     // 166
            },                                                                                                         // 167
            dd   : function (format) {                                                                                 // 168
                return this.localeData().weekdaysMin(this, format);                                                    // 169
            },                                                                                                         // 170
            ddd  : function (format) {                                                                                 // 171
                return this.localeData().weekdaysShort(this, format);                                                  // 172
            },                                                                                                         // 173
            dddd : function (format) {                                                                                 // 174
                return this.localeData().weekdays(this, format);                                                       // 175
            },                                                                                                         // 176
            w    : function () {                                                                                       // 177
                return this.week();                                                                                    // 178
            },                                                                                                         // 179
            W    : function () {                                                                                       // 180
                return this.isoWeek();                                                                                 // 181
            },                                                                                                         // 182
            YY   : function () {                                                                                       // 183
                return leftZeroFill(this.year() % 100, 2);                                                             // 184
            },                                                                                                         // 185
            YYYY : function () {                                                                                       // 186
                return leftZeroFill(this.year(), 4);                                                                   // 187
            },                                                                                                         // 188
            YYYYY : function () {                                                                                      // 189
                return leftZeroFill(this.year(), 5);                                                                   // 190
            },                                                                                                         // 191
            YYYYYY : function () {                                                                                     // 192
                var y = this.year(), sign = y >= 0 ? '+' : '-';                                                        // 193
                return sign + leftZeroFill(Math.abs(y), 6);                                                            // 194
            },                                                                                                         // 195
            gg   : function () {                                                                                       // 196
                return leftZeroFill(this.weekYear() % 100, 2);                                                         // 197
            },                                                                                                         // 198
            gggg : function () {                                                                                       // 199
                return leftZeroFill(this.weekYear(), 4);                                                               // 200
            },                                                                                                         // 201
            ggggg : function () {                                                                                      // 202
                return leftZeroFill(this.weekYear(), 5);                                                               // 203
            },                                                                                                         // 204
            GG   : function () {                                                                                       // 205
                return leftZeroFill(this.isoWeekYear() % 100, 2);                                                      // 206
            },                                                                                                         // 207
            GGGG : function () {                                                                                       // 208
                return leftZeroFill(this.isoWeekYear(), 4);                                                            // 209
            },                                                                                                         // 210
            GGGGG : function () {                                                                                      // 211
                return leftZeroFill(this.isoWeekYear(), 5);                                                            // 212
            },                                                                                                         // 213
            e : function () {                                                                                          // 214
                return this.weekday();                                                                                 // 215
            },                                                                                                         // 216
            E : function () {                                                                                          // 217
                return this.isoWeekday();                                                                              // 218
            },                                                                                                         // 219
            a    : function () {                                                                                       // 220
                return this.localeData().meridiem(this.hours(), this.minutes(), true);                                 // 221
            },                                                                                                         // 222
            A    : function () {                                                                                       // 223
                return this.localeData().meridiem(this.hours(), this.minutes(), false);                                // 224
            },                                                                                                         // 225
            H    : function () {                                                                                       // 226
                return this.hours();                                                                                   // 227
            },                                                                                                         // 228
            h    : function () {                                                                                       // 229
                return this.hours() % 12 || 12;                                                                        // 230
            },                                                                                                         // 231
            m    : function () {                                                                                       // 232
                return this.minutes();                                                                                 // 233
            },                                                                                                         // 234
            s    : function () {                                                                                       // 235
                return this.seconds();                                                                                 // 236
            },                                                                                                         // 237
            S    : function () {                                                                                       // 238
                return toInt(this.milliseconds() / 100);                                                               // 239
            },                                                                                                         // 240
            SS   : function () {                                                                                       // 241
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);                                               // 242
            },                                                                                                         // 243
            SSS  : function () {                                                                                       // 244
                return leftZeroFill(this.milliseconds(), 3);                                                           // 245
            },                                                                                                         // 246
            SSSS : function () {                                                                                       // 247
                return leftZeroFill(this.milliseconds(), 3);                                                           // 248
            },                                                                                                         // 249
            Z    : function () {                                                                                       // 250
                var a = -this.zone(),                                                                                  // 251
                    b = '+';                                                                                           // 252
                if (a < 0) {                                                                                           // 253
                    a = -a;                                                                                            // 254
                    b = '-';                                                                                           // 255
                }                                                                                                      // 256
                return b + leftZeroFill(toInt(a / 60), 2) + ':' + leftZeroFill(toInt(a) % 60, 2);                      // 257
            },                                                                                                         // 258
            ZZ   : function () {                                                                                       // 259
                var a = -this.zone(),                                                                                  // 260
                    b = '+';                                                                                           // 261
                if (a < 0) {                                                                                           // 262
                    a = -a;                                                                                            // 263
                    b = '-';                                                                                           // 264
                }                                                                                                      // 265
                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);                            // 266
            },                                                                                                         // 267
            z : function () {                                                                                          // 268
                return this.zoneAbbr();                                                                                // 269
            },                                                                                                         // 270
            zz : function () {                                                                                         // 271
                return this.zoneName();                                                                                // 272
            },                                                                                                         // 273
            X    : function () {                                                                                       // 274
                return this.unix();                                                                                    // 275
            },                                                                                                         // 276
            Q : function () {                                                                                          // 277
                return this.quarter();                                                                                 // 278
            }                                                                                                          // 279
        },                                                                                                             // 280
                                                                                                                       // 281
        deprecations = {},                                                                                             // 282
                                                                                                                       // 283
        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'];                                 // 284
                                                                                                                       // 285
    // Pick the first defined of two or three arguments. dfl comes from                                                // 286
    // default.                                                                                                        // 287
    function dfl(a, b, c) {                                                                                            // 288
        switch (arguments.length) {                                                                                    // 289
            case 2: return a != null ? a : b;                                                                          // 290
            case 3: return a != null ? a : b != null ? b : c;                                                          // 291
            default: throw new Error('Implement me');                                                                  // 292
        }                                                                                                              // 293
    }                                                                                                                  // 294
                                                                                                                       // 295
    function defaultParsingFlags() {                                                                                   // 296
        // We need to deep clone this object, and es5 standard is not very                                             // 297
        // helpful.                                                                                                    // 298
        return {                                                                                                       // 299
            empty : false,                                                                                             // 300
            unusedTokens : [],                                                                                         // 301
            unusedInput : [],                                                                                          // 302
            overflow : -2,                                                                                             // 303
            charsLeftOver : 0,                                                                                         // 304
            nullInput : false,                                                                                         // 305
            invalidMonth : null,                                                                                       // 306
            invalidFormat : false,                                                                                     // 307
            userInvalidated : false,                                                                                   // 308
            iso: false                                                                                                 // 309
        };                                                                                                             // 310
    }                                                                                                                  // 311
                                                                                                                       // 312
    function printMsg(msg) {                                                                                           // 313
        if (moment.suppressDeprecationWarnings === false &&                                                            // 314
                typeof console !== 'undefined' && console.warn) {                                                      // 315
            console.warn("Deprecation warning: " + msg);                                                               // 316
        }                                                                                                              // 317
    }                                                                                                                  // 318
                                                                                                                       // 319
    function deprecate(msg, fn) {                                                                                      // 320
        var firstTime = true;                                                                                          // 321
        return extend(function () {                                                                                    // 322
            if (firstTime) {                                                                                           // 323
                printMsg(msg);                                                                                         // 324
                firstTime = false;                                                                                     // 325
            }                                                                                                          // 326
            return fn.apply(this, arguments);                                                                          // 327
        }, fn);                                                                                                        // 328
    }                                                                                                                  // 329
                                                                                                                       // 330
    function deprecateSimple(name, msg) {                                                                              // 331
        if (!deprecations[name]) {                                                                                     // 332
            printMsg(msg);                                                                                             // 333
            deprecations[name] = true;                                                                                 // 334
        }                                                                                                              // 335
    }                                                                                                                  // 336
                                                                                                                       // 337
    function padToken(func, count) {                                                                                   // 338
        return function (a) {                                                                                          // 339
            return leftZeroFill(func.call(this, a), count);                                                            // 340
        };                                                                                                             // 341
    }                                                                                                                  // 342
    function ordinalizeToken(func, period) {                                                                           // 343
        return function (a) {                                                                                          // 344
            return this.localeData().ordinal(func.call(this, a), period);                                              // 345
        };                                                                                                             // 346
    }                                                                                                                  // 347
                                                                                                                       // 348
    while (ordinalizeTokens.length) {                                                                                  // 349
        i = ordinalizeTokens.pop();                                                                                    // 350
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);                                   // 351
    }                                                                                                                  // 352
    while (paddedTokens.length) {                                                                                      // 353
        i = paddedTokens.pop();                                                                                        // 354
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);                                            // 355
    }                                                                                                                  // 356
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);                                                 // 357
                                                                                                                       // 358
                                                                                                                       // 359
    /************************************                                                                              // 360
        Constructors                                                                                                   // 361
    ************************************/                                                                              // 362
                                                                                                                       // 363
    function Locale() {                                                                                                // 364
    }                                                                                                                  // 365
                                                                                                                       // 366
    // Moment prototype object                                                                                         // 367
    function Moment(config, skipOverflow) {                                                                            // 368
        if (skipOverflow !== false) {                                                                                  // 369
            checkOverflow(config);                                                                                     // 370
        }                                                                                                              // 371
        copyConfig(this, config);                                                                                      // 372
        this._d = new Date(+config._d);                                                                                // 373
    }                                                                                                                  // 374
                                                                                                                       // 375
    // Duration Constructor                                                                                            // 376
    function Duration(duration) {                                                                                      // 377
        var normalizedInput = normalizeObjectUnits(duration),                                                          // 378
            years = normalizedInput.year || 0,                                                                         // 379
            quarters = normalizedInput.quarter || 0,                                                                   // 380
            months = normalizedInput.month || 0,                                                                       // 381
            weeks = normalizedInput.week || 0,                                                                         // 382
            days = normalizedInput.day || 0,                                                                           // 383
            hours = normalizedInput.hour || 0,                                                                         // 384
            minutes = normalizedInput.minute || 0,                                                                     // 385
            seconds = normalizedInput.second || 0,                                                                     // 386
            milliseconds = normalizedInput.millisecond || 0;                                                           // 387
                                                                                                                       // 388
        // representation for dateAddRemove                                                                            // 389
        this._milliseconds = +milliseconds +                                                                           // 390
            seconds * 1e3 + // 1000                                                                                    // 391
            minutes * 6e4 + // 1000 * 60                                                                               // 392
            hours * 36e5; // 1000 * 60 * 60                                                                            // 393
        // Because of dateAddRemove treats 24 hours as different from a                                                // 394
        // day when working around DST, we need to store them separately                                               // 395
        this._days = +days +                                                                                           // 396
            weeks * 7;                                                                                                 // 397
        // It is impossible translate months into days without knowing                                                 // 398
        // which months you are are talking about, so we have to store                                                 // 399
        // it separately.                                                                                              // 400
        this._months = +months +                                                                                       // 401
            quarters * 3 +                                                                                             // 402
            years * 12;                                                                                                // 403
                                                                                                                       // 404
        this._data = {};                                                                                               // 405
                                                                                                                       // 406
        this._locale = moment.localeData();                                                                            // 407
                                                                                                                       // 408
        this._bubble();                                                                                                // 409
    }                                                                                                                  // 410
                                                                                                                       // 411
    /************************************                                                                              // 412
        Helpers                                                                                                        // 413
    ************************************/                                                                              // 414
                                                                                                                       // 415
                                                                                                                       // 416
    function extend(a, b) {                                                                                            // 417
        for (var i in b) {                                                                                             // 418
            if (b.hasOwnProperty(i)) {                                                                                 // 419
                a[i] = b[i];                                                                                           // 420
            }                                                                                                          // 421
        }                                                                                                              // 422
                                                                                                                       // 423
        if (b.hasOwnProperty('toString')) {                                                                            // 424
            a.toString = b.toString;                                                                                   // 425
        }                                                                                                              // 426
                                                                                                                       // 427
        if (b.hasOwnProperty('valueOf')) {                                                                             // 428
            a.valueOf = b.valueOf;                                                                                     // 429
        }                                                                                                              // 430
                                                                                                                       // 431
        return a;                                                                                                      // 432
    }                                                                                                                  // 433
                                                                                                                       // 434
    function copyConfig(to, from) {                                                                                    // 435
        var i, prop, val;                                                                                              // 436
                                                                                                                       // 437
        if (typeof from._isAMomentObject !== 'undefined') {                                                            // 438
            to._isAMomentObject = from._isAMomentObject;                                                               // 439
        }                                                                                                              // 440
        if (typeof from._i !== 'undefined') {                                                                          // 441
            to._i = from._i;                                                                                           // 442
        }                                                                                                              // 443
        if (typeof from._f !== 'undefined') {                                                                          // 444
            to._f = from._f;                                                                                           // 445
        }                                                                                                              // 446
        if (typeof from._l !== 'undefined') {                                                                          // 447
            to._l = from._l;                                                                                           // 448
        }                                                                                                              // 449
        if (typeof from._strict !== 'undefined') {                                                                     // 450
            to._strict = from._strict;                                                                                 // 451
        }                                                                                                              // 452
        if (typeof from._tzm !== 'undefined') {                                                                        // 453
            to._tzm = from._tzm;                                                                                       // 454
        }                                                                                                              // 455
        if (typeof from._isUTC !== 'undefined') {                                                                      // 456
            to._isUTC = from._isUTC;                                                                                   // 457
        }                                                                                                              // 458
        if (typeof from._offset !== 'undefined') {                                                                     // 459
            to._offset = from._offset;                                                                                 // 460
        }                                                                                                              // 461
        if (typeof from._pf !== 'undefined') {                                                                         // 462
            to._pf = from._pf;                                                                                         // 463
        }                                                                                                              // 464
        if (typeof from._locale !== 'undefined') {                                                                     // 465
            to._locale = from._locale;                                                                                 // 466
        }                                                                                                              // 467
                                                                                                                       // 468
        if (momentProperties.length > 0) {                                                                             // 469
            for (i in momentProperties) {                                                                              // 470
                prop = momentProperties[i];                                                                            // 471
                val = from[prop];                                                                                      // 472
                if (typeof val !== 'undefined') {                                                                      // 473
                    to[prop] = val;                                                                                    // 474
                }                                                                                                      // 475
            }                                                                                                          // 476
        }                                                                                                              // 477
                                                                                                                       // 478
        return to;                                                                                                     // 479
    }                                                                                                                  // 480
                                                                                                                       // 481
    function absRound(number) {                                                                                        // 482
        if (number < 0) {                                                                                              // 483
            return Math.ceil(number);                                                                                  // 484
        } else {                                                                                                       // 485
            return Math.floor(number);                                                                                 // 486
        }                                                                                                              // 487
    }                                                                                                                  // 488
                                                                                                                       // 489
    // left zero fill a number                                                                                         // 490
    // see http://jsperf.com/left-zero-filling for performance comparison                                              // 491
    function leftZeroFill(number, targetLength, forceSign) {                                                           // 492
        var output = '' + Math.abs(number),                                                                            // 493
            sign = number >= 0;                                                                                        // 494
                                                                                                                       // 495
        while (output.length < targetLength) {                                                                         // 496
            output = '0' + output;                                                                                     // 497
        }                                                                                                              // 498
        return (sign ? (forceSign ? '+' : '') : '-') + output;                                                         // 499
    }                                                                                                                  // 500
                                                                                                                       // 501
    function positiveMomentsDifference(base, other) {                                                                  // 502
        var res = {milliseconds: 0, months: 0};                                                                        // 503
                                                                                                                       // 504
        res.months = other.month() - base.month() +                                                                    // 505
            (other.year() - base.year()) * 12;                                                                         // 506
        if (base.clone().add(res.months, 'M').isAfter(other)) {                                                        // 507
            --res.months;                                                                                              // 508
        }                                                                                                              // 509
                                                                                                                       // 510
        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));                                              // 511
                                                                                                                       // 512
        return res;                                                                                                    // 513
    }                                                                                                                  // 514
                                                                                                                       // 515
    function momentsDifference(base, other) {                                                                          // 516
        var res;                                                                                                       // 517
        other = makeAs(other, base);                                                                                   // 518
        if (base.isBefore(other)) {                                                                                    // 519
            res = positiveMomentsDifference(base, other);                                                              // 520
        } else {                                                                                                       // 521
            res = positiveMomentsDifference(other, base);                                                              // 522
            res.milliseconds = -res.milliseconds;                                                                      // 523
            res.months = -res.months;                                                                                  // 524
        }                                                                                                              // 525
                                                                                                                       // 526
        return res;                                                                                                    // 527
    }                                                                                                                  // 528
                                                                                                                       // 529
    // TODO: remove 'name' arg after deprecation is removed                                                            // 530
    function createAdder(direction, name) {                                                                            // 531
        return function (val, period) {                                                                                // 532
            var dur, tmp;                                                                                              // 533
            //invert the arguments, but complain about it                                                              // 534
            if (period !== null && !isNaN(+period)) {                                                                  // 535
                deprecateSimple(name, "moment()." + name  + "(period, number) is deprecated. Please use moment()." + name + "(number, period).");
                tmp = val; val = period; period = tmp;                                                                 // 537
            }                                                                                                          // 538
                                                                                                                       // 539
            val = typeof val === 'string' ? +val : val;                                                                // 540
            dur = moment.duration(val, period);                                                                        // 541
            addOrSubtractDurationFromMoment(this, dur, direction);                                                     // 542
            return this;                                                                                               // 543
        };                                                                                                             // 544
    }                                                                                                                  // 545
                                                                                                                       // 546
    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {                                  // 547
        var milliseconds = duration._milliseconds,                                                                     // 548
            days = duration._days,                                                                                     // 549
            months = duration._months;                                                                                 // 550
        updateOffset = updateOffset == null ? true : updateOffset;                                                     // 551
                                                                                                                       // 552
        if (milliseconds) {                                                                                            // 553
            mom._d.setTime(+mom._d + milliseconds * isAdding);                                                         // 554
        }                                                                                                              // 555
        if (days) {                                                                                                    // 556
            rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);                                          // 557
        }                                                                                                              // 558
        if (months) {                                                                                                  // 559
            rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);                                          // 560
        }                                                                                                              // 561
        if (updateOffset) {                                                                                            // 562
            moment.updateOffset(mom, days || months);                                                                  // 563
        }                                                                                                              // 564
    }                                                                                                                  // 565
                                                                                                                       // 566
    // check if is an array                                                                                            // 567
    function isArray(input) {                                                                                          // 568
        return Object.prototype.toString.call(input) === '[object Array]';                                             // 569
    }                                                                                                                  // 570
                                                                                                                       // 571
    function isDate(input) {                                                                                           // 572
        return Object.prototype.toString.call(input) === '[object Date]' ||                                            // 573
            input instanceof Date;                                                                                     // 574
    }                                                                                                                  // 575
                                                                                                                       // 576
    // compare two arrays, return the number of differences                                                            // 577
    function compareArrays(array1, array2, dontConvert) {                                                              // 578
        var len = Math.min(array1.length, array2.length),                                                              // 579
            lengthDiff = Math.abs(array1.length - array2.length),                                                      // 580
            diffs = 0,                                                                                                 // 581
            i;                                                                                                         // 582
        for (i = 0; i < len; i++) {                                                                                    // 583
            if ((dontConvert && array1[i] !== array2[i]) ||                                                            // 584
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {                                             // 585
                diffs++;                                                                                               // 586
            }                                                                                                          // 587
        }                                                                                                              // 588
        return diffs + lengthDiff;                                                                                     // 589
    }                                                                                                                  // 590
                                                                                                                       // 591
    function normalizeUnits(units) {                                                                                   // 592
        if (units) {                                                                                                   // 593
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');                                                  // 594
            units = unitAliases[units] || camelFunctions[lowered] || lowered;                                          // 595
        }                                                                                                              // 596
        return units;                                                                                                  // 597
    }                                                                                                                  // 598
                                                                                                                       // 599
    function normalizeObjectUnits(inputObject) {                                                                       // 600
        var normalizedInput = {},                                                                                      // 601
            normalizedProp,                                                                                            // 602
            prop;                                                                                                      // 603
                                                                                                                       // 604
        for (prop in inputObject) {                                                                                    // 605
            if (inputObject.hasOwnProperty(prop)) {                                                                    // 606
                normalizedProp = normalizeUnits(prop);                                                                 // 607
                if (normalizedProp) {                                                                                  // 608
                    normalizedInput[normalizedProp] = inputObject[prop];                                               // 609
                }                                                                                                      // 610
            }                                                                                                          // 611
        }                                                                                                              // 612
                                                                                                                       // 613
        return normalizedInput;                                                                                        // 614
    }                                                                                                                  // 615
                                                                                                                       // 616
    function makeList(field) {                                                                                         // 617
        var count, setter;                                                                                             // 618
                                                                                                                       // 619
        if (field.indexOf('week') === 0) {                                                                             // 620
            count = 7;                                                                                                 // 621
            setter = 'day';                                                                                            // 622
        }                                                                                                              // 623
        else if (field.indexOf('month') === 0) {                                                                       // 624
            count = 12;                                                                                                // 625
            setter = 'month';                                                                                          // 626
        }                                                                                                              // 627
        else {                                                                                                         // 628
            return;                                                                                                    // 629
        }                                                                                                              // 630
                                                                                                                       // 631
        moment[field] = function (format, index) {                                                                     // 632
            var i, getter,                                                                                             // 633
                method = moment._locale[field],                                                                        // 634
                results = [];                                                                                          // 635
                                                                                                                       // 636
            if (typeof format === 'number') {                                                                          // 637
                index = format;                                                                                        // 638
                format = undefined;                                                                                    // 639
            }                                                                                                          // 640
                                                                                                                       // 641
            getter = function (i) {                                                                                    // 642
                var m = moment().utc().set(setter, i);                                                                 // 643
                return method.call(moment._locale, m, format || '');                                                   // 644
            };                                                                                                         // 645
                                                                                                                       // 646
            if (index != null) {                                                                                       // 647
                return getter(index);                                                                                  // 648
            }                                                                                                          // 649
            else {                                                                                                     // 650
                for (i = 0; i < count; i++) {                                                                          // 651
                    results.push(getter(i));                                                                           // 652
                }                                                                                                      // 653
                return results;                                                                                        // 654
            }                                                                                                          // 655
        };                                                                                                             // 656
    }                                                                                                                  // 657
                                                                                                                       // 658
    function toInt(argumentForCoercion) {                                                                              // 659
        var coercedNumber = +argumentForCoercion,                                                                      // 660
            value = 0;                                                                                                 // 661
                                                                                                                       // 662
        if (coercedNumber !== 0 && isFinite(coercedNumber)) {                                                          // 663
            if (coercedNumber >= 0) {                                                                                  // 664
                value = Math.floor(coercedNumber);                                                                     // 665
            } else {                                                                                                   // 666
                value = Math.ceil(coercedNumber);                                                                      // 667
            }                                                                                                          // 668
        }                                                                                                              // 669
                                                                                                                       // 670
        return value;                                                                                                  // 671
    }                                                                                                                  // 672
                                                                                                                       // 673
    function daysInMonth(year, month) {                                                                                // 674
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();                                                    // 675
    }                                                                                                                  // 676
                                                                                                                       // 677
    function weeksInYear(year, dow, doy) {                                                                             // 678
        return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;                                          // 679
    }                                                                                                                  // 680
                                                                                                                       // 681
    function daysInYear(year) {                                                                                        // 682
        return isLeapYear(year) ? 366 : 365;                                                                           // 683
    }                                                                                                                  // 684
                                                                                                                       // 685
    function isLeapYear(year) {                                                                                        // 686
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;                                               // 687
    }                                                                                                                  // 688
                                                                                                                       // 689
    function checkOverflow(m) {                                                                                        // 690
        var overflow;                                                                                                  // 691
        if (m._a && m._pf.overflow === -2) {                                                                           // 692
            overflow =                                                                                                 // 693
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :                                                          // 694
                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :                           // 695
                m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR :                                                             // 696
                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :                                                       // 697
                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :                                                       // 698
                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :                                       // 699
                -1;                                                                                                    // 700
                                                                                                                       // 701
            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {                                    // 702
                overflow = DATE;                                                                                       // 703
            }                                                                                                          // 704
                                                                                                                       // 705
            m._pf.overflow = overflow;                                                                                 // 706
        }                                                                                                              // 707
    }                                                                                                                  // 708
                                                                                                                       // 709
    function isValid(m) {                                                                                              // 710
        if (m._isValid == null) {                                                                                      // 711
            m._isValid = !isNaN(m._d.getTime()) &&                                                                     // 712
                m._pf.overflow < 0 &&                                                                                  // 713
                !m._pf.empty &&                                                                                        // 714
                !m._pf.invalidMonth &&                                                                                 // 715
                !m._pf.nullInput &&                                                                                    // 716
                !m._pf.invalidFormat &&                                                                                // 717
                !m._pf.userInvalidated;                                                                                // 718
                                                                                                                       // 719
            if (m._strict) {                                                                                           // 720
                m._isValid = m._isValid &&                                                                             // 721
                    m._pf.charsLeftOver === 0 &&                                                                       // 722
                    m._pf.unusedTokens.length === 0;                                                                   // 723
            }                                                                                                          // 724
        }                                                                                                              // 725
        return m._isValid;                                                                                             // 726
    }                                                                                                                  // 727
                                                                                                                       // 728
    function normalizeLocale(key) {                                                                                    // 729
        return key ? key.toLowerCase().replace('_', '-') : key;                                                        // 730
    }                                                                                                                  // 731
                                                                                                                       // 732
    // pick the locale from the array                                                                                  // 733
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each                       // 734
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {                                                                                     // 736
        var i = 0, j, next, locale, split;                                                                             // 737
                                                                                                                       // 738
        while (i < names.length) {                                                                                     // 739
            split = normalizeLocale(names[i]).split('-');                                                              // 740
            j = split.length;                                                                                          // 741
            next = normalizeLocale(names[i + 1]);                                                                      // 742
            next = next ? next.split('-') : null;                                                                      // 743
            while (j > 0) {                                                                                            // 744
                locale = loadLocale(split.slice(0, j).join('-'));                                                      // 745
                if (locale) {                                                                                          // 746
                    return locale;                                                                                     // 747
                }                                                                                                      // 748
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {                           // 749
                    //the next array item is better than a shallower substring of this one                             // 750
                    break;                                                                                             // 751
                }                                                                                                      // 752
                j--;                                                                                                   // 753
            }                                                                                                          // 754
            i++;                                                                                                       // 755
        }                                                                                                              // 756
        return null;                                                                                                   // 757
    }                                                                                                                  // 758
                                                                                                                       // 759
    function loadLocale(name) {                                                                                        // 760
        var oldLocale = null;                                                                                          // 761
        if (!locales[name] && hasModule) {                                                                             // 762
            try {                                                                                                      // 763
                oldLocale = moment.locale();                                                                           // 764
                require('./locale/' + name);                                                                           // 765
                // because defineLocale currently also sets the global locale, we want to undo that for lazy loaded locales
                moment.locale(oldLocale);                                                                              // 767
            } catch (e) { }                                                                                            // 768
        }                                                                                                              // 769
        return locales[name];                                                                                          // 770
    }                                                                                                                  // 771
                                                                                                                       // 772
    // Return a moment from input, that is local/utc/zone equivalent to model.                                         // 773
    function makeAs(input, model) {                                                                                    // 774
        return model._isUTC ? moment(input).zone(model._offset || 0) :                                                 // 775
            moment(input).local();                                                                                     // 776
    }                                                                                                                  // 777
                                                                                                                       // 778
    /************************************                                                                              // 779
        Locale                                                                                                         // 780
    ************************************/                                                                              // 781
                                                                                                                       // 782
                                                                                                                       // 783
    extend(Locale.prototype, {                                                                                         // 784
                                                                                                                       // 785
        set : function (config) {                                                                                      // 786
            var prop, i;                                                                                               // 787
            for (i in config) {                                                                                        // 788
                prop = config[i];                                                                                      // 789
                if (typeof prop === 'function') {                                                                      // 790
                    this[i] = prop;                                                                                    // 791
                } else {                                                                                               // 792
                    this['_' + i] = prop;                                                                              // 793
                }                                                                                                      // 794
            }                                                                                                          // 795
        },                                                                                                             // 796
                                                                                                                       // 797
        _months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),  // 798
        months : function (m) {                                                                                        // 799
            return this._months[m.month()];                                                                            // 800
        },                                                                                                             // 801
                                                                                                                       // 802
        _monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),                                   // 803
        monthsShort : function (m) {                                                                                   // 804
            return this._monthsShort[m.month()];                                                                       // 805
        },                                                                                                             // 806
                                                                                                                       // 807
        monthsParse : function (monthName) {                                                                           // 808
            var i, mom, regex;                                                                                         // 809
                                                                                                                       // 810
            if (!this._monthsParse) {                                                                                  // 811
                this._monthsParse = [];                                                                                // 812
            }                                                                                                          // 813
                                                                                                                       // 814
            for (i = 0; i < 12; i++) {                                                                                 // 815
                // make the regex if we don't have it already                                                          // 816
                if (!this._monthsParse[i]) {                                                                           // 817
                    mom = moment.utc([2000, i]);                                                                       // 818
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');                             // 819
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');                                    // 820
                }                                                                                                      // 821
                // test the regex                                                                                      // 822
                if (this._monthsParse[i].test(monthName)) {                                                            // 823
                    return i;                                                                                          // 824
                }                                                                                                      // 825
            }                                                                                                          // 826
        },                                                                                                             // 827
                                                                                                                       // 828
        _weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),                             // 829
        weekdays : function (m) {                                                                                      // 830
            return this._weekdays[m.day()];                                                                            // 831
        },                                                                                                             // 832
                                                                                                                       // 833
        _weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),                                                     // 834
        weekdaysShort : function (m) {                                                                                 // 835
            return this._weekdaysShort[m.day()];                                                                       // 836
        },                                                                                                             // 837
                                                                                                                       // 838
        _weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),                                                              // 839
        weekdaysMin : function (m) {                                                                                   // 840
            return this._weekdaysMin[m.day()];                                                                         // 841
        },                                                                                                             // 842
                                                                                                                       // 843
        weekdaysParse : function (weekdayName) {                                                                       // 844
            var i, mom, regex;                                                                                         // 845
                                                                                                                       // 846
            if (!this._weekdaysParse) {                                                                                // 847
                this._weekdaysParse = [];                                                                              // 848
            }                                                                                                          // 849
                                                                                                                       // 850
            for (i = 0; i < 7; i++) {                                                                                  // 851
                // make the regex if we don't have it already                                                          // 852
                if (!this._weekdaysParse[i]) {                                                                         // 853
                    mom = moment([2000, 1]).day(i);                                                                    // 854
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');                                  // 856
                }                                                                                                      // 857
                // test the regex                                                                                      // 858
                if (this._weekdaysParse[i].test(weekdayName)) {                                                        // 859
                    return i;                                                                                          // 860
                }                                                                                                      // 861
            }                                                                                                          // 862
        },                                                                                                             // 863
                                                                                                                       // 864
        _longDateFormat : {                                                                                            // 865
            LT : 'h:mm A',                                                                                             // 866
            L : 'MM/DD/YYYY',                                                                                          // 867
            LL : 'MMMM D, YYYY',                                                                                       // 868
            LLL : 'MMMM D, YYYY LT',                                                                                   // 869
            LLLL : 'dddd, MMMM D, YYYY LT'                                                                             // 870
        },                                                                                                             // 871
        longDateFormat : function (key) {                                                                              // 872
            var output = this._longDateFormat[key];                                                                    // 873
            if (!output && this._longDateFormat[key.toUpperCase()]) {                                                  // 874
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {          // 875
                    return val.slice(1);                                                                               // 876
                });                                                                                                    // 877
                this._longDateFormat[key] = output;                                                                    // 878
            }                                                                                                          // 879
            return output;                                                                                             // 880
        },                                                                                                             // 881
                                                                                                                       // 882
        isPM : function (input) {                                                                                      // 883
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays                         // 884
            // Using charAt should be more compatible.                                                                 // 885
            return ((input + '').toLowerCase().charAt(0) === 'p');                                                     // 886
        },                                                                                                             // 887
                                                                                                                       // 888
        _meridiemParse : /[ap]\.?m?\.?/i,                                                                              // 889
        meridiem : function (hours, minutes, isLower) {                                                                // 890
            if (hours > 11) {                                                                                          // 891
                return isLower ? 'pm' : 'PM';                                                                          // 892
            } else {                                                                                                   // 893
                return isLower ? 'am' : 'AM';                                                                          // 894
            }                                                                                                          // 895
        },                                                                                                             // 896
                                                                                                                       // 897
        _calendar : {                                                                                                  // 898
            sameDay : '[Today at] LT',                                                                                 // 899
            nextDay : '[Tomorrow at] LT',                                                                              // 900
            nextWeek : 'dddd [at] LT',                                                                                 // 901
            lastDay : '[Yesterday at] LT',                                                                             // 902
            lastWeek : '[Last] dddd [at] LT',                                                                          // 903
            sameElse : 'L'                                                                                             // 904
        },                                                                                                             // 905
        calendar : function (key, mom) {                                                                               // 906
            var output = this._calendar[key];                                                                          // 907
            return typeof output === 'function' ? output.apply(mom) : output;                                          // 908
        },                                                                                                             // 909
                                                                                                                       // 910
        _relativeTime : {                                                                                              // 911
            future : 'in %s',                                                                                          // 912
            past : '%s ago',                                                                                           // 913
            s : 'a few seconds',                                                                                       // 914
            m : 'a minute',                                                                                            // 915
            mm : '%d minutes',                                                                                         // 916
            h : 'an hour',                                                                                             // 917
            hh : '%d hours',                                                                                           // 918
            d : 'a day',                                                                                               // 919
            dd : '%d days',                                                                                            // 920
            M : 'a month',                                                                                             // 921
            MM : '%d months',                                                                                          // 922
            y : 'a year',                                                                                              // 923
            yy : '%d years'                                                                                            // 924
        },                                                                                                             // 925
                                                                                                                       // 926
        relativeTime : function (number, withoutSuffix, string, isFuture) {                                            // 927
            var output = this._relativeTime[string];                                                                   // 928
            return (typeof output === 'function') ?                                                                    // 929
                output(number, withoutSuffix, string, isFuture) :                                                      // 930
                output.replace(/%d/i, number);                                                                         // 931
        },                                                                                                             // 932
                                                                                                                       // 933
        pastFuture : function (diff, output) {                                                                         // 934
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];                                             // 935
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);                      // 936
        },                                                                                                             // 937
                                                                                                                       // 938
        ordinal : function (number) {                                                                                  // 939
            return this._ordinal.replace('%d', number);                                                                // 940
        },                                                                                                             // 941
        _ordinal : '%d',                                                                                               // 942
                                                                                                                       // 943
        preparse : function (string) {                                                                                 // 944
            return string;                                                                                             // 945
        },                                                                                                             // 946
                                                                                                                       // 947
        postformat : function (string) {                                                                               // 948
            return string;                                                                                             // 949
        },                                                                                                             // 950
                                                                                                                       // 951
        week : function (mom) {                                                                                        // 952
            return weekOfYear(mom, this._week.dow, this._week.doy).week;                                               // 953
        },                                                                                                             // 954
                                                                                                                       // 955
        _week : {                                                                                                      // 956
            dow : 0, // Sunday is the first day of the week.                                                           // 957
            doy : 6  // The week that contains Jan 1st is the first week of the year.                                  // 958
        },                                                                                                             // 959
                                                                                                                       // 960
        _invalidDate: 'Invalid date',                                                                                  // 961
        invalidDate: function () {                                                                                     // 962
            return this._invalidDate;                                                                                  // 963
        }                                                                                                              // 964
    });                                                                                                                // 965
                                                                                                                       // 966
    /************************************                                                                              // 967
        Formatting                                                                                                     // 968
    ************************************/                                                                              // 969
                                                                                                                       // 970
                                                                                                                       // 971
    function removeFormattingTokens(input) {                                                                           // 972
        if (input.match(/\[[\s\S]/)) {                                                                                 // 973
            return input.replace(/^\[|\]$/g, '');                                                                      // 974
        }                                                                                                              // 975
        return input.replace(/\\/g, '');                                                                               // 976
    }                                                                                                                  // 977
                                                                                                                       // 978
    function makeFormatFunction(format) {                                                                              // 979
        var array = format.match(formattingTokens), i, length;                                                         // 980
                                                                                                                       // 981
        for (i = 0, length = array.length; i < length; i++) {                                                          // 982
            if (formatTokenFunctions[array[i]]) {                                                                      // 983
                array[i] = formatTokenFunctions[array[i]];                                                             // 984
            } else {                                                                                                   // 985
                array[i] = removeFormattingTokens(array[i]);                                                           // 986
            }                                                                                                          // 987
        }                                                                                                              // 988
                                                                                                                       // 989
        return function (mom) {                                                                                        // 990
            var output = '';                                                                                           // 991
            for (i = 0; i < length; i++) {                                                                             // 992
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];                        // 993
            }                                                                                                          // 994
            return output;                                                                                             // 995
        };                                                                                                             // 996
    }                                                                                                                  // 997
                                                                                                                       // 998
    // format date using native date object                                                                            // 999
    function formatMoment(m, format) {                                                                                 // 1000
        if (!m.isValid()) {                                                                                            // 1001
            return m.localeData().invalidDate();                                                                       // 1002
        }                                                                                                              // 1003
                                                                                                                       // 1004
        format = expandFormat(format, m.localeData());                                                                 // 1005
                                                                                                                       // 1006
        if (!formatFunctions[format]) {                                                                                // 1007
            formatFunctions[format] = makeFormatFunction(format);                                                      // 1008
        }                                                                                                              // 1009
                                                                                                                       // 1010
        return formatFunctions[format](m);                                                                             // 1011
    }                                                                                                                  // 1012
                                                                                                                       // 1013
    function expandFormat(format, locale) {                                                                            // 1014
        var i = 5;                                                                                                     // 1015
                                                                                                                       // 1016
        function replaceLongDateFormatTokens(input) {                                                                  // 1017
            return locale.longDateFormat(input) || input;                                                              // 1018
        }                                                                                                              // 1019
                                                                                                                       // 1020
        localFormattingTokens.lastIndex = 0;                                                                           // 1021
        while (i >= 0 && localFormattingTokens.test(format)) {                                                         // 1022
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);                               // 1023
            localFormattingTokens.lastIndex = 0;                                                                       // 1024
            i -= 1;                                                                                                    // 1025
        }                                                                                                              // 1026
                                                                                                                       // 1027
        return format;                                                                                                 // 1028
    }                                                                                                                  // 1029
                                                                                                                       // 1030
                                                                                                                       // 1031
    /************************************                                                                              // 1032
        Parsing                                                                                                        // 1033
    ************************************/                                                                              // 1034
                                                                                                                       // 1035
                                                                                                                       // 1036
    // get the regex to find the next token                                                                            // 1037
    function getParseRegexForToken(token, config) {                                                                    // 1038
        var a, strict = config._strict;                                                                                // 1039
        switch (token) {                                                                                               // 1040
        case 'Q':                                                                                                      // 1041
            return parseTokenOneDigit;                                                                                 // 1042
        case 'DDDD':                                                                                                   // 1043
            return parseTokenThreeDigits;                                                                              // 1044
        case 'YYYY':                                                                                                   // 1045
        case 'GGGG':                                                                                                   // 1046
        case 'gggg':                                                                                                   // 1047
            return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;                                          // 1048
        case 'Y':                                                                                                      // 1049
        case 'G':                                                                                                      // 1050
        case 'g':                                                                                                      // 1051
            return parseTokenSignedNumber;                                                                             // 1052
        case 'YYYYYY':                                                                                                 // 1053
        case 'YYYYY':                                                                                                  // 1054
        case 'GGGGG':                                                                                                  // 1055
        case 'ggggg':                                                                                                  // 1056
            return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;                                            // 1057
        case 'S':                                                                                                      // 1058
            if (strict) {                                                                                              // 1059
                return parseTokenOneDigit;                                                                             // 1060
            }                                                                                                          // 1061
            /* falls through */                                                                                        // 1062
        case 'SS':                                                                                                     // 1063
            if (strict) {                                                                                              // 1064
                return parseTokenTwoDigits;                                                                            // 1065
            }                                                                                                          // 1066
            /* falls through */                                                                                        // 1067
        case 'SSS':                                                                                                    // 1068
            if (strict) {                                                                                              // 1069
                return parseTokenThreeDigits;                                                                          // 1070
            }                                                                                                          // 1071
            /* falls through */                                                                                        // 1072
        case 'DDD':                                                                                                    // 1073
            return parseTokenOneToThreeDigits;                                                                         // 1074
        case 'MMM':                                                                                                    // 1075
        case 'MMMM':                                                                                                   // 1076
        case 'dd':                                                                                                     // 1077
        case 'ddd':                                                                                                    // 1078
        case 'dddd':                                                                                                   // 1079
            return parseTokenWord;                                                                                     // 1080
        case 'a':                                                                                                      // 1081
        case 'A':                                                                                                      // 1082
            return config._locale._meridiemParse;                                                                      // 1083
        case 'X':                                                                                                      // 1084
            return parseTokenTimestampMs;                                                                              // 1085
        case 'Z':                                                                                                      // 1086
        case 'ZZ':                                                                                                     // 1087
            return parseTokenTimezone;                                                                                 // 1088
        case 'T':                                                                                                      // 1089
            return parseTokenT;                                                                                        // 1090
        case 'SSSS':                                                                                                   // 1091
            return parseTokenDigits;                                                                                   // 1092
        case 'MM':                                                                                                     // 1093
        case 'DD':                                                                                                     // 1094
        case 'YY':                                                                                                     // 1095
        case 'GG':                                                                                                     // 1096
        case 'gg':                                                                                                     // 1097
        case 'HH':                                                                                                     // 1098
        case 'hh':                                                                                                     // 1099
        case 'mm':                                                                                                     // 1100
        case 'ss':                                                                                                     // 1101
        case 'ww':                                                                                                     // 1102
        case 'WW':                                                                                                     // 1103
            return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;                                            // 1104
        case 'M':                                                                                                      // 1105
        case 'D':                                                                                                      // 1106
        case 'd':                                                                                                      // 1107
        case 'H':                                                                                                      // 1108
        case 'h':                                                                                                      // 1109
        case 'm':                                                                                                      // 1110
        case 's':                                                                                                      // 1111
        case 'w':                                                                                                      // 1112
        case 'W':                                                                                                      // 1113
        case 'e':                                                                                                      // 1114
        case 'E':                                                                                                      // 1115
            return parseTokenOneOrTwoDigits;                                                                           // 1116
        case 'Do':                                                                                                     // 1117
            return parseTokenOrdinal;                                                                                  // 1118
        default :                                                                                                      // 1119
            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), 'i'));                                // 1120
            return a;                                                                                                  // 1121
        }                                                                                                              // 1122
    }                                                                                                                  // 1123
                                                                                                                       // 1124
    function timezoneMinutesFromString(string) {                                                                       // 1125
        string = string || '';                                                                                         // 1126
        var possibleTzMatches = (string.match(parseTokenTimezone) || []),                                              // 1127
            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],                                           // 1128
            parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],                                         // 1129
            minutes = +(parts[1] * 60) + toInt(parts[2]);                                                              // 1130
                                                                                                                       // 1131
        return parts[0] === '+' ? -minutes : minutes;                                                                  // 1132
    }                                                                                                                  // 1133
                                                                                                                       // 1134
    // function to convert string input to date                                                                        // 1135
    function addTimeToArrayFromToken(token, input, config) {                                                           // 1136
        var a, datePartArray = config._a;                                                                              // 1137
                                                                                                                       // 1138
        switch (token) {                                                                                               // 1139
        // QUARTER                                                                                                     // 1140
        case 'Q':                                                                                                      // 1141
            if (input != null) {                                                                                       // 1142
                datePartArray[MONTH] = (toInt(input) - 1) * 3;                                                         // 1143
            }                                                                                                          // 1144
            break;                                                                                                     // 1145
        // MONTH                                                                                                       // 1146
        case 'M' : // fall through to MM                                                                               // 1147
        case 'MM' :                                                                                                    // 1148
            if (input != null) {                                                                                       // 1149
                datePartArray[MONTH] = toInt(input) - 1;                                                               // 1150
            }                                                                                                          // 1151
            break;                                                                                                     // 1152
        case 'MMM' : // fall through to MMMM                                                                           // 1153
        case 'MMMM' :                                                                                                  // 1154
            a = config._locale.monthsParse(input);                                                                     // 1155
            // if we didn't find a month name, mark the date as invalid.                                               // 1156
            if (a != null) {                                                                                           // 1157
                datePartArray[MONTH] = a;                                                                              // 1158
            } else {                                                                                                   // 1159
                config._pf.invalidMonth = input;                                                                       // 1160
            }                                                                                                          // 1161
            break;                                                                                                     // 1162
        // DAY OF MONTH                                                                                                // 1163
        case 'D' : // fall through to DD                                                                               // 1164
        case 'DD' :                                                                                                    // 1165
            if (input != null) {                                                                                       // 1166
                datePartArray[DATE] = toInt(input);                                                                    // 1167
            }                                                                                                          // 1168
            break;                                                                                                     // 1169
        case 'Do' :                                                                                                    // 1170
            if (input != null) {                                                                                       // 1171
                datePartArray[DATE] = toInt(parseInt(input, 10));                                                      // 1172
            }                                                                                                          // 1173
            break;                                                                                                     // 1174
        // DAY OF YEAR                                                                                                 // 1175
        case 'DDD' : // fall through to DDDD                                                                           // 1176
        case 'DDDD' :                                                                                                  // 1177
            if (input != null) {                                                                                       // 1178
                config._dayOfYear = toInt(input);                                                                      // 1179
            }                                                                                                          // 1180
                                                                                                                       // 1181
            break;                                                                                                     // 1182
        // YEAR                                                                                                        // 1183
        case 'YY' :                                                                                                    // 1184
            datePartArray[YEAR] = moment.parseTwoDigitYear(input);                                                     // 1185
            break;                                                                                                     // 1186
        case 'YYYY' :                                                                                                  // 1187
        case 'YYYYY' :                                                                                                 // 1188
        case 'YYYYYY' :                                                                                                // 1189
            datePartArray[YEAR] = toInt(input);                                                                        // 1190
            break;                                                                                                     // 1191
        // AM / PM                                                                                                     // 1192
        case 'a' : // fall through to A                                                                                // 1193
        case 'A' :                                                                                                     // 1194
            config._isPm = config._locale.isPM(input);                                                                 // 1195
            break;                                                                                                     // 1196
        // 24 HOUR                                                                                                     // 1197
        case 'H' : // fall through to hh                                                                               // 1198
        case 'HH' : // fall through to hh                                                                              // 1199
        case 'h' : // fall through to hh                                                                               // 1200
        case 'hh' :                                                                                                    // 1201
            datePartArray[HOUR] = toInt(input);                                                                        // 1202
            break;                                                                                                     // 1203
        // MINUTE                                                                                                      // 1204
        case 'm' : // fall through to mm                                                                               // 1205
        case 'mm' :                                                                                                    // 1206
            datePartArray[MINUTE] = toInt(input);                                                                      // 1207
            break;                                                                                                     // 1208
        // SECOND                                                                                                      // 1209
        case 's' : // fall through to ss                                                                               // 1210
        case 'ss' :                                                                                                    // 1211
            datePartArray[SECOND] = toInt(input);                                                                      // 1212
            break;                                                                                                     // 1213
        // MILLISECOND                                                                                                 // 1214
        case 'S' :                                                                                                     // 1215
        case 'SS' :                                                                                                    // 1216
        case 'SSS' :                                                                                                   // 1217
        case 'SSSS' :                                                                                                  // 1218
            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);                                                 // 1219
            break;                                                                                                     // 1220
        // UNIX TIMESTAMP WITH MS                                                                                      // 1221
        case 'X':                                                                                                      // 1222
            config._d = new Date(parseFloat(input) * 1000);                                                            // 1223
            break;                                                                                                     // 1224
        // TIMEZONE                                                                                                    // 1225
        case 'Z' : // fall through to ZZ                                                                               // 1226
        case 'ZZ' :                                                                                                    // 1227
            config._useUTC = true;                                                                                     // 1228
            config._tzm = timezoneMinutesFromString(input);                                                            // 1229
            break;                                                                                                     // 1230
        // WEEKDAY - human                                                                                             // 1231
        case 'dd':                                                                                                     // 1232
        case 'ddd':                                                                                                    // 1233
        case 'dddd':                                                                                                   // 1234
            a = config._locale.weekdaysParse(input);                                                                   // 1235
            // if we didn't get a weekday name, mark the date as invalid                                               // 1236
            if (a != null) {                                                                                           // 1237
                config._w = config._w || {};                                                                           // 1238
                config._w['d'] = a;                                                                                    // 1239
            } else {                                                                                                   // 1240
                config._pf.invalidWeekday = input;                                                                     // 1241
            }                                                                                                          // 1242
            break;                                                                                                     // 1243
        // WEEK, WEEK DAY - numeric                                                                                    // 1244
        case 'w':                                                                                                      // 1245
        case 'ww':                                                                                                     // 1246
        case 'W':                                                                                                      // 1247
        case 'WW':                                                                                                     // 1248
        case 'd':                                                                                                      // 1249
        case 'e':                                                                                                      // 1250
        case 'E':                                                                                                      // 1251
            token = token.substr(0, 1);                                                                                // 1252
            /* falls through */                                                                                        // 1253
        case 'gggg':                                                                                                   // 1254
        case 'GGGG':                                                                                                   // 1255
        case 'GGGGG':                                                                                                  // 1256
            token = token.substr(0, 2);                                                                                // 1257
            if (input) {                                                                                               // 1258
                config._w = config._w || {};                                                                           // 1259
                config._w[token] = toInt(input);                                                                       // 1260
            }                                                                                                          // 1261
            break;                                                                                                     // 1262
        case 'gg':                                                                                                     // 1263
        case 'GG':                                                                                                     // 1264
            config._w = config._w || {};                                                                               // 1265
            config._w[token] = moment.parseTwoDigitYear(input);                                                        // 1266
        }                                                                                                              // 1267
    }                                                                                                                  // 1268
                                                                                                                       // 1269
    function dayOfYearFromWeekInfo(config) {                                                                           // 1270
        var w, weekYear, week, weekday, dow, doy, temp;                                                                // 1271
                                                                                                                       // 1272
        w = config._w;                                                                                                 // 1273
        if (w.GG != null || w.W != null || w.E != null) {                                                              // 1274
            dow = 1;                                                                                                   // 1275
            doy = 4;                                                                                                   // 1276
                                                                                                                       // 1277
            // TODO: We need to take the current isoWeekYear, but that depends on                                      // 1278
            // how we interpret now (local, utc, fixed offset). So create                                              // 1279
            // a now version of current config (take local/utc/offset flags, and                                       // 1280
            // create now).                                                                                            // 1281
            weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);                                    // 1282
            week = dfl(w.W, 1);                                                                                        // 1283
            weekday = dfl(w.E, 1);                                                                                     // 1284
        } else {                                                                                                       // 1285
            dow = config._locale._week.dow;                                                                            // 1286
            doy = config._locale._week.doy;                                                                            // 1287
                                                                                                                       // 1288
            weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);                                // 1289
            week = dfl(w.w, 1);                                                                                        // 1290
                                                                                                                       // 1291
            if (w.d != null) {                                                                                         // 1292
                // weekday -- low day numbers are considered next week                                                 // 1293
                weekday = w.d;                                                                                         // 1294
                if (weekday < dow) {                                                                                   // 1295
                    ++week;                                                                                            // 1296
                }                                                                                                      // 1297
            } else if (w.e != null) {                                                                                  // 1298
                // local weekday -- counting starts from begining of week                                              // 1299
                weekday = w.e + dow;                                                                                   // 1300
            } else {                                                                                                   // 1301
                // default to begining of week                                                                         // 1302
                weekday = dow;                                                                                         // 1303
            }                                                                                                          // 1304
        }                                                                                                              // 1305
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);                                                  // 1306
                                                                                                                       // 1307
        config._a[YEAR] = temp.year;                                                                                   // 1308
        config._dayOfYear = temp.dayOfYear;                                                                            // 1309
    }                                                                                                                  // 1310
                                                                                                                       // 1311
    // convert an array to a date.                                                                                     // 1312
    // the array should mirror the parameters below                                                                    // 1313
    // note: all values past the year are optional and will default to the lowest possible value.                      // 1314
    // [year, month, day , hour, minute, second, millisecond]                                                          // 1315
    function dateFromConfig(config) {                                                                                  // 1316
        var i, date, input = [], currentDate, yearToUse;                                                               // 1317
                                                                                                                       // 1318
        if (config._d) {                                                                                               // 1319
            return;                                                                                                    // 1320
        }                                                                                                              // 1321
                                                                                                                       // 1322
        currentDate = currentDateArray(config);                                                                        // 1323
                                                                                                                       // 1324
        //compute day of the year from weeks and weekdays                                                              // 1325
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {                                        // 1326
            dayOfYearFromWeekInfo(config);                                                                             // 1327
        }                                                                                                              // 1328
                                                                                                                       // 1329
        //if the day of the year is set, figure out what it is                                                         // 1330
        if (config._dayOfYear) {                                                                                       // 1331
            yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);                                                       // 1332
                                                                                                                       // 1333
            if (config._dayOfYear > daysInYear(yearToUse)) {                                                           // 1334
                config._pf._overflowDayOfYear = true;                                                                  // 1335
            }                                                                                                          // 1336
                                                                                                                       // 1337
            date = makeUTCDate(yearToUse, 0, config._dayOfYear);                                                       // 1338
            config._a[MONTH] = date.getUTCMonth();                                                                     // 1339
            config._a[DATE] = date.getUTCDate();                                                                       // 1340
        }                                                                                                              // 1341
                                                                                                                       // 1342
        // Default to current date.                                                                                    // 1343
        // * if no year, month, day of month are given, default to today                                               // 1344
        // * if day of month is given, default month and year                                                          // 1345
        // * if month is given, default only year                                                                      // 1346
        // * if year is given, don't default anything                                                                  // 1347
        for (i = 0; i < 3 && config._a[i] == null; ++i) {                                                              // 1348
            config._a[i] = input[i] = currentDate[i];                                                                  // 1349
        }                                                                                                              // 1350
                                                                                                                       // 1351
        // Zero out whatever was not defaulted, including time                                                         // 1352
        for (; i < 7; i++) {                                                                                           // 1353
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];                       // 1354
        }                                                                                                              // 1355
                                                                                                                       // 1356
        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);                                      // 1357
        // Apply timezone offset from input. The actual zone can be changed                                            // 1358
        // with parseZone.                                                                                             // 1359
        if (config._tzm != null) {                                                                                     // 1360
            config._d.setUTCMinutes(config._d.getUTCMinutes() + config._tzm);                                          // 1361
        }                                                                                                              // 1362
    }                                                                                                                  // 1363
                                                                                                                       // 1364
    function dateFromObject(config) {                                                                                  // 1365
        var normalizedInput;                                                                                           // 1366
                                                                                                                       // 1367
        if (config._d) {                                                                                               // 1368
            return;                                                                                                    // 1369
        }                                                                                                              // 1370
                                                                                                                       // 1371
        normalizedInput = normalizeObjectUnits(config._i);                                                             // 1372
        config._a = [                                                                                                  // 1373
            normalizedInput.year,                                                                                      // 1374
            normalizedInput.month,                                                                                     // 1375
            normalizedInput.day,                                                                                       // 1376
            normalizedInput.hour,                                                                                      // 1377
            normalizedInput.minute,                                                                                    // 1378
            normalizedInput.second,                                                                                    // 1379
            normalizedInput.millisecond                                                                                // 1380
        ];                                                                                                             // 1381
                                                                                                                       // 1382
        dateFromConfig(config);                                                                                        // 1383
    }                                                                                                                  // 1384
                                                                                                                       // 1385
    function currentDateArray(config) {                                                                                // 1386
        var now = new Date();                                                                                          // 1387
        if (config._useUTC) {                                                                                          // 1388
            return [                                                                                                   // 1389
                now.getUTCFullYear(),                                                                                  // 1390
                now.getUTCMonth(),                                                                                     // 1391
                now.getUTCDate()                                                                                       // 1392
            ];                                                                                                         // 1393
        } else {                                                                                                       // 1394
            return [now.getFullYear(), now.getMonth(), now.getDate()];                                                 // 1395
        }                                                                                                              // 1396
    }                                                                                                                  // 1397
                                                                                                                       // 1398
    // date from string and format string                                                                              // 1399
    function makeDateFromStringAndFormat(config) {                                                                     // 1400
        if (config._f === moment.ISO_8601) {                                                                           // 1401
            parseISO(config);                                                                                          // 1402
            return;                                                                                                    // 1403
        }                                                                                                              // 1404
                                                                                                                       // 1405
        config._a = [];                                                                                                // 1406
        config._pf.empty = true;                                                                                       // 1407
                                                                                                                       // 1408
        // This array is used to make a Date, either with `new Date` or `Date.UTC`                                     // 1409
        var string = '' + config._i,                                                                                   // 1410
            i, parsedInput, tokens, token, skipped,                                                                    // 1411
            stringLength = string.length,                                                                              // 1412
            totalParsedInputLength = 0;                                                                                // 1413
                                                                                                                       // 1414
        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];                                // 1415
                                                                                                                       // 1416
        for (i = 0; i < tokens.length; i++) {                                                                          // 1417
            token = tokens[i];                                                                                         // 1418
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];                               // 1419
            if (parsedInput) {                                                                                         // 1420
                skipped = string.substr(0, string.indexOf(parsedInput));                                               // 1421
                if (skipped.length > 0) {                                                                              // 1422
                    config._pf.unusedInput.push(skipped);                                                              // 1423
                }                                                                                                      // 1424
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);                               // 1425
                totalParsedInputLength += parsedInput.length;                                                          // 1426
            }                                                                                                          // 1427
            // don't parse if it's not a known token                                                                   // 1428
            if (formatTokenFunctions[token]) {                                                                         // 1429
                if (parsedInput) {                                                                                     // 1430
                    config._pf.empty = false;                                                                          // 1431
                }                                                                                                      // 1432
                else {                                                                                                 // 1433
                    config._pf.unusedTokens.push(token);                                                               // 1434
                }                                                                                                      // 1435
                addTimeToArrayFromToken(token, parsedInput, config);                                                   // 1436
            }                                                                                                          // 1437
            else if (config._strict && !parsedInput) {                                                                 // 1438
                config._pf.unusedTokens.push(token);                                                                   // 1439
            }                                                                                                          // 1440
        }                                                                                                              // 1441
                                                                                                                       // 1442
        // add remaining unparsed input length to the string                                                           // 1443
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;                                              // 1444
        if (string.length > 0) {                                                                                       // 1445
            config._pf.unusedInput.push(string);                                                                       // 1446
        }                                                                                                              // 1447
                                                                                                                       // 1448
        // handle am pm                                                                                                // 1449
        if (config._isPm && config._a[HOUR] < 12) {                                                                    // 1450
            config._a[HOUR] += 12;                                                                                     // 1451
        }                                                                                                              // 1452
        // if is 12 am, change hours to 0                                                                              // 1453
        if (config._isPm === false && config._a[HOUR] === 12) {                                                        // 1454
            config._a[HOUR] = 0;                                                                                       // 1455
        }                                                                                                              // 1456
                                                                                                                       // 1457
        dateFromConfig(config);                                                                                        // 1458
        checkOverflow(config);                                                                                         // 1459
    }                                                                                                                  // 1460
                                                                                                                       // 1461
    function unescapeFormat(s) {                                                                                       // 1462
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {                   // 1463
            return p1 || p2 || p3 || p4;                                                                               // 1464
        });                                                                                                            // 1465
    }                                                                                                                  // 1466
                                                                                                                       // 1467
    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript            // 1468
    function regexpEscape(s) {                                                                                         // 1469
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');                                                            // 1470
    }                                                                                                                  // 1471
                                                                                                                       // 1472
    // date from string and array of format strings                                                                    // 1473
    function makeDateFromStringAndArray(config) {                                                                      // 1474
        var tempConfig,                                                                                                // 1475
            bestMoment,                                                                                                // 1476
                                                                                                                       // 1477
            scoreToBeat,                                                                                               // 1478
            i,                                                                                                         // 1479
            currentScore;                                                                                              // 1480
                                                                                                                       // 1481
        if (config._f.length === 0) {                                                                                  // 1482
            config._pf.invalidFormat = true;                                                                           // 1483
            config._d = new Date(NaN);                                                                                 // 1484
            return;                                                                                                    // 1485
        }                                                                                                              // 1486
                                                                                                                       // 1487
        for (i = 0; i < config._f.length; i++) {                                                                       // 1488
            currentScore = 0;                                                                                          // 1489
            tempConfig = copyConfig({}, config);                                                                       // 1490
            tempConfig._pf = defaultParsingFlags();                                                                    // 1491
            tempConfig._f = config._f[i];                                                                              // 1492
            makeDateFromStringAndFormat(tempConfig);                                                                   // 1493
                                                                                                                       // 1494
            if (!isValid(tempConfig)) {                                                                                // 1495
                continue;                                                                                              // 1496
            }                                                                                                          // 1497
                                                                                                                       // 1498
            // if there is any input that was not parsed add a penalty for that format                                 // 1499
            currentScore += tempConfig._pf.charsLeftOver;                                                              // 1500
                                                                                                                       // 1501
            //or tokens                                                                                                // 1502
            currentScore += tempConfig._pf.unusedTokens.length * 10;                                                   // 1503
                                                                                                                       // 1504
            tempConfig._pf.score = currentScore;                                                                       // 1505
                                                                                                                       // 1506
            if (scoreToBeat == null || currentScore < scoreToBeat) {                                                   // 1507
                scoreToBeat = currentScore;                                                                            // 1508
                bestMoment = tempConfig;                                                                               // 1509
            }                                                                                                          // 1510
        }                                                                                                              // 1511
                                                                                                                       // 1512
        extend(config, bestMoment || tempConfig);                                                                      // 1513
    }                                                                                                                  // 1514
                                                                                                                       // 1515
    // date from iso format                                                                                            // 1516
    function parseISO(config) {                                                                                        // 1517
        var i, l,                                                                                                      // 1518
            string = config._i,                                                                                        // 1519
            match = isoRegex.exec(string);                                                                             // 1520
                                                                                                                       // 1521
        if (match) {                                                                                                   // 1522
            config._pf.iso = true;                                                                                     // 1523
            for (i = 0, l = isoDates.length; i < l; i++) {                                                             // 1524
                if (isoDates[i][1].exec(string)) {                                                                     // 1525
                    // match[5] should be "T" or undefined                                                             // 1526
                    config._f = isoDates[i][0] + (match[6] || ' ');                                                    // 1527
                    break;                                                                                             // 1528
                }                                                                                                      // 1529
            }                                                                                                          // 1530
            for (i = 0, l = isoTimes.length; i < l; i++) {                                                             // 1531
                if (isoTimes[i][1].exec(string)) {                                                                     // 1532
                    config._f += isoTimes[i][0];                                                                       // 1533
                    break;                                                                                             // 1534
                }                                                                                                      // 1535
            }                                                                                                          // 1536
            if (string.match(parseTokenTimezone)) {                                                                    // 1537
                config._f += 'Z';                                                                                      // 1538
            }                                                                                                          // 1539
            makeDateFromStringAndFormat(config);                                                                       // 1540
        } else {                                                                                                       // 1541
            config._isValid = false;                                                                                   // 1542
        }                                                                                                              // 1543
    }                                                                                                                  // 1544
                                                                                                                       // 1545
    // date from iso format or fallback                                                                                // 1546
    function makeDateFromString(config) {                                                                              // 1547
        parseISO(config);                                                                                              // 1548
        if (config._isValid === false) {                                                                               // 1549
            delete config._isValid;                                                                                    // 1550
            moment.createFromInputFallback(config);                                                                    // 1551
        }                                                                                                              // 1552
    }                                                                                                                  // 1553
                                                                                                                       // 1554
    function makeDateFromInput(config) {                                                                               // 1555
        var input = config._i, matched;                                                                                // 1556
        if (input === undefined) {                                                                                     // 1557
            config._d = new Date();                                                                                    // 1558
        } else if (isDate(input)) {                                                                                    // 1559
            config._d = new Date(+input);                                                                              // 1560
        } else if ((matched = aspNetJsonRegex.exec(input)) !== null) {                                                 // 1561
            config._d = new Date(+matched[1]);                                                                         // 1562
        } else if (typeof input === 'string') {                                                                        // 1563
            makeDateFromString(config);                                                                                // 1564
        } else if (isArray(input)) {                                                                                   // 1565
            config._a = input.slice(0);                                                                                // 1566
            dateFromConfig(config);                                                                                    // 1567
        } else if (typeof(input) === 'object') {                                                                       // 1568
            dateFromObject(config);                                                                                    // 1569
        } else if (typeof(input) === 'number') {                                                                       // 1570
            // from milliseconds                                                                                       // 1571
            config._d = new Date(input);                                                                               // 1572
        } else {                                                                                                       // 1573
            moment.createFromInputFallback(config);                                                                    // 1574
        }                                                                                                              // 1575
    }                                                                                                                  // 1576
                                                                                                                       // 1577
    function makeDate(y, m, d, h, M, s, ms) {                                                                          // 1578
        //can't just apply() to create a date:                                                                         // 1579
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);                                                                     // 1581
                                                                                                                       // 1582
        //the date constructor doesn't accept years < 1970                                                             // 1583
        if (y < 1970) {                                                                                                // 1584
            date.setFullYear(y);                                                                                       // 1585
        }                                                                                                              // 1586
        return date;                                                                                                   // 1587
    }                                                                                                                  // 1588
                                                                                                                       // 1589
    function makeUTCDate(y) {                                                                                          // 1590
        var date = new Date(Date.UTC.apply(null, arguments));                                                          // 1591
        if (y < 1970) {                                                                                                // 1592
            date.setUTCFullYear(y);                                                                                    // 1593
        }                                                                                                              // 1594
        return date;                                                                                                   // 1595
    }                                                                                                                  // 1596
                                                                                                                       // 1597
    function parseWeekday(input, locale) {                                                                             // 1598
        if (typeof input === 'string') {                                                                               // 1599
            if (!isNaN(input)) {                                                                                       // 1600
                input = parseInt(input, 10);                                                                           // 1601
            }                                                                                                          // 1602
            else {                                                                                                     // 1603
                input = locale.weekdaysParse(input);                                                                   // 1604
                if (typeof input !== 'number') {                                                                       // 1605
                    return null;                                                                                       // 1606
                }                                                                                                      // 1607
            }                                                                                                          // 1608
        }                                                                                                              // 1609
        return input;                                                                                                  // 1610
    }                                                                                                                  // 1611
                                                                                                                       // 1612
    /************************************                                                                              // 1613
        Relative Time                                                                                                  // 1614
    ************************************/                                                                              // 1615
                                                                                                                       // 1616
                                                                                                                       // 1617
    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize                          // 1618
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {                                      // 1619
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);                                    // 1620
    }                                                                                                                  // 1621
                                                                                                                       // 1622
    function relativeTime(posNegDuration, withoutSuffix, locale) {                                                     // 1623
        var duration = moment.duration(posNegDuration).abs(),                                                          // 1624
            seconds = round(duration.as('s')),                                                                         // 1625
            minutes = round(duration.as('m')),                                                                         // 1626
            hours = round(duration.as('h')),                                                                           // 1627
            days = round(duration.as('d')),                                                                            // 1628
            months = round(duration.as('M')),                                                                          // 1629
            years = round(duration.as('y')),                                                                           // 1630
                                                                                                                       // 1631
            args = seconds < relativeTimeThresholds.s && ['s', seconds] ||                                             // 1632
                minutes === 1 && ['m'] ||                                                                              // 1633
                minutes < relativeTimeThresholds.m && ['mm', minutes] ||                                               // 1634
                hours === 1 && ['h'] ||                                                                                // 1635
                hours < relativeTimeThresholds.h && ['hh', hours] ||                                                   // 1636
                days === 1 && ['d'] ||                                                                                 // 1637
                days < relativeTimeThresholds.d && ['dd', days] ||                                                     // 1638
                months === 1 && ['M'] ||                                                                               // 1639
                months < relativeTimeThresholds.M && ['MM', months] ||                                                 // 1640
                years === 1 && ['y'] || ['yy', years];                                                                 // 1641
                                                                                                                       // 1642
        args[2] = withoutSuffix;                                                                                       // 1643
        args[3] = +posNegDuration > 0;                                                                                 // 1644
        args[4] = locale;                                                                                              // 1645
        return substituteTimeAgo.apply({}, args);                                                                      // 1646
    }                                                                                                                  // 1647
                                                                                                                       // 1648
                                                                                                                       // 1649
    /************************************                                                                              // 1650
        Week of Year                                                                                                   // 1651
    ************************************/                                                                              // 1652
                                                                                                                       // 1653
                                                                                                                       // 1654
    // firstDayOfWeek       0 = sun, 6 = sat                                                                           // 1655
    //                      the day of the week that starts the week                                                   // 1656
    //                      (usually sunday or monday)                                                                 // 1657
    // firstDayOfWeekOfYear 0 = sun, 6 = sat                                                                           // 1658
    //                      the first week is the week that contains the first                                         // 1659
    //                      of this day of the week                                                                    // 1660
    //                      (eg. ISO weeks use thursday (4))                                                           // 1661
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {                                                   // 1662
        var end = firstDayOfWeekOfYear - firstDayOfWeek,                                                               // 1663
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),                                                        // 1664
            adjustedMoment;                                                                                            // 1665
                                                                                                                       // 1666
                                                                                                                       // 1667
        if (daysToDayOfWeek > end) {                                                                                   // 1668
            daysToDayOfWeek -= 7;                                                                                      // 1669
        }                                                                                                              // 1670
                                                                                                                       // 1671
        if (daysToDayOfWeek < end - 7) {                                                                               // 1672
            daysToDayOfWeek += 7;                                                                                      // 1673
        }                                                                                                              // 1674
                                                                                                                       // 1675
        adjustedMoment = moment(mom).add(daysToDayOfWeek, 'd');                                                        // 1676
        return {                                                                                                       // 1677
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),                                                           // 1678
            year: adjustedMoment.year()                                                                                // 1679
        };                                                                                                             // 1680
    }                                                                                                                  // 1681
                                                                                                                       // 1682
    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday          // 1683
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {                           // 1684
        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;                                             // 1685
                                                                                                                       // 1686
        d = d === 0 ? 7 : d;                                                                                           // 1687
        weekday = weekday != null ? weekday : firstDayOfWeek;                                                          // 1688
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);            // 1689
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;                                       // 1690
                                                                                                                       // 1691
        return {                                                                                                       // 1692
            year: dayOfYear > 0 ? year : year - 1,                                                                     // 1693
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear                                   // 1694
        };                                                                                                             // 1695
    }                                                                                                                  // 1696
                                                                                                                       // 1697
    /************************************                                                                              // 1698
        Top Level Functions                                                                                            // 1699
    ************************************/                                                                              // 1700
                                                                                                                       // 1701
    function makeMoment(config) {                                                                                      // 1702
        var input = config._i,                                                                                         // 1703
            format = config._f;                                                                                        // 1704
                                                                                                                       // 1705
        config._locale = config._locale || moment.localeData(config._l);                                               // 1706
                                                                                                                       // 1707
        if (input === null || (format === undefined && input === '')) {                                                // 1708
            return moment.invalid({nullInput: true});                                                                  // 1709
        }                                                                                                              // 1710
                                                                                                                       // 1711
        if (typeof input === 'string') {                                                                               // 1712
            config._i = input = config._locale.preparse(input);                                                        // 1713
        }                                                                                                              // 1714
                                                                                                                       // 1715
        if (moment.isMoment(input)) {                                                                                  // 1716
            return new Moment(input, true);                                                                            // 1717
        } else if (format) {                                                                                           // 1718
            if (isArray(format)) {                                                                                     // 1719
                makeDateFromStringAndArray(config);                                                                    // 1720
            } else {                                                                                                   // 1721
                makeDateFromStringAndFormat(config);                                                                   // 1722
            }                                                                                                          // 1723
        } else {                                                                                                       // 1724
            makeDateFromInput(config);                                                                                 // 1725
        }                                                                                                              // 1726
                                                                                                                       // 1727
        return new Moment(config);                                                                                     // 1728
    }                                                                                                                  // 1729
                                                                                                                       // 1730
    moment = function (input, format, locale, strict) {                                                                // 1731
        var c;                                                                                                         // 1732
                                                                                                                       // 1733
        if (typeof(locale) === "boolean") {                                                                            // 1734
            strict = locale;                                                                                           // 1735
            locale = undefined;                                                                                        // 1736
        }                                                                                                              // 1737
        // object construction must be done this way.                                                                  // 1738
        // https://github.com/moment/moment/issues/1423                                                                // 1739
        c = {};                                                                                                        // 1740
        c._isAMomentObject = true;                                                                                     // 1741
        c._i = input;                                                                                                  // 1742
        c._f = format;                                                                                                 // 1743
        c._l = locale;                                                                                                 // 1744
        c._strict = strict;                                                                                            // 1745
        c._isUTC = false;                                                                                              // 1746
        c._pf = defaultParsingFlags();                                                                                 // 1747
                                                                                                                       // 1748
        return makeMoment(c);                                                                                          // 1749
    };                                                                                                                 // 1750
                                                                                                                       // 1751
    moment.suppressDeprecationWarnings = false;                                                                        // 1752
                                                                                                                       // 1753
    moment.createFromInputFallback = deprecate(                                                                        // 1754
        'moment construction falls back to js Date. This is ' +                                                        // 1755
        'discouraged and will be removed in upcoming major ' +                                                         // 1756
        'release. Please refer to ' +                                                                                  // 1757
        'https://github.com/moment/moment/issues/1407 for more info.',                                                 // 1758
        function (config) {                                                                                            // 1759
            config._d = new Date(config._i);                                                                           // 1760
        }                                                                                                              // 1761
    );                                                                                                                 // 1762
                                                                                                                       // 1763
    // Pick a moment m from moments so that m[fn](other) is true for all                                               // 1764
    // other. This relies on the function fn to be transitive.                                                         // 1765
    //                                                                                                                 // 1766
    // moments should either be an array of moment objects or an array, whose                                          // 1767
    // first element is an array of moment objects.                                                                    // 1768
    function pickBy(fn, moments) {                                                                                     // 1769
        var res, i;                                                                                                    // 1770
        if (moments.length === 1 && isArray(moments[0])) {                                                             // 1771
            moments = moments[0];                                                                                      // 1772
        }                                                                                                              // 1773
        if (!moments.length) {                                                                                         // 1774
            return moment();                                                                                           // 1775
        }                                                                                                              // 1776
        res = moments[0];                                                                                              // 1777
        for (i = 1; i < moments.length; ++i) {                                                                         // 1778
            if (moments[i][fn](res)) {                                                                                 // 1779
                res = moments[i];                                                                                      // 1780
            }                                                                                                          // 1781
        }                                                                                                              // 1782
        return res;                                                                                                    // 1783
    }                                                                                                                  // 1784
                                                                                                                       // 1785
    moment.min = function () {                                                                                         // 1786
        var args = [].slice.call(arguments, 0);                                                                        // 1787
                                                                                                                       // 1788
        return pickBy('isBefore', args);                                                                               // 1789
    };                                                                                                                 // 1790
                                                                                                                       // 1791
    moment.max = function () {                                                                                         // 1792
        var args = [].slice.call(arguments, 0);                                                                        // 1793
                                                                                                                       // 1794
        return pickBy('isAfter', args);                                                                                // 1795
    };                                                                                                                 // 1796
                                                                                                                       // 1797
    // creating with utc                                                                                               // 1798
    moment.utc = function (input, format, locale, strict) {                                                            // 1799
        var c;                                                                                                         // 1800
                                                                                                                       // 1801
        if (typeof(locale) === "boolean") {                                                                            // 1802
            strict = locale;                                                                                           // 1803
            locale = undefined;                                                                                        // 1804
        }                                                                                                              // 1805
        // object construction must be done this way.                                                                  // 1806
        // https://github.com/moment/moment/issues/1423                                                                // 1807
        c = {};                                                                                                        // 1808
        c._isAMomentObject = true;                                                                                     // 1809
        c._useUTC = true;                                                                                              // 1810
        c._isUTC = true;                                                                                               // 1811
        c._l = locale;                                                                                                 // 1812
        c._i = input;                                                                                                  // 1813
        c._f = format;                                                                                                 // 1814
        c._strict = strict;                                                                                            // 1815
        c._pf = defaultParsingFlags();                                                                                 // 1816
                                                                                                                       // 1817
        return makeMoment(c).utc();                                                                                    // 1818
    };                                                                                                                 // 1819
                                                                                                                       // 1820
    // creating with unix timestamp (in seconds)                                                                       // 1821
    moment.unix = function (input) {                                                                                   // 1822
        return moment(input * 1000);                                                                                   // 1823
    };                                                                                                                 // 1824
                                                                                                                       // 1825
    // duration                                                                                                        // 1826
    moment.duration = function (input, key) {                                                                          // 1827
        var duration = input,                                                                                          // 1828
            // matching against regexp is expensive, do it on demand                                                   // 1829
            match = null,                                                                                              // 1830
            sign,                                                                                                      // 1831
            ret,                                                                                                       // 1832
            parseIso,                                                                                                  // 1833
            diffRes;                                                                                                   // 1834
                                                                                                                       // 1835
        if (moment.isDuration(input)) {                                                                                // 1836
            duration = {                                                                                               // 1837
                ms: input._milliseconds,                                                                               // 1838
                d: input._days,                                                                                        // 1839
                M: input._months                                                                                       // 1840
            };                                                                                                         // 1841
        } else if (typeof input === 'number') {                                                                        // 1842
            duration = {};                                                                                             // 1843
            if (key) {                                                                                                 // 1844
                duration[key] = input;                                                                                 // 1845
            } else {                                                                                                   // 1846
                duration.milliseconds = input;                                                                         // 1847
            }                                                                                                          // 1848
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {                                                  // 1849
            sign = (match[1] === '-') ? -1 : 1;                                                                        // 1850
            duration = {                                                                                               // 1851
                y: 0,                                                                                                  // 1852
                d: toInt(match[DATE]) * sign,                                                                          // 1853
                h: toInt(match[HOUR]) * sign,                                                                          // 1854
                m: toInt(match[MINUTE]) * sign,                                                                        // 1855
                s: toInt(match[SECOND]) * sign,                                                                        // 1856
                ms: toInt(match[MILLISECOND]) * sign                                                                   // 1857
            };                                                                                                         // 1858
        } else if (!!(match = isoDurationRegex.exec(input))) {                                                         // 1859
            sign = (match[1] === '-') ? -1 : 1;                                                                        // 1860
            parseIso = function (inp) {                                                                                // 1861
                // We'd normally use ~~inp for this, but unfortunately it also                                         // 1862
                // converts floats to ints.                                                                            // 1863
                // inp may be undefined, so careful calling replace on it.                                             // 1864
                var res = inp && parseFloat(inp.replace(',', '.'));                                                    // 1865
                // apply sign while we're at it                                                                        // 1866
                return (isNaN(res) ? 0 : res) * sign;                                                                  // 1867
            };                                                                                                         // 1868
            duration = {                                                                                               // 1869
                y: parseIso(match[2]),                                                                                 // 1870
                M: parseIso(match[3]),                                                                                 // 1871
                d: parseIso(match[4]),                                                                                 // 1872
                h: parseIso(match[5]),                                                                                 // 1873
                m: parseIso(match[6]),                                                                                 // 1874
                s: parseIso(match[7]),                                                                                 // 1875
                w: parseIso(match[8])                                                                                  // 1876
            };                                                                                                         // 1877
        } else if (typeof duration === 'object' &&                                                                     // 1878
                ('from' in duration || 'to' in duration)) {                                                            // 1879
            diffRes = momentsDifference(moment(duration.from), moment(duration.to));                                   // 1880
                                                                                                                       // 1881
            duration = {};                                                                                             // 1882
            duration.ms = diffRes.milliseconds;                                                                        // 1883
            duration.M = diffRes.months;                                                                               // 1884
        }                                                                                                              // 1885
                                                                                                                       // 1886
        ret = new Duration(duration);                                                                                  // 1887
                                                                                                                       // 1888
        if (moment.isDuration(input) && input.hasOwnProperty('_locale')) {                                             // 1889
            ret._locale = input._locale;                                                                               // 1890
        }                                                                                                              // 1891
                                                                                                                       // 1892
        return ret;                                                                                                    // 1893
    };                                                                                                                 // 1894
                                                                                                                       // 1895
    // version number                                                                                                  // 1896
    moment.version = VERSION;                                                                                          // 1897
                                                                                                                       // 1898
    // default format                                                                                                  // 1899
    moment.defaultFormat = isoFormat;                                                                                  // 1900
                                                                                                                       // 1901
    // constant that refers to the ISO standard                                                                        // 1902
    moment.ISO_8601 = function () {};                                                                                  // 1903
                                                                                                                       // 1904
    // Plugins that add properties should also add the key here (null value),                                          // 1905
    // so we can properly clone ourselves.                                                                             // 1906
    moment.momentProperties = momentProperties;                                                                        // 1907
                                                                                                                       // 1908
    // This function will be called whenever a moment is mutated.                                                      // 1909
    // It is intended to keep the offset in sync with the timezone.                                                    // 1910
    moment.updateOffset = function () {};                                                                              // 1911
                                                                                                                       // 1912
    // This function allows you to set a threshold for relative time strings                                           // 1913
    moment.relativeTimeThreshold = function (threshold, limit) {                                                       // 1914
        if (relativeTimeThresholds[threshold] === undefined) {                                                         // 1915
            return false;                                                                                              // 1916
        }                                                                                                              // 1917
        if (limit === undefined) {                                                                                     // 1918
            return relativeTimeThresholds[threshold];                                                                  // 1919
        }                                                                                                              // 1920
        relativeTimeThresholds[threshold] = limit;                                                                     // 1921
        return true;                                                                                                   // 1922
    };                                                                                                                 // 1923
                                                                                                                       // 1924
    moment.lang = deprecate(                                                                                           // 1925
        "moment.lang is deprecated. Use moment.locale instead.",                                                       // 1926
        function (key, value) {                                                                                        // 1927
            return moment.locale(key, value);                                                                          // 1928
        }                                                                                                              // 1929
    );                                                                                                                 // 1930
                                                                                                                       // 1931
    // This function will load locale and then set the global locale.  If                                              // 1932
    // no arguments are passed in, it will simply return the current global                                            // 1933
    // locale key.                                                                                                     // 1934
    moment.locale = function (key, values) {                                                                           // 1935
        var data;                                                                                                      // 1936
        if (key) {                                                                                                     // 1937
            if (typeof(values) !== "undefined") {                                                                      // 1938
                data = moment.defineLocale(key, values);                                                               // 1939
            }                                                                                                          // 1940
            else {                                                                                                     // 1941
                data = moment.localeData(key);                                                                         // 1942
            }                                                                                                          // 1943
                                                                                                                       // 1944
            if (data) {                                                                                                // 1945
                moment.duration._locale = moment._locale = data;                                                       // 1946
            }                                                                                                          // 1947
        }                                                                                                              // 1948
                                                                                                                       // 1949
        return moment._locale._abbr;                                                                                   // 1950
    };                                                                                                                 // 1951
                                                                                                                       // 1952
    moment.defineLocale = function (name, values) {                                                                    // 1953
        if (values !== null) {                                                                                         // 1954
            values.abbr = name;                                                                                        // 1955
            if (!locales[name]) {                                                                                      // 1956
                locales[name] = new Locale();                                                                          // 1957
            }                                                                                                          // 1958
            locales[name].set(values);                                                                                 // 1959
                                                                                                                       // 1960
            // backwards compat for now: also set the locale                                                           // 1961
            moment.locale(name);                                                                                       // 1962
                                                                                                                       // 1963
            return locales[name];                                                                                      // 1964
        } else {                                                                                                       // 1965
            // useful for testing                                                                                      // 1966
            delete locales[name];                                                                                      // 1967
            return null;                                                                                               // 1968
        }                                                                                                              // 1969
    };                                                                                                                 // 1970
                                                                                                                       // 1971
    moment.langData = deprecate(                                                                                       // 1972
        "moment.langData is deprecated. Use moment.localeData instead.",                                               // 1973
        function (key) {                                                                                               // 1974
            return moment.localeData(key);                                                                             // 1975
        }                                                                                                              // 1976
    );                                                                                                                 // 1977
                                                                                                                       // 1978
    // returns locale data                                                                                             // 1979
    moment.localeData = function (key) {                                                                               // 1980
        var locale;                                                                                                    // 1981
                                                                                                                       // 1982
        if (key && key._locale && key._locale._abbr) {                                                                 // 1983
            key = key._locale._abbr;                                                                                   // 1984
        }                                                                                                              // 1985
                                                                                                                       // 1986
        if (!key) {                                                                                                    // 1987
            return moment._locale;                                                                                     // 1988
        }                                                                                                              // 1989
                                                                                                                       // 1990
        if (!isArray(key)) {                                                                                           // 1991
            //short-circuit everything else                                                                            // 1992
            locale = loadLocale(key);                                                                                  // 1993
            if (locale) {                                                                                              // 1994
                return locale;                                                                                         // 1995
            }                                                                                                          // 1996
            key = [key];                                                                                               // 1997
        }                                                                                                              // 1998
                                                                                                                       // 1999
        return chooseLocale(key);                                                                                      // 2000
    };                                                                                                                 // 2001
                                                                                                                       // 2002
    // compare moment object                                                                                           // 2003
    moment.isMoment = function (obj) {                                                                                 // 2004
        return obj instanceof Moment ||                                                                                // 2005
            (obj != null &&  obj.hasOwnProperty('_isAMomentObject'));                                                  // 2006
    };                                                                                                                 // 2007
                                                                                                                       // 2008
    // for typechecking Duration objects                                                                               // 2009
    moment.isDuration = function (obj) {                                                                               // 2010
        return obj instanceof Duration;                                                                                // 2011
    };                                                                                                                 // 2012
                                                                                                                       // 2013
    for (i = lists.length - 1; i >= 0; --i) {                                                                          // 2014
        makeList(lists[i]);                                                                                            // 2015
    }                                                                                                                  // 2016
                                                                                                                       // 2017
    moment.normalizeUnits = function (units) {                                                                         // 2018
        return normalizeUnits(units);                                                                                  // 2019
    };                                                                                                                 // 2020
                                                                                                                       // 2021
    moment.invalid = function (flags) {                                                                                // 2022
        var m = moment.utc(NaN);                                                                                       // 2023
        if (flags != null) {                                                                                           // 2024
            extend(m._pf, flags);                                                                                      // 2025
        }                                                                                                              // 2026
        else {                                                                                                         // 2027
            m._pf.userInvalidated = true;                                                                              // 2028
        }                                                                                                              // 2029
                                                                                                                       // 2030
        return m;                                                                                                      // 2031
    };                                                                                                                 // 2032
                                                                                                                       // 2033
    moment.parseZone = function () {                                                                                   // 2034
        return moment.apply(null, arguments).parseZone();                                                              // 2035
    };                                                                                                                 // 2036
                                                                                                                       // 2037
    moment.parseTwoDigitYear = function (input) {                                                                      // 2038
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);                                                       // 2039
    };                                                                                                                 // 2040
                                                                                                                       // 2041
    /************************************                                                                              // 2042
        Moment Prototype                                                                                               // 2043
    ************************************/                                                                              // 2044
                                                                                                                       // 2045
                                                                                                                       // 2046
    extend(moment.fn = Moment.prototype, {                                                                             // 2047
                                                                                                                       // 2048
        clone : function () {                                                                                          // 2049
            return moment(this);                                                                                       // 2050
        },                                                                                                             // 2051
                                                                                                                       // 2052
        valueOf : function () {                                                                                        // 2053
            return +this._d + ((this._offset || 0) * 60000);                                                           // 2054
        },                                                                                                             // 2055
                                                                                                                       // 2056
        unix : function () {                                                                                           // 2057
            return Math.floor(+this / 1000);                                                                           // 2058
        },                                                                                                             // 2059
                                                                                                                       // 2060
        toString : function () {                                                                                       // 2061
            return this.clone().locale('en').format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");                               // 2062
        },                                                                                                             // 2063
                                                                                                                       // 2064
        toDate : function () {                                                                                         // 2065
            return this._offset ? new Date(+this) : this._d;                                                           // 2066
        },                                                                                                             // 2067
                                                                                                                       // 2068
        toISOString : function () {                                                                                    // 2069
            var m = moment(this).utc();                                                                                // 2070
            if (0 < m.year() && m.year() <= 9999) {                                                                    // 2071
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');                                                // 2072
            } else {                                                                                                   // 2073
                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');                                              // 2074
            }                                                                                                          // 2075
        },                                                                                                             // 2076
                                                                                                                       // 2077
        toArray : function () {                                                                                        // 2078
            var m = this;                                                                                              // 2079
            return [                                                                                                   // 2080
                m.year(),                                                                                              // 2081
                m.month(),                                                                                             // 2082
                m.date(),                                                                                              // 2083
                m.hours(),                                                                                             // 2084
                m.minutes(),                                                                                           // 2085
                m.seconds(),                                                                                           // 2086
                m.milliseconds()                                                                                       // 2087
            ];                                                                                                         // 2088
        },                                                                                                             // 2089
                                                                                                                       // 2090
        isValid : function () {                                                                                        // 2091
            return isValid(this);                                                                                      // 2092
        },                                                                                                             // 2093
                                                                                                                       // 2094
        isDSTShifted : function () {                                                                                   // 2095
            if (this._a) {                                                                                             // 2096
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }                                                                                                          // 2098
                                                                                                                       // 2099
            return false;                                                                                              // 2100
        },                                                                                                             // 2101
                                                                                                                       // 2102
        parsingFlags : function () {                                                                                   // 2103
            return extend({}, this._pf);                                                                               // 2104
        },                                                                                                             // 2105
                                                                                                                       // 2106
        invalidAt: function () {                                                                                       // 2107
            return this._pf.overflow;                                                                                  // 2108
        },                                                                                                             // 2109
                                                                                                                       // 2110
        utc : function (keepLocalTime) {                                                                               // 2111
            return this.zone(0, keepLocalTime);                                                                        // 2112
        },                                                                                                             // 2113
                                                                                                                       // 2114
        local : function (keepLocalTime) {                                                                             // 2115
            if (this._isUTC) {                                                                                         // 2116
                this.zone(0, keepLocalTime);                                                                           // 2117
                this._isUTC = false;                                                                                   // 2118
                                                                                                                       // 2119
                if (keepLocalTime) {                                                                                   // 2120
                    this.add(this._d.getTimezoneOffset(), 'm');                                                        // 2121
                }                                                                                                      // 2122
            }                                                                                                          // 2123
            return this;                                                                                               // 2124
        },                                                                                                             // 2125
                                                                                                                       // 2126
        format : function (inputString) {                                                                              // 2127
            var output = formatMoment(this, inputString || moment.defaultFormat);                                      // 2128
            return this.localeData().postformat(output);                                                               // 2129
        },                                                                                                             // 2130
                                                                                                                       // 2131
        add : createAdder(1, 'add'),                                                                                   // 2132
                                                                                                                       // 2133
        subtract : createAdder(-1, 'subtract'),                                                                        // 2134
                                                                                                                       // 2135
        diff : function (input, units, asFloat) {                                                                      // 2136
            var that = makeAs(input, this),                                                                            // 2137
                zoneDiff = (this.zone() - that.zone()) * 6e4,                                                          // 2138
                diff, output;                                                                                          // 2139
                                                                                                                       // 2140
            units = normalizeUnits(units);                                                                             // 2141
                                                                                                                       // 2142
            if (units === 'year' || units === 'month') {                                                               // 2143
                // average number of days in the months in the given dates                                             // 2144
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2                   // 2145
                // difference in months                                                                                // 2146
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());                           // 2147
                // adjust by taking difference in days, average number of days                                         // 2148
                // and dst in the given months.                                                                        // 2149
                output += ((this - moment(this).startOf('month')) -                                                    // 2150
                        (that - moment(that).startOf('month'))) / diff;                                                // 2151
                // same as above but with zones, to negate all dst                                                     // 2152
                output -= ((this.zone() - moment(this).startOf('month').zone()) -                                      // 2153
                        (that.zone() - moment(that).startOf('month').zone())) * 6e4 / diff;                            // 2154
                if (units === 'year') {                                                                                // 2155
                    output = output / 12;                                                                              // 2156
                }                                                                                                      // 2157
            } else {                                                                                                   // 2158
                diff = (this - that);                                                                                  // 2159
                output = units === 'second' ? diff / 1e3 : // 1000                                                     // 2160
                    units === 'minute' ? diff / 6e4 : // 1000 * 60                                                     // 2161
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60                                                 // 2162
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst                   // 2163
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst             // 2164
                    diff;                                                                                              // 2165
            }                                                                                                          // 2166
            return asFloat ? output : absRound(output);                                                                // 2167
        },                                                                                                             // 2168
                                                                                                                       // 2169
        from : function (time, withoutSuffix) {                                                                        // 2170
            return moment.duration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);             // 2171
        },                                                                                                             // 2172
                                                                                                                       // 2173
        fromNow : function (withoutSuffix) {                                                                           // 2174
            return this.from(moment(), withoutSuffix);                                                                 // 2175
        },                                                                                                             // 2176
                                                                                                                       // 2177
        calendar : function (time) {                                                                                   // 2178
            // We want to compare the start of today, vs this.                                                         // 2179
            // Getting start-of-today depends on whether we're zone'd or not.                                          // 2180
            var now = time || moment(),                                                                                // 2181
                sod = makeAs(now, this).startOf('day'),                                                                // 2182
                diff = this.diff(sod, 'days', true),                                                                   // 2183
                format = diff < -6 ? 'sameElse' :                                                                      // 2184
                    diff < -1 ? 'lastWeek' :                                                                           // 2185
                    diff < 0 ? 'lastDay' :                                                                             // 2186
                    diff < 1 ? 'sameDay' :                                                                             // 2187
                    diff < 2 ? 'nextDay' :                                                                             // 2188
                    diff < 7 ? 'nextWeek' : 'sameElse';                                                                // 2189
            return this.format(this.localeData().calendar(format, this));                                              // 2190
        },                                                                                                             // 2191
                                                                                                                       // 2192
        isLeapYear : function () {                                                                                     // 2193
            return isLeapYear(this.year());                                                                            // 2194
        },                                                                                                             // 2195
                                                                                                                       // 2196
        isDST : function () {                                                                                          // 2197
            return (this.zone() < this.clone().month(0).zone() ||                                                      // 2198
                this.zone() < this.clone().month(5).zone());                                                           // 2199
        },                                                                                                             // 2200
                                                                                                                       // 2201
        day : function (input) {                                                                                       // 2202
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();                                            // 2203
            if (input != null) {                                                                                       // 2204
                input = parseWeekday(input, this.localeData());                                                        // 2205
                return this.add(input - day, 'd');                                                                     // 2206
            } else {                                                                                                   // 2207
                return day;                                                                                            // 2208
            }                                                                                                          // 2209
        },                                                                                                             // 2210
                                                                                                                       // 2211
        month : makeAccessor('Month', true),                                                                           // 2212
                                                                                                                       // 2213
        startOf : function (units) {                                                                                   // 2214
            units = normalizeUnits(units);                                                                             // 2215
            // the following switch intentionally omits break keywords                                                 // 2216
            // to utilize falling through the cases.                                                                   // 2217
            switch (units) {                                                                                           // 2218
            case 'year':                                                                                               // 2219
                this.month(0);                                                                                         // 2220
                /* falls through */                                                                                    // 2221
            case 'quarter':                                                                                            // 2222
            case 'month':                                                                                              // 2223
                this.date(1);                                                                                          // 2224
                /* falls through */                                                                                    // 2225
            case 'week':                                                                                               // 2226
            case 'isoWeek':                                                                                            // 2227
            case 'day':                                                                                                // 2228
                this.hours(0);                                                                                         // 2229
                /* falls through */                                                                                    // 2230
            case 'hour':                                                                                               // 2231
                this.minutes(0);                                                                                       // 2232
                /* falls through */                                                                                    // 2233
            case 'minute':                                                                                             // 2234
                this.seconds(0);                                                                                       // 2235
                /* falls through */                                                                                    // 2236
            case 'second':                                                                                             // 2237
                this.milliseconds(0);                                                                                  // 2238
                /* falls through */                                                                                    // 2239
            }                                                                                                          // 2240
                                                                                                                       // 2241
            // weeks are a special case                                                                                // 2242
            if (units === 'week') {                                                                                    // 2243
                this.weekday(0);                                                                                       // 2244
            } else if (units === 'isoWeek') {                                                                          // 2245
                this.isoWeekday(1);                                                                                    // 2246
            }                                                                                                          // 2247
                                                                                                                       // 2248
            // quarters are also special                                                                               // 2249
            if (units === 'quarter') {                                                                                 // 2250
                this.month(Math.floor(this.month() / 3) * 3);                                                          // 2251
            }                                                                                                          // 2252
                                                                                                                       // 2253
            return this;                                                                                               // 2254
        },                                                                                                             // 2255
                                                                                                                       // 2256
        endOf: function (units) {                                                                                      // 2257
            units = normalizeUnits(units);                                                                             // 2258
            return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');               // 2259
        },                                                                                                             // 2260
                                                                                                                       // 2261
        isAfter: function (input, units) {                                                                             // 2262
            units = typeof units !== 'undefined' ? units : 'millisecond';                                              // 2263
            return +this.clone().startOf(units) > +moment(input).startOf(units);                                       // 2264
        },                                                                                                             // 2265
                                                                                                                       // 2266
        isBefore: function (input, units) {                                                                            // 2267
            units = typeof units !== 'undefined' ? units : 'millisecond';                                              // 2268
            return +this.clone().startOf(units) < +moment(input).startOf(units);                                       // 2269
        },                                                                                                             // 2270
                                                                                                                       // 2271
        isSame: function (input, units) {                                                                              // 2272
            units = units || 'ms';                                                                                     // 2273
            return +this.clone().startOf(units) === +makeAs(input, this).startOf(units);                               // 2274
        },                                                                                                             // 2275
                                                                                                                       // 2276
        min: deprecate(                                                                                                // 2277
                 'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',   // 2278
                 function (other) {                                                                                    // 2279
                     other = moment.apply(null, arguments);                                                            // 2280
                     return other < this ? this : other;                                                               // 2281
                 }                                                                                                     // 2282
         ),                                                                                                            // 2283
                                                                                                                       // 2284
        max: deprecate(                                                                                                // 2285
                'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',    // 2286
                function (other) {                                                                                     // 2287
                    other = moment.apply(null, arguments);                                                             // 2288
                    return other > this ? this : other;                                                                // 2289
                }                                                                                                      // 2290
        ),                                                                                                             // 2291
                                                                                                                       // 2292
        // keepLocalTime = true means only change the timezone, without                                                // 2293
        // affecting the local hour. So 5:31:26 +0300 --[zone(2, true)]-->                                             // 2294
        // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist int zone                                            // 2295
        // +0200, so we adjust the time as needed, to be valid.                                                        // 2296
        //                                                                                                             // 2297
        // Keeping the time actually adds/subtracts (one hour)                                                         // 2298
        // from the actual represented time. That is why we call updateOffset                                          // 2299
        // a second time. In case it wants us to change the offset again                                               // 2300
        // _changeInProgress == true case, then we have to adjust, because                                             // 2301
        // there is no such time in the given timezone.                                                                // 2302
        zone : function (input, keepLocalTime) {                                                                       // 2303
            var offset = this._offset || 0,                                                                            // 2304
                localAdjust;                                                                                           // 2305
            if (input != null) {                                                                                       // 2306
                if (typeof input === 'string') {                                                                       // 2307
                    input = timezoneMinutesFromString(input);                                                          // 2308
                }                                                                                                      // 2309
                if (Math.abs(input) < 16) {                                                                            // 2310
                    input = input * 60;                                                                                // 2311
                }                                                                                                      // 2312
                if (!this._isUTC && keepLocalTime) {                                                                   // 2313
                    localAdjust = this._d.getTimezoneOffset();                                                         // 2314
                }                                                                                                      // 2315
                this._offset = input;                                                                                  // 2316
                this._isUTC = true;                                                                                    // 2317
                if (localAdjust != null) {                                                                             // 2318
                    this.subtract(localAdjust, 'm');                                                                   // 2319
                }                                                                                                      // 2320
                if (offset !== input) {                                                                                // 2321
                    if (!keepLocalTime || this._changeInProgress) {                                                    // 2322
                        addOrSubtractDurationFromMoment(this,                                                          // 2323
                                moment.duration(offset - input, 'm'), 1, false);                                       // 2324
                    } else if (!this._changeInProgress) {                                                              // 2325
                        this._changeInProgress = true;                                                                 // 2326
                        moment.updateOffset(this, true);                                                               // 2327
                        this._changeInProgress = null;                                                                 // 2328
                    }                                                                                                  // 2329
                }                                                                                                      // 2330
            } else {                                                                                                   // 2331
                return this._isUTC ? offset : this._d.getTimezoneOffset();                                             // 2332
            }                                                                                                          // 2333
            return this;                                                                                               // 2334
        },                                                                                                             // 2335
                                                                                                                       // 2336
        zoneAbbr : function () {                                                                                       // 2337
            return this._isUTC ? 'UTC' : '';                                                                           // 2338
        },                                                                                                             // 2339
                                                                                                                       // 2340
        zoneName : function () {                                                                                       // 2341
            return this._isUTC ? 'Coordinated Universal Time' : '';                                                    // 2342
        },                                                                                                             // 2343
                                                                                                                       // 2344
        parseZone : function () {                                                                                      // 2345
            if (this._tzm) {                                                                                           // 2346
                this.zone(this._tzm);                                                                                  // 2347
            } else if (typeof this._i === 'string') {                                                                  // 2348
                this.zone(this._i);                                                                                    // 2349
            }                                                                                                          // 2350
            return this;                                                                                               // 2351
        },                                                                                                             // 2352
                                                                                                                       // 2353
        hasAlignedHourOffset : function (input) {                                                                      // 2354
            if (!input) {                                                                                              // 2355
                input = 0;                                                                                             // 2356
            }                                                                                                          // 2357
            else {                                                                                                     // 2358
                input = moment(input).zone();                                                                          // 2359
            }                                                                                                          // 2360
                                                                                                                       // 2361
            return (this.zone() - input) % 60 === 0;                                                                   // 2362
        },                                                                                                             // 2363
                                                                                                                       // 2364
        daysInMonth : function () {                                                                                    // 2365
            return daysInMonth(this.year(), this.month());                                                             // 2366
        },                                                                                                             // 2367
                                                                                                                       // 2368
        dayOfYear : function (input) {                                                                                 // 2369
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;           // 2370
            return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');                                     // 2371
        },                                                                                                             // 2372
                                                                                                                       // 2373
        quarter : function (input) {                                                                                   // 2374
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3); // 2375
        },                                                                                                             // 2376
                                                                                                                       // 2377
        weekYear : function (input) {                                                                                  // 2378
            var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;                // 2379
            return input == null ? year : this.add((input - year), 'y');                                               // 2380
        },                                                                                                             // 2381
                                                                                                                       // 2382
        isoWeekYear : function (input) {                                                                               // 2383
            var year = weekOfYear(this, 1, 4).year;                                                                    // 2384
            return input == null ? year : this.add((input - year), 'y');                                               // 2385
        },                                                                                                             // 2386
                                                                                                                       // 2387
        week : function (input) {                                                                                      // 2388
            var week = this.localeData().week(this);                                                                   // 2389
            return input == null ? week : this.add((input - week) * 7, 'd');                                           // 2390
        },                                                                                                             // 2391
                                                                                                                       // 2392
        isoWeek : function (input) {                                                                                   // 2393
            var week = weekOfYear(this, 1, 4).week;                                                                    // 2394
            return input == null ? week : this.add((input - week) * 7, 'd');                                           // 2395
        },                                                                                                             // 2396
                                                                                                                       // 2397
        weekday : function (input) {                                                                                   // 2398
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;                                          // 2399
            return input == null ? weekday : this.add(input - weekday, 'd');                                           // 2400
        },                                                                                                             // 2401
                                                                                                                       // 2402
        isoWeekday : function (input) {                                                                                // 2403
            // behaves the same as moment#day except                                                                   // 2404
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)                                          // 2405
            // as a setter, sunday should belong to the previous week.                                                 // 2406
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);                     // 2407
        },                                                                                                             // 2408
                                                                                                                       // 2409
        isoWeeksInYear : function () {                                                                                 // 2410
            return weeksInYear(this.year(), 1, 4);                                                                     // 2411
        },                                                                                                             // 2412
                                                                                                                       // 2413
        weeksInYear : function () {                                                                                    // 2414
            var weekInfo = this.localeData()._week;                                                                    // 2415
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);                                               // 2416
        },                                                                                                             // 2417
                                                                                                                       // 2418
        get : function (units) {                                                                                       // 2419
            units = normalizeUnits(units);                                                                             // 2420
            return this[units]();                                                                                      // 2421
        },                                                                                                             // 2422
                                                                                                                       // 2423
        set : function (units, value) {                                                                                // 2424
            units = normalizeUnits(units);                                                                             // 2425
            if (typeof this[units] === 'function') {                                                                   // 2426
                this[units](value);                                                                                    // 2427
            }                                                                                                          // 2428
            return this;                                                                                               // 2429
        },                                                                                                             // 2430
                                                                                                                       // 2431
        // If passed a locale key, it will set the locale for this                                                     // 2432
        // instance.  Otherwise, it will return the locale configuration                                               // 2433
        // variables for this instance.                                                                                // 2434
        locale : function (key) {                                                                                      // 2435
            if (key === undefined) {                                                                                   // 2436
                return this._locale._abbr;                                                                             // 2437
            } else {                                                                                                   // 2438
                this._locale = moment.localeData(key);                                                                 // 2439
                return this;                                                                                           // 2440
            }                                                                                                          // 2441
        },                                                                                                             // 2442
                                                                                                                       // 2443
        lang : deprecate(                                                                                              // 2444
            "moment().lang() is deprecated. Use moment().localeData() instead.",                                       // 2445
            function (key) {                                                                                           // 2446
                if (key === undefined) {                                                                               // 2447
                    return this.localeData();                                                                          // 2448
                } else {                                                                                               // 2449
                    this._locale = moment.localeData(key);                                                             // 2450
                    return this;                                                                                       // 2451
                }                                                                                                      // 2452
            }                                                                                                          // 2453
        ),                                                                                                             // 2454
                                                                                                                       // 2455
        localeData : function () {                                                                                     // 2456
            return this._locale;                                                                                       // 2457
        }                                                                                                              // 2458
    });                                                                                                                // 2459
                                                                                                                       // 2460
    function rawMonthSetter(mom, value) {                                                                              // 2461
        var dayOfMonth;                                                                                                // 2462
                                                                                                                       // 2463
        // TODO: Move this out of here!                                                                                // 2464
        if (typeof value === 'string') {                                                                               // 2465
            value = mom.localeData().monthsParse(value);                                                               // 2466
            // TODO: Another silent failure?                                                                           // 2467
            if (typeof value !== 'number') {                                                                           // 2468
                return mom;                                                                                            // 2469
            }                                                                                                          // 2470
        }                                                                                                              // 2471
                                                                                                                       // 2472
        dayOfMonth = Math.min(mom.date(),                                                                              // 2473
                daysInMonth(mom.year(), value));                                                                       // 2474
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);                                        // 2475
        return mom;                                                                                                    // 2476
    }                                                                                                                  // 2477
                                                                                                                       // 2478
    function rawGetter(mom, unit) {                                                                                    // 2479
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();                                                     // 2480
    }                                                                                                                  // 2481
                                                                                                                       // 2482
    function rawSetter(mom, unit, value) {                                                                             // 2483
        if (unit === 'Month') {                                                                                        // 2484
            return rawMonthSetter(mom, value);                                                                         // 2485
        } else {                                                                                                       // 2486
            return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);                                            // 2487
        }                                                                                                              // 2488
    }                                                                                                                  // 2489
                                                                                                                       // 2490
    function makeAccessor(unit, keepTime) {                                                                            // 2491
        return function (value) {                                                                                      // 2492
            if (value != null) {                                                                                       // 2493
                rawSetter(this, unit, value);                                                                          // 2494
                moment.updateOffset(this, keepTime);                                                                   // 2495
                return this;                                                                                           // 2496
            } else {                                                                                                   // 2497
                return rawGetter(this, unit);                                                                          // 2498
            }                                                                                                          // 2499
        };                                                                                                             // 2500
    }                                                                                                                  // 2501
                                                                                                                       // 2502
    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);                              // 2503
    moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);                                             // 2504
    moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);                                             // 2505
    // Setting the hour should keep the time, because the user explicitly                                              // 2506
    // specified which hour he wants. So trying to maintain the same hour (in                                          // 2507
    // a new timezone) makes sense. Adding/subtracting hours does not follow                                           // 2508
    // this rule.                                                                                                      // 2509
    moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);                                                    // 2510
    // moment.fn.month is defined separately                                                                           // 2511
    moment.fn.date = makeAccessor('Date', true);                                                                       // 2512
    moment.fn.dates = deprecate('dates accessor is deprecated. Use date instead.', makeAccessor('Date', true));        // 2513
    moment.fn.year = makeAccessor('FullYear', true);                                                                   // 2514
    moment.fn.years = deprecate('years accessor is deprecated. Use year instead.', makeAccessor('FullYear', true));    // 2515
                                                                                                                       // 2516
    // add plural methods                                                                                              // 2517
    moment.fn.days = moment.fn.day;                                                                                    // 2518
    moment.fn.months = moment.fn.month;                                                                                // 2519
    moment.fn.weeks = moment.fn.week;                                                                                  // 2520
    moment.fn.isoWeeks = moment.fn.isoWeek;                                                                            // 2521
    moment.fn.quarters = moment.fn.quarter;                                                                            // 2522
                                                                                                                       // 2523
    // add aliased format methods                                                                                      // 2524
    moment.fn.toJSON = moment.fn.toISOString;                                                                          // 2525
                                                                                                                       // 2526
    /************************************                                                                              // 2527
        Duration Prototype                                                                                             // 2528
    ************************************/                                                                              // 2529
                                                                                                                       // 2530
                                                                                                                       // 2531
    function daysToYears (days) {                                                                                      // 2532
        // 400 years have 146097 days (taking into account leap year rules)                                            // 2533
        return days * 400 / 146097;                                                                                    // 2534
    }                                                                                                                  // 2535
                                                                                                                       // 2536
    function yearsToDays (years) {                                                                                     // 2537
        // years * 365 + absRound(years / 4) -                                                                         // 2538
        //     absRound(years / 100) + absRound(years / 400);                                                          // 2539
        return years * 146097 / 400;                                                                                   // 2540
    }                                                                                                                  // 2541
                                                                                                                       // 2542
    extend(moment.duration.fn = Duration.prototype, {                                                                  // 2543
                                                                                                                       // 2544
        _bubble : function () {                                                                                        // 2545
            var milliseconds = this._milliseconds,                                                                     // 2546
                days = this._days,                                                                                     // 2547
                months = this._months,                                                                                 // 2548
                data = this._data,                                                                                     // 2549
                seconds, minutes, hours, years = 0;                                                                    // 2550
                                                                                                                       // 2551
            // The following code bubbles up values, see the tests for                                                 // 2552
            // examples of what that means.                                                                            // 2553
            data.milliseconds = milliseconds % 1000;                                                                   // 2554
                                                                                                                       // 2555
            seconds = absRound(milliseconds / 1000);                                                                   // 2556
            data.seconds = seconds % 60;                                                                               // 2557
                                                                                                                       // 2558
            minutes = absRound(seconds / 60);                                                                          // 2559
            data.minutes = minutes % 60;                                                                               // 2560
                                                                                                                       // 2561
            hours = absRound(minutes / 60);                                                                            // 2562
            data.hours = hours % 24;                                                                                   // 2563
                                                                                                                       // 2564
            days += absRound(hours / 24);                                                                              // 2565
                                                                                                                       // 2566
            // Accurately convert days to years, assume start from year 0.                                             // 2567
            years = absRound(daysToYears(days));                                                                       // 2568
            days -= absRound(yearsToDays(years));                                                                      // 2569
                                                                                                                       // 2570
            // 30 days to a month                                                                                      // 2571
            // TODO (iskren): Use anchor date (like 1st Jan) to compute this.                                          // 2572
            months += absRound(days / 30);                                                                             // 2573
            days %= 30;                                                                                                // 2574
                                                                                                                       // 2575
            // 12 months -> 1 year                                                                                     // 2576
            years += absRound(months / 12);                                                                            // 2577
            months %= 12;                                                                                              // 2578
                                                                                                                       // 2579
            data.days = days;                                                                                          // 2580
            data.months = months;                                                                                      // 2581
            data.years = years;                                                                                        // 2582
        },                                                                                                             // 2583
                                                                                                                       // 2584
        abs : function () {                                                                                            // 2585
            this._milliseconds = Math.abs(this._milliseconds);                                                         // 2586
            this._days = Math.abs(this._days);                                                                         // 2587
            this._months = Math.abs(this._months);                                                                     // 2588
                                                                                                                       // 2589
            this._data.milliseconds = Math.abs(this._data.milliseconds);                                               // 2590
            this._data.seconds = Math.abs(this._data.seconds);                                                         // 2591
            this._data.minutes = Math.abs(this._data.minutes);                                                         // 2592
            this._data.hours = Math.abs(this._data.hours);                                                             // 2593
            this._data.months = Math.abs(this._data.months);                                                           // 2594
            this._data.years = Math.abs(this._data.years);                                                             // 2595
                                                                                                                       // 2596
            return this;                                                                                               // 2597
        },                                                                                                             // 2598
                                                                                                                       // 2599
        weeks : function () {                                                                                          // 2600
            return absRound(this.days() / 7);                                                                          // 2601
        },                                                                                                             // 2602
                                                                                                                       // 2603
        valueOf : function () {                                                                                        // 2604
            return this._milliseconds +                                                                                // 2605
              this._days * 864e5 +                                                                                     // 2606
              (this._months % 12) * 2592e6 +                                                                           // 2607
              toInt(this._months / 12) * 31536e6;                                                                      // 2608
        },                                                                                                             // 2609
                                                                                                                       // 2610
        humanize : function (withSuffix) {                                                                             // 2611
            var output = relativeTime(this, !withSuffix, this.localeData());                                           // 2612
                                                                                                                       // 2613
            if (withSuffix) {                                                                                          // 2614
                output = this.localeData().pastFuture(+this, output);                                                  // 2615
            }                                                                                                          // 2616
                                                                                                                       // 2617
            return this.localeData().postformat(output);                                                               // 2618
        },                                                                                                             // 2619
                                                                                                                       // 2620
        add : function (input, val) {                                                                                  // 2621
            // supports only 2.0-style add(1, 's') or add(moment)                                                      // 2622
            var dur = moment.duration(input, val);                                                                     // 2623
                                                                                                                       // 2624
            this._milliseconds += dur._milliseconds;                                                                   // 2625
            this._days += dur._days;                                                                                   // 2626
            this._months += dur._months;                                                                               // 2627
                                                                                                                       // 2628
            this._bubble();                                                                                            // 2629
                                                                                                                       // 2630
            return this;                                                                                               // 2631
        },                                                                                                             // 2632
                                                                                                                       // 2633
        subtract : function (input, val) {                                                                             // 2634
            var dur = moment.duration(input, val);                                                                     // 2635
                                                                                                                       // 2636
            this._milliseconds -= dur._milliseconds;                                                                   // 2637
            this._days -= dur._days;                                                                                   // 2638
            this._months -= dur._months;                                                                               // 2639
                                                                                                                       // 2640
            this._bubble();                                                                                            // 2641
                                                                                                                       // 2642
            return this;                                                                                               // 2643
        },                                                                                                             // 2644
                                                                                                                       // 2645
        get : function (units) {                                                                                       // 2646
            units = normalizeUnits(units);                                                                             // 2647
            return this[units.toLowerCase() + 's']();                                                                  // 2648
        },                                                                                                             // 2649
                                                                                                                       // 2650
        as : function (units) {                                                                                        // 2651
            var days, months;                                                                                          // 2652
            units = normalizeUnits(units);                                                                             // 2653
                                                                                                                       // 2654
            days = this._days + this._milliseconds / 864e5;                                                            // 2655
            if (units === 'month' || units === 'year') {                                                               // 2656
                months = this._months + daysToYears(days) * 12;                                                        // 2657
                return units === 'month' ? months : months / 12;                                                       // 2658
            } else {                                                                                                   // 2659
                days += yearsToDays(this._months / 12);                                                                // 2660
                switch (units) {                                                                                       // 2661
                    case 'week': return days / 7;                                                                      // 2662
                    case 'day': return days;                                                                           // 2663
                    case 'hour': return days * 24;                                                                     // 2664
                    case 'minute': return days * 24 * 60;                                                              // 2665
                    case 'second': return days * 24 * 60 * 60;                                                         // 2666
                    case 'millisecond': return days * 24 * 60 * 60 * 1000;                                             // 2667
                    default: throw new Error('Unknown unit ' + units);                                                 // 2668
                }                                                                                                      // 2669
            }                                                                                                          // 2670
        },                                                                                                             // 2671
                                                                                                                       // 2672
        lang : moment.fn.lang,                                                                                         // 2673
        locale : moment.fn.locale,                                                                                     // 2674
                                                                                                                       // 2675
        toIsoString : deprecate(                                                                                       // 2676
            "toIsoString() is deprecated. Please use toISOString() instead " +                                         // 2677
            "(notice the capitals)",                                                                                   // 2678
            function () {                                                                                              // 2679
                return this.toISOString();                                                                             // 2680
            }                                                                                                          // 2681
        ),                                                                                                             // 2682
                                                                                                                       // 2683
        toISOString : function () {                                                                                    // 2684
            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js            // 2685
            var years = Math.abs(this.years()),                                                                        // 2686
                months = Math.abs(this.months()),                                                                      // 2687
                days = Math.abs(this.days()),                                                                          // 2688
                hours = Math.abs(this.hours()),                                                                        // 2689
                minutes = Math.abs(this.minutes()),                                                                    // 2690
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);                                       // 2691
                                                                                                                       // 2692
            if (!this.asSeconds()) {                                                                                   // 2693
                // this is the same as C#'s (Noda) and python (isodate)...                                             // 2694
                // but not other JS (goog.date)                                                                        // 2695
                return 'P0D';                                                                                          // 2696
            }                                                                                                          // 2697
                                                                                                                       // 2698
            return (this.asSeconds() < 0 ? '-' : '') +                                                                 // 2699
                'P' +                                                                                                  // 2700
                (years ? years + 'Y' : '') +                                                                           // 2701
                (months ? months + 'M' : '') +                                                                         // 2702
                (days ? days + 'D' : '') +                                                                             // 2703
                ((hours || minutes || seconds) ? 'T' : '') +                                                           // 2704
                (hours ? hours + 'H' : '') +                                                                           // 2705
                (minutes ? minutes + 'M' : '') +                                                                       // 2706
                (seconds ? seconds + 'S' : '');                                                                        // 2707
        },                                                                                                             // 2708
                                                                                                                       // 2709
        localeData : function () {                                                                                     // 2710
            return this._locale;                                                                                       // 2711
        }                                                                                                              // 2712
    });                                                                                                                // 2713
                                                                                                                       // 2714
    function makeDurationGetter(name) {                                                                                // 2715
        moment.duration.fn[name] = function () {                                                                       // 2716
            return this._data[name];                                                                                   // 2717
        };                                                                                                             // 2718
    }                                                                                                                  // 2719
                                                                                                                       // 2720
    for (i in unitMillisecondFactors) {                                                                                // 2721
        if (unitMillisecondFactors.hasOwnProperty(i)) {                                                                // 2722
            makeDurationGetter(i.toLowerCase());                                                                       // 2723
        }                                                                                                              // 2724
    }                                                                                                                  // 2725
                                                                                                                       // 2726
    moment.duration.fn.asMilliseconds = function () {                                                                  // 2727
        return this.as('ms');                                                                                          // 2728
    };                                                                                                                 // 2729
    moment.duration.fn.asSeconds = function () {                                                                       // 2730
        return this.as('s');                                                                                           // 2731
    };                                                                                                                 // 2732
    moment.duration.fn.asMinutes = function () {                                                                       // 2733
        return this.as('m');                                                                                           // 2734
    };                                                                                                                 // 2735
    moment.duration.fn.asHours = function () {                                                                         // 2736
        return this.as('h');                                                                                           // 2737
    };                                                                                                                 // 2738
    moment.duration.fn.asDays = function () {                                                                          // 2739
        return this.as('d');                                                                                           // 2740
    };                                                                                                                 // 2741
    moment.duration.fn.asWeeks = function () {                                                                         // 2742
        return this.as('weeks');                                                                                       // 2743
    };                                                                                                                 // 2744
    moment.duration.fn.asMonths = function () {                                                                        // 2745
        return this.as('M');                                                                                           // 2746
    };                                                                                                                 // 2747
    moment.duration.fn.asYears = function () {                                                                         // 2748
        return this.as('y');                                                                                           // 2749
    };                                                                                                                 // 2750
                                                                                                                       // 2751
    /************************************                                                                              // 2752
        Default Locale                                                                                                 // 2753
    ************************************/                                                                              // 2754
                                                                                                                       // 2755
                                                                                                                       // 2756
    // Set default locale, other locale will inherit from English.                                                     // 2757
    moment.locale('en', {                                                                                              // 2758
        ordinal : function (number) {                                                                                  // 2759
            var b = number % 10,                                                                                       // 2760
                output = (toInt(number % 100 / 10) === 1) ? 'th' :                                                     // 2761
                (b === 1) ? 'st' :                                                                                     // 2762
                (b === 2) ? 'nd' :                                                                                     // 2763
                (b === 3) ? 'rd' : 'th';                                                                               // 2764
            return number + output;                                                                                    // 2765
        }                                                                                                              // 2766
    });                                                                                                                // 2767
                                                                                                                       // 2768
    /* EMBED_LOCALES */                                                                                                // 2769
                                                                                                                       // 2770
    /************************************                                                                              // 2771
        Exposing Moment                                                                                                // 2772
    ************************************/                                                                              // 2773
                                                                                                                       // 2774
    function makeGlobal(shouldDeprecate) {                                                                             // 2775
        /*global ender:false */                                                                                        // 2776
        if (typeof ender !== 'undefined') {                                                                            // 2777
            return;                                                                                                    // 2778
        }                                                                                                              // 2779
        oldGlobalMoment = globalScope.moment;                                                                          // 2780
        if (shouldDeprecate) {                                                                                         // 2781
            globalScope.moment = deprecate(                                                                            // 2782
                    'Accessing Moment through the global scope is ' +                                                  // 2783
                    'deprecated, and will be removed in an upcoming ' +                                                // 2784
                    'release.',                                                                                        // 2785
                    moment);                                                                                           // 2786
        } else {                                                                                                       // 2787
            globalScope.moment = moment;                                                                               // 2788
        }                                                                                                              // 2789
    }                                                                                                                  // 2790
                                                                                                                       // 2791
    // CommonJS module is defined                                                                                      // 2792
    if (hasModule) {                                                                                                   // 2793
        module.exports = moment;                                                                                       // 2794
    } else if (typeof define === 'function' && define.amd) {                                                           // 2795
        define('moment', function (require, exports, module) {                                                         // 2796
            if (module.config && module.config() && module.config().noGlobal === true) {                               // 2797
                // release the global variable                                                                         // 2798
                globalScope.moment = oldGlobalMoment;                                                                  // 2799
            }                                                                                                          // 2800
                                                                                                                       // 2801
            return moment;                                                                                             // 2802
        });                                                                                                            // 2803
        makeGlobal(true);                                                                                              // 2804
    } else {                                                                                                           // 2805
        makeGlobal();                                                                                                  // 2806
    }                                                                                                                  // 2807
}).call(this);                                                                                                         // 2808
                                                                                                                       // 2809
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/mrt:moment/export-moment.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
//This file exposes moment so that it works with Meteor 0.6.5's package system.                                        // 1
if (typeof Package !== "undefined") {                                                                                  // 2
  moment = this.moment;                                                                                                // 3
}                                                                                                                      // 4
                                                                                                                       // 5
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("mrt:moment", {
  moment: moment
});

})();
