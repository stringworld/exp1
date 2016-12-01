import angular from 'angular';
export default angular.module('editLabel.service', [])
    .service('editLabelServiceApi', ['$http', function($http) {
        var tempIp = 'http://192.168.10.15:8082';
        return {
            relationType: 100,
            newTag: '',
            oldTag: '',
            saveDocTag: function({ relationType, newTag, oldTag }) {
                return $http({
                    method: "POST",
                    data: { relationType, newTag, oldTag },
                    url: tempIp + '/doctor/modifyTag/',
                    async: true,
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                }).then((data) => { return data || {} });
            }
        }
    }])
    .name