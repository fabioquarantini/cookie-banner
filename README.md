# Cookie Banner

A jQuery plugin for adding cookie law banner and cookie blocking.

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
		cookiePageUrl: 'your-privacy-url.html'
	});
});

```


## Properties


#### consentClass:
*String*: Class for explicit consent

*Default*: `cookie-banner__button`

#### consentOnNavigation:
*boolean*: Implicit consent on site navigation

*Default*: `true`

#### consentOnScroll:
*boolean*: Implicit consent on page scroll

*Default*: `true`

#### bannerClass:
*String*: Banner class

*Default*: `cookie-banner`

#### bannerContent:
*String*: Banner message ( Mandatory variables: {{bannerClass}}, {{cookiePageUrl}}, {{consentClass}} )

*Default*: `<div class="{{bannerClass}}">Questo sito utilizza cookie, anche di terze parti, per migliorare la tua esperienza di navigazione. Per saperne di più o modificare le tue preferenze <a class="cookie-banner__link" href="{{cookiePageUrl}}">clicca qui</a>.<br />Chiudendo questo banner, scorrendo questa pagina o cliccando qualunque suo elemento acconsenti all\'uso dei cookie. <a href="#" class="{{consentClass}} cookie-banner__button--consent">Acconsento</a></div>`

#### blockCookie:
*Bolean*: Block elements execution (iframe, js, img ... )

*Default*: `true`

#### blockCookieAttribute:
*String*: Attribute name for insert src when is blocked (iframe, img ...)

*Default*: `cookie-banner`

#### blockCookieClass:
*String*: Class name for blocking external cookie (iframe, js, img ...)

*Default*: `block-cookie`

#### cookieExpiry:
*integer*: Cookie Expiry

*Default*: `365`

#### cookieName:
*String*: Cookie name

*Default*: `consentCookie`

#### cookiePageUrl:
*String*: Privacy url

*Default*: `/privacy.html`

#### hideBannerOnScroll:
*boolean*: Hide banner on page scroll. ( consentOnScroll option must be true )

*Default*: `true`

#### onConsent:
*Function*: Callback function when cookie are accepted

*Default*: `function() {}`

#### prependBannerTo:
*String*:  Selettore dove inserire il banner

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


## Block element execution until cookie are accepted:


### Condition

```javascript
if ( $.cookieBanner.consent() ) {
	// Your scripts ( Run only if consent is true)
}
```

### Src scripts

Original

```javascript
<script type="text/javascript" src="scripts.js"></script>
```

Modified

```html
<script type="text/plain" src="scripts.js" class="block-cookie"></script>
```

### Inline scripts

Original

```html
<script type="text/javascript">
	alert("Mesage");
</script>
```

Modified

```html
<script type="text/plain" class="block-cookie">
	alert("Mesage");
</script>
```

### Src element ( iframe, img, ecc.. )

Original

```html
<iframe src="https://www.youtube.com/embed/kxopViU98Xo"></iframe>
```

Modified

```html
<iframe data-block-cookie="https://www.youtube.com/embed/kxopViU98Xo" class="block-cookie"></iframe>
```


## Credits

Copyright (c) 2015 [Fabio Quarantini](http://www.fabioquarantini.com)

## License

[MIT License](http://opensource.org/licenses/MIT)