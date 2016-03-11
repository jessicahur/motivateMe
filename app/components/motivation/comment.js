import commentTemplate from './comment.html';

export default function(angularModule) {

    angularModule.directive('comment', function() {
        return {
            replace: true,
            restrict: 'E',
            template: commentTemplate,
            scope: {
              'comment': '=',
              'authed': '='
            },
            controller: function($scope, $window, VoteService) {
              var userId = $window.localStorage.getItem('userId');
              var votes = new VoteService();
              votes._id = $scope.comment.votes._id;
              votes.ups = $scope.comment.votes.ups;
              votes.downs = $scope.comment.votes.downs;
              $scope.ups = votes.ups.length;
              $scope.downs = votes.downs.length;

              function updateVote(str) {
                if (str === 'ups') {
                  var notStr = 'downs';
                } else {
                  var notStr = 'ups';
                }
                //If user has not voted up or down
                if (votes[str].indexOf(userId) === -1 && votes[notStr].indexOf(userId) === -1) {
                  console.log('not in ups and downs', userId, votes[str]);
                  votes[str].push(userId);
                  votes.$update(res => {
                    $scope[str] = res[str].length;
                  });
                  }
                  //If user has voted in this category before
                else if (votes[str].indexOf(userId) !== -1 ){
                  console.log('not in the other but in here', userId, votes[str]);
                  votes[str].splice(votes[str].indexOf(userId), 1);
                    votes.$update(res => {
                      $scope[str] = res[str].length;
                    });
                }
                //If user has not voted in this category before but voted in the other category
                else {
                  console.log('other case');
                  votes[notStr].splice(votes[str].indexOf(userId), 1);
                  votes[str].push(userId);
                  votes.$update(res => {
                    $scope[notStr] = res[notStr].length;
                    $scope[str] = res[str].length;
                  });
                }
              }//end updateVote

              $scope.vote = function(str) {
                if (str === 'up') {
                  updateVote('ups')
                }
                else {
                  updateVote('downs');
                }
              }
            }//end controller
        }//end return
    });
}
