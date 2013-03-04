/*jshint laxcomma:true*/
/*global define*/

define([      "util"
  ], function (util) {
  "use strict";

  function Caste (config) {
    if (!config.name) {
      throw new Error("No '.name' property given in config passed into Caste constructor.");
    }

    if (!config.dual) {
      throw new Error("No '.dual' property given in config passed into Caste constructor.");
    }

    if (!util.isNumeric(config.HDT) || config.HDT < 4) {
      throw new Error("Invalid '.HDT' property given in config passed into Caste constructor (" + config.HDT + ").");
    }

    if (config.prefs.length !== 7) {
      throw new Error("Invalid '.prefs' property given in config passed into Caste constructor (" + config.prefs + ").");
    }

    if (config.saves.length !== 23) {
      throw new Error("Invalid '.saves' table-property given in config passed into Caste constructor (" + config.saves + ").");
    }

    if (config.thaco.length !== 25) {
      throw new Error("Invalid '.thaco' table-property given in config passed into Caste constructor (" + config.thaco + ").");
    }

    for (var attr in config) {
      this[attr] = config[attr];
    }
  }

  Caste.prototype = {
    getType: function () {

      return "[object Class]";
    }

    ,toString: function () {

      return this.name;
    }
  };

  // allClasses.merge = function (_a, _b) {
  //   if ((_b === undefined || _b === "") && !!allClasses.named(_a)) {
  //     return allClasses.named(_a);
  //   }

  //   if (_a === _b || _a === undefined || !allClasses.named(_a) || !allClasses.named(_b)) {
  //     throw new Error("Invalid arguments passed to Classes.merge(): " + [_a, _b]);
  //   }

  //   _a = allClasses.named(_a);
  //   _b = allClasses.named(_b);

  //   return new Caste({
  //      name: _a.name + "/" + _b.name

  //     ,dual: []

  //     ,HDT: (_a.HDT + _b.HDT) / 2

  //     ,prefs: (function (a, b) {
  //       var  i = 0
  //           ,l = a.length
  //           ,result = [];

  //       for ( ; i < l; i++) {
  //         result.indexOf(a[i]) === -1 && result.push(a[i]);
  //         result.indexOf(b[i]) === -1 && result.push(b[i]);
  //       }

  //       return result;
  //     }(_a.prefs, _b.prefs))

  //     ,saves: (function (a, b) {
  //       var level = [],
  //           result = [];

  //       while (result.length < a.length) {
  //         level = [];

  //         while (level.length < a[0].length) {
  //           level.push(a[result.length][level.length] < b[result.length][level.length] ? a[result.length][level.length] : b[result.length][level.length]);
  //         }

  //         result.push(level);
  //       }

  //       return result;
  //     }(_a.saves, _b.saves))

  //     ,spells: (function (a, b) {
  //       if (a || b) {
  //         return [a, b];
  //       }
  //     }(_a.spells, _b.spells))

  //     ,thaco: (function (a, b) {
  //       var indx = 0,
  //           result = [];

  //       while (indx < a.length) {
  //         result.push(a[indx] < b[indx] ? a[indx] : b[indx]);
  //         indx++;
  //       }

  //       return result;
  //     }(_a.thaco, _b.thaco))
  //   });
  // };

  return Caste;
});