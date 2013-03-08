/*jshint laxcomma:true*/
/*global define*/

define([      "util"
  ], function (util) {
  "use strict";

  var validations
    , properties;

  validations = {
    // return true if the 'value' is valid
      name: function (value) {
      return util.isString(value) && value.length > 0;
    }

    , dual: function (value) {
      return util.isArray(value);
    }

    , HDT: function (value) {
      return util.isNumeric(value) && value > 2;
    }

    , prefs: function (value) {
      return util.isArray(value) && value.length === 7;
    }

    , saves: function (value) {
      return util.isArray(value) && value.length === 23;
    }

    , thaco: function (value) {
      return util.isArray(value) && value.length === 25;
    }
  };

  properties = Object.keys(validations);

  function propertyAccess (obj, config, prop, value, set) {
    // set is only accessible from within the constructor function
    // all arguments are bound in public methods so the values can't be changed
    if (arguments.length > 3 && set) {

      // a value argument was provided, the user is attempting to set the value in config
      if (!validations[prop](value)) {

        // validation fails, throw an error
        throw new Error("Attempting to set invalid '{p}' property [{v}] in {c}."
          .replace("{p}", prop)
          .replace("{v}", value)
          .replace("{c}", Caste.prototype.getType()));
      } else {

        // the value is good, set it in config object
        config[prop] = value;
      }
    } else {

      // only prop is provided, the user is only asking for the value in the config
      return util.isArray(config[prop]) ? config[prop].slice(0) : config[prop];
    }

    return config;
  }

  function Caste (config) {
    if (this === (function () {return this;}())) {
      // called as a function instead of a constructor - fix it!
      return new Caste(config);
    }

    properties
      .forEach(function (prop) {
        // setup property methods to do get requests
        propertyAccess(this, config, prop, config[prop], true);
        // using bind prevents the values from being provided and thus properties cannot be changed
        this[prop] = propertyAccess.bind(null, this, config, prop, false, false);
      }.bind(this));
  }

  Caste.prototype = {
    getType: function () {

      return "[object Caste]";
    }

    ,properties: properties

    ,toString: function () {

      return this.name();
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