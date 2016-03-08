export default function(angularModule) {
    angularModule.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('feed', {
                url: '/',
                template: '<feed></feed>',
                data: {
                    authRequired: false
                }
            })
            .state('project', {
                url: '/project',
                template: '<project></project>',
                data: {
                    authRequired: false
                }
            })
            .state('create', {
                url: '/create',
                template: '<create-project></create-project>',
                data: {
                    authRequired: false
                }
            })
            .state('user', {
                url: '/user',
                template: '<login></login>',
                data: {
                    authRequired: false
                }
            })
    }]);
}
