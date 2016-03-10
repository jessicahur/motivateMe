import progressTemplate from './progress.html';

export default function(angularModule) {

    angularModule.directive('progress', function() {
        return {
            replace: true,
            restrict: 'E',
            template: progressTemplate,
            scope: {
              'authed': '=',
              'progress': '='
            },
            controller: function($scope) {
                console.log('from progress Dir',$scope.progress);
            }
        }

    });
}
