import satellizer from 'satellizer';
var baseUrl = BASE_URL;
export default function(app) {
    app.requires.push(satellizer);
    app.config(['$authProvider', configAuth]);
    app.run(['$rootScope', 'ngDialog', '$state', '$auth', runAuth]);
}

function configAuth($authProvider) {
    $authProvider.github({
        clientId: CLIENT_ID
    });
    $authProvider.github({
        url: `${baseUrl}/auth/github`,
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        redirectUri: window.location.origin,
        optionalUrlParams: ['scope'],
        scope: ['user:email'],
        scopeDelimiter: ' ',
        type: '2.0',
        popupOptions: {
            width: 1020,
            height: 618
        }
    });
  $authProvider.twitter({
      url: 'http://localhost:3000/auth/twitter'
  });
  $authProvider.signupUrl = 'http://localhost:3000/auth/signup';
  $authProvider.loginUrl = 'http://localhost:3000/auth/login';
}

function runAuth($rootScope, ngDialog, $state, $auth) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
        if (toState.data && toState.data.requireAuth && !$auth.isAuthenticated()) {
            event.preventDefault();
            const dialog = ngDialog.open({
                template: '<login></login>',
                plain: true,
                controller: ['$scope', function($scope) {
                    $scope.success = function(response) {
                        dialog.close();
                        return $state.go(toState.name, toParams);
                    };
                }]
            });
            dialog.closePromise
                .then(() => alert('success!'))
                .catch(() => alert('failure!'));
        }
    });
    
    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
        $rootScope.previousState = from.name;
        $rootScope.currentState = to.name;
    });
}
