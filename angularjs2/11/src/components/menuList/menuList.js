import angular from 'angular';
import './menuList.less';
export default angular.module("menuList", [])
    .directive('menuList', ['$http', '$state', function($http, $state) {
        return {
            restrict: 'AE',
            scope: { getmenutext: '&' },
            template: require('./menuList.html'),
            replace: true,
            controller: function($scope, $state) {
                const config = { params: { userdata: 'stone' } };
                $http.get('/getlist/menuList', config)
                    .then(response => {
                        $scope.menudata = response.data;
                    });
                $scope.getMenuText = function(roteUrl,number, index, levelTxt, levelRoute) {
                    $state.go(roteUrl, { 'levelRoute': levelRoute });

                }
            },
            link: function(scope, element, attrs) {
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
                scope.getmenutext({ mainIndex: 0, subIndex: 0 })
            }
        };
    }])
    .name;