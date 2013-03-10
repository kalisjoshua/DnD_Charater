/*jshint laxcomma:true*/
/*global define require*/

define([      "castes", "Caste", "util"
  ], function (castes,   Caste,   util) {
  module("Caste");

  function valid_config_object () {
    return {
        name: "Zero",
        dual: [],
        HDT: 3,
        prefs: "0000000".split(""),
        saves: "00000000000000000000000".split(""),
        thaco: "0000000000000000000000000".split("")
      };
  }

  test("constructor", function () {
    var sample = new Caste(valid_config_object());

    throws(function () {
      var invalid = new Caste();
    }, "Passing no config (none) should throw an error.");

    throws(function () {
      var invalid_config = valid_config_object();
      invalid_config.name = "";
      var invalid = new Caste(invalid_config);
    }, "Passing invalid config (no name) should throw an error.");

    throws(function () {
      var invalid_config = valid_config_object();
      invalid_config.dual = "";
      var invalid = new Caste(invalid_config);
    }, "Passing invalid config (non-array dual) should throw an error.");

    throws(function () {
      var invalid_config = valid_config_object();
      invalid_config.HDT = 1;
      var invalid = new Caste(invalid_config);
    }, "Passing invalid config (HDT) should throw an error.");

    throws(function () {
      var invalid_config = valid_config_object();
      invalid_config.prefs = "";
      var invalid = new Caste(invalid_config);
    }, "Passing invalid config (prefs) should throw an error.");

    throws(function () {
      var invalid_config = valid_config_object();
      invalid_config.saves = "";
      var invalid = new Caste(invalid_config);
    }, "Passing invalid config (saves) should throw an error.");

    throws(function () {
      var invalid_config = valid_config_object();
      invalid_config.thaco = "";
      var invalid = new Caste(invalid_config);
    }, "Passing invalid config (thaco) should throw an error.");

    ok((function () {
      try {
        var sample = new Caste(valid_config_object());
        return true;
      } catch(e) {
        return false;
      }
    }()), "An error is NOT thrown when a valid config is passed into the constructor.");

    ok((function () {
      try {
        var sample = Caste(valid_config_object());
        return true;
      } catch(e) {
        return false;
      }
    }()), "Constructor function also detects that it was called as a normal function and fixes itself.");
  });

  test("instance methods", function () {
    var sample = new Caste(valid_config_object());

    equal(sample.name, "Zero", "Name passed to constructor is what is returned by '.get' method.");

    sample.name = "Other";
    equal(sample.name, "Zero", "Property values cannot be changed once the object is instantiated.");

    "name HDT"
      .split(" ")
      .forEach(function (prop) {
        var instance  = new Caste(valid_config_object())
          , expected  = valid_config_object()[prop]
          , propRef   = instance[prop];

        propRef += 99;

        equal(instance[prop]
          , expected
          , "Actual internal structure '{p}' is not exposed via get methods.".replace("{p}", prop));
      });

    "dual prefs saves thaco"
      .split(" ")
      .forEach(function (prop) {
        var instance  = new Caste(valid_config_object())
          , expected  = valid_config_object()[prop].join()
          , propRef   = instance[prop];

        propRef.shift();

        equal(instance[prop].join()
          , expected
          , "Actual internal structure '{p}' is not exposed via get methods.".replace("{p}", prop));
      });

    ok(sample.getType, "Sample instance has '.getType' property.");
    ok(util.isFunction(sample.getType), "Sample instance has '.getType' is a function.");
    ok(util.isString(sample.getType()), "Call to '.getType' returns a String.");
    equal(sample.getType(), "[object Caste]", "Call to '.getType' returns a String.");

    ok(sample.toString, "Sample instance has '.toString' property.");
    ok(util.isFunction(sample.toString), "Sample instance has '.toString' is a function.");
    ok(util.isString(sample.toString()), "Call to '.toString' returns a String.");
    ok(sample.toString() === valid_config_object().name, "Call to '.toString' returns the correct String.");
  });

  test("collection of instances", function () {
    ok(castes, "collecion is defined.");
    equal("[object Collection]", castes.toString(), "collection is a Collection.");
    equal(15, castes.length, "collection has the right number of instances.");

    ok(castes[0].name === "Acrobat", "Sample instance has a name and it matches what was searched for in the Collection.");
    todo("test more");
  });
});