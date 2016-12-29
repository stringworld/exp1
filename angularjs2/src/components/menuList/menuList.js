import angular from 'angular';
import './menuList.less';
import menulistjson from './menujson.js'
import getCookie from '../../common/js/getCookie.js'
export default angular.module("menuList", [])
    .directive('menuList', ['$http', '$state', function($http, $state) {
        return {
            restrict: 'AE',
            template: require('./menuList.html'),
            replace: true,
            controller: ['$scope', function($scope) {
                $scope.menudata = menulistjson;
                $scope.getMenuText = function(routeUrl, routeName, levelRoute) {
                    var url = routeUrl + levelRoute;
                    $state.go(url, null, { reload: true });
                    $scope.$emit('routeAdd', routeName, url, null);
                }
                $scope.roleId = 2; //getCookie('roleId');

                $scope.rolePermission = {
                    CUSTOMERSERVICE: 'customerService',
                    MANAGER: 'manager',
                    WEBADMIN: 'webadmin'
                }
                switch ($scope.roleId) {
                    //0客服，1经理，2管理员
                    case 0:
                        menuFilter($scope.rolePermission.CUSTOMERSERVICE);
                        break;
                    case 1:
                        menuFilter($scope.rolePermission.MANAGER);
                        break;
                    case 2:
                        menuFilter($scope.rolePermission.WEBADMIN);
                        break;
                }

                function menuFilter(roleStr) {
                    $scope.menudata.filter((value) => {
                        value.isShow = value.role.some(items => items === roleStr);
                        value.level.filter(item => {
                            item.isShow = item.role.some(items => items === roleStr);
                        })
                    });
                }


                // $scope.menuClose = function (index) {
                //     $scope.menudata2.splice(index, 1)
                //     if ($scope.menudata2.length == index) {
                //         $scope.menudata2Index--
                //     }
                // }
                $scope.toggleNav = function(index) {
                    $scope.menudata2Index = index
                }
                $scope.getHtml = menu => {
                    if (menu.level.length == 0) {
                        $scope.getMenuText(menu)
                    }
                }

            }],
            link: function(scope) {
                scope.hideMenu = false;
                scope.hideSubMenu = false;

                scope.showNav = function() {
                    scope.hideMenu = false;
                };
                scope.hideNav = function() {
                    scope.hideMenu = true;
                };
                scope.menuClose = function() {
                    scope.hideSubMenu = true;
                    setTimeout(function() {
                        scope.hideSubMenu = false;
                    }, 100);
                }
            }
        };
    }])
    .name;