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
    , $class_alpha  = $("#class_alpha")
    , $class_beta   = $("#class_beta")
    , $dual         = $("#strictDual")
    , $level        = $("#level")
    , $race         = $("#race")
    , ui_elements   = "#caste, #class_alpha, #class_beta, #level, #race, #strictDual"
    , firstoption   = $("<option>-- select one --</option>");

  function attemptPlayerCreation (event) {
    if ($class_alpha.val() && $race.val()) {
      console.log("ready to build player");
    } else {}
  }

  function dualClassHandler (event) {
    var class_alphaValue      = $class_alpha.find("option:selected").val()
      , class_betaValue       = $class_beta.find("option:selected").val()
      , isStrictDualSelected  = $dual.is(":checked")
      , isClassAlphaDualable  = !isStrictDualSelected ||
                                !!class_alphaValue && !!Classes.named(class_alphaValue).dual.length

      , list;

    $class_beta.empty();

    // add list of character classes to the beta dropdown
    if (class_alphaValue !== "" && isClassAlphaDualable) {
      list = (isStrictDualSelected ? Classes.duals() : Classes)
        // filter out the selected alpha from the list of possible betas
        .filter(function (item) {
          return item.name !== class_alphaValue;
        })
        .map(selectOption);

      list.unshift(firstoption.clone());

      $class_beta.append(list);

      // ensure against dual classing the same two classes
      if (class_alphaValue !== class_betaValue) {
        $class_beta.val(class_betaValue);
      }
    } else {
      $class_beta.append("<option></option>");
    }
  }

  function radioItem (prefix, item, indx) {
    return '<label for="{pre}-{name}"><input id="{pre}-{name}" name="{pre}" type="radio" value="{i}"> {name}</label>'
      .replace(/\{i\}/g, indx)
      .replace(/\{pre\}/g, prefix)
      .replace(/\{name\}/g, item.name);
  }

  function selectOption (item) {
    return '<option>{name}</option>'
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
    .on("change", "#class_alpha, #class_beta, #strictDual", dualClassHandler)
    .on("change", ui_elements, attemptPlayerCreation);

  $.fn.ready(function () {
    $caste
      .append(Castes.map(radioItem.bind(null, "caste")));

    $class_alpha
      .append(firstoption.clone())
      .append(Classes.map(selectOption));

    $race
      .append(firstoption.clone())
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
