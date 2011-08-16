module("ref.js");

test("Reference", function () {
    ok(Reference, "Reference defined");
    ok(Reference.languages, "Reference.languages defined");

    actual = "burrowing mammal";
    equal(Reference.languages[0], actual, "Reference.languages[0] = " + actual);

    actual = "dwarven";
    equal(Reference.languages[1], actual, "Reference.languages[0] = " + actual);

    actual = "orcish";
    equal(Reference.languages[9], actual, "Reference.languages[0] = " + actual);

    actual = undefined;
    equal(Reference.languages[10], actual, "Reference.languages[0] = " + actual);

    ok(Reference.saves, "Reference.saves defined");
    ok(Reference.thaco, "Reference.thaco defined");

    test_obj = [
        "Cleric",
        "Fighter",
        "Mage",
        "Thief"
    ];
    while (test_obj.length) {
        ok(Reference.saves[test_obj[0]], "Reference.saves[" + test_obj[0] + "] defined");
        ok(Reference.thaco[test_obj[0]], "Reference.thaco[" + test_obj[0] + "] defined");
        test_obj.shift();
    }

    test_obj = "Cleric";
    deepEqual(Reference.saves[test_obj][ 0], [19,19,19,19,19], "Saves for level  0" + test_obj);
    deepEqual(Reference.saves[test_obj][ 1], [10,13,14,16,15], "Saves for level  1" + test_obj);
    deepEqual(Reference.saves[test_obj][21], [02,05,06,08,07], "Saves for level 21" + test_obj);
    deepEqual(Reference.saves[test_obj][22], [01,03,04,06,05], "Saves for level 22" + test_obj);
    deepEqual(Reference.saves[test_obj][23], undefined, "Saves for level 23" + test_obj);

    equal(Reference.thaco[test_obj][ 0], 20, "Thaco for level  0 " + test_obj);
    equal(Reference.thaco[test_obj][ 1], 20, "Thaco for level  1 " + test_obj);
    equal(Reference.thaco[test_obj][21],  8, "Thaco for level 21 " + test_obj);
    equal(Reference.thaco[test_obj][22],  7, "Thaco for level 22 " + test_obj);
    equal(Reference.thaco[test_obj][23],  undefined, "Thaco for level 23 " + test_obj);

    test_obj = "Fighter";
    deepEqual(Reference.saves[test_obj][ 0], [16,17,18,20,19], "Saves for level  0" + test_obj);
    deepEqual(Reference.saves[test_obj][ 1], [14,15,16,17,17], "Saves for level  1" + test_obj);
    deepEqual(Reference.saves[test_obj][21], [01,02,03,03,04], "Saves for level 21" + test_obj);
    deepEqual(Reference.saves[test_obj][22], [01,02,03,03,04], "Saves for level 22" + test_obj);
    deepEqual(Reference.saves[test_obj][23], undefined, "Saves for level 23" + test_obj);

    equal(Reference.thaco[test_obj][ 0], 20, "Thaco for level  0 " + test_obj);
    equal(Reference.thaco[test_obj][ 1], 20, "Thaco for level  1 " + test_obj);
    equal(Reference.thaco[test_obj][21],  1, "Thaco for level 21 " + test_obj);
    equal(Reference.thaco[test_obj][22],  1, "Thaco for level 22 " + test_obj);
    equal(Reference.thaco[test_obj][23],  undefined, "Thaco for level 23 " + test_obj);

    test_obj = "Mage";
    deepEqual(Reference.saves[test_obj][ 0], [19,19,19,19,19], "Saves for level  0" + test_obj);
    deepEqual(Reference.saves[test_obj][ 1], [14,13,11,15,12], "Saves for level  1" + test_obj);
    deepEqual(Reference.saves[test_obj][21], [08,05,03,07,04], "Saves for level 21" + test_obj);
    deepEqual(Reference.saves[test_obj][22], [08,05,03,07,04], "Saves for level 22" + test_obj);
    deepEqual(Reference.saves[test_obj][23], undefined, "Saves for level 23" + test_obj);

    equal(Reference.thaco[test_obj][ 0], 20, "Thaco for level  0 " + test_obj);
    equal(Reference.thaco[test_obj][ 1], 20, "Thaco for level  1 " + test_obj);
    equal(Reference.thaco[test_obj][21], 11, "Thaco for level 21 " + test_obj);
    equal(Reference.thaco[test_obj][22],  9, "Thaco for level 22 " + test_obj);
    equal(Reference.thaco[test_obj][23],  undefined, "Thaco for level 23 " + test_obj);

    test_obj = "Thief";
    deepEqual(Reference.saves[test_obj][ 0], [19,19,19,19,19], "Saves for level  0" + test_obj);
    deepEqual(Reference.saves[test_obj][ 1], [13,12,14,16,15], "Saves for level  1" + test_obj);
    deepEqual(Reference.saves[test_obj][21], [08,07,04,11,05], "Saves for level 21" + test_obj);
    deepEqual(Reference.saves[test_obj][22], [08,07,04,11,05], "Saves for level 22" + test_obj);
    deepEqual(Reference.saves[test_obj][23], undefined, "Saves for level 23" + test_obj);

    equal(Reference.thaco[test_obj][ 0], 20, "Thaco for level  0 " + test_obj);
    equal(Reference.thaco[test_obj][ 1], 20, "Thaco for level  1 " + test_obj);
    equal(Reference.thaco[test_obj][21], 10, "Thaco for level 21 " + test_obj);
    equal(Reference.thaco[test_obj][22],  8, "Thaco for level 22 " + test_obj);
    equal(Reference.thaco[test_obj][23],  undefined, "Thaco for level 23 " + test_obj);
});