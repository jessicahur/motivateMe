import resourceConfig from './resource-service';
import viewService  from './view-service';
/**
 * Bundle components in this dir. so that app can be passed to each.
 */
var services = angular.module('services', []);
resourceConfig(services);
viewService(services);
export default services.name;
