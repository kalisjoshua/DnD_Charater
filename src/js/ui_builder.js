/*jshint laxcomma:true*/
/*global require define*/

define([ "jquery", "castes", "races", "station_list"
  ], function ($,   castes,   races,   station_list) {
    "use strict";

    var empty_option  = $("<option value>-- select one --</option>")
          .wrap("div")  // so that .clone() isn't
          .parent()     // needed each time a new
          .html()       // instance is apended

      // DOM selectors
      , _station      = "#station"
      , _caste_alpha  = "#caste_alpha"
      , _caste_beta   = "#caste_beta"
      , _strict_dual  = "#strict_dual"
      , _level        = "#level"
      , _race         = "#race"
      , _stats_column = "#stats_column"

      // selector groups
      , dual_elements = [_caste_alpha, _caste_beta, _strict_dual].join()
      , ui_elements   = [_station, _caste_alpha, _caste_beta, _strict_dual, _level, _race, _stats_column].join()

      // jQuery DOM object references
      , $station      = $(_station)
      , $caste_alpha  = $(_caste_alpha)
      , $caste_beta   = $(_caste_beta)
      , $document     = $(document)
      , $strict_dual  = $(_strict_dual)
      , $level        = $(_level)
      , $race         = $(_race)
      , $stats_column = $(_stats_column);

    function attemptPlayerCreation (event) {
      if ($caste_alpha.val() && $race.val()) {
        $document
          .trigger("showGrid", 9);
      }
    }

    function dualCasteHandler (event) {
      var list
        , caste_alphaValue      = $caste_alpha.find("option:selected").val()
        , caste_betaValue       = $caste_beta.find("option:selected").val()
        , isStrictDualSelected  = $strict_dual.is(":checked")
        , isCasteAlphaDualable  = !isStrictDualSelected ||
                                  !!caste_alphaValue &&
                                  !!castes.named(caste_alphaValue).dual.length;

      $caste_beta.empty();

      // add list of character castes to the beta dropdown
      if (caste_alphaValue !== "" && isCasteAlphaDualable) {
        list = (isStrictDualSelected ? castes.duals() : castes)
          // filter out the selected alpha from the list of possible betas
          .filter(function (item) {
            return item.name !== caste_alphaValue;
          })
          .map(selectOption);

        list.unshift(empty_option);

        $caste_beta.append(list);

        // ensure against dual Casteing the same two castes
        if (caste_alphaValue !== caste_betaValue) {
          $caste_beta.val(caste_betaValue);
        }
      } else {
        $caste_beta.append("<option></option>");
      }
    }

    function initUI () {
      $station
        .append(station_list.map(radioItem.bind(null, "rank")));

      $caste_alpha
        .append(empty_option)
        .append(castes.map(selectOption));

      $race
        .append(empty_option)
        .append(races.map(selectOption));
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
        var column = station_list[event.target.value].column();

        $stats_column
          .val(column)
          .parent()
          .show();
      }
    }

    $document
      .on("click", _station + " label", statColumn)
      .on("change", dual_elements, dualCasteHandler)
      .on("change", ui_elements, attemptPlayerCreation)
      .on("ready", initUI);
});