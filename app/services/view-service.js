export default function(angularModule) {
angularModule.service('viewService', function(){
      this.showView = function(val){
        this.name = val;
      };
  });
}
