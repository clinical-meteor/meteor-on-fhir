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

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/jparker_crypto-evpkdf/packages/jparker_crypto-evpkdf.js                                   //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/jparker:crypto-evpkdf/lib/evpkdf.js                                                //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
/*                                                                                             // 1
CryptoJS v3.1.2                                                                                // 2
code.google.com/p/crypto-js                                                                    // 3
(c) 2009-2013 by Jeff Mott. All rights reserved.                                               // 4
code.google.com/p/crypto-js/wiki/License                                                       // 5
*/                                                                                             // 6
(function () {                                                                                 // 7
    // Shortcuts                                                                               // 8
    var C = CryptoJS;                                                                          // 9
    var C_lib = C.lib;                                                                         // 10
    var Base = C_lib.Base;                                                                     // 11
    var WordArray = C_lib.WordArray;                                                           // 12
    var C_algo = C.algo;                                                                       // 13
    var MD5 = C_algo.MD5;                                                                      // 14
                                                                                               // 15
    /**                                                                                        // 16
     * This key derivation function is meant to conform with EVP_BytesToKey.                   // 17
     * www.openssl.org/docs/crypto/EVP_BytesToKey.html                                         // 18
     */                                                                                        // 19
    var EvpKDF = C_algo.EvpKDF = Base.extend({                                                 // 20
        /**                                                                                    // 21
         * Configuration options.                                                              // 22
         *                                                                                     // 23
         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits) // 24
         * @property {Hasher} hasher The hash algorithm to use. Default: MD5                   // 25
         * @property {number} iterations The number of iterations to perform. Default: 1       // 26
         */                                                                                    // 27
        cfg: Base.extend({                                                                     // 28
            keySize: 128/32,                                                                   // 29
            hasher: MD5,                                                                       // 30
            iterations: 1                                                                      // 31
        }),                                                                                    // 32
                                                                                               // 33
        /**                                                                                    // 34
         * Initializes a newly created key derivation function.                                // 35
         *                                                                                     // 36
         * @param {Object} cfg (Optional) The configuration options to use for the derivation. // 37
         *                                                                                     // 38
         * @example                                                                            // 39
         *                                                                                     // 40
         *     var kdf = CryptoJS.algo.EvpKDF.create();                                        // 41
         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });                          // 42
         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });        // 43
         */                                                                                    // 44
        init: function (cfg) {                                                                 // 45
            this.cfg = this.cfg.extend(cfg);                                                   // 46
        },                                                                                     // 47
                                                                                               // 48
        /**                                                                                    // 49
         * Derives a key from a password.                                                      // 50
         *                                                                                     // 51
         * @param {WordArray|string} password The password.                                    // 52
         * @param {WordArray|string} salt A salt.                                              // 53
         *                                                                                     // 54
         * @return {WordArray} The derived key.                                                // 55
         *                                                                                     // 56
         * @example                                                                            // 57
         *                                                                                     // 58
         *     var key = kdf.compute(password, salt);                                          // 59
         */                                                                                    // 60
        compute: function (password, salt) {                                                   // 61
            // Shortcut                                                                        // 62
            var cfg = this.cfg;                                                                // 63
                                                                                               // 64
            // Init hasher                                                                     // 65
            var hasher = cfg.hasher.create();                                                  // 66
                                                                                               // 67
            // Initial values                                                                  // 68
            var derivedKey = WordArray.create();                                               // 69
                                                                                               // 70
            // Shortcuts                                                                       // 71
            var derivedKeyWords = derivedKey.words;                                            // 72
            var keySize = cfg.keySize;                                                         // 73
            var iterations = cfg.iterations;                                                   // 74
                                                                                               // 75
            // Generate key                                                                    // 76
            while (derivedKeyWords.length < keySize) {                                         // 77
                if (block) {                                                                   // 78
                    hasher.update(block);                                                      // 79
                }                                                                              // 80
                var block = hasher.update(password).finalize(salt);                            // 81
                hasher.reset();                                                                // 82
                                                                                               // 83
                // Iterations                                                                  // 84
                for (var i = 1; i < iterations; i++) {                                         // 85
                    block = hasher.finalize(block);                                            // 86
                    hasher.reset();                                                            // 87
                }                                                                              // 88
                                                                                               // 89
                derivedKey.concat(block);                                                      // 90
            }                                                                                  // 91
            derivedKey.sigBytes = keySize * 4;                                                 // 92
                                                                                               // 93
            return derivedKey;                                                                 // 94
        }                                                                                      // 95
    });                                                                                        // 96
                                                                                               // 97
    /**                                                                                        // 98
     * Derives a key from a password.                                                          // 99
     *                                                                                         // 100
     * @param {WordArray|string} password The password.                                        // 101
     * @param {WordArray|string} salt A salt.                                                  // 102
     * @param {Object} cfg (Optional) The configuration options to use for this computation.   // 103
     *                                                                                         // 104
     * @return {WordArray} The derived key.                                                    // 105
     *                                                                                         // 106
     * @static                                                                                 // 107
     *                                                                                         // 108
     * @example                                                                                // 109
     *                                                                                         // 110
     *     var key = CryptoJS.EvpKDF(password, salt);                                          // 111
     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });                          // 112
     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });        // 113
     */                                                                                        // 114
    C.EvpKDF = function (password, salt, cfg) {                                                // 115
        return EvpKDF.create(cfg).compute(password, salt);                                     // 116
    };                                                                                         // 117
}());                                                                                          // 118
                                                                                               // 119
/////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("jparker:crypto-evpkdf");

})();
