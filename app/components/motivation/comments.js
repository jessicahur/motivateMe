import commentsTemplate from './comments.html';
export default function(angularModule) {
  /**
   * Controller: displays feed for main page
   */
    angularModule.directive('comments', function() {
        return {
            replace: true,
            restrict: 'E',
            template: commentsTemplate,
            scope: {},
            controller: function($auth, $scope, $location, $window, CommentService) {
              $scope.comment = new CommentService();
              if ($auth.isAuthenticated()) {
                $scope.authed = true;
              }
              else {
                $scope.authed = false;
              }
              //for rating
                $scope.rate = 5;
                $scope.max = 10;
                $scope.isReadonly = false;

                $scope.hoveringOver = function(value) {
                  $scope.overStar = value;
                  $scope.percent = 100 * (value / $scope.max);
                };

                $scope.ratingStates = [
                  {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
                  {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
                  {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
                  {stateOn: 'glyphicon-heart'},
                  {stateOff: 'glyphicon-off'}
                ];
              $scope.post = function () {
                var projectId = '56df73f5ef7b9c5d07f5978f';//$location.path; Will fix this once Miles has individual project view on
                $scope.comment.project = projectId;
                $scope.comment.author = $window.localStorage.getItem('userId');
                $scope.comment.$save(savedCmt => {
                  console.log('Saved Comment',savedCmt);
                });


                // console.log($location);
                // console.log($window.localStorage.getItem('userId'));
                // console.log($scope.comment);
              }
            } //end controller
        };
    });
}
