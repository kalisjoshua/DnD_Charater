/*jshint laxcomma:true*/
/*global define require*/

define([      "abilities"
  ], function (abilities) {
  module("Abilities");

  console.log(abilities[0].details(3));

  test("", function () {
    ok(true);
  });
});
