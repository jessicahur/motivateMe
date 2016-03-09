import motProject from './mot-project.html';
export default function(angularModule) {

    /**
     * Controller:
     */
    angularModule.directive('project', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motProject,
            controller: ['$scope', '$location', '$auth', 'toastr', 'UserService', 'FeedService', function($scope, $location, $auth, toastr, UserService, FeedService ) {
                var userId = localStorage.getItem('userId');
                $scope.userData = UserService.get({
                    id: userId
                });
                FeedService.query({
                    _id: userId
                }).$promise.then((data) => {
                    $scope.projects = data;
                })

            }]
        };
    });
}
