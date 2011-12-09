//// core.js

var dnd = {}

    ,dndError = function (settings) {
        console && console[settings.level || "error"](settings.args);

        if (settings.level !== "warn") {
            throw new Error("dnd Error - " + settings.fn + "(" + settings.args + ")");
        }
    }

    ,roll = function (num, faces) {
        var result = [];

        while (num > result.length) {
            result.push(parseInt(Math.random() * faces, 10) + 1);
        }

        return num === 1 ? result[0] : result;
    }

    ,Table = function () {}

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
            
            return (obj && obj.getType
                ? obj.getType()
                : Object.prototype.toString.call(obj)) === "[object " + type + "]";
        }
    };

Table.fn = Table.prototype = [];

Table.fn.add = function (ar) {
    if (Util.isArray(ar)) {
        this.push.apply(this, ar);
    }

    return this;
};

Table.fn.each = function (fn) {
    this.forEach(function (node, indx, orig) {
        fn(node, indx, orig);
    });

    return this;
};

Table.fn.getNames = function () {

    return this.map(function (node) {
        return node.name;
    });
};

Table.fn.named = function (key) {

    return this.filter(function (node) {
        return node.name === key;
    })[0];
};

Table.fn.numericSort = function (descending) {
    var result = this.sort(function (a, b) { return a - b; });

    return descending ? result.reverse() : result;
};

Table.fn.toString = function () {
    
    return "[object Table]";
};