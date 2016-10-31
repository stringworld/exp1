import picKer from '../../components/picKer/picKer';
import $ from './js/Zepto';
import './js/sm.js';
// import './js/sm-city-picker.js'
import './css/public.css';
import './css/sui.css';

import basicService from './basic.service';
import store from 'storejs';
import $bridge from '../../common/js/bridge.js';

export default angular.module('basic', [picKer, basicService])
    .controller('basic', ['getDataAPI', '$scope', function(getDataAPI, $scope) {
        $bridge.callMobile('changeTitle', { params: '擅长' })

        getDataAPI.getDoctorTypes().then(({ data }) => {
            // $scope.result = data.doctorTypeList.filter((item) => item.disable).map((item) => item.doctorTypeName);
            console.log(data)
            $scope.mydata = data //[data.doctorTypeList.map((item) => item.doctorTypeName)];
        });

        $scope.isShowHos = false;
        $scope.isShowAcademy = false;
        $scope.isHideBasic = true;

        //医院地址
        $scope.showHos = function() {
            $scope.isShowHos = true;
            $scope.isHideBasic = false;
            $('#hos-region').html('hhhhh');
        }

        // 毕业院校
        $scope.showAcademy = function() {
            $scope.isShowAcademy = true;
            $scope.isHideBasic = false;
        }

        //医院返回
        $scope.hosBack = function() {
            $scope.isShowHos = false;
            $scope.isHideBasic = true;
        }

        //院校返回
        $scope.academyBack = function() {
            $scope.isShowAcademy = false;
            $scope.isHideBasic = true;

        }

        //院校信息: 登录cookie 科室id 医生类型 医院Id 用户真实姓名 学校id 擅长集合
        $scope.schoolInfoDefault = {
            userData: document.cookie,
            departmentId: '32,34',
            schoolId: '75',
            realname: 'test name',
            specialtyList: '1027,1030,1026,1033'
        }

        //擅长
        $scope.registerDictDefault = {
            doctorTypeId: 1, //store.get('doctorTypeId')
        }

        //信息保存
        $scope.saveRegisterInfo = function() {
            alert($scope.schoolInfoDefault.userData)
            var temData = getDataAPI.saveRegisterInfo($scope.HospitalDepartment, $scope.registerDictDefault, $scope.schoolInfoDefault)
            console.log(temData)
                // .then(({ data }) => {
                //     console.log(data)
                // });
        }

        $scope.newtag = {};
        $scope.registerDict = function(event) {
            event.stopPropagation();
            // alert(JSON.parse($scope.newtag.classesIds))
            // $scope.registerDictDefault.doctorTypeId = store.get('doctorTypeId') || '';
            // alert(store.get('doctorTypeId'));

            //ios 格式
            var thisJson = {
                'classesIds': $scope.newtag.classesIds || '', //类别id
                'diseaseIds': $scope.newtag.diseaseIds || '', //慢病id
                'diseaseNames': $scope.newtag.diseaseNames || '' //慢病name
            };

            //android 格式
            var specialtyList = [{
                name,
                id,
                parentId
            }, {
                name,
                id,
                parentId
            }]

            var saveStatus = thisJson;
            $bridge.callMobile("speciallyData", saveStatus);
            // console.log($bridge)
        }
        $bridge.RegisterFunction("selectdefaultValue");
        window.selectdefaultValue = function(newtag) {
            alert(JSON.stringify(newtag))
            alert(newtag.classesIds)
            $scope.newtag = newtag;
        }

        //医院地区
        $scope.hosRegion = function() {

            getDataAPI.getRegisterDict($scope.registerDictDefault).then(({ data }) => {
                console.log(data)
                getShowLinkage(data.provinceListWithCity, 'hos-region', 'cityList');
            });
        }

        //医院属性
        $scope.hosProperty = function(e) {
            e.stopPropagation();
            e.preventDefault();
            getDataAPI.getRegisterDict($scope.registerDictDefault).then(({ data }) => {
                console.log(data)
                getShowNoLinkage([{
                    value: [
                        data.hospitalLevelList.map(item => item.hospitalLevelName),
                        data.hospitalAttributeList.map(item => item.hospitalAttributeName)
                    ],
                    ids: [
                        data.hospitalLevelList.map(item => item.hospitalLevelId),
                        data.hospitalAttributeList.map(item => item.hospitalAttributeId),
                    ]
                }], 'hos-property');
            });
        }

        // 医院名称参数：医院属性 医院所属城市 医院级别
        $scope.Hospital = {
            hospitalAttributeId: 1, //store.get('ids-2-hos-property'),
            hospitalCityId: 75, //store.get('ids-2-hos-region'),
            hospitalLevelId: 1, //store.get('ids-1-hos-property')
        }

        //医院名称
        $scope.hosName = function() {
            getDataAPI.getDoctorHospital($scope.registerDictDefault, $scope.Hospital).then(({ data }) => {
                if (data.list[0]) {
                    getShowNoLinkage([{
                        value: [
                            data.list.map(item => item.name || '')
                        ],
                        ids: [
                            data.list.map(item => item.id || '')
                        ]
                    }], 'hos-name');
                } else {
                    $.toast('所属地区没有符合的医院', 1000);
                }
            });
        }

        //科室 参数 医院的id
        $scope.HospitalDepartment = {
            hospitalId: store.get('ids-1-hos-name') //1050
        }

        //科室
        $scope.hosDepartment = function() {
            getDataAPI.getHospitalDepartment($scope.registerDictDefault, $scope.HospitalDepartment).then(({ data }) => {
                console.log(data);
                if (data.departmentType === '0') {
                    getShowLinkage(data.departmentList, 'depart-picker', 'subDepartmentList');
                } else {
                    getShowNoLinkage([{
                        value: [
                            data.departmentList.map(item => item.name || '')
                        ],
                        ids: [
                            data.departmentList.map(item => item.id || '')
                        ]
                    }], 'depart-picker');
                }
            });
        }

        //院校地区
        $scope.academyRegion = function(e) {
            e.preventDefault();
            getDataAPI.getRegisterDict($scope.registerDictDefault).then(({ data }) => {
                console.log(data)
                getShowLinkage(data.provinceListWithCity, 'academy-region', 'cityList');
            });
        }

        $scope.schoolData = {
            cityId: store.get('ids-1-academy-region'), //75,
            provinceId: store.get('ids-2-academy-region'), //2
        }

        //毕业院校
        $scope.graduateSchool = function() {
            getDataAPI.getSchoolByGeo($scope.schoolData).then(({ data }) => {
                console.log(data);
                if (data.list[0]) {
                    getShowNoLinkage([{
                        value: [
                            data.list.map(item => item.name)
                        ],
                        ids: [
                            data.list.map(item => item.id)
                        ]
                    }], 'byschool');
                } else {
                    $.toast('所属地区没有符合的学校', 1000);
                }
            });
        }


        // 二级联动
        function getShowLinkage(raw, dom, subList) {
            var cityList = function(data) {
                if (!data[subList]) return [""];
                return (data[subList].map(d => d.name));
            };

            var getCities = function(d) {
                for (var i = 0; i < raw.length; i++) {
                    if (raw[i].name === d) {
                        console.log(raw[i].id, d)
                        return cityList(raw[i]);
                    }
                }
                return [""];
            };

            var provinces = raw.map(function(d) {
                return d.name;
            });

            var idsList = {};
            var getCodeId = function({ values }) {
                    // return (function(values){
                    var thisIds = raw.filter(function(index) {
                        return index.name === values[0];
                    }).map(function(d) {
                        var aa;
                        aa = d[subList].filter(function(index) {
                            return index.name === values[1];
                        }).map(function(d) {
                            return d.id;
                        });
                        var temp = {
                            first: d.id,
                            two: aa[0]
                        }
                        return temp;
                    });
                    idsList = {
                        value: values,
                        firstId: thisIds[0].first,
                        twoId: thisIds[0].two
                    }
                    store.set('ids-1-' + dom, idsList.firstId);
                    store.set('ids-2-' + dom, idsList.twoId);
                    store.set(dom + '-name', values)
                    console.log(idsList)
                    return thisIds[0].first + ',' + thisIds[0].two;
                    // })
                }
                // console.log(getCodeId)

            //默认值
            var initCities = cityList(raw[0]);
            var currentProvince = provinces[0];

            var t;
            $("#" + dom).picker({
                toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-left close-picker">取消</button>\
                <button class="button button-link pull-right conprim-' + dom + '">确定</button>\
                </header>',
                cssClass: "city-picker",
                rotateEffect: false, //为了性能
                onChange: function(picker, values, displayValues) {
                    var newProvince = picker.cols[0].value;
                    var res = getCodeId({ values });
                    if (newProvince !== currentProvince) {
                        // 如果Provinces变化，节流以提高reRender性能
                        clearTimeout(t);

                        t = setTimeout(function() {
                            $(picker.input).attr('temp', res)
                            console.log(values)
                            picker.cols[1].replaceValues(getCities(newProvince));
                            currentProvince = newProvince;
                            picker.updateValue();
                        }, 200);
                        return;
                    }
                },
                cols: [{
                        textAlign: 'center',
                        values: provinces,
                        cssClass: "col-province"
                    },
                    {
                        textAlign: 'center',
                        values: initCities,
                        cssClass: "col-city"
                    }
                ]
            });

            $(document).on("click", ".conprim-" + dom, function() {
                $('#' + dom).picker('close');
                alert(idsList.value)
                var pickerToClose = $('.picker-modal.modal-in');
                $.closeModal(pickerToClose);
            });

            let tem = setTimeout(function() {
                $('#' + dom).picker('close');
                $('#' + dom).picker('open');
                clearTimeout(tem)
            }, 100);
        }

        // 二级无联动
        function getShowNoLinkage(data, dom) {
            var colsData = data[0].value.map((item) => ({
                textAlign: 'center',
                values: item
            }));
            var indexX;
            var indexY;
            var time;
            var idsList;

            function getIds({ values }) {
                if (values.length === 2) {
                    indexX = data[0].ids[0][data[0].value[0].indexOf(values[0])] || "";
                    indexY = data[0].ids[1][data[0].value[1].indexOf(values[1])] || "";
                } else {
                    indexX = data[0].ids[0][data[0].value[0].indexOf(values[0])] || "";
                    indexY = '';
                }
                idsList = values + indexX + indexY;
                store.set('ids-1-' + dom, indexX);
                store.set('ids-2-' + dom, indexY);
                console.log(values.length)
            }

            $("#" + dom).picker({
                toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-left  close-picker">取消</button>\
                <button class="button button-link pull-right conprim-' + dom + '">确定</button>\
                </header>',
                toolbar: true,
                onChange: function(picker, values, displayValues) {
                    clearTimeout(time)
                    $(picker.input).attr('ids-1-' + dom, indexX || '');
                    $(picker.input).attr('ids-2-' + dom, indexY || '');
                    time = setTimeout(function() { getIds({ values }); }, 200);
                },
                cols: colsData
            });

            let tem = setTimeout(function() {
                $('#' + dom).picker('close');
                $('#' + dom).picker('open');
                clearTimeout(tem)
            }, 200);

            $(document).on("click", ".conprim-" + dom, function() {
                $('#' + dom).picker('close');
                alert(idsList)
                var pickerToClose = $('.picker-modal.modal-in');
                $.closeModal(pickerToClose);
            });
        }
    }])
    .name;