'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('./../npm/babel-runtime/core-js/object/get-prototype-of.js');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('./../npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('./../npm/babel-runtime/helpers/possibleConstructorReturn.js');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('./../npm/babel-runtime/helpers/inherits.js');

var _inherits3 = _interopRequireDefault(_inherits2);

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _counter = require('./counter.js');

var _counter2 = _interopRequireDefault(_counter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Panel = function (_wepy$component) {
    (0, _inherits3.default)(Panel, _wepy$component);

    function Panel() {
        var _ref;

        var _temp, _this, _ret;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        (0, _classCallCheck3.default)(this, Panel);
        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Panel.__proto__ || (0, _getPrototypeOf2.default)(Panel)).call.apply(_ref, [this].concat(args))), _this), _this.components = {
            counter1: _counter2.default
        }, _this.data = {
            toggle: true
        }, _this.events = {
            'index-broadcast': function indexBroadcast($event) {
                console.log(_this.name + ' receive ' + $event.name + ' from ' + $event.source.name);
                $event.$destroy();
            }
        }, _this.methods = {
            change: function change() {
                console.log(this.name + ' changed');
                this.toggle = !this.toggle;
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    return Panel;
}(_wepy2.default.component);

exports.default = Panel;