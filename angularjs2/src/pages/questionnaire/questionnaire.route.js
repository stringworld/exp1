/**
 * Created by wuhuan on 2016/12/4.
 */
routes.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

export default function routes($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('main.questionnaire', {
            sticky: true,
            position: false,
            url: '/questionnaire',
            views: {
                'questionnaire': {
                    templateProvider: ['$q', function($q) {
                        return $q((resolve) => {
                            // lazy load the view
                            require.ensure([], () => {
                                return resolve(require('./questionnaire.html'));
                            }, 'questionnaire');
                        });
                    }],
                }
            },
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load whole module
                            let module = require('./questionnaire.js');
                            $ocLazyLoad.load({ name: 'questionnaire' });
                            resolve(module.controller);
                        }, 'questionnaire');
                    });
                    //return $ocLazyLoad.load('pages/page1/page1.js');
                }]
            }
        })
}