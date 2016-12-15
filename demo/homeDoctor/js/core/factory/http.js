"use strict";
define(["main-app", "main-data", "jquery", "tools"], function (app, navData, $, tools) {
  app.factory("http", ["$http", "$location",
    function ($http, $location) {
      var defaultParams = {
        //这一部分是原生的属性
        method: "",//通过调用get post方法设置 自己设置参数无效
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest"
        },
        responseType: "json",
        alwaysPrompt: false,//总是提示错误
        //这一部分是我们的功能属性
        success: null,//function(response) 成功事件
        error: null,//function(response) 失败事件
        always: null,//不管成功失败都会执行
        errorCode: null,
        needToken: false,
        mask: false,//遮盖
        //errorCode: {
        //    "100": function () {
        //      do something
        //    }
        //},
        relatedButton: "",//相关联的按钮 请求发送时会禁用按钮 直到返回时放开 值是jquery对象 或者Jquery选择器
        relatedButtonText: "请求中",//在请求发送中显示的文字
        relatedOther: [],//相关联的其他控件 请求过程中会设置disabled属性
        filterData: []//过滤掉data中不需要的key
      };

      //var loginFlag = false;
      //var httpQueue = [];
      //var login = function (data) {
      //    httpQueue.push(data);
      //    if (loginFlag) {
      //        return;
      //    }
      //    loginFlag = true;
      //    post({
      //        url: "user/login.do",
      //        success: function () {
      //            tools.each(httpQueue, function (item) {
      //                http(item.params, item.method);
      //            });
      //            httpQueue = [];
      //            loginFlag = false;
      //        },
      //        errorCode: {
      //            "101": function () {
      //                //必须用微信浏览器打开
      //            }
      //        }
      //    });
      //};

      /**
       * 静默登录微信  只有在第一次页面打开时验证 路由跳转不做处理
       */
      var tokenError = [];
      var flag = false;

      var http = function (params, method) {
        params = $.extend(true, {}, defaultParams, params);
        params.method = method;

        if (params.needToken && !defaultParams.headers.token) {
          if (flag) {
            return;
          }
          flag = true;
          tokenError.push({
            params: params,
            method: method
          });
          $http($.extend(true, {}, defaultParams, {
            url: ""
          })).then(function (response) {
            var token = response.data.value;
            defaultParams.headers.token = token;
            tools.each(tokenError, function (item) {
              http(item.params, item.params);
            });
          });
          return;
        }

        if (!params.url) {
          alert("url不能为空！");
          return;
        }
        if (params.url.indexOf(MyConstants.BASE_URL) < 0 && params.url.indexOf("http") != 0) {
          params.url = MyConstants.BASE_URL + (params.url.charAt(0) == "/" ? params.url : "/" + params.url);
        }
        var resetButton;
        if (params.relatedButton || params.relatedOther) {
          var relatedButton = null;
          if (params.relatedButton) {
            relatedButton = $(params.relatedButton);

            var oldButtonText;
            if (params.relatedButtonText) {
              oldButtonText = relatedButton.html();
              relatedButton.html(params.relatedButtonText);
            }
            relatedButton.focus();
            relatedButton.attr("disabled", "disabled");
          }

          if (params.relatedOther) {
            angular.forEach(params.relatedOther, function (related) {
              $(related).attr("disabled", "disabled");
            });
          }

          resetButton = function () {
            if (params.relatedButton) {
              relatedButton.removeAttr("disabled");
              if (params.relatedButtonText) {
                relatedButton.html(oldButtonText);
              }
            }
            if (params.relatedOther) {
              angular.forEach(params.relatedOther, function (related) {
                $(related).removeAttr("disabled");
              });
            }
          };
        }

        if (params.filterData && params.filterData.length > 0) {
          var data = $.extend(true, {}, {}, params.data);
          angular.forEach(params.filterData, function (key) {
            delete data[key];
          });
          params.data = data;
        }

        $http(params).then(function (response) {
          resetButton && resetButton();
          params.success && params.success(response.data, response);
          params.always && params.always(response.data, response);
        }, function (response) {
          if (response.status > 500) {
            tools.alert("网络异常，请刷新页面！", function () {
              window.location.reload();
            });
            return;
          } else if (response.status == 500) {
            if (response.data && params.errorCode && params.errorCode[response.data.code]) {
              params.errorCode[response.data.code](response.data);
            } else {
              if (!response.data) {
                tools.alert("网络异常，请刷新页面！");
              } else if (!params.error || params.alwaysPrompt) {
                tools.alert(response.data.message);
              }
            }
          } else if (response.status == 401) {
            //login({
            //    params: params,
            //    method: method
            //});
            //window.location.href = MyConstants.BASE_URL + "/templates.do?productId=" + $location.search().productId + "&shareId=" + $location.search().shareId;
            return;
          }
          resetButton && resetButton();
          params.error && params.error(response.data);
          params.always && params.always(response.data);
        });
      };

      var get = function (params) {
        http(params, "GET");
      };

      var post = function (params) {
        http(params, "POST");
      };
      return {
        get: get,
        post: post
      };
    }
  ]);
});