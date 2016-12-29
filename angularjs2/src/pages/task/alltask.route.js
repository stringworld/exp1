routes.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

export default function routes($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('main.alltask', {
            // sticky: true,
            // position: false,
            url: '/alltask',
            views: {
                'alltask': {
                    templateProvider: ['$q', function($q) {
                        return $q((resolve) => {
                            // lazy load the view
                            require.ensure([], () => {
                                return resolve(require('./task.html'));
                            }, 'task');
                        })
                    }]
                }
            },
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load whole module
                            const module = require('./task.js');
                            $ocLazyLoad.load({ name: 'task' });
                            resolve(module.controller);
                        }, 'task');
                    });
                    //return $ocLazyLoad.load('pages/page1/page1.js');
                }]
            }
        })
}