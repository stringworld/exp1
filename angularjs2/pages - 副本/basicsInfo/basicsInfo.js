import basicsInfoService from './basicsInfo.service';
import basicsInfoData from './basicsInfo.data';

import uirouter from 'angular-ui-router';
import oneclospicker from '../../components/oneclospicker/oneclospicker';
import twoclospicker from '../../components/twoclospicker/twoclospicker';
import $ from 'n-zepto';
import './js/sm.js';
import './css/public.css';
import './css/sui.css';
import routing from './basicsInfo.route';

import $bridge from 'common/js/bridge.js';

export default angular.module('basicsInfo', [uirouter, basicsInfoService, basicsInfoData, oneclospicker, twoclospicker])
    .config(routing)
    .controller('basicsInfo', ['getDataAPI', 'basicData', '$scope', '$q', '$location', function(getDataAPI, basicData, $scope, $q, $location) {
        $scope.dataPool = basicData;

        $bridge.callMobile('changeTitle', { params: '基本资料' });
        basicData.saveSpecialty = {};
        $q.all([getDataAPI.getDoctorInfo(), getDataAPI.getDoctorTypes()]).then(values => {
            basicData.doctorInfoList = values[0].data;
            basicData.doctorTypeList = values[1].data;

            basicData.realname = basicData.doctorInfoList.doctor[0].realname || '';
            basicData.doctorTypeName = basicData.doctorInfoList.doctor[0].doctorType || '';
            basicData.hospitalName = basicData.doctorInfoList.doctor[0].hospitalName || '';
            basicData.hosRegionName = (basicData.doctorInfoList.doctor[0].provinceName || '') + ',' + (basicData.doctorInfoList.doctor[0].cityName || '');
            basicData.departmentName = basicData.doctorInfoList.doctor[0].department.name || '';
            basicData.schoolName = basicData.doctorInfoList.doctor[0].schoolName || '';
            basicData.schoolRegionName = (basicData.doctorInfoList.doctor[0].schoolProvinceName || '') + (basicData.doctorInfoList.doctor[0].schoolCityName || '');
            basicData.hosPropertyName = (basicData.doctorInfoList.doctor[0].hospitalLevelName || '') + ',' + (basicData.doctorInfoList.doctor[0].hospitalAttributeName || '');


            basicData.saveSpecialty = {
                'classesIds': (basicData.doctorInfoList.doctor[0].specialty.map((item) => item.id)) || '', //类别id
                'diseaseIds': basicData.doctorInfoList.doctor[0].specialty.map((item) => item.parentId) || '', //慢病id
                'diseaseNames': basicData.doctorInfoList.doctor[0].specialty.map((item) => item.name) || '', //慢病name
                'specialtyList': basicData.doctorInfoList.doctor[0].specialty
            };



            getDataAPI.doctorTypeId = basicData.doctorInfoList.doctor[0].doctorTypeId || '';
            getDataAPI.hospitalId = basicData.doctorInfoList.doctor[0].hospitalId || '';
            getDataAPI.departmentId = basicData.doctorInfoList.doctor[0].department.id || '';
            getDataAPI.hospitalCityId = basicData.doctorInfoList.doctor[0].cityId || '';
            getDataAPI.hospitalLevelId = basicData.doctorInfoList.doctor[0].hospitalLevelId || '';
            getDataAPI.hospitalAttributeId = basicData.doctorInfoList.doctor[0].hospitalAttributeId || '';
            getDataAPI.provinceId = basicData.doctorInfoList.doctor[0].provinceId || '';
            getDataAPI.cityId = basicData.doctorInfoList.doctor[0].cityId || '';
            getDataAPI.schoolId = basicData.doctorInfoList.doctor[0].schoolId || '';



            if (getDataAPI.doctorTypeId) {
                getDataAPI.getRegisterDict(getDataAPI).then(({ data }) => {
                    basicData.propList = data.hospitalAttributeList || ''; //属性 
                    basicData.levelList = data.hospitalLevelList || ''; //  级别
                    basicData.locationList = data.provinceListWithCity || ''; //地区
                    basicData.specialtyList = data.specialtyList || ''; //  擅长
                })
            }

            if (getDataAPI.hospitalId) {
                getDataAPI.getHospitalDepartment(getDataAPI).then(({ data }) => {
                    basicData.departmentList = data;
                });
            }
            if (getDataAPI.cityId) {
                getDataAPI.getSchoolByGeo(getDataAPI).then(({ data }) => {
                    basicData.schoolList = data;
                });
            }

        }).catch(reason => {
            console.log(reason)
        });
        basicData.isShadeShow = true;


        //姓名
        $scope.changeName = function(relname) {
            basicData.realname = relname;
        }

        //我是
        $scope.myIdentity = function() {
            basicData.isShadeShow = false;
            basicData.selectData.oneCol = basicData.doctorTypeList.doctorTypeList.map((item) => ({
                id: item.doctorTypeId || '',
                name: item.doctorTypeName || '',
                disable: item.disable || ''
            }));

            $scope.getchange = function(id, name) {
                if (!id[0].disable) {
                    getDataAPI.doctorTypeId = id[0].firstId;
                    basicData.doctorTypeName = name;
                    basicData.hospitalName = '';
                    basicData.hosRegionName = '';
                    basicData.departmentName = '';
                    basicData.hosPropertyName = '';
                    basicData.schoolName = '';
                    basicData.schoolRegionName = '';

                    getDataAPI.hospitalId = '';
                    getDataAPI.departmentId = '';
                    getDataAPI.hospitalCityId = '';
                    getDataAPI.hospitalLevelId = '';
                    getDataAPI.hospitalId = '';
                    getDataAPI.provinceId = '';
                    getDataAPI.cityId = '';
                    getDataAPI.schoolId = '';

                    basicData.saveSpecialty.classesIds = '';
                    basicData.saveSpecialty.diseaseIds = '';
                    basicData.saveSpecialty.diseaseNames = '';

                    getDataAPI.getRegisterDict(getDataAPI).then(({ data }) => {
                        basicData.propList = data.hospitalAttributeList || ''; //属性 
                        basicData.levelList = data.hospitalLevelList || ''; //  级别
                        basicData.locationList = data.provinceListWithCity || ''; //地区
                        basicData.specialtyList = data.specialtyList || ''; //  擅长
                    })
                    $scope.$apply();
                } else {
                    $.toast('暂不提供选择', 1000);
                }
            }
        }

        $scope.closePicker = function() {
            basicData.selectData.oneCol = [];
            basicData.selectData.twoCols = [];
            basicData.selectData.closeOneCol = '';
            basicData.selectData.closeTwoCols = '';
            basicData.isShadeShow = true;
            $scope.$apply();
        }

        setInterval(function() {
            basicData.isShadeShow = true;
            $scope.$apply();
        }, 2000);

        //选择医院地区
        $scope.hosRegion = function() {
            if (getDataAPI.doctorTypeId) {
                basicData.isShadeShow = false;
                basicData.selectData.twoCols = basicData.locationList.map((item) => ({
                    id: item.id || '',
                    name: item.name || '',
                    disable: false,
                    list: item.cityList.map((items) => ({
                        id: items.id || '',
                        name: items.name || '',
                        disable: false
                    })) || []
                }))

                $scope.getchange = function(id, name) {
                    getDataAPI.hospitalCityId = id[0].twoId;
                    basicData.hosRegionName = name;
                    basicData.hosPropertyName = '';
                    basicData.hospitalName = '';
                    getDataAPI.hospitalLevelId = '';
                    getDataAPI.hospitalAttributeId = '';
                    getDataAPI.departmentId = '';
                    getDataAPI.hospitalId = '';
                    basicData.departmentName = '';
                    getDataAPI.departmentId = '';
                    $scope.$apply();
                }
            } else {
                basicData.isShadeShow = true;
                $.toast('请选择您的角色', 1000);
            }
        }

        //医院属性
        $scope.hosProperty = function(e) {
            if (getDataAPI.hospitalCityId) {
                basicData.isShadeShow = false;
                basicData.selectData.twoCols = basicData.levelList.map((item) => ({
                    id: item.hospitalLevelId || '',
                    name: item.hospitalLevelName || '',
                    disable: false,
                    list: basicData.propList.map((items) => ({
                        id: items.hospitalAttributeId || '',
                        name: items.hospitalAttributeName || '',
                        disable: false
                    })) || []
                }))
                $scope.getchange = function(id, name) {
                    getDataAPI.hospitalLevelId = id[0].firstId;
                    getDataAPI.hospitalAttributeId = id[0].twoId;
                    getDataAPI.getDoctorHospital(getDataAPI).then(({ data }) => {
                        basicData.hospitalNameList = data;
                    });
                    basicData.hosPropertyName = name;
                    basicData.hospitalName = '';
                    getDataAPI.hospitalId = '';
                    basicData.departmentName = '';
                    getDataAPI.departmentId = '';
                    $scope.$apply();
                }
            } else {
                basicData.isShadeShow = true;
                $.toast('先选择省市', 1000);
            }
        }

        //医院名称  医院名称参数：医院属性 医院所属城市 医院级别
        $scope.hosName = function() {
            if (getDataAPI.hospitalLevelId) {
                basicData.isShadeShow = false;
                if (basicData.hospitalNameList.list.length) {
                    basicData.selectData.oneCol = basicData.hospitalNameList.list.map((item) => ({
                        id: item.id || '',
                        name: item.name || '',
                        disable: false
                    }))
                    $scope.getchange = function(id, name) {
                        getDataAPI.hospitalId = id[0].firstId;
                        getDataAPI.getHospitalDepartment(getDataAPI).then(({ data }) => {
                            basicData.departmentList = data;
                        });
                        basicData.hospitalName = name;
                        basicData.departmentName = '';
                        getDataAPI.departmentId = '';
                        $scope.$apply();
                    }
                } else {
                    basicData.isShadeShow = true;
                    $.toast('没有符合的医院', 1000);
                }
            } else {
                basicData.isShadeShow = true;
                $.toast('请选择属性', 1000);
            }
        }

        //科室   参数 医院的id
        $scope.hosDepartment = function() {
            if (getDataAPI.hospitalId) {
                basicData.isShadeShow = false;
                if (basicData.departmentList.departmentType === '0') {
                    basicData.selectData.twoCols = basicData.departmentList.departmentList.map((item) => ({
                        id: item.id || '',
                        name: item.name || '',
                        disable: false,
                        list: item.subDepartmentList.map((items) => ({
                            id: items.id || '',
                            name: items.name || '',
                            disable: false
                        }))
                    }))
                    $scope.getchange = function(id, name) {
                        getDataAPI.departmentId = id[0].twoId;
                        basicData.departmentName = name;
                        $scope.$apply();
                    }
                } else {
                    basicData.isShadeShow = true;
                    basicData.selectData.oneCol = basicData.departmentList.departmentList.map((item) => ({
                        id: item.id || '',
                        name: item.name || '',
                        disable: false
                    }))
                    $scope.getchange = function(id, name) {
                        getDataAPI.departmentId = id[0].firstId;
                        basicData.departmentName = name;
                        $scope.$apply();
                    }
                }
            } else {
                basicData.isShadeShow = true;
                $.toast('请选择您的医院', 1000);
            }
        }

        //擅长
        $scope.registerDict = function(event) {
            // alert('----' + JSON.stringify(basicData.saveSpecialty))
            $bridge.callMobile("speciallyData", basicData.saveSpecialty);
        }
        $bridge.RegisterFunction("selectdefaultValue");
        window.selectdefaultValue = function(special) {
            setTimeout(function() {
                if (special.specialtyList) {
                    basicData.saveSpecialty.classesIds = basicData.saveSpecialty.specialtyList.map((item) => (item.id));
                    basicData.saveSpecialty.diseaseNames = basicData.saveSpecialty.specialtyList.map((item) => (item.name));
                } else {
                    basicData.saveSpecialty.classesIds = special.classesIds || '';
                    basicData.saveSpecialty.diseaseNames = special.diseaseNames || '';
                    basicData.saveSpecialty.diseaseIds = special.diseaseIds || '';
                }
                $scope.$apply();
            }, 100);
            basicData.saveSpecialty = special || {};
        }

        //院校地区
        $scope.academyRegion = function(e) {
            if (getDataAPI.doctorTypeId) {
                basicData.isShadeShow = false;
                getDataAPI.provinceId = '';
                getDataAPI.cityId = '';
                basicData.selectData.twoCols = basicData.locationList.map((item) => ({
                    id: item.id || '',
                    name: item.name || '',
                    disable: false,
                    list: item.cityList.map((items) => ({
                        id: items.id || '',
                        name: items.name || '',
                        disable: false
                    }))
                }))

                $scope.getchange = function(id, name) {
                    getDataAPI.provinceId = id[0].firstId;
                    getDataAPI.cityId = id[0].twoId;
                    getDataAPI.getSchoolByGeo(getDataAPI).then(({ data }) => {
                        basicData.schoolList = data;
                    });
                    basicData.schoolRegionName = name;
                    basicData.schoolName = '';
                    getDataAPI.schoolId = '';
                    $scope.$apply();
                }
            } else {
                basicData.isShadeShow = true;
                $.toast('请选择您的角色', 1000);
            }
        }

        //毕业院校
        $scope.graduateSchool = function() {
            if (getDataAPI.provinceId) {
                basicData.isShadeShow = false;
                if (basicData.schoolList.list[0]) {
                    basicData.selectData.oneCol = basicData.schoolList.list.map((item) => ({
                        id: item.id || '',
                        name: item.name || '',
                        disable: false
                    }))
                    $scope.getchange = function(id, name) {
                        getDataAPI.schoolId = id[0].firstId;
                        basicData.schoolName = name;
                        $scope.$apply();
                    }
                } else {
                    basicData.isShadeShow = true;
                    $.toast('所属地区没有符合的学校', 1000);
                }
            } else {
                basicData.isShadeShow = true;
                $.toast('先选择院校地区', 1000);
            }
        }

        //信息保存 院校信息: 登录cookie 科室id 医生类型 医院Id 用户真实姓名 学校id 擅长集合
        $scope.saveRegisterInfo = function() {
            if (basicData.realname &&
                getDataAPI.doctorTypeId &&
                getDataAPI.hospitalCityId &&
                getDataAPI.hospitalLevelId &&
                getDataAPI.hospitalId &&
                getDataAPI.departmentId &&
                basicData.saveSpecialty.diseaseNames &&
                getDataAPI.cityId &&
                getDataAPI.schoolId) {
                // alert(JSON.stringify(basicData.saveSpecialty.classesIds));
                getDataAPI.saveRegisterInfo(getDataAPI, { realname: basicData.realname, specialtyList: basicData.saveSpecialty.classesIds }).then(({ data }) => {
                    if (data.isSuccess) {
                        $bridge.callMobile('routerGoToPage', { "saveNextRouter": data.data.nextPageRouter });
                    } else {
                        $.toast('保存信息失败', 1000);
                    }
                });
            } else {
                $.toast('请完成基本信息', 1000);
            }
        }

        $scope.isShowHos = false;
        $scope.isShowAcademy = false;
        $scope.isHideBasic = true;

        //医院地址
        $scope.showHos = function() {
            basicData.selectData.closeOneCol = '';
            basicData.selectData.closeTwoCols = '';
            $scope.isShowHos = true;
            $scope.isHideBasic = false;
            $bridge.callMobile('changeTitle', { params: '医院' });
            $bridge.callMobile('isHospital');
        }

        // 毕业院校
        $scope.showAcademy = function() {
            basicData.selectData.closeOneCol = '';
            basicData.selectData.closeTwoCols = '';
            $bridge.callMobile('changeTitle', { params: '毕业院校' });
            $bridge.callMobile('isHospital');
            $scope.isShowAcademy = true;
            $scope.isHideBasic = false;
        }


        //医院返回
        $bridge.RegisterFunction("hospitalBack");
        window.hospitalBack = $scope.hospitalBack = function() {
            $bridge.callMobile('changeTitle', { params: '基本资料' });
            basicData.selectData.closeOneCol = 'close';
            basicData.selectData.closeTwoCols = 'close';
            setTimeout(function() {
                $scope.isShowHos = false;
                $scope.isShowAcademy = false;
                $scope.isHideBasic = true;
                $scope.$apply();
            }, 100)
        }
    }])
    .name;