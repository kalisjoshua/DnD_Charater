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

define(["jquery"], function ($) {
  "use strict";
  
  $.fn.ready(function () {
    // $("body").css("background", "#BADA55");
  });
});