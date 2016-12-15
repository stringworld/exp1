"use strict";
define(["main-app", "tools", "jquery", "iscroll"], function (app, tools, jquery, iscroll) {
    app.factory("scroll", ["destroy",
        function (destroy) {
            var defaultParams = {
                scrollbars: true,
                fadeScrollbars: true,
                probeType: 1,
                paging: false,
                preventDefaultException: {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/, className: /(^|\s)touch-effect(\s|$)/ },
                pagingHeight: 2//单位rem
            };
            var scrollRecord = {};
            var scrollArray = [];
            var init = function (selector, params) {
                if (!params) {
                    params = {};
                }
                if (params.paging) {
                    params.probeType = 3;
                }
                var myScroll = new iscroll(selector, $.extend(true, {}, defaultParams, params));

                var eventArray = {
                    slideDown: [],
                    slideDownFlag: []
                };
                var instance = {
                    scroll: myScroll,
                    selector: selector + (params["alias"] ? params["alias"] : ""),
                    destroy: function () {
                        myScroll.destroy();
                        for (var key in eventArray) {
                            eventArray[key] = [];
                        }
                    },
                    on: function (key, func) {
                        eventArray[key].push(func);
                    },
                    trigger: function (key, data) {
                        tools.each(eventArray[key], function (handler) {
                            handler.call(myScroll, data);
                        });
                    }
                };
                scrollArray.push(instance);

                myScroll.on("scrollStart", function () {
                    myScroll.refresh();
                });

                var record = scrollRecord[selector];
                if (record) {
                    myScroll.scrollTo(record.x, record.y);
                }

                var refreshI = 0;
                var refreshInitTimer = setInterval(function () {
                    myScroll.refresh();
                    if (++refreshI > 10) {
                        clearInterval(refreshInitTimer);
                    }
                }, 100);

                var $selector = $(selector);
                if (params.paging) {
                    var $html = $("html");
                    var $selector1 = $(selector);
                    var $selector2 = $(selector + " :eq(0)");
                    var slideDownFlag = false;
                    $selector.on("touchend", function () {
                        if (slideDownFlag) {
                            instance.trigger("slideDown");
                        }
                    });
                    myScroll.on("scroll", function () {
                        var pagingHeight = parseFloat($html.css("font-size").replace("px", "")) * defaultParams.pagingHeight;
                        slideDownFlag = Math.abs(myScroll.y) > 10 && -myScroll.y > ($selector2.height() - $selector1.height() + pagingHeight);
                        instance.trigger("slideDownFlag", slideDownFlag);
                    });
                }
                return instance;
            };
            destroy.factoryAddDestroyListener(function () {
                tools.each(scrollArray, function (instance) {
                    scrollRecord[instance.selector] = {
                        x: instance.scroll.x,
                        y: instance.scroll.y
                    };
                    instance.destroy();
                });
                scrollArray = [];
            });

            return {
                init: init,
                refresh: function () {
                    tools.each(scrollArray, function (instance) {
                        instance.scroll.refresh();
                    });
                }
            };
        }
    ]);
});