'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _event = require('./event.js');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PREFIX = '$';
var JOIN = '$';

var prefixList = {};
var comCount = 0;

var $getPrefix = function $getPrefix(prefix) {
    return prefix;
};

var pageEvent = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom'];

var $bindEvt = function $bindEvt(config, com, prefix) {
    com.prefix = $getPrefix(prefix);
    Object.getOwnPropertyNames(com.components || {}).forEach(function (name) {
        var cClass = com.components[name];
        var child = new cClass();
        child.initMixins();
        child.name = name;
        var comPrefix = prefix ? prefix + child.name + '$' : '$' + child.name + '$';

        $getPrefix(comPrefix);

        com.$com[name] = child;

        $bindEvt(config, child, comPrefix);
    });
    Object.getOwnPropertyNames(com.constructor.prototype || []).forEach(function (prop) {
        if (prop !== 'constructor' && pageEvent.indexOf(prop) === -1) {
            config[prop] = function () {
                com.constructor.prototype[prop].apply(com, arguments);
                com.$apply();
            };
        }
    });

    var allMethods = Object.getOwnPropertyNames(com.methods || []);

    com.$mixins.forEach(function (mix) {
        allMethods = allMethods.concat(Object.getOwnPropertyNames(mix.methods || []));
    });

    allMethods.forEach(function (method, i) {
        config[com.prefix + method] = function (e) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            var evt = new _event2.default('system', this, e.type);
            evt.$transfor(e);
            args = [evt].concat(args);
            var wepyParams = !e.currentTarget ? null : e.currentTarget.dataset ? e.currentTarget.dataset.wepyParams : '';
            if (wepyParams && wepyParams.length) {
                wepyParams = wepyParams.split('-');
                args = args.concat(wepyParams);
            }
            var rst = void 0,
                mixRst = void 0;
            var comfn = com.methods[method];
            if (comfn) {
                rst = comfn.apply(com, args);
            }
            com.$mixins.forEach(function (mix) {
                mix.methods[method] && (mixRst = mix.methods[method].apply(com, args));
            });
            com.$apply();
            return comfn ? rst : mixRst;
        };
    });
    return config;
};

exports.default = {
    $createApp: function $createApp(appClass) {
        var config = {};
        var app = new appClass();

        if (!this.instance) {
            app.init();
            this.instance = app;
        }
        Object.getOwnPropertyNames(app.constructor.prototype).forEach(function (name) {
            if (name !== 'constructor') config[name] = app.constructor.prototype[name];
        });
        return config;
    },
    $createPage: function $createPage(pageClass) {
        var config = {},
            k = void 0;
        var page = new pageClass();
        page.initMixins();
        var self = this;

        config.onLoad = function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            page.name = pageClass.name;
            page.init(this, self.instance, self.instance);
            page.onLoad && page.onLoad.apply(page, args);

            page.$mixins.forEach(function (mix) {
                mix['onLoad'] && mix['onLoad'].apply(page, args);
            });

            page.$apply();

            if (!page.$parent.$wxapp) {
                page.$parent.$wxapp = getApp();
            }
        };

        pageEvent.forEach(function (v) {
            if (v !== 'onLoad') {
                config[v] = function () {
                    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                        args[_key3] = arguments[_key3];
                    }

                    page[v] && page[v].apply(page, args);

                    page.$mixins.forEach(function (mix) {
                        mix[v] && mix[v].apply(page, args);
                    });

                    page.$apply();
                };
            }
        });

        return $bindEvt(config, page, '');
    }
};
//# sourceMappingURL=base.js.map