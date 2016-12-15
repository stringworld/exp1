"use strict";
define(["jquery"], function ($) {

    var getIntValue = function (value, defaultValue) {
        if (!defaultValue) {
            defaultValue = "";
        }
        try {
            value = parseInt(value);
            if ((value + "") == "NaN" || value == undefined) {
                return defaultValue;
            } else {
                return value + "";
            }
        } catch (e) {
            return defaultValue;
        }
    };

    var getFloatValue = function (value, defaultValue) {
        if (!defaultValue) {
            defaultValue = "";
        }
        try {
            value = parseFloat(value);
            if ((value + "") == "NaN" || value == undefined) {
                return defaultValue;
            } else {
                return value + "";
            }
        } catch (e) {
            return defaultValue;
        }
    };

    var each = function (array, callBack) {
        if (!array || !callBack) {
            return;
        }
        for (var i = 0; i < array.length; i++) {
            if (callBack(array[i], i) === false) {
                break;
            }
        }
    };

    var alertTemplate = "<div class='tip-box' style='display:none;'>" +
        "<div class='tip-box-title'>温馨提示</div>" +
        "<div class='tip-box-text'>${text}</div>" +
        "</div>";

    var Mask = function (eventId) {
        var mask = null;
        this.show = function () {
            $(document.body).css("overflow-y", "hidden");
            if (mask != null) {
                mask.show();
                return;
            }
            mask = $("<div/>");
            mask.css("position", "absolute");
            mask.css("z-index", 9999);
            mask.css("width", $(window).width());
            mask.css("height", $(window).height());
            mask.css("opacity", 0.15);
            mask.css("filter", "alpha(opacity=30)");
            mask.css("background", "#000");
            mask.css("top", 0);
            mask.css("left", 0);
            $(window).on("resize.alert" + eventId, this.resizeHandler);
            $("body").prepend(mask);
        };
        this.resizeHandler = function () {
            mask.css("width", $(window).width());
            mask.css("height", $(window).height());
        };
        this.hide = function () {
            mask.hide();
            $(document.body).css("overflow-y", "auto");
        };
        this.css = function (a1, a2) {
            if (a2 == null) {
                return mask.css(a1);
            } else {
                mask.css(a1, a2);
            }
        };
        this.close = function () {
            $(document.body).css("overflow-y", "auto");
            if (mask != null) mask.remove();
            $(window).off("resize.alert" + eventId);
            mask = null;
        };
    };

    var alertDefaultButton = function (text, confirmB, cancelB, close) {
        var buttons = {};
        if (confirmB != null)
            buttons["知道了"] = confirmB;

        if (cancelB != null)
            buttons["取消"] = cancelB;
        alertCustomButton(text, buttons, close);
    };

    var alertCache = {};

    var alertCustomButton = function (text, buttons, closeH) {
        var eventId = Math.random().toString().replace(".", "");
        var mask = new Mask(eventId);
        mask.show(true);
        var div = $(alertTemplate.replace("${text}", text));
        $("body").prepend(div);
        if (buttons == null) {
            buttons = {
                "知道了": function () {
                }
            };
        }
        var buttonLength = 0;
        for (var label in buttons) {
            buttonLength++;
        }
        if (buttonLength > 2) {
            alert("提示框最多支持2个按钮");
            return;
        }

        var close = function () {
            delete alertCache[eventId];
            mask.close(true);
            div.hide(200, function () {
                div.remove();
                if (closeH != null) {
                    closeH();
                }
            });
        };

        var buttonIndex = 0;
        for (var label in buttons) {
            buttonIndex++;
            var buttonDiv = $("<div class='tip-box-buttons-" + buttonLength + "-" + buttonIndex + "'><div class='tip-box-top-line'></div></div>");
            var button = $("<button class='tip-box-button-" + buttonLength + "-" + buttonIndex + "'>" + label + "</button>");

            addTouchEvent(button[0], "tap", function () {
                var closeValue = buttons[$(this).text()].call(this, div, close);
                if (closeValue == null || closeValue == true) {
                    close();
                }
            });
            buttonDiv.append(button);
            div.append(buttonDiv);
        }
        div.show(200);

        var object = {
            close: close
        };
        alertCache[eventId] = object;
        return object;
    };

    var alert = function (text, p1, p2, p3) {
        if ($.isFunction(p1)) {
            alertDefaultButton(text, p1, p2, p3);
        } else {
            alertCustomButton(text, p1, p2);
        }
    };

    var getUrlParams = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = decodeURI(window.location.search).substr(1).match(reg);
        if (r != null)return decodeURI(r[2]);
        return null;
    };

    var getRandomId = function () {
        return Math.random().toString().replace(".", "");
    };


    var tapHandlerArray = [];
    var destroy = function () {
        for (var key in alertCache) {
            alertCache[key].close();
        }
        each(tapHandlerArray, function (item) {
            item.destroy();
        });
    };

    //touch事件
    var TOUCHSTART, TOUCHEND;
    if (typeof(window["ontouchstart"]) != 'undefined') {
        TOUCHSTART = 'touchstart';
        TOUCHEND = 'touchend';
    } else if (typeof(window["onmspointerdown"]) != 'undefined') {
        TOUCHSTART = 'MSPointerDown';
        TOUCHEND = 'MSPointerUp';
    } else {
        TOUCHSTART = 'mousedown';
        TOUCHEND = 'mouseup';
    }
    var tap = function (node, callback, scope) {
        var x, y;
        var touchstartHandler = function (event) {
            x = event.touches[0].pageX;
            y = event.touches[0].pageY;
        };
        var touchendHandler = function (event) {
            var curX = event.changedTouches[0].pageX;
            var curY = event.changedTouches[0].pageY;
            if (Math.abs(curX - x) < 6 && Math.abs(curY - y) < 6) {
                callback.apply(scope ? scope : this, arguments);
            }
        };

        node.addEventListener(TOUCHSTART, touchstartHandler);
        node.addEventListener(TOUCHEND, touchendHandler);
        return {
            destroy: function () {
                node.removeEventListener(TOUCHSTART, touchstartHandler);
                node.removeEventListener(TOUCHEND, touchendHandler);
            }
        };
    };

    var longTap = function (node, callback, scope) {
        var x, y, startTime = 0, endTime = 0, inDis = false;

        var touchstartHandler = function (event) {
            x = event.touches[0].pageX;
            y = event.touches[0].pageY;
            startTime = (new Date()).getTime();
        };
        var touchendHandler = function (event) {
            var curX = event.changedTouches[0].pageX;
            var curY = event.changedTouches[0].pageY;
            inDis = !!(Math.abs(curX - x) < 6 && Math.abs(curY - y) < 6);
            endTime = (new Date()).getTime();
            if (endTime - startTime > 300 && inDis) {
                callback.apply(scope ? scope : this, arguments);
            }
        };

        node.addEventListener(TOUCHSTART, touchstartHandler);
        node.addEventListener(TOUCHEND, touchendHandler);
        return {
            destroy: function () {
                node.removeEventListener(TOUCHSTART, touchstartHandler);
                node.removeEventListener(TOUCHEND, touchendHandler);
            }
        };
    };

    var addTouchEvent = function (node, event, callback, scope) {
        var instance;
        if (event === 'tap') {
            instance = tap(node, callback, scope);
        } else if (event === 'longtap') {
            instance = longTap(node, callback, scope);
        } else {
            var handler = function () {
                callback.apply(scope, arguments);
            };
            node.addEventListener(event, handler);
            instance = {
                destroy: function () {
                    node.removeEventListener(event, handler);
                }
            };
        }
        tapHandlerArray.push(instance);
        return {
            destroy: function () {
                instance.destroy();
                if (tapHandlerArray.indexOf(instance) > -1) {
                    tapHandlerArray.splice(tapHandlerArray.indexOf(instance), 1);
                }
            }
        };
    };

    return {
        noop: function () {
        },
        destroy: destroy,
        alert: alert,
        each: each,
        getIntValue: getIntValue,
        getFloatValue: getFloatValue,
        getUrlParams: getUrlParams,
        getRandomId: getRandomId,
        addTouchEvent: addTouchEvent
    };
});