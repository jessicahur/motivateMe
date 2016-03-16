import commentTemplate from './comment.html';

export default function(angularModule) {

    angularModule.directive('comment', function() {
        return {
            replace: true,
            restrict: 'E',
            template: commentTemplate,
            controller: function($scope, $window, VoteService) {
              var userId = $window.localStorage.getItem('userId');
              var votes = new VoteService();
              votes._id = $scope.comment.votes._id;
              votes.ups = $scope.comment.votes.ups;
              votes.downs = $scope.comment.votes.downs;
              $scope.ups = votes.ups.length;
              $scope.downs = votes.downs.length;
              $scope.progOn = $scope.comment.progress;
              function updateVote(str) {
                if (str === 'ups') {
                  var notStr = 'downs';
                } else {
                  var notStr = 'ups';
                }
                //If user has not voted up or down
                if (votes[str].indexOf(userId) === -1 && votes[notStr].indexOf(userId) === -1) {
                  votes[str].push(userId);
                  votes.$update(res => {
                    $scope[str] = res[str].length;
                  });
                  }
                  //If user has voted in this category before
                else if (votes[str].indexOf(userId) !== -1 ){
                  votes[str].splice(votes[str].indexOf(userId), 1);
                    votes.$update(res => {
                      $scope[str] = res[str].length;
                    });
                }
                //If user has not voted in this category before but voted in the other category
                else {
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
