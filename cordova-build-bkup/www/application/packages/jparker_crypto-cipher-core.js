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
var CryptoJS = Package['jparker:crypto-core'].CryptoJS;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/jparker_crypto-cipher-core/packages/jparker_crypto-ciphe //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jparker:crypto-cipher-core/lib/cipher-core.js                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/*                                                                                                                    // 1
CryptoJS v3.1.2                                                                                                       // 2
code.google.com/p/crypto-js                                                                                           // 3
(c) 2009-2013 by Jeff Mott. All rights reserved.                                                                      // 4
code.google.com/p/crypto-js/wiki/License                                                                              // 5
*/                                                                                                                    // 6
/**                                                                                                                   // 7
 * Cipher core components.                                                                                            // 8
 */                                                                                                                   // 9
CryptoJS.lib.Cipher || (function (undefined) {                                                                        // 10
    // Shortcuts                                                                                                      // 11
    var C = CryptoJS;                                                                                                 // 12
    var C_lib = C.lib;                                                                                                // 13
    var Base = C_lib.Base;                                                                                            // 14
    var WordArray = C_lib.WordArray;                                                                                  // 15
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;                                                        // 16
    var C_enc = C.enc;                                                                                                // 17
    var Utf8 = C_enc.Utf8;                                                                                            // 18
    var Base64 = C_enc.Base64;                                                                                        // 19
    var C_algo = C.algo;                                                                                              // 20
    var EvpKDF = C_algo.EvpKDF;                                                                                       // 21
                                                                                                                      // 22
    /**                                                                                                               // 23
     * Abstract base cipher template.                                                                                 // 24
     *                                                                                                                // 25
     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)                                       // 26
     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)                                         // 27
     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.                                    // 28
     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.                                    // 29
     */                                                                                                               // 30
    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({                                                       // 31
        /**                                                                                                           // 32
         * Configuration options.                                                                                     // 33
         *                                                                                                            // 34
         * @property {WordArray} iv The IV to use for this operation.                                                 // 35
         */                                                                                                           // 36
        cfg: Base.extend(),                                                                                           // 37
                                                                                                                      // 38
        /**                                                                                                           // 39
         * Creates this cipher in encryption mode.                                                                    // 40
         *                                                                                                            // 41
         * @param {WordArray} key The key.                                                                            // 42
         * @param {Object} cfg (Optional) The configuration options to use for this operation.                        // 43
         *                                                                                                            // 44
         * @return {Cipher} A cipher instance.                                                                        // 45
         *                                                                                                            // 46
         * @static                                                                                                    // 47
         *                                                                                                            // 48
         * @example                                                                                                   // 49
         *                                                                                                            // 50
         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });                     // 51
         */                                                                                                           // 52
        createEncryptor: function (key, cfg) {                                                                        // 53
            return this.create(this._ENC_XFORM_MODE, key, cfg);                                                       // 54
        },                                                                                                            // 55
                                                                                                                      // 56
        /**                                                                                                           // 57
         * Creates this cipher in decryption mode.                                                                    // 58
         *                                                                                                            // 59
         * @param {WordArray} key The key.                                                                            // 60
         * @param {Object} cfg (Optional) The configuration options to use for this operation.                        // 61
         *                                                                                                            // 62
         * @return {Cipher} A cipher instance.                                                                        // 63
         *                                                                                                            // 64
         * @static                                                                                                    // 65
         *                                                                                                            // 66
         * @example                                                                                                   // 67
         *                                                                                                            // 68
         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });                     // 69
         */                                                                                                           // 70
        createDecryptor: function (key, cfg) {                                                                        // 71
            return this.create(this._DEC_XFORM_MODE, key, cfg);                                                       // 72
        },                                                                                                            // 73
                                                                                                                      // 74
        /**                                                                                                           // 75
         * Initializes a newly created cipher.                                                                        // 76
         *                                                                                                            // 77
         * @param {number} xformMode Either the encryption or decryption transormation mode constant.                 // 78
         * @param {WordArray} key The key.                                                                            // 79
         * @param {Object} cfg (Optional) The configuration options to use for this operation.                        // 80
         *                                                                                                            // 81
         * @example                                                                                                   // 82
         *                                                                                                            // 83
         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
         */                                                                                                           // 85
        init: function (xformMode, key, cfg) {                                                                        // 86
            // Apply config defaults                                                                                  // 87
            this.cfg = this.cfg.extend(cfg);                                                                          // 88
                                                                                                                      // 89
            // Store transform mode and key                                                                           // 90
            this._xformMode = xformMode;                                                                              // 91
            this._key = key;                                                                                          // 92
                                                                                                                      // 93
            // Set initial values                                                                                     // 94
            this.reset();                                                                                             // 95
        },                                                                                                            // 96
                                                                                                                      // 97
        /**                                                                                                           // 98
         * Resets this cipher to its initial state.                                                                   // 99
         *                                                                                                            // 100
         * @example                                                                                                   // 101
         *                                                                                                            // 102
         *     cipher.reset();                                                                                        // 103
         */                                                                                                           // 104
        reset: function () {                                                                                          // 105
            // Reset data buffer                                                                                      // 106
            BufferedBlockAlgorithm.reset.call(this);                                                                  // 107
                                                                                                                      // 108
            // Perform concrete-cipher logic                                                                          // 109
            this._doReset();                                                                                          // 110
        },                                                                                                            // 111
                                                                                                                      // 112
        /**                                                                                                           // 113
         * Adds data to be encrypted or decrypted.                                                                    // 114
         *                                                                                                            // 115
         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.                                       // 116
         *                                                                                                            // 117
         * @return {WordArray} The data after processing.                                                             // 118
         *                                                                                                            // 119
         * @example                                                                                                   // 120
         *                                                                                                            // 121
         *     var encrypted = cipher.process('data');                                                                // 122
         *     var encrypted = cipher.process(wordArray);                                                             // 123
         */                                                                                                           // 124
        process: function (dataUpdate) {                                                                              // 125
            // Append                                                                                                 // 126
            this._append(dataUpdate);                                                                                 // 127
                                                                                                                      // 128
            // Process available blocks                                                                               // 129
            return this._process();                                                                                   // 130
        },                                                                                                            // 131
                                                                                                                      // 132
        /**                                                                                                           // 133
         * Finalizes the encryption or decryption process.                                                            // 134
         * Note that the finalize operation is effectively a destructive, read-once operation.                        // 135
         *                                                                                                            // 136
         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.                                 // 137
         *                                                                                                            // 138
         * @return {WordArray} The data after final processing.                                                       // 139
         *                                                                                                            // 140
         * @example                                                                                                   // 141
         *                                                                                                            // 142
         *     var encrypted = cipher.finalize();                                                                     // 143
         *     var encrypted = cipher.finalize('data');                                                               // 144
         *     var encrypted = cipher.finalize(wordArray);                                                            // 145
         */                                                                                                           // 146
        finalize: function (dataUpdate) {                                                                             // 147
            // Final data update                                                                                      // 148
            if (dataUpdate) {                                                                                         // 149
                this._append(dataUpdate);                                                                             // 150
            }                                                                                                         // 151
                                                                                                                      // 152
            // Perform concrete-cipher logic                                                                          // 153
            var finalProcessedData = this._doFinalize();                                                              // 154
                                                                                                                      // 155
            return finalProcessedData;                                                                                // 156
        },                                                                                                            // 157
                                                                                                                      // 158
        keySize: 128/32,                                                                                              // 159
                                                                                                                      // 160
        ivSize: 128/32,                                                                                               // 161
                                                                                                                      // 162
        _ENC_XFORM_MODE: 1,                                                                                           // 163
                                                                                                                      // 164
        _DEC_XFORM_MODE: 2,                                                                                           // 165
                                                                                                                      // 166
        /**                                                                                                           // 167
         * Creates shortcut functions to a cipher's object interface.                                                 // 168
         *                                                                                                            // 169
         * @param {Cipher} cipher The cipher to create a helper for.                                                  // 170
         *                                                                                                            // 171
         * @return {Object} An object with encrypt and decrypt shortcut functions.                                    // 172
         *                                                                                                            // 173
         * @static                                                                                                    // 174
         *                                                                                                            // 175
         * @example                                                                                                   // 176
         *                                                                                                            // 177
         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);                                        // 178
         */                                                                                                           // 179
        _createHelper: (function () {                                                                                 // 180
            function selectCipherStrategy(key) {                                                                      // 181
                if (typeof key == 'string') {                                                                         // 182
                    return PasswordBasedCipher;                                                                       // 183
                } else {                                                                                              // 184
                    return SerializableCipher;                                                                        // 185
                }                                                                                                     // 186
            }                                                                                                         // 187
                                                                                                                      // 188
            return function (cipher) {                                                                                // 189
                return {                                                                                              // 190
                    encrypt: function (message, key, cfg) {                                                           // 191
                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);                          // 192
                    },                                                                                                // 193
                                                                                                                      // 194
                    decrypt: function (ciphertext, key, cfg) {                                                        // 195
                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);                       // 196
                    }                                                                                                 // 197
                };                                                                                                    // 198
            };                                                                                                        // 199
        }())                                                                                                          // 200
    });                                                                                                               // 201
                                                                                                                      // 202
    /**                                                                                                               // 203
     * Abstract base stream cipher template.                                                                          // 204
     *                                                                                                                // 205
     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)          // 206
     */                                                                                                               // 207
    var StreamCipher = C_lib.StreamCipher = Cipher.extend({                                                           // 208
        _doFinalize: function () {                                                                                    // 209
            // Process partial blocks                                                                                 // 210
            var finalProcessedBlocks = this._process(!!'flush');                                                      // 211
                                                                                                                      // 212
            return finalProcessedBlocks;                                                                              // 213
        },                                                                                                            // 214
                                                                                                                      // 215
        blockSize: 1                                                                                                  // 216
    });                                                                                                               // 217
                                                                                                                      // 218
    /**                                                                                                               // 219
     * Mode namespace.                                                                                                // 220
     */                                                                                                               // 221
    var C_mode = C.mode = {};                                                                                         // 222
                                                                                                                      // 223
    /**                                                                                                               // 224
     * Abstract base block cipher mode template.                                                                      // 225
     */                                                                                                               // 226
    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({                                                       // 227
        /**                                                                                                           // 228
         * Creates this mode for encryption.                                                                          // 229
         *                                                                                                            // 230
         * @param {Cipher} cipher A block cipher instance.                                                            // 231
         * @param {Array} iv The IV words.                                                                            // 232
         *                                                                                                            // 233
         * @static                                                                                                    // 234
         *                                                                                                            // 235
         * @example                                                                                                   // 236
         *                                                                                                            // 237
         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);                                        // 238
         */                                                                                                           // 239
        createEncryptor: function (cipher, iv) {                                                                      // 240
            return this.Encryptor.create(cipher, iv);                                                                 // 241
        },                                                                                                            // 242
                                                                                                                      // 243
        /**                                                                                                           // 244
         * Creates this mode for decryption.                                                                          // 245
         *                                                                                                            // 246
         * @param {Cipher} cipher A block cipher instance.                                                            // 247
         * @param {Array} iv The IV words.                                                                            // 248
         *                                                                                                            // 249
         * @static                                                                                                    // 250
         *                                                                                                            // 251
         * @example                                                                                                   // 252
         *                                                                                                            // 253
         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);                                        // 254
         */                                                                                                           // 255
        createDecryptor: function (cipher, iv) {                                                                      // 256
            return this.Decryptor.create(cipher, iv);                                                                 // 257
        },                                                                                                            // 258
                                                                                                                      // 259
        /**                                                                                                           // 260
         * Initializes a newly created mode.                                                                          // 261
         *                                                                                                            // 262
         * @param {Cipher} cipher A block cipher instance.                                                            // 263
         * @param {Array} iv The IV words.                                                                            // 264
         *                                                                                                            // 265
         * @example                                                                                                   // 266
         *                                                                                                            // 267
         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);                                       // 268
         */                                                                                                           // 269
        init: function (cipher, iv) {                                                                                 // 270
            this._cipher = cipher;                                                                                    // 271
            this._iv = iv;                                                                                            // 272
        }                                                                                                             // 273
    });                                                                                                               // 274
                                                                                                                      // 275
    /**                                                                                                               // 276
     * Cipher Block Chaining mode.                                                                                    // 277
     */                                                                                                               // 278
    var CBC = C_mode.CBC = (function () {                                                                             // 279
        /**                                                                                                           // 280
         * Abstract base CBC mode.                                                                                    // 281
         */                                                                                                           // 282
        var CBC = BlockCipherMode.extend();                                                                           // 283
                                                                                                                      // 284
        /**                                                                                                           // 285
         * CBC encryptor.                                                                                             // 286
         */                                                                                                           // 287
        CBC.Encryptor = CBC.extend({                                                                                  // 288
            /**                                                                                                       // 289
             * Processes the data block at offset.                                                                    // 290
             *                                                                                                        // 291
             * @param {Array} words The data words to operate on.                                                     // 292
             * @param {number} offset The offset where the block starts.                                              // 293
             *                                                                                                        // 294
             * @example                                                                                               // 295
             *                                                                                                        // 296
             *     mode.processBlock(data.words, offset);                                                             // 297
             */                                                                                                       // 298
            processBlock: function (words, offset) {                                                                  // 299
                // Shortcuts                                                                                          // 300
                var cipher = this._cipher;                                                                            // 301
                var blockSize = cipher.blockSize;                                                                     // 302
                                                                                                                      // 303
                // XOR and encrypt                                                                                    // 304
                xorBlock.call(this, words, offset, blockSize);                                                        // 305
                cipher.encryptBlock(words, offset);                                                                   // 306
                                                                                                                      // 307
                // Remember this block to use with next block                                                         // 308
                this._prevBlock = words.slice(offset, offset + blockSize);                                            // 309
            }                                                                                                         // 310
        });                                                                                                           // 311
                                                                                                                      // 312
        /**                                                                                                           // 313
         * CBC decryptor.                                                                                             // 314
         */                                                                                                           // 315
        CBC.Decryptor = CBC.extend({                                                                                  // 316
            /**                                                                                                       // 317
             * Processes the data block at offset.                                                                    // 318
             *                                                                                                        // 319
             * @param {Array} words The data words to operate on.                                                     // 320
             * @param {number} offset The offset where the block starts.                                              // 321
             *                                                                                                        // 322
             * @example                                                                                               // 323
             *                                                                                                        // 324
             *     mode.processBlock(data.words, offset);                                                             // 325
             */                                                                                                       // 326
            processBlock: function (words, offset) {                                                                  // 327
                // Shortcuts                                                                                          // 328
                var cipher = this._cipher;                                                                            // 329
                var blockSize = cipher.blockSize;                                                                     // 330
                                                                                                                      // 331
                // Remember this block to use with next block                                                         // 332
                var thisBlock = words.slice(offset, offset + blockSize);                                              // 333
                                                                                                                      // 334
                // Decrypt and XOR                                                                                    // 335
                cipher.decryptBlock(words, offset);                                                                   // 336
                xorBlock.call(this, words, offset, blockSize);                                                        // 337
                                                                                                                      // 338
                // This block becomes the previous block                                                              // 339
                this._prevBlock = thisBlock;                                                                          // 340
            }                                                                                                         // 341
        });                                                                                                           // 342
                                                                                                                      // 343
        function xorBlock(words, offset, blockSize) {                                                                 // 344
            // Shortcut                                                                                               // 345
            var iv = this._iv;                                                                                        // 346
                                                                                                                      // 347
            // Choose mixing block                                                                                    // 348
            if (iv) {                                                                                                 // 349
                var block = iv;                                                                                       // 350
                                                                                                                      // 351
                // Remove IV for subsequent blocks                                                                    // 352
                this._iv = undefined;                                                                                 // 353
            } else {                                                                                                  // 354
                var block = this._prevBlock;                                                                          // 355
            }                                                                                                         // 356
                                                                                                                      // 357
            // XOR blocks                                                                                             // 358
            for (var i = 0; i < blockSize; i++) {                                                                     // 359
                words[offset + i] ^= block[i];                                                                        // 360
            }                                                                                                         // 361
        }                                                                                                             // 362
                                                                                                                      // 363
        return CBC;                                                                                                   // 364
    }());                                                                                                             // 365
                                                                                                                      // 366
    /**                                                                                                               // 367
     * Padding namespace.                                                                                             // 368
     */                                                                                                               // 369
    var C_pad = C.pad = {};                                                                                           // 370
                                                                                                                      // 371
    /**                                                                                                               // 372
     * PKCS #5/7 padding strategy.                                                                                    // 373
     */                                                                                                               // 374
    var Pkcs7 = C_pad.Pkcs7 = {                                                                                       // 375
        /**                                                                                                           // 376
         * Pads data using the algorithm defined in PKCS #5/7.                                                        // 377
         *                                                                                                            // 378
         * @param {WordArray} data The data to pad.                                                                   // 379
         * @param {number} blockSize The multiple that the data should be padded to.                                  // 380
         *                                                                                                            // 381
         * @static                                                                                                    // 382
         *                                                                                                            // 383
         * @example                                                                                                   // 384
         *                                                                                                            // 385
         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);                                                                  // 386
         */                                                                                                           // 387
        pad: function (data, blockSize) {                                                                             // 388
            // Shortcut                                                                                               // 389
            var blockSizeBytes = blockSize * 4;                                                                       // 390
                                                                                                                      // 391
            // Count padding bytes                                                                                    // 392
            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;                                      // 393
                                                                                                                      // 394
            // Create padding word                                                                                    // 395
            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;   // 396
                                                                                                                      // 397
            // Create padding                                                                                         // 398
            var paddingWords = [];                                                                                    // 399
            for (var i = 0; i < nPaddingBytes; i += 4) {                                                              // 400
                paddingWords.push(paddingWord);                                                                       // 401
            }                                                                                                         // 402
            var padding = WordArray.create(paddingWords, nPaddingBytes);                                              // 403
                                                                                                                      // 404
            // Add padding                                                                                            // 405
            data.concat(padding);                                                                                     // 406
        },                                                                                                            // 407
                                                                                                                      // 408
        /**                                                                                                           // 409
         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.                                 // 410
         *                                                                                                            // 411
         * @param {WordArray} data The data to unpad.                                                                 // 412
         *                                                                                                            // 413
         * @static                                                                                                    // 414
         *                                                                                                            // 415
         * @example                                                                                                   // 416
         *                                                                                                            // 417
         *     CryptoJS.pad.Pkcs7.unpad(wordArray);                                                                   // 418
         */                                                                                                           // 419
        unpad: function (data) {                                                                                      // 420
            // Get number of padding bytes from last byte                                                             // 421
            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;                                         // 422
                                                                                                                      // 423
            // Remove padding                                                                                         // 424
            data.sigBytes -= nPaddingBytes;                                                                           // 425
        }                                                                                                             // 426
    };                                                                                                                // 427
                                                                                                                      // 428
    /**                                                                                                               // 429
     * Abstract base block cipher template.                                                                           // 430
     *                                                                                                                // 431
     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)         // 432
     */                                                                                                               // 433
    var BlockCipher = C_lib.BlockCipher = Cipher.extend({                                                             // 434
        /**                                                                                                           // 435
         * Configuration options.                                                                                     // 436
         *                                                                                                            // 437
         * @property {Mode} mode The block mode to use. Default: CBC                                                  // 438
         * @property {Padding} padding The padding strategy to use. Default: Pkcs7                                    // 439
         */                                                                                                           // 440
        cfg: Cipher.cfg.extend({                                                                                      // 441
            mode: CBC,                                                                                                // 442
            padding: Pkcs7                                                                                            // 443
        }),                                                                                                           // 444
                                                                                                                      // 445
        reset: function () {                                                                                          // 446
            // Reset cipher                                                                                           // 447
            Cipher.reset.call(this);                                                                                  // 448
                                                                                                                      // 449
            // Shortcuts                                                                                              // 450
            var cfg = this.cfg;                                                                                       // 451
            var iv = cfg.iv;                                                                                          // 452
            var mode = cfg.mode;                                                                                      // 453
                                                                                                                      // 454
            // Reset block mode                                                                                       // 455
            if (this._xformMode == this._ENC_XFORM_MODE) {                                                            // 456
                var modeCreator = mode.createEncryptor;                                                               // 457
            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {                                               // 458
                var modeCreator = mode.createDecryptor;                                                               // 459
                                                                                                                      // 460
                // Keep at least one block in the buffer for unpadding                                                // 461
                this._minBufferSize = 1;                                                                              // 462
            }                                                                                                         // 463
            this._mode = modeCreator.call(mode, this, iv && iv.words);                                                // 464
        },                                                                                                            // 465
                                                                                                                      // 466
        _doProcessBlock: function (words, offset) {                                                                   // 467
            this._mode.processBlock(words, offset);                                                                   // 468
        },                                                                                                            // 469
                                                                                                                      // 470
        _doFinalize: function () {                                                                                    // 471
            // Shortcut                                                                                               // 472
            var padding = this.cfg.padding;                                                                           // 473
                                                                                                                      // 474
            // Finalize                                                                                               // 475
            if (this._xformMode == this._ENC_XFORM_MODE) {                                                            // 476
                // Pad data                                                                                           // 477
                padding.pad(this._data, this.blockSize);                                                              // 478
                                                                                                                      // 479
                // Process final blocks                                                                               // 480
                var finalProcessedBlocks = this._process(!!'flush');                                                  // 481
            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {                                               // 482
                // Process final blocks                                                                               // 483
                var finalProcessedBlocks = this._process(!!'flush');                                                  // 484
                                                                                                                      // 485
                // Unpad data                                                                                         // 486
                padding.unpad(finalProcessedBlocks);                                                                  // 487
            }                                                                                                         // 488
                                                                                                                      // 489
            return finalProcessedBlocks;                                                                              // 490
        },                                                                                                            // 491
                                                                                                                      // 492
        blockSize: 128/32                                                                                             // 493
    });                                                                                                               // 494
                                                                                                                      // 495
    /**                                                                                                               // 496
     * A collection of cipher parameters.                                                                             // 497
     *                                                                                                                // 498
     * @property {WordArray} ciphertext The raw ciphertext.                                                           // 499
     * @property {WordArray} key The key to this ciphertext.                                                          // 500
     * @property {WordArray} iv The IV used in the ciphering operation.                                               // 501
     * @property {WordArray} salt The salt used with a key derivation function.                                       // 502
     * @property {Cipher} algorithm The cipher algorithm.                                                             // 503
     * @property {Mode} mode The block mode used in the ciphering operation.                                          // 504
     * @property {Padding} padding The padding scheme used in the ciphering operation.                                // 505
     * @property {number} blockSize The block size of the cipher.                                                     // 506
     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string. // 507
     */                                                                                                               // 508
    var CipherParams = C_lib.CipherParams = Base.extend({                                                             // 509
        /**                                                                                                           // 510
         * Initializes a newly created cipher params object.                                                          // 511
         *                                                                                                            // 512
         * @param {Object} cipherParams An object with any of the possible cipher parameters.                         // 513
         *                                                                                                            // 514
         * @example                                                                                                   // 515
         *                                                                                                            // 516
         *     var cipherParams = CryptoJS.lib.CipherParams.create({                                                  // 517
         *         ciphertext: ciphertextWordArray,                                                                   // 518
         *         key: keyWordArray,                                                                                 // 519
         *         iv: ivWordArray,                                                                                   // 520
         *         salt: saltWordArray,                                                                               // 521
         *         algorithm: CryptoJS.algo.AES,                                                                      // 522
         *         mode: CryptoJS.mode.CBC,                                                                           // 523
         *         padding: CryptoJS.pad.PKCS7,                                                                       // 524
         *         blockSize: 4,                                                                                      // 525
         *         formatter: CryptoJS.format.OpenSSL                                                                 // 526
         *     });                                                                                                    // 527
         */                                                                                                           // 528
        init: function (cipherParams) {                                                                               // 529
            this.mixIn(cipherParams);                                                                                 // 530
        },                                                                                                            // 531
                                                                                                                      // 532
        /**                                                                                                           // 533
         * Converts this cipher params object to a string.                                                            // 534
         *                                                                                                            // 535
         * @param {Format} formatter (Optional) The formatting strategy to use.                                       // 536
         *                                                                                                            // 537
         * @return {string} The stringified cipher params.                                                            // 538
         *                                                                                                            // 539
         * @throws Error If neither the formatter nor the default formatter is set.                                   // 540
         *                                                                                                            // 541
         * @example                                                                                                   // 542
         *                                                                                                            // 543
         *     var string = cipherParams + '';                                                                        // 544
         *     var string = cipherParams.toString();                                                                  // 545
         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);                                           // 546
         */                                                                                                           // 547
        toString: function (formatter) {                                                                              // 548
            return (formatter || this.formatter).stringify(this);                                                     // 549
        }                                                                                                             // 550
    });                                                                                                               // 551
                                                                                                                      // 552
    /**                                                                                                               // 553
     * Format namespace.                                                                                              // 554
     */                                                                                                               // 555
    var C_format = C.format = {};                                                                                     // 556
                                                                                                                      // 557
    /**                                                                                                               // 558
     * OpenSSL formatting strategy.                                                                                   // 559
     */                                                                                                               // 560
    var OpenSSLFormatter = C_format.OpenSSL = {                                                                       // 561
        /**                                                                                                           // 562
         * Converts a cipher params object to an OpenSSL-compatible string.                                           // 563
         *                                                                                                            // 564
         * @param {CipherParams} cipherParams The cipher params object.                                               // 565
         *                                                                                                            // 566
         * @return {string} The OpenSSL-compatible string.                                                            // 567
         *                                                                                                            // 568
         * @static                                                                                                    // 569
         *                                                                                                            // 570
         * @example                                                                                                   // 571
         *                                                                                                            // 572
         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);                                   // 573
         */                                                                                                           // 574
        stringify: function (cipherParams) {                                                                          // 575
            // Shortcuts                                                                                              // 576
            var ciphertext = cipherParams.ciphertext;                                                                 // 577
            var salt = cipherParams.salt;                                                                             // 578
                                                                                                                      // 579
            // Format                                                                                                 // 580
            if (salt) {                                                                                               // 581
                var wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);           // 582
            } else {                                                                                                  // 583
                var wordArray = ciphertext;                                                                           // 584
            }                                                                                                         // 585
                                                                                                                      // 586
            return wordArray.toString(Base64);                                                                        // 587
        },                                                                                                            // 588
                                                                                                                      // 589
        /**                                                                                                           // 590
         * Converts an OpenSSL-compatible string to a cipher params object.                                           // 591
         *                                                                                                            // 592
         * @param {string} openSSLStr The OpenSSL-compatible string.                                                  // 593
         *                                                                                                            // 594
         * @return {CipherParams} The cipher params object.                                                           // 595
         *                                                                                                            // 596
         * @static                                                                                                    // 597
         *                                                                                                            // 598
         * @example                                                                                                   // 599
         *                                                                                                            // 600
         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);                                       // 601
         */                                                                                                           // 602
        parse: function (openSSLStr) {                                                                                // 603
            // Parse base64                                                                                           // 604
            var ciphertext = Base64.parse(openSSLStr);                                                                // 605
                                                                                                                      // 606
            // Shortcut                                                                                               // 607
            var ciphertextWords = ciphertext.words;                                                                   // 608
                                                                                                                      // 609
            // Test for salt                                                                                          // 610
            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {                               // 611
                // Extract salt                                                                                       // 612
                var salt = WordArray.create(ciphertextWords.slice(2, 4));                                             // 613
                                                                                                                      // 614
                // Remove salt from ciphertext                                                                        // 615
                ciphertextWords.splice(0, 4);                                                                         // 616
                ciphertext.sigBytes -= 16;                                                                            // 617
            }                                                                                                         // 618
                                                                                                                      // 619
            return CipherParams.create({ ciphertext: ciphertext, salt: salt });                                       // 620
        }                                                                                                             // 621
    };                                                                                                                // 622
                                                                                                                      // 623
    /**                                                                                                               // 624
     * A cipher wrapper that returns ciphertext as a serializable cipher params object.                               // 625
     */                                                                                                               // 626
    var SerializableCipher = C_lib.SerializableCipher = Base.extend({                                                 // 627
        /**                                                                                                           // 628
         * Configuration options.                                                                                     // 629
         *                                                                                                            // 630
         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
         */                                                                                                           // 632
        cfg: Base.extend({                                                                                            // 633
            format: OpenSSLFormatter                                                                                  // 634
        }),                                                                                                           // 635
                                                                                                                      // 636
        /**                                                                                                           // 637
         * Encrypts a message.                                                                                        // 638
         *                                                                                                            // 639
         * @param {Cipher} cipher The cipher algorithm to use.                                                        // 640
         * @param {WordArray|string} message The message to encrypt.                                                  // 641
         * @param {WordArray} key The key.                                                                            // 642
         * @param {Object} cfg (Optional) The configuration options to use for this operation.                        // 643
         *                                                                                                            // 644
         * @return {CipherParams} A cipher params object.                                                             // 645
         *                                                                                                            // 646
         * @static                                                                                                    // 647
         *                                                                                                            // 648
         * @example                                                                                                   // 649
         *                                                                                                            // 650
         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);       // 651
         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
         */                                                                                                           // 654
        encrypt: function (cipher, message, key, cfg) {                                                               // 655
            // Apply config defaults                                                                                  // 656
            cfg = this.cfg.extend(cfg);                                                                               // 657
                                                                                                                      // 658
            // Encrypt                                                                                                // 659
            var encryptor = cipher.createEncryptor(key, cfg);                                                         // 660
            var ciphertext = encryptor.finalize(message);                                                             // 661
                                                                                                                      // 662
            // Shortcut                                                                                               // 663
            var cipherCfg = encryptor.cfg;                                                                            // 664
                                                                                                                      // 665
            // Create and return serializable cipher params                                                           // 666
            return CipherParams.create({                                                                              // 667
                ciphertext: ciphertext,                                                                               // 668
                key: key,                                                                                             // 669
                iv: cipherCfg.iv,                                                                                     // 670
                algorithm: cipher,                                                                                    // 671
                mode: cipherCfg.mode,                                                                                 // 672
                padding: cipherCfg.padding,                                                                           // 673
                blockSize: cipher.blockSize,                                                                          // 674
                formatter: cfg.format                                                                                 // 675
            });                                                                                                       // 676
        },                                                                                                            // 677
                                                                                                                      // 678
        /**                                                                                                           // 679
         * Decrypts serialized ciphertext.                                                                            // 680
         *                                                                                                            // 681
         * @param {Cipher} cipher The cipher algorithm to use.                                                        // 682
         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.                                         // 683
         * @param {WordArray} key The key.                                                                            // 684
         * @param {Object} cfg (Optional) The configuration options to use for this operation.                        // 685
         *                                                                                                            // 686
         * @return {WordArray} The plaintext.                                                                         // 687
         *                                                                                                            // 688
         * @static                                                                                                    // 689
         *                                                                                                            // 690
         * @example                                                                                                   // 691
         *                                                                                                            // 692
         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
         */                                                                                                           // 695
        decrypt: function (cipher, ciphertext, key, cfg) {                                                            // 696
            // Apply config defaults                                                                                  // 697
            cfg = this.cfg.extend(cfg);                                                                               // 698
                                                                                                                      // 699
            // Convert string to CipherParams                                                                         // 700
            ciphertext = this._parse(ciphertext, cfg.format);                                                         // 701
                                                                                                                      // 702
            // Decrypt                                                                                                // 703
            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);                         // 704
                                                                                                                      // 705
            return plaintext;                                                                                         // 706
        },                                                                                                            // 707
                                                                                                                      // 708
        /**                                                                                                           // 709
         * Converts serialized ciphertext to CipherParams,                                                            // 710
         * else assumed CipherParams already and returns ciphertext unchanged.                                        // 711
         *                                                                                                            // 712
         * @param {CipherParams|string} ciphertext The ciphertext.                                                    // 713
         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.                   // 714
         *                                                                                                            // 715
         * @return {CipherParams} The unserialized ciphertext.                                                        // 716
         *                                                                                                            // 717
         * @static                                                                                                    // 718
         *                                                                                                            // 719
         * @example                                                                                                   // 720
         *                                                                                                            // 721
         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);       // 722
         */                                                                                                           // 723
        _parse: function (ciphertext, format) {                                                                       // 724
            if (typeof ciphertext == 'string') {                                                                      // 725
                return format.parse(ciphertext, this);                                                                // 726
            } else {                                                                                                  // 727
                return ciphertext;                                                                                    // 728
            }                                                                                                         // 729
        }                                                                                                             // 730
    });                                                                                                               // 731
                                                                                                                      // 732
    /**                                                                                                               // 733
     * Key derivation function namespace.                                                                             // 734
     */                                                                                                               // 735
    var C_kdf = C.kdf = {};                                                                                           // 736
                                                                                                                      // 737
    /**                                                                                                               // 738
     * OpenSSL key derivation function.                                                                               // 739
     */                                                                                                               // 740
    var OpenSSLKdf = C_kdf.OpenSSL = {                                                                                // 741
        /**                                                                                                           // 742
         * Derives a key and IV from a password.                                                                      // 743
         *                                                                                                            // 744
         * @param {string} password The password to derive from.                                                      // 745
         * @param {number} keySize The size in words of the key to generate.                                          // 746
         * @param {number} ivSize The size in words of the IV to generate.                                            // 747
         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
         *                                                                                                            // 749
         * @return {CipherParams} A cipher params object with the key, IV, and salt.                                  // 750
         *                                                                                                            // 751
         * @static                                                                                                    // 752
         *                                                                                                            // 753
         * @example                                                                                                   // 754
         *                                                                                                            // 755
         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);                          // 756
         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');              // 757
         */                                                                                                           // 758
        execute: function (password, keySize, ivSize, salt) {                                                         // 759
            // Generate random salt                                                                                   // 760
            if (!salt) {                                                                                              // 761
                salt = WordArray.random(64/8);                                                                        // 762
            }                                                                                                         // 763
                                                                                                                      // 764
            // Derive key and IV                                                                                      // 765
            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);                           // 766
                                                                                                                      // 767
            // Separate key and IV                                                                                    // 768
            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);                                          // 769
            key.sigBytes = keySize * 4;                                                                               // 770
                                                                                                                      // 771
            // Return params                                                                                          // 772
            return CipherParams.create({ key: key, iv: iv, salt: salt });                                             // 773
        }                                                                                                             // 774
    };                                                                                                                // 775
                                                                                                                      // 776
    /**                                                                                                               // 777
     * A serializable cipher wrapper that derives the key from a password,                                            // 778
     * and returns ciphertext as a serializable cipher params object.                                                 // 779
     */                                                                                                               // 780
    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({                                 // 781
        /**                                                                                                           // 782
         * Configuration options.                                                                                     // 783
         *                                                                                                            // 784
         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
         */                                                                                                           // 786
        cfg: SerializableCipher.cfg.extend({                                                                          // 787
            kdf: OpenSSLKdf                                                                                           // 788
        }),                                                                                                           // 789
                                                                                                                      // 790
        /**                                                                                                           // 791
         * Encrypts a message using a password.                                                                       // 792
         *                                                                                                            // 793
         * @param {Cipher} cipher The cipher algorithm to use.                                                        // 794
         * @param {WordArray|string} message The message to encrypt.                                                  // 795
         * @param {string} password The password.                                                                     // 796
         * @param {Object} cfg (Optional) The configuration options to use for this operation.                        // 797
         *                                                                                                            // 798
         * @return {CipherParams} A cipher params object.                                                             // 799
         *                                                                                                            // 800
         * @static                                                                                                    // 801
         *                                                                                                            // 802
         * @example                                                                                                   // 803
         *                                                                                                            // 804
         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
         */                                                                                                           // 807
        encrypt: function (cipher, message, password, cfg) {                                                          // 808
            // Apply config defaults                                                                                  // 809
            cfg = this.cfg.extend(cfg);                                                                               // 810
                                                                                                                      // 811
            // Derive key and other params                                                                            // 812
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);                             // 813
                                                                                                                      // 814
            // Add IV to config                                                                                       // 815
            cfg.iv = derivedParams.iv;                                                                                // 816
                                                                                                                      // 817
            // Encrypt                                                                                                // 818
            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);          // 819
                                                                                                                      // 820
            // Mix in derived params                                                                                  // 821
            ciphertext.mixIn(derivedParams);                                                                          // 822
                                                                                                                      // 823
            return ciphertext;                                                                                        // 824
        },                                                                                                            // 825
                                                                                                                      // 826
        /**                                                                                                           // 827
         * Decrypts serialized ciphertext using a password.                                                           // 828
         *                                                                                                            // 829
         * @param {Cipher} cipher The cipher algorithm to use.                                                        // 830
         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.                                         // 831
         * @param {string} password The password.                                                                     // 832
         * @param {Object} cfg (Optional) The configuration options to use for this operation.                        // 833
         *                                                                                                            // 834
         * @return {WordArray} The plaintext.                                                                         // 835
         *                                                                                                            // 836
         * @static                                                                                                    // 837
         *                                                                                                            // 838
         * @example                                                                                                   // 839
         *                                                                                                            // 840
         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
         */                                                                                                           // 843
        decrypt: function (cipher, ciphertext, password, cfg) {                                                       // 844
            // Apply config defaults                                                                                  // 845
            cfg = this.cfg.extend(cfg);                                                                               // 846
                                                                                                                      // 847
            // Convert string to CipherParams                                                                         // 848
            ciphertext = this._parse(ciphertext, cfg.format);                                                         // 849
                                                                                                                      // 850
            // Derive key and other params                                                                            // 851
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);            // 852
                                                                                                                      // 853
            // Add IV to config                                                                                       // 854
            cfg.iv = derivedParams.iv;                                                                                // 855
                                                                                                                      // 856
            // Decrypt                                                                                                // 857
            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);        // 858
                                                                                                                      // 859
            return plaintext;                                                                                         // 860
        }                                                                                                             // 861
    });                                                                                                               // 862
}());                                                                                                                 // 863
                                                                                                                      // 864
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("jparker:crypto-cipher-core");

})();
