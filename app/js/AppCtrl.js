export default function($scope, $auth) {
  $scope.logout = $auth.isAuthenticated();
  $scope.needSignIn = false;
}
