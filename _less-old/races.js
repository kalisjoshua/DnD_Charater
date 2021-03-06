//// ref_races.js

var Races = (function () {
    var languages = (function (langs) {

            return function (ar) {
                var result = [];

                ar.forEach(function (n) {
                    result.push(langs[n]);
                });

                return result;
            };
        //--0------------------1---------2--------3-------4-------5--------6----------7-----------8--------9--------10------//
        }(["burrowing mammal","dwarven","elvish","gnoll","gnome","goblin","halfling","hobgoblin","kobold","orcish","common"]))

        ,Race = function (config) {
            if (!config.name
            || !Util.isNumeric(config.infravision)
            || !config.languages.length
            || config.saves.length !== 5
            || config.stats.length !== 7
            || config.thieving.length !== 8
            || !Util.isNumeric(config.move)) {
                dndError({
                    args: arguments
                    ,fn: "Race constructor"
                });
            }

            for (var attr in config) {
                this[attr] = config[attr];
            }
        };

    Race.prototype = {
        getType: function () {
            
            return "[object Race]";
        }

        ,toString: function () {

            return "Race";
        }
    };

    return (new Table)
        .add([
            new Race({
                name          : "Dwarf"
                ,infravision  : 60
                ,languages    : languages([4, 5, 8, 9])
                ,move         : 6
                ,notes        : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con"
                ,saves        : [1, 0, 1, 0, 1]
                ,stats        : [0, 0, 0, 0, 1, -1, 0]
                ,thieving     : [0, 10, 15, 0, 0, 0, -10, -5]
            })
            
            ,new Race({
                name          : "Elf"
                ,infravision  : 60
                ,languages    : languages([3, 4, 5, 6, 7, 9])
                ,move         : 12
                ,notes        : ""
                ,saves        : [0, 0, 0, 0, 0]
                ,stats        : [0, 0, 0, 1, -1, 0, 0]
                ,thieving     : [5, -5, 0, 5, 10, 5, 0, 0]
            })
            
            ,new Race({
                name          : "Gnome"
                ,infravision  : 60
                ,languages    : languages([0, 1, 6, 5, 8])
                ,move         : 6
                ,notes        : "+1 on saves(rsw, sp) for each 3 1/2 of con"
                ,saves        : [0, 0, 1, 0, 1]
                ,stats        : [-1, 0, 0, 1, 0, 0, 0]
                ,thieving     : [0, 5, 10, 5, 5, 10, 15, 0]
            })
            
            ,new Race({
                name          : "Goblin"
                ,infravision  : 30
                ,languages    : languages([1, 3, 7, 8])
                ,move         : 8
                ,notes        : ""
                ,saves        : [0, 0, 0, 0, 0]
                ,stats        : [-1, 1, 0, 1, 0, -1, 0]
                ,thieving     : [ 0, 15, 10, 0, 0, 15, 0, 15]
            })
            
            ,new Race({
                name          : "Half-Elf"
                ,infravision  : 60
                ,languages    : languages([3, 4, 5, 6, 7, 9])
                ,move         : 12
                ,notes        : ""
                ,saves        : [0, 0, 0, 0, 0]
                ,stats        : [0, 0, 0, 0, 0, 0, 0]
                ,thieving     : [10, 0, 0, 5, 0, 0, 0, 0]
            })
            
            ,new Race({
                name          : "Half-Orc"
                ,infravision  : 60
                ,languages    : languages([9])
                ,move         : 12
                ,notes        : ""
                ,saves        : [0, 0, 0, 0, 0]
                ,stats        : [1, 0, 0, 0, 1, -1, 0]
                ,thieving     : [ -5, 5, 5, 0, 0, 5, 5, -10]
            })
            
            ,new Race({
                name          : "Halfling"
                ,infravision  : 30
                ,languages    : languages([1, 2, 4, 5, 9])
                ,move         : 6
                ,notes        : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con"
                ,saves        : [1, 0, 1, 0, 1]
                ,stats        : [-1, 0, 0, 1, 0, 0, 0]
                ,thieving     : [ 5, 5, 5, 10, 15, 5, -15, -5]
            })
            
            ,new Race({
                name          : "Human"
                ,infravision  : 0
                ,languages    : languages([10])
                ,move         : 12
                ,notes        : ""
                ,saves        : [0, 0, 0, 0, 0]
                ,stats        : [0, 0, 0, 0, 0, 0, 0]
                ,thieving     : [0, 0, 0, 0, 0, 0, 0, 0]
            })
        ]);
}());
