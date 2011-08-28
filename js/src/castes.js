//// castes.js

var Castes = (function () {
    var all = function () {
            var result = [];

            while (result.length < 7) {
                result.push(this.one());
            }

            return result;
        }

        ,roll = function (num, faces) {
            var result = [];

            do {
                result.push(parseInt(Math.random() * faces, 10) + 1);
            } while (num--);

            return result;
        }

        ,single = function () {
            var result;

            do {
                result = roll(this.dice, 6).
                    sort().
                    slice(-3).
                    reduce(function (sum, cur) {
                        return sum + cur;
                    });
            } while (result <= this.min);

            return result;
        }

        ,list = [
             {name: "Champion", dice: 6, min: 7}
            ,{name: "Hero",     dice: 4, min: 4}
            ,{name: "npc",      dice: 3, min: 4}
            ,{name: "Player",   dice: 3, min: 7}
            ,{name: "Pleb",     dice: 3, min: 0}
        ]

    return augment(list).
        each(function (node) {
            node.column = all;
            node.one = single;
            node.getType = function () {
                return "[object Caste" + this.name + "]";
            }
        });
}());
