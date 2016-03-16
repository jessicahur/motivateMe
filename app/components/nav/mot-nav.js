import motNav from './mot-nav.html';
export default function(angularModule) {
  angularModule.directive('motNav', function() {
              return {
                  replace: true,
                  restrict: 'E',
                  template: motNav,
                  // scope: {
                  //   logout: '='
                  // },
                  controller: ['$scope', 'viewService', '$auth', function($scope, viewService, $auth) {
                        $scope.view = viewService;
                          $scope.signIn = function() {
                            $scope.needSignIn = true;
                          };
                          $scope.noSignIn = function() {
                            $scope.needSignIn = false;
                          }
                      }]
                  }
          });
}
