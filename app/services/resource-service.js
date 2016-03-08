export default function(angularModule) {

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
        create('ProfileService', '/foo/bar');
    }
