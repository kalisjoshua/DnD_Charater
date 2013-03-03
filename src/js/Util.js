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
    return !isNaN(parseFloat(q)) && isFinite(q);
  }

  function isType (type, obj) {
    return (!!obj && type.test(obj.getType ? obj.getType() : {}.toString.call(obj)));
  }

  var util = {
          clone: clone
        , isNumeric: isNumeric
        , isType: isType
      };

  return "Array Function Object String"
    .split(" ")
    .reduce(function (acc, item) {
      acc["is" + item] = util.isType.bind(null, new RegExp(item.toLowerCase(), "i"));
      return acc;
    }, util);
});