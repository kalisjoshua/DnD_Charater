/*jshint laxcomma:true*/
/*global define*/

define([      "util"
  ], function (util) {
  "use strict";

  function Collection (ar) {
    if (this === (function () {return this;}())) {
      // called as a function instead of a constructor - fix it!
      return new Collection(ar);
    }

    if (!!ar && util.isArray(ar) && ar.length > 0) {
      Collection.fn.add.call(this, ar);
    }
  }

  Collection.fn = Collection.prototype = [];

  Collection.fn.add = function (ar) {
    if (util.isArray(ar)) {
      this.push.apply(this, ar);
    } else {
      this.push.call(this, ar);
    }

    return this;
  };

  Collection.fn.each = [].forEach;

  Collection.fn.empty = function () {
    while (this.shift());

    return this;
  };

  Collection.fn.getNames = function () {

    return this.map(function (node) {
      return node.name;
    });
  };

  Collection.fn.named = function (key) {

    return this.filter(function (node) {
      return node.name === key;
    });
  };

  Collection.fn.toString = function () {

    return "[object Collection]";
  };

  return Collection;
});