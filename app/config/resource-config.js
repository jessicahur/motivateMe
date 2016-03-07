export default function(angularModule) {

    angularModule.provider('Motivate', function() {
        var url = '';
        var endpoints = '';
        this.url = function(inputUrl) {
            url = inputUrl;
        };
        this.endpoints = function(inputEndPoints) {
            endpoints = inputEndPoints;
        };
        this.$get = function($resource) {
            return $resource(url + endpoints, {
                id: '@_id'
            }, {
                update: {
                    method: 'PATCH',
                },
                delete: {
                    method: 'DELETE',
                },
            });
        };
    });
}
