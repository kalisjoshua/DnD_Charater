module("ref_abilities.js");

test("Reference.Ability", function () {
    ok(Reference.Ability, "Reference.Ability defined");
});

test("Reference.Ability.Charisma", function () {
    ok(Reference.Ability.Charisma, "Reference.Ability.Charisma defined");

    deepEqual(Reference.Ability.Charisma( 3), [ 1, -30, -25,  -5], "Ability level  3 of Charisma");
    deepEqual(Reference.Ability.Charisma(10), [ 4,   0,   0,   0], "Ability level 10 of Charisma");
    deepEqual(Reference.Ability.Charisma(24), [35,  97,  86,  12], "Ability level 24 of Charisma");

    raises(function () {
        Reference.Ability.Charisma(2);
    }, Error, "Throws error when values are not valid - too low");

    raises(function () {
        Reference.Ability.Charisma(25);
    }, Error, "Throws error when values are not valid - too high");
});

test("Reference.Ability.Constitution", function () {
    ok(Reference.Ability.Constitution, "Reference.Ability.Constitution defined");

    deepEqual(Reference.Ability.Constitution( 3), [-2,  35,  40,  0], "Ability level  3 of Constitution");
    deepEqual(Reference.Ability.Constitution(10), [ 0,  70,  75,  0], "Ability level 10 of Constitution");
    deepEqual(Reference.Ability.Constitution(24), [10, 100, 100,  0], "Ability level 24 of Constitution");

    raises(function () {
        Reference.Ability.Constitution(2);
    }, Error, "Throws error when values are not valid - too low");

    raises(function () {
        Reference.Ability.Constitution(25);
    }, Error, "Throws error when values are not valid - too high");
});

test("Reference.Ability.Comeliness", function () {
    ok(Reference.Ability.Comeliness, "Reference.Ability.Comeliness defined");

    deepEqual(Reference.Ability.Comeliness( 3), ['', '', ''], "Ability level  3 of Comeliness");
    deepEqual(Reference.Ability.Comeliness(10), ['', '', ''], "Ability level 10 of Comeliness");
    deepEqual(Reference.Ability.Comeliness(24), ['', '', ''], "Ability level 24 of Comeliness");

    raises(function () {
        Reference.Ability.Comeliness(2);
    }, Error, "Throws error when values are not valid - too low");

    raises(function () {
        Reference.Ability.Comeliness(25);
    }, Error, "Throws error when values are not valid - too high");
});

test("Reference.Ability.Dexterity", function () {
    ok(Reference.Ability.Dexterity, "Reference.Ability.Dexterity defined");

    deepEqual(Reference.Ability.Dexterity( 3), [-3, -3,  4], "Ability level  3 of Dexterity");
    deepEqual(Reference.Ability.Dexterity(10), [ 0,  0,  0], "Ability level 10 of Dexterity");
    deepEqual(Reference.Ability.Dexterity(24), [ 7,  7, -8], "Ability level 24 of Dexterity");

    raises(function () {
        Reference.Ability.Dexterity(2);
    }, Error, "Throws error when values are not valid - too low");

    raises(function () {
        Reference.Ability.Dexterity(25);
    }, Error, "Throws error when values are not valid - too high");
});

test("Reference.Ability.Inteligence", function () {
    ok(Reference.Ability.Inteligence, "Reference.Ability.Inteligence defined");

    deepEqual(Reference.Ability.Inteligence( 3), [ 0,  0,  0,  0], "Ability level  3 of Inteligence");
    deepEqual(Reference.Ability.Inteligence(10), [ 2, 45,  5,  7], "Ability level 10 of Inteligence");
    deepEqual(Reference.Ability.Inteligence(24), [12, 98, 14, 99], "Ability level 24 of Inteligence");

    raises(function () {
        Reference.Ability.Inteligence(2);
    }, Error, "Throws error when values are not valid - too low");

    raises(function () {
        Reference.Ability.Inteligence(25);
    }, Error, "Throws error when values are not valid - too high");
});

