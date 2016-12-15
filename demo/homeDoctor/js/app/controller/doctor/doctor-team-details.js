"use strict";
define(["main-app", "jquery", "tools"
], function (app, $, tools) {
  app.controller("DoctorTeamDetailsCtrl", ["$scope", "$location", "$timeout", "$q", "http", "storage", "scroll",
    function ($scope, $location, $timeout, $q, http, storage, scroll) {
      scroll.init(".doctor-team-details-info");
    }
  ]);
});