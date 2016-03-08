export default function(angularModule) {

<<<<<<< HEAD
    angularModule.provider('resourceService', function() {
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
=======
        function create(name, url) {
            angularModule.factory(name, ['$resource', 'baseUrl',
                function($resource, baseUrl) {
                    return $resource(`${baseUrl}${url}`, {
                        id: '@_id'
                    }, {
                        update: {
                            method: 'PATCH',
                        },
                        delete: {
                            method: 'DELETE',
                        },
                    });
                }
            ]);
        }
        create('ProfileService', '/api/v1/user');
    }
>>>>>>> master
