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
                    var remains = Math.floor((1+ Date.parse(completion) - Date.now()  )/86400000);
                    console.log(remains, ' is remains');
                    return remains;
                }

                $scope.percentTimeUsed = function(time, completion){
                    // percent is  remaining / total
                        var time = Date.parse(time);  //start time
                        console.log(time, ' is incoming time unix');
                        var completion = Date.parse(completion);  //completion time
                        console.log(completion, ' is incoming completion unix');

                        var total =  completion - time;   //allocated time

                        var total =  1 + Math.floor(( completion - time )/86400000);

                        console.log(total, 'total days available');

                        //remaining days
                        var remaining = Math.floor((completion - Date.now()  )/86400000);
                        console.log(remaining, ' is remaining');   //remaining time
                        var percentTime = (remaining / total) * 100;
                        console.log (percentTime, 'is percent time');
                        percentTime = 100 - Math.trunc( percentTime) ;
                        return percentTime;
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
