routes.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

export default function routes($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('main.alltask', {
            sticky: true,
            position: false,
            url: '/alltask',
            views: {
                'alltask': {
                    templateProvider: ($q) => {
                        return $q((resolve) => {
                            // lazy load the view
                            require.ensure([], () => {
                                return resolve(require('./alltask.html'));
                            }, 'alltask');
                        });
                    },
                }
            },
            resolve: {
                loadMyCtrl: ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load whole module
                            let module = require('./alltask.js');
                            $ocLazyLoad.load({ name: 'alltask' });
                            resolve(module.controller);
                        }, 'alltask');
                    });
                    //return $ocLazyLoad.load('pages/page1/page1.js');
                }
            }
        })
}