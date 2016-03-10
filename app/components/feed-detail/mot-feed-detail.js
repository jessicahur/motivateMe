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
            controller: function($scope, $auth) {
              //Hide-show comment textarea depending on auth
              if ($auth.isAuthenticated()) {
                $scope.authed = true;
              }
              else {
                $scope.authed = false;
              }

              //To return to public feed
              $scope.returnToFeed = function(){
                        $scope.singleProjectView = null;
              }

            }
        }

        })
    }