test("Reference.Ability.Strength", function () {
    ok(Reference.Ability.Strength, "Reference.Ability.Strength defined");

    deepEqual(Reference.Ability.Strength( 3     ), [-3, -1, -350,   '1/6',  0], "Ability level  3 of Strength");
    deepEqual(Reference.Ability.Strength(10     ), [ 0,  0,    0,   '2/6',  2], "Ability level 10 of Strength");

    deepEqual(Reference.Ability.Strength(18,   0), [ 1,  2,  750,   '3/6', 16], "Ability level 18/0 of Strength");
    deepEqual(Reference.Ability.Strength(18,  -1), [ 1,  2,  750,   '3/6', 16], "Ability level 18/01-50 of Strength; negative values as second args will work fine");

    deepEqual(Reference.Ability.Strength(18,   1), [ 1,  3, 1000,   '3/6', 20], "Ability level 18/01-50 of Strength");
    deepEqual(Reference.Ability.Strength(18,  50), [ 1,  3, 1000,   '3/6', 20], "Ability level 18/01-50 of Strength");

    deepEqual(Reference.Ability.Strength(18,  51), [ 2,  3, 1250,   '4/6', 25], "Ability level 18/51-75 of Strength");
    deepEqual(Reference.Ability.Strength(18,  75), [ 2,  3, 1250,   '4/6', 25], "Ability level 18/51-75 of Strength");

    deepEqual(Reference.Ability.Strength(18,  76), [ 2,  4, 1500,   '4/6', 30], "Ability level 18/76-90 of Strength");
    deepEqual(Reference.Ability.Strength(18,  90), [ 2,  4, 1500,   '4/6', 30], "Ability level 18/76-90 of Strength");

    deepEqual(Reference.Ability.Strength(18,  91), [ 2,  5, 2000,   '4/6', 35], "Ability level 18/91-99 of Strength");
    deepEqual(Reference.Ability.Strength(18,  99), [ 2,  5, 2000,   '4/6', 35], "Ability level 18/91-99 of Strength");

    deepEqual(Reference.Ability.Strength(18, 100), [ 3,  6, 3000,   '5/6', 40], "Ability level 18/100+ of Strength");
    deepEqual(Reference.Ability.Strength(18, 234), [ 3,  6, 3000,   '5/6', 40], "Ability level 18/100+ of Strength; second arg only needs to be a positive number");

    deepEqual(Reference.Ability.Strength(24     ), [ 6, 12, 3600, '19/20', 82], "Ability level 24 of Strength");

    deepEqual(Reference.Ability.Strength( 3, 100), [-3, -1, -350,   '1/6',  0], "Ability level  3/100 of Strength; second arg only applies if first arg is 18");
    deepEqual(Reference.Ability.Strength(19, 100), [ 3,  7, 1250,   '7/8', 25], "Ability level 19/100 of Strength; second arg only applies if first arg is 18");

    notDeepEqual(Reference.Ability.Strength( 3, 100), [ 3,  6, 3000,   '5/6', 40], "Ability level  3/100 of Strength");
    notDeepEqual(Reference.Ability.Strength(19, 100), [ 3,  6, 3000,   '5/6', 40], "Ability level 19/100 of Strength");

    raises(function () {
        Reference.Ability.Strength(2);
    }, Error, "Throws error when values are not valid - too low");

    raises(function () {
        Reference.Ability.Strength(25);
    }, Error, "Throws error when values are not valid - too high");

    raises(function () {
        Reference.Ability.Strength(18, "abc");
    }, Error, "Throws error when values are not valid - second arg is not valid");

    raises(function () {
        Reference.Ability.Strength(18, null);
    }, Error, "Throws error when values are not valid - second arg is not valid");

    raises(function () {
        Reference.Ability.Strength(18, []);
    }, Error, "Throws error when values are not valid - second arg is not valid");

    raises(function () {
        Reference.Ability.Strength(18, {});
    }, Error, "Throws error when values are not valid - second arg is not valid");
});

test("Reference.Ability.Wisdom", function () {
    ok(Reference.Ability.Wisdom, "Reference.Ability.Wisdom defined");

    deepEqual(Reference.Ability.Wisdom( 3), [-3, 100, ""], "Ability level  3 of Wisdom");
    deepEqual(Reference.Ability.Wisdom(10), [ 0,  15, ""], "Ability level 10 of Wisdom");
    deepEqual(Reference.Ability.Wisdom(24), [ 6,   0, "1,1,1,1,2,2,2,2,3,3,3,4,4,4,5,6,7"], "Ability level 24 of Wisdom");

    raises(function () {
        Reference.Ability.Wisdom(2);
    }, Error, "Throws error when values are not valid - too low");

    raises(function () {
        Reference.Ability.Wisdom(25);
    }, Error, "Throws error when values are not valid - too high");
});