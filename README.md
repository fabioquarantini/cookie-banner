# Cookie Banner
A customizable jQuery plugin to add a banner and block scripts, compliant with EU Cookie law.

## Including files


```html

<!-- Cookie Banner core CSS file -->
<link rel="stylesheet" href="cookie-banner.css">

<!-- jQuery -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

<!-- Cookie Banner core JS file -->
<script src="jquery.cookie-banner.min.js"></script>

```

## Initializing

```javascript

$(document).ready(function() {
	$.cookieBanner({
		culture: 'it',
		cookiePageUrl: {
			it: '/privacy/',
			en: '/en/privacy/',
			...
		}
	});
});

```


## Properties

#### bannerClass:
*String*: Banner class

*Default*: `cookie-banner`

#### bannerLinkText:
*Object*: Policy page link text

*Default*: `{
	it: 'Approfondisci',
	en: 'Learn more',
	de: 'Mehr dazu',
	es: 'Descubre más',
	ru: 'Узнайте больше'
},`

#### bannerText:
*Object*: Banner text

*Default*: `{
	it: 'Questo sito utilizza cookie, anche di terze parti, per migliorare la tua esperienza di navigazione. Chiudendo questo banner, scorrendo questa pagina o cliccando qualunque suo elemento acconsenti all\'uso dei cookie.',
	en: 'This website uses cookies (also third-party cookies) to provide you a better navigation experience. By closing this banner, scrolling this page or by clicking any of its elements, you agree to the use of cookies.',
	de: 'Diese Website verwendet Cookies, auch von Dritten, um Ihre Browser-Erfahrung zu verbessern. Durch das Schließen dieses Banners, das Scrollen durch diese Seite oder einen Klick auf deren Elemente, erklären Sie sich mit der Verwendung der Cookies einverstanden.',
	es: 'Este sitio web utiliza cookies propias y de terceros para mejorar tu experiencia de navegación. Cerrando este banner, recorriendo esta página o haciendo clic en cualquier elemento, autorizas el uso de cookies.',
	ru: 'Этот Сайт использует собственные и сторонние cookie-файлы для того, чтобы предоставить Вам больше возможностей при использовании сайта. Продолжая посещение веб-сайта, вы соглашаетесь на использование cookie-файлов.'
},`

#### blockCookie:
*Boolean*: Run blocked elements on consent (iframe, js, img ... )

*Default*: `true`

#### blockCookieAttribute:
*String*: Attribute name for the original src (iframe, img ...)

*Default*: `data-src`

#### blockCookieClass:
*String*: Class to identify locked items (iframe, js, img ...)

*Default*: `block-cookie`

#### consentButtonClass:
*String*: Class for explicit consent button (Close X)

*Default*: `cookie-banner__button`

#### consentButtonText:
*String*: Consent button Text

*Object*: `{
	it: 'Chiudi',
	en: 'Close',
	de: 'Schließen',
	es: 'Cerrar',
	ru: 'Закрыть'
},`

#### consentButtonTextClass:
*String*: Class for explicit consent text

*Default*: `cookie-banner__close`

#### consentOnNavigation:
*Boolean*: Implicit consent on site navigation

*Default*: `true`

#### consentOnScroll:
*Boolean*: Implicit consent on page scroll

*Default*: `true`

#### cookieExpiry:
*integer*: Cookie expiry in days

*Default*: `365`

#### cookieName:
*String*: Cookie name

*Default*: `consentCookie`

#### cookiePageUrl:
*String*: Privacy page url

*Object*: `{
	it: '',
	en: '',
	de: '',
	es: '',
	ru: ''
}`

#### culture:
*String*: Specify in which language display the message

*Default*: `en`

#### hideBannerOnScroll:
*boolean*: Hide banner on page scroll. ( consentOnScroll option must be true )

*Default*: `true`

#### onConsent:
*Function*: Callback when cookie are accepted

*Default*: `function() {}`

#### prependBannerTo:
*String*:  Inserts banner at the beginning of this selector/class.

*Default*: `body`

#### reloadPage:
*Boolean*:  Reload page when button ("consentClass") is accepted

*Default*: `false`


## Event Hooks

This event is triggered when cookie are accepted

`cookieConsent`

Example:

```javascript
$( document ).on( "cookieConsent", function() {
	console.log('Cookie accepted');
});
```

## Public Methods

This method return true if cookie are accepted

```javascript
$.cookieBanner.consent();
```

### Condition

```javascript
if ( $.cookieBanner.consent() ) {
	// Your scripts ( Run only if consent is true)
}
```

## Block element execution until cookie are accepted:


### Block src scripts

Original

```javascript
<script type="text/javascript" src="scripts.js"></script>
```

Blocked

```html
<script type="text/plain" src="scripts.js" class="block-cookie"></script>
```

### Block inline scripts

Original

```html
<script type="text/javascript">
	// Your scripts
</script>
```

Blocked

```html
<script type="text/plain" class="block-cookie">
	// Your scripts ( Run only if consent is true)
</script>
```

### Block src element ( iframe, img, ecc.. )

Original

```html
<iframe src="https://www.youtube.com/embed/kxopViU98Xo"></iframe>
```

Modified

```html
<iframe data-src="https://www.youtube.com/embed/kxopViU98Xo" class="block-cookie"></iframe>
```


## Credits

Copyright (c) [Fabio Quarantini](http://www.fabioquarantini.com)

## License

[MIT License](http://opensource.org/licenses/MIT)
