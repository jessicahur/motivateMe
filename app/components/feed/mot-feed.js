import motFeed from './mot-feed.html';

//import filters from '../../filters';
//import styles from './mot-feed.scss';

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
                projects: '='
            },
            controller: [ '$scope', 'FeedService',
                function( $scope, FeedService ){

                    //
                    //$scope.viewProject = function(id){
                    //    console.log("View Specific Project", id);
                    //    Feedervice.view(id);
                    //};

                    $scope.viewProject = FeedService.query();


                }]

        };
    });
}