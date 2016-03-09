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
                views:{
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
