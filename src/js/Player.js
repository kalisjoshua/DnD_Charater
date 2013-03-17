/*jshint laxcomma:true*/
/*global define*/

define([      "traits", "util"
  ], function (traits,   util) {
  "use strict";

  var properties
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

  function countBonuses (ar) {
    return ar.filter(function (item) {
        return item > 0;
      }).length;
  }

  function countNumber (num, ar) {
    return ar.filter(function (item) {
        return item === num;
      }).length;
  }

  function distributeScores (config) {
    var bonuses   = config.addBonus ? config.race.stats.slice(0) : [0,0,0,0,0,0,0]
      , column    = config.scores.slice(0)
      , prefs     = config.caste.prefs;

    return prefs
      .reduce(function (bonuses, prefsIndex, indx) {
        // max initial score of 18
        bonuses[prefsIndex] = Math.min(18, column[indx] + bonuses[prefsIndex]);
        return bonuses;
      }, bonuses);
  }

  function hasPriorityBonuses (bonuses, prefs) {
    return prefs
      // check the n priority traits where n is the number of bonuses, otherwise
      // all characters with any bonuses would evaluate to having priority bonuses
      .slice(0, countBonuses(bonuses))
      .reduce(function (acc, traitIndex) {
        return acc || bonuses[traitIndex] > 0;
      }, false);
  }

  function numberOfOptimization (bonuses, column) {
    return Math.min(countBonuses(bonuses), countNumber(17, column));
  }

  // rule: bonus cannot put initial score above 18
  // rule: if bonus would put strength over 18, add extra roll for exceptional
  // if a bonus on a higher trait would allow for swapping with a lower with no
  // overall loss of points due to the swap.
  function optimizer (config) {
    var bonuses   = config.addBonus ? config.race.stats : [0,0,0,0,0,0,0]
      , column    = config.scores.slice(0).sort(util.sort.desc)
      , num17     = numberOfOptimization(bonuses, column)
      , num18     = countNumber(18, column)
      , prefs     = config.caste.prefs;

    // if optimizations exist
    // if bonuses are on prioritized traits according to prefs
    // push the number of 18s below the number of 17s in the array
    if (num17 && hasPriorityBonuses(bonuses, prefs)) {
      column = column.slice(num18, (num17 + num18)) // the set of 17s
        .concat(column.slice(0, num18))             // the set of 18s
        .concat(column.slice(num17 + num18));       // the rest
    }

    return column;
  }

  /* Player
    @param config - object
      name      (optional)    String

      caste(s)  (required)    Caste
      level     (required)    Integer
      race      (required)    Race
      scores    (required)    [Integer]

      addBonus  (optional)    Boolean
      optimize  (optional)    Boolean

      station   (optional)    Station (phase II maybe? and for what?)
  */
  function Player (config) {
    if (this === util.global) {
      // called as a function instead of a constructor - fix it!
      return new Player(config);
    }
    var bonuses   = config.addBonus ? config.race.stats.slice(0) : [0,0,0,0,0,0,0]
      , column    = config.scores.slice(0)
      , prefs     = config.caste.prefs;

    this.isValid = util.isValid(Player.prototype.getType(), config, validations);

    if (this.isValid) {
      config.scores = config.optimize ? optimizer(config) : config.scores;
      config.scores = distributeScores(config);

      this.scores = config.scores;
    }
  }

  Player.prototype = {
    getType: function () {
      return "[object Player]";
    }
  };

  return Player;
});