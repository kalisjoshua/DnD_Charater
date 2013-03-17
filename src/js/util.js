/*jshint laxcomma: true*/
/*global define*/

define([], function () {
  "use strict";

  function addGetter (obj, config, prop) {
    function _prop () {
      return config[prop];
    }

    function _prop_slice() {
      return _prop().slice(0);
    }

    obj.__defineGetter__(prop, util.isArray(config[prop]) ? _prop_slice : _prop);
  }

  // expected to be used in Array.every for validation
  function checkProp (type, config, fn) {
    var prop  = fn.name
      , value = config[prop];

    if (!fn(value)) {
      throw new Error("Attempting to set invalid '{p}' property [{v}] in {t}."
        .replace("{p}", prop)
        .replace("{v}", value)
        .replace("{t}", type));
    }

    return true; // no error thrown, all is well.
  }

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

  function isValid (type, config, validations) {

    return validations.every(checkProp.bind(null, type, config));
  }

  function numericSort (a, b) {

    return a - b;
  }

  function sortAscending (a, b) {

    return a - b;
  }

  function sortDescending (a, b) {

    return b - a;
  }

  function sum (acc, cur) {

    return acc + cur;
  }

  var util = {
          addGetter   : addGetter
        , checkProp   : checkProp
        , clone       : clone
        , global      : (function () {return this;}())
        , isNumeric   : isNumeric
        , isType      : isType
        , isValid     : isValid
        , numericSort : numericSort
        , sort        : {
           asc    : sortAscending
          ,desc   : sortDescending
        }
        , sum         : sum
      };

  return "Array Function String"
    .split(" ")
    .reduce(function (acc, item) {
      acc["is" + item] = util.isType.bind(null, new RegExp(item));
      return acc;
    }, util);
});