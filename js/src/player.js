//// player.js

var Player = function (config) {
    if (!config.Race || !config.alpha || !config.level) {
        return {"valid": false};
    }

    return {
        "Designation": (function (alpha, beta) {
            alpha = Util.clone(alpha);
            
            if (!beta) {
                return alpha;
            }
            
            beta  = Util.clone(beta);
            
            // dual-class Designation
            return {
                    "dual": {
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
                        var al = 0,
                            bl = 0,
                            level,
                            result = [];
                        
                        while (a.length > al) {
                            level = [];
                            bl = 0;
                            while (a[al].length > bl) {
                                level.push(a[al][bl] < b[al][bl] ? a[al][bl] : b[al][bl]);
                                bl++;
                            }
                            result.push(level);
                            al++;
                        }
                        
                        return result;
                    }(alpha.saves, beta.saves)),
                    
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
        }(config.alpha || "", config.beta || "")),

        "level": config.level,
        
        "name": config.name || "gi Venn Oname",
        
        "Race": Util.clone(config.Race),

        "valid": true
    };
};

