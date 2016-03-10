export default function( angularModule ) {

    ngModule.provider( projectsService, function (  ) {
            //var url = 'http://localhost:3000';
            var url = BASE_URL;

        this.setUrl = function( setUrl ) {
            url = setUrl;
        };

        this.$get = function ( $http ) {

            console.log('url is: ', url);

            return {

                get(){
                    return $http.get( url + '/api/projects' )
                            .then( res => {
                            return res.data;
                });
                },

                addNew(newMagazine){
                    return $http.post( url + '/api/projects', newMagazine);
                },

                delete(id){
                    console.log ('delete request for id : ', id);
                    return $http.delete( url + '/api/projects:'+ id );
                }
            };
        };
    });
}
