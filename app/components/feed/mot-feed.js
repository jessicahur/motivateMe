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
            scope: {

             },
            controller: [ '$scope', 'FeedService',
                function( $scope, FeedService ){

                    $scope.projects = FeedService.query();

                    //$scope.projectView = FeedService.query(id);

                    $scope.projectView = function(id){

                        console.log("View Project", id);

                        console.log (FeedService.query('?',id) );

                        FeedService.query(  {id: id} );

                    }

                }

            ]
        };
    });
}