"use strict";
define(["main-app", "jquery", "tools"
], function (app, $, tools) {
  app.controller("ServiceEvaluationSuccessCtrl", ["$scope", "$location", "$timeout", "$q", "http", "storage", "scroll",
    function ($scope, $location, $timeout, $q, http, storage, scroll) {
      scroll.init(".service-evaluation-success");
    }
  ]);
});