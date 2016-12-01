import angular from 'angular';
export default angular.module('editPatient.service', [])
    .service('editPatientServiceApi', ['$http', function($http) {
        var tempIp = 'http://192.168.10.15:8082';
        return {
            getPatientList: function({ tag, relationType }) {
                var config = { params: { tag, relationType } };
                return $http.get(tempIp + '/doctor/patientListBeloneTag/', config).then(({ data }) => { return data || {} });
            },
            removePatientTag: function({ patId, tag }) {
                return $http({
                    method: "POST",
                    data: { patId, tag },
                    url: tempIp + '/doctor/tag/removepattag/',
                    async: true,
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                }).then((data) => { return data || {} });
            }
        }
    }])
    .name