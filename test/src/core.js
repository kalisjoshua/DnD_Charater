var TODO = function () {0 ? ok(false, "TODO: add more tests!") : null;};

module("core.js");

test("dnd global Object setup", function () {
    ok(dnd, "global dnd object is defined");
});

test("dnd.roll()", function () {
    ok(dnd.roll, "dnd.roll defined");

    test_obj = dnd.roll(6);
    ok(test_obj, "Passing in only one argument; argument is number of faces on die: " + test_obj);

    test_obj = dnd.roll(1,6);
    ok(test_obj, "Takes 2 arguments; first is number of dice, second is number of faces on die: " + test_obj);

    raises(function () {
        dnd.roll();
    }, Error, "invalid arguments should throw an error to help debugging - both undefined (implicit)");

    raises(function () {
        dnd.roll(undefined, undefined);
    }, Error, "invalid arguments should throw an error to help debugging - both undefined (explicit)");

    raises(function () {
        dnd.roll("abc", "def");
    }, Error, "invalid arguments should throw an error to help debugging - both invalid strings");

    raises(function () {
        dnd.roll(undefined, 20);
    }, Error, "invalid arguments should throw an error to help debugging - first: undefined (explicit)");

    raises(function () {
        dnd.roll("abc", 20);
    }, Error, "invalid arguments should throw an error to help debugging - first: string value, non-numeric");

    raises(function () {
        dnd.roll(-10, 20);
    }, Error, "invalid arguments should throw an error to help debugging - first: string value, negative value");

    raises(function () {
        dnd.roll("-10", 20);
    }, Error, "invalid arguments should throw an error to help debugging - first: string value, negative value as string");

    raises(function () {
        dnd.roll(0);
    }, Error, "invalid arguments should throw an error to help debugging - first: zero not allowed");

    raises(function () {
        dnd.roll(0, "abc");
    }, Error, "invalid arguments should throw an error to help debugging - first: zero not allowed");

    raises(function () {
        dnd.roll(0, 20);
    }, Error, "invalid arguments should throw an error to help debugging - first: zero not allowed");

    raises(function () {
        dnd.roll(1);
    }, Error, "invalid arguments should throw an error to help debugging - first only: one not allowed because it is transposed to the second argument");

    raises(function () {
        dnd.roll(1, "");
    }, Error, "invalid arguments should throw an error to help debugging - second: empty string");

    raises(function () {
        dnd.roll(1, "abc");
    }, Error, "invalid arguments should throw an error to help debugging - second: string");

    raises(function () {
        dnd.roll(1, -1);
    }, Error, "invalid arguments should throw an error to help debugging - second: negative number");

    raises(function () {
        dnd.roll(1, "-1");
    }, Error, "invalid arguments should throw an error to help debugging - second: negative number as string");
});

var actual = 11,
    test_obj = [1,2,3,4,1];

module("Util");

