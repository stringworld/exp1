routes.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

export default function routes($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            views: {
                'login': {
                    templateProvider: ['$q', function($q) {
                        return $q((resolve) => {
                            // lazy load the view
                            require.ensure([], () => resolve(require('./login.html')), 'login')
                        })
                    }]
                }
            },
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    return $q(resolve => {
                            require.ensure([], () => {
                                // load whole module
                                const { controller } = require('./login.js');
                                $ocLazyLoad.load({ name: 'login' });
                                resolve(controller);
                            }, 'login');
                        })
                        //return $ocLazyLoad.load('pages/page1/page1.js');
                }]
            }
        })
}