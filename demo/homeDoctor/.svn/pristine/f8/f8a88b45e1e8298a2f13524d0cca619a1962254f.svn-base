"use strict";
require.config({
  paths: {
    "tools": "../core/util/tools",
    "main-app": "../core/main-app",
    "common-module": "../core/common-module",
    "jquery": "../plugins/jQuery/dist/jquery.min",
    "angular": "../plugins/angular/angular.min",
    "angular-route": "../plugins/angular-route/angular-route.min",
    "angular-animate": "../plugins/angular-animate/angular-animate.min",
    "iscroll": "../plugins/iscroll/build/iscroll-probe",
    "core": "../core",
    "wx": "//res.wx.qq.com/open/js/jweixin-1.0.0",
    "full-page": "../plugins/fullPage/jquery.fullPage.min",
    "easing": "../plugins/fullPage/jquery.easing.min",
  },
  shim: {
    "angular": {
      deps: ["jquery"],
      exports: "angular"
    },
    "angular-route": {
      deps: ["angular"]
    },
    "angular-animate": {
      deps: ["angular"]
    },
    "angular-touch": {
      deps: ["angular"]
    },
    "fastclick": {
      deps: ["jquery"]
    },
    "full-page": {
      deps: ["jquery"]
    },
    "easing": {
      deps: ["full-page"]
    }
  },
  urlArgs: "version=1.0.9"
});

require(["angular", "main-module"], function (angular) {
  angular.bootstrap(document, ["jianyi"]);
});
