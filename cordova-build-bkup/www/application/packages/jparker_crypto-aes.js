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
// packages/jparker_crypto-aes/packages/jparker_crypto-aes.js        //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/jparker:crypto-aes/lib/aes.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
CryptoJS v3.1.2                                                                                                        // 2
code.google.com/p/crypto-js                                                                                            // 3
(c) 2009-2013 by Jeff Mott. All rights reserved.                                                                       // 4
code.google.com/p/crypto-js/wiki/License                                                                               // 5
*/                                                                                                                     // 6
(function () {                                                                                                        // 7
    // Shortcuts                                                                                                      // 8
    var C = CryptoJS;                                                                                                 // 9
    var C_lib = C.lib;                                                                                                // 10
    var BlockCipher = C_lib.BlockCipher;                                                                              // 11
    var C_algo = C.algo;                                                                                              // 12
                                                                                                                      // 13
    // Lookup tables                                                                                                  // 14
    var SBOX = [];                                                                                                    // 15
    var INV_SBOX = [];                                                                                                // 16
    var SUB_MIX_0 = [];                                                                                               // 17
    var SUB_MIX_1 = [];                                                                                               // 18
    var SUB_MIX_2 = [];                                                                                               // 19
    var SUB_MIX_3 = [];                                                                                               // 20
    var INV_SUB_MIX_0 = [];                                                                                           // 21
    var INV_SUB_MIX_1 = [];                                                                                           // 22
    var INV_SUB_MIX_2 = [];                                                                                           // 23
    var INV_SUB_MIX_3 = [];                                                                                           // 24
                                                                                                                      // 25
    // Compute lookup tables                                                                                          // 26
    (function () {                                                                                                    // 27
        // Compute double table                                                                                       // 28
        var d = [];                                                                                                   // 29
        for (var i = 0; i < 256; i++) {                                                                               // 30
            if (i < 128) {                                                                                            // 31
                d[i] = i << 1;                                                                                        // 32
            } else {                                                                                                  // 33
                d[i] = (i << 1) ^ 0x11b;                                                                              // 34
            }                                                                                                         // 35
        }                                                                                                             // 36
                                                                                                                      // 37
        // Walk GF(2^8)                                                                                               // 38
        var x = 0;                                                                                                    // 39
        var xi = 0;                                                                                                   // 40
        for (var i = 0; i < 256; i++) {                                                                               // 41
            // Compute sbox                                                                                           // 42
            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);                                              // 43
            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;                                                                     // 44
            SBOX[x] = sx;                                                                                             // 45
            INV_SBOX[sx] = x;                                                                                         // 46
                                                                                                                      // 47
            // Compute multiplication                                                                                 // 48
            var x2 = d[x];                                                                                            // 49
            var x4 = d[x2];                                                                                           // 50
            var x8 = d[x4];                                                                                           // 51
                                                                                                                      // 52
            // Compute sub bytes, mix columns tables                                                                  // 53
            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);                                                               // 54
            SUB_MIX_0[x] = (t << 24) | (t >>> 8);                                                                     // 55
            SUB_MIX_1[x] = (t << 16) | (t >>> 16);                                                                    // 56
            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);                                                                    // 57
            SUB_MIX_3[x] = t;                                                                                         // 58
                                                                                                                      // 59
            // Compute inv sub bytes, inv mix columns tables                                                          // 60
            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);                               // 61
            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);                                                                // 62
            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);                                                               // 63
            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);                                                               // 64
            INV_SUB_MIX_3[sx] = t;                                                                                    // 65
                                                                                                                      // 66
            // Compute next counter                                                                                   // 67
            if (!x) {                                                                                                 // 68
                x = xi = 1;                                                                                           // 69
            } else {                                                                                                  // 70
                x = x2 ^ d[d[d[x8 ^ x2]]];                                                                            // 71
                xi ^= d[d[xi]];                                                                                       // 72
            }                                                                                                         // 73
        }                                                                                                             // 74
    }());                                                                                                             // 75
                                                                                                                      // 76
    // Precomputed Rcon lookup                                                                                        // 77
    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];                                    // 78
                                                                                                                      // 79
    /**                                                                                                               // 80
     * AES block cipher algorithm.                                                                                    // 81
     */                                                                                                               // 82
    var AES = C_algo.AES = BlockCipher.extend({                                                                       // 83
        _doReset: function () {                                                                                       // 84
            // Shortcuts                                                                                              // 85
            var key = this._key;                                                                                      // 86
            var keyWords = key.words;                                                                                 // 87
            var keySize = key.sigBytes / 4;                                                                           // 88
                                                                                                                      // 89
            // Compute number of rounds                                                                               // 90
            var nRounds = this._nRounds = keySize + 6                                                                 // 91
                                                                                                                      // 92
            // Compute number of key schedule rows                                                                    // 93
            var ksRows = (nRounds + 1) * 4;                                                                           // 94
                                                                                                                      // 95
            // Compute key schedule                                                                                   // 96
            var keySchedule = this._keySchedule = [];                                                                 // 97
            for (var ksRow = 0; ksRow < ksRows; ksRow++) {                                                            // 98
                if (ksRow < keySize) {                                                                                // 99
                    keySchedule[ksRow] = keyWords[ksRow];                                                             // 100
                } else {                                                                                              // 101
                    var t = keySchedule[ksRow - 1];                                                                   // 102
                                                                                                                      // 103
                    if (!(ksRow % keySize)) {                                                                         // 104
                        // Rot word                                                                                   // 105
                        t = (t << 8) | (t >>> 24);                                                                    // 106
                                                                                                                      // 107
                        // Sub word                                                                                   // 108
                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
                                                                                                                      // 110
                        // Mix Rcon                                                                                   // 111
                        t ^= RCON[(ksRow / keySize) | 0] << 24;                                                       // 112
                    } else if (keySize > 6 && ksRow % keySize == 4) {                                                 // 113
                        // Sub word                                                                                   // 114
                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
                    }                                                                                                 // 116
                                                                                                                      // 117
                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;                                            // 118
                }                                                                                                     // 119
            }                                                                                                         // 120
                                                                                                                      // 121
            // Compute inv key schedule                                                                               // 122
            var invKeySchedule = this._invKeySchedule = [];                                                           // 123
            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {                                                   // 124
                var ksRow = ksRows - invKsRow;                                                                        // 125
                                                                                                                      // 126
                if (invKsRow % 4) {                                                                                   // 127
                    var t = keySchedule[ksRow];                                                                       // 128
                } else {                                                                                              // 129
                    var t = keySchedule[ksRow - 4];                                                                   // 130
                }                                                                                                     // 131
                                                                                                                      // 132
                if (invKsRow < 4 || ksRow <= 4) {                                                                     // 133
                    invKeySchedule[invKsRow] = t;                                                                     // 134
                } else {                                                                                              // 135
                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]]; // 137
                }                                                                                                     // 138
            }                                                                                                         // 139
        },                                                                                                            // 140
                                                                                                                      // 141
        encryptBlock: function (M, offset) {                                                                          // 142
            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);       // 143
        },                                                                                                            // 144
                                                                                                                      // 145
        decryptBlock: function (M, offset) {                                                                          // 146
            // Swap 2nd and 4th rows                                                                                  // 147
            var t = M[offset + 1];                                                                                    // 148
            M[offset + 1] = M[offset + 3];                                                                            // 149
            M[offset + 3] = t;                                                                                        // 150
                                                                                                                      // 151
            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
                                                                                                                      // 153
            // Inv swap 2nd and 4th rows                                                                              // 154
            var t = M[offset + 1];                                                                                    // 155
            M[offset + 1] = M[offset + 3];                                                                            // 156
            M[offset + 3] = t;                                                                                        // 157
        },                                                                                                            // 158
                                                                                                                      // 159
        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {          // 160
            // Shortcut                                                                                               // 161
            var nRounds = this._nRounds;                                                                              // 162
                                                                                                                      // 163
            // Get input, add round key                                                                               // 164
            var s0 = M[offset]     ^ keySchedule[0];                                                                  // 165
            var s1 = M[offset + 1] ^ keySchedule[1];                                                                  // 166
            var s2 = M[offset + 2] ^ keySchedule[2];                                                                  // 167
            var s3 = M[offset + 3] ^ keySchedule[3];                                                                  // 168
                                                                                                                      // 169
            // Key schedule row counter                                                                               // 170
            var ksRow = 4;                                                                                            // 171
                                                                                                                      // 172
            // Rounds                                                                                                 // 173
            for (var round = 1; round < nRounds; round++) {                                                           // 174
                // Shift rows, sub bytes, mix columns, add round key                                                  // 175
                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];
                                                                                                                      // 180
                // Update state                                                                                       // 181
                s0 = t0;                                                                                              // 182
                s1 = t1;                                                                                              // 183
                s2 = t2;                                                                                              // 184
                s3 = t3;                                                                                              // 185
            }                                                                                                         // 186
                                                                                                                      // 187
            // Shift rows, sub bytes, add round key                                                                   // 188
            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];
                                                                                                                      // 193
            // Set output                                                                                             // 194
            M[offset]     = t0;                                                                                       // 195
            M[offset + 1] = t1;                                                                                       // 196
            M[offset + 2] = t2;                                                                                       // 197
            M[offset + 3] = t3;                                                                                       // 198
        },                                                                                                            // 199
                                                                                                                      // 200
        keySize: 256/32                                                                                               // 201
    });                                                                                                               // 202
                                                                                                                      // 203
    /**                                                                                                               // 204
     * Shortcut functions to the cipher's object interface.                                                           // 205
     *                                                                                                                // 206
     * @example                                                                                                       // 207
     *                                                                                                                // 208
     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);                                                  // 209
     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);                                               // 210
     */                                                                                                               // 211
    C.AES = BlockCipher._createHelper(AES);                                                                           // 212
}());                                                                                                                 // 213
                                                                                                                       // 214
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("jparker:crypto-aes");

})();
