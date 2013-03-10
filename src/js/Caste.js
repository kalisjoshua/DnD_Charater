/*jshint laxcomma:true es5:true*/
/*global define*/

define([      "util"
  ], function (util) {
  "use strict";

  var global = (function () {return this;}())
    , properties
    , validations;

  validations = [
    // return true if valid
      function name (value) {
      return util.isString(value) && value.length > 0;
    }

    , function dual (value) {
      return util.isArray(value);
    }

    , function HDT (value) {
      return util.isNumeric(value) && value > 2;
    }

    , function prefs (value) {
      return util.isArray(value) && value.length === 7;
    }

    , function saves (value) {
      return util.isArray(value) && value.length === 23;
    }

    , function thaco (value) {
      return util.isArray(value) && value.length === 25;
    }
  ];

  properties = validations
    .map(function (fn) {
      return fn.name;
    });

  function _prop (o, p) {
    return o[p];
  }

  function _prop_slice (o, p) {
    return _prop(o, p).slice(0);
  }

  function addGetter (obj, config, prop) {
    var fn = util.isArray(config[prop]) ? _prop_slice : _prop;
    obj.__defineGetter__(prop, fn.bind(null, config, prop));
  }

  // expected to be used in Array.every for validation
  function checkProp (type, config, fn) {
    var prop = fn.name;

    if (!fn(config[prop])) {
      throw new Error("Attempting to set invalid '{p}' property [{v}] in {t}."
        .replace("{p}", prop)
        .replace("{v}", config[prop])
        .replace("{t}", type));
    }

    return true; // no error thrown, all is well.
  }

  function isValid (type, config, validations) {

    return validations
      .every(checkProp.bind(null, type, config));
  }

  function Caste (config) {
    if (this === global) {
      // called as a function instead of a constructor - fix it!
      return new Caste(config);
    }

    if (isValid(Caste.prototype.getType(), config, validations)) {
      properties.forEach(addGetter.bind(null, this, config));
    }
  }

  Caste.prototype = {
    getType: function () {

      return "[object Caste]";
    }

    ,get properties () {

      return properties;
    }

    ,toString: function () {

      return this.name;
    }
  };

  Caste.dual = function () {};

  // allClasses.merge = function (_a, _b) {
  //   if ((_b === undefined || _b === "") && !!allClasses.named(_a)) {
  //     return allClasses.named(_a);
  //   }

  //   if (_a === _b || _a === undefined || !allClasses.named(_a) || !allClasses.named(_b)) {
  //     throw new Error("Invalid arguments passed to Classes.merge(): " + [_a, _b]);
  //   }

  //   _a = allClasses.named(_a);
  //   _b = allClasses.named(_b);

  //   return new Caste({
  //      name: _a.name + "/" + _b.name

  //     ,dual: []

  //     ,HDT: (_a.HDT + _b.HDT) / 2

  //     ,prefs: (function (a, b) {
  //       var  i = 0
  //           ,l = a.length
  //           ,result = [];

  //       for ( ; i < l; i++) {
  //         result.indexOf(a[i]) === -1 && result.push(a[i]);
  //         result.indexOf(b[i]) === -1 && result.push(b[i]);
  //       }

  //       return result;
  //     }(_a.prefs, _b.prefs))

  //     ,saves: (function (a, b) {
  //       var level = [],
  //           result = [];

  //       while (result.length < a.length) {
  //         level = [];

  //         while (level.length < a[0].length) {
  //           level.push(a[result.length][level.length] < b[result.length][level.length] ? a[result.length][level.length] : b[result.length][level.length]);
  //         }

  //         result.push(level);
  //       }

  //       return result;
  //     }(_a.saves, _b.saves))

  //     ,spells: (function (a, b) {
  //       if (a || b) {
  //         return [a, b];
  //       }
  //     }(_a.spells, _b.spells))

  //     ,thaco: (function (a, b) {
  //       var indx = 0,
  //           result = [];

  //       while (indx < a.length) {
  //         result.push(a[indx] < b[indx] ? a[indx] : b[indx]);
  //         indx++;
  //       }

  //       return result;
  //     }(_a.thaco, _b.thaco))
  //   });
  // };

  return Caste;
});