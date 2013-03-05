/*jshint laxcomma:true*/
/*global define*/

define([      "util"
  ], function (util) {
  "use strict";

  function Race (config) {
    if (!config.name || !util.isString(config.name)) {
      throw new Error("No '.name' property given in config passed into Race constructor.");
    }

    if (!util.isNumeric(config.infravision)) {
      throw new Error("Invalid '.infravision' property given in config passed into Race constructor (" + config.infravision + ").");
    }

    if (!config.languages.length || !util.isArray(config.languages)) {
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

    if (!util.isNumeric(config.move)) {
      throw new Error("Invalid '.move' property given in config passed into Race constructor (" + config.move + ").");
    }

    for (var attr in config) {
      this[attr] = config[attr];
    }
  }

  Race.prototype = {
    getType: function () {
      return "[object Race]";
    }

    ,toString: function () {
      return "Race: " + this.name;
    }
  };

  return Race;
});