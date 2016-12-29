routing.$inject = ['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', '$ocLazyLoadProvider', '$httpProvider'];

export default function routing($stateProvider, $urlRouterProvider, $sceDelegateProvider, $ocLazyLoadProvider, $httpProvider) {
    //$locationProvider.html5Mode(true);
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://*.thedoc.cn/**',
        'http://p.thedoc.cn/**',
        'http://192.168.1.212:8082/**',
        'http://45.124.125.100/**',
        'http://192.168.0.215:8082/stream/**'
    ]);
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('index', {
            url: '/index',
            sticky: true,
            deepStateRedirect: true,

        });
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push(['$q', function($q) {
        return {
            request: function(config) {
                // Header - Token
                config.headers = config.headers || {};
                // config.headers.Engine = 'ng';
                // config.headers['cookie-alt'] = document.cookie;
                if (config.headers['Content-Type'] && config.headers['Content-Type'].indexOf('urlencoded') >= 0) {
                    if (config.data) {
                        var form = [];
                        for (var p in config.data) {
                            form.push(encodeURIComponent(p) + '=' + encodeURIComponent(config.data[p]));
                        }
                        config.data = form.join("&");
                    }
                }
                return config;
            },
            response: function(response) {
                if (response.status == 200) {
                    // console.log('do something...');
                }
                return response || $q.when(response);
            },
            responseError: function(response) {
                return $q.reject(response);
            }
        }
    }]);

}