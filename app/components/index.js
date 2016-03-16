import motNavDr from './nav/mot-nav';
import motBannerDr from './nav/banner';
import feedDr from './feed/mot-feed';
import feedDetailDr from './feed-detail/mot-feed-detail.js';
import loginDr from './user/mot-login';
import logoutDr from './user/mot-logout';
import signupDr from './user/mot-signup';
import userDr from './user/user';
import createProjectDr from './project/mot-create-project';
import projectDr from './project/mot-project';
import projectDetDr from './project/project-detail';

import motivationDr from './motivation/comment-post';
import motivationCommentsDr from './motivation/comments';
import motivationComment from './motivation/comment';

import motProfileDr from './profile/mot-profile';

/**
 * Bundle components in this dir. so that app can be passed to each.
 */
export default function(angularModule) {
	//Nav Directives
	motNavDr(angularModule);
	motBannerDr(angularModule);
	loginDr(angularModule);
	logoutDr(angularModule);
	signupDr(angularModule);
	userDr(angularModule);
	//Public Feed Directives
	feedDr(angularModule);
	feedDetailDr( angularModule );
	createProjectDr(angularModule);
	projectDr(angularModule);
	projectDetDr(angularModule);
	//Comment Directives
	motivationDr(angularModule);
	motivationComment(angularModule);
	motivationCommentsDr(angularModule);
	motProfileDr(angularModule);
}
