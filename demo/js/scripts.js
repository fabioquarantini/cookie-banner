$(document).ready(function() {

	// Initialize plugin
	$.cookieBanner({
		consentOnScroll: true,
		blockCookie: true,
		cookiePageUrl: '/demo/privacy.html',
		onConsent: function() {
			console.log('On consent callback');
		},
	});

	// Triggered event
	$( document ).on( 'cookieConsent', function() {
		console.log('Triggered cookieConsent ');
	});

	// Check consent
	console.log( 'Consent is: ' + $.cookieBanner.consent() );

});