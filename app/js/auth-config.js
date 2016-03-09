import satellizer from 'satellizer';
var baseUrl = BASE_URL;
export default function(app) {
    app.requires.push(satellizer);
    app.config(['$authProvider', configAuth]);
    app.run(['$rootScope', 'ngDialog', '$state', '$auth', runAuth]);
}

function configAuth($authProvider) {
    $authProvider.twitter({
        url: `${baseUrl}/auth/twitter`
    });
    $authProvider.signupUrl = `${baseUrl}/auth/signup`;
    $authProvider.loginUrl = `${baseUrl}/auth/login`;
}

function runAuth($rootScope, ngDialog, $state, $auth) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
        if (toState.data && toState.data.requireAuth && !$auth.isAuthenticated()) {
            event.preventDefault();
            $state.transitionTo('user');
        }
    });
}
