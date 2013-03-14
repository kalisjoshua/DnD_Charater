/*jshint laxcomma:true*/
/*global define*/

define([      "traits", "util"
  ], function (traits,   util) {
  "use strict";

  function errString (arg, value) {
    return "Invalid '{a}' given in Abilities constructor: [{v}]."
      .replace("{a}", arg)
      .replace("{v}", value);
  }

  function optimize (column, prefs, bonuses) {
    return column;
  }

  function isValid (ar) {
    return util.isArray(ar) && ar.length === 7 && ar.every(util.isNumeric);
  }

  function isValidScores (ar) {
    return ar.every(function (value) {
        return value > 2 && value < 25;
      });
  }

  function Detail (column, prefs, bonuses) {
    if (!isValid(column) || !isValidScores(column)) {
      throw new Error(errString("column", column));
    }

    if (prefs && bonuses) {
      if (!isValid(prefs)) {
        throw new Error(errString("prefs", prefs));
      }

      if (!isValid(bonuses)) {
        throw new Error(errString("bonuses", bonuses));
      }

      column = optimize(column, prefs, bonuses);
    }
  }
  // get/set ability score
  // get original column values

  Detail.prototype = {
    getType: function () {
      return "[object Detail]";
    }
  };

});