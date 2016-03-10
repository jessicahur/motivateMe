import commentsTemplate from './comment-post.html';
export default function(angularModule) {
  /**
   * Controller: displays feed for main page
   */
    angularModule.directive('commentPost', function() {
        return {
            replace: true,
            restrict: 'E',
            template: commentsTemplate,
            scope: {
              'authed': '=',
              'projectId': '=',
              'comments': '='
            },
            controller: function($auth, $scope, $location, $window, CommentService) {
              $scope.comment = new CommentService();
              $scope.post = function () {
                $scope.comment.project = $scope.projectId;
                $scope.comment.author = $window.localStorage.getItem('userId');
                $scope.comment.$save(savedCmt => {
                  $scope.comments.push(savedCmt);
                });
                $scope.comment = new CommentService();
                // console.log($location);
                // console.log($window.localStorage.getItem('userId'));
                // console.log($scope.comment);
              }
            } //end controller
        };
    });
}
