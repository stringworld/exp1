/**
 * Created by Jannsen on 2015/11/13.
 */
"use strict";
define(["main-app", "tools"], function (app, tools) {
    app.factory("cache", ["http", "storage", "destroy",
        function (http, storage, destroy) {
            var constants = {

            };
            var cacheData;
            var callBackList = [];

            var refresh = function (reload) {
                //http.get({
                //    url: "common/getCache.do",
                //    success: function (data) {

                       // storage.setLocalStorageObject(storage.constants.CACHE, data);
                        cacheData = {};
                        tools.each(callBackList, function (item) {
                            item.callBack(angular.copy(cacheData[item.id]));
                        });
                        callBackList = [];
                        if (reload) {
                            window.location.reload();
                        }
                //    }
                //});
            };

            var get = function (id, callBack) {
                callBackList.push({
                    id: id,
                    callBack: callBack
                });
                if (!cacheData) {
                    cacheData = storage.getLocalStorageObject(storage.constants.CACHE);
                }
                if (cacheData == null) {
                    refresh();
                } else {
                    callBack(angular.copy(cacheData[id]));
                }
            };

            destroy.factoryAddDestroyListener(function () {
                callBackList = [];
            });
            return {
                constants: constants,
                refresh: refresh,
                get: get//获取缓存数据 必须异步调用 因为缓存可能不存在或需要更新 如果是更新可能会被调用多次
            };
        }
    ]);
});