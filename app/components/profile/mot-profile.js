import motProfile from './mot-profile.html';
export default function(angularModule) {

    /**
     * Controller:
     */
    angularModule.directive('motNav', function() {
        return {
            replace: true,
            restrict: 'E',
            template: motProfile
        }
    });
}
