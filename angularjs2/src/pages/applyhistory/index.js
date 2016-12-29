import angular from 'angular';
import uirouter from 'angular-ui-router';
import './style.less';
import $ from 'jquery';
import dateCalendar from '../../components/dateCalendar/dateCalendar';

import 'bootstrap/dist/css/bootstrap.css';

export default angular.module('applyhistory', [uirouter, dateCalendar])
    .service('applyhistoryapi', ['$http', function($http) {

    }])
    .controller('applyhistory', ['applyhistoryapi', '$scope', function(applyhistoryapi, $scope) {
        $scope.changeData = function() {
            console.log($scope.thisData)
        }
        $scope.onselected = function(value) {
            console.log(value);
        }
    }])
    .name;