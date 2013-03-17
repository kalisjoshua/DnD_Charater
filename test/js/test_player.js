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
        , scores: [18,16,16,15,14,13,11]
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

  test("optimizing w/ bonuses", function () {
    var sample;

    // Half-Orc - racial adjustment
    // +1 Str
    //  0 Int
    //  0 Wis
    //  0 Dex
    // +1 Con
    // -1 Cha
    //  0 Com
    // Fighter - preferences
    // 0   4   3   5   1   6   2   //
    // Str Con Dex Cha Int Com Wis //
    
    // start with this input   and become this output
    [ [[15,14,13,12,11,10, 9], [16,11, 9,13,15,11,10]]
    , [[16,16,16,16,16,16,16], [17,16,16,16,17,15,16]]
    , [[17,16,16,16,16,16,16], [18,16,16,16,17,15,16]]
    , [[18,16,16,16,16,16,16], [18,16,16,16,17,15,16]]
    , [[17,17,17,17,17,17,17], [18,17,17,17,18,16,17]]
    , [[18,17,17,17,17,17,17], [18,17,17,18,18,16,17]]
    , [[18,18,17,17,17,17,17], [18,17,17,18,18,17,17]]
    , [[18,18,18,17,17,17,17], [18,18,17,18,18,17,17]]
    , [[18,18,18,18,17,17,17], [18,18,17,18,18,17,18]]
    , [[18,18,18,18,18,17,17], [18,18,18,18,18,17,18]]
    , [[18,18,18,18,18,18,18], [18,18,18,18,18,17,18]] ]
    .forEach(function (scores) {
      sample = new Player({
            caste:    castes.named("Fighter")[0]
          , level:    1
          , race:     races.named("Half-Orc")[0]
          , scores:   scores[0]
          , optimize: true
          , addBonus: true
        });
      deepEqual(sample.scores, scores[1], optimizationError(scores, sample.scores));
    });

    function optimizationError (scores, output) {
      return "input: " + scores[0] + ", expectation: " + scores[1] + ", output: " + output;
    }
  });
});
