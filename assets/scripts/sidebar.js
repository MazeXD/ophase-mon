(function() {
	// Constants
	const TWITTER_HASHTAG_ID = "twitter-hashtag";

	// Module variables
	var hashtag_element = undefined;


	$(document).ready(function() {
		var config = (typeof CONFIG === 'undefined') ? {} : CONFIG;

		// Twitter hashtag - Start
		hashtag_element = $('#' + TWITTER_HASHTAG_ID);
		if (hashtag_element) {
			hashtag_element.text(config.twitter_hashtag || '');
		} else {
			console.error('Unable to find element for twitter hashtag');
		}
		// Twitter hashtag - End
	});
})();