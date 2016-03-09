import projDetail from './project-detail.html';
export default function(angularModule) {
    angularModule.directive('projectDetail', function() {
        return {
            replace: true,
            restrict: 'E',
            template: projDetail,
            controller: ['$scope', 'ProjectService', '$stateParams', function($scope, ProjectService, $stateParams) {
                var param = {
                      id: $stateParams.id
                  };
                var data = ProjectService.get(param, function() {
                    $scope.project = data;
                  });
                $scope.update = function(update) {
                        var param = {
                            id: update._id
                        };
                        ProjectService.update(param, JSON.stringify(update));
                    };


            }]
        };
    });
}
