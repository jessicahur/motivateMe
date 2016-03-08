import motComments from './mot-comments.html';
export default function(angularModule) {
  /**
   * Controller: displays feed for main page
   */
    angularModule.directive('comments', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motComments
        };
    });
}
