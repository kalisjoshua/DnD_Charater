/*jshint laxcomma:true bitwise:false*/
/*global define*/

define(["Collection", "Util"], function (Collection, Util) {
  "use strict";

  var languages = [
          "burrowing mammal"
        , "dwarven"
        , "elvish"
        , "gnoll"
        , "gnome"
        , "goblin"
        , "halfling"
        , "hobgoblin"
        , "kobold"
        , "orcish"
        , "common"
      ]

    , racesConfigs =  [
        {
            name        : "Dwarf"
          , infravision : 60
          , languages   : [4, 5, 8, 9]
          , move        : 6
          , notes       : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con"
          , saves       : [1, 0, 1, 0, 1]
          , stats       : [0, 0, 0, 0, 1, -1, 0]
          , thieving    : [0, 10, 15, 0, 0, 0, -10, -5]
        }

        , {
            name        : "Elf"
          , infravision : 60
          , languages   : [3, 4, 5, 6, 7, 9]
          , move        : 12
          , notes       : ""
          , saves       : [0, 0, 0, 0, 0]
          , stats       : [0, 0, 0, 1, -1, 0, 0]
          , thieving    : [5, -5, 0, 5, 10, 5, 0, 0]
        }

        , {
            name        : "Gnome"
          , infravision : 60
          , languages   : [0, 1, 6, 5, 8]
          , move        : 6
          , notes       : "+1 on saves(rsw, sp) for each 3 1/2 of con"
          , saves       : [0, 0, 1, 0, 1]
          , stats       : [-1, 0, 0, 1, 0, 0, 0]
          , thieving    : [0, 5, 10, 5, 5, 10, 15, 0]
        }

        , {
            name        : "Goblin"
          , infravision : 30
          , languages   : [1, 3, 7, 8]
          , move        : 8
          , notes       : ""
          , saves       : [0, 0, 0, 0, 0]
          , stats       : [-1, 1, 0, 1, 0, -1, 0]
          , thieving    : [ 0, 15, 10, 0, 0, 15, 0, 15]
        }

        , {
            name        : "Half-Elf"
          , infravision : 60
          , languages   : [3, 4, 5, 6, 7, 9]
          , move        : 12
          , notes       : ""
          , saves       : [0, 0, 0, 0, 0]
          , stats       : [0, 0, 0, 0, 0, 0, 0]
          , thieving    : [10, 0, 0, 5, 0, 0, 0, 0]
        }

        , {
            name        : "Half-Orc"
          , infravision : 60
          , languages   : [9]
          , move        : 12
          , notes       : ""
          , saves       : [0, 0, 0, 0, 0]
          , stats       : [1, 0, 0, 0, 1, -1, 0]
          , thieving    : [ -5, 5, 5, 0, 0, 5, 5, -10]
        }

        , {
            name        : "Halfling"
          , infravision : 30
          , languages   : [1, 2, 4, 5, 9]
          , move        : 6
          , notes       : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con"
          , saves       : [1, 0, 1, 0, 1]
          , stats       : [-1, 0, 0, 1, 0, 0, 0]
          , thieving    : [ 5, 5, 5, 10, 15, 5, -15, -5]
        }

        , {
            name        : "Human"
          , infravision : 0
          , languages   : [10]
          , move        : 12
          , notes       : ""
          , saves       : [0, 0, 0, 0, 0]
          , stats       : [0, 0, 0, 0, 0, 0, 0]
          , thieving    : [0, 0, 0, 0, 0, 0, 0, 0]
        }
      ];

  function pickLanguages (languages, ar) {

    return [languages[~~ar.shift()]]
      .concat(!ar.length ? [] : pickLanguages(languages, ar));
  }

  function Race (config) {
    if (!config.name) {
      throw new Error("No '.name' property given in config passed into Race constructor.");
    }

    if (!Util.isNumeric(config.infravision)) {
      throw new Error("Invalid '.infravision' property given in config passed into Race constructor (" + config.infravision + ").");
    }

    if (!config.languages.length) {
      throw new Error("Invalid '.languages' property given in config passed into Race constructor (" + config.laguages + ").");
    }

    if (config.saves.length !== 5) {
      throw new Error("Invalid '.saves' property given in config passed into Race constructor (" + config.saves + ").");
    }

    if (config.stats.length !== 7) {
      throw new Error("Invalid '.stats' property given in config passed into Race constructor (" + config.stats + ").");
    }

    if (config.thieving.length !== 8) {
      throw new Error("Invalid '.thieving' property given in config passed into Race constructor (" + config.thieving + ").");
    }

    if (!Util.isNumeric(config.move)) {
      throw new Error("Invalid '.move' property given in config passed into Race constructor (" + config.move + ").");
    }

    for (var attr in config) {
      this[attr] = attr === "languages" ? pickLanguages(languages, config[attr]) : config[attr];
    }
  }

  Race.prototype = {
    getType: function () {
        
      return "[object Race]";
    }

    ,toString: function () {

      return "Race";
    }
  };

  return new Collection(racesConfigs
    .map(function (config) {
      return new Race(config);
    }));
});