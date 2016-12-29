import angular from 'angular';
import WS from '../../utils/websocket';
import './callOutSystem.less';
import $ from 'jquery';

export default angular.module('callOut', [])
    .directive('callOut', [function() {
        return {
            restrict: 'AE',
            scope: { callout: "=" },
            template: require('./callOutSystem.html'),
            replace: true,
            link: function(scope) {
                scope.$watch('callout', function(newdata) {
                    console.log(newdata)
                })
                scope.judgeNumber = function(event) {
                    if (event.keyCode != 37 && event.keyCode != 39) {
                        if (!/^[\d]+$/ig.test(scope.phone)) {
                            scope.phone = '';
                        }
                    }
                };
                scope.msg = '';
                scope.listen = function(state) {
                    if (state < 0) {
                        scope.msg = state;
                    }
                    scope.$digest();
                };
                var _i;
                scope.showMsg = function(msg) {
                    const $this = $('.callErrorMg');
                    $this.text(msg);
                    $this.addClass('tempShow');
                    clearTimeout(_i);
                    _i = setTimeout(function() {
                        $this.removeClass('tempShow');
                    }, 10500);
                };
                let docheckin = false;
                // 签入
                scope.signIn = function() {
                    const params = {
                        cmdsn: '900000001',
                        seatno: scope.callout.seatno,
                        caller: scope.callout.telno,
                        para: scope.callout.password,
                        cmd: '1'
                    };
                    new WS(scope.listen).say(params).then(() => {
                        docheckin = true;
                        scope.showMsg('签入成功');
                        scope.checkin = '签入成功';
                        scope.checkout = '';
                        scope.$digest();
                    });
                };

                // 签出
                scope.signOut = function() {
                    const params = {
                        cmdsn: '900000002',
                        seatno: scope.callout.seatno,
                        caller: scope.callout.telno,
                        para: '',
                        cmd: '2'
                    };
                    new WS(scope.listen).say(params).then(() => {
                        docheckin = false;
                        scope.checkout = '已签出';
                        scope.showMsg('签出成功');
                        scope.checkin = '';
                        scope.$digest();
                    });
                };
                scope.isError = false;
                // 呼叫拨号
                scope.dial = function() {
                    if (!(/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(scope.phone))) {
                        scope.isError = true;
                        scope.phoneErrorMsg = '您输入的电话号码有误';
                        // timeout(() => scope.phoneErrorMsg = '',10000);
                    } else {
                        const params = {
                            cmdsn: '102',
                            seatno: scope.callout.seatno,
                            caller: scope.callout.telno,
                            para: scope.phone,
                            cmd: '3'
                        };
                        new WS(scope.listen).say(params)
                            .then(() => {
                                scope.showMsg('呼叫成功');
                                scope.$digest();
                            });
                    }
                };
                let isKeep = false;
                // 保持
                scope.keep = function() {
                    const params = {
                        cmdsn: '900000013',
                        seatno: scope.callout.seatno,
                        caller: '',
                        para: isKeep ? '1' : '0',
                        cmd: '13'
                    };
                    new WS(scope.listen).say(params).then(() => {
                        isKeep = !isKeep;
                        scope.showMsg(isKeep ? '保持成功' : '恢复成功');
                        scope.$digest();
                    });
                };
                // 静音
                scope.mute = function() {
                    const params = {
                        cmdsn: '113',
                        seatno: scope.callout.seatno,
                        caller: '',
                        para: '2',
                        cmd: '13'
                    };
                    new WS(scope.listen).say(params).then(() => {
                        scope.showMsg('静音成功');
                        scope.$digest();
                    });
                };
                // 繁忙
                scope.isBusy = false;
                scope.busy = function() {
                    const params = {
                        cmdsn: '900000005',
                        seatno: scope.callout.seatno,
                        caller: scope.callout.telno,
                        para: '',
                        cmd: '5'
                    };
                    new WS(scope.listen).say(params).then(() => {
                        scope.isBusy = !scope.isBusy;
                        scope.showMsg(scope.isBusy ? '繁忙中' : '空闲中');
                        scope.$digest();
                    });
                };
                // 挂机
                scope.hang = function() {
                    const params = {
                        cmdsn: '130',
                        seatno: scope.callout.seatno,
                        caller: scope.callout.telno,
                        para: scope.phone,
                        cmd: '4'
                    };
                    new WS(scope.listen).say(params).then(() => {
                        scope.showMsg('挂机中');
                        scope.$digest();
                    });
                };
                // 转接
                scope.connect = function() {
                    const params = {
                        cmdsn: '900000012',
                        seatno: scope.callout.seatno,
                        caller: scope.callout.telno,
                        para: scope.callout.transno,
                        cmd: '12'
                    };
                    new WS(scope.listen).say(params).then(() => {
                        scope.showMsg('挂机中');
                        scope.$digest();
                    });
                };
            }
        }
    }])
    .name;