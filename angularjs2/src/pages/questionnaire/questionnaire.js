import uirouter from 'angular-ui-router';
import './questionnaire.less';

export default angular.module('questionnaire', [uirouter])
    .service('question', ['$http', function($http) {
        return {

        }
    }])
    .controller('question', ['$scope', 'questionAPI', '$stateParams', '$state', function($scope, questionAPI, $stateParams, $state){


    }])

    .name;