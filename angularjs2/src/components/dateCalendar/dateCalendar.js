import angular from 'angular';
import $ from 'jquery';
import './calendar.css';
import './calendar.js';
export default angular.module("dateCalendar", [])
    .directive('dateCalendar', ['$state', function($state) {
        return {
            restrict: 'AE',
            scope: { placeholdervalue: '=', onselected: '&' },
            template: require('./dateCalendar.html'),
            replace: true,
            link: function(scope, element, attrs) {
                scope.$watch('placeholdervalue', function() {
                    scope.placeholdervalue = scope.placeholdervalue.value || '请选择日期';
                }, true);
                var $element = $(element[0]);
                $element.find('div').calendar({
                    width: 320,
                    height: 320,
                    trigger: $element.find('input'),
                    zIndex: 999,
                    format: 'yyyy-mm-dd',
                    onSelected: function(view, date, data) {},
                    onClose: function(view, date, data) {
                        console.log(date)
                        var time = new Date(date);
                        console.log(time.getFullYear(), time.getMonth() + 1, time.getDay(), time.getHours(), time.getMinutes(), time.getSeconds())
                        scope.onselected({ selectedValue: $element.find('input').val() });
                    }
                });
            }
        }
    }])

.name;