import uirouter from 'angular-ui-router';
import './console.less';

export default angular.module('console', [uirouter])
    .service('consoleAPI', ['$http', function($http) {
        return {}
    }])
    .controller('console', ['$scope', 'consoleAPI', function($scope, consoleAPI) {

    }])

.name;