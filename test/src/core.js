module("Util");

var actual = 11,
    test_obj = [1,2,3,4,1];

test(".clone()", function () {
    ok(Util.clone, "Util.clone defined");

    actual = test_obj = [1,2,[3,4],"hello world!",{"name":"Person"}];
    strictEqual(actual, test_obj, "Two variables pointing to the same memory space should be the same");

    deepEqual(actual, Util.clone(actual), "clone should work");

    actual = test_obj = {
        "name": "Person"
        ,"echo": function () {
            var args = ([]).slice.call(arguments);

            args.forEach(function (node) {
                console && console.log(node);
            });
        }
        ,"hobbies": {
            "Web": [
                "CSS"
                ,"HTML"
                ,"JS"
            ]
            ,"Photog": [
                "10-22mm"
                ,"18-55mm"
                ,"24-105mm"
                ,"50mm"
            ]
        }
    };
    strictEqual(actual, test_obj, "Two objects pointing to the same memory space should be the same");

    deepEqual(actual, Util.clone(actual), "Cloned object should be the 'same' as its source object");
    notStrictEqual(actual, Util.clone(actual), "Cloned objects should not point to the same object in memory");
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
            ,new RegExp
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
    });

    test(".isType()", function () {
        ok(Util.isType, "Util.isType defined");
    });
}());

module("Table");

(function () {
    var actual
        ,temp;
        
    test("initialization", function () {
        ok(Table, "Table is defined");
        
        for (var i = 0, list = "add each getNames named numericSort".split(" "), fn = list[i]; i < list.length; fn = list[++i]) {
            ok(Table.prototype[fn], "Table." + fn + "() defined");
        }
    });

    test("methods", function () {
        actual = [1,2,3,4];
        temp = new Table;

        temp.add(actual);
        equal(actual.join(), temp.join(), "output matches expected");
        equal(4, temp.length, ".add() performs correctly; adding each item, not the the whole as a single item.");

        temp = new Table;
        temp.push(actual);
        notEqual(4, temp.length, ".push() is not the same as .add()");

        actual = (new Table).add([
             {name: "Champion", dice: 6, min: 7}
            ,{name: "Hero",     dice: 4, min: 4}
            ,{name: "npc",      dice: 3, min: 4}
            ,{name: "Player",   dice: 3, min: 7}
            ,{name: "Pleb",     dice: 3, min: 3}
            ]);
        deepEqual(actual.getNames(), ["Champion", "Hero", "npc", "Player", "Pleb"], "getNames() returns correct list.");

        deepEqual(actual.named("Champion"), {name: "Champion", dice: 6, min: 7}, "named() returns correct object from table.");
        notDeepEqual(actual.named("Hero"), {name: "Champion", dice: 6, min: 7}, "named() returns correct object from table.");
        
        actual = (new Table).add([18,12,10,13,17,9,1]);
        equal(actual.numericSort().join(), [1,9,10,12,13,17,18].join(), ".numericSort() ascending.");
        equal(actual.numericSort(true).join(), [18,17,13,12,10,9,1].join(), ".numericSort() descending.");
    });
}());