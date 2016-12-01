import uirouter from 'angular-ui-router';
import routing from './editPatient.route';
import './editPatient.less';

import editPatientService from './editPatient.service';

export default angular.module('editPatient', [uirouter, editPatientService])
    .config(routing)
    .factory('editPatientData', [function() {
        return {
            patientList: []
        }
    }])
    .controller('editPatient', ['editPatientServiceApi', 'editPatientData', '$scope', '$stateParams', '$state', function(editPatientServiceApi, editPatientData, $scope, $stateParams, $state) {
        editPatientServiceApi.getPatientList({ tag: $stateParams.tagname, relationType: 100 }).then(({ data }) => {
            console.log(data)
            editPatientData.patientList = data.patientList;
        }).then(() => {
            $scope.patientList = editPatientData.patientList.map(item => ({
                id: item.id,
                portrait: item.portrait || 'http://upyun.thedoc.cn/cdn/c_home_page/gosign/me_default_ico.png',
                realname: item.realname,
                disable: true
            }));
        });

        $scope.editPatientTag = function(patId, index) {
            $scope.patientList[index].disable = !$scope.patientList[index].disable;
            editPatientServiceApi.removePatientTag({ patId: patId, tag: $stateParams.tagname }).then(({ code }) => {
                console.log(code)
                if (code === 0) {
                    $scope.$apply();
                }
            });
        }

        $scope.goBack = function() {
            window.history.back();
        }


    }])

.name