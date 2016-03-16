import motBanner from './banner.html';
export default function(angularModule) {
    /**
     * Controller:
     */
    angularModule.directive('banner', function() {
                return {
                    replace: true,
                    restrict: 'E',
                    template: motBanner,
                    controller: ['$scope', 'viewService', function($scope, viewService) {
                          $scope.view = viewService;
                        }]
                    }
            });
}
