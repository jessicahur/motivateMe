import motProfile from './mot-profile.html';
export default function(angularModule) {

    /**
     * Controller:
     */
    angularModule.directive('motProfile', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motProfile
        }
    });
}
