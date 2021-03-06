module("stats.js");

(function () {
    var actual,
        temp;

    test("stats validations", function () {
        ok(Stats, "stats function is defined");

        raises(function () {
            actual = Stats();
        }, Error, "nothing passed in should throw an error");

        raises(function () {
            actual = Stats([]);
        }, Error, "empty array passed in should throw an error");

        raises(function () {
            actual = Stats([9,9,9,9,9,9,9,9]);
        }, Error, "too-big array passed in should throw an error");

        raises(function () {
            actual = Stats([1,1,1,1,1,1,1]);
        }, Error, "array, with invalid values, passed in should throw an error");

        raises(function () {
            actual = Stats([1,1,[1,1],[1,1],[1,1],1,1]);
        }, Error, "array, with invalid values, passed in should throw an error");

        actual = Stats([8,8,8,8,8,8,8]);
        equal(8, actual.get("Charisma"), "expected value retrieved");
        equal(10, actual.set("Charisma", 10).get("Charisma"), "setting a new value");

        raises(function () {
            actual.set("Charisma", 30);
        }, Error, "attempting to set an invalid value");
    });

    test("testing Strength peculiarities", function () {
        actual = Stats([8,8,8,8,8,8,8]);

        actual.set("Strength", 8, 100);
        notEqual(100, +(actual.get("Strength", true).match(/^\d+/) || [])[0], "Trying to set exceptional strength when score is not 18");
        equal("THAC0 Adjustment: 0, Damage Adjustment: 0, Weight Adjustment: 0, Open Doors: 2/6, Bend Bars: 1", actual.get("Strength", true));

        actual.set("Strength", 18, 100);
        equal(100, +actual.get("Strength", true).match(/^\d+/)[0], "");
        equal("100 THAC0 Adjustment: 3, Damage Adjustment: 6, Weight Adjustment: 3000, Open Doors: 5/6, Bend Bars: 40", actual.get("Strength", true));

        actual.set("Strength", 18);
        notEqual(null, actual.get("Strength"));
    });
}());
