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
        return config.table.slice(0);
      });
    }
  }

  Ability.prototype = {
    details: function (score) {
      if (!this.table[score]) {
        throw new Error("Must pass in a valid score to get details for an Ability.");
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