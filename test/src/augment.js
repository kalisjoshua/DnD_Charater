module("augment.js");

(function () {
    var actual
        ,temp;
        
    test("initialization", function () {
        ok(augment, "activeList is defined");

        actual = [
        // Array methods
            "concat"
            ,"filter"
            ,"forEach"
            ,"join"
            ,"map"
            ,"pop"
            ,"push"
            ,"reduce"
            ,"reduceRight"
            ,"shift"
            ,"slice"
            ,"splice"
            ,"unshift"
        // activeList methods
            ,"add"
            ,"each"
            // ,"find"
        ];
        
        for (temp in actual) {
            ok(augment()[actual[temp]], "activeList." + actual[temp] + "() defined");
        }
    });

    test("methods' output", function () {
        temp = [1,2,3,4]
        equal(temp.join(), augment(temp).join(), "regular array and activelist have same join result");

        temp = augment(temp).filter(function (a) {
            return a % 2 == 0;
        });
        equal([2,4].join(), augment(temp).join(), "");

        temp = [1,2,3,4];
        temp.push.apply(temp, [5,6,7]);
        equal(temp.join(), augment([1,2,3,4]).add([5,6,7]).join(), "");

        temp = [1,2,3,4];
        equal([0,1,0,1].join(), augment(temp).map(function (a) {
            return a % 2 ? 0 : 1;
        }).join(), "");
    });
}());