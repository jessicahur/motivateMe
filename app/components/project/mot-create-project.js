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
            controller: ['$scope', 'ProjectService', '$window', 'viewService', 'ProgressService', function($scope, ProjectService, $window, viewService, ProgressService) {
              $scope.view = viewService;
              $scope.project = new ProjectService();
              $scope.post = function() {

                $scope.project.author = $window.localStorage.getItem('userId');

                var promises = [];
                var progresses = $scope.project.progress.split(', ');
                progresses.forEach(progress => {
                                    var resourceProgress = new ProgressService();
                                    resourceProgress.content = progress;
                                    resourceProgress.done = false;
                                    console.log('GIve me promise!!',resourceProgress);
                                    var myPromise = new Promise((resolve, reject) => {
                                      resourceProgress.$save(
                                        savedProgress => {
                                          resolve(savedProgress);
                                        },
                                        err => {
                                          reject(err);
                                      });//end $save
                                    });//end myPromise
                                    promises.push(myPromise);
                                  });

                Promise.all(promises)
                       .then(result => {
                        console.log('RESULT',result);
                        $scope.project.progress = result.map(progress => {
                          return progress._id;
                        });
                        $scope.project.$save(res => {
                          $scope.savedProject = res;
                          console.log($scope.savedProject);
                        });
                       })
                       .catch(err => {
                        console.log(err);
                       });
                // $scope.project.$save(res => {
                //     $scope.savedProject = res;
                // });
              }

            }]
         };
    });
}
