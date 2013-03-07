/*jshint laxcomma:true*/
/*global define require*/

define([      "castes", "Caste", "util"
  ], function (castes,   Caste,   util) {
  module("Caste");

  test("constructor", function () {
    var sample = new Caste(valid_config_object());

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

    equal(sample.get("name"), "Zero", "Name passed to constructor is what is returned by '.get' method.");

    sample.set("name", "Other");

    equal(sample.get("name"), "Other", "After setting new name property the change is retained in the object.");

    todo("test for gaining reference to internal structure and changing that externally");

    todo("test more");
  });

  test("instance methods", function () {
    todo("test more");
  });

  test("collection of instances", function () {
    todo("test more");
  });
});