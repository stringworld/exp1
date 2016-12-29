import angular from 'angular';
import uirouter from 'angular-ui-router';
import menuList from '../../components/menuList/menuList';

import navTab from '../../components/navTab/navTab';
import callOutSystem from '../../components/callOutSystem/callOutSystem';
import splitPage from '../../components/splitPage/splitPage';
import choiceBox from '../../components/choiceBox/choiceBox';
import getCookie from '../../common/js/getCookie.js'
import './main.less';

export default angular.module('main', [uirouter, menuList, callOutSystem, splitPage, choiceBox, navTab])
    .service('mainAPI', ['$http', function($http) {
        return {
            //退出
            loginOut: function() {
                return $http.post("/api/logout/", {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            },
            //判断登陆
            getCurrentUser: function() {
                return $http({
                    method: "get",
                    url: "/api/getCurrentUser/"
                });
            }

        }
    }])
    .factory('navTabData', () => {
        return {
            list: [{
                'name': '控制台',
                'route': 'main.console',
                'params': ''
            }]
        }
    })
    .controller('index', ['$scope', '$location', 'mainAPI', '$state', 'navTabData', function($scope, $location, mainAPI, $state, navTabData) {

        $scope.viewList = [
            { name: 'taskDetails', parentRoute: 'main' }, //ZHANGJUN
            { name: 'taskdetail', parentRoute: 'main' },
            { name: 'task', parentRoute: 'main' },
            { name: 'alltask', parentRoute: 'main' },
            { name: 'mytask', parentRoute: 'main' },
            { name: 'console', parentRoute: 'main' },
            { name: 'record', parentRoute: 'main' },
            { name: 'applyhistory', parentRoute: 'main' },
            { name: 'taskallocation', parentRoute: 'main' },
            { name: 'taskall', parentRoute: 'main' },
            { name: 'taskmine', parentRoute: 'main' },
            { name: 'returnvisit', parentRoute: 'main' },
            { name: 'returnvisitmine', parentRoute: 'main' },
        ];

        $scope.callOutData = {};
        mainAPI.getCurrentUser().then(res => {
            if (res.data.code === 2) {
                $state.go('login', {})
            }
            if (res.data.code === 0) {
                console.log(res.data.data);

                $scope.callOutData = {
                    seatno: res.data.data.seatId,
                    password: res.data.data.checkInPwd,
                    telno: res.data.data.telephoneNumber
                }

            }
        })

        $scope.pageData = {
            itemsPerPage: 10,
            itemsCount: 100,
            maxNumbers: 3
        }
        if ($location.path === '/main') {
            $scope.isShow = true;
        } else {
            $scope.isShow = false;
        }
        $scope.loginOut = function() {
            console.log('a')
            mainAPI.loginOut().then(function(data) {
                console.log(data);
                if (data.data.code === 0) {
                    $state.go('login', {})
                }
            })
        }
        $scope.through = function() {
                $scope.reminder = true;
                setTimeout(
                    function() {
                        $scope.reminder = false;
                        $scope.$digest();
                    }, 3000);
            }
            //转接成功调用方法;
            // $scope.through()
            // $scope.getIndex = function(levelTxt, levelRoute) {
            //     alert(123);
            //     $scope.levelTxt = $scope.menudata[mainIndex].level[subIndex].levelTxt;
            //     $scope.levelRoute = $scope.menudata[mainIndex].level[subIndex].levelRoute;
            //     $scope.menuClose();
            // };
        $scope.navTab = navTabData;
        $scope.$on('routeAdd', function(e, name, route, params) {
            if (!navTabData.list.some((item) => {
                    return item.route == route
                })) {
                navTabData.list.push({ 'name': name, route, params });
            }
        })
    }])
    .name;