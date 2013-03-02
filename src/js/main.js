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

// builder UI setup
require(["jquery", "Castes", "Classes", "Races"
  ], function  ($,  Castes,   Classes,   Races) {
  "use strict";

  var empty_option  = $("<option value>-- select one --</option>")
        .wrap("div")  // so that .clone() isn't
        .parent()     // needed each time a new
        .html()       // instance is apended

    // DOM selectors
    , _caste        = "#caste"
    , _class_alpha  = "#class_alpha"
    , _class_beta   = "#class_beta"
    , _strict_dual  = "#strict_dual"
    , _level        = "#level"
    , _race         = "#race"
    , _stats_column = "#stats_column"

    // selector groups
    , dual_elements = [_class_alpha, _class_beta, _strict_dual].join()
    , ui_elements   = [_caste, _class_alpha, _class_beta, _strict_dual, _level, _race, _stats_column].join()

    // jQuery DOM object references
    , $caste        = $(_caste)
    , $class_alpha  = $(_class_alpha)
    , $class_beta   = $(_class_beta)
    , $strict_dual  = $(_strict_dual)
    , $level        = $(_level)
    , $race         = $(_race)
    , $stats_column = $(_stats_column);

  function attemptPlayerCreation (event) {
    if ($class_alpha.val() && $race.val()) {
      console.log("ready to build player");
    } else {}
  }

  function dualClassHandler (event) {
    var class_alphaValue      = $class_alpha.find("option:selected").val()
      , class_betaValue       = $class_beta.find("option:selected").val()
      , isStrictDualSelected  = $strict_dual.is(":checked")
      , isClassAlphaDualable  = !isStrictDualSelected ||
                                !!class_alphaValue &&
                                !!Classes.named(class_alphaValue).dual.length

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

      list.unshift(empty_option);

      $class_beta.append(list);

      // ensure against dual classing the same two classes
      if (class_alphaValue !== class_betaValue) {
        $class_beta.val(class_betaValue);
      }
    } else {
      $class_beta.append("<option></option>");
    }
  }

  function initUI () {
    $caste
      .append(Castes.map(radioItem.bind(null, "caste")));

    $class_alpha
      .append(empty_option)
      .append(Classes.map(selectOption));

    $race
      .append(empty_option)
      .append(Races.map(selectOption));
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
      var column = Castes[event.target.value].column();

      $stats_column
        .val(column)
        .parent()
        .show();
    }
  }

  $(document)
    .on("click", _caste + " label", statColumn)
    .on("change", dual_elements, dualClassHandler)
    .on("change", ui_elements, attemptPlayerCreation)
    .on("ready", initUI);
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
