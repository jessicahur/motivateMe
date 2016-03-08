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
          controller: ['$scope', '$rootScope', '$location', '$auth', function($scope, $rootScope, $location, $auth) {
              $scope.login = function(user) {
                      $auth.login($scope.user)
                          .then(function() {
                              $location.path(`/${$rootScope.previousState}`);
                          })
                          .catch(function(error) {
                              console.log(error.data.message, error.status);
                          });
              };
              $scope.authenticate = function(provider) {
                  $auth.authenticate(provider)
                      .then(function() {
                          console.log(`You are now signed in with ${provider}, thanks!`);
                          $location.path(`/${$rootScope.previousState}`);
                      })
                      .catch(function(error) {
                          if (error.error) {
                              console.log(error.error);
                          } else if (error.data) {
                              console.log(error.data.message, error.status);
                          } else {
                              console.log(error);
                          }
                      });
              };
          }]
      };
  });


}
