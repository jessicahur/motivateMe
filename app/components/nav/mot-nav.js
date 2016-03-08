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
            template: motNav
        };
    });
}
