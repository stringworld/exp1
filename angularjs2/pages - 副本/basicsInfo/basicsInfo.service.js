import angular from 'angular';
export default angular.module('basicsInfo.service', [])
    .service('getDataAPI', ['$http', function($http) {
        var tempIp = '';
        return {
            doctorTypeId: '',
            departmentId: '',
            hospitalId: '',
            realname: '',
            schoolId: '',
            specialtyList: '',
            getDoctorInfo: function() {
                var config = { params: {} };
                return $http.get(tempIp + '/doctor/doctorInfo/', config).then(({ data }) => { return data || {} });
            },
            getDoctorTypes: function() {
                var config = { params: {} };
                return $http.get(tempIp + '/doctor/getDoctorTypes/', config).then(({ data }) => { return data || {} });
            },
            getRegisterDict: function({ doctorTypeId }) {
                var config = { params: { doctorTypeId } };
                return $http.get(tempIp + '/doctor/getRegisterDict/', config).then(({ data }) => { return data || {} });
            },
            getDoctorHospital: function({ doctorTypeId, hospitalAttributeId, hospitalCityId, hospitalLevelId }) {
                var config = { params: { doctorTypeId, hospitalAttributeId, hospitalCityId, hospitalLevelId } };
                return $http.get(tempIp + '/doctor/getDoctorHospitalByCityLevelAttribute/', config).then(({ data }) => { return data || {} });
            },
            getHospitalDepartment: function({ doctorTypeId, hospitalId }) {
                var config = { params: { doctorTypeId, hospitalId } };
                return $http.get(tempIp + '/doctor/getHospitalDepartment/', config).then(({ data }) => { return data || {} });
            },
            getSchoolByGeo: function({ cityId, provinceId }) {
                var config = { params: { cityId, provinceId } };
                return $http.get(tempIp + '/doctor/getSchoolByGeo/', config).then(({ data }) => { return data || {} });
            },
            saveRegisterInfo: function({ hospitalId, doctorTypeId, departmentId, schoolId }, { realname, specialtyList }) {
                return $http({
                    method: "POST",
                    data: { hospitalId, doctorTypeId, departmentId, realname, schoolId, specialtyList },
                    url: tempIp + '/doctor/saveRegisterInfo/',
                    async: true,
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                }).then((data) => { return data || {} });
            }
        }
    }])
    .name