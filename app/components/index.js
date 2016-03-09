import motNavDr from './nav/mot-nav';
import feedDr from './feed/mot-feed';
import loginDr from './user/mot-login';
import logoutDr from './user/mot-logout';
import signupDr from './user/mot-signup';
import createProjectDr from './project/mot-create-project';
import projectDr from './project/mot-project';
import projectDetDr from './project/project-detail';

import motivationDr from './motivation/mot-comments';

import motProfileDr from './profile/mot-profile';

/**
 * Bundle components in this dir. so that app can be passed to each.
 */
export default function(angularModule) {
	motNavDr(angularModule);
	loginDr(angularModule);
	logoutDr(angularModule);
	signupDr(angularModule);
	feedDr(angularModule);
	createProjectDr(angularModule);
	projectDr(angularModule);
	projectDetDr(angularModule);
	motivationDr(angularModule);
	motProfileDr(angularModule);
}
