import uirouter from 'angular-ui-router';
import './e_call.css';


export default angular.module('page2', [uirouter])
    .service('API', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
        return {
            get_data: function() {
                var config = { params: { userdata: 'stone' } };
                return $http.get('/getlist/error', config)
            }
        }
    }])
    .controller('menu_left', ['API', function(API) {
        API.get_data().then((response) => {

            console.log(response)

        })
    }])
    .name;