export default function(angularModule) {
    angularModule.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('feed', {
                url: '/',
                template: '<feed></feed>',
                data: {
                    requireAuth: false
                }
            })
            .state('feed-detail', {
                url: '/detail',
                template: '<feed-detail></feed-detail>',
                data: {
                    requireAuth: false
                }
            })
            .state('profile', {
              url: '/profile',
              template: '<mot-profile></mot-profile>',
              data: {
                requireAuth: true
              }
            })
            .state('profile.projects', {
                url: '/projects',
                views: {
                    'project': {
                        template: '<project></project>'
                    },
                    'create': {
                        template: '<create-project></create-project>'
                    }
                },
                data: {
                    requireAuth: true
                }
            })
            .state('profile.detail', {
                url: '/:id?edit',
                template: '<project-detail></project-detail>',
                data: {
                    requireAuth: true
                }
            })
            .state('user', {
                url: '/user',
                views: {
                    'login': {
                        template: '<login></login>'
                    },
                    'signup': {
                        template: '<signup></signup>'
                    }
                },
                data: {
                    requireAuth: false
                }
            })
    }]);
}
