/*jshint*/
/*global define*/

define([], function () {
  "use strict";

  function clone (obj) {
    var i
      , result = isType.call(null, "Array", obj) ? [] : {};
    
    for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        result[i] = isType.call(null, "Object", obj[i]) ? clone(obj[i]) : obj[i];
      }
    }
    
    return result;
  }

  function isNumeric (q) {
    return !isNaN(parseFloat(q)) && isFinite(q);
  }

  function isType (type, obj) {
    return (obj && obj.getType ? obj.getType() : {}.toString.call(obj)).indexOf(type);
  }

  return {
        clone     : clone.bind(null)
      , isArray   : isType.bind(null, "Array")
      , isNumeric : isNumeric.bind(null)
      , isObject  : isType.bind(null, "Object")
      , isString  : isType.bind(null, "String")
    };
});