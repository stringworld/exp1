import angular from 'angular';
import $ from './js/Zepto';
import './js/sm.js';
// import './js/sm-city-picker.js'
// import './js/sm-depat-picker.js'
import './css/public.css';
import './css/sui.css';
// import './css/sm.css';
import store from 'storejs';
export default angular.module("picKer", [])
    .directive('picKer', [function() {
        return {
            restrict: 'AE',
            scope: { classdom: '=', itemlabel: '=', itemvalue: '=', mydata: '=' },
            template: require('./picKer.html'),
            replace: false,
            link: function(scope, element, attrs) {
                var time;
                var indexX;
                var idsList;

                setTimeout(function() {
                    console.log(scope.mydata)
                    scope.result = scope.mydata.doctorTypeList.map((item) => item.doctorTypeName);
                    scope.resultIds = scope.mydata.doctorTypeList.map((item) => item.doctorTypeId);
                    // console.log(scope.mydata)
                    // scope.hospitalAttributeList = scope.mydata.hospitalAttributeList.map((item) => item.hospitalAttributeName);
                    // scope.hospitalLevelList = scope.mydata.hospitalLevelList.map((item) => item.hospitalLevelName);
                    scope.temp = ([{
                        textAlign: 'center',
                        values: scope.result
                    }])


                    function getIds({ values }) {
                        if (values.length === 2) {
                            indexX = scope.resultIds[scope.result.indexOf(values[0])] || "";
                        }
                        idsList = values + indexX;
                        console.log(values.length, indexX, scope.resultIds)
                    }

                    $('#' + scope.classdom).html(scope.mydata.doctorTypeList.filter((item) => item.doctorTypeId === store.get('doctorTypeId')).map((item) => item.doctorTypeName)[0]);

                    $('#' + scope.classdom).picker({
                        toolbarTemplate: '<header class="bar bar-nav">' +
                            '<button class="button button-link pull-left  close-picker">取消</button>' +
                            '<button class="button button-link pull-right ' + scope.classdom + '">确定</button>\
                             </header>',
                        onChange: function(picker, values, displayValues) {
                            clearTimeout(time)
                            $(picker.input).attr('ids-1-' + scope.classdom, indexX || '');
                            time = setTimeout(function() { getIds({ values }); }, 200);
                        },
                        cols: scope.temp
                    });

                    //我是
                    $(document).on("click", "." + scope.classdom, function() {
                        var actionIndex = $('#' + scope.classdom).attr('activeindex');
                        if (!scope.mydata.doctorTypeList[actionIndex].disable) {
                            store("doctorTypeId", scope.mydata.doctorTypeList[actionIndex].doctorTypeId);
                            var pickerToClose = $('.picker-modal.modal-in');
                            $.closeModal(pickerToClose);
                        } else {
                            $.toast("暂未开放注册", 1000);
                        }
                    });
                    $(document).on("click", ".picker-selected", function() {
                        var zindex = $(this).attr('zindex');
                        if (!scope.mydata.doctorTypeList[zindex].disable) {
                            store("doctorTypeId", scope.mydata.doctorTypeList[zindex].doctorTypeId);
                            var pickerToClose = $('.picker-modal.modal-in');
                            $.closeModal(pickerToClose);
                        } else {
                            $.toast("暂未开放注册", 1000);
                        }
                    });
                }, 300);

                $(".show-toast").click(function() {
                    $.toast("操作成功", 1000);
                });
            }
        };
    }])
    .name;