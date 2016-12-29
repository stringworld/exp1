routes.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

export default function routes($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('main.taskdetail', {
            sticky: true,
            position: false,
            url: '/taskdetail?taskId&projectId&returnvisit&edit&status&callnumber',
            views: {
                'taskdetail': {
                    templateProvider: ['$q', function($q) {
                        return $q((resolve) => {
                            // lazy load the view
                            require.ensure([], () => {
                                return resolve(require('./taskdetail.html'));
                            }, 'taskdetail');
                        });
                    }],
                }
            },
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load whole module
                            let module = require('./taskdetail.js');
                            $ocLazyLoad.load({ name: 'taskdetail' });
                            resolve(module.controller);
                        }, 'taskdetail');
                    });
                    //return $ocLazyLoad.load('pages/page1/page1.js');
                }]
            }
        })
}