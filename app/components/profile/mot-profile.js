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
            controller: ['$scope', '$location', '$auth', 'toastr', 'UserService', 'viewService', function($scope, $location, $auth, toastr, UserService, viewService) {
            $scope.view = viewService;
            var userId = localStorage.getItem('userId');
            $scope.userData = UserService.get({
                id: userId
            });
          }]
        }
    });
}
