import motProject from './mot-project.html';
export default function(angularModule) {

  /**
   * Controller:
   */
    angularModule.directive('project', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motProject
        };
    });
}
