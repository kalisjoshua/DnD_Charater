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

    if (!util.isNumeric(config.move) || config.move < 0) {
      throw new Error("Invalid '.move' property given in config passed into Race constructor (" + config.move + ").");
    }

    if (!!config.notes && !util.isString(config.notes)) {
      throw new Error("Invalid '.notes' property given in config passed into Race constructor (" + config.notes + ").");
    }

    if (config.saves.length !== 5 || !config.saves.every(util.isNumeric)) {
      throw new Error("Invalid '.saves' property given in config passed into Race constructor (" + config.saves + ").");
    }

    if (config.stats.length !== 7 || !config.stats.every(util.isNumeric)) {
      throw new Error("Invalid '.stats' property given in config passed into Race constructor (" + config.stats + ").");
    }

    if (config.thieving.length !== 8 | !config.thieving.every(util.isNumeric)) {
      throw new Error("Invalid '.thieving' property given in config passed into Race constructor (" + config.thieving + ").");
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
      return this.name;
    }
  };

  return Race;
});