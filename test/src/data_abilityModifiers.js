module("abilityModifiers.js");

(function () {
    var actual,
        lengths = [4,4,3,3,4,5,3],
        temp;

    // test("", function () {
    //     ok(AbilityModifiers, "AbilityModifiers defined");
        
    //     while (actual.length) {
    //         temp = actual.shift();
    //     }
    // });

    actual = [
        "Charisma",
        "Constitution",
        "Comeliness",
        "Dexterity",
        "Intelligence",
        "Strength",
        "Wisdom"
    ];

    for (temp in actual) {
        (function (actual, temp) {
            test("[" + actual[temp] + "]", function () {
            equal(25, AbilityModifiers[actual[temp]].length, "AbilityModifiers." + actual[temp] + " is initialized to 25th ability level");
            equal(lengths[temp], AbilityModifiers[actual[temp]][3].length, "AbilityModifiers." + actual[temp] + "[3].length is " + lengths[temp] + " as expected.");
            deepEqual([], AbilityModifiers[actual[temp]][0], "Level 1 (0th index) is empty array");
            deepEqual([], AbilityModifiers[actual[temp]][1], "Level 2 (1st index) is empty array");
            deepEqual([], AbilityModifiers[actual[temp]][2], "Level 3 (2nd index) is empty array");
            });
        }(actual, temp));
    }
}());
