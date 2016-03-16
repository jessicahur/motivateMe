import commentsTemplate from './comments.html';

export default function(angularModule) {

    angularModule.directive('comments', function() {
        return {
            replace: true,
            restrict: 'E',
            template: commentsTemplate
        }
//All comments are loaded in mot-feed since it's where we know what project the user selected
    });
}
