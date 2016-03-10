import commentsTemplate from './comments.html';

export default function(angularModule) {

    angularModule.directive('comments', function() {
        return {
            replace: true,
            restrict: 'E',
            template: commentsTemplate,
            scope: {
              'comments': '=',
              'authed': '='
            }
        }

    });
}
