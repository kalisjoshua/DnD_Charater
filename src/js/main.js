/*jshint laxcomma:true*/
/*global require define*/

require.config({
  basePath: "js"
  ,paths: {
    handlebars: "lib/handlebars"
    ,jquery: ["//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min", "lib/jquery"]
  }
  ,shim: {
    handlebars: {
      exports: "handlebars"
    }
  }
});

// UI setup
require([
  "jquery"
  ,"Castes"
  ,"Classes"
  ,"Races"
  ], function ($, Castes, Classes, Races) {
  "use strict";

  function radioItem (prefix, item, indx) {
    return '<label for="{pre}-{name}"><input id="{pre}-{name}" name="{pre}" type="radio" value="{i}"> {name}</label>'
      .replace(/\{i\}/g, indx)
      .replace(/\{pre\}/g, prefix)
      .replace(/\{name\}/g, item.name);
  }

  function selectOption (item, indx) {
    return '<option value="{i}">{name}</option>'
      .replace(/\{i\}/g, indx)
      .replace(/\{name\}/g, item.name);
  }
  
  $.fn.ready(function () {
    $("#caste")
      .append(Castes.map(radioItem.bind(null, "caste")));

    $("#race")
      .append(Races.map(selectOption));

    $("#class-alpha")
      .append(Classes.map(selectOption));
  });
});

define("roll", [], function () {
  "use strict";
  
  return function (num, faces, sum) {
    var result = [];

    if (!faces) {
      faces = num;
      num = 1;
    }

    while (num > result.length) {
      result.push(parseInt(Math.random() * faces, 10) + 1);
    }

    return num === 1 ? result[0] : (sum ? result.reduce(function (a, b) { return a + b; }) : result);
  };
});
