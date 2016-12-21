"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('./npm/babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('./npm/babel-runtime/helpers/asyncToGenerator.js');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('./npm/babel-runtime/core-js/object/get-prototype-of.js');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('./npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('./npm/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('./npm/babel-runtime/helpers/possibleConstructorReturn.js');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('./npm/babel-runtime/helpers/inherits.js');

var _inherits3 = _interopRequireDefault(_inherits2);

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/babel-polyfill/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_wepy$app) {
    (0, _inherits3.default)(_class, _wepy$app);

    function _class() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, _class);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = _class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            "pages": ["pages/index"],
            "window": {
                "backgroundTextStyle": "light",
                "navigationBarBackgroundColor": "#fff",
                "navigationBarTitleText": "WeChat",
                "navigationBarTextStyle": "black"
            }
        }, _this.globalData = {
            userInfo: null
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(_class, [{
        key: "onLaunch",
        value: function onLaunch() {
            console.log(this);
        }
    }, {
        key: "getUserInfo",
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var x, res;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this.globalData.userInfo) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt("return", this.globalData.userInfo);

                            case 2:
                                _context.next = 4;
                                return wx.login();

                            case 4:
                                x = _context.sent;
                                _context.next = 7;
                                return wx.getUserInfo();

                            case 7:
                                res = _context.sent;

                                this.globalData.userInfo = res.userInfo;
                                return _context.abrupt("return", res.userInfo);

                            case 10:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getUserInfo() {
                return _ref2.apply(this, arguments);
            }

            return getUserInfo;
        }()
    }]);
    return _class;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_class));
