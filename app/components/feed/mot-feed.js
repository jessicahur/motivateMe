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
            controller: [ '$scope', 'FeedService', 'ProgressService',
                function( $scope, FeedService, ProgressService ){
                    $scope.projects = FeedService.query();
                    $scope.projectView = function(project){
                      $scope.singleProjectView = project;
                      FeedService.query({'id':project._id}, res => {
                                  $scope.comments = res;
                                  console.log('HEREEE', $scope.comments.length);
                                 })
                      $scope.singleProjectView.time = project.time.substring(0,10);
                    }



                }
            ]
        };
    });
}
