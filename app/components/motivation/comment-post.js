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
              //for rating
                // $scope.rate = 5;
                // $scope.max = 10;
                // $scope.isReadonly = false;

                // $scope.hoveringOver = function(value) {
                //   $scope.overStar = value;
                //   $scope.percent = 100 * (value / $scope.max);
                // };

                // $scope.ratingStates = [
                //   {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
                //   {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
                //   {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
                //   {stateOn: 'glyphicon-heart'},
                //   {stateOff: 'glyphicon-off'}
                // ];
              $scope.comment = new CommentService();
              console.log('comment service', $scope.comment);
              $scope.post = function () {
                $scope.comment.project = $scope.projectId;
                $scope.comment.author = $window.localStorage.getItem('userId');
                $scope.comment.$save(savedCmt => {
                  $scope.comments.push(savedCmt);
                  console.log(savedCmt);
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
