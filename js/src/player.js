//// player.js

var Player = function (config) {
    return {
        "designation": (function (alpha, beta) {
            alpha = Util.clone(Reference.designation[alpha]);
            
            if (!beta) {
                return alpha;
            }
            
            beta  = Util.clone(Reference.designation[beta]);
            
            // dual-class designation
            var dual = {
                    "designation": {
                        alpha: alpha,
                        beta: beta
                    },
                    
                    "HDT": Math.round((alpha.HDT + beta.HDT) / 2),
                    
                    "prefs": (function (a, b) {
                        var result = [];
                        // weave the two skill priority arrays into one
                        while (a.length) {
                            result.push(a.shift(), b.shift());
                        }
                        
                        return Util.array.unique(result);
                    }(alpha.prefs.slice(0), beta.prefs.slice(0))),
                    
                    "saves": (function (a, b) {
                        var level,
                            result = [];
                        
                        while (a.length) {
                            level = [];
                            while (a[0].length) {
                                level.push(a[0][0] < b[0][0] ? a[0][0] : b[0][0]);
                                a[0].shift();
                                b[0].shift();
                            }
                            result.push(level);
                            a.shift();
                            b.shift();
                        }
                        
                        return result;
                    }(alpha.saves.slice(0), beta.saves.slice(0))),
                    
                    "spells": {
                        "alpha": alpha.spells,
                        "beta": beta.spells
                    },
                    
                    "thaco": (function (a, b) {
                        var result = [];
                        
                        while (a.length) {
                            result.push(a[0] < b[0] ? a[0] : b[0]);
                            a.shift();
                            b.shift();
                        }
                        
                        return result;
                    }(alpha.thaco.slice(0), beta.thaco.slice(0))),
                    
                    "title": alpha.title + "/" + beta.title
                };
            
            return dual;
            
        }(config.classPrimary || "", config.classSecondary || "")),
        
        "name": config.name || "g'Venn Oname",
        
        "race": Util.clone(Reference.race[config.race])
    };
};

