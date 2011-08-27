//// core.js

var dnd = {}

    ,Util = {
         clone: function(obj){
            var i,
                result = Util.isArray(obj) ? [] : {};
            
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    result[i] = Util.isObject(obj[i]) ? 
                        Util.clone(obj[i]) : 
                        obj[i];
                }
            }
            
            return result;
        }

        ,isArray: function (q) {
            return Util.isType(q, "Array");
        }
    
        ,isNumeric: function (q) {
            return !isNaN(parseFloat(q)) && isFinite(q);
        }
    
        ,isObject: function (q) {
            return Util.isType(q, "Object");
        }
    
        ,isString: function (q) {
            return Util.isType(q, "String");
        }

        ,isType: function (obj, type) {
            return Object.prototype.toString.call(obj) === "[object " + type + "]";
        }
    };

