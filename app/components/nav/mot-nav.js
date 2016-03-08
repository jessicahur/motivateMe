import motNav from './mot-nav.html';
import styles from './mot-nav.scss';

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
