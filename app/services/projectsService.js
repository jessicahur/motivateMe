export default function( angularModule ) {

    ngModule.provider( projectsService', function (  ) {
        var url = 'http://localhost:3000';

        this.setUrl = function( setUrl ) {
            url = setUrl;
        };

        //this.successCallback= function(){console.log('success');};
        //this.errorCallback = function(){console.log('that did not work');};

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

