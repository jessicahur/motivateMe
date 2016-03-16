export default function($scope, $auth) {
  $scope.logout = $auth.isAuthenticated();
  console.log('At Controller', $scope.logout);
  $scope.needSignIn = false;
}
