import angular      from 'angular';
import router       from 'angular-ui-router';
import resource     from 'angular-resource';
import satellizer   from 'satellizer';
import main         from './components/index.html';
import components   from './components';
import ngDialog     from 'ng-dialog';
import toastr       from 'angular-toastr';
import authConfig   from './js/auth-config';
import routeConfig  from './js/route-config';
import services     from './services';

/**
 * CSS imports:
 */

import './node_modules/angular-toastr/dist/angular-toastr.css';

import './scss/main.scss';


/**
 * App Setup:
 */
const app = angular.module('myApp', [router, resource, satellizer, services, ngDialog, toastr]);

const API_URL = 'http://localhost:3000/';
const API_ENDPOINTS = 'api/v1/';

components(app);
authConfig(app);
routeConfig(app);



app.config(['resourceProvider', function(resourceProvider) {
  resourceProvider.url(API_URL);
  resourceProvider.endpoints(API_ENDPOINTS);
}])

document.body.innerHTML = main;
angular.bootstrap(document, [app.name], {});
