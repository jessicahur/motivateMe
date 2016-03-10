import motFeedDetail from './comments.html';

export default function(angularModule) {

    angularModule.directive('comments', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motFeedDetail,
            scope: {
              'comments': '='
            }
        }

    });
}
