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

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/jparker_crypto-md5/packages/jparker_crypto-md5.js                          //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
(function () {

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// packages/jparker:crypto-md5/lib/md5.js                                       //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
/*                                                                              // 1
CryptoJS v3.1.2                                                                 // 2
code.google.com/p/crypto-js                                                     // 3
(c) 2009-2013 by Jeff Mott. All rights reserved.                                // 4
code.google.com/p/crypto-js/wiki/License                                        // 5
*/                                                                              // 6
(function (Math) {                                                              // 7
    // Shortcuts                                                                // 8
    var C = CryptoJS;                                                           // 9
    var C_lib = C.lib;                                                          // 10
    var WordArray = C_lib.WordArray;                                            // 11
    var Hasher = C_lib.Hasher;                                                  // 12
    var C_algo = C.algo;                                                        // 13
                                                                                // 14
    // Constants table                                                          // 15
    var T = [];                                                                 // 16
                                                                                // 17
    // Compute constants                                                        // 18
    (function () {                                                              // 19
        for (var i = 0; i < 64; i++) {                                          // 20
            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;               // 21
        }                                                                       // 22
    }());                                                                       // 23
                                                                                // 24
    /**                                                                         // 25
     * MD5 hash algorithm.                                                      // 26
     */                                                                         // 27
    var MD5 = C_algo.MD5 = Hasher.extend({                                      // 28
        _doReset: function () {                                                 // 29
            this._hash = new WordArray.init([                                   // 30
                0x67452301, 0xefcdab89,                                         // 31
                0x98badcfe, 0x10325476                                          // 32
            ]);                                                                 // 33
        },                                                                      // 34
                                                                                // 35
        _doProcessBlock: function (M, offset) {                                 // 36
            // Swap endian                                                      // 37
            for (var i = 0; i < 16; i++) {                                      // 38
                // Shortcuts                                                    // 39
                var offset_i = offset + i;                                      // 40
                var M_offset_i = M[offset_i];                                   // 41
                                                                                // 42
                M[offset_i] = (                                                 // 43
                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) | // 44
                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)   // 45
                );                                                              // 46
            }                                                                   // 47
                                                                                // 48
            // Shortcuts                                                        // 49
            var H = this._hash.words;                                           // 50
                                                                                // 51
            var M_offset_0  = M[offset + 0];                                    // 52
            var M_offset_1  = M[offset + 1];                                    // 53
            var M_offset_2  = M[offset + 2];                                    // 54
            var M_offset_3  = M[offset + 3];                                    // 55
            var M_offset_4  = M[offset + 4];                                    // 56
            var M_offset_5  = M[offset + 5];                                    // 57
            var M_offset_6  = M[offset + 6];                                    // 58
            var M_offset_7  = M[offset + 7];                                    // 59
            var M_offset_8  = M[offset + 8];                                    // 60
            var M_offset_9  = M[offset + 9];                                    // 61
            var M_offset_10 = M[offset + 10];                                   // 62
            var M_offset_11 = M[offset + 11];                                   // 63
            var M_offset_12 = M[offset + 12];                                   // 64
            var M_offset_13 = M[offset + 13];                                   // 65
            var M_offset_14 = M[offset + 14];                                   // 66
            var M_offset_15 = M[offset + 15];                                   // 67
                                                                                // 68
            // Working varialbes                                                // 69
            var a = H[0];                                                       // 70
            var b = H[1];                                                       // 71
            var c = H[2];                                                       // 72
            var d = H[3];                                                       // 73
                                                                                // 74
            // Computation                                                      // 75
            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);                          // 76
            d = FF(d, a, b, c, M_offset_1,  12, T[1]);                          // 77
            c = FF(c, d, a, b, M_offset_2,  17, T[2]);                          // 78
            b = FF(b, c, d, a, M_offset_3,  22, T[3]);                          // 79
            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);                          // 80
            d = FF(d, a, b, c, M_offset_5,  12, T[5]);                          // 81
            c = FF(c, d, a, b, M_offset_6,  17, T[6]);                          // 82
            b = FF(b, c, d, a, M_offset_7,  22, T[7]);                          // 83
            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);                          // 84
            d = FF(d, a, b, c, M_offset_9,  12, T[9]);                          // 85
            c = FF(c, d, a, b, M_offset_10, 17, T[10]);                         // 86
            b = FF(b, c, d, a, M_offset_11, 22, T[11]);                         // 87
            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);                         // 88
            d = FF(d, a, b, c, M_offset_13, 12, T[13]);                         // 89
            c = FF(c, d, a, b, M_offset_14, 17, T[14]);                         // 90
            b = FF(b, c, d, a, M_offset_15, 22, T[15]);                         // 91
                                                                                // 92
            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);                         // 93
            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);                         // 94
            c = GG(c, d, a, b, M_offset_11, 14, T[18]);                         // 95
            b = GG(b, c, d, a, M_offset_0,  20, T[19]);                         // 96
            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);                         // 97
            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);                         // 98
            c = GG(c, d, a, b, M_offset_15, 14, T[22]);                         // 99
            b = GG(b, c, d, a, M_offset_4,  20, T[23]);                         // 100
            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);                         // 101
            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);                         // 102
            c = GG(c, d, a, b, M_offset_3,  14, T[26]);                         // 103
            b = GG(b, c, d, a, M_offset_8,  20, T[27]);                         // 104
            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);                         // 105
            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);                         // 106
            c = GG(c, d, a, b, M_offset_7,  14, T[30]);                         // 107
            b = GG(b, c, d, a, M_offset_12, 20, T[31]);                         // 108
                                                                                // 109
            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);                         // 110
            d = HH(d, a, b, c, M_offset_8,  11, T[33]);                         // 111
            c = HH(c, d, a, b, M_offset_11, 16, T[34]);                         // 112
            b = HH(b, c, d, a, M_offset_14, 23, T[35]);                         // 113
            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);                         // 114
            d = HH(d, a, b, c, M_offset_4,  11, T[37]);                         // 115
            c = HH(c, d, a, b, M_offset_7,  16, T[38]);                         // 116
            b = HH(b, c, d, a, M_offset_10, 23, T[39]);                         // 117
            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);                         // 118
            d = HH(d, a, b, c, M_offset_0,  11, T[41]);                         // 119
            c = HH(c, d, a, b, M_offset_3,  16, T[42]);                         // 120
            b = HH(b, c, d, a, M_offset_6,  23, T[43]);                         // 121
            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);                         // 122
            d = HH(d, a, b, c, M_offset_12, 11, T[45]);                         // 123
            c = HH(c, d, a, b, M_offset_15, 16, T[46]);                         // 124
            b = HH(b, c, d, a, M_offset_2,  23, T[47]);                         // 125
                                                                                // 126
            a = II(a, b, c, d, M_offset_0,  6,  T[48]);                         // 127
            d = II(d, a, b, c, M_offset_7,  10, T[49]);                         // 128
            c = II(c, d, a, b, M_offset_14, 15, T[50]);                         // 129
            b = II(b, c, d, a, M_offset_5,  21, T[51]);                         // 130
            a = II(a, b, c, d, M_offset_12, 6,  T[52]);                         // 131
            d = II(d, a, b, c, M_offset_3,  10, T[53]);                         // 132
            c = II(c, d, a, b, M_offset_10, 15, T[54]);                         // 133
            b = II(b, c, d, a, M_offset_1,  21, T[55]);                         // 134
            a = II(a, b, c, d, M_offset_8,  6,  T[56]);                         // 135
            d = II(d, a, b, c, M_offset_15, 10, T[57]);                         // 136
            c = II(c, d, a, b, M_offset_6,  15, T[58]);                         // 137
            b = II(b, c, d, a, M_offset_13, 21, T[59]);                         // 138
            a = II(a, b, c, d, M_offset_4,  6,  T[60]);                         // 139
            d = II(d, a, b, c, M_offset_11, 10, T[61]);                         // 140
            c = II(c, d, a, b, M_offset_2,  15, T[62]);                         // 141
            b = II(b, c, d, a, M_offset_9,  21, T[63]);                         // 142
                                                                                // 143
            // Intermediate hash value                                          // 144
            H[0] = (H[0] + a) | 0;                                              // 145
            H[1] = (H[1] + b) | 0;                                              // 146
            H[2] = (H[2] + c) | 0;                                              // 147
            H[3] = (H[3] + d) | 0;                                              // 148
        },                                                                      // 149
                                                                                // 150
        _doFinalize: function () {                                              // 151
            // Shortcuts                                                        // 152
            var data = this._data;                                              // 153
            var dataWords = data.words;                                         // 154
                                                                                // 155
            var nBitsTotal = this._nDataBytes * 8;                              // 156
            var nBitsLeft = data.sigBytes * 8;                                  // 157
                                                                                // 158
            // Add padding                                                      // 159
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);        // 160
                                                                                // 161
            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);             // 162
            var nBitsTotalL = nBitsTotal;                                       // 163
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (                 // 164
                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |   // 165
                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)     // 166
            );                                                                  // 167
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (                 // 168
                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |   // 169
                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)     // 170
            );                                                                  // 171
                                                                                // 172
            data.sigBytes = (dataWords.length + 1) * 4;                         // 173
                                                                                // 174
            // Hash final blocks                                                // 175
            this._process();                                                    // 176
                                                                                // 177
            // Shortcuts                                                        // 178
            var hash = this._hash;                                              // 179
            var H = hash.words;                                                 // 180
                                                                                // 181
            // Swap endian                                                      // 182
            for (var i = 0; i < 4; i++) {                                       // 183
                // Shortcut                                                     // 184
                var H_i = H[i];                                                 // 185
                                                                                // 186
                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |            // 187
                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);             // 188
            }                                                                   // 189
                                                                                // 190
            // Return final computed hash                                       // 191
            return hash;                                                        // 192
        },                                                                      // 193
                                                                                // 194
        clone: function () {                                                    // 195
            var clone = Hasher.clone.call(this);                                // 196
            clone._hash = this._hash.clone();                                   // 197
                                                                                // 198
            return clone;                                                       // 199
        }                                                                       // 200
    });                                                                         // 201
                                                                                // 202
    function FF(a, b, c, d, x, s, t) {                                          // 203
        var n = a + ((b & c) | (~b & d)) + x + t;                               // 204
        return ((n << s) | (n >>> (32 - s))) + b;                               // 205
    }                                                                           // 206
                                                                                // 207
    function GG(a, b, c, d, x, s, t) {                                          // 208
        var n = a + ((b & d) | (c & ~d)) + x + t;                               // 209
        return ((n << s) | (n >>> (32 - s))) + b;                               // 210
    }                                                                           // 211
                                                                                // 212
    function HH(a, b, c, d, x, s, t) {                                          // 213
        var n = a + (b ^ c ^ d) + x + t;                                        // 214
        return ((n << s) | (n >>> (32 - s))) + b;                               // 215
    }                                                                           // 216
                                                                                // 217
    function II(a, b, c, d, x, s, t) {                                          // 218
        var n = a + (c ^ (b | ~d)) + x + t;                                     // 219
        return ((n << s) | (n >>> (32 - s))) + b;                               // 220
    }                                                                           // 221
                                                                                // 222
    /**                                                                         // 223
     * Shortcut function to the hasher's object interface.                      // 224
     *                                                                          // 225
     * @param {WordArray|string} message The message to hash.                   // 226
     *                                                                          // 227
     * @return {WordArray} The hash.                                            // 228
     *                                                                          // 229
     * @static                                                                  // 230
     *                                                                          // 231
     * @example                                                                 // 232
     *                                                                          // 233
     *     var hash = CryptoJS.MD5('message');                                  // 234
     *     var hash = CryptoJS.MD5(wordArray);                                  // 235
     */                                                                         // 236
    C.MD5 = Hasher._createHelper(MD5);                                          // 237
                                                                                // 238
    /**                                                                         // 239
     * Shortcut function to the HMAC's object interface.                        // 240
     *                                                                          // 241
     * @param {WordArray|string} message The message to hash.                   // 242
     * @param {WordArray|string} key The secret key.                            // 243
     *                                                                          // 244
     * @return {WordArray} The HMAC.                                            // 245
     *                                                                          // 246
     * @static                                                                  // 247
     *                                                                          // 248
     * @example                                                                 // 249
     *                                                                          // 250
     *     var hmac = CryptoJS.HmacMD5(message, key);                           // 251
     */                                                                         // 252
    C.HmacMD5 = Hasher._createHmacHelper(MD5);                                  // 253
}(Math));                                                                       // 254
                                                                                // 255
//////////////////////////////////////////////////////////////////////////////////

}).call(this);

/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("jparker:crypto-md5");

})();
