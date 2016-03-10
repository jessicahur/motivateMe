import motCreateProject from './mot-create-project.html';
export default function(angularModule) {
  /**
   * Controller: displays feed for main page
   */
    angularModule.directive('createProject', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motCreateProject,
            controller: ['$scope', 'ProjectService', '$window', 'viewService', function($scope, ProjectService, $window, viewService) {
              $scope.view = viewService;
              $scope.project = new ProjectService();
              $scope.post = function() {

                //for edit state
                $scope.can = false;

                $scope.project.progress = $scope.project.progress.split(', ');

                $scope.project.author = $window.localStorage.getItem('userId');

                $scope.project.$save(res => {
                    $scope.savedProject = res;

                })
              }

            }]
         };
    });
}
