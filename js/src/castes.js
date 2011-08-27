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
             {name: "Champion", column: all, dice: 6, one: single, min: 7}
            ,{name: "Hero",     column: all, dice: 4, one: single, min: 4}
            ,{name: "npc",      column: all, dice: 3, one: single, min: 4}
            ,{name: "Player",   column: all, dice: 3, one: single, min: 7}
            ,{name: "Pleb",     column: all, dice: 3, one: single, min: 0}
        ]

    return augment(list);
}());
