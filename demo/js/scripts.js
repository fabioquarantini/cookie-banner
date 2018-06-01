$(document).ready(function() {

	var culture;

	switch ($('html').attr('lang')) {

		case 'it-IT':
			culture = 'it';
			break;
		default:
			culture = 'en';

	}

	$.cookieBanner({
		culture: culture,
		cookiePageUrl: {
			it: 'privacy.html',
			en: 'privacy.html'
		}
	});

});
