/*jshint laxcomma:true*/
/*global define require*/

define([      "races", "Race", "util"
  ], function (races,   Race,   util) {
  module("Race");

  function valid_race_config () {
    return {
        name        : "Dwarf"
      , infravision : 60
      , languages   : ["gnome", "goblin", "kobol", "orcish"]
      , move        : 6
      , notes       : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con"
      , saves       : [1, 0, 1, 0, 1]
      , stats       : [0, 0, 0, 0, 1, -1, 0]
      , thieving    : [0, 10, 15, 0, 0, 0, -10, -5]};
  }

  test("constructor", function () {
    ok(Race, "Race object is defined.");
    ok(util.isFunction(Race), "Race object is a function.");

    throws(function () {
      var sample = new Race();
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_race_config();
      invalid.name = "";
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_race_config();
      invalid.infravision = "";
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_race_config();
      invalid.languages = "";
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_race_config();
      invalid.move = "";
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_race_config();
      invalid.move = -1;
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_race_config();
      delete invalid.move;
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    ok(function () {
      // notes can be empty so there is no validation
      try {
        var invalid = valid_race_config();
        delete invalid.notes;
        var sample = new Race(invalid);
        return true;
      } catch (e) {
        return false;
      }
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_race_config();
      invalid.saves.shift();
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_race_config();
      invalid.stats.shift();
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_race_config();
      invalid.thieving.shift();
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    ok((function () {
      try {
        var sample = new Race(valid_race_config());
        return true;
      } catch (e) {
        return false;
      }
    }()), "An error is NOT thrown when a valid config is passed into the constructor.");

    ok((function () {
      try {
        var sample = Race(valid_race_config());
        return true;
      } catch (e) {
        return false;
      }
    }()), "Constructor function also detects that it was called as a normal function and fixes itself.");
  });

  test("instance methods", function () {
    var sample = new Race(valid_race_config());

    ok(sample.getType, "Sample instance has '.getType' property.");
    ok(util.isFunction(sample.getType), "Sample instance has '.getType' is a function.");
    ok(util.isString(sample.getType()), "Call to '.getType' returns a String.");

    ok(sample.toString, "Sample instance has '.toString' property.");
    ok(util.isFunction(sample.toString), "Sample instance has '.toString' is a function.");
    ok(util.isString(sample.toString()), "Call to '.toString' returns a String.");
    ok(sample.toString() === valid_race_config().name, "Call to '.toString' returns the correct String.");
  });


  test("collection of instances", function () {
    ok(races, "collecion is defined.");
    equal("[object Collection]", races.toString(), "collection is a Collection.");
    equal(8, races.length, "collection has the right number of instances.");
    ok(races.languages, "Races provides all available languages.");
    ok(util.isArray(races.languages), "Races provides all available languages in an array.");

    var sample = races.named("Dwarf")[0];

    ok(sample.name === "Dwarf", "Sample instance has a name and it matches what was searched for in the Collection.");
  });
});
