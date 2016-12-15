"use strict";
define(["main-app", "jquery", "tools"
], function (app, $, tools) {
  app.controller("CallDoctorCtrl", ["$scope", "$location", "$timeout", "$q", "http", "storage", "scroll",
    function ($scope, $location, $timeout, $q, http, storage, scroll) {
      scroll.init(".call-doctor-main");
    }
  ]);
});