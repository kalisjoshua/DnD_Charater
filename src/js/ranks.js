/*jshint laxcomma:true*/
/*global define*/

define([      "Collection", "Rank"
  ], function (Collection,   Rank) {
  "use strict";

  return new Collection([
       new Rank({name: "Champion", dice: 6, min: 7})
      ,new Rank({name: "Hero"    , dice: 4, min: 4})
      ,new Rank({name: "npc"     , dice: 3, min: 4})
      ,new Rank({name: "Player"  , dice: 3, min: 7})
      ,new Rank({name: "Pleb"    , dice: 3, min: 3})
    ]);
});