import motFeed from './mot-feed.html';

//import filters from '../../filters';

export default function(angularModule) {

    /**
   * Controller: displays feed for main page
   */


    angularModule.directive('feed', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motFeed,
            controller: [ '$scope', 'FeedService',
                function( $scope, FeedService ){
                    $scope.projects = FeedService.query();
                    $scope.projectView = function(project){
                        $scope.singleProjectView = project;
                        FeedService.query({'id':project._id}, res => {
                                  $scope.comments = res;
                                 });
                        $scope.singleProjectView.time = project.time.substring(0,10);
                        //For milestone progress bar:
                        $scope.max = $scope.singleProjectView.progress.length;
                        $scope.value = 0;
                        $scope.singleProjectView.progress.forEach(progress => {
                            if (progress.done === true) {
                                $scope.value += 1;
                            }
                        });




                    };

                    $scope.remaining = function(time, completion){
                        console.log(Date.parse(time), Date.parse(completion) );
                        var remains = Math.floor((1+ Date.parse(completion) - Date.now()  )/86400000);
                        console.log(remains, ' is remains');
                        return remains;
                    };


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

                }
            ]
        };
    });
}
