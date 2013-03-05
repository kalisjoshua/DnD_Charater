/*jshint laxcomma:true*/
/*global define require*/

define([            "ranks", "Rank", "util"
  ], function (listOfRanks,   Rank,   util) {
  module("Rank");

  test("Rank constructor function", function constructorOfRank_test () {
    ok(util.isFunction(Rank), "Rank constructor function is defined.");

    throws(function () {
      var sample = new Rank();
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var sample = new Rank({});
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var sample = new Rank({name: "Charlatan"});
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var sample = new Rank({name: "Charlatan", dice: 4});
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var sample = new Rank({name: "Charlatan", min: 6});
    }, "An error is thrown when an invalid config is passed into the constructor.");

    ok((function () {
      try {
        var sample = new Rank({name: "Charlatan", dice: 4, min: 6});

        return true;
      } catch (e) {
        return false;
      }
    }()), "An error is NOT thrown when a valid config is passed into the constructor.");

    ok((function () {
      try {
        var sample = Rank({name: "Charlatan", dice: 4, min: 6});

        return true;
      } catch (e) {
        return false;
      }
    }()), "Constructor function also detects that it was called as a normal function and fixes itself.");

    var rank_name = "Charlatan"
      , sample = Rank({name: rank_name, dice: 4, min: 6});

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

  test("collection of Rank instances", function listOfRanks_test () {
    ok(listOfRanks, "listOfRanks is defined.");
    equal("[object Collection]", listOfRanks.toString(), "listOfRanks is a Collection.");
    equal(5, listOfRanks.length, "listOfRanks has the right number of Rank instances.");

    var rank_name = "Hero"
      , sample = listOfRanks.named(rank_name)
      , temp;

    ok(sample.name === rank_name, "Sample instance has a name and it matches what was searched for in the Collection.");
  });
});
