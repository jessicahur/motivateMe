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
            controller: function($scope, ProjectService, $window, $http) {
              $scope.project = new ProjectService();
              $scope.post = function() {
                $scope.project.progress = $scope.project.progress.split(', ');
                $scope.project.author = $window.localStorage.getItem('userId');
                $scope.project.$save(res => {
                  console.log(res);
                })
              }
            }
        };
    });
}
