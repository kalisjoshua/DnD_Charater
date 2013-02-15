/// polyfills.js

if (!Array.prototype.every) {
    Array.prototype.every = function (fun /*, thisp */) {
        "use strict";

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        var i = 0
            ,t = Object(this)
            ,len = t.length >>> 0
            ,thisp = arguments[1];

        if (typeof fun !== "function") {
            throw new TypeError();
        }

        for (; i < len; i++) {
            if (i in t && !fun.call(thisp, t[i], i, t)) {
                return false;
            }
        }

        return true;
    };
}

if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun /*, thisp */) {
        "use strict";

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        var t = Object(this)
            ,len = t.length >>> 0
            ,res = []
            ,thisp = arguments[1]
            ,val;

        if (typeof fun !== "function") {
            throw new TypeError();
        }

        for (var i = 0; i < len; i++) {
            if (i in t) {
                val = t[i]; // in case fun mutates this
                fun.call(thisp, val, i, t) && res.push(val);
            }
        }

        return res;
    };
}

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
        var T
            ,k = 0
            ,kValue;

        if (this == null) {
            throw new TypeError("'this' is null or not defined");
        }

        // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
        var O = Object(this)
        // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
            ,len = O.length >>> 0; // Hack to convert O.length to a UInt32

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if ({}.toString.call(callback) !== "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (thisArg) {
            T = thisArg;
        }

        // 6. Repeat, while k < len
        while (k < len) {
            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {
                // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                kValue = O[k];
                // ii. Call the Call internal method of callback with T as the this value and
                // argument list containing kValue, k, and O.
                callback.call(T, kValue, k, O);
            }
            k++;
        }

        // 7. return undefined
        return;
    };
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */) {
        "use strict";

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        var k
            ,n = 0
            ,t = Object(this)
            ,len = t.length >>> 0;

        if (len === 0) {
            return -1;
        }

        if (arguments.length > 0) {
            n = Number(arguments[1]);
            if (n !== n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }

        if (n >= len) {
            return -1;
        }

        k = n >= 0
            ? n
            : Math.max(len - Math.abs(n), 0);

        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }

        return -1;
    };
}

if (!Array.prototype.lastIndexOf) {
    Array.prototype.lastIndexOf = function (searchElement /*, fromIndex*/) {
        "use strict";

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        var k
            ,t = Object(this)
            ,len = t.length >>> 0
            ,n = len;

        if (len === 0) {
            return -1;
        }

        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n !== n) {
                n = 0;
            } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }

        k = n >= 0
            ? Math.min(n, len - 1)
            : len - Math.abs(n);

        for (; k >= 0; k--) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }

        return -1;
    };
}

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.com/#x15.4.4.19
if (!Array.prototype.map) {
    Array.prototype.map = function (callback, thisArg) {
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }

        var A
            ,k = 0
            ,kValue
            ,mappedValue
            // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
            ,O = Object(this)
            // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            ,len = O.length >>> 0
            ,T;

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if ({}.toString.call(callback) !== "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (thisArg) {
            T = thisArg;
        }

        // 6. Let A be a new array created as if by the expression new Array(len) where Array is
        // the standard built-in constructor with that name and len is the value of len.
        A = new Array(len);

        // 8. Repeat, while k < len
        while (k < len) {
            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {
                // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                kValue = O[k];
                // ii. Let mappedValue be the result of calling the Call internal method of callback
                // with T as the this value and argument list containing kValue, k, and O.
                mappedValue = callback.call(T, kValue, k, O);

                // iii. Call the DefineOwnProperty internal method of A with arguments
                // Pk, Property Descriptor {Value: mappedValue, Writable: true, Enumerable: true, Configurable: true},
                // and false.

                // In browsers that support Object.defineProperty, use the following:
                // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

                // For best browser support, use the following:
                A[k] = mappedValue;
            }
            k++;
        }

        // 9. return A
        return A;
    };      
}

if (!Array.prototype.reduce) {
    Array.prototype.reduce = function reduce(accumulator) {
        var i
            ,l = this.length
            ,curr;

        if (typeof accumulator !== "function") {
            // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
            throw new TypeError("First argument is not callable");
        }

        if (!!l && arguments.length <= 1) { // == on purpose to test 0 and false.
            throw new TypeError("Array length is 0 and no second argument");
        }

        if (arguments.length <= 1) {
            // Increase i to start searching the secondly defined element in the array
            curr = this[0];
            // start accumulating at the second element
            i = 1;
        } else {
            curr = arguments[1];
        }

        i = i || 0;
        for (; i < l ; ++i) {
            if (i in this) {
                curr = accumulator.call(undefined, curr, this[i], i, this);
            }
        }

        return curr;
    };
}

