module("abilityModiiers.js");

(function () {
    var actual,
        temp;

    test("", function () {
        ok(AbilityModifiers, "AbilityModifiers defined");

        actual = [
            "Charisma",
            "Constitution",
            "Comeliness",
            "Dexterity",
            "Intelligence",
            "Strength",
            "Wisdom"
        ];
        
        while (actual.length) {
            temp = actual.shift();
            equal(25, AbilityModifiers[temp].length, "AbilityModifiers." + temp + " is initialized to 25th ability level");
            deepEqual([], AbilityModifiers[temp][0], "Level 1 (0th index) is empty array");
            deepEqual([], AbilityModifiers[temp][1], "Level 2 (1st index) is empty array");
            deepEqual([], AbilityModifiers[temp][2], "Level 3 (2nd index) is empty array");
        }
    });
}());
