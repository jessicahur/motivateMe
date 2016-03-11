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
                                  console.log($scope.comments);
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
                    }
                }
            ]
        };
    });
}
