import motNavDr from './nav/mot-nav';
import feedDr from './feed/mot-feed';
import loginDr from './user/mot-login';
import signupDr from './user/mot-signup';
import createProjectDr from './project/mot-create-project';
import projectDr from './project/mot-project';
import motivationDr from './motivation/mot-comments';
/**
 * Bundle components in this dir. so that app can be passed to each.
 */
export default function(angularModule) {
	motNavDr(angularModule);
	loginDr(angularModule);
	signupDr(angularModule);
	feedDr(angularModule);
	createProjectDr(angularModule);
	projectDr(angularModule);
	motivationDr(angularModule);
}
