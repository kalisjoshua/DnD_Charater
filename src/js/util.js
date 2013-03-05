/*jshint laxcomma: true*/
/*global define*/

define([], function () {
  "use strict";

  function clone (obj) {
    var i
      , result = util.isArray(obj) ? [] : {};

    for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        result[i] = util.isObject(obj[i]) ? clone(obj[i]) : obj[i];
      }
    }

    return result;
  }

  function isNumeric (q) {
    if (q == null) {
      return false;
    }

    if (q === true) {
      return false;
    }

    if (q instanceof Date) {
      return false;
    }

    if (q instanceof Boolean) {
      return false;
    }

    if ("" === "".replace.call(q, /^\s+|\s+$/g, "")) {
      return false;
    }

    return (!isNaN(parseFloat(q)) || !isNaN(Number(q))) && isFinite(q);
  }

  function isType (type, obj) {
    return ((!!obj || obj === '') && type.test(obj.getType ? obj.getType() : ({}).toString.call(obj)));
  }

  function sortAscending (a, b) {
    return a - b;
  }

  function sortDescending (a, b) {
    return b - a;
  }

  var util = {
          clone       : clone
        , isNumeric   : isNumeric
        , isType      : isType
        , sort        : {
           asc    : sortAscending
          ,desc   : sortDescending
        }
      };

  return "Array Function String"
    .split(" ")
    .reduce(function (acc, item) {
      acc["is" + item] = util.isType.bind(null, new RegExp(item));
      return acc;
    }, util);
});