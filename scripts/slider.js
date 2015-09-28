// TODO: Implement slider logic

(function() {
	const SLIDER_ID = 'slider';
	const DEFAULT_IMAGE = 'images/default-slide.png';

	function previousSlide() {
		console.log('PREV');
	}

	function nextSlide() {
		console.log('NEXT');
	}

	$(document).ready(function() {
		var config = (typeof CONFIG === 'undefined') ? {} : CONFIG;

		var slider = $('#' + SLIDER_ID);
		if (!slider) {
			console.error('Unable to find element for slider');
			return;
		}

		var slides = config.slides || [];

		if (slides.length < 1) {
			slider.html('<img src="' + DEFAULT_IMAGE + '">');
			return;
		}

		// KeyHandler - Start
		var throttled_handler = _.throttle(function(ev) {
			switch (ev.keyCode) {
				case 37: // Left arrow
					previousSlide();
					break;
				case 39: // Right arrow
					nextSlide();
					break;
			}
		}, 500);

		$(document).keydown(throttle_handler);
		$(document).keyup(function (ev) {
			switch (ev.keyCode) {
				case 37:
				case 39:
					throttled_handler.cancel();
					break;
			}
		});
		// KeyHandler - End
	});

})();