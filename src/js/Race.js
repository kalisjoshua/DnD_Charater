/*jshint laxcomma:true*/
/*global define*/

define([      "util"
  ], function (util) {
  "use strict";

  var global = (function () {return this;}())
    , properties
    , validations;

  validations = [
    function name (value) {
      return !!value && util.isString(value);
    }

    , function infravision (value) {
      return util.isNumeric(value);
    }

    , function languages (value) {
      return !!value.length && util.isArray(value);
    }

    , function move (value) {
      return util.isNumeric(value) && value > 0;
    }

    , function notes (value) {
      return value === "" || util.isString(value);
    }

    , function saves (value) {
      return value.length === 5 && value.every(util.isNumeric);
    }

    , function stats (value) {
      return value.length === 7 && value.every(util.isNumeric);
    }

    , function thieving (value) {
      return value.length === 8 && value.every(util.isNumeric);
    }
  ];

  properties = validations
    .map(function (fn) {
      return fn.name;
    });

  function Race (config) {
    if (this === global) {
      // called as a function instead of a constructor - fix it!
      return new Race(config);
    }

    if (util.isValid(Race.prototype.getType(), config, validations)) {
      properties.forEach(util.addGetter.bind(null, this, config));
    }
  }

  Race.prototype = {
    getType: function () {
      return "[object Race]";
    }

    ,toString: function () {
      return this.name;
    }
  };

  return Race;
});