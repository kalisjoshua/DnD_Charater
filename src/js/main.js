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

  var $caste        = $("#caste")
    , $class_alpha  = $("#class-alpha")
    , $class_beta   = $("#class-beta")
    , $dual         = $("#strictDual")
    , $level        = $("#level")
    , $race         = $("#race")
    , ui_elements   = "#caste, #class-alpha, #class-beta, #level, #race, #strictDual"
    ;

  function attemptPlayerCreation (event) {
  }

  function dualClassHandler (event) {
    var class_alphaValue      = $class_alpha.find("option:selected").val()
      , alpha_className       = $class_alpha.find("option:selected").text()
      , isClassAlphaDualable  = !$dual.is(":checked") || $dual.is(":checked") && Classes[+class_alphaValue].dual.length
      , isClassAlphaSelected  = class_alphaValue !== ""
      , isClassBetaEmpty      = $("#class-beta option").length === 1
      , isStrictDualEvent     = event.target === $dual[0]
      , isRepaintNeeded       = isClassBetaEmpty || isStrictDualEvent

      , list;
    // !BUG: when a beta is selected and strictDual is unchecked, selection is lost

    // add list of character classes to the beta dropdown
    if (isClassAlphaSelected && isClassAlphaDualable && isRepaintNeeded) {
      list = ($dual.is(":checked") ? Classes.duals() : Classes)
        .filter(function (item) {
          return item.name !== alpha_className;
        });

      $class_beta
        .empty()
        .append($class_alpha.children().first().clone())
        .append(list.map(selectOption));
    } else {
      $class_beta
        .empty()
        .append("<option></option>");
    }
  }

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

  function statColumn (event) {
    if (!/label/i.test(event.target.nodeName)) {
      var column = Castes[event.target.value].column()//.join("\n")
        , target = $(event.target);

      target
        .parentsUntil("fieldset")
        .parent()
        .find("span")
        .remove();

      target
        .parent()
        .append($("<span>").text(column));
    }
  }

  $(document)
    .on("click", "#caste label", statColumn)
    .on("change", "#class-alpha, #class-alpha, #strictDual", dualClassHandler)
    .on("change", ui_elements, attemptPlayerCreation);
  
  $.fn.ready(function () {
    $caste
      .append(Castes.map(radioItem.bind(null, "caste")));

    $class_alpha
      .append(Classes.map(selectOption));

    $race
      .append(Races.map(selectOption));
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
