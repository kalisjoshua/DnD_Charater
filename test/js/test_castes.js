/*jshint laxcomma:true*/
/*global define require*/

define([      "castes", "Caste", "util"
  ], function (castes,   Caste,   util) {
  module("Caste");

  function valid_config_object () {
    return {
          name: "Zero"
        , dual: []
        , HDT: 3
        , prefs: "0000000".split("")
        , saves: "00000000000000000000000".split("")
        , thaco: "0000000000000000000000000".split("")
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
  });

  test("dual Caste(ing)", function () {
    throws(function () {
      var dual = Caste.dual();
    }, "Invalid arguments to Caste.dual throws errors.");

    throws(function () {
      var dual = Caste.dual("", "");
    }, "Invalid arguments to Caste.dual throws errors.");

    throws(function () {
      var dual = Caste.dual("Cleric", "Fighter");
    }, "Invalid arguments to Caste.dual throws errors.");

    throws(function () {
      var dual = Caste.dual(castes.named("Cleric")[0], "Fighter");
    }, "Invalid arguments to Caste.dual throws errors.");

    throws(function () {
      var dual = Caste.dual("Fighter", castes.named("Cleric")[0]);
    }, "Invalid arguments to Caste.dual throws errors.");

    throws(function () {
      var dual = Caste.dual(castes.named("Fighter"), castes.named("Cleric"));
    }, "Invalid arguments to Caste.dual throws errors.");

    var a = castes.named("Fighter")[0]
      , b = castes.named("Cleric")[0]
      , dual = Caste.dual(a, b);

    equal(dual.name, a.name + "/" + b.name, "Combining '" + a.name + "' and '" + b.name + "' produces '" + dual.name + "'.");
    deepEqual(dual.dual, [], "A dualed Caste should not have the ability to be dualed further.");
    equal(dual.HDT, (a.HDT + b.HDT) / 2, "Proper HDT value.");
    deepEqual(dual.skills, undefined, dual.name + " does not have thieving skills.");
    equal(dual.prefs.join(""), "0243516", "Proper .prefs value.");
    deepEqual(dual.saves.join(",").split(","), "16,17,18,19,19,10,13,14,16,15,10,13,14,16,15,10,13,14,16,15,9,12,13,15,14,9,12,13,13,14,9,12,13,13,14,7,10,11,12,12,7,10,11,12,12,7,9,10,9,11,6,9,10,9,11,6,8,9,8,10,6,8,9,8,10,5,6,7,5,8,5,6,7,5,8,4,5,6,4,7,4,5,6,4,7,3,4,5,4,6,3,4,5,4,6,2,3,4,3,5,2,3,4,3,5,1,2,3,3,4,1,2,3,3,4".split(","), "Proper .saves value.");
    ok(util.isArray(dual.spells), "Dual Castes should always have an array as the value for .spells.");
    equal(dual.spells.length, 2, "Dual Caste instance's .spells property should be of length 2.");
    deepEqual(dual.spells, [[], b.spells], "Proper .spells value.");
    deepEqual(dual.thaco, "20,20,18,18,16,16,14,14,12,12,10,10,8,8,6,6,4,4,4,2,2,1,1,1,1".split(",").map(Number), "Proper .thaco value.");

    todo("work on dual Caste-ing with two Castes that have .skills.");
  });
});