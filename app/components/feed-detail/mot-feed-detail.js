import motFeedDetail from './mot-feed-detail.html';

export default function(angularModule) {

    angularModule.directive('feedDetail', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motFeedDetail,
            scope: {
              'singleProjectView': '=',
              'comments': '='
            },
            controller: ['$scope', '$auth', 'ProgressService', function($scope, $auth, ProgressService) {

              if ($auth.isAuthenticated()) {
                $scope.authed = true;
              }
              else {
                $scope.authed = false;
              };
              $scope.progress = ProgressService.query();
              //To return to public feed
              $scope.returnToFeed = function(){
                        $scope.singleProjectView = null;
              }




            }]
        }

        })
    }
