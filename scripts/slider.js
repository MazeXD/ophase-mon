(function() {
	const SLIDER_ID = 'slider';
	const DEFAULT_IMAGE = 'images/default-slide.png';

	var slider_element = undefined;

	var active_slide = -1;
	var slides = [];

	function addSlide(content, type) {
		if (slider_element === undefined) return;

		var slide = buildSlide(content, type);

		if (!slide) {
			return;
		}

		if (active_slide === -1) {
			active_slide = 0;
			slide.show();
		}

		slides.push(slide);

		slide.appendTo(slider_element);
	}

	function buildSlide(data, type) {
		if (!type) {
			type = 'image';
		}

		var slide = $('<div/>', {
		    class: 'slide'
		});
		slide.hide();

		var content = undefined;

		switch (type.toLowerCase()) {
			case 'html':
				content = $(data);
				break;
			case 'image':
				content = $('<img/>', {
					src: data
				});
				break;
			default:
				console.error(type + ' is not a valid slide type');
				return null;
		}

		content.appendTo(slide);

		return slide;
	}

	function previousSlide() {
		if (active_slide === -1 && slides.length < 2) return;

		var new_active = active_slide - 1;
		if (new_active < 0) {
			new_active = slides.length - 1;
		}

		changeToSlide(new_active);
	}

	function nextSlide() {
		if (active_slide === -1 && slides.length < 2) return;

		var new_active = active_slide + 1;
		if (new_active >= slides.length) {
			new_active = 0;
		}

		changeToSlide(new_active);
	}

	function changeToSlide(new_active) {
		if (new_active < 0 || new_active >= slides.length) return;

		slides[active_slide].fadeOut(400);
		slides[new_active].fadeIn(400);
		active_slide = new_active;
	}

	$(document).ready(function() {
		var config = (typeof CONFIG === 'undefined') ? {} : CONFIG;

		slider_element = $('#' + SLIDER_ID);
		if (!slider_element) {
			console.error('Unable to find element for slider');
			return;
		}

		var slides = config.slides || [];

		if (slides.length < 1) {
			addSlide(DEFAULT_IMAGE, 'image');
			return;
		}

		for (var i = 0; i < slides.length; ++i) {
			addSlide(slides[i].data, slides[i].type);
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

		$(document).keydown(throttled_handler);
		// KeyHandler - End
	});

})();