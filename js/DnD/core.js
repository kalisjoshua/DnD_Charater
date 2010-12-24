//// core.js

var roll = function () {
    return prv.util.roll.apply(null, arguments);
};

prv.languages = [
    "burrowing mammal",
    "dwarven",
    "elvish",
    "gnoll",
    "gnome",
    "goblin",
    "halfling",
    "hobgoblin",
    "kobold",
    "orcish"
];

pub.roll = roll;

