/*jshint laxcomma:true*/
/*global define require*/

define([      "races", "Race", "util"
  ], function (races,   Race,   util) {
  module("Race");

  test("constructor", function () {
    ok(Race, "Race object is defined.");
    ok(util.isFunction(Race), "Race object is a function.");

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

    todo();
  });

  //   var rank_name = "Charlatan"
  //     , sample = Station({name: rank_name, dice: 4, min: 6});

  //   equal(rank_name, sample.name, "Constructed object has properties from config.");
  //   equal(4, sample.dice, "Constructed object has properties from config.");
  //   equal(6, sample.min, "Constructed object has properties from config.");

  //   ok(sample.column, "Sample instance has 'column' property.");
  //   ok(util.isFunction(sample.column), "Sample instance '.column' is a function.");
  //   ok(sample.column().every(util.isNumeric), "Call to '.column' returns an array of numbers.");

  //   ok(sample.getType, "Sample instance has '.getType' property.");
  //   ok(util.isFunction(sample.getType), "Sample instance has '.getType' is a function.");
  //   ok(util.isString(sample.getType()), "Call to '.getType' returns a String.");

  //   ok(sample.toString, "Sample instance has '.toString' property.");
  //   ok(util.isFunction(sample.toString), "Sample instance has '.toString' is a function.");
  //   ok(util.isString(sample.toString()), "Call to '.toString' returns a String.");
  //   ok(sample.toString() === rank_name, "Call to '.toString' returns the correct String.");

  //   ok(sample.valueOf, "Sample instance has '.valueOf' property.");
  //   ok(util.isFunction(sample.valueOf), "Sample instance has '.valueOf' is a function.");
  //   ok(util.isString(sample.valueOf()), "Call to '.valueOf' returns a String.");
  //   ok(sample.valueOf() === JSON.stringify(sample), "Call to '.valueOf' returns the correct String.");
  // });

  // test("collection of Station instances", function stationList_test () {
  //   ok(station_list, "station_list is defined.");
  //   equal("[object Collection]", station_list.toString(), "station_list is a Collection.");
  //   equal(5, station_list.length, "station_list has the right number of Station instances.");

  //   var rank_name = "Hero"
  //     , sample = station_list.named(rank_name)[0]
  //     , temp;

  //   ok(sample.name === rank_name, "Sample instance has a name and it matches what was searched for in the Collection.");
  // });
});
