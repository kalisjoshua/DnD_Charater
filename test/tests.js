var TODO = function () {0 ? ok(false, "TODO: add more tests!") : null;};

module("Initialization");

test("dnd global Object setup", function () {
    ok(dnd, "global dnd object is defined");
    ok(dnd.roll, "roll function is defined");
    ok(dnd.ui_init, "ui_init function is defined");

    ok(dnd.PC, "PC is defined on global dnd object");

    ok(Util, "Util object is defined");
});

var actual = 11,
    test_obj = [1,2,3,4,1];

module("Private Members", {
    setup: function () {
    }
});
test("Util.array", function () {
    ok(Util.array, "Util.array defined");

    ok(Util.array.sum, "Util.array.sum defined");

    actual = 10, test_obj = [1,2,3,4];
    equal(actual, Util.array.sum(test_obj), "Values " + actual + " should be equal to Util.array.sum([" + test_obj + "])");

    ok(Util.array.unique, "Util.array.unique defined");

    actual = [1,2,3,4], test_obj = [1,2,3,4,1];
    deepEqual(actual, Util.array.unique(test_obj), "Array " + actual + " should be the same as Util.array.unique([" + test_obj + "])");

    actual = [1], test_obj = [1,1,1,1];
    deepEqual(actual, Util.array.unique(test_obj), "Array " + actual + " should be the same as Util.array.unique([" + test_obj + "])");

    actual = [], test_obj = [];
    deepEqual(actual, Util.array.unique(test_obj), "Array " + actual + " should be the same as Util.array.unique([" + test_obj + "])");

    TODO();
});

test("Util.caste", function () {
    ok(Util.caste, "Util.caste defined");
    var castes = [
        "champion",
        "hero",
        "npc",
        "player",
        "pleb"
    ];
    while (castes.length) {
        ok(Util.caste[castes[0]], "Util.caste." + castes[0] + " defined");
        ok(Util.caste[castes[0]](), "Util.caste." + castes[0] + "() = " + Util.caste[castes[0]]());
        castes.shift();
    }
});

test("Util.clone", function () {
    ok(Util.clone, "Util.clone defined");

    actual = test_obj = [1,2,[3,4],"hello world!",{"name":"Joshua"}];
    strictEqual(actual, test_obj, "Two variables pointing to the same memory space should be the same");

    deepEqual(actual, Util.clone(actual), "clone should work");

    actual = test_obj = {
        "name": "Josh",
        "hobbies": {
            "JS": [
                "CSS",
                "HTML",
                "JS"
            ],
            "Photog": [
                "10-22mm",
                "18-55mm",
                "24-105mm",
                "50mm"
            ]
        }
    };
    strictEqual(actual, test_obj, "Two objects pointing to the same memory space should be the same");

    deepEqual(actual, Util.clone(actual), "Cloned object should be the 'same' as its source object");
    notStrictEqual(actual, Util.clone(actual), "Cloned objects should not point to the same object in memory");

    TODO();
});

test("Util.isArray", function () {
    ok(Util.isArray, "Util.isArray defined");

    test_obj = [];
    ok(Util.isArray(test_obj), "empty array should be detected as an array");

    test_obj = [1,2,3,4];
    ok(Util.isArray(test_obj), "simple array: " + test_obj);

    test_obj = [1,2,[3,4],"hello world!", {"name":"Joshua"}];
    ok(Util.isArray(test_obj), "more complex array: " + test_obj);

    test_obj = {};
    ok(!Util.isArray(test_obj), "empty object should not be detected as an array");

    test_obj = {"name":"Joshua"};
    ok(!Util.isArray(test_obj), "simple object: " + test_obj);

    ok(!Util.isArray(), "passing in various non-arrays should be fine: " + undefined);
    ok(!Util.isArray(1), "passing in various non-arrays should be fine: " + 1);
    ok(!Util.isArray(null), "passing in various non-arrays should be fine: " + null);
    ok(!Util.isArray(Math), "passing in various non-arrays should be fine: " + Math);
    ok(!Util.isArray("string"), "passing in various non-arrays should be fine: " + "string");
    ok(!Util.isArray(function () {}), "passing in various non-arrays should be fine: " + function () {});
});

