import angular      from 'angular';
import router       from 'angular-ui-router';
import resource     from 'angular-resource';
import satellizer   from 'satellizer';
import main         from './components/index.html';
import components   from './components';
import ngDialog     from 'ng-dialog';
// import filters   from './filters';
import authConfig  from './js/auth-config';
//import configs   from './config';
import services   from './services';

const app = angular.module('myApp', [router, resource, satellizer, services, ngDialog]);

const API_URL = 'http://localhost:3000/';
const API_ENDPOINTS = 'api/motivate/:id';

components(app);
authConfig(app);


app.config(['MotivateProvider', function(MotivateProvider) {
  MotivateProvider.url(API_URL);
  MotivateProvider.endpoints(API_ENDPOINTS);
}])

/**
 * Insert top-level template main.html and bootstrap the app
 */
document.body.innerHTML = main;
angular.bootstrap(document, [app.name], {});