test(".array", function () {
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

test(".Caste{...}", function () {
    ok(Util.Caste, "Util.caste defined");
    var castes = [
        "champion",
        "hero",
        "npc",
        "player",
        "pleb"
    ];
    while (castes.length) {
        ok(Util.Caste[castes[0]], "Util.caste." + castes[0] + " defined");
        ok(Util.Caste[castes[0]](), "Util.caste." + castes[0] + "() = " + Util.Caste[castes[0]]());
        castes.shift();
    }

    TODO(); // refactor Caste out of Util
});

test(".clone()", function () {
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

(function () {
    var actual = [
             (function() {return arguments;}()) //  0 arguments
            ,[1, 2, 3]                          //  1 array
            ,new Boolean(true)                  //  2 boolean
            ,true                               //  3
            ,new Date()                         //  4 date
            ,new Error()                        //  5 error
            ,function () {}                     //  6 function
            ,JSON                               //  7 json
            ,Math                               //  8 math
            ,NaN                                //  9 NaN
            ,new Number(4)                      // 10 number
            ,9                                  // 11
            ,null                               // 11 null
            ,{a: 4}                             // 12 object
            ,new Object()                       // 13 
            ,/a-z/                              // 14 regexp
            ,new String("abc")                  // 15 string
            ,"Hello"                            // 16
            ,(function (u) {return u;}())       // 17 undefined
        ],
        temp;

    test(".isArray()", function () {
        ok(Util.isArray, "Util.isArray defined");

        for(temp in actual) {
            if (parseInt(temp, 10) === 1) {
                ok( Util.isArray(actual[temp]), actual[temp] + " (" + ({}).toString.call(actual[temp]) + ") pass");
            } else {
                ok(!Util.isArray(actual[temp]), actual[temp] + " (" + ({}).toString.call(actual[temp]) + ") fail");
            }
        }
    });

    test(".isNumeric()", function () {
        ok(Util.isNumeric, "Util.isNumeric defined");

        for(temp in actual) {
            if (parseInt(temp, 10) === 10 || parseInt(temp, 10) === 11) {
                ok( Util.isNumeric(actual[temp]), actual[temp] + " (" + ({}).toString.call(actual[temp]) + ") pass");
            } else {
                ok(!Util.isNumeric(actual[temp]), actual[temp] + " (" + ({}).toString.call(actual[temp]) + ") fail");
            }
        }

        var numbers = [
                ,0
                ,0.0
                ,123456
                ,-123456
                ,.123456
                ,1.23456
                ,123456.
                ,1/2
                ,2/3
                ,1/23456
                ,1234e56
                ,1234-56
                ,"123456"
                ,"-123456"
            ];

        for(temp in numbers) {
            ok(Util.isNumeric(numbers[temp]), numbers[temp]);
        }

        numbers = [
             "abd.123"
            ,".123abc"
        ];

        for(temp in numbers) {
            ok(!Util.isNumeric(numbers[temp]), numbers[temp]);
        }
    });

    test(".isObject()", function () {
        ok(Util.isObject, "Util.isObject defined");

        for(temp in actual) {
            if (parseInt(temp, 10) === 13 || parseInt(temp, 10) === 14) {
                ok( Util.isObject(actual[temp]), actual[temp] + " (" + ({}).toString.call(actual[temp]) + ") pass");
            } else {
                ok(!Util.isObject(actual[temp]), actual[temp] + " (" + ({}).toString.call(actual[temp]) + ") fail");
            }
        }

        TODO();
    });

    test(".isString()", function () {
        ok(Util.isObject, "Util.isString defined");

        for(temp in actual) {
            if (parseInt(temp, 10) === 16 || parseInt(temp, 10) === 17) {
                ok( Util.isString(actual[temp]), actual[temp] + " (" + ({}).toString.call(actual[temp]) + ") pass");
            } else {
                ok(!Util.isString(actual[temp]), actual[temp] + " (" + ({}).toString.call(actual[temp]) + ") fail");
            }
        }

        TODO();
    });

    test(".isType()", function () {
        ok(Util.isType, "Util.isType defined");
        
        TODO();
    });
}());

test(".isValidAbilityScore()", function () {
    ok(Util.isValidAbilityScore, "Util.isValidAbilityScore defined");

    test_obj = [3,"5",10,3*5,44/2, 24];
    while (test_obj.length) {
        ok(Util.isValidAbilityScore(test_obj[0]), "Util.isValidAbilityScore - valid value: " + test_obj[0]);
        test_obj.shift();
    }

    test_obj = [1, 3.5,4/2,5*5,"abc"];
    while (test_obj.length) {
        ok(!Util.isValidAbilityScore(test_obj[0]), "Util.isValidAbilityScore - invalid value: " + test_obj[0]);
        test_obj.shift();
    }
});

test(".stats()", function () {
    ok(Util.stats, "Util.stats defined");

    TODO();
});