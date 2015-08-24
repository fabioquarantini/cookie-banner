//! jQuery Cookie Banner v0.1.0 - Fabio Quarantini - www.fabioquarantini.com

;( function( $, window, document, undefined ) {

	$.cookieBanner = function( settings ) {

		var defaults = {
			consentClass: 'cookie-banner__button--accept',
			consentOnNavigation: true,
			consentOnScroll: true,
			bannerClass: 'cookie-banner',
			bannerContent: '<div class="{{bannerClass}} cookie-banner--bottom">Questo sito utilizza cookie, anche di terze parti, per migliorare la tua esperienza di navigazione. Per saperne di più o modificare le tue preferenze <a class="cookie-banner__link" href="{{cookiePageUrl}}">clicca qui</a>.<br />Chiudendo questo banner, scorrendo questa pagina o cliccando qualunque suo elemento acconsenti all\'uso dei cookie. <a href="#" class="cookie-banner__button cookie-banner__button--consent {{consentClass}}">Acconsento</a></div>',
			blockCookie: true,
			blockCookieAttribute: 'data-block-cookie',
			blockCookieClass: 'block-cookie',
			cookieExpiry: 365,
			cookieName: 'consentCookie',
			cookiePageUrl: '/privacy.html',
			hideBannerOnScroll: true,
			onConsent: function() {},
			prependBannerTo: 'body',
			reloadPage: false,
		};

		$.extend( defaults, settings );

		// Create cookie
		function createCookie( name, value, days ) {

			var expire;

			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				expires = "; expires="+date.toGMTString();
			} else {
				expires = "";
			}

			document.cookie = name+"="+value+expires+"; path=/";

		}

		// Read cookie
		function readCookie( name ) {

			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;

		}

		// Erase cookie
		function eraseCookie( name ) {

			createCookie(name,"",-1);

		}

		// Hide banner
		function hideBanner() {

			$("."+defaults.bannerClass).fadeOut( 400, function() {
			    $(this).remove();
			});

		}

		// Reload page
		function reloadPage() {

			document.location.reload();

		}

		// Create cookie on consent
		function createCookieConsent() {

			if ( readCookie(defaults.cookieName) === null ) {

				// Create cookie
				createCookie(defaults.cookieName, 'true', defaults.cookieExpiry);

				// Add event on consent
				$(document).trigger('onConsent');

				// Run callback
				defaults.onConsent.call();

			}

		}

		// Check if is the privacy page
		function checkPrivacyPage() {

			if ( window.location.pathname.toLowerCase() == defaults.cookiePageUrl.toLowerCase() ) {

				return true;

			} else {

				return false;

			}

		}

		// Activate blocked elements
		function activateBlockedElements( activatorClass ) {

			$('.' + activatorClass ).each(function() {

				if ( $(this).prop("tagName") === "SCRIPT" ) {

					var attr = $(this).attr('src');

					// If the scripts has the src
					if ( attr ) {
						$.getScript( attr );
					} else { // If the script is inline

						var scriptText = $(this).html();
						eval( scriptText);

					}

					// Replace type text whith javascript
					$(this).attr( 'type', 'text/javascript' );

				} else {

					$('.' + activatorClass ).each(function() {

						var attr = $(this).attr(defaults.blockCookieAttribute);

						if ( attr ) {
							// Set src whith data value
							$(this).attr('src', attr );
						}

					});

				}

			});


		}

		// Create banner
		function createBanner(bannerContent) {

			$( defaults.prependBannerTo ).prepend( bannerContent.replace(/{{bannerClass}}/g, defaults.bannerClass).replace(/{{consentClass}}/g, defaults.consentClass).replace(/{{cookiePageUrl}}/g, defaults.cookiePageUrl) );

		}

		// If cookie does not exist and is not in the privacy page
		if ( readCookie(defaults.cookieName) === null && !checkPrivacyPage() ) {

			createBanner(defaults.bannerContent);

		}

		// If consent on navigation is true, cookie does not exist and is not in the privacy page
		if ( defaults.consentOnNavigation && readCookie(defaults.cookieName) === null && !checkPrivacyPage() ) {

			// When I click link in page
			$(document).on('click', 'a', function() {

				// If the pathname is different from privacy page
				if ( this.pathname.toLowerCase() !== defaults.cookiePageUrl.toLowerCase()) {

					// Create cookie
					createCookieConsent();

				}

			});

		}

		// When I click the consent class
		$('body').on('click', "." + defaults.consentClass, function() {

			// If cookie does not exist
			if ( readCookie(defaults.cookieName) === null ) {

				// Create cookie
				createCookieConsent();

				// If block cookie is true
				if ( defaults.blockCookie ) {

					// Activate blocked elements
					activateBlockedElements( defaults.blockCookieClass );

				}

			}

			// Hide banner
			hideBanner();

			// If reload page is true
			if ( defaults.reloadPage ) {

				// Reload page
				reloadPage();

			}

		});

		// If consent on scroll is true, cookie does not exist and is not in the privacy page
		if ( defaults.consentOnScroll && readCookie(defaults.cookieName) === null && !checkPrivacyPage() ) {

			// When scroll
			$( window ).one('scroll', function() {

				// Create cookie
				createCookieConsent();

				// If block cookie is true
				if ( defaults.blockCookie ) {

					// Activate blocked elements
					activateBlockedElements( defaults.blockCookieClass );

				}

				// If hide banner on scroll is true
				if ( defaults.hideBannerOnScroll ) {

					// Hide banner
					hideBanner();

				}

			});

		}

		// If block cookie is true and consent is true
		if ( defaults.blockCookie && readCookie(defaults.cookieName ) ) {

			// Activate blocked elements
			activateBlockedElements( defaults.blockCookieClass );

		}

		// Return consent (true or null)
		$.cookieBanner.consent = function() {
			return readCookie(defaults.cookieName);
		};

	};


})(jQuery, window, document);