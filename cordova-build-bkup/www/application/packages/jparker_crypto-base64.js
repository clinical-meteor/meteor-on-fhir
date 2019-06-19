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

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/jparker_crypto-base64/packages/jparker_crypto-base64.js                            //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
(function () {

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/jparker:crypto-base64/lib/enc-base64.js                                     //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
/*                                                                                      // 1
CryptoJS v3.1.2                                                                         // 2
code.google.com/p/crypto-js                                                             // 3
(c) 2009-2013 by Jeff Mott. All rights reserved.                                        // 4
code.google.com/p/crypto-js/wiki/License                                                // 5
*/                                                                                      // 6
(function () {                                                                          // 7
    // Shortcuts                                                                        // 8
    var C = CryptoJS;                                                                   // 9
    var C_lib = C.lib;                                                                  // 10
    var WordArray = C_lib.WordArray;                                                    // 11
    var C_enc = C.enc;                                                                  // 12
                                                                                        // 13
    /**                                                                                 // 14
     * Base64 encoding strategy.                                                        // 15
     */                                                                                 // 16
    var Base64 = C_enc.Base64 = {                                                       // 17
        /**                                                                             // 18
         * Converts a word array to a Base64 string.                                    // 19
         *                                                                              // 20
         * @param {WordArray} wordArray The word array.                                 // 21
         *                                                                              // 22
         * @return {string} The Base64 string.                                          // 23
         *                                                                              // 24
         * @static                                                                      // 25
         *                                                                              // 26
         * @example                                                                     // 27
         *                                                                              // 28
         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);             // 29
         */                                                                             // 30
        stringify: function (wordArray) {                                               // 31
            // Shortcuts                                                                // 32
            var words = wordArray.words;                                                // 33
            var sigBytes = wordArray.sigBytes;                                          // 34
            var map = this._map;                                                        // 35
                                                                                        // 36
            // Clamp excess bits                                                        // 37
            wordArray.clamp();                                                          // 38
                                                                                        // 39
            // Convert                                                                  // 40
            var base64Chars = [];                                                       // 41
            for (var i = 0; i < sigBytes; i += 3) {                                     // 42
                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff; // 43
                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff; // 44
                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff; // 45
                                                                                        // 46
                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;                     // 47
                                                                                        // 48
                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {            // 49
                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));   // 50
                }                                                                       // 51
            }                                                                           // 52
                                                                                        // 53
            // Add padding                                                              // 54
            var paddingChar = map.charAt(64);                                           // 55
            if (paddingChar) {                                                          // 56
                while (base64Chars.length % 4) {                                        // 57
                    base64Chars.push(paddingChar);                                      // 58
                }                                                                       // 59
            }                                                                           // 60
                                                                                        // 61
            return base64Chars.join('');                                                // 62
        },                                                                              // 63
                                                                                        // 64
        /**                                                                             // 65
         * Converts a Base64 string to a word array.                                    // 66
         *                                                                              // 67
         * @param {string} base64Str The Base64 string.                                 // 68
         *                                                                              // 69
         * @return {WordArray} The word array.                                          // 70
         *                                                                              // 71
         * @static                                                                      // 72
         *                                                                              // 73
         * @example                                                                     // 74
         *                                                                              // 75
         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);                 // 76
         */                                                                             // 77
        parse: function (base64Str) {                                                   // 78
            // Shortcuts                                                                // 79
            var base64StrLength = base64Str.length;                                     // 80
            var map = this._map;                                                        // 81
                                                                                        // 82
            // Ignore padding                                                           // 83
            var paddingChar = map.charAt(64);                                           // 84
            if (paddingChar) {                                                          // 85
                var paddingIndex = base64Str.indexOf(paddingChar);                      // 86
                if (paddingIndex != -1) {                                               // 87
                    base64StrLength = paddingIndex;                                     // 88
                }                                                                       // 89
            }                                                                           // 90
                                                                                        // 91
            // Convert                                                                  // 92
            var words = [];                                                             // 93
            var nBytes = 0;                                                             // 94
            for (var i = 0; i < base64StrLength; i++) {                                 // 95
                if (i % 4) {                                                            // 96
                    var bits1 = map.indexOf(base64Str.charAt(i - 1)) << ((i % 4) * 2);  // 97
                    var bits2 = map.indexOf(base64Str.charAt(i)) >>> (6 - (i % 4) * 2); // 98
                    words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);  // 99
                    nBytes++;                                                           // 100
                }                                                                       // 101
            }                                                                           // 102
                                                                                        // 103
            return WordArray.create(words, nBytes);                                     // 104
        },                                                                              // 105
                                                                                        // 106
        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='       // 107
    };                                                                                  // 108
}());                                                                                   // 109
                                                                                        // 110
//////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

/////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("jparker:crypto-base64");

})();
