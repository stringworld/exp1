import angular from 'angular';
export default angular.module('basicsInfo.factory', [])
    .factory('basicData', [function() {
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