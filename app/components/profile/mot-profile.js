import motProfile from './mot-profile.html';
export default function(angularModule) {

    /**
     * Controller:
     */
    angularModule.directive('motProfile', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motProfile,
            controller: ['$scope', '$location', '$auth', 'toastr', 'UserService', function($scope, $location, $auth, toastr, UserService) {
            var userId = localStorage.getItem('userId');
            $scope.userData = UserService.get({
                id: userId
            });
          }]
        }
    });
}
