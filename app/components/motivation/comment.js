import commentTemplate from './comment.html';

export default function(angularModule) {

    angularModule.directive('comment', function() {
        return {
            replace: true,
            restrict: 'E',
            template: commentTemplate,
            scope: {
              'comment': '='
            },
            controller: function($scope) {
              //for rating
              console.log($scope.comment);
              $scope.rate = $scope.comment.vote;
              $scope.max = 5;
              $scope.isReadonly = false;

              $scope.hoveringOver = function(value) {
                $scope.overStar = value;
                $scope.percent = 100 * (value / $scope.max);
              };

              $scope.postVote = function() {
                console.log($scope.rate, $scope.comment.vote);
              }
              $scope.ratingStates = [
                {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
                {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
                {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
                {stateOn: 'glyphicon-heart'},
                {stateOff: 'glyphicon-off'}
              ];
            }
        }

    });
}
