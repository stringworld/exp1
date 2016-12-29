import angular from 'angular';
import './choiceBox.less';

export default angular.module('choiceBox', [])
    .directive('choiceBox', [function () {
        return {
            restrict: 'AE',
            scope: {type: '=',datasource: '=',changes:'&'},
            template: require('./choiceBox.html'),
            replace: true,
            link(scope) {
                scope.change = function(id, value) {
                    scope.changes({id,value});
                }
            }
        };
    }])
    .name;
