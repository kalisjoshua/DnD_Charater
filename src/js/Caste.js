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

  function combinePrefs (a, b) {
    var i = 0
      , len = a.prefs.length
      , result = [];

    while (i < len) {
      if (!~result.indexOf(a.prefs[i])) {
        result.push(a.prefs[i]);
      }

      if (!~result.indexOf(b.prefs[i])) {
        result.push(b.prefs[i]);
      }

      i++;
    }

    return result;
  }

  function combineSaves (a, b) {

    return a.saves
      .map(function (_, level) {
        return _
          .reduce(function (acc, _, type) {
            acc.push(Math.min(a.saves[level][type], b.saves[level][type]));
            return acc;
          }, []);
      });
  }

  function combineSpells (a, b) {
    var result = [];

    result.push(a.spells ? a.spells : []);
    result.push(b.spells ? b.spells : []);

    return result;
  }

  function combineThaco (a, b) {
    return a.thaco
      .reduce(function (acc, _, indx) {
        acc.push(Math.min(a.thaco[indx], b.thaco[indx]));
        return acc;
      }, []);
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

    addGetter(this, config, "skills");
    addGetter(this, config, "spells");
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

  Caste.dual = function (a, b) {
    if (a === b || a === undefined || b === undefined) {
      throw new Error("Cannot dual Caste '" + a + "' with '" + b + "'.");
    }

    if (a.getType() !== Caste.prototype.getType()) {
      throw new Error("Caste.dual argument (alpha) is not an instance of Caste.");
    }

    if (b.getType() !== Caste.prototype.getType()) {
      throw new Error("Caste.dual argument (beta) is not an instance of Caste.");
    }

    return new Caste({
        // combining the two Caste instances
          name    : a.name + "/" + b.name
        , dual    : []
        , HDT     : (a.HDT + b.HDT) / 2
        , prefs   : combinePrefs(a, b)
        , saves   : combineSaves(a, b)
        , skills  : a.skills || b.skills
        , spells  : combineSpells(a, b)
        , thaco   : combineThaco(a, b)
      });
  };

  return Caste;
});