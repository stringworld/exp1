import signPatientService from './signPatient.service';
import signPatientData from './signPatient.data';

import uirouter from 'angular-ui-router';
import routing from './signPatient.route';

export default angular.module('signPatient', [uirouter, signPatientService, signPatientData])
    .config(routing)
    .controller('signPatient', ['getDataAPI', 'signPatientData', '$scope', '$q', '$location', function(getDataAPI, basicData, $scope, $q, $location) {
        $scope.dataPool = basicData;

        $bridge.callMobile('changeTitle', { params: '基本资料' });

        $scope.doctorName = '医加医生';

    }])
    .name;