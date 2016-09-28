routes.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

export default function routes($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('page2', {
            url: '/page2',
            views: {
                'page2': {
                    templateProvider: ($q) => {
                        return $q((resolve) => {
                            // lazy load the view
                            require.ensure([], () => {
                                return resolve(require('./page2.html'))
                            }, 'page2');
                        });
                    },
                }
            },
            resolve: {
                loadMyCtrl: ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load whole module
                            let module = require('./page2.js');
                            $ocLazyLoad.load({ name: 'page2' });
                            resolve(module.controller);
                        }, 'page2');
                    });
                    //return $ocLazyLoad.load('pages/page1/page1.js');
                }
            }
        })
}