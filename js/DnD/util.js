//// utils.js

prv.util = {
    array_sum: function (ar) {
        if (!prv.util.isArray(ar)) {
            throw $.error("type error");
        }
        
        var _ = ar.slice(0),
            result = 0;
        
        while (!!_.length) {
            if (prv.util.isNumeric(_[0])) {
                result += parseInt(_.shift(), 10);
            }
            else {
                result = false;
                break;
            }
        }
        
        return result;
    },

    isArray: function (q) {
        return prv.util.isType(q, "Array");
    },
    
    isNumeric: function (q) {
        return !isNaN(parseFloat(q)) && isFinite(q);
    },
    
    isObject: function (q) {
        return prv.util.isType(q, "Object");
    },

    isType: function (obj, type) {
        return Object.prototype.toString.call(obj) === "[object " + type + "]";
    },

    roll: function (num, faces) {
        var result = [];
        
        if (faces === undefined) {
            faces = num;
            num = 1;
        }
        
        while (num--) {
            result.push(parseInt(Math.random() * faces, 10) + 1);
        }
        
        return result;
    },
    
    stats: function (ness) {
        var column = function (fn) {
                var count = 7,
                    result = [];
            
                while (!!count--) {
                    result.push(fn());
                }
            
                return result.sort(function (a, b) {
                        return b - a;
                    });
            },
            
            echelon = {
                champion: function () {
                    var result;
                    
                    do {
                        result = prv.util.array_sum(roll(6, 6).sort().slice(3));
                    } while (result <= 7);
                    
                    return result;
                },
                
                hero: function () {
                    var result;
                    
                    do {
                        result = prv.util.array_sum(roll(4, 6).sort().slice(1));
                    } while (result <= 4);
                    
                    return result;
                },
                
                npc: function () {
                    var result;
                    
                    do {
                        result = prv.util.array_sum(roll(3, 6));
                    } while (result <= 4);
                    
                    return result;
                },
                
                player: function () {
                    var result;
                    
                    do {
                        result = prv.util.array_sum(roll(3, 6));
                    } while (result <= 7);
                    
                    return result;
                },
                
                pleab: function () {
                    return prv.util.array_sum(roll(3, 6));
                }
            };
        
        return column(echelon[ness] || echelon.hero);
    }
};

