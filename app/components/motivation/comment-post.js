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
              // $scope.selectProg = function(prog, id) {
              //   $scope.commentOn = prog;
              //   $scope.commentProgId = id;
              // }
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
