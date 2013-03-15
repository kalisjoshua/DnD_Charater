/*jshint laxcomma:true*/
/*global define*/

define([      "traits", "util"
  ], function (traits,   util) {
  "use strict";

  var global = (function () {return this;}())
    , properties
    , validations;

  validations = [
    function name (value) {
      return !value || util.isString(value);
    }

    , function caste (value) {
      return !!value && value.getType && /object caste/i.test(value.getType());
    }

    , function level (value) {
      return util.isNumeric(value);
    }

    , function options (value) {
      return !value || util.isObject(value);
    }

    , function race (value) {
      return !!value && value.getType && /object race/i.test(value.getType());
    }

    , function scores (value) {
      return !!value && value.length === 7 && value.every(util.isNumeric);
    }
  ];

  properties = validations.map(function (item) {
    return item.name;
  });

  function optimize (column, prefs, bonuses) {
    return column;
  }

  /* Player
    @param config - object
      name      (optional)    String

      caste(s)  (required)    Caste
      level     (required)    Integer
      race      (required)    Race
      scores    (required)    [Integer]

      options   (optional)    {racialBonuses, optimizeScores}

      station   (optional)    Station (phase II maybe? and for what?)
  */
  function Player (config) {
    if (this === global) {
      // called as a function instead of a constructor - fix it!
      return new Player(config);
    }

    var scores;

    this.isValid = util.isValid(Player.prototype.getType(), config, validations);

    if (this.isValid) {
      scores = optimize(config.scores, config.caste.prefs, config.race.stats);
    }
  }

  Player.prototype = {
    getType: function () {
      return "[object Player]";
    }
  };

  return Player;
});