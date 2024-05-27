/*
* rollover
* By: HanSeungho landboy@gmail.com
* Version: 1.1.9
* Updated: 2013-01-12
*/

(function($) {
	$.fn.rollover = function() {
		var preloader = new Array();

		return this.each(function() {
			$(this).find('img').each(function() {
				var obj = $(this),
					src = obj.attr('src'),
					hover = obj.attr('hover');

				if (hover) {
					var idx = preloader.length;
					preloader[idx] = new Image();
					preloader[idx].src = hover;

					obj.hover(
						function() { obj.attr('src', hover); },
						function() {
							if (!$(this).attr('hstop')) obj.attr('src', src);
						}
					);
				}
			});
		});
	};
})(jQuery);
