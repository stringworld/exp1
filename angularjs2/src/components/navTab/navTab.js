import angular from 'angular';
import $ from 'jquery';
import './navTab.less'
export default angular.module("navTab", [])
    .directive('navTab', ['$state', function($state) {
        return {
            restrict: 'AE',
            scope: { navtab: '=' },
            template: require('./navTab.html'),
            replace: true,
            link: function(scope, element, attrs) {
                var $element = $(element[0]);
                scope.removeTab = function(index, event) {
                    var $tagName = '';
                    $tagName = $element.find('.tag-name').eq(index - 1);
                    if ($element.find('.tag-name').eq(index).hasClass('on')) {
                        $state.go($tagName.attr('route'), JSON.parse($tagName.attr('params') || null));
                    }
                    scope.navtab.list.splice(index, 1);
                    event.stopPropagation();
                    event.preventDefault();
                }

            }

        }
    }])

.name;