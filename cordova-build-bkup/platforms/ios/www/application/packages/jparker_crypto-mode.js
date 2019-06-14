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

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// packages/jparker_crypto-mode/packages/jparker_crypto-mode.js                             //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
(function () {

////////////////////////////////////////////////////////////////////////////////////////
//                                                                                    //
// packages/jparker:crypto-mode/lib/mode-cfb.js                                       //
//                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////
                                                                                      //
/**                                                                                   // 1
 * Cipher Feedback block mode.                                                        // 2
 */                                                                                   // 3
CryptoJS.mode.CFB = (function () {                                                    // 4
    var CFB = CryptoJS.lib.BlockCipherMode.extend();                                  // 5
                                                                                      // 6
    CFB.Encryptor = CFB.extend({                                                      // 7
        processBlock: function (words, offset) {                                      // 8
            // Shortcuts                                                              // 9
            var cipher = this._cipher;                                                // 10
            var blockSize = cipher.blockSize;                                         // 11
                                                                                      // 12
            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher); // 13
                                                                                      // 14
            // Remember this block to use with next block                             // 15
            this._prevBlock = words.slice(offset, offset + blockSize);                // 16
        }                                                                             // 17
    });                                                                               // 18
                                                                                      // 19
    CFB.Decryptor = CFB.extend({                                                      // 20
        processBlock: function (words, offset) {                                      // 21
            // Shortcuts                                                              // 22
            var cipher = this._cipher;                                                // 23
            var blockSize = cipher.blockSize;                                         // 24
                                                                                      // 25
            // Remember this block to use with next block                             // 26
            var thisBlock = words.slice(offset, offset + blockSize);                  // 27
                                                                                      // 28
            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher); // 29
                                                                                      // 30
            // This block becomes the previous block                                  // 31
            this._prevBlock = thisBlock;                                              // 32
        }                                                                             // 33
    });                                                                               // 34
                                                                                      // 35
    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {          // 36
        // Shortcut                                                                   // 37
        var iv = this._iv;                                                            // 38
                                                                                      // 39
        // Generate keystream                                                         // 40
        if (iv) {                                                                     // 41
            var keystream = iv.slice(0);                                              // 42
                                                                                      // 43
            // Remove IV for subsequent blocks                                        // 44
            this._iv = undefined;                                                     // 45
        } else {                                                                      // 46
            var keystream = this._prevBlock;                                          // 47
        }                                                                             // 48
        cipher.encryptBlock(keystream, 0);                                            // 49
                                                                                      // 50
        // Encrypt                                                                    // 51
        for (var i = 0; i < blockSize; i++) {                                         // 52
            words[offset + i] ^= keystream[i];                                        // 53
        }                                                                             // 54
    }                                                                                 // 55
                                                                                      // 56
    return CFB;                                                                       // 57
}());                                                                                 // 58
////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////
//                                                                                    //
// packages/jparker:crypto-mode/lib/mode-ctr-gladman.js                               //
//                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////
                                                                                      //
/** @preserve                                                                         // 1
 * Counter block mode compatible with  Dr Brian Gladman fileenc.c                     // 2
 * derived from CryptoJS.mode.CTR                                                     // 3
 * Jan Hruby jhruby.web@gmail.com                                                     // 4
 */                                                                                   // 5
CryptoJS.mode.CTRGladman = (function () {                                             // 6
    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();                           // 7
                                                                                      // 8
	function incWord(word)                                                               // 9
	{                                                                                    // 10
		if (((word >> 24) & 0xff) === 0xff) { //overflow                                    // 11
		var b1 = (word >> 16)&0xff;                                                         // 12
		var b2 = (word >> 8)&0xff;                                                          // 13
		var b3 = word & 0xff;                                                               // 14
                                                                                      // 15
		if (b1 === 0xff) // overflow b1                                                     // 16
		{                                                                                   // 17
		b1 = 0;                                                                             // 18
		if (b2 === 0xff)                                                                    // 19
		{                                                                                   // 20
			b2 = 0;                                                                            // 21
			if (b3 === 0xff)                                                                   // 22
			{                                                                                  // 23
				b3 = 0;                                                                           // 24
			}                                                                                  // 25
			else                                                                               // 26
			{                                                                                  // 27
				++b3;                                                                             // 28
			}                                                                                  // 29
		}                                                                                   // 30
		else                                                                                // 31
		{                                                                                   // 32
			++b2;                                                                              // 33
		}                                                                                   // 34
		}                                                                                   // 35
		else                                                                                // 36
		{                                                                                   // 37
		++b1;                                                                               // 38
		}                                                                                   // 39
                                                                                      // 40
		word = 0;                                                                           // 41
		word += (b1 << 16);                                                                 // 42
		word += (b2 << 8);                                                                  // 43
		word += b3;                                                                         // 44
		}                                                                                   // 45
		else                                                                                // 46
		{                                                                                   // 47
		word += (0x01 << 24);                                                               // 48
		}                                                                                   // 49
		return word;                                                                        // 50
	}                                                                                    // 51
                                                                                      // 52
	function incCounter(counter)                                                         // 53
	{                                                                                    // 54
		if ((counter[0] = incWord(counter[0])) === 0)                                       // 55
		{                                                                                   // 56
			// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8    // 57
			counter[1] = incWord(counter[1]);                                                  // 58
		}                                                                                   // 59
		return counter;                                                                     // 60
	}                                                                                    // 61
                                                                                      // 62
    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({                        // 63
        processBlock: function (words, offset) {                                      // 64
            // Shortcuts                                                              // 65
            var cipher = this._cipher                                                 // 66
            var blockSize = cipher.blockSize;                                         // 67
            var iv = this._iv;                                                        // 68
            var counter = this._counter;                                              // 69
                                                                                      // 70
            // Generate keystream                                                     // 71
            if (iv) {                                                                 // 72
                counter = this._counter = iv.slice(0);                                // 73
                                                                                      // 74
                // Remove IV for subsequent blocks                                    // 75
                this._iv = undefined;                                                 // 76
            }                                                                         // 77
                                                                                      // 78
			incCounter(counter);                                                               // 79
                                                                                      // 80
			var keystream = counter.slice(0);                                                  // 81
            cipher.encryptBlock(keystream, 0);                                        // 82
                                                                                      // 83
            // Encrypt                                                                // 84
            for (var i = 0; i < blockSize; i++) {                                     // 85
                words[offset + i] ^= keystream[i];                                    // 86
            }                                                                         // 87
        }                                                                             // 88
    });                                                                               // 89
                                                                                      // 90
    CTRGladman.Decryptor = Encryptor;                                                 // 91
                                                                                      // 92
    return CTRGladman;                                                                // 93
}());                                                                                 // 94
                                                                                      // 95
                                                                                      // 96
