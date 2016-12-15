"use strict";
define(["main-app", "tools"], function (app, tools) {

    app.directive("bottomGroup", ["$rootScope",
        function ($rootScope) {
            return {
                scope: {
                    jyfSubmit: "&"
                },
                restrict: "E",
                template: "",
                replace: true,
                link: function ($scope, element) {
                    element.addClass("table-div position-relative");
                    if ($scope.irsaIsSimpleStyle === "true") {
                        element.addClass("simple-table-div");
                    }

                    var message = $("<div class='table-message'></div>");
                    var loading = $("<div class='windows8'></div>");
                    for (var i = 1; i <= 5; i++) {
                        loading.append("<div class='w-ball w-ball-" + i + "'><div class='w-inner-ball'></div></div>");
                    }

                    element.append(loading);
                    element.append(message);

                    var bodyTable = element.find(".body-div").find("table");
                    var tempTr1 = $("<tr></tr>");
                    var tempTr2 = $("<tr></tr>");

                    $scope.$watch("irsLoading", function () {
                        if ($scope.irsLoading) {
                            message.hide();
                            loading.show();
                            bodyTable.append(tempTr1);
                        } else {
                            loading.hide();
                            tempTr1.remove();
                        }
                    });

                    $scope.$watch("irsContent", function () {
                        if (!$scope.irsContent || $scope.irsContent.length > 0) {
                            message.hide();
                            tempTr2.remove();
                        } else {
                            message.html("未查找到数据");
                            message.show();
                            bodyTable.append(tempTr2);
                        }
                    });
                    $compile(element, $scope.$rootScope);

                    var autoMaxHeight = true;
                    if ($scope.irsaAutoMaxHeight === "false") {
                        autoMaxHeight = false;
                    }

                    var noPage = $scope.irsaNoPage;
                    var tableDiv = element;
                    var headDiv = tableDiv.find(".head-div");
                    var bodyDiv = tableDiv.find(".body-div");

                    var timer;
                    bodyDiv.scroll(function () {
                        if (timer) {
                            return;
                        }
                        timer = setTimeout(function () {
                            $(document).click();
                            clearTimeout(timer);
                            timer = null;
                        }, 50);
                    });

                    var footDiv = tableDiv.find(".foot-div");
                    if (footDiv.hasClass("foot-div-no-overflow")) {
                        footDiv = $("");
                    }

                    var leftBodyDiv = tableDiv.find(".left-body-div");

                    footDiv.css("overflow-x", "hidden");
                    bodyDiv.scroll(function () {
                        //某些浏览器在使用overflow-y = overlay 会影响到overflow-x show的最大可以滚动距离
                        if (bodyDiv[0].scrollLeft + bodyDiv[0].offsetWidth > bodyDiv[0].scrollWidth) {
                            bodyDiv[0].scrollLeft = bodyDiv[0].scrollWidth - bodyDiv[0].offsetWidth;
                        }
                        headDiv[0].scrollLeft = bodyDiv[0].scrollLeft;
                        if (footDiv.length > 0) {
                            footDiv[0].scrollLeft = bodyDiv[0].scrollLeft;
                        }
                        if (leftBodyDiv.length > 0) {
                            leftBodyDiv[0].scrollTop = bodyDiv[0].scrollTop;
                        }
                    });

                    if ($scope.irsaAutoWidth === "true") {
                        element.hide();
                        setTimeout(function () {
                            var widthCalculation = function () {
                                var headTds = headDiv.find(".head-tr");
                                if (headTds.length > 0) {
                                    headTds = headTds.children();
                                } else {
                                    headTds = headDiv.find("tr:eq(0)").children();
                                }
                                var minWidth = 0;

                                var blankLineHtml = "";
                                for (var i = 0; i < headTds.length; i++) {
                                    var item = $(headTds[i]);
                                    if (item.css("display") !== "none" || item.hasClass("width-hide")) {
                                        var irsWidth = item.attr("irs-width");
                                        irsWidth = irsWidth ? irsWidth : "";

                                        var width;
                                        if (irsWidth === "auto") {
                                            width = 0;
                                            var headTitle = item.find(".head-title");
                                            if (headTitle.length > 0) {
                                                headTitle = headTitle.html();
                                                width += 42;
                                            } else {
                                                headTitle = item.find("strong").html();
                                                if (!headTitle) {
                                                    headTitle = item.find("table-head-button").attr("irsa-name");
                                                    if (headTitle) {
                                                        width += 42;
                                                    } else {
                                                        width += 10;
                                                    }
                                                } else {
                                                    width += 10;
                                                }
                                            }
                                            if (headTitle) {
                                                width += headTitle.getWidth(14);
                                            }
                                        } else if (irsWidth) {
                                            width = tableWidthConfig;
                                            tools.each(irsWidth.split("."), function (cId) {
                                                width = width[cId];
                                            });
                                        }

                                        if (!width) {
                                            width = tools.getInt(irsWidth);
                                        }

                                        if (width === 0) {
                                            console.log(item);
                                            console.log("irs-width参数设置错误");
                                        }
                                        item.css("width", width);
                                        blankLineHtml += "<td style='width:" + width + "px;' irs-width='" + width + "'></td>";
                                        minWidth += width;
                                    }
                                }

                                var bodyBlankLine = bodyDiv.find(".blank-line");
                                var footBlankLine = footDiv.find(".blank-line");
                                if (bodyBlankLine.length > 0) {
                                    bodyBlankLine.html(blankLineHtml);
                                }
                                if (footBlankLine.length > 0) {
                                    footBlankLine.html(blankLineHtml);
                                }
                                if (headDiv.length > 0) {
                                    headDiv.find("table:eq(0)").css("width", minWidth);
                                }
                                if (bodyDiv.length > 0) {
                                    bodyDiv.find("table:eq(0)").css("width", minWidth);
                                }
                                if (footDiv.length > 0) {
                                    footDiv.find("table:eq(0)").css("width", minWidth);
                                }
                                $scope.$parent.$broadcast("tableSizeChange");
                                setTimeout(function () {
                                    $scope.$parent.$broadcast("tableSizeChange");
                                }, 100);
                            };
                            widthCalculation();
                            element.show();
                            destroy.addDestroyListener(tools.listenerDOM(headDiv[0], widthCalculation).destroy)
                        }, 300);
                    }

                    windowResize.addHandlerAndDestroy(function (width, height) {
                        if (autoMaxHeight) {
                            if (bodyDiv.offset().top === 0) {
                                bodyDiv.css("height", 1);
                                leftBodyDiv.css("height", 1);
                                return;
                            }

                            var maxHeight = tools.getInt(height - bodyDiv.offset().top - 8);
                            if (noPage !== "true") {
                                maxHeight -= 34;
                            }
                            if (footDiv.length == 1) {
                                maxHeight -= 32;
                            }
                            if ($("bottom-box").length == 1) {
                                maxHeight -= 36;
                            }
                            if ($scope.irsaOffsetHeight) {
                                maxHeight += parseInt($scope.irsaOffsetHeight);
                            }
                            if (maxHeight <= 0 || (maxHeight > height - 100)) {
                                return;
                            }
                            bodyDiv.css("height", maxHeight);
                            leftBodyDiv.css("height", maxHeight);
                        }
                        loading.css("top", element.height() / 2 - loading.height() / 2);
                        loading.css("left", element.width() / 2 - loading.width() / 2);
                        message.css("top", (element.height() + headDiv.height()) / 2 - 20 / 2);
                        message.css("left", element.width() / 2 - 84 / 2);
                    })
                }
            };
        }
    ]);
});