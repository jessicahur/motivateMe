import motNav from './mot-nav.html';
export default function(angularModule) {
    /**
     * Controller:
     */
    angularModule.directive('motNav', function() {
                return {
                    replace: true,
                    restrict: 'E',
                    template: motNav,
                    controller: ['$scope', '$location', '$auth', 'toastr', function($scope, $location, $auth, toastr) {
                      //TODO create a number checking view controller

                            $scope.user = {
                                active: true
                            };
                            $scope.active = function(x) {
                                $scope.user = {
                                    active: x
                                };
                            };
                        }]
                    }
            });
}
