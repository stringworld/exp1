import angular from 'angular';
export default angular.module('addLabel.service', [])
    .service('addLabelServiceApi', ['$http', function($http) {
        var tempIp = 'http://192.168.10.15:8082';
        return {
            relationType: '',
            patientIds: [],
            getTagList: function({ patientIds }) {
                var config = { params: { patientIds } };
                return $http.get(tempIp + '/doctor/tag/usedtags/', config).then(({ data }) => { return data || {} });
            }
        }
    }])
    .name