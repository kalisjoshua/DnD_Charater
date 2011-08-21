//// ref_abilities.js

var Abilities = {
    _get: function (ability, score) {
        if (!Util.isValidAbilityScore(score)) {
            throw new Error("Invalid value passed to " + ability + "()");
        }
        return AbilityModifiers[ability][score];
    },

    Charisma: function (v) {
        return Abilities._get("Charisma", v);
    },

    Constitution: function (v) {
        return Abilities._get("Constitution", v);
    },

    Comeliness: function (v) {
        return Abilities._get("Comeliness", v);
    },

    Dexterity: function (v) {
        return Abilities._get("Dexterity", v);
    },

    Intelligence: function (v) {
        return Abilities._get("Intelligence", v);
    },

    Strength: function (v, e) {
        if (!Util.isValidAbilityScore(v) ||
            e !== undefined && !Util.isNumeric(e)) {
            throw new Error("Invalid value passed to Strength()");
        }

        e = parseInt(e, 10);

        if (v === 18 && e > 0) {
            if (e < 51) {         return [ 1,  3, 1000,   '3/6', 20]; // 18 / 01-50
            } else if (e < 76) {  return [ 2,  3, 1250,   '4/6', 25]; // 18 / 51-75
            } else if (e < 91) {  return [ 2,  4, 1500,   '4/6', 30]; // 18 / 76-90
            } else if (e < 100) { return [ 2,  5, 2000,   '4/6', 35]; // 18 / 91-99
            } else {              return [ 3,  6, 3000,   '5/6', 40];  // 18 / 100+
            }
        }
    
        return AbilityModifiers.Strength[v];
    },

    Wisdom: function (v) {
        return Abilities._get("Wisdom", v);
    }
};

