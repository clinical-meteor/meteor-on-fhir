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
var Mousetrap;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/mousetrap_mousetrap/packages/mousetrap_mousetrap.js                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/mousetrap:mousetrap/mousetrap.js                                                                  //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
/*global define:false */                                                                                      // 1
/**                                                                                                           // 2
 * Copyright 2013 Craig Campbell                                                                              // 3
 *                                                                                                            // 4
 * Licensed under the Apache License, Version 2.0 (the "License");                                            // 5
 * you may not use this file except in compliance with the License.                                           // 6
 * You may obtain a copy of the License at                                                                    // 7
 *                                                                                                            // 8
 * http://www.apache.org/licenses/LICENSE-2.0                                                                 // 9
 *                                                                                                            // 10
 * Unless required by applicable law or agreed to in writing, software                                        // 11
 * distributed under the License is distributed on an "AS IS" BASIS,                                          // 12
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                   // 13
 * See the License for the specific language governing permissions and                                        // 14
 * limitations under the License.                                                                             // 15
 *                                                                                                            // 16
 * Mousetrap is a simple keyboard shortcut library for Javascript with                                        // 17
 * no external dependencies                                                                                   // 18
 *                                                                                                            // 19
 * @version 1.4.6                                                                                             // 20
 * @url craig.is/killing/mice                                                                                 // 21
 */                                                                                                           // 22
