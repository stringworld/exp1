// import page2Service from './page2.service';
import $ from 'jquery';
// import './js/sm.js';
import './css/public.css';
import './css/sui.css';



export default angular.module('page2', [])
    .service('getDataAPI', ['$http', function($http) {
        return {
            getDoctorTypes: function() {
                const config = { params: {} };
                return $http.get('http://192.168.10.213:8082/doctor/getDoctorTypes/', config)
            }
        }
    }])
    .controller('test2', ['getDataAPI', '$scope', function(getDataAPI, $scope) {
        // getDataAPI.getDoctorTypes().then((data) => {
        //     console.log(data)
        // });
        $.ajax({
                type: 'get',
                data: '',
                url: 'http://192.168.10.213:8082/doctor/getDoctorTypes/',
                success: function(data) {
                    console.log(data)
                }
            })
            // console.log(getDataAPI.getDoctorTypes().then((response) => {

        //     console.log(response)

        // }))
    }])

.name;