if (!Array.prototype.reduceRight) {
    Array.prototype.reduceRight = function (callbackfn /*, initialValue */) {
        "use strict";

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        var accumulator
            ,t = Object(this)
            ,len = t.length >>> 0
            ,k = len - 1;

        if (typeof callbackfn !== "function") {
            throw new TypeError();
        }

        // no value to return if no initial value, empty array
        if (len === 0 && arguments.length === 1) {
            throw new TypeError();
        }

        if (arguments.length >= 2) {
            accumulator = arguments[1];
        } else {
            do {
                if (k in this) {
                    accumulator = this[k--];
                    break;
                }

                // if array contains no values, no initial value to return
                if (--k < 0) {
                    throw new TypeError();
                }

            } while (true);
        }

        while (k >= 0) {
            if (k in t) {
                accumulator = callbackfn.call(undefined, accumulator, t[k], k, t);
            }

            k--;
        }

        return accumulator;
    };
}

if (!Array.prototype.some) {
    Array.prototype.some = function (fun /*, thisp */) {
        "use strict";

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        var i = 0
            ,t = Object(this)
            ,len = t.length >>> 0
            ,thisp = arguments[1];

        if (typeof fun !== "function") {
            throw new TypeError();
        }

        for (; i < len; i++) {
            if (i in t && fun.call(thisp, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

if (!Element.prototype.addEventListener) {
    var oListeners = {};

    function runListeners(oEvent) {
        if (!oEvent) { oEvent = window.event; }
        for (var iLstId = 0, iElId = 0, oEvtListeners = oListeners[oEvent.type]; iElId < oEvtListeners.aEls.length; iElId++) {
            if (oEvtListeners.aEls[iElId] === this) {
                for (iLstId; iLstId < oEvtListeners.aEvts[iElId].length; iLstId++) { oEvtListeners.aEvts[iElId][iLstId].call(this, oEvent); }
                break;
            }
        }
    }

    Element.prototype.addEventListener = function (sEventType, fListener /*, useCapture (will be ignored!) */) {
        if (oListeners.hasOwnProperty(sEventType)) {
            var oEvtListeners = oListeners[sEventType];

            for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
                if (oEvtListeners.aEls[iElId] === this) { nElIdx = iElId; break; }
            }

            if (nElIdx === -1) {
                oEvtListeners.aEls.push(this);
                oEvtListeners.aEvts.push([fListener]);
                this["on" + sEventType] = runListeners;
            } else {
                var aElListeners = oEvtListeners.aEvts[nElIdx];

                if (this["on" + sEventType] !== runListeners) {
                    aElListeners.splice(0);
                    this["on" + sEventType] = runListeners;
                }

                for (var iLstId = 0; iLstId < aElListeners.length; iLstId++) {
                    if (aElListeners[iLstId] === fListener) { return; }
                }

                aElListeners.push(fListener);
            }
        } else {
            oListeners[sEventType] = { aEls: [this], aEvts: [ [fListener] ] };
            this["on" + sEventType] = runListeners;
        }
    };

    Element.prototype.removeEventListener = function (sEventType, fListener /*, useCapture (will be ignored!) */) {
        if (!oListeners.hasOwnProperty(sEventType)) { return; }

        var oEvtListeners = oListeners[sEventType];

        for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
            if (oEvtListeners.aEls[iElId] === this) { nElIdx = iElId; break; }
        }

        if (nElIdx === -1) { return; }

        for (var iLstId = 0, aElListeners = oEvtListeners.aEvts[nElIdx]; iLstId < aElListeners.length; iLstId++) {
            if (aElListeners[iLstId] === fListener) { aElListeners.splice(iLstId, 1); }
        }
    };
}

if (!Object.keys) {
    // Object.prototype.keys = function (o) {
    //     if (o !== Object(o)) {
    //         throw new TypeError('Object.keys called on non-object');
    //     }

    //     var p
    //         ,result = [];

    //     for (p in o) {
    //         if (Object.prototype.hasOwnProperty.call(o,p)) {
    //             result.push(p);
    //         }
    //     }

    //     return result;
    // };
}

if (!Object.prototype.values) {
    // Object.prototype.values = function () {
    //     var result = []
    //         ,v;

    //     for (v in this) {
    //         Object.hasOwnProperty.call(this, v) && result.push(v);
    //     }

    //     return result;
    // };
}