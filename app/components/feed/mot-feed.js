import motFeed from './mot-feed.html';
export default function(angularModule) {
  /**
   * Controller: displays feed for main page
   */
    angularModule.directive('feed', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motFeed
        };
    });
}
