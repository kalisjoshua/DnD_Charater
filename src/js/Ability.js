/*jshint laxcomma:true*/
/*global define*/

define([      "util"
  ], function (util) {
  "use strict";

  var global = (function () {return this;}())
    , validations;

  validations = [
    function name (value) {
      return !!value && util.isString(value);
    }

    , function detail (value) {
      return !!value && util.isString(value);
    }

    , function table (value) {
      return util.isArray(value) && value.length === 25;
    }
  ];

  function format (template, data) {
    return data.reduce(function (acc, item, indx) {
      return acc.replace("{" + indx + "}", item);
    }, template);
  }

  function isValidExceptional (value) {
    return util.isNumeric(value) && +value > 0 && +value < 101;
  }

  function Ability (config) {
    if (this === global) {
      // called as a function instead of a constructor - fix it!
      return new Ability(config);
    }

    if (util.isValid(Ability.prototype.getType(), config, validations)) {
      this.__defineGetter__("name", function () {
        return config.name;
      });

      this.__defineGetter__("detail", function () {
        return config.detail;
      });

      this.__defineGetter__("table", function () {
        return JSON.parse(JSON.stringify(config.table.slice(0)));
      });

      if (config.exceptional) {
        this.__defineGetter__("exceptional", function () {
          return JSON.parse(JSON.stringify(config.exceptional.slice(0)));
        });
      }
    }
  }

  Ability.prototype = {
    details: function (score, exceptional) {
      if (!this.table[score]) {
        throw new Error("Must pass in a valid score to get details for an Ability.");
      }

      if (this.name === "Strength" && score === 18 && arguments.length === 2) {
        if (!util.isNumeric(exceptional) || +exceptional < 1 || +exceptional > 100) {
          throw new Error("Must pass in a valid (1-100) exceptional strength value.");
        } else {
          return format(this.detail, this.exceptional
            // filter out the tables that 'exceptional' is not less than the max
            .filter(function (item) {
              return item.max >= exceptional;
            // return the lowest table that the exceptional value falls into
            })[0].table);
        }
      }

      return format(this.detail, this.table[score]);
    }

    , getType: function () {
      return "[object Ability]";
    }

    , toString: function () {
      return this.name;
    }
  };

  return Ability;
});