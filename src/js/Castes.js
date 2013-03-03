/*jshint laxcomma:true*/
/*global define*/

define(["Collection", "roll"], function (Collection, roll) {
  "use strict";

  var allCastes = new Collection();

  function numericSort (a, b) {
    return a - b;
  }

  function sum (acc, cur) {
    return acc + cur;
  }

  function Caste (config) {
    // this is actually not necessary since it is a "privete" class
    if (this === (function () {return this;}())) {
      // called as a function instead of a constructor
      return new Caste(config);
    }

    if (!config.dice) {
      throw new Error("No 'dice' property passed into Caste constructor.");
    }

    if (!config.name) {
      throw new Error("No 'name' property passed into Caste constructor.");
    }

    if (!config.min) {
      throw new Error("No 'min' property passed into Caste constructor.");
    }
      
    for (var attr in config) {
      this[attr] = config[attr];
    }
  }

  Caste.prototype = {
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
          result[indx].push(this.roll());
        }

        result[indx] = result[indx].sort(numericSort).reverse();
      } while (num > ++indx);

      return num === 1 ? result[0] : result;
    }

    ,getType: function () {
        
      return "[object Caste]";
    }

    ,roll: function () {
      var result;

      do {
        result = Array.apply(null, Array(this.dice))
          .map(roll.bind(null, "d6"))
          .sort()
          .slice(-3)
          .reduce(sum);
      } while (result < this.min);

      return result;
    }

    ,toString: function () {

      return this.name;
    }

    ,valueOf: function () {

      return "{name: '" + this.name + "'}";
    }
  };

  allCastes
    .add([
       new Caste({name: "Champion", dice: 6, min: 7})
      ,new Caste({name: "Hero"    , dice: 4, min: 4})
      ,new Caste({name: "npc"     , dice: 3, min: 4})
      ,new Caste({name: "Player"  , dice: 3, min: 7})
      ,new Caste({name: "Pleb"    , dice: 3, min: 3})
    ]);

  return allCastes;
});