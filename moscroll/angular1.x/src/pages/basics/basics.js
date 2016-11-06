import picKer from '../../components/picKer/picKer';
import './css/public.css';
import './css/sui.css';

import basicsService from './basics.service';
import basicsData from './basics.data';
import store from 'storejs';
import $bridge from '../../common/js/bridge.js';

export default angular.module('basics', [picKer, basicsService, basicsData])
    .controller('basics', ['getDataAPI', 'basicData', '$scope', '$q', function(getDataAPI, basicData, $scope, $q) {
        $scope.dataPool = basicData;

        $q.all([getDataAPI.getDoctorTypes()]).then(values => {
            //getDataAPI.getDoctorInfo({ userData: document.cookie }), 
            // basicData.doctorInfoList = values[0].data;
            basicData.doctorTypeList = values[0].data;
        }).catch(reason => {
            console.log(reason)
        })
        basicData.isShadeShow = true;


        //我是
        $scope.myIdentity = function() {
            // basicData.isShadeShow = false;
            console.log(basicData)
            basicData.selectData.type = 'oneCols';
            // basicData.selectData.list = basicData.doctorTypeList.doctorTypeList.map((item) => ({
            //     id: item.doctorTypeId,
            //     name: item.doctorTypeName,
            //     disable: item.disable,
            //     list: []
            // }))

            $scope.dataPool.selectData.list = [
                {"id":1,"name": 'test- 1', "disable": false},
                {"id":2,"name": 'test- 2', "disable": false},
                {"id":3,"name": 'test- 3', "disable": false},
                {"id":4,"name": 'test- 4', "disable": false}
            ]

            $scope.getchange = function(id, name) {
                console.log('id=' + id[0].firstId, 'name=' + name)
                // getDataAPI.getRegisterDict({ doctorTypeId: id[0] }).then(({ data }) => {
                //     console.log(data)
                //     basicData.propList = data.hospitalAttributeList; //属性
                //     basicData.levelList = data.hospitalLevelList; //  级别
                //     basicData.locationList = data.provinceListWithCity; //地区
                //     basicData.specialtyList = data.specialtyList; //  擅长
                // })
                $scope.doctorTypeName=name[0]
                getDataAPI.doctorTypeId = id[0].firstId;
                $scope.$apply();
            }
        }

        $scope.closePicker = function() {
            basicData.selectData.list = [];
            basicData.selectData.type = '';
            basicData.isShadeShow = true;
            $scope.$apply();
        }

        //选择医院地区
        $scope.hosRegion = function() {

            basicData.selectData.type = 'twoCols';
            // basicData.selectData.list = basicData.locationList.map((item) => ({
            //     id: item.id || '',
            //     name: item.name || '',
            //     disable: false,
            //     list: item.cityList.map((items) => ({
            //         id: items.id || '',
            //         name: items.name || '',
            //         disable: false
            //     }))
            // }))
            $scope.dataPool.selectData.list = [
                {"id":1,"name": 'test 11', "disable": false,"list":[{"id":11,"name":'test 15'}]},
                {"id":2,"name": 'test 21', "disable": false, "list":[{"id":11,"name":'test 15'}] },
                {"id":3,"name": 'test 31', "disable": false, "list": [{"id":11,"name":'test 15'}] },
                {"id":4,"name": 'test 41', "disable": false, "list": [{"id":42,"name":'test 45'},{"id":43,"name":'test 46'}] },
            ]
            console.log(basicData.selectData.list)
            $scope.getchange = function(id, name) {
                console.log('id=' + id[0], 'name=' + name)
                $scope.hospitalName=name[0];
                getDataAPI.hospitalId = id[0].firstId;
                $scope.$apply();
            }
        }

        $scope.isShowHos = false;
        $scope.isShowAcademy = false;
        $scope.isHideBasic = true;

        //医院地址
        $scope.showHos = function() {
            $scope.isShowHos = true;
            $scope.isHideBasic = false;
            $bridge.callMobile('changeTitle', { params: '医院' });
            $bridge.callMobile('isHospital');
        }

        // 毕业院校
        $scope.showAcademy = function() {
            $bridge.callMobile('changeTitle', { params: '毕业院校' });
            $bridge.callMobile('isHospital');
            $scope.isShowAcademy = true;
            $scope.isHideBasic = false;
        }

        //医院返回
        $bridge.RegisterFunction("hospitalBack");
        window.hospitalBack = $scope.hospitalBack = function() {
            setTimeout(function() {
                $scope.isShowHos = false;
                $scope.isShowAcademy = false;
                $scope.isHideBasic = true;
                $scope.$apply();
            }, 100)
        }
    }])
    .name;