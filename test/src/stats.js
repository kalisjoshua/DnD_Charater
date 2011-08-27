module("stats.js");

(function () {
    var actual,
        temp;

    test("stats validations", function () {
        ok(stats, "stats function is defined");

        raises(function () {
            actual = stats();
        }, Error, "nothing passed in should throw an error");

        raises(function () {
            actual = stats([]);
        }, Error, "empty array passed in should throw an error");

        raises(function () {
            actual = stats([9,9,9,9,9,9,9,9]);
        }, Error, "too-big array passed in should throw an error");

        raises(function () {
            actual = stats([1,1,1,1,1,1,1]);
        }, Error, "array, with invalid values, passed in should throw an error");

        raises(function () {
            actual = stats([1,1,[1,1],[1,1],[1,1],1,1]);
        }, Error, "array, with invalid values, passed in should throw an error");

        actual = stats([8,8,8,8,8,8,8]);
        equal(8, actual.get("Charisma"), "expected value retrieved");
        equal(10, actual.set("Charisma", 10), "setting a new value");

        raises(function () {
            actual.set("Charisma", 30);
        }, Error, "attempting to set an invalid value");
    });

    test("testing Strength peculiarities", function () {
        actual = stats([8,8,8,8,8,8,8]);

        raises(function () {
            actual.setExceptional(100);
        }, Error, "Attempting to set Exceptional Strength when base strength is not 18");
        notEqual(100, actual.getExceptional(), "");

        raises(function () {
            actual.setExceptional(-3);
        }, Error, "Invalid value passed to stats.setExceptional");

        equal(7, actual.details().length, "getting details works fine");

        temp = 100;
        actual = stats([18,18,18,18,18,18,18]);
        equal(temp, actual.setExceptional(temp), "set exceptional should match the value passed in");

        temp = actual.details("Strength")[0];
        equal(1, actual.details("Strength").length, "passed in only strength");

        actual = stats([7,7,7,7,7,7,7]);
        notEqual(temp, actual.details("Strength")[0], "18/100 strength should be different than 7");
    });
}());
