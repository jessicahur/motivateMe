import motFeedDr from './feed/mot-feed';
import loginDr from './user/mot-login';
import signupDr from './user/mot-signup';
/**
 * Bundle components in this dir. so that app can be passed to each.
 */
export default function(angularModule) {
	loginDr(angularModule);
	signupDr(angularModule);
	motFeedDr(angularModule);
}