(function(window, document, undefined) {                                                                      // 23
                                                                                                              // 24
    /**                                                                                                       // 25
     * mapping of special keycodes to their corresponding keys                                                // 26
     *                                                                                                        // 27
     * everything in this dictionary cannot use keypress events                                               // 28
     * so it has to be here to map to the correct keycodes for                                                // 29
     * keyup/keydown events                                                                                   // 30
     *                                                                                                        // 31
     * @type {Object}                                                                                         // 32
     */                                                                                                       // 33
    var _MAP = {                                                                                              // 34
            8: 'backspace',                                                                                   // 35
            9: 'tab',                                                                                         // 36
            13: 'enter',                                                                                      // 37
            16: 'shift',                                                                                      // 38
            17: 'ctrl',                                                                                       // 39
            18: 'alt',                                                                                        // 40
            20: 'capslock',                                                                                   // 41
            27: 'esc',                                                                                        // 42
            32: 'space',                                                                                      // 43
            33: 'pageup',                                                                                     // 44
            34: 'pagedown',                                                                                   // 45
            35: 'end',                                                                                        // 46
            36: 'home',                                                                                       // 47
            37: 'left',                                                                                       // 48
            38: 'up',                                                                                         // 49
            39: 'right',                                                                                      // 50
            40: 'down',                                                                                       // 51
            45: 'ins',                                                                                        // 52
            46: 'del',                                                                                        // 53
            91: 'meta',                                                                                       // 54
            93: 'meta',                                                                                       // 55
            224: 'meta'                                                                                       // 56
        },                                                                                                    // 57
                                                                                                              // 58
        /**                                                                                                   // 59
         * mapping for special characters so they can support                                                 // 60
         *                                                                                                    // 61
         * this dictionary is only used incase you want to bind a                                             // 62
         * keyup or keydown event to one of these keys                                                        // 63
         *                                                                                                    // 64
         * @type {Object}                                                                                     // 65
         */                                                                                                   // 66
        _KEYCODE_MAP = {                                                                                      // 67
            106: '*',                                                                                         // 68
            107: '+',                                                                                         // 69
            109: '-',                                                                                         // 70
            110: '.',                                                                                         // 71
            111 : '/',                                                                                        // 72
            186: ';',                                                                                         // 73
            187: '=',                                                                                         // 74
            188: ',',                                                                                         // 75
            189: '-',                                                                                         // 76
            190: '.',                                                                                         // 77
            191: '/',                                                                                         // 78
            192: '`',                                                                                         // 79
            219: '[',                                                                                         // 80
            220: '\\',                                                                                        // 81
            221: ']',                                                                                         // 82
            222: '\''                                                                                         // 83
        },                                                                                                    // 84
                                                                                                              // 85
        /**                                                                                                   // 86
         * this is a mapping of keys that require shift on a US keypad                                        // 87
         * back to the non shift equivelents                                                                  // 88
         *                                                                                                    // 89
         * this is so you can use keyup events with these keys                                                // 90
         *                                                                                                    // 91
         * note that this will only work reliably on US keyboards                                             // 92
         *                                                                                                    // 93
         * @type {Object}                                                                                     // 94
         */                                                                                                   // 95
        _SHIFT_MAP = {                                                                                        // 96
            '~': '`',                                                                                         // 97
            '!': '1',                                                                                         // 98
            '@': '2',                                                                                         // 99
            '#': '3',                                                                                         // 100
            '$': '4',                                                                                         // 101
            '%': '5',                                                                                         // 102
            '^': '6',                                                                                         // 103
            '&': '7',                                                                                         // 104
            '*': '8',                                                                                         // 105
            '(': '9',                                                                                         // 106
            ')': '0',                                                                                         // 107
            '_': '-',                                                                                         // 108
            '+': '=',                                                                                         // 109
            ':': ';',                                                                                         // 110
            '\"': '\'',                                                                                       // 111
            '<': ',',                                                                                         // 112
            '>': '.',                                                                                         // 113
            '?': '/',                                                                                         // 114
            '|': '\\'                                                                                         // 115
        },                                                                                                    // 116
                                                                                                              // 117
        /**                                                                                                   // 118
         * this is a list of special strings you can use to map                                               // 119
         * to modifier keys when you specify your keyboard shortcuts                                          // 120
         *                                                                                                    // 121
         * @type {Object}                                                                                     // 122
         */                                                                                                   // 123
        _SPECIAL_ALIASES = {                                                                                  // 124
            'option': 'alt',                                                                                  // 125
            'command': 'meta',                                                                                // 126
            'return': 'enter',                                                                                // 127
            'escape': 'esc',                                                                                  // 128
            'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'                          // 129
        },                                                                                                    // 130
                                                                                                              // 131
        /**                                                                                                   // 132
         * variable to store the flipped version of _MAP from above                                           // 133
         * needed to check if we should use keypress or not when no action                                    // 134
         * is specified                                                                                       // 135
         *                                                                                                    // 136
         * @type {Object|undefined}                                                                           // 137
         */                                                                                                   // 138
        _REVERSE_MAP,                                                                                         // 139
                                                                                                              // 140
        /**                                                                                                   // 141
         * a list of all the callbacks setup via Mousetrap.bind()                                             // 142
         *                                                                                                    // 143
         * @type {Object}                                                                                     // 144
         */                                                                                                   // 145
        _callbacks = {},                                                                                      // 146
                                                                                                              // 147
        /**                                                                                                   // 148
         * direct map of string combinations to callbacks used for trigger()                                  // 149
         *                                                                                                    // 150
         * @type {Object}                                                                                     // 151
         */                                                                                                   // 152
        _directMap = {},                                                                                      // 153
                                                                                                              // 154
        /**                                                                                                   // 155
         * keeps track of what level each sequence is at since multiple                                       // 156
         * sequences can start out with the same sequence                                                     // 157
         *                                                                                                    // 158
         * @type {Object}                                                                                     // 159
         */                                                                                                   // 160
        _sequenceLevels = {},                                                                                 // 161
                                                                                                              // 162
        /**                                                                                                   // 163
         * variable to store the setTimeout call                                                              // 164
         *                                                                                                    // 165
         * @type {null|number}                                                                                // 166
         */                                                                                                   // 167
        _resetTimer,                                                                                          // 168
                                                                                                              // 169
        /**                                                                                                   // 170
         * temporary state where we will ignore the next keyup                                                // 171
         *                                                                                                    // 172
         * @type {boolean|string}                                                                             // 173
         */                                                                                                   // 174
        _ignoreNextKeyup = false,                                                                             // 175
                                                                                                              // 176
        /**                                                                                                   // 177
         * temporary state where we will ignore the next keypress                                             // 178
         *                                                                                                    // 179
         * @type {boolean}                                                                                    // 180
         */                                                                                                   // 181
        _ignoreNextKeypress = false,                                                                          // 182
                                                                                                              // 183
        /**                                                                                                   // 184
         * are we currently inside of a sequence?                                                             // 185
         * type of action ("keyup" or "keydown" or "keypress") or false                                       // 186
         *                                                                                                    // 187
         * @type {boolean|string}                                                                             // 188
         */                                                                                                   // 189
        _nextExpectedAction = false;                                                                          // 190
                                                                                                              // 191
    /**                                                                                                       // 192
     * loop through the f keys, f1 to f19 and add them to the map                                             // 193
     * programatically                                                                                        // 194
     */                                                                                                       // 195
    for (var i = 1; i < 20; ++i) {                                                                            // 196
        _MAP[111 + i] = 'f' + i;                                                                              // 197
    }                                                                                                         // 198
                                                                                                              // 199
    /**                                                                                                       // 200
     * loop through to map numbers on the numeric keypad                                                      // 201
     */                                                                                                       // 202
    for (i = 0; i <= 9; ++i) {                                                                                // 203
        _MAP[i + 96] = i;                                                                                     // 204
    }                                                                                                         // 205
                                                                                                              // 206
    /**                                                                                                       // 207
     * cross browser add event method                                                                         // 208
     *                                                                                                        // 209
     * @param {Element|HTMLDocument} object                                                                   // 210
     * @param {string} type                                                                                   // 211
     * @param {Function} callback                                                                             // 212
     * @returns void                                                                                          // 213
     */                                                                                                       // 214
    function _addEvent(object, type, callback) {                                                              // 215
        if (object.addEventListener) {                                                                        // 216
            object.addEventListener(type, callback, false);                                                   // 217
            return;                                                                                           // 218
        }                                                                                                     // 219
                                                                                                              // 220
        object.attachEvent('on' + type, callback);                                                            // 221
    }                                                                                                         // 222
                                                                                                              // 223
    /**                                                                                                       // 224
     * takes the event and returns the key character                                                          // 225
     *                                                                                                        // 226
     * @param {Event} e                                                                                       // 227
     * @return {string}                                                                                       // 228
     */                                                                                                       // 229
    function _characterFromEvent(e) {                                                                         // 230
                                                                                                              // 231
        // for keypress events we should return the character as is                                           // 232
        if (e.type == 'keypress') {                                                                           // 233
            var character = String.fromCharCode(e.which);                                                     // 234
                                                                                                              // 235
            // if the shift key is not pressed then it is safe to assume                                      // 236
            // that we want the character to be lowercase.  this means if                                     // 237
            // you accidentally have caps lock on then your key bindings                                      // 238
            // will continue to work                                                                          // 239
            //                                                                                                // 240
            // the only side effect that might not be desired is if you                                       // 241
            // bind something like 'A' cause you want to trigger an                                           // 242
            // event when capital A is pressed caps lock will no longer                                       // 243
            // trigger the event.  shift+a will though.                                                       // 244
            if (!e.shiftKey) {                                                                                // 245
                character = character.toLowerCase();                                                          // 246
            }                                                                                                 // 247
                                                                                                              // 248
            return character;                                                                                 // 249
        }                                                                                                     // 250
                                                                                                              // 251
        // for non keypress events the special maps are needed                                                // 252
        if (_MAP[e.which]) {                                                                                  // 253
            return _MAP[e.which];                                                                             // 254
        }                                                                                                     // 255
                                                                                                              // 256
        if (_KEYCODE_MAP[e.which]) {                                                                          // 257
            return _KEYCODE_MAP[e.which];                                                                     // 258
        }                                                                                                     // 259
                                                                                                              // 260
        // if it is not in the special map                                                                    // 261
                                                                                                              // 262
        // with keydown and keyup events the character seems to always                                        // 263
        // come in as an uppercase character whether you are pressing shift                                   // 264
        // or not.  we should make sure it is always lowercase for comparisons                                // 265
        return String.fromCharCode(e.which).toLowerCase();                                                    // 266
    }                                                                                                         // 267
                                                                                                              // 268
    /**                                                                                                       // 269
     * checks if two arrays are equal                                                                         // 270
     *                                                                                                        // 271
     * @param {Array} modifiers1                                                                              // 272
     * @param {Array} modifiers2                                                                              // 273
     * @returns {boolean}                                                                                     // 274
     */                                                                                                       // 275
    function _modifiersMatch(modifiers1, modifiers2) {                                                        // 276
        return modifiers1.sort().join(',') === modifiers2.sort().join(',');                                   // 277
    }                                                                                                         // 278
                                                                                                              // 279
    /**                                                                                                       // 280
     * resets all sequence counters except for the ones passed in                                             // 281
     *                                                                                                        // 282
     * @param {Object} doNotReset                                                                             // 283
     * @returns void                                                                                          // 284
     */                                                                                                       // 285
    function _resetSequences(doNotReset) {                                                                    // 286
        doNotReset = doNotReset || {};                                                                        // 287
                                                                                                              // 288
        var activeSequences = false,                                                                          // 289
            key;                                                                                              // 290
                                                                                                              // 291
        for (key in _sequenceLevels) {                                                                        // 292
            if (doNotReset[key]) {                                                                            // 293
                activeSequences = true;                                                                       // 294
                continue;                                                                                     // 295
            }                                                                                                 // 296
            _sequenceLevels[key] = 0;                                                                         // 297
        }                                                                                                     // 298
                                                                                                              // 299
        if (!activeSequences) {                                                                               // 300
            _nextExpectedAction = false;                                                                      // 301
        }                                                                                                     // 302
    }                                                                                                         // 303
                                                                                                              // 304
    /**                                                                                                       // 305
     * finds all callbacks that match based on the keycode, modifiers,                                        // 306
     * and action                                                                                             // 307
     *                                                                                                        // 308
     * @param {string} character                                                                              // 309
     * @param {Array} modifiers                                                                               // 310
     * @param {Event|Object} e                                                                                // 311
     * @param {string=} sequenceName - name of the sequence we are looking for                                // 312
     * @param {string=} combination                                                                           // 313
     * @param {number=} level                                                                                 // 314
     * @returns {Array}                                                                                       // 315
     */                                                                                                       // 316
    function _getMatches(character, modifiers, e, sequenceName, combination, level) {                         // 317
        var i,                                                                                                // 318
            callback,                                                                                         // 319
            matches = [],                                                                                     // 320
            action = e.type;                                                                                  // 321
                                                                                                              // 322
        // if there are no events related to this keycode                                                     // 323
        if (!_callbacks[character]) {                                                                         // 324
            return [];                                                                                        // 325
        }                                                                                                     // 326
                                                                                                              // 327
        // if a modifier key is coming up on its own we should allow it                                       // 328
        if (action == 'keyup' && _isModifier(character)) {                                                    // 329
            modifiers = [character];                                                                          // 330
        }                                                                                                     // 331
                                                                                                              // 332
        // loop through all callbacks for the key that was pressed                                            // 333
        // and see if any of them match                                                                       // 334
        for (i = 0; i < _callbacks[character].length; ++i) {                                                  // 335
            callback = _callbacks[character][i];                                                              // 336
                                                                                                              // 337
            // if a sequence name is not specified, but this is a sequence at                                 // 338
            // the wrong level then move onto the next match                                                  // 339
            if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {           // 340
                continue;                                                                                     // 341
            }                                                                                                 // 342
                                                                                                              // 343
            // if the action we are looking for doesn't match the action we got                               // 344
            // then we should keep going                                                                      // 345
            if (action != callback.action) {                                                                  // 346
                continue;                                                                                     // 347
            }                                                                                                 // 348
                                                                                                              // 349
            // if this is a keypress event and the meta key and control key                                   // 350
            // are not pressed that means that we need to only look at the                                    // 351
            // character, otherwise check the modifiers as well                                               // 352
            //                                                                                                // 353
            // chrome will not fire a keypress if meta or control is down                                     // 354
            // safari will fire a keypress if meta or meta+shift is down                                      // 355
            // firefox will fire a keypress if meta or control is down                                        // 356
            if ((action == 'keypress' && !e.metaKey && !e.ctrlKey) || _modifiersMatch(modifiers, callback.modifiers)) {
                                                                                                              // 358
                // when you bind a combination or sequence a second time it                                   // 359
                // should overwrite the first one.  if a sequenceName or                                      // 360
                // combination is specified in this call it does just that                                    // 361
                //                                                                                            // 362
                // @todo make deleting its own method?                                                        // 363
                var deleteCombo = !sequenceName && callback.combo == combination;                             // 364
                var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level; // 365
                if (deleteCombo || deleteSequence) {                                                          // 366
                    _callbacks[character].splice(i, 1);                                                       // 367
                }                                                                                             // 368
                                                                                                              // 369
                matches.push(callback);                                                                       // 370
            }                                                                                                 // 371
        }                                                                                                     // 372
                                                                                                              // 373
        return matches;                                                                                       // 374
    }                                                                                                         // 375
                                                                                                              // 376
    /**                                                                                                       // 377
     * takes a key event and figures out what the modifiers are                                               // 378
     *                                                                                                        // 379
     * @param {Event} e                                                                                       // 380
     * @returns {Array}                                                                                       // 381
     */                                                                                                       // 382
    function _eventModifiers(e) {                                                                             // 383
        var modifiers = [];                                                                                   // 384
                                                                                                              // 385
        if (e.shiftKey) {                                                                                     // 386
            modifiers.push('shift');                                                                          // 387
        }                                                                                                     // 388
                                                                                                              // 389
        if (e.altKey) {                                                                                       // 390
            modifiers.push('alt');                                                                            // 391
        }                                                                                                     // 392
                                                                                                              // 393
        if (e.ctrlKey) {                                                                                      // 394
            modifiers.push('ctrl');                                                                           // 395
        }                                                                                                     // 396
                                                                                                              // 397
        if (e.metaKey) {                                                                                      // 398
            modifiers.push('meta');                                                                           // 399
        }                                                                                                     // 400
                                                                                                              // 401
        return modifiers;                                                                                     // 402
    }                                                                                                         // 403
                                                                                                              // 404
    /**                                                                                                       // 405
     * prevents default for this event                                                                        // 406
     *                                                                                                        // 407
     * @param {Event} e                                                                                       // 408
     * @returns void                                                                                          // 409
     */                                                                                                       // 410
    function _preventDefault(e) {                                                                             // 411
        if (e.preventDefault) {                                                                               // 412
            e.preventDefault();                                                                               // 413
            return;                                                                                           // 414
        }                                                                                                     // 415
                                                                                                              // 416
        e.returnValue = false;                                                                                // 417
    }                                                                                                         // 418
                                                                                                              // 419
    /**                                                                                                       // 420
     * stops propogation for this event                                                                       // 421
     *                                                                                                        // 422
     * @param {Event} e                                                                                       // 423
     * @returns void                                                                                          // 424
     */                                                                                                       // 425
    function _stopPropagation(e) {                                                                            // 426
        if (e.stopPropagation) {                                                                              // 427
            e.stopPropagation();                                                                              // 428
            return;                                                                                           // 429
        }                                                                                                     // 430
                                                                                                              // 431
        e.cancelBubble = true;                                                                                // 432
    }                                                                                                         // 433
                                                                                                              // 434
    /**                                                                                                       // 435
     * actually calls the callback function                                                                   // 436
     *                                                                                                        // 437
     * if your callback function returns false this will use the jquery                                       // 438
     * convention - prevent default and stop propogation on the event                                         // 439
     *                                                                                                        // 440
     * @param {Function} callback                                                                             // 441
     * @param {Event} e                                                                                       // 442
     * @returns void                                                                                          // 443
     */                                                                                                       // 444
    function _fireCallback(callback, e, combo, sequence) {                                                    // 445
                                                                                                              // 446
        // if this event should not happen stop here                                                          // 447
        if (Mousetrap.stopCallback(e, e.target || e.srcElement, combo, sequence)) {                           // 448
            return;                                                                                           // 449
        }                                                                                                     // 450
                                                                                                              // 451
        if (callback(e, combo) === false) {                                                                   // 452
            _preventDefault(e);                                                                               // 453
            _stopPropagation(e);                                                                              // 454
        }                                                                                                     // 455
    }                                                                                                         // 456
                                                                                                              // 457
    /**                                                                                                       // 458
     * handles a character key event                                                                          // 459
     *                                                                                                        // 460
     * @param {string} character                                                                              // 461
     * @param {Array} modifiers                                                                               // 462
     * @param {Event} e                                                                                       // 463
     * @returns void                                                                                          // 464
     */                                                                                                       // 465
    function _handleKey(character, modifiers, e) {                                                            // 466
        var callbacks = _getMatches(character, modifiers, e),                                                 // 467
            i,                                                                                                // 468
            doNotReset = {},                                                                                  // 469
            maxLevel = 0,                                                                                     // 470
            processedSequenceCallback = false;                                                                // 471
                                                                                                              // 472
        // Calculate the maxLevel for sequences so we can only execute the longest callback sequence          // 473
        for (i = 0; i < callbacks.length; ++i) {                                                              // 474
            if (callbacks[i].seq) {                                                                           // 475
                maxLevel = Math.max(maxLevel, callbacks[i].level);                                            // 476
            }                                                                                                 // 477
        }                                                                                                     // 478
                                                                                                              // 479
        // loop through matching callbacks for this key event                                                 // 480
        for (i = 0; i < callbacks.length; ++i) {                                                              // 481
                                                                                                              // 482
            // fire for all sequence callbacks                                                                // 483
            // this is because if for example you have multiple sequences                                     // 484
            // bound such as "g i" and "g t" they both need to fire the                                       // 485
            // callback for matching g cause otherwise you can only ever                                      // 486
            // match the first one                                                                            // 487
            if (callbacks[i].seq) {                                                                           // 488
                                                                                                              // 489
                // only fire callbacks for the maxLevel to prevent                                            // 490
                // subsequences from also firing                                                              // 491
                //                                                                                            // 492
                // for example 'a option b' should not cause 'option b' to fire                               // 493
                // even though 'option b' is part of the other sequence                                       // 494
                //                                                                                            // 495
                // any sequences that do not match here will be discarded                                     // 496
                // below by the _resetSequences call                                                          // 497
                if (callbacks[i].level != maxLevel) {                                                         // 498
                    continue;                                                                                 // 499
                }                                                                                             // 500
                                                                                                              // 501
                processedSequenceCallback = true;                                                             // 502
                                                                                                              // 503
                // keep a list of which sequences were matches for later                                      // 504
                doNotReset[callbacks[i].seq] = 1;                                                             // 505
                _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);                // 506
                continue;                                                                                     // 507
            }                                                                                                 // 508
                                                                                                              // 509
            // if there were no sequence matches but we are still here                                        // 510
            // that means this is a regular match so we should fire that                                      // 511
            if (!processedSequenceCallback) {                                                                 // 512
                _fireCallback(callbacks[i].callback, e, callbacks[i].combo);                                  // 513
            }                                                                                                 // 514
        }                                                                                                     // 515
                                                                                                              // 516
        // if the key you pressed matches the type of sequence without                                        // 517
        // being a modifier (ie "keyup" or "keypress") then we should                                         // 518
        // reset all sequences that were not matched by this event                                            // 519
        //                                                                                                    // 520
        // this is so, for example, if you have the sequence "h a t" and you                                  // 521
        // type "h e a r t" it does not match.  in this case the "e" will                                     // 522
        // cause the sequence to reset                                                                        // 523
        //                                                                                                    // 524
        // modifier keys are ignored because you can have a sequence                                          // 525
        // that contains modifiers such as "enter ctrl+space" and in most                                     // 526
        // cases the modifier key will be pressed before the next key                                         // 527
        //                                                                                                    // 528
        // also if you have a sequence such as "ctrl+b a" then pressing the                                   // 529
        // "b" key will trigger a "keypress" and a "keydown"                                                  // 530
        //                                                                                                    // 531
        // the "keydown" is expected when there is a modifier, but the                                        // 532
        // "keypress" ends up matching the _nextExpectedAction since it occurs                                // 533
        // after and that causes the sequence to reset                                                        // 534
        //                                                                                                    // 535
        // we ignore keypresses in a sequence that directly follow a keydown                                  // 536
        // for the same character                                                                             // 537
        var ignoreThisKeypress = e.type == 'keypress' && _ignoreNextKeypress;                                 // 538
        if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {                // 539
            _resetSequences(doNotReset);                                                                      // 540
        }                                                                                                     // 541
                                                                                                              // 542
        _ignoreNextKeypress = processedSequenceCallback && e.type == 'keydown';                               // 543
    }                                                                                                         // 544
                                                                                                              // 545
    /**                                                                                                       // 546
     * handles a keydown event                                                                                // 547
     *                                                                                                        // 548
     * @param {Event} e                                                                                       // 549
     * @returns void                                                                                          // 550
     */                                                                                                       // 551
    function _handleKeyEvent(e) {                                                                             // 552
                                                                                                              // 553
        // normalize e.which for key events                                                                   // 554
        // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion     // 555
        if (typeof e.which !== 'number') {                                                                    // 556
            e.which = e.keyCode;                                                                              // 557
        }                                                                                                     // 558
                                                                                                              // 559
        var character = _characterFromEvent(e);                                                               // 560
                                                                                                              // 561
        // no character found then stop                                                                       // 562
        if (!character) {                                                                                     // 563
            return;                                                                                           // 564
        }                                                                                                     // 565
                                                                                                              // 566
        // need to use === for the character check because the character can be 0                             // 567
        if (e.type == 'keyup' && _ignoreNextKeyup === character) {                                            // 568
            _ignoreNextKeyup = false;                                                                         // 569
            return;                                                                                           // 570
        }                                                                                                     // 571
                                                                                                              // 572
        Mousetrap.handleKey(character, _eventModifiers(e), e);                                                // 573
    }                                                                                                         // 574
                                                                                                              // 575
    /**                                                                                                       // 576
     * determines if the keycode specified is a modifier key or not                                           // 577
     *                                                                                                        // 578
     * @param {string} key                                                                                    // 579
     * @returns {boolean}                                                                                     // 580
     */                                                                                                       // 581
    function _isModifier(key) {                                                                               // 582
        return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';                              // 583
    }                                                                                                         // 584
                                                                                                              // 585
    /**                                                                                                       // 586
     * called to set a 1 second timeout on the specified sequence                                             // 587
     *                                                                                                        // 588
     * this is so after each key press in the sequence you have 1 second                                      // 589
     * to press the next key before you have to start over                                                    // 590
     *                                                                                                        // 591
     * @returns void                                                                                          // 592
     */                                                                                                       // 593
    function _resetSequenceTimer() {                                                                          // 594
        clearTimeout(_resetTimer);                                                                            // 595
        _resetTimer = setTimeout(_resetSequences, 1000);                                                      // 596
    }                                                                                                         // 597
                                                                                                              // 598
    /**                                                                                                       // 599
     * reverses the map lookup so that we can look for specific keys                                          // 600
     * to see what can and can't use keypress                                                                 // 601
     *                                                                                                        // 602
     * @return {Object}                                                                                       // 603
     */                                                                                                       // 604
    function _getReverseMap() {                                                                               // 605
        if (!_REVERSE_MAP) {                                                                                  // 606
            _REVERSE_MAP = {};                                                                                // 607
            for (var key in _MAP) {                                                                           // 608
                                                                                                              // 609
                // pull out the numeric keypad from here cause keypress should                                // 610
                // be able to detect the keys from the character                                              // 611
                if (key > 95 && key < 112) {                                                                  // 612
                    continue;                                                                                 // 613
                }                                                                                             // 614
                                                                                                              // 615
                if (_MAP.hasOwnProperty(key)) {                                                               // 616
                    _REVERSE_MAP[_MAP[key]] = key;                                                            // 617
                }                                                                                             // 618
            }                                                                                                 // 619
        }                                                                                                     // 620
        return _REVERSE_MAP;                                                                                  // 621
    }                                                                                                         // 622
                                                                                                              // 623
    /**                                                                                                       // 624
     * picks the best action based on the key combination                                                     // 625
     *                                                                                                        // 626
     * @param {string} key - character for key                                                                // 627
     * @param {Array} modifiers                                                                               // 628
     * @param {string=} action passed in                                                                      // 629
     */                                                                                                       // 630
    function _pickBestAction(key, modifiers, action) {                                                        // 631
                                                                                                              // 632
        // if no action was picked in we should try to pick the one                                           // 633
        // that we think would work best for this key                                                         // 634
        if (!action) {                                                                                        // 635
            action = _getReverseMap()[key] ? 'keydown' : 'keypress';                                          // 636
        }                                                                                                     // 637
                                                                                                              // 638
        // modifier keys don't work as expected with keypress,                                                // 639
        // switch to keydown                                                                                  // 640
        if (action == 'keypress' && modifiers.length) {                                                       // 641
            action = 'keydown';                                                                               // 642
        }                                                                                                     // 643
                                                                                                              // 644
        return action;                                                                                        // 645
    }                                                                                                         // 646
                                                                                                              // 647
    /**                                                                                                       // 648
     * binds a key sequence to an event                                                                       // 649
     *                                                                                                        // 650
     * @param {string} combo - combo specified in bind call                                                   // 651
     * @param {Array} keys                                                                                    // 652
     * @param {Function} callback                                                                             // 653
     * @param {string=} action                                                                                // 654
     * @returns void                                                                                          // 655
     */                                                                                                       // 656
    function _bindSequence(combo, keys, callback, action) {                                                   // 657
                                                                                                              // 658
        // start off by adding a sequence level record for this combination                                   // 659
        // and setting the level to 0                                                                         // 660
        _sequenceLevels[combo] = 0;                                                                           // 661
                                                                                                              // 662
        /**                                                                                                   // 663
         * callback to increase the sequence level for this sequence and reset                                // 664
         * all other sequences that were active                                                               // 665
         *                                                                                                    // 666
         * @param {string} nextAction                                                                         // 667
         * @returns {Function}                                                                                // 668
         */                                                                                                   // 669
        function _increaseSequence(nextAction) {                                                              // 670
            return function() {                                                                               // 671
                _nextExpectedAction = nextAction;                                                             // 672
                ++_sequenceLevels[combo];                                                                     // 673
                _resetSequenceTimer();                                                                        // 674
            };                                                                                                // 675
        }                                                                                                     // 676
                                                                                                              // 677
        /**                                                                                                   // 678
         * wraps the specified callback inside of another function in order                                   // 679
         * to reset all sequence counters as soon as this sequence is done                                    // 680
         *                                                                                                    // 681
         * @param {Event} e                                                                                   // 682
         * @returns void                                                                                      // 683
         */                                                                                                   // 684
        function _callbackAndReset(e) {                                                                       // 685
            _fireCallback(callback, e, combo);                                                                // 686
                                                                                                              // 687
            // we should ignore the next key up if the action is key down                                     // 688
            // or keypress.  this is so if you finish a sequence and                                          // 689
            // release the key the final key will not trigger a keyup                                         // 690
            if (action !== 'keyup') {                                                                         // 691
                _ignoreNextKeyup = _characterFromEvent(e);                                                    // 692
            }                                                                                                 // 693
                                                                                                              // 694
            // weird race condition if a sequence ends with the key                                           // 695
            // another sequence begins with                                                                   // 696
            setTimeout(_resetSequences, 10);                                                                  // 697
        }                                                                                                     // 698
                                                                                                              // 699
        // loop through keys one at a time and bind the appropriate callback                                  // 700
        // function.  for any key leading up to the final one it should                                       // 701
        // increase the sequence. after the final, it should reset all sequences                              // 702
        //                                                                                                    // 703
        // if an action is specified in the original bind call then that will                                 // 704
        // be used throughout.  otherwise we will pass the action that the                                    // 705
        // next key in the sequence should match.  this allows a sequence                                     // 706
        // to mix and match keypress and keydown events depending on which                                    // 707
        // ones are better suited to the key provided                                                         // 708
        for (var i = 0; i < keys.length; ++i) {                                                               // 709
            var isFinal = i + 1 === keys.length;                                                              // 710
            var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i + 1]).action);
            _bindSingle(keys[i], wrappedCallback, action, combo, i);                                          // 712
        }                                                                                                     // 713
    }                                                                                                         // 714
                                                                                                              // 715
    /**                                                                                                       // 716
     * Converts from a string key combination to an array                                                     // 717
     *                                                                                                        // 718
     * @param  {string} combination like "command+shift+l"                                                    // 719
     * @return {Array}                                                                                        // 720
     */                                                                                                       // 721
    function _keysFromString(combination) {                                                                   // 722
        if (combination === '+') {                                                                            // 723
            return ['+'];                                                                                     // 724
        }                                                                                                     // 725
                                                                                                              // 726
        return combination.split('+');                                                                        // 727
    }                                                                                                         // 728
                                                                                                              // 729
    /**                                                                                                       // 730
     * Gets info for a specific key combination                                                               // 731
     *                                                                                                        // 732
     * @param  {string} combination key combination ("command+s" or "a" or "*")                               // 733
     * @param  {string=} action                                                                               // 734
     * @returns {Object}                                                                                      // 735
     */                                                                                                       // 736
    function _getKeyInfo(combination, action) {                                                               // 737
        var keys,                                                                                             // 738
            key,                                                                                              // 739
            i,                                                                                                // 740
            modifiers = [];                                                                                   // 741
                                                                                                              // 742
        // take the keys from this pattern and figure out what the actual                                     // 743
        // pattern is all about                                                                               // 744
        keys = _keysFromString(combination);                                                                  // 745
                                                                                                              // 746
        for (i = 0; i < keys.length; ++i) {                                                                   // 747
            key = keys[i];                                                                                    // 748
                                                                                                              // 749
            // normalize key names                                                                            // 750
            if (_SPECIAL_ALIASES[key]) {                                                                      // 751
                key = _SPECIAL_ALIASES[key];                                                                  // 752
            }                                                                                                 // 753
                                                                                                              // 754
            // if this is not a keypress event then we should                                                 // 755
            // be smart about using shift keys                                                                // 756
            // this will only work for US keyboards however                                                   // 757
            if (action && action != 'keypress' && _SHIFT_MAP[key]) {                                          // 758
                key = _SHIFT_MAP[key];                                                                        // 759
                modifiers.push('shift');                                                                      // 760
            }                                                                                                 // 761
                                                                                                              // 762
            // if this key is a modifier then add it to the list of modifiers                                 // 763
            if (_isModifier(key)) {                                                                           // 764
                modifiers.push(key);                                                                          // 765
            }                                                                                                 // 766
        }                                                                                                     // 767
                                                                                                              // 768
        // depending on what the key combination is                                                           // 769
        // we will try to pick the best event for it                                                          // 770
        action = _pickBestAction(key, modifiers, action);                                                     // 771
                                                                                                              // 772
        return {                                                                                              // 773
            key: key,                                                                                         // 774
            modifiers: modifiers,                                                                             // 775
            action: action                                                                                    // 776
        };                                                                                                    // 777
    }                                                                                                         // 778
                                                                                                              // 779
    /**                                                                                                       // 780
     * binds a single keyboard combination                                                                    // 781
     *                                                                                                        // 782
     * @param {string} combination                                                                            // 783
     * @param {Function} callback                                                                             // 784
     * @param {string=} action                                                                                // 785
     * @param {string=} sequenceName - name of sequence if part of sequence                                   // 786
     * @param {number=} level - what part of the sequence the command is                                      // 787
     * @returns void                                                                                          // 788
     */                                                                                                       // 789
    function _bindSingle(combination, callback, action, sequenceName, level) {                                // 790
                                                                                                              // 791
        // store a direct mapped reference for use with Mousetrap.trigger                                     // 792
        _directMap[combination + ':' + action] = callback;                                                    // 793
                                                                                                              // 794
        // make sure multiple spaces in a row become a single space                                           // 795
        combination = combination.replace(/\s+/g, ' ');                                                       // 796
                                                                                                              // 797
        var sequence = combination.split(' '),                                                                // 798
            info;                                                                                             // 799
                                                                                                              // 800
        // if this pattern is a sequence of keys then run through this method                                 // 801
        // to reprocess each pattern one key at a time                                                        // 802
        if (sequence.length > 1) {                                                                            // 803
            _bindSequence(combination, sequence, callback, action);                                           // 804
            return;                                                                                           // 805
        }                                                                                                     // 806
                                                                                                              // 807
        info = _getKeyInfo(combination, action);                                                              // 808
                                                                                                              // 809
        // make sure to initialize array if this is the first time                                            // 810
        // a callback is added for this key                                                                   // 811
        _callbacks[info.key] = _callbacks[info.key] || [];                                                    // 812
                                                                                                              // 813
        // remove an existing match if there is one                                                           // 814
        _getMatches(info.key, info.modifiers, {type: info.action}, sequenceName, combination, level);         // 815
                                                                                                              // 816
        // add this call back to the array                                                                    // 817
        // if it is a sequence put it at the beginning                                                        // 818
        // if not put it at the end                                                                           // 819
        //                                                                                                    // 820
        // this is important because the way these are processed expects                                      // 821
        // the sequence ones to come first                                                                    // 822
        _callbacks[info.key][sequenceName ? 'unshift' : 'push']({                                             // 823
            callback: callback,                                                                               // 824
            modifiers: info.modifiers,                                                                        // 825
            action: info.action,                                                                              // 826
            seq: sequenceName,                                                                                // 827
            level: level,                                                                                     // 828
            combo: combination                                                                                // 829
        });                                                                                                   // 830
    }                                                                                                         // 831
                                                                                                              // 832
    /**                                                                                                       // 833
     * binds multiple combinations to the same callback                                                       // 834
     *                                                                                                        // 835
     * @param {Array} combinations                                                                            // 836
     * @param {Function} callback                                                                             // 837
     * @param {string|undefined} action                                                                       // 838
     * @returns void                                                                                          // 839
     */                                                                                                       // 840
    function _bindMultiple(combinations, callback, action) {                                                  // 841
        for (var i = 0; i < combinations.length; ++i) {                                                       // 842
            _bindSingle(combinations[i], callback, action);                                                   // 843
        }                                                                                                     // 844
    }                                                                                                         // 845
                                                                                                              // 846
    // start!                                                                                                 // 847
    _addEvent(document, 'keypress', _handleKeyEvent);                                                         // 848
    _addEvent(document, 'keydown', _handleKeyEvent);                                                          // 849
    _addEvent(document, 'keyup', _handleKeyEvent);                                                            // 850
                                                                                                              // 851
    var Mousetrap = {                                                                                         // 852
                                                                                                              // 853
        /**                                                                                                   // 854
         * binds an event to mousetrap                                                                        // 855
         *                                                                                                    // 856
         * can be a single key, a combination of keys separated with +,                                       // 857
         * an array of keys, or a sequence of keys separated by spaces                                        // 858
         *                                                                                                    // 859
         * be sure to list the modifier keys first to make sure that the                                      // 860
         * correct key ends up getting bound (the last key in the pattern)                                    // 861
         *                                                                                                    // 862
         * @param {string|Array} keys                                                                         // 863
         * @param {Function} callback                                                                         // 864
         * @param {string=} action - 'keypress', 'keydown', or 'keyup'                                        // 865
         * @returns void                                                                                      // 866
         */                                                                                                   // 867
        bind: function(keys, callback, action) {                                                              // 868
            keys = keys instanceof Array ? keys : [keys];                                                     // 869
            _bindMultiple(keys, callback, action);                                                            // 870
            return this;                                                                                      // 871
        },                                                                                                    // 872
                                                                                                              // 873
        /**                                                                                                   // 874
         * unbinds an event to mousetrap                                                                      // 875
         *                                                                                                    // 876
         * the unbinding sets the callback function of the specified key combo                                // 877
         * to an empty function and deletes the corresponding key in the                                      // 878
         * _directMap dict.                                                                                   // 879
         *                                                                                                    // 880
         * TODO: actually remove this from the _callbacks dictionary instead                                  // 881
         * of binding an empty function                                                                       // 882
         *                                                                                                    // 883
         * the keycombo+action has to be exactly the same as                                                  // 884
         * it was defined in the bind method                                                                  // 885
         *                                                                                                    // 886
         * @param {string|Array} keys                                                                         // 887
         * @param {string} action                                                                             // 888
         * @returns void                                                                                      // 889
         */                                                                                                   // 890
        unbind: function(keys, action) {                                                                      // 891
            return Mousetrap.bind(keys, function() {}, action);                                               // 892
        },                                                                                                    // 893
                                                                                                              // 894
        /**                                                                                                   // 895
         * triggers an event that has already been bound                                                      // 896
         *                                                                                                    // 897
         * @param {string} keys                                                                               // 898
         * @param {string=} action                                                                            // 899
         * @returns void                                                                                      // 900
         */                                                                                                   // 901
        trigger: function(keys, action) {                                                                     // 902
            if (_directMap[keys + ':' + action]) {                                                            // 903
                _directMap[keys + ':' + action]({}, keys);                                                    // 904
            }                                                                                                 // 905
            return this;                                                                                      // 906
        },                                                                                                    // 907
                                                                                                              // 908
        /**                                                                                                   // 909
         * resets the library back to its initial state.  this is useful                                      // 910
         * if you want to clear out the current keyboard shortcuts and bind                                   // 911
         * new ones - for example if you switch to another page                                               // 912
         *                                                                                                    // 913
         * @returns void                                                                                      // 914
         */                                                                                                   // 915
        reset: function() {                                                                                   // 916
            _callbacks = {};                                                                                  // 917
            _directMap = {};                                                                                  // 918
            return this;                                                                                      // 919
        },                                                                                                    // 920
                                                                                                              // 921
       /**                                                                                                    // 922
        * should we stop this event before firing off callbacks                                               // 923
        *                                                                                                     // 924
        * @param {Event} e                                                                                    // 925
        * @param {Element} element                                                                            // 926
        * @return {boolean}                                                                                   // 927
        */                                                                                                    // 928
        stopCallback: function(e, element) {                                                                  // 929
                                                                                                              // 930
            // if the element has the class "mousetrap" then no need to stop                                  // 931
            if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {                                // 932
                return false;                                                                                 // 933
            }                                                                                                 // 934
                                                                                                              // 935
            // stop for input, select, and textarea                                                           // 936
            return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || element.isContentEditable;
        },                                                                                                    // 938
                                                                                                              // 939
        /**                                                                                                   // 940
         * exposes _handleKey publicly so it can be overwritten by extensions                                 // 941
         */                                                                                                   // 942
        handleKey: _handleKey                                                                                 // 943
    };                                                                                                        // 944
                                                                                                              // 945
    // expose mousetrap to the global object                                                                  // 946
    window.Mousetrap = Mousetrap;                                                                             // 947
                                                                                                              // 948
    // expose mousetrap as an AMD module                                                                      // 949
    if (typeof define === 'function' && define.amd) {                                                         // 950
        define(Mousetrap);                                                                                    // 951
    }                                                                                                         // 952
}) (window, document);                                                                                        // 953
                                                                                                              // 954
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/mousetrap:mousetrap/meteor/export.js                                                              //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
// expose Mousetrap to Meteor.js                                                                              // 1
if (typeof Package !== 'undefined') {                                                                         // 2
  /*global Mousetrap:true*/  // Meteor.js creates a file-scope global for exporting. This comment prevents a potential JSHint warning.
  Mousetrap = window.Mousetrap;                                                                               // 4
  delete window.Mousetrap;                                                                                    // 5
}                                                                                                             // 6
                                                                                                              // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("mousetrap:mousetrap", {
  Mousetrap: Mousetrap
});

})();
