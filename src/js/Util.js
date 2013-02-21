/*jshint*/
/*global define*/

define([], function () {
  "use strict";

  var Util = {
       clone: function(obj){
          var i, result = Util.isArray(obj) ? [] : {};
          
          for (i in obj) {
            if (obj.hasOwnProperty(i)) {
              result[i] = Util.isObject(obj[i]) ? Util.clone(obj[i]) : obj[i];
            }
          }
          
          return result;
        }

        ,isNumeric: function (q) {

          return !isNaN(parseFloat(q)) && isFinite(q);
        }

        ,isType: function (type, obj) {
            
          return (obj && obj.getType ? obj.getType() : {}.toString.call(obj)).indexOf(type);
        }
      };

  Util.isArray  = Util.isType.bind(null, "Array");
  Util.isObject = Util.isType.bind(null, "Object");
  Util.isString = Util.isType.bind(null, "String");

  return Util;
});