import angular from 'angular';
import WS from '../../utils/websocket';
import './main.less';
export default angular.module("callOut", [])
    .directive('callOut',[ function () {
        return {
            restrict: 'AE',
            scope: { callout: '=' },
            template: require('./callOutSystem.html'),
            replace: true,
            link: function (scope, element, attrs) {
                var docheckin = false;
                //呼叫
                scope.dial = function(){
                    const params = {
                        cmdsn: '102',
                        seatno: scope.callout.seatno,
                        caller: '',
                        para: scope.phone,
                        cmd: '3'
                    }
                    new WS().say(params);
                }
                //签入
                scope.signIn = function(){
                    const params = {
                        cmdsn: '100',
                        seatno: scope.callout.seatno,
                        caller: scope.callout.station,
                        para: scope.callout.password,
                        cmd: '1'
                    }
                    new WS().say(params).then(() => (docheckin = true));
                }
                //签出
                scope.signOut = function(){
                    const params = {
                        cmdsn: '101',
                        seatno: scope.callout.seatno,
                        caller: '',
                        para:'',
                        cmd:'2'
                    }
                    new WS().say(params).then(() => (docheckin = false));
                }
                //保持
                scope.keep = function(){
                    const params = {
                        cmdsn: '113',
                        seatno: scope.callout.seatno,
                        caller: '',
                        para: '1',
                        cmd:'13'
                    }
                    new WS().say(params);
                }
                //静音
                scope.mute = function(){
                    const params = {
                        cmdsn: '113',
                        seatno: scope.callout.seatno,
                        caller: '',
                        para: '2',
                        cmd:'13'
                    }
                    new WS().say(params);
                }
                //繁忙
                /*scope.busy = function(){
                    const params = {
                        cmdsn: '105',
                        seatno: scope.callout.seatno,
                        caller: '',
                        para: '1',
                        cmd:'5'
                    }
                    new WS().say(params);
                }*/
                //挂机
                scope.hang = function(){
                    const params = {
                        cmdsn: '130',
                        seatno: scope.callout.seatno,
                        caller: '',
                        para: '',
                        cmd:'4'
                    }
                    new WS().say(params);
                }

            }
        };
    }])
    .name;