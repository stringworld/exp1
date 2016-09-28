routes.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

export default function routes($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('main.page4', {
            sticky: true,
            position: false,
            url: '/page4',
            views: {
                'page4': {
                    templateProvider: ($q) => {
                        return $q((resolve) => {
                            // lazy load the view
                            require.ensure([], () => {
                                return resolve(require('./page4.html'))
                            }, 'page4');
                        });
                    },
                }
            },
            resolve: {
                loadMyCtrl: ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load whole module
                            let module = require('./page4.js');
                            $ocLazyLoad.load({ name: 'page4' });
                            resolve(module.controller);
                        }, 'page4');
                    });
                    //return $ocLazyLoad.load('pages/page1/page1.js');
                }
            }
        })
}