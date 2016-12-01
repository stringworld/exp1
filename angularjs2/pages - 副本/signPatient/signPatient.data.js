import angular from 'angular';
export default angular.module('signPatient.factory', [])
    .factory('signPatientData', [function() {
        return {
            isShadeShow: false,
            selectData: {
                type: '',
                list: []
            },
            doctorInfoList: [],
            doctorTypeList: [],
            hospitalNameList: [],
            departmentList: [],
            schoolList: [],
            locationList: [],
            levelList: [],
            propList: []
        }
    }])
    .name