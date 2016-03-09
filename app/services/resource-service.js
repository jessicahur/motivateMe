export default function(angularModule) {

        function create(name, url) {
            angularModule.factory(name, ['$resource', 'baseUrl',
                function($resource, baseUrl) {
                    return $resource(`${baseUrl}${url}/:id`, {
                        id: '@_id'
                    }, {
                        update: {
                            method: 'PATCH',
                        }
                    });
                }
            ]);
        }
        create('UserService', '/api/v1/users');
        create('ProfileService', '/api/v1/users');
        create('FeedService', '/projects');
        create('CommentService', '/ap1/v1/comments');
    };
