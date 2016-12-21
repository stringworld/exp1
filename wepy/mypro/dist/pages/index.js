'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('./../npm/babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('./../npm/babel-runtime/helpers/asyncToGenerator.js');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('./../npm/babel-runtime/core-js/object/get-prototype-of.js');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('./../npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('./../npm/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('./../npm/babel-runtime/helpers/possibleConstructorReturn.js');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('./../npm/babel-runtime/helpers/inherits.js');

var _inherits3 = _interopRequireDefault(_inherits2);

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _list = require('./../components/list.js');

var _list2 = _interopRequireDefault(_list);

var _panel = require('./../components/panel.js');

var _panel2 = _interopRequireDefault(_panel);

var _counter = require('./../components/counter.js');

var _counter2 = _interopRequireDefault(_counter);

var _wepyComToast = require('./../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Index = function (_wepy$page) {
    (0, _inherits3.default)(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        (0, _classCallCheck3.default)(this, Index);
        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Index.__proto__ || (0, _getPrototypeOf2.default)(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            "navigationBarTitleText": "test"
        }, _this.components = {
            panel: _panel2.default,
            counter1: _counter2.default,
            counter2: _counter2.default,
            list: _list2.default,
            toast: _wepyComToast2.default
        }, _this.mixins = [_test2.default], _this.data = {
            userInfo: {
                nickName: '加载中...'
            },
            normalTitle: '原始标题',
            setTimeoutTitle: '标题三秒后会被修改',
            count: 0,
            netrst: ''
        }, _this.methods = {
            toast: function toast() {
                var promise = this.$invoke('toast', 'show', {
                    title: '自定义标题',
                    img: 'https://raw.githubusercontent.com/kiinlam/wetoast/master/images/star.png'
                });

                promise.then(function (d) {
                    console.log('toast done');
                });
            },
            tap: function tap() {
                console.log('do noting from ' + this.name);
            },
            communicate: function communicate() {

                console.log(this.name + ' tap');

                this.$invoke('/panel/counter1', 'plus', 45, 6);
                this.$invoke('counter2', 'minus', 45, 6);
                this.$invoke('counter1', 'plus', 45, 6);

                this.$broadcast('index-broadcast', 1, 3, 4);
            },
            request: function request() {
                var self = this;
                var i = 10;
                var map = ['MA==', 'MQo=', 'Mg==', 'Mw==', 'NA==', 'NQ==', 'Ng==', 'Nw==', 'OA==', 'OQ=='];
                while (i--) {
                    wx.request('https://www.madcoder.cn/tests/sleep.php?time=1&t=css&c=' + map[i] + '&i=' + i).then(function (d) {
                        self.netrst += d.data + '.';
                        self.$apply();
                    });
                }
            }
        }, _this.events = {
            'index-emit': function indexEmit($event) {
                console.log(_this.name + ' receive ' + $event.name + ' from ' + $event.source.name);
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Index, [{
        key: 'onLoad',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var _this2 = this;

                var userInfo;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;

                                console.log(222);

                                // 调用应用实例的方法获取全局数据
                                userInfo = void 0;
                                _context.prev = 3;
                                _context.next = 6;
                                return this.$parent.getUserInfo();

                            case 6:
                                userInfo = _context.sent;
                                _context.next = 12;
                                break;

                            case 9:
                                _context.prev = 9;
                                _context.t0 = _context['catch'](3);

                                userInfo = {
                                    nickName: 'Network error'
                                };

                            case 12:
                                if (userInfo) this.userInfo = userInfo;
                                this.normalTitle = '标题已被修改';

                                this.setTimeoutTitle = '标题三秒后会被修改';
                                setTimeout(function () {
                                    _this2.setTimeoutTitle = '到三秒了';
                                    _this2.$apply();
                                }, 3000);

                                this.$apply();
                                _context.next = 22;
                                break;

                            case 19:
                                _context.prev = 19;
                                _context.t1 = _context['catch'](0);

                                console.error(_context.t1.stack);

                            case 22:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 19], [3, 9]]);
            }));

            function onLoad() {
                return _ref2.apply(this, arguments);
            }

            return onLoad;
        }()
    }]);
    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index));