test("Util.isNumeric", function () {
    ok(Util.isNumeric, "Util.isNumeric defined");

    test_obj = 100
    ok(Util.isNumeric(test_obj), "simple integer: " + test_obj);

    test_obj = -100
    ok(Util.isNumeric(test_obj), "simple integer: " + test_obj);

    test_obj = 1/4;
    ok(Util.isNumeric(test_obj), "fraction: " + test_obj);

    test_obj = 2/3;
    ok(Util.isNumeric(test_obj), "fraction: " + test_obj);

    test_obj = 1234e56;
    ok(Util.isNumeric(test_obj), "large numbers: " + test_obj);

    test_obj = 1234e-56;
    ok(Util.isNumeric(test_obj), "very small numbers: " + test_obj);

    test_obj = "1234";
    ok(Util.isNumeric(test_obj), "string numbers: " + test_obj);

    test_obj = "-1234";
    ok(Util.isNumeric(test_obj), "string numbers: " + test_obj);

    test_obj = ".0987";
    ok(Util.isNumeric(test_obj), "string numbers: " + test_obj);

    test_obj = "0.0987";
    ok(Util.isNumeric(test_obj), "string numbers: " + test_obj);

    test_obj = "-.0987";
    ok(Util.isNumeric(test_obj), "string numbers: " + test_obj);

    test_obj = "abc.0987";
    ok(!Util.isNumeric(test_obj), "non-numeric: " + test_obj);

    test_obj = ".0987abc";
    ok(!Util.isNumeric(test_obj), "non-numeric: " + test_obj);

    test_obj = "";
    ok(!Util.isNumeric(test_obj), "non-numeric (empty string): " + test_obj);

    test_obj = Math;
    ok(!Util.isNumeric(test_obj), "non-numeric: " + test_obj);

    test_obj = [1,2,3,4];
    ok(!Util.isNumeric(test_obj), "non-numeric: " + test_obj);

    ok(!Util.isNumeric(), "nothing at all");
});

test("Util.isObject", function () {
    ok(Util.isObject, "Util.isObject defined");

    test_obj = {};
    ok(Util.isObject(test_obj), "simplest js object: " + test_obj);

    test_obj = new Object();
    ok(Util.isObject(test_obj), "base js object: " + test_obj);

    test_obj = [];
    ok(!Util.isObject(), "Array not Object (empty): " + test_obj);

    test_obj = [1,2,3,4];
    ok(!Util.isObject(), "Array not Object: " + test_obj);

    test_obj = {"name":"Joshua"};
    ok(Util.isObject(test_obj), "Simple JSON object: " + test_obj);

    TODO();
});

test("Util.isType", function () {
    ok(Util.isType, "Util.isType defined");
    
    TODO();
});

test("Util.roll", function () {
    ok(Util.roll, "Util.roll defined");

    test_obj = Util.roll(6);
    ok(test_obj, "Passing in only one argument; argument is number of faces on die: " + test_obj);

    test_obj = Util.roll(1,6);
    ok(test_obj, "Takes 2 arguments; first is number of dice, second is number of faces on die: " + test_obj);

    raises(function () {
        Util.roll();
    }, Error, "invalid arguments should throw an error to help debugging - both undefined (implicit)");

    raises(function () {
        Util.roll(undefined, undefined);
    }, Error, "invalid arguments should throw an error to help debugging - both undefined (explicit)");

    raises(function () {
        Util.roll(undefined, 20);
    }, Error, "invalid arguments should throw an error to help debugging - first: undefined (explicit)");

    raises(function () {
        Util.roll("abc", 20);
    }, Error, "invalid arguments should throw an error to help debugging - first: string value, non-numeric");

    raises(function () {
        Util.roll("-10", 20);
    }, Error, "invalid arguments should throw an error to help debugging - first: string value, negative value");

    raises(function () {
        Util.roll("abc", "def");
    }, Error, "invalid arguments should throw an error to help debugging - both invalid strings");

    ok();
});

module("");

test("", function () {
    
});