import motFeed from './mot-feed.html';

//import filters from '../../filters';
//import styles from './scss/_global.scss';

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

                }]
        };
    });
}