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
            .state('profile', {
                url: '/profile',
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
            .state('user', {
                url: '/user',
                template: '<login></login>',
                data: {
                    requireAuth: false
                }
            })
    }]);
}
