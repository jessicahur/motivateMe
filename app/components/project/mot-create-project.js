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
              $scope.project = {};
              $scope.post = function() {
                $scope.project.progress = $scope.project.progress.split(', ');
                $scope.project.author = $window.localStorage.getItem('userId');
                $http.post('http://3000/api/v1/projects')
                      .then(res => {
                        console.log(res);
                      })
                      .catch(err => {
                        console.log('error', err);
                      })
              }
            }
        };
    });
}
