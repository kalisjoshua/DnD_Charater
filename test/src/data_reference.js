module("Reference");

(function () {
    var actual,
        temp;

    test("reference.js - Languages", function () {
        ok(Languages, "Reference.Languages defined");

        actual = [
            "burrowing mammal",
            "dwarven",
            "elvish",
            "gnoll",
            "gnome",
            "goblin",
            "halfling",
            "hobgoblin",
            "kobold",
            "orcish",
            "common"
        ];

        while (actual.length) {
            temp = actual.pop();
            equal(temp, Languages[actual.length], "Languages | " + temp + ", " + Languages[actual.length]);
        }
    });

    test("reference.js - Thacos", function () {
        ok(Thacos, "Reference.Thacos defined");

        actual = [
            "Cleric",
            "Fighter",
            "Mage",
            "Thief"
        ];
        
        while (actual.length) {
            temp = actual.shift();
            equal(23, Thacos[temp].length, "Thacos." + temp + " is initialized to 23 levels");
        }

        equal(Thacos.Cleric[ 0], 20,          "Thaco.Cleric for level  0 ");
        equal(Thacos.Cleric[ 1], 20,          "Thaco.Cleric for level  1 ");
        equal(Thacos.Cleric[21],  8,          "Thaco.Cleric for level 21 ");
        equal(Thacos.Cleric[22],  7,          "Thaco.Cleric for level 22 ");
        equal(Thacos.Cleric[23],  undefined,  "Thaco.Cleric for level 23 ");

        equal(Thacos.Fighter[ 0], 20,         "Thaco.Fighter for level  0 ");
        equal(Thacos.Fighter[ 1], 20,         "Thaco.Fighter for level  1 ");
        equal(Thacos.Fighter[21],  1,         "Thaco.Fighter for level 21 ");
        equal(Thacos.Fighter[22],  1,         "Thaco.Fighter for level 22 ");
        equal(Thacos.Fighter[23],  undefined, "Thaco.Fighter for level 23 ");

        equal(Thacos.Mage[ 0], 20,            "Thaco.Mage for level  0 ");
        equal(Thacos.Mage[ 1], 20,            "Thaco.Mage for level  1 ");
        equal(Thacos.Mage[21], 11,            "Thaco.Mage for level 21 ");
        equal(Thacos.Mage[22],  9,            "Thaco.Mage for level 22 ");
        equal(Thacos.Mage[23],  undefined,    "Thaco.Mage for level 23 ");

        equal(Thacos.Thief[ 0], 20,           "Thaco.Thief for level  0 ");
        equal(Thacos.Thief[ 1], 20,           "Thaco.Thief for level  1 ");
        equal(Thacos.Thief[21], 10,           "Thaco.Thief for level 21 ");
        equal(Thacos.Thief[22],  8,           "Thaco.Thief for level 22 ");
        equal(Thacos.Thief[23],  undefined,   "Thaco.Thief for level 23 ");
    });
}());
