/**
 * 年月日 控件
 */
"use strict";
define(["main-app", "jquery", "tools", "core/factory/fecha"], function (app, $, tools, fecha) {
    app.directive("ymdPicker", ["$rootScope",
        function ($rootScope) {
            return {
                scope: {
                    jyId: "=", //模块的id
                    jyMinDate: "=",//限制开始日期
                    jyMaxDate: "=",//限制结束日期
                    jyDisabled: "=",//只读
                    jyaRequired: "@",//是否非空，默认false,也可以写自定义的验证
                    jyaPlaceholder: "@",
                    jyaClass: "@",
                    jyaName: "@"//用于验证
                },
                restrict: "E",
                templateUrl: MyConstants.FILE_URL + "/js/core/directive/datetime-picker/ymd-picker.html?vid=" + MyConstants.VERSION,
                replace: true,
                link: function postLink($scope, element, attributes) {
                    $scope.text = "";
                    $scope.$watch("jyId", function (jyId) {
                        if (jyId) {
                            $scope.text = fecha.format(jyId, fecha.YYYYMMDD);
                        } else {
                            $scope.text = "";
                        }
                    });
                }
            };
        }
    ]);
});