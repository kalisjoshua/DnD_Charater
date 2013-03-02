/*jshint*/
/*global define*/

define(["util"], function (util) {
  "use strict";

  function Collection (ar) {
    if (!!ar && util.isArray(ar) && ar.length > 0) {
      Collection.fn.add.call(this, ar);
    }
  }

  Collection.fn = Collection.prototype = [];

  Collection.fn.add = function (ar) {
    if (util.isArray(ar)) {
      this.push.apply(this, ar);
    }

    return this;
  };

  Collection.fn.each = function (fn) {
    this.forEach(function (node, indx, orig) {
      fn(node, indx, orig);
    });

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
    })[0];
  };

  Collection.fn.numericSort = function (descending) {
    var result = this.sort(function (a, b) { return a - b; });

    return descending ? result.reverse() : result;
  };

  Collection.fn.toString = function () {
      
    return "[object Collection]";
  };

  return Collection;
});