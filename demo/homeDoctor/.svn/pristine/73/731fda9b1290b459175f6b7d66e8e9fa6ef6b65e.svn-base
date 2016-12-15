"use strict";
define(["angular", "main-data", "jquery", "tools", "angular-route", "angular-animate"], function (angular, mainData, $, tools) {

    var app = angular.module("jianyi", ["ngRoute", "ngAnimate"]);

    app.config(["$routeProvider", "$provide", function ($routeProvider, $provide) {
        $routeProvider.when("/:view", {
            templateUrl: function ($routeParams) {
                var view = $routeParams.view;
                if (mainData.alias != null && mainData.alias[view] != null) {
                    view = mainData.alias[view];
                }
                return MyConstants.FILE_URL + "/view/" + view.split(".").join("/") + ".html?vid=" + MyConstants.VERSION;
            },
            reloadOnSearch: false
        }).otherwise({
            redirectTo: "/" + mainData.index
        });
        $provide.decorator("$exceptionHandler", ['$delegate', function ($delegate) {
            return function (exception, cause) {
                //var http = app.get("http");
                //http.post({
                //    url: "/common/saveException.do",
                //    data: {
                //        stackTrace: exception.stack,
                //        message: exception.message
                //    }
                //});
                $delegate(exception, cause);
            }
        }]);
    }]);

    app.run(["$rootScope", function ($rootScope) {
        var parentsData = {};
        var getParentsPath = function (routeTree, parent) {
            tools.each(routeTree, function (item) {
                parentsData[item.path] = item;
                parentsData[item.path].parent = parent;
                if (parentsData[item.path]["children"]) {
                    getParentsPath(parentsData[item.path]["children"], parentsData[item.path]);
                }
            });
        };
        getParentsPath(mainData.routeTree, null);

        var isParent = function (path, lastPath) {
            if (!path || !lastPath) {
                return true;
            }
            var item = parentsData[path];
            if (!item || !item["parent"]) {
                return false;
            } else if (item["parent"]["path"] == lastPath) {
                return true;
            } else {
                isParent(item["parent"]["path"], lastPath);
            }
        };

        $rootScope.$on("$routeChangeStart", function (event, newUrl, oldUrl) {
            $rootScope.$broadcast("routeChangeStart", event, newUrl, oldUrl);
            if (event.defaultPrevented) {
                return;
            }
            $rootScope.lastPath = oldUrl ? oldUrl.params.view : null;
            $rootScope.direction = isParent(newUrl ? newUrl.params.view : null, oldUrl ? oldUrl.params.view : null) ? "right" : "left";
            document.activeElement.blur();
        });

        $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
            $rootScope.$broadcast("routeChangeSuccess", event, current, previous);
            $rootScope.lastRouteChangeSuccessUrl = app.get("$location").path().replace("\/", "");
            tools.destroy();
            app.get("destroy").execute();
        });


        var body = $("body");
        $rootScope.$on("$viewContentLoaded", function () {
            body.removeAttr("class");
            body.removeProp("class");
            body.addClass(mainData.bodyClass[$rootScope.lastRouteChangeSuccessUrl]);
        });


        $rootScope.$on("$routeChangeError", function (event, current, previous) {
            $rootScope.$broadcast("routeChangeError", event, current, previous);
            var $location = app.get("$location");
            if ($rootScope.lastRouteChangeSuccessUrl) {
                $location.path($rootScope.lastRouteChangeSuccessUrl);
            } else {
                $location.path("/" + mainData.index);
            }
            $location.replace();
            $rootScope.needBottomBox = false;
        });
    }]);

    app.directive('ngTap', ["$parse", function ($parse) {
        return {
            compile: function (elem, attr) {
                var fn = $parse(attr.ngTap);
                return function (scope, elem) {
                    tools.addTouchEvent(elem[0], 'tap', function (event) {
                        if (elem.prop("disabled")) {
                            return;
                        }
                        fn(scope, {$event: event});
                        scope.$apply();
                    });
                };
            }
        };
    }]);

    //模块开发不要使用以下方法
    app.get = function (ngObject) {
        if (app.$injector == null) {
            app.$injector = angular.element(document.body).injector();
        }
        return app.$injector.get(ngObject);
    };
    app.invoke = function (ngFunction) {
        if (app.$injector == null) {
            app.$injector = angular.element(document.body).injector();
        }
        return app.$injector.invoke(ngFunction);
    };


    /**
     * 为避免缓存数据被用户删除后导致filter出错 使用这个filter做一层转换 如果不存在不会出错
     */
    app.filter("SafeGetFilter", function () {
        return function (item, filter, defaultValue) {
            try {
                return app.get("$filter")(filter)(item, defaultValue);
            } catch (e) {
                return "";
            }
        };
    });
    app.filter("Html", function () {
        return function (value) {
            try {
                if (!angular.isString(value)) {
                    value = value ? value.toString() : "";
                }
                return app.get("$sce").trustAsHtml(value);
            } catch (e) {
            }
            return value;
        }
    });

    app.filter("TrueOrFalseFilter", function () {
        return function (item) {
            if (item === true) {
                return "是";
            } else if (item === false) {
                return "否";
            }
            return "";
        }
    });

    app.filter("DoubleFilter", function () {
        return function (item) {
            if (!item && item != 0) {
                return "";
            }
            return Math.round(item * 10) / 10;
        }
    });

    app.filter("NumberFilter", function () {
        return function (item, limit) {
            if (item != null && item != undefined && (item + "") != "NaN" && (item + "").trim()) {
                return app.get("$filter")("number")(item, limit);
            }
            return "";
        }
    });
    return app;
});