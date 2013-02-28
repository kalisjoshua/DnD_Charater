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
    if (!config.name) {
      throw new Error({
        args: arguments
        ,fn: "Caste constructor"
      });
    }
      
    for (var attr in config) {
      this[attr] = config[attr];
    }
  }

  Caste.prototype = {
    column: function (num) {
      var indx = 0
        , result = [];

      // FIXME: I do not think this is what I think it is and should probably be removed.
      num |= 1;

      while (num > indx) {
        result[indx] = [];

        while (result[indx].length < 7) {
          result[indx].push(this.roll());
        }

        result[indx] = result[indx].sort(numericSort).reverse();

        indx++;
      }

      return num === 1 ? result[0] : result;
    }

    ,getType: function () {
        
      return "[object Caste]";
    }

    ,roll: function () {
      var result;

      do {
        result = roll(this.dice, 6)
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