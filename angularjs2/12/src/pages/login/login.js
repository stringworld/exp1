import uirouter from 'angular-ui-router';
import voicePlayer from '../../component/voicePlayer/voicePlayer';


export default angular.module('login', [uirouter, voicePlayer])
    .service('LOGIN_API', ['$http', function($http) {
        return {
            get_data: function() {
                const config = { params: { userdata: 'stone' } };
                return $http.get('/getlist/error', config)
            }
        }
    }])
    .controller('test1', ['LOGIN_API', function(LOGIN_API) {
        LOGIN_API.get_data().then(response => {

            console.log(response)

        });


        //     //obejct.asign demon
        //     const obj = [{ a: 1 }, { a: 1 }]
        //     let copy = Object.assign([], obj);
        //     console.log(copy)



        //     //map demon
        //     let copy1 = copy.map((element) => {
        //         return { a: element.a + 1 }
        //     })
        //     console.log(copy1)



        //     //filter demon
        //     let copy2 = copy.filter((element, index, arr) => {
        //         return element.a === 1
        //             //return arr.indexOf(element) === index
        //     })
        //     console.log(copy2)



        //     //reduce demon
        //     let copy3 = copy.reduce((pre, element) => {
        //         return pre + element.a
        //     }, 0)
        //     console.log(copy3)


    }])

.name;