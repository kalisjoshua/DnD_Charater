/*jshint laxcomma:true*/
/*global define require*/

define([      "station_list", "Station", "util"
  ], function (station_list,   Station,   util) {
  module("Station");

  test("constructor", function constructorOfStation_test () {
    ok(Station, "Station object is defined.");
    ok(util.isFunction(Station), "Station object is a function.");

    throws(function () {
      var sample = new Station();
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var sample = new Station({});
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var sample = new Station({name: "Charlatan"});
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var sample = new Station({name: "Charlatan", dice: 4});
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var sample = new Station({name: "Charlatan", min: 6});
    }, "An error is thrown when an invalid config is passed into the constructor.");

    ok((function () {
      try {
        var sample = new Station({name: "Charlatan", dice: 4, min: 6});

        return true;
      } catch (e) {
        return false;
      }
    }()), "An error is NOT thrown when a valid config is passed into the constructor.");

    ok((function () {
      try {
        var sample = Station({name: "Charlatan", dice: 4, min: 6});

        return true;
      } catch (e) {
        return false;
      }
    }()), "Constructor function also detects that it was called as a normal function and fixes itself.");
  });

  test("instance methods", function () {
    var rank_name = "Charlatan"
      , sample = Station({name: rank_name, dice: 4, min: 6});

    equal(rank_name, sample.name, "Constructed object has properties from config.");
    equal(4, sample.dice, "Constructed object has properties from config.");
    equal(6, sample.min, "Constructed object has properties from config.");

    ok(sample.column, "Sample instance has 'column' property.");
    ok(util.isFunction(sample.column), "Sample instance '.column' is a function.");
    ok(sample.column().every(util.isNumeric), "Call to '.column' returns an array of numbers.");

    ok(sample.getType, "Sample instance has '.getType' property.");
    ok(util.isFunction(sample.getType), "Sample instance has '.getType' is a function.");
    ok(util.isString(sample.getType()), "Call to '.getType' returns a String.");

    ok(sample.toString, "Sample instance has '.toString' property.");
    ok(util.isFunction(sample.toString), "Sample instance has '.toString' is a function.");
    ok(util.isString(sample.toString()), "Call to '.toString' returns a String.");
    ok(sample.toString() === rank_name, "Call to '.toString' returns the correct String.");

    ok(sample.valueOf, "Sample instance has '.valueOf' property.");
    ok(util.isFunction(sample.valueOf), "Sample instance has '.valueOf' is a function.");
    ok(util.isString(sample.valueOf()), "Call to '.valueOf' returns a String.");
    ok(sample.valueOf() === JSON.stringify(sample), "Call to '.valueOf' returns the correct String.");
  });

  test("Collection of instances", function stationList_test () {
    ok(station_list, "station_list is defined.");
    equal("[object Collection]", station_list.toString(), "station_list is a Collection.");
    equal(5, station_list.length, "station_list has the right number of Station instances.");

    var rank_name = "Hero"
      , sample = station_list.named(rank_name)[0]
      , temp;

    ok(sample.name === rank_name, "Sample instance has a name and it matches what was searched for in the Collection.");
  });
});
