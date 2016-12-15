"use strict";
define(["main-app", "tools"], function (app, tools) {

    app.directive("keySearch", ["$rootScope",
        function ($rootScope) {
            return {
                scope: {
                    jyKey: "="
                },
                restrict: "E",
                templateUrl: MyConstants.FILE_URL + "/js/core/directive/key-search/key-search.html?vid=" + MyConstants.VERSION,
                replace: true,
                link: function ($scope, element) {
                    $scope.center = !$scope.jyKey;
                    $scope.focus = function () {
                        $scope.center = false;
                    };
                    $scope.blur = function () {
                        $scope.center = !$scope.jyKey;
                    };
                    $scope.cancel = function () {
                        $scope.jyKey = "";
                        $scope.center = true;
                    };
                    var input = element.find("input");
                    $scope.clear = function () {
                        $scope.jyKey = "";
                        input.focus();
                    };
                }
            };
        }
    ]);
});