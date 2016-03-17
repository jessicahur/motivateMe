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
            .state('feed.detail', {
                url: 'detail/:projectId',
                template: '<feed-detail></feed-detail>',
                data: {
                    requireAuth: false
                },
                controller: function($scope, $stateParams, $auth, ProgressService, CommentService) {
                    Object.keys($stateParams).forEach(key => {
                        $scope[key] = $stateParams[key];
                    });
                    console.log($stateParams);
                    if ($auth.isAuthenticated()) {
                        $scope.authed = true;
                    }
                    else {
                        $scope.authed = false;
                    }
                    $scope.selectProg = function(prog, id) {
                        $scope.commentOn = prog;
                        $scope.commentProgId = id;
                    }
                }
            })
            .state('profile', {
              url: '/profile',
              template: '<mot-profile></mot-profile>',
              data: {
                requireAuth: true
              }
            })
            .state('project', {
                url: '/project/:id',
                template: '<project-detail></project-detail>',
                data: {
                    requireAuth: true
                }
            });
            // .state('user', {
            //     url: '/user',
            //     template: '<user></user>',
            //     data: {
            //         requireAuth: false
            //     }
            // })
    }]);
}
