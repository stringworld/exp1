import angular from 'angular';
import $$ from 'jquery';
export default angular.module('basic.service', [])
    .service('getDataAPI', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
        // $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        var tempIp = 'http://192.168.10.15:8082';
        return {
            getDoctorTypes: function() {
                var config = { params: {} };
                return $http.get(tempIp + '/doctor/getDoctorTypes/', config).then(({ data }) => { return data || {} });
            },
            getRegisterDict: function({ doctorTypeId }) {
                var config = { params: { doctorTypeId } };
                return $http.get(tempIp + '/doctor/getRegisterDict/', config).then(({ data }) => { return data || {} });
            },
            getDoctorHospital: function({ doctorTypeId }, { hospitalAttributeId, hospitalCityId, hospitalLevelId }) {
                var config = { params: { doctorTypeId, hospitalAttributeId, hospitalCityId, hospitalLevelId } };
                return $http.get(tempIp + '/doctor/getDoctorHospitalByCityLevelAttribute/', config).then(({ data }) => { return data || {} });
            },
            getHospitalDepartment: function({ doctorTypeId }, { hospitalId }) {
                var config = { params: { doctorTypeId, hospitalId } };
                return $http.get(tempIp + '/doctor/getHospitalDepartment/', config).then(({ data }) => { return data || {} });
            },
            getSchoolByGeo: function({ cityId, provinceId }) {
                var config = { params: { cityId, provinceId } };
                return $http.get(tempIp + '/doctor/getSchoolByGeo/', config).then(({ data }) => { return data || {} });
            },
            saveRegisterInfo: function({ hospitalId }, { doctorTypeId }, { departmentId, realname, schoolId, specialtyList, userData }) {
                // $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

                // $$.ajax({
                //     type: 'POST',
                //     url: tempIp + '/doctor/saveRegisterInfo/',
                //     data: { hospitalId: hospitalId, doctorTypeId: doctorTypeId, departmentId: departmentId, realname: realname, schoolId: schoolId, specialtyList: specialtyList, userData: userData }, // pass in data as strings
                // }).then(function(data) {
                //     return data || {};
                // });
                return $http({
                    method: "POST",
                    data: { hospitalId, doctorTypeId, departmentId, realname, schoolId, specialtyList, userData },
                    url: tempIp + '/doctor/saveRegisterInfo/',
                    async: false,
                    dataType: 'json',
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                }).success((data) => { console.log(data) });
            }
        }
    }])
    .name