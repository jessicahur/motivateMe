import angular      from 'angular';
import router       from 'angular-ui-router';
import resource     from 'angular-resource';
import satellizer   from 'satellizer';
import main         from './components/index.html';
import components   from './components';
import AppCtrl      from './js/AppCtrl';
import ngDialog     from 'ng-dialog';
import toastr       from 'angular-toastr';
import authConfig   from './js/auth-config';
import routeConfig  from './js/route-config';
import toastrConfig from './js/toastr-config';
import services     from './services';
import uib          from 'angular-ui-bootstrap';
import animate      from 'angular-animate';

/**
 * CSS imports:
 */

import './node_modules/angular-toastr/dist/angular-toastr.css';

import './scss/main.scss';

/**
 * App Setup:
 */

const app = angular.module('myApp', [router, resource, satellizer, services, ngDialog, toastr, uib, animate]);

app.constant( 'baseUrl', BASE_URL)
   .controller('AppController', AppCtrl)

components(app);
routeConfig(app);
authConfig(app);
toastrConfig(app);

//app.constant( 'baseUrl', process.env.BASE_URL);

// document.body.innerHTML = main;
// angular.bootstrap(document, [app.name], {});
