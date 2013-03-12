/*jshint laxcomma:true*/
/*global require define*/

require(["jquery"
  ], function ($) {
    "use strict";

    var _abilities    = "#abilities"
      , _detail       = "#detail"
      , _saves        = "#saves"
      , _skills       = "#skills"
      , _vitals       = "#vitals"

      , $abilities    = $(_abilities)
      , $detail       = $(_detail)
      , $saves        = $(_saves)
      , $skills       = $(_skills)
      , $vitals       = $(_vitals)
      , $all          = $abilities
                          .and($saves)
                          .and($skills)
                          .and($vitals)

      , templates     = {
          abilities : $abilities.html()
        , saves     : $saves.html()
        , skills    : $skills.html()
        , vitals    : $vitals.html()
      };

    $all.html("waiting for HTML");

    function showDetail (event, player) {
      $detail.show();
    }

    function showSaves (event, player) {

    }

    function showSkills (event, player) {

    }

    function showVitals (event, player) {

    }

    $(document)
      .on("updateCharacter", showDetail)
      .on("updateCharacter", showSaves)
      .on("updateCharacter", showSkills)
      .on("updateCharacter", showVitals);
  });