import motFeedDetail from './mot-feed-detail.html';

export default function(angularModule) {

    /**
     * Controller: displays feed for main page
     */

    angularModule.directive('feedDetail', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motFeedDetail,

            controller: [ '$scope', 'FeedService',
                function( $scope, FeedService ){

                    $scope.projects = FeedService.query();

                    $scope.returnToFeed = function(){
                        $scope.singleProjectView = null;

                    }
                }
            ]
        }
    })
}
