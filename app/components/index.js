import motFeedDr from './feed/mot-feed';
import userDr from './user/mot-login';
/**
 * Bundle components in this dir. so that app can be passed to each.
 */
export default function(angularModule) {
	userDr(angularModule);
	motFeedDr(angularModule);
}
