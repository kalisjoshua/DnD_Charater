/*jshint laxcomma:true*/
/*global define require*/

define([      "traits"
  ], function (traits) {
  module("Traits");

  function simplate (tmpl, data) {
    for (var p in data) {
      tmpl = tmpl.replace("{" + p + "}", data[p]);
    }

    return tmpl;
  }

  function table_manip (stat, indx) {
    // must use the full path to the table object to be sure that actual values aren't altered
    // if aliased: var table = traits.str.table[indx]; changes will be on the copy not actual
    var expected = traits[stat].table[indx].join("")
      , result;

    traits[stat].table[indx][0] += 1;
    result = traits[stat].table[indx].join("");

    equal(result, expected, "Attempting to change the values in a Ability table does not work.");
  }

  test("Strength", function () {
    var expected;

    table_manip("str", 3);
    table_manip("str", 6);
    table_manip("str", 10);
    table_manip("str", 15);
    table_manip("str", 18);

    expected = "THAC0 Adjustment: -3, Damage Adjustment: -1, Weight Adjustment: -350, Open Doors: 1/6, Bend Bars: 0";
    equal(traits.str.details(3), expected, "Strength score: 3");

    expected = "THAC0 Adjustment: 1, Damage Adjustment: 2, Weight Adjustment: 750, Open Doors: 3/6, Bend Bars: 16";
    equal(traits.str.details(18), expected, "Strength score: 18");

    expected = "THAC0 Adjustment: 1, Damage Adjustment: 3, Weight Adjustment: 1000, Open Doors: 3/6, Bend Bars: 20";
    equal(traits.str.details(18, 1), expected, "Strength score: 18/1");
    equal(traits.str.details(18, 2), expected, "Strength score: 18/1");
    equal(traits.str.details(18, 49), expected, "Strength score: 18/50");
    equal(traits.str.details(18, 50), expected, "Strength score: 18/50");

    expected = "THAC0 Adjustment: 2, Damage Adjustment: 3, Weight Adjustment: 1250, Open Doors: 4/6, Bend Bars: 25";
    equal(traits.str.details(18, 51), expected, "Strength score: 18/51");
    equal(traits.str.details(18, 52), expected, "Strength score: 18/51");
    equal(traits.str.details(18, 74), expected, "Strength score: 18/75");
    equal(traits.str.details(18, 75), expected, "Strength score: 18/75");

    expected = "THAC0 Adjustment: 2, Damage Adjustment: 4, Weight Adjustment: 1500, Open Doors: 4/6, Bend Bars: 30";
    equal(traits.str.details(18, 76), expected, "Strength score: 18/76");
    equal(traits.str.details(18, 77), expected, "Strength score: 18/76");
    equal(traits.str.details(18, 89), expected, "Strength score: 18/90");
    equal(traits.str.details(18, 90), expected, "Strength score: 18/90");

    expected = "THAC0 Adjustment: 2, Damage Adjustment: 5, Weight Adjustment: 2000, Open Doors: 4/6, Bend Bars: 35";
    equal(traits.str.details(18, 91), expected, "Strength score: 18/91");
    equal(traits.str.details(18, 92), expected, "Strength score: 18/91");
    equal(traits.str.details(18, 98), expected, "Strength score: 18/91");
    equal(traits.str.details(18, 99), expected, "Strength score: 18/99");

    expected = "THAC0 Adjustment: 3, Damage Adjustment: 6, Weight Adjustment: 3000, Open Doors: 5/6, Bend Bars: 40";
    equal(traits.str.details(18, 100), expected, "Strength score: 18/100");

    throws(function () {
      traits.str.details(18, 0);
    }, "Getting details for a Strength score of 18 requires an exceptional value of 1-100.");

    throws(function () {
      traits.str.details(18, 101);
    }, "Getting details for a Strength score of 18 requires an exceptional value of 1-100.");
  });

  test("Intelligence", function () {
    var score
      , stat = "int"
      , tmpl = "Additional Languages: {0}, Know Spell: {1}, Minimum Spells: {2}, Maximum Spells: {3}";

    [3, 8, 14, 18, 24]
      .forEach(function (num) {
        table_manip(stat, num);
        equal(traits[stat].details(num), simplate(tmpl, traits[stat].table[num]));
      });
  });

  test("Wisdom", function () {
    var score
      , stat = "wis"
      , tmpl = "Magic Adjustment: {0}, Spell Failure: {1}, Bonus Spells: {2}";

    [3, 8, 14, 18, 24]
      .forEach(function (num) {
        table_manip(stat, num);
        equal(traits[stat].details(num), simplate(tmpl, traits[stat].table[num]));
      });
  });

  test("Dexterity", function () {
    var score
      , stat = "dex"
      , tmpl = "Reaction Adjustment: {0}, Missile Adjustment: {1}, Defensive Adjustment: {2}";

    [3, 8, 14, 18, 24]
      .forEach(function (num) {
        table_manip(stat, num);
        equal(traits[stat].details(num), simplate(tmpl, traits[stat].table[num]));
      });
  });

  test("Constitution", function () {
    var score
      , stat = "con"
      , tmpl = "HP Adjustment: {0}, System Shock: {1}, Raise Survival: {2}, Number of times Raised: {3}";

    [3, 8, 14, 18, 24]
      .forEach(function (num) {
        table_manip(stat, num);
        equal(traits[stat].details(num), simplate(tmpl, traits[stat].table[num]));
      });
  });

  test("Charisma", function () {
    var score
      , stat = "cha"
      , tmpl = "Max Henchment: {0}, Base Loyalty: {1}, Reaction Adjustment: {2}";

    [3, 8, 14, 18, 24]
      .forEach(function (num) {
        table_manip(stat, num);
        equal(traits[stat].details(num), simplate(tmpl, traits[stat].table[num]));
      });
  });

  test("Comeliness", function () {
    var score
      , stat = "com"
      , tmpl = "Response: {0}, Charisma Bonus: {1}";

    [3, 8, 14, 18, 24]
      .forEach(function (num) {
        table_manip(stat, num);
        equal(traits[stat].details(num), simplate(tmpl, traits[stat].table[num]));
      });
  });
});
