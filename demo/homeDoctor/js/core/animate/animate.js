"use strict";
define(["main-app"], function (app) {
    app.animation(".view-slide-in", ["$rootScope", function ($rootScope) {
        return {
            enter: function (element, done) {
                element.css("position", "fixed");
                element.height($(window).height());
                element.width($(window).width());
                var execute = function () {
                    setTimeout(function () {
                        element.removeClass("fadeOutLeft fadeOutRight fadeInLeft fadeInRight");
                        element.css("position", "inherit");
                        element.height("auto");
                        element.width("auto");
                        done();
                    }, 500);
                };
                if ($rootScope.direction == "left") {
                    element.addClass("fadeInLeft");
                    execute();
                } else if ($rootScope.direction == "right") {
                    element.addClass("fadeInRight");
                    execute();
                } else {
                    element.css({
                        opacity: 0
                    }).animate({
                        opacity: 1
                    }, 500, done);
                }
            },
            leave: function (element, done) {
                done();
                //element.css("position", "fixed");
                //element.height($(window).height());
                //element.width($(window).width());
                //if ($rootScope.direction == "left") {
                //    element.addClass("fadeOutRight");
                //} else if ($rootScope.direction == "right") {
                //    element.addClass("fadeOutLeft");
                //}
                //setTimeout(done, 500);
            }
        };
    }]);

    app.animation(".repeat-animation", function () {
        return {
            enter: function (element, done) {
                element.css({
                    opacity: 0
                }).animate({
                    opacity: 1
                }, 300, done);
            },
            leave: function (element, done) {
                element.css({
                    opacity: 0
                });
                done();
            }
        };
    });

    app.animation(".hide-animation", function () {
        return {
            beforeAddClass: function (element, className, done) {
                if (className === "ng-hide") {
                    element.css({
                        opacity: 1
                    }).animate({
                        opacity: 0
                    }, 300, done);
                } else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                if (className === "ng-hide") {
                    element.css({
                        opacity: 0
                    }).animate({
                        opacity: 1
                    }, 300, done);
                } else {
                    done();
                }
            }
        };
    });

    //隐藏时不出现动画 避免两个本该互斥的节点同时存在导致的布局问题
    app.animation(".hide-animation2", function () {
        return {
            beforeAddClass: function (element, className, done) {
                done();
            },
            removeClass: function (element, className, done) {
                if (className === "ng-hide") {
                    element.css({
                        opacity: 0
                    }).animate({
                        opacity: 1
                    }, 300, done);
                } else {
                    done();
                }
            }
        };
    });

    app.animation(".fade-in-up-out-down-animation", function () {
        return {
            beforeAddClass: function (element, className, done) {
                element.addClass("animated");
                if (className === "ng-hide") {
                    element.removeClass("fadeInUp");
                    element.addClass("fadeOutDown");
                    setTimeout(done, 500);
                } else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                element.addClass("animated");
                if (className === "ng-hide") {
                    element.removeClass("fadeOutDown");
                    element.addClass("fadeInUp");
                    setTimeout(done, 500);
                } else {
                    done();
                }
            }
        };
    });

});