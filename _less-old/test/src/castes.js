module("castes.js");

test("Castes", function () {
    ok(Castes, "Castes defined");
    ok(Castes.getNames, "list is augmented");
    equal(Castes.named("Hero").column().length, 7, "column() returns 7-value-array");
    ok(Util.isType(Castes.named("Hero"), "Caste"), "getType is working in Util.isType");
});