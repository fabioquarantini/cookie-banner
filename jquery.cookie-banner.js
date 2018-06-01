//! jQuery Cookie Banner v1.0.0 - Fabio Quarantini - www.fabioquarantini.com

(function($, window, document, undefined) {

	$.cookieBanner = function(settings) {

		var defaults = {
			bannerClass: 'cookie-banner',
			bannerLinkText: {
				it: 'Approfondisci',
				en: 'Learn more',
				de: 'Mehr dazu',
				es: 'Descubre más',
				ru: 'Узнайте больше'
			},
			bannerText: {
				it: 'Questo sito utilizza cookie, anche di terze parti, per migliorare la tua esperienza di navigazione. Chiudendo questo banner, scorrendo questa pagina o cliccando qualunque suo elemento acconsenti all\'uso dei cookie.',
				en: 'This website uses cookies (also third-party cookies) to provide you a better navigation experience. By closing this banner, scrolling this page or by clicking any of its elements, you agree to the use of cookies.',
				de: 'Diese Website verwendet Cookies, auch von Dritten, um Ihre Browser-Erfahrung zu verbessern. Durch das Schließen dieses Banners, das Scrollen durch diese Seite oder einen Klick auf deren Elemente, erklären Sie sich mit der Verwendung der Cookies einverstanden.',
				es: 'Este sitio web utiliza cookies propias y de terceros para mejorar tu experiencia de navegación. Cerrando este banner, recorriendo esta página o haciendo clic en cualquier elemento, autorizas el uso de cookies.',
				ru: 'Этот Сайт использует собственные и сторонние cookie-файлы для того, чтобы предоставить Вам больше возможностей при использовании сайта. Продолжая посещение веб-сайта, вы соглашаетесь на использование cookie-файлов.'
			},
			blockCookie: true,
			blockCookieAttribute: 'data-src',
			blockCookieClass: 'block-cookie',
			consentButtonClass: 'cookie-banner__button',
			consentButtonText: {
				it: 'Chiudi',
				en: 'Close',
				de: 'Schließen',
				es: 'Cerrar',
				ru: 'Закрыть'
			},
			consentButtonTextClass: 'cookie-banner__close',
			consentOnNavigation: true,
			consentOnScroll: true,
			cookieExpiry: 365,
			cookieName: 'consentCookie',
			cookiePageUrl: {
				it: '',
				en: '',
				de: '',
				es: '',
				ru: ''
			},
			culture: 'en',
			hideBannerOnScroll: true,
			onConsent: function() {},
			prependBannerTo: 'body',
			reloadPage: false
		};

		$.extend(true, defaults, settings);

		function createCookie(name, value, days) {

			var expires;

			if (days) {

				var date = new Date();
				date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
				expires = '; expires=' + date.toGMTString();

			} else {

				expires = '';

			}

			document.cookie = name + '=' + value + expires + '; path=/';

		}

		function readCookie(name) {

			var nameEQ = name + '=';
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {

				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);

			}
			return null;

		}

		function eraseCookie(name) {

			createCookie(name, '', -1);

		}

		function hideBanner() {

			$('.' + defaults.bannerClass).fadeOut(400, function() {

				$(this).remove();

			});

		}

		function reloadPage() {

			document.location.reload();

		}

		function createCookieOnConsent() {

			if (readCookie(defaults.cookieName) === null) {

				createCookie(defaults.cookieName, 'true', defaults.cookieExpiry);

				$(document).trigger('onConsent');

				// Run callback
				defaults.onConsent.call();

			}

		}

		function isPrivacyPage() {

			if (
				window.location.pathname
					.toLowerCase()
					.split('/')
					.pop() == defaults.cookiePageUrl[defaults.culture].toLowerCase()
			) {

				return true;

			} else {

				return false;

			}

		}

		function runBlockedElements(activatorClass) {

			$('.' + activatorClass).each(function() {

				if ($(this).prop('tagName') === 'SCRIPT') {

					var attr = $(this).attr('src');

					// Scripts with src
					if (attr) {

						$.getScript(attr);

					} else {

						// Script inline
						var scriptText = $(this).html();
						eval(scriptText);

					}

					// Replace type text whith text/javascript
					$(this).attr('type', 'text/javascript');

				} else {

					$('.' + activatorClass).each(function() {

						var attr = $(this).attr(defaults.blockCookieAttribute);

						if (attr) {

							// Set src whith data value
							$(this).attr('src', attr);

						}

					});

				}

			});

		}

		if (readCookie(defaults.cookieName) === null && !isPrivacyPage()) {

			$(defaults.prependBannerTo).prepend(
				'<div class="' +
					defaults.bannerClass +
					'">' +
					defaults.bannerText[defaults.culture] +
					' <a class="cookie-banner__link" href="' +
					defaults.cookiePageUrl[defaults.culture] +
					'">' +
					defaults.bannerLinkText[defaults.culture] +
					'</a>' +
					'<a class="' +
					defaults.consentButtonClass +
					'"><span class="' +
					defaults.consentButtonTextClass +
					'">' +
					defaults.consentButtonText[defaults.culture] +
					'</span></a></div>'
			);

		}

		if (defaults.consentOnNavigation && readCookie(defaults.cookieName) === null && !isPrivacyPage()) {

			$(document).on('click', 'a', function() {

				// If pathname is different from privacy page
				if (
					this.pathname
						.toLowerCase()
						.split('/')
						.pop() !== defaults.cookiePageUrl[defaults.culture].toLowerCase()
				) {

					createCookieOnConsent();

				}

			});

		}

		$('body').on('click', '.' + defaults.consentButtonClass, function(e) {

			e.preventDefault();

			if (readCookie(defaults.cookieName) === null) {

				createCookieOnConsent();

				if (defaults.blockCookie) {

					runBlockedElements(defaults.blockCookieClass);

				}

			}

			hideBanner();

			if (defaults.reloadPage) {

				reloadPage();

			}

		});

		if (defaults.consentOnScroll && readCookie(defaults.cookieName) === null && !isPrivacyPage()) {

			$(window).one('scroll', function() {

				createCookieOnConsent();

				if (defaults.blockCookie) {

					runBlockedElements(defaults.blockCookieClass);

				}

				if (defaults.hideBannerOnScroll) {

					hideBanner();

				}

			});

		}

		if (defaults.blockCookie && readCookie(defaults.cookieName)) {

			runBlockedElements(defaults.blockCookieClass);

		}

		// Return consent (true or null)
		$.cookieBanner.consent = function() {

			return readCookie(defaults.cookieName);

		};

	};

})(jQuery, window, document);