////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////
//                                                                                    //
// packages/jparker:crypto-mode/lib/mode-ctr.js                                       //
//                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////
                                                                                      //
/**                                                                                   // 1
 * Counter block mode.                                                                // 2
 */                                                                                   // 3
CryptoJS.mode.CTR = (function () {                                                    // 4
    var CTR = CryptoJS.lib.BlockCipherMode.extend();                                  // 5
                                                                                      // 6
    var Encryptor = CTR.Encryptor = CTR.extend({                                      // 7
        processBlock: function (words, offset) {                                      // 8
            // Shortcuts                                                              // 9
            var cipher = this._cipher                                                 // 10
            var blockSize = cipher.blockSize;                                         // 11
            var iv = this._iv;                                                        // 12
            var counter = this._counter;                                              // 13
                                                                                      // 14
            // Generate keystream                                                     // 15
            if (iv) {                                                                 // 16
                counter = this._counter = iv.slice(0);                                // 17
                                                                                      // 18
                // Remove IV for subsequent blocks                                    // 19
                this._iv = undefined;                                                 // 20
            }                                                                         // 21
            var keystream = counter.slice(0);                                         // 22
            cipher.encryptBlock(keystream, 0);                                        // 23
                                                                                      // 24
            // Increment counter                                                      // 25
            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0                 // 26
                                                                                      // 27
            // Encrypt                                                                // 28
            for (var i = 0; i < blockSize; i++) {                                     // 29
                words[offset + i] ^= keystream[i];                                    // 30
            }                                                                         // 31
        }                                                                             // 32
    });                                                                               // 33
                                                                                      // 34
    CTR.Decryptor = Encryptor;                                                        // 35
                                                                                      // 36
    return CTR;                                                                       // 37
}());                                                                                 // 38
////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////
//                                                                                    //
// packages/jparker:crypto-mode/lib/mode-ecb.js                                       //
//                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////
                                                                                      //
/**                                                                                   // 1
 * Electronic Codebook block mode.                                                    // 2
 */                                                                                   // 3
CryptoJS.mode.ECB = (function () {                                                    // 4
    var ECB = CryptoJS.lib.BlockCipherMode.extend();                                  // 5
                                                                                      // 6
    ECB.Encryptor = ECB.extend({                                                      // 7
        processBlock: function (words, offset) {                                      // 8
            this._cipher.encryptBlock(words, offset);                                 // 9
        }                                                                             // 10
    });                                                                               // 11
                                                                                      // 12
    ECB.Decryptor = ECB.extend({                                                      // 13
        processBlock: function (words, offset) {                                      // 14
            this._cipher.decryptBlock(words, offset);                                 // 15
        }                                                                             // 16
    });                                                                               // 17
                                                                                      // 18
    return ECB;                                                                       // 19
}());                                                                                 // 20
////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////
//                                                                                    //
// packages/jparker:crypto-mode/lib/mode-ofb.js                                       //
//                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////
                                                                                      //
/**                                                                                   // 1
 * Output Feedback block mode.                                                        // 2
 */                                                                                   // 3
CryptoJS.mode.OFB = (function () {                                                    // 4
    var OFB = CryptoJS.lib.BlockCipherMode.extend();                                  // 5
                                                                                      // 6
    var Encryptor = OFB.Encryptor = OFB.extend({                                      // 7
        processBlock: function (words, offset) {                                      // 8
            // Shortcuts                                                              // 9
            var cipher = this._cipher                                                 // 10
            var blockSize = cipher.blockSize;                                         // 11
            var iv = this._iv;                                                        // 12
            var keystream = this._keystream;                                          // 13
                                                                                      // 14
            // Generate keystream                                                     // 15
            if (iv) {                                                                 // 16
                keystream = this._keystream = iv.slice(0);                            // 17
                                                                                      // 18
                // Remove IV for subsequent blocks                                    // 19
                this._iv = undefined;                                                 // 20
            }                                                                         // 21
            cipher.encryptBlock(keystream, 0);                                        // 22
                                                                                      // 23
            // Encrypt                                                                // 24
            for (var i = 0; i < blockSize; i++) {                                     // 25
                words[offset + i] ^= keystream[i];                                    // 26
            }                                                                         // 27
        }                                                                             // 28
    });                                                                               // 29
                                                                                      // 30
    OFB.Decryptor = Encryptor;                                                        // 31
                                                                                      // 32
    return OFB;                                                                       // 33
}());                                                                                 // 34
////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

//////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("jparker:crypto-mode");

})();
