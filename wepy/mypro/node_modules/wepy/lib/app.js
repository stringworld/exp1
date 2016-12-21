'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequestMQ = {
    map: {},
    mq: [],
    running: [],
    MAX_REQUEST: 5,
    push: function push(param) {
        param.t = +new Date();
        while (this.mq.indexOf(param.t) > -1 || this.running.indexOf(param.t) > -1) {
            param.t += Math.random() * 10 >> 0;
        }
        this.mq.push(param.t);
        this.map[param.t] = param;
    },
    next: function next() {
        var _this = this;

        var me = this;

        if (this.mq.length === 0) return;

        if (this.running.length < this.MAX_REQUEST - 1) {
            var _ret = function () {
                var newone = _this.mq.shift();
                var obj = _this.map[newone];
                var oldComplete = obj.complete;
                obj.complete = function () {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    me.running.splice(me.running.indexOf(obj.t), 1);
                    delete me.map[obj.t];
                    oldComplete && oldComplete.apply(obj, args);
                    me.next();
                };
                _this.running.push(obj.t);
                return {
                    v: wx.request_bak(obj)
                };
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
    },
    request: function request(obj) {
        var me = this;

        obj = obj || {};
        obj = typeof obj === 'string' ? { url: obj } : obj;

        this.push(obj);

        return this.next();
    }
};

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: 'init',
        value: function init() {
            this.addPromise();
            this.hackRequest();
            this.$wxapp = getApp();
        }
    }, {
        key: 'addPromise',
        value: function addPromise() {

            var noPromiseMethods = {
                stopRecord: true,
                pauseVoice: true,
                stopVoice: true,
                pauseBackgroundAudio: true,
                stopBackgroundAudio: true,
                showNavigationBarLoading: true,
                hideNavigationBarLoading: true,
                createAnimation: true,
                createContext: true,
                hideKeyboard: true,
                stopPullDownRefresh: true
            };
            Object.keys(wx).forEach(function (key) {
                if (!noPromiseMethods[key] && key.substr(0, 2) !== 'on' && key !== 'request' && !/\w+Sync$/.test(key)) {
                    wx[key + '_bak'] = wx[key];
                    Object.defineProperty(wx, key, {
                        get: function get() {
                            return function (obj) {
                                obj = obj || {};

                                return new Promise(function (resolve, reject) {
                                    obj.success = resolve;
                                    obj.fail = function (res) {
                                        if (res && res.errMsg) {
                                            reject(new Error(res.errMsg));
                                        } else {
                                            reject(res);
                                        }
                                    };
                                    wx[key + '_bak'](obj);
                                });
                            };
                        }
                    });
                }
            });
        }
    }, {
        key: 'hackRequest',
        value: function hackRequest() {

            wx['request_bak'] = wx['request'];
            Object.defineProperty(wx, 'request', {
                get: function get() {
                    return function (obj) {
                        obj = obj || {};
                        obj = typeof obj === 'string' ? { url: obj } : obj;
                        return new Promise(function (resolve, reject) {
                            obj.success = resolve;
                            obj.fail = function (res) {
                                if (res && res.errMsg) {
                                    reject(new Error(res.errMsg));
                                } else {
                                    reject(res);
                                }
                            };
                            RequestMQ.request(obj);
                        });
                    };
                }
            });
        }
    }]);

    return _class;
}();

exports.default = _class;
//# sourceMappingURL=app.js.map