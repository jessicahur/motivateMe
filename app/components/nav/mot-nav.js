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
                    controller: ['$scope', 'viewService', function($scope, viewService) {
                          $scope.view = viewService;
                          $scope.do = function(x) {
                            console.log(x);
                          };
                        }]
                    }
            });
}
