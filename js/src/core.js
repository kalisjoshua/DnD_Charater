//// core.js

var dnd = 
    window.dnd = {
        PC: {
            create: function (config) {
                console.log(Player(config));
                return Player(config);
            }
        },
        
        roll: function () {
            return Util.roll.apply(null, arguments);
        },
        
        ui_init: function () {
            UI.setup();
        }
    },
    
    Util = {
        array: {
            sum: function (ar) {
                if (!Util.isArray(ar)) {
                    throw $.error("type error");
                }
        
                var _ = ar.slice(0),
                    result = 0;
        
                while (!!_.length) {
                    if (Util.isNumeric(_[0])) {
                        result += parseInt(_.shift(), 10);
                    }
                    else {
                        result = false;
                        break;
                    }
                }
        
                return result;
            },
            
            unique: function (a) {
                var f = {},
                    i = 0,
                    l = a.length,
                    r = [];

                while (i < l) {
                    !f[a[i]] && r.push(a[i]);
                    f[a[i++]] = 1;
                }
                
                return r;
            }
        },
    
        Caste: {
            champion: function () {
                var result;
            
                do {
                    result = Util.array.sum(dnd.roll(6, 6).sort().slice(3));
                } while (result <= 7);
            
                return result;
            },
        
            hero: function () {
                var result;
            
                do {
                    result = Util.array.sum(dnd.roll(4, 6).sort().slice(1));
                } while (result <= 4);
            
                return result;
            },
        
            npc: function () {
                var result;
            
                do {
                    result = Util.array.sum(dnd.roll(3, 6));
                } while (result <= 4);
            
                return result;
            },
        
            player: function () {
                var result;
            
                do {
                    result = Util.array.sum(dnd.roll(3, 6));
                } while (result <= 7);
            
                return result;
            },
        
            pleb: function () {
                return Util.array.sum(dnd.roll(3, 6));
            }
        },
        
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
        },

        isArray: function (q) {
            return Util.isType(q, "Array");
        },
    
        isNumeric: function (q) {
            return !isNaN(parseFloat(q)) && isFinite(q);
        },
    
        isObject: function (q) {
            return Util.isType(q, "Object");
        },

        isType: function (obj, type) {
            return Object.prototype.toString.call(obj) === "[object " + type + "]";
        },

        isValidAbilityScore: function (v) {
            if (Util.isNumeric(v)) {
                v = parseFloat(v, 10);
            }
            return v !== undefined && v < 25 && v > 2 && Math.floor(v) === v;
        },
        
        languages: function (ar) {
            var result = [];
            while (ar.length) {
                result.push(Reference.languages[ar.shift()]);
            }
            return result;
        },

        roll: function (num, faces) {
            var result = [];

            if (num === undefined ||
                !Util.isNumeric(num) ||
                (num = parseInt(num, 10) || 0) < 1 ||
                faces === undefined && num < 2 ||
                faces !== undefined && !Util.isNumeric(faces) ||
                Util.isNumeric(faces) && faces < 2) {
                throw new Error("Invalid arguments passed to roll(). " + arguments);
            }
        
            if (faces === undefined) {
                faces = num;
                num = 1;
            } else {
                faces = parseInt(faces, 10);
            }
        
            while (num--) {
                result.push(parseInt(Math.random() * faces, 10) + 1);
            }
        
            return result;
        },
    
        stats: function (caste) {
            var column = function (fn) {
                    var count = 7,
                        result = [];
            
                    while (!!count--) {
                        result.push(fn());
                    }
            
                    return result.sort(function (a, b) {
                            return b - a;
                        });
                };
        
            return column(Util.caste[caste] || Util.caste.hero);
        }
    };

