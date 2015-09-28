(function() {
	// Constants
	const CLOCK_ID = "header-clock";
	const CLOCK_FORMAT = "HH:mm:ss";

	const TITLE_ID = "header-title";
	const DEFAULT_TITLE = "To be renamed";

	const ETC_ID = "header-etc";
	const DEFAULT_ETC = "";

	// Module variables
	var clock_element = undefined;


	function updateClock() {
		if (clock_element === undefined) return;

		var now = moment();
		clock_element.text(now.format(CLOCK_FORMAT));

	}


	$(document).ready(function() {
		var config = (typeof CONFIG === 'undefined') ? {} : CONFIG;

		// Clock - Start
		clock_element = $('#' + CLOCK_ID);
		if (clock_element) {
			updateClock();

			setInterval(function () {
				updateClock();
			}, 1000);
		} else {
			console.error('Unable to find element for clock');
		}
		// Clock - End

		// Title - Start
		var title_element = $('#' + TITLE_ID);
		if (title_element) {
			var title = config.title || DEFAULT_TITLE;
			title_element.text(title);
		} else {
			console.error('Unable to find element for title');
		}
		// Title - End

		// Etc - Start
		var etc_element = $('#' + ETC_ID);
		if (etc_element) {
			var etc = config.etc || DEFAULT_ETC;
			etc_element.text(etc);
		} else {
			console.error('Unable to find element for etc');
		}
		// Etc - End
	});
})();