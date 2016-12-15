"use strict";
define(["main-app"], function (app) {

    app.factory("buttonInterval", ["$interval", "destroy",
        function ($interval, destroy) {

            var callBack = {};

            destroy.factoryAddDestroyListener(function () {
                callBack = {};
            });

            var add = function (id, button, seconds) {
                if (seconds === null || seconds === undefined || seconds === 0) {
                    return;
                }
                if (button) {
                    var oldText = button.html();
                    button.attr("disabled", "disabled");
                    callBack[id] = function (_seconds) {
                        if (_seconds === 0) {
                            button.html(oldText);
                            button.removeAttr("disabled");
                        } else {
                            button.html(oldText + "(" + _seconds + ")");
                        }
                    };
                }

                if (!window.localStorage["allButtonInterval"]) {
                    window.localStorage["allButtonInterval"] = JSON.stringify([id]);
                } else {
                    var allButtonInterval = JSON.parse(window.localStorage["allButtonInterval"]);
                    var exist = false;
                    for (var i = 0; i < allButtonInterval.length; i++) {
                        if (allButtonInterval[i] == id) {
                            exist = true;
                        }
                    }
                    if (!exist) {
                        allButtonInterval.push([id]);
                        window.localStorage["allButtonInterval"] = JSON.stringify(allButtonInterval);
                    }
                }
                window.localStorage["buttonInterval" + id] = seconds;
                start();
            };

            var refresh = function (id, button) {
                if (window.localStorage && window.localStorage["buttonInterval" + id]) {
                    add(id, button, parseInt(window.localStorage["buttonInterval" + id]));
                }
            };

            var startFlag = false;
            var start = function () {
                if (startFlag || !window.localStorage["allButtonInterval"]) {
                    return;
                }
                startFlag = true;
                var intervalTimer = $interval(function () {
                    var allButtonInterval = JSON.parse(window.localStorage["allButtonInterval"]);
                    var runningFlag = false;
                    angular.forEach(allButtonInterval, function (id) {
                        var value = window.localStorage["buttonInterval" + id];
                        if (value !== null && value !== undefined) {
                            window.localStorage["buttonInterval" + id] = value - 1;
                            callBack[id] && callBack[id](value - 1);
                            if (value - 1 === 0) {
                                delete window.localStorage["buttonInterval" + id];
                            }
                            runningFlag = true;
                        }
                    });
                    if (!runningFlag) {
                        $interval.cancel(intervalTimer);
                        startFlag = false;
                    }
                }, 1000);
            };

            return {
                add: add,//查询数据使用
                refresh: refresh,
                start: start
            };
        }
    ]);
});