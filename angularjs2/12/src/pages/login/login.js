import uirouter from 'angular-ui-router';
import voicePlayer from '../../components/voicePlayer/voicePlayer';


export default angular.module('login', [uirouter, voicePlayer])
    .service('loginAPI', ['$http', function($http) {
        return {
            get_data: function() {
                const config = { params: { userdata: 'stone' } };
                return $http.get('/getlist/error', config)
            }
        }
    }])
    .controller('login', ['loginAPI', function(loginAPI) {
        loginAPI.get_data().then(response => {
            
        });



    }])

.name;