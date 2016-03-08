import motNav from './mot-nav.html';
export default function(angularModule) {
  /**
   * Controller:
   */
    angularModule.directive('motNav', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motNav
        };
    });
}
