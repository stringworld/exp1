routes.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

export default function routes($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('main.returnvisitmine', {
            sticky: true,
            position: false,
            url: '/returnvisitmine',
            views: {
                'returnvisitmine': {
                    templateProvider: ['$q', function($q) {
                        return $q((resolve) => {
                            // lazy load the view
                            require.ensure([], () => {
                                return resolve(require('./returnvisitmine.html'));
                            }, 'returnvisitmine');
                        });
                    }],
                }
            },
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load whole module
                            let module = require('./returnvisitmine.js');
                            $ocLazyLoad.load({ name: 'returnvisitmine' });
                            resolve(module.controller);
                        }, 'returnvisitmine');
                    });
                    //return $ocLazyLoad.load('pages/page1/page1.js');
                }]
            }
        })
}