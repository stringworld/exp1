import angular from 'angular';
import './menuList.less';
export default angular.module("menuList", [])
    .directive('menuList', ['$http', function($http) {
        return {
            restrict: 'E',
            template: require('./menuList.html'),
            replace: true,
            controller: function($scope) {
                const config = { params: { userdata: 'stone' } };
                $http.get('/getlist/menuList', config)
                    .then(response => {
                        $scope.menudata = response.data;
                    });
            },
            link: function($scope, element, attrs) {
                $scope.hideMenu = false;
                $scope.hideSubMenu = false;

                $scope.showNav = function() {
                    $scope.hideMenu = false;
                };
                $scope.hideNav = function() {
                    $scope.hideMenu = true;
                };
                $scope.menuClose = function() {
                    $scope.hideSubMenu = true;
                    setTimeout(function() {
                        $scope.hideSubMenu = false;
                    }, 100);
                }
            }
        };
    }])
    .name;