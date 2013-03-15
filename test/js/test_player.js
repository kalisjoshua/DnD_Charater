/*jshint laxcomma:true*/
/*global define require*/

define([      "castes", "races", "Player", "util"
  ], function (castes,   races,   Player,   util) {
  module("Player");

  function valid_config () {
    return {
          caste:  castes.named("Cleric")[0]
        , level:  1
        , race:   races.named("Elf")[0]
        , scores: [5, 5, 5, 5, 5, 5, 5]
      };
  }

  test("basics", function () {
    throws(function () {
      var sample = new Player();
    }, "Not a valid Player config: empty.");

    throws(function () {
      var sample = new Player({});
    }, "Not a valid Player config: empty object.");

    Object.keys(valid_config())
      .forEach(function (arg) {
        var temp = valid_config();
        delete temp[arg];

        throws(function () {
          var sample = new Player(temp);
        }, "Not a valid Player config: missing " + arg);
      });

    var sample = new Player(valid_config());

    ok(sample.isValid, "Valid Player config produces a valid Player object.");
  });
});
