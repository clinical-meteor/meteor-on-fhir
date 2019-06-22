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
var CryptoJS;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/jparker_crypto-core/packages/jparker_crypto-core.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/jparker:crypto-core/lib/core.js                                                                     //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
/*                                                                                                              // 1
CryptoJS v3.1.2                                                                                                 // 2
code.google.com/p/crypto-js                                                                                     // 3
(c) 2009-2013 by Jeff Mott. All rights reserved.                                                                // 4
code.google.com/p/crypto-js/wiki/License                                                                        // 5
*/                                                                                                              // 6
/**                                                                                                             // 7
 * CryptoJS core components.                                                                                    // 8
 */                                                                                                             // 9
CryptoJS = CryptoJS || (function (Math, undefined) {                                                            // 10
    /**                                                                                                         // 11
     * CryptoJS namespace.                                                                                      // 12
     */                                                                                                         // 13
    var C = {};                                                                                                 // 14
                                                                                                                // 15
    /**                                                                                                         // 16
     * Library namespace.                                                                                       // 17
     */                                                                                                         // 18
    var C_lib = C.lib = {};                                                                                     // 19
                                                                                                                // 20
    /**                                                                                                         // 21
     * Base object for prototypal inheritance.                                                                  // 22
     */                                                                                                         // 23
    var Base = C_lib.Base = (function () {                                                                      // 24
        function F() {}                                                                                         // 25
                                                                                                                // 26
        return {                                                                                                // 27
            /**                                                                                                 // 28
             * Creates a new object that inherits from this object.                                             // 29
             *                                                                                                  // 30
             * @param {Object} overrides Properties to copy into the new object.                                // 31
             *                                                                                                  // 32
             * @return {Object} The new object.                                                                 // 33
             *                                                                                                  // 34
             * @static                                                                                          // 35
             *                                                                                                  // 36
             * @example                                                                                         // 37
             *                                                                                                  // 38
             *     var MyType = CryptoJS.lib.Base.extend({                                                      // 39
             *         field: 'value',                                                                          // 40
             *                                                                                                  // 41
             *         method: function () {                                                                    // 42
             *         }                                                                                        // 43
             *     });                                                                                          // 44
             */                                                                                                 // 45
            extend: function (overrides) {                                                                      // 46
                // Spawn                                                                                        // 47
                F.prototype = this;                                                                             // 48
                var subtype = new F();                                                                          // 49
                                                                                                                // 50
                // Augment                                                                                      // 51
                if (overrides) {                                                                                // 52
                    subtype.mixIn(overrides);                                                                   // 53
                }                                                                                               // 54
                                                                                                                // 55
                // Create default initializer                                                                   // 56
                if (!subtype.hasOwnProperty('init')) {                                                          // 57
                    subtype.init = function () {                                                                // 58
                        subtype.$super.init.apply(this, arguments);                                             // 59
                    };                                                                                          // 60
                }                                                                                               // 61
                                                                                                                // 62
                // Initializer's prototype is the subtype object                                                // 63
                subtype.init.prototype = subtype;                                                               // 64
                                                                                                                // 65
                // Reference supertype                                                                          // 66
                subtype.$super = this;                                                                          // 67
                                                                                                                // 68
                return subtype;                                                                                 // 69
            },                                                                                                  // 70
                                                                                                                // 71
            /**                                                                                                 // 72
             * Extends this object and runs the init method.                                                    // 73
             * Arguments to create() will be passed to init().                                                  // 74
             *                                                                                                  // 75
             * @return {Object} The new object.                                                                 // 76
             *                                                                                                  // 77
             * @static                                                                                          // 78
             *                                                                                                  // 79
             * @example                                                                                         // 80
             *                                                                                                  // 81
             *     var instance = MyType.create();                                                              // 82
             */                                                                                                 // 83
            create: function () {                                                                               // 84
                var instance = this.extend();                                                                   // 85
                instance.init.apply(instance, arguments);                                                       // 86
                                                                                                                // 87
                return instance;                                                                                // 88
            },                                                                                                  // 89
                                                                                                                // 90
            /**                                                                                                 // 91
             * Initializes a newly created object.                                                              // 92
             * Override this method to add some logic when your objects are created.                            // 93
             *                                                                                                  // 94
             * @example                                                                                         // 95
             *                                                                                                  // 96
             *     var MyType = CryptoJS.lib.Base.extend({                                                      // 97
             *         init: function () {                                                                      // 98
             *             // ...                                                                               // 99
             *         }                                                                                        // 100
             *     });                                                                                          // 101
             */                                                                                                 // 102
            init: function () {                                                                                 // 103
            },                                                                                                  // 104
                                                                                                                // 105
            /**                                                                                                 // 106
             * Copies properties into this object.                                                              // 107
             *                                                                                                  // 108
             * @param {Object} properties The properties to mix in.                                             // 109
             *                                                                                                  // 110
             * @example                                                                                         // 111
             *                                                                                                  // 112
             *     MyType.mixIn({                                                                               // 113
             *         field: 'value'                                                                           // 114
             *     });                                                                                          // 115
             */                                                                                                 // 116
            mixIn: function (properties) {                                                                      // 117
                for (var propertyName in properties) {                                                          // 118
                    if (properties.hasOwnProperty(propertyName)) {                                              // 119
                        this[propertyName] = properties[propertyName];                                          // 120
                    }                                                                                           // 121
                }                                                                                               // 122
                                                                                                                // 123
                // IE won't copy toString using the loop above                                                  // 124
                if (properties.hasOwnProperty('toString')) {                                                    // 125
                    this.toString = properties.toString;                                                        // 126
                }                                                                                               // 127
            },                                                                                                  // 128
                                                                                                                // 129
            /**                                                                                                 // 130
             * Creates a copy of this object.                                                                   // 131
             *                                                                                                  // 132
             * @return {Object} The clone.                                                                      // 133
             *                                                                                                  // 134
             * @example                                                                                         // 135
             *                                                                                                  // 136
             *     var clone = instance.clone();                                                                // 137
             */                                                                                                 // 138
            clone: function () {                                                                                // 139
                return this.init.prototype.extend(this);                                                        // 140
            }                                                                                                   // 141
        };                                                                                                      // 142
    }());                                                                                                       // 143
                                                                                                                // 144
    /**                                                                                                         // 145
     * An array of 32-bit words.                                                                                // 146
     *                                                                                                          // 147
     * @property {Array} words The array of 32-bit words.                                                       // 148
     * @property {number} sigBytes The number of significant bytes in this word array.                          // 149
     */                                                                                                         // 150
    var WordArray = C_lib.WordArray = Base.extend({                                                             // 151
        /**                                                                                                     // 152
         * Initializes a newly created word array.                                                              // 153
         *                                                                                                      // 154
         * @param {Array} words (Optional) An array of 32-bit words.                                            // 155
         * @param {number} sigBytes (Optional) The number of significant bytes in the words.                    // 156
         *                                                                                                      // 157
         * @example                                                                                             // 158
         *                                                                                                      // 159
         *     var wordArray = CryptoJS.lib.WordArray.create();                                                 // 160
         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);                         // 161
         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);                      // 162
         */                                                                                                     // 163
        init: function (words, sigBytes) {                                                                      // 164
            words = this.words = words || [];                                                                   // 165
                                                                                                                // 166
            if (sigBytes != undefined) {                                                                        // 167
                this.sigBytes = sigBytes;                                                                       // 168
            } else {                                                                                            // 169
                this.sigBytes = words.length * 4;                                                               // 170
            }                                                                                                   // 171
        },                                                                                                      // 172
                                                                                                                // 173
        /**                                                                                                     // 174
         * Converts this word array to a string.                                                                // 175
         *                                                                                                      // 176
         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex          // 177
         *                                                                                                      // 178
         * @return {string} The stringified word array.                                                         // 179
         *                                                                                                      // 180
         * @example                                                                                             // 181
         *                                                                                                      // 182
         *     var string = wordArray + '';                                                                     // 183
         *     var string = wordArray.toString();                                                               // 184
         *     var string = wordArray.toString(CryptoJS.enc.Utf8);                                              // 185
         */                                                                                                     // 186
        toString: function (encoder) {                                                                          // 187
            return (encoder || Hex).stringify(this);                                                            // 188
        },                                                                                                      // 189
                                                                                                                // 190
        /**                                                                                                     // 191
         * Concatenates a word array to this word array.                                                        // 192
         *                                                                                                      // 193
         * @param {WordArray} wordArray The word array to append.                                               // 194
         *                                                                                                      // 195
         * @return {WordArray} This word array.                                                                 // 196
         *                                                                                                      // 197
         * @example                                                                                             // 198
         *                                                                                                      // 199
         *     wordArray1.concat(wordArray2);                                                                   // 200
         */                                                                                                     // 201
        concat: function (wordArray) {                                                                          // 202
            // Shortcuts                                                                                        // 203
            var thisWords = this.words;                                                                         // 204
            var thatWords = wordArray.words;                                                                    // 205
            var thisSigBytes = this.sigBytes;                                                                   // 206
            var thatSigBytes = wordArray.sigBytes;                                                              // 207
                                                                                                                // 208
            // Clamp excess bits                                                                                // 209
            this.clamp();                                                                                       // 210
                                                                                                                // 211
            // Concat                                                                                           // 212
            if (thisSigBytes % 4) {                                                                             // 213
                // Copy one byte at a time                                                                      // 214
                for (var i = 0; i < thatSigBytes; i++) {                                                        // 215
                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;                          // 216
                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);     // 217
                }                                                                                               // 218
            } else if (thatWords.length > 0xffff) {                                                             // 219
                // Copy one word at a time                                                                      // 220
                for (var i = 0; i < thatSigBytes; i += 4) {                                                     // 221
                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];                                   // 222
                }                                                                                               // 223
            } else {                                                                                            // 224
                // Copy all words at once                                                                       // 225
                thisWords.push.apply(thisWords, thatWords);                                                     // 226
            }                                                                                                   // 227
            this.sigBytes += thatSigBytes;                                                                      // 228
                                                                                                                // 229
            // Chainable                                                                                        // 230
            return this;                                                                                        // 231
        },                                                                                                      // 232
                                                                                                                // 233
        /**                                                                                                     // 234
         * Removes insignificant bits.                                                                          // 235
         *                                                                                                      // 236
         * @example                                                                                             // 237
         *                                                                                                      // 238
         *     wordArray.clamp();                                                                               // 239
         */                                                                                                     // 240
        clamp: function () {                                                                                    // 241
            // Shortcuts                                                                                        // 242
            var words = this.words;                                                                             // 243
            var sigBytes = this.sigBytes;                                                                       // 244
                                                                                                                // 245
            // Clamp                                                                                            // 246
            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);                                   // 247
            words.length = Math.ceil(sigBytes / 4);                                                             // 248
        },                                                                                                      // 249
                                                                                                                // 250
        /**                                                                                                     // 251
         * Creates a copy of this word array.                                                                   // 252
         *                                                                                                      // 253
         * @return {WordArray} The clone.                                                                       // 254
         *                                                                                                      // 255
         * @example                                                                                             // 256
         *                                                                                                      // 257
         *     var clone = wordArray.clone();                                                                   // 258
         */                                                                                                     // 259
        clone: function () {                                                                                    // 260
            var clone = Base.clone.call(this);                                                                  // 261
            clone.words = this.words.slice(0);                                                                  // 262
                                                                                                                // 263
            return clone;                                                                                       // 264
        },                                                                                                      // 265
                                                                                                                // 266
        /**                                                                                                     // 267
         * Creates a word array filled with random bytes.                                                       // 268
         *                                                                                                      // 269
         * @param {number} nBytes The number of random bytes to generate.                                       // 270
         *                                                                                                      // 271
         * @return {WordArray} The random word array.                                                           // 272
         *                                                                                                      // 273
         * @static                                                                                              // 274
         *                                                                                                      // 275
         * @example                                                                                             // 276
         *                                                                                                      // 277
         *     var wordArray = CryptoJS.lib.WordArray.random(16);                                               // 278
         */                                                                                                     // 279
        random: function (nBytes) {                                                                             // 280
            var words = [];                                                                                     // 281
            for (var i = 0; i < nBytes; i += 4) {                                                               // 282
                words.push((Math.random() * 0x100000000) | 0);                                                  // 283
            }                                                                                                   // 284
                                                                                                                // 285
            return new WordArray.init(words, nBytes);                                                           // 286
        }                                                                                                       // 287
    });                                                                                                         // 288
                                                                                                                // 289
    /**                                                                                                         // 290
     * Encoder namespace.                                                                                       // 291
     */                                                                                                         // 292
    var C_enc = C.enc = {};                                                                                     // 293
                                                                                                                // 294
    /**                                                                                                         // 295
     * Hex encoding strategy.                                                                                   // 296
     */                                                                                                         // 297
    var Hex = C_enc.Hex = {                                                                                     // 298
        /**                                                                                                     // 299
         * Converts a word array to a hex string.                                                               // 300
         *                                                                                                      // 301
         * @param {WordArray} wordArray The word array.                                                         // 302
         *                                                                                                      // 303
         * @return {string} The hex string.                                                                     // 304
         *                                                                                                      // 305
         * @static                                                                                              // 306
         *                                                                                                      // 307
         * @example                                                                                             // 308
         *                                                                                                      // 309
         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);                                           // 310
         */                                                                                                     // 311
        stringify: function (wordArray) {                                                                       // 312
            // Shortcuts                                                                                        // 313
            var words = wordArray.words;                                                                        // 314
            var sigBytes = wordArray.sigBytes;                                                                  // 315
                                                                                                                // 316
            // Convert                                                                                          // 317
            var hexChars = [];                                                                                  // 318
            for (var i = 0; i < sigBytes; i++) {                                                                // 319
                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;                                      // 320
                hexChars.push((bite >>> 4).toString(16));                                                       // 321
                hexChars.push((bite & 0x0f).toString(16));                                                      // 322
            }                                                                                                   // 323
                                                                                                                // 324
            return hexChars.join('');                                                                           // 325
        },                                                                                                      // 326
                                                                                                                // 327
        /**                                                                                                     // 328
         * Converts a hex string to a word array.                                                               // 329
         *                                                                                                      // 330
         * @param {string} hexStr The hex string.                                                               // 331
         *                                                                                                      // 332
         * @return {WordArray} The word array.                                                                  // 333
         *                                                                                                      // 334
         * @static                                                                                              // 335
         *                                                                                                      // 336
         * @example                                                                                             // 337
         *                                                                                                      // 338
         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);                                               // 339
         */                                                                                                     // 340
        parse: function (hexStr) {                                                                              // 341
            // Shortcut                                                                                         // 342
            var hexStrLength = hexStr.length;                                                                   // 343
                                                                                                                // 344
            // Convert                                                                                          // 345
            var words = [];                                                                                     // 346
            for (var i = 0; i < hexStrLength; i += 2) {                                                         // 347
                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);                      // 348
            }                                                                                                   // 349
                                                                                                                // 350
            return new WordArray.init(words, hexStrLength / 2);                                                 // 351
        }                                                                                                       // 352
    };                                                                                                          // 353
                                                                                                                // 354
    /**                                                                                                         // 355
     * Latin1 encoding strategy.                                                                                // 356
     */                                                                                                         // 357
    var Latin1 = C_enc.Latin1 = {                                                                               // 358
        /**                                                                                                     // 359
         * Converts a word array to a Latin1 string.                                                            // 360
         *                                                                                                      // 361
         * @param {WordArray} wordArray The word array.                                                         // 362
         *                                                                                                      // 363
         * @return {string} The Latin1 string.                                                                  // 364
         *                                                                                                      // 365
         * @static                                                                                              // 366
         *                                                                                                      // 367
         * @example                                                                                             // 368
         *                                                                                                      // 369
         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);                                     // 370
         */                                                                                                     // 371
        stringify: function (wordArray) {                                                                       // 372
            // Shortcuts                                                                                        // 373
            var words = wordArray.words;                                                                        // 374
            var sigBytes = wordArray.sigBytes;                                                                  // 375
                                                                                                                // 376
            // Convert                                                                                          // 377
            var latin1Chars = [];                                                                               // 378
            for (var i = 0; i < sigBytes; i++) {                                                                // 379
                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;                                      // 380
                latin1Chars.push(String.fromCharCode(bite));                                                    // 381
            }                                                                                                   // 382
                                                                                                                // 383
            return latin1Chars.join('');                                                                        // 384
        },                                                                                                      // 385
                                                                                                                // 386
        /**                                                                                                     // 387
         * Converts a Latin1 string to a word array.                                                            // 388
         *                                                                                                      // 389
         * @param {string} latin1Str The Latin1 string.                                                         // 390
         *                                                                                                      // 391
         * @return {WordArray} The word array.                                                                  // 392
         *                                                                                                      // 393
         * @static                                                                                              // 394
         *                                                                                                      // 395
         * @example                                                                                             // 396
         *                                                                                                      // 397
         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);                                         // 398
         */                                                                                                     // 399
        parse: function (latin1Str) {                                                                           // 400
            // Shortcut                                                                                         // 401
            var latin1StrLength = latin1Str.length;                                                             // 402
                                                                                                                // 403
            // Convert                                                                                          // 404
            var words = [];                                                                                     // 405
            for (var i = 0; i < latin1StrLength; i++) {                                                         // 406
                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);                       // 407
            }                                                                                                   // 408
                                                                                                                // 409
            return new WordArray.init(words, latin1StrLength);                                                  // 410
        }                                                                                                       // 411
    };                                                                                                          // 412
                                                                                                                // 413
    /**                                                                                                         // 414
     * UTF-8 encoding strategy.                                                                                 // 415
     */                                                                                                         // 416
    var Utf8 = C_enc.Utf8 = {                                                                                   // 417
        /**                                                                                                     // 418
         * Converts a word array to a UTF-8 string.                                                             // 419
         *                                                                                                      // 420
         * @param {WordArray} wordArray The word array.                                                         // 421
         *                                                                                                      // 422
         * @return {string} The UTF-8 string.                                                                   // 423
         *                                                                                                      // 424
         * @static                                                                                              // 425
         *                                                                                                      // 426
         * @example                                                                                             // 427
         *                                                                                                      // 428
         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);                                         // 429
         */                                                                                                     // 430
        stringify: function (wordArray) {                                                                       // 431
            try {                                                                                               // 432
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));                                 // 433
            } catch (e) {                                                                                       // 434
                throw new Error('Malformed UTF-8 data');                                                        // 435
            }                                                                                                   // 436
        },                                                                                                      // 437
                                                                                                                // 438
        /**                                                                                                     // 439
         * Converts a UTF-8 string to a word array.                                                             // 440
         *                                                                                                      // 441
         * @param {string} utf8Str The UTF-8 string.                                                            // 442
         *                                                                                                      // 443
         * @return {WordArray} The word array.                                                                  // 444
         *                                                                                                      // 445
         * @static                                                                                              // 446
         *                                                                                                      // 447
         * @example                                                                                             // 448
         *                                                                                                      // 449
         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);                                             // 450
         */                                                                                                     // 451
        parse: function (utf8Str) {                                                                             // 452
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));                                         // 453
        }                                                                                                       // 454
    };                                                                                                          // 455
                                                                                                                // 456
    /**                                                                                                         // 457
     * Abstract buffered block algorithm template.                                                              // 458
     *                                                                                                          // 459
     * The property blockSize must be implemented in a concrete subtype.                                        // 460
     *                                                                                                          // 461
     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
     */                                                                                                         // 463
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({                                   // 464
        /**                                                                                                     // 465
         * Resets this block algorithm's data buffer to its initial state.                                      // 466
         *                                                                                                      // 467
         * @example                                                                                             // 468
         *                                                                                                      // 469
         *     bufferedBlockAlgorithm.reset();                                                                  // 470
         */                                                                                                     // 471
        reset: function () {                                                                                    // 472
            // Initial values                                                                                   // 473
            this._data = new WordArray.init();                                                                  // 474
            this._nDataBytes = 0;                                                                               // 475
        },                                                                                                      // 476
                                                                                                                // 477
        /**                                                                                                     // 478
         * Adds new data to this block algorithm's buffer.                                                      // 479
         *                                                                                                      // 480
         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8. // 481
         *                                                                                                      // 482
         * @example                                                                                             // 483
         *                                                                                                      // 484
         *     bufferedBlockAlgorithm._append('data');                                                          // 485
         *     bufferedBlockAlgorithm._append(wordArray);                                                       // 486
         */                                                                                                     // 487
        _append: function (data) {                                                                              // 488
            // Convert string to WordArray, else assume WordArray already                                       // 489
            if (typeof data == 'string') {                                                                      // 490
                data = Utf8.parse(data);                                                                        // 491
            }                                                                                                   // 492
                                                                                                                // 493
            // Append                                                                                           // 494
            this._data.concat(data);                                                                            // 495
            this._nDataBytes += data.sigBytes;                                                                  // 496
        },                                                                                                      // 497
                                                                                                                // 498
        /**                                                                                                     // 499
         * Processes available data blocks.                                                                     // 500
         *                                                                                                      // 501
         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.        // 502
         *                                                                                                      // 503
         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.                  // 504
         *                                                                                                      // 505
         * @return {WordArray} The processed data.                                                              // 506
         *                                                                                                      // 507
         * @example                                                                                             // 508
         *                                                                                                      // 509
         *     var processedData = bufferedBlockAlgorithm._process();                                           // 510
         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');                                  // 511
         */                                                                                                     // 512
        _process: function (doFlush) {                                                                          // 513
            // Shortcuts                                                                                        // 514
            var data = this._data;                                                                              // 515
            var dataWords = data.words;                                                                         // 516
            var dataSigBytes = data.sigBytes;                                                                   // 517
            var blockSize = this.blockSize;                                                                     // 518
            var blockSizeBytes = blockSize * 4;                                                                 // 519
                                                                                                                // 520
            // Count blocks ready                                                                               // 521
            var nBlocksReady = dataSigBytes / blockSizeBytes;                                                   // 522
            if (doFlush) {                                                                                      // 523
                // Round up to include partial blocks                                                           // 524
                nBlocksReady = Math.ceil(nBlocksReady);                                                         // 525
            } else {                                                                                            // 526
                // Round down to include only full blocks,                                                      // 527
                // less the number of blocks that must remain in the buffer                                     // 528
                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);                           // 529
            }                                                                                                   // 530
                                                                                                                // 531
            // Count words ready                                                                                // 532
            var nWordsReady = nBlocksReady * blockSize;                                                         // 533
                                                                                                                // 534
            // Count bytes ready                                                                                // 535
            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);                                          // 536
                                                                                                                // 537
            // Process blocks                                                                                   // 538
            if (nWordsReady) {                                                                                  // 539
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {                               // 540
                    // Perform concrete-algorithm logic                                                         // 541
                    this._doProcessBlock(dataWords, offset);                                                    // 542
                }                                                                                               // 543
                                                                                                                // 544
                // Remove processed words                                                                       // 545
                var processedWords = dataWords.splice(0, nWordsReady);                                          // 546
                data.sigBytes -= nBytesReady;                                                                   // 547
            }                                                                                                   // 548
                                                                                                                // 549
            // Return processed words                                                                           // 550
            return new WordArray.init(processedWords, nBytesReady);                                             // 551
        },                                                                                                      // 552
                                                                                                                // 553
        /**                                                                                                     // 554
         * Creates a copy of this object.                                                                       // 555
         *                                                                                                      // 556
         * @return {Object} The clone.                                                                          // 557
         *                                                                                                      // 558
         * @example                                                                                             // 559
         *                                                                                                      // 560
         *     var clone = bufferedBlockAlgorithm.clone();                                                      // 561
         */                                                                                                     // 562
        clone: function () {                                                                                    // 563
            var clone = Base.clone.call(this);                                                                  // 564
            clone._data = this._data.clone();                                                                   // 565
                                                                                                                // 566
            return clone;                                                                                       // 567
        },                                                                                                      // 568
                                                                                                                // 569
        _minBufferSize: 0                                                                                       // 570
    });                                                                                                         // 571
                                                                                                                // 572
    /**                                                                                                         // 573
     * Abstract hasher template.                                                                                // 574
     *                                                                                                          // 575
     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)  // 576
     */                                                                                                         // 577
    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({                                                 // 578
        /**                                                                                                     // 579
         * Configuration options.                                                                               // 580
         */                                                                                                     // 581
        cfg: Base.extend(),                                                                                     // 582
                                                                                                                // 583
        /**                                                                                                     // 584
         * Initializes a newly created hasher.                                                                  // 585
         *                                                                                                      // 586
         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.           // 587
         *                                                                                                      // 588
         * @example                                                                                             // 589
         *                                                                                                      // 590
         *     var hasher = CryptoJS.algo.SHA256.create();                                                      // 591
         */                                                                                                     // 592
        init: function (cfg) {                                                                                  // 593
            // Apply config defaults                                                                            // 594
            this.cfg = this.cfg.extend(cfg);                                                                    // 595
                                                                                                                // 596
            // Set initial values                                                                               // 597
            this.reset();                                                                                       // 598
        },                                                                                                      // 599
                                                                                                                // 600
        /**                                                                                                     // 601
         * Resets this hasher to its initial state.                                                             // 602
         *                                                                                                      // 603
         * @example                                                                                             // 604
         *                                                                                                      // 605
         *     hasher.reset();                                                                                  // 606
         */                                                                                                     // 607
        reset: function () {                                                                                    // 608
            // Reset data buffer                                                                                // 609
            BufferedBlockAlgorithm.reset.call(this);                                                            // 610
                                                                                                                // 611
            // Perform concrete-hasher logic                                                                    // 612
            this._doReset();                                                                                    // 613
        },                                                                                                      // 614
                                                                                                                // 615
        /**                                                                                                     // 616
         * Updates this hasher with a message.                                                                  // 617
         *                                                                                                      // 618
         * @param {WordArray|string} messageUpdate The message to append.                                       // 619
         *                                                                                                      // 620
         * @return {Hasher} This hasher.                                                                        // 621
         *                                                                                                      // 622
         * @example                                                                                             // 623
         *                                                                                                      // 624
         *     hasher.update('message');                                                                        // 625
         *     hasher.update(wordArray);                                                                        // 626
         */                                                                                                     // 627
        update: function (messageUpdate) {                                                                      // 628
            // Append                                                                                           // 629
            this._append(messageUpdate);                                                                        // 630
                                                                                                                // 631
            // Update the hash                                                                                  // 632
            this._process();                                                                                    // 633
                                                                                                                // 634
            // Chainable                                                                                        // 635
            return this;                                                                                        // 636
        },                                                                                                      // 637
                                                                                                                // 638
        /**                                                                                                     // 639
         * Finalizes the hash computation.                                                                      // 640
         * Note that the finalize operation is effectively a destructive, read-once operation.                  // 641
         *                                                                                                      // 642
         * @param {WordArray|string} messageUpdate (Optional) A final message update.                           // 643
         *                                                                                                      // 644
         * @return {WordArray} The hash.                                                                        // 645
         *                                                                                                      // 646
         * @example                                                                                             // 647
         *                                                                                                      // 648
         *     var hash = hasher.finalize();                                                                    // 649
         *     var hash = hasher.finalize('message');                                                           // 650
         *     var hash = hasher.finalize(wordArray);                                                           // 651
         */                                                                                                     // 652
        finalize: function (messageUpdate) {                                                                    // 653
            // Final message update                                                                             // 654
            if (messageUpdate) {                                                                                // 655
                this._append(messageUpdate);                                                                    // 656
            }                                                                                                   // 657
                                                                                                                // 658
            // Perform concrete-hasher logic                                                                    // 659
            var hash = this._doFinalize();                                                                      // 660
                                                                                                                // 661
            return hash;                                                                                        // 662
        },                                                                                                      // 663
                                                                                                                // 664
        blockSize: 512/32,                                                                                      // 665
                                                                                                                // 666
        /**                                                                                                     // 667
         * Creates a shortcut function to a hasher's object interface.                                          // 668
         *                                                                                                      // 669
         * @param {Hasher} hasher The hasher to create a helper for.                                            // 670
         *                                                                                                      // 671
         * @return {Function} The shortcut function.                                                            // 672
         *                                                                                                      // 673
         * @static                                                                                              // 674
         *                                                                                                      // 675
         * @example                                                                                             // 676
         *                                                                                                      // 677
         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);                            // 678
         */                                                                                                     // 679
        _createHelper: function (hasher) {                                                                      // 680
            return function (message, cfg) {                                                                    // 681
                return new hasher.init(cfg).finalize(message);                                                  // 682
            };                                                                                                  // 683
        },                                                                                                      // 684
                                                                                                                // 685
        /**                                                                                                     // 686
         * Creates a shortcut function to the HMAC's object interface.                                          // 687
         *                                                                                                      // 688
         * @param {Hasher} hasher The hasher to use in this HMAC helper.                                        // 689
         *                                                                                                      // 690
         * @return {Function} The shortcut function.                                                            // 691
         *                                                                                                      // 692
         * @static                                                                                              // 693
         *                                                                                                      // 694
         * @example                                                                                             // 695
         *                                                                                                      // 696
         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);                    // 697
         */                                                                                                     // 698
        _createHmacHelper: function (hasher) {                                                                  // 699
            return function (message, key) {                                                                    // 700
                return new C_algo.HMAC.init(hasher, key).finalize(message);                                     // 701
            };                                                                                                  // 702
        }                                                                                                       // 703
    });                                                                                                         // 704
                                                                                                                // 705
    /**                                                                                                         // 706
     * Algorithm namespace.                                                                                     // 707
     */                                                                                                         // 708
    var C_algo = C.algo = {};                                                                                   // 709
                                                                                                                // 710
    return C;                                                                                                   // 711
}(Math));                                                                                                       // 712
                                                                                                                // 713
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("jparker:crypto-core", {
  CryptoJS: CryptoJS
});

})();
