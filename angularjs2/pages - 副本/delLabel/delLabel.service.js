import angular from 'angular';
export default angular.module('delLabel.service', [])
    .service('delLabelServiceApi', ['$http', function($http) {
        var tempIp = 'http://192.168.10.15:8082';
        return {
            relationType: '',
            getTagList: function({ relationType }) {
                var config = { params: { relationType } };
                return $http.get(tempIp + '/doctor/doctorTagListWithCount/', config).then(({ data }) => { return data || {} });
            },
            removeDocTag: function({ tag }) {
                return $http({
                    method: "POST",
                    data: { tag },
                    url: tempIp + '/doctor/tag/removedoctag/',
                    async: true,
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                }).then((data) => { return data || {} });
            }
        }
    }])
    .name