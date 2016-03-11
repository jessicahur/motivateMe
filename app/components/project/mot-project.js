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
            controller: ['$scope', '$stateParams', 'FeedService', 'viewService', '$window', function($scope, $stateParams, FeedService, viewService, $window) {
                $scope.view = viewService;
                var userId = $window.localStorage.getItem('userId');
                FeedService.query({
                    _id: userId
                }).$promise.then((data) => {
                    $scope.projects = data;
                    console.log ( $scope.projects );
                })

                $scope.can = false;

                $scope.edit = function(x) {
                    $scope.can = x;
                    $scope.time = project.time.substring(0,10);
                    //$scope.time = project.time;
                };

                $scope.remaining = function(time, completion){
                    console.log(Date.parse(time), Date.parse(completion) );
                    var remains = Math.floor((1+ Date.parse(completion) - Date.parse(time)  )/86400000);
                    console.log(remains, ' is remains');
                    return remains;
                }

                $scope.difference = function(datetime){
                    datetime = Date.parse(datetime);
                    var now = new Date();
                    var diff =  Math.floor( 1 + ( datetime - now ) / 86400000);

                    $scope.project.completion =  datetime;

                    return diff;
                }

            }]
        };
    });
}
