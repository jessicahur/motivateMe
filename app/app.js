import angular      from 'angular';
import router       from 'angular-ui-router';
import resource     from 'angular-resource';
import satellizer   from 'satellizer';
import main         from './components/index.html';
import components   from './components';

// import filters   from './filters';
import services  from './services';
//import configs   from './config';
//import toastr     from 'angular-toastr';

const app = angular.module('myApp', [router, resource, satellizer, services]);

const API_URL = 'http://localhost:3000/';
const API_ENDPOINTS = 'api/motivate/:id';

components(app);
//configs(app);


app.config(['MotivateProvider', function(MotivateProvider) {
  MotivateProvider.url(API_URL);
  MotivateProvider.endpoints(API_ENDPOINTS);
}])

/**
 * Insert top-level template main.html and bootstrap the app
 */
document.body.innerHTML = main;
angular.bootstrap(document, [app.name], {});
