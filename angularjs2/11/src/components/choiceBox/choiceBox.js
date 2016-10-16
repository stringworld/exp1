import angular from 'angular';
import './choiceBox.less';

export default angular.module('choiceBox', [])
    .directive('choiceBox', [function () {
        return {
            restrict: 'AE',
            scope: {boxstyle: '=',radiodata:'&',checkboxdata:'&'},
            template: require('./choiceBox.html'),
            replace: true,
            link(scope) {
               scope.radioChange = function(problemId,problemAnswer){
                   scope.radiodata({'problemId':problemId,'problemAnswer':problemAnswer});
                }
                scope.checkboxChange = function(problemId,problemAnswer){
                    scope.checkboxdata({'problemId':problemId,'problemAnswer':problemAnswer});
                }
            }
        };
    }])
    .name;
