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
            controller: ['$scope', '$stateParams', 'FeedService', function($scope, $stateParams, FeedService) {
                var userId = localStorage.getItem('userId');
                FeedService.query({
                    _id: userId
                }).$promise.then((data) => {
                    $scope.projects = data;
                })
                $scope.can = false;
                $scope.edit = function(x) {
                  $scope.can = x;
                }
            }]
        };
    });
}
