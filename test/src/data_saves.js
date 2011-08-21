module("saves.js");

(function () {
    var actual,
        temp;

    actual = [
        "Cleric",
        "Fighter",
        "Mage",
        "Thief"
    ];

    for (temp in actual) {
        (function (actual, temp) {
            test("Saves object initializations | " + actual[temp], function () {
                equal(23, Saves[actual[temp]].length, "Saves." + actual[temp] + " is initialized to 23 levels");
                equal(5, Saves[actual[temp]][0].length, "Saves." + actual[temp] + "[0] is initialized with 5 values")
            });
        }(actual, temp));
    }

    test("spot checking", function () {
        deepEqual(Saves.Cleric[ 0], [19,19,19,19,19],  "Saves.Cleric for level  0");
        deepEqual(Saves.Cleric[ 1], [10,13,14,16,15],  "Saves.Cleric for level  1");
        deepEqual(Saves.Cleric[21], [02,05,06,08,07],  "Saves.Cleric for level 21");
        deepEqual(Saves.Cleric[22], [01,03,04,06,05],  "Saves.Cleric for level 22");
        deepEqual(Saves.Cleric[23], undefined,         "Saves.Cleric for level 23");

        deepEqual(Saves.Fighter[ 0], [16,17,18,20,19], "Saves.Fighter for level  0");
        deepEqual(Saves.Fighter[ 1], [14,15,16,17,17], "Saves.Fighter for level  1");
        deepEqual(Saves.Fighter[21], [01,02,03,03,04], "Saves.Fighter for level 21");
        deepEqual(Saves.Fighter[22], [01,02,03,03,04], "Saves.Fighter for level 22");
        deepEqual(Saves.Fighter[23], undefined,        "Saves.Fighter for level 23");

        deepEqual(Saves.Mage[ 0], [19,19,19,19,19],    "Saves.Mage for level  0");
        deepEqual(Saves.Mage[ 1], [14,13,11,15,12],    "Saves.Mage for level  1");
        deepEqual(Saves.Mage[21], [08,05,03,07,04],    "Saves.Mage for level 21");
        deepEqual(Saves.Mage[22], [08,05,03,07,04],    "Saves.Mage for level 22");
        deepEqual(Saves.Mage[23], undefined,           "Saves.Mage for level 23");

        deepEqual(Saves.Thief[ 0], [19,19,19,19,19],   "Saves.Thief for level  0");
        deepEqual(Saves.Thief[ 1], [13,12,14,16,15],   "Saves.Thief for level  1");
        deepEqual(Saves.Thief[21], [08,07,04,11,05],   "Saves.Thief for level 21");
        deepEqual(Saves.Thief[22], [08,07,04,11,05],   "Saves.Thief for level 22");
        deepEqual(Saves.Thief[23], undefined,          "Saves.Thief for level 23");
    });
}());
