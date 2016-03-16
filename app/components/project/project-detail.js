import projDetail from './project-detail.html';
export default function(angularModule) {
    angularModule.directive('projectDetail', function() {
        return {
            replace: true,
            restrict: 'E',
            template: projDetail,
            controller: ['$scope', 'ProjectService', '$stateParams', 'ProgressService','$window', '$location', function($scope, ProjectService, $stateParams, ProgressService, $window, $location) {
                $scope.project = {};
                var param = {
                      id: $stateParams.id
                  };
                var data = ProjectService.get(param, function() {
                    $scope.project = data;
                  });
                $scope.update = function(project) {
                    Promise.all(
                        project.progress.map(progress => {
                            return new ProgressService({
                                _id: progress._id,
                                content: progress.content,
                                done: progress.done
                            }).$update();
                        })
                    ).then(savedProgress => {
                        project.$save(savedProject => {
                            // console.log(savedProject);
                            // $scope.message = `Changes saved!`;
                            $location.path('/profile');

                        });
                    }).catch(err => {
                        $scope.message = `Changes failed to save. Please try again later.`;
                    });
                };//end $scope.update
            }]
        };
    });
}
