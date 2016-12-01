import uirouter from 'angular-ui-router';
import routing from './tagDetails.route';
import './tagDetails.less';

import tagDetailsService from './tagDetails.service';

export default angular.module('tagDetails', [uirouter, tagDetailsService])
    .config(routing)
    .factory('tagDetailsData', [function() {
        return {
            patientList: []
        }
    }])
    .controller('tagDetails', ['tagDetailsServiceApi', 'tagDetailsData', '$scope', '$stateParams', '$state', function(tagDetailsServiceApi, tagDetailsData, $scope, $stateParams, $state) {
        $scope.editLabel = function() {
            $state.go('editLabel', { 'tagname': $scope.tagname });
        }

        $scope.editPatient = function() {
            $state.go('editPatient', { 'tagname': $scope.tagname });
        }

        $scope.tagname = $stateParams.tagname;

        $scope.goBack = function() {
            window.history.back();
        }

        tagDetailsServiceApi.getPatientList({ tag: $stateParams.tagname, relationType: 100 }).then(({ data }) => {
            console.log(data)
            tagDetailsData.patientList = data.patientList;
        }).then(() => {
            $scope.patientList = tagDetailsData.patientList.map(item => ({
                id: item.id,
                portrait: item.portrait || 'http://upyun.thedoc.cn/cdn/c_home_page/gosign/me_default_ico.png',
                realname: item.realname,
                disable: true
            }));
        });
    }])

.name