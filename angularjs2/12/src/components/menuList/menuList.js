import angular from 'angular';
export default angular.module("menuList", [])
    .directive('menuList', [function() {
        return {
            restrict: 'AE',
            scope: { menulist: '=', greet: '&' },
            template: require('./menuList.html'),
            replace: true,
            link: function(scope, element, attrs) {
                console.log(scope.menulist)
                scope.mouseOverThing = function(index) {
                    // console.log(scope.menulist[index])
                    // scope.isShow = true;
                }
            }
        };
    }])
    .name;