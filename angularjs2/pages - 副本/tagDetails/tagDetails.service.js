import angular from 'angular';
export default angular.module('tagDetails.service', [])
    .service('tagDetailsServiceApi', ['$http', function($http) {
        var tempIp = 'http://192.168.10.15:8082';
        return {
            getPatientList: function({ tag, relationType }) {
                var config = { params: { tag, relationType } };
                return $http.get(tempIp + '/doctor/patientListBeloneTag/', config).then(({ data }) => { return data || {} });
            }
        }
    }])
    .name