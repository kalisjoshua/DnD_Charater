/*jshint laxcomma:true*/
/*global define*/

define([      "roll"
  ], function (roll) {
  "use strict";

  function numericSort (a, b) {
    return a - b;
  }

  function roll_stat (obj) {
    var result;

    do {
      result = Array.apply(null, Array(obj.dice))
        .map(roll.bind(null, "d6"))
        .sort()
        .slice(-3)
        .reduce(sum);
    } while (result < obj.min);

    return result;
  }

  function sum (acc, cur) {
    return acc + cur;
  }

  function Rank (config) {
    if (this === (function () {return this;}())) {
      // called as a function instead of a constructor
      return new Rank(config);
    }

    if (!config.dice) {
      throw new Error("No 'dice' property passed into Rank constructor.");
    }

    if (!config.name) {
      throw new Error("No 'name' property passed into Rank constructor.");
    }

    if (!config.min) {
      throw new Error("No 'min' property passed into Rank constructor.");
    }

    for (var attr in config) {
      this[attr] = config[attr];
    }
  }

  Rank.prototype = {
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

        result[indx] = result[indx].sort(numericSort).reverse();
      } while (num > ++indx);

      return num === 1 ? result[0] : result;
    }

    ,getType: function () {

      return "[object Rank]";
    }

    ,toString: function () {

      return this.name;
    }

    ,valueOf: function () {

      return JSON.stringify(this);
    }
  };

  return Rank;
});