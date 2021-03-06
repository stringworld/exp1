'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = require('./event.js');

var _event2 = _interopRequireDefault(_event);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);

        this.$com = {};
        this.$mixins = [];
        this.isComponent = true;
        this.prefix = '';
    }

    _createClass(_class, [{
        key: 'init',
        value: function init($wxpage, $root, $parent) {
            var _this = this;

            var self = this;

            this.$wxpage = $wxpage;
            if (this.isComponent) {
                this.$root = $root || this.$root;
                this.$parent = $parent || this.$parent;
            }

            var k = void 0,
                defaultData = {};
            for (k in this.data) {
                defaultData['' + this.prefix + k] = this.data[k];

                this[k] = _util2.default.$copy(this.data[k], true);
            }
            this.setData(defaultData);

            var coms = Object.getOwnPropertyNames(this.$com);
            if (coms.length) {
                coms.forEach(function (name) {
                    _this.$com[name].init(_this.getWxPage(), $root, _this);
                    _this.$com[name].onLoad && _this.$com[name].onLoad();
                    _this.$com[name].$apply();
                });
            }
        }
    }, {
        key: 'initMixins',
        value: function initMixins() {
            var _this2 = this;

            if (this.mixins) {
                if (typeof this.mixins === 'function') {
                    this.mixins = [this.mixins];
                }
            } else {
                this.mixins = [];
            }
            this.mixins.forEach(function (mix) {
                var inst = new mix();
                inst.init(_this2);
                _this2.$mixins.push(inst);
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {}
    }, {
        key: 'setData',
        value: function setData(k, v) {
            if (typeof k === 'string') {
                if (v) {
                    var tmp = {};
                    tmp[k] = v;
                    k = tmp;
                } else {
                    var _tmp = {};
                    _tmp[k] = this.data['' + k];
                    k = _tmp;
                }
                return this.$wxpage.setData(k);
            }
            var t = null,
                reg = new RegExp('^' + this.prefix.replace(/\$/g, '\\$'), 'ig');
            for (t in k) {
                var noPrefix = t.replace(reg, '');
                this.data[noPrefix] = _util2.default.$copy(k[t], true);
            }
            return this.$wxpage.setData(k);
        }
    }, {
        key: 'getWxPage',
        value: function getWxPage() {
            return this.$wxpage;
        }
    }, {
        key: 'getCurrentPages',
        value: function getCurrentPages() {
            return this.$wxpage.getCurrentPages();
        }
    }, {
        key: '$getComponent',
        value: function $getComponent(com) {
            var _this3 = this;

            if (typeof com === 'string') {
                if (com.indexOf('/') === -1) {
                    return this.$com[com];
                } else if (com === '/') {
                    return this.$parent;
                } else {
                    var path = com.split('/');
                    path.forEach(function (s, i) {
                        if (i === 0) {
                            if (s === '') {
                                com = _this3.$root;
                            } else if (s === '.') {
                                com = _this3;
                            } else if (s === '..') {
                                com = _this3.$parent;
                            } else {
                                com = _this3.$getComponent(s);
                            }
                        } else if (s) {
                            com = com.$com[s];
                        }
                    });
                }
            }
            return (typeof com === 'undefined' ? 'undefined' : _typeof(com)) !== 'object' ? null : com;
        }
    }, {
        key: '$invoke',
        value: function $invoke(com, method) {
            com = this.$getComponent(com);

            if (!com) {
                throw new Error('Invalid path: ' + com);
            }

            var fn = this.$wxpage[com.prefix + method];

            for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                args[_key - 2] = arguments[_key];
            }

            if (typeof fn === 'function') {
                var evt = new _event2.default('', this, 'invoke');
                return fn.apply(com, [evt].concat(args));
            } else {
                fn = com[method];
            }

            if (typeof fn === 'function') {
                return fn.apply(com, args);
            } else {
                throw new Error('Invalid method: ' + method);
            }
        }
    }, {
        key: '$broadcast',
        value: function $broadcast(evtName) {
            var com = this;
            var $evt = typeof evtName === 'string' ? new _event2.default(evtName, this, 'broadcast') : $evt;
            var queue = [com];

            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            while (queue.length && $evt.active) {
                var current = queue.shift();
                for (var c in current.$com) {
                    c = current.$com[c];
                    queue.push(c);
                    var fn = c.events ? c.events[evtName] : undefined;
                    if (typeof fn === 'function') {
                        fn.apply(c, [$evt].concat(args));
                    }
                    if (!$evt.active) break;
                }
            }
        }
    }, {
        key: '$emit',
        value: function $emit(evtName) {
            var com = this;
            var source = this;
            var $evt = new _event2.default(evtName, source, 'emit');

            for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                args[_key3 - 1] = arguments[_key3];
            }

            while (com && com.isComponent !== undefined && $evt.active) {
                var fn = com.events ? com.events[evtName] : undefined;
                if (typeof fn === 'function') {
                    fn.apply(com, [$evt].concat(args));
                }
                com = com.$parent;
            }
        }
    }, {
        key: '$apply',
        value: function $apply(fn) {
            if (typeof fn === 'function') {
                fn.call(this);
                this.$apply();
            } else {
                if (this.$$phase) {
                    this.$$phase = '$apply';
                } else {
                    this.$digest();
                }
            }
        }
    }, {
        key: '$digest',
        value: function $digest() {
            var k = void 0;
            var originData = this.data;
            this.$$phase = '$digest';
            while (this.$$phase) {
                var readyToSet = {};
                for (k in originData) {
                    if (!_util2.default.$isEqual(this[k], originData[k])) {
                        readyToSet[this.prefix + k] = this[k];
                        originData[k] = _util2.default.$copy(this[k], true);
                    }
                }
                if (Object.keys(readyToSet).length) this.setData(readyToSet);
                this.$$phase = false;
            }
        }
    }]);

    return _class;
}();

exports.default = _class;
//# sourceMappingURL=component.js.map