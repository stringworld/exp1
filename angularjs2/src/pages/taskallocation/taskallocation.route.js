routes.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

export default function routes($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('main.taskallocation', {
            sticky: true,
            position: false,
            url: '/taskallocation',
            views: {
                'taskallocation': {
                    templateProvider: ['$q', function($q) {
                        return $q((resolve) => {
                            // lazy load the view
                            require.ensure([], () => {
                                return resolve(require('./taskallocation.html'));
                            }, 'taskallocation');
                        });
                    }],
                }
            },
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load whole module
                            let module = require('./taskallocation.js');
                            $ocLazyLoad.load({ name: 'taskallocation' });
                            resolve(module.controller);
                        }, 'taskallocation');
                    });
                    //return $ocLazyLoad.load('pages/page1/page1.js');
                }]
            }
        })
}