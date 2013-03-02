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

      , templates     = {
          abilities : $abilities.html()
        , saves     : $saves.html()
        , skills    : $skills.html()
        , vitals    : $vitals.html()
      };

    $abilities
      .add($saves)
      .add($skills)
      .add($vitals)
      .html("waiting for HTML");

    function showGrid (event, player) {
      $detail.show();
    }

    $(document)
      .on("showGrid", showGrid);
  });