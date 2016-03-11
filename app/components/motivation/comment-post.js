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
            controller: function($auth, $scope, $location, $window, CommentService, VoteService, ProgressService) {
              function compare(A, B) {
                  if (A.time > B.time) {
                      return -1;
                  }
                  else if (A.time < B.time) {
                      return 1;
                  }
                  return 0;
              };
              function createComment() {
                $scope.comment = new CommentService();
                $scope.comment.votes = new VoteService();
                $scope.comment.votes.ups = [];
                $scope.comment.votes.downs = [];
              }
              createComment();
              $scope.post = function () {
                $scope.comment.votes.$save(savedVote => {
                  $scope.comment.progress = $scope.commentProgId;
                  $scope.comment.votes = savedVote._id;
                  $scope.comment.project = $scope.singleProjectView._id;
                  $scope.comment.author = $window.localStorage.getItem('userId');
                  $scope.comment.$save(savedCmt => {
                    $scope.comments.push(savedCmt);
                    $scope.comments.sort(compare);
                  });
                  createComment();
                });
                // console.log($location);
                // console.log($window.localStorage.getItem('userId'));
                // console.log($scope.comment);
              }
            } //end controller
        };
    });
}
