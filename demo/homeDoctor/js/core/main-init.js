/**
 * Created by Jannsen on 2016/11/11.
 */
"use strict";
var MyConstants = MyConstants || {};
(function() {
    //全局路径设置
    var curWwwPath = window.document.location.href;
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    var localhostPath = curWwwPath.substring(0, pos);
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);

    //文件所在的绝对路径 访问静态资源文件的时候使用此路径
    MyConstants.FILE_URL = "http://localhost:8080/";

    //服务器所在的绝对路径 发get、post请求使用此路径
    MyConstants.BASE_URL = "http://localhost:80";

    var resize = function() {
        var clientWidth = document.documentElement.clientWidth;
        if (!clientWidth) return;
        var fontSize = 20 * (clientWidth / 320);
        if (fontSize > 34) {
            fontSize = 34;
        }
        document.documentElement.style.fontSize = fontSize + 'px';
    };
    window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', resize, false);
    document.addEventListener('DOMContentLoaded', resize, false);

    var cache = window.localStorage["CACHE"];
    var version = null;
    if (cache) {
        cache = JSON.parse(cache);
        version = cache["version"];
    }
    if (!version) {
        version = new Date().getTime() + "";
    }
    MyConstants.VERSION = version;

    MyConstants.BROWSER = {
        versions: (function() {
            var u = navigator.userAgent;
            return { //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        })(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };

    String.prototype.replaceAll = function(var1, var2) {
        var value = this;
        if (!value) {
            return value;
        }
        var old = "";
        while (old != value) {
            old = value;
            value = value.replace(var1, var2);
        }
        return value;
    };
})();