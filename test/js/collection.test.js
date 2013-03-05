/*jshint laxcomma:true*/
/*global define require*/

define([      "Collection", "util"
  ], function (Collection,   util) {
  module("Collection");

  test("methods", function collection_test () {
    ok(Collection, "Collection is defined.");
    ok(new Collection(), "Create an empty collection.");
    ok(Collection(), "Create an empty collection, without using 'new' keyword.");

    var sample = new Collection()
      , temp;

    equal(0, sample.length, "An empty collection has no items.");

    // additional Collection methods
    [ "add"
    , "each"
    , "getNames"
    , "named"
    , "numericSort"
    , "toString"
    ].forEach(function (method) {
      ok(sample[method], "Collections have '." + method + "' property defined.");
      ok(util.isFunction(sample[method]), "Collections '." + method + "' property is a method.");
    });

    sample
      .add("hello")
      .add("world");

    equal(2, sample.length, "Added item increases the length of the Collection.");

    temp = "";
    sample
      .each(function (item) {
        temp += item;
      });

    equal("helloworld", temp, "Collection.each works.");

    sample.empty();
    equal(0, sample.length, "Collection.empty ... empties the collection.");

    sample
      .add([
          "hello"
        , "world"
      ]);

    equal(2, sample.length, "Added item takes arrays as well as single items.");
  });
});
