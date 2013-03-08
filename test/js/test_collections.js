/*jshint laxcomma:true*/
/*global define require*/

define([      "Collection", "util"
  ], function (Collection,   util) {
  module("Collection");

  test("constructor", function () {
    ok(Collection, "Collection is defined.");
    ok(new Collection(), "Create an empty collection.");
    ok(Collection(), "Create an empty collection, without using 'new' keyword.");

    var sample = new Collection();

    equal(0, sample.length, "An empty collection has no items.");

    // Collection methods existence
    [ "add"
    , "each"
    , "getNames"
    , "named"
    , "toString"
    ].forEach(function (method) {
      ok(sample[method], "Collections have '." + method + "' property defined.");
      ok(util.isFunction(sample[method]), "Collections '." + method + "' property is a method.");
    });

    ok(sample.toString, "Collection has '.toString' property.");
    ok(util.isFunction(sample.toString), "Collection has '.toString' method.");
    equal("[object Collection]", sample.toString(), "Collection '.toString' return proper string.");
  });

  test("'.add' - single item", function () {
    var sample = new Collection();

    sample.add("hello");

    equal(1, sample.length, "Added item increases the length of the Collection.");
  });

  test("'.add' - array of items", function () {
    var sample = new Collection();

    /*Collection.add - */
    sample
      .add([
          "hello"
        , "world"
      ]);

    equal(2, sample.length, "Added item takes arrays as well as single items.");
  });

  test("'.each' - alias to Array.forEach", function () {
    var sample = new Collection()
      , temp;

    sample
      .add("hello")
      .add(" ")
      .add("world");

    temp = "";
    sample
      .each(function (item) {
        temp += item;
      });

    equal("hello world", temp, "Collection.each works.");
  });

  test("'.empty' - most likely only usefule for testing", function  () {
    var sample = new Collection();

    sample
      .add("hello")
      .add("world");

    sample.empty();
    equal(0, sample.length, "Collection.empty ... empties the collection.");
  });

  test("'.getNames' and '.named' - assumes that collections are made up of objects with '.name' properties", function () {
    var data = [{name: "Hanz"},{name: "Franz"}]
      , sample = new Collection();

    ok(sample.getNames, "'.getNames' is defined.");
    ok(util.isFunction(sample.getNames), "'.getNames' is a funciton.");

    ok(sample.getNames, "'.named' is defined.");
    ok(util.isFunction(sample.named), "'.named' is a funciton.");

    sample.add(data);

    equal([data[0].name, data[1].name].join()
        , sample.getNames().join()
        , "Names of elements from the collection.");

    equal(data[0].toString()
        , sample.named(data[0].name).toString()
        , "Names of elements from the collection.");

    equal(JSON.stringify(data.slice(0, 1))
        , JSON.stringify(sample.named(data[0].name))
        , "Names of elements from the collection.");
  });
});
