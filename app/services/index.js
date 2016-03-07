import resourceConfig from './resource-service';
/**
 * Bundle components in this dir. so that app can be passed to each.
 */
var services = angular.module('services', []);
resourceConfig(services);
export default services.name;
