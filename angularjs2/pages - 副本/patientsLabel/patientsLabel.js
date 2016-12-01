import uirouter from 'angular-ui-router';
import routing from './patientsLabel.route';
import './patientsLabel.less';

export default angular.module('patientsLabel', [uirouter])
    .config(routing)

.service('patientsLabelApi', ['$http', ($http) => {
    return {}
}])

.controller('patientsLabel', ['patientsLabelApi', '$scope', function(patientsLabelApi, $scope) {
    $scope.name = 'name';
}])

.name