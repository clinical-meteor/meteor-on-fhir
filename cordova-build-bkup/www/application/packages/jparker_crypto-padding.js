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
// packages/jparker_crypto-padding/packages/jparker_crypto-padding.js                                 //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/jparker:crypto-padding/lib/pad-ansix923.js                                          //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
/**                                                                                             // 1
 * ANSI X.923 padding strategy.                                                                 // 2
 */                                                                                             // 3
CryptoJS.pad.AnsiX923 = {                                                                       // 4
    pad: function (data, blockSize) {                                                           // 5
        // Shortcuts                                                                            // 6
        var dataSigBytes = data.sigBytes;                                                       // 7
        var blockSizeBytes = blockSize * 4;                                                     // 8
                                                                                                // 9
        // Count padding bytes                                                                  // 10
        var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;                     // 11
                                                                                                // 12
        // Compute last byte position                                                           // 13
        var lastBytePos = dataSigBytes + nPaddingBytes - 1;                                     // 14
                                                                                                // 15
        // Pad                                                                                  // 16
        data.clamp();                                                                           // 17
        data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);         // 18
        data.sigBytes += nPaddingBytes;                                                         // 19
    },                                                                                          // 20
                                                                                                // 21
    unpad: function (data) {                                                                    // 22
        // Get number of padding bytes from last byte                                           // 23
        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;                       // 24
                                                                                                // 25
        // Remove padding                                                                       // 26
        data.sigBytes -= nPaddingBytes;                                                         // 27
    }                                                                                           // 28
};                                                                                              // 29
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/jparker:crypto-padding/lib/pad-iso10126.js                                          //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
/**                                                                                             // 1
 * ISO 10126 padding strategy.                                                                  // 2
 */                                                                                             // 3
CryptoJS.pad.Iso10126 = {                                                                       // 4
    pad: function (data, blockSize) {                                                           // 5
        // Shortcut                                                                             // 6
        var blockSizeBytes = blockSize * 4;                                                     // 7
                                                                                                // 8
        // Count padding bytes                                                                  // 9
        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;                    // 10
                                                                                                // 11
        // Pad                                                                                  // 12
        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).                          // 13
             concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));                   // 14
    },                                                                                          // 15
                                                                                                // 16
    unpad: function (data) {                                                                    // 17
        // Get number of padding bytes from last byte                                           // 18
        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;                       // 19
                                                                                                // 20
        // Remove padding                                                                       // 21
        data.sigBytes -= nPaddingBytes;                                                         // 22
    }                                                                                           // 23
};                                                                                              // 24
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/jparker:crypto-padding/lib/pad-iso97971.js                                          //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
/**                                                                                             // 1
 * ISO/IEC 9797-1 Padding Method 2.                                                             // 2
 */                                                                                             // 3
CryptoJS.pad.Iso97971 = {                                                                       // 4
    pad: function (data, blockSize) {                                                           // 5
        // Add 0x80 byte                                                                        // 6
        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));                            // 7
                                                                                                // 8
        // Zero pad the rest                                                                    // 9
        CryptoJS.pad.ZeroPadding.pad(data, blockSize);                                          // 10
    },                                                                                          // 11
                                                                                                // 12
    unpad: function (data) {                                                                    // 13
        // Remove zero padding                                                                  // 14
        CryptoJS.pad.ZeroPadding.unpad(data);                                                   // 15
                                                                                                // 16
        // Remove one more byte -- the 0x80 byte                                                // 17
        data.sigBytes--;                                                                        // 18
    }                                                                                           // 19
};                                                                                              // 20
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/jparker:crypto-padding/lib/pad-nopadding.js                                         //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
/**                                                                                             // 1
 * A noop padding strategy.                                                                     // 2
 */                                                                                             // 3
CryptoJS.pad.NoPadding = {                                                                      // 4
    pad: function () {                                                                          // 5
    },                                                                                          // 6
                                                                                                // 7
    unpad: function () {                                                                        // 8
    }                                                                                           // 9
};                                                                                              // 10
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/jparker:crypto-padding/lib/pad-zeropadding.js                                       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
/**                                                                                             // 1
 * Zero padding strategy.                                                                       // 2
 */                                                                                             // 3
CryptoJS.pad.ZeroPadding = {                                                                    // 4
    pad: function (data, blockSize) {                                                           // 5
        // Shortcut                                                                             // 6
        var blockSizeBytes = blockSize * 4;                                                     // 7
                                                                                                // 8
        // Pad                                                                                  // 9
        data.clamp();                                                                           // 10
        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes); // 11
    },                                                                                          // 12
                                                                                                // 13
    unpad: function (data) {                                                                    // 14
        // Shortcut                                                                             // 15
        var dataWords = data.words;                                                             // 16
                                                                                                // 17
        // Unpad                                                                                // 18
        var i = data.sigBytes - 1;                                                              // 19
        while (!((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {                         // 20
            i--;                                                                                // 21
        }                                                                                       // 22
        data.sigBytes = i + 1;                                                                  // 23
    }                                                                                           // 24
};                                                                                              // 25
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("jparker:crypto-padding");

})();
