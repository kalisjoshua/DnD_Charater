/*jshint laxcomma:true*/
/*global define*/

define([      "roll", "util"
  ], function (roll,   util) {
  "use strict";

  var global = (function () {return this;}())
    , properties
    , validations;

  validations = [
    function dice (value) {
      return !!value && util.isNumeric(value);
    }

    , function min (value) {
      return !!value && util.isNumeric(value);
    }

    , function name (value) {
      return !!name && util.isString(value);
    }
  ];

  properties = validations
    .map(function (fn) {
      return fn.name;
    });

  function roll_stat (obj) {
    var result;

    do {
      result = Array.apply(null, Array(obj.dice))
        .map(roll.bind(null, "d6"))
        .sort()
        .slice(-3)
        .reduce(util.sum);
    } while (result < obj.min);

    return result;
  }

  function Station (config) {
    if (this === global) {
      // called as a function instead of a constructor - fix it!
      return new Station(config);
    }

    if (util.isValid(Station.prototype.getType(), config, validations)) {
      properties.forEach(util.addGetter.bind(null, this, config));
    }
  }

  Station.prototype = {
    column: function (num) {
      var indx = 0
        , result = [];

      if (num < 0 || num != +num || num != ~~num) {
        num = 1;
      }

      num = ~~num;

      do {
        result[indx] = [];

        while (result[indx].length < 7) {
          result[indx].push(roll_stat(this));
        }

        result[indx] = result[indx].sort(util.numericSort).reverse();
      } while (num > ++indx);

      return num === 1 ? result[0] : result;
    }

    ,getType: function () {

      return "[object Station]";
    }

    ,toString: function () {

      return this.name;
    }

    ,valueOf: function () {

      return JSON.stringify(this);
    }
  };

  return Station;
});