import angular from 'angular';
import $ from 'jquery';
import './audioplayer'
import './audioplay.less';

export default angular.module("audioplay", [])
    .directive('audioPlay', [function() {
        return {
            restrict: 'AE',
            scope: {},
            template: require('./audioplay.html'),
            replace: false,
            link(scope, element) {
                scope.$on('components:audioplay:play', (event, data) => {
                    $(element)
                        .html('<audio preload="auto" controls><source /></audio>')
                        .find('source').attr('src', data.src)
                        .end().find('audio').audioPlayer()
                        .end().find('.audioplayer-playpause').trigger('click')
                })
            }
        };
    }])
    .name;





//组件数据类型
// [
//     {
//         "url": "http://192.168.0.215:8082/stream/6448300e-8249-49af-b948-1ecedeaeaa27.mp3",
//         "time":21
//     },
//     {
//         "url": "http://192.168.0.215:8082/stream/6448300e-8249-49af-b948-1ecedeaeaa27.mp3",
//         "time":21
//     },
//     {
//         "url": "http://192.168.0.215:8082/stream/6448300e-8249-49af-b948-1ecedeaeaa27.mp3",
//          "time":21
//     },
// ]