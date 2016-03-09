import motLogout from './mot-logout.html';
export default function(angularModule) {
    angularModule.directive('logout', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motLogout,
            controller: ['$scope', '$location', '$auth', 'toastr', function($scope, $location, $auth, toastr) {
                $scope.logout = function() {
                  console.log('ran');
                    $auth.logout()
                        .then(function() {
                            toastr.info('You are logged out!');
                            $location.path('/');
                        })
                        .catch(function(error) {
                            if (error.error) {
                                toastr.error(error.error);
                            }
                        });
                };
            }]
        };
    });
}
