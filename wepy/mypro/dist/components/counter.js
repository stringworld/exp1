'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import abc from 'abc';

var Counter = function (_wepy$component) {
    (0, _inherits3.default)(Counter, _wepy$component);

    function Counter() {
        var _ref;

        var _temp, _this, _ret;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        (0, _classCallCheck3.default)(this, Counter);
        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Counter.__proto__ || (0, _getPrototypeOf2.default)(Counter)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            num: 0
        }, _this.events = {
            'index-broadcast': function indexBroadcast($event) {
                console.log(_this.name + ' receive ' + $event.name + ' from ' + $event.source.name);
            }
        }, _this.methods = {
            plus: function plus() {
                this.num = this.num + 1;
                console.log(this.name + ' plus tap');

                this.$emit('index-emit', 1, 2, 3);
            },
            minus: function minus() {
                this.num = this.num - 1;
                console.log(this.name + ' minus tap');
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Counter, [{
        key: 'onLoad',
        value: function onLoad() {
            this.num = 50;
        }
    }]);
    return Counter;
}(_wepy2.default.component);

exports.default = Counter;