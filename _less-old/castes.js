//// castes.js

var Castes = (function () {
    var Caste = function (config) {
            if (!config.name) {
                dndError({
                    args: arguments
                    ,fn: "Caste constructor"
                });
            }
            
            for (var attr in config) {
                this[attr] = config[attr];
            }
        };

    Caste.prototype = {
        column: function (num) {
            var indx = 0
                ,result = [];

            num |= 1;

            while (num > indx) {
                result[indx] = [];

                while (result[indx].length < 7) {
                    result[indx].push(this.roll());
                }

                result[indx] = result[indx]
                    .sort(function (a, b) { return a - b; })
                        .reverse();

                indx++;
            }

            return num === 1 ? result[0] : result;
        }

        ,getType: function () {
            
            return "[object Caste]";
        }

        ,roll: function () {
            var result;

            do {
                result = roll(this.dice, 6)
                    .sort()
                    .slice(-3)
                    .reduce(function (sum, cur) {
                        return sum + cur;
                    });
            } while (result < this.min);

            return result;
        }

        ,toString: function () {

            return this.name;
        }

        ,valueOf: function () {

            return "{name: '" + this.name + "'}";
        }
    };

    return (new Table)
        .add([
             new Caste({name: "Champion", dice: 6, min: 7})
            ,new Caste({name: "Hero",     dice: 4, min: 4})
            ,new Caste({name: "npc",      dice: 3, min: 4})
            ,new Caste({name: "Player",   dice: 3, min: 7})
            ,new Caste({name: "Pleb",     dice: 3, min: 3})
        ]);
}());
