import motLogin from './mot-login.html';
export default function(angularModule) {

  /**
   * Controller: user authentication for login with provider or email/pwd
   */
  angularModule.directive('login', function() {
      return {
          replace: true,
          restrict: 'E',
          template: motLogin,
          scope: {
            logout: '='
          },
          controller: ['$scope', '$rootScope', '$location', '$auth', 'toastr', function($scope, $rootScope, $location, $auth, toastr) {
              console.log('At login', $scope.logout);
              $scope.login = function(user) {
                      $auth.login($scope.user)
                          .then(function(name) {
                              window.localStorage.setItem('userId', name.data.userId);
                              toastr.success('Your signed in!');
                              $scope.logout = $auth.isAuthenticated();
                              console.log('after sign in', $scope.logout);
                              $location.path('/');
                              // $location.path(`/${$rootScope.previousState}`);
                          })
                          .catch(function(error) {
                              toastr.error(error.data.message, error.status);
                          });
              };
              $scope.authenticate = function(provider) {
                  $auth.authenticate(provider)
                      .then(function(name) {
                          window.localStorage.setItem('userId', name.data.userId);
                          toastr.success(`You are now signed in with ${provider}, thanks!`);
                          $scope.logout = $auth.isAuthenticated();
                          $location.path('/');
                          // $location.path(`/${$rootScope.previousState}`);
                          console.log('At authenticare', $scope.logout);
                      })
                      .catch(function(error) {
                          if (error.error) {
                              toastr.error(error.error);
                          } else if (error.data) {
                              toastr.error(error.data.message, error.status);
                          } else {
                              toastr.error(error);
                          }
                      });
              };
          }]
      };
  });


}
