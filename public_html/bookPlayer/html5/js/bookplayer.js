
//@ sourceURL=http://localhost/photobook/public_html/bookPlayer/html5/js/bookPlayer.js
//'use strict';

//$(document).ready(function () {
	///////////////////////////////////////////////////////////////////////////

	// 将主绘图区域(900x650)进行缩放以适应窗口大小, 并移到窗口中间。
	var pageScale = 1;
	var div_w = 900, div_h = 650;
	function updatePageScale() {
		var scale_w = window.innerWidth / div_w;
		var scale_h = window.innerHeight / div_h;
		pageScale = Math.min(scale_w, scale_h) * 0.95;
		return pageScale;
	};

	updatePageScale();

	var maindiv_el = document.getElementById('content-wrapper');
	var contentArea = document.getElementById('content_area');
	function resizeMainDiv() {
		if (maindiv_el === null) {
			maindiv_el = document.getElementById('content-wrapper');
		}
		if (contentArea === null) {
			contentArea = document.getElementById('content_area');
		}
		if (noFrame) {
			maindiv_el.style.visibility = 'visible';
			return;
		}
		var move_x = 0;
		var move_y = 0;
		updatePageScale();
		document.body.style.webkitTransform = 'scale(' + pageScale + ')';
		document.body.style.msTransform = 'scale(' + pageScale + ')';
		document.body.style.transform = 'scale(' + pageScale + ')';
		move_x = ( window.innerWidth - div_w * pageScale) / 2;
		move_y = ( window.innerHeight - div_h * pageScale) / 2;
		move_x = move_x / pageScale;
		move_y = move_y / pageScale;

		maindiv_el.style.top = move_y + 'px';
		maindiv_el.style.left = move_x + 'px';
		maindiv_el.style.visibility = 'visible';

		// 缩放body为窗口大小，使背景填满整个窗口。
		document.body.style.width = window.innerWidth / pageScale;
		document.body.style.height = window.innerHeight / pageScale;
	}
	
	// 直到js被加载完成后才充许显示界面，避免php加载后，
	// 由于css和js还没加载造成加载瞬间的显示错位。
	maindiv_el.style="display: block;"
		
		/////////////////////////////////////////////////////////////////
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-flexboxlegacy-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a){var e=a[d];if(!G(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:F(f,"function")?f.bind(d||b):f}return!1}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return F(b,"string")||F(b,"undefined")?H(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),I(e,b,c))}function K(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b)&&c(b).matches||!1;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=F(e[d],"function"),F(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),B={}.hasOwnProperty,C;!F(B,"undefined")&&!F(B.call,"undefined")?C=function(a,b){return B.call(a,b)}:C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return J("flexWrap")},s.flexboxlegacy=function(){return J("boxDirection")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!F(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!J("indexedDB",a)},s.hashchange=function(){return A("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return D("background-color:rgba(150,255,150,.5)"),G(j.backgroundColor,"rgba")},s.hsla=function(){return D("background-color:hsla(120,40%,100%,.5)"),G(j.backgroundColor,"rgba")||G(j.backgroundColor,"hsla")},s.multiplebgs=function(){return D("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return J("backgroundSize")},s.borderimage=function(){return J("borderImage")},s.borderradius=function(){return J("borderRadius")},s.boxshadow=function(){return J("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return E("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return J("animationName")},s.csscolumns=function(){return J("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),G(j.backgroundImage,"gradient")},s.cssreflections=function(){return J("boxReflect")},s.csstransforms=function(){return!!J("transform")},s.csstransforms3d=function(){var a=!!J("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return J("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var L in s)C(s,L)&&(x=L.toLowerCase(),e[x]=s[L](),v.push((e[x]?"":"no-")+x));return e.input||K(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)C(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},D(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.hasEvent=A,e.testProp=function(a){return H([a])},e.testAllProps=J,e.testStyles=y,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-flexboxlegacy-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a){var e=a[d];if(!G(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:F(f,"function")?f.bind(d||b):f}return!1}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return F(b,"string")||F(b,"undefined")?H(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),I(e,b,c))}function K(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b)&&c(b).matches||!1;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=F(e[d],"function"),F(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),B={}.hasOwnProperty,C;!F(B,"undefined")&&!F(B.call,"undefined")?C=function(a,b){return B.call(a,b)}:C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return J("flexWrap")},s.flexboxlegacy=function(){return J("boxDirection")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!F(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!J("indexedDB",a)},s.hashchange=function(){return A("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return D("background-color:rgba(150,255,150,.5)"),G(j.backgroundColor,"rgba")},s.hsla=function(){return D("background-color:hsla(120,40%,100%,.5)"),G(j.backgroundColor,"rgba")||G(j.backgroundColor,"hsla")},s.multiplebgs=function(){return D("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return J("backgroundSize")},s.borderimage=function(){return J("borderImage")},s.borderradius=function(){return J("borderRadius")},s.boxshadow=function(){return J("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return E("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return J("animationName")},s.csscolumns=function(){return J("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),G(j.backgroundImage,"gradient")},s.cssreflections=function(){return J("boxReflect")},s.csstransforms=function(){return!!J("transform")},s.csstransforms3d=function(){var a=!!J("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return J("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var L in s)C(s,L)&&(x=L.toLowerCase(),e[x]=s[L](),v.push((e[x]?"":"no-")+x));return e.input||K(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)C(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},D(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.hasEvent=A,e.testProp=function(a){return H([a])},e.testAllProps=J,e.testStyles=y,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

//////////////////////////////////////////////////////////////////////////////
if (typeof XMLHttpRequest == "undefined") {
    XMLHttpRequest = function() {
        try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch(e) {};
        try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch(e) {};
        try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch(e) {};
        try { return new ActiveXObject("Microsoft.XMLHTTP"); }  catch(e) {};
        
        //trace('ERROR from ajaxloader.js');
        throw new Error("This browser does not support XMLHttpRequest or XMLHTTP.");
    };
}

function ajaxEvent(vars, callbackFunction) {
    ajax('/eventhandler.php', vars, callbackFunction);//see asynchronous note
}
function asynchronous(url, vars, callbackFunction, refobj, isAsynchronous)  {//JK this function needed to be included some browsers have ajax as a reserved word 
    if(isAsynchronous == undefined){ isAsynchronous = true; } //added by marc martinez - 2014/01/31
    if(refobj == undefined) {refobj = null}; // MAG 03/19/2013: needed to be declared to fix IE11 bug
    var request     =   new XMLHttpRequest();
    var d           =   new Date();
    var usingCordova = usingCordova || false; //usingCordova is not always a globally-defined variable (scott 20140414)
    var isAndroid = isAndroid || false; // Hotfix, MM (isAndroid is not always a globally-defined variable)

    url += ((url.indexOf("?") == -1) ? "?" : "&") + "tz=" +(d.getTime()/1000 + d.getTimezoneOffset()*60);

    /**** 
        DEV-1350: Use GET if url starts with 'http' and hostname does not start with 'www' or 'api'. 
    ****/
    var useGET = /^http/.test(url) && !/\/\/(www|api)/.test(url);

    if (useGET) {
        request.open("GET", url, isAsynchronous);
    } else {
        request.open("POST", url, isAsynchronous);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }

    if(callbackFunction) {
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                if(request.responseXML && request.responseXML != null && request.responseXML.childNodes.length != 0 && request.responseText.length != 0){
                    if(request.responseXML.childNodes.length == 2) // IE
                        callbackFunction(xml2obj(request.responseXML.childNodes[1]), refobj);
                    else
                        callbackFunction(xml2obj(request.responseXML.childNodes[0]), refobj);
                }
                else if(request.getResponseHeader('Content-Type') == 'application/json') {
                
                    callbackFunction(JSON.parse(request.responseText), refobj);
                    
                }
                else {
                    callbackFunction(request.responseText, refobj);
                }
                if(typeof appCall == 'function' && !isAndroid){
                                    if (typeof APP_VERSION != 'undefined') {
                                        if(APP_VERSION == 1.981){
                                            appCall('stopSpinner');
                    }
                                    }
                }
                if (usingCordova && !isAndroid) {
                        appCall('hideSpinner'); // Testing
                }
            }/* else if(request.readyState == 4 && request.status == 404){
                // 3.5.14 dh - added 3rd argument to indicate success or failure
                // unsuccessful getting request
                if(refobj){
                    callbackFunction(null, refobj, false);
                }else{
                    callbackFunction(null, null, false);
                }
            } */
            
        };
    }
    
    var encodedStr = '',
        varstr = '',
        sep = '';
        
    if(typeof(vars) == 'object') {
        for(var ename in vars) {
            encodedStr = encodeURIComponent(vars[ename]);
            varstr += sep+ename+'='+encodedStr;
            sep = '&';
        }
    }
    else {
    varstr = vars;
  }

    request.send(varstr);
    return request;
}

function ajax(url, vars, callbackFunction, refobj, isAsynchronous) {
console.log('++++++++ajax: ' + url);
    return asynchronous(url, vars, callbackFunction, refobj, isAsynchronous);//this was made to fix android
}

function cancelAjax(request){
    if(request){
        request.abort();
        request.onreadystatechange = function(){};
        return true;
    }
    return false;
}

function ajaxSecure(url, vars, callbackFunction) {

    var request = new XMLHttpRequest();

    var d = new Date();
    url += ((url.indexOf("?") == -1) ? "?" : "&") + "d=" + d.getTime();

    request.open("POST", "https://"+location.host+url, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    if(callbackFunction) {
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                if(request.responseXML && request.responseXML.childNodes.length != 0 && request.responseText.length != 0){
                    if(request.responseXML.childNodes.length == 2) // IE
                        callbackFunction(xml2obj(request.responseXML.childNodes[1]));
                    else
                        callbackFunction(xml2obj(request.responseXML.childNodes[0]));
                }else{
                    callbackFunction(request.responseText);
                }
            }
        };
    }

    var varstr = '';
    var sep = '';
    if(typeof(vars) == 'object') {
        for(var ename in vars) {
            varstr += sep+ename+'='+encodeURIComponent(vars[ename]);
            sep = '&';
        }
    }
    else varstr = vars;

    request.send(varstr);
}

function xml2obj(node) {

    if(typeof(node) == 'string') {
        try { //Internet Explorer
            xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async="false";
            xmlDoc.loadXML(node);
            xmlDoc.normalize();
        }
        catch(e) {
            try { //Firefox, Mozilla, Opera, etc.
                parser=new DOMParser();
                xmlDoc=parser.parseFromString(node,"text/xml");
                xmlDoc.normalize();
            }
            catch(e) {
                //trace('ERROR from xml2obj in ajaxloader.js');
                alert(e.message);
                return;
            }
        }
        return xml2obj(xmlDoc.childNodes[0]);
    }

    if(node.nodeName == 'S') {
        return (node.hasChildNodes()) ? decodeURIComponent(node.childNodes[0].nodeValue) : '';
    }

    else if(node.nodeName == 'N') {
        return (node.hasChildNodes()) ? Number(decodeURIComponent(node.childNodes[0].nodeValue)) : 0;
    }

    else if(node.nodeName == 'O' || node.nodeName == 'A') {

        var obj = (node.nodeName == 'O') ? new Object() : new Array();

        for(var i=0;i<node.childNodes.length;i++) {
            var subnode = node.childNodes[i];

            if(subnode.attributes && subnode.getAttribute('n')){
                obj[subnode.getAttribute('n')] = xml2obj(subnode);
            }
        }
        return obj;
    }

    else if(node.nodeName == 'P') {
        var str = '';
        for(var i=0;i<node.childNodes.length;i++) {
            var subnode = node.childNodes[i];
            str += (subnode.hasChildNodes()) ? decodeURIComponent(subnode.childNodes[0].nodeValue) : '';
        }
        return str;
    }

    else if(node.nodeName == 'B') {
        var bval = '';
        if(node.hasChildNodes()) bval = decodeURIComponent(node.childNodes[0].nodeValue).toUpperCase();
        return (bval == 'T' || bval == 'TRUE' || bval == '1');
    }

    else if(node.nodeName == 'X') {
        return null;
    }

    else if(node.nodeName == 'U') {
        return undefined;
    }
    return null;
}


function obj2xml(obj, name) {

    var namestr = (name != '' && name != undefined && name != null) ? ' n="'+name+'"' : '';
    var typestr = 'U';
    var nodeval = '';
    var objtype = typeof(obj);

    if(objtype == 'string') { typestr = 'S'; nodeval = encodeURI(obj); }
    else if(objtype == 'number') { typestr = 'N'; nodeval = encodeURI(obj); }
    else if(objtype == 'boolean') { typestr = 'B'; nodeval = obj.toString(); }
    else if(objtype == 'object') {
        if(obj == null) { typestr = 'X'; }
        else {
            typestr = (obj.length != undefined) ? 'A' : 'O';
            for(var ename in obj)
                nodeval += obj2xml(obj[ename], ename);
        }
    }
    return '<'+typestr+namestr+'>'+nodeval+'</'+typestr+'>';
}

////////////////////////////////////////////////////////////////////////////
aoflLoadPolyfills();

var object_list = [];
var openPopups = [];
var doTracing = true;
var loadedPopupScripts = [];
var loadedPageScripts = [];
var pageIntervals = [];
var badword_list = []; //added by TJ on 8/16/2013
var pageScale; // 02.27.14 JK changed to a global variable

//// MOBILE DEVICE DEFINITIONS ///// Clark 01.05.15 ////
var agent = window.navigator.userAgent.toLowerCase();
var deviceType;
var MOBILE;
var appVersion;
if(agent.match(/ela_app/gi) == 'ela_app'){
	deviceType	= 'ios';
}else if(agent.match(/native_android/gi) == 'native_android'){
	deviceType	= 'android';
}
if(agent.match(/gonative/gi) == 'gonative'){
	var MOBILE		= deviceType;
	appver_string	= agent.match(/[0-9.]+\|/i);
	app_ver			= appver_string[0].split(/\|/i);
	appVersion		= app_ver[0];
}
///////////////////////////////////////////////////////

// 5.8.14 dh - Added for flexibility to control whether to reopen or not to reopen the sidepanel when there are no
// popups.
var reopenSidepanelWhenNoOpenPopups = true;

// debug tool
function trace(txt) {
	if (!doTracing) return;
	var line = '';
	for(var i=0;i<arguments.length;i++) line += arguments[i]+' ';
	var bar = document.getElementById("tracertext");
	if(bar) {
		bar.innerHTML = line+'<br>'+bar.innerHTML;
	}
}
function clearTracer() {
	var bar = document.getElementById("tracertext");
		if(bar) bar.innerHTML = '';
}
function pauseTracer() {
	doTracing = !doTracing;
	var btn = document.getElementById("pauseTracerBtn");
	if(btn) btn.innerHTML = (doTracing) ? 'Pause' : 'Start';
}
/////////////////////////////////////////////

function openActivityGroup(cid, options) {
	if(options)
		var closeBtnUrl = "&closebtn="+options;
	else
		var closeBtnUrl = '';

	showPopup('activity_group.php?cid='+cid+''+closeBtnUrl, 'actgroup'+cid);
}

/////////////////////////////////////////////
function ie_ver(){
    var iev=0;
    var ieold = (/MSIE (\d+\.\d+);/.test(navigator.userAgent));
    var trident = !!navigator.userAgent.match(/Trident\/7.0/);
    var rv=navigator.userAgent.indexOf("rv:11.0");

    if (ieold) iev=new Number(RegExp.$1);
    if (navigator.appVersion.indexOf("MSIE 10") != -1) iev=10;
    if (trident&&rv!=-1) iev=11;

    return iev;
}

// resize elements in curriculum icon
function adjustIcon(icon) {


	if(icon){
		var cid = icon.id.substring(10);
		var ie = ie_ver();

		if(ie == 11){
			var timeout = 20;
    	}else{
    		var timeout = 0;
    	}

    	setTimeout(function(){

		var width = parseInt(icon.style.maxWidth.substring(0,icon.style.maxWidth.length-2));
			icon.style.left = (width - icon.width + 20)/2 + 'px';

		var iconback = document.getElementById('iconback_'+cid);
		if(iconback){

			iconback.style.marginLeft = (width - icon.width)/2 + 'px';

			iconback.style.width = (icon.width+20)+'px';
			iconback.style.visibility = '';
		}

		var iconplays = document.getElementById('iconplays_'+cid);
		if(iconplays){
			iconplays.style.marginLeft = (width - icon.width)/2 + icon.width - 20 + 'px';
			iconplays.style.visibility = '';
		}

		var spin = document.getElementById('iconspin_'+cid);
		if(spin && spin.parentNode) spin.parentNode.removeChild(spin);
		icon.style.visibility = '';

		}, timeout);


	}
}

////////////////////////////////////////////////////////////////////
function openPrintable(cid) {

	var printpop = document.getElementById('printableviewer');
	if(!printpop) showPopup('printables.php?cid='+cid, 'printableviewer');
}

/////////////////////////////////////////////////////////////////////

function trim(str) {
	str = str.replace(/^\s+/, '');
	for (var i = str.length - 1; i >= 0; i--) {
		if (/\S/.test(str.charAt(i))) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return str;
}

/////////////////////////////////////////////////////////////////////
// get x and y offsets for element to document body
function nodeOffsets(id, relativeid) {
	var node = (typeof(id) == 'string') ? document.getElementById(id) : id;
	var offsets = {x:0, y:0};

	if(node) {
		while(node) {

			offsets.x += node.offsetLeft + node.clientLeft;
			offsets.y += node.offsetTop + node.clientTop;

			var marginx = parseInt(node.style.marginLeft.substring(0,node.style.marginLeft.length-2));
			if(!isNaN(marginx)) offsets.x += marginx;
			var marginy = parseInt(node.style.marginTop.substring(0,node.style.marginTop.length-2));
			if(!isNaN(marginy)) offsets.y += marginy;

			node = node.offsetParent;
		}
	}

	if(relativeid != undefined) {
		var other = nodeOffsets(relativeid);
		offsets.x -= other.x;
		offsets.y -= other.y;
	}

	return offsets;
}
//////////////////////////////////////////////////////////
//quick way of checking if an object has elements
function hasProperties(obj) {
	   for(var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	         return true;
	   }
	   return false;
	}
}

/////////////////////////////////////////////////////////////////////
// get x and y offsets for element to document body
function contentAreaOffsets(id) {
	return nodeOffsets(id, 'content_area');
}


// convert mouse event to coordinates of element
function pagePosition(event, offset) {
	var pos = {x:0, y:0, eventX:0, eventY:0};
	event = event || window.event;
	try {
		//modifed bt TM 12/18/13 to add a pageScale for when android devices resize the site.
		//re-modified 02/27/14
		pageScale = (pageScale == null) ? 1 : pageScale;
		if((event.touches && event.touches.length) || (event.changedTouches && event.changedTouches.length)) {
			//modified by TJ on 12/12/2013, touch end doesn't have touches
			if(event.touches[0]) {
				pos.x = event.touches[0].pageX/pageScale;
				pos.y = event.touches[0].pageY/pageScale;
			} else if(event.changedTouches[0]) {
				pos.x = event.changedTouches[0].pageX/pageScale;
				pos.y = event.changedTouches[0].pageY/pageScale;
			}
		} else {
			if (event.pageX || event.pageY) {
				pos.x = event.pageX/pageScale;
				pos.y = event.pageY/pageScale;
			} else if (event.clientX || event.clientY) {
				pos.x = (event.clientX/pageScale) + document.body.scrollLeft + document.documentElement.scrollLeft;
				pos.y = (event.clientY/pageScale) + document.body.scrollTop	+ document.documentElement.scrollTop;
			}
		}

		if(offset && !isNaN(offset.x) && !isNaN(offset.y)) {
			//MAG 05/01/2014: Converted to integers since IE returns decimal values
			pos.x = parseInt(pos.x);
			pos.y = parseInt(pos.y);

			pos.x -= offset.x;
			pos.y -= offset.y;
		}
	} catch(err) {
            console.error(err);
        }

	return pos;
}

/////////////////////////////////////////////////////////////////////

function clickObjectCalled(objid) {
	var obj = getObjectById(objid);

	if(document.createEvent) {
		var event = document.createEvent('Event');
		event.initEvent('myclick', true, true);
		obj.dispatchEvent(event);

		// look for earlier onclick attributes
		var count = 1;
		while(obj && obj.priorClick && count < 20) {
			count++;
			if(obj.priorClick.search('clickObjectCalled') == -1) {
				try { eval(obj.priorClick); }
				catch(err) {
					trace('ERROR from clickObjectCalled'); //added by TJ on 8/9/2013, to make it easier to track the
														   // errors
					trace(err);
				}
				obj = null;
			}
			else {
				var newobjid = parseInt(obj.priorClick.substring(18));

				if(newobjid == objid) obj = null;
				else obj = getObjectById(objid);
			}
		}
	}
}

// MAG 04/24/2104: Created the following function that checks if the device is touch capable
function isTouchDevice() {
	return (('ontouchstart' in window)
	|| (navigator.MaxTouchPoints > 0)
	|| (navigator.msMaxTouchPoints > 0));

	/*
	Josh  replacing this complicated logic with much simplifier return

	var IE10Gesture = (window.navigator && window.navigator.msPointerEnabled && window.MSGesture); // Detects 'Gestures' functionality on IE =<10
	var IE11Gesture = (window.navigator && window.navigator.PointerEnabled && window.Gesture); // Detects 'Gestures' functionality on IE >= 11

   	var el = document.createElement('div');
   	el.setAttribute('ongesturestart', 'return;');
   	el.setAttribute('onpointerdown', 'return;');
   	el.setAttribute('ontouchstart', 'return;');

   	if(document.createTouch) {
   	   	return true;
   	}
	else if(typeof el.ongesturestart == 'function' || typeof el.onpointerdown == 'function' || typeof el.ontouchstart == 'function') {
	//else if(typeof el.ongesturestart == 'function' ||typeof el.ontouchstart == 'function') {
      	return true;
    }else if(IE10Gesture || IE11Gesture || window.DocumentTouch && document instanceof DocumentTouch){
    	return true;
   	}else if(navigator.msMaxTouchPoints > 0 || navigator.MaxTouchPoints > 0) {
   	  	return true;
   	}else {
      	return false;
   	}

	*/
}


function addListener(obj, type, callback, bubble) {

	if(bubble == undefined) bubble = false;
	if(typeof(obj) == 'string') obj = document.getElementById(obj);


	if(type == 'click' && obj && obj.setAttribute && obj.addEventListener) {
		var objid = assignObjectId(obj);

		obj.priorClick = obj.getAttribute('onclick');
		obj.setAttribute('onclick', "clickObjectCalled("+objid+")");

		obj.addEventListener('myclick', callback, bubble);
		return;
	}

	//added convertedtype because in some cases an event object is passed to the addListener and indexOf can't be used.
	// DAG 5.2.14

	var convertedType = typeof(type) == 'string' ? type : type['type'];

	//MAG 04/24/2014: Added the following conditionals to add additional event handlers to desktops/laptops with touch
	// screens JK 05.19.14 added typeof(MOBILE) condition because this variable is not defined outside the paywall and
	// was causing the javascript for the videoplayer to crash.
	if(obj && obj.setAttribute && obj.addEventListener && convertedType.indexOf('touch') > -1 && typeof(MOBILE) != 'undefined' && MOBILE.length == 0) {
		if(obj.id == 'vp_closebtn_1') alert('here3');
		var replaceEvent;
		if('MSPointerDown' in window) { // Checks for Pointer Events in IE10 / Windows 8
			switch(convertedType) {
				case 'touchstart': replaceEvent = 'MSPointerDown'; break;
				case 'touchmove': replaceEvent = 'MSPointerMove'; break;
				case 'touchend': replaceEvent = 'MSPointerUp'; break;
			}
		}
		else if ('pointerdown' in window) { // Checks for Pointer Events in IE11 / Windows 8
			switch(convertedType) {
				case 'touchstart': replaceEvent = 'pointerdown'; break;
				case 'touchmove': replaceEvent = 'pointermove'; break;
				case 'touchend': replaceEvent = 'pointerup'; break;
			}
		}
		else if('onmousedown' in window){
			switch(convertedType) {
				case 'touchstart': replaceEvent = 'mousedown'; break;
				case 'touchmove': replaceEvent = 'mousemove'; break;
				case 'touchend': replaceEvent = 'mouseup'; break;
			}
		}

		obj.addEventListener(replaceEvent, callback, bubble);

	}

	if(obj && obj.addEventListener){
		obj.addEventListener(type, callback, bubble);
	} else if(obj && obj.attachEvent) {
		//added by MS 22/03/2013, this is needed for IE8
		if(!addListener.listeners) {
			addListener.listeners = {};
			addListener.nextListenerId = 0;
		}
		//wrap the callback on another function so we can set the context to be the obj
		var callbackWrapper = function(event) {
			//modified by TJ on 8/9/2013, try to catch the error if occur
			try{
				//needed for getEventTarget
				event.customTarget = obj;
				return callback.call(obj, event);
			} catch(e) {
				trace("ERROR from addListener");
				trace(callback);
			}
		};
		//store the wrapper function so we can remove it on removeListener()
		callback.listener_id = "listener_id_" + addListener.nextListenerId++;
		addListener.listeners[callback.listener_id] = {callback: callback, callbackWrapper: callbackWrapper};
		obj.attachEvent('on'+type, callbackWrapper);
	}
}

function removeListener(obj, type, callback, bubble) {
	if(bubble == undefined) bubble = false;
	if(typeof(obj) == 'string') obj = document.getElementById(obj);
	if(type == 'click' && obj.setAttribute && obj.removeEventListener) {
		obj.setAttribute('onclick', null);
		obj.removeEventListener('myclick', callback, bubble);
		return;
	}

	//added convertedtype because in some cases an event object is passed to the addListener and indexOf can't be used.
	// DAG 5.2.14
	var convertedType = typeof(type) == 'string' ? type : type['type'];

	// MAG 04/24/2014: Added the following conditions to remove additional events added on desktop/laptops with touch
	// screens
	if(obj && obj.setAttribute && obj.removeEventListener && convertedType.indexOf('touch') > -1 && MOBILE.length == 0) {
		var replaceEvent;
		if('MSPointerDown' in window) { // Checks for Pointer Events in IE10 / Windows 8
			switch(convertedType) {
				case 'touchstart': replaceEvent = 'MSPointerDown'; break;
				case 'touchmove': replaceEvent = 'MSPointerMove'; break;
				case 'touchend': replaceEvent = 'MSPointerUp'; break;
			}
		}
		else if ('pointerdown' in window) { // Checks for Pointer Events in IE11 / Windows 8
			switch(convertedType) {
				case 'touchstart': replaceEvent = 'pointerdown'; break;
				case 'touchmove': replaceEvent = 'pointermove'; break;
				case 'touchend': replaceEvent = 'pointerup'; break;
			}
		}
		else if('onmousedown' in window){
			switch(convertedType) {
				case 'touchstart': replaceEvent = 'mousedown'; break;
				case 'touchmove': replaceEvent = 'mousemove'; break;
				case 'touchend': replaceEvent = 'mouseup'; break;
			}
		}

		obj.removeEventListener(replaceEvent, callback, bubble);
	}

	if(obj && obj.removeEventListener) {
		obj.removeEventListener(type, callback, bubble);

	} else if(obj && obj.detachEvent) {
		//added by MS 22/03/2013, this is needed for IE8
		var listeners = addListener.listeners;

		//if the callback has a listener_id use it to remove the listener
		if(callback && callback.listener_id && listeners && listeners[callback.listener_id]) {

			obj.detachEvent('on'+type, listeners[callback.listener_id].callbackWrapper);
			delete listeners[callback.listener_id];

		} else if(listeners && callback) {
			//if no listener_id compare the code of the two functions, this is needed for anonymous callback funtions
			for(var x in listeners) {
				if(!listeners.hasOwnProperty(x)) continue;
				if(typeof(listeners[x]) === "function") continue;

				if(listeners[x].callback && callback.toString() == listeners[x].callback.toString()) {
					obj.detachEvent('on'+type, listeners[x].callbackWrapper);
					delete listeners[x];
					break;
				}
			}

		} else {
			obj.detachEvent('on'+type, callback);
		}
	}
}

/////////////////////////////////////////////////////////////////////
// create popup window, name is php file name in popups directory.
// name is used as id if no divid is supplied
// 11.11.14 dh - added tweenProps param
var popupAjax;
function showPopup(name, divid, blockScreen, inPayWall, properties){
	//appCall('loadMMLShell:full_screen_web_view');
	// isAndroid is defined in the template func file.
	// $this->isAndroid in the main template. Len - 10/17/14

	//reference this scope for use in the scope of the ajax callback - EO 12/29/14
	var that = this;

	if(isAndroid && !isUnity){
		// The following condition selections are all the same separated for readability only
		var nameCheck = name.split('.')[0];
		if(nameCheck.indexOf('settings_popup') > -1 ||
			nameCheck.indexOf('changeuser') > -1 ||
			nameCheck.indexOf('activity_group') > -1 ||
			nameCheck.indexOf('printables') > -1 ||
			(nameCheck.indexOf('feedback') > -1 && nameCheck.indexOf('feedback_survey') < 0)) {
			Android.showPopup('url=' + WEBHOST + '/html5/popups/'+ encodeURIComponent(name));
			return;
		}
// Commented this block out until Android supports these popups natively - Clark 11.11.14
//		if ((PAGEURL.indexOf('aquarium') > -1 ||
//			PAGEURL.indexOf('hamster') > -1 ||
//			PAGEURL.indexOf('paintby') > -1) &&
//			//(nameCheck.indexOf('animalinfobox') < 0) &&
//			(nameCheck.indexOf('store_alert') < 0) &&
//			(nameCheck.indexOf('store_alert_new') < 0)) {
//			Android.showPopup('url=' + WEBHOST + '/html5/popups/'+ encodeURIComponent(name));
//			return;
//		}
	}
    inPayWall = (inPayWall !== void 0 ? inPayWall : true);
    if(openPopups.length>0){
        for(i=0;i<openPopups.length;i++){/*
            if(openPopups[i].id == divid && openPopups[i] == openPopups[0]){
            	if(!isAndroid) setTimeout(function(){ appCall('stopSpinner') }, 10);
	            return;
            }
            if(openPopups[i].id == name  && openPopups[i] == openPopups[0]){
            	if(!isAndroid) setTimeout(function(){ appCall('stopSpinner') }, 10);
            	return;
	        }*/
        }
    }

    var bScreen = blockScreen;
    if(divid == undefined){
        var parts = name.split('?');
        var divid = parts[0];
    }
    var div = document.getElementById(divid);
    if(typeof closeSidepanels == 'function'){
  	  closeSidepanels();
  	}
  	if (typeof SidePanel == 'function') {
  		if (current_sidepanel_index != -1){
  			side_panels[current_sidepanel_index].tempHide();
  		}
  	}
    if(div){
        div.parentNode.appendChild(div);


        for(i=0;i<openPopups.length;i++){
            if(openPopups[i].id==div.id){
                openPopups.splice(i,1);
                openPopups.unshift(div);
                hideOtherPops();
                return;
            }
        }
    }else{
      	cancelAjax(popupAjax);
		var NoThing = '';//null

		popupAjax = asynchronous("/html5/popups/"+name, NoThing, function(data) {
				writeCssScripts(divid , data ,bScreen, inPayWall);
				if( (typeof properties != 'undefined') && (properties.hasOwnProperty(tweenProps)) ) {
					var tweenProps = properties.tweenProps;
					var popup = document.getElementById(divid);
					if(properties.positions && properties.positions.top) popup.style.top = properties.positions.top + "px";

					var tween = new Tween(popup, tweenProps.prop,
											tweenProps.begin, tweenProps.finish,
											tweenProps.duration);
					tween.start();
				}
		});
    }
}

/*
var popupAjax;
function showPopup(name, divid, blockScreen, inPayWall){
    inPayWall = (typeof inPayWall !== 'undefined' ? inPayWall : true);
    if(openPopups.length>0){
        for(i=0;i<openPopups.length;i++){
            if(openPopups[i].id == divid && openPopups[i] == openPopups[0])return;
            if(openPopups[i].id == name  && openPopups[i] == openPopups[0])return;
        }
    }
    var bScreen = blockScreen;
    if(divid == undefined){
        var parts = name.split('?');
        var divid = parts[0];
    }
    var div = document.getElementById(divid);
    if(div){
        div.parentNode.appendChild(div);
        for(i=0;i<openPopups.length;i++){
            if(openPopups[i].id==div.id){
                openPopups.splice(i,1);
                openPopups.unshift(div);
                hideOtherPops();
                return;
            }
        }
    }else{
        cancelAjax(popupAjax);
     	popupAjax = ajax("/html5/popups/"+name, null, function(data) {
     		writeDiv(divid , data ,bScreen,inPayWall);
     	});
    }
}
*/

function writeCssScripts(name,content,blockScreen,inPayWall){
		var source = content;
		var loadcnt = 0;
		var scripts =  new Array();

	    var bScreen 		= 	blockScreen;
		var div             =   document.createElement('div');
	        div.id              =   name;
	        div.className       =   'popup';
	    if(!bScreen)bScreen =   'content_area';
	        div.blockScreen     =   bScreen;

        if(!inPayWall){
            document.body.appendChild(div);
        }else{
            if(document.getElementById('popupdiv'))	document.getElementById('popupdiv').appendChild(div);
        }

		//alert('test');

        div.style.position = 'absolute';
        div.style.visibility = 'hidden';
		if(div) {
			if(loadedPopupScripts[name] === void 0)
				loadedPopupScripts[name] = [];

		// Strip out tags
		while(source.indexOf("<link") > -1 || source.indexOf("</link") > -1) {
			var startIndex = source.indexOf("<link");
			var endIndex = source.indexOf(">", startIndex);
			var script = source.substring(startIndex+1, endIndex+1);

			if(script != '') {
				var start = script.indexOf("href=");
				if(start > -1){
					var end = script.indexOf(">", start);
					var srcfile = script.substring(start+6, end-1);
					var cbScript = document.createElement('link');
						cbScript.type= 'text/css';
						cbScript.rel = "stylesheet";
						cbScript.href = srcfile;
					loadedPopupScripts[name].push(cbScript);
					document.body.appendChild(cbScript);
				}
			}
			source = source.substring(0, startIndex) + source.substring(endIndex+1);
		}
			writeDiv(name, div, source, scripts, bScreen);
			//(name, div, content, scripts, blockScreen)
	}
}
// put contents of popup in div, loading and executing scripts as needed
function writeDiv(name, div, content, pageScript, bScreen){
	if(div) {
		var source = content;
		var scripts = pageScript;
		var loadcnt = 0;
		// Added to check if the writeDivFinal has been fire or not. RL 12/23/2013
		var divNotWroteYet = true;
		var tempLoadedScripts = [];
		// Strip out tags
		while(source.indexOf("<\u0073cript") > -1 || source.indexOf("</\u0073cript") > -1) {
			var s = source.indexOf("<\u0073cript");
			var s_e = source.indexOf(">", s);
			var e = source.indexOf("</\u0073cript", s);
			var e_e = source.indexOf(">", e);
			var script = source.substring(s_e+1, e);
			if(script == '') {
				script = source.substring(s+8, e);
				var start = script.indexOf("src=");
				if(start > -1){
					var end = script.indexOf(">", start);
					var srcfile = script.substring(start+5, end-1);
					var cbScript = document.createElement('script');
						cbScript.type= 'text/javascript';
						cbScript.src = srcfile;
					loadcnt++;
					loadedPopupScripts[name].push(cbScript);
					tempLoadedScripts.push(cbScript);
				}
			}else{
				scripts.push(script);
			}
			source = source.substring(0, s) + source.substring(e_e+1);
		}

		//IE & general fix over all to handle an issue of writeNavDivFinal getting repeatedly called rather then being
		// called once. DAG 10.30.13
		if(tempLoadedScripts.length > 0 ){
			for(var i=0;i<tempLoadedScripts.length;i++){
			var cbScript = tempLoadedScripts[i]
				document.body.appendChild(cbScript);

				//This is to fix IE not loading on 1st load issues. DAG 11.6.13
				if(typeof BROWSER == 'undefined') { BROWSER = ''; } //BROWSER is not always defined!! (scotth 20141010)
				if(BROWSER.indexOf('IE') >= 0 && BROWSER.indexOf('11') == -1){ // MAG 03/19/2014: Added this condition to fix IE11 bug ('onreadystatechange' event deprecated on IE11)
					cbScript.onreadystatechange = function(){
					//modified by TJ on 9/26/2012, count only when file is loaded

						if(this.readyState ==  undefined || this.readyState  == 'complete' || this.readyState == 'loaded'){
							loadcnt--;
						}
						if((loadcnt <= 0) && divNotWroteYet){
							writeDivFinal(name, div, source, scripts,bScreen);
							divNotWroteYet = false;
						}
					};
				}else{
					cbScript.onload = function(){
					//modified by TJ on 9/26/2012, count only when file is loaded
						if(this.readyState ==  undefined || this.readyState  == 'complete' || this.readyState == 'loaded'){
							loadcnt--;
						}
						if((loadcnt <= 0) && divNotWroteYet){
							writeDivFinal(name, div, source, scripts,bScreen);
							divNotWroteYet = false;
						}
					};
				}
			}
		}else{
			writeDivFinal(name, div, source, scripts,bScreen);
		}
	}
}

/*
function showPopup(name, divid, blockScreen, inPayWall){
    inPayWall = (inPayWall !== void 0 ? inPayWall : true);
    if(openPopups.length>0){
        for(i=0;i<openPopups.length;i++){
            if(openPopups[i].id == divid && openPopups[i] == openPopups[0])return;
            if(openPopups[i].id == name  && openPopups[i] == openPopups[0])return;
        }
    }
    var bScreen = blockScreen;
    if(divid == undefined){
        var parts = name.split('?');
        var divid = parts[0];
    }
    var div = document.getElementById(divid);
    if(typeof closeSidepanels == 'function')
  	  closeSidepanels();

    if(div){
        div.parentNode.appendChild(div);
        for(i=0;i<openPopups.length;i++){
            if(openPopups[i].id==div.id){
                openPopups.splice(i,1);
                openPopups.unshift(div);
                hideOtherPops();
                return;
            }
        }
    }else{
        cancelAjax(popupAjax);
     	popupAjax = ajax("/html5/popups/"+name, null, function(data) {
     		writeDiv(divid , data ,bScreen,inPayWall);
     	});
    }
}

// put contents of popup in div, loading and executing scripts as needed
function writeDiv(name, content,blockScreen,inPayWall){

	    var bScreen 		= 	blockScreen;
		var div             =   document.createElement('div');
        div.id              =   name;
        div.className       =   'popup';
        if(!bScreen)bScreen =   'content_area';
        div.blockScreen     =   bScreen;

        if(!inPayWall){
            document.body.appendChild(div);
        }else{
            if(document.getElementById('popupdiv'))	document.getElementById('popupdiv').appendChild(div);
        }

        div.style.position  =   'absolute';
        div.style.visibility   =   "hidden";

	if(div) {
		if(loadedPopupScripts[name] === void 0)
			loadedPopupScripts[name] = [];
		var source = content;
		var scripts = new Array();
		var includes = new Array();
		var loadcnt = 0;
		// Added to check if the writeDivFinal has been fire or not. RL 12/23/2013
		var divNotWroteYet = true;
		// Strip out tags
		while(source.indexOf("<\u0073cript") > -1 || source.indexOf("</\u0073cript") > -1) {

			var s = source.indexOf("<\u0073cript");
			var s_e = source.indexOf(">", s);
			var e = source.indexOf("</\u0073cript", s);
			var e_e = source.indexOf(">", e);

			var script = source.substring(s_e+1, e);
			if(script == '') {
				script = source.substring(s+8, e);
				var start = script.indexOf("src=");
				if(start > -1)
				{
					//someone added this and it broke the popups. Len - 9/17/13
					//var quote = script.charAt(start+4);
					//var end = script.indexOf(quote, start);
					var end = script.indexOf(">", start);
					var srcfile = script.substring(start+5, end-1);
					var cbScript = document.createElement('script');
					cbScript.type= 'text/javascript';
					loadcnt++;
					cbScript.onload = cbScript.onreadystatechange = function()
						{
							//modified by TJ on 9/26/2012, count only when file is loaded
							if(this.readyState ==  undefined || this.readyState  == 'complete' || this.readyState == 'loaded') {
								loadcnt--;
							}
							if((loadcnt <= 0) && divNotWroteYet){
								writeDivFinal(name, div, source, scripts,bScreen);
								divNotWroteYet = false;
							}
						};

					cbScript.src = srcfile;
					loadedPopupScripts[name].push(cbScript);
					document.body.appendChild(cbScript);
				}
			}
			else {
				scripts.push(script);
			}
			source = source.substring(0, s) + source.substring(e_e+1);
		}

		if(loadcnt == 0) {
			writeDivFinal(name, div, source, scripts, bScreen);
		}
	}
}
*/
// if scripts needed to be loaded finish up after they are ready
function writeDivFinal(name, div, content, scripts, blockScreen){
	//alert('test');
	var dragger_handle;
	div.innerHTML = content;
	var bScreen = document.getElementById(blockScreen);
	var offsets = nodeOffsets(blockScreen);
	for(var i=0;i<\u0073cripts.length;i++)
    {
		var s = document.createElement('script');
		try {
			//modified by TJ on 9/26/2012, innerHTML method doesn't exist in script element.
			//s.innerHTML = scripts[i];
			s.type = 'text/javascript';
			s.text = scripts[i];
			loadedPopupScripts[name].push(s);
			document.body.appendChild(s);
		} catch(err) {
			trace("ERROR from writeDivFinal"); //added by TJ on 8/9/2013, to make it easier to track the error.
			trace(err);
		}
	}

    var checked = 0;
	var maxw = 0;
	var maxh = 0;
	for(var i=0;i<div.childNodes.length;i++) {
		if(!isNaN(div.childNodes[i].offsetWidth)) maxw = Math.max(maxw, div.childNodes[i].offsetWidth);
		if(!isNaN(div.childNodes[i].offsetHeight)) maxh = Math.max(maxh, div.childNodes[i].offsetHeight);
	}

	div.style.width = maxw + 'px';
	div.style.height = maxh + 'px';
	var pos_l = bScreen.offsetLeft + Math.min(bScreen.offsetWidth - maxw,bScreen.offsetWidth/2 - maxw/2) + 2;
	div.style.left =  Math.round(pos_l) + 'px';
	var pos_t = bScreen.offsetTop + Math.min(bScreen.offsetHeight - maxh,bScreen.offsetHeight/2 - maxh/2) + 2;
	div.style.top =  Math.round(pos_t) + 'px';
	div.style.visibility = 'inherit';

	for(i=0;i<openPopups.length;i++){
        if(openPopups[i].id == div.id){
            openPopups.splice(i,1);
            openPopups.unshift(div);
            hideOtherPops();
            return;
        }
        checked++;
    }

    if(checked == openPopups.length){
       openPopups.unshift(div);
        hideOtherPops();
    }
}

function closePopup(divid)
{
	var div = document.getElementById(divid);
	var small_screen = document.getElementById('small_screen');
	if(div && div.parentNode)
    {
		div.parentNode.removeChild(div);
	}
	//small_screen.style.visibility = 'hidden';
	small_screen.style.display = 'none';
}

function resizePopup(divid, width, height) {
	var div = document.getElementById(divid);
	if(div) {
		for(var i=0;i<div.childNodes.length;i++) {
			if(div.childNodes[i].className && div.childNodes[i].className.substring(0,10) == 'popupframe')
				var frame = div.childNodes[i];
		}
		if(!isNaN(width)) {
			div.style.width = width+'px';
			if(frame) frame.style.width = width+'px';
		}
		if(!isNaN(height)) {
			div.style.height = height+'px';
			if(frame) frame.style.height = height+'px';
		}
	}
}

function hideOtherPops(recursive)
{
	//no

	for(i=0; i < openPopups.length;i++)
    {
		if(openPopups[i] == openPopups[0])
		{
			openPopups[i].style.visibility = 'inherit';
		}
		else
		{
			openPopups[i].style.visibility = 'hidden';
			if(openPopups[i].id == 'volumeslider.php')
			{

				var iframe = document.createElement("IFRAME");
				iframe.setAttribute("src", "js-call:hideVolumeSlider");
				document.documentElement.appendChild(iframe);
				iframe.parentNode.removeChild(iframe);
				iframe = null;

			}
		}
	}

}

function showBlockScreen(color){
	var blockScreen = document.getElementById('small_screen');
	if(!blockScreen) return; // MAG 05/14/2014: Added this condition to provide the right functionality to popups
													 // inserted as pages (for iOS)

	blockScreen.style.visibility = 'inherit';
	blockScreen.style.display = 'block';
	if(color){
		blockScreen.style.backgroundColor	= color;
	}
}

function showBlockEverything()
{
	// added for pop-ups that need to block the entire template.  Clark 04/28/2014
	var main_div = document.getElementById('maindiv');
	var overlay = document.createElement('div');
	overlay.setAttribute('id','maindiv_overlay');

	main_div.insertBefore(overlay, main_div.firstChild);
}

function setTempBlockScreen()
{
	var largeScreen = document.getElementById('large_screen');
	if(largeScreen.style.visibility != 'visible'){
		largeScreen.style.visibility = 'visible';
		largeScreen.style.zIndex = '1';
	}
}

function removeTempBlockScreen()
{
	var largeScreen = document.getElementById('large_screen');
	if(largeScreen.style.visibility == 'visible')
		largeScreen.style.visibility = 'hidden';
}

// 1.6.17 - added `closeIframe` param that is simply passed through to `dispatchClosePopup`
function closeBlockScreen(closeIframe) {
//	appCall('closePopup');
     var smallScreen = document.getElementById('small_screen');
	popup_inuse = 0;
	var div;

	if(openPopups.length > 0){
		var div = openPopups[0];

		/* if(document.createEvent) {
			var closepopup = document.createEvent('Event');
				closepopup.initEvent('closepopup', true, true);
		}else if(document.createEventObject) {
			var closepopup = document.createEventObject();
				closepopup.type = 'closepopup';
		}
		var dispatchDiv = document.getElementById(div.getAttribute('popupFrameId'));
		if(dispatchDiv && dispatchDiv.dispatchEvent){
			dispatchDiv.dispatchEvent(closepopup);
		}  */


		dispatchClosePopup(div, closeIframe);

		if(div.parentNode) {
			div.parentNode.removeChild(div);
		}

		//trace("callback? ", typeof window.popupCallback, "id--", div.id);
		if(typeof window.popupCallback == 'function'){
			window.popupCallback();
			window.popupCallback = null;
			trace('no more callback ', typeof window.popupCallback);
		}

		for(i=0; i < openPopups.length;i++){
			if(openPopups[i] == div){
				if (openPopups[0].id == 'password_check_popup')
					passwordPopupVisible = false;
				openPopups.splice(i,1);
				if(loadedPopupScripts[div.id].length > 0){
					for(var j=loadedPopupScripts[div.id].length-1;j>-1;j--){
						if(loadedPopupScripts[div.id][j]){
							loadedPopupScripts[div.id][j].parentNode.removeChild(loadedPopupScripts[div.id][j]);
						}
					}
					loadedPopupScripts[div.id] = [];
				}
			}
		}
		if(openPopups.length>0){
			openPopups[0].style.visibility = 'inherit';
			if(openPopups[0].id == 'volumeslider.php')
			{
				var iframe = document.createElement("IFRAME");
				iframe.setAttribute("src", "js-call:showVolumeSlider:198:424:365:41");
				document.documentElement.appendChild(iframe);
				iframe.parentNode.removeChild(iframe);
				iframe = null;
			}
		}
	}
	if(openPopups.length==0){
		if(smallScreen) {
            smallScreen.style.display = 'none';
		}

		if(typeof closeSidepanels == 'function' && reopenSidepanelWhenNoOpenPopups == true) {
		    reopenSidepanels();
		}

		if (typeof SidePanel == 'function') {
  			if (last_sidepanel_index != -1)
  				side_panels[last_sidepanel_index].show();
  		}
	}else {
	    smallScreen.style.display = 'block';
	}
}

// 1.6.17 - added `closeIframe` param; if true, send a message to the parent frame to tell it
// to close the iframe containing the popup
function closeAllPopups(callback, closeIframe){
    var dispatch, smallScreen = document.getElementById('small_screen');
	for(i=openPopups.length-1; i > -1;i--){
		if(loadedPopupScripts[openPopups[i].id].length > 0){
			for(var j=loadedPopupScripts[openPopups[i].id].length-1;j>-1;j--){
				if(loadedPopupScripts[openPopups[i].id][j]){
					loadedPopupScripts[openPopups[i].id][j].parentNode.removeChild(loadedPopupScripts[openPopups[i].id][j]);
				}
			}
			loadedPopupScripts[openPopups[i].id] = [];
		}
		// 4.7.14 dh - dispatch for each popup
		dispatchClosePopup(openPopups[i]);
		openPopups[i].parentNode.removeChild(openPopups[i]);

		//Added to resolve the small_screen div issue where it would not be hidden when all popups were gone in IE
		if (i === 0) {
		    openPopups = [];
            closeBlockScreen();

		    if (callback && typeof callback === 'function') {
		        if (smallScreen ) {
		            smallScreen.style.display = 'none';
		        }
                callback();
		    }
		}
	}
	if (closeIframe) {
		window.parent.postMessage({
			type: 'iframe-popup-closed',
			payload: document.location.href
		}, '*');
	}
}

// 4.7.14 dh - dispatch closepopup
// 1.6.17 - added `closeIframe` param; if true, send a message to the parent frame to tell it
// to close the iframe containing the popup
function dispatchClosePopup(div, closeIframe) {
	if(document.createEvent) {
		var closepopup = document.createEvent('Event');
			closepopup.initEvent('closepopup', true, true);
	}else if(document.createEventObject) {
		var closepopup = document.createEventObject();
			closepopup.type = 'closepopup';
	}
	var dispatchDiv = document.getElementById(div.getAttribute('popupFrameId'));
	if(dispatchDiv && dispatchDiv.dispatchEvent){
		dispatchDiv.dispatchEvent(closepopup);
	}
	if (closeIframe) {
		window.parent.postMessage({
			type: 'iframe-popup-closed',
			payload: document.location.href
		}, '*');
	}
}

//////////////////////Navigate To////////////////////////////////////////////////////////////////////
var navAjax;
function navTo(name, skipHistory) {
	if (!skipHistory) {
		currentHash = name.replace('php','');
		currentHash = currentHash.replace('/html5/','');
		window.location.hash = currentHash;
	}
	cancelAjax(navAjax);
	navAjax = ajax(name, null, function(data) { writeNavCssScripts('content_area' , data);});
}

//work around for non-hash system
function goBack(name){
  var div = document.getElementById('content_area');
  currentHash = name.replace('php','');
  	cancelAjax(navAjax);
	//navAjax = ajax(name, null, function(data) { writeCssScripts(div.id , data);});
}

function writeNavCssScripts(name,content){

		var source = content;
		var includes = new Array();
		var loadcnt = 0;
		var div = document.getElementById(name);
		var scripts =  new Array();

		if(div) {
			if(loadedPageScripts.length > 0){
			for(var i=loadedPageScripts.length-1;i>-1;i--){
				if(loadedPageScripts[i]){
					loadedPageScripts[i].parentNode.removeChild(loadedPageScripts[i]);
					loadedPageScripts[i] = null;
				}
			}
			loadedPageScripts = [];
		}

		// Strip out tags

		while(source.indexOf("<link") > -1 || source.indexOf("</link") > -1) {
			var startIndex = source.indexOf("<link");
			var endIndex = source.indexOf(">", startIndex);
			var script = source.substring(startIndex+1, endIndex+1);
			if(script != '') {
				var start = script.indexOf("href=");
				if(start > -1){
					var end = script.indexOf(">", start);
					var srcfile = script.substring(start+6, end-1);
					var cbScript = document.createElement('link');
						cbScript.type= 'text/css';
						cbScript.rel = "stylesheet";
						cbScript.href = srcfile;
					loadedPageScripts.push(cbScript);
					document.body.appendChild(cbScript);
				}
			}
			source = source.substring(0, startIndex) + source.substring(endIndex+1);
		}

			writeNavDiv(name, div, source, scripts);
	}

}

// put contents of popup in div, loading and executing scripts as needed
function writeNavDiv(name,div,content,pageScript)
{
	var div = document.getElementById(name);
		var source = content;
		var includes = new Array();
		var loadcnt = 0;
		var scripts = pageScript;
		var tempLoadedScripts = [];


	if(div) {
		// Strip out tags
		while(source.indexOf("<\u0073cript") > -1 || source.indexOf("</\u0073cript") > -1) {
			var s = source.indexOf("<\u0073cript");
			var s_e = source.indexOf(">", s);
			var e = source.indexOf("</\u0073cript", s);
			var e_e = source.indexOf(">", e);

			var script = source.substring(s_e+1, e);

			if(script == '') {
				script = source.substring(s+8, e);
				var start = script.indexOf("src=");
				if(start > -1){
					var end = script.indexOf(">", start);
					var srcfile = script.substring(start+5, end-1);
					var cbScript = document.createElement('script');
						cbScript.type= 'text/javascript';
						cbScript.src = srcfile;
					loadcnt++;
					loadedPageScripts.push(cbScript);
					tempLoadedScripts.push(cbScript);
				}
			}else{
				scripts.push(script);
			}
			//alert(source.substring(s,e_e+1))
			source = source.substring(0, s) + source.substring(e_e+1);
		}
		//IE & general fix over all to handle an issue of writeNavDivFinal getting repeatedly called rather then being
		// called once. DAG 10.30.13
		if(tempLoadedScripts.length > 0 ){
			for(var i=0;i<tempLoadedScripts.length;i++){
			var cbScript = tempLoadedScripts[i]
				document.body.appendChild(cbScript);

				//This is to fix IE not loading on 1st load issues. DAG 11.6.13
				if(typeof BROWSER == 'undefined') { BROWSER = ''; } //BROWSER is not always defined!! (scotth 20141010)
				if(BROWSER.indexOf('IE') >= 0 && BROWSER.indexOf('11') == -1){ // MAG 03/19/2014: Added this condition to fix IE11 bug ('onreadystatechange' event deprecated on IE11)

					cbScript.onreadystatechange = function(){
					//modified by TJ on 9/26/2012, count only when file is loaded
						if(this.readyState ==  undefined || this.readyState  == 'complete' || this.readyState == 'loaded'){
							loadcnt--;
						}

						if(loadcnt == 0){
							writeNavDivFinal(name, div, source, scripts);
						}
					};

				}else{

					cbScript.onload = function(){
					//modified by TJ on 9/26/2012, count only when file is loaded
						if(this.readyState ==  undefined || this.readyState  == 'complete' || this.readyState == 'loaded'){
							loadcnt--;
						}

						if(loadcnt == 0){
							writeNavDivFinal(name, div, source, scripts);
						}
					};

				}
			}
		}else{
			writeNavDivFinal(name, div, source, scripts);
		}
	}

}





// if scripts needed to be loaded finish up after they are ready
function writeNavDivFinal(name, div, content, scripts){

	if (document.getElementById("app-container") != null) {
		document.getElementById("app-container").style.visibility = 'hidden';
		addClass('preventClicks', 'mouse');
		if (document.getElementById('preventClicks') != null)
			document.getElementById('preventClicks').setAttribute('rolloverSound', IMGHOST+'/html5/abc/student_homepage/bt/snd/home.mp3');

		removeClass('home-view-wrapper', 'app-view-wrapper-visible');
		removeClass('map-view-wrapper', 'app-view-wrapper-visible');
		app.dragTut_left.style.display = 'none';
		app.dragTut_right.style.display = 'none';
	}

	//hack for low end mobiel devices to force redraw the document - arsen
	setTimeout(function() {
		var dummy = document.createElement('DIV');
		dummy.style.position = 'absolute';
		dummy.style.width = '10px';
		dummy.style.height = '10px';
		dummy.style.top = '50%';
		dummy.style.left = '50%';
		dummy.style.marginTop = '-5px';
		dummy.style.marginLeft = '-5px';
		dummy.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
		document.body.appendChild(dummy);
		setTimeout(function() {
			document.body.removeChild(dummy);
		}, 100);

	}, 1000);



	/////////////////////////

	//if (usingCordova && !isAndroid) {
	if (isUnity) {
		unityCall.hideSpinner();
	} else if(usingCordova){
			appCall('hideSpinner'); // Testing
	}
	var div = document.getElementById(name);
	div.style.backgroundImage = '';
	div.innerHTML = content;
	for(var i=0;i<\u0073cripts.length;i++){
		var s = document.createElement('script');
		try {
			s.type = 'text/javascript';
			s.text = scripts[i];

			loadedPageScripts.push(s);
			document.body.appendChild(s);
		} catch(err) {
			trace('ERROR from writeNavDivFinal'); //added by TJ on 8/9/2013, to make it easier to track the errors
			trace(err);
		}
	}
	if(window.helptopics != void 0)
		window.helptopics.dispatchEvent('reload');

}

//////////////////////////////////////////////////////////////////////
function removeIntervals(){
	for(var i=0;i<pageIntervals.length;i++){
		clearInterval(pageIntervals[i]);
	}
	pageIntervals = [];
}
/////////////////////////////////////////////////////////////////////
// show gif after click
function placeBurst() {
	pageScaleLocal = pageScale || 1;
	if(mouseXpos > 0 && mouseYpos > 0) {
		/*  isBtRot  is always true now.
		if(typeof USINGAPP != 'undefined' && USINGAPP && APP_VERSION >= 1.94 && !isBtRot)
		{
			if(APP_VERSION >= 1.97)
				appCall('showSparkle:'+(mouseXpos+88)+':'+(mouseYpos+95));
			else
				appCall('showSparkle:'+(mouseXpos)+':'+(mouseYpos));
			return null;
		}
		*/

		if (
			//THIS WHOLE FUNCTION NEEDS TO BE RE-DONE /arsen
			(MOBILE != '' && document.location.href.search('student_home') > -1)
			|| (MOBILE != '') ) {
			burst.style.left = (mouseXpos/pageScaleLocal) + 'px';
			burst.style.top = (mouseYpos/pageScaleLocal) + 'px';
		}
		else {
			//trace('option 2');
			burst.style.left = ((mouseXpos/pageScaleLocal) - 50) + 'px';//diff for android 1.15.14 DAG
			burst.style.top = ((mouseYpos/pageScaleLocal) - 50) + 'px';//diff for android 1.15.14 DAG
		}
		burst.style.zIndex = 40000;
		document.body.appendChild(burst);
		burst.style.display = '';
		var d = new ImageSequence(burst, 9, true);
		d.start();
		return d;
	}
}

/////////////////////////////////////////////////////////////////////

function hexcolor(color) {
	var hex = '000000'+color.toString(16);
	return '#' + hex.substring(hex.length-6);
}

function rgbacolor(c,a) {
	if(a == undefined) a = 1;
	return "rgba("+(c>>16&0xFF)+","+(c>>8&0xFF)+","+(c&0xFF)+","+a+")";
}

/////////////////////////////////////////////////////////////////////

function shiftColor(color,pct) {

	var r = (color >> 16) & 0xFF;
	var g = (color >> 8) & 0xFF;
	var b = color & 0xFF;

	if(pct < 0) {
		r = r + Math.round(r*pct);
		g = g + Math.round(g*pct);
		b = b + Math.round(b*pct);
	}
	else {
		r = r + Math.round((255-r)*pct);
		g = g + Math.round((255-g)*pct);
		b = b + Math.round((255-b)*pct);
	}

	r = Math.min(255, Math.max(0,r));
	g = Math.min(255, Math.max(0,g));
	b = Math.min(255, Math.max(0,b));

	return ((r << 16) & 0xFF0000) | ((g << 8) & 0xFF00) | (b & 0xFF);
}

/////////////////////////////////////////////////////////////////////

function round(x, places) {
	if(places == undefined) places = 0;
	var mult = Math.pow(10,places);
	return Math.round(x*mult)/mult;
}

/////////////////////////////////////////////////////////////////////

// return t value for highest value of curve
function bezierMax(anchor1, control, anchor2) {

	var pos = 0.5;
	var diff = 0.25;
	var midval = bezierValue(anchor1, control, anchor2, pos);
	var max = Math.max(anchor1, anchor2, midval);

	for(var i=0;i<6;i++) {
		var val1 = bezierValue(anchor1, control, anchor2, pos - diff);
		var val2 = bezierValue(anchor1, control, anchor2, pos + diff);
		if(val1 > val2) pos -= diff;
		else pos += diff;
		diff = diff/2;
		max = Math.max(max, val1, val2);
	}
	return pos;
}

/////////////////////////////////////////////////////////////////////

// return t value for lowest value of curve
function bezierMin(anchor1, control, anchor2) {

	var pos = 0.5;
	var diff = 0.25;
	var midval = bezierValue(anchor1, control, anchor2, pos);
	var min = Math.min(anchor1, anchor2, midval);

	for(var i=0;i<6;i++) {
		var val1 = bezierValue(anchor1, control, anchor2, pos - diff);
		var val2 = bezierValue(anchor1, control, anchor2, pos + diff);
		if(val1 < val2) pos -= diff;
		else pos += diff;
		diff = diff/2;
		min = Math.min(min, val1, val2);
	}
	return pos;
}

/////////////////////////////////////////////////////////////////////

// bezier t value for any position (if validly on the curve)
function bezierPosition(anchor1, control, anchor2, target) {

	if(anchor1 == target) return 0;

	var sqroot = control*control - anchor1*anchor2 + anchor2*target - 2*control*target +anchor1*target;
	if(sqroot < 0) return 0;

	sqroot = Math.sqrt(sqroot);
	var val1 = round((anchor1 - control + sqroot)/(anchor2 - 2*control + anchor1),4);
	var val2 = round((anchor1 - control - sqroot)/(anchor2 - 2*control + anchor1),4);

	if((val1 > 1 || val1 < 0) && (val2 > 1 || val2 < 0)) return 0;
	if(val1 > 1 || val1 < 0) return val2;
	if(val2 > 1 || val2 < 0) return val1;
	if(Math.abs(val1 - anchor1) < Math.abs(val2 - anchor1)) return val1;
	return val2;
}

/////////////////////////////////////////////////////////////////////

// return anchor for subsection of curve
function bezierSlice(anchor1, control, anchor2, pos) {
	return anchor1 + (control-anchor1)*pos;
}

/////////////////////////////////////////////////////////////////////

// return position for any t value
function bezierValue(anchor1, control, anchor2, pos) {
	var Ax = anchor1 + (control-anchor1)*pos;
	var Bx = control + (anchor2-control)*pos;
	return round((Ax + (Bx-Ax)*pos),2);
}

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
// add event listening and dispatching to an object

function enableEventHandling(obj)
{

	obj.prototype.addEventListener = function(type, func, bubbles) {
		if(typeof(func) != 'function') return;
		if(this.eventListeners == undefined) this.eventListeners = new Array();
		for(var i=0;i<this.eventListeners.length;i++) {
			if(this.eventListeners[i].type == type && this.eventListeners[i].func == func)
				return;
		}
		this.eventListeners.push({type:type, func:func});
	};

	obj.prototype.removeEventListener = function(type, func, bubbles) {
		if(this.eventListeners == undefined) this.eventListeners = new Array();
		for(var i=0;i<this.eventListeners.length;i++) {
			if(this.eventListeners[i].type == type && this.eventListeners[i].func == func) {
				this.eventListeners.splice(i,1); //modified by TJ on 2/12/2013, first parameter is index and second
												 // parameter
																				 // is number of deletes
				return;
			}
		}
	};

   // scope of listener function is obj
    obj.prototype.dispatchEvent = function(type_, kvps_) {
        var eventListType = null,
        eventList = null,
        evt = null;

        if(!this.eventListeners) this.eventListeners = [];

        if(document.createEvent) {
            evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(type_, true, true, {});
        } else {
            evt = document.createEventObject();
            evt.type = type_;
        }

        eventList = this.eventListeners;

        evt.kvps = kvps_;
        evt.customTarget = this; //added by TJ on 2/6/2013, to prevent to lose event target, I put custom event
																 // property to holds current target

        for(var i = eventList.length-1; i >= 0; i--) {
            eventListType = eventList[i].hasOwnProperty('type') ? eventList[i].type : null;
            if(eventListType == type_){
                if(eventList[i].func) eventList[i].func.call(this, evt);
            }

        }
    };
}

// returns currentTarget for an event cross-browser
function getEventTarget(event) {
	event = event || window.event;

	//added by MS, needed for IE8
	if(window.attachEvent && event.customTarget) {
		return event.customTarget;
	}

	var obj = (event.currentTarget) ? event.currentTarget : (event.srcElement) ? event.srcElement : event.customTarget; //modified
																																																											// by TJ on 2/6/2013, if regular event target is null, use custom event target
	if((obj == null || obj == undefined) && window.event) obj = window.event.srcElement;
	if((obj == null || obj == undefined) && this != window) obj = this;
	return obj;
}

// stop event from propagating
function cancelEvent(event) {
	if(event) {
			if(event.stopPropagation){event.stopPropagation();}
			if(event.preventDefault){event.preventDefault();}
			event.cancelBubble = true;
			event.cancel = true;
			//event.returnValue = false;
	}
}

function stopPropagation(event) {
	if(event) {
			if(event.stopPropagation)
				event.stopPropagation();

			event.cancelBubble = true;
	}
}

////////////////////////////////////

function assignObjectId(obj) {
	if(obj == null || obj == undefined) return null;
	object_list.push(obj);
	//obj.id = 'object_'+object_list.length;
	return object_list.length;
}

function getObjectById(id) {
	//var id = parseInt(idstr.substring(7));
	if(id <= 0 || id > object_list.length) return null;
	return object_list[id-1];
}

function getObjectByRef(domElement, attrid) {
	if(domElement) {
		var objrefid = domElement.getAttribute(attrid);
		return getObjectById(objrefid);
	}
}

////////////////////
//Opacity function compatible with IE 8
//added by JCD 8-14-2012
function setElementOpacity(node, opacity) //opacity should be between 0 and 1
{
	if(opacity > 1){opacity = 1;}else if(opacity < 0){opacity = 0;}
	node.style.opacity = opacity;
	if(nohtml5) node.style.filter = 'alpha(opacity=' + Math.round(opacity * 100) + ')';
}

////////////////////

function getCookie(cname) {
  var cookies=document.cookie.split(";");
  for(var i=0;i<cookies.length;i++) {
    var name = cookies[i].substr(0,cookies[i].indexOf("="));
    name = name.replace(/^\s+|\s+$/g,"");
    if(name == cname) return cookies[i].substr(cookies[i].indexOf("=")+1);
	}
	return '';
}

////////////////////

function setCookie(cname,value,exdays) {
	var exdate = new Date();
	if (isNaN(exdays)) exdays = 365;
	exdate.setDate(exdate.getDate() + exdays);

	var domain = '.' + (/\babcmouse\b.*$/.exec(document.domain) || [''])[0];

  //old setCookie functions didn't have domain so now we have to make sure to cleanup old cookienames that don't specify domain.
  var limit = 5;
  while (getCookie(cname) != '' && limit > 0) {
    document.cookie = cname + "=" + encodeURI(value) + "; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    limit--;
  }

	document.cookie = cname + "=" + encodeURI(value) + "; expires=" + exdate.toUTCString() + "; domain=" + domain + "; path=/";
}

/**
 * Same as setCookie, but takes expiration seconds instead of days, and if
 * expiry is undefined then cookie will expire with session.
 */
function setCookie2(cname, value, expireSecs) {
	var expiry = '';
	if (typeof expireSecs !== 'undefined') {
		var exdate = new Date();
		exdate.setSeconds(exdate.getSeconds() + expireSecs);
		expiry = exdate.toUTCString();
	}

	var domain = '.' + (/\babcmouse\b.*$/.exec(document.domain) || [''])[0];

  var limit = 5;
  while (getCookie(cname) != '' && limit > 0) {
    document.cookie = cname + "=" + encodeURI(value) + "; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    limit--;
  }

	document.cookie = cname + "=" + encodeURI(value) + "; expires=" + expiry + "; domain=" + domain + "; path=/";
}

////////////////////
// Remove cookie by cookie name. 5/28/2014 RL
function removeCookie(cname) {
	document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
	var domain = '.' + (/\babcmouse\b.*$/.exec(document.domain) || [''])[0];
	document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=" + domain + "; path=/";
}

/////////////////////////////
function setNavCookie(value){
	var exdate = new Date();
	 var overideContinue = getCookie('overrideContinueTo');
	if(overideContinue != ''){
		value = overideContinue;
		setCookie('overrideContinueTo','',-1);
	}

	if (isUnity) {
		unityCall.clearCookie('continueTo');
	} else if(deviceType == 'ios'){
        //Delete cookie for IOS
        appCall('deleteCookieWithName:continueTo');
    }

	removeCookie('continueTo');// This is done because this cookie has been set to undefined and is causing users to
							   // load
														 // up a 404 page if the continue a coloring activity from a
														 // coloring activity.
	setCookie('continueTo',value,365);
}
/////////////////////////////////////////////////////////////////////
function comingSoon(cs_layout){
	showPopup('coming_soon.php?cs_layout='+cs_layout);
}
/////////////////////////////////////////////////////////////////////
function Authenticator() // constructor
{
	// used by popups/password
	// methods are defined when popup is created
}

enableEventHandling(Authenticator);

function YesNoPopup() // constructor
{
	// used by popups/password
	// methods are defined when popup is created
}

enableEventHandling(YesNoPopup);

function HelpTopics() // constructor
{
//made for helpTopic
}

enableEventHandling(HelpTopics);
////////////////////////////////////////////


// shows popup unless the cookie says pw was checked not too long ago
// added by jcd 2012-10-16
function pwVerifyPopup(url, divid)
{
	if(window.userIsParent != true && !(getCookie('pwcheck') == 'true'))
	{showPopup(url, divid);}
}


//////////////////////////////////////

// sets a cookie indicating the password has been verified.
// added by jcd
function setPwVerifyCookie()
{
	//set cookie indicating password has been verified
	var cookieLifeMinutes = 10;
	var now = new Date();
	var exdate = new Date();
	var domain = '.' + (/\babcmouse\b.*$/.exec(document.domain) || [''])[0];
	exdate.setTime(now.getTime() + 1000 * 60 * cookieLifeMinutes);
	removeCookie('pwcheck');
	document.cookie = 'pwcheck=true; expires=' + exdate.toUTCString() + '; domain=' + domain + ';path=/';
}

function setMyAccountAccessCookie(minutes)
{
	//set cookie indicating password has been verified - arsen
	var cookieLifeMinutes = minutes;
	var now = new Date();
	var exdate = new Date();
	exdate.setTime(now.getTime() + 1000 * 60 * cookieLifeMinutes);
	document.cookie = 'myaccountaccess=true; expires=' + exdate.toUTCString() + ';path=/';
}

/////////////////////////////////////////////////////////////////////////////
function buildRegSideBar(number){

document.getElementById('progress_panel').style.visibility='inherit';
switch(number){
	case 1: break;
	case 2:
		if (!isUnity) {
		appCall('mml:#green_dot_1.hidden=0');
		appCall('mml:#progress_step_2.alpha=1');
		}

		document.getElementById('green_1').style.visibility='inherit';
		document.getElementById('blue_2').style.visibility='inherit';
		document.getElementById('prog_back_2').style.visibility='inherit';
		document.getElementById('prog_2').style.opacity='1';
		document.getElementById('blue_span_2').style.opacity ='1';
	break;
	case 3:
		if (!isUnity) {
		appCall('mml:#green_dot_1.hidden=0');
		appCall('mml:#progress_step_2.alpha=1');
		appCall('mml:#green_dot_2.hidden=0');
		appCall('mml:#progress_step_3.alpha=1');
		}

		document.getElementById('green_1').style.visibility='inherit';
		document.getElementById('green_2').style.visibility='inherit';
		document.getElementById('blue_2').style.visibility='inherit';
		document.getElementById('blue_3').style.visibility='inherit';
		document.getElementById('prog_back_2').style.visibility='inherit';
		document.getElementById('prog_back_3').style.visibility='inherit';
		document.getElementById('prog_2').style.opacity='1';
		document.getElementById('prog_3').style.opacity='1';
		document.getElementById('blue_span_2').style.opacity ='1';
		document.getElementById('blue_span_3').style.opacity='1';
	break;
	case 4:
		if (!isUnity) {
		appCall('mml:#green_dot_1.hidden=0');
		appCall('mml:#progress_step_2.alpha=1');

		appCall('mml:#green_dot_2.hidden=0');
		appCall('mml:#progress_step_3.alpha=1');

		appCall('mml:#green_dot_3.hidden=0');
		appCall('mml:#progress_step_4.alpha=1');
		}


		document.getElementById('green_1').style.visibility='inherit';
		document.getElementById('green_2').style.visibility='inherit';
		document.getElementById('green_3').style.visibility='inherit';
		document.getElementById('blue_2').style.visibility='inherit';
		document.getElementById('blue_3').style.visibility='inherit';
		document.getElementById('blue_4').style.visibility='inherit';
		document.getElementById('prog_back_2').style.visibility='inherit';
		document.getElementById('prog_back_3').style.visibility='inherit';
		document.getElementById('prog_back_4').style.visibility='inherit';
		document.getElementById('prog_2').style.opacity='1';
		document.getElementById('prog_3').style.opacity='1';
		document.getElementById('prog_4').style.opacity='1';
		document.getElementById('blue_span_2').style.opacity ='1';
		document.getElementById('blue_span_3').style.opacity='1';
		document.getElementById('blue_span_4').style.opacity='1';
	break;
	case 5:
		if (!isUnity) {
		appCall('mml:#green_dot_1.hidden=0');
		appCall('mml:#progress_step_2.alpha=1');

		appCall('mml:#green_dot_2.hidden=0');
		appCall('mml:#progress_step_3.alpha=1');

		appCall('mml:#green_dot_3.hidden=0');
		appCall('mml:#progress_step_4.alpha=1');

		appCall('mml:#green_dot_4.hidden=1');
		}

		document.getElementById('green_1').style.visibility='inherit';
		document.getElementById('green_2').style.visibility='inherit';
		document.getElementById('green_3').style.visibility='inherit';
		document.getElementById('green_4').style.visibility='inherit';
		document.getElementById('blue_2').style.visibility='inherit';
		document.getElementById('blue_3').style.visibility='inherit';
		document.getElementById('blue_4').style.visibility='inherit';
		document.getElementById('prog_back_2').style.visibility='inherit';
		document.getElementById('prog_back_3').style.visibility='inherit';
		document.getElementById('prog_back_4').style.visibility='inherit';
		document.getElementById('prog_2').style.opacity='1';
		document.getElementById('prog_3').style.opacity='1';
		document.getElementById('prog_4').style.opacity='1';
		document.getElementById('blue_span_2').style.opacity ='1';
		document.getElementById('blue_span_3').style.opacity='1';
		document.getElementById('blue_span_4').style.opacity='1';
	break;
}

}

// Added by MS, this is needed for IE8
if(!Array.prototype.indexof) {
	Array.prototype.indexOf = function(obj, start) {
		 for (var i = (start || 0), j = this.length; i < j; i++) {
			 if (this[i] === obj) { return i; }
		 }
		 return -1;
	}
}

function track(tag, kvp, redirectUrl)
{
    var vars = {tag: tag, kvp: kvp};

	if (
		typeof digitalData != 'undefined' &&
		typeof digitalData.page != 'undefined' &&
		typeof digitalData.page.pageInfo != 'undefined' &&
		typeof digitalData.page.pageInfo.page_detail != 'undefined'
	) {
		vars.page_detail = digitalData.page.pageInfo.page_detail;
	}

    if(redirectUrl != null) {
		ajax('/xml/track.php', vars, function(){
				if(typeof(redirectUrl) == 'function') {
					redirectUrl.call();
				} else {
					location.href = redirectUrl;
				}
		});
	} else {
    	ajax('/xml/track.php', vars, function(){});
	}
}

function setFlashCookie(id, cookiename, cookievalue)
{
	var vars = new Object();

	if(id == undefined | id == 0 | cookiename == undefined |cookievalue == undefined )
		return;

	var key = id + "|~|" + cookiename;
	vars[key] = cookievalue;

	ajax("/xml/cookie_update.php", vars, function(){});
}

//added by TJ on 8/16/2013, if your activity uses bad word filter, be sure call this function when page is loaded to
// grab data.
function BadWordFilter(_string, _exact_match)
{
	if(_exact_match == undefined) _exact_match = true;

	if(badword_list.length == 0)
	{
		ajax('/xml/badwordslist.php', '', function(_result){
			for(var i = 0; i < _result.words.length; i++)
			{
				str = '';
				for(var j = 0; j < _result.words[i].length; j+=2)
				{
					str +=  String.fromCharCode(parseInt(_result.words[i].substr(j, 2), 16));
				}
				badword_list.push(str);
			}
		});
		return undefined;
	}
	else if(_exact_match) //quick search mode, check string matches exactly with one of bad word lists.
	{
		if(badword_list.indexOf(_string.toLowerCase()) != -1) return true;
		return false;
	}
	else //if exact match option is set to false, it will go through each list to check if string contains badword
	{
		for(var i = 0; i < badword_list.length; i++)
		{
			if(_string.toLowerCase().indexOf(badword_list[i]) != -1) return true;
		}
		return false;
	}
}

function isEmpty(obj) {

    // null and undefined are empty
    if (obj == null) return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key))    return false;
    }

    // Doesn't handle toString and toValue enumeration bugs in IE < 9
    return true;
}
/////////////////////////////////
//Added By MG 11/25/13 - Stops a div from being selected on doulbe click in and improve performance in IE9 & IE10
function stopDragEvent(div)
{
	var divelement = document.getElementById(div);

	for( var i=0; i< divelement.children.length; i++)
	{

		divelement.children[i].setAttribute('draggable', false);
		divelement.children[i].setAttribute('unselectable', 'on');

		if(divelement.children[i].tagName == 'DIV')
		{
			stopDragEvent(divelement.children[i].id);

		}

	}
}

/////////////////////////////////////
//Added by MG 11/25/13 - Used to detect if mousevent is being called by the Left button click
//Returns Boolean
function detectLeftButton(e)
{
	e = e || window.event;

	var gamebutton;
	if (e.which == null)
    {
        gamebutton = (e.button < 2) ? 'left' :
            ((e.button == 4) ? 'middle' : 'right');
    }
    else
    {
        gamebutton = (e.which < 2) ? 'left' :
            ((e.which == 2) ? 'middle' : 'right');
    }

	if(gamebutton == 'left')
	{
		return true;
	}
	else
	{
		return false;
	}

}




// Arsen Ghazaryan - add ".is-scrollable" to any html element to enable scrolling/touchmove event
function touchMove(event) {
	//alert('test');
	if(! hasClass(event.target.id, 'is-scrollable')) {
		event.preventDefault();
	}
	else {
		return true;
	}
}

/**
 * Shorter DOM functions
 */
function hasClass(id, name){
    var el = typeof id == 'string' ? document.getElementById(id) : id;

    if (!el){
        return;
    }

    return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
};

function addClass(id, name){
	var el = typeof id == 'string' ? document.getElementById(id) : id;
	if (el == null)
		return;

	if (!hasClass(el, name)) { el.className += (el.className ? ' ' : '') +name; }
};


function removeClass(id, name){
	var el = typeof id == 'string' ? document.getElementById(id) : id;
	if (el == null)
		return;

	if (hasClass(el, name)) {
		el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
	}
};
/////////////////////////////////////
//add by TM 12/20/13 to use when listening for the touchcancel event. to fix touch movement issues on android
function touchCancelPreventDefault(event)
{
	event.preventDefault();
}

// for activity display instruction popup. RL 7/7/2014 - modded by Len - 8/27/14
function checkInstructions(cid) {
	var vars = {action:'hasdesc',cid:cid};
	ajax('/html5/xml/curriculum_description.php', vars, function(hasDesc){
		if(hasDesc && !(uinfo.settings.displayInstructions == 'no')){
				showPopup('instructions.php?cid='+cid);
		}else{
			var snd = SoundControl.addContentSound(IMGHOST+'/snd/color/page_audio/default_audio_'+cid+'.mp3');
				snd.play();
		}
	});
}

//////////////////////////////////
function keys(object) {
    var results = [];
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        results.push(property);
      }
    }
    return results;
}

/////////////////////////////////////

//added by marc martinez - 2014/02/20
//allows control of ticket machine screen outside of gametracker instance.


function hideTicketMachine(){
	try{
		document.getElementById('tm_morebtn').style.pointerEvents = 'none';
		document.getElementById('tm_playagainbtn').style.pointerEvents = 'none';
		document.getElementById('tm_playagainlbl').style.pointerEvents = 'none';
		document.getElementById('tm_favbtn').style.pointerEvents = 'none';
		document.getElementById('tm_contbtn').style.pointerEvents = 'none';
		document.getElementById('tm_contlbl').style.pointerEvents = 'none';
		document.getElementById('tm_shoppingbtn').style.pointerEvents = 'none';
		document.getElementById('tm_shoppinglbl').style.pointerEvents = 'none';
		document.getElementById('tm_learningPathbtn').style.pointerEvents = 'none';
		document.getElementById('tm_learningPathlbl').style.pointerEvents = 'none';

		if(document.getElementById('ticket_machine_top')){document.getElementById('ticket_machine_top').style.left = '-135px';}
		if(document.getElementById('ticket_machine_bottom')){document.getElementById('ticket_machine_bottom').style.left = '-135px';}
		if(document.getElementById('ticket_machine_mask')){document.getElementById('ticket_machine_mask').style.width = '0px';}
		if(document.getElementById('ticket_number_holder')){document.getElementById('ticket_number_holder').style.display = 'block';}
		if(document.getElementById('ticket_navigation')){document.getElementById('ticket_navigation').style.visibility = 'hidden'; document.getElementById('ticket_navigation').style.display= 'none';}
	}catch(a){}
}
/////////////////////////////////////

//added by ET - 2014/07/24
//allows control of tracking of more games on the ticket machine

function dtmMore(){
	dtmVars('link name', 'tickets more');
	dtmTrack('link click');
}

function dtmContinue(){
	dtmVars('link name', 'tickets continue');
	dtmTrack('link click');
}

function dtmPlayAgain(){
	dtmVars('link name', 'tickets play again');
	dtmTrack('link click');
}



/////////////////////////////Ticket Machine Tracking for More value events
function ticketMachineMoreBooks(){
	dtmMore(); loadPage('/html5/abc/bookshelf'); hideTicketMachine();
}

function ticketMachineMoreSongs(){
	dtmMore(); loadPage('/html5/abc/musicshelf'); hideTicketMachine();
}

function ticketMachineMoreArt(){
	dtmMore(); loadPage('/html5/abc/colors'); hideTicketMachine();
}

function ticketMachineMorePuzzles(){
	dtmMore(); loadPage('/html5/abc/puzzles'); hideTicketMachine();
}

function ticketMachineMoreBasics(){
	dtmMore();loadPage('/html5/abc/basics'); hideTicketMachine();
}

function ticketMachineMoreGames(){
	dtmMore();loadPage('/html5/abc/games'); hideTicketMachine();
}

function ticketMachineMorePrints(){
	dtmMore(); loadPage('/html5/abc/print'); hideTicketMachine();
}
//////// Child Setiings

function dtmGeneralSettings(){
	dtmVars('link name','child settings general settings');
	dtmTrack('link click');
}
//////////////////////////////////////////
//Fix for IE, IE doesn't have a console object

if(typeof(console) == 'undefined') {
	var console = {};
	console.log = function() {
		//fix for IE
	};
}






/**
 * Disable site shell buttons by placing semi transparent cover on top of them.
 * @param string template 		Site rotation like "round10"
 * @author Arsen Ghazaryan <arsen.ghazaryan@aofl.com>
 */
function disableShellButtons(template) {
	var coverContainer = '';
	switch (template) {
		case 'round10':
			coverContainer = 'panel-left';
			break;
		// case 'oldHtml5':
		// 	coverContainer = 'panel-left';
		// 	break;
	}

	if (coverContainer != '') {
		domCoverContainer = document.createElement('DIV');
		domCoverContainer.id = 'panel-left-cover-mask';
		domCoverContainer.style.position = 'absolute';
		domCoverContainer.onclick = doNothing;
		domCoverContainer.style.top = '0px';
		domCoverContainer.style.left = '0px';
		domCoverContainer.style.width = '100%';
		domCoverContainer.style.height = '100%';
		domCoverContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
		document.getElementById(coverContainer).appendChild(domCoverContainer);
	}
}
/**
 * Remove site shell buttons cover. Reference: disableShellButtons(template)
 * @param string template 		Site rotation like "round10"
 * @author Robert Lai <robert.lai@aofl.com>
 */
function enableShellButtons(template) {
	var coverContainer = '';
	switch (template) {
		case 'round10':
			coverContainer = 'panel-left';
			break;
		// case 'oldHtml5':
		// 	coverContainer = 'panel-left';
		// 	break;
	}

	if (coverContainer != '') {
		domCoverContainer = document.getElementById('panel-left-cover-mask');
		if (domCoverContainer) {
			domCoverContainer.parentNode.removeChild(domCoverContainer);
		}
	}
}
//---------------------------------------------------------------------------------->



/**
 * ApiService
 * @class
 * @classdesc Calls the AbcMouseWebServiceLayer api. Acts as a static class and doesn't need to be instantiated
 * @author Brandon Turner
 * @version 0.1
 */
var ApiService =
{
	/** @member {Object} */
	endpoints: {
	},

	/**
	 * @type {boolean}
	 */
	retrieved_endpoints:false,

	/**
	 * @type {boolean}
	 * Set this to true to enable debugging messages
	 */

	DEBUG:false,

	/** @constant
	  * @type {string}
	  * @default
	  */
	ENUMERATE_ENDPOINT:'public_html/bookPlayer/apis/abc/0.1/json/Resource/Enumerate/init',

	api_domains: {},

	// check for environment for debug flag

	/**
	  * Makes an Ajax call to the Enumerate Resource to return endpoints in AbcMouseWebServiceLayer
	  * @method
	  *	@memberof ApiService
	  * @todo How do I do this without setting async to false
	  */
	setEndpoints:function()
	{
		try {
			console.log('++++++++++setEndpoints: ' + ApiService.ENUMERATE_ENDPOINT);
			ajax(ApiService.ENUMERATE_ENDPOINT,'',ApiService.constructEndpoint,ApiService,false);
			console.log('----------setEndpoints: ' + ApiService.ENUMERATE_ENDPOINT);
		} catch(e) {
			if (ApiService.DEBUG) {
				console.log('Error making AJAX call to set API endpoints');
				console.log('Error message: ' + e.message)
			}
		}
	},

	/**
	  * Callback function that takes the response(data), parses it as JSON, and populates the endpoint object
	  * with key value pairs mapping endpoint_name to endpoint_url
	  * @method
	  *	@memberof ApiService
	  * @param {string} data Ajax Response from httpRequest in setEndpoints function
	  */
	constructEndpoint:function(json)
	{
		if (json.hasOwnProperty('success') && (json.success == 'TRUE' )) {
			// Sets the api endpoints
      ApiService.api_domains = json.payload.api_domains;
			for (var endpoint in json.payload.api_endpoints) {
				ApiService.endpoints[endpoint] = 'public_html/bookPlayer/html5/' + json.payload.api_domains.api_root_url.slice(json.payload.api_domains.api_root_url.indexOf('apis'))
												+ json.payload.api_endpoints[endpoint];
			}
		}
		ApiService.retrieved_endpoints = true;
	},

	/**
	  * Calls the AbcMouseWebServiceLayer. If endpoint_String(optional) is not defined, get's all endpoints and defaults
	  * to the store_get endpoint
	  * @method
	  *	@memberof ApiService
	  * @param {string} endpoint_string The name of the api endpoint that you want to call.
	  * @param {object} params (optional) Post variables object where arguments -> Name of API Catalog
	  * @param {function} callback Callback function to handle the response from the API call
	  */
	call:function(endpoint_string, params, callback)
	{
		endpoint_string = endpoint_string || undefined;

        if (ApiService.retrieved_endpoints == false) {
        	ApiService.setEndpoints();
        }

		if (ApiService.endpoints.hasOwnProperty(endpoint_string)) {
			try {
				ajax(ApiService.endpoints[endpoint_string], params, callback,ApiService, true);
			} catch(e) {
				if (ApiService.DEBUG) {
					console.log('Error making AJAX call to API endpoints');
					console.log('Error message: ' + e.message);
				}
			}
		} else {
			if (ApiService.DEBUG) {
				console.log('Error: endpoint string is incorrect or has not been set');
			}
		}
	}
}

//////////////////////////////////////////
// File Download function.
// Added 4/30/2014 Robert Lai
//
// It's used to download file by passing the file path to this function
// It used '/html5/abc/file_download.php' together to perform the action
//
// sUrl:	File Path to the downloading file
//			The downloading file is set to the IMGHOST directory
//			eg: 'html5/popups/library_resources/library_printoutflyer.pdf'
// Example:
//			downloadFile('html5/popups/library_resources/library_printoutflyer.pdf');
//////////////////////////////////////////
function downloadFile(sUrl) {
	window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
	window.downloadFile.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	window.downloadFile.isIE = navigator.userAgent.toLowerCase().indexOf('ie') > -1;

	// iOS devices do not support downloading. We have to inform user about this.
	if (/(iP)/g.test(navigator.userAgent)) {
		alert('Your device does not support files downloading. Please try again in desktop browser.');
		return false;
	}

	// If in Chrome or FireFox - download via virtual link click
	/*
	if (window.downloadFile.isChrome) {
		// Creating new link node.
		var link = document.createElement('a');
		link.href = sUrl;

		if (link.download !== undefined) {
			// Set HTML5 download attribute. This will prevent file from opening if supported.
			var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
			link.download = fileName;
		}

		// Dispatching click event.
		if (document.createEvent) {
			var e = document.createEvent('MouseEvents');
			e.initEvent('click', true, true);
			link.dispatchEvent(e);
			return true;
		}
	} else {
	*/
		// Force file download (whether supported by server).
		sUrl = '/html5/abc/file_download?fileUrl='+sUrl;
		window.open(sUrl, '_self');
		return true;
	//}
}

/*
Wrapping this in a conditional to check for the "Element" object works on all Browesers, including IE 9-11
If this is not wrapped in the conditional, IE fails
*/
if(window.Element){
    Element.prototype.addClass = function(classname) {
        if (this.className.search(classname) != -1)
            return;
        else {
            this.className = this.className+' '+classname;
        }
    }

    Element.prototype.removeClass = function(classname) {
        if (this.className.search(classname) == -1)
            return;
        else {
            this.className = this.className.replace( classname , '' ).replace(/\s{2,}/g, ' ');
        }
    }

    Element.prototype.hasClass = function(classname){
        return (this.className.search(classname) != -1);
    };
}

function dtmTrack(eventName){
	if(typeof Analytics != 'undefined' && eventName === "link click" && window.linkName)
		Analytics.trackClick(window.linkName);
}

function dtmArgs(key1, key2, key3, value){
	if(typeof digitalData != 'undefined')
	{
		if(typeof digitalData[key1][key2] != 'undefined'){
			value = value.toString().replace( /([A-Z])/g, " $1" ).toLowerCase();
			digitalData[key1][key2][key3] = value;
			dtmTrace('DTM Tracking: Property Set Success "' + key1 + '.' + key2 + '.' + key3 +': ' + value + '"');
		}
		else{
			dtmTrace('DTM Tracking: Property Set Failure "' + key1 + '.' + key2 + '.' + key3 +'"');
		}
	}
}
function dtmTransaction(data){
	if(typeof digitalData != 'undefined')
	{
		if(typeof digitalData['transaction'] != 'undefined'){
			//value = value.toString().replace( /([A-Z])/g, " $1" ).toLowerCase();
			digitalData['transactionID'] = data['id'];
			items = data.items;
			for(i=0;i<items.length;i++){
				item = items[i];
				digitalData['transaction'].push(item);
				dtmTrace('DTM Transaction: Property Set Success "' + item + '"');
			}

		}
		else{
			dtmTrace('DTM Transaction: Property Set Failure "' + id + '.' + key2 + '.' + key3 +'"');
		}
	}
}
function dtmVars(key, value){
			value = value.toString().replace( /([A-Z])/g, " $1" ).toLowerCase();
	key = camelize(key);
	window[key] = value;
	}

function camelize(str) {
	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
		if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
		return index == 0 ? match.toLowerCase() : match.toUpperCase();
	});
}

function dtmTrace(text){
	dtmTraceCookie = (typeof dtmTraceCookie != 'undefined') ? dtmTraceCookie : getCookie('dtmTrace');
	if(dtmTraceCookie == '1'){
		if(typeof USINGAPP != 'undefined' && USINGAPP){
			trace(text);
		}
		else{
			console.log(text);
		}
	}
}

// Class for Handling AJAX Calls
var httpRequest = function(url,params,method,callback,async)
{
	this.id = "id"+Math.round(Math.random()*10000000000);
	httpRequest.instance = new Array();
	httpRequest.instance[this.id] = this;
	this.async = async;
	this.params = params;
	this.getHTTPObject();
	this.url = url;
	this.method = method.toUpperCase();
	this.callback = callback;
	this.send();
}
httpRequest.prototype =
{
	init:function()
	{
		if(this.method!='POST' || this.method!='GET')
			this.method = 'POST';
	},
	getHTTPObject:function()
	{
		this.xmlhttp = false;

	    if (window.ActiveXObject)
		{
			try
			{
				req = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch (e)
			{
				req = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
		if (!this.xmlhttp && typeof XMLHttpRequest != 'undefined')
		{
			try
			{
				this.xmlhttp = new XMLHttpRequest();
			}
			catch (e)
		    {
		        this.xmlhttp = false;
		    }
		}
	},
	setParams : function()
	{
		if(this.params==null || this.params==undefined)
			return null;
		var aParams = new Array();
		for(a in this.params)
		{
			aParams.push(a+"="+this.params[a]);
		}
		var szParams = aParams.join('&');
		return szParams;
	},
	setEvents : function()
	{
		var id = this.id;
		if (this.xmlhttp)
		{
			this.xmlhttp.onreadystatechange=function()
			{
				if (this.xmlhttp.readyState == 4)
				{
					if (this.xmlhttp.status && this.xmlhttp.status == 200)
					{
						this.callback(this.xmlhttp.responseText);
					}
			    }
			}.bind(this);
		}
	},
	send : function()
	{
		var opener = '';
		var sender = null;
		switch(this.method)
		{
			case 'POST':
				opener = this.url;
				sender = this.setParams();
				break;
			case 'GET':
				var p = this.setParams();
				(p==null)? p = '' : p = "?"+p;
				opener = this.url+p;
				break;
			default:
				break;
		}
		if(this.async && null!=this.callback)
			this.setEvents();
		this.xmlhttp.open(this.method,opener,this.async);

		this.xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		if(this.xmlhttp.overrideMimeType)
			this.xmlhttp.overrideMimeType('text/xml; charset=UTF-8');
		this.xmlhttp.send(sender);
		if(!this.async)
			this.callback(this.xmlhttp.responseText);
	}
};

/* Added to replace the Array.prototype.forEach2 method.
 * We should never add custom members to a naitive JavaScript
 * object within a file that is used globally.
 * Doing do adds that custom member to all instances of the object and
 * could affect everyones work. Added 03/27/2015 Mike Malone.
*/
var List = {
    getItems: function (list, callback) {
        var i, len;
        if(!list || list === ""){
            throw new Error("You must pass an array to this method and add a callback function to get the value if the list indexes.");
            return;
        }

        len = list.length;
        //Itterates through list and passes the value of the indexes to the callback
        if(typeof callback === "function"){
            for(i = 0; i < len; i++){
                callback(list[i], i);
            }
        }
    }
};

// Check the object is empty or not
function isEmptyObject(obj) {
	// null and undefined are "empty"
	if (obj == null)
		return true;

	// Otherwise, does it have any properties of its own?
	// Note that this doesn't handle
	// toString and valueOf enumeration bugs in IE < 9
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}
	return true;
}

//////////////////////////////////////////////////////////////
//USED BY ANDROID
//////////////////////////////////////////////////////////////
function injectJSDebugger(sandbox)
{
	// Added this live test so that this code would not process if on the live server.  Clark 10.20.14
	if(document.location.href.indexOf('www.') != -1) return;

	if(sandbox == "" || sandbox == null){
		sandbox = "#" + location.origin.split('/')[2].split('.')[0];
	}
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;
	script.src = "http://test.abcmouse.com:8080/target/target-script-min.js"+sandbox;
	document.getElementsByTagName("head")[0].appendChild(script);
}

function updateMediaPlayer(uniqueID, methodName) {
    if(SoundControl != null){
        for(var i = 0; i < SoundControl.allSounds.length; i++) {
            var snd = SoundControl.allSounds[i], sndId = SoundControl.allSounds[i].id.toString();
            if(sndId === uniqueID) {
                try {
                    if (typeof snd[methodName] === "function") {
                        snd[methodName]();
                    }
                } catch(error){
                    console.log("MediaControl.updateMediaPlayer - Error! " + uniqueID + " error at method: " + methodName);
                }
                break;
            }
        }
    }
}

function toWords(numVal) {
	var lrgNumTxt = ['','Thousand','Million', 'Billion','Trillion'];
    var simpleNumTxt = [ "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine" ];
    var teenNumTxt = [ "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen" ];
    var tensNumTxt = [ "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety" ];

    numVal = numVal.toString();
    numVal = numVal.replace(/[\, ]/g, "");
    if (numVal != parseFloat(numVal)) return numVal;   //Not a number

    var numLength = numVal.indexOf(".");
    if (numLength == -1) numLength = numVal.length;
    if (numLength > 15) return numVal;		//Number too big not supported

    var digitAr = numVal.split("");
    var textNumber = "";
    var h = 0;
    for (var i = 0; i < numLength; i++) {
        if ((numLength - i) % 3 == 2) {
            if ("1" == digitAr[i]) {
                textNumber += teenNumTxt[Number(digitAr[i + 1])] + " ";
                i++;
                h = 1;
            } else if (0 != digitAr[i]) {
                textNumber += tensNumTxt[digitAr[i] - 2] + " ";
                h = 1;
            }
        } else if (0 != digitAr[i]) {
            textNumber += simpleNumTxt[digitAr[i]] + " ";
            if ((numLength - i) % 3 == 0) textNumber += "hundred ";
            h = 1;
        }
        if ((numLength - i) % 3 == 1) {
            if (h) textNumber += lrgNumTxt[(numLength - i - 1) / 3] + " ";
            h = 0;
        }
    }
    if (numLength != numVal.length) {
        var j = numVal.length;
        textNumber += "point ";
        for (var i = numLength + 1; i < j; i++) textNumber += simpleNumTxt[digitAr[i]] + " ";
    }
    return textNumber.replace(/\s+/g, " ");
}

//////////////////////////////////////////////////////////////
// This is used to disable the Control key combination
function disableCtrlKeyCombination(e) {
	// list all CTRL + key combinations you want to disable
	var forbiddenKeys = new Array('a', 'n', 'c', 'x', 'j' , 'w');
	var key;
	var isCtrl;

	// To identify the Ctrl Key has been clicked
	if (window.event) {
		key = window.event.keyCode;     //IE
		if (window.event.ctrlKey) {
			isCtrl = true;
		} else {
			isCtrl = false;
		}
	} else {
		key = e.which;     //firefox
		if (e.ctrlKey) {
			isCtrl = true;
		} else {
			isCtrl = false;
		}
	}

	// if ctrl is pressed, check if other key is in forbidenKeys array
	if(isCtrl) {
		for (i=0; i<forbiddenKeys.length; i++) {
			//case-insensitive comparation
			if (forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase()) {
				//alert('Key combination CTRL + '+String.fromCharCode(key) +' has been disabled.');
				return false;
			}
		}
	}
	return true;
}

//////////////////////////////////////////////////////////////
//USED BY MOBILE DEVICES
//////////////////////////////////////////////////////////////

function triggerTicketMachine()
{
	// Once an event has completed, the mobile device calls this funtion to trigger the ticket machine.
	// Android ticket machine is native (so doesn't need to use this callback)
	if(deviceType == 'ios'){
		//console.log('triggerTicketMachine');
		showTicketMachine();
	}
}

function recordingWidgetComplete(brand)
{
	// Once the recording widget is finished recording and the user clicks 'save', it calls this function to send the
	// completed file to server
	if(deviceType == 'android'){

	}else if(deviceType == 'ios'){

	}else{
		//do nothing
	}
}

function updateRewards(type,amount)
{
	// called to update the number of tickets, stars or wall cards
	if(deviceType == 'android'){

	}else if(deviceType == 'ios'){

	}else{
		//do nothing
	}
}

//ANDROID DISPATCH EVENT
function androidDispatchEvent (eventType) {
    if (!isAndroid) {
        return;
    }else {
        var evt;

        if (document.createEvent) {
            evt = document.createEvent('Event');
            evt.initEvent(eventType, true, true);
        }else {
            evt = document.createEventObject();
            evt.type = eventType;
            document.fireEvent(eventType, evt);
        }

        if (typeof document.dispatchEvent !== 'function') {
            document.dispatchEvent = function(e){
                var F = function(){
                    //Empty consturctor
                };
                return new F();
            };
        }
        document.dispatchEvent(evt);
    }
}

//////////////////////////////////////////////////////////////
//END MOBILE DEVICE SPECIFIC CODE
//////////////////////////////////////////////////////////////

/*
 * SWRVE
 */
var SWRVE = {
    track: function (type, payload) {}
};

function aoflLoadPolyfills() {
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs   = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP    = function() {},
          fBound  = function() {
            return fToBind.apply(this instanceof fNOP
                  ? this
                  : oThis,
                  aArgs.concat(Array.prototype.slice.call(arguments)));
          };

      if (this.prototype) {
        // Function.prototype doesn't have a prototype property
        fNOP.prototype = this.prototype;
            }
      fBound.prototype = new fNOP();
      return fBound;
    };
        }
    }

// [Caigoy,033017,QA-15911] some areas double-load the script, so code below would cause infinite loop
// QA-4615 (fix for back history not to leave current domain, Andrew Ryabinin, 13.10.2015)
var historyOld = historyOld || history.go;
history.go = function() {
    var direction = arguments[0];
    var protocol = window.location.protocol;
    var hostname = window.location.hostname;
    if (direction < 0 && document.referrer === '') {
        window.location.href = '/'
    } else if (direction < 0
    	&& window.location.href === protocol + '//' + hostname + '/html5'
    	&& document.referrer === protocol + '//' + hostname + '/home') {
        // do nothing
    } else {
        historyOld.apply(this, arguments);
    }
};

//////////////////////////////////////////////////////////////////////////////////
function MediaControl() {
    this.rollover_volume = 1;
    this.background_volume = 1;
    this.effect_volume = 0.7; //added by TJ on 4/1/2013
    this.content_volume = 1;
    this.ticket_volume = 1;
    this.master_volume = 1;
    this.rollover_delay = .4; //default is 0.4 as of 7/2/13
    this.activeSounds = new Array();
    this.allSounds = new Array(); //added by TJ on 8/6/2013, holding all sounds.
    this.rollovertimer = 0;
    this.rolloverPlayer;
}

MediaControl.prototype.getRolloverVolume = function() {
    return this.rollover_volume;
};

MediaControl.prototype.setRolloverVolume = function(vol) {
    vol = Math.max(0, Math.min(vol, 1));
    if(!isNaN(vol)) this.rollover_volume = vol;
    this.updateAllVolumes();
};

MediaControl.prototype.getBackgroundVolume = function() {
    return this.background_volume;
};

MediaControl.prototype.setBackgroundVolume = function(vol) {
    vol = Math.max(0, Math.min(vol, 1));
    if(!isNaN(vol)) this.background_volume = vol;
    this.updateAllVolumes();
};

//added by TJ on 4/1/2013
MediaControl.prototype.getEffectVolume = function() {
    return this.effect_volume;
};
MediaControl.prototype.setEffectVolume = function(vol) {
    vol = Math.max(0, Math.min(vol, 1));
    if(!isNaN(vol)) this.effect_volume = vol;
    this.updateAllVolumes();
};

MediaControl.prototype.getContentVolume = function() {
    return this.content_volume;
};

MediaControl.prototype.setContentVolume = function(vol) {
    vol = Math.max(0, Math.min(vol, 1));
    if(!isNaN(vol)) this.content_volume = vol;
    this.updateAllVolumes();
};

MediaControl.prototype.setTicketVolume = function(vol) {
    vol = Math.max(0, Math.min(vol, 1));
    if(!isNaN(vol)) this.content_volume = vol;
    this.updateAllVolumes();
};

MediaControl.prototype.getTicketVolume = function(vol) {
    return this.ticket_volume;
};

MediaControl.prototype.getMasterVolume = function() {
    return this.master_volume;
};

MediaControl.prototype.setMasterVolume = function(vol) {
    vol = Math.max(0, Math.min(vol, 1));
    //vol = 1; //modified by MG on 11/05/14 to override old account settings for volume
    if(!isNaN(vol)) this.master_volume = vol;
    this.updateAllVolumes();
};

MediaControl.prototype.updateAllVolumes = function() {
    //modified by TJ on 8/6/2013, run for loop backward
    for(var i=this.activeSounds.length - 1;i>=0;i--) {
        var snd = this.activeSounds[i];

        //added by TJ on 8/6/2013, remove sound that not playing from active sounds.
        if(!snd || snd.playing == false)
        {
            this.activeSounds.splice(i, 1);
            continue;
        }

        if(snd.type == 'content') snd.setVolume(this.content_volume*this.master_volume);
        if(snd.type == 'background') snd.setVolume(this.background_volume*this.master_volume);
        if(snd.type == 'rollover') snd.setVolume(this.rollover_volume*this.master_volume);
        if(snd.type == 'button') snd.setVolume(this.rollover_volume*this.master_volume);
        if(snd.type == 'effect') snd.setVolume(this.effect_volume*this.master_volume); //added by  TJ on 4/1/2013
        if(snd.type == 'ticket') snd.setVolume(this.ticket_volume*this.master_volume);
    }
};

MediaControl.prototype.getRolloverDelay = function() {
    return this.rollover_delay;
}

MediaControl.prototype.setRolloverDelay = function(vol) {
    vol = Math.max(.4, Math.min(vol, 2));
    if(!isNaN(vol)) this.rollover_delay = vol;
}

MediaControl.prototype.buttonRollover = function(btn, url) {
    if(typeof(btn) == 'string') btn = document.getElementById(btn);
    if(btn) {
        if(url) btn.setAttribute('rolloverSound', url);
        if(document.createTouch) {
            //MAG 04/11/2014: Added this condition in order to fix a bug with chrome on touch screens (desktop/laptops)
            if(navigator.userAgent.indexOf('Chrome') != -1) {
                addListener(btn, 'mouseover', this.rolloverStart);
            } else {
                addListener(btn, 'touchstart', this.rolloverStart);
            }
        }
        else {addListener(btn, 'mouseover', this.rolloverStart);}
    }
}


MediaControl.prototype.removeButtonRollover = function(btn) {
    if(btn) {
        if(typeof(btn) == 'string') btn = document.getElementById(btn);
        btn.removeAttribute('rolloverSound');
        removeListener(btn, 'mouseover', this.rolloverStart);
        removeListener(btn, 'touchstart', this.rolloverStart);
    }
}


MediaControl.prototype.rolloverStart = function(event) {
    var btn = getEventTarget(event);

    clearInterval(SoundControl.rollovertimer);
    var rolloverSound = btn.getAttribute('rolloverSound');

    SoundControl.rollovertimer = setTimeout("SoundControl.playRollover('"+rolloverSound+"','"+btn.id+"')", SoundControl.rollover_delay*1000);

    if(document.createTouch)
    {
        addListener(btn, 'touchend', SoundControl.rolloverCancel);
        addListener(btn, 'touchmove', SoundControl.rolloverReset);
    }
    else
    {
        addListener(btn, 'mouseout', SoundControl.rolloverCancel);
        addListener(btn, 'mousemove', SoundControl.rolloverReset);
    }
}

MediaControl.prototype.rolloverCancel = function(event) {
    var btn = getEventTarget(event);

    clearTimeout(SoundControl.rollovertimer);
    removeListener(btn, 'mouseout', SoundControl.rolloverCancel);
    removeListener(btn, 'touchend', SoundControl.rolloverCancel);
    removeListener(btn, 'mousemove', SoundControl.rolloverReset);
    removeListener(btn, 'touchmove', SoundControl.rolloverReset);
}

MediaControl.prototype.rolloverReset = function(event) {
    var btn = getEventTarget(event);

    clearInterval(SoundControl.rollovertimer);
    var rolloverSound = btn.getAttribute('rolloverSound');
    SoundControl.rollovertimer = setTimeout("SoundControl.playRollover('"+rolloverSound+"','"+btn.id+"')", SoundControl.rollover_delay*1000);
}

MediaControl.prototype.playRollover = function(url, btnid) {
    var playRollOver = true;
    for(var i = SoundControl.activeSounds.length - 1; i >= 0; i--)
    {
        if(!SoundControl.activeSounds[i] || SoundControl.activeSounds[i].playing == false)
        {
            SoundControl.activeSounds.splice(i, 1);
            continue;

        }
        if(SoundControl.activeSounds[i].type == 'content'  ) {
            playRollOver = false;
        }
    }
    if(playRollOver){
        SoundControl.rolloverPlayer = SoundControl.addRolloverSound(url);

        addListener(SoundControl.rolloverPlayer,'loaded',function(){
            if (window.pathIframe && window.pathIframe.contentWindow) {
                pathIframe.contentWindow.postMessage(JSON.stringify({
                    action: 'cancelRolloverSounds'
                }), pathIframe.src);
            }
            this.play();
        });
        //if(SoundControl.rolloverPlayer) SoundControl.rolloverPlayer.play();
        var btn = document.getElementById(btnid);

        if(btn) {
            removeListener(btn, 'mousemove', SoundControl.rolloverReset);
            removeListener(btn, 'touchmove', SoundControl.rolloverReset);
        }
    }
}

MediaControl.prototype.stopAllSounds = function(event) {
    // added by EF as test for Ticket Counting page 09-23-2013
    for(i=this.allSounds.length-1;i>=0;i--) {
        var snd = this.allSounds[i];
        if (snd) snd.stop();
    }
}

//added by TJ on 8/23/2013, stop specific sounds, accept array or string
MediaControl.prototype.stopSounds = function(target)
{
    //if you don't pass anything, it will stop all sounds.
    if(!target)
    {
        this.stopAllSound();
        return;
    }

    //you can pass array of sound type to stop those specific sounds
    if(target.constructor === Array)
    {
        for(var i = this.allSounds.length - 1; i >= 0; i--)
        {
            if(target.indexOf(this.allSounds[i].type) != -1)
                this.allSounds[i].stop();
        }
    }
    else if(target.constructor === String)//or you can pass just one type of sound
    {
        for(var i = this.allSounds.length - 1; i >= 0; i--)
        {
            if(this.allSounds[i].type == target)
                this.allSounds[i].stop();
        }
    }
}

MediaControl.prototype.stopAndRemoveSounds = function (){
    //modified by TJ on 7/19/2013
    for(var i=this.activeSounds.length-1;i>=0;i--) {
        var snd = this.activeSounds[i];
        if(snd.playing)
            snd.stop();
    }

    // added by EF as test for Ticket Counting page 09-23-2013
    for(i=this.allSounds.length-1;i>=0;i--) {
        var snd = this.allSounds[i];
        snd.stop();
    }
    this.activeSounds = [];
    this.allSounds = [];

    try{ appCall('flushCollection'); }catch(a){}
}


MediaControl.prototype.stopAllSound = function() {
    //modified by TJ on 7/8/2013, since on stop() it removes itself from activeSounds, count for loop backward.
    for(var i = this.allSounds.length - 1;i >= 0;i--) {
        var snd = this.allSounds[i];
        if(snd) snd.stop();
    }
}

MediaControl.prototype.pauseAllSound = function() {
    //modified by TJ on 7/19/2013
    for(var i=this.activeSounds.length-1;i>=0;i--) {
        var snd = this.activeSounds[i];
        if(snd && snd.playing)
            snd.pause();
    }
}
MediaControl.prototype.addRolloverSound = function(url) {
    return this.createPlayer(url, 'rollover');
}

MediaControl.prototype.addButtonClickSound = function(url) {
    return this.createPlayer(url, 'button');
}

MediaControl.prototype.addContentSound = function(url, options) {
    return this.createPlayer(url, 'content', '',options);
};

MediaControl.prototype.addTicketSound = function(url, options) {
    return this.createPlayer(url, 'ticket', '', options);
};

MediaControl.prototype.addRecording = function() {
    return this.createPlayer('', 'recording');
};




MediaControl.prototype.addBackgroundSound = function(url) {
    return this.createPlayer(url, 'background');
};

MediaControl.prototype.addEffectSound = function(url) {
    //commented by TJ on 7/19/2013, effect sound shouldn't stop any other sounds.
    return this.createPlayer(url, 'effect');
};

MediaControl.prototype.addVideo = function(containerDiv, url, type, isOnTop, showControls, options, kvp) {
    if(typeof options == 'undefined') options = {};
    if(type == undefined) type = 'content';
    if(isOnTop == undefined) isOnTop = false;
    if(showControls == undefined) showControls = false;
    if(typeof kvp === 'undefined') kvp = {};

    containerDiv.isOnTop = isOnTop;
    containerDiv.showControls = showControls;

    var videoPlayer = this.createPlayer(url, type, containerDiv, options);

    if(typeof videoPlayer.url !== 'undefined')
        kvp.videoName = videoPlayer.url;

    addListener(videoPlayer , 'start', function(){
        Analytics.trackVideoStart(kvp);
    });

    addListener(videoPlayer , 'complete', function(){
        Analytics.trackVideoComplete(kvp);
    });

    return videoPlayer;
};

MediaControl.prototype.addSpeech = function(url, animation, offsets, type) {
    if(type == undefined) type = 'content';
    var snd = this.createPlayer(url, type);
    snd.animation = animation;
    snd.animationPos = offsets;
    return snd;
};

//Pass URL to mp3, element ID, type
//Spk file must have same name as mp3 as well as be in the same directory.
MediaControl.prototype.addSpeechNew = function(url, imageId,type) {
    var spkFile   =  url.replace(/\.[^/.]+$/, '')+'.spk';

    var nest =  this;
    var snd = this.createPlayer(url, type);
    var mouthElement = document.getElementById(imageId);
    var mouthSequence =  new ImageSequence(mouthElement);
    snd.animation = mouthSequence;
    ajax('/html5/xml/get_spk.php',{spk:spkFile},function(data){
        if(type == undefined) type = 'content';
        mouthSequence.frameRate = data.framerate;
        snd.animationPos = data.frames;
        snd.dispatchEvent('spkready');
    });
    return snd;
};


MediaControl.prototype.createPlayer = function(url, type, div, options) {
    if(typeof options === 'undefined') options = {};
    // url in format spk:<mouth id>:<sound url>

    if(url.substr(0,4).toLowerCase() == 'spk:') {
        var parts = url.split(':');
        parts.shift();
        var mouth = parts.shift();
        return this.addSpeechNew(parts.join(':'), mouth, type);
    }

    if(url.indexOf('rosound') != -1 && url.indexOf('?') == -1)
        url += '?t=' + Math.floor(Math.random()*10);

    var player;

    player = new MediaPlayer(url, type, div, options);

    if(player) {
        //added by TJ on 8/6/2013
        addListener(player, 'update', this.updateSoundStatus);

        this.allSounds.push(player); //added by TJ on 8/6/2013, allSounds array will hold all sounds that are unique.

        if(type != 'recording')
            player.load();
        else if (type == 'recording')
            player.initRecording();
        switch(type){
            case 'rollover': player.setVolume(this.rollover_volume*this.master_volume);break;
            case 'button': player.setVolume(this.rollover_volume*this.master_volume);break;
            case 'content': player.setVolume(this.content_volume*this.master_volume);break;
            case 'background': player.setVolume(this.background_volume*this.master_volume);break;
            case 'effect': player.setVolume(this.effect_volume*this.master_volume); break; //added by TJ on 4/1/2013
            case 'ticket': player.setVolume(this.ticket_volume*this.master_volume); break;
        }
    }

    return player;
};

//added by TJ on 8/6/2013, this function is called when media player updates.
MediaControl.prototype.updateSoundStatus = function(event)
{
    var _target = getEventTarget(event);
    if(!_target) return;

    /* if(SoundControl.allSounds.indexOf(_target) == -1)
     SoundControl.allSounds.push(_target); */

    //media player plays
    if(_target.playing == true && SoundControl.activeSounds.indexOf(_target) == -1)
    {
        //do sound control before push new active sounds
        switch(_target.type)
        {
            case 'background':
                for(var i = SoundControl.activeSounds.length - 1; i >= 0; i--)
                {
                    if(!SoundControl.activeSounds[i] || SoundControl.activeSounds[i].playing == false)
                    {
                        SoundControl.activeSounds.splice(i, 1);
                        continue;
                    }
                    if(SoundControl.activeSounds[i].type == 'background')
                    {
                        SoundControl.activeSounds[i].stop();
                    }
                }
                _target.setVolume(SoundControl.background_volume*SoundControl.master_volume);
                break;
            default:
            case 'content':
                for(var i = SoundControl.activeSounds.length - 1; i >= 0; i--)
                {
                    if(!SoundControl.activeSounds[i] || SoundControl.activeSounds[i].playing == false)
                    {
                        SoundControl.activeSounds.splice(i, 1);
                        continue;

                    }
                    if( SoundControl.activeSounds[i].type == 'rollover' ||
                        SoundControl.activeSounds[i].type == 'button')
                    {
                        SoundControl.activeSounds[i].stop();

                    }
                }
                _target.setVolume(SoundControl.content_volume*SoundControl.master_volume);
                break;
            case 'rollover':
            case 'button':
                for(var i = SoundControl.activeSounds.length - 1; i >= 0; i--)
                {
                    if(!SoundControl.activeSounds[i] || SoundControl.activeSounds[i].playing == false)
                    {
                        SoundControl.activeSounds.splice(i, 1);
                        continue;
                    }
                    if( SoundControl.activeSounds[i].type == 'content'  ) {
                        //modified by TJ on 2/15/2015, safari on mac had an issue that rollover sound doesn't stop by content sound.
                        if(BROWSER.match(/safari/i)) {
                            setTimeout(function(){ _target.stop(); } , 1);
                        }else {
                            _target.stop();
                        }
                        return;
                    }

                    if(SoundControl.activeSounds[i].type == 'rollover' || SoundControl.activeSounds[i].type == 'button')
                    {
                        SoundControl.activeSounds[i].stop();
                    }
                }
                _target.setVolume(SoundControl.rollover_volume*SoundControl.master_volume);
                break;
            case 'effect':
                _target.setVolume(SoundControl.effect_volume*SoundControl.master_volume);
                break;
        }
        //alert(_target);
        SoundControl.activeSounds.push(_target);
    }
    //media player stops
    else if(_target.playing == false && SoundControl.activeSounds.indexOf(_target) != -1)
        SoundControl.activeSounds.splice(SoundControl.activeSounds.indexOf(_target), 1);
};

MediaControl.prototype.playMusic = function(snd){
    var audio = this.addBackgroundSound(snd);
    if(audio){
        audio.play();
        audio.loop();
    }
};

/////////////////////////////////////////////////////////////////////////
/*
	Last Edit: Corey Rosamond
	Added new version of append text that allows you to appendText without worrying about clearing the previous text area. 
	
	objType = same as createElement()
	objAttr(optional) = Object that holds all of the setAttribute types
	objStyle(optional) = string of inline styles
	appendObj(optional) = string or element that references parent node

	Use: var div = mObj.create('DIV',{'id':'test_div','src':IMGHOST+'/html5/btn.png'},'width:200px;position:absolute;','parent_div');

*/
function mObj(){
	this.obj = '';
}

mObj.prototype.create = function( objType, objAttr, objStyle, appendObj ){
	this.obj = document.createElement( objType );
	
	if(objAttr !== void 0){
		this.setAttr( objAttr );
	}

	if(objStyle  !== void 0){
		if( objStyle.length != 0 ){
			this.obj.setAttribute('style',objStyle);
		}
	}

	if(appendObj  !== void 0){
		if(typeof appendObj == 'string'){
			appendObj = document.getElementById(appendObj);
		} 
		appendObj.appendChild( this.obj );
	} 
	return this.obj;
}

mObj.prototype.setAttr = function( objAttr ){
	for(var index in objAttr) {
		var attrType = 'attr';
		if( index == 'height' || index == 'width' ){ attrType = 'style'; } 
		switch( index ){
			case 'STYLE': this.style[index] = objAttr[index]; break;
			default: this.obj.setAttribute(index, objAttr[index]); break;
		}
	}
}

mObj.prototype.append = function( objects, parent ){
	for(var i = 0; i < objects.length; i++) {
		parent.appendChild(objects[i]); // Note that this does NOT go to the DOM
	}
}

mObj.prototype.removeAllChildren = function( object ){
	if(object.hasChildNodes()){
		while (object.firstChild) { 
			object.removeChild(object.firstChild); 
		}
	}
}

mObj.prototype.appendText = function(text,parent){
	var update = false;
	if( parent.childNodes.length > 0 ){
		for (var i=0; i < parent.childNodes.length; i++) {
			if (parent.childNodes[i].nodeName === "#text") {
				var update = true;
				var updateObj = parent.childNodes[i];
			}
		}
	}
	if(update){ 
		updateObj.nodeValue = text.toString();
	} else { 
		var textNode = document.createTextNode(text.toString());
		parent.appendChild( textNode ); 
	}
}



var mObj = new mObj();

///////////////////////////////////////////////////////////////////////////////
    BOOMR = window.BOOMR || {};                                                                                                  
    BOOMR.xhr_excludes = {
      "/xml/hamster.php" : true,
      "/xml/parents/teacher_login.php" : true,
      "/xml/curriculum_set.php" : true,
      "/xml/music.php" : true,
      "/xml/animaltourlist.php" : true,
      "/xml/service/login.php" : true,
      "/xml/theater_glossary.php" : true,
      "/html5/xml/calendar.php" : true,
      "/html5/xml/mylessons.php" : true,
      "/html5/xml/curriculum_description.php" : true,
      "/html5/xml/addfavorites.php" : true,
      "/html5/xml/mycart.php" : true,
      "/html5/xml/get_spk.php" : true,
      "/html5/xml/prize_svc.php" : true,
      "/xml/myroom.php" : true,
      "/xml/aquarium.php" : true,
      "/html5/xml/savemedia.php" : true,
      "/html5/xml/store.php" : true,
      "/xml/store.php" : true,
      "/xml/path.php" : true,
      "/xml/petpark.php" : true,
      "/html5/xml/get_mp3_length.php" : true,
      "/xml/avatar.php" : true,
      "/html5/xml/gametracker.php" : true,
      "/xml/badwordslist.php" : true,
      "/html5/xml/search.php" : true,
      "/xml/track.php" : true,
      "/html5/abc/xml/avatarpicker.php" : true,
      "/html5/xml/siteprefs.php" : true,
      "/xml/track.php" : true,
      "img.abcmouse.com/snd/curriculum" : true                                                                                  
    }; 

    (function(){
      if(window.BOOMR && window.BOOMR.version){return;}
      var dom,doc,where,iframe = document.createElement('iframe'),win = window;

      function boomerangSaveLoadTime(e) {
        win.BOOMR_onload=(e && e.timeStamp) || new Date().getTime();
      }
      if (win.addEventListener) {
        win.addEventListener("load", boomerangSaveLoadTime, false);
      } else if (win.attachEvent) {
        win.attachEvent("onload", boomerangSaveLoadTime);
      }

      iframe.src = "javascript:false";
      iframe.title = ""; iframe.role="presentation";
      (iframe.frameElement || iframe).style.cssText = "width:0;height:0;border:0;display:none;";
      where = document.getElementsByTagName('script')[0];
      where.parentNode.insertBefore(iframe, where);

      try {
        doc = iframe.contentWindow.document;
      } catch(e) {
        dom = document.domain;
        iframe.src="javascript:var d=document.open();d.domain='"+dom+"';void(0);";
        doc = iframe.contentWindow.document;
      }
      doc.open()._l = function() {
        var js = this.createElement("script");
        if(dom) this.domain = dom;
        js.id = "boomr-if-as";
        js.src = '//c.go-mpulse.net/boomerang/' +
        'L5RXN-GBCYG-KJ83Y-TUURM-B72F4';
        BOOMR_lstart=new Date().getTime();
        this.body.appendChild(js);
      };
      doc.write('<body onload="document._l();">');
      doc.close();
    })();
	
	///////////////////////////////////////////////////////////////////////////////////
    //////// TEMPLATE FUNC OLD //////////
    window.onerror = function (message, url, lineNumber) {
        trace('<b><font color=red>ERROR:</font> ' + message + '</b><br>' + url + ' : ' + lineNumber);
    }
    //objs

    var timeouts = [];
    var SoundControl = new MediaControl();
	SoundControl.stopAllSound();
    var pingseq;
    var mouseMoveDist = 0;

    var tmAnimSoundEnabled = 1;

    //added alan fiedler 1/29/13
    var popup_timer;
    /* general setting properties ajf 4/10/2013*/
    var settings;
        settings = {"allowPrizeLessonPath":"yes","area_access":"127","change_volume":"on","contentvolume":0.5,"displayInstructions":"yes","holiday_access":"1023","mastervolume":1,"micvolume":0.5,"musicvolume":0.5,"rolloverdelay":"1","safetymask":"off","shopping_access":"63","tmSound":"on","rollovervolume":0.5};
    
    //vars
    var nohtml5 = false;
    var IMGHOST = '../artmin';
    var WEBHOST = '../';
    var APP_VERSION = '';
    var IOS_VERSION = '';
    var language = 'zhs';
    var text_language = '';
    var snd_language = '';
    var audioLangHistory = new Array(); //2.21.13 dh
    //AppData's properties are created by the App after the page loads
    var AppData = new Object();
    AppData.iosVersion = IOS_VERSION;
    AppData.appVersion = APP_VERSION;
    //added alan fiedler 5/14/13
    var MOBILE = '';
    var BROWSER = 'Chrome 45';
    var HASFIRSTGRADE = '1';

    var touchCapable = isTouchDevice(); //MAG 04/25/2014: added this global variable that holds a boolean value that results from calling the isTouchDevice() function in (utils.js)
    var USINGAPP = '';
    var TMSOUNDEFFECTS = tmAnimSoundEnabled ? 'on' : 'off';

    var APPLYMASK;
    var PAGEURL = WEBHOST + 'html5/bookplayer?cid=12261';
    //ajf	7/15/2013
    var CID = 12261;
    //evt vars
    var lastMouseDown = 0;
    var mouseDownElement;
    // click off of page star burst animation gif
    var mouseXpos = 0;
    var mouseYpos = 0;

    // Account Type
    var isLibraryAccount = "" == '1' ? true : false;
    var isActualLibrarian = "" == '1' ? true : false;
    var isLibraryUser = "" == '1' ? true : false;
    var isLibraryKid = "" == '1' ? true : false;
	var isChinaEFLUser = '' == '1'?true:false;
    var isAtLibrary = '' == 1 ? true : false;
    var isTeacher = false;
    var isCNTeacher = false;

    var currentHash = '';
    var hashHistory = [];

    var pageNaving = false;
    var forcePopup = false;
    var cordovaBridge;
    var pageScale = 1;
    var displayHeightDp = 0;
    var displayWidthDp = 0;
    var isAndroidPhone = false;
    var isIOS = false;
    var usingCordova = false;

    var isAndroid = ("") ? true : false;
    var isIOS = ("") ? true : false;
    var isUnity = ("") ? true : false;
    var isUnityAndroid = ("") ? true : false;
    var isUnityiOS = ("") ? true : false;
    var apiLevel = 0;

    var isGrade1Advisor = ('' == '1') ? true : false;

    /* see also  $gameTrackerCoreClientVersion in template.inc */
    var gameTrackerCoreClientVersion = '3.0.0'; //[Caigoy,020116,QA-8704]

    var burst = document.createElement('div');
    burst.style.position = 'absolute';
    burst.style.width = '111px';
    burst.style.height = '137px';
    burst.style.overflow = 'hidden';
    var burstimg = new Image();
    burstimg.style.position = 'absolute';
    burstimg.src = IMGHOST + "/html5/bits/sparkle.png";
    burstimg.id = "burst_strip";
    burst.appendChild(burstimg);

    //moved variable here so it is global. DAG 5.12.14
    var parentHasPassword = false;
    var hiddenAvatar;

    // 1.31.14 dh
    function TemplateEvent() {
    }
    TemplateEvent.LEAVING_PAGE = 'LEAVING_PAGE';
    enableEventHandling(TemplateEvent);

    var templateEvent = new TemplateEvent();

    searchGroupId(); // MAG 04/07/2014: Call this function to check if the url contains a groupid. If so, it opens the activityGroup popup.

    
    // save last click position for starburst
    

        addListener(document, (isEventSupported('pointerdown', document) ? 'pointerdown' : 'mousedown'), saveMousePosition, false);
    addListener(document, (isEventSupported('pointerup', document) ? 'pointerup' : 'mouseup'), documentMouseUp, false);
    addListener(document, 'click', disableClickEvent, true);
    
    
    //MAG 04/06/2014: Added the following function in order to be able to load group activities by CID (we get the cid from the groupid variable in the url
    function searchGroupId() {
        if (document.location.href.search('groupid=') > 0) {
            var query = location.search;
            query = query.split('=');
            var activityGroupId = query[1];
            openActivityGroup(activityGroupId);
        }
    }

    function setupVolumes() {

                SoundControl.setBackgroundVolume(settings.musicvolume);
        SoundControl.setRolloverVolume(settings.rollovervolume);
        SoundControl.setContentVolume(settings.contentvolume);
        SoundControl.setMasterVolume(settings.mastervolume);

        TMSOUNDEFFECTS = TMSOUNDEFFECTS ? TMSOUNDEFFECTS : 'on';
        APPLYMASK = settings.safetymask ? settings.safetymask : 'off';

            }

    function saveMousePosition(event) {
        var eventPos = pagePosition(event);
        mouseXpos = eventPos.x * pageScale;
        mouseYpos = eventPos.y * pageScale;
        lastMouseDown = new Date().getTime();

        if (isTextBlock(event.target)) {
            return true;
        }

        if (!isLeftButton(event)) {
            event.preventDefault();
        }


        var changes = new Array();
        var lastitem;
        var scrollOffset = getScrollOffsets();
        mouseDownElement = null;
        do {
            // Keep the same (x,y) mouse position. Just use the scrolled position to get the items - RL 2/28/2014
            //var item = document.elementFromPoint(mouseXpos, mouseYpos);
            var item = document.elementFromPoint(mouseXpos - scrollOffset.x, mouseYpos - scrollOffset.y);
            if (item == lastitem) break;
            lastitem = item;

            if (item) {
                if (item.getAttribute && (item.onclick || item.getAttribute('onclick'))) {
                    mouseDownElement = item;
                    break;
                }
                if (isTextBlock(item)) break;

                changes.push({obj: item, pointerEvt: item.style.pointerEvents});
                item.style.pointerEvents = 'none';
            }
        } while (item);

        while (changes.length) {
            item = changes.pop();
            item.obj.style.pointerEvents = item.pointerEvt;
        }
    }

    function isTextBlock(target) {
        if (target.tagName && target.tagName == 'INPUT') return true;
        if (target.tagName && target.tagName == 'TEXTAREA') return true;
        if (target.getAttribute && target.getAttribute('contenteditable') != null) return true;
    }

    function documentMouseUp(event) {
        var eventPos = pagePosition(event);
        var upXpos = eventPos.x * pageScale;
        var upYpos = eventPos.y * pageScale;
        var dist = Math.sqrt((upXpos - mouseXpos) * (upXpos - mouseXpos) + (upYpos - mouseYpos) * (upYpos - mouseYpos));
        mouseMoveDist = dist;

        if (isTextBlock(event.target)) {
            return true;
        }

        if (!isLeftButton(event)) return;


        var now = new Date().getTime();
        var elapse = now - lastMouseDown;
        mouseXpos = upXpos;
        mouseYpos = upYpos;

        if (mouseDownElement && elapse < 500 && dist < 10) {
            try {
                var clickaction = mouseDownElement.onclick;
                if (clickaction == undefined) {
                    clickaction = mouseDownElement.getAttribute('onclick');
                }

                // if(typeof(mouseDownElement.onclick) != 'function') {
                var res = clickaction.call(mouseDownElement);
                if (MOBILE != '')
                    cancelEvent(event);

            } catch (err) {
                trace("click failed", err);
            }
        }
        if (BROWSER.substr(0, 2) != 'IE') {

            if (elapse < 500) {
                var ping = document.getElementById('clickping');
                lastMouseDown = 0;
                if (ping) {
                    var offset = nodeOffsets(ping.parentNode);
                    var offsets = offsets || {x: 0, y: 0}; // [Caigoy,090815] Fixed minor exception
                    if (pingseq) pingseq.stop();
                    ping.style.display = '';
                    var pos = pagePosition(event);
                    ping.style.left = pos.x - 10 - offset.x + 'px';
                    ping.style.top = pos.y - 10 - offset.y + 'px';
                    pingseq = new ImageSequence(ping, 10, true);
                    pingseq.start();
                }
            }
        }

        if (MOBILE == 'ipad' && elapse > 500) {
            // Then a click and hold occurred. - on iPad this is how a user gets the audio file to play. CLARK
            if (parseInt(AppData.iosVersion) == 5) {
                var location = event.target.onclick.toString();
                var paths = location.match(/(')([a-zA-Z0-9/]*)/i);
                var path = paths[0].replace("'", "");
                event.target.removeAttribute('onclick');
                setTimeout(function () {
                    addListener(event.target.parentNode, 'touchstart', function () {
                        loadPage(path);
                    });
                }, 1000);
            }
        }
    }
    // Get the (x,y) scroll offsets - RL 2/28/2014
    function getScrollOffsets() {
        var doc = document;
        var w = window;
        var x, y, docEl;

        if (typeof w.pageYOffset === 'number') {
            if (typeof w.pageXOffset != void 0)
                x = w.pageXOffset;
            else
                x = 0;
            if (typeof w.pageYOffset != void 0)
                y = w.pageYOffset;
            else
                y = 0;

        } else {
            docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat') ? doc.documentElement : doc.body;

            if (typeof docEl.scrollLeft != void 0)
                x = docEl.scrollLeft;
            else
                x = 0;
            if (typeof docEl.scrollTop != void 0)
                y = docEl.scrollTop;
            else
                y = 0;
        }
        return {x: x, y: y};
    }

    function disableClickEvent(event) {
        var target = event.target;
        var targ = target.id;
        if (targ == 'uploadImageForm' || targ == 'uploadFilename' ||
            (mouseMoveDist < 1 && target.getAttribute && (target.getAttribute('data-clickable') === 'true'))) {
            //do nothing
        } else {
            //if(isLeftButton(event)) -disable all clicks or else you can click with wheel - Len
            cancelEvent(event);
        }
    }

    function leftClickOnly(event) {

        var gamebutton;
        if (event.which == null) {
            gamebutton = (event.button < 2) ? 'left' :
                ((event.button == 4) ? 'middle' : 'right');
        } else {
            gamebutton = (event.which < 2) ? 'left' :
                ((event.which == 2) ? 'middle' : 'right');
        }


        if (gamebutton == 'left') {
            return true;
        } else {
            event.preventDefault();
            event.stopPropagation();

            return false;
        }

    }

    function isLeftButton(event) {
        // all browsers except IE before version 9
        if (event.which) return (event.which == 1);
        // Internet Explorer before version 9
        if (event.button) return (event.button & 1);
        return true;
    }

    function makeButton(type, id, link, sound, grow) {
        var div = document.getElementById(id);
        if (div) {
            if (type == 'link' && link) div.setAttribute('onclick', "loadPage('" + link + "');");
            else if (type == 'action' && link) div.setAttribute('onclick', "{" + link + "};");
            if (sound) {
                div.setAttribute('rolloverSound', sound);
                SoundControl.buttonRollover(id);
            }
            if (grow) new GrowButton(div);
        }
    }
    /**
     * Function helps to detect if an event is supported on an element
     * provided as argument or on fallback element.
     * This was adapted from a post from http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
     * @param  {string}  eventName Event name to test.
     * @param  {Object}  element   {Optional} Target element which event name support is tested against.
     * @return {Boolean}
     */
   function isEventSupported(eventName, element) {
     var TAGNAMES = {
       'select':'input',
       'change':'input',
       'submit':'form',
       'reset':'form',
       'error':'img',
       'load':'img',
       'abort':'img'
     };

      element = element || document.createElement(TAGNAMES[eventName] || 'div');
      eventName = 'on' + eventName;

      var isSupported = (eventName in element);

      if (!isSupported) {
        // if it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
        if (!element.setAttribute) {
          element = document.createElement('div');
        }
        if (element.setAttribute && element.removeAttribute) {
          element.setAttribute(eventName, '');
          isSupported = typeof element[eventName] == 'function';

          // if property was created, "remove it" (by setting value to `undefined`)
          if (element.hasOwnProperty(eventName)) {
            element[eventName] = null;
          }
          element.removeAttribute(eventName);
        }
      }

      element = null;
      return isSupported;
    }


    function clickAboutMe() {
        if ('2379564311' == 0) {
            document.location.href = '/html5/login/';
            return;
        }
        loadPage('/html5/abc/aboutme', false);
    }

    function clickHome() {
	//teachers
        if (false) {
            loadPage('/html5/abc/student_home');
            return;
        }

        if ('2379564311' == 0) {//not logged in
            document.location.href = '/html5/login/';
            return;
        }
        if ('2' == 0) {
            loadPage('/html5/abc/student_home_linked', false);
            return;
        }

        loadPage('/html5/abc/student_home');
    }

    function clickShopping() {
        if ('2379564311' == 0) {
            document.location.href = '/html5/login/';
            return;
        }
        loadPage('/html5/abc/sitemap/shopplaza');
    }

	function clickToggle() {
		var userid = parseInt('2379564311');
		var arg_lang = 'en';
		if(text_language == '') arg_lang = 'zhs';

		// format arguments for API consumption
		var params = new Object();
		params.arguments = JSON.stringify([arg_lang]);

		ApiService.call('user_set_language', params, toggleCallback);
	}

	function toggleCallback(data) {
		location.reload()
	}

    function clickClassroom() {
        if ('2379564311' == 0) {
            document.location.href = '/html5/login/';
            return;
        }
        loadPage('/html5/abc/classroom');
    }


    function clickLearningPath() {
        if ('2379564311' == 0) {
            document.location.href = '/html5/login/';
            return;
        }
        loadPage('/html5/abc/path_section');
    }

    function clickPath() {
        if ('2379564311' == 0) {
            document.location.href = '/html5/login/';
            return;
        }
        loadPage('/html5/abc/path_section');
    }

    function clickBack() {
		window.location.href= "http://" + location.host + "/photobook";
/*		
        if (openPopups.length > 0) { // MAG 04/11/2014: Added this condition so if there's any popup open, clickBack(() closes it closes it instead of navigating to the previous page.
            closeAllPopups();
            if (window.location.href.indexOf('/curricgroup?') === -1) {
            return;
        }
        }

	      //if we're using a member iframe, and that iframe is present, then we handle back button clicks there via events
	      if(
            typeof usingMemberiFrame != 'undefined' &&
            usingMemberiFrame === true &&
            typeof pathIframe != 'undefined' &&
            pathIframe.name &&
		        ignoreBackSendEvent //set in /includes/ipad/include_iframe.php
	       ){
		        var backData = {
			        'func': 'backClick',
			        'param': 'true'
		        };
		        emitToIframe(backData);
		        return;
       	}

        
        history.go(-1);
*/		
    }

    function popVolume() {
        showPopup('volumeslider.php');
    }

    function popSearch() {
      showPopup('shell_search.php');
    }

    function popChangeUser(event, transitionTo) {

        cancelEvent(event);
        if (isLibraryAccount) {
            var special_pages = ['home', 'librarian_home', 'progress_tracking', 'curriculum_overview', 'howtovideos'];
            var url_parts = currentHash.split("/");
            var on_special = special_pages.indexOf(url_parts[url_parts.length - 1]);
            if (url_parts[0] == 'parents' && on_special > -1 || url_parts[url_parts.length - 1] == 'customer_support') {
                loadPage('/html5/abc/library_logout');
            } else {
                if (isLibraryUser || isLibraryKid)
                    showPopup('library_logout.php?message=You are about to end your session without saving your progress.  Are you sure you want to do this?&media_path=/artwork/snd/library/youareabout.mp3');
                else
                    loadPage('/html5/abc/library_logout');

                addListener(window.yesnopopup, 'clicked_yes', libraryUserLogout);
                addListener(window.yesnopopup, 'clicked_no', closePopup);
            }

            return;
        }
        if ('2379564311' == 0) {
            loadPage('/html5/login/');
            return;
        }
        if ('' == 1) {
	    //teachers
            var popup_msg = 'message=Are you sure you want to log out?';
            if (transitionTo === 'settings'){
                popup_msg = 'message=To access Settings you will be logged out of this profile. Are' +
                ' you sure?';
            } else if(transitionTo === 'teachers_dashboard') {
                popup_msg = 'message=To access the teacher\'s section you will be logged out of this profile.' +
                    ' Are you sure?';
            }
            addListener(window.yesnopopup, 'clicked_yes', function () {
		                var url ="/html5/userlogin?id=2379564261";

                if (transitionTo === 'settings'){
                    url += "&tsettings=true";
                } else if (transitionTo === 'teachers_dashboard') {
                    url += "&teachers_dashboard=true";
                }

                loadPage(url);
                    });
            showPopup('yes_no.php?'+popup_msg);

            /*
             * QAV-574 The log-out window can appear off centered by re-sizing the browser window or triggering it
             * from certain sections
             * Not an ideal solution. This fix plucks the popup element and inserts it into the maindiv
             * element which keeps the popup centered. RA 04/10/2015
             *
             */
            var popupElement = document.getElementById('popupdiv');
            popupElement.style.zIndex = 1000;
            var maindivElement = document.getElementById('maindiv');
            maindivElement.appendChild(popupElement);
            return;
        }

        showPopup('changeuser.php');
    }

    function libraryUserLogout() {
        //setcookie('lib_child_id', null, -3,'/');
        document.cookie = 'lib_child_id=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location = "/html5/abc/library_logout";
    }

    function popHelp() {
        showPopup('help.php?page=' + document.location.href);
    }

    function popSettings() {
        // [Caigoy,042517,QA-919] determine if pw popup already open
        var pwPopIsOpen = openPopups &&
            openPopups.some(function (_a) {
                return (_a.id === 'siteprefs_pw' || _a.id === 'password_check_popup');
            });

        if (isLibraryAccount) {
            window.authenticator.eventListeners = new Array();
            !pwPopIsOpen && closeAllPopups();
            showPopup('password.php?uid=&type=setting&dispatcher=popLibSettings_auth_done', 'password_check_popup');
            addListener(window.authenticator, 'popLibSettings_auth_done', popLibSettings_auth_done);

        } else if (isTeacher && !isCNTeacher) {
            window.authenticator.eventListeners = new Array();
            !pwPopIsOpen && closeAllPopups();

            var overrideFlag = getCookie('teacherPasswordCheckOverride') === 'true';
            if (overrideFlag) {
                // go right to settings
                toolsMenuLinkClicked('/html5/teachers/settings.php', 'settings');
            } else {
                showPopup('password_new.php?type=settings&dispatcher=popSettings_auth_done', 'siteprefs_pw');
            }

        } else {
            if (uinfo.userid === 0) return;

            if (uinfo && uinfo['settings'] && uinfo['settings']['0x00000080'] === '0') {
                popSettings_auth_done();
                return;
            }

            window.authenticator.eventListeners = new Array();
            !pwPopIsOpen && closeAllPopups(); // Arsen - close all popups before opening new one, to prevent ovelapping (task #80908)
            if (getCookie('pwcheck') == 'true' && getCookie('pass_remember') == 'true') {
                popSettings_auth_done();
            } else {
                showPopup('password_new.php?type=settings&dispatcher=popSettings_auth_done', 'siteprefs_pw');
                addListener(window.authenticator, 'popSettings_auth_done', popSettings_auth_done);
            }
        }
    }

    function toolsMenuLinkClicked(url, transitionTo) {
        if (2379564261 == 2379564311)
            window.location = url;
        else if (0 !=  0)
            popChangeUser('',transitionTo);
    }
    function popSettings_auth_done() {
        if (false)
            toolsMenuLinkClicked('/html5/teachers/settings.php', 'settings');
        else
            showPopup('settings_popup.php', 'settings_popup');
    }

    function popLibSettings_auth_done() {
        showPopup('librarian_setting.php', 'settings_popup');
    }

    function appCall(string) {
            }

    function doNothing() {
        // do nothing :-)
    }

    function popTeachers_auth_done() {
        toolsMenuLinkClicked('/html5/parents/home.php', 'teachers_dashboard');
    }

    function clickParents() {

        var formatLangQs = function formatLangQs(str) {
            if (!str) {
                str = language === '' ? 'en' : language;
            }
            var langMap = {
                'zht': 'zh',
                'zhs': 'zh',
                'en': 'en'
            };

            return langMap[str];
        };
        if ('2379564311' == 0) return;
        var parentLangSetting = ''
        var parentLang = formatLangQs(parentLangSetting)
        var hostPieces = window.location.host.split('.');
        var iAbcmouse = hostPieces.indexOf('abcmouse');
        var parentsUrl = hostPieces.indexOf('www') === 0
            ? '//parent.' + hostPieces.slice(iAbcmouse).join('.') + '/parent'
            : '//static.test.' + hostPieces.slice(iAbcmouse).join('.') + '/qa-parent';
        var parentSectionDashboard = parentsUrl + '/section/#/' + parentLang + '/parents_dashboard/' + parentLang;
        var isCN = Boolean(hostPieces.slice(iAbcmouse).pop() === 'cn') || language === 'zht' || language === 'zhs';
        if (uinfo && uinfo.school === true) {

            // student is allowed to enter password to access teachers section
            if ( uinfo.settings && uinfo['settings']['0x00000080'] === '0') {
                popTeachers_auth_done();
                return;
            } else if (  0 !==  0 || (uinfo.settings && uinfo['settings']['0x00000080'] === '1')) { // otherwise not allowed to access the teachers section

                var overrideFlag = getCookie('teacherPasswordCheckOverride') === 'true';
                if(overrideFlag){
                //go right to teacher home
                    toolsMenuLinkClicked('/html5/parents/home.php', 'teachers_dashboard');
                } else {
                    closeAllPopups();
                    showPopup('password.php?type=parent&dispatcher=popTeachers_auth_done');
                }
                return;
            }
        }

        if (isLibraryAccount) {
            if (getCookie('pwcheck') != 'true' || "2379564311" != "2379564261") {
                closeAllPopups();
                showPopup('password.php?uid=&type=LibrarianHomepage&dispatcher=pw_lib_parent_section', 'pw_parent_section');
            } else {
                pw_lib_parent_section();
            }
        } else if("2379564311" == "2379564261") {
            if (MOBILE) {
                setMyAccountAccessCookie(10);
                loadPage('/html5/parents/home', false);
            } else if (isCN) {
                loadPage('/html5/parents/home', false);
            } else {
                loadPage(parentSectionDashboard, false);
            }
        } else if (getCookie('pwcheck') == 'true' && getCookie('pass_remember') == 'true' || parentHasPassword == false) { //MAG 05/22/2014: Using 'parentHasPassword' instead of 'requirePassToAccess'
            if (MOBILE) {
                setMyAccountAccessCookie(10);
                loadPage('/html5/parents/home', false);
            } else if (isCN) {
                loadPage('/html5/parents/home', false);
            } else {
                loadPage(parentSectionDashboard, false);
            }
        } else {
            // password popup happens in loadPage around line 990
            if (MOBILE || isCN) {
                loadPage('/html5/parents/home', false);
            } else {
                loadPage(parentSectionDashboard, false);
            }
        }
        window.authenticator.eventListeners = new Array();
        addListener(window.authenticator, 'pw_parent_section', pw_parent_section);
    }

    function tfo_passwordAuth(e) {
        if (document.location.href.indexOf('parents/home') == -1) {
            pw_parent_section();
            // loadPage('/html5/parents/home', false);
        }
    }

    function pw_parent_section() {
        if (getCookie('pass_remember') != 'true') {
            setCookie('pwcheck', 'false', 0);
            setCookie('pass_remember', 'false', 0);
        }

        loadPage('/html5/parents/home', false);
    }
    function pw_lib_parent_section() {
        loadPage('/html5/libraries/home', false);
    }

    function showSupport() {

        if ('2379564311' == 0 || isLibraryAccount) {
            loadPage('/html5/customer_support', false);
        } else {
            window.authenticator.eventListeners = new Array();
            addListener(window.authenticator, 'support_pw', function () {
                showPopup('customer_support.php');
            });
            closeAllPopups();
            showPopup('password.php?type=support&dispatcher=support_pw');

        }
    }
    function showPolicy() {

        if ('2379564311' == 0) {
            loadPage('/html5/privacy', false)
        } else {
            window.authenticator.eventListeners = new Array();
            addListener(window.authenticator, 'privacy_pw', function () {
                loadPage('/html5/privacy');
            });
            closeAllPopups();
            showPopup('password.php?type=privacy&dispatcher=privacy_pw');

        }
    }
    function showTerms() {

        if ('2379564311' == 0) {
            loadPage('/html5/tandc', false)
        } else {
            window.authenticator.eventListeners = new Array();
            addListener(window.authenticator, 'tandc_pw', function () {
                loadPage('/html5/tandc');
            });
            closeAllPopups();
            showPopup('password.php?type=terms&dispatcher=tandc_pw');

        }
    }

    var burstanim;
    var currentPageURL = '';

    //arsen 03.07.2014
    var uinfo = {"userid":"2379564311","username":"\u5e0c\u5e0c","name":"\u5e0c\u5e0c","famname":"","hasmail":"0","points":"54","useravatar":"\/userart\/2379564311_avatar_1497050109679.png","userflags":"189448","password":"","bday":"2011-06-08","age":6,"registered":"1482723975","teacher":"0","gender":"F","acntParent":2379564261,"lastPage":"","currentPage":"","fullbodyAvatarUrl":"\/2379564311_generated_fullbodytransparent.png","fullbodyGraduationUrl":"\/2379564311_generated_fullbodygraduation.png","parentid":"2379564261","pname":"\u7238\u7238","pflags":1048,"flags":"189448","pavatar":"","ppwd":"d1f5c7d1bf841961b9f17329b44873c9","parentpwd":false,"pregistered":"1482723975","plast_seen":"1497081810","tzone":"Asia\/Chongqing","currentclass":0,"isparent":false,"school":false,"schoolgroup":false,"usetickets":true,"makechanges":true,"premium":0,"student":false,"reglevel":2,"last_seen":"1497081810","text_language":"","haspwd":false,"nomusic":false,"lessonpwd":true,"boyfeatures":false,"girlfeatures":true,"adminuserid":"","childonly":false,"overlimit":false,"loaded_acl":false,"acl":[],"unused":null,"kids":null,"pathinfo":{"onpath":2,"pathid":"115","lessonid":"3467","pathlevel":1},"pathid":"115","dailypoints":null,"playtime":null,"sitetime":null,"settings":{"allowPrizeLessonPath":"yes","area_access":"127","change_volume":"on","contentvolume":0.5,"displayInstructions":"yes","holiday_access":"1023","mastervolume":1,"micvolume":0.5,"musicvolume":0.5,"rolloverdelay":"1","safetymask":"off","shopping_access":"63","tmSound":"on","rollovervolume":0.5},"cookies":null,"actions":{"2379564261":{"btRound10.1_20141020":"1","cnHomepageEFLDoors":"0","cnRegPathVid082013":"0","cn_homepage_version_id":"10052","cn_new_levels_1_5":"false","cn_onboarding_1-4_20160520":"1","cn_public":"1","efl_regpath_page":"\/html5\/regpath_efl\/child_pets","feedbackcount":"3326","gamesIcon20161006":"0","homepage_visit_timestamp":"1482903110","html5Desktop20140804":"1","internationalSchool":"1","internationalSchoolDesktop":"1","lastPageAccessed":"purchase-tutoring","lastPageAccessed_zhs":"sub-confirm","origin_country":"CN","path_convert":"1","pixel_fired":"1","regsource":"1","switch_to_child":"1","tutoring20161109":"1"},"2379564311":{"april_fools_2017_popup_viewed":"1","classroom_last_seen":"1497072666","givenExistingPetFoods":"1","homepage_visit_timestamp":"1482752371","lastActivityDone":"13352","lastPageAccessed":"sub-confirm","my_files_artwork":"1","my_room_promo_viewed":"1","path_convert":"1","petRetreatPass":"","text_language":"en"}},"email":"zhongyh6686@126.com","account_id":21988161,"account_type":1,"rotation_keys":{"starstiers201405":false,"shellNewBtns20140407":false,"teacherExpierence":false,"grade1_advisor":false,"grade1_advisor2":false},"is_lib":false,"opt_out":0,"paused_account_status":0,"paused_assessment_status":0,"paused_tutoring_status":0,"account_date_created":"2016-12-25 19:46:49","maxusers":"0","parent_is_guardian":true};
    var passwordPopupVisible = false;
    var tmp_href = '';
    currentPageURL = document.location.href.split('#');
    currentPageURL = currentPageURL[1];

    var pwcheck_done = function () {
        oneTimeAccess = true;
        setMyAccountAccessCookie(10);

        if (typeof currentPageURL != 'undefined') {
            // if (tmp_href.indexOf(currentPageURL) == -1) {
                if (typeof closeSidepanels == 'function') {
                    closeSidepanels();
                    currentSidepanel = '';
                }

                loadPage(tmp_href);
                oneTimeAccess = false;
                return;
        // }
        }
    };

    /**
     * [Caigoy,071315,SF-6205] Compare two version strings on desktop and iOS
     * @param  {string}  cur Current version from device
     * @param  {string}  min Minimum version to check against
     * @return {boolean}     Whether current version >= minimum version
     * @see includes/ipad/android/template_func_android.php for Android equivalent; includes/mobile_device.inc for PHP version
     */
    function checkVers(cur, min) {
        var rad36 = function (char) { // return decimal equivalent of alphanumeric character; pad undefined with zero
                if (!char) return 0;
                if (/[0-9]/g.test(char)) return parseInt(char);
                return parseInt(char, 36);
            },
            parseVers = function (vers) { // split version string into array at non-alphanumeric characters
                return vers
                    .replace(/([0-9])([a-z])/gi, '$1.$2')
                    .replace(/([a-z])([0-9])/gi, '$1.$2')
                    .split(/[^0-9a-z]/gi);
            };
        var i = -1,
            len = Math.max(parseVers(cur).length, parseVers(min).length),
            c = parseVers(cur),
            m = parseVers(min);
        var compareSet = function (cur, min) {
            if (++i < len) {
                if (rad36(c[i]) < rad36(m[i])) return false;
                if (rad36(c[i]) > rad36(m[i])) return true;
                return compareSet(cur, min);
            } else { // versions are identical
                return true;
            }
        }
        return compareSet(c, m);
    }

    /**
     * Get TYPE field associated with CID [Caigoy,090315,SF-7288]
     * @param  {string}   cid      CID
     * @param  {Function} callback Callback
     * @return {object}            Object with cid, type, metatype
     */
    function getCurriculumEntryType(cid, callback) {
        var url = '/html5/xml/curriculum_type.php?cid=' + cid;
        return ajax(url, null, function (data) {
            callback(JSON.parse(data));
        });
    }

    /**
     * Show popup and stop loading [Caigoy,090315,SF-7288]
     * @return {boolean} false
     */
    function platformReject(){
        showPopup('first_grade_redirect.php');
        return false;
    }

    /**
     * Get CID from URI [Caigoy,082515]
     * @param  {string} href URI
     * @return {integer} CID
     */
    function getHrefCID(href) {
        var cid = 0;
        if (/cid=/i.test(href)) {
            cid = href.match(/cid=([0-9]{1,})/i)
        };
        if (Array.isArray(cid)) {
            cid = parseInt(cid[1])
        };
        return cid;
    };

    /**
     * Navigation function for desktop and iOS
     * @param  {string} href      Relative path from /sites
     * @param  {boolean} playburst
     * @see template_func_android.php for Android equivalent
     */
    var tmp_href = '';
    var prev_href = null;

	//detect if a user is navigating to subject pages link and redirect them to the new one, if available
	//arsen 2015-09-17
	function remapAngularURL(href) {
		if (MOBILE) {
			return false;
		}

		var linkMap = {
		  '/html5/abc/reading' : {
			'en': {
			  'tk': '/html5/abc/subject_pages?state=home/kindergarten/reading',
			  'first': '/html5/abc/subject_pages?state=home/first_grade/reading_writing'
			}
		  },
		  '/html5/abc/math' : {
			'en': {
			  'tk': '/html5/abc/subject_pages?state=home/kindergarten/math',
			  'first': '/html5/abc/subject_pages?state=home/first_grade/math'
			}
		  },
		  '/html5/abc/worldaroundus': {
			'en': {
			  'tk': '/html5/abc/subject_pages?state=home/kindergarten/world_around_us',
			  'first': '/html5/abc/subject_pages?state=home/kindergarten/world_around_us'
			}
		  },
		  '/html5/abc/colors': {
			'en': {
			  'tk': '/html5/abc/subject_pages?state=home/kindergarten/art_colors',
			  'first': '/html5/abc/subject_pages?state=home/first_grade/art_music'
			},
			'zhs' : {
			  'ell': '/html5/abc/subject_pages?state=ell/art_and_colors',
			}
		  },
		  '/html5/abc/musicshelf': {
			'en': {
			  'tk': '/html5/abc/subject_pages?state=home/kindergarten/music_songs',
			  'first': '/html5/abc/subject_pages?state=home/first_grade/art_music'
			},
			'zhs' : {
			  'ell': '/html5/abc/subject_pages?state=ell/music',
			}
		  },
		  '/html5/abc/bookshelf' : {
			'en': {
			  'tk': '/html5/abc/subject_pages?state=home/kindergarten/library',
			  'first': '/html5/abc/subject_pages?state=home/first_grade/library'
			},
			'zhs' : {
			  'ell': '/html5/abc/subject_pages?state=ell/library',
			}
		  },
		  '/html5/abc/puzzles' : {
			'en': {
			  'tk': '/html5/abc/subject_pages?state=home/kindergarten/puzzles',
			  'first': '/html5/abc/subject_pages?state=home/first_grade/games_puzzles'
			},
			'zhs' : {
			  'ell': '/html5/abc/subject_pages?state=ell/puzzles',
			}
		  },
		  '/html5/abc/games' : {
					'en': {
						'tk': '/html5/abc/subject_pages?state=home/kindergarten/games',
						'first': '/html5/abc/subject_pages?state=home/first_grade/games_puzzles'
					},
					'zhs' : {
						'ell': '/html5/abc/subject_pages?state=ell/games',
					}
				},
				'/html5/abc/speak_english_zhs' : {
					'zhs' : {
						'ell': '/html5/abc/subject_pages?state=home/speak_english',
					}
				},
				'/html5/abc/speak_english_en' : {
			'zhs' : {
			  'ell': '/html5/abc/subject_pages?state=home/speak_english',
			}
		  },
		  '/html5/abc/basics/menu_alphabet' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=alphabet',
			  'first': '/html5/abc/basics?state=alphabet',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=alphabet',
			}
		  },
		  '/html5/abc/basics/family' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=family',
			  'first': '/html5/abc/basics?state=family',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=family',
			}
		  },
		  '/html5/abc/basics/homepage' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=home',
			  'first': '/html5/abc/basics?state=home',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=home',
			}
		  },
		  '/html5/abc/basics_homepage' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=home',
			  'first': '/html5/abc/basics?state=home',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=home',
			}
		  },
		  '/html5/abc/basics/homepage_cn' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=home',
			  'first': '/html5/abc/basics?state=home',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=home',
			}
		  },
		  '/html5/abc/basics/menu_11to20' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=11to20',
			  'first': '/html5/abc/basics?state=11to20',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=11to20',
			}
		  },
		  '/html5/abc/basics/menu_1to10' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=1to10',
			  'first': '/html5/abc/basics?state=1to10',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=1to10',
			}
		  },
		  '/html5/abc/basics/menu_21to100' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=21to100',
			  'first': '/html5/abc/basics?state=21to100',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=21to100',
			}
		  },
		  '/html5/abc/basics/menu_colors' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=colors',
			  'first': '/html5/abc/basics?state=colors',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=colors',
			}
		  },
		  '/html5/abc/basics/menu_englishsounds' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=more_english_sounds',
			  'first': '/html5/abc/basics?state=more_english_sounds',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=more_english_sounds',
			}
		  },
		  '/html5/abc/basics/menu_games' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=games',
			  'first': '/html5/abc/basics?state=games',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=games',
			}
		  },
		  '/html5/abc/basics/menu_numbers' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=numbers',
			  'first': '/html5/abc/basics?state=numbers',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=numbers',
			}
		  },
		  '/html5/abc/basics/menu_shapes' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=shapes',
			  'first': '/html5/abc/basics?state=shapes',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=shapes',
			}
		  },
		  '/html5/abc/basics/menu_sightwords' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=sight_words',
			  'first': '/html5/abc/basics?state=sight_words',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=sight_words',
			}
		  },
		  '/html5/abc/basics/menu_sightwords_firstgrade' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=sight_words/advanced',
			  'first': '/html5/abc/basics?state=sight_words/advanced',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=sight_words/advanced',
			}
		  },
		  '/html5/abc/basics/menu_sightwords_intermediate' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=sight_words/intermediate',
			  'first': '/html5/abc/basics?state=sight_words/intermediate',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=sight_words/intermediate',
			}
		  },
		  '/html5/abc/basics/menu_sightwords_prek' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=sight_words/beginner',
			  'first': '/html5/abc/basics?state=sight_words/beginner',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=sight_words/beginner',
			}
		  },
		  '/html5/abc/basics/menu_topics' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=topics',
			  'first': '/html5/abc/basics?state=topics',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=topics',
			}
		  },
		  '/html5/abc/basics/menu_videos' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=animations',
			  'first': '/html5/abc/basics?state=animations',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=animations',
			}
		  },
		  '/html5/abc/basics/menu_wordfamily' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=word_families',
			  'first': '/html5/abc/basics?state=word_families',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=word_families',
			}
		  },
		  '/html5/abc/basics/music' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=music',
			  'first': '/html5/abc/basics?state=music',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=music',
			}
		  },
		  '/html5/abc/basics/sports' : {
			'en' : {
			  'tk': '/html5/abc/basics?state=sports',
			  'first': '/html5/abc/basics?state=sports',
			},
			'zhs' : {
			  'ell': '/html5/abc/basics?state=sports',
			}
		  },
		};


		var mapLang = (language == '') ? 'en' : language;
		var mapGrade;
		if (language == '') {
			mapGrade = uinfo.pathinfo.pathlevel <= 6 ? 'tk' : 'first';
		}
		else {
			mapGrade = 'ell';
		}
        // This code enables the old subject page link to take you to a specific tab in the new subject pages.
        // Emil, 9/24/15
        //
        // function URLToArray(url) {
        //     var request = {};
        //     var pairs = url.substring(url.indexOf('?') + 1).split('&');
        //     for (var i = 0; i < pairs.length; i++) {
        //         if(!pairs[i])
        //             continue;
        //         var pair = pairs[i].split('=');
        //         request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        //      }
        //      return request;
        // }
        //
        // var arguments = URLToArray(href);
        //
        // var zoneArg = typeof arguments['zone'] !== 'undefined' ? '&cat=' + arguments['zone'] : '';

         href = href.split('?')[0];

		if (typeof linkMap[href] !== 'undefined' && typeof linkMap[href][mapLang] !== 'undefined' && typeof linkMap[href][mapLang][mapGrade] !== 'undefined') {
            return linkMap[href][mapLang][mapGrade];
		}
		else {
			return false;
		}

	}

    var prevUrl = "";
    var oneTimeAccess = false;

    function enterFullScreen(hideBackButton) {
        addClass('maindiv', 'full-screen');
        if (hideBackButton) {
            addClass('maindiv', 'full-screen-hide-back-button');
        }
    }

    function exitFullScreen() {
        removeClass('maindiv', 'full-screen');
        if (hasClass('maindiv', 'full-screen-hide-back-button')) {
            removeClass('maindiv', 'full-screen-hide-back-button');
        }
    }

    function loadPage(href, playburst) {
		trashTimeouts();

		var newLink = remapAngularURL(href);

		if (newLink) {
			loadPage(newLink, playburst);
			return;
		}
        if ((prevUrl.indexOf('student_home') !== -1 || prevUrl.indexOf('mainmap') !== -1) && href.indexOf('classroom') !== -1){
            document.cookie = 'classroomCookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=abcmouse.com';
        }
        if (href !== '') {
          prevUrl = href;
        }

        /**
         *  QA-10311  Make sure that the print div is removed before reloading the page
         *  and removing the css that hides it. Otherwise it may overtake the background
         *  image and be visible to the user.
         */
         var printDiv = document.getElementById('print-div');
         if (printDiv !== null) {
           printDiv.parentNode.removeChild(printDiv);
         }

        /**
         * QA-7748 This is needed because the site timer UI clock overlaps the
         * information icon in the assessment center. So we check the href to
         * determine if we are in the assessment center or not.
         *
         **/
        (function() {
          var blacklist = [
            '/html5/parents/parent_assessment'
          ];
          var timerEl = document.getElementById('timer_settings_canvas');
          if (href && blacklist.indexOf(href) !== -1 && timerEl !== null) {
            timerEl.style.display = 'none';
          } else if (href && timerEl !== null) {
            timerEl.style.display = 'block';
          }
        }());

        /* MOBILE APP REJECTION SETTINGS [Caigoy,090315,SF-7288] */
        var appLegacyVersionEnd = '3.0',
            appLegacyCIDLimit = 21251,
            restrictedCIDTypes = ['game'], // See curriculum_defines.inc:$curriculum_zones
            platformCriteria = [           // If each item is true, CIDs and types will be checked, determining if continueLoadPage runs
                !!hrefCID, hrefCID > appLegacyCIDLimit, !!APP_VERSION, !checkVers(APP_VERSION, appLegacyVersionEnd),
            ],
            hrefCID = getHrefCID(href),
            shouldCheckCID = platformCriteria.every(function(a){return a === true;});

        /* ############################################################################################# */
        // DEBUG; ARTIFICIAL VALUES TO TRIGGER FAILURE ***
        /* ############################################################################################# */
        var DEBUG = false;
        if (DEBUG) {
            appLegacyVersionEnd = '4.0';
            appLegacyCIDLimit = 1;
            restrictedCIDTypes = ['game','pbn'];
            platformCriteria = [
                !!hrefCID, hrefCID > appLegacyCIDLimit, true, !checkVers('1.0', appLegacyVersionEnd),
            ];
            shouldCheckCID = platformCriteria.every(function(a){return a === true;});
        }
        /* ############################################################################################# */

        if (!!shouldCheckCID) { // true if all items in platformCriteria are true
            getCurriculumEntryType(hrefCID, function (data) {
                var typeIsRestricted = (function () { // true if data.type contained in restrictedCIDTypes
                    return data.type in restrictedCIDTypes.reduce(function (o, n, i) {o[n] = n; return o;}, {});
                })();
                if (typeIsRestricted) {platformReject();}
                else {continueLoadPage();};
            });
        } else {continueLoadPage();}

        /* [Caigoy,090315,SF-7288] Continue normally; Added this so that page loading can wait for getCurriculumEntryType() to finish */
        function continueLoadPage(){
        /*library testing code*/
        if (!USINGAPP) {
            if (isLibraryKid) {

                if (getCookie('inactivityTimeLimit') == '') {
                    setCookie('inactivityTimeLimit', 5, '/');
                    activeInactiveTimer();
                }
                else if (getCookie('inactivityTimeLimit') != 0)
                    activeInactiveTimer();

                if (getCookie('librarySessionTimeLimit') == '') {
                    setCookie('librarySessionTimeLimit', 0, '/');
                }
                else if (parseInt(getCookie('librarySessionTimeLimit')) > 0) {
                    //if not in the librarian sections activate the session timer. Otherwise deactivate the session timer.
                    if (href.indexOf('parents/home') < 0 && href.indexOf('librarian') < 0)
                        if (getCookie('librarySessionStart') == 0)
                            activeSessionTimer();
                        else
                            uppauseSessionTimer();
                    else
                        deactiveSessionTime();
                }
            } else {
                deactiveInactiveTimer();
                deactiveSessionTime();
            }
        }

        if (href == '') return;

        if (USINGAPP && (typeof href == 'undefined'))
            href = '/html5/abc/student_home';
        prev_href = href;
        tmp_href = href;
        href = decodeURIComponent(href); // some pages are sending encoded URL

        if (href.indexOf('privacy') !== -1) {
            document.location.href = '/html5/privacy';
            return;
        }
        if (href.indexOf('tandc') !== -1) {
            document.location.href = '/html5/tandc';
            return;
        }
        if (href.indexOf('/abc/graduation') !== -1) {
            if (USINGAPP)
                document.location.href = '/html5/abc/graduation';
            else
                document.location.href = '/html5/abc/graduation_new';
            return;
        }

        /**
         * QA-4339 this fixes the issue with the shell appearing twice because of having the
         * path 'parents\/home\?autopop\=1' appearing more than once.
         **/
        var re = /parents\/home\?autopop\=1/g;
        var numOfOccurrences = (href.match(re) || []).length;
        if ( numOfOccurrences > 1)
            href = '/html5/parents/home?autopop=1';

        if (href.search('myactivities') !== -1){
            document.location.href = href;
            return false;
        }

        playburst = (typeof playburst != 'undefined') ? playburst : true;

        var navArray = ["html5\/404","html5\/abc\/\/bookshelf","html5\/abc\/aatest","html5\/abc\/abcpainting","html5\/abc\/abcpaintingtest","html5\/abc\/aboutme","html5\/abc\/activities\/myactivities","html5\/abc\/animation_example","html5\/abc\/animation_player","html5\/abc\/appcaching\/apptestseth","html5\/abc\/apptester","html5\/abc\/apptestseth","html5\/abc\/app_cache","html5\/abc\/aprilfool_2014","html5\/abc\/arianuploadfiles","html5\/abc\/artcontest","html5\/abc\/audio_example","html5\/abc\/avatarpicker","html5\/abc\/avatarpicker_new","html5\/abc\/avatarpicker_old","html5\/abc\/avatarpicker_old_rl","html5\/abc\/avatarpicker_restore","html5\/abc\/avatarpicker_rl","html5\/abc\/avatars","html5\/abc\/basics","html5\/abc\/basics\/basic_books","html5\/abc\/basics\/basic_books_new","html5\/abc\/basics\/bedroom","html5\/abc\/basics\/classroom","html5\/abc\/basics\/example","html5\/abc\/basics\/family","html5\/abc\/basics\/homepage","html5\/abc\/basics\/kitchen","html5\/abc\/basics\/menu_11to20","html5\/abc\/basics\/menu_1to10","html5\/abc\/basics\/menu_1to5","html5\/abc\/basics\/menu_21to100","html5\/abc\/basics\/menu_6to10","html5\/abc\/basics\/menu_alphabet","html5\/abc\/basics\/menu_books","html5\/abc\/basics\/menu_colors","html5\/abc\/basics\/menu_englishsounds","html5\/abc\/basics\/menu_games","html5\/abc\/basics\/menu_numbers","html5\/abc\/basics\/menu_shapes","html5\/abc\/basics\/menu_sightwords","html5\/abc\/basics\/menu_sightwords_firstgrade","html5\/abc\/basics\/menu_sightwords_intermediate","html5\/abc\/basics\/menu_sightwords_prek","html5\/abc\/basics\/menu_sightwords_selection","html5\/abc\/basics\/menu_topics","html5\/abc\/basics\/menu_videos","html5\/abc\/basics\/menu_vocabulary","html5\/abc\/basics\/menu_wordfamily","html5\/abc\/basics\/music","html5\/abc\/basics\/qu_animation","html5\/abc\/basics\/sight_words","html5\/abc\/basics\/sports","html5\/abc\/basics\/test","html5\/abc\/basics\/vocabulary","html5\/abc\/basics\/yellow","html5\/abc\/basics_homepage","html5\/abc\/bookshelf","html5\/abc\/bookshelf_new","html5\/abc\/busy_box","html5\/abc\/busy_box_clark","html5\/abc\/busy_box_new","html5\/abc\/busy_box_old","html5\/abc\/busy_box_rl","html5\/abc\/calendar","html5\/abc\/classroom","html5\/abc\/classroom\/classroom","html5\/abc\/classroom_grade1","html5\/abc\/classroom_new","html5\/abc\/classroom_rl","html5\/abc\/clock","html5\/abc\/colors","html5\/abc\/colors_new","html5\/abc\/curricgroup","html5\/abc\/dagtest","html5\/abc\/dagtest2","html5\/abc\/dbtest","html5\/abc\/dtest","html5\/abc\/dtest2","html5\/abc\/eddietemp","html5\/abc\/eddietemp2","html5\/abc\/farm\/farm","html5\/abc\/farm\/farmactivities","html5\/abc\/farm\/farmtour","html5\/abc\/farm\/farm_navpage","html5\/abc\/featuredactivities","html5\/abc\/file_download","html5\/abc\/games","html5\/abc\/graduation","html5\/abc\/graduation_new","html5\/abc\/holidaycard","html5\/abc\/holiday_overlay","html5\/abc\/html5_tutorial","html5\/abc\/image_sequence_test","html5\/abc\/image_sequence_test2","html5\/abc\/image_sequence_test3","html5\/abc\/image_sequence_test4","html5\/abc\/image_sequence_test5","html5\/abc\/image_sequence_test6","html5\/abc\/jtest","html5\/abc\/jtest2","html5\/abc\/julian_dos","html5\/abc\/julian_page","html5\/abc\/kindergarten_readiness","html5\/abc\/library_logout","html5\/abc\/library_start","html5\/abc\/mailbox","html5\/abc\/maps\/midweststates","html5\/abc\/maps\/northeaststates","html5\/abc\/maps\/southeaststates","html5\/abc\/maps\/southweststates","html5\/abc\/maps\/southweststates_rl","html5\/abc\/maps\/statepage","html5\/abc\/maps\/statepages\/alaska","html5\/abc\/maps\/statepages\/massachusetts","html5\/abc\/maps\/statepages\/northdakota","html5\/abc\/maps\/statepages\/oregon","html5\/abc\/maps\/statepages\/washingtondc","html5\/abc\/maps\/usamap","html5\/abc\/maps\/usregionmap","html5\/abc\/maps\/weststates","html5\/abc\/marctest","html5\/abc\/mastery_landing\/index","html5\/abc\/math","html5\/abc\/miketemp7","html5\/abc\/musicplayer","html5\/abc\/musicplayer_2","html5\/abc\/musicplayer_new","html5\/abc\/musicshelf","html5\/abc\/musicshelf_new","html5\/abc\/myactivities","html5\/abc\/myactivities_new","html5\/abc\/myfavorites","html5\/abc\/myfavorites_new","html5\/abc\/myfilesupload","html5\/abc\/mylessons","html5\/abc\/mypictures","html5\/abc\/myroom","html5\/abc\/myroom_dev","html5\/abc\/myroom_example","html5\/abc\/myroom_marctest","html5\/abc\/myroom_rl","html5\/abc\/myroom_test","html5\/abc\/mytestpage","html5\/abc\/nopath","html5\/abc\/path_section","html5\/abc\/path_section_bac","html5\/abc\/path_section_back","html5\/abc\/path_section_bt","html5\/abc\/path_section_bt_ajax","html5\/abc\/path_section_seth","html5\/abc\/pbnlist","html5\/abc\/petprk_mainpage","html5\/abc\/petretreat_mainpage","html5\/abc\/pets\/aquarium","html5\/abc\/pets\/aquarium_dev","html5\/abc\/pets\/hamster","html5\/abc\/pets\/hamster_dev","html5\/abc\/pets\/rename","html5\/abc\/piano","html5\/abc\/pixelcounter","html5\/abc\/print","html5\/abc\/print_new","html5\/abc\/puzzles","html5\/abc\/puzzles_bu","html5\/abc\/puzzles_new","html5\/abc\/reading","html5\/abc\/reading_new","html5\/abc\/readtome","html5\/abc\/referafriend","html5\/abc\/return","html5\/abc\/scrolltabletdivexample","html5\/abc\/sethtemp","html5\/abc\/sethtestscript","html5\/abc\/settings_test","html5\/abc\/settings_test1","html5\/abc\/share","html5\/abc\/shopping","html5\/abc\/show_all_games","html5\/abc\/simplecoloring","html5\/abc\/sitemap\/aquarium_itemstore","html5\/abc\/sitemap\/boy_clothingshop","html5\/abc\/sitemap\/boy_itemstore","html5\/abc\/sitemap\/clothingshop","html5\/abc\/sitemap\/environment_itemstore","html5\/abc\/sitemap\/furnitureshop","html5\/abc\/sitemap\/furniture_itemstore","html5\/abc\/sitemap\/girl_clothingshop","html5\/abc\/sitemap\/girl_itemstore","html5\/abc\/sitemap\/hamster_itemstore","html5\/abc\/sitemap\/item_viewer","html5\/abc\/sitemap\/mainmap","html5\/abc\/sitemap\/map_types\/fall","html5\/abc\/sitemap\/map_types\/halloween","html5\/abc\/sitemap\/map_types\/late_fall","html5\/abc\/sitemap\/map_types\/normal","html5\/abc\/sitemap\/map_types\/spring","html5\/abc\/sitemap\/map_types\/thanksgiving","html5\/abc\/sitemap\/map_types\/winter","html5\/abc\/sitemap\/map_types\/winter2","html5\/abc\/sitemap\/map_types\/xmas","html5\/abc\/sitemap\/movie","html5\/abc\/sitemap\/mycart","html5\/abc\/sitemap\/mywishlist","html5\/abc\/sitemap\/petshop","html5\/abc\/sitemap\/pet_itemstore","html5\/abc\/sitemap\/shopplaza","html5\/abc\/sitemap\/stores\/aquarium_itemstore_test","html5\/abc\/sitemap\/stores\/furniture_itemstore","html5\/abc\/sitemap\/stores\/toy_itemstore_test","html5\/abc\/sitemap\/theater","html5\/abc\/sitemap\/theater_first_grade","html5\/abc\/sitemap\/theater_index","html5\/abc\/sitemap\/tier_stores\/aquarium_itemstore","html5\/abc\/sitemap\/tier_stores\/aquarium_itemstore_test","html5\/abc\/sitemap\/tier_stores\/boy_itemstore","html5\/abc\/sitemap\/tier_stores\/environment_itemstore","html5\/abc\/sitemap\/tier_stores\/furniture_itemstore","html5\/abc\/sitemap\/tier_stores\/girl_itemstore","html5\/abc\/sitemap\/tier_stores\/hamster_itemstore","html5\/abc\/sitemap\/tier_stores\/itemstore","html5\/abc\/sitemap\/tier_stores\/pet_itemstore","html5\/abc\/sitemap\/tier_stores\/toy_itemstore","html5\/abc\/sitemap\/tier_stores\/toy_itemstore_test","html5\/abc\/sitemap\/toyshop","html5\/abc\/sitemap\/toy_itemstore","html5\/abc\/sitemap\/toy_itemstore_tier","html5\/abc\/storybooks\/\/efl_how_do_you_say","html5\/abc\/storybooks\/\/efl_rtm_how_do_you_say","html5\/abc\/storybooks\/\/sight_words_poem_use","html5\/abc\/storybooks\/13_colonies","html5\/abc\/storybooks\/1_2_bucklemyshoe","html5\/abc\/storybooks\/alfred_wegener","html5\/abc\/storybooks\/amazing_animals_in_africa","html5\/abc\/storybooks\/american_folktales_granny_franny","html5\/abc\/storybooks\/americas_independence","html5\/abc\/storybooks\/animals_on_the_farm","html5\/abc\/storybooks\/animal_life_cycles_wpavati","html5\/abc\/storybooks\/another_roadtrip_wcarla","html5\/abc\/storybooks\/ar_er_or_farm","html5\/abc\/storybooks\/austin_explorer","html5\/abc\/storybooks\/aw_au_al_sound","html5\/abc\/storybooks\/a_new_cashew","html5\/abc\/storybooks\/big_treat_to_eat","html5\/abc\/storybooks\/boy_who_cried_wolf","html5\/abc\/storybooks\/bringing_technology_into_homes","html5\/abc\/storybooks\/business_starts_with_an_idea","html5\/abc\/storybooks\/carla_landmarks","html5\/abc\/storybooks\/carla_slice_of_history","html5\/abc\/storybooks\/carla_the_american_flag","html5\/abc\/storybooks\/carla_visits_the_liberty_bell","html5\/abc\/storybooks\/carla_visits_the_wetlands","html5\/abc\/storybooks\/celebrations_around_the_world","html5\/abc\/storybooks\/clown_and_hound","html5\/abc\/storybooks\/coin_poetry","html5\/abc\/storybooks\/coin_poetry.swf","html5\/abc\/storybooks\/colonial_times","html5\/abc\/storybooks\/community_heroes","html5\/abc\/storybooks\/consblend_wordsmith","html5\/abc\/storybooks\/consonant_blends_review","html5\/abc\/storybooks\/consonant_blends_squ_spl","html5\/abc\/storybooks\/consonant_blends_str_scr_spr","html5\/abc\/storybooks\/cooking_with_shawna","html5\/abc\/storybooks\/dates_are_great","html5\/abc\/storybooks\/dressed_all_by_myself","html5\/abc\/storybooks\/dressed_for_my_day","html5\/abc\/storybooks\/efl_how_do_you_say","html5\/abc\/storybooks\/efl_mybody_pt2","html5\/abc\/storybooks\/efl_rtm_clothes_pt1","html5\/abc\/storybooks\/efl_rtm_clothes_pt2","html5\/abc\/storybooks\/efl_rtm_family","html5\/abc\/storybooks\/efl_rtm_fun_at_the_zoo","html5\/abc\/storybooks\/efl_rtm_how_are_you","html5\/abc\/storybooks\/efl_rtm_how_do_you_say","html5\/abc\/storybooks\/efl_rtm_how_many","html5\/abc\/storybooks\/efl_rtm_i_want_to_be","html5\/abc\/storybooks\/efl_rtm_mybody_pt1","html5\/abc\/storybooks\/efl_rtm_mybody_pt2","html5\/abc\/storybooks\/efl_rtm_my_clothes","html5\/abc\/storybooks\/efl_rtm_people","html5\/abc\/storybooks\/efl_zoo_animals_with_zoe","html5\/abc\/storybooks\/ela_breakingnews_sk_lk","html5\/abc\/storybooks\/ela_root_words","html5\/abc\/storybooks\/ela_two_sounds_of_oo","html5\/abc\/storybooks\/fall_poetry","html5\/abc\/storybooks\/fathersday_poetry","html5\/abc\/storybooks\/fathers_day_grandfather","html5\/abc\/storybooks\/fox_and_the_stork","html5\/abc\/storybooks\/fthr_day_dad","html5\/abc\/storybooks\/goldilocks_storybook","html5\/abc\/storybooks\/grasshopper_and_the_ants","html5\/abc\/storybooks\/hanukkah_poetry","html5\/abc\/storybooks\/hickorydickory_beg","html5\/abc\/storybooks\/hickory_dickory_dock","html5\/abc\/storybooks\/history_of_pasta_wcarla","html5\/abc\/storybooks\/indpndnc","html5\/abc\/storybooks\/intro_to_silent_letters","html5\/abc\/storybooks\/its_happening_now","html5\/abc\/storybooks\/it_takes_two","html5\/abc\/storybooks\/ivan_puts_fun_in_motion","html5\/abc\/storybooks\/jane_goodall","html5\/abc\/storybooks\/jester_made_a_friend","html5\/abc\/storybooks\/just_the_right_word","html5\/abc\/storybooks\/king_grammar_visits_his_kingdom","html5\/abc\/storybooks\/kwanza_poetry","html5\/abc\/storybooks\/lil_boy_blue","html5\/abc\/storybooks\/lion_and_the_mouse","html5\/abc\/storybooks\/listen_to_sounds_farm","html5\/abc\/storybooks\/littleboyblue_beg","html5\/abc\/storybooks\/little_boy_blue_ell","html5\/abc\/storybooks\/little_red_riding_hood","html5\/abc\/storybooks\/maggie_and_marie_at_the_beach","html5\/abc\/storybooks\/making_gifts_wmaggie_marie","html5\/abc\/storybooks\/map_fun_with_carla","html5\/abc\/storybooks\/math_everyday_wshawna","html5\/abc\/storybooks\/math_on_the_farm","html5\/abc\/storybooks\/max_and_gabby","html5\/abc\/storybooks\/mlk_poetry","html5\/abc\/storybooks\/more_fun_wmaggie_marie","html5\/abc\/storybooks\/mothers_day_mother","html5\/abc\/storybooks\/mothers_day_poetry","html5\/abc\/storybooks\/mrwordsmith_wordbeginnings_consonant_blends","html5\/abc\/storybooks\/mrwordsmith_wordendings_consonant_blends","html5\/abc\/storybooks\/mthr_day_grandma","html5\/abc\/storybooks\/museum_memories","html5\/abc\/storybooks\/norman_camp_triangle","html5\/abc\/storybooks\/norman_the_number_scout","html5\/abc\/storybooks\/occptns_baker","html5\/abc\/storybooks\/occptns_baker_jr","html5\/abc\/storybooks\/occptns_builder","html5\/abc\/storybooks\/occptns_doctor","html5\/abc\/storybooks\/occptns_doctor_jr","html5\/abc\/storybooks\/occptns_firefighter","html5\/abc\/storybooks\/occptns_firefighter_jr","html5\/abc\/storybooks\/occptns_gardener","html5\/abc\/storybooks\/occptns_gardener_jr","html5\/abc\/storybooks\/occptns_grocer_jr","html5\/abc\/storybooks\/occptns_nurse","html5\/abc\/storybooks\/occptns_plcoffcr","html5\/abc\/storybooks\/occptns_plcoffcr_jr","html5\/abc\/storybooks\/occupations_baker","html5\/abc\/storybooks\/occupations_baker_jr","html5\/abc\/storybooks\/old_king_cole","html5\/abc\/storybooks\/old_king_cole_beg","html5\/abc\/storybooks\/onetwobucklemyshoe_beg","html5\/abc\/storybooks\/onthego_ontheground","html5\/abc\/storybooks\/pat_a_cake","html5\/abc\/storybooks\/pat_a_cake_2","html5\/abc\/storybooks\/pick_a_game","html5\/abc\/storybooks\/plants_need_dirt","html5\/abc\/storybooks\/plant_lifecycles_whester","html5\/abc\/storybooks\/plural_magic_with_marvin","html5\/abc\/storybooks\/prepositions_fit_for_a_king","html5\/abc\/storybooks\/remy_storybook","html5\/abc\/storybooks\/rtm_biography_amelia_earhart","html5\/abc\/storybooks\/rtm_biography_calvin_coolidge","html5\/abc\/storybooks\/rtm_biography_charles_henry_turner","html5\/abc\/storybooks\/rtm_biography_dian_fossey","html5\/abc\/storybooks\/rtm_biography_ellen_ochoa","html5\/abc\/storybooks\/rtm_biography_fdr","html5\/abc\/storybooks\/rtm_biography_hubble","html5\/abc\/storybooks\/rtm_biography_isaac_newton","html5\/abc\/storybooks\/rtm_biography_jacques_cousteau","html5\/abc\/storybooks\/rtm_biography_james_watt","html5\/abc\/storybooks\/rtm_biography_john_muir","html5\/abc\/storybooks\/rtm_biography_kodak","html5\/abc\/storybooks\/rtm_biography_lewisandclark","html5\/abc\/storybooks\/rtm_biography_neil_armstrong","html5\/abc\/storybooks\/rtm_biography_sonia_sotomayor","html5\/abc\/storybooks\/rtm_biography_sophie_germain","html5\/abc\/storybooks\/rtm_biography_susan_b_anthony","html5\/abc\/storybooks\/rtm_biography_teddy_roosevelt","html5\/abc\/storybooks\/rtm_biography_westinghouse","html5\/abc\/storybooks\/seahorse_compound_word_adventure","html5\/abc\/storybooks\/sight_words_poem_about","html5\/abc\/storybooks\/sight_words_poem_after","html5\/abc\/storybooks\/sight_words_poem_again","html5\/abc\/storybooks\/sight_words_poem_all","html5\/abc\/storybooks\/sight_words_poem_an","html5\/abc\/storybooks\/sight_words_poem_are","html5\/abc\/storybooks\/sight_words_poem_as","html5\/abc\/storybooks\/sight_words_poem_away","html5\/abc\/storybooks\/sight_words_poem_away.swf","html5\/abc\/storybooks\/sight_words_poem_be","html5\/abc\/storybooks\/sight_words_poem_because","html5\/abc\/storybooks\/sight_words_poem_been","html5\/abc\/storybooks\/sight_words_poem_before","html5\/abc\/storybooks\/sight_words_poem_boy","html5\/abc\/storybooks\/sight_words_poem_by","html5\/abc\/storybooks\/sight_words_poem_called","html5\/abc\/storybooks\/sight_words_poem_come","html5\/abc\/storybooks\/sight_words_poem_could","html5\/abc\/storybooks\/sight_words_poem_day","html5\/abc\/storybooks\/sight_words_poem_down","html5\/abc\/storybooks\/sight_words_poem_each","html5\/abc\/storybooks\/sight_words_poem_first","html5\/abc\/storybooks\/sight_words_poem_for","html5\/abc\/storybooks\/sight_words_poem_from","html5\/abc\/storybooks\/sight_words_poem_give","html5\/abc\/storybooks\/sight_words_poem_had","html5\/abc\/storybooks\/sight_words_poem_has","html5\/abc\/storybooks\/sight_words_poem_help","html5\/abc\/storybooks\/sight_words_poem_her","html5\/abc\/storybooks\/sight_words_poem_here","html5\/abc\/storybooks\/sight_words_poem_him","html5\/abc\/storybooks\/sight_words_poem_his","html5\/abc\/storybooks\/sight_words_poem_how","html5\/abc\/storybooks\/sight_words_poem_if","html5\/abc\/storybooks\/sight_words_poem_its","html5\/abc\/storybooks\/sight_words_poem_just","html5\/abc\/storybooks\/sight_words_poem_know","html5\/abc\/storybooks\/sight_words_poem_like","html5\/abc\/storybooks\/sight_words_poem_live","html5\/abc\/storybooks\/sight_words_poem_long","html5\/abc\/storybooks\/sight_words_poem_made","html5\/abc\/storybooks\/sight_words_poem_man","html5\/abc\/storybooks\/sight_words_poem_many","html5\/abc\/storybooks\/sight_words_poem_may","html5\/abc\/storybooks\/sight_words_poem_more","html5\/abc\/storybooks\/sight_words_poem_most","html5\/abc\/storybooks\/sight_words_poem_mother","html5\/abc\/storybooks\/sight_words_poem_much","html5\/abc\/storybooks\/sight_words_poem_must","html5\/abc\/storybooks\/sight_words_poem_of","html5\/abc\/storybooks\/sight_words_poem_old","html5\/abc\/storybooks\/sight_words_poem_once","html5\/abc\/storybooks\/sight_words_poem_only","html5\/abc\/storybooks\/sight_words_poem_open","html5\/abc\/storybooks\/sight_words_poem_other","html5\/abc\/storybooks\/sight_words_poem_over","html5\/abc\/storybooks\/sight_words_poem_people","html5\/abc\/storybooks\/sight_words_poem_put","html5\/abc\/storybooks\/sight_words_poem_round","html5\/abc\/storybooks\/sight_words_poem_said","html5\/abc\/storybooks\/sight_words_poem_so","html5\/abc\/storybooks\/sight_words_poem_some","html5\/abc\/storybooks\/sight_words_poem_soon","html5\/abc\/storybooks\/sight_words_poem_stop","html5\/abc\/storybooks\/sight_words_poem_take","html5\/abc\/storybooks\/sight_words_poem_than","html5\/abc\/storybooks\/sight_words_poem_thank","html5\/abc\/storybooks\/sight_words_poem_their","html5\/abc\/storybooks\/sight_words_poem_them","html5\/abc\/storybooks\/sight_words_poem_then","html5\/abc\/storybooks\/sight_words_poem_there","html5\/abc\/storybooks\/sight_words_poem_these","html5\/abc\/storybooks\/sight_words_poem_think","html5\/abc\/storybooks\/sight_words_poem_time","html5\/abc\/storybooks\/sight_words_poem_use","html5\/abc\/storybooks\/sight_words_poem_very","html5\/abc\/storybooks\/sight_words_poem_walk","html5\/abc\/storybooks\/sight_words_poem_water","html5\/abc\/storybooks\/sight_words_poem_way","html5\/abc\/storybooks\/sight_words_poem_were","html5\/abc\/storybooks\/sight_words_poem_when","html5\/abc\/storybooks\/sight_words_poem_where","html5\/abc\/storybooks\/sight_words_poem_which","html5\/abc\/storybooks\/sight_words_poem_words","html5\/abc\/storybooks\/sight_words_poem_work","html5\/abc\/storybooks\/sight_words_poem_would","html5\/abc\/storybooks\/sight_words_poem_your","html5\/abc\/storybooks\/somethings_fishy","html5\/abc\/storybooks\/so_many_sandwiches","html5\/abc\/storybooks\/spell_it_out_with_austinscout","html5\/abc\/storybooks\/spring_poetry","html5\/abc\/storybooks\/summer_ptry","html5\/abc\/storybooks\/syllable_symphony","html5\/abc\/storybooks\/thanksgiving_poetry","html5\/abc\/storybooks\/the_sounds_in_eddies_world","html5\/abc\/storybooks\/tilly_turtle_storybook","html5\/abc\/storybooks\/time_on_the_half_hour","html5\/abc\/storybooks\/tortoise_and_hare","html5\/abc\/storybooks\/troy_zoy_andthe_asteroid","html5\/abc\/storybooks\/ugly_duckling_storybook","html5\/abc\/storybooks\/visit_tothe_number_factory","html5\/abc\/storybooks\/were_all_explorers","html5\/abc\/storybooks\/whats_in_a_library","html5\/abc\/storybooks\/what_are_animals","html5\/abc\/storybooks\/what_can_you_do_with_math","html5\/abc\/storybooks\/what_does_our_president_do","html5\/abc\/storybooks\/what_does_presidents_do","html5\/abc\/storybooks\/what_is_a_fable","html5\/abc\/storybooks\/what_is_a_pattern","html5\/abc\/storybooks\/winter_poetry","html5\/abc\/storybooks\/women_who_lead_the_way","html5\/abc\/storybooks\/women_who_led_the_way","html5\/abc\/storybooks\/wordbot_word_beginnings_and_endings","html5\/abc\/storybooks\/wordsmith_ch","html5\/abc\/storybooks\/wordsmith_sh","html5\/abc\/storybooks\/wordsmith_sh_th_ch","html5\/abc\/storybooks\/wordsmith_th","html5\/abc\/storybooks\/word_endings_ft_nt","html5\/abc\/storybooks\/wright_brothers","html5\/abc\/student_home","html5\/abc\/student_homepage\/control","html5\/abc\/student_homepage\/student_home_cn_pop","html5\/abc\/student_homepage\/student_home_hamster","html5\/abc\/student_homepage\/student_home_new","html5\/abc\/student_homepage\/student_home_petpark","html5\/abc\/student_homepage\/student_home_theater","html5\/abc\/student_home_92013","html5\/abc\/student_home_cn_pop","html5\/abc\/student_home_linked","html5\/abc\/student_home_new","html5\/abc\/student_home_newui","html5\/abc\/student_home_old","html5\/abc\/student_home_old_new","html5\/abc\/student_home_rl","html5\/abc\/student_home_robertlaiupdated_0212014","html5\/abc\/student_home_test","html5\/abc\/student_home_vo","html5\/abc\/subject_pages","html5\/abc\/test","html5\/abc\/testanimations","html5\/abc\/testanimations2","html5\/abc\/testfile","html5\/abc\/testimonials","html5\/abc\/testpage","html5\/abc\/testuploadfiles","html5\/abc\/test_audio","html5\/abc\/test_query","html5\/abc\/toddler\/art","html5\/abc\/toddler\/art_new","html5\/abc\/toddler\/games","html5\/abc\/toddler\/puzzles","html5\/abc\/toddler\/songs","html5\/abc\/toddler\/songs_new","html5\/abc\/toddler\/stories","html5\/abc\/toddler\/toddler_time_new","html5\/abc\/toddler_time","html5\/abc\/toddler_time_new","html5\/abc\/tracking_test","html5\/abc\/whatsnew","html5\/abc\/worldaroundus","html5\/abc\/zoo\/zoo","html5\/abc\/zoo\/zooactivities","html5\/abc\/zoo\/zootour","html5\/abc\/zoo\/zoo_navpage","html5\/abc2\/bookshelf","html5\/abc2\/colors","html5\/act_engine\/20490\/game","html5\/android_sound_test","html5\/animation","html5\/animation_hierarchy_test","html5\/animation_previewer","html5\/animation_test","html5\/appstart","html5\/appstart_test","html5\/apptracking_test","html5\/app_nmhp","html5\/audio_test","html5\/book","html5\/book_bat","html5\/book_info","html5\/book_new","html5\/book_orig","html5\/browser","html5\/cancel-start","html5\/cancel-test","html5\/cancellation","html5\/cancellation-test","html5\/cancellation_cn","html5\/cancel_start_cn","html5\/changeuser_test","html5\/clock","html5\/cn_artwork\/table","html5\/color\/artcontest","html5\/color\/coloring","html5\/color\/coloring_mag","html5\/color\/dot2dot","html5\/color\/jtest","html5\/color\/magtest","html5\/color\/paintbynumber","html5\/color\/painter","html5\/color\/painter_backup","html5\/color\/painter_mag","html5\/customer_support","html5\/customer_support_history","html5\/customer_support_submit","html5\/customer_support_zhs","html5\/efl","html5\/efl\/efl_lesson","html5\/efl\/efl_practice","html5\/efl\/efl_quiz","html5\/efl\/efl_video","html5\/efl\/efl_wordwall","html5\/efl\/index","html5\/efl\/lesson","html5\/efl\/wordwall","html5\/ela\/\/becomeamember","html5\/ela\/assessments","html5\/ela\/becomeamember","html5\/ela\/becomeamember_bak","html5\/ela\/becomeamember_cn","html5\/ela\/becomeamember_prev","html5\/ela\/createfamilyaccount","html5\/ela\/eddytemp","html5\/ela\/home_page","html5\/ela\/login","html5\/ela\/magic_rainbow_traceables_demo","html5\/ela\/privacy","html5\/ela\/sub_d5","html5\/ela\/tandc","html5\/ela\/upgrade","html5\/first-grade-not-available","html5\/game","html5\/games","html5\/games\/shapes_at_the_market","html5\/games2","html5\/games_dev","html5\/games_ver2","html5\/graphic_player_previewer","html5\/holidaycard","html5\/holidaycard2","html5\/holidaycard3","html5\/holidaycard_2014","html5\/home_page","html5\/index","html5\/internet_explorer","html5\/librarian\/librarian_home","html5\/librarian\/librarian_usage","html5\/librarian\/library_resources","html5\/librarian\/patron_welcome","html5\/librarian\/share","html5\/librarian\/share_old","html5\/libraries\/home","html5\/login","html5\/login_new","html5\/logout","html5\/marctest","html5\/mediatest","html5\/mid_page","html5\/mid_page_new","html5\/mml","html5\/mobile\/android\/farmanimal","html5\/mobile\/android\/shoppingtheatermovie","html5\/mobile\/android\/zooanimal","html5\/mobile\/pages\/login","html5\/mobile\/pages\/login\/a","html5\/mobile\/pages\/login\/b","html5\/mobile\/pages\/no_teacher","html5\/parents\/artworkandmore","html5\/parents\/assessment_center\/index","html5\/parents\/assign_lesson","html5\/parents\/child_settings","html5\/parents\/child_settings\/child_settings","html5\/parents\/child_settings_clark","html5\/parents\/child_settings_new","html5\/parents\/child_settings_rl","html5\/parents\/child_settings_v1","html5\/parents\/child_settings_v2","html5\/parents\/classroom","html5\/parents\/class_login","html5\/parents\/class_login_old","html5\/parents\/class_login_rl","html5\/parents\/create_lesson","html5\/parents\/curriculum_overview","html5\/parents\/curriculum_overview_new","html5\/parents\/curriculum_parents","html5\/parents\/download","html5\/parents\/home","html5\/parents\/home.php.backup","html5\/parents\/home2","html5\/parents\/home_desktop","html5\/parents\/home_new","html5\/parents\/home_newui","html5\/parents\/howtovideos","html5\/parents\/howtovideos_library","html5\/parents\/invite_parents","html5\/parents\/itunes_cancellation","html5\/parents\/lesson_builder","html5\/parents\/lesson_organize","html5\/parents\/library_progress_tracking","html5\/parents\/myaccount","html5\/parents\/myaccount_bk","html5\/parents\/myaccount_cancellation","html5\/parents\/myaccount_new","html5\/parents\/mystats","html5\/parents\/parent_assessment","html5\/parents\/progress_tracking","html5\/parents\/progress_tracking_library","html5\/parents\/progress_tracking_mag","html5\/parents\/progress_tracking_new","html5\/parents\/progress_tracking_old","html5\/parents\/resources","html5\/parents\/save_artwork","html5\/parents\/settings","html5\/parents\/students_settings","html5\/parents\/teacher_home","html5\/parents\/tutorial","html5\/passiveanimationtest","html5\/paypal","html5\/popupdemo","html5\/privacy","html5\/puzzles\/cutout","html5\/puzzles\/cutout_test","html5\/puzzles\/cutout_test2","html5\/puzzles\/jigsaw","html5\/puzzles\/jigsaw_2","html5\/quests\/quest01\/quest_key_2","html5\/quests\/quest01\/quest_key_3","html5\/quests\/quest01\/quest_landing1","html5\/quests\/quest01\/quest_landing2","html5\/quests\/quest01\/quest_popup","html5\/quests\/quest01\/quest_return","html5\/quests\/quest01\/quest_times_up","html5\/quests\/quests","html5\/recored\/test","html5\/redirect","html5\/regpath\/appdload","html5\/regpath\/appdownload","html5\/regpath\/assessment-choice","html5\/regpath\/childavatar","html5\/regpath\/childpets","html5\/regpath\/confirmreg","html5\/regpath\/confirmreg_firstgrade","html5\/regpath\/createchild","html5\/regpath\/createparent","html5\/regpath\/gettingstarted","html5\/regpath\/gettingstarted_magbak","html5\/regpath\/survey","html5\/regpath\/survey.php.backup","html5\/regpath_efl\/child_pet","html5\/regpath_efl\/child_pets","html5\/regpath_efl\/confirm","html5\/regpath_efl\/create_avatar","html5\/regpath_efl\/create_child","html5\/regpath_efl\/create_parent","html5\/regpath_efl\/download","html5\/regpath_efl\/gettingstarted","html5\/regpath_efl\/new_onboardingsurvey","html5\/regpath_efl\/redeem","html5\/regpath_efl\/restore","html5\/regpath_efl\/test","html5\/rl","html5\/run_cache","html5\/scroll","html5\/set_path_section","html5\/show-ticket","html5\/show_capabilities","html5\/stress_animation_test","html5\/stress_media_test","html5\/subscribe","html5\/subscription","html5\/sub_confirm","html5\/tandc","html5\/teachers\/\/howto_videos","html5\/teachers\/classesandlessons","html5\/teachers\/class_builder","html5\/teachers\/class_login","html5\/teachers\/family_engagement","html5\/teachers\/family_engagement_action","html5\/teachers\/homepage","html5\/teachers\/howto_videos","html5\/teachers\/invite_families","html5\/teachers\/invite_parents","html5\/teachers\/lesson-builder\/index","html5\/teachers\/lesson_builder","html5\/teachers\/lesson_builder_old","html5\/teachers\/lesson_library","html5\/teachers\/link_accounts","html5\/teachers\/link_teachers","html5\/teachers\/my_lessons","html5\/teachers\/printables_resources","html5\/teachers\/scroll_dragger","html5\/teachers\/settings","html5\/teachers\/students_settings","html5\/teachers\/students_settings_rl","html5\/teachers\/teachers_home","html5\/teachers\/test1","html5\/teachers\/test2","html5\/teacher_preview\/previewpage","html5\/test","html5\/testaccount","html5\/testing\/dev_survey","html5\/testing\/dropdownsample","html5\/testing\/useragent","html5\/testrl","html5\/tools\/mediamanagertest","html5\/tween_unit_tests","html5\/unitgames","html5\/upgrade","html5\/upgrade-account","html5\/userlogintest"];
        navArray.push('/html5/abc/subject_pages');
        var navToPage = false;
        // The following line is a bug because if the href does not start with a slash, it will
        // strip the first letter of the path; e.g., 'html5/bookplayer' will become 'tml5/bookplayer'.
        // However, this function may depend on the existence of this bug, so I don't know if we can fix it.
        var path = href.substr(1);
        path = path.replace('.php', '');
        var pathPieces = path.split('?');
        var stripped = pathPieces[0];
        //currentPageURL = stripped;

        for (var i = 0; i < navArray.length; i++) {
            if (navArray[i] == stripped) {
                navToPage = true;
            }
        }
        //check if page load is needed
        if ((href.search('cid=') > 0 || href.search("puzzles/jigsaw") > 0) && (document.location.href.search('cid=') == -1 && document.location.href.search('puzzles/jigsaw') == -1)) {
            navToPage = false;
            if (document.location.href.search("#") > 0) {
                currentPageURL = document.location.href.split('#');
                currentPageURL = currentPageURL[1]
            } else {
                currentPageURL = document.location.href.split('/html5/');
                currentPageURL = '/html5/' + currentPageURL[1];
            }

            setNavCookie(currentPageURL);
        }

        if ((href.search('abc/reading') > 0 || href.search("/abc/basics") > 0 || href.search("/abc/math") > 0 || href.search("/abc/busy_box") > 0) && document.location.href.search('html5/cancel-start') > 0) {
            navToPage = false;
            if (document.location.href.search("#") > 0) {
                currentPageURL = document.location.href.split('#');
                currentPageURL = currentPageURL[1];
            } else {
                currentPageURL = document.location.href.split('/html5/');
                currentPageURL = '/html5/' + currentPageURL[1];
            }
        }

        if (href.search("abc/path_section") > 0 || href.search("abc/pets/hamster") != -1) {
            navToPage = false;
        }

        if (href == '/html5/logout' || href == '/html5/login' || href == '/html5/abc/library_logout') {
            navToPage = false;
        }

        //check if I'm going from loaded page to loaded page
        if ((document.location.href.search('cid=') > 0 || document.location.href.search('puzzles/jigsaw') > 0) && (href.search('cid=') > 0 || href.search('puzzles/jigsaw') > 0 )) {
            navToPage = false;
        }
        //check if I'm navigating away from a loaded page
        if ((document.location.href.search('cid=') > 0 || document.location.href.search('puzzles/jigsaw') > 0 || document.location.href.search('customer_support') > 0 || document.location.href.search('abc/pets/hamster') > 0) && href.search('cid=') == -1) {
            navToPage = false;
            var no_hash = false;

            if (href.indexOf('html5/') == 0) {
                href = href.substring(href.indexOf("5/") + 2), href.length;
                no_hash = true;
            }

            if (href.search("abc/farm") == -1 && href.search("abc/zoo") == -1 && href.search("abc/path_section") == -1 && href.search('cid=') == -1 && href.search("puzzles/jigsaw") == -1 && href.search("/html5/") == -1) {
                if (no_hash)
                    href = '/html5/' + href;
                else
                    href = '/html5#' + href;
            }

            if (href.search("zooactivities") > 0 || href.search("farmactivities") > 0) {
                href = '/html5#' + href;
            }
        }

        //added by marc martinez - 2014/02/19 (comment out if anchor based routing required)
        if (document.location.href.search("abc/path_section") > 0) {
            navToPage = false;
            if (href.search("abc/farm") == -1 && href.search("abc/zoo") == -1 && href.search('cid=') == -1 && href.search("puzzles/jigsaw") == -1 && href.search("abc/path_section") == -1) {
                href = '/html5#' + href;
            }
            if (href.search("abc/zoo/zooactivities") > 0 || href.search("abc/farm/farmactivities") > 0) {
                href = '/html5#' + href;
            }
        }

        var ajax_pages = [
            '/html5/abc/subject_pages',
            '/abc/student_home',
            '/html5/abc/myfavorites',
            '/html5/abc/myactivities',
            '/html5/abc/mailbox',
            '/html5/abc/mypictures',
            '/html5/parents/mystats',
            '/html5/abc/myroom',
            '/html5/abc/pets/aquarium',
            '/html5/parents/child_settings',
            '/html5/parents/home',
            '/html5/abc/student_home',
            '/html5/parents/assessment_center',
            '/html5/teachers/class_login',
            '/html5/parents/parent_assessment'
        ];

        if (document.location.href.indexOf('#') < 0 && ajax_pages.indexOf(href) > -1) {
            navToPage = false;
            href = '/html5#' + href;
        }
        //}

        //Arsen -  If new page is loaded (with hash) then close all sidepanels
        if (typeof closeSidepanels == 'function') {
            closeSidepanels();
            currentSidepanel = '';
        }
        if (typeof SidePanel == 'function') {
            if (current_sidepanel_index != -1)
                side_panels[current_sidepanel_index].hide();

            last_sidepanel_index = -1;
        }
		if (typeof hideTMPanel == 'function') {
			hideTMPanel();
		}

		// In place to remove the hash for ELA IOS v1.982
        if (APP_VERSION >= 1.982) {
        	href = (href.indexOf('/html5#/html5/') > -1) ? href.replace('/html5#','') : href;
            var temp_href = href;
            href = temp_href.replace("#", "/");
            window.location = href;
        }

        // to prompt for password only for Parent Home page
        if (href.search("parents") !== -1 && href.search("abc/share|myaccount") > 0 && !oneTimeAccess) {

            var firstTimeSession = getCookie("homeFirstSession");
            var type = "area";
            if (href.search("myaccount") !== -1) type = "myaccount";

            if ("true" !== firstTimeSession) {
                window.authenticator.eventListeners = new Array();
                addListener(window.authenticator, 'pwcheck_done', pwcheck_done);
                passwordPopupVisible = true;
                closeBlockScreen(); // Arsen - close all popups before opening new one, to prevent ovelapping (task #80908)
                showPopup('password.php?uid=&type='+type+'&dispatcher=pwcheck_done', 'password_check_popup');
                return;
            }
        }

         if (isLibraryAccount) {
            if(href.search('parents/home') > -1){
                href = '/html5/libraries/home';
            }
            if (href.search('parent') == -1) {
                var c_exp = new Date();
                c_exp.setSeconds(-1); //10 minutes
                var domain = '.' + (/\babcmouse\b.*$/.exec(document.domain) || [''])[0];
                document.cookie = "pwcheck=false; expires=" + c_exp.toUTCString() + '; domain=' + domain + '; path=/';
            }

        }
        else if (((tmp_href.search('parent') > 0 && tmp_href.search('myaccount') == -1) || tmp_href.search('teachers_home') > 0) && href.search('mystats') == -1 && getCookie('pwcheck') != 'true' && !uinfo.isparent && href.search('autopop') === -1) {
            var pass_text_suffix = 'area';
            if (href.search('settings') > 0)
                pass_text_suffix = 'setting';
            else
                pass_text_suffix = 'parent';

            if (document.location.href.search("#") > 0) {
                currentPageURL = document.location.href.split('#');
                currentPageURL = currentPageURL[1]
            } else {
                currentPageURL = document.location.href.split('/html5/');
                currentPageURL = '/html5/' + currentPageURL[1];
            }

            addListener(window.authenticator, 'pwcheck_done', pwcheck_done);
                passwordPopupVisible = true;
                closeBlockScreen(); // Arsen - close all popups before opening new one, to prevent ovelapping (task #80908)
                showPopup('password.php?uid=&type=' + pass_text_suffix + '&dispatcher=pwcheck_done', 'password_check_popup');
                return;
        }
        else {
            if (passwordPopupVisible)
                passwordPopupVisible = false;

            if (getCookie('pwcheck') == 'true' && href.search('parent') == -1
                    && href.search('avatarpicker') == -1 && href.search('abc/share') == -1
                    && href.search('customer_support') == -1 && href.search('teachers_home') == -1) {
                if (getCookie('pass_remember') != 'true') {
                    setCookie('pwcheck', 'false', 0);
                    setCookie('pass_remember', 'false', 0);
                }
                setMyAccountAccessCookie(0);
            }

        }
        //////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////


        //added by marc martinez - 2014/02/19 (comment this out if anchor based routing used)

        if ((href.search('musicplayer') > 0 || href.search('coloring') > 0) && (href.search('cid=') > 0) || (href.search('customer_support') > -1 || href.search('parents/howtovideos') > -1)) {
            navToPage = false;
        }
        //The class builder interface uses templates in 'script' tags
        //the ajax page loader (loadPage or $iframeMsg.navigate or navTo or ajax) does not support templates in 'script' tags
        if (href.search('teachers/class_builder') > -1) navToPage = false;


        if (href.search('#') > 0 && navToPage == false) {
            href = href.replace('/html5/', '');
        }

        var shorthref = href;
        var pos = shorthref.indexOf('#');
        if (pos > -1) shorthref = shorthref.substring(0, pos);
        pos = shorthref.indexOf('?');
        if (pos > -1) shorthref = shorthref.substring(0, pos);


        if (getCookie('resetContinueTo') != '') {
            setTimeout(function () {
                if (getCookie('resetContinueTo') != '') {
                    setNavCookie(getCookie('resetContinueTo'));
                    setCookie('resetContinueTo', '');
                }
            }, 500);
        }
        if (href.search('basics/example') > -1) navToPage = false;

	     // In place to remove the hash for ELA IOS v1.982
    	if(APP_VERSION >= 1.982 || isUnity){
    		var temp_href = href;
    		href = temp_href.replace("#","/");
    		burstanim = placeBurst();
    		window.location = href;
            return;
    	}

        if (navToPage == false) {
            //this is a hack, not a fix.. needs to be refactored (arsen)
            if (!/^javascript:/i.test(href) && href[0] != '/' && !/^http/.test(href)) {
                href = '/' + href;
            }
            setTimeout("document.location.href = '" + href + "'", 250);
        }
        else {
            if (pageNaving == false) {
                if (href == '/html5/teachers/teachers_home'){
                    popSettings_auth_done();
                    return;
                }

                // 1.31.14 dh - need a way to remove listeners when it's not a hard refresh
                templateEvent.dispatchEvent(TemplateEvent.LEAVING_PAGE);

                navTo(href);
                pageNaving = true;
                setTimeout(function () {
                    pageNaving = false
                }, 5000);
            }
            else {
                return;
            }
        }

        if (!playburst || (burstanim && burstanim.playing )) return;
        burstanim = placeBurst();


        };
    }

    function watchHash() {
        var thisHash = window.location.hash;
        if (thisHash == '')return;
        var pagePhp = window.location.hash.replace('#', '');
        if (pagePhp.substr(0, 6) != '/html5')
            pagePhp = '/html5/' + pagePhp;
        if (currentHash != window.location.hash.replace('#', '')) {
            loadPage(pagePhp,false);
        }
    }

    window.onhashchange = function(){watchHash()};
    window.onload = function(){
        watchHash();
        loadPage('');
    };
    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload();
        }
    };


    function loadExtPage(href) {
                window.open(href);
            }

    /* ajf 4/10/13 */
    function remove_mask() {
        var send = new Object();
        send.id = '2379564311';
        send.action = 'remove_mask';
        ajax("/html5/xml/siteprefs.php", send, function (data) {
            var mask = document.getElementById('activity_safety_mask');
            var remove = document.getElementById('activity_safety_mask_remove');
            if (data.success) {
                mask.parentNode.removeChild(mask);
                remove.parentNode.removeChild(remove);
            }

        });
    }

    function checkTour() {
        var tourBtn = document.getElementById('tour_btn');
        //run ajax to check if page path has tour url
        if ("/bookplayer" == "/abc/student_home") {
            tourBtn.style.visibility = 'visible';
            addListener('tour_btn', 'click', function () {
                //showPopup('recordvideo.php?file=home/homepage/video/gso_howto_1280x720.mp4');
                var video = SoundControl.addVideo(document.body, WEBHOST + 'artmin/home/homepage/video/gso_howto_1280x720.mp4', 'content', true, true);
                video.element.fullscreen = true;
                video.element.controls = true;
                video.element.style.position = 'absolute';
                video.element.style.top = '0px';
                video.play();
            });
        }
    }

    function onPurchaseFailed(event) {
        trace("failed event ", event);
    }
    function onPurchaseCompleted(event) {
        trace("completed event ", event);
    }

    function hideVolumeSlider() {
        if (!isUnity) {
            appCall('hideVolumeSlider');
        }
    }

    // Added to check for user's mouse is in the same position or not to define there is any activity. 5/28/2014 RL
    var inactivInterval = 0;

    function activeInactiveTimer() {
        var currentMousePositionX = mouseXpos;
        var currentMousePositionY = mouseYpos;
        var inactivityTimeLimit = getCookie('inactivityTimeLimit');
        if ((inactivityTimeLimit != "" || parseInt(inactivityTimeLimit) == 0) && (inactivInterval == 0 || inactivInterval == undefined)) {
            var timeLimit = parseInt(inactivityTimeLimit);
            var time_in_minutes = timeLimit * 60 * 1000;
            setCookie('lastMousePositionX', currentMousePositionX, '/');
            setCookie('lastMousePositionY', currentMousePositionY, '/');
            inactivInterval = setInterval(checkMouseActivity, time_in_minutes);
        }
    }

    function deactiveInactiveTimer() {
        removeCookie('lastMousePositionX');
        removeCookie('lastMousePositionY');
        clearInterval(inactivInterval);
        inactivInterval = 0;
    }

    function checkMouseActivity() {
        var lastMousePositionX = 0;
        var lastMousePositionY = 0;
        var currentMousePositionX = mouseXpos;
        var currentMousePositionY = mouseYpos;
        var cookieX = getCookie('lastMousePositionX');
        var cookieY = getCookie('lastMousePositionY');

        if (cookieX != "") {
            lastMousePositionX = parseInt(cookieX);
        } else {
            lastMousePositionX = 0;
        }
        if (cookieY != "") {
            lastMousePositionY = parseInt(cookieY);
        } else {
            lastMousePositionY = 0;
        }


        // Check the current and last mouse position.
//        showPopup('library_count_down.php?type=inactivity');

        if ((lastMousePositionX == currentMousePositionX) && (lastMousePositionY == currentMousePositionY)) {
            deactiveInactiveTimer();
            showPopup('library_count_down.php?type=inactivity');
        } else {
            setCookie('lastMousePositionX', currentMousePositionX, '/');
            setCookie('lastMousePositionY', currentMousePositionY, '/');
//        }
        }
    }

    // Added to check for the library session timer
    var librarySessionInterval = 0,
        sessionTimerInterval = 5; //todo change this to check only at session time limit.

    function activeSessionTimer() {
        var sessionLimit = getCookie('librarySessionTimeLimit');
        if (sessionLimit != '' && parseInt(sessionLimit) > 0) {
            var now = new Date();
            sessionTimerInterval = sessionLimit;
            setCookie('librarySessionStart', now.getTime(), '/');
            if (isLibraryKid)
                librarySessionInterval = setInterval(checkSessionTimer, (sessionTimerInterval * 1000));
        }
    }

    function deactiveSessionTime() {
        removeCookie('librarySessionStart');
        setCookie('librarySessionStart', 0, '/');
//        setCookie('librarySessionTimeLimit', 0, '/');
        clearInterval(librarySessionInterval);
        librarySessionInterval = 0;
    }

    function pauseSessionTimer() {
        clearInterval(librarySessionInterval);
        librarySessionInterval = 0;
    }

    function uppauseSessionTimer(time_left, logout) {
        time_left = (time_left == undefined) ? sessionTimerInterval : time_left;
        logout = (logout === 1)? 1 : 0;
        setCookie('logoutSession', logout, '/');
        if (librarySessionInterval == 0){
            librarySessionInterval = setInterval(checkSessionTimer, (time_left * 1000));
        }
    }

    function checkSessionTimer() {
        var startTime = getCookie('librarySessionStart');
        var sessionLimit = parseInt(getCookie('librarySessionTimeLimit'));
        var logout = parseInt(getCookie('logoutSession'));
        var now_date = new Date();
        var now_time = now_date.getTime();
        var time_limit = (parseInt(startTime) + (sessionLimit * 60 * 1000));

        if (now_time > time_limit) {
            if (logout === 1) {
                setCookie('logoutSession', 0, '/');
                deactiveSessionTime();
                if (window.location.href.indexOf('#') <= 0){
                    loadPage('abc/library_logout');
                }
                else {
                    loadPage('html5/abc/library_logout');
                }
            }
            else {
                pauseSessionTimer();
                showPopup('library_count_down.php?type=session');
            }
        }
        else {
            setCookie('sessionTimeLeft',(parseInt(now_time, 10) - parseInt(startTime, 10))/(60*1000), '/');
        }
    }

    if (typeof(console) == 'undefined') {
        var console = {};
        console.log = function () {
            //fix for IE
        };
    }

    /**
     * Add data-tracking attributes to elements [Caigoy,080415]
     * @param {string, object, array} obj [a] two string args; [b] an object with keys id, tracking; [c] an array of objects
     */
    function addDataTracking(obj) {
        if (!obj) return false;

        function addAttrib(el, data) {
            document.querySelector(el).setAttribute('data-tracking', data);
        }
        if (Array.isArray(obj)) {
            obj.forEach(function (i) {
                addAttrib(i.selector, i.tracking);
            });
        }
        if (!Array.isArray(obj) && typeof obj === 'object') {
            addAttrib(obj.selector, obj.tracking);
        }
        if (!Array.isArray(obj) && typeof obj === 'string' && arguments.length > 1) {
            addAttrib(arguments[0], arguments[1]);
        }
    }

    function startTimeout(method, milliseconds) {
        timeouts.push(setTimeout(function () {
            typeof method === 'function' && method();
        }, milliseconds));
    }

    function trashTimeouts() {
        for (var i=0; i<timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
        timeouts = [];
    }

    function launchMovieTheater() {
      setCookie('theaterIntro',true,1);
      loadPage('/html5/abc/sitemap/theater');
    }


    function saveGeneratedAvatar(av_items) {
        //console.log("saveGeneratedAvatar");
        if(av_items) {
            gotAvItems(av_items);
        }
        else {
            ajax("/html5/xml/siteprefs.php", {action:"get_avatar_items"}, gotAvItems);
        }
    }

    function gotAvItems(data) {
        //console.log("gotAvItems",data);
        var hiddenDiv = document.createElement('div');
        hiddenDiv.id = "hidden_avatar";
        hiddenDiv.style.position = 'absolute';
        hiddenDiv.style.visibility = "hidden";
        hiddenDiv.style.width = '400px';
        hiddenDiv.style.height = '562px';

        var avItems = data;
        hiddenAvatar = new Avatar(hiddenDiv, avItems);
        hiddenAvatar.setUserid(2379564311);

        hiddenAvatar.setScale(.88);
        hiddenAvatar.autoSave = false;
        hiddenAvatar.showacc = true;
        hiddenAvatar.inAvatarPicker = true;

        addListener(hiddenAvatar, "arrange_done", generatedAvatarReady);
    }

    function generatedAvatarReady(data) {
        //console.log("generatedAvatarReady");
        removeListener(hiddenAvatar, "arrange_done", generatedAvatarReady);
        var avSize = hiddenAvatar.getSize();

        var avCanvas = document.createElement('canvas');
        avCanvas.id = "hidden_canvas";
        avCanvas.width = avSize.width;
        avCanvas.height = avSize.height;
        var ctx = avCanvas.getContext('2d');

        hiddenAvatar.drawCanvas(ctx, 0, 0);
        var avUrl = avCanvas.toDataURL("image/png");

        ajax('/html5/xml/savemedia.php', {action:'save_avatar_image',imgstr:avUrl, type:'full_body'}, function(data) {
            var gown                    = new Object();
                gown.sku                = 108600;
            var stub                    = 'items/avatar/costume/graduation_s' + gown.sku + '.png';
                gown.image              = WEBHOST + '/artwork/' + stub;
                gown.layer              = 825;

            hiddenAvatar.addItem(gown,false);
            hiddenAvatar.removeLayer(850,true); //temperary remove pet
            addListener(hiddenAvatar, "arrange_done", generatedAvatarGownReady);
        });
    }

    function generatedAvatarGownReady(data) {
        //console.log("generatedAvatarGownReady");
        removeListener(hiddenAvatar, "arrange_done", generatedAvatarGownReady);
        var avSize = hiddenAvatar.getSize();
        var avCanvas = document.createElement('canvas');
        avCanvas.width = avSize.width;
        avCanvas.height = avSize.height;
        var ctx = avCanvas.getContext('2d');

        hiddenAvatar.drawCanvas(ctx, 0, 0);
        var avUrl = avCanvas.toDataURL("image/png");

        ajax('/html5/xml/savemedia.php', {action:'save_avatar_image',imgstr:avUrl, type:'graduation'}, function(data) {});
    }

    /*
     //     function enterFullScreen() {
     //     //MAG 05/30/2014: This new function will be used to enter full screen. It's still on testing mode.
     //
     //     var fsEvent = new Event('enterFullScreen');
     //
     //     var elem = this.parentNode;
     //     elem.style.width = '100%';
     //     elem.style.height = '100%';
     //
     //
     //     if (elem.requestFullscreen) {
     //     elem.requestFullscreen();
     //     } else if (elem.msRequestFullscreen) {
     //     elem.msRequestFullscreen();
     //     } else if (elem.mozRequestFullScreen) {
     //     elem.mozRequestFullScreen();
     //     } else if (elem.webkitRequestFullscreen) {
     //     elem.webkitRequestFullscreen();
     //     }
     //     else {
     //     return;
     //     }
     //     document.dispatchEvent(fsEvent);
     //     }
     */

	//////////////////////////////////////////////////////////////////////////
var nextSoundID = 0;
var ipad = (navigator["userAgent"].indexOf('iPad') != -1);
var recorderApproval = false;//this is used in recorder.js  but needs to be global

if (window.addEventListener) {
    window.addEventListener("load", printerInitialize, null);
    window.addEventListener("load", recordInitialize, null);
} else if (window.attachEvent) {
    window.attachEvent("onload", printerInitialize);
    window.attachEvent("onload", recordInitialize);
}

function printerInitialize(e) {
    setTimeout(function() {
        var player = document.createElement('div');
        player.id = "flashprinterholder";
        document.body.appendChild(player);
        player.innerHTML = "<object\n   id='flashprinter'\n height='1'\n    width='1'\n data='/artmin/html5/flashprinter.swf'\n allowscriptaccess='always'\n type='application/x-shockwave-flash'\n loop='false'\n name='flashprinter'><param name='FlashVars' value='webpath=" + WEBHOST + "'>\n</object>\n";
    }, 3000);
}

function recordInitialize(e) {
   if (typeof window.RecordingSystem !== 'undefined' && window.RecordingSystem.defaults.removeMediaPlayerSWF) {
     //FOUND THE removeMediaPlayerSWF FLAG TO BE TRUE
     return;
   }
    setTimeout(function() {
        var player = document.createElement('div');
        player.id = "recorderObject";
        player.innerHTML = "<object\n  wmode='transparent'\n    id='flashrecorder'\n    height='1'\n    width='1'\n data='/artmin/html5/recoder.swf'\n allowscriptaccess='always'\n type='application/x-shockwave-flash'\n loop='false'\n name='flashrecorder'><param name='FlashVars' value='webpath=" + WEBHOST + "'>\n</object>\n";
        document.body.appendChild(player);   
    }, 3000);
}

function MediaPlayer(url, type, videodiv, options) {
    this.id = nextSoundID++;
    this.playing = false;
    this.paused = false;
    this.done = false;
    this.length = 0;
    this.position = 0;
    this.duration = 0; //added by TJ on 3/10/2014
    this.volume = 1;
    this.url = url;
    this.type = type;
    this.sentStart = false;
    this.videodiv = videodiv;
    this.ready = false;
    this.autostart = false;

    //11.22.13 dh & jk
    this.closeBtn = null;

    // speech elements
    this.animation;
    this.animationPos;
    this.defaultPos = 0;
    this.speechTimer;

    if (typeof options != 'undefined' && options.forcedUrl) {
        this.forcedUrl = options.forcedUrl;
    }

    this.errorEvent = null;

    if (videodiv) {
        this.element = document.createElement('video');
        this.element.id = 'videodiv_' + nextSoundID;
        this.element.className = 'gpu-accelerate';
        this.element.width = videodiv.offsetWidth;
        this.element.height = videodiv.offsetHeight;
        this.element.style.position = 'absolute';
        this.url = this.url.replace('.mov', '.mp4');

        if (this.element.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') === 'probably')
            this.element.src = this.url.replace('.flv', '.mp4').replace('.ogv', '.mp4');
        else if (this.element.canPlayType('video/ogg; codecs="theora, vorbis"') === 'probably')
            this.element.src = this.url.replace('.mp4', '.ogv').replace('.flv', '.ogv');
        else
            this.element.src = this.url.replace('.flv', '.mp4');

        videodiv.appendChild(this.element);
    } else {
        //Added By TM and MG to fix IE9 crashing when removing the audio src 12/06/13
        if (BROWSER == 'IE 9')
        {
            var audioHolder = document.createElement('div');
            var mainDiv = document.getElementById("maindiv");
            audioHolder.innerHTML = "<audio></audio>";
            mainDiv.appendChild(audioHolder);
            this.element = audioHolder.childNodes[audioHolder.childNodes.length - 1];
            this.element.setAttribute('type', 'audio/mpeg');
        }

        else
        {
            this.element = document.createElement('audio');
        }

        if (this.element.canPlayType('audio/mpeg') === 'probably') {
            this.element.src = url.replace('.flv', '.mp3');
        } else if (this.element.canPlayType('audio/ogg;codecs="vorbis"') === 'probably') {
            this.element.src = url.replace('.mp3', '.ogg').replace('.flv', '.ogg');
        } else {
            this.element.src = url.replace('.flv', '.mp3');
        }
    }

    this.element.preload = 'metadata';
    this.element.objref = this;

    // this might be playing or something else depending on browser
    // http://www.w3.org/2010/05/video/mediaevents.html

    addListener(this.element, 'error', this.mediaError.bind());
    addListener(this.element, 'ended', this.mediadone);
    // event 'ended' fails to fire in certain occasions (chrome/ie on windows). workaround:
    addListener(this.element, 'timeupdate', function(e) {
        if (e.target.duration - e.target.currentTime < 0.2 && !e.target.loop) {
            this.mediadone(e);
        }
    }.bind(this));
    addListener(this.element, 'play', this.mediaplaying);
    addListener(this.element, 'playing', this.mediaplaying2.bind(this));


    addListener(this.element, 'loadedmetadata', this.setsize);
    addListener(this.element, 'pause', this.mediapaused);
    if (this.element.readyState > 0)
        this.setsize.call(this.element);
}

MediaPlayer.prototype.mediaError = function (event) {
    var obj = event.currentTarget.objref;

    if(obj.element.src.indexOf('mp4') !== -1) { // tried to an mp4 file and failed
        if (obj.element.canPlayType('video/ogg; codecs="theora, vorbis"') === 'probably') {
            obj.element.src = obj.element.src.replace('mp4', 'ogv');
            return;
        }
    } else if(obj.element.src.indexOf('mp3') !== -1) { // tried to an mp4 file and failed
        if (obj.element.canPlayType('audio/ogg; codecs="vorbis"') === 'probably') {
            obj.element.src = obj.element.src.replace('mp3', 'ogg');
            return;
        }
    }

    obj.errorEvent = event;
    obj.dispatchEvent('error');

    // code is taken from mediadone
    if (obj && obj.done == false) {
        obj.playing = false;
        obj.paused = false;
        obj.done = true;
        obj.element.pause();
        //added to fix problem firefox and ie has with too many audio objects - TM 11/26/2013
        obj.element.removeAttribute('src');
        obj.element.load();

        if (obj.speechTimer)
            obj.speechTimer.stop();
        if (obj.animation)
            obj.animation.goto(obj.defaultPos);
        obj.dispatchEvent('complete');
        obj.dispatchEvent('update'); //added by TJ on 8/27/2013
    }
};

MediaPlayer.prototype.load = function () {
};
MediaPlayer.prototype.initRecording = function () {
};
MediaPlayer.prototype.record = function () {
};
MediaPlayer.prototype.stopRecording = function () {
};
MediaPlayer.prototype.reload = function () {

    if (this.videodiv) {
        if (this.element.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') === 'probably')
            this.element.src = this.url.replace('.flv', '.mp4');
        else if (this.element.canPlayType('video/ogg; codecs="theora, vorbis"') === 'probably')
            this.element.src = this.url.replace('.mp4', '.ogv').replace('.flv', '.ogv');
        else
            this.element.src = this.url.replace('.flv', '.mp4');
    } else {
        if (this.element.canPlayType('audio/mpeg') === 'probably') {
            this.element.src = this.url.replace('.flv', '.mp3');
        }
        else if (this.element.canPlayType('audio/ogg;codecs="vorbis"') === 'probably') {
            this.element.src = this.url.replace('.mp3', '.ogg').replace('.flv', '.ogg');
        }
        else {
            this.element.src = this.url.replace('.flv', '.mp3');
        }
    }
    this.ready = false;
};
MediaPlayer.prototype.setProperty = function (name, value) {
    if (this.element)
        this.element.setAttribute(name, value);
};

//added by TJ on 7/19/2012
MediaPlayer.prototype.loop = function () {
    if (this.element)
        this.element.loop = true;
};

MediaPlayer.prototype.play = function (pos) {
    //MAG 07/02/2014: The following lines allows the user to slide the song and play it from any point he/she wants
    if (!pos && !this.element.currentTime || !pos && this.element.currentTime == 0)
        pos = 0;
    else
        pos = this.element.currentTime;

    if (this.element) {
        //added to fix problem firefox and ie has with too many audio objects - TM 11/26/2013
        if (this.element.src.indexOf('null') != -1 || !this.element.src) {
            this.reload();
        }

        if (!this.ready) {
            this.position = pos;
            this.autostart = true;
            return;
        } else {
            //you can set position until sound is loaded, moved from stop function - TM & MG 11/25/2013
            this.element.currentTime
        }
        this.done = false; //added by TJ on 8/27/2013
        this.paused = false; //added by TJ on 8/27/2013
        this.playing = true; //added by TJ on 8/27/2013
        this.dispatchEvent('update'); //added by TJ on 8/27/2013
        this.element.play(); //modified by TJ on 8/27/2013 // arian - html5 audio does not accept any args

        if (this.animation) {
            if (typeof this.speechTimer !== 'undefined') {
                this.speechTimer.stop();
            }

            this.speechTimer = new EnterFrame(this, this.syncMouth);
        }
    }
};

MediaPlayer.prototype.syncMouth = function (event) {
    if (this.playing && this.animationPos) {
        var frame = Math.floor(this.getPosition() * this.animation.frameRate);
        this.animation.goto(this.animationPos[frame]);
    }
};

MediaPlayer.prototype.pause = function () {
    this.autostart = false;
    if(this.element && !(this.element.src.indexOf('null') != -1 || !this.element.src)) {
        this.element.pause();
        this.paused = true;
        if(this.speechTimer) this.speechTimer.stop();
        if(this.animation) this.animation.goto(this.defaultPos);

        this.playing = false; //added by TJ on 8/27/2013
        this.dispatchEvent('update'); //added by TJ on 8/27/2013
    }
};

MediaPlayer.prototype.stop = function() {
    this.autostart = false;
    if(this.element && (!this.element.src.indexOf('null') !== -1 || this.element.src)) {
        //added by TJ on 12/18/2013, on firefox, audio doesn't stop when remaining audio is short (less than a second)
        if(this.element.readyState > 0) {
            if(this.element.currentTime) {
                this.element.currentTime = 0;
            }
            this.element.pause();
        }

        this.playing = false;
        this.paused = false;
        this.done = true;

        if (this.element.src !== null || this.element.src.indexOf('null') > -1) {
            this.element.removeAttribute('src');
        }

        if(this.speechTimer) this.speechTimer.stop();
        if(this.animation) this.animation.goto(this.defaultPos);

        this.dispatchEvent('update'); //added by TJ on 8/27/2013
    }
};

//11.20.13 dh
MediaPlayer.prototype.close = function (event) {
    if (document.webkitExitFullscreen && BROWSER.indexOf('Chrome') != -1) { //if Chrome, and the video is fullscreen, use default exit fullscreen instead of manually removing the video.
        document.webkitExitFullscreen();
        video_container.style.visibility = "hidden";
    }

    var obj = null;
    if (event) {
        obj = getEventTarget(event).objref;
    }

    if (obj) {
        obj.stop();
        if (obj.element) {
            obj.element.src = '';
            obj.videodiv.style.visibility = "hidden";
            if (obj.element.parentNode)
                obj.element.parentNode.removeChild(obj.element);
            if (obj.closeBtn.parentNode)
                obj.closeBtn.parentNode.removeChild(obj.closeBtn);
        }
    } else {
        this.stop();
        if (this.element) {
            this.element.src = '';
            this.videodiv.style.visibility = "hidden";
            if (this.element.parentNode)
                this.element.parentNode.removeChild(this.element);
            if (this.closeBtn.parentNode)
                this.closeBtn.parentNode.removeChild(this.closeBtn);
        }
    }
};

MediaPlayer.prototype.mute = function () {
};

MediaPlayer.prototype.url = function () {
    return this.url;
};
MediaPlayer.prototype.getPosition = function () {
    if (this.element && !(this.element.src.indexOf('null') != -1 || !this.element.src)) {
        return this.element.currentTime;
    }
    return 0;
};


MediaPlayer.prototype.setPosition = function (pos) {
    if (this.element && !(this.element.src.indexOf('null') != -1 || !this.element.src))
    {
        this.element.currentTime = pos;
    }
};

MediaPlayer.prototype.getDuration = function () {
    if (this.duration != 0)
        return this.duration; //added by TJ on 3/10/2014

    if (this.element && !(this.element.src.indexOf('null') != -1 || !this.element.src)) { // MAG 04/02/2014: Commented out
        if (typeof this.element.duration !== 'number' || !isFinite(this.element.duration)) {
            if (this.length > 0)
                return this.length;
            if (this.length < 0)
                return 0;
            this.length = -1; // set to -1 when waiting for ajax to return
            var objref = this;
            ajax('/html5/xml/get_mp3_length.php', {url: this.url}, function (data) {
                objref.length = data;
            });
        } else {
            return this.element.duration;
        }
    }

    return 0;
};

MediaPlayer.prototype.setVolume = function (vol) {
    if (this.element) {
        this.element.mute = false;
        this.element.volume = vol;
    }
};

MediaPlayer.prototype.mediadone = function (event) {
    var obj = event.currentTarget.objref;

    if (obj && obj.done == false) {
        obj.playing = false;
        obj.paused = false;
        obj.done = true;
        obj.element.pause();
        //added to fix problem firefox and ie has with too many audio objects - TM 11/26/2013
        obj.element.removeAttribute('src');
        obj.element.load();

        if (obj.speechTimer)
            obj.speechTimer.stop();
        if (obj.animation)
            obj.animation.goto(obj.defaultPos);
        obj.dispatchEvent('complete');
        obj.dispatchEvent('update'); //added by TJ on 8/27/2013
    }
};

MediaPlayer.prototype.mediapaused = function (event) {
    var obj = event.currentTarget.objref;
    if (obj) {
        obj.playing = false;
        obj.paused = true;
        if (obj.speechTimer)
            obj.speechTimer.stop();
        if (obj.animation)
            obj.animation.goto(obj.defaultPos);
        obj.dispatchEvent('pause');
    }
};

MediaPlayer.prototype.mediaplaying = function (event) {
    //trace('mediaplaying');
    var obj = event.currentTarget.objref;
    if (obj) {

        if (!obj.sentStart) {
            obj.sentStart = true;

            obj.dispatchEvent('start');
        }
        obj.playing = true;
        obj.paused = false;
        obj.dispatchEvent('play');
    }
};

MediaPlayer.prototype.mediaplaying2 = function (event) {
    this.playing = true;
    this.paused = false;
    this.dispatchEvent('playing');
};


MediaPlayer.prototype.setsize = function (event) {
    var obj = event.currentTarget.objref;
    if (obj && obj.videodiv) {
        obj.ready = true;
        obj.videodiv.style.backgroundColor = '#000000';

        if (obj.element.videoHeight / obj.element.videoWidth != obj.element.offsetHeight / obj.element.offsetWidth) {

            var width = obj.element.offsetHeight * obj.element.videoWidth / obj.element.videoHeight;

            var height = obj.element.offsetWidth * obj.element.videoHeight / obj.element.videoWidth;

            if (width > obj.element.offsetWidth) {
                obj.element.style.width = obj.element.offsetWidth + 'px';
            } else {
                obj.element.style.height = obj.element.offsetHeight + 'px';
            }
        }
        if (obj.autostart) {
            obj.play()
        }

        obj.dispatchEvent('loaded');
    }

    //added by TJ on 7/11/2012
    else if (obj)
    {
        obj.ready = true;
        obj.duration = obj.element.duration; //added by TJ on 3/10/2014
        if (obj.autostart)
            obj.play();
        obj.dispatchEvent('loaded');
    }
};

MediaPlayer.prototype.updatePropertiesFromApp = function () {
};


MediaPlayer.prototype.printFile = function (url) {
    if (navigator.appName.indexOf("Microsoft") != -1)
        var flashprinter = window['flashprinter'];
    else if (document['flashprinter'] && document['flashprinter'].length != undefined)
        flashprinter = document['flashprinter'][1];
    else
        flashprinter = document['flashprinter'];

    try {
        flashprinter.printerCommand('printURL', url);
    } catch (err) {
        trace(err);
    }
};

MediaPlayer.prototype.printHTML = function (html) {
    if (navigator.appName.indexOf("Microsoft") != -1)
        var flashprinter = window['flashprinter'];
    else if (document['flashprinter'] && document['flashprinter'].length != undefined)
        flashprinter = document['flashprinter'][1];
    else
        flashprinter = document['flashprinter'];

    try {
        flashprinter.printerCommand('printHTML', html);
    } catch (err) {
        trace(err);
    }
};

//11.22.13
MediaPlayer.prototype.addCloseButton = function () {
    this.closeBtn = document.createElement("div");
    this.closeBtn.id = 'mp_closeBtn';
    this.closeBtn.objref = this;

    addListener(this.closeBtn, 'click', this.close);

    if (this.videodiv)
        this.videodiv.appendChild(this.closeBtn);
};

MediaPlayer.prototype.activateCloseButton = function () {
    this.addCloseButton();
};

MediaPlayer.prototype.deactivateCloseButton = function () {
    if (this.closeBtn) {
        if (this.videodiv)
            this.videodiv.removeChild(this.closeBtn);
    }
};

enableEventHandling(MediaPlayer);

//////////////////////////////////////////////////////////////////////////////
var activeFrameEvents = new Array();
var lastEnterFrameTime = 0;
var activeFrameTimeout = 0;
var frameRefreshCounter = 0;

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


function EnterFrame(obj, func, params) {

	if(typeof(obj) == 'string') obj = document.getElementById(obj);
	this.obj = (obj == null) ? this : obj;
	this.func = func;
	this.params = params;
	this.frameRate = 0;
	this.lastFrameNum = 0;
	lastEnterFrameTime = 0;

	activeFrameEvents.push(this);
	if(activeFrameEvents.length == 1) processEnterFrames();
}

EnterFrame.prototype.stop = function() {
	var i = activeFrameEvents.length;
	while(i--){
		var frame = activeFrameEvents[i];
		if(frame == this) {
			frame.func = null;
			return;
		}
	}
}

if(requestAnimationFrame == null) {
	requestAnimationFrame = function(callback) {
		activeFrameTimeout = setTimeout(callback, 1000/24);
	}
}

function processEnterFrames() {
	var runtime = (new Date()).getTime();

	if(lastEnterFrameTime > 0 && runtime - lastEnterFrameTime > 500) {
		var diff = runtime - lastEnterFrameTime;
		for(var i=0;i<activeTweens.length;i++) {
			activeTweens[i].startTime += diff;
		}
	}

	lastEnterFrameTime = runtime;

	for(var i=0;i<activeFrameEvents.length;i++) {
		var frame = activeFrameEvents[i];
		if(frame.func == null) {
			activeFrameEvents.splice(i,1);
			i--;
		}
		else if(frame.frameRate > 0) {
			var framenum = Math.floor(runtime*frame.frameRate/1000);
			if(framenum != frame.lastFrameNum) {
				frame.lastFrameNum = framenum;
				try {
					if(frame.params == undefined)
						frame.func.apply(frame.obj);
					else
						frame.func.apply(frame.obj, frame.params);
				} catch(err) {
					trace('ERROR from processEnterFrames() in tween.js'); //added by TJ on 8/27/2013
					trace(err);
				}
			}
		}
		else {
			try {
				if(frame.params == undefined)
					frame.func.apply(frame.obj);
				else
					frame.func.apply(frame.obj, frame.params);
			} catch(err) {
				trace('ERROR from processEnterFrames() in tween.js'); //added by TJ on 8/27/2013
				trace(err);
			}
		}
	}

	if(activeFrameEvents.length > 0) requestAnimationFrame(processEnterFrames);
	else if(activeFrameTimeout) clearTimeout(activeFrameTimeout);
}

////////////////////////////////////

function pauseAllTweens() {
	for(var i=0;i<activeTweens.length;i++) {
		var tween = activeTweens[i];
		if(tween.isPlaying) tween.pause();
	}
}

function restartAllTweens() {
	for(var i=0;i<activeTweens.length;i++) {
		var tween = activeTweens[i];
		if(tween.pauseTime) tween.start();
	}
}
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

var activeTweens = new Array();

function Tween(obj, prop, begin, finish, duration)
{
  if(typeof(obj) == 'string') obj = document.getElementById(obj);

	this.obj            = obj;
	this.prop           = prop;
	this.loop           = false;
	this.position       = 0;
	this.motionFunction = null;
	this.frameEvent     = null;
	this.startTime      = new Date().getTime();
	this.pauseTime		= 0;
	this.progress       = 0;


	if(typeof(begin) == 'object')
    {
		this.points     = begin;
		this.begin      = begin[0];
		this.finish     = begin[begin.length-1];
		this.duration   = begin.length*50;
	}
	else
    {
		this.begin      = begin;
		this.finish     = finish;
		this.duration   = duration;
	}
	if(this.obj.customDispatches && hasProperties(obj.customDispatches))
		this.customDispatches = obj.customDispatches;

	this.isPlaying      = true;
	this.done           = false;

	this.gotoPosition(begin);
	activeTweens.push(this);

	if(activeTweens.length == 1) {
		if(this.frameEvent) this.frameEvent.stop();
		this.frameEvent = new EnterFrame(null, processTweens);
	}
}

Tween.prototype.start = function()
{
	if(this.pauseTime > 0) {
		var now = new Date().getTime();
		this.startTime = now - (this.pauseTime - this.startTime);
		this.pauseTime = 0;
	}
	this.isPlaying = true;
}

Tween.prototype.pause = function()
{
	this.isPlaying = false;
	this.pauseTime = new Date().getTime();
}

Tween.prototype.stop = function()
{
	this.isPlaying = false;
	this.done = true;
}

Tween.prototype.gotoPosition = function(pos) {
	if(isNaN(pos)) return;

	if(this.obj && this.obj.nodeName) {
		if(this.prop == 'left')
			this.obj.style.left = Math.round(pos) + 'px';
		else if(this.prop == 'top')
			this.obj.style.top = Math.round(pos) + 'px';
		else if(this.prop == 'height')
			this.obj.style.height = Math.round(pos) + 'px';
		else if(this.prop == 'width')
			this.obj.style.width = Math.round(pos) + 'px';
		else if(this.prop == 'opacity' )
			setElementOpacity(this.obj, pos);
		else if(this.prop == 'max-width' )
			this.obj.style.maxWidth = Math.round(pos) + 'px';
		else if(this.prop == 'max-height' )
			this.obj.style.maxHeight = Math.round(pos) + 'px';
		//modified by TJ on 4/25/2014, append transform
		else if(this.prop == 'rotation') {
			var _transform_data;

			if(this.obj.style.transform) _transform_data = this.obj.style.transform;
			if(this.obj.style.MozTransform) _transform_data = this.obj.style.MozTransform;
			if(this.obj.style.msTransform) _transform_data = this.obj.style.msTransform;
			if(this.obj.style.OTransform) _transform_data = this.obj.style.OTransform;
			if(this.obj.style.webkitTransform) _transform_data = this.obj.style.webkitTransform;

			if(_transform_data == undefined) _transform_data = '';

			if(_transform_data.match(/rotate\([\-\.0-9]*deg\)/))
			{
				_transform_data = _transform_data.replace(/rotate\([\-\.0-9]*deg\)/, '');
			}
			_transform_data += 'rotate(' + pos + 'deg)';

			this.obj.style.transform = _transform_data;
			this.obj.style.MozTransform = _transform_data;
			this.obj.style.msTransform = _transform_data;
			this.obj.style.OTransform = _transform_data;
			this.obj.style.webkitTransform = _transform_data;
		//modified by TJ on 4/25/2014, append transform
		}else if(this.prop == 'scale') {
			var _transform_data;

			if(this.obj.style.transform) _transform_data = this.obj.style.transform;
			if(this.obj.style.MozTransform) _transform_data = this.obj.style.MozTransform;
			if(this.obj.style.msTransform) _transform_data = this.obj.style.msTransform;
			if(this.obj.style.OTransform) _transform_data = this.obj.style.OTransform;
			if(this.obj.style.webkitTransform) _transform_data = this.obj.style.webkitTransform;

			if(_transform_data == undefined) _transform_data = '';

			if(_transform_data.match(/scale\([0-9\s\-\.\,]*\)/))
			{
				_transform_data = _transform_data.replace(/scale\([0-9\s\-\.\,]*\)/, '');
			}

			_transform_data += ' scale(' + pos + ')';

			this.obj.style.transform = _transform_data;
			this.obj.style.MozTransform = _transform_data;
			this.obj.style.msTransform = _transform_data;
			this.obj.style.OTransform = _transform_data;
			this.obj.style.webkitTransform = _transform_data;
		} else if(/^scale[XY]/.test(this.prop)) { // [Caigoy,011216,SF-8888] added missing scale options
			var _transform_data;
			var scaleType = this.prop.match(/^scale[XY]/)[0];

			if(this.obj.style.transform) _transform_data = this.obj.style.transform;
			if(this.obj.style.MozTransform) _transform_data = this.obj.style.MozTransform;
			if(this.obj.style.msTransform) _transform_data = this.obj.style.msTransform;
			if(this.obj.style.OTransform) _transform_data = this.obj.style.OTransform;
			if(this.obj.style.webkitTransform) _transform_data = this.obj.style.webkitTransform;

			if(_transform_data == undefined) _transform_data = '';

			if(_transform_data.match(/scale[XY]\([0-9\s\-\.\,]*\)/))
			{
				_transform_data = _transform_data.replace(/scale[XY]\([0-9\s\-\.\,]*\)/, '');
			}

			_transform_data += ' '+ scaleType + '(' + pos + ')';

			this.obj.style.transform = _transform_data;
			this.obj.style.MozTransform = _transform_data;
			this.obj.style.msTransform = _transform_data;
			this.obj.style.OTransform = _transform_data;
			this.obj.style.webkitTransform = _transform_data;
		}
		else {
			this.obj[this.prop] = pos;
		}
	}
	else if(this.obj) {
		this.obj[this.prop] = pos;
	}
	this.position = pos;
}

Tween.prototype.reverse = function() {
}

/////////////////////

Tween.prototype.drift = function(begin, finish, runtime, duration, position) {
	var togo = duration - runtime;
	if(togo <= 0) return finish;

	var r = 1 - runtime/duration;
	return begin + (1 - r*r*r*r)*(finish - begin);
}

/////////////////////

enableEventHandling(Tween);

//////////////////////

function processTweens() {

	var now = new Date().getTime();

	for(var i=0;i<activeTweens.length;i++) {
		var tween = activeTweens[i];
		if(tween.isPlaying) {
			var runtime = Math.min(now - tween.startTime, tween.duration);
			if(runtime <= 0) continue; //added by TJ on 10/4/2013, sometime, especially when lagging, runtime appears negative number where it shouldn't be. ignore the negative runtime. 0 is added simply because 0 shouldn't move anything yet.

			tween.progress = runtime/tween.duration;

			if(tween.points) {
				var frame = Math.min(tween.points.length -1, Math.floor(tween.points.length*runtime/tween.duration));
				var pos = tween.points[frame];
			}
			else if(tween.motionFunction)
				pos = tween.motionFunction(tween.begin, tween.finish, runtime, tween.duration, tween.position);
			else {
				pos = tween.begin + (tween.finish - tween.begin)*runtime/tween.duration;
			}
			/* Custom Dispatches will be used if we want to fire events midway through an animation.
			*/if(tween.customDispatches){
				var dispatchFrameEvents = (Math.floor(tween.position) != Math.floor(pos));
				if(dispatchFrameEvents && tween.customDispatches[Math.floor(tween.position)])
					tween.dispatchEvent(tween.customDispatches[Math.floor(tween.position)]);
			}
			tween.gotoPosition(pos);
			tween.dispatchEvent('change');
			if(tween.obj && tween.obj.onTweenChange){tween.obj.onTweenChange(tween);}

			if(tween.loop == false && runtime >= tween.duration) {
				tween.gotoPosition(tween.finish);
				tween.isPlaying = false;
				tween.done = true;
/* 				var event = document.createEvent('Event');
event.initEvent("finish",true,false);
tween.dispatchEvent(event); */
				tween.dispatchEvent('finish');
			}

			else {
				if(tween.loop && runtime >= tween.duration) tween.startTime = now;
			}
		}else if (!tween.isPlaying && !tween.done){
		}else if(tween.done) {
			activeTweens.splice(i,1);
			i--;

			if(i < 0) i = 0; //added by TJ on 2/21/2013
		}
	}

	if(activeTweens.length == 0) {
		this.stop();
	}
}

////////////////////////////////////

// tweener functions

function tweenerSine(begin, finish, runtime, duration, position) {
	return begin + Math.round((Math.cos(2*Math.PI*runtime/duration) - 1)*(begin - finish)/2);
}

function tweenerEaseIn(begin, finish, runtime, duration, position) {
	return (runtime==0) ? begin : (finish-begin) * Math.pow(2, 10 * (runtime/duration - 1)) + begin;
}

////////////////////////////////////
////////////////////////////////////
// animate a png or jpg image sequence
var json_objs = new Object(); //added by TJ on 10/22/2013, prevent json to load more than one time.
function ImageSequence(obj, frames, hide)
{
	if(typeof(obj) == 'string') obj = document.getElementById(obj);

	if(hide == undefined) hide = false;
	if(frames == undefined) frames = 0; //added by TJ on 1/3/2013

	//CONSTANT (DO NOT CHANGE)
	this.frame = obj;
	this.startTime = 0;
	this.images = new Array();
	this.ready = false;
	this.toLoad = 0;
	this.json_obj = {status:"not_loaded"}; //added by TJ on 11/13/2012
	this.use_json = false; 							//added by TJ on 11/14/2012
	this.use_reg_pt = false; 						//added by TJ on 1/4/2013, if register point is same for every frame, consider object is not moving
	this.playing = false; 							//added by TJ on 3/1/2013
	this.paused = false;							//added by Len on 3/18/2013
	this.animations = new Array();			// named animation settings
	this.frameSettings = new Array();		// frame by frame size and offset
	this.sequence;											// ordered list of frames for animation
	this.frameEvents;										// frame triggers
	this.lastFrame = -1;

	//CONTROLABLE (YOU MAY CHANGE VALUE)
	this.frameHeight = this.frame.offsetHeight; // fix for chrome zoom issue - bill 10-dec-12
	this.frameWidth = this.frame.offsetWidth;
	this.frames = frames;												// max usable frame position
	this.hide = hide;
	this.startFrame = 0;
	this.endFrame = -1; //added by TJ on 11/14/2012, this variable is used only when if there is specific section to animate. if you don't set this variable, it will play until end frame.
	this.position = 0;
	this.loop = false;
	this.frameRate = 24;
	this.reverse = false;
	this.scale = 1; //added by TJ on 11/14/2012
	this.currentAnimation = '';
	this.pauseTime	= 0; //added by Len 3/18/2013

	// find img inside of div
	var startFrame = 0;
	for(var i=0;i<obj.children.length;i++) {
		if(obj.children[i].tagName == 'IMG') {
			var image = new Object();
			image.image = obj.children[i];
            image.rows = Math.floor(image.image.naturalHeight/obj.offsetHeight);
            image.cols = Math.floor(image.image.naturalWidth/obj.offsetWidth);

			image.origWidth = image.image.clientWidth; //added by TJ on 11/16/2012
			image.origHeight = image.image.clientHeight; //added by TJ on 11/16/2012

			image.startFrame = startFrame;
			image.frames = image.rows*image.cols;
			startFrame += image.frames;
			image.image.style.position = 'absolute';
			image.image.style.left = '0px';
			image.image.style.top = '0px';
			image.image.style.visibility = (this.images.length > 0) ? 'hidden' : 'inherit';
			this.images.push(image);

			if(!image.image.complete) {
				this.toLoad++;
				addListener(image.image, "load", this.imageLoaded);
			}
		}
	}

}

// create/replace named animation
// properties:
// required - name:string
// required - startFrame:int and endFrame:int or sequence:array
// optional - loop:bool
// optional - frameEvents:array of objects { frame:int, event:string }
// optional - frameRate:int
// optional - reverse:bool
// optional - scale:number
// optional - frameSettings:array of objects with transform data

ImageSequence.prototype.createAnimation = function(info) {

	if(info && info.name) {
		// check if name exists
		for(var i=this.animations.length-1;i>=0;i--) {
			if(this.animations[i].name == info.name) {
				this.animations[i] = info;
				return;
			}
		}
		this.animations.push(info);
	}
}

// run named animation
ImageSequence.prototype.runAnimation = function(name) {
	for(var i=0;i<this.animations.length;i++) {
		if(this.animations[i].name == name) {
			var anim = this.animations[i];
			if(anim.sequence && anim.sequence.length) {
				this.frameSequence = anim.sequence;
				this.startFrame = 0;
				this.endFrame = anim.sequence.length-1;
			}
			else {
				this.startFrame = anim.startFrame;
				this.endFrame = isNaN(anim.endFrame) ? -1 : anim.endFrame;
				this.frameSequence = null;
			}
			this.frames = this.endFrame - this.startFrame;
			this.loop = (anim.loop != null && anim.loop != undefined) ? anim.loop : false;
			this.frameRate = (anim.frameRate != null && anim.frameRate != undefined) ? anim.frameRate : 24;
			this.reverse = (anim.reverse != null && anim.reverse != undefined) ? anim.reverse : false;
			this.scale = (anim.scale != null && anim.scale != undefined) ? anim.scale : 1;
			this.frameEvents = (anim.frameEvents != null && anim.frameEvents != undefined) ? anim.frameEvents : null;
			this.frameSettings = (anim.frameSettings != null && anim.frameSettings != undefined) ? anim.frameSettings : null;
			this.currentAnimation = name;
			this.start();
			return;
		}
	}
}


//added by TJ on 11/14/2012
ImageSequence.prototype.JSON = function(url)
{
	var refobj = this;

	refobj.use_json = true;

	//added by TJ on 10/22/2013, prevent to load json file more than once
	if(json_objs[url])
	{
		if(json_objs[url] == 'not_ready')
		{
			setTimeout(function(){ refobj.JSON(url) }, 200);
			return;
		}

		refobj.json_obj = json_objs[url];

		//added by TJ on 1/4/2013, every frames have same width and height
		if(refobj.json_obj.frames.count != undefined)
		{
			refobj.use_json = false;
			refobj.frames = refobj.json_obj.frames.count;
			refobj.frameWidth = refobj.json_obj.frames.width;
			refobj.frameHeight = refobj.json_obj.frames.height;
			refobj.frame.style.width = refobj.frameWidth + 'px';
			refobj.frame.style.height = refobj.frameHeight + 'px';

			// find img inside of div
			var startFrame = 0;
			var obj = refobj.frame;
			refobj.images = new Array();
			refobj.toLoad = 0;

			for(var i=0;i<obj.children.length;i++) {
				if(obj.children[i].tagName == 'IMG') {
					var image = new Object();
					image.image = obj.children[i];
					image.rows = Math.floor(image.image.height/obj.offsetHeight);
					image.cols = Math.floor(image.image.width/obj.offsetWidth);

					image.origWidth = image.image.clientWidth; //added by TJ on 11/16/2012
					image.origHeight = image.image.clientHeight; //added by TJ on 11/16/2012

					image.startFrame = startFrame;
					image.frames = image.rows*image.cols;
					startFrame += image.frames;
					image.image.style.position = 'absolute';
					image.image.style.left = '0px';
					image.image.style.top = '0px';
					image.image.style.visibility = (refobj.images.length > 0) ? 'hidden' : 'inherit';
					refobj.images.push(image);

					if(!image.image.complete) {
						refobj.toLoad++;
						addListener(image.image, "load", refobj.imageLoaded);
					}
				}
			}

			if(refobj.scale != 1)
			{
				refobj.frame.style.width = Math.floor(parseInt(refobj.frame.style.width) * refobj.scale) + 'px';
				refobj.frame.style.height = Math.floor(parseInt(refobj.frame.style.height) * refobj.scale) + 'px';
			}
			return;
		}

		refobj.json_obj.status = "loaded";
		if(refobj.json_obj.animations.all)
			refobj.frames = refobj.json_obj.animations.all.frames.length;
		else if(refobj.json_obj.frames)
			refobj.frames = refobj.json_obj.frames.length;

		//check wether using register point or not.
		var regx = refobj.json_obj.frames[0][5];
		var regy = refobj.json_obj.frames[0][6];
		for(var i = 0; i < refobj.json_obj.frames.length; i++)
		{
			if(refobj.json_obj.frames[i][5] != regx || refobj.json_obj.frames[i][6] != regy)
			{
				refobj.use_reg_pt = true;
				break;
			}
		}

		if(refobj.endFrame == -1 || refobj.endFrame > refobj.frames - 1)
			refobj.endFrame = refobj.frames - 1;
		if(refobj.startFrame > refobj.endFrame || refobj.startFrame > refobj.frames)
			refobj.startFrame = 0;

		refobj.dispatchEvent('json_loaded');
	}
	else
	{
		json_objs[url] = 'not_ready';

		ajax(url, {}, function(result) {
			refobj.json_obj = (typeof(result) == 'string') ? JSON.parse(result) : result;

			json_objs[url] = refobj.json_obj; //added by TJ on 10/22/2013

			//added by TJ on 1/4/2013, every frames have same width and height
			if(refobj.json_obj.frames.count != undefined)
			{
				refobj.use_json = false;
				refobj.frames = refobj.json_obj.frames.count;
				refobj.frameWidth = refobj.json_obj.frames.width;
				refobj.frameHeight = refobj.json_obj.frames.height;
				refobj.frame.style.width = refobj.frameWidth + 'px';
				refobj.frame.style.height = refobj.frameHeight + 'px';

				// find img inside of div
				var startFrame = 0;
				var obj = refobj.frame;
				refobj.images = new Array();
				refobj.toLoad = 0;

				for(var i=0;i<obj.children.length;i++) {
					if(obj.children[i].tagName == 'IMG') {
						var image = new Object();
						image.image = obj.children[i];
						image.rows = Math.floor(image.image.height/obj.offsetHeight);
						image.cols = Math.floor(image.image.width/obj.offsetWidth);

						image.origWidth = image.image.clientWidth; //added by TJ on 11/16/2012
						image.origHeight = image.image.clientHeight; //added by TJ on 11/16/2012

						image.startFrame = startFrame;
						image.frames = image.rows*image.cols;
						startFrame += image.frames;
						image.image.style.position = 'absolute';
						image.image.style.left = '0px';
						image.image.style.top = '0px';
						image.image.style.visibility = (refobj.images.length > 0) ? 'hidden' : 'inherit';
						refobj.images.push(image);

						if(!image.image.complete) {
							refobj.toLoad++;
							addListener(image.image, "load", refobj.imageLoaded);
						}
					}
				}

				if(refobj.scale != 1)
				{
					refobj.frame.style.width = Math.floor(parseInt(refobj.frame.style.width) * refobj.scale) + 'px';
					refobj.frame.style.height = Math.floor(parseInt(refobj.frame.style.height) * refobj.scale) + 'px';
				}
				return;
			}

			refobj.json_obj.status = "loaded";
			if(refobj.json_obj.animations.all)
				refobj.frames = refobj.json_obj.animations.all.frames.length;
			else if(refobj.json_obj.frames)
				refobj.frames = refobj.json_obj.frames.length;

			//check wether using register point or not.
			var regx = refobj.json_obj.frames[0][5];
			var regy = refobj.json_obj.frames[0][6];
			for(var i = 0; i < refobj.json_obj.frames.length; i++)
			{
				if(refobj.json_obj.frames[i][5] != regx || refobj.json_obj.frames[i][6] != regy)
				{
					refobj.use_reg_pt = true;
					break;
				}
			}

			if(refobj.endFrame == -1 || refobj.endFrame > refobj.frames - 1)
				refobj.endFrame = refobj.frames - 1;
			if(refobj.startFrame > refobj.endFrame || refobj.startFrame > refobj.frames)
				refobj.startFrame = 0;

			refobj.dispatchEvent('json_loaded');
		});
	}
}

ImageSequence.prototype.imageLoaded = function(event) {
	this.toLoad--;
	if(this.toLoad <= 0) this.ready = true;
}

// move through the frames
ImageSequence.prototype.doAnimation = function() {

	var now = (new Date()).getTime();

	//added by TJ on 11/14/2012, animation with JSON handle differently
	if(this.use_json == true) {

		if(this.json_obj.status == "not_loaded") return;
		
		if(now - this.startTime >= 1000 / this.frameRate) {
			
			//modified by TJ on 2/18/2013, add reverse

			if(this.reverse)
				this.position--;
			else
				this.position++;
			this.startTime = now;
		}

		//modified by TJ on 2/18/2013, reverse mode
		if(this.reverse) {
			if(this.position < this.startFrame) {
				if(this.loop == true) {
					this.position = this.endFrame;
				}
				else {
					if(this.timer) this.timer.stop();
					if(this.hide) this.frame.style.display = 'none';
					this.position = this.startFrame;
					this.goto();
					this.playing = false; //added by TJ on 3/1/2013
					this.dispatchEvent('finish');
					return;
				}
			}
		}
		else {
			if(this.position > this.endFrame) {
				if(this.loop == true) {
					this.position = this.startFrame;
				}
				else {
					if(this.timer) this.timer.stop();
					if(this.hide) this.frame.style.display = 'none';
					this.position = this.endFrame;
					this.goto();
					this.playing = false; //added by TJ on 3/1/2013
					this.dispatchEvent('finish');
					return;
				}
			}
		}
	}

	// when does this happen?
	else if(this.frames < 0) {
		this.position = this.startFrame - Math.round((now - this.startTime)*this.frameRate/1000);
		if(this.position <= this.startFrame + this.frames) {
			if(this.loop) {
				this.position = this.startFrame;
				this.startTime = now;
			}
			else {
				if(this.timer) this.timer.stop();
				if(this.hide) this.frame.style.display = 'none';
				this.playing = false; //added by TJ on 3/1/2013
				this.dispatchEvent('finish');
				return;
			}
		}
	}


	else {

		var dir = this.frameRate/1000;
		if(this.reverse) dir = dir*-1;
		if(this.startFrame > this.endFrame && this.endFrame != -1) dir = dir*-1;

		this.position = this.startFrame + Math.round((now - this.startTime)*dir);

		var atend = false;
		if(this.endFrame != -1) {
			if(this.startFrame < this.endFrame)
				atend = (!this.reverse) ? this.position >= this.endFrame : this.position <= this.startFrame;
			else
				atend = (!this.reverse) ? this.position >= this.startFrame : this.position <= this.endFrame;
		}
		else {
			if(this.reverse)
				atend = (this.position <= this.startFrame);
			else
				atend = (this.position >= this.startFrame + this.frames);
		}

		if(atend) {
			if(this.loop) {
				this.position = this.startFrame;
				this.startTime = now;
			}
			else {
				if(this.timer) this.timer.stop();
				if(this.hide) this.frame.style.display = 'none';
				this.playing = false; //added by TJ on 3/1/2013
				this.dispatchEvent('finish');
				this.position = this.startFrame + this.frames + 1;
				this.goto();
				return;
			}
		}
	}
	this.goto();
	this.frame.style.display = 'block';
	this.dispatchEvent('change');
}


ImageSequence.prototype.goto = function(pos) {
	if(!isNaN(pos)) this.position = pos;

	if(this.frameSequence && this.frameSequence.length)
		var framepos = this.frameSequence[this.position];
	else
		var framepos = this.position;

	// apply any frame specific settings
	if(this.frameSettings && this.frameSettings[this.position]) {
		var settings = this.frameSettings[this.position];
		if(!isNaN(settings.top)) this.frame.style.top = (settings.top * this.scale) + 'px';
		if(!isNaN(settings.left)) this.frame.style.left = (settings.left * this.scale) + 'px';
		if(!isNaN(settings.width)) this.frame.style.width = (settings.width * this.scale) + 'px';
		if(!isNaN(settings.height)) this.frame.style.height = (settings.height * this.scale) + 'px';
		if(!isNaN(settings.rotation)) {
			this.frame.style.webkitTransform = 'rotate('+settings.rotation+'deg)';
			this.frame.style.MozTransform = 'rotate('+settings.rotation+'deg)';
			this.frame.style.msTransform = 'rotate('+settings.rotation+'deg)';
		}
	}

	var framecount = 0;
	//modified by TJ on 11/13/2012
	if(this.use_json == true) {
		var _json_image;
		
		if(this.json_obj.frames[this.position] == undefined) return;

		//added by TJ on 1/3/2013, used only for static animation. check 'Variable Frame' to get correct json file from zoe.
		//make sure stage size of .swf file is 900 by 650
		//modified by TJ on 4/24/2013, apply scale to register point method
		if(this.use_reg_pt == true) {
			this.frame.style.left = Math.round(this.json_obj.frames[this.position][5] * this.scale * -1) + 'px';
			this.frame.style.top = Math.round(this.json_obj.frames[this.position][6] * this.scale * -1) + 'px';
		}
		
		//prevent objects that outside of screen to animate, for saving process power
		var _pos = nodeOffsets(this.frame, 'content_area');
		if(_pos.x > 1000 || _pos.x + parseInt(this.frame.style.width) < 0 || _pos.y > 750 || _pos.y + parseInt(this.frame.style.height) < 0) return;
		
		for(var i = 0; i < this.images.length; i++) {
			if(i == this.json_obj.frames[this.position][4])
				_json_image = this.images[this.json_obj.frames[this.position][4]];

			this.images[i].image.style.visibility = 'hidden';
		}

		this.frame.style.width = Math.round(this.json_obj.frames[this.position][2] * this.scale) + 'px';
		this.frame.style.height = Math.round(this.json_obj.frames[this.position][3] * this.scale) + 'px';

		if(this.scale != 1) {
			_json_image.image.style.width = Math.round(_json_image.origWidth * this.scale) + 'px';
			_json_image.image.style.height = Math.round(_json_image.origHeight * this.scale) + 'px';
		}

		_json_image.image.style.left = Math.round(this.json_obj.frames[this.position][0] * -1 * this.scale) + 'px';
		_json_image.image.style.top = Math.round(this.json_obj.frames[this.position][1] * -1 * this.scale) + 'px';
		_json_image.image.style.visibility = 'inherit';
	}
	else {
		for(i=0;i<this.images.length;i++) {
			var img = this.images[i];
			if(framecount >= img.startFrame && framecount < img.startFrame + img.frames) {
				img.image.style.visibility = 'inherit';
				var imgpos = framepos - img.startFrame;
				img.image.style.left = Math.floor((-this.frameWidth*(imgpos%img.cols)) * this.scale) + 'px'; //modified by TJ on 2/6/2013
				img.image.style.top = Math.floor((-this.frameHeight*Math.floor(imgpos/img.cols)) * this.scale) + 'px'; //modified by TJ on 2/6/2013

				//added by TJ on 2/6/2013
				if(this.scale != 1) {
					img.image.style.width = Math.floor(img.origWidth * this.scale) + 'px';
					img.image.style.height = Math.floor(img.origHeight * this.scale) + 'px';
				}
			}
			else {
				img.image.style.visibility = 'hidden';
			}
			framecount += img.frames;
		}
	}

	// run frame triggers

	if(this.lastFrame	!= framepos) {
		this.lastFrame = framepos;
		if(this.frameEvents && this.frameEvents.length) {
			for(var i=0;i<this.frameEvents.length;i++) {
				if(this.frameEvents[i].frame == framepos )
					this.dispatchEvent(this.frameEvents[i].event);

			}
		}
	}
}

ImageSequence.prototype.start = function(pos) {
	
	if(!isNaN(pos)) this.position = pos;
	if(this.timer) this.timer.stop();
	if(this.images.length) {
		//this.frame.style.display = 'block';
		this.timer = new EnterFrame(this, this.doAnimation);
		this.startTime = (new Date()).getTime();
	}
	this.lastFrame = pos;
	this.playing = true; //added by TJ on 3/1/2013

}

ImageSequence.prototype.stop = function() {
	if(this.timer) this.timer.stop();
	if(this.hide) this.frame.style.display = 'none';

	this.playing = false; //added by TJ on 3/1/2013
	this.paused = false;
	this.pauseTime = 0;
}


ImageSequence.prototype.pause = function() {
	if(this.playing == false)return;
	if(this.timer) this.timer.stop();
	if(this.hide) this.frame.style.display = 'none';

	this.pauseTime = new Date().getTime();
	this.paused = true; //added by TJ on 3/1/2013
}
ImageSequence.prototype.unpause = function() {
	if(this.paused == true){
		if(this.timer) this.timer.stop();
		if(this.images.length) {
			//this.frame.style.display = 'block';
			if(this.pauseTime > 0) {
				var now = new Date().getTime();
				this.startTime = now - (this.pauseTime - this.startTime);
				this.pauseTime = 0;
				this.paused = false;
			}
			this.timer = new EnterFrame(this, this.doAnimation);
		}
		this.playing = true; //added by TJ on 3/1/2013
	}
}


enableEventHandling(ImageSequence);


////////////////////////////////////
////////////////////////////////////
// pulse an image bigger and smaller

function pulseButton(btn, growth, period)
{

	if(typeof(btn) == 'string') btn = document.getElementById(btn);
	this.btn = btn;

	if(growth == undefined) growth = 1.2;
	if(period == undefined) period = 1500;

	this.startLeft                  =   btn.offsetLeft;
	this.startTop                   =   btn.offsetTop;
	this.startWidth                 =   btn.offsetWidth;
	this.startHeight                 =   btn.offsetHeight;

	this.widthTween                 =   new Tween(btn, 'width', btn.offsetWidth, Math.round(btn.offsetWidth*growth), period);
	this.widthTween.loop            =   true;
	this.widthTween.motionFunction  =   tweenerSine;

	//added to scale the btn proportionally. -TM 5/20/2013
	this.heightTween                 =   new Tween(btn, 'height', btn.offsetHeight, Math.round(btn.offsetHeight*growth), period);
	this.heightTween.loop            =   true;
	this.heightTween.motionFunction  =   tweenerSine;


	this.leftTween                  =   new Tween(btn,'left',btn.offsetLeft,Math.round(btn.offsetLeft-btn.offsetWidth*(growth-1)/2),period);
	this.leftTween.loop             =   true;
	this.leftTween.motionFunction   =   tweenerSine;

	this.topTween                   =   new Tween(btn,'top',btn.offsetTop,Math.round(btn.offsetTop-btn.offsetHeight*(growth-1)/2),period);
	this.topTween.loop              =   true;
	this.topTween.motionFunction    =   tweenerSine;
}

pulseButton.prototype.stop = function() {
	if(this.widthTween) this.widthTween.stop();
	if(this.heightTween) this.heightTween.stop();
	if(this.leftTween) this.leftTween.stop();
	if(this.topTween) this.topTween.stop();

	this.btn.style.left = this.startLeft + 'px';
	this.btn.style.top = this.startTop + 'px';
	this.btn.style.width = this.startWidth + 'px';
	this.btn.style.height = this.startHeight + 'px';
}


///////////////////////////////////////
///////////////////////////////////////
// grow button bigger and smaller
// created by TJ on 2/26/2013

function growButton(btn, growth, period)
{
	if(typeof(btn) == 'string') btn = document.getElementById(btn);
	this.btn = btn;

	if(growth == undefined) growth = 1.1;
	if(period == undefined) period = 500;
	this.growth = growth;
	this.period = period;

	this.startLeft = btn.offsetLeft;
	this.startTop = btn.offsetTop;
	this.startWidth = btn.offsetWidth;
	this.startHeight = btn.offsetHeight;

	this.leftTween;
	this.topTween;
	this.widthTween;
	this.heightTween;

	this.grow();
}

growButton.prototype.grow = function()
{
	if(this.leftTween) this.leftTween.stop();
	if(this.topTween) this.topTween.stop();
	if(this.widthTween) this.widthTween.stop();
	if(this.heightTween) this.heightTween.stop();

	this.leftTween = new Tween(this.btn, 'left', this.startLeft, this.startLeft - (((this.startWidth * this.growth) - this.startWidth) / 2), this.period);
	this.topTween = new Tween(this.btn, 'top', this.startTop, this.startTop - (((this.startHeight * this.growth) - this.startHeight) / 2), this.period);
	this.widthTween = new Tween(this.btn, 'width', this.startWidth, this.startWidth * this.growth, this.period);
	this.heightTween = new Tween(this.btn, 'height', this.startHeight, this.startHeight * this.growth, this.period);
}

growButton.prototype.shrink = function()
{
	if(this.leftTween) this.leftTween.stop();
	if(this.topTween) this.topTween.stop();
	if(this.widthTween) this.widthTween.stop();
	if(this.heightTween) this.heightTween.stop();

	this.leftTween = new Tween(this.btn, 'left', parseInt(this.btn.style.left), this.startLeft, this.period);
	this.topTween = new Tween(this.btn, 'top', parseInt(this.btn.style.top), this.startTop, this.period);
	this.widthTween = new Tween(this.btn, 'width', parseInt(this.btn.style.width), this.startWidth, this.period);
	this.heightTween = new Tween(this.btn, 'height', parseInt(this.btn.style.height), this.startHeight, this.period);
}

growButton.prototype.stop = function()
{
	if(this.leftTween) this.leftTween.stop();
	if(this.topTween) this.topTween.stop();
	if(this.widthTween) this.widthTween.stop();
	if(this.heightTween) this.heightTween.stop();

	this.btn.style.left = this.startLeft + 'px';
	this.btn.style.top = this.startTop + 'px';
	this.btn.style.width = this.startWidth + 'px';
	this.btn.style.height = this.startHeight + 'px';
}

////////////////////////////////////////////////////////////////////////////
var activeDragger = null;
var touchCapable = isTouchDevice();

function Dragger(dragger, hitarea, boundingBox, options) {
	var box = new Object();
	if(boundingBox == undefined){
		box.x = 0;
		box.y = 0;
		box.wd = 900;
		box.ht = 650;
	}else{
	//objects should pass in x,y but they aren't right now.
		box.x = boundingBox.x;
		box.y = boundingBox.y;
		box.wd = boundingBox.wd;
		box.ht = boundingBox.ht;
	}
	this.mousepos;
	this.eventPos;
	this.enable;
	this.boundingBox = box;
	this.y;
	this.x;

	// [Caigoy,021617,QA-13808] Make IE hamster item rotation hack optional
	this.options = options || {};
	this.options.ieRotationHack = typeof this.options.ieRotationHack !== 'undefined' 
		? this.options.ieRotationHack 
		: true;
	
	if(typeof(dragger) == 'string') dragger = document.getElementById(dragger);
		this.frame = dragger;
	
	if(typeof(hitarea) == 'string') hitarea = document.getElementById(hitarea);
		this.hitarea = hitarea;
	
	if(this.hitarea == undefined) {	
		for(var i=0;i<this.frame.childNodes.length;i++) {
			if(this.frame.childNodes[i].id == 'dragger_handle') this.hitarea = this.frame.childNodes[i];
		}
	}
	
	if(this.hitarea == undefined) this.hitarea = this.frame;
	var objid = assignObjectId(this);
	this.hitarea.setAttribute('objref', objid)
	this.hitarea.ref = this;
	// what is this? it is slowing down dragging and loading all over the site
	//this.mop = new Image();
	//this.mop.style.height = this.frame.offsetHeight + 10 +'px';
	//this.mop.style.width = this.frame.offsetWidth + 10 +'px';
	//this.mop.style.pointerEvents = 'none';
	//this.mop.style.display = 'none';
	//this.mop.style.position = 'absolute';
	//this.mop.style.border = '0px';
	//this.mop.style.opacity = '0';
	//document.getElementById('content_area').appendChild(this.mop);
	//modified by TJ on 4/1/2013, use proper listener

	//if(document.createTouch) {

	if(touchCapable) {//MAG 04/30/2014: We are now detecting touch devices by using isTouchDevice() function (in utils.js)
		addListener(this.hitarea, 'touchstart', this.draggerStart);
	}
	//else if (!usingCordova) //diff for android 1.15.14 DAG
	else 
	{ // MAG 05/05/2014: We don't need to test for the 'usingCordova' variable since the addListener() function (in utils.js) won't add mouse events to MOBILE devices
		addListener(this.hitarea, 'mousedown', this.draggerStart);
	}
}

//BAD added this to allow rotation in hamster on IE 5/9/14
var prvH = 0;
var prvW = 0;
var prevTimeStamp = 0;
Dragger.prototype.draggerStart = function(event, newdragger) {
	if (event && event.stopImmediatePropagation) event.stopImmediatePropagation();
	
	if(event && event.touches && event.touches.length > 1) {
		return;
	}

	//if(!document.createTouch && !detectLeftButton(event)) {
	if(!MOBILE && !detectLeftButton(event)){	//MAG & DAG 05/05/2014
		return;
	}
	
	if(newdragger) activeDragger = newdragger;
	else activeDragger = getObjectByRef(getEventTarget(event), 'objref');
	if(activeDragger) {
	//changed by TM 12/19/13 to use the utils function to find mouse/touch position
	var eventPos = pagePosition(event); //not the same diff from MP but works the same. 1.15.14 DAG
	this.eventPos = eventPos;
	activeDragger.eventPos = eventPos;
	activeDragger.scrollx = eventPos.x - activeDragger.frame.offsetLeft;
	activeDragger.scrolly = eventPos.y - activeDragger.frame.offsetTop;
	activeDragger.frame.parentNode.appendChild(activeDragger.frame);
	//BAD added this to allow rotation in hamster on IE 5/9/14
	prvH = activeDragger.frame.style.top;
	prvW = activeDragger.frame.style.left;
	prevTimeStamp = event.timeStamp;

	//if(document.createTouch) //modified by TJ on 4/1/2013, use proper listener
	if(touchCapable) //MAG 04/30/2014: We are now detecting touch devices by using isTouchDevice() function (in utils.js)
	{
		addListener(document.body, 'touchmove', activeDragger.draggerMove);
		addListener(document.body, 'touchend', activeDragger.draggerEnd);
	
	}
	//else if (!usingCordova) //diff for android 1.15.14 DAG
	else 
	{ // MAG 05/05/2014: We don't need to test for the 'usingCordova' variable since the addListener() function (in utils.js) won't add mouse events to MOBILE devices
		addListener(document.body, 'mousemove', activeDragger.draggerMove);
		addListener(document.body, 'mouseup', activeDragger.draggerEnd);
	}

	//addListener(activeDragger.hitarea, 'click', activeDragger.draggerClick);
	activeDragger.enable = true;
	activeDragger.xpos = activeDragger.frame.offsetLeft;
	activeDragger.ypos = activeDragger.frame.offsetTop;
	activeDragger.dispatchEvent('start');
	//activeDragger.mop.style.display = 'block';
	cancelEvent(event);
	}
}

Dragger.prototype.draggerMove = function(event) {
	if(event && event.touches && event.touches.length > 1 ) {
		return;
	}
	// Arian - Touch screen monitors are too sensitive. Delay drag by 50 miliseconds.
	if(Math.abs(prevTimeStamp - event.timeStamp) < 50){
		return;
	}
	if(activeDragger) {
		if(activeDragger.enable == false){
			return;
		}
	
	var p = activeDragger.frame.offsetLeft;
	var mousepos = pagePosition(event);
	this.mousepos = mousepos;
	activeDragger.mousepos = mousepos;
	var marginx = parseInt(activeDragger.frame.style.marginLeft.replace('px',''));
	var marginy = parseInt(activeDragger.frame.style.marginTop.replace('px',''));
	if(isNaN(marginx)) marginx = 0;
	if(isNaN(marginy)) marginy = 0;
	activeDragger.frame.style.left = Math.max(activeDragger.boundingBox.x, Math.min(mousepos.x - activeDragger.scrollx - marginx,
	activeDragger.boundingBox.wd - activeDragger.frame.offsetWidth - 2*marginx))+'px';
	activeDragger.frame.style.top = Math.max(activeDragger.boundingBox.y, Math.min(mousepos.y - activeDragger.scrolly - marginy,
	activeDragger.boundingBox.ht - activeDragger.frame.offsetHeight - 2*marginy))+'px';
	
	//BAD added this to allow rotation in hamster on IE 5/9/14
	// [Caigoy,021617,QA-13808] Make IE hamster item rotation hack optional
	if(activeDragger.options.ieRotationHack && prvH == activeDragger.frame.style.top && prvW == activeDragger.frame.style.left){
		cancelEvent(event);
		return;
	}	
	prvH = activeDragger.frame.style.top;
	prvW = activeDragger.frame.style.left;
	
	//trace(activeDragger.frame.style.left+' '+activeDragger.frame.style.top);
	//if(!activeDragger.frame.style.left ||!activeDragger.frame.style.top)trace('hi');
	//leave this trace statement in or it will not work properly on ipad(for now)
	//clearTracer();
	//activeDragger.mop.style.top = activeDragger.frame.offsetTop - 5 + 'px';
	//activeDragger.mop.style.left = activeDragger.frame.offsetLeft - 5 + 'px';
	activeDragger.dispatchEvent('move');
	}
	cancelEvent(event);
	return true;
}

Dragger.prototype.draggerEnd = function(event) {
	var obj = activeDragger;
	if (event && event.stopImmediatePropagation) event.stopImmediatePropagation();
	if(event && event.touches && event.touches.length > 0) {
		obj.enable = false;
		return;
	}
	/*if(this.mousepos){
	var marginx = parseInt(activeDragger.frame.style.marginLeft.replace('px',''));
	var marginy = parseInt(activeDragger.frame.style.marginTop.replace('px',''));
	if(isNaN(marginx)) marginx = 0;
	if(isNaN(marginy)) marginy = 0;
	var mouseTop = this.mousepos.y - activeDragger.scrolly - marginy;
	var mouseLeft = this.mousepos.x - activeDragger.scrollx - marginx;
	if((mouseTop > activeDragger.boundingBox.y - activeDragger.frame.offsetHeight + activeDragger.boundingBox.ht || mouseTop < activeDragger.boundingBox.y) ||
	(mouseLeft > activeDragger.boundingBox.x - activeDragger.frame.offsetWidth + activeDragger.boundingBox.wd || mouseLeft < activeDragger.boundingBox.x))
	activeDragger.dispatchEvent('oob');
	}*/
	//diff for android 1.15.14 DAG
	//if(obj) {

	//if(document.createTouch){
	if(touchCapable) {//MAG 04/30/2014: We are now detecting touch devices by using isTouchDevice() function (in utils.js)
		removeListener(document.body, 'touchmove', obj.draggerMove);
		removeListener(document.body, 'touchend', obj.draggerEnd);
	//}else if(!usingCordova){
	}else {
		// MAG 05/05/2014: We don't need to test for the 'usingCordova' variable since the addListener() function (in utils.js) won't add mouse events to MOBILE devices
		removeListener(document.body,'mousemove',obj.draggerMove);
		removeListener(document.body,'mouseup',obj.draggerEnd);
		removeListener(obj.hitarea,'click',obj.draggerClick); // MAG 05/06/2014: This event lisneter is never added. This line seems to be unnecesary.
		cancelEvent(event);
	}
	activeDragger.dispatchEvent('end');
	//activeDragger.mop.style.display = 'none';
	activeDragger = null;
}

Dragger.prototype.addDraggerEvents = function(){
	//modified by TJ on 4/1/2013, use proper listener
	//if(document.createTouch) {
	if(touchCapable) {//MAG 04/30/2014: We are now detecting touch devices by using isTouchDevice() function (in utils.js)		
		addListener(this.hitarea, 'touchstart', this.draggerStart);
	}
	
	//else if(!usingCordova) {//diff for android 1.15.14 DAG
	else { // MAG 05/05/2014: We don't need to test for the 'usingCordova' variable since the addListener() function (in utils.js) won't add mouse events to MOBILE devices
		addListener(this.hitarea, 'mousedown', this.draggerStart);
	}
}

Dragger.prototype.removeDraggerEvents = function(){
	removeListener(this.hitarea, 'touchstart', this.draggerStart);
	removeListener(this.hitarea, 'mousedown', this.draggerStart);
}

Dragger.prototype.draggerClick = function(event) {
	cancelEvent(event);
}

// val to set the dragger to be enable or disable. (val = True/False). RL 1/15/2014
Dragger.prototype.draggerEnable = function(val){
	activeDragger.enable = val;
	this.enable = activeDragger.enable;
}

enableEventHandling(Dragger);

////////////////////////////////////////////////////////////////////////////

/*****************************************************************************************/
/*****************************************************************************************/
/********************************	   Canvas Wrapper	   *******************************/
/*****************************************************************************************/
/*****************************************************************************************/

var canvas_stream;
function CanvasA	(id)	{
		if(typeof id == 'string')
			this.canvas							=	document.getElementById(id);
		else	
			this.canvas							=	id;
		this.stream								= this.canvas.getContext('2d');
		this.fps								= this.optimalFPS();
		
		this.gradient;
	
}
//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Drawing States		  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//just saves the properties
CanvasA.prototype.save							=	function(){
	if(this.stream) {
		this.stream.save();
	} else {
		console.log("no stream for saving canvas");
	}
}

//restores saves the properties
CanvasA.prototype.restore						=	function(){
	if(this.stream) {
		this.stream.restore();
	} else {
		console.log("no stream for saving canvas");
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Patterns			  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

//first argument has to be a img, video, or canvas element
//repeat argument can be no-repeat, repeat, repeat-x, repeat-y
CanvasA.prototype.createPattern						=	function(elem, repeat){
	if(this.stream) {
		return this.stream.createPattern(elem, repeat);
		
	} else {
		console.log("no stream for saving canvas");
	}
	
}

//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Drawing Paths		  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

CanvasA.prototype.moveTo						=	function(moveTo, callback){
	if(this.stream) { 
		if(moveTo && typeof moveTo == 'object') {
			this.stream.moveTo(moveTo.x, moveTo.y);
		}
	
	} else {
		console.log("no stream for move to");
	}
	

}


CanvasA.prototype.beginPath						=	function(moveTo, callback){
	if(this.stream) {
		
		if(moveTo && typeof moveTo == 'object') {
			this.moveTo(moveTo);
		}
		
		this.stream.beginPath();
		
		if(callback && typeof callback == 'function') {
			callback();
		}
		
	} else {
		console.log("no stream for begining path");
	}
}
CanvasA.prototype.closePath						=	function(callback){
	if(this.stream) {
		
		
		this.stream.closePath();
		
		
		if(callback && typeof callback == 'function') {
			callback();
		}
		
	} else {
		console.log("no stream for closing path");
	}
}


//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Text			  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
CanvasA.prototype.font							=	function(callback){
	if(this.stream) {} else {	console.log("no stream for font");	}
}
CanvasA.prototype.textAlign						=	function(callback){
	if(this.stream) {	} else {	console.log("no stream for text align"); }
}
CanvasA.prototype.textBaseline					=	function(callback){
	if(this.stream) {	} else {	console.log("no stream for text baseline");	}
}
CanvasA.prototype.fillText						=	function(callback){
	if(this.stream) {	} else {	console.log("no stream for filltext");	}
}
CanvasA.prototype.strokeText					=	function(callback){
	if(this.stream) {	} else {	console.log("no stream for strokeText");	}
}
CanvasA.prototype.measureText					=	function(callback){
	if(this.stream) {	} else {	console.log("no stream for measureText");	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Gradiants			  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

CanvasA.prototype.addColorStop			=	function(position, color, callback){
	if(this.stream) {

		this.gradient.addColorStop(position, color);
		
		if(callback && typeof callback == 'function') {
			callback();
		}
	} else {	
		console.log("no stream for add color stop");
	}

}

CanvasA.prototype.createRadialGradient			=	function(x0, y0, r0, x1, y1, r1, callback){
	if(this.stream) {	
		
		this.gradient								=	this.stream.createRadialGradient(x0, y0, r0, x1, y1, r1);
		
		if(callback && typeof callback == 'function') {
				callback();
		}
	} else {	
		
		console.log("no stream for create radial gradient");	
		
	}

}
//starts linear gradient
CanvasA.prototype.createLinearGradient				=	function(x0, y0, x1, y1, callback){
	if(this.stream) {	
		
		this.gradient								=	this.stream.createLinearGradient(x0, y0, x1, y1);
		

	if(callback && typeof callback == 'function') {
			callback();
	}

} else {	console.log("no stream for create linear gradient");	}

}
CanvasA.prototype.addGradient						=	function(){
	if(this.stream) {
		
		this.stream.fillStyle						=	this.gradient;
	
	} else {
		console.log("no stream for create add gradient");
	}
}




//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Shadow				  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

CanvasA.prototype.addShadows					=	function(styleObj, callback){
	if(this.stream) {	
		if(styleObj && typeof styleObj == 'object') {
			if(styleObj.shadowColor)
				this.stream.shadowColor			=	styleObj.shadowColor;
			if(styleObj.shadowOffsetX)
				this.stream.shadowOffsetX		=	styleObj.shadowOffsetX;
			if(styleObj.shadowOffsetY)
				this.stream.shadowOffsetY		=	styleObj.shadowOffsetY;
			if(styleObj.shadowBlur)
				this.stream.shadowBlur			=	styleObj.shadowBlur;
		}
		if(callback && typeof callback == 'function') {
			callback();
		}
	} else {	console.log("no stream for shadow color");	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Lines				  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/* 
	object parameters -- 
		color: color for the link
		lineWidth: width of the line
		lineCap : 
			{
				lineCap : 'butt',
				lineCap : 'round',
				lineCap : 'square'
			}
		//line join has to be added on the second line
		lineJoin 
			{
				lineJoin : 'miter',
				lineJoin : 'round',
				lineJoib : 'bevel'
			}
 */


CanvasA.prototype.addLine						=	function(lineTo, styleObj, callback){
	if(this.stream) {
		if(styleObj && typeof styleObj == 'object') {
			if(styleObj.color)
				this.stream.strokeStyle				=	styleObj.color;
			if(styleObj.lineWidth)
				this.stream.lineWidth				=	styleObj.lineWidth;
			if(styleObj.lineCap)
				this.stream.lineCap					=	styleObj.lineCap;
			if(styleObj.lineJoin)
				this.stream.lineJoin				=	styleObj.lineJoin;
		}
		
		if(callback && typeof callback == 'function') {
			callback();
		}
		
		
		this.stream.lineTo(lineTo.x, lineTo.y);
		
	}else {
		console.log("no stream for adding line");
	}
}

CanvasA.prototype.stroke						=	function(){
	if(this.stream) {
		this.stream.stroke();
	}	else {
		console.log("no stream for adding stroke");
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Squares				  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

CanvasA.prototype.fillRect						=	function(color, coordinates, callback){
	if(this.stream) {
		if(color) 
			this.stream.fillStyle			=	color;
		if(!coordinates) {
			this.stream.fillRect(0, 0, this.canvas.width, this.canvas.height);
		} else
			this.stream.fillRect(coordinates.x0, coordinates.y0, coordinates.x1, coordinates.y1);
			
		if(callback && typeof callback == 'function')	
			callback();
			
			
	} else {
		console.log("no stream for fill rect");
	}

}

CanvasA.prototype.clearRect						=	function(coordinates, callback){
	if(this.stream) {
		
		if(!coordinates) {
			this.stream.clearRect(0, 0, this.canvas.width, this.canvas.height);
		} else
			this.stream.clearRect(coordinates.x0, coordinates.y0, coordinates.x1, coordinates.y1);
		
		if(callback && typeof callback == 'function')	
			callback();
	
	} else {
		console.log("no stream for clearing rectange");
	}
}


CanvasA.prototype.strokeRect					=	function(styleObj, coordinates, callback){
	if(this.stream) {
		if(styleObj && typeof styleObj == 'object') {
			if(styleObj.color)
				this.stream.strokeStyle				=	styleObj.color;
			if(styleObj.lineWidth)
				this.stream.lineWidth				=	styleObj.lineWidth;
		}
		if(!coordinates) {
			this.stream.strokeRect(0, 0, this.canvas.width, this.canvas.height);
		} else
			this.stream.strokeRect(coordinates.x0, coordinates.y0, coordinates.x1, coordinates.y1);
			
		if(callback && typeof callback == 'function')	
			callback();	
		
	} else {
		console.log("no stream for stroking rectangel");
	}
}

CanvasA.prototype.fill						=	function(styleObj, callback){
	if(this.stream) {
		if(styleObj && typeof styleObj == 'object') {
			if(styleObj.fillStyle)
				this.stream.fillStyle		=	styleObj.fillStyle;
		}
		
		this.stream.fill();
		
		if(callback && typeof callback == 'function')	
			callback();
		
	}	else {
		console.log("no stream for adding stroke");
	}
}


//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Arcs 				  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//x position y position r radius sA starting angle eA ending Angle aC anti-clockwise
//angles are in radians not degrees 

CanvasA.prototype.arc							=	function(styleObj, x, y, r, sA, eA, aC, callback ){
	if(this.stream) {
		if(styleObj && typeof styleObj == 'object') {
				if(styleObj.color)
					this.stream.strokeStyle				=	styleObj.color;
				if(styleObj.fillStyle)
					this.stream.fillStyle				=	styleObj.fillStyle;
				if(styleObj.lineWidth)
					this.stream.lineWidth				=	styleObj.lineWidth;
		}
		
		this.stream.arc(x, y, r, sA, eA, aC);
		
		if(callback && typeof callback == 'function')	
			callback();
		
	}	else {
		console.log("no stream for adding arc");
	}
}
CanvasA.prototype.arcTo							=	function(x1, y1, x2, y2, r){





}
CanvasA.prototype.convertToRadians				=	function (degrees) {
	return (Math.PI / 180) * degrees;
}
CanvasA.prototype.convertToDegrees				=	function (radians) {
	return (Math.PI / 180) / radians;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Curves 				  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
CanvasA.prototype.bezierCurveTo					=	function(styleObj, cx1, cy1, cx2, cy2, end1, end2, callback){
	if(this.stream) {
		if(styleObj && typeof styleObj == 'object') {
				if(styleObj.color)
					this.stream.strokeStyle				=	styleObj.color;
				if(styleObj.lineWidth)
					this.stream.lineWidth				=	styleObj.lineWidth;
		}
		
		this.stream.bezierCurveTo(cx1, cy1, cx2, cy2, end1, end2);
		
		if(callback && typeof callback == 'function')	
			callback();	
	
	} else {
		console.log("no stream for adding bezier");
	}
}

CanvasA.prototype.quadracticCurve				=	function(styleObj, cx, cy, x, y, callback){
	if(this.stream) {
		if(styleObj && typeof styleObj == 'object') {
			if(styleObj.color)
				this.stream.strokeStyle				=	styleObj.color;
			if(styleObj.lineWidth)
				this.stream.lineWidth				=	styleObj.lineWidth;
		}
			
		this.stream.quadraticCurveTo(cx, cy, x, y);
		
		if(callback && typeof callback == 'function')	
				callback();	
		
	} else {
		console.log("no stream for adding quadradic curve");
	}
}



//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Tools 				  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

CanvasA.prototype.addStyle						= function(styleObj, callback)	{
	if(this.stream) {
		if(styleObj && typeof styleObj == 'object') {
			if(styleObj.color)
				this.stream.strokeStyle				=	styleObj.color;
			if(styleObj.lineWidth)
				this.stream.lineWidth				=	styleObj.lineWidth;
			if(styleObj.fillStyle)
				this.stream.fillStyle				=	styleObj.fillStyle;	
		}
		
		if(callback && typeof callback == 'function')	
				callback();	
		
	} else {
		console.log("no stream for adding style");
	}
}		
CanvasA.prototype.setGlobalAlpha				=	function(alpha){
	if(this.stream) {
		if(!isNaN(alpha)) {
			this.stream.globalAlpha   			= alpha;
		}
	} else {
		console.log("no stream for set global alpha");
	}
}
		
//////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////		Utils				  ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
CanvasA.prototype.optimalFPS					= function(callback){
	
	return window.requestAnimationFrame || 
		   window.webkitRequestAnimationFrame || 
		   window.mozRequestAnimationFrame || 
		   window.oRequestAnimationFrame || 
		   window.msRequestAnimationFrame ||
		   function(callback) {
				  window.setTimeout(callback, 1000 / 60);
			};

}
//////////////////////////////////////////////////////////////////////////////////////////////////////

	
	

////////////////////////////////////////////////////////////////////////////

//should move translation stuff
function showTranslation(event) {
	var obj = getEventTarget(event);
	if(obj.url.search('snd_') != -1) return; // old system
	var parts = obj.url.split('/').pop().split('.');
	if(parts.length != 2) return; // new system
	//trace(obj.url);
	ajax('/html5/xml/checklang.php', {soundfile:obj.url, cid:CID, lang:snd_language}, showTranslationResult);
}

//2.21.13 dh
function showTranslationResult(data) {
	if(data.text || data.soundfile){
		var lbl = document.getElementById('audioLangTranslationLbl');
		var aLenHistory = audioLangHistory.length;
		var audioLangHistoryUpdated = false;

		if(aLenHistory > 0){
			for(var i = 0; i < aLenHistory; i++){
				if(audioLangHistory[i].file == data.file){
					audioLangHistory.splice(i, 1);
					audioLangHistory.push({txt:decodeURIComponent(data.text), file:data.file, src:data.soundfile});
					audioLangHistoryUpdated = true;
					break;
				}
			}
		}

		if(lbl.innerHTML == decodeURIComponent(data.text))
			return;
		else
			lbl.innerHTML = decodeURIComponent(data.text);

		if(aLenHistory == 5 && audioLangHistoryUpdated == false) audioLangHistory.shift();
		if(audioLangHistoryUpdated == false) audioLangHistory.push({txt:lbl.innerHTML, file:data.file, src:data.soundfile});

		if(document.getElementById("audio_lang_history") && typeof alhSetupTranslations == 'function') {
			alhSetupTranslations();
		}
	}
}

function onAudioLangTranslationBoxClick(){
	showPopup('audio_lang_history');
}

////////////////////////////////////////////////////////////////////////////
var IS_OPEN = "is_open";
var IS_CLOSED = "is_closed";
var CLOSING = "closing";
var OPENING = "opening";

var sidepanelTweens = new Array();
var sidepanels = new Array();

var isBadAndroid = (typeof isBadAndroid == 'undefined') ? false : isBadAndroid;
var disable_sp_animate = (typeof disable_sp_animate == 'undefined') ? false : disable_sp_animate;
var user_agent = navigator.userAgent;
var isAndroid = (user_agent.indexOf('NATIVE_ANDROID') != -1) ? true : false;
//var isAndroid = false;

//05.30.14 JK
var sidepanel_timefactor = 0.5;

if (typeof user_agent != 'undefined' && user_agent == 'NEW_SHELL' || isAndroid == true)
	var topMost = 25;
else {
    var topMost = 30;
}

//var closePosRight = 953;
//var closePosLeft = 0;
var frameWidth = 1024;
var tabPadding = 3;
var currentSidepanel = '';
function registerSidepanel(id, persist, side, closePos) {
	if(typeof(closePos) === "undefined") {
		if(side == "left") {
			closePos = 0;
		}
		else {
			closePos = 965;
		}
	}
	
	sidepanels.push({id:id, persist:persist, side:side, openState:IS_CLOSED, closePos:closePos});


	arrangeSidepanels();
}

function arrangeSidepanels() {
	//trace("arrangeSidepanels", sidepanels.length);
		var topRight = 70;

	topRight = typeof sidepanelIconPos != 'undefined' ? sidepanelIconPos : topRight;
	
	var topLeft = 50;

	var tempPersist = [];
	var tempNoPersist = [];

	//currentSidepanel = '';
	for(var i=0;i<sidepanels.length;i++){
		if(sidepanels[i].persist == 1)
			tempPersist.push(sidepanels[i]);
		else
			tempNoPersist.push(sidepanels[i]);
	}
	sidepanels = tempPersist.concat(tempNoPersist);
	for(var i=0; i<sidepanels.length; i++) {
		var slider = document.getElementById("sidepanel_slider"+sidepanels[i].id);
		var tab = document.getElementById("sidepanel_tab"+sidepanels[i].id);
		var mask = document.getElementById("sidepanel_mask"+sidepanels[i].id);
		var holder = document.getElementById("sidepanel_holder"+sidepanels[i].id);

		slider.style.top = topMost + 'px';
		if(sidepanels[i].side=='left') {
			tab.style.top = topLeft+"px";
			slider.style.left = sidepanels[i].closePos+"px";
			mask.style.left ='0px';
			holder.style.left = -1* holder.offsetWidth + 'px';

			topLeft += tab.offsetHeight + tabPadding;
		}
		else {
			tab.style.top = topRight+"px";
			slider.style.left =sidepanels[i].closePos+"px";
			
			topRight += tab.offsetHeight + tabPadding;
			if(sidepanels[i].persist == 1)topRight += 3;
		}
		
		if(mask) {
			mask.style.width = 0;
			mask.style.visibility = "hidden";
		}
		sidepanels[i].openState = IS_CLOSED;
	/*	var  eventName       = document.body.style.webkitBorderRadius? "webkitTransitionEnd":"transitionend";
		addListener('sidepanel_slider'+sidepanels[i].id,"webkitTransitionEnd",function(e){
			var tar = getEventTarget(e);
			sidepanel_adjustTabs(tar.id)
		});		

		addListener('sidepanel_slider'+sidepanels[i].id,"transitionend",function(e){
			var tar = getEventTarget(e);
			sidepanel_adjustTabs(tar.id)
		});*/
	}

}

function sidepanel_expand(id){
	var slider = document.getElementById("sidepanel_slider"+id);
	var holder = document.getElementById("sidepanel_holder"+id);
	var index = getSidepanelIndex(id);
	var element_names = ["inventory_area","items_scroll"]

  if(sidepanels[index].openState == IS_OPEN || sidepanels[index].openState == OPENING) {
		// Created to handle IE bug that set scrollTop to 0. Clark 02/25/2014
		// var browser_elements = BROWSER.split(" ");
		// if (browser_elements[0].indexOf('IE') != -1 && eval(browser_elements[1]) < 10){
		// 	var slider_area = (document.getElementsByClassName(element_names[0]).length != "") ? element_names[0] : element_names[1];
		// 	scrollPositionIE(slider_area); 	
		// } 
		sidepanel_close(id);
		return;
	}else {
		for(var i=0; i<sidepanels.length; i++) {
			var panel = document.getElementById("sidepanel_slider"+sidepanels[i].id);
			if(panel && sidepanels[i].id != id && sidepanels[i].openState == IS_OPEN) { sidepanel_close(sidepanels[i].id); }
			else if(sidepanelTweens[sidepanels[i].id] && sidepanels[i].id == id) { sidepanelTweens[sidepanels[i].id].stop(); }
		}
		sidepanel_open(id);
		// Created to handle IE bug that set scrollTop to 0. Clark 02/25/2014
		// var browser_elements = BROWSER.split(" ");
		// if (browser_elements[0] == 'IE' && browser_elements[1] < 10){
		// 	var slider_area = (document.getElementsByClassName(element_names[0]).length != "") ? element_names[0] : element_names[1];
		// 	var curr_pos = setPositionIE(slider_area);
		// 	var div_element = document.documentElement || document;
		// 	var doc_element = div_element.getElementsByClassName(slider_area)[0].scrollTop = curr_pos;	
		// }
	}
}

// Created to handle IE bug that set scrollTop to 0. Clark 02/25/2014
function scrollPositionIE(class_name)
{
	var inventory_area = document.getElementsByClassName(class_name);
	var current_scroll_position = inventory_area[0].scrollTop;
	setCookie('current_scroll_position',current_scroll_position, 3600);
}

function setPositionIE(class_name)
{
	var current_position = getCookie('current_scroll_position');
	return current_position;
}
/////////////////////////////////////////////////////////////////////
// In multiple side panel situation, hidden the other side panel tab when one of tab is selected
function hideOtherSidePanelTab(id) {
	for (var i=0; i<sidepanels.length; i++) {
		if (sidepanels[i].id != id) {
			var tabToBeHide = document.getElementById('sidepanel_tab'+sidepanels[i].id);
			tabToBeHide.style.visibility = 'hidden';
		}
	}
}
// In multiple side panel situation, show all the other side panel tab when any side panel is close
function showAllSidePanelTab() {
	for (var i=0; i<sidepanels.length; i++) {
		var tabToBeHide = document.getElementById('sidepanel_tab'+sidepanels[i].id);
		tabToBeHide.style.visibility = 'visible';
	}
}

// [Caigoy,061715,QA-3652] For hiding SP tabs that would overlap progress panel in path_section
function hideAllSidePanelTab() {
	sidepanels.forEach(function (tab) {
		document.querySelector('#sidepanel_tab' + tab.id).style.visibility = 'hidden';
	});
}

var close_pos_tmp = ''; //arsen
function sidepanel_open(id) {
	if (sidepanels.length >1) {
		hideOtherSidePanelTab(id);
	}
	
	if (typeof SidePanel == 'function') {
		if (current_sidepanel_index != -1)
		side_panels[current_sidepanel_index].hide();
	}
	var slider = document.getElementById("sidepanel_slider"+id);
	var holder = document.getElementById("sidepanel_holder"+id);
	var mask = document.getElementById("sidepanel_mask"+id);
	var index = getSidepanelIndex(id);
	var trashCan = document.getElementById('trash_can');

	if (trashCan !== null) {
		trashCan.style.right = "580px";
	}

	if (isBadAndroid && disable_sp_animate) { //arsen
		close_pos_tmp = slider.style.left;
		slider.style.left = '260px';
		mask.style.visibility = 'visible';
		dispatchOpenSidepanel(id,false);
		sidepanels[index].openState = 'is_open';
		return;
	}

	if(slider && holder) {
		//slider.parentNode.appendChild(slider);
		//05.30.14 JK changed .5 to sidepanel_timefactor
		var	time = (holder.offsetWidth + slider.offsetLeft - sidepanels[index].closePos) * sidepanel_timefactor;
		//var	time = (holder.offsetWidth + slider.offsetLeft - sidepanels[index].closePos) * .5;

		if(time > 0) {
			if(sidepanelTweens[index]) { sidepanelTweens[index].stop(); }
			
			if(sidepanels[index].side == "left") {
				/*slider.style.left = sidepanels[index].closePos + holder.offsetWidth +'px';
				mask.style.left = sidepanels[index].closePos - (sidepanels[index].closePos + holder.offsetWidth) + 'px';
				mask.style.width = (sidepanels[index].closePos + (sidepanels[index].closePos + holder.offsetWidth)) + 'px';
				holder.style.left = 0 + 'px';
				mask.style.visibility = "visible";*/

				sidepanelTweens[index] = new Tween(slider, "left", slider.offsetLeft, sidepanels[index].closePos + holder.offsetWidth, time);
			} else {
			//	slider.style.left = sidepanels[index].closePos - holder.offsetWidth +'px';
				//mask.style.visibility = "visible";
				//mask.style.width = (holder.offsetWidth) + 'px';
				//var  eventName       = document.body.style.webkitBorderRadius? "webkitTransitionEnd":"transitionend";
				//addListener(slider,eventName,function(){sidepanel_adjustTabs(slider.id)});
				sidepanelTweens[index] = new Tween(slider, "left", slider.offsetLeft, sidepanels[index].closePos - holder.offsetWidth, time);
			}
			addListener(sidepanelTweens[index], 'change', sidepanel_adjustMask);
			addListener(sidepanelTweens[index], 'finish', sidepanel_adjustTabs);
			addListener(sidepanelTweens[index], 'finish', function(){dispatchOpenSidepanel(id,false)});
			dispatchOpenSidepanel(id,true);
		}
		sidepanels[index].openState = OPENING;
	}
}

function sidepanel_close(id) {
	var slider = document.getElementById("sidepanel_slider"+id);
	var holder = document.getElementById("sidepanel_holder"+id);
	var index = getSidepanelIndex(id);
	var mask = document.getElementById("sidepanel_mask"+id);
	var trashCan = document.getElementById('trash_can');

	if (trashCan !== null) {
		trashCan.style.right = "0";
	}

	if (isBadAndroid && disable_sp_animate) { //arsen
		slider.style.left = close_pos_tmp;
		mask.style.visibility = 'hidden';
		dispatchCloseSidepanel(id,false);
		// sidepanel_adjustTabs();
		sidepanels[index].openState = 'is_closed';
		return;
	}
	
	if(slider) {
		if(sidepanels[index].side == "left") {
			var time = (sidepanels[index].closePos + slider.offsetLeft) * .5;
		} else {
			var time = (sidepanels[index].closePos - slider.offsetLeft);
		}
		if(time > 0) {
			if(sidepanelTweens[index]) { sidepanelTweens[index].stop(); }
			

			if(sidepanels[index].side == "left") {
				/*slider.style.left = 0 + 'px';
				mask.style.left = '0px';
				mask.style.visibility = "hidden";
				mask.style.width = '0px';
				holder.style.left = -1* holder.offsetWidth + 'px';*/
				
				sidepanelTweens[index] = new Tween(slider, "left", slider.offsetLeft, sidepanels[index].closePos, time);

			}else {
				//slider.style.left = sidepanels[index].closePos + 'px';
				//mask.style.visibility = "hidden";
				//mask.style.width = '0px';
				//var  eventName       = document.body.style.webkitBorderRadius? "webkitTransitionEnd":"transitionend";
				sidepanelTweens[index] = new Tween(slider, "left", slider.offsetLeft, sidepanels[index].closePos, time);
			}
				addListener(sidepanelTweens[index], 'change', sidepanel_adjustMask);
				addListener(sidepanelTweens[index], 'finish', sidepanel_adjustTabs);
				if (sidepanels.length >1) {
					addListener(sidepanelTweens[index], 'finish', showAllSidePanelTab);
				}
				addListener(sidepanelTweens[index], 'finish', function(){dispatchCloseSidepanel(id,false);});
				dispatchCloseSidepanel(id,true);
		}
		sidepanels[index].openState = CLOSING;
	}
}

function sidepanel_closeall() {
	for(var i=0; i<sidepanels.length; i++) {
		var panel = document.getElementById("sidepanel_slider"+sidepanels[i].id);
		if(panel) {
			sidepanel_close(sidepanels[i].id);
		}
	}
}

function sidepanel_adjustMask(event) {
	
	if (!sidepanels.length) {
		cleanupSidepanels(); // [Caigoy,060815,QA-362] Fix for trace errors; remove tween 'change' listener when no sidepanels are found
	}

	var id = this.obj.id.substring(16);
	var slider = document.getElementById("sidepanel_slider"+id);
	var mask = document.getElementById("sidepanel_mask"+id);
	var holder = document.getElementById("sidepanel_holder"+id);
	var index = getSidepanelIndex(id);
	
	if(sidepanels[index].side == "left") {
		mask.style.width = (sidepanels[index].closePos + slider.offsetLeft) + 'px';
		mask.style.left = sidepanels[index].closePos - slider.offsetLeft + 'px';
		if(this.finish > sidepanels[index].closePos) holder.style.left = slider.offsetLeft - this.finish + 'px';
		else holder.style.left = slider.offsetLeft - (holder.offsetWidth) + 'px';
	}
	else {
		mask.style.width = (sidepanels[index].closePos - slider.offsetLeft - mask.clientLeft) + 'px';
	}
	mask.style.visibility = "visible";
}

function sidepanel_adjustTabs(event) {
	if(typeof this.obj === 'undefined') {
		var id = event.substring(16);
	} else {
		var id = this.obj.id.substring(16);
	}
	var slider = document.getElementById("sidepanel_slider"+id);
	var mask = document.getElementById("sidepanel_mask"+id);
	var index = getSidepanelIndex(id);
	
	if(sidepanels[index].side == "left") {
		mask.style.width = (sidepanels[index].closePos + slider.offsetLeft) + 'px';
	} else {
		mask.style.width = (sidepanels[index].closePos - slider.offsetLeft - mask.clientLeft) + 'px';
	}
	
	if(sidepanels[index].openState == OPENING) {
		sidepanels[index].openState = IS_OPEN;
		mask.style.visibility = "visible";
	} else if(sidepanels[index].openState == CLOSING) {
		sidepanels[index].openState = IS_CLOSED;
		mask.style.visibility = "hidden";
	}
}

/*
addListener('sidepanel_slider'+id,'panel_open_start',callBack);

Events Dispatched:
	panel_open_start
	panel_open_end
	panel_close_start
	panel_close_end
*/
function dispatchOpenSidepanel(id,initialOpen){
	var slider = document.getElementById("sidepanel_slider"+id);
	var holder = document.getElementById("sidepanel_holder"+id);
	var tab = document.getElementById("sidepanel_tab"+id);
        
		if(document.createEvent) {
			var panelOpen = document.createEvent('Event');
			if(initialOpen)
				panelOpen.initEvent('panel_open_start', true, true);
			else
				panelOpen.initEvent('panel_open_end', true, true);
		}
		else if(document.createEventObject) {
			var panelOpen = document.createEventObject();
				panelOpen.type = (initialOpen) ? 'panel_open_start' : 'panel_open_end';
		}

		if(slider) {
			if(slider && slider.dispatchEvent) 
				slider.dispatchEvent(panelOpen);
		}else if (holder) {
			if(holder && holder.dispatchEvent) 
				holder.dispatchEvent(panelOpen);
		}else if(tab){
			if(tab && holder.dispatchEvent) 
				tab.dispatchEvent(panelOpen);
		}
}

function dispatchCloseSidepanel(id,initialClose){
	
	var slider = document.getElementById("sidepanel_slider"+id);
	var holder = document.getElementById("sidepanel_holder"+id);
    var tab = document.getElementById("sidepanel_tab"+id);

		if(document.createEvent) {
			var panelClose = document.createEvent('Event');
			if(initialClose)
				panelClose.initEvent('panel_close_start', true, true);
				else
				panelClose.initEvent('panel_close_end', true, true);
		}
		else if(document.createEventObject) {
			var panelClose = document.createEventObject();
				panelClose.type = (initialClose) ? 'panel_close_start' : 'panel_close_end';
		}

		if(slider) {
			if(slider && slider.dispatchEvent) 
				slider.dispatchEvent(panelClose);
		}else if (holder) {
			if(holder && holder.dispatchEvent) 
				holder.dispatchEvent(panelClose);
		}else if(tab){
			if(tab && holder.dispatchEvent) 
				tab.dispatchEvent(panelOpen);
		}
		
	//appCall('hideVolumeSlider');
}

// [Caigoy,060815,QA-362] Fix for trace errors; recurse through 
function cleanupSidepanels() {
	if (sidepanelTweens.length) {
		removeListener(sidepanelTweens.shift(), 'change', sidepanel_adjustMask);
		cleanupSidepanels();
	}
}

function closeSidepanels(){
	for(var i=0; i<sidepanels.length; i++) {
		if(sidepanels[i].openState == IS_OPEN || sidepanels[i].openState == OPENING){
			sidepanel_close(sidepanels[i].id);
			currentSidepanel =  sidepanels[i].id;
		}
	}
}

function reopenSidepanels(){
	if(currentSidepanel != ''){
		sidepanel_open(currentSidepanel);
		currentSidepanel = '';
	}

}
function getSidepanelIndex(id) {
	for(var i=0; i<sidepanels.length; i++) {
		if(sidepanels[i].id == id) {
			return i;
		}
	}
	return -1;
}


////////////////////////////////////////////////////////////////////////////
/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
;!function(undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {

      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      conf.maxListeners && (this._events.maxListeners = conf.maxListeners);
      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    configure.call(this, conf);
  }

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }

    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else if(typeof tree._listeners === 'function') {
          tree._listeners = [tree._listeners, listener];
        }
        else if (isArray(tree._listeners)) {

          tree._listeners.push(listener);

          if (!tree._listeners.warned) {

            var m = defaultMaxListeners;

            if (typeof this._events.maxListeners !== 'undefined') {
              m = this._events.maxListeners;
            }

            if (m > 0 && tree._listeners.length > m) {

              tree._listeners.warned = true;
              console.error('(node) warning: possible EventEmitter memory ' +
                            'leak detected. %d listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit.',
                            tree._listeners.length);
              console.trace();
            }
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    this._events || init.call(this);
    this._events.maxListeners = n;
    if (!this._conf) this._conf = {};
    this._conf.maxListeners = n;
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function(event, fn) {
    this.many(event, 1, fn);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      fn.apply(this, arguments);
    }

    listener._origin = fn;

    this.on(event, listener);

    return self;
  };

  EventEmitter.prototype.emit = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) { return false; }
    }

    // Loop through the *_all* functions and invoke them.
    if (this._all) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        this._all[i].apply(this, args);
      }
    }

    // If there is no 'error' event listener then throw.
    if (type === 'error') {

      if (!this._all &&
        !this._events.error &&
        !(this.wildcard && this.listenerTree.error)) {

        if (arguments[1] instanceof Error) {
          throw arguments[1]; // Unhandled 'error' event
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
        return false;
      }
    }

    var handler;

    if(this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    }
    else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      if (arguments.length === 1) {
        handler.call(this);
      }
      else if (arguments.length > 1)
        switch (arguments.length) {
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          // slower
          default:
            var l = arguments.length;
            var args = new Array(l - 1);
            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
            handler.apply(this, args);
        }
      return true;
    }
    else if (handler) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

      var listeners = handler.slice();
      for (var i = 0, l = listeners.length; i < l; i++) {
        this.event = type;
        listeners[i].apply(this, args);
      }
      return (listeners.length > 0) || !!this._all;
    }
    else {
      return !!this._all;
    }

  };

  EventEmitter.prototype.on = function(type, listener) {

    if (typeof type === 'function') {
      this.onAny(type);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if(this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else if(typeof this._events[type] === 'function') {
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];
    }
    else if (isArray(this._events[type])) {
      // If we've already got an array, just append.
      this._events[type].push(listener);

      // Check for listener leak
      if (!this._events[type].warned) {

        var m = defaultMaxListeners;

        if (typeof this._events.maxListeners !== 'undefined') {
          m = this._events.maxListeners;
        }

        if (m > 0 && this._events[type].length > m) {

          this._events[type].warned = true;
          console.error('(node) warning: possible EventEmitter memory ' +
                        'leak detected. %d listeners added. ' +
                        'Use emitter.setMaxListeners() to increase limit.',
                        this._events[type].length);
          console.trace();
        }
      }
    }
    return this;
  };

  EventEmitter.prototype.onAny = function(fn) {

    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if(!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    this._all.push(fn);
    return this;
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }
        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }
      }
    }

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          return this;
        }
      }
    } else {
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else {
      if (!this._events[type]) return this;
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if(this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (typeof define === 'function' && define.amd) {
     // AMD. Register as an anonymous module.
    define(function() {
      return EventEmitter;
    });
  } else if (typeof exports === 'object') {
    // CommonJS
    exports.EventEmitter2 = EventEmitter;
  }
  else {
    // Browser global.
    window.EventEmitter2 = EventEmitter;
  }
}();

////////////////////////////////////////////////////////////////////////////
/*!    SWFObject v2.3.20130521 <http://github.com/swfobject/swfobject>
    is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swfobject=function(){var D="undefined",r="object",T="Shockwave Flash",Z="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",S="SWFObjectExprInst",x="onreadystatechange",Q=window,h=document,t=navigator,V=false,X=[],o=[],P=[],K=[],I,p,E,B,L=false,a=false,m,G,j=true,l=false,O=function(){var ad=typeof h.getElementById!=D&&typeof h.getElementsByTagName!=D&&typeof h.createElement!=D,ak=t.userAgent.toLowerCase(),ab=t.platform.toLowerCase(),ah=ab?/win/.test(ab):/win/.test(ak),af=ab?/mac/.test(ab):/mac/.test(ak),ai=/webkit/.test(ak)?parseFloat(ak.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,aa=t.appName==="Microsoft Internet Explorer",aj=[0,0,0],ae=null;if(typeof t.plugins!=D&&typeof t.plugins[T]==r){ae=t.plugins[T].description;if(ae&&(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&t.mimeTypes[q].enabledPlugin)){V=true;aa=false;ae=ae.replace(/^.*\s+(\S+\s+\S+$)/,"$1");aj[0]=n(ae.replace(/^(.*)\..*$/,"$1"));aj[1]=n(ae.replace(/^.*\.(.*)\s.*$/,"$1"));aj[2]=/[a-zA-Z]/.test(ae)?n(ae.replace(/^.*[a-zA-Z]+(.*)$/,"$1")):0}}else{if(typeof Q.ActiveXObject!=D){try{var ag=new ActiveXObject(Z);if(ag){ae=ag.GetVariable("$version");if(ae){aa=true;ae=ae.split(" ")[1].split(",");aj=[n(ae[0]),n(ae[1]),n(ae[2])]}}}catch(ac){}}}return{w3:ad,pv:aj,wk:ai,ie:aa,win:ah,mac:af}}(),i=function(){if(!O.w3){return}if((typeof h.readyState!=D&&(h.readyState==="complete"||h.readyState==="interactive"))||(typeof h.readyState==D&&(h.getElementsByTagName("body")[0]||h.body))){f()}if(!L){if(typeof h.addEventListener!=D){h.addEventListener("DOMContentLoaded",f,false)}if(O.ie){h.attachEvent(x,function aa(){if(h.readyState=="complete"){h.detachEvent(x,aa);f()}});if(Q==top){(function ac(){if(L){return}try{h.documentElement.doScroll("left")}catch(ad){setTimeout(ac,0);return}f()}())}}if(O.wk){(function ab(){if(L){return}if(!/loaded|complete/.test(h.readyState)){setTimeout(ab,0);return}f()}())}}}();function f(){if(L||!document.getElementsByTagName("body")[0]){return}try{var ac,ad=C("span");ad.style.display="none";ac=h.getElementsByTagName("body")[0].appendChild(ad);ac.parentNode.removeChild(ac);ac=null;ad=null}catch(ae){return}L=true;var aa=X.length;for(var ab=0;ab<aa;ab++){X[ab]()}}function M(aa){if(L){aa()}else{X[X.length]=aa}}function s(ab){if(typeof Q.addEventListener!=D){Q.addEventListener("load",ab,false)}else{if(typeof h.addEventListener!=D){h.addEventListener("load",ab,false)}else{if(typeof Q.attachEvent!=D){g(Q,"onload",ab)}else{if(typeof Q.onload=="function"){var aa=Q.onload;Q.onload=function(){aa();ab()}}else{Q.onload=ab}}}}}function Y(){var aa=h.getElementsByTagName("body")[0];var ae=C(r);ae.setAttribute("style","visibility: hidden;");ae.setAttribute("type",q);var ad=aa.appendChild(ae);if(ad){var ac=0;(function ab(){if(typeof ad.GetVariable!=D){try{var ag=ad.GetVariable("$version");if(ag){ag=ag.split(" ")[1].split(",");O.pv=[n(ag[0]),n(ag[1]),n(ag[2])]}}catch(af){O.pv=[8,0,0]}}else{if(ac<10){ac++;setTimeout(ab,10);return}}aa.removeChild(ae);ad=null;H()}())}else{H()}}function H(){var aj=o.length;if(aj>0){for(var ai=0;ai<aj;ai++){var ab=o[ai].id;var ae=o[ai].callbackFn;var ad={success:false,id:ab};if(O.pv[0]>0){var ah=c(ab);if(ah){if(F(o[ai].swfVersion)&&!(O.wk&&O.wk<312)){w(ab,true);if(ae){ad.success=true;ad.ref=z(ab);ad.id=ab;ae(ad)}}else{if(o[ai].expressInstall&&A()){var al={};al.data=o[ai].expressInstall;al.width=ah.getAttribute("width")||"0";al.height=ah.getAttribute("height")||"0";if(ah.getAttribute("class")){al.styleclass=ah.getAttribute("class")}if(ah.getAttribute("align")){al.align=ah.getAttribute("align")}var ak={};var aa=ah.getElementsByTagName("param");var af=aa.length;for(var ag=0;ag<af;ag++){if(aa[ag].getAttribute("name").toLowerCase()!="movie"){ak[aa[ag].getAttribute("name")]=aa[ag].getAttribute("value")}}R(al,ak,ab,ae)}else{b(ah);if(ae){ae(ad)}}}}}else{w(ab,true);if(ae){var ac=z(ab);if(ac&&typeof ac.SetVariable!=D){ad.success=true;ad.ref=ac;ad.id=ac.id}ae(ad)}}}}}X[0]=function(){if(V){Y()}else{H()}};function z(ac){var aa=null,ab=c(ac);if(ab&&ab.nodeName.toUpperCase()==="OBJECT"){if(typeof ab.SetVariable!==D){aa=ab}else{aa=ab.getElementsByTagName(r)[0]||ab}}return aa}function A(){return !a&&F("6.0.65")&&(O.win||O.mac)&&!(O.wk&&O.wk<312)}function R(ad,ae,aa,ac){var ah=c(aa);aa=W(aa);a=true;E=ac||null;B={success:false,id:aa};if(ah){if(ah.nodeName.toUpperCase()=="OBJECT"){I=J(ah);p=null}else{I=ah;p=aa}ad.id=S;if(typeof ad.width==D||(!/%$/.test(ad.width)&&n(ad.width)<310)){ad.width="310"}if(typeof ad.height==D||(!/%$/.test(ad.height)&&n(ad.height)<137)){ad.height="137"}var ag=O.ie?"ActiveX":"PlugIn",af="MMredirectURL="+encodeURIComponent(Q.location.toString().replace(/&/g,"%26"))+"&MMplayerType="+ag+"&MMdoctitle="+encodeURIComponent(h.title.slice(0,47)+" - Flash Player Installation");if(typeof ae.flashvars!=D){ae.flashvars+="&"+af}else{ae.flashvars=af}if(O.ie&&ah.readyState!=4){var ab=C("div");
aa+="SWFObjectNew";ab.setAttribute("id",aa);ah.parentNode.insertBefore(ab,ah);ah.style.display="none";y(ah)}u(ad,ae,aa)}}function b(ab){if(O.ie&&ab.readyState!=4){ab.style.display="none";var aa=C("div");ab.parentNode.insertBefore(aa,ab);aa.parentNode.replaceChild(J(ab),aa);y(ab)}else{ab.parentNode.replaceChild(J(ab),ab)}}function J(af){var ae=C("div");if(O.win&&O.ie){ae.innerHTML=af.innerHTML}else{var ab=af.getElementsByTagName(r)[0];if(ab){var ag=ab.childNodes;if(ag){var aa=ag.length;for(var ad=0;ad<aa;ad++){if(!(ag[ad].nodeType==1&&ag[ad].nodeName=="PARAM")&&!(ag[ad].nodeType==8)){ae.appendChild(ag[ad].cloneNode(true))}}}}}return ae}function k(aa,ab){var ac=C("div");ac.innerHTML="<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param name='movie' value='"+aa+"'>"+ab+"</object>";return ac.firstChild}function u(ai,ag,ab){var aa,ad=c(ab);ab=W(ab);if(O.wk&&O.wk<312){return aa}if(ad){var ac=(O.ie)?C("div"):C(r),af,ah,ae;if(typeof ai.id==D){ai.id=ab}for(ae in ag){if(ag.hasOwnProperty(ae)&&ae.toLowerCase()!=="movie"){e(ac,ae,ag[ae])}}if(O.ie){ac=k(ai.data,ac.innerHTML)}for(af in ai){if(ai.hasOwnProperty(af)){ah=af.toLowerCase();if(ah==="styleclass"){ac.setAttribute("class",ai[af])}else{if(ah!=="classid"&&ah!=="data"){ac.setAttribute(af,ai[af])}}}}if(O.ie){P[P.length]=ai.id}else{ac.setAttribute("type",q);ac.setAttribute("data",ai.data)}ad.parentNode.replaceChild(ac,ad);aa=ac}return aa}function e(ac,aa,ab){var ad=C("param");ad.setAttribute("name",aa);ad.setAttribute("value",ab);ac.appendChild(ad)}function y(ac){var ab=c(ac);if(ab&&ab.nodeName.toUpperCase()=="OBJECT"){if(O.ie){ab.style.display="none";(function aa(){if(ab.readyState==4){for(var ad in ab){if(typeof ab[ad]=="function"){ab[ad]=null}}ab.parentNode.removeChild(ab)}else{setTimeout(aa,10)}}())}else{ab.parentNode.removeChild(ab)}}}function U(aa){return(aa&&aa.nodeType&&aa.nodeType===1)}function W(aa){return(U(aa))?aa.id:aa}function c(ac){if(U(ac)){return ac}var aa=null;try{aa=h.getElementById(ac)}catch(ab){}return aa}function C(aa){return h.createElement(aa)}function n(aa){return parseInt(aa,10)}function g(ac,aa,ab){ac.attachEvent(aa,ab);K[K.length]=[ac,aa,ab]}function F(ac){ac+="";var ab=O.pv,aa=ac.split(".");aa[0]=n(aa[0]);aa[1]=n(aa[1])||0;aa[2]=n(aa[2])||0;return(ab[0]>aa[0]||(ab[0]==aa[0]&&ab[1]>aa[1])||(ab[0]==aa[0]&&ab[1]==aa[1]&&ab[2]>=aa[2]))?true:false}function v(af,ab,ag,ae){var ad=h.getElementsByTagName("head")[0];if(!ad){return}var aa=(typeof ag=="string")?ag:"screen";if(ae){m=null;G=null}if(!m||G!=aa){var ac=C("style");ac.setAttribute("type","text/css");ac.setAttribute("media",aa);m=ad.appendChild(ac);if(O.ie&&typeof h.styleSheets!=D&&h.styleSheets.length>0){m=h.styleSheets[h.styleSheets.length-1]}G=aa}if(m){if(typeof m.addRule!=D){m.addRule(af,ab)}else{if(typeof h.createTextNode!=D){m.appendChild(h.createTextNode(af+" {"+ab+"}"))}}}}function w(ad,aa){if(!j){return}var ab=aa?"visible":"hidden",ac=c(ad);if(L&&ac){ac.style.visibility=ab}else{if(typeof ad==="string"){v("#"+ad,"visibility:"+ab)}}}function N(ab){var ac=/[\\\"<>\.;]/;var aa=ac.exec(ab)!=null;return aa&&typeof encodeURIComponent!=D?encodeURIComponent(ab):ab}var d=function(){if(O.ie){window.attachEvent("onunload",function(){var af=K.length;for(var ae=0;ae<af;ae++){K[ae][0].detachEvent(K[ae][1],K[ae][2])}var ac=P.length;for(var ad=0;ad<ac;ad++){y(P[ad])}for(var ab in O){O[ab]=null}O=null;for(var aa in swfobject){swfobject[aa]=null}swfobject=null})}}();return{registerObject:function(ae,aa,ad,ac){if(O.w3&&ae&&aa){var ab={};ab.id=ae;ab.swfVersion=aa;ab.expressInstall=ad;ab.callbackFn=ac;o[o.length]=ab;w(ae,false)}else{if(ac){ac({success:false,id:ae})}}},getObjectById:function(aa){if(O.w3){return z(aa)}},embedSWF:function(af,al,ai,ak,ab,ae,ad,ah,aj,ag){var ac=W(al),aa={success:false,id:ac};if(O.w3&&!(O.wk&&O.wk<312)&&af&&al&&ai&&ak&&ab){w(ac,false);M(function(){ai+="";ak+="";var an={};if(aj&&typeof aj===r){for(var aq in aj){an[aq]=aj[aq]}}an.data=af;an.width=ai;an.height=ak;var ar={};if(ah&&typeof ah===r){for(var ao in ah){ar[ao]=ah[ao]}}if(ad&&typeof ad===r){for(var am in ad){if(ad.hasOwnProperty(am)){var ap=(l)?encodeURIComponent(am):am,at=(l)?encodeURIComponent(ad[am]):ad[am];if(typeof ar.flashvars!=D){ar.flashvars+="&"+ap+"="+at}else{ar.flashvars=ap+"="+at}}}}if(F(ab)){var au=u(an,ar,al);if(an.id==ac){w(ac,true)}aa.success=true;aa.ref=au;aa.id=au.id}else{if(ae&&A()){an.data=ae;R(an,ar,al,ag);return}else{w(ac,true)}}if(ag){ag(aa)}})}else{if(ag){ag(aa)}}},switchOffAutoHideShow:function(){j=false},enableUriEncoding:function(aa){l=(typeof aa===D)?true:aa},ua:O,getFlashPlayerVersion:function(){return{major:O.pv[0],minor:O.pv[1],release:O.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(ac,ab,aa){if(O.w3){return u(ac,ab,aa)}else{return undefined}},showExpressInstall:function(ac,ad,aa,ab){if(O.w3&&A()){R(ac,ad,aa,ab)}},removeSWF:function(aa){if(O.w3){y(aa)}},createCSS:function(ad,ac,ab,aa){if(O.w3){v(ad,ac,ab,aa)}},addDomLoadEvent:M,addLoadEvent:s,getQueryParamValue:function(ad){var ac=h.location.search||h.location.hash;
if(ac){if(/\?/.test(ac)){ac=ac.split("?")[1]}if(ad==null){return N(ac)}var ab=ac.split("&");for(var aa=0;aa<ab.length;aa++){if(ab[aa].substring(0,ab[aa].indexOf("="))==ad){return N(ab[aa].substring((ab[aa].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var aa=c(S);if(aa&&I){aa.parentNode.replaceChild(I,aa);if(p){w(p,true);if(O.ie){I.style.display="block"}}if(E){E(B)}}a=false}},version:"2.3"}}();

////////////////////////////////////////////////////////////////////////////

var tabletDivDragger = new Array();

function ScrollTabletDiv(id, disableDesktopMouseDown) {
    this.area = (typeof(id) == 'string') ? document.getElementById(id) : id;
    this.scrollPos = {x:0,y:0};
    this.vScrollBar = null;
    this.hScrollBar = null;
    this.vScrollTracker = null;
    this.vSnap = 0;
    this.hSnap = 0;
    this.dotHolder;
    this.offDot;
    this.onDot;
    this.chevronLeft;
    this.chevronRight;
    this.chevronTop;
    this.chevronBottom;
    this.mouseWheelPaging = false; // [Caigoy,062615,QA-759]
    this.maxDots = 0;
    this.currDotPos = -1; //2.26.13 dh
    this.vItemPos = 0;
    this.hItemPos = 0;
    this.swipeScale = 1;
    this.scrollStartTime = null;
    this.scrollStartPos = null;
    this.allowHorizontalDragging = true;
    this.allowVerticalDragging = true;
    this.dragAndDrop = false;
    this.stopPropagationWheel = false;

    /* Added 3/20/2013 by Len */
    this.navSpacing = 2;

    //added by jake
    if (typeof touchCapable === 'undefined')//its not defined for outside pay wall
        touchCapable = false;
    if(this.area) {
        this.area.style.marginTop = '0px';
        this.area.objref = this;

        /*
        addListener(this.area, 'touchstart', this.scrollStart);
        if(MOBILE) { addListener(this.area, 'mousedown', this.scrollStart);} // MAG testing
        */
        //MAG 05/05/2014: We are now using the touchCapable global variable through the isTouchdevice() function in utils.js
        if ((typeof isUnity) == 'undefined') {
            var isUnity = false;
        }
        if(isUnity || touchCapable) {
            addListener(this.area, 'touchstart', this.scrollStart);
        }
        else {
            if (! disableDesktopMouseDown) {
                addListener(this.area, 'mousedown', this.scrollStart);
            }
        }

        addListener(this.area, 'resize', this.resizeArea);
        addListener(this.area, 'mousewheel',this.scrollWheel);
        addListener(this.area, 'DOMMouseScroll', this.scrollWheel);
		addListener(document, 'dragleave',this.dragleave.bind(this));
		addListener(document, 'dragstart',this.dragleave.bind(this));

	}
    this.removeCookie(this.area.id);
}

ScrollTabletDiv.prototype.addRemoveTouchstart = function(bool){
    /*
    if(bool == true){
        addListener(this.area, 'touchstart', this.scrollStart);
        if(MOBILE) { addListener(this.area, 'mousedown', this.scrollStart);}
    }else{
        removeListener(this.area, 'touchstart', this.scrollStart);
        if(MOBILE) { removeListener(this.area, 'mousedown', this.scrollStart);}
    }
    */
    //MAG 05/05/2014: We are now using the touchCapable global variable through the isTouchdevice() function in utils.js
    if(bool == true){
        if(isUnity || touchCapable) addListener(this.area, 'touchstart', this.scrollStart);
        else addListener(this.area, 'mousedown', this.scrollStart);
    }else{
        if(isUnity || touchCapable) removeListener(this.area, 'touchstart', this.scrollStart);
        else removeListener(this.area, 'mousedown', this.scrollStart);
    }

}
/////////////////////////////

ScrollTabletDiv.prototype.scrollStart = function(event) {
    //arsen: this is a hack fix, scrolltablet should't block the mouse events on input elements
    //       this whole file is "a little" messy, needs to be refactored
    if (event.target && event.target.tagName && event.target.tagName === 'INPUT') {
        return;
    }
    //var obj = event.currentTarget.objref;

    var obj = getEventTarget(event);
    obj = obj.objref;
    obj.scrollPos = pagePosition(event);
    obj.scrollStartTime = new Date().getTime();
    obj.scrollStartPos = obj.scrollPos;
    //added cordova to fix scrolling in Android. 2.14.13 <3
    if(MOBILE == 'iphone'||MOBILE == 'cordova') addListener(document, 'touchmove', stopIPhoneScroll);
    //event.preventDefault();

    //MAG 05/05/2014: We are now using the touchCapable global variable through the isTouchdevice() function in utils.js
    //if(MOBILE){
    if(isUnity || touchCapable){
        addListener(document.body,'touchmove',obj.scrollMove);
        addListener(document.body,'touchend',obj.scrollEnd);
    }else{
        if(!obj.dragAndDrop){
            event.preventDefault();//not sure why this is in here as I can't see this doing anything since we dont do mouse move to scroll. Left it in just incase. DAG 2.17.14
        }
        addListener(document.body,'mousemove',obj.scrollMove);
        addListener(document.body,'mouseup',obj.scrollEnd);
    }

    tabletDivDragger.push(obj);
    obj.dispatchEvent('start');
}
function stopIPhoneScroll(event){
    event.preventDefault();
}
/////////////////////////////

ScrollTabletDiv.prototype.scrollMove = function(event) {
    //MAG 05/05/2014: the following two lines prevent browsers from scrolling the page on touch actions (default action)
    event.preventDefault();
    this.style.msTouchAction = 'none';

    var direction        =    '';
    for(var i=0;i<tabletDivDragger.length;i++) {
        var obj = tabletDivDragger[i];
        var pos = pagePosition(event);

        if(obj.vScrollBar) {
            if(direction == 'v')
                continue;
            else
                direction = 'v';
        }
        if(obj.hScrollBar) {
            if(direction == 'h')
                continue;
            else
                direction = 'h';
        }

        // if (obj.vScrollBar) {
        //     var sTop = obj.area.style.marginTop;
        //     sTop = sTop.replace('px', '');
        // }

        if(obj.allowVerticalDragging) obj.area.scrollTop = Math.max(0, Math.min(obj.area.scrollTop + obj.swipeScale*(obj.scrollPos.y - pos.y), obj.area.scrollHeight - obj.area.offsetHeight));
        if(obj.allowHorizontalDragging) obj.area.scrollLeft = Math.max(0, Math.min(obj.area.scrollLeft + obj.swipeScale*(obj.scrollPos.x - pos.x), obj.area.scrollWidth - obj.area.offsetWidth));
        obj.scrollPos = pos;

        //trace(obj.swipeScale, obj.scrollPos.x, pos.x);
        if(!obj.vScrollBar && !obj.vScrollTracker && !obj.hScrollBar) {
            obj.dispatchEvent('move');
        }

        if(obj.vScrollBar) obj.vScrollBar.setPosition(obj.area.scrollTop);
        if(obj.vScrollTracker) obj.vScrollTracker.setPosition(obj.area.scrollTop);
        if(obj.hScrollBar) obj.hScrollBar.setPosition(obj.area.scrollLeft);
        if (obj.vSnap >0) {
            obj.whatPageVertical();
        } else {
            obj.whatPage();
        }

    }
}

/////////////////////////////

ScrollTabletDiv.prototype.scrollEnd = function(event) {
    for(var i=0;i<tabletDivDragger.length;i++) {
        var obj = tabletDivDragger[i];

        if (obj.scrollStartTime) {
            var pos = pagePosition(event);
            var scrollEndTime = new Date().getTime();
            var scrollDuration = scrollEndTime - obj.scrollStartTime;

            var scrollDistance = 0;
            if (obj.vScrollBar) {
                scrollDistance = pos.y - obj.scrollStartPos.y;
            }
            else {
                scrollDistance = pos.x - obj.scrollStartPos.x;    //corrected a syntax error 1.16.14 DAG
            }

            //trace('duration:'+scrollDuration+'; distance:'+scrollDistance);
            //obj.area.style.transition = "all 1s ease"
            //obj.area.style.marginTop = "0px";
        }

        /*
        removeListener(document.body,'touchmove',obj.scrollMove);
        removeListener(document.body,'touchend',obj.scrollEnd);
        removeListener(document.body,'mousemove',obj.scrollMove);
        removeListener(document.body,'mouseup',obj.scrollEnd);

        */
        //MAG 05/05/2014: We are now using the touchCapable global variable through the isTouchdevice() function in utils.js
        if(isUnity || touchCapable) {
            removeListener(document.body,'touchmove',obj.scrollMove);
            removeListener(document.body,'touchend',obj.scrollEnd);
        }
        else {
            removeListener(document.body,'mousemove',obj.scrollMove);
            removeListener(document.body,'mouseup',obj.scrollEnd);
        }

        obj.dispatchEvent('finish');

        if(obj.vScrollBar) {
            obj.vScrollBar.setPosition(obj.area.scrollTop);
        }
        if(obj.vScrollTracker) obj.vScrollTracker.setPosition(obj.area.scrollTop);
        if(obj.hScrollBar) obj.hScrollBar.setPosition(obj.area.scrollLeft);

        obj.changePaging();
    }
    //if(tabletDivDragger.length) event.preventDefault();
    if(MOBILE == 'iphone')removeListener(document, 'touchmove', stopIPhoneScroll);

    tabletDivDragger = new Array();
}

/////////////////////////////

ScrollTabletDiv.prototype.scrollWheel = function (event) {
    var area = getEventTarget(event);

    if (area) {
        var obj = area.objref;
        var wheelData = event.detail ? event.detail * -1 : event.wheelDelta / 40;
        obj.area.scrollTop = Math.max(0, Math.min(obj.area.scrollTop - wheelData * 3, obj.area.scrollHeight - obj.area.offsetHeight));
        obj.scrollPos.y = obj.area.scrollTop;

        // [Caigoy,062615,QA-759] Call chevron functions with scroll wheel
        if (obj.mouseWheelPaging) {
            var wheelDirection = getScrollWheelDirection(event),
                hPagingLeft = obj.chevronLeft && obj.chevronLeft.style.visibility !== 'hidden',
                hPagingRight = obj.chevronRight && obj.chevronRight.style.visibility !== 'hidden',
                vPagingTop = obj.chevronTop && obj.chevronTop.style.visibility !== 'hidden',
                vPagingBottom = obj.chevronDown && obj.chevronDown.style.visibility !== 'hidden';
            // calls functions for available chevrons
            // follows up:left/down:right convention; intuitive when only horizontal paging allowed
            switch (wheelDirection) {
            case 'u':
            case 'l':
                vPagingTop && obj.TopChevronClicked(obj.chevronTop);
                hPagingLeft && obj.leftChevronClicked(obj.chevronLeft);
                break;
            case 'd':
            case 'r':
                vPagingBottom && obj.bottomChevronClicked(obj.chevronBottom);
                hPagingRight && obj.rightChevronClicked(obj.chevronRight);
                break;
            }
        }
        //////////////////////////////////////

        if (obj.vScrollBar) obj.vScrollBar.setPosition(obj.area.scrollTop);
        if (obj.vScrollTracker) obj.vScrollTracker.setPosition(obj.area.scrollTop);
        if (obj.hScrollBar) obj.hScrollBar.setPosition(obj.area.scrollLeft);
        if (obj.chevronTop) {
            if (obj.scrollPos.y > 0) {
                obj.chevronTop.style.visibility = 'inherit';
            } else {
                obj.chevronTop.style.visibility = 'hidden';
            }
        }
        if (obj.chevronBottom) {
            if (obj.scrollPos.y == (obj.area.scrollHeight - obj.area.offsetHeight)) {
                obj.chevronBottom.style.visibility = 'hidden';
            } else {
                obj.chevronBottom.style.visibility = 'inherit';
            }
        }
    }
    // Arian- 7/30/14 - cannot stop event propegation here
    // if the scroller contains another scroller inside e.g. Hamster Store Items
    // scrolling over the inside scroller will not scroll the parent.
    //    cancelEvent(event);
    if(obj.stopPropagationWheel) {
        event.stopPropagation();
    }
};

ScrollTabletDiv.prototype.dragleave = function(e){

	this.scrollEnd();
}
/////////////////////////////

/**
 * Get direction of last mouse wheel event [Caigoy,062615,QA-759]
 * @param  {event} e Mouse wheel event object
 * @return {string}  Direction of scroll ['d'|'u'|'l'|'r']
 */
function getScrollWheelDirection(e) {
    var e = window.event || e; // IE legacy

    Math.sign = Math.sign || function (x) { // IE/Safari polyfill for whether number is pos/neg
        return +x === 0 ? x : (x > 0 ? 1 : -1);
    };

    if (wheelThrottle.check(false, false)) { // prevent rapid fire calls
        return false;
    };

    // mousewheel event variations between browsers
    var dY = (function () {
            switch (false) {
            case e.deltaY === (0 || undefined):
                return e.deltaY; // Chrome
            case e.wheelDelta === (0 || undefined):
                return e.wheelDelta; // Chrome, Safari, IE
            case e.detail === (0 || undefined):
                return e.detail; // Firefox
            default:
                return 0;
            }
        })(),
        dX = (function () {
            switch (false) {
            case e.deltaX === (0 || undefined):
                return e.deltaX; // Chrome
            case e.wheelDelta === (0 || undefined):
                return e.wheelDelta; // Chrome, Safari, IE
            case e.detail === (0 || undefined):
                return e.detail; // Firefox
            default:
                return 0;
            }
        })();

    var wheelDirectionX = (function () {
        if (Math.sign(dX) === 0) return false; // no delta
        return Math.sign(dX) > -1 ? 'r' : 'l';
    })();
    var wheelDirectionY = (function () {
        if (Math.sign(dY) === 0) return false; // no delta
        return Math.sign(dY) > -1 ? 'd' : 'u';
    })();

    return wheelDirectionX || wheelDirectionY;
}
var wheelThrottle = new Throttle(250); // Throttle instance for mousewheel/trackpad scroll events

/**
 * Prevent multiple calls within wait period [Caigoy,062615,QA-759]
 * @param {int} wait Milliseconds between calls before allowed again.
 */
function Throttle(wait) {
    this.waiting = true;
    this.wait = wait || 250;
    this.mark = Date.now() + this.wait;
    /**
     * Returns true if called twice within wait period
     * @param  {boolean} cancel    Reset this.waiting, force return false
     * @param  {boolean} mustPause Start wait period on each call
     * @return {boolean}           Return false if wait period passed
     */
    this.check = function (cancel, mustPause) {
        this.mustPause = mustPause || false;
        this.waiting = Date.now() <= this.mark;
        if (cancel) {
            this.mark = Date.now();
            this.waiting = false;
        }
        if (this.mustPause) {
            this.mark = Date.now() + this.wait;
        } else if (!this.mustPause && !this.waiting) {
            this.mark = Date.now() + this.wait;
            return this.waiting;
        }
        return this.waiting;
    };
}

ScrollTabletDiv.prototype.setVPosition = function(p) {

    var newpos = Math.min(this.area.scrollHeight - this.area.offsetHeight, Math.max(0, p));

    this.area.scrollTop = Math.max(0, Math.min(newpos, this.area.scrollHeight - this.area.offsetHeight));
    this.scrollPos.y = this.area.scrollTop;
    if(this.vScrollBar) this.vScrollBar.setPosition(this.area.scrollTop);
}
/////////////////////////////

ScrollTabletDiv.prototype.setVPostionForIE = function()
{
    if(BROWSER.indexOf('Chrome') != -1){
        var curr_pos = getCookie('current_scroll_position');
        newpos = curr_pos;
        this.objref.area.scrollTop = Math.max(0, newpos);
    }
}

ScrollTabletDiv.prototype.setVerticalScroll = function(bar, autohide) {
    if(this.vScrollBar) {
        removeListener(this.vScrollBar, 'change', this.vScrollChange);
        this.vScrollBar = null;
    }

    if(bar) {
        this.vScrollBar = bar;
        if(autohide != undefined) bar.autoHide = autohide;
        bar.objref = this;
        bar.setScrollRange(this.area.scrollHeight);
        bar.setPosition(this.area.scrollTop);
        addListener(bar, 'change', this.vScrollChange);
    }
}

ScrollTabletDiv.prototype.vScrollChange = function(event) {
//trace("vScrollChange");
//trace("value:" + Math.max(0, Math.min(this.position, this.objref.area.scrollHeight - this.objref.area.offsetHeight)));
    //this.objref.area.scrollHeight //not sure why this is here but commented it out incase it was an unfinished thought. DAG 8.8.13
    this.objref.area.scrollTop = Math.max(0, Math.min(this.position, this.objref.area.scrollHeight - this.objref.area.offsetHeight));
    this.objref.dispatchEvent('move');
}

ScrollTabletDiv.prototype.setScrollTracker = function(bar, autohide) {
    if(this.vScrollTracker) {
        removeListener(this.vScrollBar, 'change', this.vScrollChange);
        this.vScrollBar = null;
    }

    if(bar) {
        this.vScrollTracker = bar;
        if(autohide != undefined) bar.autoHide = autohide;
        bar.objref = this;
        bar.setScrollRange(this.area.scrollHeight);
        bar.setPosition(this.area.scrollTop);
        addListener(bar, 'change', this.vScrollTrackerChange);
    }
}

ScrollTabletDiv.prototype.vScrollTrackerChange = function(event) {
    //this.objref.area.scrollHeight //not sure why this is here but commented it out incase it was an unfinished thought. DAG 8.8.13
    this.objref.area.scrollTop = Math.max(0, Math.min(this.position, this.objref.area.scrollHeight - this.objref.area.offsetHeight));
    this.objref.dispatchEvent('move');
}

/////////////////////////////

ScrollTabletDiv.prototype.setHorizontalScroll = function(bar) {
    if(bar) {
        this.hScrollBar = bar;
        bar.objref = this;
        bar.setScrollRange(this.area.scrollWidth);
        bar.setPosition(this.area.scrollLeft);
        addListener(bar, 'change', this.hScrollChange);
    }
    else if(this.hScrollBar) {
        removeListener(this.hScrollBar, 'change', this.hScrollChange);
        this.hScrollBar = null;
    }
}

ScrollTabletDiv.prototype.setHorizontalScrollNoBar = function() {
        bar.objref = this;
        bar.setScrollRange(this.area.scrollWidth);
        bar.setPosition(this.area.scrollLeft);
        //addListener(bar, 'change', this.hScrollChange);
}

ScrollTabletDiv.prototype.refreshPosition = function(){
        if(this.vScrollBar) this.vScrollBar.setPosition(this.area.scrollTop);
        if(this.vScrollTracker) this.vScrollTracker.setPosition(this.area.scrollTop);
        if(this.hScrollBar) this.hScrollBar.setPosition(this.area.scrollLeft);
}

ScrollTabletDiv.prototype.hScrollChange = function(event) {
    this.objref.area.scrollLeft = Math.max(0, Math.min(this.position, this.objref.area.scrollWidth - this.objref.area.offsetWidth));
    this.changePaging();
    this.objref.dispatchEvent('move');
}

/////////////////////////////

ScrollTabletDiv.prototype.resizeArea = function(event) {
    var innit = this instanceof ScrollTabletDiv;
    if (innit) {
        if(this.vScrollBar) this.vScrollBar.setScrollRange(this.area.scrollHeight);
        if(this.hScrollBar) this.hScrollBar.setScrollRange(this.area.scrollWidth);
        this.resetPaging();
        this.changePaging();
    }
}

/////////////////////////////
ScrollTabletDiv.prototype.setPagingElements = function(holderdiv, offbtn, onbtn, leftchev, rightchev) {

    if(typeof(holderdiv) == 'string') holderdiv = document.getElementById(holderdiv);
    if(typeof(leftchev) == 'string') leftchev = document.getElementById(leftchev);
    if(typeof(rightchev) == 'string') rightchev = document.getElementById(rightchev);

    this.dotHolder = holderdiv;
    this.offDot = offbtn;
    this.onDot = onbtn;

    //Makes it so an object is not selectable. DAG 12.16.13
    if(this.dotHolder) {
        this.dotHolder.style.WebkitUserSelect = 'none';
        this.dotHolder.style.KhtmlUserSelect = 'none';
        this.dotHolder.style.MozUserSelect = 'none';
        this.dotHolder.style.OUserSelect = 'none';
        this.dotHolder.style.UserSelect = 'none';
        //this.dotHolder.style.visibility = 'inherit';
        this.dotHolder.setAttribute('unselectable', 'on');
    }

    this.chevronLeft = leftchev;
    this.chevronRight = rightchev;
    if(this.chevronLeft) this.chevronLeft.objref = this;
    if(this.chevronRight) this.chevronRight.objref = this;

    // [Caigoy,022217,QA-14858] 
    if (isUnity || (touchCapable && MOBILE)) {
        if(this.chevronLeft) this.chevronLeft.setAttribute('ontouchstart', 'this.objref.leftChevronClicked(this)');
        if(this.chevronRight) this.chevronRight.setAttribute('ontouchstart', 'this.objref.rightChevronClicked(this)');
    } else {
        if(this.chevronLeft) this.chevronLeft.setAttribute('onclick', 'this.objref.leftChevronClicked(this)');
        if(this.chevronRight) this.chevronRight.setAttribute('onclick', 'this.objref.rightChevronClicked(this)');
    }

    if(this.chevronLeft) this.chevronLeft.style.visibility = 'hidden';
    if(this.chevronRight) this.chevronRight.style.visibility = 'hidden';

    //Makes it so an object is not selectable. DAG 12.16.13
    if(this.chevronRight) {
        this.chevronRight.style.WebkitUserSelect = 'none';
        this.chevronRight.style.KhtmlUserSelect = 'none';
        this.chevronRight.style.MozUserSelect = 'none';
        this.chevronRight.style.OUserSelect = 'none';
        this.chevronRight.style.UserSelect = 'none';
        this.chevronRight.setAttribute('unselectable', 'on');
    }

    if(this.chevronLeft) {
        this.chevronLeft.style.WebkitUserSelect = 'none';
        this.chevronLeft.style.KhtmlUserSelect = 'none';
        this.chevronLeft.style.MozUserSelect = 'none';
        this.chevronLeft.style.OUserSelect = 'none';
        this.chevronLeft.style.UserSelect = 'none';
        this.chevronLeft.setAttribute('unselectable', 'on');
    }

    this.resetPaging();
    this.changePaging();
}

/////////////////////////////
ScrollTabletDiv.prototype.setPagingElementsVertical = function(holderdiv, offbtn, onbtn, topchev, bottomchev) {

    if(typeof(holderdiv) == 'string') holderdiv = document.getElementById(holderdiv);
    if(typeof(topchev) == 'string') topchev = document.getElementById(topchev);
    if(typeof(bottomchev) == 'string') bottomchev = document.getElementById(bottomchev);

    this.dotHolder = holderdiv;
    this.offDot = offbtn;
    this.onDot = onbtn;

    //Makes it so an object is not selectable. DAG 12.16.13
    if(this.dotHolder) {
        this.dotHolder.style.WebkitUserSelect = 'none';
        this.dotHolder.style.KhtmlUserSelect = 'none';
        this.dotHolder.style.MozUserSelect = 'none';
        this.dotHolder.style.OUserSelect = 'none';
        this.dotHolder.style.UserSelect = 'none';
        this.dotHolder.setAttribute('unselectable', 'on');
    }

    this.chevronTop = topchev;
    this.chevronBottom = bottomchev;
    if(this.chevronTop) this.chevronTop.objref = this;
    if(this.chevronBottom) this.chevronBottom.objref = this;

    if(this.chevronTop) this.chevronTop.setAttribute('onclick', 'this.objref.topChevronClicked(this)');
    if(this.chevronBottom) this.chevronBottom.setAttribute('onclick', 'this.objref.bottomChevronClicked(this)');

    if(this.chevronTop) this.chevronTop.style.visibility = 'hidden';
    if(this.chevronBottom) this.chevronBottom.style.visibility = 'hidden';

    //Makes it so an object is not selectable. DAG 12.16.13
    if(this.chevronBottom) {
        this.chevronBottom.style.WebkitUserSelect = 'none';
        this.chevronBottom.style.KhtmlUserSelect = 'none';
        this.chevronBottom.style.MozUserSelect = 'none';
        this.chevronBottom.style.OUserSelect = 'none';
        this.chevronBottom.style.UserSelect = 'none';
        this.chevronBottom.setAttribute('unselectable', 'on');
    }

    if(this.chevronTop) {
        this.chevronTop.style.WebkitUserSelect = 'none';
        this.chevronTop.style.KhtmlUserSelect = 'none';
        this.chevronTop.style.MozUserSelect = 'none';
        this.chevronTop.style.OUserSelect = 'none';
        this.chevronTop.style.UserSelect = 'none';
        this.chevronTop.setAttribute('unselectable', 'on');
    }

    this.resetPagingVertical();
    this.changePaging();
}

/////////////////////////////
/* Added 3/20/2013 by Len */
ScrollTabletDiv.prototype.dotSpacing = function(navSpacing) {
    this.navSpacing = navSpacing;
    this.resetPaging();
    this.changePaging();
}

/////////////////////////////

ScrollTabletDiv.prototype.resetPaging = function() {

    if(this.dotHolder && this.area) {
        this.dotHolder.innerHTML = '';
        var pages = Math.ceil((this.area.scrollWidth - this.hSnap/2)/this.area.offsetWidth);
        if(pages > 1) {
            var dotcnt = (this.maxDots == 0) ? pages : Math.min(this.maxDots, pages);
            for(var pos = 0;pos<dotcnt;pos++) {
                var dot = new Image();
                dot.src = this.offDot;
                dot.objref = this;
                dot.style.margin = '2px';
                /* Added 3/20/2013 by Len */
                dot.style.marginLeft = this.navSpacing + 'px';
                dot.style.marginRight = this.navSpacing + 'px';

                dot.style.cursor = 'pointer';
                dot.setAttribute('onclick','this.objref.dotClicked(this)');
                this.dotHolder.appendChild(dot);
            }
        }
    }
}

ScrollTabletDiv.prototype.resetPagingVertical = function() {

    if(this.dotHolder && this.area) {
        this.dotHolder.innerHTML = '';
        var pages = Math.ceil((this.area.scrollHeight - this.vSnap/2)/this.area.offsetHeight);
        if(pages > 1) {
            var dotcnt = (this.maxDots == 0) ? pages : Math.min(this.maxDots, pages);
            for(var pos=0;pos<dotcnt;pos++) {
                var dot = new Image();
                dot.src = this.offDot;
                dot.objref = this;
                dot.style.margin = '2px';
                /* Added 3/20/2013 by Len */
                dot.style.marginLeft = this.navSpacing + 'px';
                dot.style.marginRight = this.navSpacing + 'px';

                dot.style.cursor = 'pointer';
                dot.setAttribute('onclick','this.objref.dotClicked(this)');
                this.dotHolder.appendChild(dot);
            }
        }
    }
}

/////////////////////////////

ScrollTabletDiv.prototype.gotoPage = function(pagenum) {
    if(pagenum >= 0 && pagenum < this.dotHolder.children.length) {
        var pages = Math.ceil(this.area.scrollWidth/this.area.offsetWidth);
        var dotcnt = (this.maxDots == 0) ? pages : Math.min(this.maxDots, pages);
        if(dotcnt != pages && pagenum == this.dotHolder.children.length - 1)
            this.area.scrollLeft = this.area.scrollWidth - this.area.offsetWidth;
        else
            this.area.scrollLeft = pagenum*this.area.offsetWidth*pages/dotcnt;
        this.changePaging(false);
    }
}

ScrollTabletDiv.prototype.dotClicked = function(dot) {
    var obj = dot.objref;
    for(var i=0;i<obj.dotHolder.children.length;i++) {
        if(dot == obj.dotHolder.children[i]) {
            var pages = Math.ceil(obj.area.scrollWidth/obj.area.offsetWidth);
            var dotcnt = (obj.maxDots == 0) ? pages : Math.min(obj.maxDots, pages);
            // last dot
            if(dotcnt != pages && i == obj.dotHolder.children.length - 1)
                obj.area.scrollLeft = obj.area.scrollWidth - obj.area.offsetWidth;
            else
                obj.area.scrollLeft = i*obj.area.offsetWidth*pages/dotcnt;
            obj.changePaging(false);
            this.setCookie(this.area.id,this.returnPage(),1);
            return;
        }
    }
}

var preventDoubleFireLeft = false;
ScrollTabletDiv.prototype.leftChevronClicked = function(img) {
    if (!preventDoubleFireLeft) {
        var obj = img.objref;
        if (obj.area.scrollLeft == obj.area.scrollWidth - obj.area.offsetWidth) {
            var endOffset = obj.area.scrollWidth;
            while (endOffset > obj.area.offsetWidth) {
                endOffset -= obj.area.offsetWidth;
            }
            obj.area.scrollLeft = obj.area.scrollLeft - endOffset;
        } else {
            obj.area.scrollLeft = Math.max(0, obj.area.scrollLeft - obj.area.offsetWidth);
        }
        obj.changePaging(false);

        preventDoubleFireLeft = true;
        window.setTimeout(function(){preventDoubleFireLeft = false}, 500);
        this.setCookie(this.area.id,this.returnPage(),1);
    }
}

var preventDoubleFireRight = false;
ScrollTabletDiv.prototype.rightChevronClicked = function(img) {
    if (!preventDoubleFireRight) {
        var obj = img.objref;
        obj.area.scrollLeft = Math.min(obj.area.scrollWidth - obj.area.offsetWidth, obj.area.scrollLeft + obj.area.offsetWidth);
        obj.changePaging(false);

        preventDoubleFireRight = true;
        window.setTimeout(function(){preventDoubleFireRight = false}, 500);
        this.setCookie(this.area.id,this.returnPage(),1);
    }
}

ScrollTabletDiv.prototype.topChevronClicked = function(img) {

    var obj = img.objref;
    if(obj.area.scrollTop == obj.area.scrollHeight - obj.area.offsetHeight){
        var endOffset = obj.area.scrollHeight;
            while(endOffset > obj.area.offsetHeight){
                endOffset -= obj.area.offsetHeight;
            }
        obj.area.scrollTop = obj.area.scrollTop - endOffset;
    }else{
        obj.area.scrollTop = Math.max(0, obj.area.scrollTop - obj.area.offsetHeight);
    }
    obj.changePaging(false);
}

ScrollTabletDiv.prototype.bottomChevronClicked = function(img) {

    var obj = img.objref;
    obj.area.scrollTop = Math.min(obj.area.scrollHeight - obj.area.offsetHeight, obj.area.scrollTop + obj.area.offsetHeight);
    obj.changePaging(false);
}
/////////////////////////////
ScrollTabletDiv.prototype.returnPage         =    function(){
    if(this.currDotPos)
        return this.currDotPos;
}


ScrollTabletDiv.prototype.whatPage = function(force) {

    if(force == undefined) force = false;
    var callChange = false;

    if(this.dotHolder) {
                var pages = Math.ceil((this.area.scrollWidth - this.hSnap/2)/this.area.offsetWidth);
        var cpage = Math.round(this.area.scrollLeft/this.area.offsetWidth);
        var dotcnt = (this.maxDots == 0) ? pages : Math.min(this.maxDots, pages);

        var dotpos = Math.max(0, Math.min(Math.ceil(cpage*dotcnt/pages),this.dotHolder.children.length-1));
        if(this.area.scrollLeft == this.area.scrollWidth - this.area.offsetWidth){
            cpage = pages-1;
            dotpos = pages-1;
        }

        if(force || (dotpos != this.currDotPos)) {
            for(var i=0;i<this.dotHolder.children.length;i++) {
                if(i == dotpos) this.dotHolder.children[i].src = this.onDot;
                else this.dotHolder.children[i].src = this.offDot;
            }
            if(this.chevronLeft) this.chevronLeft.style.visibility = (this.area.scrollLeft > this.hSnap/2) ? 'inherit' : 'hidden';
            if(this.chevronRight) this.chevronRight.style.visibility = (this.area.scrollLeft < this.area.scrollWidth - this.area.offsetWidth - this.hSnap/2) ? 'inherit' : 'hidden';
            this.currDotPos = dotpos;
            callChange = true;
        }
    } else {
        //    added ajf 5/21/2013
        if(this.chevronLeft) this.chevronLeft.style.visibility = (this.area.scrollLeft > 0) ? 'inherit' : 'hidden';
        if(this.chevronRight) this.chevronRight.style.visibility = (this.area.scrollLeft < this.area.scrollWidth - this.area.offsetWidth - this.hSnap/2) ? 'inherit' : 'hidden';
    }

    if(this.hSnap > 0) {
        var items = Math.round(this.area.scrollWidth/this.hSnap);
        var pos = Math.round(items*(1 - this.area.scrollLeft/this.area.offsetWidth));
        if(pos != this.hItemPos) callChange = true;
        this.hItemPos = pos;
    }

    if(this.vSnap > 0) {
        var items = Math.round(this.area.scrollHeight/this.vSnap);
        var pos = Math.round(items*(1 - this.area.scrollTop/this.area.offsetHeight));
        trace("pos:" + pos);
        if(pos != this.vItemPos) callChange = true;
        this.vItemPos = pos;
    }

    if(dotpos > dotcnt) {
                this.currDotPos = dotcnt-1;
        } else if(dotpos < 0) {
                this.currDotPos = 0;
        }

    if(callChange) this.dispatchEvent('change');
}

ScrollTabletDiv.prototype.whatPageVertical = function(force) {

    if(force == undefined) force = false;
    var callChange = false;

    if(this.dotHolder) {
        var pages = Math.ceil(this.area.scrollHeight/this.area.offsetHeight);
        var cpage = Math.round(this.area.scrollTop/this.area.offsetHeight);
        var dotcnt = (this.maxDots == 0) ? pages : Math.min(this.maxDots, pages);
        var dotpos = Math.max(0, Math.min(Math.ceil(cpage*dotcnt/pages),this.dotHolder.children.length-1));
        if(this.area.scrollTop == this.area.scrollHeight - this.area.offsetHeight){
            cpage = pages-1;
            dotpos = pages-1;
        }

        if(force || (dotpos != this.currDotPos)) {
            for(var i=0;i<this.dotHolder.children.length;i++) {
                if(i == dotpos) this.dotHolder.children[i].src = this.onDot;
                else this.dotHolder.children[i].src = this.offDot;
            }
            if(this.chevronTop) this.chevronTop.style.visibility = (this.area.scrollTop > this.vSnap/2) ? 'inherit' : 'hidden';
            if(this.chevronBottom) this.chevronBottom.style.visibility = (this.area.scrollTop < this.area.scrollHeight - this.area.offsetHeight - this.vSnap/2) ? 'inherit' : 'hidden';
            this.currDotPos = dotpos;
            callChange = true;
        }
    } else {
        //    added ajf 5/21/2013
        if(this.chevronTop) this.chevronTop.style.visibility = (this.area.scrollTop > 0) ? 'inherit' : 'hidden';
        if(this.chevronBottom) this.chevronBottom.style.visibility = (this.area.scrollTop < this.area.scrollHeight - this.area.offsetHeight - this.vSnap/2) ? 'inherit' : 'hidden';
    }

    if(this.hSnap > 0) {
        var items = Math.round(this.area.scrollWidth/this.hSnap);
        var pos = Math.round(items*(1 - this.area.scrollLeft/this.area.offsetWidth));
        if(pos != this.hItemPos) callChange = true;
        this.hItemPos = pos;
    }

    if(this.vSnap > 0) {
        var items = Math.round(this.area.scrollHeight/this.vSnap);
        var pos = Math.round(items*(1 - this.area.scrollTop/this.area.offsetHeight));
        trace("pos:" + pos);
        if(pos != this.vItemPos) callChange = true;
        this.vItemPos = pos;
    }

    if(callChange) this.dispatchEvent('change');
}

/////////////////////////////

ScrollTabletDiv.prototype.changePaging = function(useTween) {

    if(useTween == undefined) useTween = true;

    if(this.vSnap > 0) {
        var newTop = Math.round(this.area.scrollTop/this.vSnap)*this.vSnap;
        if(this.area.scrollTop != newTop) {
            if(useTween) {
                var vScrollTween = new Tween(this.area, 'scrollTop', this.area.scrollTop, newTop, 300);
                addListener(vScrollTween, 'finish', function(){
                    if (vScrollTween.position == 0) {
                         vScrollTween.obj.objref.chevronTop.style.visibility = 'hidden';
                     }
                });
            } else {
                this.area.scrollTop = newTop;
            }
        }
        this.whatPageVertical(true);
        this.hideOrShowTopChevron();
        return;
    }

    if(this.hSnap > 0) {
        var newLeft = Math.round(this.area.scrollLeft/this.hSnap)*this.hSnap;
         if(this.area.scrollLeft != newLeft) {
             if(useTween) {
                 var hScrollTween = new Tween(this.area, 'scrollLeft', this.area.scrollLeft, newLeft, 300);
                 addListener(hScrollTween, 'finish', function(){
                     if (hScrollTween.position == 0) {
                         hScrollTween.obj.objref.chevronLeft.style.visibility = 'hidden';
                     }
                 });
             } else {
                 this.area.scrollLeft = newLeft;
             }
         }
        this.hideOrShowLeftChevron();
     }
    if(this.vSnap<=0){
        this.whatPage(true);
    }
}

///////////////////////////////////////////////////////////////////
// function to check the current position of the element and base on the position to show or hide the chevrons
ScrollTabletDiv.prototype.hideOrShowTopChevron = function() {
    if (this.chevronTop) {
        var newTop = Math.round(this.area.scrollTop/this.vSnap)*this.vSnap;
        if (newTop === 0) {
            this.chevronTop.style.visibility = 'hidden';
        } else {
            this.chevronTop.style.visibility = 'inherit';
        }
    }
}

ScrollTabletDiv.prototype.hideOrShowLeftChevron = function() {
    if (this.chevronLeft) {
        var newLeft = Math.round(this.area.scrollLeft/this.hSnap)*this.hSnap;
        if (newLeft === 0) {
            this.chevronLeft.style.visibility = 'hidden';
        } else {
            this.chevronLeft.style.visibility = 'inherit';
        }
    }
}
///////////////////////////////////////////////////////////////////
// Cookie Setting
ScrollTabletDiv.prototype.setCookie = function(cname,value,exdays) {
    var exdate = new Date();
    if(isNaN(exdays)) exdays = 365;
    exdate.setDate(exdate.getDate() + exdays);
    var domain = '.'+document.domain.split('.').slice(-2).join('.');
    document.cookie = cname+"="+encodeURI(value)+"; expires="+exdate.toUTCString()+"; domain="+domain+"; path=/";
}

ScrollTabletDiv.prototype.removeCookie = function(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}
/////////////////////////////

enableEventHandling(ScrollTabletDiv);

////////////////////////////////////////////////////////////////////////////

var activeScroll = null;

function VerticalScrollBar(barid, setW, setH) {
    this.autoHide = false;
    this.scrolly = 0;
    this.scrolling = false;
    this.position = -1;
    this.showScrollBar = true;


    this.shell = (typeof(barid) == 'string') ? document.getElementById(barid) : barid;

    var w = (typeof(setW) !== 'undefined') ? setW : this.shell.offsetWidth;
    var h = (typeof(setH) !== 'undefined') ? setH : this.shell.offsetHeight;

    this.viewpane = h;
    this.scrollRange = h;

    this.toparrow = new Image();
    this.toparrow.src = IMGHOST+'/html5/scroll_top.png';
    this.toparrow.width = w;
    this.toparrow.height = Math.round(w*46/25);
    this.toparrow.style.position = 'absolute';
    this.toparrow.objref = this;
    this.toparrow.style.cursor = 'pointer';
    this.holdArrowScroll(this, this.toparrow, 100);
    this.shell.appendChild(this.toparrow);

    this.backimg = new Image();
    this.backimg.src = IMGHOST+'/html5/scroll_slice.png';
    this.backimg.width = w;
    this.backimg.height = h - 2*Math.round(w*46/25) + 2; // QAV-4531 extending scrollbar background 1 pixel top and one bottom
    this.backimg.style.position = 'absolute';
    this.backimg.style.top = Math.round(w*46/25) - 1 + 'px'; // QAV-4531 moving scrollbar background 1 pixel on top
    this.shell.appendChild(this.backimg);

    this.btmarrow = new Image();
    this.btmarrow.src = IMGHOST+'/html5/scroll_btm.png';
    this.btmarrow.width = w;
    this.btmarrow.height = Math.round(w*46/25);
    this.btmarrow.style.position = 'absolute';
    this.btmarrow.style.top = (h - this.btmarrow.height) + 'px';
    this.btmarrow.objref = this;
    this.btmarrow.style.cursor = 'pointer';
    this.holdArrowScroll(this, this.btmarrow, 100);
    this.shell.appendChild(this.btmarrow);

    this.backdiv = document.createElement('div');
    this.backdiv.style.width = w + 'px';
    this.backdiv.style.height = Math.round(h - w*27*2/25) + 'px';
    this.backdiv.style.position = 'absolute';
    this.backdiv.style.top = Math.round(w*27/25) + 'px';
     this.backdiv.objref = this;
    this.shell.appendChild(this.backdiv);

    this.bardiv = document.createElement('div');
    this.bardiv.style.position = 'absolute';
    this.bardiv.style.width = (this.shell.offsetWidth <= 0) ?  w + 'px' : this.backdiv.offsetWidth + 'px';
    this.bardiv.style.top = this.backdiv.offsetTop + 'px';
    this.bardiv.objref = this;
    this.backdiv.appendChild(this.bardiv);

    this.bartop = new Image();
    this.bartop.src = IMGHOST+'/html5/scrollbar_top.png';
    this.bartop.width = w;
    this.bartop.height = Math.round(w*17/25);
    this.bartop.style.position = 'absolute';
    this.bardiv.appendChild(this.bartop);

    this.barmid = new Image();
    this.barmid.src = IMGHOST+'/html5/scrollbar_slice.png';
    this.barmid.width = w;
    this.barmid.height = Math.round(Math.round(h - w*27*2/25)/2);
    this.barmid.style.position = 'absolute';
    this.barmid.style.top = Math.round(w*17/25) + 'px';
    this.bardiv.appendChild(this.barmid);

    this.barbtm = new Image();
    this.barbtm.src = IMGHOST+'/html5/scrollbar_btm.png';
    this.barbtm.width = w;
    this.barbtm.height = Math.round(w*17/25);
    this.barbtm.style.position = 'absolute';
    this.barbtm.style.top =  Math.round(w*17/25) + Math.round(Math.round(h - w*27*2/25)/2) + 'px';
    this.bardiv.appendChild(this.barbtm);

    if(this.shell.offsetHeight > 0){
        this.adjustBar();
        this.adjustPos();
    }else{
        this.backsize = Math.round(h - w*27*2/25);
        this.barsize = (Math.round(w*17/25)*2)+ Math.round(Math.round(h - w*27*2/25)/2);
        this.bardiv.style.height = (Math.round(w*17/25)*2)+ Math.round(Math.round(h - w*27*2/25)/2) + 'px';
    }

    addListener(this.bardiv, 'mousedown', this.scrollStart);
    addListener(this.bardiv, 'touchstart', this.scrollStart);
    addListener(this.backdiv, 'mousewheel',this.scrollWheel);
    addListener(this.backdiv, 'DOMMouseScroll',this.scrollWheel);
}

/////////////////////

VerticalScrollBar.prototype.setPosition = function(p) {
    this.adjustPos(p);
}

VerticalScrollBar.prototype.setShowScrollBar = function(b) {
    this.showScrollBar = b;
    this.shell.style.visibility = b ? 'inherit' : 'hidden';
}

VerticalScrollBar.prototype.setViewPane = function(p) {
    this.viewpane = p;
    if(this.shell.offsetHeight > 0){
        this.adjustBar();
        this.adjustPos();
    }
}

VerticalScrollBar.prototype.setScrollRange = function(p) {
    this.scrollRange = Math.max(p, this.viewpane);

    if(this.shell.offsetHeight > 0){
        this.adjustBar();
        this.adjustPos();
    }
}

VerticalScrollBar.prototype.setScrolledArea = function(div) {
    this.area = (typeof(div) == 'string') ? document.getElementById(div) : div;
    if(this.area) {
        this.scrollRange = Math.max(this.area.scrollHeight, this.viewpane);
        //var ef = new EnterFrame(this, this.resizeArea);
        //ef.frameRate = 1;

        if(this.shell.offsetHeight > 0){
            this.adjustBar();
            this.adjustPos();
        }
    }
}

/////////////////////

VerticalScrollBar.prototype.resizeArea = function(event) {
    if(this.scrollRange != this.area.scrollHeight) {
        this.scrollRange = Math.max(this.area.scrollHeight, this.viewpane);

        this.adjustBar();
        this.adjustPos();
    }
}

VerticalScrollBar.prototype.holdArrowScroll = function(bar,btn,start) {
    var t;
    var stopRepeat = false;
    var repeat = function () {
        if(stopRepeat){
            clearTimeout(t);
            return;
        }
        var newpos = (btn == bar.btmarrow) ? 30 : -30;
        bar.setPosition(bar.position + newpos);
        t = setTimeout(repeat, start);
    }
    addListener(btn, 'mousedown', function(){stopRepeat = true;});
    addListener(btn, 'mouseup', function(){stopRepeat = true;});
    addListener(btn, 'mouseout', function(){stopRepeat = true;});
    addListener(btn, 'touchstart', function(){stopRepeat = false;repeat();});
    addListener(btn, 'touchend', function(){stopRepeat = true;});
}

/////////////////////

VerticalScrollBar.prototype.scrollStart = function(event) {
    var bar = getEventTarget(event);
    var obj = bar.objref;

    var mousepos = pagePosition(event);
    obj.scrolly = mousepos.y;

    obj.scrolling = false;
    obj.scrollstart = obj.scrolly;

    addListener(document, 'mousemove',obj.scrollMove);
    addListener(document, 'mouseup',obj.scrollEnd);
    addListener(document, 'touchmove',obj.scrollMove);
    addListener(document, 'touchend',obj.scrollEnd);
    activeScroll = obj;

    cancelEvent(event);
}

VerticalScrollBar.prototype.scrollMove = function(event) {

    var mousepos = pagePosition(event);
    var obj = activeScroll;
    obj.scrolling = true;
    var topOffset = Math.min(obj.backsize - obj.barsize, Math.max(obj.bardiv.offsetTop - obj.scrolly + mousepos.y, 0));
    obj.bardiv.style.top = Math.min(obj.backsize - obj.barsize, Math.max(obj.bardiv.offsetTop - obj.scrolly + mousepos.y, 0))+'px';
    obj.scrolly = mousepos.y;
    obj.adjustPos((obj.scrollRange - obj.viewpane)*topOffset/(obj.backsize - obj.barsize));

    cancelEvent(event);
}

VerticalScrollBar.prototype.scrollWheel = function(event) {

    var bar = getEventTarget(event);
    var obj = bar.objref;
    var wheelData = event.detail ? event.detail * -1 : event.wheelDelta / 40;

    var p = obj.bardiv.offsetTop - wheelData*3;
    obj.bardiv.style.top = Math.min(obj.backsize - obj.barsize, Math.max(p, 0))+'px';
    obj.adjustPos((obj.scrollRange - obj.viewpane)*obj.bardiv.offsetTop/(obj.backsize - obj.barsize));
    cancelEvent(event);
}

VerticalScrollBar.prototype.scrollEnd = function(event) {
    if(activeScroll) {
        removeListener(document,'touchend',activeScroll.scrollEnd);
        removeListener(document,'touchmove',activeScroll.scrollMove);
        removeListener(document,'mousemove',activeScroll.scrollMove);
        removeListener(document,'mouseup',activeScroll.scrollEnd);
        activeScroll.scrolling = false;
    }
    activeScroll = null;
    cancelEvent(event);
}

/////////////////////

VerticalScrollBar.prototype.adjustBar = function() {
    this.backsize = this.backdiv.offsetHeight;
    this.barsize = Math.min(this.backsize, Math.max(this.bardiv.offsetWidth*34/25, this.backsize*this.viewpane/this.scrollRange));
    this.bardiv.style.height = this.barsize + 'px';
    if(this.bartop && this.barmid && this.barbtm) {
        this.barmid.style.height = Math.max(0, this.bardiv.offsetHeight - 2*Math.round(this.bardiv.offsetWidth*17/25)) + 'px';
        this.barbtm.style.top = this.barmid.offsetTop + this.barmid.offsetHeight + 'px';
    }
}

VerticalScrollBar.prototype.adjustPos = function(newpos) {

    if(isNaN(newpos)) newpos = this.position;

    var newpos = Math.min(this.scrollRange - this.viewpane, Math.max(0, newpos));

    if(this.scrollRange <= this.viewpane) this.bardiv.style.top = '0px';
    else this.bardiv.style.top = newpos*(this.backsize - this.barsize)/(this.scrollRange - this.viewpane) + 'px';

    if(this.area) this.area.scrollTop = Math.max(0, Math.min(newpos, this.area.scrollHeight - this.area.offsetHeight));

    if(newpos != this.position) {
        this.position = newpos;
        this.dispatchEvent('change');
    }
    if(this.showScrollBar == true){
        this.shell.style.visibility = ((this.autoHide == true && this.viewpane >= this.scrollRange) || this.viewpane < 100) ? 'hidden' : 'inherit';
    }

    this.dispatchEvent('adjustPos'); //ajf
}

/////////////////////

VerticalScrollBar.prototype.resizeDiv = function() {

    var w = this.shell.offsetWidth;
    var h = this.shell.offsetHeight;

    this.toparrow.width = w;
    this.toparrow.height = Math.round(w*46/25);

    this.backimg.width = w;
    this.backimg.height = h - 2*Math.round(w*46/25);
    this.backimg.style.top = Math.round(w*46/25) + 'px';

    this.btmarrow.width = w;
    this.btmarrow.height = Math.round(w*46/25);
    this.btmarrow.style.top = (h - this.btmarrow.height) + 'px';

    this.backdiv.style.width = w + 'px';
    this.backdiv.style.height = Math.round(h - w*27*2/25) + 'px';
    this.backdiv.style.top = Math.round(w*27/25) + 'px';

    this.bardiv.style.width = this.backdiv.offsetWidth + 'px';
    this.bardiv.style.top = this.backdiv.offsetTop + 'px';

    this.bartop.width = w;
    this.bartop.height = Math.round(w*17/25);

    this.barmid.width = w;
    this.barmid.height = Math.round(this.backdiv.offsetHeight/2);
    this.barmid.style.top = Math.round(w*17/25) + 'px';

    this.barbtm.width = w;
    this.barbtm.height = Math.round(w*17/25);
    this.barbtm.style.top = this.barmid.offsetTop + this.barmid.offsetHeight + 'px';
    this.adjustBar();
    this.adjustPos();
}

/////////////////////


enableEventHandling(VerticalScrollBar);

////////////////////////////////////////////////////////////////////////////

var GrowButtonList = new Array();

function GrowButton(div) {

	if(typeof(div) == 'string') div = document.getElementById(div);

	this.div = div;
	div.objref = this;

	// init button state to up
	div.style.transform = "scale(1,1)";
	div.style.webkitTransform = "scale(1,1)";
	div.style.msTransform = "scale(1,1)";
	
	if(MOBILE) {
		addListener(div, "touchstart", this.clickDownEvent);
		addListener(document.body, "touchend", this.clickUpEvent);
	}else{
		addListener(div, "mousedown", this.clickDownEvent);
		addListener(document.body, "mouseup", this.clickUpEvent);
	}
}

GrowButton.prototype.clickDownEvent = function(e) {
	var div = getEventTarget(e);

	// prevent dragging of images
	if(!MOBILE){
		e.preventDefault();
	}

	// push down the button
	div.style.transform = "scale(1.05,1.05)";
	div.style.webkitTransform = "scale(1.05,1.05)";
	div.style.msTransform = "scale(1.05,1.05)";

	GrowButtonList.push(div);
}

GrowButton.prototype.clickUpEvent = function(e) {

	// get click release target
	if(MOBILE) {
		var eventPos = pagePosition(e);
		var x = eventPos.x;//e.changedTouches.item(0).pageX/pageScale;//diff for android 1.15.14 DAG
		var y = eventPos.y;//e.changedTouches.item(0).pageY/pageScale;//diff for android 1.15.14 DAG
		var div = document.elementFromPoint(x,y);
	} else {
		var div = e.target;
	}

	// check if a parent of the target is this button
	// needed in case the up event is over an element within the original div
	while (GrowButtonList.indexOf(div) == -1 && div){
		div = div.parentNode;
	}

	if(div == null) div = GrowButtonList.pop();
	else GrowButtonList.splice(GrowButtonList.indexOf(div),1);

	if(div) {
		// lift button back up regardless
		div.style.transform = "scale(1,1)";
		div.style.webkitTransform = "scale(1,1)";
		div.style.msTransform = "scale(1,1)";
	}
}


////////////////////////////////////////////////////////////////////////////
var assessmentNotification = {
	init: function init() {
		this.getNumberOfNotification();
	},

	getNumberOfNotification: function getNumberOfNotification() {
		var apiEndPoint = 'user_get_notifications';
		var apiParams = new Object();
		apiParams.arguments = '[["parent_homepage"]]';
		// Making the API call 
		ApiService.call(apiEndPoint, apiParams, function(respond){
			if(respond.success !== "FALSE"){
				this.createNotification(formatResponse(respond.payload));
			}
		}.bind(this));
	},

	assessmentNotificationIsActive: function assessmentNotificationIsActive() {
		return true;
	},

	createNotification: function createNotification(notificationData) {
		this.removeNotification();
		var numberOfNotification = 0;
		if (notificationData.totalNotifications != null && Number.isInteger(notificationData.totalNotifications)) {
			numberOfNotification = notificationData.totalNotifications;
		}
		if (numberOfNotification > 0) {
			this.createNotificationBadgeOnShell(numberOfNotification);
			this.createNotificationBadgeOnList(notificationData);
		} else {
			this.removeNotification();
			return;
		}
	},

	createNotificationBadgeOnShell: function createNotificationBadgeOnShell(numberOfNotification) {
		var btnShellOptions = document.getElementById('btn-shell-options');
		if (btnShellOptions && Number.isInteger(numberOfNotification) && numberOfNotification>0) {
			var shellOptionAssessmentNotificationBadge = document.createElement('div');
			shellOptionAssessmentNotificationBadge.id = 'shellOptionAssessmentNotificationBadge';
			
			if (numberOfNotification > 99) {
				shellOptionAssessmentNotificationBadge.style.width = '30px';
				shellOptionAssessmentNotificationBadge.innerHTML = '99+';
			} else if (numberOfNotification > 9) {
				shellOptionAssessmentNotificationBadge.style.width = '24px';
				shellOptionAssessmentNotificationBadge.innerHTML = numberOfNotification;
			} else {
				shellOptionAssessmentNotificationBadge.innerHTML = numberOfNotification;
			}
			btnShellOptions.appendChild(shellOptionAssessmentNotificationBadge);
		}
		return;
	},

	createNotificationBadgeOnList: function createNotificationBadgeOnList(notificationData) {
		var btnAssessments = document.getElementById('btn-assessments');
		var btnParentSection = document.getElementById('btn-parents');
		var assessmentNotificationCount = notificationData.assessments.notification_ids !== null
		  ? notificationData.assessments.notification_ids.length
		  : 0;
		var subscriptionNotificationCount = typeof notificationData.parent_homepage !== 'undefined'
		  ? notificationData.parent_homepage.total_notifications
		  : 0;

		createBadgeFor(btnAssessments, assessmentNotificationCount, 'shellAssessmentNotificationBadge');
		createBadgeFor(btnParentSection, subscriptionNotificationCount, 'parentNotificationBadge');
		return;
	},

	removeNotification: function removeNotification() {
		this.removeDiv('shellOptionAssessmentNotificationBadge');
		this.removeDiv('shellAssessmentNotificationBadge');
		this.removeDiv('parentNotificationBadge');
		return;
	},

	refreshNotification: function refreshNotification() {
		this.createNotification();
		return;
	},

	removeDiv: function removeDiv(divID) {
		var targetDiv = document.getElementById(divID);
		if (targetDiv) {
			targetDiv.parentNode.removeChild(targetDiv);
		}
		return;
	}
};

Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};

function formatResponse(data) {
  var res = {};
  for (var key in data) {
    res[key] = data[key];
  }
  res.totalNotifications = data.total_notifications;
  return res;
}

function createBadgeFor(HTMLElement, count, id) {
		if (!Number.isInteger(count) || HTMLElement === null) {
		    return;
		}
		if (count >0) {
			var shellAssessmentNotificationBadge = document.createElement('div');
			shellAssessmentNotificationBadge.id = id;
			
			if (count > 99) {
				shellAssessmentNotificationBadge.style.width = '30px';
				shellAssessmentNotificationBadge.innerHTML = '99+';
			} else if (count > 9) {
				shellAssessmentNotificationBadge.style.width = '24px';
				shellAssessmentNotificationBadge.innerHTML = count;
			} else {
				shellAssessmentNotificationBadge.innerHTML = count;
			}
			HTMLElement.appendChild(shellAssessmentNotificationBadge);
    }
  return HTMLElement;
}

// Adding function to the global listener to allow angular iframe message services to call this function - iframeMsg.broadcast()
window.updateAssessmentNotifcations = function(inValue) {
	assessmentNotification.createNotification(inValue);
};

////////////////////////////////////////////////////////////////////////////
var Analytics = {
    trackableElement: false,

    init: function (digitalData) {
        this.setDigitalData(digitalData);
    },

    setDigitalData: function (digitalData) {
        if(typeof digitalData !== 'undefined')
            window.digitalData = digitalData;
    },

    start: function () {
        this.startClickTracking(document.body);
    },

    trackPageView: function () {
        console.log('Tracking page view');
        if(typeof window.digitalData != 'undefined' && window.digitalData['valid'] && !window.deferPageTracking) {
            this._dtmTrack('page view');
        }
        else
            window.deferPageTracking = false;
    },

    /**
     * Start tracking for clicks.
     * @param {HTMLElement} container DOM container where this should track for click events.
     */
    startClickTracking: function (container) {
        if (typeof touchCapable != 'undefined') {
            var mouseClickDown = (touchCapable) ? 'touchstart' : 'mousedown';
            var mouseClickUp = (touchCapable) ? 'touchend' : 'mouseup';
        } else {
            var mouseClickDown = 'mousedown';
            var mouseClickUp = 'mouseup';
        }
        container.addEventListener(mouseClickDown, this._elementClickStart.bind(this));
        container.addEventListener(mouseClickUp, this._elementClickEnd.bind(this));
    },

    /**
     * Set vars to digitalData.
     * @param value To be pair with keys
     * @param key1 root elements of object - page, transaction or user
     * @param key2 child
     * @param key3 child of child
     */
    dtmSetDigitalDataValue: function(value, key1, key2, key3)
    {
        if (typeof digitalData != 'undefined') {
            if(typeof key3 != 'undefined')
            {
                if (typeof digitalData[key1][key2] != 'undefined') {
                    if (value)
                        value = value.toString().replace(/([A-Z])/g, " $1").toLowerCase();
                    digitalData[key1][key2][key3] = value;
                }
            }
            else if(typeof key2 != 'undefined')
            {
                if (typeof digitalData[key1] != 'undefined') {
                    if (value)
                        value = value.toString().replace(/([A-Z])/g, " $1").toLowerCase();
                    digitalData[key1][key2] = value;
                }
            }
            else
            {
                if (value)
                    value = value.toString().replace(/([A-Z])/g, " $1").toLowerCase();
                digitalData[key1] = value;
            }
        }
    },

    /**
     * Set vars to track.
     * @param  keyPair ObjArray of data var pairs
     * @param  event
     */
    trackVars: function (keyPair, event) {
        for(var i = 0; i < keyPair.length;i++){
            this._dtmVars(keyPair[i].key, keyPair[i].val);
        }
        this._dtmTrack(event);
    },

    trackClick: function (linkData) {
        this.trackEvent('@linkClick', {'linkName': linkData});
    },
    
    trackPageEvent: function (eventName) {
        if (eventName) {
            this._dtmTrack(eventName);
        } else {
            // console.log('trackPageEvent: eventName is FALSE');
        }
    },

    trackEvent: function (eventName, kvp, params) {
        if (eventName && typeof digitalData != 'undefined') {
            if(!kvp)
                kvp = {};

            var args = {
                'master_account_member_id': digitalData.user.profile.memberId,
                'member_id': digitalData.user.profile.userId,
                'track_cookie': getCookie('track'),
                'url': eventName,
                'page_info_key': digitalData.page.pageInfo.urlPath,
                'kvp': kvp,
                'referer': window.location.href, 
                'code_base': 'html5'
            };

            if(!params)
                params = {};

            for (var attrname in params) {
                args[attrname] = params[attrname];
            }

            if(typeof language != 'undefined' && language)
                args['displayed_language'] = language;

            var area = getCookie('pageArea');
            if(area)
                args['area'] = area.replace(/\+/g, " ");

            if(typeof digitalData.page.pageInfo.pageDetail != 'undefined')
                args['page_detail'] = digitalData.page.pageInfo.pageDetail;

            args = [args];
            args = [args];
            this._apiEventLog(eventName, args);
        }
    },

    trackVideo: function (event, kvp) {
        var isExample = window.location.search.indexOf('example=true') != -1;

        if(isExample) {
            //don't track videos if theyre invoked as examples
            return;
        }
        // Set correct eventName
        var eventName = '@videoStart';
        if(event === 'complete')
            eventName = '@videoComplete';

        if(typeof kvp === 'undefined') kvp = {};

        // If there is no kvp.videoLocation passed in, default to the digitalData.page.pageInfo.pageDetail if set and is not blank
        if(typeof kvp.videoLocation === 'undefined' && typeof digitalData !== 'undefined' && typeof digitalData.page !== 'undefined' && typeof digitalData.page.pageInfo !== 'undefined' && typeof digitalData.page.pageInfo.pageDetail !== 'undefined' && digitalData.page.pageInfo.pageDetail)
            kvp.videoLocation = digitalData.page.pageInfo.pageDetail;

        this.trackEvent(eventName, kvp);
    },

    trackVideoComplete: function (kvp) {
        this.trackVideo('complete', kvp);
    },

    trackVideoStart: function (kvp) {
        this.trackVideo('start', kvp);
    },

    setDtmArgs: function (key1, key2, key3, value) {
        if (key1 && key2 && key3 && value) {
            this._dtmArgs(key1, key2, key3, value);
        }
    },

    setDtmVars: function (key, value) {
        if (key && value) {
            this._dtmVars(key, value);
        } else {
            // console.log('setDtmVars: Either one or both key and value are FALSE');
        }
    },

    setPageDetail: function(pageDetail) {
        if (pageDetail) {
            this._dtmArgs('page','pageInfo','pageDetail', pageDetail);
        } else {
            // console.log('setPageDetail: pageDetail is FALSE');
        }
    },

    setSatelliteCookie: function(cookieName, cookieValue, cookieExpirationDay) {
        if (typeof _satellite != 'undefined') {
            if (cookieName && cookieValue) {
                if (cookieExpirationDay && Number.isInteger(cookieExpirationDay)) {
                    _satellite.setCookie(cookieName, cookieValue, cookieExpirationDay);
                } else {
                    _satellite.setCookie(cookieName, cookieValue, 1);
                }
                // console.log('setSatelliteCookie: Analystics cookie set cookieName: "' + cookieName + '" cookieValue: "' + cookieValue + '"');
            } else {
                // console.log('setSatelliteCookie: Analystics cookie not set cookieName: "' + cookieName + '" cookieValue: "' + cookieValue + '"');
            }
        }
    },

    getSatelliteCookie: function(cookieName) {
        if (typeof _satellite != 'undefined') {
            if (cookieName) {
                var cookieValue = _satellite.readCookie(cookieName)
                // console.log('getSatelliteCookie: reading Analystics Cookie cookieName: "' + cookieName + '" cookieValue: "' + cookieValue + '"');
                return cookieValue;
            } else {
                // console.log('getSatelliteCookie: cookieName is FALSE');
            }
        }
    },

    removeSatelliteCookie: function(cookieName) {
        if (typeof _satellite != 'undefined') {
            if (cookieName) {
                _satellite.removeCookie(cookieName);
                // console.log('removeSatelliteCookie: cookie "' + cookieName + '" removed');
            } else {
                // console.log('removeSatelliteCookie: cookieName is FALSE');
            }
        }
    },

    /**
     * From this line below are all private function used by the analytics
     */

    _apiEventLog: function (eventName, arguments) {
        arguments = JSON.stringify(arguments);
        var params = {};
        params.arguments = arguments;
        ApiService.call('event_log', params);
    },

    _elementClickStart: function (event) {
        if (event.target.getAttribute('data-tracking')) {
            this.trackableElement = event.target;
        }
    },

    _elementClickEnd: function (event) {
        if (this.trackableElement) {
            this.trackClick(event.target.getAttribute('data-tracking'));
            this.trackableElement = false;
        }
    },

    /**
     * @private
     */
    _dtmTrack: function (eventName) {
        console.log('in dtm track');
        if (typeof _satellite != 'undefined') {
            _satellite.track(eventName);
        }
    },

    /**
     * @private
     */
    _dtmArgs: function (key1, key2, key3, value) {
        if (typeof digitalData != 'undefined') {
            if (typeof digitalData[key1][key2] != 'undefined') {
                if (value) {
                    value = value.toString().replace(/([A-Z])/g, " $1").toLowerCase();
                }
                digitalData[key1][key2][key3] = value;
            }
        }
    },

    /**
     * @private
     */
    _dtmVars: function (key, value) {
        if (typeof digitalData != 'undefined') {
            if (typeof _satellite != 'undefined') {
                value = value.toString().replace(/([A-Z])/g, " $1").toLowerCase();
                _satellite.setVar(key, value);
            }
        }
    },
}

////////////////////////////////////////////////////////////////////////////
var itemseq = 0;
var itemlist = new Array();
var LayerInfo = {};

LayerInfo.SCENE 		= 100;
LayerInfo.SKIN 			= 150;
LayerInfo.EYES 			= 200;
LayerInfo.MOUTH 		= 250;
LayerInfo.NOSE 			= 300;
LayerInfo.HAIR 			= 350;
LayerInfo.GLASSES 		= 400;
LayerInfo.LEGGINGS	 	= 500;
LayerInfo.SOCKS 		= 550;
LayerInfo.SHOES 		= 600;
LayerInfo.PANTS 		= 650;
LayerInfo.SHIRT 		= 700;
LayerInfo.DRESS 		= 725;
LayerInfo.JACKET 		= 750;
LayerInfo.SWEATER 		= 775;
LayerInfo.COSTUME 		= 800;
LayerInfo.GOWN 			= 825;
LayerInfo.PET 			= 850;

LayerInfo.isClothing = function(layer) { return (layer >= this.SHIRT && layer <= this.COSTUME); }
LayerInfo.blockCostume = function(layer) { return (layer > this.HAIR && layer < this.COSTUME); }
LayerInfo.blockGown = function(layer) { return (layer >= this.PANTS && layer < this.GOWN && layer != this.SHOES && layer != this.SOCKS); }
LayerInfo.canRemove = function(layer) { return (layer == this.SCENE || layer >= this.HAIR); }

//////////////////////////////////////////////////////////
//	AVATAR ITEM OBJECT
//////////////////////////////////////////////////////////

function AvatarItem(info) {
	this.tryout = false;
	for(var prop in info) this[prop] = info[prop];

	//this.id = 'item_'+itemseq++;
	this.id = 'item_'+info.sku;
	this.info = info;
	this.specialhair = 0;
	if(info.properties && info.properties.specialhair)
		this.specialhair = info.properties.specialhair;

	this.onHanger = 0;
	this.ready = false;
	this.remove = false;
	this.failed = false;
	this.owned = false;
	if(!this.info.owned)this.owned = true;
	if(this.info.owned){
		for(var i=0;i<this.info.owned.length;i++){
			if(this.info.owned[i] == this.info.variant_desc[this.info.variant].variant)
				this.owned = true;
		}
	}
	this.linecolor = 0;
	this.imageWidth = 0;
	this.imageHeight = 0;
	this.img = document.createElement('canvas');
	this.img.style.position = 'absolute';
	this.img.itemobj = this;

	this.pngimg = new Image();
	this.pngimg.setAttribute('itemobj', this.id);
	this.pngimg.id = this.id;
	this.pngimg.style.backgroundColor	=   'rgba(255,255,255,0)';
	//this.pngimg.setAttribute('onload', "IE8loadImage('"+this.id+"')"); //using setAttribute instead of event, because IE 8 had problem targeting the source
	//Added by MS, this is needed for IE8
	var self = this;
	this.pngimg.onload = function() { self.loaded();};



	this.pngimg.setAttribute('onerror', "IE8loadImage('"+this.id+"')");
	this.pngimg.src = info.image; //+"?v="+((new Date()).getTime());
	if(this.pngimg.complete) { this.loaded(); }
	this.storeimg = new Image();
	this.storeimg.setAttribute('itemobj', this.id);
	// using info.image if info.storeimage is not available. Because for graduation the gown does not have storeimage
	if (info.storeimage) {
		this.storeimg.src = info.storeimage;
	} else {
		this.storeimg.src = info.image;
	}
	addListener(this.pngimg, 'click', this.avatarClicked);



//////////////////////////////////////////////////////////////////////////////////////

	itemlist.push(this);
}

function avatarItemById(id) {
	for(var i=0;i<itemlist.length;i++) {
		if(itemlist[i].id == id) return itemlist[i];
	}
}

function IE8loadImage(itemid) {
	var item = avatarItemById(itemid);

	if(item) {
		item.loaded();
	}
}


AvatarItem.prototype.getTryout = function() { return this.tryout; }
AvatarItem.prototype.setTryout = function(b) { this.tryout = b; }

AvatarItem.prototype.loaded = function() {
	this.imageWidth = this.pngimg.width;
	this.imageHeight = this.pngimg.height;

	this.img.width = this.imageWidth;
	this.img.height = this.imageHeight;

	//this.div = document.getElementById("imageHolder_div");
	//this.div.appendChild(this.pngimg);
	if(this.img.getContext) {
		this.img.getContext('2d').drawImage(this.pngimg, 0, 0, this.imageWidth, this.imageHeight);
	}

	this.ready = true;
	this.dispatchEvent('loaded');
}

AvatarItem.prototype.setOutline = function(color){
	if(this.linecolor != color){
		this.ready = false;
		this.pngimg.src = this.info.image.replace('.png','_'+color+'.png');
		this.linecolor = color;
	}
	else {
		this.loaded();
	}
}

AvatarItem.prototype.hitTest = function(x,y) {

	var top = parseInt(this.pngimg.style.top.replace('px',''));
	var left = parseInt(this.pngimg.style.left.replace('px',''));
	var width = parseInt(this.pngimg.style.width.replace('px',''));
	var height = parseInt(this.pngimg.style.height.replace('px',''));

	x = Math.round((x - left)*this.pngimg.width/width);
	y = Math.round((y - top)*this.pngimg.height/height);
	cnvs_width = 1;
	cnvs_height = 1;

	var ctx = this.img.getContext('2d');
	var imgd = ctx.getImageData(x, y, cnvs_width, cnvs_height);
	var pix = imgd.data;
	if (pix[3] != 0){
		return true;
	} else {
		return false;
	}
}

enableEventHandling(AvatarItem);

//////////////////////////////////////////////////////////
//	AVATAR OBJECT
//////////////////////////////////////////////////////////

function Avatar(div, items) {
	if(typeof(div) == 'string') div = document.getElementById(div);
	this.div = div;
	div.objref = this;
	this.items = new Array();
	this.info = new Object();

	this.myRoomStart = false;
	this.partstoload = 0;
	this.olditems = new Array();
	this.skinline = "#BD875D";
	this.skintone = "#BD875D";
	this.changes = false;
	this.changeSinceLastSave = false;
	this.showacc = true;
	this.showPet = false;
	this.showAvatar = false;
	this.autoSave = true;
	this.fillhair = false;
	this.usehair = false;
	this.avgender = '';
	this.buildlist = new Array();
	this.allowClickClothes = true;
	this.myRoomDefaultOutfit = new Array();
	this.inAvatarPicker = false;
	this.inStore = false;
	this.inStoreDefaultClothing = new Array();
	this.inStoreNotDefaultClothing = new Array();
	this.inStoreDefaultAvatar = false;
	this.originalClothing = new Array();
	this.costumeIsOnAvatar = false;

	this.defaultskintone = new Image();
	this.defaultskintone.id = 'defaultskintone';
	this.defaultskintone.style.position = 'absolute';
	this.defaultskintone.src = '/artmin/items/avatar/skin/default_skintone.png';
	this.defaultskintone.style.visibility = 'hidden';
	this.defaultskintone.style.backgroundColor = 'rgba(255,255,255,0)';
	addListener(this.defaultskintone, 'click', this.avatarClicked);
	div.appendChild(this.defaultskintone);

	this.defaultpants = new Image();
	this.defaultpants.id = 'defaultpants';
	this.defaultpants.style.position = 'absolute';
	this.defaultpants.src = '/artmin/items/avatar/pants/reg_shorts_s92203.png';
	this.defaultpants.style.visibility = 'hidden';
	this.defaultpants.style.backgroundColor = 'rgba(255,255,255,0)';
	addListener(this.defaultpants, 'click', this.avatarClicked);
	div.appendChild(this.defaultpants);

	this.defaultshirt = new Image();
	this.defaultshirt.id = 'defaultshirt';
	this.defaultshirt.style.position = 'absolute';
	this.defaultshirt.src = '/artmin/items/avatar/shirt/reg_crew_neck_shirt_s93506.png';
	this.defaultshirt.style.visibility = 'hidden';
	this.defaultshirt.style.backgroundColor = 'rgba(255,255,255,0)';
	addListener(this.defaultshirt, 'click', this.avatarClicked);
	div.appendChild(this.defaultshirt);


	this.scale = .5;
	this.scalePercent = 0;
	this.roomItem = this;
	this.div.roomItem = this;
	this.div.style.marginLeft = Math.round(-(this.div.offsetWidth -this.div.offsetWidth*this.scale)/2) + 'px';
	this.div.style.marginTop = Math.round(-(this.div.offsetHeight -this.div.offsetHeight*this.scale)/2) + 'px';
	this.div.style.backgroundColor = 'rgba(255,255,255,0)';

	if(items.length == 0){
		this.defaultpants.style.visibility = 'inherit';
		this.defaultshirt.style.visibility = 'inherit';
		this.defaultskintone.style.visibility = 'inherit';
	}

	if(items && items.length > 0) {
		this.partstoload = items.length;
		for(var i=0;i<items.length;i++) {
			var item = new AvatarItem(items[i]);
			item.avobj = this;
			item.tryout = true;
			this.items.push(item);
			addListener(item, 'loaded', this.partLoaded);
		}
		this.arrangeLayers();
	}

	addListener(this.div, 'click', this.avatarClicked);
}

//////////////////////////////////////////////////////////

Avatar.prototype.setScale = function(newscale) {
	if(isFinite(newscale)) {
		var oldscale = this.scale;
		this.scale = newscale;
		this.div.style.webkitTransform = 'scale('+this.scale+')';
		this.div.style.MozTransform = 'scale('+this.scale+')';
		this.div.style.msTransform = 'scale('+this.scale+')';

		//added by MS 2013-04-12, needed for IE8 and browsers that don't support "transform"
		if(nohtml5) {
			var current_layers = this.div.getElementsByTagName("img");

			for(var x=0; x < current_layers.length; x++) {

				if(current_layers[x].width == 0){
					addListener(current_layers[x], "load", function(img) {
						return function() {
							img.width = img.width * newscale;
							img.height = img.height * newscale;
						};
					}(current_layers[x]));
				} else {
					current_layers[x].width = current_layers[x].width * this.scale;
					current_layers[x].height = current_layers[x].height * this.scale;
				}

			}
		}
	}

	this.div.style.marginLeft = Math.round(-(this.div.offsetWidth -this.div.offsetWidth*newscale)/2) + 'px';
	this.div.style.marginTop = Math.round(- (this.div.offsetHeight -this.div.offsetHeight*newscale)/2) + 'px';
}

Avatar.prototype.getSize = function() {
	var maxSize = new Object();
	maxSize.width = 0;
	maxSize.height = 0;
	for(var i=0;i<this.items.length;i++) {
		if(!this.items[i].ready) {
			maxSize = new Object();
			maxSize.width = 0;
			maxSize.Height = 0;
			return maxSize;
		}

		if(maxSize.width < this.items[i].imageWidth) {
			maxSize.width = this.items[i].imageWidth;
		}
		if(maxSize.height < this.items[i].imageHeight) {
			maxSize.height = this.items[i].imageHeight;
		}
	}

	return maxSize;
}


//////////////////////////////////////////////////////////
// Keep the default cloths from the original avatar to put back on when user remove the new cloths in the store. Rl 1/28/2014
Avatar.prototype.saveDefaultOutfits = function(defaultCloth){
	this.inStoreDefaultClothing = defaultCloth;
}
Avatar.prototype.saveNotDefaultOutfits = function(defaultCloth){
	this.inStoreNotDefaultClothing = defaultCloth;
}

Avatar.prototype.saveOriginalOutfits = function(outfit){
	for (var i=0; i<outfit.length; i++)
		this.originalClothing.push(outfit[i]);
}

Avatar.prototype.saveMyRoomOutfits = function(outfit){
	for (var i=0; i<outfit.length; i++)
		this.myRoomDefaultOutfit.push(outfit[i]);
}

//////////////////////////////////////////////////////////
// Get item state
// An original outfit information will be saved in the state.outfitBeforeCostume
// By going through the user inventory and finding out the information of outfitBeforeCostume and return as a list.
Avatar.prototype.getItemState = function(userInventory) {
	var resultList = new Array();
	for (key in userInventory) {
        if (userInventory.hasOwnProperty(key)) {
			for (var i=0; i<userInventory[key].length; i++) {
				if (userInventory[key][i].instances[0].state.outfitBeforeCostume){
					var itemobj = new AvatarItem(userInventory[key][i]);
					resultList.push(itemobj);
				}
			}
		}
    }

	return resultList;
}

//////////////////////////////////////////////////////////
Avatar.prototype.avatarClicked = function(event) {

	var target = getEventTarget(event);

	if (! target.objref) return;
	var obj = target.objref;

	if(obj.allowClickClothes == false) return;
	var pagePos = pagePosition(event);
	var offsets = nodeOffsets(this);
	// var x = mouseXpos/pageScale - offsets.x;
	// var y = mouseYpos/pageScale - offsets.y;
	var x = mouseXpos - offsets.x;
	var y = mouseYpos - offsets.y;

	var marginTop = 2*Math.floor(parseFloat(this.style.marginTop.replace('px','')));
	var marginLeft = 2*Math.floor(parseFloat(this.style.marginLeft.replace('px','')));

	x += marginLeft;
	y += marginTop;

	x /= obj.scale;
	y /= obj.scale;
	// Get the DIV ID when clicking on the avatar in the store.
	// A page number is attached to the ID and use the ID to adjust x position
	var divID = target.id;
	var avatarPageNumber = parseInt(divID.substring(7,8));
	if(avatarPageNumber>0){
		x += avatarPageNumber*300;
	}

	for(var i=obj.buildlist.length-1;i>=0;i--) {
		// For the following if-condition:
		// The following will use this function -> 'AvatarItem.prototype.hitTest = function(x,y)'
		// obj.buildlist[i]: Check and see if the object is available
		// obj.buildlist[i].hitTest: Check and see if the function is available
		// obj.buildlist[i].hitTest(x,y): Run the function 'hitTest'
		if(obj.buildlist[i] && obj.buildlist[i].hitTest && obj.buildlist[i].hitTest(x,y)) {
			//this.changeSinceLastSave = true;
			obj.changeSinceLastSave = true;
			//var hangupItemLayer = obj.buildlist[i].layer;
			obj.hangupItem(obj.buildlist[i]);
			// For in Store avatar check if it is the first(default) avatar, if yes the default cloths will put on if a new cloth remove. RL 1/28/2014
			if(obj.inStore){
				//alert(obj.div.id);
				if (obj.div.id == 'avatar_0') {
					//if(obj.buildlist[i].layer == 800){
					//alert(obj.buildlist[i].layer);
						obj.avatarItemStoreRestoreDefaultCloth();
					//}
				} else {
					//if(obj.buildlist[i].layer == 800){
						obj.avatarItemStoreRestoreNotDefaultCloth();
					//}
				}
			} else if (obj.inAvatarPicker){
				if (obj.buildlist[i].layer == 800){
					//putOnClothesBeforeCostume();
					cancelChanges();
				}
			} else {
				if (obj.buildlist[i].layer == 800){
					for (var j=0; j<obj.inStoreDefaultClothing.length; j++){
						obj.setItem(obj.inStoreDefaultClothing[j]);
					}
				} else {
					for (var j=0; j<obj.inStoreDefaultClothing.length; j++){
						if (obj.inStoreDefaultClothing[j].layer == obj.buildlist[i].layer){
							obj.setItem(obj.inStoreDefaultClothing[j]);
						}
					}
				}
			}
			obj.arrangeLayers();
			obj.save();
			return;
		}
	}
	return;
}

//////////////////////////////////////////////////////////
Avatar.prototype.avatarItemStoreRestoreDefaultCloth = function() {
	for (var j=0; j<this.inStoreDefaultClothing.length; j++){
		this.tryItem(this.inStoreDefaultClothing[j]);
	}
}

Avatar.prototype.avatarItemStoreRestoreNotDefaultCloth = function() {
	for (var j=0; j<this.inStoreNotDefaultClothing.length; j++){
		this.tryItem(this.inStoreNotDefaultClothing[j]);
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.avatarClickAllClothes = function() {
	var av = this;

	for(var i=av.buildlist.length-1;i>=0;i--) {
		if(av.buildlist[i]) {
			av.hangupItem(av.buildlist[i]);
		}
	}

	if(av.autoSave) {
		av.save();
	}

	return;
}

//////////////////////////////////////////////////////////

Avatar.prototype.hitTest = function(xpos, ypos) {
	var marginTop = Math.floor(parseFloat(this.div.style.marginTop.replace('px','')));
	var marginLeft = Math.floor(parseFloat(this.div.style.marginLeft.replace('px','')));
	xpos = xpos - this.div.offsetLeft + marginLeft;
	ypos = ypos - this.div.offsetTop + marginTop;

	ypos /= this.scale;
	xpos /= this.scale;

	for(var i=this.buildlist.length-1;i>=0;i--) {
		if(this.buildlist[i] && this.buildlist[i].hitTest && this.buildlist[i].hitTest(xpos,ypos)) {
			return true;
		}
	}
	return false;
}

//////////////////////////////////////////////////////////
//created by TJ on 8/2/2012, hit test response from flash component
Avatar.prototype.avatarClickedFromFlash = function(event){
	if(clickarea) {
		var av = clickarea.target.objref;
		if(clickarea.target.objref.allowClickClothes==false) return;
		for(var i=av.buildlist.length-1;i>=0;i--) {
			if(av.buildlist[i] && av.buildlist[i].sku == clickarea.returnid) {
				av.hangupItem(av.buildlist[i]);
				if(av.autoSave) {
					av.save();
				}
				return;
			}
		}
	}
}

//////////////////////////////////////////////////////////

Avatar.prototype.partLoaded = function(event) {
	this.avobj.partstoload--;
	if(this.avobj.partstoload <= 0) {
		this.avobj.div.style.visibility = 'inherit';
		this.avobj.arrangeLayers();
	}
}

//////////////////////////////////////////////////////////

Avatar.prototype.getItem = function(objectid, varid) {
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i].onHanger == false) {
			if(this.items[i].objectId == objectid && (varid == undefined || this.items[i].variant == varid)) return this.items[i];
		}
	}
}

//////////////////////////////////////////////////////////

Avatar.prototype.hasItem = function(objectid, varid) {
	return (this.getItem(objectid, varid) != null);
}

//////////////////////////////////////////////////////////

Avatar.prototype.hasLayer = function(layerid) {
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i].layer == layerid)
			return true;
	}
	return false;
}

//////////////////////////////////////////////////////////

Avatar.prototype.save = function(area) {
	if(this.changeSinceLastSave) {
		// Save the new avatar if not in the store
		if(!this.inStore){
			var list = new Array();
			if(area == undefined)
				area = '';
			for(var i=0;i<this.items.length;i++) {
				//if(this.items[i].tryout) return;
				if(this.items[i].onHanger == 1) continue;
				if(this.items[i].remove) continue;
				list.push(this.items[i].sku);
			}

			var data = new Object();
			data.action = 'save2';
			data.area = area;
			data.skus = list.join(',');
			ajax('/xml/avatar.php?&userid='+this.avuserid, data, this.saveDone.bind(this));
			//this.changeSinceLastSave = false;
		}
		return true;
	}
	return false;
}

Avatar.prototype.saveDone = function(data) {
	this.dispatchEvent('avatar_saved');
}

//////////////////////////////////////////////////////////

Avatar.prototype.getChanged = function() { return this.changes; }
Avatar.prototype.setChanged = function(b) { this.changes = b; }

Avatar.prototype.getUserid = function() { return this.avuserid; }
Avatar.prototype.setUserid = function(b) {
	if(b != this.avuserid)
		this.changes = this.changeSinceLastSave = true;
	this.avuserid = b;
}

Avatar.prototype.getShowAccesories = function() { return this.showacc; }
Avatar.prototype.setShowAccesories = function(b) {
	this.showacc = b;
	this.arrangeLayers();
}

Avatar.prototype.getGender = function() { return this.avgender; }
Avatar.prototype.setGender = function(g) {
	this.avgender = g;
	switch(g){
		case 'F':
			this.defaultshirt.src = '/artmin/items/avatar/shirt/girl_crew_tshirt_s98402.png';
			this.defaultpants.src = '/artmin/items/avatar/pants/short_shorts_s95603.png';
			break;
		default:
			this.defaultshirt.src = '/artmin/items/avatar/shirt/reg_crew_neck_shirt_s93506.png';
			this.defaultpants.src = '/artmin/items/avatar/pants/reg_shorts_s92203.png';
			break;
	}
/*
	if(g == 'F') {
		this.defaultshirt.src = '/artmin/items/avatar/shirt/girl_crew_tshirt_s98402.png';
		this.defaultpants.src = '/artmin/items/avatar/pants/short_shorts_s95603.png';
	}
	else {
		this.defaultshirt.src = '/artmin/items/avatar/shirt/reg_crew_neck_shirt_s93506.png';
		this.defaultpants.src = '/artmin/items/avatar/pants/reg_shorts_s92203.png';
	}
*/
}

//////////////////////////////////////////////////////////

// Added to prevent some layer get removed from avatar. RL 12/18/2013
Avatar.prototype.preventItemGetRemove = function(layerID) {
	var counter = 0;
	for(var i=0; i<this.items.length; i++){
		if(this.items[i].layer == layerID)
			counter++;
	}
	if (counter==1){
		for(var i=0; i<this.items.length; i++){
			if(this.items[i].layer == layerID)
				this.items[i].remove = false;
		}
	} else {
		for(var i=0; i<this.items.length; i++){
			if(this.items[i].layer == layerID){
				this.items[i].remove = true;
				return;
			}
		}
	}
}

Avatar.prototype.arrangeLayers = function(latestlayer) {
	if(latestlayer == undefined) latestlayer = 0;
	var haspants = false;
	var hasshirt = false;
	var incostume = false;
	var indress = false;
	var ingown = false;
	var tryoutlayers = new Array();
	var costume = null;
	//var tryArray = new Array();
	this.buildlist = new Array();
	this.fillhair = false;
	this.usehair = false;

	// abort if not all items are loaded
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i].failed)
			this.items[i].remove = true;
		if(!this.items[i].ready && !this.items[i].remove) { return; }
	}

	// prevent item get remove. RL 12/18/2013
	this.preventItemGetRemove(LayerInfo.SKIN);
	this.preventItemGetRemove(LayerInfo.EYES);
	this.preventItemGetRemove(LayerInfo.MOUTH);
	this.preventItemGetRemove(LayerInfo.NOSE);

	// remove unused elements from list
	this.removeItemsFromItemList();
	//if(!this.inStore){
		for(var i=0; i<this.items.length; i++){
			if(this.items[i].onHanger == 1){
				if (this.items[i].pngimg.parentNode)
					this.div.removeChild(this.items[i].pngimg);
				//this.items.splice(i, 1);
				//i--;
			}
		}
	//}
	// check if there are pants and shirt in list
	for(var i=0;i<this.items.length;i++) {
		if(!this.items[i].ready) continue;
		if(this.items[i].onHanger == 1) continue;
		if(this.items[i].isBlank) continue;
		if(this.items[i].remove) continue; //added by TJ on 8/6/2012

		switch(this.items[i].layer){
			case LayerInfo.PANTS:
				haspants = true;
				break;
			case LayerInfo.LEGGINGS:
				haspants = true;
				break;
			case LayerInfo.SHIRT:
				hasshirt = true;
				break;
			case LayerInfo.COSTUME:
				incostume = true;
				costume = this.items[i];
				break;
			case LayerInfo.DRESS:
				indress = true;
				break;
			case LayerInfo.GOWN:
				ingown = true;
				break;
			default:
				break;
		}

		if (this.items[i].specialhair && this.items[i].specialhair > 0 && incostume) {
			if (this.items[i].specialhair == 1) this.fillhair = true;
			else if (this.items[i].specialhair == 2) this.usehair = true;
		}
		if(this.items[i].tryout) tryoutlayers.push(this.items[i].layer);
	}

	if(ingown) indress = incostume = false;
	if(incostume && LayerInfo.blockCostume(latestlayer)) incostume = false;
	if (latestlayer == LayerInfo.HAIR && (this.usehair || this.fillhair))
		incostume = true;
	else if(incostume)
		indress = false;

	if(latestlayer == LayerInfo.SHIRT || latestlayer == LayerInfo.PANTS) indress = false;
	if(ingown || indress || incostume) hasshirt = haspants = true;

	this.defaultpants.style.visibility = haspants ? 'hidden' : 'inherit';
	this.defaultshirt.style.visibility = hasshirt ? 'hidden' : 'inherit';

	// bits o' logic
	this.items.sort(this.sortByLayer);

	for(var i=0;i<this.items.length;i++) {
		var item = this.items[i];
		var anticostume = (item.layer == LayerInfo.HAIR && costume && costume.properties.specialhair == 2) ? false : LayerInfo.blockCostume(item.layer);
		if(item.layer == LayerInfo.SKIN) {
			if(item.skinline && this.skinline != item.skinline) {
				this.setSkinLine(item.skinline);
				return;
			}
		}
		var tryitem = false;
		for(var j=0;j<tryoutlayers.length;j++) {
			if(tryoutlayers[j] == item.layer)
				tryitem = true;
		}

		// costume hides other clothing layers
		if(incostume && anticostume && !item.onHanger) item.onHanger = 1;
		if(!incostume && item.layer == LayerInfo.COSTUME && !item.onHanger)
		item.onHanger = 1;

		// gown hides other clothes except shoes and socks
		if(ingown && LayerInfo.blockGown(item.layer) && !item.onHanger) item.onHanger = 1;

		// dress hides shirt and pants
		if(indress && (item.layer == LayerInfo.SHIRT || item.layer == LayerInfo.PANTS) && !item.onHanger) item.onHanger = 1;

		// final check to restore items put on hangers
		if(item.onHanger == 1) {
			if(item.tryout) {
				if(incostume) {
					if(!anticostume) {
						item.onHanger = 0;
					}
				} else {  // !incostume
					if(!tryitem) {
						if(anticostume) {
							item.onHanger = 0;
						} else {
							if(item.layer != LayerInfo.COSTUME) item.onHanger = 0;
						}
					}
				}
			} else {  // !tryout
				if(tryitem) {
					item.onHanger = 1;
				} else if(ingown) {
					if(LayerInfo.blockGown(item.layer)) item.onHanger = 1;
					else item.onHanger = 0;
				} else if(incostume) {
					if(anticostume) {
						item.onHanger = 1;
					} else {
						item.onHanger = 0;
					}
				} else {  // !incostume
					if(anticostume) {
						if(indress && item.layer == LayerInfo.SHIRT) item.onHanger = 0;
						else if(indress && item.layer == LayerInfo.PANTS) item.onHanger = 1;
						else if(!indress && item.layer == LayerInfo.DRESS) item.onHanger = 1;
						else item.onHanger = 1;
					} else {
						if(item.layer != LayerInfo.COSTUME && item.layer != LayerInfo.PET) item.onHanger = 0;
						if (!incostume || (costume && costume.properties.specialhair == 2) && item.layer == LayerInfo.HAIR) {
							item.onHanger = 0;
						}
					}
				}
			}
		}

		// mutually exclusive layers
		if(item.onHanger == 0) {
			if(latestlayer == LayerInfo.JACKET && item.layer == LayerInfo.SWEATER) item.onHanger = 1;
			else if(latestlayer == LayerInfo.SWEATER && item.layer == LayerInfo.JACKET) item.onHanger = 1;
			else if(latestlayer == LayerInfo.DRESS && item.layer == LayerInfo.SHIRT) item.onHanger = 1;
			else if(latestlayer == LayerInfo.SHIRT && item.layer == LayerInfo.DRESS) item.onHanger = 1;
			else if(latestlayer == LayerInfo.DRESS && item.layer == LayerInfo.PANTS) item.onHanger = 1;
			else if(latestlayer == LayerInfo.PANTS && item.layer == LayerInfo.DRESS) item.onHanger = 1;
		}

		/*SF-3862
		if (item.layer == LayerInfo.HAIR && (!incostume)) {
			item.onHanger = 0;
			this.usehair = true;
			this.changeSinceLastSave = true;
		}*/
/*
		if (item.layer == LayerInfo.SOCKS && (!incostume)) {
			item.onHanger = 0;
			this.changeSinceLastSave = true;
		}

		if (item.layer == LayerInfo.SHOES && (!incostume)) {
			item.onHanger = 0;
			this.changeSinceLastSave = true;
		}
*/

		item.pngimg.style.visibility = (item.onHanger || item.remove) ? 'hidden' : 'inherit'; //modified by TJ on 8/6/2012, item.remove added on the condition

		if (item.layer == LayerInfo.HAIR && this.fillhair && !item.onHanger) {
			item.pngimg.style.visibility = 'hidden';
		}
		if (item.layer == LayerInfo.HAIR && this.usehair && (!item.onHanger || !item.remove)){
			item.pngimg.style.visibility = 'inherit';
			item.pngimg.style.left = (-31*((item.imageWidth-300)%10)) + 'px';
			item.pngimg.style.top = (-31*((item.imageHeight-580)%10)) + 'px';
			this.buildlist.push(item);
		}

		if(item.onHanger || item.remove) continue; //modified by TJ on 8/6/2012, item.remove added on the condition
		if(item.pngimg) {
			item.pngimg.style.left = (-31*((item.imageWidth-300)%10)) + 'px';
			item.pngimg.style.top = (-31*((item.imageHeight-580)%10)) + 'px';

			if(nohtml5) {
				item.pngimg.style.height = (item.imageHeight * this.scale)+'px';
				item.pngimg.style.width = (item.imageWidth * this.scale)+'px';
			} else {
				item.pngimg.style.height = (item.imageHeight)+'px';
				item.pngimg.style.width = (item.imageWidth)+'px';
			}
			if(item.pngimg.style.visibility == 'inherit'){
				this.buildlist.push(item);
			}
		}
		if(!this.showacc && (item.layer == LayerInfo.SCENE || item.layer == LayerInfo.PET)){
			item.pngimg.style.visibility = 'hidden';
		}
		tryitem = null;
		delete tryitem;
	}
	// Clean up variables
	haspants = null;
	delete haspants;
	hasshirt = null;
	delete hasshirt;
	indress = null;
	delete indress;
	ingown = null;
	delete ingown;
	incostume = null;
	delete incostume;
	for(var i=0; i<tryoutlayers.length; i++) {
		tryoutlayers[i] = null;
		tryoutlayers.splice(i, 1);
		delete tryoutlayers[i];
	}
	tryoutlayers = [];
	delete tryoutlayers;

/*
	for(p=0;p< this.buildlist.length;p++){
		tryArray.push(this.buildlist[p].info.objectid);
	}
*/
	//modified by TJ on 8/3/2012, default shirt and pants have fixed width (300) and height (580) with default offset (0,0)
	var added = false;
	if(this.defaultpants.style.visibility == 'inherit' && !nohtml5) {
		this.defaultpants.style.left = '0px';
		this.defaultpants.style.top = '0px';
		this.defaultpants.style.width = (300)+'px';
		this.defaultpants.style.height = (580)+'px';

		for(var i = 0; i < this.buildlist.length; i++) {
			if(this.buildlist[i].layer != undefined && this.buildlist[i].layer >= LayerInfo.PANTS) {
				this.buildlist.splice(i, 0, this.defaultpants);
				added = true;
				break;
			}
		}

		if(added == false)
			this.buildlist.push(this.defaultpants);
	}
	if(this.defaultshirt.style.visibility == 'inherit' && !nohtml5) {
		added = false;
		this.defaultshirt.style.left = '0px';
		this.defaultshirt.style.top = '0px';
		this.defaultshirt.style.width = (300)+'px';
		this.defaultshirt.style.height = (580)+'px';

		for(var i = 0; i < this.buildlist.length; i++) {
			if(this.buildlist[i].layer != undefined && this.buildlist[i].layer >= LayerInfo.SHIRT) {
				this.buildlist.splice(i, 0, this.defaultshirt);
				added = true;
				break;
			}
		}

		if(added == false)
			this.buildlist.push(this.defaultshirt);
	}
	added = null;
	delete added;

	// convert stack of canvas elements into png
	// some browsers have trouble with these canvases
	if(this.buildlist.length) {

		// This block may not being used by anything. commended out on 3/5/2014 - RL
		/*
		var top, left, width, height;
		for(var i=0;i<this.buildlist.length;i++) {
			if(this.buildlist[i].pngimg) {
				var t1 = Math.floor(parseFloat(this.buildlist[i].pngimg.style.top.replace('px','')));
				var l1 = Math.floor(parseFloat(this.buildlist[i].pngimg.style.left.replace('px','')));
				var w1 = Math.ceil(parseFloat(this.buildlist[i].pngimg.style.width.replace('px','')));
				var h1 = Math.ceil(parseFloat(this.buildlist[i].pngimg.style.height.replace('px','')));

				top = (top == undefined) ? t1 : Math.min(top, t1);
				left = (left == undefined) ? l1 : Math.min(left, l1);
				width = (width == undefined) ? w1 : Math.max(width, w1);
				height = (height == undefined) ? h1 : Math.max(height, h1);
			}
		}
		*/
		for(var i=0;i<this.buildlist.length;i++) {
			if(this.buildlist[i].pngimg) {
				this.buildlist[i].pngimg.style.position = 'absolute';
				if((this.buildlist[i].layer < LayerInfo.PANTS) && (this.buildlist[i].type != 'glasses'))
					//This checks if defaultpants exists. Seems to only cause an error in IE. DAG 5.15.14
					if(document.getElementById(this.defaultpants.id)){
						this.div.insertBefore(this.buildlist[i].pngimg, this.defaultpants);
					}else{
						this.div.appendChild(this.buildlist[i].pngimg);
					}
				else
					this.div.appendChild(this.buildlist[i].pngimg);
			} else {
				this.div.appendChild(this.buildlist[i]);
			}
			if(this.showPet == true && this.buildlist[i].layer == LayerInfo.PET){
				this.buildlist[i].pngimg.style.visibility = 'inherit';
				this.div.style.width = item.pngimg.offsetWidth + 'px';
			}

			// The following can only apply to MyRoom when it start. RL 12/27/2013
			// Can also be fixed by just changing the opacity of avatar div in myroom instead of doing this
			if (this.myRoomStart){
				if(this.showAvatar == false && this.buildlist[i].pngimg && (!USINGAPP || MOBILE=='iphone' || MOBILE=='ipad') ){
					this.buildlist[i].pngimg.style.visibility = 'hidden';
					this.div.style.width = item.pngimg.offsetWidth + 'px';
					this.defaultpants.style.visibility = 'hidden';
					this.defaultshirt.style.visibility = 'hidden';
				}
			}
			if (this.buildlist[i].layer == LayerInfo.COSTUME){
				this.costumeIsOnAvatar = true;
			}
		}
		//this.myRoomStart = false;
		this.dispatchEvent('change');
	}
	if (this.removeItemsDirty) { //items removed, run again - this prevents multiple calls
		this.removeItemsDirty = false;
		this.arrangeLayers();
	}

	this.dispatchEvent('arrange_done');
}

//////////////////////////////////////////////////////////
Avatar.prototype.removeItemsFromItemList = function() {
	for(var i=0; i<this.items.length; i++){
		if(this.items[i].remove){
			if (this.items[i].pngimg.parentNode)
				this.div.removeChild(this.items[i].pngimg);
			this.items.splice(i, 1);
			i--;
		}
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.drawCanvas = function(ctx, xpos, ypos) {
	// Loop through the buildlist image to look for the minimum left and minimum top
	var t1, l1, w1, h1, top, left;
	for(var i=0;i<this.buildlist.length;i++) {
		if(this.buildlist[i].pngimg) {
			t1 = Math.floor(this.scale*parseFloat(this.buildlist[i].pngimg.style.top.replace('px','')));
			l1 = Math.floor(this.scale*parseFloat(this.buildlist[i].pngimg.style.left.replace('px','')));

			top = (top == undefined) ? t1 : Math.min(top, t1);
			left = (left == undefined) ? l1 : Math.min(left, l1);
		}
	}

	for(var i=0;i<this.buildlist.length;i++) {
		if(this.buildlist[i].pngimg) {
			t1 = Math.floor(this.scale*parseFloat(this.buildlist[i].pngimg.style.top.replace('px','')));
			l1 = Math.floor(this.scale*parseFloat(this.buildlist[i].pngimg.style.left.replace('px','')));
			w1 = Math.ceil(this.scale*parseFloat(this.buildlist[i].pngimg.style.width.replace('px','')));
			h1 = Math.ceil(this.scale*parseFloat(this.buildlist[i].pngimg.style.height.replace('px','')));
			ctx.drawImage(this.buildlist[i].pngimg, xpos + l1-left, ypos + t1-top, w1, h1);
		}

		else if((this.defaultshirt.style.visibility == 'inherit' && this.buildlist[i] == this.defaultshirt) ||
				(this.defaultpants.style.visibility == 'inherit' && this.buildlist[i] == this.defaultpants)) {
			t1 = Math.floor(this.scale*parseFloat(this.buildlist[i].style.top.replace('px','')));
			l1 = Math.floor(this.scale*parseFloat(this.buildlist[i].style.left.replace('px','')));
			w1 = Math.ceil(this.scale*parseFloat(this.buildlist[i].style.width.replace('px','')));
			h1 = Math.ceil(this.scale*parseFloat(this.buildlist[i].style.height.replace('px','')));
			ctx.drawImage(this.buildlist[i], xpos + l1-left, ypos + t1-top, w1, h1);
		}
	}
	t1 = null;
	delete t1;
	l1 = null;
	delete l1;
	w1 = null;
	delete w1;
	h1 = null;
	delete h1;
	top = null;
	delete top;
	left = null;
	delete left;
}

//////////////////////////////////////////////////////////

Avatar.prototype.sortByLayer = function(a, b) {
	return (a.layer - b.layer);
}

//////////////////////////////////////////////////////////
Avatar.prototype.hangupAllItems = function(){
	var item;
	for (var i=0; i<this.items.length; i++){
		item = this.items[i];
		this.hangupItem(item);
	}
	if(this.autoSave) {
		this.save();
	}
	item = null;
	delete item;
	this.dispatchEvent('hangupFinished');
}

//////////////////////////////////////////////////////////
Avatar.prototype.hangup = function(layerid) {
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i].layer == layerid) {
			if(this.items[i].tryout) {
				this.items[i].remove = true;
			}
			if(this.items[i].onHanger == 0 && !this.items[i].tryout) this.items[i].onHanger = 1;
		}
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.hangupThis = function(e) {
	if(this.initializing)
		this.removeItem(e.currentTarget);
	else
		this.hangupItem(e.currentTarget);

	if(this.autoSave && e.currentTarget.tryout) {
		this.save();
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.hangupItem = function(item) {
	if(!this.showacc && (item.layer == LayerInfo.SCENE)) return;
	if(LayerInfo.canRemove(item.layer)) {
		if(item.tryout)
			item.remove = true;
		item.onHanger = 1;
		// If is in the Avatar Builder, whenever user click on the avatar to remove cloth, also need to update the avatarpicker. RL 1/21/2014
		//if(currentHash == 'abc/avatarpicker'){
		if(this.inAvatarPicker){
			removeClothing(item);
		}
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.getItemOnLayer = function(layerid, temponly) {
	if(temponly == undefined)
		temponly = false;
	var item;
	for(var i=0;i<this.items.length;i++) {
		item = this.items[i];
		if(item.layer == layerid && (!temponly || item.tryout)) {
			return item;
		}
	}
	item = null;
	delete item;
}

//////////////////////////////////////////////////////////
Avatar.prototype.removeAllLayer = function() {
	var item;
	for (var i=0; i<this.items.length; i++){
		item = this.items[i];
		if(LayerInfo.canRemove(item.layer))
			this.removeItem(item);
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.removeItem = function(item) {
	item.remove = true;
	this.changeSinceLastSave = true;
	this.removeItemsDirty = true;
}

//////////////////////////////////////////////////////////
Avatar.prototype.removeLayer = function(layerid, temponly) {
	if(temponly == undefined)
		temponly = false;
	var item;
	for(var i=0;i<this.items.length;i++) {
		item = this.items[i];
		if(item.layer == layerid && (!temponly || item.tryout)) {
			item.remove = true;
		}
		if(item.layer == 0)
			item.remove = true;
	}
	item = null;
	delete item;
	return;
}

//////////////////////////////////////////////////////////
Avatar.prototype.tryItem = function(newitem) {

	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].onHanger && this.items[i].sku == newitem.sku) {
			this.items[i].onHanger = false;
			this.arrangeLayers();
			this.unTryItem(this.items[i].layer);
			return true;
		}
	}

	newitem.tryout = true;
	this.addItem(newitem,false);
	return false;

}

//////////////////////////////////////////////////////////
Avatar.prototype.untrythis = function(e) {
	this.unTryItem(e.currentTarget.layer);
}

//////////////////////////////////////////////////////////
Avatar.prototype.boughtItem = function(sku) {
	var item;
	for(var i=0;i<this.items.length;i++) {
		item = this.items[i];
		if(item.sku == sku && item.tryout) {
			item.tryout = true;
			this.changes = this.changeSinceLastSave = true;
			for(var j=0;j<this.items.length;j++) {
				if(item.layer == this.items[j].layer && item != this.items[j]) {
					this.items[j].remove = true;
				}
			}
			if(this.autoSave) {
				this.save();
			}
			return item.info;
		}
	}
	item = null;
	delete item;
	return;
}

//////////////////////////////////////////////////////////
Avatar.prototype.unTryItem = function(layerid) {
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].tryout && this.items[i].layer == layerid) {
			this.items[i].remove = true;
		}
	}
	this.arrangeLayers();
}

//////////////////////////////////////////////////////////
Avatar.prototype.getCartList = function() {

	var list = new Array();

	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].tryout && !this.items[i].remove &&this.items[i].info.canbuy) {
			list.push(this.items[i].info);
		}

	}
	return list;
}

//////////////////////////////////////////////////////////
Avatar.prototype.getTryList = function() {

	var list = new Array();

	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].tryout && !this.items[i].remove &&this.items[i].info.canbuy) {
			list.push(this.items[i].info);
		}
	}
	return list;
}

//////////////////////////////////////////////////////////
Avatar.prototype.getFullItemList = function() {

	var list = new Array();
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].tryout) {
			list.push(this.items[i]);
		}
	}
	return list;
}

//////////////////////////////////////////////////////////
Avatar.prototype.getItemList = function() {

	var list = new Array();
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].tryout) {
			list.push(this.items[i].info);
		}
	}
	return list;
}

//////////////////////////////////////////////////////////
Avatar.prototype.getRemoveList = function() {
	var list = new Array();
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && (this.items[i].remove && this.items[i].tryout)) {
			list.push(this.items[i].info);
		}
	}
	return list;
}

//////////////////////////////////////////////////////////
Avatar.prototype.getHungList = function() {

	var list = new Array();
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].onHanger && (!this.items[i].remove && !this.items[i].tryout) ) {
			list.push(this.items[i]);
		}
	}
	return list;
}

//////////////////////////////////////////////////////////
Avatar.prototype.removeTempItems = function() {
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i]) {
			if(this.items[i].tryout) {
				this.items[i].remove = true;
			} else {
				if(this.items[i].onHanger == 1)
					this.items[i].onHanger = 0;
			}
		}
	}

	this.arrangeLayers();
	if(this.autoSave) {
		this.save();
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.setItemOnly = function(item) {
//	if(!dontRemoveItemsOnClick)
//		item.addEventListener(SiteItem.CLICK, hangupThis);
	this.changes = this.changeSinceLastSave = true;
	this.addItem(item);
	return this.getItemList();
}

//////////////////////////////////////////////////////////
Avatar.prototype.setItem = function(item) {
//	if(!dontRemoveItemsOnClick)
//		item.addEventListener(SiteItem.CLICK, hangupThis);
	this.changes = this.changeSinceLastSave = true;

	// Check if there is any layer conflict, if yes, take off the old layer.
	// This also prevent duplicate layer of the same item
	switch(item.layer){
		case LayerInfo.SCENE:
			this.removeLayer(LayerInfo.SCENE);
			break;
		case LayerInfo.SKIN:
			this.removeLayer(LayerInfo.SKIN);
			break;
		case LayerInfo.EYES:
			this.removeLayer(LayerInfo.EYES);
			break;
		case LayerInfo.MOUTH:
			this.removeLayer(LayerInfo.MOUTH);
			break;
		case LayerInfo.NOSE:
			this.removeLayer(LayerInfo.NOSE);
			break;
		case LayerInfo.SWEATER:
			this.removeLayer(LayerInfo.JACKET);
			this.removeLayer(LayerInfo.SWEATER);
			this.removeLayer(LayerInfo.COSTUME);
			break;
		case LayerInfo.JACKET:
			this.removeLayer(LayerInfo.JACKET);
			this.removeLayer(LayerInfo.SWEATER);
			this.removeLayer(LayerInfo.COSTUME);
			break;
		case LayerInfo.PANTS:
			this.removeLayer(LayerInfo.PANTS);
			this.removeLayer(LayerInfo.DRESS);
			this.removeLayer(LayerInfo.COSTUME);
			break;
		case LayerInfo.SHIRT:
			this.removeLayer(LayerInfo.SHIRT);
			this.removeLayer(LayerInfo.DRESS);
			this.removeLayer(LayerInfo.COSTUME);
			break;
		case LayerInfo.DRESS:
			this.removeLayer(LayerInfo.DRESS);
			this.removeLayer(LayerInfo.SHIRT);
			this.removeLayer(LayerInfo.PANTS);
			this.removeLayer(LayerInfo.COSTUME);
			break;
		case LayerInfo.GLASSES:
			this.removeLayer(LayerInfo.GLASSES);
			break;
		case LayerInfo.LEGGINGS:
			this.removeLayer(LayerInfo.LEGGINGS);
			break;
		case LayerInfo.SOCKS:
			this.removeLayer(LayerInfo.SOCKS);
			break;
		case LayerInfo.SHOES:
			this.removeLayer(LayerInfo.SHOES);
			break;
		case LayerInfo.COSTUME:
			this.removeLayer(LayerInfo.DRESS);
			this.removeLayer(LayerInfo.SHIRT);
			this.removeLayer(LayerInfo.PANTS);
			this.removeLayer(LayerInfo.JACKET);
			this.removeLayer(LayerInfo.SWEATER);
			this.removeLayer(LayerInfo.COSTUME);
			this.removeLayer(LayerInfo.GLASSES);
			this.removeLayer(LayerInfo.LEGGINGS);
			//this.removeLayer(LayerInfo.SOCKS);
			//this.removeLayer(LayerInfo.SHOES);
			break;
		case LayerInfo.PET:
			this.removeLayer(LayerInfo.PET);
			break;
		default:
			break;
	}

	//this.removeLayer(item.layer);
	this.addItem(item);
	return this.getItemList();
}

//////////////////////////////////////////////////////////
Avatar.prototype.setVariant = function(objid, varid) {
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].objectId == objid) {
			this.items[i].variant = varid;
		}
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.addItem = function(item, savenow) {

	//if(item == null || !item.ready || item.layer == 0 || isNaN(item.layer)) return false;
	if(savenow == undefined) savenow = true;
	if(item.isBlank) {
		//this.removeLayer(item.layer);
	} else if(!item.tryout) {
		this.removeLayer(item.layer);
		if(LayerInfo.blockCostume(item.layer)){
			if(!(item.layer == LayerInfo.HAIR && (this.usehair || this.fillhair))){
				this.removeLayer(LayerInfo.COSTUME);
			}
		}
		switch(item.layer){
			case LayerInfo.SWEATER:
				this.removeLayer(LayerInfo.JACKET);
				break;
			case LayerInfo.JACKET:
				this.removeLayer(LayerInfo.SWEATER);
				break;
			case LayerInfo.SHIRT:
				this.removeLayer(LayerInfo.DRESS);
				break;
			case LayerInfo.DRESS:
				this.removeLayer(LayerInfo.SHIRT);
				this.removeLayer(LayerInfo.PANTS);
				break;
			default:
				break;
		}
	} else {
		//this.removeLayer(item.layer, true);
		this.hangup(item.layer);
		if(LayerInfo.blockCostume(item.layer)){
			if(!(item.layer == LayerInfo.HAIR && (this.usehair || this.fillhair))){
				this.hangup(LayerInfo.COSTUME);
			}
		}
		switch(item.layer){
			case LayerInfo.SWEATER:
				this.removeLayer(LayerInfo.JACKET);
				break;
			case LayerInfo.JACKET:
				this.removeLayer(LayerInfo.SWEATER);
				break;
			case LayerInfo.SHIRT:
				this.removeLayer(LayerInfo.DRESS);
				break;
			case LayerInfo.DRESS:
				this.removeLayer(LayerInfo.SHIRT);
				this.removeLayer(LayerInfo.PANTS);
				break;
			case LayerInfo.COSTUME:
				this.removeLayer(LayerInfo.DRESS);
				this.removeLayer(LayerInfo.SHIRT);
				this.removeLayer(LayerInfo.PANTS);
				this.removeLayer(LayerInfo.JACKET);
				this.removeLayer(LayerInfo.SWEATER);
				this.removeLayer(LayerInfo.COSTUME);
				this.removeLayer(LayerInfo.GLASSES);
				this.removeLayer(LayerInfo.LEGGINGS);
				break;
			default:
				break;
		}
	}

	//added by TJ on 8/6/2012
	//if(nohtml5)
	//{
		//check if the item is loaded already, if not, load it
		var found = false;
		for(var i = 0; i < this.items.length; i++) {
			//RL 12/27/2013
			//Using "savenow" to check if the user is in the store or inside "MyAvatar".
			//If inside store it will not save and not allow take off cloth by click on the item, only allow take off by click on avatar.
			//If inside "MyAvatar" allow click on avatar or the inventory to remove cloths
			if ((this.items[i].sku == item.sku) && savenow) {
				this.items[i].remove = true;
				this.items[i].onHanger = 0;
				this.items[i].tryout = true;
				found = true;
			}
			/*
			//remove any same type hung item
			else if(this.items[i].type == item.type)
			{
				this.items[i].remove = true;
				this.items[i].onHanger = 0;
			}
			*/
		}

		if(found) {
			item.remove = false;
			item.onHanger = 0;
			//this.arrangeLayers();
		} else {
			itemobj = new AvatarItem(item);
			item.tryout = true;
			itemobj.tryout = item.tryout;
			itemobj.avobj = this;
			this.items.push(itemobj);

			//Added by MS 2013-04-12, needed for IE8 the "loaded" event was firing before we could add the listener
			if(itemobj.ready) {
				this.itemLoaded.call(itemobj);
			} else {
				addListener(itemobj, 'loaded', this.itemLoaded);
			}
		}
		found = null;
		delete found;
/*
		var info = new Object();
		if(item.info)
			info = item.info;
		else
			info = item;
*/
		//if(clickarea) clickarea.addImage(info);

	if(savenow && this.autoSave) {
		this.save();
	}

	return true;
}

Avatar.prototype.itemLoaded = function(event) {
	this.ready = true;
	this.avobj.arrangeLayers(this.layer);
}

//////////////////////////////////////////////////////////

Avatar.prototype.getSkinLine = function() { return this.skinline; }

Avatar.prototype.setSkinLine = function(c) {
	this.skinline = c;
	for(var i=0;i<this.items.length;i++){
		if(this.items[i].type == 'nose' || this.items[i].type == 'mouth')
			this.items[i].setOutline(this.skinline);
	}
}

//////////////////////////////////////////////////////////

Avatar.prototype.getSkinTone = function() { return this.skintone; }

Avatar.prototype.setSkinTone = function(c) {
	this.skintone = c;
	for(var i=0;i<this.items.length;i++)
		if(this.items[i])
			this.items[i].setSkintone(this.skintone);
}

//////////////////////////////////////////////////////////
Avatar.prototype.setPremades = function(premadelist){

	this.avatarBusy = true;
	if(premadelist == undefined)
		return;
	for(var j=0;j<this.items.length;j++){
		this.items[j].remove = true;
	}
	this.removeItemsFromItemList();
	this.items = [];
	if(premadelist && premadelist.length > 0) {
		this.partstoload = premadelist.length;
		var item;
		for(var i=0; i<premadelist.length; i++) {
			item = new AvatarItem(premadelist[i]);
			item.avobj = this;
			item.tryout = true;
			this.items.push(item);

			//Added by MS 2013-04-12, needed for IE8 the "loaded" event was firing before we could add the listener
			if(item.ready) {
				this.partLoaded.call(item);
			} else {
				addListener(item, 'loaded', this.partLoaded);
			}
		}
		this.arrangeLayers();
	}
	if(this.items.length == 0){
		this.defaultpants.style.visibility = 'inherit';
		this.defaultshirt.style.visibility = 'inherit';
		this.defaultskintone.style.visibility = 'inherit';
	}

}

// [Caigoy,101315,SF-8888] hide or show pet image
Avatar.prototype.setPetDisplay = function (bool) {
	var petImg = [].filter.call(document.querySelectorAll('#tm_avatar img'), function (a) {
			return /\/pets\//gi.test(a.src);
		})[0],
		bool = !!bool;
	if (!!petImg) petImg.style.display = bool ? 'inherit' : 'none';
	return bool;
};

//////////////////////////////////////////////////////////

enableEventHandling(Avatar);

////////////////////////////////////////////////////////////////////////////
/* 
	6/4/1213 
	Site Wide Timer
 */

var TIMER_CANVAS;

var TIMER_CANVAS_TIME		=	0;


function CHANGE_TIMER_CANVAS (value) {
	//canvas.setGlobalAlpha(value);
	TIMER_CANVAS.createRadialGradient(20, 20, 5, 20, 20, 24);
	TIMER_CANVAS.addColorStop(0, '#fff38c');
	TIMER_CANVAS.addColorStop(1, '#ff9600');
	TIMER_CANVAS.addGradient();
	TIMER_CANVAS.beginPath();
	TIMER_CANVAS.arc({ color: 'rgba(232, 15, 0, 1)', lineWidth:2}, 20, 20, 14, TIMER_CANVAS.convertToRadians(0), TIMER_CANVAS.convertToRadians(360));
	TIMER_CANVAS.fill();
	TIMER_CANVAS.stroke();
	TIMER_CANVAS.closePath();
	TIMER_CANVAS.beginPath();
	TIMER_CANVAS.moveTo({x:20, y:20});
	var info					=	TIMER_CANVAS_RETURN_HAND_POS(value, 20, 20);

	//canvas.addLine({x:200, y: 85}, {color: 'rgba(232, 15, 0, 1)', lineCap: 'round'});
	TIMER_CANVAS.addLine({x: info.x, y: info.y}, {color: 'rgba(232, 15, 0, 1)', lineCap: 'round', lineWidth:1});
	TIMER_CANVAS.stroke();
	TIMER_CANVAS.closePath();
}
		//need a function to calculate the time

function TIMER_CANVAS_RETURN_HAND_POS (time, x0, y0) {
	var info					=	new Object();
	var degrees					=	time * 6;
	var radians					=	(((degrees - 90) * Math.PI)/ 180);
		info.x					=	x0 + (12 * Math.cos(radians));
		info.y					=	y0 + (12 * Math.sin(radians));
	return info;
}
 
function TIMER (userid, timers, location)
	{
		this.userid							=	userid;
		this.timers							=	eval("(" + timers + ")");
		this.locations						=	eval("(" + location + ")");
		
		if(typeof TIMER_INSTANCE === 'object'){ //singleton object to handle timeouts
			TIMER_INSTANCE.userid		= this.userid;
			TIMER_INSTANCE.timers		= this.timers;
			TIMER_INSTANCE.locations	= this.locations;
		
			return TIMER_INSTANCE;
		}

		var obj								=	this;
		obj.update_timers(true);
		this.interval						=	setInterval(function(){
			obj.update_timers();
		}, 60000);
		this.opentimers						=	new Array();

		this.mobile							=	MOBILE;
		TIMER_INSTANCE = this;	
	}
TIMER.prototype.update_canvas				=	function(minutes){
	var hand				=	60 - minutes;
	
	if(hand >= 0) {
		CHANGE_TIMER_CANVAS(hand);
		var deg = Math.round((hand / 60) * 360);
		if(!isAndroid && !isUnity){
			if(APP_VERSION == 1.981){
				appCall('mml:#shell_site_timer.rotation='+deg);
			}
		}
	}
}
TIMER.prototype.update_timers				=	function(timespent){
	var TIMER_COOKIE_KEY = 'site_timer_check_stamp';
	var lastCheck = getCookie(TIMER_COOKIE_KEY);
	var now = Date.now();
	setCookie(TIMER_COOKIE_KEY, now, '/');

	if(timespent){
		//for legacy, if timespent is true, we do not increment
		timespent = 0;
	}else if(!isNaN(lastCheck) && !timespent){
		//otherwise, we use the time from the last check
		timespent = Math.round((now-lastCheck)/1000); //ms to s
	}
	var send	= new Object();
	send.userid	= this.userid;
	send.timespent	= timespent;
	send.locations	= this.serialize(this.locations, '|');
	send.action	= 'update_timers';

	ajax("/html5/xml/siteprefs.php", send, this.handle_timers, this);
}
TIMER.prototype.handle_timers							= 	function(data, objref){
	var show_clock	=	false;
	if(data && !isUnity) {
		for(var j in data) {
			if(data[j].timer_obj && data[j].timer_obj.type != 'site_timer_range') {
				if(j == 'site_timer') objref.update_canvas(data[j].timeleft);
				
				if(data[j].timeup) {
					var send				=	new Object();
						send.elapsed		=	data[j].elapsed;
						send.timeup			=	data[j].timeup;
						send.type			=	data[j].timer_obj.type;
						send.mstid			=	data[j].timer_obj.mstid;
						send.timestarted	=	data[j].timer_obj.startrange;
						send.extended		=	data[j].timer_obj.extended;
						send.timeendrange	=	data[j].timer_obj.endrange;
						send.timelimit		=	data[j].timer_obj.timelimit;
						send.timeleft		=	data[j].timeleft;
						send.locations		=	objref.locations;
					var sendinfo			=	objref.serialize(send);	
					var type				=	'timer_' + data[j].timer_obj.type;
					
					if(!document.getElementById(type)) {
						
						for(var k in objref.opentimers) {
							if(objref.opentimers[k] == type) return;
						}
						
						
						objref.addOpenTimer(type);
						showPopup('timer.php?' + sendinfo, type);
					}
				}
				
				if(j == 'site_timer'){
					var hand				=	60 - data[j].timeleft;
		
					if(hand >= 0) {
						show_clock					=	true;
					}
				}else{
					show_clock					=	true;
				}
				
			} else if(data[j].timer_obj && data[j].timer_obj.type == 'site_timer_range') {
				if(data[j].timeup) {	
					var send						=	new Object();
						send.elapsed				=	data[j].elapsed;
						send.timeup					=	data[j].timeup;
						send.type					=	data[j].timer_obj.type;
						send.mstid					=	data[j].timer_obj.mstid;
						send.extended				=	data[j].timer_obj.extended;
						send.timestarted			=	data[j].timer_obj.startrange;
						send.timeendrange			=	data[j].timer_obj.endrange;
						send.extendedtimeendrange	=	data[j].timer_obj.extended_endrange;
						send.timeleft				=	data[j].timeleft;
						send.action					=	'range';
					var sendinfo					=	objref.serialize(send);	
					var type						=	'timer_' + data[j].timer_obj.type;
					if(!document.getElementById(type)) {
						
						for(var k in objref.opentimers) 
							if(objref.opentimers[k] == type) return;
						
						objref.addOpenTimer(type);
						showPopup('timer.php?' + sendinfo, type);
					}
				}
			}
		}
	}
	
	if(!show_clock) {
		document.getElementById('timer_settings_canvas').style.visibility	=	'hidden';
		if(!isAndroid && !isUnity){
			if(APP_VERSION == 1.981){
				appCall('mml:#shell_site_timer.hidden=1');
			}
		}
	} else {
		document.getElementById('timer_settings_canvas').style.visibility	=	'visible';
		if(!isAndroid && !isUnity){
			if(APP_VERSION == 1.981){
				appCall('mml:#shell_site_timer.hidden=0');
			}
		}
	}
}
TIMER.prototype.removeOpenTimer							=	function(value){
	var value	=	'timer_' + value;
	for(var i = 0; i < this.opentimers.length; i++) {
		if(this.opentimers[i] == value) this.opentimers.splice(i, 1);
	}
	return this.opentimers;
}
TIMER.prototype.addOpenTimer							=	function(value){
	this.opentimers.push(value);
	return this.opentimers;
}
TIMER.prototype.serialize							= 	function(object, seperator){
		var string							= '';
		var stringVars						= new Array();
		if(object && typeof object	== 'object')
			{
				for(var j in object) 
					if(object[j] && typeof object[j] != 'function' || object[j] == 0 && typeof object[j] != 'function') 
						{
							stringVars.push(j + '=' + object[j]);
						}
				if(seperator)
					string					= stringVars.join(seperator);
				else
					string					= stringVars.join("&");
			}
		return string;
	}	
	
	
enableEventHandling(TIMER);

////////////////////////////////////////////////////////////////////////////
/* IMAGE MANAGER */
function imageManager(parent, baseURL){
	this.parent = parent;
	var debug = this.parent.debug;
	this.debug = debug;
	this.baseURL = baseURL;
	this.stack = new Array();
	this.preloads = new Array();
	this.status = 'idle';
	this.imagesLoaded = 0;
	this.imagesLeftToLoad = 0;
	if(debug){
		this.log = this.parent.log;
		this.parent.addLog('IMAGE Manager Ready');
	}
}

imageManager.prototype.clear = function(){
	this.stack = null;
	this.stack = new Array();
}

imageManager.prototype.processImages = function(objid){
	var objref = this;
	
	if(this.debug){ this.parent.addLog('Processing Images For animation ['+objid+']'); }
	
	var animation = this.parent.stack[objid];
	var animationImages = animation.images;

	var i = 0;
	for(var imageURL in animationImages){
		if(imageURL!='indexOf'){
			var obj = new Image();
			animationImages[imageURL] = obj;
			
			addListener(obj,'load',function(e){
				animation.imagesLeftToLoad--;
				if(animation.imagesLeftToLoad == 0){
					if(objref.debug){
						objref.parent.addLog('Finished Preloading Images.');
					}
					objref.parent.stack[objid].images = null;
					objref.parent.dispatch(objid, 'IMAGES LOADED');
					objref.parent.buildPlayer(objid);
				}
			});
			obj.src = imageURL;
			i++;
		}		
	}
	if(i == 0){
		if(objref.debug){
			objref.parent.addLog('No images to preload.');
		}
		this.parent.stack[objid].images = null;
		this.parent.dispatch(objid, 'IMAGES LOADED');
		this.parent.buildPlayer(objid);
		return;
	}
}

imageManager.prototype.processPreloadImages = function(obj){
	var objref = this;
	
	if(this.debug){ this.parent.addLog('Processing Preload Images For animation ['+obj.animationid+']'); }
	
	var animation = obj;
	var animationImages = animation.images;
	var i = 0;
	for(var imageURL in animationImages){
		if(imageURL!='indexOf'){

			var obj = new Image();
			this.preloads.push(obj);
			with(obj.style)
			{
				position = 'absolute';
				left = '0px';
				top = '0px';
				width = '1px';
				height = '1px';
			}
			
			
			animationImages[imageURL] = obj;
			addListener(obj,'load',function(e){
				var _target = getEventTarget(e);
				
				animation.imagesLeftToLoad--;
				if(animation.imagesLeftToLoad == 0){
					if(objref.debug){
						objref.parent.addLog('Finished Preloading Images');
					}
					objref.parent.dispatch(null,'IMAGES PRELOADED', {animationid:animation.animationid});
					animation.images = null;
					animation = null;
				}
			});
			obj.src = imageURL;
			document.body.appendChild(obj);
		} 	
		i++;
	}
	if(i == 0){
		if(objref.debug){
			objref.parent.addLog('No images to preload.');
		}
			objref.parent.dispatch(null,'IMAGES PRELOADED', {animationid:animation.animationid})
			animation = null;
		return;
	}
}

// No listeners for this portion of Code either  - MG 03/04/14
// ASSET ONLY LOADING
imageManager.prototype.addImageAlone = function(URL){
	var stack = this.stack;
	var imagesLeftToLoad = this.imagesLeftToLoad;
	if(stack[this.baseURL+URL] === void 0){
		stack[this.baseURL+URL] = new Object();
		stack[this.baseURL+URL].ready = false;
		this.imagesLeftToLoad++;
	}
}
imageManager.prototype.processSoloAssets = function(){
	var stack = this.stack;
	var objref = this;
	for(var index in stack){
		var imageInStack = stack[index];
		var obj = new Image();
			
		imageInStack.obj = obj;
		addListener(obj,'load',function(e){
				objref.imageReady(this);
		});
		addListener(obj,'error',function(e){
			if(objref.debug){
				objref.parent.addLog('Tell Corey Rosamond to implement support for missing images');
			}
		});
		obj.src = index;
	}
}
imageManager.prototype.imageReady = function(obj){
	var stack = this.stack;
	var parent = this.parent;
	
	stack[obj.src].ready = true;
	this.imagesLoaded++;
	this.imagesLeftToLoad--;
	if(this.imagesLeftToLoad == 0){
		parent.dispatch(null,'ASSET ONLY LOAD COMPLETE');
	}
}

////////////////////////////////////////////////////////////////////////////
/* JSON MANAGER */
function jsonManager(parent, baseURL){
	this.parent = parent;
	var debug = this.parent.debug;
	this.baseURL = baseURL;
	this.animationStack = this.parent.stack;
	this.mode = this.parent.mode;
	
	if(debug){
		this.debug = this.parent.debug;
		this.log = this.parent.log;
		this.parent.addLog('JSON Manager Ready');
	}
}

jsonManager.prototype.clear = function(){
}

// Request the json and add the index
jsonManager.prototype.addJson = function(id, objid){
	var objref = this;
	
	if(this.mode == 'tool' || this.mode == 'preview'){ 
		if(!id) return; //added by TJ on 4/3/2014
		var URL  = this.baseURL+'animation_ajax.php?action=preview&id='+id;
	} else {
		if(!id || !this.parent.assetPath(id)) return; //added by TJ on 4/3/2014
		
		var URL = this.baseURL+this.parent.assetPath(id)+'animation_'+id+'.json';
	}
	
	ajax(URL, null, function(data) { objref.appendJson(data, objid); },this);
}

// Add the json
jsonManager.prototype.appendJson = function(data, objid){
	var animation = this.parent.stack[objid];
	if(typeof data == 'string'){ var data =JSON.parse(data); }
	animation.data = data.json;
	
	this.parent.buildImageList(objid);
}

//preload json
jsonManager.prototype.preloadJson = function(id, obj){
	var objref = this;
	
	if(this.mode == 'tool' || this.mode == 'preview'){ 
		if(!id) return; //added by TJ on 4/3/2014
		var URL  = this.baseURL+'animation_ajax.php?action=preview&id='+id;
	} else {
		if(!id || !this.parent.assetPath(id)) return; //added by TJ on 4/3/2014
		var URL = this.baseURL+this.parent.assetPath(id)+'animation_'+id+'.json';
	}
	ajax(URL, null, function(data) { objref.appendPreloadJson(data, obj); },this);
}

jsonManager.prototype.appendPreloadJson = function(data, obj){
	var animation = obj;
	if(typeof data == 'string'){ var data =JSON.parse(data); }
	animation.data = data.json;
	
	this.parent.buildPreloadImageList(animation);
}

// PREVIEW CODE
jsonManager.prototype.loadPreview = function(id){
	var objref = this;
	var baseURL  = 'animation_ajax.php?action=preview&id='+id;
	ajax(baseURL, null, function(data, index) { objref.appendPreviewJson(data,id); },this);
}

jsonManager.prototype.appendPreviewJson = function(data, id){
	if(typeof data == 'string'){ var data =JSON.parse(data); }
	this.stack[id] = data.json;
	this.parent.stack[id][0].data = data.json;
	this.parent.stack[id][0].images = new Array();
	this.parent.buildImageList(id, 0);
}
////////////////////////////////////////////////////////////////////////////
/**
 * GameTracker records activity data and invokes TicketMachine
 * @param {integer} cid          Activity ID
 * @param {integer} gameid       ID for current playthrough
 * @param {string}  instance     An image path (sometimes)
 * @param {integer} level        Activity difficulty
 * @param {string}  instanceName Used by tracking/analytics
 * @param {integer} groupid      Group CID (Number after comma in CID URL param)
 * @param {object}  options      Sidepanel options for TicketMachine (not used)
 * @param {string}  gotoURL      Override Continue Btn URL
 */
function GameTracker(cid, gameid, instance, level, instanceName, groupid, options, gotoURL) {
    'use strict';

    /* TOGGLE LOGGING */
    this.debug = /\.test\.|\.qtest\.|local\./.test(location.href) || 0;

    /* constructor args */
    this.cid               = cid          || 0;                                   // StartActivity:$arg_activity_id
    //*** watch for issues here, any unforeseen consequences of conflating this.gameid with this.game_result_id
    this.game_result_id    = gameid ? parseInt(gameid) : 0;                       // EndActivity:$arg_log_id, CancelActivity:$arg_game_result_id
    this.gameid            = this.game_result_id;
    this.instance          = instance ? instance.replace(WEBHOST + "/", "") : ''; // StartActivity:$arg_instance
    this.level             = level        || '';                                  // StartActivity:$arg_activity_level
    this.instanceName      = instanceName || null;                                // StartActivity:$arg_activity_name
    this.groupid           = groupid      || (function(){                         // EndActivity:$arg_group_id
        var gid = location.search.match(/cid=\d+?,(\d+)/); /* if unspecified, parse url */
        if (gid && gid.length > 1) return parseInt(gid[1]);
        return 0;
    })();
    this.sidepanel_options = options      || 0; /* not used */
    this.goToUrl           = gotoURL      || null; /* overrides tm continue */

    /* data */
    this.points                          = 0;  /* Tickets earned */
    this.total_points = this.totalpoints = 0;  /* Total, including tickets earned */
    this.meta_type                       = ''; /* Used by TM MORE btn */
    this.custompoint                     = -1; /* added by TJ on 3/22/2013, to give custom number ticket */
    this.scrubbedPenalty = false;        //Added to make the custompoint value useful when set to zero if the scrubbed percentage of a video is less than .8
    this.score                           = 0;  /* Used by some activities (sent to endActivity) */
    this.pathid                          = parseInt(getCookie('pathid')) || 0;
    this.lastarea                        = getCookie('lastactivityarea');
    this.petid                           = /petpark/.test(this.lastarea) ? parseInt(getCookie('petItemId')) : 0;
    this.lessonId                        = 0;
    this.lessonType                      = getCookie('lessonType') || ''; //*** INTEGRATES c034dfec 02dacb20
    this.teacherslessonsid               = /students_lessons|myactivities|mylessons/.test(this.lastarea) ? getCookie('teachers_lessons_id') : 0;
    this.memberlessonid                  = /students_lessons|myactivities|mylessons|schools/.test(this.lastarea) ? getCookie('member_lesson_id') : 0;
    this.continueTo                      = getCookie('continueTo');
    this.nextBasicsUrl                   = null; /* ContinueTo override for Basics; Set by GameTracker.setNextBasicsUrl */
    this.language                        = language || 'en';
    this.link                            = location.href.replace(location.origin, ''); /* Used by TM:addToFavorites */
    this.bid = (function(){
        var bid = location.search.match(/bid=(\d+)/);
        if (bid && bid.length > 1) return parseInt(bid[1]);
        return 0;
    })();
    this.platform = (function () {
        if      (!USINGAPP && !APP_VERSION)   return 'desktop';
        else if (!!IOS_VERSION && !isAndroid) return 'ios';
        else if (!!isAndroid)                 return 'android';
    })();

    /* tracking data */
    this.page_info_key = window.location.pathname.replace(/^\//, '');
    this.page_detail   = '';
    //this.page_detail = digitalData.page.pageInfo.pageDetail; //*** present, but commented out in 2.0 code
    //this.next_teacher_lesson_activity_id = 0;
    //*** KNOWN ISSUE: pageDetail/page_detail prop not being set on 2.0 or 3.0

    /* flags */
    this.posted       = false;
    this.showTM       = false;
    this.mylessonpath = false;

    /* deprecated */
    this.icon = '';

    /* international school 1.0 */
    this.activity_info = null;
    this.content_info = null;
    this.init();

    /* GLOBAL FOR DEBUGGING */
    if (this.debug) window.GAMETRACKER = this;
}

/**
 * Legacy Event Handling
 * Required by all activities that listen for doReplay event
 * Other listeners: cutout.php:'gt_canceledGame', word_pairs.js:'posted'
 */
enableEventHandling(GameTracker);

/**
 * Updated Event Dispatcher
 * Used to dispatch events to the TicketMachine
 */
GameTracker.prototype.gtEmitter = new EventEmitter2();

/* DATA & PARSING METHODS */

/* Add commas at thousand marks */
GameTracker.prototype.addCommas = function (n) {
    if (typeof parseInt(n) === 'number') {
        return n.toString().replace(/(\d(?=(?:\d{3})+(?!\d)))/g, '$1,');
    }
};

/* international school 1.0 */
GameTracker.prototype.init = function () {
    ApiService.call('activity_get_engine_info', {
        arguments: JSON.stringify([this.cid])
    }, this.callbackGetActivityInfo.bind(this));
};

/* international school 1.0 */
GameTracker.prototype.callbackGetActivityInfo = function (data) {
    if (data.payload.activity_info) this.activity_info = data.payload.activity_info;
    if (data.payload.content_info) this.content_info = data.payload.content_info;
    this.dispatchEvent('gt_info_ready');
}

/* international school 1.0 */
GameTracker.prototype.getActivityInfo = function () {
    var info = {};
    info.activityInfo = this.activity_info;
    info.contentInfo = this.content_info;
    return info;
}

/**
 * Get/parse learningActivities cookie (e.g. for getPathIdAndLessonId)
 * @param  {integer} index Only return specific segment [0-2] (otherwise returns array)
 * @return {array|string}       Array from split string, or string
 * Note: Example return data ["lessonInprogress", "2977", "0"]
 */
GameTracker.prototype.getLessonInfo = function (index) {
    var learningActivities = getCookie('learningActivities').split("ABC") || false;
    if (isNaN(index)) return learningActivities;
    if (index in learningActivities) return learningActivities[index];
    else return false;
};

/**
 * Get path int for current user's grade level
 * @return {string} Path code (e.g. "109")
 */
GameTracker.prototype.getPathID = function () {
    return getCookie('pathid') || (uinfo.pathinfo.pathid || 0);
};

/**
 * Get BID (Basics only) from URL param
 * @return {integer} BID
 */
GameTracker.prototype.getBid = function () {
    var bid = location.search.match(/bid=(\d+)/);
    if (bid && bid.length > 1) return parseInt(bid[1]);
    return 0;
};

/**
 * Set gt.bid prop via Promised AJAX response
 * @return {object|boolean} Promise|false
 * Note: Basics only; used to override TM CONTINUE btn
 */
GameTracker.prototype.setNextBasicsUrl = function () {
    this.bid = this.getBid();
    if (!this.bid) return false;
    return new Promise(function (resolve, reject) {
        ajax.call(this, '/html5/xml/gametracker.php', {
            action: 'getNextBasicsUrl',
            bid: this.bid,
            cid: this.cid,
        }, function (data) {
            if (data && data.goToUrl) { //*** INTEGRATES: 395cb6e4
                this.nextBasicsUrl = data.goToUrl.replace(/^([^/])/,'/$1');
            }
            if (data) resolve(data);
            else reject('No data returned'); //***
        }.bind(this), this);
    }.bind(this));
};

/**
 * Normalize area strings for use as object keys
 * @param  {string} str Area string to check
 * @return {string}     Expected area string
 */
GameTracker.prototype.normalizedAreaString = function (str) {
    if (!str) return false;
    var areaMap = {
        path             : 'path',
        learningpath     : 'path',
        petpark          : 'petpark',
        myactivities     : 'myactivities',
        students_lessons : 'students_lessons',
        mylessons        : 'mylessons',
        default          : 'path',
    };
    if (!str in areaMap) var str = 'default';
    if (areaMap[str]) return areaMap[str].replace(/\+/g, " ");
};

/**
 * Return obj based on lastarea value (e.g. for API)
 * @param  {string} lastarea From lastactivityarea cookie
 * @return {object}          Obj with pathid, lessonid params
 */
GameTracker.prototype.getPathIdAndLessonId = function (lastarea) {
    var lastarea  = lastarea || this.lastarea,
        returnObj = {},
        pathid    = this.getPathID(),
        lessonid  = this.getLessonInfo(1) || 0,
        lastarea  = this.normalizedAreaString(lastarea);

        /* set based on lastarea */
        switch (lastarea) {
            case 'path' :
            case 'petpark' :
            case 'learningpath' :
                returnObj.pathid   = pathid || 0;
                returnObj.lessonid = lessonid || (uinfo.pathinfo.lessonid || 0);
                break;
            case 'myactivities' :
            case 'students_lessons' :
            case 'mylessons' :
                returnObj.pathid   = pathid || 0;
                returnObj.lessonid = this.teacherslessonsid || 0; //*** 7063e75c
                break;
            default:
                returnObj.pathid   = 0;
                returnObj.lessonid = 0;
        }

        /* set based on lessonType (can override area switch above) */
        switch (this.lessonType) {
            case 'assessment':
                returnObj.lessonid = this.memberlessonid || 0;
                break;
            case 'teacher':
                returnObj.lessonid = this.teacherslessonsid || 0;
                break;
        }

        /* set gt.lessonId */
        this.lessonId = returnObj.lessonid; //***

        return returnObj;
};

/**
 * Gathers boilerplate and custom data for API requests
 * @param  {string} action Required: Specify action to get corresponding data ('start'|'end'|'cancel')
 * @return {object}        Params needed by endpoints: /User/StartActivity, /User/EndActivity, /User/CancelActivity
 */
GameTracker.prototype.getApiParams = function (action) {
    if (!action) throw new Error("No action specified");//***
    // if (!action) throw 'No action specified';//***

    var params         = {},
        analytics_info = {},
        pathLessonObj  = this.getPathIdAndLessonId(),
        argSets;

    analytics_info.track_cookie  = getCookie('track');
    analytics_info.area          = getCookie('pageArea').replace(/\+/g, ' ');
    analytics_info.referer       = window.location.href;
    analytics_info.page_info_key = this.page_info_key;
    analytics_info.page_detail   = this.page_detail; //*** naming in live version doesn't match actual prop
    analytics_info.code_base     = 'html5';

    analytics_info.kvp = {
        site     : 'html5',
        pathid   : pathLessonObj.pathid,
        lessonid : pathLessonObj.lessonid,
    };

    argSets = {

        /* StartActivity */
        start  : function () {
            var args = [
                this.cid,                                  // $arg_activity_id
                this.instanceName,                         // $arg_activity_name
                this.level,                                // $arg_activity_level
                pathLessonObj.pathid,                      // $arg_path_id
                pathLessonObj.lessonid,                    // $arg_lesson_id
                this.instance,                             // $arg_instance
                window.location.pathname,                  // $arg_url
                this.lastarea,                             // $arg_area
                Math.round((new Date()).getTime() / 1000), // $arg_timestamp
                analytics_info,                            // $arg_analytics_info
            ];

            //when a new Schools lesson instance needs to be started, we pass in teacher_path_lesson_instance_id arg to API
            //and a new classworkd_member_lesson_d and homework_member_lesson_id will be returned
            if (this.lessonType === 'assessment') {
                var argOptionalArguments = {};

                if (pathLessonObj.lessonid) argOptionalArguments.member_lesson_id = pathLessonObj.lessonid;

                var teacherPathLessonInstanceId = getCookie('teacher_path_lesson_instance_id');
                if (teacherPathLessonInstanceId) {
                    //get the value and purge the cookie
                    argOptionalArguments.teacher_path_lesson_instance_id = teacherPathLessonInstanceId;
                    setCookie('teacher_path_lesson_instance_id', '', -1);
                }
                args.push(argOptionalArguments);
            }

            return args;
        },

        /* EndActivity (post) */
        end    : function () {
            var args = [
                this.game_result_id,                       // $arg_log_id
                this.score,                                // $arg_score
                this.custompoint,                          // $arg_custom_points
                this.groupid,                              // $arg_group_id
                this.lessonId,                             // $arg_teacher_lesson_id //*** make conditional, per 02dacb20
                Math.round((new Date()).getTime() / 1000), // $arg_timestamp
                analytics_info,                            // $arg_analytics_info
            ];

            var json_obj = {};
            /* lessonid val determined by getPathIdAndLessonId; this condition
            determines if it's pushed to args; see NOTE:02dacb20 */
            if(this.lessonType === 'assessment') {
                json_obj.member_lesson_id = pathLessonObj.lessonid;
            }
            json_obj.pet_id = this.petid;

            args.push(json_obj);

            return args;
        },

        /* CancelActivity */
        cancel : function () {
            var args = [
                this.game_result_id,                       // $arg_game_result_id
                analytics_info,                            // $arg_analytics_info
            ];

            /* lessonid val determined by getPathIdAndLessonId; this condition
            determines if it's pushed to args; see NOTE:02dacb20 */
            this.lessonType === 'assessment' && args.push({
                member_lesson_id: pathLessonObj.lessonid
            });

            return args;
        },
    };

    return (function (_this) {
        if (action && action in argSets && typeof argSets[action] === 'function') {
            params.arguments = JSON.stringify(argSets[action].call(_this)); //*** WIP3: optimization
            return params;
        }
        return false;
    })(this);
};

/**
 * Update GT props with API data (e.g. on start and end callbacks)
 * @param  {object} data Response
 *
 * start:  game_result_id
 * end:    totalpoints, total_points, meta_type, next_teacher_lesson_activity_id(?)
 * cancel: null
 */
GameTracker.prototype.responseDataUpdate = function (data) {
    if (!data) throw new Error("No data"); //***

    /* If response data obj has a prop, update corresponding prop in gt */
    for (var k in data) {
        if (data.hasOwnProperty(k)) {
            this[k] = data[k];
        }
    }

    /* in case legacy references gt.gameid */
    this.gameid = this.game_result_id;

    /* in case legacy references gt.totalpoints */
    this.totalpoints = this.total_points;
};

/**
 * Run/set arbitrary funcs/props based on area
 * @param {string} area (e.g. lastactivityarea cookie value)
 * Note: Called by start method
 */
GameTracker.prototype.setAreaProps = function (area) {
    var area = area ? area : this.lastarea;

    /* Map area props */
    var areaProps = {

        path: function () {
            var lessonInfo = this.getLessonInfo(); // from cookie: learningActivities
            this.pathid    = parseInt(getCookie('pathid'))     || 0;
            this.lessonId  = lessonInfo.length ? lessonInfo[1] :  0;
            return 'path';
        },

        petpark: function () {
            this.pathid = parseInt(getCookie('pathid')) || 0;
            this.petid = parseInt(getCookie('petItemId')) || 0;
            return 'petpark';
        },

        students_lessons: function () {
            this.mylessonpath = true;
            this.teacherslessonsid = getCookie('teachers_lessons_id') || 0;
            return 'students_lessons';
        },

        myactivities: function () {
            this.mylessonpath = true;
            this.teacherslessonsid = getCookie('teachers_lessons_id') || 0;
            return 'myactivities';
        },

        basics: function () {
            //*** for continue override in basics/sightwords
            return 'basics';
        },

        default: function () {
            return 'default';
        },
    };

    if (area in areaProps &&
        typeof areaProps[area] === 'function') {
        return areaProps[area].call(this); //*** WIP3
    }
};

/**
 * Update ticket count in shell
 * @param  {integer} points Points/tickets earned
 */
GameTracker.prototype.updateShell = function (points) {
    if (this.debug && isNaN(points) && isNaN(parseInt(this.total_points))) console.log("No valid points/ticket number available"); //***

    var points        = !isNaN(points) ? parseInt(points) : parseInt(this.total_points),
        pointsDisplay = this.addCommas(points),
        shellCounter  = null,
        updateFuncs   = {

            desktop : function () {
                shellCounter = document.querySelector('#user_points');
                if (shellCounter) shellCounter.innerHTML = pointsDisplay;
                // shellCounter.innerHTML = shellCounter.textContent = pointsDisplay;
            },

            ios     : function () {
                if (isUnity) {
                    unityCall.validateLogin();
                } else if (APP_VERSION >= 1.97) {
                    appCall('mml:#shell_user_points.text=' + pointsDisplay);
                    appCall('validateUserInfo'); //Make Sure to call so App knows to update it's internal userinfo for ticket total
                }
            },

            android : function () {
                if (isUnity) {
                    unityCall.validateLogin();
                } else if (APP_VERSION >= 1.97) { //*** is this appropriate for android? inherited from 2.0.0
                    appCall('mml:#shell_user_points.text=' + pointsDisplay);
                    appCall('validateUserInfo'); //Make Sure to call so App knows to update it's internal userinfo for ticket total
                }
            },
    };

    if (typeof updateFuncs[this.platform] === 'function') {
        updateFuncs[this.platform]();
    }

};

/* API CALLS */

/* START activity (API payload should contain game_result_id) */
GameTracker.prototype.start = function () {
    /* set arbitrary props based on area, etc. */
    this.setAreaProps();

    /* map additional start funcs by platform */
    var startFuncs = {
        /* DESKTOP:START */
        desktop : null,
        /* IOS:START */
        ios     : null,
        /* ANDROID:START */
        android : function () {
            if (!isUnity) {
                this.goToUrl = this.nextBasicsUrl; // QA-9329
                var args =  "cid="       + this.cid            +
                    ",gameid="   + this.game_result_id +
                    ",instance=" + this.instance       +
                    ",level="    + this.level          +
                    ",lastarea=" + this.lastarea       +
                    ",groupid="  + this.groupid        + // Added groupid in order to pass the group down into log_curriculum_activity() in global_func.inc- Clark 03/10/2014
                    ",goToUrl="  + this.goToUrl        +
                    ",pathid="   + this.pathid         +
                            ",lessonid=" + this.lessonId;

                if (this.lessonType === 'assessment') {
                    args += ",memberLessonId=" + this.memberlessonid;
                }

                Android.startActivity(args);
            }
            return;
        }.bind(this),
    },
    /* Mapped func called in conditional */
    runStartFuncs = function () {
        /* Send generic API call */
        var isExample = /[&\?]example=(1|true)/.test(window.location.search);
        if (!isExample) {
            ApiService.call('user_start_activity', this.getApiParams('start'), function (data) {
                var data = data.payload;
                this.callbackStartActivity(data);
            }.bind(this));
        }

        /* Run platform-specific function */
        if (this.platform in startFuncs &&
            typeof startFuncs[this.platform] === 'function') {
            startFuncs[this.platform]();
        }
    }.bind(this),

    /* Try to create Promise */
    nextBasics = this.setNextBasicsUrl();
    this.goToUrl = nextBasics; //***
    /* If setNextBasicsUrl returned Promise, resolve with runStartFuncs */
    if (nextBasics) {
        nextBasics
            .then(runStartFuncs)
            .catch(function (error) {
                throw (error);
            });
    }
    /* Else proceed immediately */
    else runStartFuncs();
};

/**
 * END/POST activity; Send endActivity data to API
 * Note: Also available as post method for legacy
 */
GameTracker.prototype.end = function () {
    this.debug && !this.game_result_id > 0 && console.log('No Game ID'); //***

    /* update petpark if appropriate */
    //this.petid && /petpark/i.test(this.lastarea) && this.postToPetPark();

    var isExample = /[&\?]example=(1|true)/.test(window.location.search);

    if (isExample) {
        this.callbackEndActivity({ points: Math.random().toString().slice(2) % 3 + 1 });
    } else {
        if (this.game_result_id) {
            ApiService.call('user_end_activity', this.getApiParams('end'), function (data) {
                var data = data.payload;
                this.callbackEndActivity(data);
            }.bind(this));
        }
    }
};
GameTracker.prototype.post = GameTracker.prototype.end;

/* post activity data specific to petpark; legacy (will remain an AJAX call) */
/* Deprecated */
GameTracker.prototype.postToPetPark = function () {
    this.petid && ajax('/xml/petpark.php', {
        action: "give_pet_exp",
        useditemid: this.petid,
    }, function (data) {
        this.giveExpCallback(data);
    }.bind(this), this);
};

/* Legacy; referenced by templates, don't change name (called by postToPetPark) */
/* Deprecated */
GameTracker.prototype.giveExpCallback = function (data) {
    //Currently not used by Analytics
};

/* CANCEL activity (API payload should contain null) */
GameTracker.prototype.cancel = function () {
    // if (!this.game_result_id > 0) throw 'No game_result_id set';//*** /* 011916: puzzle activities trip this error */
    // this.debug && !this.game_result_id > 0 && console.log('%c'+'No Game ID', 'color:red;'); //***
    if (!this.game_result_id > 0) return false;

    ApiService.call('user_cancel_activity', this.getApiParams('cancel'), function (data) {
        if (data.success !== 'TRUE') throw new Error("cancelActivity error");//***
        if (data.success === 'TRUE') {
            var data = data.payload;
            this.callbackCancelActivity(data);
        }
    }.bind(this));

    /* Send cancel to Android app */
    if (!isUnity) {
        this.platform === 'android' && Android.cancelActivity();
    }

    /* Legacy */
    this.dispatchEvent('gt_canceledGame');
};

/**
 * Runs on startActivity API response
 * @param  {object} data
 */
GameTracker.prototype.callbackStartActivity = function (data) {//***WIP22:reduce redundancy
    if (!data) throw new Error("No data");//***
    if (!this.platform) throw new Error('No platform info set');//***
    if (!!data.error) throw new Error('StartActivity returned error: '  + data.error.code);

    var funcMap = {
        desktop : function () {
                /* tracking */
                dtmArgs('page', 'pageInfo', 'cid', this.cid);
                dtmArgs('page', 'pageInfo', 'gameid', data.game_result_id);
                this.getLessonInfo()[2] === 1 && dtmTrack('level start');
                dtmTrack('activity start');

                //*** MAKE SURE data is available; should be, but ajax/api cbs were separate before
                var lessonInfo = this.getLessonInfo(); // from cookie: learningActivities
                if (/lessonStart/.test(lessonInfo[0])) {
                    dtmArgs('page', 'pageInfo', 'lessonId', this.lessonId);
                    dtmTrack('lesson start');
                    setCookie('learningActivities', 'lessonInprogressABC' + this.lessonId + 'ABC' + 0, 1);
                }
                if (/lessonInprogress/.test(lessonInfo[0])) {
                    dtmArgs('page', 'pageInfo', 'lessonId', this.lessonId);
                }
        }.bind(this),
        ios     : function () {
                /* tracking */
                dtmArgs('page', 'pageInfo', 'cid', this.cid);
                dtmArgs('page', 'pageInfo', 'gameid', data.game_result_id);
                this.getLessonInfo()[2] === 1 && dtmTrack('level start');
                dtmTrack('activity start');

                //*** MAKE SURE data is available; should be, but ajax/api cbs were separate before
                var lessonInfo = this.getLessonInfo(); // from cookie: learningActivities
                if (/lessonStart/.test(lessonInfo[0])) {
                    dtmArgs('page', 'pageInfo', 'lessonId', this.lessonId);
                    dtmTrack('lesson start');
                    setCookie('learningActivities', 'lessonInprogressABC' + this.lessonId + 'ABC' + 0, 1);
                }
                if (/lessonInprogress/.test(lessonInfo[0])) {
                    dtmArgs('page', 'pageInfo', 'lessonId', this.lessonId);
                }
        }.bind(this),
        android : null,
        /* not sure why android doesn't include tracking above, but replicated logic from gt 2.0 */
    };

    /* update props */
    this.responseDataUpdate(data);

    if (this.platform in funcMap
        && typeof funcMap[this.platform] === 'function') {
        funcMap[this.platform]();
    }

    /* handle setting member_lesson_id cookie based on startActivity data */
    /* (imported from ENTPE-158, for ENTPE-685) */
    var teacherMemberLessonType = getCookie('teacher_member_lesson_type');
    this.debug && teacherMemberLessonType && console.log('teacherMemberLessonType:', teacherMemberLessonType);
    if (teacherMemberLessonType === 'classwork' && !!data.classwork_member_lesson_id) {
        setCookie('member_lesson_id', data.classwork_member_lesson_id);
        this.memberlessonid = data.classwork_member_lesson_id;
    }
    if (teacherMemberLessonType === 'homework' && !!data.homework_member_lesson_id) {
        setCookie('member_lesson_id', data.homework_member_lesson_id);
        this.memberlessonid = data.homework_member_lesson_id;
    }

    /* set flags */
    this.posted = false;
    this.showTM = false;

    /* update tm */
    this.gtEmitter.emit('ticketMachine:update', this);
};

/* API CALLBACKS */

/**
 * Runs on endActivity API response
 * @param  {object} data
 */
GameTracker.prototype.callbackEndActivity = function (data) {//***WIP22:reduce redundancy
    if (!data) throw new Error("No data");//***
    if (!this.platform) throw new Error('No platform info set');//***
    var funcMap = {
        /* DESKTOP:CALLBACK:POST */
        desktop : function () {
            /* launch ticket machine */
            this.showTM && this.updateAndLaunchTicketMachine(this);
        },

        /* IOS:CALLBACK:POST */
        ios     : function () {
            /* launch ticket machine */
            this.showTM && this.updateAndLaunchTicketMachine(this);
        },

        /* ANDROID:CALLBACK:POST */
        android : null,
    };
        /* moved from end/post method */
        this.posted = true;

        /* update gt data */
        this.responseDataUpdate(data);

        /* re: parent users, null total_points from EndActivity */
        if (isNaN(parseInt(this.total_points))) {
            this.debug && console.log('*** no total_points value from api (will use fallback)'); //***
            this.totalpoints = this.total_points = +uinfo.points + this.points;
        };

        /* update shell */
        this.updateShell();

        /* tracking */
        dtmVars('tickets earned', this.points);
        dtmArgs('page','pageInfo','pageDetail','ticket machine');

        if (this.platform in funcMap
            && typeof funcMap[this.platform] === 'function') {
            funcMap[this.platform].call(this); //*** WIP3
        }

        this.game_result_id = 0;
        this.dispatchEvent('posted'); //added by TJ on 10/9/2013
};

/**
 * Runs on cancelActivity API response
 * @param  {object} data
 */
GameTracker.prototype.callbackCancelActivity = function (data) {
    // if (!data) throw 'No data';//***
    if (!this.platform) throw new Error('No platform info set');//***

    /* tracking */
    dtmTrack('activity cancel');

    /* reset gt props */
    this.game_result_id = 0;
    this.posted = false;
    this.showTM = false;

    /* events */
    this.dispatchEvent('gt_canceledGame');
};

/* TICKETMACHINE METHODS */

/*
    php creates tm instance
    activity calls gt.ticketMachine()
    gt.ticketMachine() sends end/post
    end/post callback updates ticketMachine & launches tm
*/

/* Called by callbackEndActivity */
// QA-9665: make error more granular, promisify gtdataupdate
GameTracker.prototype.updateAndLaunchTicketMachine = function (gtdata) {
    this.debug && console.log('GameTracker.prototype.updateAndLaunchTicketMachine'); //***
    this.debug && !ticketMachine && console.log("TICKETMACHINE OBJECT NOT FOUND"); //***;
    this.debug && !ticketMachine && Analytics.trackEvent('@ticketMachine:fail'); //***;

    /* ticketMachine instance setup in ticketmachine_sp */
    this.debug && console.log('updateAndLaunchTicketMachine:this', this); //***
    this.debug && console.log('updateAndLaunchTicketMachine:gtDataUpdate'); //***

    var gtDataUpdate = ticketMachine.gtDataUpdate(this);
    /* binds ticketMachine instance to its own method to maintain context */
    if (gtDataUpdate) {
        gtDataUpdate
            .then(ticketMachine.tmLaunch.bind(ticketMachine))
            .catch(function (error) {
                Analytics.trackEvent('@ticketMachine:fail');
                throw (error);
            });
    }
};

/* Calls end/post method (end/post callback LAUNCHES ticketmachine) */
/* Leave method name as is: individual activities call it */
GameTracker.prototype.ticketMachine = function () {
    var funcMap = {

        /* DESKTOP:TICKETMACHINE */
        desktop : function () {
            console.log('this.game_result_id:', this.game_result_id);
            if (typeof this.game_result_id !== 'undefined') {
                if (!this.posted) {
                    this.showTM = true;
                    this.end(); /* CB launches TM */
                }
            }
        },

        /* IOS:TICKETMACHINE */
        ios     : function () {
            if (this.game_result_id > 0) {
                if (!this.posted) {
                    this.showTM = true;
                    this.end(); /* CB launches TM */
                }
            }
        },

        /* ANDROID:TICKETMACHINE */
        android: function () {
            //*** from gt2.0 live, Tue Jan 05, 2016, 04:59PM
            if (isAndroid && !this.posted && !isUnity) {
                this.posted = true;
                if(this.lastarea == 'petpark'){
                    var petid = parseInt(getCookie('petItemId'));
                    Android.updatePetParkRewards("petItemId="+petid);
                }
                var testVersion = parseInt(APP_VERSION.charAt(0));
                if (testVersion >= 3) {
                    Android.endActivity("score="+this.score);
                } else {
                    Android.endActivity();
                }
                this.dispatchEvent('posted');
                return;
            }
        },
    };

    if (typeof funcMap[this.platform] === 'function') {
        funcMap[this.platform].call(this); //*** WIP3
    }

};

/* REPLAY METHODS */

/* Legacy (from doReplay) */
GameTracker.prototype.setGameButton = function (event) {
    if (this.platform === 'desktop') {
        var gamebutton;
        if (event.which == null) {
            gamebutton = (event.button < 2) ? 'left' : ((event.button == 4) ? 'middle' : 'right');
        } else {
            gamebutton = (event.which < 2) ? 'left' :
                ((event.which == 2) ? 'middle' : 'right');
        }
        if (gamebutton !== 'left') return false;
    };
}
/* Legacy (from doReplay) */
GameTracker.prototype.setMetaWrapper = function () {
    var fragment = document.createDocumentFragment(),
        elem = document.getElementById('meta-wrapper');
    if (elem) {
        while (elem.firstChild) {
            fragment.appendChild(elem.firstChild);
        }
        fragment.firstChild.style.transform = null;
        fragment.firstChild.style.WebkitTransform = null;
        fragment.firstChild.style.MsTransform = null;
        fragment.firstChild.style.MozTransform = null;
        fragment.firstChild.style.OTransform = null;
        elem.parentNode.replaceChild(fragment, elem);
    }
};

/* Dispatches event for game to listen to */
GameTracker.prototype.doReplay = function (event) {
    /* Note: Activities listen for this event */
    this.dispatchEvent('doReplay');

    /* Legacy calls */
    this.setGameButton(event);
    this.setMetaWrapper();

};

/* POPUP METHODS */

/* Called by ticketMachine:allAnimationsDone event */
GameTracker.prototype.popupGradeAdvisor = function () {
    if (this.lastarea == 'path' && isGrade1Advisor && uinfo.pathinfo.pathlevel >= 7) {
        showPopup('feedback_grade1.php?activityCID=' + this.cid);
    }
};

/* NOTE:02dacb20
This is needed so that the userdata_0.{member_lessons,
member_lesson_items, member_lesson_plays} tables can be properly
updated for activities that belong to parent assigned lessons from
the recommended lessons in the assessment center.
Robert Alatorre,02dacb20 */

/* [Caigoy,050516,QA-10303] Returning Promise Polyfill to resolve IE issue in Basics, since GT is loaded outside of RequireJS there */
!function(t){function e(){}function n(t,e){return function(){t.apply(e,arguments)}}function o(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],a(t,this)}function r(t,e){for(;3===t._state;)t=t._value;return 0===t._state?void t._deferreds.push(e):(t._handled=!0,void l(function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null===n)return void(1===t._state?i:u)(e.promise,t._value);var o;try{o=n(t._value)}catch(r){return void u(e.promise,r)}i(e.promise,o)}))}function i(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var r=e.then;if(e instanceof o)return t._state=3,t._value=e,void f(t);if("function"==typeof r)return void a(n(r,e),t)}t._state=1,t._value=e,f(t)}catch(i){u(t,i)}}function u(t,e){t._state=2,t._value=e,f(t)}function f(t){2===t._state&&0===t._deferreds.length&&setTimeout(function(){t._handled||o._onUnhandledRejection(t._value)},1);for(var e=0,n=t._deferreds.length;n>e;e++)r(t,t._deferreds[e]);t._deferreds=null}function c(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function a(t,e){var n=!1;try{t(function(t){n||(n=!0,i(e,t))},function(t){n||(n=!0,u(e,t))})}catch(o){if(n)return;n=!0,u(e,o)}}var s=setTimeout,l="function"==typeof setImmediate&&setImmediate||function(t){s(t,1)},d=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)};o.prototype["catch"]=function(t){return this.then(null,t)},o.prototype.then=function(t,n){var i=new o(e);return r(this,new c(t,n,i)),i},o.all=function(){var t=Array.prototype.slice.call(1===arguments.length&&d(arguments[0])?arguments[0]:arguments);return new o(function(e,n){function o(i,u){try{if(u&&("object"==typeof u||"function"==typeof u)){var f=u.then;if("function"==typeof f)return void f.call(u,function(t){o(i,t)},n)}t[i]=u,0===--r&&e(t)}catch(c){n(c)}}if(0===t.length)return e([]);for(var r=t.length,i=0;i<t.length;i++)o(i,t[i])})},o.resolve=function(t){return t&&"object"==typeof t&&t.constructor===o?t:new o(function(e){e(t)})},o.reject=function(t){return new o(function(e,n){n(t)})},o.race=function(t){return new o(function(e,n){for(var o=0,r=t.length;r>o;o++)t[o].then(e,n)})},o._setImmediateFn=function(t){l=t},o._onUnhandledRejection=function(t){console.warn("Possible Unhandled Promise Rejection:",t)},"undefined"!=typeof module&&module.exports?module.exports=o:t.Promise||(t.Promise=o)}(this);

////////////////////////////////////////////////////////////////////////////
function TJ_Utils() { }

TJ_Utils.prototype.getRandomNumber = function(_max, _min, _exceptions)
{
	var _return;
	if(_min == undefined) _min = 0;
	if(_max < _min)
	{
		var tmp_min = _min;
		_min = _max;
		_max = tmp_min;
	}
	if(_max == _min) return _max;

	_return = Math.floor(Math.random() * 10000) % (_max - _min + 1) + _min;

	if(_exceptions != undefined)
	{
		if(_exceptions.length >= _max - _min + 1) return 0;

		for(var i = 0; i < _exceptions.length; i++)
		{
			if(_exceptions[i] == _return)
			{
				_return = this.getRandomNumber(_max, _min, _exceptions);
				break;
			}
		}
	}

	return _return;
}

TJ_Utils.prototype.shuffleArray = function(_target, _numShuffle)
{
	if(_numShuffle == undefined) _numShuffle = _target.length * 2;
	
	var index1, index2;
	var _temp;

	for(var i = 0; i < _numShuffle; i++)
	{
		index1 = this.getRandomNumber(_target.length - 1);
		index2 = this.getRandomNumber(_target.length - 1);
		_temp = _target[index1];
		_target[index1] = _target[index2];
		_target[index2] = _temp;
	}

	return _target;
}

//currently only positive values work
TJ_Utils.prototype.getAccurateFloat = function(_orig, _diff, _sign)
{
	if(typeof(_orig) != 'string') _orig = _orig.toString();
	if(typeof(_deff) != 'string') _diff = _diff.toString();
	if(_sign == undefined) _sign = 1; //add = 1, subtract = 0
	
	var _orig_split = _orig.split('.');
	var _diff_split = _diff.split('.');

	var _result = parseInt(_orig_split[0]) + parseInt(_diff_split[0]);
	var _result_dec;

	if(_sign == 1) //addition
	{
		if(_orig_split.length < 2 && _diff_split.length < 2)
			_result_dec = 0;
		else if(_orig_split.length < 2)
			_result_dec = _diff_split[1];
		else if(_diff_split.length < 2)
			_result_dec = _orig_split[1];
		else
		{
			var _max = Math.max(_orig_split[1].length, _diff_split[1].length);
			var _dec_array = new Array();
			var _raise = false;

			for(var i = 0; i < _max; i++)
				_dec_array[i] = 0;
			
			for(i = _max - 1; i >= 0; i--)
			{
				if(_orig_split[1].charAt(i))
					_dec_array[i] += parseInt(_orig_split[1].charAt(i));
				if(_diff_split[1].charAt(i))
					_dec_array[i] += parseInt(_diff_split[1].charAt(i));

				if(_dec_array[i] > 9) 
				{
					if(i == 0)
						_raise = true;
					else
						_dec_array[i-1] += 1;

					_dec_array[i] -= 10;
				}
			}

			if(_raise) _result += 1;

			_result_dec = _dec_array.toString().replace(/,/g, '');
		}
	}
	else //subtraction
	{
		var _borrow = false;
		if(_orig_split.length < 2 && _diff_split.length < 2)
			_result_dec = 0;
		else if(_diff_split.length < 2)
			_result_dec = _orig_split[1];
		else
		{	
			if(_orig_split.length == 1) _orig_split.push('0');
			_max = Math.max(_orig_split[1].length, _diff_split[1].length);
			_dec_array = new Array();
			var _orig_array = new Array();
			var _diff_array = new Array();

			for(i = 0; i < _max; i++)
			{
				if(_orig_split[1].charAt(i))
					_orig_array[i] = parseInt(_orig_split[1].charAt(i));
				else
					_orig_array[i] = 0;

				if(_diff_split[1].charAt(i))
					_diff_array[i] = parseInt(_diff_split[1].charAt(i));
				else
					_diff_array[i] = 0;

				_dec_array[i] = 0;
			}
			
			for(i = _max - 1; i >= 0; i--)
			{
				if(_orig_array[i] < _diff_array[i])
				{
					if(i == 0)
						_borrow = true;
					else
						_orig_array[i - 1] -= 1;

					_orig_array[i] += 10;
				}

				_dec_array[i] = _orig_array[i] - _diff_array[i];
			}

			if(_borrow) 
				_result = (parseInt(_orig_split[0]) - 1) - parseInt(_diff_split[0]);
			else
				_result = parseInt(_orig_split[0]) - parseInt(_diff_split[0]);

			_result_dec = _dec_array.toString().replace(/,/g, '');
		}
	}
	
	var _final_result = _result.toString() + '.' + _result_dec.toString();
	
	return parseFloat(_final_result);
}

TJ_Utils.prototype.translate = function(_target, _x, _y)
{
	if(_target == undefined) return null;
	if(typeof(_target) == 'string') _target = document.getElementById(_target);
	
	var _transform_data;
	var _transform;

	if(_target.style.MozTransform) _transform_data = _target.style.MozTransform;
	if(_target.style.msTransform) _transform_data = _target.style.msTransform;
	if(_target.style.OTransform) _transform_data = _target.style.OTransform;
	if(_target.style.webkitTransform) _transform_data = _target.style.webkitTransform;

	if(_transform_data == undefined) _transform_data = '';

	if(_x == undefined && _y == undefined)
	{
		if(_transform = _transform_data.match(/translate\([0-9\s\-\,px]*\)/))
		{
			_transform = _transform[0].match(/[0-9\s\-\,px]+/);
			_transform = _transform[0].replace(/[|]|px/g, '');

			return _transform.split(',');
		}
	}
	else
	{
		if(_x == undefined || isNaN(_x)) _x = 0;
		if(_y == undefined || isNaN(_y)) _y = 0;
		
		if(_transform_data.match(/translate\([0-9\s\-\,px]*\)/))
		{
			_transform_data = _transform_data.replace(/translate\([0-9\s\-\,px]*\)/, '');
		}

		_transform_data += 'translate(' + _x + 'px,' + _y + 'px)';
		
		_target.style.MozTransform = _transform_data;
		_target.style.msTransform = _transform_data;
		_target.style.OTransform = _transform_data;
		_target.style.webkitTransform = _transform_data;
	}

	return null;
}

TJ_Utils.prototype.scaleX = function(_target, _val)
{
	if(_target == undefined) return null;
	if(typeof(_target) == 'string') _target = document.getElementById(_target);

	var _transform_data;
	var _transform;

	if(_target.style.MozTransform) _transform_data = _target.style.MozTransform;
	if(_target.style.msTransform) _transform_data = _target.style.msTransform;
	if(_target.style.OTransform) _transform_data = _target.style.OTransform;
	if(_target.style.webkitTransform) _transform_data = _target.style.webkitTransform;

	if(_transform_data == undefined) _transform_data = '';

	if(_val == undefined)
	{
		if(_transform = _transform_data.match(/scaleX\([0-9\s\-\.]*\)/))
		{
			_transform = _transform[0].match(/[0-9\s\-\.]+/);
			return parseInt(_transform[0]);
		}
	}
	else
	{
		if(_transform_data.match(/scaleX\([0-9\s\-\.]*\)/))
		{
			_transform_data = _transform_data.replace(/scaleX\([0-9\s\-\.]*\)/, '');
		}

		_transform_data += 'scaleX(' + _val + ')';

		_target.style.MozTransform = _transform_data;
		_target.style.msTransform = _transform_data;
		_target.style.OTransform = _transform_data;
		_target.style.webkitTransform = _transform_data;
	}

	return null;
}
TJ_Utils.prototype.scaleY = function(_target, _val)
{
	if(_target == undefined) return null;
	if(typeof(_target) == 'string') _target = document.getElementById(_target);

	var _transform_data;
	var _transform;

	if(_target.style.MozTransform) _transform_data = _target.style.MozTransform;
	if(_target.style.msTransform) _transform_data = _target.style.msTransform;
	if(_target.style.OTransform) _transform_data = _target.style.OTransform;
	if(_target.style.webkitTransform) _transform_data = _target.style.webkitTransform;

	if(_transform_data == undefined) _transform_data = '';

	if(_val == undefined)
	{
		if(_transform = _transform_data.match(/scaleY\([0-9\s\-\.]*\)/))
		{
			_transform = _transform[0].match(/[0-9\s\-\.]+/);
			return parseInt(_transform[0]);
		}
	}
	else
	{
		if(_transform_data.match(/scaleY\([0-9\s\-\.]*\)/))
		{
			_transform_data = _transform_data.replace(/scaleY\([0-9\s\-\.]*\)/, '');
		}

		_transform_data += 'scaleY(' + _val + ')';

		_target.style.MozTransform = _transform_data;
		_target.style.msTransform = _transform_data;
		_target.style.OTransform = _transform_data;
		_target.style.webkitTransform = _transform_data;
	}

	return null;
}
TJ_Utils.prototype.scale = function(_target, _val)
{
	if(_target == undefined) return null;
	if(typeof(_target) == 'string') _target = document.getElementById(_target);

	var _transform_data;
	var _transform;

	if(_target.style.MozTransform) _transform_data = _target.style.MozTransform;
	if(_target.style.msTransform) _transform_data = _target.style.msTransform;
	if(_target.style.OTransform) _transform_data = _target.style.OTransform;
	if(_target.style.webkitTransform) _transform_data = _target.style.webkitTransform;

	if(_transform_data == undefined) _transform_data = '';

	if(_val == undefined)
	{
		if(_transform = _transform_data.match(/scale\([0-9\s\-\.\,]*\)/))
		{
			_transform = _transform[0].match(/[0-9\s\-\.\,]+/);

			return _transform[0].split(',');
		}
	}
	else
	{
		if(_transform_data.match(/scale\([0-9\s\-\.\,]*\)/))
		{
			_transform_data = _transform_data.replace(/scale\([0-9\s\-\.\,]*\)/, '');
		}

		_transform_data += ' scale(' + _val + ',' + _val + ')';

		_target.style.MozTransform = _transform_data;
		_target.style.msTransform = _transform_data;
		_target.style.OTransform = _transform_data;
		_target.style.webkitTransform = _transform_data;
	}

	return null;
}

TJ_Utils.prototype.skewX = function(_target, _val)
{
	if(_target == undefined) return null;
	if(typeof(_target) == 'string') _target = document.getElementById(_target);

	var _transform_data;
	var _transform;

	if(_target.style.MozTransform) _transform_data = _target.style.MozTransform;
	if(_target.style.msTransform) _transform_data = _target.style.msTransform;
	if(_target.style.OTransform) _transform_data = _target.style.OTransform;
	if(_target.style.webkitTransform) _transform_data = _target.style.webkitTransform;

	if(_transform_data == undefined) _transform_data = '';

	if(_val == undefined)
	{
		if(_transform = _transform_data.match(/skewX\([0-9\s\-\.]*deg\)/))
		{
			_transform = _transform[0].match(/[0-9\s\-\.]+deg/);
			return parseInt(_transform[0]);
		}
	}
	else
	{
		if(_transform_data.match(/skewX\([0-9\s\-\.]*deg\)/))
		{
			_transform_data = _transform_data.replace(/skewX\([0-9\s\-\.]*deg\)/, '');
		}

		_transform_data += 'skewX(' + _val + 'deg)';

		_target.style.MozTransform = _transform_data;
		_target.style.msTransform = _transform_data;
		_target.style.OTransform = _transform_data;
		_target.style.webkitTransform = _transform_data;
	}

	return null;
}
TJ_Utils.prototype.skewY = function(_target, _val)
{
	if(_target == undefined) return null;
	if(typeof(_target) == 'string') _target = document.getElementById(_target);

	var _transform_data;
	var _transform;

	if(_target.style.MozTransform) _transform_data = _target.style.MozTransform;
	if(_target.style.msTransform) _transform_data = _target.style.msTransform;
	if(_target.style.OTransform) _transform_data = _target.style.OTransform;
	if(_target.style.webkitTransform) _transform_data = _target.style.webkitTransform;

	if(_transform_data == undefined) _transform_data = '';

	if(_val == undefined)
	{
		if(_transform = _transform_data.match(/skewY\([0-9\s\-\.]*deg\)/))
		{
			_transform = _transform[0].match(/[0-9\s\-\.]+deg/);
			return parseInt(_transform[0]);
		}
	}
	else
	{
		if(_transform_data.match(/skewY\([0-9\s\-\.]*deg\)/))
		{
			_transform_data = _transform_data.replace(/skewY\([0-9\s\-\.]*deg\)/, '');
		}

		_transform_data += 'skewY(' + _val + 'deg)';

		_target.style.MozTransform = _transform_data;
		_target.style.msTransform = _transform_data;
		_target.style.OTransform = _transform_data;
		_target.style.webkitTransform = _transform_data;
	}

	return null;
}
TJ_Utils.prototype.skew = function(_target, _val)
{
	if(_target == undefined) return null;
	if(typeof(_target) == 'string') _target = document.getElementById(_target);

	var _transform_data;
	var _transform;

	if(_target.style.MozTransform) _transform_data = _target.style.MozTransform;
	if(_target.style.msTransform) _transform_data = _target.style.msTransform;
	if(_target.style.OTransform) _transform_data = _target.style.OTransform;
	if(_target.style.webkitTransform) _transform_data = _target.style.webkitTransform;

	if(_transform_data == undefined) _transform_data = '';

	if(_val == undefined)
	{
		if(_transform = _transform_data.match(/skew\([0-9\s\-\.\,]*deg\)/))
		{
			_transform = _transform[0].match(/[0-9\s\-\.\,]+/);

			return _transform[0].split(',');
		}
	}
	else
	{
		if(_transform_data.match(/skew\([0-9\s\-\.\,]*deg\)/))
		{
			_transform_data = _transform_data.replace(/skew\([0-9\s\-\.\,]*deg\)/, '');
		}

		_transform_data += ' skew(' + _val + 'deg,' + _val + 'deg)';

		_target.style.MozTransform = _transform_data;
		_target.style.msTransform = _transform_data;
		_target.style.OTransform = _transform_data;
		_target.style.webkitTransform = _transform_data;
	}

	return null;
}

TJ_Utils.prototype.rotate = function(_target, _val)
{
	if(_target == undefined) return null;
	if(typeof(_target) == 'string') _target = document.getElementById(_target);

	var _transform_data;
	var _transform;

	if(_target.style.MozTransform) _transform_data = _target.style.MozTransform;
	if(_target.style.msTransform) _transform_data = _target.style.msTransform;
	if(_target.style.OTransform) _transform_data = _target.style.OTransform;
	if(_target.style.webkitTransform) _transform_data = _target.style.webkitTransform;

	if(_transform_data == undefined) _transform_data = '';

	if(_val == undefined)
	{	
		if(_transform = _transform_data.match(/rotate\([\-0-9]*deg\)/))
		{
			_transform = _transform[0].match(/[\-0-9]+/);
			return Math.floor(parseInt(_transform[0]));
		}
	}
	else
	{
		if(_transform_data.match(/rotate\([\-\.0-9]*deg\)/))
		{
			_transform_data = _transform_data.replace(/rotate\([\-\.0-9]*deg\)/, '');
		}
		_transform_data += 'rotate(' + Math.floor(_val) + 'deg)';

		_target.style.MozTransform = _transform_data;
		_target.style.msTransform = _transform_data;
		_target.style.OTransform = _transform_data;
		_target.style.webkitTransform = _transform_data;
	}

	return null;
}

TJ_Utils.prototype.origin = function(_target, _x, _y)
{
	if(_x == undefined) _x = 0;
	if(_y == undefined) _y = 0;
	_target.style.transformOrigin = _x + 'px ' + _y + 'px';
	_target.style.mozTransformOrigin = _x + 'px ' + _y + 'px';
	_target.style.oTransformOrigin = _x + 'px ' + _y + 'px';
	_target.style.msTransformOrigin = _x + 'px ' + _y + 'px';
	_target.style.webkitTransformOrigin = _x + 'px ' + _y + 'px';
}

TJ_Utils.prototype.releaseMemory = function (_target)
{
	if(typeof(_target) == 'string') _target = document.getElementById(_target);
	
	var _lists = _target.getElementsByTagName('*');
	for(var i = 0; i < _lists.length; i++)
		this.releaseMemory(_lists[i]);

	if(_target.parentNode) _target.parentNode.removeChild(_target);

	_target = null;
	_lists = null;
}

TJ_Utils.prototype.hitTest = function(_target, _x, _y, _adjx, _adjy, _error_size, _use_square, _stagewidth, _stageheight)
{
	if(typeof(_target) == 'string') _target = document.getElementById(_target);

	if(_adjx == undefined) _adjx = 0;
	if(_adjy == undefined) _adjy = 0;
	if(_error_size == undefined) _error_size = 1;
	if(_use_square == undefined) _use_square = true;
	if(_stagewidth == undefined) _stagewidth = 900;
	if(_stageheight == undefined) _stageheight = 650;
	
	var _imgs;
	var _simply_img = false;

	if(_target.tagName == 'DIV')
	{
		_imgs = _target.getElementsByTagName('IMG');
	}
	else if(_target.tagName == 'IMG')
	{
		_simply_img = true;
		_imgs = new Array();
		_imgs.push(_target);
	}
	
	var _cur_target = _target;

	var _transform_data;
	var _transform;

	var _rotate = 0;
	var _translatex = 0;
	var _translatey = 0;
	var _scalex = 1;
	var _scaley = 1;
	
	var _targets = new Array();
	var _target_obj;

	var _imgdata;

	while(_cur_target.id != 'content_area')
	{
		_target_obj = new Object();
		_target_obj.scalex = 1;
		_target_obj.scaley = 1;
		_target_obj.translationx = 0;
		_target_obj.translationy = 0;

		if(_cur_target.style.transform != undefined && _cur_target.style.transform != '') _transform_data = _cur_target.style.transform;
		else if(_cur_target.style.MozTransform != undefined) _transform_data = _cur_target.style.MozTransform;
		else if(_cur_target.style.msTransform != undefined) _transform_data = _cur_target.style.msTransform;
		else if(_cur_target.style.OTransform != undefined) _transform_data = _cur_target.style.OTransform;
		else if(_cur_target.style.webkitTransform != undefined) _transform_data = _cur_target.style.webkitTransform;
		
		//parse transform
		if(_transform_data)
		{
			if(_transform = _transform_data.match(/rotate\([\-0-9]*deg\)/))
			{
				_transform = _transform[0].match(/[\-0-9]+/);
				_rotate += parseInt(_transform[0]);
			}
			if(_transform = _transform_data.match(/scale\([0-9\-\,\.\s]+/))
			{
				_transform = _transform[0].match(/[0-9\-\.]+/g);
				
				if(!isNaN(_transform[0]) && !isNaN(_transform[1]))
				{				
					_scalex *= parseInt(_transform[0]);
					_scaley *= parseInt(_transform[1]);

					_target_obj.scalex = parseInt(_transform[0]);
					_target_obj.scaley = parseInt(_transform[1]);
				}
				else if(isNaN(_transform[0]) || isNaN(_transform[1]))
				{
					var _tmp_transform = (!isNaN(_transform[0]))? _transform[0] : _transform[1];
					_scalex *= parseInt(_tmp_transform);
					_scaley *= parseInt(_tmp_transform);

					_target_obj.scalex = parseInt(_tmp_transform);
					_target_obj.scaley = parseInt(_tmp_transform);
				}
				else
				{
					if(!isNaN(_transform[0])) _scalex *= parseInt(_transform[0]);
					if(!isNaN(_transform[1])) _scaley *= parseInt(_transform[1]);

					if(!isNaN(_transform[0])) _target_obj.scalex = parseInt(_transform[0]);
					if(!isNaN(_transform[1])) _target_obj.scaley = parseInt(_transform[1]);
				}
			}
			if(_transform = _transform_data.match(/translate\([0-9\s\-\,px]*\)/))
			{
				_transform = _transform[0].match(/[0-9\-]+/g);
				if(_transform[0]) _target_obj.translationx = parseInt(_transform[0]);
				if(_transform[1]) _target_obj.translationy = parseInt(_transform[1]);
			}
		}

		_target_obj.translationx += _cur_target.offsetLeft;
		_target_obj.translationy += _cur_target.offsetTop;
		_targets.push(_target_obj);

		_cur_target = _cur_target.parentNode;
	}
	
	var _cur_scale_x = 1;
	var _cur_scale_y = 1;
	while(_targets.length > 0)
	{
		_target_obj = _targets.pop();

		_translatex += _target_obj.translationx * _cur_scale_x;
		_translatey += _target_obj.translationy * _cur_scale_y;

		_cur_scale_x *= _target_obj.scalex;
		_cur_scale_y *= _target_obj.scaley;
	}

	if(_rotate != 0)
	{
		_translatex += _adjx;
		_translatey += _adjy;
	}

	var _canvas = document.createElement('CANVAS');
	_canvas.width = _stagewidth;
	_canvas.height = _stageheight;
	var _ctx = _canvas.getContext('2d');
	//_ctx.fillRect(0, 0, 900, 650);
	_ctx.translate(_translatex,_translatey);
	_ctx.scale(_scalex, _scaley);
	_ctx.rotate(_rotate*Math.PI/180);
	
	for(var i = 0; i < _imgs.length; i++)
	{	
		if(_use_square == true || _imgs[i].src.match('http://img') || navigator.userAgent.indexOf('Firefox') != -1)
		{
			if(_simply_img)
				_ctx.fillRect(0, 0, _imgs[i].offsetWidth, _imgs[i].offsetHeight);	
			else
				_ctx.fillRect(_imgs[i].offsetLeft, _imgs[i].offsetTop, _imgs[i].offsetWidth, _imgs[i].offsetHeight);
		}
		else
		{
			_ctx.drawImage(_imgs[i], _imgs[i].offsetLeft, _imgs[i].offsetTop);
		}
	}
	//document.body.appendChild(_canvas);
	var _imgdata;
	if(_error_size == 1)
	{
		_imgdata = _ctx.getImageData(_x,_y,1,1); //get target pixel info
		if(_imgdata.data[3] > 0)
			return true;
		else 
			return false;
	}
	else
	{
		_imgdata = _ctx.getImageData(_x - Math.floor(_error_size / 2), _y - Math.floor(_error_size / 2), Math.floor(_error_size / 2), Math.floor(_error_size / 2));
		
		for(i = 0; i < _imgdata.data.length; i++)
		{
			if(i % 4 == 3 && _imgdata.data[i] > 0) return true;
		}
		return false;
	}
}

TJ_Utils.prototype.hitTestFromEvent = function(_evt, _targets, _offsets, _error_size, _full_search)
{
	if(!_targets) return false;
	
	if(_error_size == undefined) _error_size = 0;
	if(_full_search == undefined) _full_search = false;
	if(_offsets == undefined) _offsets = nodeOffsets('content_area');
	
	var _pos = pagePosition(_evt, _offsets);
	
	var _returns = new Array();
	
	for(var i = 0; i < _targets.length; i++)
	{
		var _computedstyle = window.getComputedStyle(_targets[i]);
		if(_pos.x >= parseInt(_computedstyle.left) - _error_size &&
			_pos.x <= parseInt(_computedstyle.left) + parseInt(_computedstyle.width) + _error_size &&
			_pos.y >= parseInt(_computedstyle.top) - _error_size &&
			_pos.y <= parseInt(_computedstyle.top) + parseInt(_computedstyle.height) + _error_size)
		{
			if(!_full_search) return _targets[i];
			_returns.push(_targets[i]);
		}
	}
	
	if(_returns.length > 0) return _returns;
	else return false;
}

TJ_Utils.prototype.useStdChar = function(_target)
{
	if(typeof(_target) != 'string') _target = _target.toString();

	var _split = _target.split('');
	var _adjusted = '';

	for(var i = 0; i < _split.length; i++)
	{
		if(_split[i] == '1') _adjusted += '&dagger;';
		else if(_split[i] == '4') _adjusted += '&Dagger;';
		else if(_split[i] == 'J') _adjusted += '&#128;';
		else if(_split[i] == 'I') _adjusted += '&#163;';
		else _adjusted += _split[i];
	}

	return _adjusted;
}

TJ_Utils.prototype.bezierMotion = function(_points, _cnt)
{
	var _motions = new Array();
	var _prev_points, _new_points;
	var _progress;

	if(_points.length <= 2) return _points;

	for(var i = 0; i < _cnt; i++)
	{
		_new_points = new Array();
		_prev_points = new Array();
		for(var j = 0; j < _points.length; j++)
			_prev_points.push(_points[j]);
		
		_progress = i / (_cnt - 1);

		while(_new_points.length != 2)
		{
			_new_points = new Array();
			for(j = 0; j < _prev_points.length - 1; j++)
			{
				_dx = _prev_points[j+1][0] - _prev_points[j][0];
				_dy = _prev_points[j+1][1] - _prev_points[j][1];

				_new_points.push([_prev_points[j][0] + (_progress * _dx), _prev_points[j][1] + (_progress * _dy)]);
			}

			_prev_points = new Array();
			for(j = 0; j < _new_points.length; j++)
				_prev_points.push(_new_points[j]);
		}	

		_dx = _new_points[1][0] - _new_points[0][0];
		_dy = _new_points[1][1] - _new_points[0][1];
		_motions.push([_new_points[0][0] + (_progress * _dx), _new_points[0][1] + (_progress * _dy)]);
	}

	return _motions;
}

TJ_Utils.prototype.findCSS = function(_target)
{
	if(!_target) return;
	
	_target = _target.toString();
	
	for(var prop in document.styleSheets)
	{
		var _rule; 
		
		if(document.styleSheets[prop].cssRules)
			_rule = document.styleSheets[prop].cssRules;
		else if(document.styleSheets[prop].rules)
			_rule = document.styleSheets[prop].rules;
		
		if(_rule)
		{
			for(var prop2 in _rule)
			{
				if(_rule[prop2].selectorText == _target)
					return _rule[prop2];
			}
		}
	} 
	
	return;
}

TJ_Utils.prototype.turnOffSelectable = function(_target)
{
	if(typeof(_target) == 'string') _target = document.getElementById(_target);
	if(!_target) return;
	
	_target.setAttribute('unselectable', 'on');
	_target.setAttribute('draggable', false);
	if(_target.tagName == 'IMG') _target.style.pointerEvents = 'none';
	
	var _lists = _target.getElementsByTagName('*');
	for(var i = 0; i < _lists.length; i++)
		this.turnOffSelectable(_lists[i]);	
}

TJ_Utils.prototype.ping = function(_callback)
{
	var _img  = new Image();
	var _timeout = setTimeout(function(){
		if(_callback) _callback(-1);
	}, 30000);
	
	_img.onload = function(){
		if(_timeout) clearTimeout(_timeout);
		if(_callback) _callback(new Date().getTime() - this.starttime);
	};
	_img.onerror = function(){
		if(_timeout) clearTimeout(_timeout);
		if(_callback) _callback(-1);
	};
	
	_img.starttime = new Date().getTime();
	_img.src = IMGHOST + '/blank.png?' + new Date().getTime();
}

////////////////////////////////////////////////////////////////////////////
/* global addListener, Math, window */
/* jshint unused:false */
var MediaProgressTracker = (function () {
    "use strict";

    function MediaProgressTracker(options) {
        this.options = this.getDefaultOptions();
        this.setOptions(options);
        this.mediaObject = null;
        this.interval = null;
        this.tracking = false;
        this.heatMap = {};
        this.heatMapSize = 0;
    }


    MediaProgressTracker.prototype = {
        constructor: MediaProgressTracker,
        getDefaultOptions: function () {
            return {
                completionThreshold: 0.8,
                progressInterval: 500
            };
        },
        setOptions: function (options) {
            for (var index in options) {
                this.options[index] = options[index];
            }
        },
        setMediaObject: function (mediaObject) {
            this.mediaObject = mediaObject;
            if (!isFinite(this.mediaObject.getDuration()) || parseInt(this.mediaObject.getDuration()) === 0) {
                addListener(this.mediaObject, 'loaded', this.initHeatMap.bind(this));
            } else {
                this.initHeatMap();
            }
        },
        initHeatMap: function () {
            var duration = parseInt(this.mediaObject.getDuration()) * 1000;

            this.heatMapSize = Math.floor(duration / this.options.progressInterval);

            for (var i = 0; i < this.heatMapSize; i++) {
                this.heatMap[i * this.options.progressInterval] = 0;
            }
        },
        trackMedia: function () {
            if (this.tracking) {
                return;
            }

            this.tracking = true;

            addListener(this.mediaObject, 'complete', function () {
                window.clearInterval(this.interval);
                this.tracking = false;
            }.bind(this));

            this.interval = window.setInterval(function () {
                var currentPosition = Math.round(parseFloat(this.mediaObject.getPosition()) * 1000 / this.options.progressInterval) * this.options.progressInterval;
                if (this.mediaObject.playing) {
                    if(!isFinite(this.heatMap[currentPosition])) {
                        this.heatMap[currentPosition] = 1;
                    } else {
                        this.heatMap[currentPosition] ++;
                    }
                }
            }.bind(this), this.options.progressInterval);
        },
        getCompletedPercentage: function () {
            var nonEmptyBins = 0;
            for (var bin in this.heatMap) {
                if (this.heatMap[bin] !== 0) {
                    nonEmptyBins++;
                }
            }
            return nonEmptyBins / this.heatMapSize;
        }
    };

    return MediaProgressTracker;
}());

////////////////////////////////////////////////////////////////////////////
function BPBook( divLeftPage, divRightPage, centerShadow, pageFlipLeftPageCanvas, pageFlipRightPageCanvas, centerShadowFlipAnimation, borderShadowFlipAnimation, reflectionLightFlipAnimation, leftCoverDiv, rightCoverDiv){
	this.LeftPageDiv		   = divLeftPage;
	this.rightPageDiv		   = divRightPage;
	this.leftPageCanvas	  	   = document.getElementById("leftPageDivCanvas"); // leftPageCanvas;
	this.rightPageCanvas  	   = document.getElementById("rightPageDivCanvas");  //rightPageCanvas;
	this.centerShadow 		   = centerShadow;
	this.leftCoverDiv		   = leftCoverDiv; //QAV-4334
	this.rightCoverDiv		   = rightCoverDiv;
	this.leftCoverCanvas	   = document.getElementById("leftCoverDivCanvas");
	this.rightCoverCanvas	   = document.getElementById("rightCoverDivCanvas");

	this.temporalLeftIndex = 0;
	this.temporalRightIndex = 0;

	this.disablePageFlip	   = false;
	this.currentLeftPageIndex  = -1;
	this.currentLeftPage       = null;
	this.currentRightPage      = null;
	this.pages 			  	   = new Array();
	this.animations		  	   = new Array();
	this.animationsForCancel   = new Array();
	this.totalPages 		   = null;
	this.isPlaying			   = false;
	this.updateMethod          = null;

	this.coverColor			   = "#FFFFFF";
	this.pageColor			   = "#FFFFFF";

	this.pageFlipAnimator 	= new BPPageFlipAnimator(this, pageFlipLeftPageCanvas, pageFlipRightPageCanvas, centerShadowFlipAnimation, borderShadowFlipAnimation, reflectionLightFlipAnimation);
	this.audioProgress 		= new BPAudioProgress();
	this.generalUI 			= new BPGeneralUILoader();

	this.currentPageFlip	= "NONE"; //"OPEN_FRONT", "CLOSE_FRONT", "CLOSE_BACK", "OPEN_BACK";

	this.isDraggingSlider = false;

	var context = this;
	this.pageFlipAnimator.setBookPagesCallBack = function(){context.setCurrentPages();};
	this.initializePages();

	this.preRenderCenterShadowsGradients();
	this.isMouseUpEvent = false;
	this.hasCanceledPageFlip = false;
	this.progressBeforePageflip = 0.0;

	//for correctly managing animations
	this.allAnimations = [];
}

BPBook.prototype.initializePages = function()
{
	var context = this;
	var pagesJSONInfo = BookJSON.getInstance().getPages();
  if (isNaN(bookJSON.book_color) && bookJSON.book_color.toUpperCase() === 'FFFFFF') {
    this.coverColor = 'BAE9FF';
  } else if (!isNaN(bookJSON.book_color)) {
    this.coverColor = '' + bookJSON.book_color;
  } else {
    this.coverColor = bookJSON.book_color;
  }
	this.pageColor = bookJSON.book_color;

	var pageIndex = 0;

	for(var i = 0; i < pagesJSONInfo.length; i++){
		var newPage = new BPPage(pagesJSONInfo[i], this);
		newPage.pageIndex = pageIndex;
		this.pages.push(newPage);
		newPage.onPauseAnimationCallBack = function(){ context.pauseAnimations(); };
		pageIndex++;
	}
	this.totalPages = this.pages.length;
	if(!BookJSON.getInstance().getBackCoverEnabled()){
		var newPage = new BPPage(null, this);
		newPage.pageIndex = pageIndex;
		this.pages.push(newPage);
	}

	this.pages[0].isCoverPage       			  		= true;
	this.pages[this.pages.length - 1].isCoverPage 		= true;
	this.pages[this.pages.length - 2].islastBeforeCover = true;
	this.pages[1].isInsideCoverPage 			  		= true;
	this.pages[this.pages.length - 2].isInsideCoverPage = true;
	this.pages[1].renderUserName				  		= true;

	this.audioProgress.totalPages = this.pages.length;
};

BPBook.prototype.renderCover = function (isRightCover) {
  var canvas = isRightCover ? this.rightCoverCanvas : this.leftCoverCanvas;
  var ctx = canvas.getContext("2d");
  var image = isRightCover ? book.generalUI.coverBackgroundImage : book.generalUI.coverBackgroundImageFlipped;

  var xCoverDiff = isRightCover ? 2 : -7 ;
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.drawImage(image, 10+xCoverDiff, 9, 392, 540);
};

BPBook.prototype.hideBookAnimations = function () {
	if(hasCanceled)
		this.animations = this.animationsForCancel;

	for(i = 0; i<this.animations.length; i++){
		this.animations[i].hideAnimation();
	}
	this.animationsForCancel = this.animations; //store array in case of cncel
	this.animations = new Array(); //clearing array.
};

BPBook.prototype.renderCenter = function () {
	var centerImage = book.generalUI.coverBackgroundImageCenter;
	var centerImageW = 30;
	var centerImageH = 551;
	var ctxC = centerCoverBackgroundCanvas.getContext("2d");
	centerCoverBackground.style.background = "url("+book.generalUI.coverBackgroundImageCenter.src+") ";
};

BPBook.prototype.updateCoverPosition = function () {

	divLeftPageCanvas.className = "containerLeft";
	divRightPageCanvas.className = "containerRight";

	var rangeCover = 10;
	var l = this.pages.length/rangeCover;
	bookMoveLeft = 0.0+(this.temporalLeftIndex/l);
	bookMoveRight = rangeCover/2 - (this.temporalLeftIndex/l);
};



BPBook.prototype.updateCenterCover = function (_currentStatus) {

	book.rightCoverDiv.style.display = "none";
	book.leftCoverDiv.style.display = "none";

	switch(_currentStatus){
		case "CLOSE_FRONT":
			this.rightCoverDiv.style.display = "block";
			this.LeftPageDiv.style.top = "-10px";
			this.LeftPageDiv.style.left = "380px";
			this.rightPageDiv.style.top = "-10px";
			leftBottomBorder.style.display = "none";
			leftSideBorder.style.display = "none";
			this.centerShadow.style.opacity = 0;
			//if(book.isDraggingSlider) //sets cover transform correctly
				this.setCoverCenterClosedFront(0.0);
			break;
		case "CLOSE_BACK":
			this.leftCoverDiv.style.display = "block";
			this.rightPageDiv.style.left = "398px";
			this.rightPageDiv.style.top = "-10px";
			this.LeftPageDiv.style.top = "-10px";
			this.LeftPageDiv.style.zIndex = "2";
			rightBottomBorder.style.display = "none";
			rightSideBorder.style.display = "none";
			this.centerShadow.style.opacity = 0;
			//if(book.isDraggingSlider) //sets cover transform correctly
				this.setCoverCenterClosedBack(1);
			break;
		case "OPEN_FRONT":
			this.LeftPageDiv.style.top = "-10px";
			this.rightPageDiv.style.top = "-10px";
			this.leftCoverDiv.style.top = "-10px";
			this.rightCoverDiv.style.top = "0px";
			this.LeftPageDiv.style.left = "0px";
			this.rightCoverDiv.style.left = "398px";
			leftBottomBorder.style.display = "block";
			leftSideBorder.style.display = "block";
			rightBottomBorder.style.display = "block";
			rightSideBorder.style.display = "block";
			BookUtils.instance.applyTrasformFinishCoverElement(this.leftCoverDiv,-2);
			BookUtils.instance.applyTrasformFinishCoverElement(this.LeftPageDiv,-2);
			book.rightCoverDiv.style.display = "block";
			book.leftCoverDiv.style.display = "block";
			BookUtils.instance.applyTrasformCoverCenterElement(centerCoverBackgroundCanvas,"FirstBeforeCover",1,BookConstants.SKEW_FACTOR_CENTER);
			BookUtils.instance.applyTrasformCoverCenterElement(centerCoverBackgroundShadowCanvas,"FirstBeforeCover",1,BookConstants.SKEW_FACTOR_CENTER_SHADOW);
			this.centerShadow.style.opacity = 0.30;
			this.setCoverCenterOpen();
			updatePageWeight();
			book.pageFlipAnimator.bottomRightShadow.style.height = BookConstants.FACTOR_HEIGHT + 530 + "px";
			break;
		case "OPEN_BACK":
			this.LeftPageDiv.style.top = "-10px";
			this.rightPageDiv.style.top = "-10px";
			this.rightCoverDiv.style.top = "-10px";
			this.leftCoverDiv.style.top = "0px";
			this.leftCoverDiv.style.zIndex = "0";
			this.LeftPageDiv.style.left = "0px";
			this.rightCoverDiv.style.left = "398px";
			leftBottomBorder.style.display = "block";
			leftSideBorder.style.display = "block";
			rightBottomBorder.style.display = "block";
			rightSideBorder.style.display = "block";
			BookUtils.instance.applyTrasformFinishCoverElement(this.rightCoverDiv,2);
			BookUtils.instance.applyTrasformFinishCoverElement(this.rightPageDiv,2);
			book.leftCoverDiv.style.display = "block";
			book.rightCoverDiv.style.display = "block";
			BookUtils.instance.applyTrasformCoverCenterElement(centerCoverBackgroundCanvas,"LastBeforeCover",1,BookConstants.SKEW_FACTOR_CENTER);
			BookUtils.instance.applyTrasformCoverCenterElement(centerCoverBackgroundShadowCanvas,"LastBeforeCover",1,BookConstants.SKEW_FACTOR_CENTER_SHADOW);
			this.centerShadow.style.opacity = 0.30;
			this.setCoverCenterOpen();
			updatePageWeight();
			break;
		default:
			book.rightCoverDiv.style.display = "block";
			book.leftCoverDiv.style.display = "block";
			this.leftCoverDiv.style.zIndex = "0";
			this.rightCoverDiv.style.zIndex = "0";
			this.rightCoverDiv.style.left = "398px";
			this.LeftPageDiv.style.left = "0px";
			leftBottomBorder.style.display = "block";
			leftSideBorder.style.display = "block";
			rightBottomBorder.style.display = "block";
			rightSideBorder.style.display = "block";
			this.centerShadow.style.opacity = 0.30;
			this.setCoverCenterOpen();
			updatePageWeight();
			break;
	}
};



BPBook.prototype.load = function(onLoadingCompleteCallback)
{
	this.onLoadingCompleteCallback = onLoadingCompleteCallback;
	this.loadedPagesCount 		   = 0;
	var context 	 	  		   = this;

	this.generalUI.load(function(sender){
    context.onGeneralUILoadingComplete(sender);
  });
	this.audioProgress.load(function(sender){
    context.onAudioLoadingComplete(sender);
  });

	for(var i = 0; i < this.pages.length; i++)
		this.pages[i].load(function(sender) {
      context.onPageLoadingComplete(sender);
    });

	this.updateMethod = function() {
    context.onInterval();
  };
	setInterval(this.updateMethod, 1000/45);//removing change to 10 FPS
};

BPBook.prototype.onAnimationFrame = function()
{
};

BPBook.prototype.onInterval = function()
{
	this.update();
};

BPBook.prototype.setBookContainerPosition = function (_pos) { //pos is an int in pixels.
	bookDiv.style.left =  _pos + "px";
};

BPBook.prototype.update = function()
{
	if(this.isPlaying)
	{
		this.audioProgress.update();
		book.hasCanceledPageFlip = false;
		//sync book position
		if(book.isDraggingSlider){
			if(currentTime < book.pages[book.pages.length-2].pageJSONInfo.breakpos && currentTime > book.pages[0].pageJSONInfo.breakpos)
				book.forceOpenedPosition();
		} else {
			var currentTime;
			if(this.audioProgress.isUsingSlowAudio){
				hud.updateProgressTime(this.audioProgress.progress * this.audioProgress.getSlowAudioDuration() , this.audioProgress.getSlowAudioDuration()- 1);
				currentTime = this.audioProgress.progress * this.audioProgress.getSlowAudioDuration();
			}else{
				hud.updateProgressTime(this.audioProgress.audioPosition, this.audioProgress.soundPlayer.getDuration() - 1);
				currentTime = this.audioProgress.audioPosition;
			}
		}

		this.updatePages(this.audioProgress.audioPosition);

		/*
		 *this is to sync the book with the audio
		 */
		var index = this.audioProgress.currentPageBreakIndex * 2;
		if(!BookUtils.instance.approximately(index, this.currentLeftPageIndex + 1, 2))
		{
			this.goToPages( index - 1, index );
		}
	}
	this.pageFlipAnimator.update();//Must be updated always

};

BPBook.prototype.onAudioLoadingComplete = function()
{
	this.checkForLoadingCompleted();
};

BPBook.prototype.onPageLoadingComplete = function()
{
	this.loadedPagesCount++;
	this.checkForLoadingCompleted();
};

BPBook.prototype.onGeneralUILoadingComplete = function()
{
	this.checkForLoadingCompleted();
};

BPBook.prototype.checkForLoadingCompleted = function()
{
	if(this.loadedPagesCount == this.pages.length && this.audioProgress.isAudioProgressLoaded && this.generalUI.isGeneralUILoaded)
	{
		this.goToPage(-1);
		this.onLoadingCompleteCallback(this);
	}
};

BPBook.prototype.play = function()
{
	if(!this.isPlaying)
	{
		book.stopEventAnimations();
		book.stopAllAnimations();

		this.audioProgress.play();

		if(this.currentRightPage != null){
			this.currentRightPage.playAnimations();
			this.currentRightPage.removeOnClickAnimation();
		}

		if(this.currentLeftPage != null){
			this.currentLeftPage.playAnimations();
			this.currentLeftPage.removeOnClickAnimation();
		}

		this.isPlaying = true;
	}
};

BPBook.prototype.leftPageHasAnimation = function () {
	if (this.currentLeftPage == null)
		return false;
	return this.currentLeftPage.hasAnimation();
};

BPBook.prototype.rightPageHasAnimation = function () {
	if (this.currentRightPage == null)
		return false;
	return this.currentRightPage.hasAnimation();
};

BPBook.prototype.pause = function()
{
	if(this.isPlaying)
	{
		this.audioProgress.pause();

		this.pauseAnimations();

		this.isPlaying = false;
	}
};

BPBook.prototype.pauseAnimations = function()
{
	if(this.currentRightPage != null){
		this.currentRightPage.pauseAnimations();
		this.currentRightPage.AddOnClickAnimation();
	}

	if(this.currentLeftPage != null){
		this.currentLeftPage.pauseAnimations();
		this.currentLeftPage.AddOnClickAnimation();
	}
};

BPBook.prototype.stopEventAnimations = function()
{
	if(this.currentRightPage != null)
		this.currentRightPage.stopEventAnimations();

	if(this.currentLeftPage != null)
		this.currentLeftPage.stopEventAnimations();
};

BPBook.prototype.goToPages = function(leftPageIndex, rightPageIndex)
{
	if(!this.disablePageFlip)
		this.startPageFlipAnimations(leftPageIndex, rightPageIndex);

	this.temporalLeftIndex = leftPageIndex;
	this.temporalRightIndex = rightPageIndex;
	updateBorders( (leftPageIndex + rightPageIndex) /2 );
	this.setCurrentPages();
};

BPBook.prototype.forceClosedPosition = function (_isFront, override) {
	var closedFrontPosition = -142;
	var backClosePosition = 220;
	if(_isFront && (book.currentLeftPageIndex <1 || override)){
		book.setBookContainerPosition(closedFrontPosition);
		book.updateCenterCover("OPEN_FRONT");
		book.updateCenterCover("CLOSE_FRONT");
			book.setClosedFrontShadow();
			book.removeAllAnimations();
			if(book.currentRightPage != null)
			book.currentRightPage.renderBordersCover(book.rightCoverCanvas,true,true);
	} else {
		if(book.currentLeftPageIndex > book.pages.length-1 || override){
			book.setBookContainerPosition(backClosePosition);
			book.updateCenterCover("OPEN_BACK");
			book.updateCenterCover("CLOSE_BACK");
				book.setClosedBackShadow();
				book.removeAllAnimations();
				if(book.currentLeftPage != null)
				 	book.currentLeftPage.renderBordersCover(book.leftCoverCanvas,false,true);
		}
	}
};

BPBook.prototype.forceOpenedPosition = function () {

		if(book.pageFlipAnimator.isAnimating)
			return;
		var openPosition = 52;
		book.setBookContainerPosition(openPosition);
		book.updateCenterCover("OPEN");
		book.setOpenedShadow();
};

BPBook.prototype.setOpenedShadow = function () {
	book.pageFlipAnimator.bottomLeftShadow.className = "bottomLeftShadow open";
	book.pageFlipAnimator.bottomRightShadow.className = "bottomRightShadow open";

};

BPBook.prototype.setClosedBackShadow  = function () {
	book.pageFlipAnimator.bottomLeftShadow.className = "bottomLeftShadow lastCover";
	book.pageFlipAnimator.bottomRightShadow.className = "bottomRightShadow lastCover";
};

BPBook.prototype.setClosedFrontShadow  = function () {
	book.pageFlipAnimator.bottomLeftShadow.className = "bottomLeftShadow front";
	book.pageFlipAnimator.bottomRightShadow.className = "bottomRightShadow front";
};


var openCenterLeft = 393;
var openCenterWidth = 18;
var openCenterHeight = 539;
//
var closedFrontLeft = 400;
var closedFrontWidth = 14;
var closedFrontHeight = 545;
var closedFrontTop = 2.5;
var closedFrontSkewValue = 16;
//back
var closedBackLeft = 393;
var closedBackWidth = 3;
var closedBackHeight = 544;
var closedBackTop = 4;
var closedBackSkewValue = -20;

var frontCoverSkewLimit = (25);
var backCoverSkewLimit = (25)*-1;


BPBook.prototype.setCoverCenterClosedFront = function (_openProgress) {
	centerCoverBackground.style.left = Math.abs(closedFrontLeft-openCenterLeft)*(_openProgress)*-1 + closedFrontLeft - 1.5 + "px";
	centerCoverBackground.style.width = Math.abs(closedFrontWidth-openCenterWidth)*(_openProgress) + closedFrontWidth + 2.5  + "px";
	centerCoverBackground.style.height = Math.abs(closedFrontHeight-openCenterHeight)*(_openProgress)*-1 + _openProgress*3 + closedFrontHeight + "px";
	BookUtils.instance.applyTrasformBeforeCoverElement(centerCoverBackground, Math.abs(closedFrontSkewValue-frontCoverSkewLimit)*(_openProgress) + closedFrontSkewValue  );
	centerCoverBackground.style.top = closedFrontTop + _openProgress*1 + "px";
	if(_openProgress>= 0.999){
		this.pageFlipAnimator.setBottomShadowOnOpenBook("front");
		this.pageFlipAnimator.bottomLeftShadow.style.opacity = ((_openProgress-0.5)*2);
	}  else {
		this.pageFlipAnimator.setBottomShadowOnCloseBook("front");
		centerCoverBackgroundShadowCanvas.className = "centerCoverBackgroundShadowCanvas close front";
	}
};

BPBook.prototype.setCoverCenterClosedBack = function (_openProgress) {
	//if(!_openProgress) _openProgress = 1;
	centerCoverBackground.style.left = Math.abs(closedBackLeft-openCenterLeft)*(_openProgress)*-1 + closedBackLeft + "px";
	centerCoverBackground.style.width = Math.abs(closedBackWidth-openCenterWidth)*(_openProgress)*-1 + (openCenterWidth+4) + "px"; //this already works as expected
	centerCoverBackground.style.height = Math.abs(closedBackHeight-openCenterHeight)*(_openProgress) + openCenterHeight + "px";
	BookUtils.instance.applyTrasformBeforeCoverElement(centerCoverBackground, Math.abs(closedBackSkewValue-backCoverSkewLimit)*(_openProgress) + closedBackSkewValue  );
	centerCoverBackground.style.top = closedBackTop + (_openProgress)*-1 + "px";
	if(_openProgress<= 0.009){ //we can use this to control the shadow opacity, giving the transition a good looking feel.
		this.pageFlipAnimator.setBottomShadowOnOpenBook("back");
		this.pageFlipAnimator.bottomRightShadow.style.opacity = (((0.5-_openProgress))*2);
	} else {
		this.pageFlipAnimator.setBottomShadowOnCloseBook("back");
		centerCoverBackgroundShadowCanvas.className = "centerCoverBackgroundShadowCanvas close back";
	}
};


BPBook.prototype.setCoverCenterOpen = function () {
	centerCoverBackground.style.left = openCenterLeft + "px";
    centerCoverBackground.style.width = openCenterWidth + "px";
    centerCoverBackground.style.height = openCenterHeight + "px";
    this.pageFlipAnimator.setBottomShadowOnOpenBook();
};


BPBook.prototype.updateBookPosition = function (_openProgress) { //_openProgress is the % value of the open cover.

	var closedFrontPosition = -142;
	var openPosition = 52;
	var backClosePosition = 237;
	var openToFrontDiff = Math.abs(openPosition - closedFrontPosition);
	var openToBackDiff = Math.abs(openPosition - backClosePosition);
	var shadowMaxOpacity = .3;
	var shadowMinOpacity = 0;

	bookDiv.className = bookDiv.className.replace(/bookResizeTransition/g, "").replace(/ignoreTransitions/g, "");
	bookDiv.className += " ignoreTransitions";
	switch(this.currentPageFlip){
		case "OPEN_FRONT":
		case "CLOSE_FRONT": //closed FRONT
			book.setBookContainerPosition( ((_openProgress*openToFrontDiff)+closedFrontPosition) );
			book.centerShadow.style.opacity = ((_openProgress-0.5)*shadowMaxOpacity*2);
			this.setCoverCenterClosedFront(_openProgress);

		break;
		case "OPEN_BACK": //closed BACK
		case "CLOSE_BACK":
			book.setBookContainerPosition( ((_openProgress*openToBackDiff)+openPosition) );
			book.centerShadow.style.opacity = (((0.5-_openProgress))*shadowMaxOpacity*2);
			this.setCoverCenterClosedBack(_openProgress);


		break;
		case "NONE":
		default:
			book.setBookContainerPosition(openPosition);
			book.centerShadow.style.opacity = shadowMaxOpacity;
			this.setCoverCenterOpen();
		break;
	}
	bookDiv.className = bookDiv.className.replace(/ignoreTransitions/g, "");
};

BPBook.prototype.setCurrentPages = function()
{
	var leftPageIndex = this.temporalLeftIndex;
	var rightPageIndex = this.temporalRightIndex;
	var targetLeftPage = leftPageIndex > -1 ? this.pages[leftPageIndex] : null;
	var targetRightPage = rightPageIndex < this.pages.length ? this.pages[rightPageIndex] : null;
	this.setCurrentLeftPage(targetLeftPage);
	this.setCurrentRightPage(targetRightPage);
	if(this.currentLeftPage)	this.currentLeftPage.updateAnimations(0);
	if(this.currentRightPage)	this.currentRightPage.updateAnimations(0);
	this.currentLeftPageIndex = leftPageIndex;
};

BPBook.prototype.startPageFlipAnimations = function(leftPageIndex, rightPageIndex)
{
	if(BookConstants.PAGE_FLIP_ENABLED)
	{
		book.stopAllAnimations();
		//move the book according to which page is open.
		this.currentPageFlip = "NONE"; //resets value
		if(this.currentLeftPageIndex < leftPageIndex){ //going left.
			if(leftPageIndex == 1 && rightPageIndex == 2) //Going from cover to first page
				this.currentPageFlip = "OPEN_FRONT";

			if(leftPageIndex == this.pages.length - 1 && rightPageIndex == this.pages.length) //Going from last page to cover
				this.currentPageFlip = "CLOSE_BACK";
		} else {
			if(leftPageIndex == -1 && rightPageIndex == 0) //Going from first page to cover
				this.currentPageFlip = "CLOSE_FRONT";

			if(leftPageIndex == this.pages.length - 3 && rightPageIndex == this.pages.length - 2) //Going from last page to cover
				this.currentPageFlip = "OPEN_BACK";
		}

		if(this.currentLeftPageIndex < leftPageIndex)//Going to left
		{
			if(leftPageIndex == 1 || //Going from cover to first page
		  	   leftPageIndex == this.pages.length - 1) //Going from last page to cover
			{
				this.pageFlipAnimator.lastPageModifier = false;
				this.pageFlipAnimator.startPageFlip(this.currentLeftPage, this.currentRightPage, "Left", "Cover", this.currentPageFlip, leftPageIndex, this.pages.length);
			}
			else if( leftPageIndex == this.pages.length - 3)
			{
				this.pageFlipAnimator.startPageFlip(this.currentLeftPage, this.currentRightPage, "Left", "LastBeforeCover", this.currentPageFlip, leftPageIndex, this.pages.length);
			}
			else if(leftPageIndex == 3){
				this.pageFlipAnimator.startPageFlip(this.currentLeftPage, this.currentRightPage, "Left", "FirstBeforeCover", this.currentPageFlip, leftPageIndex, this.pages.length);
			}
			else{
				this.pageFlipAnimator.startPageFlip(this.currentLeftPage, this.currentRightPage, "Left", "Normal", this.currentPageFlip, leftPageIndex, this.pages.length);
			}
		}
		else if(this.currentLeftPageIndex > leftPageIndex)//Going to right
		{
			if(this.currentLeftPageIndex == 1 || //Going from cover to inside cover page
		   	   this.currentLeftPageIndex == this.pages.length - 1) //Going from last page to cover
			{
				this.pageFlipAnimator.lastPageModifier = true;
				this.pageFlipAnimator.startPageFlip(this.currentLeftPage, this.currentRightPage, "Right", "Cover", this.currentPageFlip,leftPageIndex, this.pages.length);
			}
			else if( this.currentLeftPageIndex == this.pages.length - 3)
			{
				this.pageFlipAnimator.startPageFlip(this.currentLeftPage, this.currentRightPage, "Right", "LastBeforeCover", this.currentPageFlip, leftPageIndex, this.pages.length);
			}
			else if(this.currentLeftPageIndex == 3){
				this.pageFlipAnimator.startPageFlip(this.currentLeftPage, this.currentRightPage, "Right", "FirstBeforeCover", this.currentPageFlip, leftPageIndex, this.pages.length);
			}
			else
			{
				this.pageFlipAnimator.startPageFlip(this.currentLeftPage, this.currentRightPage, "Right", "Normal", this.currentPageFlip, this.currentLeftPageIndex, this.pages.length);
			}
		}
	}
};

BPBook.prototype.removeAllAnimations = function () {
	for(var i = 0; i<this.pages.length; i++){
		this.pages[i].hideAnimations();
	}
};

BPBook.prototype.stopAllAnimations = function () {
	for(var i = 0; i<this.pages.length; i++){
		this.pages[i].stopAnimations();
	}
};

BPBook.prototype.removeLeftAnimations = function () {
	for(var i = 0; i<this.pages.length; i++){
		if(!this.pages[i].isRightPageCanvas)
			this.pages[i].hideAnimations();
	}
};

BPBook.prototype.removeRightAnimations = function () {
	for(var i = 0; i<this.pages.length; i++){
		if(this.pages[i].isRightPageCanvas)
			this.pages[i].hideAnimations();
	}
};

BPBook.prototype.setCurrentLeftPage = function(leftPage)
{
	if(leftPage != null)
	{
		leftPage.renderToCanvas(this.leftPageCanvas, this.LeftPageDiv, false);
		if(leftPage.isInsideCoverPage || leftPage.isCoverPage)
			leftPage.forcedRenderToCanvas(this.leftPageCanvas, this.LeftPageDiv, false);
	}
	else
	{
		//noinspection SillyAssignmentJS
		this.leftPageCanvas.width = this.leftPageCanvas.width;
		this.leftPageCanvas.getContext("2d").clearRect(0, 0, this.leftPageCanvas.width, this.leftPageCanvas.height);

		for(var i = 0; i < this.LeftPageDiv.children.length; i++)
		{
			var currentChild = this.LeftPageDiv.children[i];
			var attibuteClass = currentChild.getAttribute("class");

			if( attibuteClass == BookConstants.PAGE_CHILDREN_NAMES.image ||
        attibuteClass == BookConstants.PAGE_CHILDREN_NAMES.text ||
        attibuteClass == BookConstants.PAGE_CHILDREN_NAMES.username)
					this.LeftPageDiv.removeChild(currentChild);
		}
	}

	this.currentLeftPage = leftPage;

	if(this.currentLeftPage != null && !book.hasCanceledPageFlip)
			this.currentLeftPage.showAnimations(this.audioProgress.audioPosition);
};

BPBook.prototype.setCurrentRightPage = function(rightPage)
{
	if(rightPage != null)
	{
		rightPage.renderToCanvas(this.rightPageCanvas, this.rightPageDiv, true);
		if(rightPage.isInsideCoverPage || rightPage.isCoverPage)
			rightPage.forcedRenderToCanvas(this.rightPageCanvas, this.rightPageDiv, true);
	}
	else
	{
		//noinspection SillyAssignmentJS
		this.rightPageCanvas.width = this.rightPageCanvas.width;
		this.rightPageCanvas.getContext("2d").clearRect(0, 0, this.rightPageCanvas.width, this.rightPageCanvas.height);

		for(var i = 0; i < this.rightPageDiv.children.length; i++)
		{
			var currentChild = this.rightPageDiv.children[i];
			var attibuteClass = currentChild.getAttribute("class");

			if( attibuteClass == BookConstants.PAGE_CHILDREN_NAMES.image ||
        attibuteClass == BookConstants.PAGE_CHILDREN_NAMES.text ||
        attibuteClass == BookConstants.PAGE_CHILDREN_NAMES.username)
				this.rightPageDiv.removeChild(currentChild);
		}
	}

	this.currentRightPage = rightPage;

	if(this.currentRightPage != null && !book.hasCanceledPageFlip)
		this.currentRightPage.showAnimations(this.audioProgress.audioPosition);
};

BPBook.prototype.goToPage = function(leftPageIndex)
{
	this.goToPages(leftPageIndex, leftPageIndex + 1);
};

BPBook.prototype.goToNextPages = function(forceAudioPositionUpdate)
{
	if(this.currentLeftPageIndex < this.pages.length - 2)
	{
		this.audioProgress.goToNextPages(forceAudioPositionUpdate);
		this.goToPage(this.currentLeftPageIndex + 2);
	}
};

BPBook.prototype.goToPreviousPages = function(forceAudioPositionUpdate)
{
	if(this.currentLeftPageIndex > 0)
	{
		this.audioProgress.goToPreviousPages(forceAudioPositionUpdate);
		this.goToPage(this.currentLeftPageIndex - 2);
	}
};

BPBook.prototype.updatePages = function(audioPosition)
{
	if(this.currentLeftPage != null){
		this.currentLeftPage.updatePage(audioPosition);
	}

	if(this.currentRightPage != null){
		this.currentRightPage.updatePage(audioPosition);
	}
};

BPBook.prototype.preRenderCenterShadowsGradients = function()
{
	var ctx = this.centerShadow.getContext("2d");
	var grd = ctx.createLinearGradient(0, 0, BookConstants.PAGE_FLIP_RENDER_SHADOW.w, 0);

	grd.addColorStop(0, "rgba(1,1,1,0)");
	grd.addColorStop(0.1, "rgba(1,1,1,0.3)");
	grd.addColorStop(0.4, "rgba(1,1,1,0.2)");
	grd.addColorStop(0.5, "rgba(1,1,1,0.6)");
	grd.addColorStop(0.6, "rgba(1,1,1,0.2)");
	grd.addColorStop(0.9, "rgba(1,1,1,0.3)");
	grd.addColorStop(1, "rgba(1,1,1,0)");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, BookConstants.PAGE_FLIP_RENDER_SHADOW.w, BookConstants.PAGE_FLIP_RENDER_SHADOW.h);

	this.centerShadow.style.left    = 377 + "px";
	this.centerShadow.style.top     = 13 + "px";

};

////////////////////////////////////////////////////////////////////////////
 function BPPage(pageJSONInfo, parentBook)
{
	this.pageJSONInfo      = pageJSONInfo;
	this.parentBook 	   = parentBook;
	this.textHighlight     = null;
	this.isCoverPage	   = false;
	this.isInsideCoverPage = false;
	this.renderUserName    = false;
	this.currentCanvas     = null;
	this.highLightCanvas   = null;
	this.textCanvas		   = null;
	this.image 			   = null;
	this.isImageLoaded 	   = false;
	this.isRightPageCanvas = false;
	this.pageIndex 		   = 0;

	this.animations 			= new Array();
	this.images 			    = new Array();
	this.loadedImagesLayerCount = 0;
	this.loadedAnimationCount   = 0;

	this.divContainer = null;

	this.onPauseAnimationCallBack = null;
	this.createUserNameContainer();
	this.initializeAnimations();
	this.initializeImages();
}

BPPage.prototype.createUserNameContainer = function()
{
	var attributes 		   = BookConstants.USERNAME_ATTRIBUTES;
	this.userNameContainer = document.createElement("DIV");
	var attibuteClass 	   = document.createAttribute("class");
  attibuteClass.value 	   = BookConstants.PAGE_CHILDREN_NAMES.username;
	var name 	           = BookSetting.getInstance().getUserName();
	this.userNameContainer.innerHTML = "<h2>"+name+"</h2>";
	this.userNameContainer.setAttributeNode(attibuteClass);
	this.userNameContainer.style.position 	= "absolute";
	this.userNameContainer.style.textAlign 	= "center";
	this.userNameContainer.style.margin     = "auto";
	this.userNameContainer.style.width    	= 400 +"px";
	this.userNameContainer.style.height   	= 50 + "px";
	this.userNameContainer.style.left     	= 8 +"px";
	this.userNameContainer.style.top   	  	= 228 +"px";
	this.userNameContainer.style.zIndex   	= 2;
	this.userNameContainer.style.color 	    = attributes.color;
	this.userNameContainer.style.fontWeight = attributes.font_weight;
	this.userNameContainer.style.fontSize   =  attributes.font_size;
};

BPPage.prototype.initializeAnimations = function()
{
	if(this.pageJSONInfo != null)
	{
		var animationsJSONInfo = this.pageJSONInfo["animations"];
		var context 	       = this;

		for(var i = 0; i < animationsJSONInfo.length; i++)
		{
			var newAnimation = new BPAnimation(animationsJSONInfo[i]);
			this.animations.push(newAnimation);
			newAnimation.loadAnimation(function(sender) { context.onAnimationLoadCompleted(sender);});
			newAnimation.onForcePauseAnimationCallBack = function(){ context.onForcePauseAnimations(); };
		}
	}
};

BPPage.prototype.initializeImages = function()
{
	if(this.pageJSONInfo != null)
	{
		var imagesJSONInfo = this.pageJSONInfo["images"];
		var context 	   = this;

    if (imagesJSONInfo) {
      for(var i = 0; i < imagesJSONInfo.length; i++)
      {
        var newImage = new BPImageLayer(imagesJSONInfo[i]);
        newImage.load(function(sender) { context.onImageLayerLoadCompleted(sender);});
        this.images.push(newImage);
      }
    }
	}
};

BPPage.prototype.load = function(onLoadingCompleteCallback)
{
	this.onLoadingCompleteCallback = onLoadingCompleteCallback;

	if(this.pageJSONInfo != null)
	{
		var context 	   = this;
		this.textHighlight = new BPTextHighlight(this.pageJSONInfo, this);
		this.textHighlight.load( function(sender) { context.onTextHighlightLoadCompleted(sender); });

		var imageURL 		 = BookUtils.instance.getBookAssetPath(this.pageJSONInfo["image_path"]);
		this.image           = new Image();
		this.image.onload    = function() { context.onImageLoaded(); };
		this.image.onerror	 = function() { context.onImageLoadingFailed(); };
		this.image.src       = imageURL;
	}
	else
	{
		this.isImageLoaded = true;
		this.onLoadingCompleteCallback(this);
	}
};

BPPage.prototype.checkForLoadingCompleted = function()
{
	if(this.loadedAnimationCount == this.animations.length &&
		this.loadedImagesLayerCount == this.images.length &&
		this.isImageLoaded && this.textHighlight.isTextLoaded)
	{
		this.onLoadingCompleteCallback(this);
	}
};

BPPage.prototype.hasAnimation = function () {
	if(this.animations.length>0)
		return true;
	return false;
};

BPPage.prototype.onAnimationLoadCompleted = function()
{
	this.loadedAnimationCount++;
	this.checkForLoadingCompleted();
};

BPPage.prototype.onImageLayerLoadCompleted = function()
{
	this.loadedImagesLayerCount++;
	this.checkForLoadingCompleted();
};

BPPage.prototype.onTextHighlightLoadCompleted = function()
{
	this.checkForLoadingCompleted();
};

BPPage.prototype.onImageLoaded = function()
{
	this.initializeImage();
	this.isImageLoaded = true;
	this.checkForLoadingCompleted();
};


BPPage.prototype.initializeImage = function()
{
	this.image.draggable = false;
	this.image.unselectable = "on";

	this.image.style.position = "absolute";
	this.image.width          = BookConstants.PAGE_IMAGE_SIZE.w;
	this.image.height   	  = BookConstants.PAGE_IMAGE_SIZE.h;
	this.image.style.zIndex   = 1;

	var attibuteClass 	   = document.createAttribute("class");
  attibuteClass.value 	   = BookConstants.PAGE_CHILDREN_NAMES.image;
	this.image.setAttributeNode(attibuteClass);
};

BPPage.prototype.onImageLoadingFailed = function()
{
	console.log("image at path = '" + this.image.src + "'' could not be loaded");
	this.onImageLoaded();
};

//Renders the page including the cover and shadows
BPPage.prototype.renderToCanvas = function(canvas, divContainer, isRightPageCanvas, ignoreCover)
{
	this.currentCanvas 	   = canvas;
	this.divContainer 	   = divContainer;
	this.isRightPageCanvas = isRightPageCanvas;
	this.renderCover(canvas, isRightPageCanvas);

	if(this.isCoverPage){
		this.renderCoverToCanvas(canvas, isRightPageCanvas);
	}

	if(!ignoreCover){
		this.renderBorders(canvas, isRightPageCanvas);
	}
	this.renderPageToCanvas(divContainer, isRightPageCanvas);


};

BPPage.prototype.forcedRenderToCanvas = function(canvas, divContainer, isRightPageCanvas)
{
	this.renderCoverToCanvas(canvas, isRightPageCanvas);
	this.renderBorders(canvas, isRightPageCanvas, true);
};

BPPage.prototype.flagAnimationsToHide = function () {
	for(var i = 0; i < this.animations.length; i++)
		book.animations.push(this.animations[i]); //used to hide animations on flip.
};

//Renders the page image, text and user name
BPPage.prototype.renderPageToCanvas = function(divContainer, isRightPageCanvas)
{
	this.renderPageImage(divContainer, isRightPageCanvas);

	for(var i = 0; i < this.animations.length; i++)
		this.animations[i].renderToCanvas(divContainer, isRightPageCanvas);

	for(var i = 0; i < this.images.length; i++)
		this.images[i].renderToCanvas(divContainer, isRightPageCanvas);

	if(this.textHighlight != null)
		this.textHighlight.renderToCanvas(divContainer, false);

	this.renderUserNameToCanvas(divContainer);
};

BPPage.prototype.renderPageImage = function(divContainer, isRightPageCanvas)
{
	BookUtils.instance.removeChildByClass(divContainer, BookConstants.PAGE_CHILDREN_NAMES.image);

	if(this.isCoverPage)
	{
		var coverImageRect = isRightPageCanvas ? BookConstants.PAGE_COVER_IMAGE_RIGHT : BookConstants.PAGE_COVER_IMAGE_LEFT;
		if(this.image != null)
		{
			var rightImagePixelModifier = isRightPageCanvas ? 0 : 3; //prevents page leak on back cover
			this.image.style.left 		= Math.round(coverImageRect.x) + "px";
			this.image.style.top  		= coverImageRect.y + "px";
			this.image.width      		= coverImageRect.w + rightImagePixelModifier;
			this.image.height     		= coverImageRect.h;
			divContainer.appendChild(this.image);
		}
	}
	else
	{
		var pageImagePosition 		= isRightPageCanvas ? BookConstants.PAGE_IMAGE_RIGHT_POSITION : BookConstants.PAGE_IMAGE_LEFT_POSITION;
		var rightImagePixelModifier = isRightPageCanvas ? -1 : 0; //QAV-2762 - this fixes the white line between pages
		this.image.style.left 		= pageImagePosition.x+rightImagePixelModifier + "px";
		this.image.style.top  		= pageImagePosition.y + "px";
		this.image.width      		= BookConstants.PAGE_IMAGE_SIZE.w;
		this.image.height     		= BookConstants.PAGE_IMAGE_SIZE.h;
		divContainer.appendChild(this.image);
	}

};

BPPage.prototype.firstUpdateHighLight = function( position)
{
	if(this.textHighlight != null)
	{
		this.textHighlight.audioPosition = position;
		this.textHighlight.updateHighLight(this.divContainer);
	}
};

BPPage.prototype.updateHighLight = function( position)
{

	if(this.textHighlight != null)
	{
		this.textHighlight.audioPosition = position;
		this.textHighlight.updateHighLight(this.divContainer);
	}
};

BPPage.prototype.updateAnimations = function(position)
{
	for(var i = 0; i < this.animations.length; i++)
	{
		if(this.animations[i].isHidden)
			this.animations[i].showAnimation();
		this.animations[i].updateAnimation(position);
	}
};


BPPage.prototype.showAnimations = function(position)
{
	for(var i = 0; i < this.animations.length; i++)
	{
		if(!this.animations[i].playOnHover && !this.animations[i].playOnClick){
			if(this.animations[i].playArea <=  position){
				this.animations[i].showAnimation(0);
				this.animations[i].isBookPlaying = true;
			}else{
				this.animations[i].showAnimation(position);
				this.animations[i].isBookPlaying = true;
			}
		}else{
			this.animations[i].showAnimation(0);
			this.animations[i].isBookPlaying = true;
		}
	}
};

BPPage.prototype.AddOnClickAnimation = function(){

	for(var i = 0; i < this.animations.length; i++)
	{
		if(this.animations[i].playOnClick){
			this.animations[i].setAnimationClick();
		}

		if(this.animations[i].playOnHover){
			this.animations[i].setAnimationMouseOver();
		}
	}

};

BPPage.prototype.removeOnClickAnimation = function(){

    for(var i = 0; i < this.animations.length; i++)
	{
		if(this.animations[i].playOnClick){
			this.animations[i].container.onclick = null;
		}

		if(this.animations[i].playOnHover){
			this.animations[i].container.onmousemove = null;
		}
	}
};


BPPage.prototype.stopAnimations = function()
{
	for(var i = 0; i < this.animations.length; i++)
		this.animations[i].stopAnimation();
};

BPPage.prototype.hideAnimations = function()
{
	for(var i = 0; i < this.animations.length; i++)
		this.animations[i].hideAnimation();

	for(var i = 0; i < this.images.length; i++)
		this.images[i].hideImage();
};

BPPage.prototype.playAnimations = function()
{
	for(var i = 0; i < this.animations.length; i++)
	{
		this.animations[i].playAnimation();
		this.animations[i].isBookPlaying = true;
	}
};

BPPage.prototype.playAnimationsFromPoint = function(startPoint)
{
	for(var i = 0; i < this.animations.length; i++)
	{
		this.animations[i].playAnimationFromPoint(startPoint);
		this.animations[i].isBookPlaying = true;
	}
};

BPPage.prototype.UpdateAnimationsFromPoint = function(audioProgress)
{
	for(var i = 0; i < this.animations.length; i++)
	{
		this.animations[i].updateAnimation(audioProgress);
		//this.animations[i].isBookPlaying = true;
	}
};

BPPage.prototype.ForceResetAnimations = function()
{
	for(var i = 0; i < this.animations.length; i++)
	{
		this.animations[i].animationPlayer.gotoAndStop(1);
		//this.animations[i].isBookPlaying = true;
	}
};




BPPage.prototype.onForcePauseAnimations = function()
{
	if(this.onPauseAnimationCallBack!=null)
		this.onPauseAnimationCallBack();
};

BPPage.prototype.pauseAnimations = function()
{
	for(var i = 0; i < this.animations.length; i++)
	{
		this.animations[i].stopAnimation();
		this.animations[i].isBookPlaying = false;
	}
};

BPPage.prototype.stopEventAnimations = function()
{
	for(var i = 0; i < this.animations.length; i++)
	{
		if(this.animations[i].playOnHover || this.animations[i].playOnClick){
			this.animations[i].animationPlayer.gotoAndStop(1);
			this.animations[i].animationPlayer.stop();
			this.animations[i].isBookPlaying = false;
		}
	}
};


BPPage.prototype.updatePage = function(position)
{
	this.updateHighLight(position);

	this.updateAnimations(position);
};

BPPage.prototype.renderBorders = function(canvas, isRightPageCanvas, dontClear)
{
	var ctx = canvas.getContext("2d");

	if(!dontClear)
		ctx.clearRect(0,0,1200,1200);
	return; //we won't be rendering borders like this anymore
	if(this.isCoverPage)
		return;

	var bottomBorder = isRightPageCanvas ? rightBottomBorderCanvas : leftBottomBorderCanvas;
	var sideBorder = isRightPageCanvas ? rightSideBorderCanvas : leftSideBorderCanvas;
	var borderPosition = isRightPageCanvas ? {"x":pageImageSize.w-1.5, "y":pageImageSize.h+23} : {"x":11.5, "y":pageImageSize.h+23};
	var bottomX = isRightPageCanvas ? -2 : 12.5;

	ctx.drawImage(bottomBorder, bottomX, borderPosition.y);
	ctx.drawImage(sideBorder,borderPosition.x, 12);
};

BPPage.prototype.renderBordersCover = function(canvas, isRightPageCanvas, dontClear)
{
	var ctx = canvas.getContext("2d");
	if(!dontClear)
		ctx.clearRect(0,0,1200,1200);
	return;

	var bottomBorder = isRightPageCanvas ? rightBottomBorderCanvas : leftBottomBorderCanvas;
	var sideBorder = isRightPageCanvas ? rightSideBorderCanvas : leftSideBorderCanvas;
	var borderPosition = isRightPageCanvas ? {"x":pageImageSize.w + 1, "y":pageImageSize.h+23} : {"x":13.0, "y":pageImageSize.h+23};
	var bottomX = isRightPageCanvas ? -2 : 12.5;
	var width = isRightPageCanvas ? rightSideBorderCanvas.width - 3.0 : leftSideBorderCanvas.width - 2.5;

	ctx.drawImage(bottomBorder, bottomX, borderPosition.y + 2);
	ctx.drawImage(sideBorder, borderPosition.x  + 1, 5, width, sideBorder.height + 2);
};


BPPage.prototype.renderCover = function (canvas, isRightCover){ //canvas, isRightCover
	book.renderCover(isRightCover);
};


BPPage.prototype.renderCoverToCanvas = function (canvas, isRightCover){ //canvas, isRightPageCanvas

  var ctx = canvas.getContext("2d");
  var image = isRightCover ? book.generalUI.coverBackgroundImage : book.generalUI.coverBackgroundImageFlipped;
  var xCoverDiff = 0;
  var wCover= 0;

  if(this.isCoverPage){
    xCoverDiff = isRightCover ? -11 : 10.5;
  }else{

  	 xCoverDiff = isRightCover ? 0 : -8 ;
  }

  wCover = 390;
  ctx.clearRect(0,0, 1200, 1200);
  ctx.drawImage(image, 10+xCoverDiff, 9, wCover, 540);
};

BPPage.prototype.renderUserNameToCanvas = function(divContainer)
{
	if(this.renderUserName)
	{
		divContainer.appendChild(this.userNameContainer);
	}
	else
	{
		BookUtils.instance.removeChildByClass(divContainer, BookConstants.PAGE_CHILDREN_NAMES.username);
	}
};

////////////////////////////////////////////////////////////////////////////
var BookUtils =
(
	function()
	{
    var _instance;

    if (typeof _instance == 'undefined') {
      _instance = new BPBookUtils();
    }

	  return {
      instance: _instance
    };
	}
)();

function BPBookUtils(){}
BPBookUtils.prototype.initialize = function(cid, bookAssetsRootPath)
{
	this.cid				= cid;
	this.bookAssetsRootPath = bookAssetsRootPath;

	this.initializeRequestAnimationFrame();
};

BPBookUtils.prototype.initializeRequestAnimationFrame = function()
{
	if(!window.requestAnimationFrame)
	{
    	if(window.mozRequestAnimationFrame)
    		window.requestAnimationFrame = window.mozRequestAnimationFrame;
   		else if(window.webkitRequestAnimationFrame)
    		window.requestAnimationFrame = window.webkitRequestAnimationFrame;
    	else if(window.msRequestAnimationFrame)
    		window.requestAnimationFrame = window.msRequestAnimationFrame;
   	 	else if(window.oRequestAnimationFrame)
    		window.requestAnimationFrame = window.oRequestAnimationFrame;
	}
};

BPBookUtils.prototype.getBookAssetPath = function(relativePath)
{
	if(isPreview)
		return this.bookAssetsRootPath + "/books_preview/" + this.cid + relativePath;
	return isDev ? this.bookAssetsRootPath + "/books_dev/" + this.cid + relativePath : this.bookAssetsRootPath + relativePath;
};

BPBookUtils.prototype.getGeneralBookAssetPath = function(relativePath)
{
	if(isPreview)
		return this.bookAssetsRootPath + "/html5/books_preview/" + relativePath ;

	return isDev ? this.bookAssetsRootPath + "/html5/books_dev/" + relativePath : this.bookAssetsRootPath + relativePath;
};

BPBookUtils.prototype.convertHexToRGBA = function(hex,brightness)
{
	var r = parseInt(hex.substring(0,2), 16);
    var g = parseInt(hex.substring(2,4), 16);
    var b = parseInt(hex.substring(4,6), 16);

    return "rgba("+r+","+g+","+b+","+brightness+")";
};

//Interpolates from "p0" to "p1" in "t" while "t" is a value from 0 to 1
BPBookUtils.prototype.linearBezier = function(p0, p1, t)
{
	return p0 + t  * ( p1 - p0 );
};

//Determinates the interpolation time (t) for "n" while "n" is a value between "p0" to "p1", return value will be between 0 to 1
BPBookUtils.prototype.inverseLinearBezier = function(n, p0,  p1)
{
	return (n - p0) / (p1 - p0);
};

BPBookUtils.prototype.applyScaleToElement = function(element, scaleX, scaleY)
{

	element.style.webkitTransform = " scale("+ scaleX +", "+ scaleY +")";// Compatibility with Chrome, Safari
	element.style.MozTransform    = " scale("+ scaleX +", "+ scaleY + ")";// Compatibility with Firefox
	element.style.msTransform 	  = " scale("+ scaleX +", "+ scaleY +")";// Compatibility with Opera
	element.style.transform       = " scale("+ scaleX +", "+ scaleY +")";// Standard
};


BPBookUtils.prototype.applyTrasformCoverElement = function(element, scaleX, scaleY,direction,close,progress)
{
	var skew = 0;
	var closedOrOpen;
	if(close){
	    closedOrOpen = 1 - progress;
	}else{
		closedOrOpen = progress;
	}

	if(direction == "Left"){
     	if(!close){
     	if(progress > 0.5)
	 	skew = (closedOrOpen * 2) * -1;
	 	}
	 	else{
	 	if(progress < 0.5)
	 	skew = closedOrOpen * 2;
		}
	}else{
	 	if(close){
	 		if(progress < 0.5)
	 		skew = (closedOrOpen * 2) * -1;
	 	}
	 	else{
	 		if(progress > 0.5)
	 		skew = closedOrOpen * 2;
	 	}
	}

	element.style.webkitTransform = " scale("+ scaleX +", "+ scaleY +") skew(0deg," + skew + "deg)";// Compatibility with Chrome, Safari
	element.style.MozTransform    = " scale("+ scaleX +", "+ scaleY +") skew(0deg," + skew + "deg)";// Compatibility with Chrome, Safari
	element.style.msTransform 	  = " scale("+ scaleX +", "+ scaleY +") skew(0deg," + skew + "deg)";// Compatibility with Chrome, Safari
	element.style.transform       = " scale("+ scaleX +", "+ scaleY +") skew(0deg," + skew + "deg)";// Compatibility with Chrome, Safari

};

BPBookUtils.prototype.applyTrasformFinishCoverElement = function(element,_skew)
{
	if(!element)
		return;
	element.style.webkitTransform = "skew(0deg," + _skew + "deg)";// Compatibility with Chrome, Safari
	element.style.MozTransform    = "skew(0deg," + _skew + "deg)";// Compatibility with Chrome, Safari
	element.style.msTransform 	  = "skew(0deg," + _skew + "deg)";// Compatibility with Chrome, Safari
	element.style.transform       = "skew(0deg," + _skew + "deg)";// Compatibility with Chrome, Safari
};



BPBookUtils.prototype.applyTrasformBeforeCoverElement = function(element,Skew)
{
	if(!element)
		return;

	element.style.webkitTransform = "skew(0deg," + Skew + "deg)";// Compatibility with Chrome, Safari
	element.style.MozTransform    = "skew(0deg," + Skew + "deg)";// Compatibility with Chrome, Safari
	element.style.msTransform 	  = "skew(0deg," + Skew + "deg)";// Compatibility with Chrome, Safari
	element.style.transform       = "skew(0deg," + Skew + "deg)";// Compatibility with Chrome, Safari


};

BPBookUtils.prototype.applyTrasformCoverCenterElement = function(element,direction,progress,skew)
{
	if(!element)
		return;

	var closedOrOpen;
	closedOrOpen = progress;

	var _skew = 0;
	if(direction == "FirstBeforeCover"){
		_skew = closedOrOpen * skew;
	}else{
	 	_skew = (closedOrOpen * skew) * -1;
	}


	element.style.webkitTransform = " skew(0deg," + _skew + "deg)";// Compatibility with Chrome, Safari
	element.style.MozTransform    = " skew(0deg," + _skew + "deg)";// Compatibility with Chrome, Safari
	element.style.msTransform 	  = " skew(0deg," + _skew + "deg)";// Compatibility with Chrome, Safari
	element.style.transform       = " skew(0deg," + _skew + "deg)";// Compatibility with Chrome, Safari

};

BPBookUtils.prototype.applytransformOrigin = function(element, position) //position: "left" or "right"
{
	element.style.webkitTransformOrigin =  position;// Compatibility with Chrome, Safari
	element.style.MozTransformOrigin    =  position;// Compatibility with Firefox
	element.style.msTtansformOrigin   	=  position;// Compatibility with Opera
	element.style.transformOrigin       =  position;// Standard
};

BPBookUtils.prototype.applyOverflowToParents = function(element, overflowProperty) // overflowProperty: hidden, visible, scroll
{
	var parent = element.parentElement;

	while(parent!=null)
	{
		parent.style.overflow = overflowProperty;
		parent = parent.parentElement;
	}
};

BPBookUtils.prototype.getChildByClass = function(parent, childName)
{
	var children = parent.children;

	for(var i = 0; i < children.length; i++)
	{
		var currentChild = children[i];

		if(currentChild.getAttribute("class") == childName)
			return currentChild;
	}

	return null;
};


BPBookUtils.prototype.removeChildByClass = function(container, childClass)
{

	var child = this.getChildByClass(container, childClass) ;

	if(child!=null)
		container.removeChild(child);
};


BPBookUtils.prototype.renderRoundRectFill = function(canvas, rect, radius, strokeStyle, fillStyle)
{
	var ctx 	    = canvas.getContext("2d");
	ctx.strokeStyle = strokeStyle;
	ctx.fillStyle   = fillStyle;

	ctx.beginPath();
	ctx.moveTo(rect.x + radius, rect.y);
	ctx.lineTo(rect.x + rect.w - radius, rect.y);
	ctx.quadraticCurveTo(rect.x + rect.w, rect.y, rect.x + rect.w, rect.y + radius);
	ctx.lineTo(rect.x + rect.w, rect.y + rect.h - radius);
	ctx.quadraticCurveTo(rect.x + rect.w, rect.y + rect.h, rect.x + rect.w - radius, rect.y + rect.h);
	ctx.lineTo(rect.x + radius, rect.y + rect.h);
	ctx.quadraticCurveTo(rect.x, rect.y + rect.h, rect.x, rect.y + rect.h - radius);
	ctx.lineTo(rect.x, rect.y + radius);
	ctx.quadraticCurveTo(rect.x, rect.y, rect.x + radius, rect.y);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
};


BPBookUtils.prototype.getTintedImage = function(_targetImage, _targetColor, _forceAlpha) { //image and HEX color
    var x; //drawing context
    var fg;
    var buffer;
    if(_targetColor.indexOf("#") == -1) //the book doesn"t save the # on book color
    	_targetColor = "#"+_targetColor;
    var drawingCanvas = document.createElement("canvas");
    var fg = _targetImage;
    drawingCanvas.width = fg.width;
    drawingCanvas.height = fg.height;
    // Check the element is in the DOM and the browser supports canvas
    if(drawingCanvas && drawingCanvas.getContext) {
        x = drawingCanvas.getContext("2d");
        width = x.canvas.width;
        height = x.canvas.height;
        // create offscreen buffer,
        buffer = document.createElement("canvas");
        buffer.width = fg.width;
        buffer.height = fg.height;
        bx = buffer.getContext("2d");

        // tint buffer with tint color
        bx.fillStyle = _targetColor;
        bx.fillRect(0,0,buffer.width,buffer.height);
        bx.globalCompositeOperation = "destination-atop";
        bx.drawImage(fg,0,0);
        // to tint the image, draw it first
        x.drawImage(fg,0,0);
        //then set the global alpha to the amound that you want to tint it, and draw the buffer directly on top of it.
        if(!_forceAlpha)
        	_forceAlpha = 1;
        x.drawImage(buffer,0,0, fg.width, fg.height);
    }
    var returnImage = new Image();
    returnImage.src = drawingCanvas.toDataURL();
    return returnImage; //returns canvas for you to draw.
};

BPBookUtils.prototype.paintShadow = function (_originalImage, _targetShadow) {
	var buffer = document.createElement("canvas");

	buffer.width = _originalImage.width;
	buffer.height = _originalImage.height;
	ctx = buffer.getContext("2d");
	ctx.drawImage(_originalImage, 0,0);
	ctx.drawImage(_targetShadow, 0,0);

	var returnImage = new Image();
    returnImage.src = buffer.toDataURL();

    return returnImage; //returns canvas for you to draw.
};

BPBookUtils.prototype.generateTintImage = function( img, rgbks, red, green, blue ) {
    var buff = document.createElement("canvas");
    buff.width  = img.width;
    buff.height = img.height;

    var ctx  = buff.getContext("2d");

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "copy";
    ctx.drawImage( rgbks[3], 0, 0 );

    ctx.globalCompositeOperation = "lighter";
    if ( red > 0 ) {
        ctx.globalAlpha = red   / 255.0;
        ctx.drawImage( rgbks[0], 0, 0 );
    }
    if ( green > 0 ) {
        ctx.globalAlpha = green / 255.0;
        ctx.drawImage( rgbks[1], 0, 0 );
    }
    if ( blue > 0 ) {
        ctx.globalAlpha = blue  / 255.0;
        ctx.drawImage( rgbks[2], 0, 0 );
    }

    return buff;
};

BPBookUtils.prototype.generateRGBKs = function ( img ) {
	var w = img.width;
	var h = img.height;
	var rgbks = [];

	var canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;

	var ctx = canvas.getContext("2d");
	ctx.drawImage( img, 0, 0 );

	var pixels = ctx.getImageData( 0, 0, w, h ).data;

	for ( var rgbI = 0; rgbI < 4; rgbI++ ) {
	    var canvas = document.createElement("canvas");
	    canvas.width  = w;
	    canvas.height = h;

	    var ctx = canvas.getContext("2d");
	    ctx.drawImage( img, 0, 0 );
	    var to = ctx.getImageData( 0, 0, w, h );
	    var toData = to.data;

	    for (
	            var i = 0, len = pixels.length;
	            i < len;
	            i += 4
	    ) {
	        toData[i  ] = (rgbI === 0) ? pixels[i  ] : 0;
	        toData[i+1] = (rgbI === 1) ? pixels[i+1] : 0;
	        toData[i+2] = (rgbI === 2) ? pixels[i+2] : 0;
	        toData[i+3] =                pixels[i+3]    ;
	    }

	    ctx.putImageData( to, 0, 0 );

	    var imgComp = new Image();
	    imgComp.src = canvas.toDataURL();

	    rgbks.push( imgComp );
	}

	return rgbks;
};

//Determinates if a value is approximately another value using a tolerance
BPBookUtils.prototype.approximately = function(value1, value2, tolerance)
{
	var difference    = value1 - value2;
	return Math.abs(difference) <= tolerance;
};

BPBookUtils.prototype.isIOS = function()
{
	return navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
};

BPBookUtils.prototype.isAndroid = function()
{
	return navigator.userAgent.match(/(Android)/g);
};

BPBookUtils.prototype.truncateDecimals = function (number, digits) {
    var multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

    return truncatedNum / multiplier;
};

////////////////////////////////////////////////////////////////////////////
function BPPageFlipAnimator(parentBook, pageFlipLeftContainer, pageFlipRightContainer, centerShadowFlipAnimation, borderShadowFlipAnimation, reflectionLightFlipAnimation)
{
	this.parentBook = parentBook;

	this.pageFlipLeftPageCanvas = document.getElementById("leftPageDivCanvas");
	this.pageFlipRightPageCanvas = document.getElementById("rightPageDivCanvas");
	this.centerShadowFlipAnimation = centerShadowFlipAnimation;
	this.borderShadowFlipAnimation = borderShadowFlipAnimation;
	this.reflectionLightFlipAnimation = reflectionLightFlipAnimation;

	this.LeftPageDiv = this.parentBook.LeftPageDiv;
	this.rightPageDiv = this.parentBook.rightPageDiv;
	this.parentPageFlipLeft = pageFlipLeftContainer;
	this.parentPageFlipRight = pageFlipRightContainer;

	this.currentPageFlip = "";
	this.totalPages = 0;
	this.currentPage = 0;
	this.isAnimating = false;
	this.initialPageflipTime = 0;
	this.leftPage = null;
	this.rightPage = null;
	this.direction = "Unknown";//Left, Right
	this.mode = "Unknown";//Normal, Cover
	this.updateDirection = "Forward";
	this.progressFrame = 0;
	this.pageFlipCallBack = null;
	this.pageFlipTransitionStart = null;
	this.pageFlipTransitionCompleted = null;

	this.updateInitialDelay = true;
	this.updateInitialDelay = 0;
	this.isSetBookPagesAble = false;
	this.setBookPagesCallBack = null;

	this.setCanvasVisibility(false);
	this.setShadowCanvasVisibility(false);
	this.preRenderCenterShadowsGradients();
	this.skewContainerLeft = document.getElementById("skewContainerLeft");
	this.skewContainerRight = document.getElementById("skewContainerRight");
	this.bottomLeftShadow = document.getElementById("bottomLeftShadow");
	this.bottomRightShadow = document.getElementById("bottomRightShadow");
	this.correctCurrentPage		= 0;
}

var hasCanceled = false;

BPPageFlipAnimator.prototype.preRenderCenterShadowsGradients = function()
{
	var ctx = this.centerShadowFlipAnimation.getContext("2d");
	var grd = ctx.createLinearGradient(0, 0, BookConstants.PAGE_FLIP_RENDER_SHADOW.w, 0);

	grd.addColorStop(0,   "rgba(1,1,1,0)");
	grd.addColorStop(0.5, "rgba(1,1,1,1)");
	grd.addColorStop(1,   "rgba(1,1,1,0)");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, BookConstants.PAGE_FLIP_RENDER_SHADOW.w, BookConstants.PAGE_FLIP_RENDER_SHADOW.h);

	ctx = this.reflectionLightFlipAnimation.getContext("2d");
	grd = ctx.createLinearGradient(0, 0, 10, 0);

	grd.addColorStop(0,   "rgba(255,255,255,0)");
	grd.addColorStop(0.25, "rgba(255,255,255,0.3)");
	grd.addColorStop(1,   "rgba(255,255,255,0)");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, 10, BookConstants.PAGE_FLIP_RENDER_SHADOW.h);

	ctx = this.borderShadowFlipAnimation.getContext("2d");
	grd = ctx.createLinearGradient(0, 0, BookConstants.PAGE_FLIP_RENDER_BORDER_SHADOW.w, 0);

	grd.addColorStop(0, "rgba(1,1,1,1)");
	grd.addColorStop(1, "rgba(1,1,1,1)");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, BookConstants.PAGE_FLIP_RENDER_BORDER_SHADOW.w, BookConstants.PAGE_FLIP_RENDER_BORDER_SHADOW.h);
};

BPPageFlipAnimator.prototype.setCanvasVisibility = function(visible)
{
	this.parentPageFlipLeft.style.display = visible ? "inherit" : "none";
	this.parentPageFlipRight.style.display = visible ? "inherit" : "none";
};

BPPageFlipAnimator.prototype.setShadowCanvasVisibility = function(visible)
{
	this.centerShadowFlipAnimation.style.display = visible ? "inherit" : "none";
	this.reflectionLightFlipAnimation.style.display = visible ? "inherit" : "none";
	this.borderShadowFlipAnimation.style.display = visible ? "inherit" : "none";
};

BPPageFlipAnimator.prototype.UpdateBottomShadow = function() {

	if(this.mode != "Cover"){
		this.bottomLeftShadow.style.opacity = 1;
		this.bottomRightShadow.style.opacity = 1;
		book.setOpenedShadow();
	}
};

BPPageFlipAnimator.prototype.beforePageFlip = function (currentPage) {

	book.hideBookAnimations();
  book.stopAllAnimations();
	book.stopEventAnimations();
	var correctCurrentPage = (book.currentLeftPageIndex + currentPage)/2;
	this.correctCurrentPage = correctCurrentPage;
	isBookCompleted = false;
	this.UpdateBottomShadow(false);
};

BPPageFlipAnimator.prototype.removeImagesFromParentDiv = function( _element) {
	var elements = _element.getElementsByTagName('img');
	for(var i = elements.length ; i>=0; i--){
		if(elements[i]){
			if(elements[i].src.indexOf("page") != -1 || elements[i].src.indexOf("text") != -1 ||
			   elements[i].src.indexOf("cover") != -1 || elements[i].src.indexOf("back") != -1  ||
			   elements[i].src.indexOf("front") != -1)
			elements[i].parentNode.removeChild(elements[i]);
		}
	}
}

BPPageFlipAnimator.prototype.startPageFlip = function(leftPage, rightPage, direction, mode, currentPageFlip, currentPage, totalPages)
{
	this.leftPage   = leftPage;
	this.rightPage  = rightPage;
	this.direction 	= direction;
	this.mode       = mode;

	if(this.pageFlipTransitionStart!=null)
		this.pageFlipTransitionStart(this);

	this.beforePageFlip(currentPage, totalPages);

	hasCanceled = false;

	if(!book.isDraggingSlider)
		this.stopPageFlip();//finish/commit any page flip animation that is currently in progress

	if(leftPage)
		leftPage.pauseAnimations();
	if(rightPage)
		rightPage.pauseAnimations();
	this.currentPageFlip = currentPageFlip;
	if(totalPages != null || totalPages != undefined){
		this.totalPages = totalPages;
	}
	if(currentPage != null || currentPage!= undefined){
		this.currentPage = currentPage;
	}

	var correctCurrentPage = (book.currentLeftPageIndex + currentPage)/2;
	var isFrontCover = (correctCurrentPage <= 1);
	var isLastCover  = correctCurrentPage >= book.totalPages-2;

	this.removeImagesFromParentDiv(this.parentPageFlipRight);
	this.removeImagesFromParentDiv(this.parentPageFlipLeft);

	this.pageFlipLeftPageCanvas.width  = this.pageFlipLeftPageCanvas.width;
	this.parentPageFlipRight.style.display = "block";
	this.pageFlipRightPageCanvas.width = this.pageFlipRightPageCanvas.width;
	this.parentPageFlipLeft.style.display  = "block";

	this.pageFlipLeftPageCanvas.getContext("2d").clearRect(0," 0", this.pageFlipLeftPageCanvas.width, this.pageFlipLeftPageCanvas.height);
	this.pageFlipRightPageCanvas.getContext("2d").clearRect(0, 0, this.pageFlipRightPageCanvas.width, this.pageFlipRightPageCanvas.height);

	if(book.currentLeftPage)
		book.currentLeftPage.hideAnimations();
	if(book.currentRightPage)
		book.currentRightPage.hideAnimations();

	switch(this.mode)
	{
		case "Normal":
		case "FirstBeforeCover":
		case "LastBeforeCover":
			book.updateBookPosition(1);
			if(leftPage != null){
				leftPage.renderToCanvas(this.pageFlipLeftPageCanvas, this.parentPageFlipLeft, false, true);
				leftPage.showAnimations(0);
				leftPage.flagAnimationsToHide();
			}

			if(rightPage != null){
				rightPage.renderToCanvas(this.pageFlipRightPageCanvas, this.parentPageFlipRight, true, true);
				rightPage.showAnimations(0);
				rightPage.flagAnimationsToHide();
			}
			break;

		case "Cover":
			if(leftPage != null)
			{

				leftPage.renderCover(this.pageFlipLeftPageCanvas, false, true);
				leftPage.renderPageToCanvas(this.parentPageFlipLeft, false);
				book.rightCoverDiv.style.display = "none";

				if(isFrontCover){
					leftPage.forcedRenderToCanvas(this.pageFlipLeftPageCanvas, this.parentPageFlipLeft, false);
				}
				if(isLastCover){
					if(rightPage)
						rightPage.forcedRenderToCanvas(this.pageFlipRightPageCanvas, this.parentPageFlipLeft, true);
					if(this.direction == "Right")
					  	leftPage.forcedRenderToCanvas(this.pageFlipLeftPageCanvas, this.parentPageFlipRight, false);
				}
			} else {
				this.LeftPageDiv.style.display  = "none";
			}

			if(rightPage != null)
			{
				rightPage.renderCover(this.pageFlipRightPageCanvas, true, true);
				rightPage.renderPageToCanvas(this.parentPageFlipRight, true);
				book.leftCoverDiv.style.display = "none";
				if(isFrontCover){
					if(this.direction == "Left")
     					rightPage.forcedRenderToCanvas(this.pageFlipRightPageCanvas, this.parentPageFlipRight, true);
    			}
				if(isLastCover){
					//book.centerShadow.style.opacity = "0";

				}
			} else {
				this.rightPageDiv.style.display = "none";
			}
			break;
	}

	this.setCanvasVisibility(true);

	this.initialPageflipTime = Date.now();
	this.isAnimating 		 = true;

};

BPPageFlipAnimator.prototype.afterPageFlip = function () {

	updatePageWeight();
	isPausedAfterPage = false; //prevent book to think it"s still paused by the pause after page
	var isFrontCover = (book.currentLeftPageIndex < 1);
	var isLastCover  = book.currentLeftPageIndex > book.totalPages-3;
	var isFrontCoverOpened = book.currentLeftPageIndex === 1;
	var isLastCoverOpened = book.currentLeftPageIndex === book.totalPages - 3;

	if(isFrontCover || isLastCover ) {
		if(isFrontCover){
			book.updateCenterCover("CLOSE_FRONT");
			book.currentRightPage.renderBordersCover(book.rightCoverCanvas,true,true);
			BookUtils.instance.applyScaleToElement(book.rightPageDiv,1,1);
		}
		if(isLastCover){
			book.updateCenterCover("CLOSE_BACK");
			book.currentLeftPage.renderBordersCover(book.leftCoverCanvas,false,true);
			BookUtils.instance.applyScaleToElement(book.LeftPageDiv,1,1);
		}
	} else {
		if(isFrontCoverOpened) {
			book.updateCenterCover("OPEN_FRONT");
		} else {
			if(isLastCoverOpened) {
				book.updateCenterCover("OPEN_BACK");
			}	else {
				//this means is not a cover.
				book.updateCenterCover();
			}
		}
		book.leftCoverDiv.style.display = "block";
		book.rightCoverDiv.style.display = "block";
		//book.centerShadow.style.opacity = "0.30";
		book.centerShadow.style.display = "block";
		book.forceOpenedPosition();
	}

	if(book.isDraggingSlider)
		return;

	//if page flip was not triggered by a slider drag
	book.audioProgress.audioPosition = book.audioProgress.getAudioPosition();
	book.audioProgress.progress      = book.audioProgress.audioPosition / book.audioProgress.soundPlayer.getDuration();

	hud.progressSlider.updateForeground(book.audioProgress.progress);
	hud.progressSlider.updateProgress(book.audioProgress.progress, true); //update position, even if audio has not been loaded

	if(book.audioProgress.isUsingSlowAudio){
		hud.updateProgressTime(book.audioProgress.progress * book.audioProgress.getSlowAudioDuration() , book.audioProgress.getSlowAudioDuration()- 1);
	}else{
		hud.updateProgressTime(book.audioProgress.audioPosition, book.audioProgress.soundPlayer.getDuration() - 1);
	}

	if(!book.isPlaying){
    	book.stopAllAnimations();
		book.stopEventAnimations();
	}

	if(book.currentRightPage != null){
		//book.currentRightPage.pauseAnimations(); //why was it here?
		book.currentRightPage.AddOnClickAnimation();
		book.currentRightPage.UpdateAnimationsFromPoint(book.audioProgress.audioPosition);
	}

	if(book.currentLeftPage != null){
		//book.currentLeftPage.pauseAnimations(); //why was it here?
		book.currentLeftPage.AddOnClickAnimation();
		book.currentLeftPage.UpdateAnimationsFromPoint(book.audioProgress.audioPosition);
	}

	hasCanceled = false;

};

BPPageFlipAnimator.prototype.cancelCurrentTransition = function(progress, onCancelTransitionCompleted)
{

	if(this.mode == "Cover"){ //11: thou shall not cancel a cover flip.
		this.finishCurrentTransition(progress, this.pageFlipTransitionCompleted);
		return;
	}

	hasCanceled = true;
	book.hasCanceledPageFlip = true;
	this.pageFlipTransitionCompleted      = onCancelTransitionCompleted;
	var secondsOffset 				      = progress * BookConstants.PAGE_FLIP_ANIMATION_SECONDS * 1000;
	this.initialPageflipTime 		      = Date.now() - secondsOffset;
	this.isAnimating 				      = true;
	this.updateDirection 			      = "Backward";
	this.backwardDirectionInitialProgress = progress;
	this.updateProgress(progress);
};

BPPageFlipAnimator.prototype.finishCurrentTransition = function(progress, onFinishTransitionCompleted)
{
	hasCanceled = false;
	book.hasCanceledPageFlip = false;
	this.pageFlipTransitionCompleted = onFinishTransitionCompleted;
	var secondsOffset 				 = progress * BookConstants.PAGE_FLIP_ANIMATION_SECONDS * 1000;
	this.initialPageflipTime 		 = Date.now() - secondsOffset;
	this.isAnimating 				 = true;
	this.updateProgress(progress);
};

BPPageFlipAnimator.prototype.update = function()
{
	if(this.isAnimating)
	{
		var progress = (Date.now() - this.initialPageflipTime) / (BookConstants.PAGE_FLIP_ANIMATION_SECONDS * 1000);

		if(this.updateDirection == "Backward")
		{
			var progressOffset = progress - this.backwardDirectionInitialProgress;
			progress 		   = this.backwardDirectionInitialProgress - progressOffset;//Move progress backward
		}

		if(progress > 1 || progress < 0){
			this.stopPageFlip();
			if(forcePause)
				pause();
		} else {
			this.updateProgress(progress);
		}
	}
};

BPPageFlipAnimator.prototype.updateProgress = function(progress)
{

	switch(this.mode)
	{
		case "Normal":
		case "LastBeforeCover" :
		case "FirstBeforeCover" :
			this.updateNormalPageFlipProgress(progress,this.mode);
		break;
		case "Cover":
			this.updateCoverPageFlipProgress(progress);
			break;
	}
};

BPPageFlipAnimator.prototype.updateNormalPageFlipProgress = function(progress,mode)
{
	var canvasWidth    = BookConstants.PAGE_CANVAS_SIZE.w - BookConstants.OFFSET_SPACE_BETWEEN_PAGES;
	var canvasHeight   = BookConstants.PAGE_CANVAS_SIZE.h;
	var offset 		   = BookConstants.PAGE_FLIP_IMAGE_OFFSET;
	var shadowOffset   = canvasWidth - BookConstants.PAGE_IMAGE_SIZE.w;

	var isSafari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;

 	var index = book.temporalLeftIndex;

	switch(this.direction)
	{
		case "Right":
		{
			if(progress < 0.5)
			{
				var rightPageFlipProgress = BookUtils.instance.inverseLinearBezier(progress, 0, 0.5);
				var currentX 	  		  = BookUtils.instance.linearBezier(0, canvasWidth, rightPageFlipProgress);
				var offsetX 	  		  = BookUtils.instance.linearBezier(0, (canvasWidth / 2), rightPageFlipProgress);

				this.parentPageFlipLeft.style.left = (currentX) + "px";
				this.parentPageFlipLeft.style.clip = "rect(0px,"+( canvasWidth - offsetX)+"px,"+ canvasHeight +"px,0px)";

				if(currentX < (canvasWidth - offset))
					this.parentPageFlipRight.style.clip = "auto";
				else
					this.parentPageFlipRight.style.clip = "rect(0px,"+ (canvasWidth+1) +"px,"+ canvasHeight +"px," + offset +"px)";

				this.parentPageFlipLeft.style.zIndex  = 5;//Bring to front
				this.parentPageFlipRight.style.zIndex = 4;//Bring to front
				this.rightPageDiv.style.zIndex 		  = 2;

				this.setCanvasVisibility(true);
				this.renderCenterShadow(progress, canvasWidth + offsetX);
				this.renderBorderShadow(progress, currentX+1);
				this.setShadowCanvasVisibility(true);
			}
			else
			{
				var leftPageFlipProgress = BookUtils.instance.inverseLinearBezier(progress, 0.5, 1);
				var currentX = BookUtils.instance.linearBezier(0, canvasWidth, leftPageFlipProgress);
				var offsetX  = BookUtils.instance.linearBezier((canvasWidth / 2), canvasWidth, leftPageFlipProgress);

				var currentLeft 					=  (currentX + offset);
				this.parentPageFlipLeft.style.left = (canvasWidth + currentX) + "px";
				this.parentPageFlipLeft.style.clip = "rect(0px,"+( canvasWidth - offsetX)+"px,"+ canvasHeight +"px,0px)";
				this.parentPageFlipRight.style.clip = "rect(0px,"+ (canvasWidth+1) +"px,"+ canvasHeight +"px," + currentLeft +"px)";

				this.setCanvasVisibility(true);
				this.renderCenterShadow(progress, canvasWidth + offsetX);
				this.renderBorderShadow(progress, canvasWidth + currentX+1);
				this.setShadowCanvasVisibility(true);

			}
		}
		break;
		case "Left":
		{
			if(progress < 0.5)
			{
				var rightPageFlipProgress = BookUtils.instance.inverseLinearBezier(progress, 0, 0.5);
				var currentX 	  		  = BookUtils.instance.linearBezier(0, canvasWidth, rightPageFlipProgress);
				var offsetX 	  		  = BookUtils.instance.linearBezier(0, (canvasWidth / 2), rightPageFlipProgress);

				this.parentPageFlipRight.style.left = (canvasWidth - currentX) + "px";
				this.parentPageFlipRight.style.clip = "rect(0px,"+ canvasWidth +"px,"+ canvasHeight +"px,"+ offsetX +"px)";

				if(currentX < (canvasWidth - offset))
					this.parentPageFlipLeft.style.clip = "auto";
				else
					this.parentPageFlipLeft.style.clip  = "rect(0px,"+ (canvasWidth - offset) +"px,"+ canvasHeight +"px,0px)";

				this.parentPageFlipRight.style.zIndex = 5;//Bring to front
				this.parentPageFlipLeft.style.zIndex  = 4;//Bring to front
				this.LeftPageDiv.style.zIndex 		  = 2;

				this.setCanvasVisibility(true);
				this.renderCenterShadow(progress, (canvasWidth - offsetX) );
				this.renderBorderShadow(progress, ((canvasWidth * 2) - shadowOffset - (currentX - 4)) );
				this.setShadowCanvasVisibility(true);

			}
			else
			{
				var leftPageFlipProgress = BookUtils.instance.inverseLinearBezier(progress, 0.5, 1);
				var currentX      		 = BookUtils.instance.linearBezier(0, canvasWidth, leftPageFlipProgress);
				var offsetX 	  		 = BookUtils.instance.linearBezier((canvasWidth / 2), canvasWidth, leftPageFlipProgress);

				var currentLeft 					=  (currentX + offset);
				this.parentPageFlipRight.style.left = (- currentX) + "px";
				this.parentPageFlipRight.style.clip = "rect(0px,"+ canvasWidth +"px,"+ canvasHeight +"px,"+ offsetX +"px)";
				this.parentPageFlipLeft.style.clip  = "rect(0px,"+ (canvasWidth - currentLeft) +"px,"+ canvasHeight +"px,0px)";

				this.setCanvasVisibility(true);
				this.renderCenterShadow(progress, (canvasWidth - offsetX) );
				this.renderBorderShadow(progress, (canvasWidth - shadowOffset - (currentX - 4)) );
				this.setShadowCanvasVisibility(true);

			}
		}
		break;
	}
};

BPPageFlipAnimator.prototype.updateCoverPageFlipProgress = function(progress)
{
	book.pageFlipAnimator.bottomLeftShadow.className = book.pageFlipAnimator.bottomLeftShadow.className.replace(" open", "");
	book.pageFlipAnimator.bottomRightShadow.className = book.pageFlipAnimator.bottomRightShadow.className.replace(" open", "");
	book.pageFlipAnimator.bottomLeftShadow.className = book.pageFlipAnimator.bottomLeftShadow.className.replace(" lastCover", "");
	book.pageFlipAnimator.bottomRightShadow.className = book.pageFlipAnimator.bottomRightShadow.className.replace(" lastCover", "");
	var close;
	if(book.currentLeftPageIndex > book.pages.length/2){
		book.pageFlipAnimator.bottomLeftShadow.className += " lastCover";
		book.pageFlipAnimator.bottomRightShadow.className += " lastCover";
		book.updateCenterCover("CLOSE_BACK");
	} else {
		book.updateCenterCover("CLOSE_FRONT");
	}
	var isFrontCoverOpened = book.currentLeftPageIndex === 1;
	var isLastCoverOpened = book.currentLeftPageIndex === book.totalPages - 3;
	if (isFrontCoverOpened || isLastCoverOpened) {
		close = false;
	}else{
		close = true;
	}

	switch(this.direction)
	{
		case "Left":
		{

			book.updateBookPosition(progress);
			if(progress < 0.5)//Hide the left page of the book that is already loaded, scale and translate the right cover page
			{

				if(dragPageGesture.isDragging)
					this.setCanvasVisibility(true);
				var rightPageFlipProgress = BookUtils.instance.inverseLinearBezier(progress, 0, 0.5);
				BookUtils.instance.applyTrasformCoverElement(this.parentPageFlipRight, (1 - rightPageFlipProgress), 1,this.direction,close,progress);

				this.parentPageFlipRight.style.display      = "inherit";
				this.parentPageFlipRight.style.left      	= "398px";
				this.LeftPageDiv.style.display  			= "none";

				BookUtils.instance.applyScaleToElement(this.parentPageFlipLeft, 1, 1);
			}
			else //Hide the cover page, bring to front scale and translate the left page of the book
			{
				if(dragPageGesture.isDragging)
					this.setCanvasVisibility(true);

				var leftPageFlipProgress = BookUtils.instance.inverseLinearBezier(progress, 0.5, 1);

				BookUtils.instance.applyTrasformCoverElement(this.LeftPageDiv, leftPageFlipProgress, 1,this.direction,close,progress);
				BookUtils.instance.applyTrasformCoverElement(this.parentPageFlipRight, leftPageFlipProgress, 1,this.direction,close,progress);
				this.LeftPageDiv.style.left      	= "2px";
				this.LeftPageDiv.style.zIndex			  = 3;//Bring to front
				this.LeftPageDiv.style.display 		   = "inherit";
				this.parentPageFlipRight.style.display = "none";
			}
		}
		break;
		case "Right":
		{
			book.updateBookPosition(1-progress);
			if(progress < 0.5)//Hide the right page of the book to display the right page flip canvas temporally, move the left page flip canvas to the right and scale down it
			{
				this.setCanvasVisibility(true);

				var rightPageFlipProgress = BookUtils.instance.inverseLinearBezier(progress, 0, 0.5);
				BookUtils.instance.applyTrasformCoverElement(this.parentPageFlipLeft, (1 - rightPageFlipProgress), 1,this.direction,close,progress);

				this.parentPageFlipLeft.style.display   = "inherit";
				this.parentPageFlipLeft.style.left 		= "0px";
				this.rightPageDiv.style.display 		= "none";
				this.LeftPageDiv.style.left = "-1px";

				BookUtils.instance.applyScaleToElement(this.parentPageFlipRight, 1, 1);
			}
			else //Hide the left page flip canvas, bring the right page canvas to front scale it up and translate it
			{
				this.setCanvasVisibility(true);

				var leftPageFlipProgress = BookUtils.instance.inverseLinearBezier(progress, 0.5, 1);
				BookUtils.instance.applyTrasformCoverElement(this.rightPageDiv, leftPageFlipProgress, 1,this.direction,close,progress);
				BookUtils.instance.applyTrasformCoverElement(this.parentPageFlipLeft, leftPageFlipProgress, 1,this.direction,close,progress);

				this.rightPageDiv.style.display 		 = "inherit";
				this.rightPageDiv.style.zIndex	 		 = 3;//Bring to front
				this.LeftPageDiv.style.left = "0px";
				this.parentPageFlipLeft.style.display    = "none";
			}
		}
		break;
	}
};

BPPageFlipAnimator.prototype.stopPageFlip = function()
{
	book.audioProgress.restartCurrentPagesAudioPosition();
	divLeftPageCanvas.className = divLeftPageCanvas.className.replace(" containerLeft","");
	divRightPageCanvas.className = divRightPageCanvas.className.replace(" containerRight","");
	divLeftPageCanvas.className += " containerLeft";
	divRightPageCanvas.className += " containerRight";

	if(this.isAnimating)
	{
		this.initialPageflipTime         = 0;
		this.updateInitialDelay          = true;
		this.updateInitialDelay			 = 0;

		//Resetting all transformations
		this.LeftPageDiv.style.left 		= "0px";
		this.parentPageFlipLeft.style.left  = "0px";
		this.rightPageDiv.style.left 	    = "399px";
		this.parentPageFlipRight.style.left = Math.round(BookConstants.PAGE_CANVAS_SIZE.w - BookConstants.OFFSET_SPACE_BETWEEN_PAGES) + "px";

		BookUtils.instance.applyScaleToElement(this.parentPageFlipLeft, 1, 1);
		BookUtils.instance.applyScaleToElement(this.parentPageFlipRight, 1, 1);

		this.LeftPageDiv.style.display = "inherit";
		this.rightPageDiv.style.display = "inherit";

		this.parentPageFlipRight.style.clip = "auto";
		this.parentPageFlipRight.style.display = "none";
		this.parentPageFlipLeft.style.clip  = "auto";
		this.parentPageFlipLeft.style.display  = "none";

		this.parentPageFlipLeft.style.zIndex  = 2;
		this.parentPageFlipRight.style.zIndex = 2;

		this.centerShadowFlipAnimation.style.zIndex  = 1;
		this.borderShadowFlipAnimation.style.zIndex  = 1;
		this.reflectionLightFlipAnimation.style.zIndex  = 1;

		this.LeftPageDiv.style.zIndex  = 1;
		this.rightPageDiv.style.zIndex = 2; //using 1 instead of 0 prevents a small flick when flipping pages.

		this.setCanvasVisibility(false);
		this.setShadowCanvasVisibility(false);

		if(this.pageFlipCallBack != null)
			this.pageFlipCallBack(this);

		if(this.pageFlipTransitionCompleted != null)
		{
			this.pageFlipTransitionCompleted(this);
			this.pageFlipTransitionCompleted = null;
		}

		if(this.mode == "LastBeforeCover")
		{
			centerCoverBackground.style.display = "block";
			divRightPageCanvas.className = divRightPageCanvas.className.replace(" containerRight","");
			divRightPageCanvas.className += " containerRight";
			book.setBookContainerPosition(52);
			if((this.direction == "Left" && !book.hasCanceledPageFlip) || (this.direction == "Right" && book.hasCanceledPageFlip)) {
				this.setBottomShadowOnOpenBook("back");
			} else {
				this.setBottomShadowOnOpenBook();
			}

		} else if(this.mode == "FirstBeforeCover"){
			divLeftPageCanvas.className = divLeftPageCanvas.className.replace(" containerLeft","");
			divLeftPageCanvas.className += " containerLeft";
			book.setBookContainerPosition(52);
			divRightPageCanvas.className = divRightPageCanvas.className.replace(" containerRight","");
			divRightPageCanvas.className += " containerRight";
			if ((this.direction == "Right" && !book.hasCanceledPageFlip) || (this.direction == "Left" && book.hasCanceledPageFlip)) {
				this.setBottomShadowOnOpenBook("front");
			} else {
				this.setBottomShadowOnOpenBook();
			}

		} else if(this.mode == "Cover"){
			if(this.currentPageFlip == "CLOSE_BACK"){
				centerCoverBackground.style.display = "block";
				divLeftPageCanvas.className = divLeftPageCanvas.className.replace(" containerLeft","");
				divLeftPageCanvas.className += " containerLeft";
				divRightPageCanvas.className = divRightPageCanvas.className.replace(" containerRight","");
				divRightPageCanvas.className += " containerRight";
				this.setBottomShadowOnCloseBook("back");
				centerCoverBackgroundShadowCanvas.className = "centerCoverBackgroundShadowCanvas close back";

			} else if(this.currentPageFlip == "OPEN_BACK"){
				centerCoverBackground.style.display = "block";
				book.rightCoverDiv.style.display = "block";
				divRightPageCanvas.className = divRightPageCanvas.className.replace(" containerRight","");
				divRightPageCanvas.className += " containerRight";
				this.setBottomShadowOnOpenBook("back");
				book.setBookContainerPosition(52);

			} else {
				if(this.currentPageFlip == "OPEN_FRONT"){
					centerCoverBackground.style.display = "block";
					book.leftCoverDiv.style.display = "block";

				} else if(this.currentPageFlip == "CLOSE_FRONT"){
					centerCoverBackground.style.display = "block";
					//centerCoverBackgroundCanvas.className = "centerCoverBackgroundCanvas close front";

					this.setBottomShadowOnCloseBook("front");
					centerCoverBackgroundShadowCanvas.className = "centerCoverBackgroundShadowCanvas close front";

				}
				if(this.direction == "Left"){
					centerCoverBackground.style.display = "block";
					divLeftPageCanvas.className = divLeftPageCanvas.className.replace(" containerLeft","");
					divLeftPageCanvas.className += " containerLeft";
					this.setBottomShadowOnOpenBook("front");
					book.setBookContainerPosition(52);

				} else {
					centerCoverBackground.style.display = "block";
					divLeftPageCanvas.className = divLeftPageCanvas.className.replace(" containerLeft","");
					divLeftPageCanvas.className += " containerLeft";
					divRightPageCanvas.className = divRightPageCanvas.className.replace(" containerRight","");
					divRightPageCanvas.className += " containerRight";

				}
			}
		} else {
			centerCoverBackground.style.display = "block";
			divRightPageCanvas.className = divRightPageCanvas.className.replace(" containerRight","");
			divRightPageCanvas.className += " containerRight";
		}

		this.updateDirection = "Forward";
		this.isAnimating     = false;
	}
};

BPPageFlipAnimator.prototype.renderCenterShadow = function(progress, positionX)
{
	if(BookConstants.RENDER_PAGE_FLIP_SHADOWS)
	{
		var top 	 		= BookConstants.PAGE_FLIP_RENDER_SHADOW.top;
		var width 	 		= BookConstants.PAGE_FLIP_RENDER_SHADOW.w;
		var currentProgress = progress < 0.25 ? BookUtils.instance.inverseLinearBezier(progress, 0.1, 0.25)   : BookUtils.instance.inverseLinearBezier(progress, 0.25,0.9);
		var alpha 			= progress < 0.25 ? BookUtils.instance.linearBezier(0.22, 0.3, currentProgress) : BookUtils.instance.linearBezier(0.3, 0.0, currentProgress);

		this.centerShadowFlipAnimation.style.opacity = alpha;
		this.centerShadowFlipAnimation.style.zIndex  = 6;
		this.centerShadowFlipAnimation.style.left 	 = (positionX - (width / 2)) + "px";
		// this.centerShadowFlipAnimation.style.top 	 = top + "px";

		this.renderCenterLightReflection(progress, positionX);
	}
};

BPPageFlipAnimator.prototype.renderCenterLightReflection= function(progress, positionX)
{
	if(BookConstants.RENDER_PAGE_FLIP_SHADOWS)
	{
		var top 	 		= BookConstants.PAGE_FLIP_RENDER_SHADOW.top;
		var width 	 		= 10;
		var currentProgress = progress < 0.25 ? BookUtils.instance.inverseLinearBezier(progress, 0, 0.25)   : BookUtils.instance.inverseLinearBezier(progress, 0.25,1);
		var alpha 			= progress < 0.25 ? BookUtils.instance.linearBezier(0.0, 0.8, currentProgress) : BookUtils.instance.linearBezier(0.8, 0.0, currentProgress);

		this.reflectionLightFlipAnimation.style.opacity = alpha;
		this.reflectionLightFlipAnimation.style.zIndex  = 6;

		if(this.direction == "Left"){
			this.reflectionLightFlipAnimation.style.left 	= Math.round((positionX - (width / 2) + 2)) + "px";
		}
		else{
			this.reflectionLightFlipAnimation.style.left 	= Math.round((positionX - (width / 2) - 1)) + "px";
		}
		this.reflectionLightFlipAnimation.style.top 	= top + "px";

	}
};

BPPageFlipAnimator.prototype.renderBorderShadow = function(progress, positionX)
{
	if(BookConstants.RENDER_PAGE_FLIP_SHADOWS)
	{
		var top	   			= BookConstants.PAGE_FLIP_RENDER_BORDER_SHADOW.top;
		var currentProgress = progress < 0.5 ? BookUtils.instance.inverseLinearBezier(progress, 0, 0.5) : BookUtils.instance.inverseLinearBezier(progress, 0.5,1);
		var alpha  			= progress < 0.5 ? BookUtils.instance.linearBezier(0, 0.2, currentProgress) : BookUtils.instance.linearBezier(0.2, -0.1, currentProgress);
		var modifier = -3;
		if(this.direction == "Right")
			modifier = 0;

		this.borderShadowFlipAnimation.style.opacity = alpha;
		this.borderShadowFlipAnimation.style.zIndex  = 6;
		this.borderShadowFlipAnimation.style.left    = positionX+modifier + "px";
	}
};

BPPageFlipAnimator.prototype.setBottomShadowOnOpenBook = function(cover) {
	var bottomLeftShadow = this.bottomLeftShadow;
	var bottomRightShadow = this.bottomRightShadow;
	if (cover) cover = cover.toLowerCase();
	if (cover === "front") {
		bottomLeftShadow.className = bottomLeftShadow.className.replace(" open", "");
		bottomLeftShadow.className = bottomLeftShadow.className.replace(" " + cover, "");
		bottomLeftShadow.className = bottomLeftShadow.className.replace(" closeFront", "");
		bottomRightShadow.className = bottomRightShadow.className.replace(" open", "");
		bottomRightShadow.className = bottomRightShadow.className.replace(" closeFront", "");
		bottomLeftShadow.className += " open " + cover;
		bottomRightShadow.className += " open " + cover;
		//centerCoverBackgroundCanvas.className = "centerCoverBackgroundCanvas open ";
		centerCoverBackgroundShadowCanvas.className = "centerCoverBackgroundShadowCanvas open ";
	} else if (cover === "back") {
		bottomLeftShadow.className = bottomLeftShadow.className.replace(" open", "");
		bottomLeftShadow.className = bottomLeftShadow.className.replace(" lastCover", "");
		bottomRightShadow.className = bottomRightShadow.className.replace(" open", "");
		bottomRightShadow.className = this.bottomRightShadow.className.replace(" " + cover, "");
		bottomRightShadow.className = this.bottomRightShadow.className.replace(" lastCover", "");
		bottomLeftShadow.className += " open " + cover;
		bottomRightShadow.className += " open " + cover;
		centerCoverBackgroundShadowCanvas.className = "centerCoverBackgroundShadowCanvas open ";
	} else {
		centerCoverBackgroundShadowCanvas.className = "centerCoverBackgroundShadowCanvas open";
	}
};

BPPageFlipAnimator.prototype.setBottomShadowOnCloseBook = function(cover) {
	var bottomLeftShadow = this.bottomLeftShadow;
	var bottomRightShadow = this.bottomRightShadow;

	if (cover === "front") {
		bottomLeftShadow.className = "bottomLeftShadow closeFront";
		bottomRightShadow.className = "bottomRightShadow closeFront";
	} else if (cover === "back") {
		bottomRightShadow.className = "bottomRightShadow lastCover";
		bottomLeftShadow.className = "bottomLeftShadow lastCover";
	}
}

////////////////////////////////////////////////////////////////////////////
function BPTicketMachine()
{
    this.bookCID = 0;
    this.gameID = 0;
    this.tracker = null;
    var context = this;
    this.replayMethod = function(evt){ context.replayGame(evt);}
    this.hasCalledTM = false;
}

BPTicketMachine.prototype.initializeTicketMachine = function(bookCID, gameID, callback)
{
    this.bookCID = bookCID; //deprecated
    this.gameID = gameID;
    this.tracker = null;
    this.tracker = new GameTracker(this.bookCID, this.gameID);
    addListener( this.tracker, 'doReplay', this.replayMethod);
    this.tracker.start();
    var self = this;
    addListener(this.tracker, 'gt_info_ready', function() {
      if (callback) {
        callback(self.tracker);
      }
    });
};

BPTicketMachine.prototype.replayGame = function(evt)
{
    location.reload();
    return;
};

BPTicketMachine.prototype.openTicketMachine = function(trackerProgress)
{
  if(this.tracker != null && this.tracker != '' && !this.hasCalledTM){
    if(trackerProgress < .8){
      this.tracker.custompoint = 1;
    }

    this.hasCalledTM = true;
    this.tracker.ticketMachine();
  }
};

////////////////////////////////////////////////////////////////////////////
function BPFavoriteAPI(){
  var context = this;
  this.favoriteCallBack = function(data){
    context.addedFavorite(data);
  };
}


BPFavoriteAPI.prototype.addToFavorites = function(){
  var bookCID = BookUtils.instance.cid;
  var arrayArguments =  [bookCID,"",""];
  var json = JSON.stringify( arrayArguments );
  ApiService.call("user_addfavoriteactivity", {arguments: json}, this.favoriteCallBack);
};

BPFavoriteAPI.prototype.addedFavorite = function(data){
  var result = data.success;
  if(result)
  {
    showPopup("addfavorite.php?cid=" + BookUtils.instance.cid);
  }
};

////////////////////////////////////////////////////////////////////////////
function BPTextHighlight(textJSONInfo, page)
{
	this.textJSONInfo 	   = textJSONInfo;
	this.textImage         = null;
	this.isTextLoaded 	   = false;
	this.isTextImageLoaded = false;
	this.highlightJSONInfo = this.textJSONInfo["highlight"];
	this.sentences   	   = new Array();
	this.audioPosition	   = 0;
	this.lastAudioPosition = null;
	this.pageParent        = page;
	this.createHighlightContainer();
	this.loadSentences();
}

BPTextHighlight.prototype.createHighlightContainer = function()
{
	this.divBoxesContainer = document.createElement("DIV");
	var classAttibute 	   = document.createAttribute("class");
  classAttibute.value 	   = BookConstants.PAGE_CHILDREN_NAMES.highlight;
	this.divBoxesContainer.setAttributeNode(classAttibute);
	this.divBoxesContainer.style.position = 'absolute';
	this.divBoxesContainer.style.width    = BookConstants.PAGE_CANVAS_SIZE.w +'px';
	this.divBoxesContainer.style.height   = BookConstants.PAGE_CANVAS_SIZE.h + 'px';
	this.divBoxesContainer.style.zIndex   = 2;
};

BPTextHighlight.prototype.loadSentences = function()
{
  if(this.highlightJSONInfo.length > 0) {
		var lastBox = null;
		var nextSentence = null; //QAV-2768
		var nextSentenceFirstBox = null;
		for(var i = 0; i < this.highlightJSONInfo.length; i++)
		{
      var textSentence = this.highlightJSONInfo[i];

      //QAV-2768
      nextSentence = this.highlightJSONInfo[i+1];
      if(nextSentence){
        nextSentenceFirstBox = nextSentence.boxes[0];
      } else {
        nextSentenceFirstBox = null;
      }

      var sentence = new BPTextSentence(textSentence, lastBox, nextSentenceFirstBox);
      lastBox      = sentence.lastBox;
      this.sentences.push(sentence);
    }
	}
};

BPTextHighlight.prototype.load = function(onLoadingCompleteCallback)
{
	this.onLoadingCompleteCallback = onLoadingCompleteCallback;
	var textImageURL 		  	   = this.textJSONInfo["image_text_path"];

	if(textImageURL != "")
	{
		this.textImage         	= new Image();
		var context            	= this;
		this.textImage.onload  	= function() { context.onImageLoaded(); };
		this.textImage.src 		= BookUtils.instance.getBookAssetPath(textImageURL);
	}
	else
	{
		this.isTextLoaded = true;
		onLoadingCompleteCallback(this);
	}
};

BPTextHighlight.prototype.renderToCanvas = function(divContainer, clearCanvas)
{
  var child = divContainer.getElementsByClassName(BookConstants.PAGE_CHILDREN_NAMES.highlight)[0];
  var textChild = divContainer.getElementsByClassName(BookConstants.PAGE_CHILDREN_NAMES.text)[0];

  if (child){
    divContainer.removeChild(child);
  }

	divContainer.appendChild(this.divBoxesContainer);
	if(this.isTextImageLoaded)
	{
		this.drawHighlight(divContainer, this.audioPosition, this.getHighlightColor());
		var pageImagePosition = this.pageParent.isRightPageCanvas ? BookConstants.PAGE_IMAGE_RIGHT_POSITION : BookConstants.PAGE_IMAGE_LEFT_POSITION;

		this.textImage.style.left   = pageImagePosition.x + 'px';
		this.textImage.style.top    = pageImagePosition.y + 'px';
		divContainer.appendChild(this.textImage);
	}
  if (textChild) {
    divContainer.removeChild(textChild);
	}

};

BPTextHighlight.prototype.updateHighLight = function(divContainer)
{
	if(this.lastAudioPosition == this.audioPosition){ // i the audio position is the same, we don't do anything.
		return;
	}
	this.lastAudioPosition = this.audioPosition;

	if(!this.pageParent.parentBook.isPlaying && !this.pageParent.parentBook.isDraggingSlider)
	{
		return;
	}

	if(this.isTextImageLoaded)
	{
		var container = document.getElementById(BookConstants.PAGE_CHILDREN_NAMES.highlight);

		if(container == null)
			divContainer.appendChild(this.divBoxesContainer);

		var modifier = 0; //var to solve issues of highlight-audio sync

		if(book.audioProgress.isUsingSlowAudio)
			modifier = 0.18;
		else
			//modifier = 0.083;
			modifier = 0.16;

		this.drawHighlight(divContainer, this.audioPosition+modifier, this.getHighlightColor());
	}
};

BPTextHighlight.prototype.onImageLoaded = function()
{
	this.initializeTextImage();

	this.isTextLoaded 	   = true;
	this.isTextImageLoaded = true;
	this.onLoadingCompleteCallback(this);
};

BPTextHighlight.prototype.initializeTextImage = function()
{
	this.textImage.draggable = false;
	this.textImage.unselectable = "on";

	this.textImage.style.position = 'absolute';
	this.textImage.width          = BookConstants.PAGE_IMAGE_SIZE.w;
	this.textImage.height   	  = BookConstants.PAGE_IMAGE_SIZE.h;
	this.textImage.style.zIndex   = 3;
	this.textImage.ondragstart = function() { return false; }; //QAV-3482 prevent user from draggin text image instead of page.
	var classAttibute 	   = document.createAttribute("class");
  classAttibute.value 	   = BookConstants.PAGE_CHILDREN_NAMES.text;
	this.textImage.setAttributeNode(classAttibute);

};

BPTextHighlight.prototype.getHighlightColor = function()
{
	var colorHex   = BookSetting.getInstance().getHighlightColor();
	var brightness = 1;
	return BookUtils.instance.convertHexToRGBA(colorHex, brightness);
};

BPTextHighlight.prototype.drawHighlight = function(divContainer, audioPosition, highlightColor)
{
	var pagePosition   		= this.pageParent.isRightPageCanvas ? BookConstants.PAGE_IMAGE_RIGHT_POSITION : BookConstants.PAGE_IMAGE_LEFT_POSITION;
	for(var i = 0; i < this.sentences.length; i++){
		this.sentences[i].renderToCanvas(divContainer, audioPosition, pagePosition, this.divBoxesContainer, highlightColor);
	}
};

////////////////////////////////////////////////////////////////////////////
var BookSetting =
(
	function()
	{
	    var _instance = null;

	    return {
			        getInstance : function ()
			        {
			            if(_instance == null)
			                _instance = new BPBookSettings();

			            return _instance;
			        }
			    };
	}
)();

function BPBookSettings()
{
	this.hightlightStyle 	  = BookJSON.getInstance().getHighlightStyle();
	this.hightlightColor      = BookJSON.getInstance().getHighlight();
	this.hightlightBrightness = BookJSON.getInstance().getBrightness();
	this.HUDColor             = BookJSON.getInstance().getHUDColor();
	this.userName 			  = "";

	if(this.hightlightStyle != BookConstants.TEXT_HIGHLIGHT_STYLE_WORD_BY_WORD)
		this.hightlightStyle = BookConstants.TEXT_HIGHLIGHT_STYLE_CONTINUOUS;

}

BPBookSettings.prototype.getHUDColor = function()
{
	return this.HUDColor;
};

BPBookSettings.prototype.setHUDColor = function(HUDColor)
{
	this.HUDColor = HUDColor;
};

BPBookSettings.prototype.getHighlightStyle = function()
{
	return this.hightlightStyle;
};

BPBookSettings.prototype.getHighlightColor = function()
{
	return this.hightlightColor;
};

BPBookSettings.prototype.setHighlightColor = function(highlightColor)
{
	this.hightlightColor = highlightColor;
    for(var i = 0; i < book.pages.length; i++){
        var __page = book.pages[i];
        if(__page.textHighlight){
	        var __divs = __page.textHighlight.divBoxesContainer.getElementsByTagName('div');
	        var colorCss = highlightColor == '000000' ? 'transparent' : '#' + highlightColor;
					if(highlightColor == 000000){
								 __page.textHighlight.divBoxesContainer.style.opacity = '0';
					}else{
							__page.textHighlight.divBoxesContainer.style.opacity = '0.5';
					}

					for(var j = 0; j < __divs.length; j++){
	          __divs[j].style.backgroundColor = colorCss;

	        }
        }
    }
};

BPBookSettings.prototype.getHighlightBrightness = function()
{
	return this.hightlightBrightness;
};

BPBookSettings.prototype.setHighlightBrightness = function(highlightBrightness)
{
	this.hightlightBrightness = highlightBrightness;
};

BPBookSettings.prototype.getUserName = function()
{
	return this.userName;
};

BPBookSettings.prototype.setUserName = function(name)
{
	this.userName = name;
};

////////////////////////////////////////////////////////////////////////////
var BookJSON =
  (
    function()
    {
      var _instance = null;

      return {
        getInstance : function ()
        {
          if(_instance == null)
            _instance = new BPJSONParser();

          return _instance;
        }
      };
    }
  )();

function BPJSONParser()
{
}

BPJSONParser.prototype.initialize = function initialize(contentInfo, activityInfo)
{
  this.jsonData = contentInfo;

  // this is setting the highlight color to none for EFL books
  if (activityInfo && activityInfo.name.indexOf('EFL') > -1) {
    this.jsonData.highlight_color = '000000';
  }
};

BPJSONParser.prototype.getBookCID = function getBookCID()
{
  return this.jsonData["book"];
};

BPJSONParser.prototype.getBookName = function getBookName()
{
  return this.jsonData["name"];
};
BPJSONParser.prototype.getPageColor = function getPageColor()
{
  return "#"+ this.jsonData["book_color"];
};
BPJSONParser.prototype.getColor = function getColor()
{
  return "#"+ this.jsonData["color"];
};
BPJSONParser.prototype.getBookLocked = function getBookLocked()
{
  return this.jsonData["locked"];
};
BPJSONParser.prototype.getHighlight = function getHighlight()
{
  return this.jsonData["highlight_color"];
};
BPJSONParser.prototype.getBookplate = function getBookplate()
{
  return this.jsonData["bookplate"];
};
BPJSONParser.prototype.getBrightness = function getBrightness()
{
  return this.jsonData["highlight_brightness"];
};
BPJSONParser.prototype.getObjectVersion = function getObjectVersion()
{
  return this.jsonData["objectVersion"];
};
BPJSONParser.prototype.getHighlightStyle = function getHighlightStyle()
{
  return 'progressive';
};
BPJSONParser.prototype.getBackCoverEnabled = function getBackCoverEnabled()
{
  return true;
};
BPJSONParser.prototype.getBackCoverimg = function getBackCoverImg()
{
  return this.jsonData.pages[this.jsonData.pages.length -1]['image_path'];
};
BPJSONParser.prototype.getBookSnd = function()
{
  return this.jsonData["sound_path"];
};
BPJSONParser.prototype.getBookSndFilename = function getBookSndFilename()
{
  return this.getBookSnd().mp3;
};
BPJSONParser.prototype.getBookSndSlowfile = function getBookSndSlowfile()
{
  return this.jsonData['sound_slow_path']['mp3'];
};
BPJSONParser.prototype.getBookSndPageBreaks = function getBookSndPageBreaks()
{
  if (this.pageBreaks.length === 0) {
    var page;
    for (var i=0; i<this.jsonData.pages.length; i++) {
      if (this.jsonData.pages.hasOwnProperty(i)) {
        page = this.jsonData.pages[i];
        if (page['break_position'] != 0) {
          this.pageBreaks.push(page['break_position']);
        }
      }
    }
  }

  return this.pageBreaks;
};
BPJSONParser.prototype.getPages = function getPages()
{
  return this.jsonData["pages"];
};
BPJSONParser.prototype.getHUDColor = function getHUDColor()
{
  return "8ECEEC";
};

BPJSONParser.prototype.pageBreaks = [];




////////////////////////////////////////////////////////////////////////////
var pageCanvasSize   = { "w" : 400, "h" : 550 };
var pageCoverSize    = { "w" : 380, "h" : 520 };
var pageImageSize    = { "w" : 380, "h" : 520 };
var shadowWidth	 = 40;
var shadowPageOffset = 13;

var BookConstants =
{
     'RENDER_PAGE_FLIP_SHADOWS' : true,
     'CALCULATE_AUDIO_POSITION' : true,
     'USE_ANIMATION_FRAME' : false,
     'DRAG_PAGE_ENABLED': true,
     'PAUSE_AFTER_PAGE_ENABLED' : false,
     'USE_SEPARATE_CANVAS_FOR_TEXT_FILL_ENABLED' : true,
     'PAGE_FLIP_ENABLED' : true,
     'USE_SLOW_AUDIO_DURATION_PERCENTAGE_ENABLED' : true,
     'ALLOW_SLIDER_TOUCH' : true,

     'SKEW_FACTOR_RIGHT' : 2,
     'SKEW_FACTOR_LEFT' : 2,
     'SKEW_FACTOR_CENTER' : 34,
     'SKEW_FACTOR_CENTER_SHADOW' : 20,
     'FACTOR_TOP' : 10,
     'FACTOR_HEIGHT' : 7,
     'FACTOR_HEIGHT_SHADOW' : 13,
     'FACTOR_TOP_CENTER' : 4,

     'SLOW_AUDIO_DURATION_PERCENTAGE' : 1.25,

     'DELAY_FOR_UPDATE_PAGES_AFTER_FLIP_STARTS' : 0.007,

     'PAGE_FLIP_ANIMATION_SECONDS' : 0.65,
	'PAGE_CANVAS_SIZE' : pageCanvasSize,
     'PAGE_IMAGE_SIZE' : pageImageSize,

     'SPINNER_FPS' : 30,

     'ANIMATIONS_LEFT_OFFSET' : {"x" : pageCanvasSize.w - pageImageSize.w, "y" : ((pageCanvasSize.h - pageImageSize.h) / 2) - 2 },
     'ANIMATIONS_RIGHT_OFFSET' : {"x" : 0, "y" : ((pageCanvasSize.h - pageImageSize.h) / 2) - 2 },

     'IMAGE_LAYER_LEFT_OFFSET' : {"x" : pageCanvasSize.w - pageImageSize.w, "y" : ((pageCanvasSize.h - pageImageSize.h) / 2) - 2 },
     'IMAGE_LAYER_RIGHT_OFFSET' : {"x" : 0, "y" : ((pageCanvasSize.h - pageImageSize.h) / 2) - 2 },

     'PAGE_SHADOW_MAX_GRADIENT_COLOR' : "rgba(0,0,0,0.2)",
     'PAGE_SHADOW_MIN_GRADIENT_COLOR' : "rgba(0,0,0,0)",

     'PAGE_LEFT_SHADOW_GRADIENT'  		    : { "x"  : pageCanvasSize.w - shadowWidth, "y" : 0, "finalX" : pageCanvasSize.w, "finalY" : 0 },
     'PAGE_LEFT_SHADOW_GRADIENT_FILL_RECT'  : { "x"  : pageCanvasSize.w - shadowWidth, "y" : shadowPageOffset, "w" : shadowWidth,  "h" : pageImageSize.h },

     'PAGE_RIGHT_SHADOW_GRADIENT' 			: { "x"  : 0,   "y" : 0, "finalX" : shadowWidth,  "finalY" : 0 },
     'PAGE_RIGHT_SHADOW_GRADIENT_FILL_RECT' : { "x"  : 0,   "y" : shadowPageOffset, "w" : shadowWidth,  "h" : pageImageSize.h },

     'PAGE_COVER_LEFT_SHADOW_GRADIENT_FILL_RECT'  : { "x"  : pageCanvasSize.w - shadowWidth,   "y" : 0, "w" : shadowWidth,  "h" : pageCanvasSize.h },
     'PAGE_COVER_RIGHT_SHADOW_GRADIENT_FILL_RECT' : { "x"  : 0,                                "y" : 0, "w" : shadowWidth,  "h" : pageCanvasSize.h },

     'PAGE_IMAGE_LEFT_POSITION'  : { "x"  : pageCanvasSize.w - pageImageSize.w + 1, "y" : 6 + ((pageCanvasSize.h - pageImageSize.h) / 2) - 2 },
     'PAGE_IMAGE_RIGHT_POSITION' : { "x"  : 2,                                  "y" : 6 +((pageCanvasSize.h - pageImageSize.h) / 2) - 2 },

     'PAGE_LEFT_FILL_RECT'  : {"x": 0,  "y": 3, "w": pageCoverSize.w + 5, "h": pageCoverSize.h },
     'PAGE_RIGHT_FILL_RECT' : {"x": -5, "y": 3, "w": pageCoverSize.w + 5, "h": pageCoverSize.h },

     'PAGE_COVER_LEFT_FILL_RECT'  : {"x": (pageCoverSize.w - pageImageSize.w ), "y": 0, "w": pageImageSize.w, "h": pageCanvasSize.h},
     'PAGE_COVER_RIGHT_FILL_RECT' : {"x": 0,                                 "y": 0, "w": pageImageSize.w, "h": pageCanvasSize.h},

     'PAGE_COVER_FILL_RECT_ROUND_RADIOUS' : 7,

     'PAGE_COVER_IMAGE_LEFT'  : { "x"  : (pageCanvasSize.w - pageImageSize.w)+4, "y" : ((pageCanvasSize.h - pageImageSize.h) / 2)-3, "w": pageImageSize.w-10, "h": pageCanvasSize.h-18},
     'PAGE_COVER_IMAGE_RIGHT' : {"x": 2,                                     "y" : ((pageCanvasSize.h - pageImageSize.h) / 2)-5, "w": pageImageSize.w+4, "h": pageCanvasSize.h-12},

     'BACKGROUND_COVER_LEFT'  : {"x": 0,  "y": 5, "w": pageCoverSize.w + 5, "h": pageCoverSize.h },
     'BACKGROUND_COVER_RIGHT' : {"x": -5, "y": 5, "w": pageCoverSize.w + 5, "h": pageCoverSize.h },

     'BORDER_IMAGE_LEFT'  : {"x": 7,   "y": ((pageCanvasSize.h - pageImageSize.h) / 2) - 2, "w": 25, "h": pageImageSize.h + 0.4},
     'BORDER_IMAGE_RIGHT' : {"x": 369, "y": ((pageCanvasSize.h - pageImageSize.h) / 2) - 2, "w": 25, "h": pageImageSize.h + 0.4},

     'SHORT_SHADOW_LEFT'  : { "x"  : 360, "y" : 536, "w" : 80, "h" : 5 },
     'SHORT_SHADOW_RIGHT' : { "x"  : -40, "y" : 536, "w" : 80, "h" : 5 },

     'LONG_SHADOW_LEFT'  : { "x"  : 10,  "y" : 532, "w" : pageImageSize.h, "h" : 4 },
     'LONG_SHADOW_RIGHT' : { "x"  : -10, "y" : 532, "w" : pageCoverSize.w, "h" : 4 },

     'BORDER_PAGE_BOTTOM' : { "x"  : 0,  "y" : 0, "w" : pageImageSize.w + 20, "h" : 20},
     'BORDER_PAGE_SIDE'  : { "x"  : 2,  "y" : 0, "w" : 20, "h" : pageImageSize.h + 20},

     'USERNAME_ATTRIBUTES' : {"x": 137, "y": 226, "color": "rgb(150, 116, 84)", "text_align": "center", "font":" aofl_century_gothic" ,"font_size": "13px", "font_weight": "bold" },

     'PAGE_CHILDREN_NAMES' : {"image" : "imageName", "text" :  "textImageName", "username" : "username", "highlight" : "highlightContainer"},

     'TEXT_HIGHLIGHT_STYLE_CONTINUOUS'   : 'continuous',
     'TEXT_HIGHLIGHT_STYLE_WORD_BY_WORD' : 'wordbyword',
     'TEXT_HIGHLIGHT_FPS' : 60,

     'HIT_AREA_OUTER_EDGE_OF_PAGE' : 40, // using 40px, When the user clicks on the outer edge of either page the page should turn.

     'BOOK_AUDIO_MAX_PROGRESS' : 0.998, //Using "0.996" to avoid floating precision issues

     'OFFSET_SPACE_BETWEEN_PAGES' : 0.2,// there is a space between left and right pages in some iOS devices.

     'PAGE_FLIP_IMAGE_OFFSET' : pageCanvasSize.w - pageImageSize.w + 2,
     'PAGE_FLIP_RENDER_SHADOW' : {"w" : 45, "h" : 520, "top" : 19},
     'PAGE_FLIP_RENDER_BORDER_SHADOW' : {"w" : 20, "h" : 520, "top" : 13}

};

////////////////////////////////////////////////////////////////////////////
function BPSoundPlayer(soundFileName)
{
	this.audioBook  		       = null;
	this.isAudioLoaded 		   	   = false;
	this.onLoadingCompleteCallback = null;
	this.isPlaying				   = false;
	this.isAutoplaySupported	   = true;
	this.isCompleted			   = false;
	this.onAudioCompleteCallBack   = null;
	this.soundPath 				   = BookUtils.instance.getBookAssetPath(soundFileName);
	this.currentAudioBookPosition  = 0.00;


	// QACN-4513, QACN-4684, QACN-4685: For the following CIDs, there is a problem
	// with the low-res book audio's reported length in Safari and IE 11, causing
	// a variety of  issues. As a workaround, replace with high-res audio.
	var specialCIDs = [8255, 8340, 15977];
	// Note: CID and bookAssetsRootPath are global variables.
	if (specialCIDs.indexOf(CID) > -1 && /\bartmin\b/.test(bookAssetsRootPath)) {
		this.soundPath = this.soundPath.replace(/\bartmin\b/, 'artwork');
	}
}

BPSoundPlayer.prototype.load = function(onLoadingCompleteCallback)
{
	this.onLoadingCompleteCallback = onLoadingCompleteCallback;

	var context    = this;

  this.setAudioFileType({
    path: this.soundPath,
    fileType: 'm4a',
    browsers: ['safari', 'chrome', 'IE'],
		mobile: {
			isAndroid: function() {
					return navigator.userAgent.match(/Android/i);
			},
			isBlackBerry: function() {
					return navigator.userAgent.match(/BlackBerry/i);
			},
			isIos: function() {
					return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			isOpera: function() {
					return navigator.userAgent.match(/Opera Mini/i);
			},
			isWindows: function() {
					return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
			},
			isMobile: function() {
					return (this.isAndroid() || this.isBlackBerry() || this.isIos() || this.isOpera() || this.isWindows());
			}
		}
  });

	this.audioBook = SoundControl.addContentSound(this.soundPath,{autostart:false, removeSrc:true, loop:false});
	this.audioBook.element.preload = 'metadata';

	addListener(context.audioBook, 'loaded', function loadedAudioBook(){
		context.onAudioLoaded();
	});

	this.audioBook.autostart = false;
	this.overWriteMediaDone();
};

BPSoundPlayer.prototype.addCompletedListener = function addCompletedListener(){
	addListener(this.audioBook, 'complete', function(){
		var	trackerProgress = mediaProgressTracker.getCompletedPercentage() +
		slowMediaProgressTracker.getCompletedPercentage();

		if(mediaProgressTracker != null && slowMediaProgressTracker != null && trackerProgress >= .8){
			bookTicketMachine.openTicketMachine();
		}
	});
};
/*
 * In MediaPlayer class when the audio is done, the method "mediadone" removes the scr from audio element,
 * this causes problem when user is moving the slider, for that reason this method(mediadone) is overwritten
 * only for both normal and slow audios.
*/
BPSoundPlayer.prototype.overWriteMediaDone = function()
{
	var context = this;
	this.audioBook.mediadone = null;
	this.audioBook.mediadone = function (event) { //overwriting media done to prevent audio reseting.
		if(book.audioProgress.onEndProgress != null)
			book.audioProgress.onEndProgress(book.audioProgress);

		book.audioProgress.playbackCompleted = true;

		book.audioProgress.finishedAudio();
	    return;
	};
};

/*
 * @param {Object} pathConfig
 */
BPSoundPlayer.prototype.setAudioFileType = function setAudioFileType(pathConfig) {
  if (typeof pathConfig.path !== 'undefined' && typeof pathConfig.fileType !== 'undefined') {
    if (pathConfig.mobile && pathConfig.mobile.isMobile()) {
      this.soundPath = pathConfig.path.replace(/mp4/i, 'mp3');
    } else {
      function isIE() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        var trident = ua.indexOf('Trident/');
        var edge = ua.indexOf('Edge/');
        if (msie > -1 || trident > -1 || edge > -1) {
          return true;
        }
        return false;
      }
      for (var i = 0; i < pathConfig.browsers.length; i++) {
        if (window[pathConfig.browsers[i]] || isIE()) {
          break;
        }
      }
    }
  }else {
    throw new Error('The supplied information for the setAudioFileType method of BPSoundPlayer is not valid');
  }
}

BPSoundPlayer.prototype.onAudioLoaded = function()
{
	this.isAudioLoaded = true;
	if(this.onLoadingCompleteCallback!=null)
	{
		this.onLoadingCompleteCallback(this);
		this.onLoadingCompleteCallback = null;

	}
};

BPSoundPlayer.prototype.onIEAudioLoaded = function()
{
 	this.audioBook.onIEAudioLoad();
};

BPSoundPlayer.prototype.playAudio = function()
{
	this.audioBook.play();
	this.isPlaying = true;

	if(BookConstants.CALCULATE_AUDIO_POSITION)
		this.updateAudioPositionCalculationVariables();
};

BPSoundPlayer.prototype.stopAudio = function()
{
	this.audioBook.stop();
	this.isPlaying = false;
};

BPSoundPlayer.prototype.pauseAudio = function()
{
	this.audioBook.pause();
	this.isPlaying = false;
};

BPSoundPlayer.prototype.getPosition = function()
{
	this.currentAudioBookPosition = parseFloat(this.audioBook.getPosition());
	if(BookConstants.CALCULATE_AUDIO_POSITION /*&& this.isPlaying*/)
		return this.calculateAudioPosition();

	return this.currentAudioBookPosition;
};

BPSoundPlayer.prototype.setPosition = function(position)
{
	this.audioBook.setPosition(position);

	if(BookConstants.CALCULATE_AUDIO_POSITION)
		this.updateAudioPositionCalculationVariables();

};

BPSoundPlayer.prototype.getDuration = function()
{
	// CS-1164: Change Math.round to Math.floor to avoid the calculated duration
	// exceeding the maximum audioPosition property of BPAudioProgress, but
	// not sure why it had to be rounded in the first place.
	return Math.floor(this.audioBook.getDuration());
};

BPSoundPlayer.prototype.updateAudioPositionCalculationVariables = function()
{
	this.playTime     = Date.now();
	this.currentAudioBookPosition = parseFloat(this.audioBook.getPosition());
	this.playPosition = this.currentAudioBookPosition;
};

BPSoundPlayer.prototype.calculateAudioPosition = function()
{
	var audioPosition = this.playPosition + ((Date.now() - this.playTime) / 1000);
	var realPosition  = this.currentAudioBookPosition;

	if(realPosition == 0 || !BookUtils.instance.approximately(audioPosition, realPosition, 0.01))
	{
		this.updateAudioPositionCalculationVariables();//Update the position calculation variables if necessary

		return realPosition;
	}

	return audioPosition;
};

////////////////////////////////////////////////////////////////////////////
function BPAudioProgress()
{
  var slowFile = BookJSON.getInstance().getBookSndSlowfile();
	this.soundJSONInfo 		   = BookJSON.getInstance().getBookSnd();
	this.soundPlayer 		   = new BPSoundPlayer(BookJSON.getInstance().getBookSndFilename());
	this.hasSlowAudio 		   = slowFile != "";
	this.slowSoundPlayer       =  this.hasSlowAudio ?  new BPSoundPlayer(slowFile) : null;
	this.secondarySoundPlayer  = this.slowSoundPlayer;
	this.currentSoundPlayer    = this.soundPlayer;
	this.pagebreaks 		   = BookJSON.getInstance().getBookSndPageBreaks();
	this.totalPages 		   = 0;
	this.currentPageBreakIndex = 0;
	this.isAudioProgressLoaded = false;
	this.onProgress			   = null;
	this.onEndProgress		   = null;
	this.progress 			   = 0;
	this.audioPosition		   = 0;
	this.playbackCompleted     = false;
	this.isPlaying			   = false;
	this.isUsingSlowAudio      = false;
	this.soundDuration		   = 0;

	this.onCurrentPagesFinalPositionExceeded   = null;
	this.onCurrentPagesInitialPositionExceeded = null;
}

/* Load the normal audio*/
BPAudioProgress.prototype.load = function(onLoadingCompleteCallback)
{
	this.onLoadingCompleteCallback = onLoadingCompleteCallback;

	var context = this;

	this.soundPlayer.load( function(sender) {context.onAudioLoadingComplete(sender)});
};

/* When the normal audio was loaded, the slow audio will start to load */
BPAudioProgress.prototype.onAudioLoadingComplete = function(sender)
{
	var context = this;
	var audioDuration = this.soundPlayer.getDuration();

	for(var i = 0; i<this.pagebreaks.length; i++){
		if(parseFloat(this.pagebreaks[i]) > audioDuration)
			this.pagebreaks[i] = (audioDuration -0.1).toString();
		if(parseFloat(this.pagebreaks[i]) <= 0)
			this.pagebreaks[i] = (0).toString();
	}

	if(this.hasSlowAudio)
		this.slowSoundPlayer.load( function(sender) { context.onSlowAudioLoadingComplete(sender) });
	else
		context.onSlowAudioLoadingComplete(sender);
};

BPAudioProgress.prototype.onIEAudioLoad = function()
{
	this.pagebreaks.length = 0;
	this.pagebreaks 		   = BookJSON.getInstance().getBookSndPageBreaks();

	var audioDuration = this.soundPlayer.getDuration();

	for(var i = 0; i<this.pagebreaks.length; i++){
		if(parseFloat(this.pagebreaks[i]) > audioDuration)
			this.pagebreaks[i] = (audioDuration -0.1).toString();
		if(parseFloat(this.pagebreaks[i]) <= 0)
			this.pagebreaks[i] = (0).toString();
	}
};

BPAudioProgress.prototype.resetAudioPosition = function(){
	this.soundPlayer.setPosition(0);
	setElementTime(this.soundPlayer.audioBook.element, 0);
	this.soundPlayer.updateAudioPositionCalculationVariables();
	this.slowSoundPlayer.setPosition(0);
	setElementTime(this.slowSoundPlayer.audioBook.element, 0);
	this.slowSoundPlayer.updateAudioPositionCalculationVariables();
	this.secondarySoundPlayer.setPosition(0);
	setElementTime(this.secondarySoundPlayer.audioBook.element, 0);
	this.secondarySoundPlayer.updateAudioPositionCalculationVariables();
	this.currentSoundPlayer.setPosition(0);
	setElementTime(this.currentSoundPlayer.audioBook.element, 0);
	this.currentSoundPlayer.updateAudioPositionCalculationVariables();
	this.updateProgress(0);
	this.progress	= 0;
	this.audioPosition	= 0;
	this.playbackCompleted = false;
};

/* When the slow audio was loaded, report both normal and slow audios are ready */
BPAudioProgress.prototype.onSlowAudioLoadingComplete = function(sender)
{
	this.isAudioProgressLoaded 	= true;
	this.setCurrentIndexPageBreakIndex(this.currentPageBreakIndex, false);
	this.onLoadingCompleteCallback(this);
};

BPAudioProgress.prototype.getSoundDuration = function() {
	if (this.soundDuration == 0) {
		this.soundDuration = this.soundPlayer.getDuration();
		return this.soundDuration;
	} else {
		return this.soundDuration;
	}
};

BPAudioProgress.prototype.play = function()
{
	this.currentSoundPlayer.playAudio();
	this.isPlaying = true;

};

BPAudioProgress.prototype.pause = function()
{
    this.currentSoundPlayer.pauseAudio();
    this.isPlaying = false;
};

BPAudioProgress.prototype.stop = function()
{
	this.currentSoundPlayer.stopAudio();
	this.isPlaying = false;
};

/* This method is called while the user is moving the slider*/
BPAudioProgress.prototype.updateProgress = function(progress) //value between 0 , 1
{
	this.progress      = progress;
	this.audioPosition = progress * this.getSoundDuration();

	for(var i = 0; i<book.pages.length; i++){
		this.checkForBreakPositions()
	}//Update page positions, rewind to new progress

	this.setAudioPosition(this.audioPosition);
};


BPAudioProgress.prototype.update = function()
{
	if(this.isPlaying)
	{
		this.audioPosition = this.getAudioPosition();
		this.progress      = this.audioPosition / this.getSoundDuration();

		this.checkForPlaybackCompleted();

		if(this.playbackCompleted)
			return;

		this.checkForBreakPositions();

		if(this.onProgress != null)
			this.onProgress(this);
	}

	/* When user taps Home button in his device and he restarts the app he will hear the normal audio and slow audio play at the same time.
	 Therefore, this workaround will fix that problem, because the secondary audio (normal or slow ) will pause while
	 the current audio (normal or slow) is playing.
	 */
	if(this.hasSlowAudio && this.slowSoundPlayer.isPlaying)
		this.secondarySoundPlayer.pauseAudio();
};

/* Check if the current audio finished*/
BPAudioProgress.prototype.checkForPlaybackCompleted = function()
{
	if(this.progress >= BookConstants.BOOK_AUDIO_MAX_PROGRESS)
    {
    	return;
    	if(!this.playbackCompleted)
    	{
			this.isPlaying = false;
    		if(this.onEndProgress != null){
    			this.onEndProgress(this);
    		}

    		this.playbackCompleted = true;
    	}
    }
    else
    	this.playbackCompleted = false;
};

BPAudioProgress.prototype.finishedAudio = function () {
	pause();
	if(!this.playbackCompleted)
	{
		this.isPlaying = false;
		if(this.onEndProgress != null){
			this.onEndProgress(this);
		}

		this.playbackCompleted = true;
	}
};

/* Report if the book needs to go to the next/previous page */
BPAudioProgress.prototype.checkForBreakPositions = function()
{

	if(this.audioPosition > this.finalBreakPosition)
	{
		if(this.onCurrentPagesFinalPositionExceeded)
			this.onCurrentPagesFinalPositionExceeded(this);

		return true;
	}

	if(this.audioPosition  < this.initialBreakPosition - 1)//Using approximately to fix floating precision issues
	{
		if(this.onCurrentPagesInitialPositionExceeded)
			this.onCurrentPagesInitialPositionExceeded(this);

		return true;
	}

	return false;
};

BPAudioProgress.prototype.goToNextPages = function(forceAudioPositionUpdate)
{
	var nextPageBreakIndex = this.currentPageBreakIndex + 1;

	if(nextPageBreakIndex <= (this.totalPages/2))
		this.setCurrentIndexPageBreakIndex(nextPageBreakIndex, forceAudioPositionUpdate);
};

BPAudioProgress.prototype.goToPreviousPages = function(forceAudioPositionUpdate)
{
	var previousPageBreakIndex = this.currentPageBreakIndex - 1;

	if(previousPageBreakIndex > -1)
		this.setCurrentIndexPageBreakIndex(previousPageBreakIndex, forceAudioPositionUpdate);
};

BPAudioProgress.prototype.getNextBreakPosition = function()
{
	var index    = this.currentPageBreakIndex;
	var position = index > (this.totalPages/2) - 1 ? Number.MAX_VALUE : parseFloat(this.pagebreaks[index]);
	return position;
};

BPAudioProgress.prototype.getPreviousBreakPosition = function()
{
	var index    = this.currentPageBreakIndex - 2;
	var position = index < 0 ? 0 : parseFloat(this.pagebreaks[index]);
	return position;
};

BPAudioProgress.prototype.setCurrentIndexPageBreakIndex = function(index, forceAudioPositionUpdate)
{
	var previousIndex 		   = index - 1;
	this.initialBreakPosition  = previousIndex < 0 					? 0.01 			   : parseFloat(this.pagebreaks[previousIndex]);
	this.finalBreakPosition    = index > (this.totalPages/2) - 1 ? Number.MAX_VALUE : parseFloat(this.pagebreaks[index]);
	this.currentPageBreakIndex = index;

	this.restartCurrentPagesAudioPosition(forceAudioPositionUpdate);
};

BPAudioProgress.prototype.getSpecialFinalBreak = function()
{
	var index = (this.totalPages / 2) - 1;
	return (parseFloat(this.pagebreaks[index]) + 0.2);
};

BPAudioProgress.prototype.restartCurrentPagesAudioPosition = function(force)
{
	if(force)
	{
		this.setAudioPosition(this.initialBreakPosition);
	}
};

BPAudioProgress.prototype.getAudioPosition = function()
{
	if(this.isUsingSlowAudio)
	{
		var slowAudioProgress = this.slowSoundPlayer.getPosition() / this.getSlowAudioDuration();

		return slowAudioProgress * this.getSoundDuration();
	}
	else
		return this.soundPlayer.getPosition();
};

BPAudioProgress.prototype.setAudioPosition = function(position)
{
	if(this.isUsingSlowAudio)
	{
		var audioProgress = position / this.getSoundDuration();
		this.slowSoundPlayer.setPosition(audioProgress * this.getSlowAudioDuration());
	}
	else{
		this.soundPlayer.setPosition(position);
	}
};

BPAudioProgress.prototype.getSlowAudioDuration = function()
{
	if(BookConstants.USE_SLOW_AUDIO_DURATION_PERCENTAGE_ENABLED)
		return this.getSoundDuration() * BookConstants.SLOW_AUDIO_DURATION_PERCENTAGE;
	else
		return this.slowSoundPlayer.getDuration();
};

BPAudioProgress.prototype.useSlowAudio = function(value)
{
	if(this.isUsingSlowAudio != value)
	{
		var position 		  = this.getAudioPosition();
		this.isUsingSlowAudio = value;

		if(this.isUsingSlowAudio)
		{
			this.currentSoundPlayer = this.slowSoundPlayer;
			this.secondarySoundPlayer = this.soundPlayer;

			if(this.soundPlayer.isPlaying)
				this.currentSoundPlayer.playAudio();
			else
				this.currentSoundPlayer.pauseAudio();

			this.soundPlayer.pauseAudio();
		}
		else
		{
			this.currentSoundPlayer = this.soundPlayer;
			this.secondarySoundPlayer = this.slowSoundPlayer;

			if(this.slowSoundPlayer.isPlaying)
				this.currentSoundPlayer.playAudio();
			else
				this.currentSoundPlayer.pauseAudio();

			this.slowSoundPlayer.pauseAudio();
		}

		this.setAudioPosition(position);
	}
};

////////////////////////////////////////////////////////////////////////////
function BPAnimation(animationJSONInfo)
{
    this.animationId     = animationJSONInfo["id"];
    this.positionX       = animationJSONInfo["x"];
    this.positionY       = animationJSONInfo["y"];
    this.height          = animationJSONInfo["height"];
    this.width           = animationJSONInfo["width"];
    this.playOnPosition  = parseFloat(animationJSONInfo["playpos"]);
    this.duration        = parseFloat(animationJSONInfo["duration"]);
    this.playOnHover     = animationJSONInfo["playOnHover"];
    this.playOnClick     = animationJSONInfo["playOnClick"];
    this.loop            = animationJSONInfo["loop"];
    this.playArea        = this.playOnPosition + this.duration;
    this.position        = 0;
    this.isPlaying       = false;
    this.animationPlayer = null;
    this.container       = null;
    this.isBookPlaying   = false;
    this.isHidden        = true;
    this.previousFrame   = 0;

    this.onForcePauseAnimationCallBack = null;
    this.onLoadingCompleteCallback     = null;

    this.createContainer();
}

/*Create a div to contain the animation*/
BPAnimation.prototype.createContainer = function()
{
    this.container                = document.createElement('div');
    this.container.style.position = 'absolute';
    this.container.style.width    = this.width +'px';
    this.container.style.height   = this.height + 'px';
    this.container.className      += " forceCrispyRender";

    this.container.id             = this.animationId + "_" + Math.round(Math.random()*200);


};

/*Load the animation using the mediaManager*/
BPAnimation.prototype.loadAnimation = function(onLoadingCompleteCallback)
{
    this.onLoadingCompleteCallback = onLoadingCompleteCallback;
    var context = this;
    var shouldLoop = !(context.playOnHover || context.playOnClick);
    this.animationPlayer = graphicPlayerManager.loadAnimation(this.container, this.animationId, false, shouldLoop);
    addListener(this.animationPlayer, 'animationReady', function(){
        context.onAnimationLoaded();
    });
};

/* When the animation was loaded, the listeners events will be attached */
/* Graphic player events: animationReady, animationStarted, animationStopped, animationRunning */
BPAnimation.prototype.onAnimationLoaded = function()
{
    var context = this;
    this.scaleX = this.height/this.animationPlayer.data.height;
    this.scaleY = this.width/this.animationPlayer.data.width;

    //scales animation
    this.container.firstChild.style.transform = "scaley("+this.scaleX+") "
                                                                + "scalex("+this.scaleY+")";
    this.container.firstChild.style.webkitTransform = "scaley("+this.scaleX+") "
                                                                + "scalex("+this.scaleY+")";
    this.container.firstChild.style.mozTransform = "scale("+this.scaleX+","+this.scaleY+")";
    this.container.firstChild.style.transformOrigin = "0 0";
    this.container.firstChild.style.webkitTransformOrigin = "0 0";
    this.container.firstChild.style.mozTransformOrigin = "0 0";

    if(this.onLoadingCompleteCallback != null)
    {
        this.onLoadingCompleteCallback(this);
        this.onLoadingCompleteCallback = null;
    }
};

BPAnimation.prototype.setAnimationClick = function()
{
    var context = this;
    this.container.onclick = function () {
        if(context.playOnClick && !book.isPlaying && !isPageDragging && !book.pageFlipAnimator.isAnimating){
            context.onForcePlayAnimation();
        }
    };
};

BPAnimation.prototype.setAnimationMouseOver = function()
{
    var context = this;
    this.container.onmousemove = function () {
        if(context.playOnHover && !book.isPlaying && !isPageDragging && !book.pageFlipAnimator.isAnimating){
            context.onForcePlayAnimation();
        }
    };
};


/* Append the animation inside of element (page)*/
BPAnimation.prototype.renderToCanvas = function(divContainer, isRightPageCanvas)
{
    var offset = isRightPageCanvas ? BookConstants.ANIMATIONS_RIGHT_OFFSET : BookConstants.ANIMATIONS_LEFT_OFFSET;
    this.container.style.left     = (this.positionX + offset.x) + 'px';
    this.container.style.top      = (this.positionY + offset.y) + 'px';
    this.container.style.zIndex   = 5;
    divContainer.appendChild(this.container);
    this.animationPlayer.gotoAndStop(1);//reset animation state
};

BPAnimation.prototype.removeFromCanvas = function (divContainer) {
    //legend says it is faster to add and remove a child than searching for the child before removing.
    divContainer.appendChild( this.container );
    divContainer.removeChild( this.container );
}

/* Display the animation*/
BPAnimation.prototype.showAnimation = function(position)
{
    if(position)
        this.setAnimFrame(position);
    this.container.style.display = "block";
    this.isHidden = false;
};

/* Hide the animation*/
BPAnimation.prototype.hideAnimation = function()
{
    if(this.animationPlayer != null && this.container.style.display != "none")
    {
        this.stopAnimation();
        this.container.style.display = "none";
        this.isHidden = true;
    }
};

/* when the user taps/clicks over the animation,this method will force that the animation plays*/
BPAnimation.prototype.onForcePlayAnimation = function()
{
    if(!this.animationPlayer.isPlaying && !book.pageFlipAnimator.isAnimating)
    {
        book.stopEventAnimations();
        book.stopAllAnimations();
        if(this.animationPlayer.currentFrame != 1)
            this.animationPlayer.gotoAndStop(1);
        this.animationPlayer.play();
    }
};

BPAnimation.prototype.playAnimation = function()
{
	if(this.animationPlayer != null && !this.playOnHover && !this.playOnClick){
		if(!this.isPlaying){
			this.animationPlayer.play();
			this.isPlaying = true;
		}
	}
};

BPAnimation.prototype.playAnimationFromPoint = function(startPoint)
{
    if(this.animationPlayer != null && !this.playOnHover && !this.playOnClick){
        if(!this.isPlaying){
            if(this.animationPlayer.currentFrame != parseInt(startPoint))
                this.animationPlayer.gotoAndStop( parseInt(startPoint) );
            this.isPlaying = true;
        }
    }
};

BPAnimation.prototype.setAnimFrame = function (position)
{

  //if(book.disablePageFlip){
    //if(book.isPlaying || book.isDraggingSlider || hud.progressSlider.isDragging)
    //{
        this.gotoPosition(position);
    //}
  //}
}

BPAnimation.prototype.gotoPosition = function (position) {
  var speedModifier = 1;
  if(book.audioProgress.isUsingSlowAudio)
    speedModifier =  BookConstants.SLOW_AUDIO_DURATION_PERCENTAGE;

    if(this.playOnHover || this.playOnClick)
        return; //do not set position if animation is click or hover
    if(position > (this.playArea * speedModifier)){
        this.pauseAnimation();
        this.updateAnimation(this.playArea * speedModifier);
        return;
    }

    var targetPosition = position - (this.playOnPosition * speedModifier);
    var targetFrame = (targetPosition * this.animationPlayer.frameRate);
    var firstTargetFrame = targetFrame;
    var realTotalFrames = this.animationPlayer.totalFrames;
    var animDuration = realTotalFrames/this.animationPlayer.frameRate;


    if(parseInt(position) <= parseInt(this.playOnPosition * speedModifier)){
      this.animationPlayer.gotoAndStop(1);
      return;
    }
    while(targetFrame > realTotalFrames){
        targetFrame -= realTotalFrames;
    };

    if(targetFrame < 1){
        targetFrame += realTotalFrames;
    }
    targetFrame = parseInt(targetFrame);

    if(targetFrame != this.animationPlayer.currentFrame){ //only calls gotoAndStop if frame is in fact different from current frame.
        this.animationPlayer.gotoAndStop( targetFrame  );
    }
}

BPAnimation.prototype.updateAnimation = function(position)
{

  var speedModifier = 1;
  if(book.audioProgress.isUsingSlowAudio)
    speedModifier = BookConstants.SLOW_AUDIO_DURATION_PERCENTAGE;
    position =  position *  speedModifier;
    if(this.animationPlayer != null ){
        if( position >= (this.playOnPosition *  speedModifier) && position <= ((this.playArea * speedModifier) - 0.12)  && !this.playOnHover && !this.playOnClick){
            //if(!this.animationPlayer.isPlaying && !this.playOnHover && !this.playOnClick) {
            if(!this.playOnHover && !this.playOnClick) {

                if(!this.animationPlayer.isPlaying) {//update animation current frame accordingly to book position
                    this.setAnimFrame(position);
                }
                if(book.isPlaying) { // automatic animations only play if book is playing
                    this.animationPlayer.play();
                }
            }
          //}
        }else {

            if(book.isPlaying) {
                this.animationPlayer.stop();
            }else{
                this.stopAnimation();
            }
            //if(position < this.playOnPosition && !this.playOnHover && !this.playOnClick && !this.animationPlayer.isPlaying) //resets animation if its before its play position
            //  this.animationPlayer.gotoAndStop(1);
            if(position >= ((this.playArea * speedModifier) - 0.12) && !(this.playOnClick || this.playOnHover)){

                this.pauseAnimation();
                this.setAnimFrame(this.playArea * speedModifier); //this should make the animation stay at its last frame
            }
               //this.animationPlayer.gotoAndStop(this.animationPlayer.totalFrames-1);
        }
    }
};

BPAnimation.prototype.pauseAnimation = function()
{
    if(this.animationPlayer != null) {
        this.animationPlayer.stop();
        this.isPlaying = false;
    }
};

BPAnimation.prototype.stopAnimation = function()
{
    if(this.animationPlayer != null) {
        if((this.playOnClick || this.playOnHover) && this.animationPlayer.currentFrame != 1) { //reset position ONLY if it's an event animation
            this.animationPlayer.gotoAndStop(1);
        } else {
            this.animationPlayer.stop();
        }
        this.isPlaying = false;
    }
};

////////////////////////////////////////////////////////////////////////////
function BPImageLayer(imageJSONInfo)
{
    this.imageJSONInfo  = imageJSONInfo;
    this.image          = null;
    this.imageURL       = BookUtils.instance.getBookAssetPath(this.imageJSONInfo["imgurl"]);
    this.imagePositionX = this.imageJSONInfo["x"];
    this.imagePositionY = this.imageJSONInfo["y"];
    this.width          = this.imageJSONInfo["width"];
    this.height         = this.imageJSONInfo["height"];
    this.isImageLoaded  = false;
    this.onLoadingCompleteCallback = null;

    this.currentParent = null;
}

BPImageLayer.prototype.onImageLoaded = function()
{
    this.image.style.position = 'absolute';
    this.image.style.width  = this.width + 'px';
    this.image.style.height = this.height + 'px';
    this.image.style.zIndex = 2;

    this.isImageLoaded = true;
    if(this.onLoadingCompleteCallback != null)
        this.onLoadingCompleteCallback(this);
};

BPImageLayer.prototype.onImageLoadingFailed = function()
{
    console.log("image at path = '" + this.image.src + "'' could not be loaded");
    this.onImageLoaded();
};

BPImageLayer.prototype.load = function(onLoadingCompleteCallback)
{
    this.onLoadingCompleteCallback = onLoadingCompleteCallback;

    if(this.imageJSONInfo != null)
    {
        var context 	   = this;
        this.image         = new Image();
        this.image.onload  = function() { context.onImageLoaded(); };
        this.image.onerror = function() { context.onImageLoadingFailed(); };
        this.image.src     = this.imageURL;
    }
    else
    {
        this.isImageLoaded = true;

        if(this.onLoadingCompleteCallback != null)
            this.onLoadingCompleteCallback(this);
    }
};

BPImageLayer.prototype.renderToCanvas = function(divContainer, isRightPageCanvas)
{
    var offset = isRightPageCanvas ? BookConstants.IMAGE_LAYER_RIGHT_OFFSET : BookConstants.IMAGE_LAYER_LEFT_OFFSET;
    this.image.style.left   = this.imagePositionX + offset.x + 'px';
    this.image.style.top    = this.imagePositionY + offset.y + 'px';

    this.currentParent = divContainer;
    this.currentParent.appendChild(this.image);
};


BPImageLayer.prototype.hideImage = function()
{
    if(this.image && this.currentParent){
        this.currentParent.appendChild(this.image);
        this.currentParent.removeChild(this.image);
    }
};





////////////////////////////////////////////////////////////////////////////
function BPGeneralUILoader()
{
}

BPGeneralUILoader.prototype.load = function(onLoadingCompleteCallback)
{
	this.onLoadingCompleteCallback 		 	= onLoadingCompleteCallback;
	this.loadedAssetsCount 		         	= 0;
	this.totalAssets 	   				 	= 0;
	this.isGeneralUILoaded 				 	= false;

	this.coverBackgroundImage 			 	= this.loadImage("book-cover.png");
	this.coverBackgroundImageAlpha 			= this.loadImage("book-cover-alpha.png");
	this.coverBackgroundImageFlipped 	 	= this.loadImage("book-cover-left.png");
	this.coverBackgroundImageFlippedAlpha 	= this.loadImage("book-cover-left-alpha.png");
	this.coverBackgroundImageCenter		 	= this.loadImage("book-cover-middle.png");
	this.coverBackgroundImageCenterAlpha	= this.loadImage("book-cover-middle-alpha.png");

	this.pageBorderBottomImageFlipped	 	= this.loadImage("page_border_bottom_flipped.png");
	this.pageBorderSideImageFlipped		 	= this.loadImage("page_border_side_flipped.png");
	this.pageBorderBottomImage			 	= this.loadImage("page_border_bottom.png");
	this.pageBorderSideImage			 	= this.loadImage("page_border_side.png");

	this.rightBorderImage 			   	 	= this.loadImage("book_page_right.png");
	this.leftBorderImage 			     	= this.loadImage("book_page_left.png");
	this.bottomBorderImage 			     	= this.loadImage("book_long_shadow_no_transparency.png");
	this.bottomShortBorderImage 	     	= this.loadImage("book_short_shadow_botton_no_transparency.png");
};

BPGeneralUILoader.prototype.loadImage = function(imageSource)
{
	this.totalAssets++;

	var image 	 = new Image();
	var context  = this;
	image.onload = function() { context.onImageLoaded(); };
	image.src    = "/photobook/public_html/bookplayer/artmin/html5/bookplayer/theme/bookborder/" + imageSource;

	return image;
};

BPGeneralUILoader.prototype.onImageLoaded = function()
{
	this.loadedAssetsCount++;

	if(this.loadedAssetsCount == this.totalAssets)
	{
		tintCoverImages();
		this.isGeneralUILoaded = true; 
		this.onLoadingCompleteCallback(this);
	}
};
////////////////////////////////////////////////////////////////////////////
// 可显示/隐藏的播放面板
function BPHUD(divElement)
{
	this.divElement = divElement;

	var spinnerElement	     = document.getElementById('loadingSpinner');
	var bookProgressSlider   = document.getElementById('bookProgressSlider');
	var playPauseCheckboxDiv = document.getElementById('playPauseCheckbox');

	this.spinnerLoader 	     = new BPSpinner(spinnerElement);
	this.progressSlider      = new BPSlider(bookProgressSlider);
	this.playPauseCheckbox   = new BPCheckBoxComponent(playPauseCheckboxDiv, BPHUD.prototype.tintProgressBar);
	this.currentTimeContainer	= document.getElementById("progress-currentTime");
	this.totalTimeContainer 	= document.getElementById("progress-totalTime");

	/*
	***
	GetPosition methods is going inside this scope because global scope of this context is not enabled by class structure of this code.
	For this feature we need to be able to acess the progressSlider and there are no means to get this as a global acess scope on this structure, this will always have only metrhods and not properities.
	***
	*/

	this.progressSlider.element.addEventListener("click", function (e) {

		if(isRestarting || book.pageFlipAnimator.isAnimating) //prevents user from clicking on progress bar while restarting
			return;

		if (e != null) {
      		e.stopPropagation();
      		e.preventDefault();
    	}

    	if(e.target.id == "progressCircle")
			return;

		clickedOnProgressBar = true;
		hud.progressSlider.isDragging = true; //workaround for pause after page bug
		book.updatePagesImmediately = true;
		book.stopAllAnimations();
		book.stopEventAnimations();

		window.setTimeout(function () {
			hud.progressSlider.isDragging = false;
			var bookCurrentTime;
			clickedOnProgressBar = false;
			if(book.audioProgress.isUsingSlowAudio){
		      bookCurrentTime = hud.progressSlider.progress * book.audioProgress.getSlowAudioDuration();
		    }else{
		      bookCurrentTime = hud.progressSlider.progress*book.audioProgress.soundPlayer.getDuration();
		    }
		    if(book.currentLeftPage)
				book.currentLeftPage.pauseAnimations();
			if(book.currentRightPage)
				book.currentRightPage.pauseAnimations();
			book.updatePagesImmediately = false;
			book.removeAllAnimations();
			book.updatePages(book.audioProgress.audioPosition);
			//var fakeSender = {"progress" : hud.progressSlider.progress};
			hud.progressSlider.updateForeground(hud.progressSlider.progress);
		}, 10);
		book.removeAllAnimations();
		hud.moveSlider(e);
	});

}

BPHUD.prototype.moveSlider = function(e) {

	if(e){
		e.preventDefault();
		e.stopPropagation();
	}

	if(e.target.id == "progressCircle")
		return;

	var X = e.offsetX; //;
	var W = hud.progressSlider.max;
	var pos = X/W;

	if(pos < 0.002 || pos > 1.03)
		return;

	if(pos <= 0.002)
		pos = 0

	if(pos >= 1)
		pos = 1

	if(isRestarting)
		return;
	if(book.isPlaying) //prevents book from playing while user is dragging slider.
		book.pause();

	closeSettingsBox();

	book.disablePageFlip = true;
	book.removeAllAnimations();
	hud.playPauseCheckbox.setIsChecked(false);
	var fakeSender = {"progress" : pos}
	hud.progressSlider.forceSliderProgress(pos);
	onSliderProgressChange( fakeSender );

	book.removeAllAnimations();
    if(book.currentRightPage){
      book.currentRightPage.showAnimations();
    }
    if(book.currentLeftPage){
      book.currentLeftPage.showAnimations();
    }

}

BPHUD.prototype.showHud = function(event)
{
	var booksButton = document.getElementById('booksButton');
	booksButton.className = "unselectable";
	
	this.divElement.className = "unselectable";
	bookDiv.className = bookDiv.className.replace(" resizedBook", "");
	BPHUD.prototype.showAnimationHud();
};

BPHUD.prototype.hideHud = function () {
	var booksButton = document.getElementById('booksButton');
	booksButton.className = "unselectable hide";

	closeSettingsBox();
		BPHUD.prototype.hideAnimationHud();
	this.divElement.className = "unselectable hide"; //add class "resizedBook" to #bookContainer

setTimeout(function(){
	if(bookDiv.className.indexOf("resizedBook") == -1 )
		bookDiv.className += " resizedBook";
	},65);

}

BPHUD.prototype.hideShow = function(event)
{
	event.stopPropagation();
	event.preventDefault();

	if(bookDiv.className.indexOf("bookResizeTransition") == -1) //adds transition time to book container.
		bookDiv.className += " bookResizeTransition";
	if(this.divElement.className == "unselectable hide"){
		this.showHud();
	}else{
		this.hideHud();
	}
};

BPHUD.prototype.showAnimationHud = function()
{
	var bg0 = document.getElementById('background_fill_0');
	var bg1 = document.getElementById('background_fill_1');
	var bg2 = document.getElementById('background_fill_2');
	var currentTimeContainer	= document.getElementById("progress-currentTime");
	var totalTimeContainer 	= document.getElementById("progress-totalTime");
	setTimeout(function(){
		bg0.className = " backgroundForegroundAnimation";
		bg1.className = " backgroundForegroundAnimation";
		bg2.className = " backgroundForegroundAnimation";
		currentTimeContainer.className = "progressTime init opacityControl";
		totalTimeContainer.className = "progressTime fim opacityControl";
	}, 750);
}

BPHUD.prototype.hideAnimationHud = function()
{
		var bg0 = document.getElementById('background_fill_0');
		var bg1 = document.getElementById('background_fill_1');
		var bg2 = document.getElementById('background_fill_2');
		var currentTimeContainer	= document.getElementById("progress-currentTime");
		var totalTimeContainer 	= document.getElementById("progress-totalTime");
		setTimeout(function(){
			bg0.className = "";
			bg1.className = "";
			bg2.className = "";
			currentTimeContainer.className = "progressTime init";
			totalTimeContainer.className = "progressTime fim";
		}, 1500);
}

BPHUD.prototype.showHUD = function()
{
	this.divElement.style.display = 'inherit';
};

BPHUD.prototype.hideHUD = function()
{
	this.divElement.style.display = 'active';
};

BPHUD.prototype.updateProgressTime = function (_intCurrentTime, _intTotalTime) {

	var targetAudio = book.audioProgress.isUsingSlowAudio ? book.audioProgress.slowSoundPlayer.audioBook.element : book.audioProgress.currentSoundPlayer.audioBook.element;

	if(parseInt(_intCurrentTime, 10) > parseInt(_intTotalTime, 10))
		_intCurrentTime = _intTotalTime;

	this.currentTimeContainer.innerHTML = this.convertTime(_intCurrentTime);
	this.totalTimeContainer.innerHTML = this.convertTime(_intTotalTime);
}

BPHUD.prototype.convertTime = function (time) {
	var sec_num = parseInt(time, 10);
	var hours   = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);
	if (seconds < 10) {seconds = "0"+seconds;}
	var time = minutes+':'+seconds;
	return time;
}

BPHUD.prototype.tintProgressBar = function(isPaused)
{
	barForegound = document.getElementById('foreground-fill');
	barBackground = document.getElementById('background_fill_2');
	if(isPaused){
		barForegound.style.backgroundColor = '#0052a5';
		barBackground.style.backgroundColor = '#007eff';
	}else{
		barForegound.style.backgroundColor = '#007eff';
		barBackground.style.backgroundColor = '#0052a5';
	}
}

////////////////////////////////////////////////////////////////////////////
function BPSlider(element)
{
    this.element            = element;
    this.progressCircle     = document.getElementById('progressCircle');
    this.min                = 0;
    this.max                = element.offsetWidth - this.progressCircle.offsetWidth - 8;
    this.slider             = new Slider(this.progressCircle, this.min, this.max);
    this.progress           = 0;
    this.isDragging         = false;
    this.onStartDrag        = null;
    this.onEndDrag          = null;
    this.onProgressChanged  = null;

    this.initialize();
}

BPSlider.prototype.initialize = function()
{
    var context = this;
    addListener(this.slider,'slideStart',function(event){context.sliderStart(event); });
    addListener(this.slider,'slideEnd',function(event){context.sliderEnd(event); });
    addListener(this.slider,'slideMove',function(event){context.sliderMove(event); });
};

BPSlider.prototype.updateProgress = function(pos, _force)
{
    if(!getAudioState() && !_force)
        return;

    var diff = Math.abs(pos - this.progress);

    if(diff<0.003) //BE-368 Workaround to solve progress circle shaking
        return;

    this.progress = pos;
    this.slider.setPosition(pos);
    sliderForeground.style.width = pos*100 + "%";

    sliderForeground.style.left = Math.round(sliderForeground.style.left.replace("px", "")) + "px";

    this.updateForeground(pos);
};

BPSlider.prototype.updateForeground = function(pos)
{
    if(pos != null)
    {
        sliderForeground.style.width = pos*100 + "%";
    }else
    {
        var progress  = book.audioProgress.getAudioPosition() / book.audioProgress.soundPlayer.getDuration();
        sliderForeground.style.width = progress*100 + "%";
    }
};

BPSlider.prototype.sliderStart = function(event)
{
    this.isDragging = true;
    this.progress = this.slider.position;
    book.audioProgress.playbackCompleted = false; //BE-448 this prevents the book from restarting if the user finishes the book and scrolls to another point.

    if(this.onStartDrag != null)
        this.onStartDrag(this);
};

BPSlider.prototype.sliderMove = function(event)
{
    if(this.onProgressChanged != null)
    {
        this.progress = this.slider.position;
        this.onProgressChanged(this);
        this.updateForeground(this.slider.position);
    }
};

BPSlider.prototype.forceSliderProgress = function (_value) {
    var diff = Math.abs(_value - this.progress);
    this.progress = _value;
    this.slider.setPosition(_value);
}

BPSlider.prototype.sliderEnd = function(event)
{
    this.isDragging = false;

    if(this.onEndDrag != null)
        this.onEndDrag(this.slider);
};

////////////////////////////////////////////////////////////////////////////
function BPCheckBoxComponent(parentDiv, callback)
{
	this.parentDiv		    = parentDiv;
	this.elementChecked 	= parentDiv.getElementsByClassName('checked')[0];
	this.elementUnChecked 	=  parentDiv.getElementsByClassName('unchecked')[0];
	this.onStateChangeEvent = null;
	this.isChecked 			= false;
	this.elapseTime = 0;
	this.difference = 0.5;

	if(callback != null){
		this.callback = callback;
	}
	
	this.initialize();
}

BPCheckBoxComponent.prototype.initialize = function() 
{
	this.setIsChecked(false);

};

BPCheckBoxComponent.prototype.onElementClick = function(event)
{
	closeSettingsBox();
	event.stopPropagation();
	event.preventDefault();
	
	var time = Date.now();
	if ((time - this.elapseTime)/1000 > this.difference)
	{
		this.elapseTime = Date.now();
		this.setIsChecked(!this.isChecked);
		
		if (this.onStateChangeEvent != null)
			this.onStateChangeEvent(this);
	}
};

BPCheckBoxComponent.prototype.setIsChecked = function(isChecked) 
{
	if(isChecked)
	{
		this.elementChecked.style.visibility   = 'visible';
		this.elementUnChecked.style.visibility = 'hidden';
	}
	else
	{
		this.elementChecked.style.visibility   = 'hidden';
		this.elementUnChecked.style.visibility = 'visible';	
	}

	this.isChecked = isChecked;
	if(this.callback != null){
		this.callback(isChecked);
	}
};

////////////////////////////////////////////////////////////////////////////
// 转动的图标，定时转动一个角度，效果就是在不停的转动
function BPSpinner(element)
{
    this.spinnerElement            = element;
    this.spinCount                 = 0;
    this.spinnerInterval           = null;
    this.currentRotation           = 0;
    this.rotationIncrementPerFrame = -4;
    this.updateSpinFrameInterval   = 5;

}

BPSpinner.prototype.start = function()
{
    var context          = this;
    this.spinnerElement.style.visibility = 'visible';
    this.spinnerElement.style.display    = 'block';
    this.spinnerInterval = setInterval(function() { context.updateInterval(); }, 1000 / BookConstants.SPINNER_FPS);
};

BPSpinner.prototype.stop = function()
{
    clearInterval(this.spinnerInterval);

    this.spinnerInterval                 = null;
    this.spinnerElement.style.visibility = 'hidden';
    this.spinnerElement.style.display = 'none';
};

BPSpinner.prototype.updateInterval = function()
{
    this.spinCount++;
    this.currentRotation += this.rotationIncrementPerFrame;
};

////////////////////////////////////////////////////////////////////////////
function BPDragPageGesture(element)
{
    this.element             = element;
    this.min 			     = 0;

    this.initialPageX        = 0;
    this.initialProgress     = 0;
    this.progress            = 0;
    this.startDrag 		     = false;
    this.isDragging 		 = false;
    this.isDraggingRightPage = false;
    this.touchIdentifier     = 0;

    this.isDisabled  = false;
    this.hitAreaClicked = false;

    this.onStartDrag	    = null;
    this.onEndDrag	        = null;
    this.onProgressChanged  = null;

    var context 			= this;
    this.mouseMoveFunction  = function(event) { context.onMouseMove(event); };
    this.touchMoveFunction  = function(event) { context.onTouchMove(event); };
    this.mouseUpFunction    = function(event) { context.onMouseUp(event); };
    this.touchEndedFunction = function(event) { context.onTouchEnd(event); };

    this.initialize();
}

BPDragPageGesture.prototype.initialize = function()
{
    var context = this;

    if(touchCapable)
        this.element.addEventListener('touchstart', function(event) { context.onTouchStart(event); });
    else
        this.element.addEventListener('mousedown',  function(event) { context.onMouseDown(event);  });
};


var isCoolDown = false;

BPDragPageGesture.prototype.onMouseDown = function(event)
{
	
	if(isCoolDown)
		return;
	
	window.setTimeout(function () {
		isCoolDown = false;
	}, 250);

	isCoolDown = true;
    book.isMouseUpEvent = false;
    if(!this.startDrag && !this.isDisabled)
        this.onStartDragging(event.pageX, event.pageY);
};

BPDragPageGesture.prototype.onTouchStart = function(event)
{
    event.preventDefault(); //Workaround to fix issues on mobile devices, https://code.google.com/p/android/issues/detail?id=5491
    event.stopPropagation();

    if(!this.startDrag && !this.isDisabled)
    {
        this.touchIdentifier = event.changedTouches[0].identifier;
        this.onStartDragging(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
    }
};

BPDragPageGesture.prototype.onStartDragging = function(pageX, pageY)
{
    if(touchCapable)
    {
        document.addEventListener('touchmove', this.touchMoveFunction);
        document.addEventListener('touchend', this.touchEndedFunction);
        document.addEventListener('touchcancel', this.touchEndedFunction);
    }
    else
    {
        document.addEventListener('mousemove', this.mouseMoveFunction);
        document.addEventListener('mouseup',  this.mouseUpFunction);
    }

    var elemRect = this.element.getBoundingClientRect();
    this.isDraggingRightPage = (pageX - elemRect.left) >= (elemRect.width/2);
    this.startDrag = true;
    this.hitAreaClicked = false;
    this.progress = 0;
    this.initialProgress = 0;
    this.initialProgress = this.calculateProgress(pageX);

    this.initialPageX = this.calculateRealPageX(pageX);

    if(this.onStartDrag != null)
        this.onStartDrag(this);

};

BPDragPageGesture.prototype.onMouseUp = function(event)
{
    book.isMouseUpEvent = true;
    window.setTimeout(function () { book.isMouseUpEvent = false }, 60);
    this.onStopDragging(event.pageX, event.pageY);
};

BPDragPageGesture.prototype.onTouchEnd = function(event)
{
    event.preventDefault(); //Workaround to fix issues on mobile devices, https://code.google.com/p/android/issues/detail?id=5491
    event.stopPropagation();

    if(this.touchIdentifier == event.changedTouches[0].identifier)
        this.onStopDragging(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
};

BPDragPageGesture.prototype.onStopDragging = function(pageX, pageY)
{
   this.removeListeners();

    if(this.startDrag)
    {
        this.startDrag = false;
        this.isHitAreaClicked(pageX);

        if(this.onEndDrag != null)
            this.onEndDrag(this);
    }
};

BPDragPageGesture.prototype.onMouseMove = function(event)
{
    this.onDragging(event.pageX, event.pageY);
};

BPDragPageGesture.prototype.onTouchMove = function(event)
{
    event.preventDefault(); //Workaround to fix issues on mobile devices, https://code.google.com/p/android/issues/detail?id=5491
    event.stopPropagation();
    if(this.touchIdentifier == event.changedTouches[0].identifier)
     this.onDragging(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
};

BPDragPageGesture.prototype.onDragging = function(pageX, pageY)
{
    if(this.startDrag)
    {
        this.isDragging = true;

        var x = this.calculateRealPageX(pageX);
        var progress = this.calculateRealProgress(x);
        progress = Math.max(0, Math.min((progress), 1));

        this.progress = progress;

        if(this.onProgressChanged != null)
            this.onProgressChanged(this);
    }
};

BPDragPageGesture.prototype.removeListeners = function()
{
    if(touchCapable)
    {
        document.removeEventListener('touchmove', this.touchMoveFunction);
        document.removeEventListener('touchend', this.touchEndedFunction);
        document.removeEventListener('touchcancel', this.touchEndedFunction);
    }
    else
    {
        document.removeEventListener('mousemove', this.mouseMoveFunction);
        document.removeEventListener('mouseup',  this.mouseUpFunction);
    }
};

BPDragPageGesture.prototype.calculateRealPageX = function(pageX)
{
    var elemRect = this.element.getBoundingClientRect();
    var x = pageX - elemRect.left;
    x = this.isDraggingRightPage ? elemRect.width - x : x;
    return x;
};

BPDragPageGesture.prototype.calculateRealProgress = function(pageX)
{
    var elemRect = this.element.getBoundingClientRect();
    var width = elemRect.width * 0.80;
    var progress = (pageX - this.initialPageX) / (width - this.initialPageX);
    return progress;
};

BPDragPageGesture.prototype.calculateProgress = function(pageX)
{
    var elemRect = this.element.getBoundingClientRect();
    var x 		 = pageX - elemRect.left;
    var progress = (x - this.min) / (elemRect.width - this.min);
    progress = this.isDraggingRightPage ?  (1 - progress) : progress;

    return progress;
};

BPDragPageGesture.prototype.isHitAreaClicked = function(pageX)
{
    var elemRect = this.element.getBoundingClientRect();
    var x 		 = Math.max(this.min, Math.min(pageX - elemRect.left, elemRect.width));

    if(x < BookConstants.HIT_AREA_OUTER_EDGE_OF_PAGE || (elemRect.width - x) < BookConstants.HIT_AREA_OUTER_EDGE_OF_PAGE)
        this.hitAreaClicked = true;
};

////////////////////////////////////////////////////////////////////////////
function BPFPSCounter(element)
{
    this.element = element;

    this.animationFrames   	     = 0;
    this.lastAnimationFrameTime  = Date.now();
    this.animationFPS			 = 0;

	this.intervalFrames   		 = 0;
	this.lastIntervalFrameTime 	 = Date.now();
	this.intervalFPS			 = 0;

    var context   				 = this;
    this.onAnimationFrameMethod  = function(timestamp) { context.onAnimationFrame(); };

    window.requestAnimationFrame(this.onAnimationFrameMethod);

	this.interval = setInterval( function() { context.onInterval(); }, 1000/60);
}

BPFPSCounter.prototype.onAnimationFrame = function()
{
	var now = Date.now();

	this.animationFrames++;

	if(now - this.lastAnimationFrameTime >= 1000)//One second
	{
		this.lastAnimationFrameTime = now;
		this.animationFPS 			= this.animationFrames;
		this.animationFrames   		= 0;

		this.updateText();
	}

    window.requestAnimationFrame(this.onAnimationFrameMethod);
};

BPFPSCounter.prototype.onInterval = function()
{
	var now = Date.now();

	this.intervalFrames++;

	if(now - this.lastIntervalFrameTime >= 1000)//One second
	{
		this.lastIntervalFrameTime  = now;
		this.intervalFPS			= this.intervalFrames;
		this.intervalFrames   		= 0;

		this.updateText();
	}
};

BPFPSCounter.prototype.updateText = function()
{
	this.element.innerHTML = "Animation FPS:" + this.animationFPS + " Interval FPS:" + this.intervalFPS;
};

////////////////////////////////////////////////////////////////////////////
function BPSettingsPopUp(divElement)
{
    this.settingPopUpMask        = divElement.parentNode;
    this.colorHex                = "";
    this.isNormalSpeedChecked    = true;
    this.isUIColorPopUpHiddden   = true;
    this.isSettingsPopUpShown    = false;

    this.favoriteAPI             = new BPFavoriteAPI();

    this.colorHex   = BookSetting.getInstance().getHighlightColor();
    this.defaultBrightness = BookSetting.getInstance().getHighlightBrightness();

    this.closeSettingPopUpButton       = document.getElementById('closeSettingsPopUpButton');
    this.highlightContainer            = document.getElementById('highlightContainer');
    this.colorHighlightPanel           = new BPSelectColorPanel(document.getElementById('colorHighlightPanel'), this.colorHex);
    this.sampleTextBackGround          = document.getElementById('sampleTextBackGround');

    this.playSpeedContainer            = document.getElementById('slowerButtonContainer');
    this.playSpeedCheckBoxElement      = document.getElementById('playSpeedCheckBox');
    this.pauseAfterPageCheckBoxElement = new BPCheckBoxComponent(document.getElementById('pauseAfterPageCheckBox'));
    this.favoriteCheckBoxElement       = document.getElementById('favoriteCheckBox');
    this.translationButton             = document.getElementById('translationButton');
    this.UIColorButton                 = document.getElementById('UIColorButton');
    this.UIColorPopUp                  = new BPUIColorPopUp(document.getElementById('UIColorPopUp'));

    this.currentHighlight              = null;
}


BPSettingsPopUp.prototype.onPreventDefaultEvent = function(event)
{
    if(event!=null)
    {
        event.stopPropagation();
        event.preventDefault();
    }
};

BPSettingsPopUp.prototype.onSelectHighlightColor = function(event)
{
    // We're checking if black(000000) cause black is mapped on the div as the collor to Off button.
    // This if can be modificated in the method onHighlightColorSelected().
    if(!event)
        return;

    if(this.currentHighlight != null){
        this.currentHighlight.className += " noDelay";
        this.currentHighlight.className =  this.currentHighlight.className.replace(" selected", "");

    }

    this.currentHighlight = null;
    event.target.className += " noDelay";
    event.target.className += " selected";
    this.currentHighlight = event.target;
    this.colorHighlightPanel.onClickColor(event);
    window.setTimeout(function () {
        var arr = document.getElementsByClassName("link");
        for(var i =0; i<arr.length; i++){
            arr[i].className = arr[i].className.replace(" noDelay", "");
        }
    }, 10);

};

BPSettingsPopUp.prototype.initialize = function()
{
    var context = this;

    this.onCloseSettingPopUpCallBack     = null;

    this.colorHighlightPanel.onColorSelectedCallBack = function(sender) { context.onHighlightColorSelected(sender) };

    this.updateHighlightColor();

    this.onPlaySpeedStateChangeEvent = null;

    this.UIColorPopUp.onCloseUIColorPopUpCallBack =  function() { context.onCloseUIColorPopUp() };

    this.onClosePopUp(null);
};

BPSettingsPopUp.prototype.onHighlightColorSelected = function(sender)
{
    this.colorHex = sender.colorHex;
    // We're checking if black cause black is mapped on the div as the collor to Off button.
    if(this.colorHex == 000000){
        this.brightness = 0.0;
    }else{
        this.brightness = this.defaultBrightness;
    }

    this.updateHighlightColor();
};

BPSettingsPopUp.prototype.onBrightnessSliderProgressChange = function(sender)
{
    var minBrightness = 0.25;
    this.updateHighlightColor();
};

BPSettingsPopUp.prototype.updateHighlightColor = function()
{
    BookSetting.getInstance().setHighlightColor(this.colorHex);
};

BPSettingsPopUp.prototype.removePlaySpeedContainer = function(remove)
{
   if(remove)
{
       this.playSpeedContainer.style.display = "none";
       this.highlightContainer.style.top = "50px";
       console.log(document.getElementById("pauseToread").offsetLeft);
      document.getElementById("pauseToread").style.left = document.getElementById("pauseToread").offsetLeft - 60 + "px";
      console.log(document.getElementById("glossaryButton").offsetLeft);
      document.getElementById("glossaryButton").style.left = document.getElementById("glossaryButton").offsetLeft - 60 + "px";
      console.log(document.getElementById("settingButton").offsetLeft);
      document.getElementById("settingButton").style.left = document.getElementById("settingButton").offsetLeft - 60 + "px";
      console.log(document.getElementById("settingsBox").offsetLeft);
      document.getElementById("settingsBox").style.left = document.getElementById("settingsBox").offsetLeft - 60 + "px";
      var shadows = document.getElementsByClassName('hoverShadow');
      //console.log(shadows);
      //for(var i = 0; i<shadows.length; i++){
      //  console.log(shadows[i].style.left);
      //  shadows[i].style.left = shadows[i].style.left - 40 + "px";
      //}
   }
};

BPSettingsPopUp.prototype.selectPlaySpeed = function(event)
{
    this.onPreventDefaultEvent(event);

    var isNormal = event.target.getAttributeNode("isNormal").value;
    var isNormal = isNormal == "true";
    event.target.appendChild(this.playSpeedCheckBoxElement);

    if(this.isNormalSpeedChecked != isNormal)
    {
        this.isNormalSpeedChecked = isNormal;

        if(this.onPlaySpeedStateChangeEvent!=null)
            this.onPlaySpeedStateChangeEvent(!isNormal);
    }
};

BPSettingsPopUp.prototype.onAddToFavoriteButton = function(event)
{
    this.onPreventDefaultEvent(event);
    this.favoriteAPI.addToFavorites();
    console.log("implement favorite api...");
};

BPSettingsPopUp.prototype.onTranslationButton = function(event)
{
    this.onPreventDefaultEvent(event);
    console.log("implement translation...");
};

BPSettingsPopUp.prototype.onOpenUIColorPopUp = function(event)
{
    this.onPreventDefaultEvent(event);
    this.isUIColorPopUpHiddden = false;
    this.onClosePopUp(null);
    this.UIColorPopUp.onOpenUIColorPopUp();
};

BPSettingsPopUp.prototype.onCloseUIColorPopUp = function(event)
{
    this.onPreventDefaultEvent(event);
    this.isUIColorPopUpHiddden = true;
    this.onOpenSettingsPopUp();
};

BPSettingsPopUp.prototype.onOpenSettingsPopUp = function()
{
    this.settingPopUpMask.style.top = "0px";
    this.settingPopUpMask.style.visibility = 'visible';
    this.settingPopUpMask.style.display = "inherit";
    this.isSettingsPopUpShown = true;
};

BPSettingsPopUp.prototype.onClosePopUp = function(event)
{
    this.onPreventDefaultEvent(event);

    this.settingPopUpMask.style.visibility = 'hidden';
    this.settingPopUpMask.style.display = "none";

    if(this.onCloseSettingPopUpCallBack!=null && this.isSettingsPopUpShown && this.isUIColorPopUpHiddden)
    {
        this.isSettingsPopUpShown =  false;
        this.onCloseSettingPopUpCallBack();
    }
};

////////////////////////////////////////////////////////////////////////////
function BPUIColorPopUp(divElement)
{
    this.colorPopUpMask = divElement.parentNode;
    this.colorPopUpElement = divElement;

    this.closeUIColorPopUpButton = document.getElementById('closeUIColorPopUpButton');
    this.HUDColor   = BookSetting.getInstance().getHUDColor();
    this.colorHUDPanel = new BPSelectColorPanel(this.colorPopUpElement, this.HUDColor);

    this.initialize();
}

BPUIColorPopUp.prototype.onPreventDefaultEvent = function(event)
{
    if(event!=null)
    {
        event.stopPropagation();
        event.preventDefault();
    }
};

BPUIColorPopUp.prototype.onSelectHUDColor = function(event)
{
    this.colorHUDPanel.onClickColor(event);
};

BPUIColorPopUp.prototype.initialize = function()
{
    var context                                = this;
    this.onCloseUIColorPopUpCallBack           = null;
    this.onUIColorSelectedCallBack             = null;
    this.colorHUDPanel.onColorSelectedCallBack = function(sender){ context.onHUDColorSelected(sender) };
    this.onCloseUIColorPopUp(null);
};

BPUIColorPopUp.prototype.onHUDColorSelected = function(sender)
{
    var colorHex = "#"+sender.colorHex;

    if(this.onUIColorSelectedCallBack!=null)
        this.onUIColorSelectedCallBack(colorHex);

};

BPUIColorPopUp.prototype.onOpenUIColorPopUp = function()
{
    this.colorPopUpMask.style.top = "0px";
    this.colorPopUpMask.style.visibility = 'visible';
    this.colorPopUpMask.style.display = "inherit";
};

BPUIColorPopUp.prototype.onCloseUIColorPopUp = function(event)
{
    this.onPreventDefaultEvent(event);
    this.colorPopUpMask.style.visibility = 'hidden';
    this.colorPopUpMask.style.display = "none";

    if(this.onCloseUIColorPopUpCallBack!=null)
        this.onCloseUIColorPopUpCallBack();
};
////////////////////////////////////////////////////////////////////////////
function BPSelectColorPanel(divPanel, color)
{
    this.panel =  divPanel;
    this.initialColorSelected = color;
    this.colorHex = "";
    this.onColorSelectedCallBack = null;
    this.initializeColorPanel();
}

BPSelectColorPanel.prototype.initializeColorPanel = function()
{
    var context = this;
    var elements = this.panel.getElementsByClassName("colorHighLight");
    
    for(var i = 0; i < elements.length; i++)
    {
        var currentElement = elements[i];
        var elementColor = currentElement.getAttributeNode("color").value.toLowerCase();
        var initialColor = bookJSON.highlight_color.toLowerCase();
        if(initialColor == "3399ee")
            initialColor = "8eceec";
        if(elementColor == initialColor)
        {
            this.onColorSelected(currentElement);
        }
    }

    this.colorHex = BookJSON.getInstance().jsonData.highlight_color.toLowerCase();
    if(this.colorHex == "3399ee")
            this.colorHex = "8eceec";
    var elem = document.getElementsByClassName("settingsBox")[0].getElementsByClassName("list-color")[0].getElementsByTagName("li");
    for(var i = 0; i < elem.length; i++){
        var object = elem[i].getElementsByTagName("div")[0];
        if(object.className.indexOf("selected") >= 0){
            object.className = object.className.replace(" selected", "");
        }
        if(object.getAttributeNode("color").value.toLowerCase() == this.colorHex){
            object.className += " selected";
        }
    }
};

BPSelectColorPanel.prototype.onClickColor = function(event)
{
    event.stopPropagation();
    event.preventDefault();
    this.onColorSelected(event.target);

    if(book.currentLeftPage != null) book.currentLeftPage.updateHighLight(book.audioProgress.audioPosition);
    if(book.currentRightPage != null) book.currentRightPage.updateHighLight(book.audioProgress.audioPosition);
};

BPSelectColorPanel.prototype.onColorSelected = function(elementParent)
{

    this.colorHex = elementParent.getAttributeNode("color").value.toLowerCase();
    var elem = document.getElementsByClassName("settingsBox")[0].getElementsByClassName("list-color")[0].getElementsByTagName("li");
    for(var i = 0; i < elem.length; i++){
        var object = elem[i].getElementsByTagName("div")[0];
        if(object.className.indexOf("selected") >= 0){
            object.className = object.className.replace(" selected", "");
            object.className += " noDelay";
        }
        if(object.getAttributeNode("color").value.toLowerCase() == this.colorHex){
            object.className = object.className.replace(" noDelay", "");
            object.className += " selected";
        }
    }
    if(this.onColorSelectedCallBack != null)
        this.onColorSelectedCallBack(this);
    var pageLeft = book.pages[book.currentLeftPageIndex];
    if(pageLeft)
        if(pageLeft.textHighlight)
            pageLeft.textHighlight.updateHighLight(pageLeft.divContainer);
    var pageRight = book.pages[book.currentLeftPageIndex + 1];
    
    if(pageRight)
        if(pageRight.textHighlight)
            pageRight.textHighlight.updateHighLight(pageRight.divContainer);
};
////////////////////////////////////////////////////////////////////////////
function BPGlossaryPopUp()
{
    this.glossaryInterval     = null;
    this.glossaryPopUp        = null;
    this.onClosePopUpCallBack = null;
    this.isOpen               = false;
    var context               = this;

    this.glossaryMask         = document.getElementById('glossaryMask');
    this.glossaryMask.onclick = function (event) {
        event.stopPropagation();
        event.preventDefault();
        context.forceCloseGlossary();
    };

    this.onClosePopUp         = function(){ context.closeGlossary(); };
    this.onUpdateInterval     = function(){ context.getGlossaryId(); };
}

BPGlossaryPopUp.prototype.openGlossary = function()
{
    closeSettingsBox();
    showPopup('glossary.php?cid='+ bookCID );                         // when "showPopUp" is call, this method creates a div and displays
    this.glossaryInterval = setInterval(this.onUpdateInterval, 300); // a pop up using Ajax, for that reason we need to create an interval
};                                                                   // because we need to get the popup's id and we don't know
                                                                     // when the pop up will be ready.
BPGlossaryPopUp.prototype.getGlossaryId = function()
{
    this.glossaryPopUp = document.getElementById('glossary.php');   // When the pop up is ready, we'll obtain the element and
                                                                    // attach on it the listener event for close button.
    if(this.glossaryPopUp!=null &&  this.glossaryPopUp!=undefined)
    {
        addListener(this.glossaryPopUp,'closepopup',this.onClosePopUp);
        this.isOpen = true;
        this.glossaryPopUp.parentNode.appendChild(this.glossaryMask);
        this.glossaryMask.style.display  = "inherit";
        this.glossaryPopUp.style.zIndex  = 2;

        hud.spinnerLoader.stop();

        clearInterval(this.glossaryInterval);
        this.glossaryInterval = null;
        pause();
        
    }
};

BPGlossaryPopUp.prototype.closeGlossary = function()
{
    this.glossaryMask.style.display  = "none";
    removeListener(this.glossaryPopUp, 'closepopup', this.onClosePopUp);
    this.glossaryPopUp = null;
    this.isOpen = false;
    if(this.onClosePopUpCallBack!=null)
        this.onClosePopUpCallBack();
};

BPGlossaryPopUp.prototype.forceCloseGlossary = function()
{
    closeBlockScreen();
};
////////////////////////////////////////////////////////////////////////////
function BPTextSentence(textLineInfo, previousSentenceLastBox, nextSentenceFirstBox) //QAV-2768 added nextSentenceFirstBox
{
    this.textLineInfo            = textLineInfo;
    this.sndpos                  = this.textLineInfo['sound_position'];
    this.sndlen                  = this.textLineInfo['sound_length'];
    this.previousSentenceLastBox = previousSentenceLastBox;
    this.nextSentenceFirstBox    = nextSentenceFirstBox;
    this.lastBox                 = null;
    this.lastAudioPosition       = null;
    this.lastProgess             = null;
    this.loadBoxes();
}

BPTextSentence.prototype.updateBoxesSize = function () {
    var lastBox_ = null;
    for(var i = 0; i < this.textLineInfo.boxes.length; i++)//Calculating boxes
    {
        var currentBoxInfo = this.textLineInfo.boxes[i];
        var nextBox = this.textLineInfo.boxes[i+1];

        var xModifier = 0;
        var widthModifier = 0;

        //magic numbers added to fix BE-552
        currentBoxInfo.x = currentBoxInfo.x - 2;
        currentBoxInfo.y = currentBoxInfo.y -1;
        currentBoxInfo.width = currentBoxInfo.width + 4;
        currentBoxInfo.height = currentBoxInfo.height + 5;


        this.textLineInfo.boxes[i] = currentBoxInfo; //update the content on textLineInfo.
        lastBox_ = currentBoxInfo;
    }
};

BPTextSentence.prototype.loadBoxes = function()
{
    //we need to update the boxes position before joining them.
    this.updateBoxesSize();

    this.boxes         = new Array();
    var lastSentenceX  = this.getLastSentenceX();
    var highlightStyle = BookSetting.getInstance().getHighlightStyle();
    var box            = null;
    var divBox = null;

    var lastBoxIsTooFar = true;

    for(var i = 0; i < this.textLineInfo.boxes.length; i++)//Calculating boxes
    {
        var currentBoxInfo = this.textLineInfo.boxes[i];
        lastBoxIsTooFar = false;

        if(box)
        {
            if( Math.abs( (box.x + box.width) - currentBoxInfo.x) > 80)
            {
                if(box.y == currentBoxInfo.y)
                {
                        lastBoxIsTooFar = true;
                }
            }
        }

        if(highlightStyle == BookConstants.TEXT_HIGHLIGHT_STYLE_CONTINUOUS && box != null && currentBoxInfo.y == box.y && !lastBoxIsTooFar)
        {

            //Merging boxes that are in the same 'y' to handle them as a single box for 'continuous' highlight style
            box.width = ( currentBoxInfo.x- box.x ) + currentBoxInfo.width +  Math.abs((box.x+box.width) - (currentBoxInfo.x));
        }
        else
        {
            /* create a div element to display the highlight  */
            divBox = document.createElement("DIV");
            divBox.style.position = 'absolute';
            BookUtils.instance.applytransformOrigin(divBox, "left");

            box        = new Object();
            box.x      = currentBoxInfo.x;
            box.y      = currentBoxInfo.y;
            box.width  = currentBoxInfo.width;
            box.height = currentBoxInfo.height;
            box.div    = divBox;

            //Thanks whoever made this. Solved my problem ;) //sorry, removing this for now. ;x //no problem bro
            if(i >= this.textLineInfo.boxes.length-2){
                box.width += 2; //more pixels on the final box?  //you were using 7.
            }

            if(i == 0 && lastSentenceX != 0)//Start the first box from the last position of the previous sentence for 'continuous' highlight style
            {
                box.x           = lastSentenceX;
                var xDifference = currentBoxInfo.x - lastSentenceX;
                box.width       = currentBoxInfo.width + xDifference;
            }

            if(this.previousSentenceLastBox){
                if(this.previousSentenceLastBox.y == currentBoxInfo.y){
                    box.x -= 4;
                    box.width += 4; //maybe... only one pixel more
                }
            }

            this.boxes.push(box);
        }
    }

    this.lastBox      = box;
    var sentenceWidth = 0;

    for(var i = 0; i < this.boxes.length; i++)//Calculating sentence with
        sentenceWidth += this.boxes[i].width;

    var currentSentenceXPosition = 0;

    for(var i = 0; i < this.boxes.length; i++)//Calculating sound position and length
    {
        var currentContinuousBox        = this.boxes[i];
        currentContinuousBox.sndpos     = this.sndpos + this.getCurrentSndLength(currentSentenceXPosition, sentenceWidth);
        currentSentenceXPosition        += currentContinuousBox.width;
        currentContinuousBox.lastSndPos = this.sndpos + this.getCurrentSndLength(currentSentenceXPosition, sentenceWidth);
    }
};

BPTextSentence.prototype.getCurrentSndLength = function(progressOfSentence, sentenceWidth)
{
    return this.sndlen * (progressOfSentence / sentenceWidth);
};

BPTextSentence.prototype.getLastSentenceX = function()
{
    if(BookSetting.getInstance().getHighlightStyle() == BookConstants.TEXT_HIGHLIGHT_STYLE_CONTINUOUS && this.previousSentenceLastBox != null)//The first box of the sentence must start from the last box of the previous sentence
    {
        var firstBox    = this.textLineInfo.boxes[0];
        var lastBoxMaxX = this.previousSentenceLastBox.x + this.previousSentenceLastBox.width;

        if (firstBox) {
            if (this.previousSentenceLastBox.y == firstBox.y && firstBox.x >= lastBoxMaxX) {
                return lastBoxMaxX;
            }
        }
    }

    return 0;
};

BPTextSentence.prototype.renderToCanvas = function(divContainer, audioPosition, position, container, hightlightColor)
{
    if(hightlightColor != 'rgba(0,0,0,1)' && !isPageDragging){
        container.style.opacity = BookSetting.getInstance().getHighlightBrightness();
    } else {
        container.style.opacity = 0;
    }
    for(var j = 0; j < this.boxes.length; j++)
    {
        var currentBox = this.boxes[j];

        if(currentBox.sndpos < audioPosition)
        {
            var progress;
            progress = audioPosition < currentBox.lastSndPos ? BookUtils.instance.inverseLinearBezier(audioPosition, currentBox.sndpos, currentBox.lastSndPos) : 1;

            currentBox.div.style.left   = currentBox.x + position.x + 'px';
            currentBox.div.style.top    = currentBox.y + position.y + 'px';
            currentBox.div.style.width  = (currentBox.width) + 'px';
            currentBox.div.style.height = currentBox.height + 'px';
            currentBox.div.style.backgroundColor = hightlightColor;


            //QAV-2768: if the next box is in a different line, we extend the last word.
            var widthModifier = 0;
            var nextBox = this.boxes[j+1];
            if(!nextBox){
                if(this.nextSentenceFirstBox != null){
                    nextBox = this.nextSentenceFirstBox;
                } else {
                    nextBox = {"y":"null", "x":"null"};
                }
            }

            if(currentBox.y != nextBox.y){
                widthModifier = 0;
                if(currentBox.width < 50){ //QAV-2768 if the box is too small, just 0.03 isn't enough
                    widthModifier += 0.3;
                }
            }

            currentBox.div.style.width  = (currentBox.width+widthModifier) + 'px';
            BookUtils.instance.applyScaleToElement(currentBox.div, progress, 1);

            container.appendChild(currentBox.div);
        }
        else
        {
            /* when try to remove some element, but the container does not have that element, this action will fail,
            * for that reason I append the element inside the container and then I remove it from the container, because
            * is faster append and remove instead find the child element in the container
            */
            container.appendChild(currentBox.div);
            container.removeChild(currentBox.div);
        }
    }
};

////////////////////////////////////////////////////////////////////////////

var activeSlider = null;

function Slider(idstub, lowx, hix) {

	this.lowx = lowx;
	this.hix = hix;
	this.position = 0;
	this.button = (typeof(idstub) == 'string') ? document.getElementById(idstub) : idstub;
	this.button.objref = this;
	this.sliding = false;
	this.blockedPosition = 1;
	if(this.button) {
		this.position = (this.button.offsetLeft - lowx)/(hix - lowx);
	
	//MAG: 07/01/2014: enabled touch functionality by assigning the appropiate event listeners. SliderMove and Slider	
		//addListener(this.button, 'mousedown', this.sliderStart, false);
	 
		addListener(document.body, (touchCapable) ? 'touchmove' : 'mousemove', this.sliderMove, false);
		addListener(document, (touchCapable) ? 'touchend' : 'mouseup', this.sliderEnd, false);
		addListener(this.button, (touchCapable) ? 'touchstart' : 'mousedown', this.sliderStart, false);
	}
}

Slider.prototype.setBlockedPosition = function(p){ 
	this.blockedPosition = Math.max(Math.min(1, p),0);
}

Slider.prototype.getBlockedPosition = function() { 
	return this.blockedPosition; 
}

Slider.prototype.setPosition = function(pos) {
	if(!isNaN(pos)) {
		pos = Math.max(0, Math.min(pos, 1));
		this.position = pos;
		this.button.style.left = (this.lowx + pos*(this.hix - this.lowx)) + 'px';
	}
}

Slider.prototype.sliderStart = function(event) {

	isMobileDevice = ((document.createTouch != null) ? true:false); 
	if(!isMobileDevice){
	
		var gamebutton;
		if (event.which == null){
    	    gamebutton = (event.button < 2) ? 'left' :
    	        ((event.button == 4) ? 'middle' : 'right');
    	}else{
    	    gamebutton = (event.which < 2) ? 'left' :
    	        ((event.which == 2) ? 'middle' : 'right');
    	}

		if(gamebutton == 'left'){
			//do nothing
		}else{
			return false;
		}
	}

	var obj = event.currentTarget.objref;
	activeSlider = obj;
	obj.sliding = true;

	var pos = pagePosition(event);

	obj.scrollx = pos.x - obj.button.offsetLeft;
	
	if (isAndroid) {
		event.preventDefault();
	}
	if(!isAndroid){ //MAG 07/02/2014: The following listeners work fine on the browsers since they allow the user keep sliding even if the pointer leaves the click area. However, on Android devices, adding the listeners make the sliding bar run slow/erratically
		addListener(document.body, (touchCapable) ? 'touchmove': 'mousemove',obj.sliderMove,false);
		addListener(document.body, (touchCapable) ? 'touchend': 'mouseup',obj.sliderEnd,true);
	}	
	addListener(obj.button, 'click',obj.sliderClick,false);

	obj.dispatchEvent('slideStart');
	cancelEvent(event);
}


Slider.prototype.sliderMove = function(event) {
	if (isAndroid) {
		event.preventDefault();
	}
	if(activeSlider) {

		var p = activeSlider.button.offsetLeft;
		var pos = pagePosition(event);

		activeSlider.button.style.left = Math.max(activeSlider.lowx, Math.min(pos.x - activeSlider.scrollx, activeSlider.hix))+'px';

		var newPosition = Math.min(activeSlider.getBlockedPosition(), (activeSlider.button.offsetLeft - activeSlider.lowx)/(activeSlider.hix - activeSlider.lowx));
		activeSlider.setPosition(newPosition);

		activeSlider.dispatchEvent('slideMove');
	}
}


Slider.prototype.sliderEnd = function(event) {
	var obj = activeSlider;
	if(obj) {
		obj.sliding = false;

		if(!isAndroid){ //MAG 07/02/2014: These listeners are not added on Android devices. See 'sliderStart' method for an explanation
			removeListener(document.body, (touchCapable) ? 'touchmove' :'mousemove',obj.sliderMove,false);
			removeListener(document.body, (touchCapable) ? 'touchend' : 'mouseup',obj.sliderEnd,false);
		}

		removeListener(obj.button, 'click',obj.sliderClick,false);

		obj.dispatchEvent('slideEnd');

		cancelEvent(event);
		activeSlider = null;
	}
}


Slider.prototype.sliderClick = function(event) {
	cancelEvent(event);
}

enableEventHandling(Slider);

////////////////////////////////////////////////////////////////////////////
/**
* GraphicManager, GraphicPlayer controller 
*
* @category cms
* @package GraphicManager
* @subpackage DataAccessLayer
* @version $Id$
* @param string baseUrl The current page url
*/
function GraphicManager(baseURL){
    'use strict';
    this.stackIndex = 0;
    this.enterFrame = null;
    this.batchStack = [];
    this.stack = {};
    if(baseURL === void 0){
        baseURL = '/adminart/converted_animations/';
    }
    this.baseURL = baseURL;
}

/**
* Destroy each stack in stack list
*/
GraphicManager.prototype.clearAll = function(){
    'use strict';
    for(var i in this.stack){
        this.stack[i].destroy();
    }
    this.stack = {};
};

/**
* Destroy animation by the stackid
*
* @param integer stackid The stackid of stack, that will be destroyed
*/
GraphicManager.prototype.destroyAnimation = function(stackid){
    'use strict';
    this.stack[stackid].destroy();
};

/**
* Stop animation action
*/
GraphicManager.prototype.stopEnterFrame = function(){
    'use strict';
    if(this.enterFrame){
        this.enterFrame.stop();
        this.enterFrame = null;
    }
};

/**
* Start animation action
*
* @uses \admin\core_client_library\js\legacy-sites-js\1.0\EnterFrame
*/
GraphicManager.prototype.startEnterFrame = function(){
    'use strict';
    if(!this.enterFrame){
        this.enterFrame = new EnterFrame(this,this.processEnterFrame);
    }
};

/**
* Process animation action
*
* Recursive function. Check animation status dunamicly. Check does animation playing and make some action.
*/
GraphicManager.prototype.processEnterFrame = function(){
    'use strict';
    var now = (new Date()).getTime();
    var graphicRunning = false;
    for(var i in this.stack){
        var graphic = this.stack[i];        
        if(graphic != void 0){
            if(graphic.ready){
                if(graphic.isPlaying){
                    graphic.runTimeline(now);
                }else{

                }
            }
        }
    }
};

/**
* Check if we should start the enter frame
*
*/
GraphicManager.prototype.checkEnterFrame = function(){
    'use strict';
    //check if we should start the enterFrame
    var startEngine = false;
    for(var i in this.stack){
        if(this.stack[i].isPlaying){
            startEngine = true;
        }
    }
    if(startEngine && !this.enterFrame){
        this.startEnterFrame();
    }
    if(!startEngine){
        this.stopEnterFrame();
    }
};

/**
* Load animation from server by animation asset id and show it by using GraphicPlayer
*
* @param string container The animation display container id
* @param string id The animation asset id
* @param bool autoPlay The auto play start flag
* @param bool loop The play loop flag
*
* @return The new GraphicPlayer object
*
* @uses GraphicPlayer
*/
GraphicManager.prototype.loadAnimation = function(container, id, autoPlay, loop, PlayerObject){
    'use strict';
    var graphic;
    if(PlayerObject == void 0){
        graphic = new GraphicPlayer(container, id, autoPlay, loop, this.baseURL);
    }else{
        graphic = new PlayerObject(container, id, autoPlay, loop, this.baseURL);
    }
    //var graphic = new GraphicPlayer(container, id, autoPlay, loop, this.baseURL);
    addListener(graphic,'animationStarted',this.checkEnterFrame.bind(this));
    addListener(graphic,'animationStopped',this.checkEnterFrame.bind(this));
    this.stack[this.stackIndex] = graphic;
    this.stackIndex++;

    return graphic;
};

/**
* Get Animation by stack id
*
* @param int is the stackid
*
* @return The GraphicPlayer object
*/
GraphicManager.prototype.getAnimation = function(stackid){
    'use strict';
    var player = null;
    player = this.stack[stackid];
    if(player == void 0){
        player = null;
    }   
    return player;
};

/**
* Load batch of animation asset ids
*
* @param object batchStack The batch with stacks [{container:container,id:id,loop:loop},{...}]
*/
GraphicManager.prototype.loadBatch = function(batchStack){
    'use strict';
    //autoPlay forced false, [{container:container,id:id,loop:loop},{...}]
    this.batchStack = batchStack;
    for(var i = 0; i < batchStack.length;i++){
        var batchItem = batchStack[i];
        var graphic = this.loadAnimation(batchItem.container,batchItem.id,false,batchItem.loop,this.baseURL);
            addListener(graphic,'animationReady',this.checkBatchReady.bind(this));
    }
};

/**
* Check batch ready
*/
GraphicManager.prototype.checkBatchReady = function(){
    'use strict';
    var stackReady = 0;
    for(var i in this.stack){
        if(this.stack[i].ready){
            stackReady++;
        }
    }
    if(this.batchStack.length == stackReady){
        this.dispatchEvent('batchReady');
    }
};

enableEventHandling(GraphicManager);

////////////////////////////////////////////////////////////////////////////
    /**
    * Graphic player
    *
    * @category cms
    * @package Graphic Player
    * @subpackage BusinessObject
    * @version $Id$
    * @param string container The container
    * @param string jsonFile The full path of the jsonfile '/folder/location/file.json'
    * @param string basePath The base path that contains the folder
    * @param bool autoPlay The autoplay flag
    * @param bool loop The play loop flag
    */
    function GraphicPlayer(container, id, autoPlay, loop, basePath){
        this.defaults = {
          autoPlay:false,
          loop:false,
          basePath:'/adminart/converted_animations/',
          loadedAssets: null
       };
       this.container = container;
       this.autoPlay = autoPlay;
       this.loop = loop;
       this.id = id;

       if(basePath == void 0){
          basePath = this.defaults.basePath;
       }
       if(this.autoPlay === void 0){
         this.autoPlay = this.defaults.autoPlay;
       }
       if(this.loop === void 0){
         this.loop = this.defaults.autoPlay;
       }
       if(typeof(this.container) === 'string'){
          this.container = document.getElementById(this.container);
       }
       this.basePath = basePath + id + '/';
       this.ready = false;
       this.isPlaying = false;
       this.startTime = 0;
       this.startPos = 0;
       this.currentFrame = 1;
       this.previousFrame = -1;
       this.frameRate = 12;
       this.currentSequence = '';
       this.sequences = [];
       this.data = {};
       this.sprites = {};
       this.depthArray = [];
       this.currentDepthArray = [];
       this.assetList = [];
       this.loadedAssets = [];
       this.spkList = [];
       this.audioList = [];
       this.mask = void 0;
       this.maskWidth = 0;
       this.maskHeight = 0;
       this.loadJSON();
    }
    /**
    * Creates a display on which the animation will render
    */
    GraphicPlayer.prototype.buildMask = function(){
      var mask = document.createElement('div');
      mask.style.overflow = "hidden";
      mask.style.position = "absolute";
      mask.style.width = this.maskWidth + 'px';
      mask.style.height = this.maskHeight + 'px';
      this.container.appendChild(mask);
      return mask;
    };

    /**
    * Load asset json The data from server
    */
    GraphicPlayer.prototype.loadJSON = function(){
       var jsonString = this.basePath + this.id + '.json';
       ajax(jsonString,{},this.loadData.bind(this));
    };

    /**
    * Load asset images before load objects
    *
    * @param object data The data object with single asset json (data.json object)
    */
    GraphicPlayer.prototype.loadData = function(data){
       this.data = data.json;
       var obj = this;
       var onImageLoad = function(event){
          this.loadedAssets.push(event.target);
          if(this.loadedAssets.length === this.data.allImages.length){
             this.loadObjects();
          }
       }.bind(this);

       for(var i=0;i<this.data.allImages.length;i++){
          var image = new Image();
          image.src = this.basePath + this.data.allImages[i];
          image.onload = onImageLoad;
       }
    };

    /**
    * Reload asset json
    *
    * @param object json The single asset json
    */
    GraphicPlayer.prototype.reloadJSON = function(json){
       this.destroy();
       this.loadData(json);
    };

    /**
    * load animation objects
    */
    GraphicPlayer.prototype.loadObjects = function(){
       this.maskWidth = this.data.width;
       this.maskHeight = this.data.height;
       this.totalFrames = this.data.totalFrames;
       this.depthArray = this.data.depthArray;
       this.sequences = this.data.sequences;
       for(var i=this.data.sprites.length-1;i>=0;i--) {
          var spritedata = this.data.sprites[i];
          this.frameRate = spritedata.frameRate;
          var sprite = this.createGraphicObject('sprite', spritedata);
          this.sprites[sprite.name] = sprite;
          if(sprite.type == 'spk'){
            this.spkList.push(sprite.name);
          }
       }

       if(this.data.audio === void 0){
          this.data.audio = [];
       }

       for(var j=this.data.audio.length-1;j>=0;j--) {
          var audiodata = this.data.audio[j];
          var audioObj = this.createGraphicObject('audio',audiodata);
          this.audioList.push(audiodata.name);
          this.sprites[audiodata.name] = audioObj;
       }
       this.renderSriteFrame(1);
       this.checkAnimationReady();
    };
    /**
    * Creates a sprite object from data object
    *
    * @param string type of graphic object
    * @param object sprite data object from json
    */
    GraphicPlayer.prototype.createGraphicObject = function(type,data){
        var graphicObject;
        switch(type){
          case 'audio':
            graphicObject = new Audio(data,this.basePath,this.frameRate);
          break;
          case 'sprite':
            graphicObject = new Sprite(data, this.basePath, this.frameRate);
          break;
        }
        return graphicObject;
    };

    /**
    * Check animation ready
    */
    GraphicPlayer.prototype.checkAnimationReady = function(){

       var ready = true;
       var runTimeout = function(){
          this.checkAnimationReady();
       }.bind(this);
       for(var i in this.sprites){
          if(!this.sprites[i]) continue;
          if(!this.sprites[i].ready){
             setTimeout(runTimeout, 1);
             ready = false;
             return;
          }
       }

       this.ready = true;
       this.dispatchEvent('animationReady');
       if(this.autoPlay){
          this.play();
       }
    };
    GraphicPlayer.prototype.renderSriteFrame = function(frame){
         this.setSpriteDepths(frame);
         this.setSpriteFrame(frame);
         this.checkFrameEvents(frame);
    };

    GraphicPlayer.prototype.setSpriteDepths = function(frame){
       if(this.mask == void 0){
        this.mask = this.buildMask();
       }
       var lastFrameDepth = frame;
       while(this.depthArray[lastFrameDepth] === void 0){
          lastFrameDepth--;
       }
       if(this.currentDepthArray.toString() !== this.depthArray[lastFrameDepth].toString()){
          this.currentDepthArray = this.depthArray[lastFrameDepth];
          while(this.mask.hasChildNodes()){
             this.mask.removeChild(this.mask.childNodes[0]);
          }
          for(var i=0;i<this.currentDepthArray.length;i++){
             var spriteName = this.currentDepthArray[i];
             this.mask.appendChild(this.sprites[spriteName].div);
          }
       }
    };
    /**
    * looks at currentDepthArray to set sprites
    *
    * @param integer frame
    */
    GraphicPlayer.prototype.setSpriteFrame = function(frame){

       for(var i=0;i < this.currentDepthArray.length;i++){
          var spriteName = this.currentDepthArray[i];
          var sprite = this.sprites[spriteName];
          sprite.setFrame(frame, this.isPlaying);
       }
       for(var j=0;j<this.audioList.length;j++){
          var audioName = this.audioList[j];
          var audio = this.sprites[audioName];
          audio.setFrame(frame, this.isPlaying);
       }
    };

    /**
    * run time line
    *
    * @param integer now The current animation timestamp
    */
    GraphicPlayer.prototype.runTimeline = function(now){

       var time = this.startPos + (now - this.startTime)/1000;
       if(time < 0){
          time = 0;
       }
       var frame = Math.floor(time*this.frameRate)+1;
       if(frame == this.currentFrame && frame > 1)return;
       var renderFrames = true;
       this.currentFrame = frame;
       this.dispatchEvent('animationRunning',{frame:this.currentFrame});
       if(this.currentSequence === ''){
          if(this.currentFrame >= this.totalFrames) {
            renderFrames = false;
             if(this.loop){
                this.gotoAndPlay(1);
             }else{
                this.currentFrame = this.totalFrames;
                this.renderSriteFrame(this.currentFrame);
                this.stop();
             }
             this.dispatchEvent('animationDone');
          }
       }else{
          if(this.currentFrame >= this.sequences[this.currentSequence].end){
            renderFrames = false;
             if(this.loop){
                this.gotoAndPlay(this.currentSequence);
                this.dispatchEvent(this.currentSequence);
             }else{
                this.currentFrame = this.sequences[this.currentSequence].end;
                this.renderSriteFrame(this.currentFrame);
                this.stop();
                this.dispatchEvent(this.currentSequence);
             }
             if(this.currentFrame >= this.totalFrames){
                this.dispatchEvent('animationDone');
             }
          }
       }

       if(renderFrames){
           this.renderSriteFrame(this.currentFrame);
       }
    };

    /**
    * Play animation
    */
    GraphicPlayer.prototype.play = function(){

       if(this.isPlaying)return;
       this.startTime = (new Date()).getTime();
       this.startPos = (this.currentFrame-1)/this.frameRate;
       this.isPlaying = true;
       this.dispatchEvent('animationStarted',{frame:this.currentFrame});
    };

    /**
    * Stop animation
    */
    GraphicPlayer.prototype.stop = function() {

       if(!this.isPlaying)return;
       this.pauseAllSounds();
       this.isPlaying = false;
       this.dispatchEvent('animationStopped',{frame:this.currentFrame,animationDone:this.currentFrame == this.totalFrames});
    };

    /**
    * Pause all sounds
    */
    GraphicPlayer.prototype.pauseAllSounds = function(){
       for(var j=0;j<this.audioList.length;j++){
          var audioName = this.audioList[j];
          var audio = this.sprites[audioName];
          if(audio.player == void 0)continue;
          audio.player.pause();
          audio.playing = false;
       }
       for(var i=0;i< this.spkList.length;i++){
          var spriteName = this.spkList[i];
          var sprite = this.sprites[spriteName];
          if(sprite.player == void 0)continue;
          sprite.player.pause();
          sprite.playing = false;
       }
    };

    /**
    * Go to the frame and play animation
    *
    * @param integer fname The frame number
    */
    GraphicPlayer.prototype.gotoAndPlay = function(frame){

       if(isNaN(frame)){
          if(this.sequences[frame] !== void 0){
             this.currentFrame = this.sequences[frame].start;
             this.currentSequence = frame;
          }else{
             return;
          }
       }else{
          this.currentFrame = frame;
          this.currentSequence = '';
       }
       if(this.currentFrame > this.totalFrames || this.currentFrame < 1)return;
       this.pauseAllSounds();
       this.isPlaying = true;
       this.startPos = (this.currentFrame-1)/this.frameRate;
       this.startTime = (new Date()).getTime();
       this.dispatchEvent('animationStarted',{frame:this.currentFrame});
       this.checkFrameEvents(this.currentFrame);
    };

    /**
    * Goto the frame and stop animation
    *
    * @param integer frame The frame number
    */
    GraphicPlayer.prototype.gotoAndStop = function(frame){

       if(this.isPlaying) return;
       if(isNaN(frame)) return;
       if(frame > this.totalFrames || frame < 1)return;
       this.currentFrame = frame;
       this.startPos = (frame-1)/this.frameRate;
       this.renderSriteFrame(this.currentFrame);
       this.stop();
       if(this.currentFrame >= this.totalFrames) {
          this.dispatchEvent('animationDone');
       }
    };

    /**
    * Get sprite by name
    *
    * @param string is The sprite name
    *
    * @return The Sprite object
    */
    GraphicPlayer.prototype.getSprite = function(name){

       return this.sprites[name];
    };


    /**
    * Make a new sequence
    *
    * @param string name of seuqence
    * @param int start frame
    * @param int end frame
    */
    GraphicPlayer.prototype.makeSequence = function(name,start,end){

       this.sequences[name] = {start:start,end:end};
    };


    /**
    * Change spk
    *
    * @param string audio The path to audio file
    * @param string spkFile The path to spk file
    */
    GraphicPlayer.prototype.changeSpk = function(audio,spkFile){
       var changeSpkLoaded = function(){
          var audioLength = Math.floor((this.player.getDuration())*this.frameRate)+1;
          this.spkEndFrame = this.appearFrame + audioLength;
       };
       var spkFileLoaded = function(data){
          var dataResult = data;
          var dataSpk = dataResult.split('|')[2].split(',');
          for(var i = 0; i < this.spkList.length; i++){
             var spriteName = this.spkList[i];
             var sprite = this.sprites[spriteName];
             sprite.spk = dataSpk;
             sprite.player = SoundControl.addContentSound(audio,{removeSrc:false});
             addListener(sprite.player,'loaded',changeSpkLoaded.bind(sprite));
            //  var audioSettings = {
            //     audioUrl: this.basePath + dataResult.spkAudio,
            //     onSoundLoaded:changeSpkLoaded,
            //     autoPlay:false
            // };
            // sprite.player = $audioPlayer.get('content', audioSettings);
          }
       };
      ajax(spkFile, null, spkFileLoaded.bind(this));
    };


    /**
    * Check frame events
    *
    * @param integer fname The frame number
    * @param string type The frame type
    */
    GraphicPlayer.prototype.checkFrameEvents = function(frame,type){

       for(var i=0;i<this.data.events.length;i++){
          var eventObj = this.data.events[i];
          if(eventObj.frame == frame){
             this.dispatchEvent(eventObj.event);
          }
       }
    };

    /**
    * Destroy graphic player
    */
    GraphicPlayer.prototype.destroy = function(){
       this.pauseAllSounds();
       this.mask.parentNode.removeChild(this.mask);
       this.mask = void 0;
       this.ready = false;
       this.isPlaying = false;
       this.startTime = 0;
       this.startPos = 0;
       this.currentFrame = 1;
       this.previousFrame = -1;
       this.frameRate = 12;
       this.currentSequence = '';
       this.sequences = [];
       this.data = {};
       this.sprites = {};
       this.depthArray = [];
       this.currentDepthArray = [];
       this.assetList = [];
       this.loadedAssets = [];
       this.spkList = [];
       this.audioList = [];
    };
    enableEventHandling(GraphicPlayer);

        /**
    * Sprite Object
    *
    * @category cms
    * @package Graphic Player
    * @subpackage BusinessObject
    * @version $Id$
    * @param string urlStack
    * @param string type The sprite type
    * @param integer boxwidth The box width
    * @param ingeger boxheight The box height
    */
    function Sprite(data, basePath, frameRate){
       this.data = data;
       this.basePath = basePath;
       var urlStack = [];
       for(var j=0;j<data.images.length;j++) {
          var URL =  this.basePath + this.data.images[j];
          urlStack.push(URL);
       }
       this.urlStack = urlStack;
       this.type = this.data.type;
       this.swapStack = [];
       this.ready = false;
       this.frames = [];
       this.currentFrame = -1;
       this.shown = false;
       this.stackIndex = -1;
       this.forceHide = false;
       this.width = this.data.width;
       this.height = this.data.height;
       this.events = this.data.events;
       this.name = this.data.name;
       this.frameRate = this.data.frameRate;
       this.appearFrame = this.data.appearFrame;
       this.hideFrame = this.data.hideFrame;
       this.frames = this.data.frames;
       if(this.type == 'spk'){
         this.spkArray = this.data.spkArray;
         this.spkStartFrame = this.data.appearFrame;
         this.spkEndFrame = this.data.appearFrame + this.data.spkAudioLength;
         this.spk = this.data.spk;
         if(this.data.spkAudio !== void 0 && this.data.spkAudio !== '' && this.data.spkAudio !== null){
            this.spkAudio = this.data.spkAudio;

            var playerLoaded = function(event){
              var audioLength = Math.floor((this.player.getDuration())*this.frameRate)+1;
              this.spkEndFrame = this.appearFrame + audioLength;
              this.ready = true;
            };
            this.player = SoundControl.addContentSound(this.basePath + this.spkAudio,{removeSrc:false});
            addListener(this.player,'loaded',playerLoaded.bind(this));
          }else{
            this.ready = true;
          }
       }else{
        this.ready = true;
       }
       this.stackImage = this.urlStack[0];
       this.transformMatrix = '';
       this.div = this.createSpriteElement();
       this.playing = false;
       this.hasEvents = false;
       this.addEvents(this.data.events);
    }
    /**
    * Makes the physical sprite element
    *
    * @param object events The events to add
    */
    Sprite.prototype.createSpriteElement = function(){
       var div = new Image();
       div.objref = this;
       div.style.visibility = 'hidden';
       div.style.position = 'absolute';
       div.setAttribute('draggable','false');
       div.setAttribute('unselectable','on');
       div.setAttribute('name',this.data.name);
       div.style.position = 'absolute';
       div.style.backgroundPosition = 'left top';
       div.src = this.stackImage;
       return div;
    };

    /**
    * Sprite add events
    *
    * @param object events The events to add
    */
    Sprite.prototype.addEvents = function(events){

       var divEventCallback = function(event){
          var eventType = event.type;
          if(event.type == 'myclick'){
             eventType = 'click';
          }
          this.dispatchEvent(events[eventType]);
       }.bind(this);

       var spriteEventCallback = function(event){
          this.dispatchEvent(events[event.type]);
       }.bind(this);

       for(var i in events){
         this.hasEvents = true;
          if(i !== 'appear' && i !== 'hide'){
            addListener(this.div, i, divEventCallback);
          }else{
            addListener(this, i, spriteEventCallback);
          }
       }
    };

    /**
    * Send in assets you want to swap
    *
    * @param array of images. You can include image sequences.
    */
    Sprite.prototype.addSwapStack = function(stackArray){

       this.swapStack = stackArray;
       this.stackImage = this.swapStack[this.stackIndex];
       this.div.src = this.stackImage;
       var loadedAssets = [];
       var obj = this;
        var onLoadSwapStack = function(){
          loadedAssets.push(this);
          if(loadedAssets.length === stackArray.length){
             obj.dispatchEvent('spriteAssetSwapped');
          }
       };
       for(var i=0;i<stackArray.length;i++){
          var image = new Image();
          image.src = stackArray[i];
          image.onload = onLoadSwapStack;
       }
    };


    /**
    * Removes swapped out assets
    */
    Sprite.prototype.removeSwapStack = function(){

       this.swapStack = [];
      this.stackImage = this.urlStack[this.stackIndex];
       this.div.src = this.stackImage;//style.backgroundImage = 'url("'+this.urlStack[this.stackIndex]+'")';
       this.dispatchEvent('spriteAssetReverted');
    };

    /**
    * Focres a sprite to hide
    *
    * @param boolean to hide or not to hide
    */
    Sprite.prototype.hideSprite = function(bool){
       this.forceHide = bool;
       if(!this.forceHide && this.div.style.visibility == 'hidden'){
          this.div.style.visibility = 'inherit';
          this.dispatchEvent('appear');
       }
       if(this.forceHide && this.div.style.visibility == 'inherit'){
          this.div.style.visibility = 'hidden';
          this.dispatchEvent('hide');
       }
    };

    Sprite.prototype.setSpriteVisiblity = function(frame){
       this.shown = false;
       if(frame >= this.appearFrame){
          this.shown = true;
       }
       if(this.hideFrame !== null && frame > this.hideFrame){
          this.shown = false;
       }
       if(this.forceHide){
          this.shown = false;
       }
      if(this.shown && this.div.style.visibility == 'hidden'){
          this.div.style.visibility = 'inherit';
          this.dispatchEvent('appear');
       }
       if(!this.shown && this.div.style.visibility == 'inherit'){
          this.div.style.visibility = 'hidden';
          this.dispatchEvent('hide');
       }
    };

    /**
    * Set time, show current tween frame
    *
    * @param integer frame The frame number
    */
    Sprite.prototype.setFrame = function(frame,isPlaying){
       this.currentFrame = frame;
       switch(this.type){
          case 'graphic':
             this.setTweenFrame(frame);
          break;
          case 'spk':
             if(this.player !== void 0 && this.player !== null){
                if(this.playing === false && isPlaying && frame >= this.appearFrame && frame <= this.spkEndFrame){
                   var spkPlayTime = ((frame - this.appearFrame)/this.frameRate);
                   this.player.play();
                   this.player.setPosition(spkPlayTime);
                   this.playing = true;
                }
                if(frame > this.spkEndFrame){
                   this.player.pause();
                   this.playing = false;
                }
             }
             if(this.spk == void 0 || this.spk.length === 0){
                this.setTweenFrame(frame);
             }else{
                var aFrame;
                if(isPlaying && this.player !== void 0 && this.player.playing){
                   aFrame = Math.floor(this.player.getPosition()*12);
                }else{
                   aFrame = Math.ceil(frame/this.frameRate * 12) - this.appearFrame;
                }
                var index = this.spk[aFrame];

                if(index !== void 0){
                   this.setPropertyValue('index',index);
                   this.setPropertyValue('height',this.spkArray[index].height);
                   this.setPropertyValue('width',this.spkArray[index].width);
                   this.setTweenFrame(frame,['index','height','width']);
                }else{
                   this.setTweenFrame(frame);
                }
             }
          break;
       }
       this.setSpriteVisiblity(frame);
    };

    /**
    * Set value of all tweens of given frame with possible exceptions
    *
    * @param string frame The frame that we want to set the tweens
    * @param array exceptions List of exceptions
    */
    Sprite.prototype.setTweenFrame = function(frame,exceptions){
       if(exceptions == void 0){
          exceptions = [];
       }
       for(var prop in this.frames[frame-1]) {
          if(exceptions.indexOf(prop) > -1){
             continue;
          }
          this.setPropertyValue(prop, this.frames[frame-1][prop]);
       }
       this.renderSprite();
    };
   Sprite.prototype.noClick = function () {
       this.div.setAttribute('draggable', false);
       this.div.setAttribute('unselectable', 'on');
       this.div.style.pointerEvents = 'none';
   };

    Sprite.prototype.renderSprite = function(){
      if(!this.hasEvents){
         this.noClick();
      }
      this.div.style.left = this.x + 'px';
      this.div.style.top = this.y + 'px';
      this.div.style.width = this.width + 'px';
      this.div.style.height = this.height + 'px';
      this.div.style.opacity = this.opacity;
      this.div.style.transform = this.transformMatrix;
      this.div.style.webkitTransform =  this.transformMatrix;
      this.div.style.MozTransform = this.transformMatrix;
      this.div.style.msTransform = this.transformMatrix;
      this.div.style.transformOrigin = this.width/2 + 'px ' + this.height/2 + 'px';
      this.div.style.webkitTransformOrigin =  this.width/2 + 'px ' + this.height/2 + 'px';
      this.div.style.msTransformOrigin =  this.width/2 + 'px ' + this.height/2 + 'px';
      this.div.src = this.stackImage;
    };
    /**
    * Set value to property
    *
    * @param string property The propery to change: x, y, widht, height, opacity, volume, index or matrix
    * @param string value The property value
    */
    Sprite.prototype.setPropertyValue = function(property, value){

       switch(property){
          case 'x':
             if(this.x == value) return;
             this.x = value;
          break;
          case 'y':
             if(this.y == value) return;
             this.y = value;
          break;
           case 'width':
              if(this.width == value) return;
              this.width = value;
           break;
           case 'height':
              if(this.height == value) return;
              this.height = value;
           break;
           case 'opacity':
              if(this.opacity == value) return;
              this.opacity = value;
           break;
          case 'index':
          if(this.urlStack[value] === void 0 || this.stackIndex == value)return;
             this.stackIndex = value;
             if(this.swapStack.length > 0){
                this.stackImage = this.swapStack[value];
             }else{
                this.stackImage = this.urlStack[value];
             }
          break;
          case 'matrix':
            if(this.transformMatrix == value) return;
            this.transformMatrix = value;
          break;
        }
    };
   enableEventHandling(Sprite);

   function Audio(data, basePath, frameRate){
       this.data = data;
       this.basePath = basePath;
       this.audioPath = this.basePath + this.data.file;
       this.ready = false;
       this.frameRate = frameRate;
       this.basePath = basePath;
       this.loop = this.data.loop;
       this.playing = false;
       this.player = null;
       this.type = this.data.type;
       this.name = this.data.name;
       this.volume = this.data.volume;
       this.appearFrame = this.data.frame;
       this.hideFrame = this.data.frame + this.data.audioLength;
       if(this.audioPath === ''){
          this.ready = true;
          return;
       }
        var objref = this;
        var playerLoaded = function(event){
          this.ready = true;
        }.bind(this);
        var loopPlayer = function(event){
          if(this.loop){
            this.player.play();
            this.player.setPosition(0);
          }
        }.bind(this);

       switch(this.type){
          default:
          case 'content':
             this.player = SoundControl.addContentSound(this.audioPath,{removeSrc:false});
             break;
          case 'background':
             this.player = SoundControl.addBackgroundSound(this.audioPath);
             break;
          case 'effect':
             this.player = SoundControl.addEffectSound(this.audioPath);
             break;
       }
       if(this.loop){
         this.player.loop();
       }

       addListener(this.player, 'loaded', playerLoaded.bind(this));
       return this;
    }
    Audio.prototype.setFrame = function(frame,isPlaying){
       if(this.playing === false && isPlaying && frame >= this.appearFrame && frame <= this.hideFrame){
          var audioPlayTime = ((frame - this.appearFrame)/this.frameRate);
          this.player.play();
          this.player.setPosition(audioPlayTime);
          this.playing = true;
       }
    };

////////////////////////////////////////////////////////////////////////////

	//var medias = new MediaManager();
	//var animationmanager = new animationManager('player', false);

  /* This listener affect some elements that work with onclick event,
     for that reason, we removed this from the document.
  */
  removeListener(document, 'click', disableClickEvent, true); 

/*This is to fix a graphic error on IE. Even though the lines will appear, the user won't notice them.
*/
  document.getElementById('maindiv').style.backgroundColor = "rgb(253, 251, 239);";

	bookHasGlossary = "";

  //////////////////////////////////////////////////////////////////////////////////
  var gameContainer             = document.getElementById('game');
  var gameID                    = 206502299133;
  var userName                  = "希希";
  var bookCID                   = 12261;
  var bookAssetsRootPath        = WEBHOST + "artmin";
  var isDev                    = false;
  var isPreview                = false;
  var animationPath             = WEBHOST + "artwork/books/12261/anim/";
  var graphicPlayerManager = new GraphicManager(animationPath);
  var centerShadow              = document.getElementById('centerShadow');
  var divLeftPageCanvas         = document.getElementById('leftPageDiv');
  var divRightPageCanvas        = document.getElementById('rightPageDiv'); //why is it called "canvas" if its not a canvas?
  var divLeftCoverCanvas         = document.getElementById('leftCoverDiv');
  var divRightCoverCanvas        = document.getElementById('rightCoverDiv');
  var pageFlipLeftPageCanvas    = document.getElementById('containerFlipLeft');
  var pageFlipRightPageCanvas   = document.getElementById('containerFlipRight');
  var centerShadowFlipAnimation = document.getElementById('centerShadowFlipAnimation');
  var borderShadowFlipAnimation  = document.getElementById('borderShadowFlipAnimation');
  var reflectionLightFlipAnimation = document.getElementById('reflectionLightFlipAnimation');
  var bookDiv                   = document.getElementById('bookContainer');
  var hudDiv                    = document.getElementById('hud');
  var settingsPopupDiv          = document.getElementById('settingsPopUp');
  var settingsBox               = document.getElementById('settingsBox');
  var settingsBoxBackdrop       = document.getElementById('settingsBoxBackdrop');
  var boxBody                   = document.getElementById('boxBody');
  var colorList                 = document.getElementById('list-color');

  var leftBottomBorder          = document.getElementById('leftPageBottomBorder');
  var leftSideBorder            = document.getElementById('leftPageSideBorder');
  var rightBottomBorder         = document.getElementById('rightPageBottomBorder');
  var rightSideBorder           = document.getElementById('rightPageSideBorder');

  var leftBottomBorderCanvas    = document.getElementById('leftPageBottomBorderCanvas');
  var leftSideBorderCanvas      = document.getElementById('leftPageSideBorderCanvas');
  var rightBottomBorderCanvas   = document.getElementById('rightPageBottomBorderCanvas');
  var rightSideBorderCanvas     = document.getElementById('rightPageSideBorderCanvas');

  var centerCoverBackground       = document.getElementById('centerCoverBackground');
  var centerCoverBackgroundShadow = document.getElementById('centerCoverBackgroundShadow');
  var closedCoverCanvas           = document.getElementById('closedCoverCanvas');
  var centerCoverBackgroundCanvas = document.getElementById('centerCoverBackgroundCanvas');
  var centerCoverBackgroundShadowCanvas = document.getElementById('centerCoverBackgroundShadowCanvas');

  var highlightContainers = document.getElementsByClassName('highlightContainer');

  var slowerButton              = document.getElementById('slowerButton');
  var fasterButton              = document.getElementById('fasterButton');
  var sliderForeground          = document.getElementById('foreground-fill');

  var doPauseAfterPage          = false;
  var isPausedAfterPage         = false;
  var isPageDragging            = false;
  var isBookPaused              = false;
  var wasBookStatePaused        = false;
  var isUsingTurnPage           = false;
  var isBookCompleted           = false;
  var isRestarting              = false;
  var forcePause                = false;

  var mediaProgressTracker      = null;
  var slowMediaProgressTracker = null;

  var timeCheck;
  var bookAssetsRootPath;
  var book;
  var bookTicketMachine = new BPTicketMachine();
  var settingsPopup;

  var hud;
  var glossaryPopUp;
  var canUseSlowAudio;
  var dragPageGesture;


  bookTicketMachine.initializeTicketMachine(bookCID, gameID, function(data) {
    bookAssetsRootPath = ApiService.api_domains.cdn_content_root_url;
    BookUtils.instance.initialize(bookCID, bookAssetsRootPath);
    BookJSON.getInstance().initialize(data.content_info, data.activity_info);
    BookSetting.getInstance().setUserName(userName);
    BookUtils.instance.applyOverflowToParents(gameContainer, 'visible');
    initializeBook(data.content_info);
  });

  function initializeBook(bkjson) {
    bookJSON = bkjson;

	// 根据书本数据初始化书
    book = new BPBook(divLeftPageCanvas, divRightPageCanvas, centerShadow, pageFlipLeftPageCanvas, pageFlipRightPageCanvas, centerShadowFlipAnimation, borderShadowFlipAnimation, reflectionLightFlipAnimation, divLeftCoverCanvas, divRightCoverCanvas);
    book.pageFlipAnimator.pageFlipTransitionStart = onPageFlipStart;
    book.pageFlipAnimator.pageFlipCallBack = onPageFlipCompleted;

    book.audioProgress.onProgress = onBookAudioProgress;
    book.audioProgress.onEndProgress = onBookAudioEndProgress;
    book.audioProgress.onCurrentPagesFinalPositionExceeded = onCurrentPagesFinalPositionExceeded;
    book.audioProgress.onCurrentPagesInitialPositionExceeded = onCurrentPagesInitialPositionExceeded;

	// 播放面板
    hud = new BPHUD(hudDiv);
    hud.progressSlider.onProgressChanged = onSliderProgressChange;
    hud.progressSlider.onStartDrag = onSliderStartDrag;
    hud.progressSlider.onEndDrag = onSliderEndDrag;
    hud.playPauseCheckbox.onStateChangeEvent = onPlayPauseCheckboxStateChangeEvent;

    canUseSlowAudio = true;
    settingsPopup = new BPSettingsPopUp(settingsPopupDiv);
    settingsPopup.initialize();
    settingsPopup.onCloseSettingPopUpCallBack = onCloseSettingsPopUp;
    settingsPopup.onPlaySpeedStateChangeEvent = onNormalSlowerCheckboxStateChangeEvent;
    settingsPopup.UIColorPopUp.onUIColorSelectedCallBack = onChangeHUDColor;

    glossaryPopUp = new BPGlossaryPopUp();
    glossaryPopUp.onClosePopUpCallBack = onCloseGlossaryPopUp;

    if (BookConstants.DRAG_PAGE_ENABLED) {
      dragPageGesture = new BPDragPageGesture(bookDiv);
      dragPageGesture.onStartDrag = onDragStarted;
      dragPageGesture.onProgressChanged = onDragging;
      dragPageGesture.onEndDrag = onDragFinished;
    } else {
      var leftPageDiv = document.getElementById('leftPageDiv');
      leftPageDiv.onclick = onLeftPageClick;
      var rightPageDiv = document.getElementById('rightPageDiv');
      rightPageDiv.onclick = onRightPageClick;
    }
    book.load(onBookLoadingCompleted);
  }

  var hasLoaded = false;

  function onFocus()
  {
    if(!hasLoaded)
      return;

    var progress = book.audioProgress.progress;
    var speedModifier = 1;
    if(book.audioProgress.isUsingSlowAudio)
          speedModifier = BookConstants.SLOW_AUDIO_DURATION_PERCENTAGE;
    var _lastPageBreak = parseFloat(book.audioProgress.pagebreaks[book.audioProgress.pagebreaks.length-1]) * speedModifier;
    var _firstPageBreak = parseFloat(book.audioProgress.pagebreaks[0]) * speedModifier;
    var _lastPageBreakPercentPos =  _lastPageBreak / (book.audioProgress.currentSoundPlayer.audioBook.getDuration());
    var _firstPageBreakPercentPos =   _firstPageBreak / (book.audioProgress.currentSoundPlayer.audioBook.getDuration());

    if(progress >= _lastPageBreakPercentPos){
      if(progress >= 1)
      book.forceClosedPosition(false,true);
    } else {
      if(progress<=_firstPageBreakPercentPos){
        book.forceClosedPosition(true,true);
      } else {
        book.forceOpenedPosition();
      }
    }
  }

  if (/*@cc_on!@*/false) { // check for Internet Explorer
    document.onfocusin = onFocus;
  } else {
    window.onfocus = onFocus;
  }


  //USED INTO UPDATE PAGE WEIGHT
  //const TODO: put these into the Book constants properly
  var baseBottomBorderTop = 539;
  var baseLeftBottomLeft = 6;
  var baseRightBottomLeft = 404;
  var baseSideBorderTop = 22;
  var baseLeftSideBorderLeft = 7;
  var baseRightSideBorderLeft = 780;

  //shared with update borders and cover position
  var topVariation = 0;
  var weightProgress = 0;
  var revWeightProgress = 0;
  var pageWeightIndex;

  function updatePageWeight () {
    weightProgress = 0;
    pageWeightIndex = book.temporalLeftIndex;
    if(pageWeightIndex < 0)
      pageWeightIndex = 0;
    weightProgress  = pageWeightIndex/(book.pages.length-1);
    revWeightProgress = 1 - weightProgress;
    //update book cover border positions
    drawPageWeight();
  }

  function drawPageWeight () {
    //get context
    var bottomBorder  = BookConstants.BORDER_PAGE_BOTTOM;
    var sideBorder    = BookConstants.BORDER_PAGE_SIDE;
    var ctxL = leftBottomBorderCanvas.getContext('2d');
    var ctxSideL = leftSideBorderCanvas.getContext('2d');
    var ctxR = rightBottomBorderCanvas.getContext('2d');
    var ctxSideR = rightSideBorderCanvas.getContext('2d');
    var baseWidth = 14; //this is the page weight asset width

    //clear canvases
    ctxSideR.clearRect(0,0, rightSideBorderCanvas.width, rightSideBorderCanvas.height);
    ctxR.clearRect(0,0, rightBottomBorderCanvas.width, rightBottomBorderCanvas.height);
    ctxSideL.clearRect(0,0, leftSideBorderCanvas.width, leftSideBorderCanvas.height);
    ctxL.clearRect(0,0, leftBottomBorderCanvas.width, leftBottomBorderCanvas.height);

    // set images
    var sideImg = book.generalUI.pageBorderSideImage;
    var sideImgFlipped = book.generalUI.pageBorderSideImageFlipped;
    var bottomImg = book.generalUI.pageBorderBottomImage;
    var bottomImgFlipped = book.generalUI.pageBorderBottomImageFlipped;

    //draw into canvases
    if(pageWeightIndex > 1){
      ctxSideL.drawImage(sideImgFlipped,0,0);
      ctxL.drawImage(bottomImgFlipped,0,0);
    }
    if(pageWeightIndex != book.pages.length-3){ //prevents lines drawn on last page
      ctxSideR.drawImage(sideImg,0,0);
      ctxR.drawImage(bottomImg,0,0);
    }

    leftBottomBorder.style.height = baseWidth*weightProgress + "px";
    leftBottomBorder.style.left = baseLeftBottomLeft + "px";
    leftBottomBorder.style.top = baseBottomBorderTop + topVariation + "px";
    leftSideBorder.style.left = baseLeftSideBorderLeft + baseWidth*revWeightProgress + "px";
    leftSideBorder.style.top =  baseSideBorderTop - baseWidth*revWeightProgress + topVariation + "px";
    leftSideBorder.style.width = baseWidth*weightProgress + "px";
    rightBottomBorder.style.height = baseWidth*revWeightProgress + "px";
    rightBottomBorder.style.left = baseRightBottomLeft + "px";
    rightBottomBorder.style.top = baseBottomBorderTop + topVariation + "px";
    rightSideBorder.style.top = baseSideBorderTop + topVariation + "px";
    rightSideBorder.style.left = baseRightSideBorderLeft + "px";
    rightSideBorder.style.width = baseWidth*revWeightProgress + "px";
  }

  function updateBorders()
  {

    //set progress
    var progress = 0;
    var index = book.temporalLeftIndex;
    if(index < 0)
      index = 0;
    //??
    var isCoverPage = false;
    if(index < 1){
      isCoverPage = true;
      progress = 0;
    }else{
      isCoverPage = false;
    }
    if(index >= book.pages.length-1){
      index = book.pages.length-1
    }
    progress  = index/book.pages.length;
    progressL3  = index/(book.pages.length - 3);
    revProgress = 1 - progress;



    var skew;
    var Percent;
    var PercentCenterTop;
    var factorLeft = BookConstants.SKEW_FACTOR_LEFT;
    var factorRight = BookConstants.SKEW_FACTOR_RIGHT;
    var factorCenter = BookConstants.SKEW_FACTOR_CENTER;
    var factorCenterShadow = BookConstants.SKEW_FACTOR_CENTER_SHADOW;
    var factorTop = BookConstants.FACTOR_TOP;
    var factorHeight = BookConstants.FACTOR_HEIGHT;
    var factorHeightShadow = BookConstants.FACTOR_HEIGHT_SHADOW;
    var factorTopCenter = BookConstants.FACTOR_TOP_CENTER;

    //used to control page weight position// shared with page weight
    topVariation = 0;

    if (progressL3 >= 0.55) {

          Percent  = (progressL3 - 0.5) * 2;
          PercentCenterTop =  (0.5 - (progressL3 - 0.5)) * 2;
          skew = factorRight * Percent;
          BookUtils.instance.applyTrasformBeforeCoverElement(book.rightCoverDiv,skew);

          if(progressL3 == 1){
            BookUtils.instance.applyTrasformFinishCoverElement(book.rightPageDiv,2);
          }else{
            BookUtils.instance.applyTrasformFinishCoverElement(book.rightPageDiv,0);
          }

          skew = (factorCenter * Percent) * -1;
          BookUtils.instance.applyTrasformBeforeCoverElement(centerCoverBackground,skew);
          skew = (factorCenterShadow * Percent) * -1;
          BookUtils.instance.applyTrasformBeforeCoverElement(centerCoverBackgroundShadowCanvas,skew);

          topVariation = (Percent * factorTop) * -1;
          var shadowTop = BookConstants.PAGE_FLIP_RENDER_SHADOW.top;
          book.pageFlipAnimator.parentPageFlipRight.style.top = topVariation + "px";
          book.pageFlipAnimator.parentPageFlipLeft.style.top =  topVariation + "px";
          book.rightPageDiv.style.top = topVariation + "px";
          book.rightCoverDiv.style.top = topVariation + "px";
          book.LeftPageDiv.style.top = topVariation + "px";
          book.centerShadow.style.top = shadowTop + topVariation + "px";
          centerShadowFlipAnimation.style.top = shadowTop + topVariation + "px";
          book.pageFlipAnimator.borderShadowFlipAnimation.style.top = shadowTop + topVariation + "px";
          book.pageFlipAnimator.reflectionLightFlipAnimation.style.top = shadowTop + topVariation + "px";
          book.pageFlipAnimator.bottomRightShadow.style.height = (PercentCenterTop * factorHeight) + 530 + "px";
          centerCoverBackground.style.top = factorHeight +  (PercentCenterTop  * factorTopCenter) - 2 + "px";
          centerCoverBackgroundShadowCanvas.style.top = factorHeightShadow + (PercentCenterTop  * factorTopCenter) + "px";

    }else if (progressL3 <= 0.45){

        if (progressL3 <= 0) {
          progressL3 = 0;
        }

        if(book.temporalLeftIndex == 1){
          BookUtils.instance.applyTrasformFinishCoverElement(book.LeftPageDiv,-2);
          progressL3 = 0;
        }else{
         BookUtils.instance.applyTrasformFinishCoverElement(book.LeftPageDiv,0);
        }

        Percent  = (0.5 - progressL3) * 2;
        PercentCenterTop =  progressL3 * 2;

        skew = (factorLeft * Percent) * -1;
        BookUtils.instance.applyTrasformBeforeCoverElement(book.leftCoverDiv,skew);



        skew = factorCenter * Percent;
        BookUtils.instance.applyTrasformBeforeCoverElement(centerCoverBackground,skew);
        skew = factorCenterShadow * Percent;
        BookUtils.instance.applyTrasformBeforeCoverElement(centerCoverBackgroundShadowCanvas,skew);

        topVariation = (Percent * factorTop) * -1;
        var shadowTop = BookConstants.PAGE_FLIP_RENDER_SHADOW.top;
        book.pageFlipAnimator.parentPageFlipRight.style.top = topVariation + "px";
        book.pageFlipAnimator.parentPageFlipLeft.style.top = topVariation + "px";
        book.LeftPageDiv.style.top = topVariation + "px";
        book.leftCoverDiv.style.top = topVariation + "px";
        book.rightPageDiv.style.top = topVariation + "px";
        book.centerShadow.style.top = shadowTop + topVariation + "px";
        centerShadowFlipAnimation.style.top = shadowTop + topVariation + "px";
        book.pageFlipAnimator.borderShadowFlipAnimation.style.top = shadowTop + topVariation + "px";
        book.pageFlipAnimator.reflectionLightFlipAnimation.style.top = shadowTop + topVariation + "px";
        book.pageFlipAnimator.bottomLeftShadow.style.height = (PercentCenterTop * factorHeight) + 530 + "px";
        centerCoverBackground.style.top = factorHeight +  (PercentCenterTop * factorTopCenter) - 2 + "px";
        centerCoverBackgroundShadowCanvas.style.top = factorHeightShadow +  (PercentCenterTop * factorTopCenter) + "px";
    }else{

      BookUtils.instance.applyTrasformBeforeCoverElement(book.leftCoverDiv,0);
      BookUtils.instance.applyTrasformBeforeCoverElement(book.rightCoverDiv,0);
      BookUtils.instance.applyTrasformBeforeCoverElement(centerCoverBackground,0);
      BookUtils.instance.applyTrasformBeforeCoverElement(centerCoverBackgroundShadowCanvas,0);

      topVariation = 0;
      book.pageFlipAnimator.parentPageFlipRight.style.top = "0px";
      book.pageFlipAnimator.parentPageFlipLeft.style.top = "0px";;
      book.LeftPageDiv.style.top =  "0px";
      book.leftCoverDiv.style.top = "0px";
      book.rightCoverDiv.style.top = "0px";
      book.rightPageDiv.style.top = "0px";
      book.centerShadow.style.top = "19px";
      centerShadowFlipAnimation.style.top = "19px";
      book.pageFlipAnimator.borderShadowFlipAnimation.style.top = "19px";
      book.pageFlipAnimator.reflectionLightFlipAnimation.style.top = "19px";
      book.pageFlipAnimator.bottomLeftShadow.style.height = factorHeight  + 530 +"px";
      book.pageFlipAnimator.bottomRightShadow.style.height = factorHeight + 530 + "px";
      centerCoverBackground.style.top = factorHeight + factorTopCenter  - 2 + "px";
      centerCoverBackgroundShadowCanvas.style.top = factorHeightShadow + factorTopCenter + "px";

    }
    updatePageWeight();
    drawPageWeight();
    updateAnimationsPosition(topVariation);
  }

  function updateAnimationsPosition (_topValue) {
    var anims = document.getElementsByClassName("forceCrispyRender"); //gets all animations
    for(var i = 0; i<anims.length; i++){
      anims[i].firstChild.style.top = _topValue*-1 + "px"; //compensate current top with variation
    }
  }


  function onTurnRightPage()
  {
    if(book.currentRightPage != null && !book.pageFlipAnimator.isAnimating){
      if(book.currentLeftPage){
        book.currentLeftPage.updateHighLight(0);
      }
      if(book.currentRightPage){
        book.currentRightPage.updateHighLight(0);
      }
      book.goToNextPages(true);
      if(!forcePause)
        play();
    }
  }

  function onTurnLeftPage()
  {
    if(book.currentLeftPage != null && !book.pageFlipAnimator.isAnimating){
        if(book.currentLeftPage)
        book.currentLeftPage.updateHighLight(0);
      if(book.currentRightPage)
        book.currentRightPage.updateHighLight(0);
        book.goToPreviousPages(true);
        if(!forcePause)
          play();
    }


  }

  function onTurnPage(isRightPage, progress)
  {
    isUsingTurnPage = true;

    pause();
    //Start the page flip but paused
    if(isRightPage)
    {
      var position =  book.audioProgress.getNextBreakPosition();
      book.audioProgress.setAudioPosition(position);
    }
    else
    {
      var position =  book.audioProgress.getPreviousBreakPosition();
      book.audioProgress.setAudioPosition(position);
    }
    if(!forcePause)
      play();
  }

  function tintCoverImages () {

    book.generalUI.coverBackgroundImage = BookUtils.instance.getTintedImage(book.generalUI.coverBackgroundImage, book.coverColor);

    book.generalUI.coverBackgroundImage.onload = function(){
      book.generalUI.coverBackgroundImage = BookUtils.instance.paintShadow(book.generalUI.coverBackgroundImage, book.generalUI.coverBackgroundImageAlpha);
    };
    book.generalUI.coverBackgroundImageFlipped = BookUtils.instance.getTintedImage(book.generalUI.coverBackgroundImageFlipped, book.coverColor);

    book.generalUI.coverBackgroundImageFlipped.onload = function(){
      book.generalUI.coverBackgroundImageFlipped = BookUtils.instance.paintShadow(book.generalUI.coverBackgroundImageFlipped, book.generalUI.coverBackgroundImageFlippedAlpha);
    };
    book.generalUI.coverBackgroundImageCenter = BookUtils.instance.getTintedImage(book.generalUI.coverBackgroundImageCenter, book.coverColor);

    book.generalUI.coverBackgroundImageCenter.onload = function(){
      book.generalUI.coverBackgroundImageCenter = BookUtils.instance.paintShadow(book.generalUI.coverBackgroundImageCenter, book.generalUI.coverBackgroundImageCenterAlpha);
    };
  }

  var interval;

  function restartBook () {
    if(isRestarting)
      return;
    isRestarting = true;
    isBookCompleted = false;
    book.playbackCompleted = false;
    book.removeAllAnimations();


    book.audioProgress.resetAudioPosition();
    pause();

    hud.moveSlider({ //creating a fake event is bad business, right?
      target: {id:'none'},
      'offsetX':-10,
      preventDefault: function () {},
      stopPropagation: function () {}
    });
    interval = window.setInterval(function () {
      book.pageFlipAnimator.bottomLeftShadow.className = book.pageFlipAnimator.bottomLeftShadow.className.replace(" open", "");
      book.pageFlipAnimator.bottomRightShadow.className = book.pageFlipAnimator.bottomRightShadow.className.replace(" open", "");
    }, 100);

    window.setTimeout(function () {
        window.clearInterval(interval);
        onBookLoadingCompleted();
        book.updateCenterCover("CLOSE_FRONT");
        book.pageFlipAnimator.bottomLeftShadow.className = book.pageFlipAnimator.bottomLeftShadow.className.replace(" open", "");
        book.pageFlipAnimator.bottomRightShadow.className = book.pageFlipAnimator.bottomRightShadow.className.replace(" open", "");
        book.update();

        if(!glossaryPopUp.glossaryPopUp){
          play();
          book.isPlaying = false;
        }
    }, 200);
  }


  function onBookLoadingCompleted(sender)
  {
	var ie = ie_ver();
    hasLoaded = true;
    timeCheck = Date.now();
    book.renderCenter();
    updateBorders();
    updatePageWeight();
    document.getElementById('bottomLeftShadow').style.opacity = 0;
    document.getElementById('bottomRightShadow').style.opacity = 0;
    document.getElementById('bookContainer').style.display = 'block';
    book.updateCenterCover("CLOSE_FRONT");
    book.setCoverCenterClosedFront(0.1);
    centerCoverBackground.style.width = closedFrontWidth + 3.5 + "px";
    book.forceClosedPosition(true);
    hud.spinnerLoader.stop();

    window.setTimeout(function () {
      initMediaProgressTracker(book.audioProgress.soundPlayer.audioBook);
      if(book.audioProgress.hasSlowAudio){
        initSlowMediaProgressTracker(book.audioProgress.slowSoundPlayer.audioBook);
      }

      book.audioProgress.soundPlayer.addCompletedListener();

	  if (ie == "10") {
	   book.audioProgress.onIEAudioLoad();
	  }
	  bookTicketMachine.initializeTicketMachine(bookCID, gameID);

      play();
      hud.showHud();

      if(book.audioProgress.soundPlayer.isAutoplaySupported){
        window.setTimeout(function () {
          if(!dragPageGesture.isDragging){
            play();
            initMediaProgressTracker(book.audioProgress.soundPlayer.audioBook);
            if(book.audioProgress.hasSlowAudio){
              initSlowMediaProgressTracker(book.audioProgress.slowSoundPlayer.audioBook);
            }
          }
          hud.showHud();
        }, 2000);
      } else {
        pause();
      }
      verifyGlossary();

      settingsPopup.removePlaySpeedContainer(!book.audioProgress.hasSlowAudio);
      document.getElementById('bottomLeftShadow').style.visibility = "visible";
      document.getElementById('bottomRightShadow').style.visibility = "visible";
      document.getElementById('bottomLeftShadow').style.opacity = 1;
      document.getElementById('bottomRightShadow').style.opacity = 1;
      document.getElementById('bookContainer').style.opacity = 1;
      document.getElementById('bookContainer').style.display = 'block';
    }, 500);
  }

  function verifyGlossary(){
    if(!bookHasGlossary){
      var glossaryButton        = document.getElementById('glossaryButton');
      var pauseToReadButton       = document.getElementById('pauseToread');
      var settingsButton        = document.getElementById('settingButton');
      var settingsBox           = document.getElementById('settingsBox');
      var slowerButton          = document.getElementById('slowerButton');
      var fasterButton          = document.getElementById('fasterButton');

      var pauseToReadButtonContainer  = document.getElementById('pauseToreadContainer');
      var settingsButtonContainer     = document.getElementById('settingButtonContainer');
      var slowerButtonContainer     = document.getElementById('slowerButtonContainer');
      var fasterButtonContainer     = document.getElementById('fasterButtonContainer');

      glossaryButton.style.display    = "none";

      slowerButton.style.left       = 621 + "px";
      var hoverShadow         = slowerButtonContainer.getElementsByClassName('hoverShadow')[0];
      hoverShadow.style.left      = 621 + "px";


      fasterButton.style.left       = 621 + "px";
      hoverShadow             = fasterButtonContainer.getElementsByClassName('hoverShadow')[0];
      hoverShadow.style.left      = 621 + "px";

      pauseToReadButton.style.left    = 706 + "px";
      hoverShadow             = pauseToreadContainer.getElementsByClassName('hoverShadow')[0];
      hoverShadow.style.left      = 706 + "px";


      hoverShadow             = settingButtonContainer.getElementsByClassName('hoverShadow')[0];
	  
	  // 如果没有快慢按钮，调整其右侧的按钮位置。
      if(book.audioProgress.hasSlowAudio){
        settingsButton.style.left     = 791 + "px";
        hoverShadow.style.left      = 791 + "px";
        settingsBox.style.left      = 781 + "px";
      } else {
        hoverShadow.style.left      = 711 + "px";
        settingsBox.style.left      = 721 + "px";
      }
    }
  }

  function getAudioState () {
    return true; //let's ignore the audio state, for now.
    var targetAudio = book.audioProgress.isUsingSlowAudio ? book.audioProgress.slowSoundPlayer.audioBook.element : book.audioProgress.currentSoundPlayer.audioBook.element;
      if(targetAudio.readyState < 3)
        return false;
      return true;
  }

  function cancelDrag(sender)
  {
    if(sender.isDraggingRightPage)
      {
        if(book.currentRightPage == null)
        {
          sender.startDrag  = false;
          sender.isDragging = false;
          return true;
        }
      }
      else
      {
        if(book.currentLeftPage == null)
        {
          sender.startDrag  = false;
          sender.isDragging = false;
          return true;
        }
      }
      return false;
  }

  function onDragStarted(sender)
  {
    if(isRestarting || book.pageFlipAnimator.isAnimating)
      return;

    if(cancelDrag(sender))
      return;
  }

  function onDragging(sender)
  {
    if(!isPageDragging && sender.progress <= 0){
      return;
    }

    if(!isPageDragging)
    {
        isPageDragging = true;
        dragPageGesture.isDisabled = true;
        book.disablePageFlip       = false;

        wasBookStatePaused = isBookPaused;
        pause();

        //for reseting animations and book to the point before page flip
        book.progressBeforePageflip  = book.audioProgress.progress;
        //Start the page flip but paused
        if(sender.isDraggingRightPage){
          book.goToNextPages(true);
        } else {
        	book.goToPreviousPages(true);
        }

        book.pageFlipAnimator.isAnimating = false;
    }
    book.pageFlipAnimator.updateProgress(sender.progress);
  }

  function onCoverClick(){

    if(!book.currentRightPage || book.currentLeftPageIndex > 2)
      return;

    if(!isPageDragging && book.currentRightPage.isCoverPage){
      book.goToNextPages(true);

        if(!forcePause)
          play();
    }

  }

  function saveCurrentProgressBeforePageFlip (_forcedProgress) {
    if(!_forcedProgress){
      book.progressBeforePageflip  = book.audioProgress.progress;
    } else {
      book.progressBeforePageflip = _forcedProgress;
    }
  }

  function resetProgressOnCancel () {

    var audioProgress = book.progressBeforePageflip * book.audioProgress.getSoundDuration();
    book.audioProgress.setAudioPosition(audioProgress);
    book.audioProgress.progress = book.progressBeforePageflip;
    hud.progressSlider.updateProgress(book.progressBeforePageflip, true);

    if(book.audioProgress.isUsingSlowAudio){
      hud.updateProgressTime(book.progressBeforePageflip * book.audioProgress.getSlowAudioDuration(), book.audioProgress.getSlowAudioDuration() -1);
    }else{
      hud.updateProgressTime(audioProgress, book.audioProgress.soundPlayer.getDuration() -1);
    }

    book.disablePageFlip  = false;

    if(book.currentRightPage != null){
      book.currentRightPage.showAnimations(audioProgress);
      book.currentRightPage.UpdateAnimationsFromPoint(audioProgress);
      book.currentRightPage.updateHighLight(audioProgress);
    }

    if(book.currentLeftPage != null){
        book.currentLeftPage.showAnimations(audioProgress);
        book.currentLeftPage.UpdateAnimationsFromPoint(audioProgress);
        book.currentLeftPage.updateHighLight(audioProgress);
    }
    book.audioProgress.update();
    book.updatePages(audioProgress);
  }

  function onDragFinished(sender)
  {

    if(sender.progress < 0.001 && !isPageDragging){
      book.waitAnimationFlipCallBack = false;
      isPageDragging = false;
      onCoverClick();

      return;
    }

    if(isPageDragging)
    {
      if(sender.progress  > 0.25)
      {
        book.waitAnimationFlipCallBack = true;
        book.pageFlipAnimator.finishCurrentTransition(sender.progress, finishDragPageFlip);

        if(!forcePause && !book.playbackCompleted)
          play();
      }
      else  // returns the page to the original position.
      {
        book.waitAnimationFlipCallBack = false;
        book.pageFlipAnimator.cancelCurrentTransition(sender.progress, cancelDragPageFlip);
      }
      isPageDragging = false;
    }
    else
    {
      if(sender.isDraggingRightPage && book.currentRightPage.isCoverPage)
      {
        onTurnRightPage();
      }
    }

    book.pageFlipAnimator.isAnimating = true;
  }

  function finishDragPageFlip(sender)
  {
    dragPageGesture.isDisabled = false;
    var progress  = book.audioProgress.getAudioPosition() / book.audioProgress.soundPlayer.getDuration();
    hud.progressSlider.updateProgress(progress);
    saveCurrentProgressBeforePageFlip(progress);
  }

  function cancelDragPageFlip(sender)
  {
    book.disablePageFlip = true;

    if(book.currentRightPage != null){
        book.currentRightPage.hideAnimations();
      }

    if(book.currentLeftPage != null){
        book.currentLeftPage.hideAnimations();
      }

    if(dragPageGesture.isDraggingRightPage)
      book.goToPreviousPages(true);
    else {
      book.goToNextPages(true);
    }
    dragPageGesture.isDisabled = false;
    book.pageFlipAnimator.afterPageFlip();


    //restore audio positions
    resetProgressOnCancel();


     if(!forcePause && !book.playbackCompleted)
        play();



  }

  function onPageFlipCompleted(sender)
  {
    if(!hasCanceled){
      if(sender.rightPage != null){
        sender.rightPage.hideAnimations();
        sender.rightPage.stopAnimations();
      }


      if(sender.leftPage != null){
        sender.leftPage.hideAnimations();
        sender.leftPage.stopAnimations();
      }
    }

    sender.rightPage = null;
    sender.leftPage  = null;

    dragPageGesture.isDragging = false;
    dragPageGesture.isDisabled = false;

    book.pageFlipAnimator.afterPageFlip();

    if(doPauseAfterPage){
        if(!book.playbackCompleted)
        isPausedAfterPage = false;
        forcePause = false;
        play();
    }

    var progress  = book.audioProgress.getAudioPosition() / book.audioProgress.soundPlayer.getDuration();
    hud.progressSlider.updateProgress(progress, true);
  }

  function onPageFlipStart(sender)
  {
    saveCurrentProgressBeforePageFlip();
    dragPageGesture.isDisabled = true;
  }

  function onBookAudioProgress(sender)
  {
    timeCheck = Date.now();
    hud.progressSlider.updateProgress(sender.progress);
  }

  function initMediaProgressTracker(media) {
      mediaProgressTracker = new MediaProgressTracker();
      mediaProgressTracker.setMediaObject(media);
      mediaProgressTracker.trackMedia();
  }

  function initSlowMediaProgressTracker(media) {
    if(!book.audioProgress.hasSlowAudio){
      return;
    }

    slowMediaProgressTracker = new MediaProgressTracker();
    slowMediaProgressTracker.setMediaObject(media);
    slowMediaProgressTracker.trackMedia();
  }

  function onBookAudioEndProgress(sender)
  {
    isBookCompleted = true;
    setElementTime(book.audioProgress.soundPlayer.audioBook.element, book.audioProgress.soundPlayer.audioBook.duration-1);
    //pause();
    var trackerProgress = mediaProgressTracker.getCompletedPercentage();
    if(book.audioProgress.hasSlowAudio){
      trackerProgress += slowMediaProgressTracker.getCompletedPercentage();
    }

    if(mediaProgressTracker != null){
      bookTicketMachine.openTicketMachine(trackerProgress);
    }
  }

  function doReplay() {
    location.reload();
  }

  function onPauseAfterPageStateChangedEvent(event)
  {
    closeSettingsBox();
    event.stopPropagation();
    event.preventDefault();
    switchPauseAfterPage();
  }

  function switchPauseAfterPage () {
    var pauseToReadDiv = document.getElementById('feedbackShadow');
    if(doPauseAfterPage){
      doPauseAfterPage = false;
      pauseToReadDiv.className = pauseToReadDiv.className.replace(" pause", "");
    }
    else{
      doPauseAfterPage = true;
      pauseToReadDiv.className += " pause";
    }
  }

  function onCurrentPagesFinalPositionExceeded(sender)
  {
      if(doPauseAfterPage && !isUsingTurnPage && !hud.progressSlider.isDragging)
      {
        if(book.currentRightPage != null && !book.currentRightPage.isCoverPage)//Only the cover page should not be paused
        {
          isPausedAfterPage = true;
          forcePause = true;
          pause();
        }
        else{
          book.goToNextPages(hud.progressSlider.isDragging);
        }
      }
      else{
          book.goToNextPages(hud.progressSlider.isDragging);
      }

     isUsingTurnPage = false;
  }

  function onCurrentPagesInitialPositionExceeded(sender)
  {
      book.goToPreviousPages(hud.progressSlider.isDragging);
      isUsingTurnPage = false;
  }

  function onNormalSlowerCheckboxStateChangeEvent(event)
  {
    if(!canUseSlowAudio){
        return;
    }
    var wasBookPaused = isBookPaused;
    pause();
    if(!wasBookPaused){
      window.setTimeout(function () {
        play();
        }, 100);
    }
    closeSettingsBox();
    event.stopPropagation();
    event.preventDefault();

    if(book.audioProgress.isUsingSlowAudio){
        slowerButton.style.display = 'block';
        fasterButton.style.display = 'none';
        book.audioProgress.useSlowAudio(false);
        canUseSlowAudio = false;
    }else{
        fasterButton.style.display = 'block';
        slowerButton.style.display = 'none';
        book.audioProgress.useSlowAudio(true);
        canUseSlowAudio = false;
    }

    if(book.audioProgress.isUsingSlowAudio){
      hud.updateProgressTime(book.audioProgress.progress * book.audioProgress.getSlowAudioDuration() , book.audioProgress.getSlowAudioDuration() -1);
    }else{
      hud.updateProgressTime(book.audioProgress.audioPosition, book.audioProgress.soundPlayer.getDuration() -1);
    }
    book.updatePages(book.audioProgress.audioPosition);


    setTimeout(function(){
        canUseSlowAudio = true;
    }, 1000);
  }

  function onPlayPauseCheckboxStateChangeEvent(sender)
  {
      if(sender.isChecked){
        pause();
        forcePause = true;
      }
      else{
        forcePause = false;
        play();
      }
  }

  function onShowHideCheckboxStateChangeEvent(sender)
  {
    if(sender.isChecked)
      hud.hide();
    else
      hud.show();
  }

  function onSliderStartDrag(sender)
  {
    closeSettingsBox();
    if(doPauseAfterPage) {
      isPausedAfterPage = false;
      //switchPauseAfterPage();
    }
    book.isDraggingSlider = true;
    hud.progressSlider.isDragging = true;
    bookDiv.className = bookDiv.className.replace(" ignoreTransitions", "");
    bookDiv.className += " ignoreTransitions";
    pause();
    book.isPlaying = false;
    book.updatePagesImmediately = true;
    book.disablePageFlip = true;
    book.audioProgress.updateProgress(sender.progress+0.001);
    book.updatePages(book.audioProgress.audioPosition+0.1);//Update pages highlight
    book.stopEventAnimations();
    book.stopAllAnimations();
    onSliderProgressChange(sender);


  }

  function onSliderEndDrag(sender)
  {

      bookDiv.className = bookDiv.className.replace(" ignoreTransitions", "");
      book.disablePageFlip = false;
      book.updatePagesImmediately = false;
      hud.progressSlider.isDragging = false;
      book.disablePageFlip = false;

      var _lastPageBreak = parseFloat(book.audioProgress.pagebreaks[book.audioProgress.pagebreaks.length-1]);
      var _lastPageBreakPercentPos =  _lastPageBreak / book.audioProgress.currentSoundPlayer.audioBook.getDuration();

      var _pos = BookUtils.instance.truncateDecimals(sender.position, 4);

      if(_pos > _lastPageBreakPercentPos){
            _pos = _lastPageBreakPercentPos;
      }

      if(!book.leftPageHasAnimation())
      {
        if(sender != null && sender.position != null && book.currentLeftPage != null)
        {
          book.currentLeftPage.updateAnimations(book.audioProgress.audioPosition);
        }
      }
      _pos = BookUtils.instance.truncateDecimals(sender.position, 4);
      if(!book.rightPageHasAnimation())
      {
        if(sender != null && sender.position != null && book.currentRightPage != null)
        {
          book.currentRightPage.updateAnimations(book.audioProgress.audioPosition);
        }
      }

      if(!book.audioProgress.playbackCompleted)
      {
        if(book.pageFlipAnimator.isAnimating){
          book.audioProgress.restartCurrentPagesAudioPosition(true);
        }else{
          book.audioProgress.setAudioPosition(book.audioProgress.audioPosition);
        }
        var fakeSender = {"progress" : _pos};
        onSliderProgressChange(fakeSender);
        book.isDraggingSlider = false;
        if(!forcePause)
          play();
      }

  }

  var clickedOnProgressBar = false;

  function onSliderProgressChange(sender, event){
    if (event != null) {
      event.stopPropagation();
      event.preventDefault();
    }
    book.disablePageFlip = true;

    if(book.pageFlipAnimator.isAnimating)
      return;

    var progress = sender.progress;
    var _totalPages = book.pages.length;
    book.updatePagesImmediately = true;
    book.removeAllAnimations();

    book.audioProgress.updateProgress(progress);
    if(book.audioProgress.isUsingSlowAudio){
      hud.updateProgressTime(book.audioProgress.progress * book.audioProgress.getSlowAudioDuration() , book.audioProgress.getSlowAudioDuration() -1);
    } else {
      hud.updateProgressTime(book.audioProgress.audioPosition, book.audioProgress.soundPlayer.getDuration() -1);
    }

    //update books pages
    book.updatePages(book.audioProgress.audioPosition);
    var index = book.audioProgress.currentPageBreakIndex * 2;
    if(!BookUtils.instance.approximately(index, book.currentLeftPageIndex + 1, 2)){
      book.goToPages( index - 1, index );
    }

    speedModifier = 1;
    if(book.audioProgress.isUsingSlowAudio)
          speedModifier = BookConstants.SLOW_AUDIO_DURATION_PERCENTAGE;
    //wrap up page animation and positions
    var _lastPageBreak = parseFloat(book.audioProgress.pagebreaks[book.audioProgress.pagebreaks.length-1]) * speedModifier;
    var _firstPageBreak = parseFloat(book.audioProgress.pagebreaks[0]) * speedModifier;
    var _lastPageBreakPercentPos = _lastPageBreak / book.audioProgress.currentSoundPlayer.audioBook.getDuration();
    var _firstPageBreakPercentPos = _firstPageBreak / book.audioProgress.currentSoundPlayer.audioBook.getDuration();


    var setDisplayOfHighlightContainers = function setDisplayOfHighlightContainers(displayValue) {
        Array.prototype.map.call(highlightContainers, function(elem) {
            elem.style.display= displayValue;
        });
    };

    book.disablePageFlip = false;

    if(book.audioProgress >= _firstPageBreakPercentPos){
      book.pageFlipAnimator.mode = "Cover";
      book.forceClosedPosition(false,true);


    } else {

      if(book.currentLeftPageIndex < _totalPages - 1 && book.currentLeftPageIndex != -1){
        book.forceOpenedPosition();

        if(book.currentLeftPageIndex === 1){
          book.updateCenterCover("OPEN_FRONT");

        } else {
          if(book.currentLeftPageIndex === _totalPages - 3){
            book.updateCenterCover("OPEN_BACK");

          } else {
            book.updateCenterCover("OPEN");
          }
        }
        isBookCompleted = false;
        setDisplayOfHighlightContainers('block')
      } else {
        if(book.currentLeftPageIndex <= 0){
          book.pageFlipAnimator.mode = "Cover";
          book.forceClosedPosition(true,true);
          setDisplayOfHighlightContainers('none');

        } else {
          if(book.currentLeftPageIndex >= _totalPages - 1){
            book.pageFlipAnimator.mode = "Cover";
            book.forceClosedPosition(false,true);
            setDisplayOfHighlightContainers('none');
          }
        }
      }
    }

    book.pageFlipAnimator.UpdateBottomShadow(true);
    book.disablePageFlip = false;

    forcePause = false;

    if(book.currentRightPage){
      book.currentRightPage.updateAnimations(book.audioProgress.audioPosition);
    }
    if(book.currentLeftPage){
      book.currentLeftPage.updateAnimations(book.audioProgress.audioPosition);
    }

    if(!book.isDraggingSlider){
      play();
    }

  }

  function onProgressBarClick(perc)
  {
    if(hud.progressSlider.isDragging ||  book.isDraggingSlider)
      return;


    closeSettingsBox();
    pause();
    isPausedAfterPage = false;

    book.disablePageFlip = false;


    if(perc > 1){
      perc = 1;
    }
    if(perc < 0){
      perc = 0;
    }
    book.updatePagesImmediately = true;
    book.audioProgress.updateProgress(perc);
    book.updatePages(perc);

    book.disablePageFlip = true;

    setTimeout(function(){
      book.audioProgress.restartCurrentPagesAudioPosition(true);
      if(!book.isDraggingSlider)
        play();
    }, 300);
  }

  function onLeftPageClick()
  {
    if(!book.leftPageHasAnimation() )
    {
        book.goToPreviousPages(true);
        if(!forcePause)
          play();
    }
  }

  function onRightPageClick()
  {
    if(!book.rightPageHasAnimation() )
    {
      book.goToNextPages(true);
      if(!forcePause)
        play();
    }
  }

  function onReadPageAgainClick()
  {
    pause();

    setTimeout(function()
    {
      book.audioProgress.restartCurrentPagesAudioPosition(true);
      play();
    }, 300);  // This fix a current time issue on devices.
  }

  function onGlossaryClick(event)
  {
    event.stopPropagation();
    event.preventDefault();

    hud.spinnerLoader.start();

    pause();
    glossaryPopUp.openGlossary();
  }

  function onCloseGlossaryPopUp()
  {
    play();
  }

  function onOpenSettingsPopUp(event)
  {
    event.stopPropagation();
    event.preventDefault();

    wasBookStatePaused = isBookPaused;
    pause();
    isSettingPopUpShown = true;
    settingsPopup.onOpenSettingsPopUp();
  }

  function closeSettingsBox () {
    if( settingsBox.className.indexOf("hide") == -1)
    {
      settingsBoxBackdrop.style.visibility = "hidden";
      settingsBox.className += " hide";
    }
  }

  function onOpenCloseSettingsBox(event)
  {
    event.stopPropagation();
    event.preventDefault();

    if(this.settingsBox.className == "settingsBox blue hide"){
      settingsBoxBackdrop.style.visibility = "visible";
      settingsBox.className = settingsBox.className.replace(" hide", "");
    }else{
      settingsBoxBackdrop.style.visibility = "hidden";
      settingsBox.className += " hide";
    }
  }

  function onCloseSettingsPopUp()
  {
    isSettingPopUpShown = false;

    var pauseBook = wasBookStatePaused;   //
    play();                               // this work around fixes the problem with the options pop up on the Nook device,
                                          //
    if(pauseBook)                         //
      setTimeout(function(){pause();}, 200);
  }

  function onChangeHUDColor(color)
  {
    hudDiv.style.backgroundColor = color;
  }

  function onOpenTALHUD(event)
  {
    event.stopPropagation();
    event.preventDefault();

    pause();
    hud.hideHUD();
    talHUD.showTaLHUD(book.currentLeftPage, book.currentRightPage);
  }

  function onOpenHUD(event)
  {
    event.stopPropagation();
    event.preventDefault();

    pause();
    talHUD.hideTaLHUD();
    hud.showHUD();
  }

  function setElementTime(_AudioElement, _Time){
    try {
      _AudioElement.currentTime = _Time;
    } catch (e) {
    }
  }

  function pause()
  {
    book.pause();
    hud.playPauseCheckbox.setIsChecked(true);
    isBookPaused = true;
  }

  function play()
  {
    if(isBookCompleted){
      restartBook();
      return;
    }

    if(forcePause || book.isDraggingSlider || (isPausedAfterPage && dragPageGesture.isDragging)){
       return;
    }


    var baseTimeout = 10;
    if(isPausedAfterPage){
      book.goToNextPages(true);
      baseTimeout += 600;
    }

    isPausedAfterPage = false;
    isBookPaused = false;
    wasBookStatePaused = false;

    setTimeout(function(){
      if(!book.isDraggingSlider && glossaryPopUp.glossaryPopUp == null){
        hud.playPauseCheckbox.setIsChecked(false);
        if(isRestarting){
          book.audioProgress.restartCurrentPagesAudioPosition(true);
          window.setTimeout(function () {
            isRestarting = false;
          }, 500);
          book.forceClosedPosition(true,true);
        }
        book.play();
      }
    }, baseTimeout);  // This fix a current time issue on devices.
  }
  
  /////////////////////////////////////////////////////////////////////////////////

            var BUILD_VERSION = 1497058680;
            function makeButton(type, id, link, sound, grow, dataTracking) {
                var div = document.getElementById(id);
                if (div) {
                    if (type == 'link' && link) {
                        div.setAttribute('onclick', "loadPage('" + link + "');");
                        if (dataTracking) {
                            div.setAttribute('data-tracking', dataTracking);
                        }
                    } else if (type == 'action' && link) {
                        div.setAttribute('onclick', "{" + link + "};");
                    }
                    if (sound) {
                        div.setAttribute('rolloverSound', sound);
                        SoundControl.buttonRollover(id);
                    }
                    if (grow) new GrowButton(div);
                }
            }

            function addGrowEffect(id) {
                var div = document.getElementById(id);
                new GrowButton(div);
            }

            var isLocal = false;
            

            function showTimeLeft() {

                if (document.getElementById('timer_site_timer')) {
                    var img = document.getElementById('timer_site_timer').getElementsByClassName('close_button_container')[0].getElementsByTagName('img')[0];
                    if (img)
                        closepopup(img);

                    popup_timer.removeOpenTimer('site_timer');
                }
                showPopup('password.php?type=addTimePassword&dispatcher=addTimePassword', 'addTimePassword');
                addListener(window.authenticator, 'addTimePassword', function () {
                    showPopup('timeleft.php', 'timeleftpop')
                });
            }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    function setCookie(cname,value,exdays) {
        var exdate = new Date();
        if(isNaN(exdays)) exdays = 365;
        exdate.setDate(exdate.getDate() + exdays);
        var domain = '.'+document.domain.split('.').slice(-2).join('.');
        var limit = 5;
        //old setCookie functions didn't have domain so now we have to make sure to cleanup old cookienames that don't specify domain.
        while(getCookie(cname) != '' && limit >0) {
            document.cookie = cname+"="+encodeURI(value)+"; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            limit--;
        }

        document.cookie = cname+"="+encodeURI(value)+"; expires="+exdate.toUTCString()+"; domain="+domain+"; path=/";
    }

    //function shellbtn_back() {
    //    // Prevent going back twice if this function is called quickly twice.
    //    // This is a temporary fix to deal with double-calling of this function when bookplayer2 is running.
    //    // The real fix is to stop double-rendering of the sidebar by bookplayer2.
    //    if (!shellbtn_back.debouncing) {
    //        shellbtn_back.debouncing = setTimeout(function () {
    //            shellbtn_back.debouncing = null;
    //    trackShellButtonClick("shell:back");
    //    clickBack();
    //        }, 50);
    //    }
    //}
    //function shellbtn_aboutme() {
    //    trackShellButtonClick("shell:about me");
    //    clickAboutMe();
    //}
    //function shellbtn_home() {
    //    trackShellButtonClick("shell:student home");
    //    clickHome();
    //}
    //function shellbtn_toggle() {
    //    trackShellButtonClick("shell:language toggle");
    //    clickToggle();
    //}
    //function shellbtn_changeuser() {
    //    trackShellButtonClick("shell:change user");
    //    popChangeUser();
    //}
    //function shellbtn_tickets() {
    //    loadPage('/html5/abc/shopping');
    //}
    //function shellbtn_volume() {
    //    trackShellButtonClick("shell:volume");
    //    popVolume();
    //}
    //function shellbtn_search() {
    //    if ('2' == 0) {
    //        return;
    //    }
    //
    //    trackShellButtonClick("shell:search");
    //    popSearch();
    //}
    //function shellbtn_settings() {
    //    trackShellButtonClick("shell:settings");
    //    popSettings();
    //}
    //function popTeachersAseesmentAuthDone(){
    //    loadPage('/html5/teachers/teachers_assessment');
    //}
    //function shellbtn_assessments() {
    //    trackShellButtonClick("shell:assessments");
    //
    //    var hasAssessmentAccess = false;
    //    var hasAuxiliaryProduct = false;
    //
    //    if(uinfo && uinfo.school){
    //        var isChild = uinfo.userid !== uinfo.parentid
    //        var hasTeacherAssessmentAccess = false;
    //
    //        if(isChild){
    //            var overrideFlag = getCookie('teacherAssessmentsPassword') === 'true';
    //            if(overrideFlag){
    //                popTeachersAseesmentAuthDone();
    //            } else {
    //                closeAllPopups();
    //                showPopup('password.php?type=assessments&dispatcher=popTeachersAseesmentAuthDone');
    //            }
    //            return;
    //        } else if(hasTeacherAssessmentAccess) {
    //            popTeachersAseesmentAuthDone();
    //            return;
    //        }
    //    }
    //
    //
    //    if (hasAssessmentAccess && hasAuxiliaryProduct) {
    //        loadPage('/html5/parents/parent_assessment');
    //    } else {
    //        showPopup('assessment_purchase.php', 'cSupport', 'content_area');
    //    }
    //}
    //function shellbtn_parents() {
    //    trackShellButtonClick("shell:parent");
    //    clickParents();
    //}
    function hasPermissions(uinfo, key) {
        return uinfo.settings[key] !== "0" ? true : false;
    }

    function trackShellButtonClick(str) {

        var pSection = digitalData.page.pageInfo.pageSection;

        if (typeof pSection !== 'undefined' && pSection !== '') {
            var res = pSection.substring(pSection.lastIndexOf(":") + 1, pSection.length);
            str = str + ":" + res;
    }

        Analytics.trackClick(str);//bi-841 pl20160209*/
    }


    var noFrame = false;

    resizeMainDiv();

    addListener(document, 'mousewheel', function (event) {
        if (event.ctrlKey) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
    });
    addListener(document, 'keydown', function (event) {
        if (event.ctrlKey && (event.keyCode == 189 || event.keyCode == 187)) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
    });

    if (! noFrame) {
        window.onresize = function () {
            resizeMainDiv();
        }
    }

    // QA-15141
            
            
    
    function password_auth_done() {
                panel_mask.style.visibility = 'hidden';
    }

        var toggle3g = document.getElementById('toggle-3g'),
            normal3g = document.getElementById('normal-3g'),
            high3g = document.getElementById('high-3g');

        addListener(normal3g, 'click', toggleSpeedSetting);
        addListener(high3g, 'click', toggleSpeedSetting);

        function toggleSpeedSetting(event) {
          event.stopPropagation();
          dtmTrack("shell:image resolution");
          var target = event.target,
              speedsetting = target.getAttribute('data-speedsetting');

          if(!speedsetting && target.id !== 'toggle3g') {
            var target = target.parentNode,
                speedsetting = target.getAttribute('data-speedsetting');
          }

          if(speedsetting === 'high') {
            high3g.className = '';
            normal3g.className = 'active';
            target.setAttribute('data-speedsetting', 'normal');
            setCookie('speedsetting', '', -1);
            return;
          } else {
            removeListener(normal3g, 'click', toggleSpeedSetting);
            removeListener(high3g, 'click', toggleSpeedSetting);
            high3g.className = 'active';
            normal3g.className = '';
            target.setAttribute('data-speedsetting', 'high');
            setCookie('speedsetting', 'high', 365);
            showPopup('highres.php');
            return;
          }
        }

		///////////////////////////////////////////////////////////////
//plugin to create new sidepanels  - arsen
var side_panels = [];
var current_sidepanel_index = -1;
var last_sidepanel_index = -1;

function closeCurrentSidePanel() {
	if (current_sidepanel_index != -1) 
		side_panels[current_sidepanel_index].hide();
}

function RemoveNotPersistantSidepanels() {
	for(var i=0; i<side_panels.length; i++) {
		if (! side_panels[i].persist) {
			side_panels[i].wrapper.parentNode.removeChild(side_panels[i].wrapper);
			side_panels.splice(i, 1);
		}
	}
}

function GetSidePanelsCount(position) {
	var count = 0;
	for(var i=0; i<side_panels.length; i++) {
		if (side_panels[i].position == position)
			count++;
	}
	return count;
}

function sortSidePanels(a,b) {
  if (a.order < b.order)
     return -1;
  if (a.order > b.order)
    return 1;
  return 0;
}

function AdjustSidePanelIconPositions() {
	for(var i=0; i<side_panels.length; i++) {
		var iconpos = side_panels[i].getIconPosition(side_panels[i].position);
		side_panels[i].icon.style.top = iconpos + 'px';
		if (iconpos > 0)
			addClass(side_panels[i].wrapper.id, 'sidepanel-wrapper-toprounded-'+side_panels[i].position);
	}
}

function showSidepanelById(id,options) {
	if(id===void 0) {
		return;
	}

	for(var i=0; i<side_panels.length; i++) {
		if(side_panels[i].id == id) {
			side_panels[i].show(undefined,options);
		}
	}
}


function SidePanel(id, position, persist, custom_order, speed) {
	this.id = id;
	this.speed = speed;
	this.persist = persist;
	this.order = custom_order;

	this.wrapper = document.getElementById('sidepanel_wrapper_'+id);
	if (this.wrapper.parentNode.id == 'content_area') {
		var tmp_wrapper = this.wrapper.cloneNode(true);
		this.wrapper.parentNode.removeChild(this.wrapper);
		this.wrapper = tmp_wrapper;
		document.getElementById('sidepaneldiv').appendChild(this.wrapper);
	}

	this.icon = document.getElementById('sidepanel_icon_'+id);
	this.content_container = document.getElementById('sidepanel_content_'+id);
	
	this.state = 'hidden'; //hidden, visible, hiding, showing
	
	this.position = position;
	this.width = parseInt(this.wrapper.style.width.toString().replace('px', ''));

	//events
	this.onInit = this.createEvent('onSidePanelInit');
	this.onShow = this.createEvent('onSidePanelShow');
	this.onShown = this.createEvent('onSidePanelShown');
	this.onHide = this.createEvent('onSidePanelHide');
	this.onHidden = this.createEvent('onSidePanelHidden');
	this.onTouchSlide = this.createEvent('onTouchSlide');

	//for internal calculations...
	this.touch_last_x = null;
	this.touch_start_x = null;
	this.touch_end_x = null;
	this.touch_last_direction = null;
	
	this.js_timer = null;
	this.js_end_x = null;
	this.js_current_x = null;
	this.js_step = null;

	this.browser = null;
}

SidePanel.prototype.getIconPosition = function() {
	var vpos = 0;
	var count = 0;
	var tmp_sidepanels = [];
	// for(var i=0; i<side_panels.length; i++) {
	// 	if (side_panels[i].position == this.position)
	// 		tmp_sidepanels.push(side_panels[i]);
	// }

	for(var i=0; i<this.getIndex(); i++) {
		if (side_panels[i].position == this.position && side_panels[i].id != this.id) {
			var icon_h = parseInt(side_panels[i].icon.style.width.toString().replace('px', ''));
			count = count + 1;
			vpos += icon_h + 20;
		}
	}
	return vpos;
}

SidePanel.prototype.getIndex = function() {
	return side_panels.indexOf(this);
}

SidePanel.prototype.init = function() {

	var objref = this;

	addListener(this.wrapper, "transitionend", function(event) { objref.onAnimateEnd(event); } )
	addListener(this.wrapper, "webkitTransitionEnd", function(event) { objref.onAnimateEnd(event); } )

	// this.wrapper.style.WebkitTransition = 'all 5ms ease-in-out';
	// this.wrapper.style.transition = 'all 5ms ease-in-out';
	// this.wrapper.style.MsTransition = 'all 5ms ease-in-out';
		
	addListener(this.icon, "click", function(event) { objref.toggle(event); });
	addListener(this.wrapper, "click", function(event) { cancelEvent(event); });

	if (! this.isStupidIE()) {
		addListener(this.icon, "touchmove", function(event) { objref.touchmove(event); });
		addListener(this.icon, "touchstart", function(event) { objref.touchstart(event); });
		addListener(this.icon, "touchend", function(event) { objref.touchend(event); });
	}

	this.wrapper.dispatchEvent(this.onInit);

	side_panels.push(this);
	side_panels.sort(sortSidePanels);

	//this.icon.style.top = this.getIconPosition(this.position)+'px';
	AdjustSidePanelIconPositions();
	// alert(this.isStupidIE());
}

SidePanel.prototype.getBrowser = function() {
	if (this.browser != null)
		return this.browser;

	var ua= navigator.userAgent, 
    N= navigator.appName, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*([\d\.]+)/i) || [];
    M= M[2]? [M[1], M[2]]:[N, navigator.appVersion, '-?'];
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    this.browser = M.join(' ');
    return this.browser;
}

SidePanel.prototype.isStupidIE = function() {
	if (this.getBrowser().search('MSIE 9') != -1 || this.getBrowser().search('MSIE 8') != -1 || this.getBrowser().search('MSIE 7') != -1)
	 	return true;
	 else
	 	return false;
}

SidePanel.prototype.createEvent = function(event_name) {
	
	var event;

  	if (document.createEvent) {
    	event = document.createEvent("HTMLEvents");
    	event.initEvent(event_name, true, true);
  	} else {
    	event = document.createEventObject();
    	event.eventType = event_name;
  	}

  	event.eventName = event_name;
  	return event;
}


SidePanel.prototype.touchend = function(e) {
	cancelEvent(e);
	var pos = pagePosition(e);
	
	this.touch_end_x = pos.x;

	var x_diff = this.touch_end_x - this.touch_start_x;
	
	if (this.touch_last_direction == 'left' && this.position == 'right') {
		this.show(undefined);
	}
	else if (this.touch_last_direction == 'left' && this.position == 'left') {
		this.hide();
	}
	else if (this.touch_last_direction == 'right' && this.position == 'right'){
		this.hide();
	}
	else if (this.touch_last_direction == 'right' && this.position == 'left') {
		this.show(undefined);
	}
	else
		this.toggle();
}

SidePanel.prototype.touchstart = function(e) {
	var pos = pagePosition(e);
	
	this.touch_last_x = pos.x;
	this.touch_start_x = pos.x;
	this.touch_last_direction = null;

	cancelEvent(e);
}

SidePanel.prototype.touchmove = function(e) {
	var pos = pagePosition(e);

	this.wrapper.style.zIndex = '1';
	//close new sidepanels
	if (current_sidepanel_index != -1 && current_sidepanel_index != this.getIndex())
		side_panels[current_sidepanel_index].hide();

	//close old sidepanels
	if(typeof closeSidepanels == 'function') {
		closeSidepanels();
		currentSidepanel = '';
	}

	var x_diff = pos.x - this.touch_start_x;

	var x_direction = pos.x - this.touch_last_x;

	if (x_direction < 0)
		this.touch_last_direction = 'left';
	else if (x_direction > 0)
		this.touch_last_direction = 'right';
	else
		this.touch_last_direction = null;

	this.touch_last_x = pos.x;

	if (Math.abs(x_diff) >= this.width) {
		return;
		cancelEvent(e);
	}

	if (this.position == 'right' && this.state == 'hidden' && x_diff < 0) {
		this.wrapper.style.webkitTransform = "translateX(-"+Math.abs(x_diff).toString()+"px)";
		this.wrapper.style.transform = "translateX(-"+Math.abs(x_diff).toString()+"px)";
	}
	else if (this.position == 'right' && this.state == 'visible' && x_diff > 0) {
		var x = this.width - x_diff;
		this.wrapper.style.webkitTransform = "translateX(-"+x+"px)";
		this.wrapper.style.transform = "translateX(-"+x+"px)";
	}

	if (this.position == 'left' && this.state == 'hidden' && x_diff > 0) {
		this.wrapper.style.webkitTransform = "translateX("+Math.abs(x_diff).toString()+"px)";
		this.wrapper.style.transform = "translateX("+Math.abs(x_diff).toString()+"px)";
	}
	else if (this.position == 'left' && this.state == 'visible' && x_diff < 0) {
		var x = this.width - Math.abs(x_diff);
		this.wrapper.style.webkitTransform = "translateX("+x+"px)";
		this.wrapper.style.transform = "translateX("+x+"px)";
	}


	this.wrapper.dispatchEvent(this.onTouchSlide);
	cancelEvent(e);
}

SidePanel.prototype.onAnimateEnd = function() {
	this.wrapper.style.WebkitTransition = '';
	this.wrapper.style.transition = '';
	// this.wrapper.style.WebkitTransition = 'all 5ms ease-in-out';
	// this.wrapper.style.transition = 'all 5ms ease-in-out';
	// this.wrapper.style.MsTransition = 'all 5ms ease-in-out';
	if (this.state == 'showing')
		this.shown();
	else if (this.state == 'hiding')
		this.hidden();
}

SidePanel.prototype.toggle = function() {
	this.wrapper.style.zIndex = '1';
		
	objref = this;
	setTimeout( function() {

		if (objref.state == 'visible') {
			objref.hide();
		}
		else if(objref.state == 'hidden') {
			objref.show();
		}

	}, 1);
	

}

SidePanel.prototype.show = function(speed,options) {
	/* [Caigoy,012616,ABCMG-128] Per request: disabled in favor of custom tracking event in TM */
	// track('sidePanelOpen', "panel_id="+this.id);

	this.wrapper.style.zIndex = '1';
	objref = this;
	setTimeout( function() {
		objref.showAnimate(undefined,options);
	},1);
}
// Edit BT 12/1/14 - added new param to scale sidepanel to new template size for BTTemplate 10.1
SidePanel.prototype.showAnimate = function(speed,options) {
	this.state = 'showing';
	//close old sidepanels
	if(typeof closeSidepanels == 'function') {
		closeSidepanels();
		currentSidepanel = '';
	}
	
	//close new sidepanels
	if (current_sidepanel_index != -1 && current_sidepanel_index != this.getIndex())
		side_panels[current_sidepanel_index].hide();

	current_sidepanel_index = this.getIndex();

	if (this.getIndex() == last_sidepanel_index)
		last_sidepanel_index = -1;

	this.wrapper.dispatchEvent(this.onShow);

	if (this.isStupidIE()) {
		// if (this.id == "ticketmachine_sp") {
		if (this.id == "ticketmachine") {
			this.jsAnimateTicketMachine();
			return;
		} else {
			this.jsAnimate('show');
			return;
		}
	}

	if (typeof speed == 'undefined') {
		this.wrapper.style.WebkitTransition = 'all '+this.speed+'ms ease-in';
		this.wrapper.style.transition 		= 'all '+this.speed+'ms ease-in';
		this.wrapper.style.MsTransition 	= 'all '+this.speed+'ms ease-in';
		this.wrapper.style.MozTransition 	= 'all '+this.speed+'ms ease-in';
		this.wrapper.style.OTransition 		= 'all '+this.speed+'ms ease-in';
	}
	else {
		this.wrapper.style.WebkitTransition = 'all '+speed+'ms ease-in';
		this.wrapper.style.transition 		= 'all '+speed+'ms ease-in';	
		this.wrapper.style.MsTransition 	= 'all '+speed+'ms ease-in';
		this.wrapper.style.MozTransition 	= 'all '+this.speed+'ms ease-in';
		this.wrapper.style.OTransition 		= 'all '+this.speed+'ms ease-in';
	}

	// BTurner handling for new template. Beware, dirty hack ahead. Better than generating new assets and redoing the html/css
	if (this.id == 'ticketmachine_sp') {
		this.scale_factor = 1;
		this.transformAndShowAnimate(options);
		return;
	}

	if (this.position == 'left') {
		this.wrapper.style.transform 		= "translateX("+this.width+"px)";
		this.wrapper.style.WebkitTransform 	= "translateX("+this.width+"px)";
		this.wrapper.style.MsTransform 		= "translateX("+this.width+"px)";
		this.wrapper.style.MozTransform 	= "translateX(-"+this.width+"px)";
		this.wrapper.style.OTransform 		= "translateX(-"+this.width+"px)";
	}
	else if (this.position == 'right') {
		this.wrapper.style.transform 		= "translateX(-"+this.width+"px)";
		this.wrapper.style.WebkitTransform 	= "translateX(-"+this.width+"px)";
		this.wrapper.style.MsTransform 		= "translateX(-"+this.width+"px)";
		this.wrapper.style.MozTransform 	= "translateX(-"+this.width+"px)";
		this.wrapper.style.OTransform 		= "translateX(-"+this.width+"px)";
	}
}

// This function applies two transformations sequentially (scale and transform). I was like, yo dawg, I heard you like (w*)rappers in your 
// (w*)rappers, and applied each transformation to each wrapper. Also, the timeout is being set because
// applying a transition to a newly appended DOM element is no bueno because the element will always be in its final state.
// Thanks to: http://stackoverflow.com/questions/16655024/css3-two-transitions-with-different-timing-functions-css3
// And: http://stackoverflow.com/questions/22882755/css3-transform-not-working-when-code-is-sequential
SidePanel.prototype.transformAndShowAnimate = function(options) {
	var meta_wrapper;

	if (!document.getElementById('meta-wrapper')) {
		this.wrapper.style.top 	= (typeof options != 'undefined' && options.hasOwnProperty('top')) ? options.top : '0';
		this.wrapper.style.left = (typeof options != 'undefined' && options.hasOwnProperty('left')) ? options.left : '1094px';

		var parent_node = this.wrapper.parentNode;
		meta_wrapper = document.createElement('div');

//		var mob_device = MOBILE || '';
		meta_wrapper.id = 'meta-wrapper';
/*
		if (mob_device.search('iphone') > -1 || mob_device.search('ipad') > -1) {
			meta_wrapper.style.position = 'absolute';
			meta_wrapper.style.top = '0px';
			meta_wrapper.style.right = '828px';
			
			var sp_div = document.getElementById('sidepaneldiv');
			sp_div.style.position = 'absolute';
			sp_div.style.top = '0px';
			sp_div.style.right = '0px';
			sp_div.style.zIndex = 9999999;
		}
*/
		parent_node.replaceChild(meta_wrapper, this.wrapper);
		meta_wrapper.appendChild(this.wrapper);

		setTimeout((function() {
			meta_wrapper.style.WebkitTransform  = "scale(" + this.scale_factor + ")";
			meta_wrapper.style.transform 		= "scale(" + this.scale_factor + ")";
			meta_wrapper.style.MsTransform	 	= "scale(" + this.scale_factor + ")";
			meta_wrapper.style.MozTransform 	= "scale(" + this.scale_factor + ")";
			meta_wrapper.style.OTransform 		= "scale(" + this.scale_factor + ")";
		}.bind(this)), 50)
	}

	setTimeout((function() {
		this.wrapper.style.WebkitTransform  = "translateX(-"+this.width+"px)";
		this.wrapper.style.transform 		= "translateX(-"+this.width+"px)";
		this.wrapper.style.MsTransform 		= "translateX(-"+this.width+"px)";
		this.wrapper.style.MozTransform 	= "translateX(-"+this.width+"px)";
		this.wrapper.style.OTransform 		= "translateX(-"+this.width+"px)";
	}.bind(this)),450)
}

SidePanel.prototype.shown = function() {
	this.state = 'visible';
	this.wrapper.dispatchEvent(this.onShown);
}

SidePanel.prototype.tempHide = function(speed) {
	last_sidepanel_index = current_sidepanel_index;
	this.hide(speed);
}

SidePanel.prototype.hide = function(speed) {

	this.state = 'hiding';


	current_sidepanel_index = -1;

	this.wrapper.dispatchEvent(this.onHide);

	if (this.isStupidIE()) {
		this.jsAnimate('hide');
		return;
	}

	if (typeof speed == 'undefined') {
		this.wrapper.style.WebkitTransition = 'all '+this.speed+'ms ease-in';
		this.wrapper.style.MsTransition = 'all '+this.speed+'ms ease-in';
		this.wrapper.style.transition = 'all '+this.speed+'ms ease-in';
	}
	else {
		this.wrapper.style.WebkitTransition = 'all '+speed+'ms ease-in';
		this.wrapper.style.MsTransition = 'all '+speed+'ms ease-in';
		this.wrapper.style.transition = 'all '+speed+'ms ease-in';	
	}

	
	if (this.position == 'left') {
		this.wrapper.style.webkitTransform = "translateX(0px)";
		this.wrapper.style.MsTransform = "translateX(0px)";
		this.wrapper.style.transform = "translateX(0px)";
	}
	else if (this.position == 'right') {
		var closePos = "0px";
		if(USINGAPP) {
			closePos = "-5px";
		}
		this.wrapper.style.webkitTransform = "translateX("+closePos+")";
		this.wrapper.style.MsTransform = "translateX("+closePos+")";
		this.wrapper.style.transform = "translateX("+closePos+")";
	}
}

SidePanel.prototype.hidden = function() {
	this.state = 'hidden';
	this.wrapper.style.zIndex = '';
	this.wrapper.dispatchEvent(this.onHidden);
}

SidePanel.prototype.jsAnimate = function(action) {
	this.js_current_x = parseInt(this.wrapper.style.left.replace('px', ''));

	if (this.position == 'left' && action == 'show') {
		this.js_end_x = 0;
		this.js_step = 1;
	}
	else if(this.position == 'left' && action == 'hide') {
		this.js_end_x = Math.parseInt('-'+this.width);
		this.js_step = -1;
	}

	if (this.position == 'right' && action == 'show') {
		this.js_end_x = 1025 - this.width;
		this.js_step = -1;
	}
	else if(this.position == 'right' && action == 'hide') {
		this.js_end_x = 1025;
		if (this.isStupidIE() && this.id === 'ticketmachine') this.js_end_x = 1010; //*** WIP35: IE9 TM SP tab closed position
		this.js_step = 1;
	}

	var objref = this;
	var animate_direction = action;
	
	// return;

	this.js_step = this.js_step * 15;

	this.js_timer = setInterval(function(){

		objref.js_current_x = objref.js_current_x + objref.js_step;

		if (objref.js_step > 0 && objref.js_current_x > objref.js_end_x) {
			objref.js_current_x = objref.js_end_x;
		}
		if (objref.js_step < 0 && objref.js_current_x < objref.js_end_x) {
			objref.js_current_x = objref.js_end_x;
		}
		objref.wrapper.style.left = objref.js_current_x+'px';

		if ( (objref.js_current_x >= objref.js_end_x && objref.js_step > 0) || (objref.js_current_x <= objref.js_end_x && objref.js_step < 0) ) {
			if (animate_direction == 'show')
				objref.shown();
			else if (animate_direction == 'hide')
				objref.hidden();

			clearInterval(objref.js_timer);
		}
	}, 10);
}

/*
 * @function jsAnimateTicketMachine
 * Because IE 9 sucks. 
 */
SidePanel.prototype.jsAnimateTicketMachine = function() {
	var meta_wrapper;
	if (!document.getElementById('meta-wrapper')) {
		this.wrapper.style.top = '0';
		this.wrapper.style.left = '1094px';

		var parent_node = this.wrapper.parentNode;
		meta_wrapper = document.createElement('div');
		meta_wrapper.id = 'meta-wrapper';


		parent_node.replaceChild(meta_wrapper, this.wrapper);
		meta_wrapper.appendChild(this.wrapper);

		this.wrapper.style.top = '0';
		this.wrapper.style.left = '1045px';
	}

	this.js_current_x = 1010; //*** WIP35: IE9 TM SP tab closed position
	this.js_end_x = 605; //*** WIP35: IE9 TM SP tab closed position
	this.js_step = -1;

	var objref = this;
	
	this.js_step = this.js_step * 15;

	this.js_timer = setInterval(function(){

		objref.js_current_x = objref.js_current_x + objref.js_step;

		if (objref.js_step > 0 && objref.js_current_x > objref.js_end_x) {
			objref.js_current_x = objref.js_end_x;
		}
		if (objref.js_step < 0 && objref.js_current_x < objref.js_end_x) {
			objref.js_current_x = objref.js_end_x;
		}
		objref.wrapper.style.left = objref.js_current_x+'px';

		if ( (objref.js_current_x >= objref.js_end_x && objref.js_step > 0) || (objref.js_current_x <= objref.js_end_x && objref.js_step < 0) ) {
				objref.shown();
			clearInterval(objref.js_timer);
		}
	}, 10);
}

////////////////////////////////////////////////////////////////////////////////

var itemseq = 0;
var itemlist = new Array();
var LayerInfo = {};

LayerInfo.SCENE 		= 100;
LayerInfo.SKIN 			= 150;
LayerInfo.EYES 			= 200;
LayerInfo.MOUTH 		= 250;
LayerInfo.NOSE 			= 300;
LayerInfo.HAIR 			= 350;
LayerInfo.GLASSES 		= 400;
LayerInfo.LEGGINGS	 	= 500;
LayerInfo.SOCKS 		= 550;
LayerInfo.SHOES 		= 600;
LayerInfo.PANTS 		= 650;
LayerInfo.SHIRT 		= 700;
LayerInfo.DRESS 		= 725;
LayerInfo.JACKET 		= 750;
LayerInfo.SWEATER 		= 775;
LayerInfo.COSTUME 		= 800;
LayerInfo.GOWN 			= 825;
LayerInfo.PET 			= 850;

LayerInfo.isClothing = function(layer) { return (layer >= this.SHIRT && layer <= this.COSTUME); }
LayerInfo.blockCostume = function(layer) { return (layer > this.HAIR && layer < this.COSTUME); }
LayerInfo.blockGown = function(layer) { return (layer >= this.PANTS && layer < this.GOWN && layer != this.SHOES && layer != this.SOCKS); }
LayerInfo.canRemove = function(layer) { return (layer == this.SCENE || layer >= this.HAIR); }

//////////////////////////////////////////////////////////
//	AVATAR ITEM OBJECT
//////////////////////////////////////////////////////////

function AvatarItem(info) {
	this.tryout = false;
	for(var prop in info) this[prop] = info[prop];

	//this.id = 'item_'+itemseq++;
	this.id = 'item_'+info.sku;
	this.info = info;
	this.specialhair = 0;
	if(info.properties && info.properties.specialhair)
		this.specialhair = info.properties.specialhair;

	this.onHanger = 0;
	this.ready = false;
	this.remove = false;
	this.failed = false;
	this.owned = false;
	if(!this.info.owned)this.owned = true;
	if(this.info.owned){
		for(var i=0;i<this.info.owned.length;i++){
			if(this.info.owned[i] == this.info.variant_desc[this.info.variant].variant)
				this.owned = true;
		}
	}
	this.linecolor = 0;
	this.imageWidth = 0;
	this.imageHeight = 0;
	this.img = document.createElement('canvas');
	this.img.style.position = 'absolute';
	this.img.itemobj = this;

	this.pngimg = new Image();
	this.pngimg.setAttribute('itemobj', this.id);
	this.pngimg.id = this.id;
	this.pngimg.style.backgroundColor	=   'rgba(255,255,255,0)';
	//this.pngimg.setAttribute('onload', "IE8loadImage('"+this.id+"')"); //using setAttribute instead of event, because IE 8 had problem targeting the source
	//Added by MS, this is needed for IE8
	var self = this;
	this.pngimg.onload = function() { self.loaded();};



	this.pngimg.setAttribute('onerror', "IE8loadImage('"+this.id+"')");
	this.pngimg.src = info.image; //+"?v="+((new Date()).getTime());
	if(this.pngimg.complete) { this.loaded(); }
	this.storeimg = new Image();
	this.storeimg.setAttribute('itemobj', this.id);
	// using info.image if info.storeimage is not available. Because for graduation the gown does not have storeimage
	if (info.storeimage) {
		this.storeimg.src = info.storeimage;
	} else {
		this.storeimg.src = info.image;
	}
	addListener(this.pngimg, 'click', this.avatarClicked);



//////////////////////////////////////////////////////////////////////////////////////

	itemlist.push(this);
}

function avatarItemById(id) {
	for(var i=0;i<itemlist.length;i++) {
		if(itemlist[i].id == id) return itemlist[i];
	}
}

function IE8loadImage(itemid) {
	var item = avatarItemById(itemid);

	if(item) {
		item.loaded();
	}
}


AvatarItem.prototype.getTryout = function() { return this.tryout; }
AvatarItem.prototype.setTryout = function(b) { this.tryout = b; }

AvatarItem.prototype.loaded = function() {
	this.imageWidth = this.pngimg.width;
	this.imageHeight = this.pngimg.height;

	this.img.width = this.imageWidth;
	this.img.height = this.imageHeight;

	//this.div = document.getElementById("imageHolder_div");
	//this.div.appendChild(this.pngimg);
	if(this.img.getContext) {
		this.img.getContext('2d').drawImage(this.pngimg, 0, 0, this.imageWidth, this.imageHeight);
	}

	this.ready = true;
	this.dispatchEvent('loaded');
}

AvatarItem.prototype.setOutline = function(color){
	if(this.linecolor != color){
		this.ready = false;
		this.pngimg.src = this.info.image.replace('.png','_'+color+'.png');
		this.linecolor = color;
	}
	else {
		this.loaded();
	}
}

AvatarItem.prototype.hitTest = function(x,y) {

	var top = parseInt(this.pngimg.style.top.replace('px',''));
	var left = parseInt(this.pngimg.style.left.replace('px',''));
	var width = parseInt(this.pngimg.style.width.replace('px',''));
	var height = parseInt(this.pngimg.style.height.replace('px',''));

	x = Math.round((x - left)*this.pngimg.width/width);
	y = Math.round((y - top)*this.pngimg.height/height);
	cnvs_width = 1;
	cnvs_height = 1;

	var ctx = this.img.getContext('2d');
	var imgd = ctx.getImageData(x, y, cnvs_width, cnvs_height);
	var pix = imgd.data;
	if (pix[3] != 0){
		return true;
	} else {
		return false;
	}
}

enableEventHandling(AvatarItem);

//////////////////////////////////////////////////////////
//	AVATAR OBJECT
//////////////////////////////////////////////////////////

function Avatar(div, items) {
	if(typeof(div) == 'string') div = document.getElementById(div);
	this.div = div;
	div.objref = this;
	this.items = new Array();
	this.info = new Object();

	this.myRoomStart = false;
	this.partstoload = 0;
	this.olditems = new Array();
	this.skinline = "#BD875D";
	this.skintone = "#BD875D";
	this.changes = false;
	this.changeSinceLastSave = false;
	this.showacc = true;
	this.showPet = false;
	this.showAvatar = false;
	this.autoSave = true;
	this.fillhair = false;
	this.usehair = false;
	this.avgender = '';
	this.buildlist = new Array();
	this.allowClickClothes = true;
	this.myRoomDefaultOutfit = new Array();
	this.inAvatarPicker = false;
	this.inStore = false;
	this.inStoreDefaultClothing = new Array();
	this.inStoreNotDefaultClothing = new Array();
	this.inStoreDefaultAvatar = false;
	this.originalClothing = new Array();
	this.costumeIsOnAvatar = false;

	this.defaultskintone = new Image();
	this.defaultskintone.id = 'defaultskintone';
	this.defaultskintone.style.position = 'absolute';
	this.defaultskintone.src = '/artmin/items/avatar/skin/default_skintone.png';
	this.defaultskintone.style.visibility = 'hidden';
	this.defaultskintone.style.backgroundColor = 'rgba(255,255,255,0)';
	addListener(this.defaultskintone, 'click', this.avatarClicked);
	div.appendChild(this.defaultskintone);

	this.defaultpants = new Image();
	this.defaultpants.id = 'defaultpants';
	this.defaultpants.style.position = 'absolute';
	this.defaultpants.src = '/artmin/items/avatar/pants/reg_shorts_s92203.png';
	this.defaultpants.style.visibility = 'hidden';
	this.defaultpants.style.backgroundColor = 'rgba(255,255,255,0)';
	addListener(this.defaultpants, 'click', this.avatarClicked);
	div.appendChild(this.defaultpants);

	this.defaultshirt = new Image();
	this.defaultshirt.id = 'defaultshirt';
	this.defaultshirt.style.position = 'absolute';
	this.defaultshirt.src = '/artmin/items/avatar/shirt/reg_crew_neck_shirt_s93506.png';
	this.defaultshirt.style.visibility = 'hidden';
	this.defaultshirt.style.backgroundColor = 'rgba(255,255,255,0)';
	addListener(this.defaultshirt, 'click', this.avatarClicked);
	div.appendChild(this.defaultshirt);


	this.scale = .5;
	this.scalePercent = 0;
	this.roomItem = this;
	this.div.roomItem = this;
	this.div.style.marginLeft = Math.round(-(this.div.offsetWidth -this.div.offsetWidth*this.scale)/2) + 'px';
	this.div.style.marginTop = Math.round(-(this.div.offsetHeight -this.div.offsetHeight*this.scale)/2) + 'px';
	this.div.style.backgroundColor = 'rgba(255,255,255,0)';

	if(items.length == 0){
		this.defaultpants.style.visibility = 'inherit';
		this.defaultshirt.style.visibility = 'inherit';
		this.defaultskintone.style.visibility = 'inherit';
	}

	if(items && items.length > 0) {
		this.partstoload = items.length;
		for(var i=0;i<items.length;i++) {
			var item = new AvatarItem(items[i]);
			item.avobj = this;
			item.tryout = true;
			this.items.push(item);
			addListener(item, 'loaded', this.partLoaded);
		}
		this.arrangeLayers();
	}

	addListener(this.div, 'click', this.avatarClicked);
}

//////////////////////////////////////////////////////////

Avatar.prototype.setScale = function(newscale) {
	if(isFinite(newscale)) {
		var oldscale = this.scale;
		this.scale = newscale;
		this.div.style.webkitTransform = 'scale('+this.scale+')';
		this.div.style.MozTransform = 'scale('+this.scale+')';
		this.div.style.msTransform = 'scale('+this.scale+')';

		//added by MS 2013-04-12, needed for IE8 and browsers that don't support "transform"
		if(nohtml5) {
			var current_layers = this.div.getElementsByTagName("img");

			for(var x=0; x < current_layers.length; x++) {

				if(current_layers[x].width == 0){
					addListener(current_layers[x], "load", function(img) {
						return function() {
							img.width = img.width * newscale;
							img.height = img.height * newscale;
						};
					}(current_layers[x]));
				} else {
					current_layers[x].width = current_layers[x].width * this.scale;
					current_layers[x].height = current_layers[x].height * this.scale;
				}

			}
		}
	}

	this.div.style.marginLeft = Math.round(-(this.div.offsetWidth -this.div.offsetWidth*newscale)/2) + 'px';
	this.div.style.marginTop = Math.round(- (this.div.offsetHeight -this.div.offsetHeight*newscale)/2) + 'px';
}

Avatar.prototype.getSize = function() {
	var maxSize = new Object();
	maxSize.width = 0;
	maxSize.height = 0;
	for(var i=0;i<this.items.length;i++) {
		if(!this.items[i].ready) {
			maxSize = new Object();
			maxSize.width = 0;
			maxSize.Height = 0;
			return maxSize;
		}

		if(maxSize.width < this.items[i].imageWidth) {
			maxSize.width = this.items[i].imageWidth;
		}
		if(maxSize.height < this.items[i].imageHeight) {
			maxSize.height = this.items[i].imageHeight;
		}
	}

	return maxSize;
}


//////////////////////////////////////////////////////////
// Keep the default cloths from the original avatar to put back on when user remove the new cloths in the store. Rl 1/28/2014
Avatar.prototype.saveDefaultOutfits = function(defaultCloth){
	this.inStoreDefaultClothing = defaultCloth;
}
Avatar.prototype.saveNotDefaultOutfits = function(defaultCloth){
	this.inStoreNotDefaultClothing = defaultCloth;
}

Avatar.prototype.saveOriginalOutfits = function(outfit){
	for (var i=0; i<outfit.length; i++)
		this.originalClothing.push(outfit[i]);
}

Avatar.prototype.saveMyRoomOutfits = function(outfit){
	for (var i=0; i<outfit.length; i++)
		this.myRoomDefaultOutfit.push(outfit[i]);
}

//////////////////////////////////////////////////////////
// Get item state
// An original outfit information will be saved in the state.outfitBeforeCostume
// By going through the user inventory and finding out the information of outfitBeforeCostume and return as a list.
Avatar.prototype.getItemState = function(userInventory) {
	var resultList = new Array();
	for (key in userInventory) {
        if (userInventory.hasOwnProperty(key)) {
			for (var i=0; i<userInventory[key].length; i++) {
				if (userInventory[key][i].instances[0].state.outfitBeforeCostume){
					var itemobj = new AvatarItem(userInventory[key][i]);
					resultList.push(itemobj);
				}
			}
		}
    }

	return resultList;
}

//////////////////////////////////////////////////////////
Avatar.prototype.avatarClicked = function(event) {

	var target = getEventTarget(event);

	if (! target.objref) return;
	var obj = target.objref;

	if(obj.allowClickClothes == false) return;
	var pagePos = pagePosition(event);
	var offsets = nodeOffsets(this);
	// var x = mouseXpos/pageScale - offsets.x;
	// var y = mouseYpos/pageScale - offsets.y;
	var x = mouseXpos - offsets.x;
	var y = mouseYpos - offsets.y;

	var marginTop = 2*Math.floor(parseFloat(this.style.marginTop.replace('px','')));
	var marginLeft = 2*Math.floor(parseFloat(this.style.marginLeft.replace('px','')));

	x += marginLeft;
	y += marginTop;

	x /= obj.scale;
	y /= obj.scale;
	// Get the DIV ID when clicking on the avatar in the store.
	// A page number is attached to the ID and use the ID to adjust x position
	var divID = target.id;
	var avatarPageNumber = parseInt(divID.substring(7,8));
	if(avatarPageNumber>0){
		x += avatarPageNumber*300;
	}

	for(var i=obj.buildlist.length-1;i>=0;i--) {
		// For the following if-condition:
		// The following will use this function -> 'AvatarItem.prototype.hitTest = function(x,y)'
		// obj.buildlist[i]: Check and see if the object is available
		// obj.buildlist[i].hitTest: Check and see if the function is available
		// obj.buildlist[i].hitTest(x,y): Run the function 'hitTest'
		if(obj.buildlist[i] && obj.buildlist[i].hitTest && obj.buildlist[i].hitTest(x,y)) {
			//this.changeSinceLastSave = true;
			obj.changeSinceLastSave = true;
			//var hangupItemLayer = obj.buildlist[i].layer;
			obj.hangupItem(obj.buildlist[i]);
			// For in Store avatar check if it is the first(default) avatar, if yes the default cloths will put on if a new cloth remove. RL 1/28/2014
			if(obj.inStore){
				//alert(obj.div.id);
				if (obj.div.id == 'avatar_0') {
					//if(obj.buildlist[i].layer == 800){
					//alert(obj.buildlist[i].layer);
						obj.avatarItemStoreRestoreDefaultCloth();
					//}
				} else {
					//if(obj.buildlist[i].layer == 800){
						obj.avatarItemStoreRestoreNotDefaultCloth();
					//}
				}
			} else if (obj.inAvatarPicker){
				if (obj.buildlist[i].layer == 800){
					//putOnClothesBeforeCostume();
					cancelChanges();
				}
			} else {
				if (obj.buildlist[i].layer == 800){
					for (var j=0; j<obj.inStoreDefaultClothing.length; j++){
						obj.setItem(obj.inStoreDefaultClothing[j]);
					}
				} else {
					for (var j=0; j<obj.inStoreDefaultClothing.length; j++){
						if (obj.inStoreDefaultClothing[j].layer == obj.buildlist[i].layer){
							obj.setItem(obj.inStoreDefaultClothing[j]);
						}
					}
				}
			}
			obj.arrangeLayers();
			obj.save();
			return;
		}
	}
	return;
}

//////////////////////////////////////////////////////////
Avatar.prototype.avatarItemStoreRestoreDefaultCloth = function() {
	for (var j=0; j<this.inStoreDefaultClothing.length; j++){
		this.tryItem(this.inStoreDefaultClothing[j]);
	}
}

Avatar.prototype.avatarItemStoreRestoreNotDefaultCloth = function() {
	for (var j=0; j<this.inStoreNotDefaultClothing.length; j++){
		this.tryItem(this.inStoreNotDefaultClothing[j]);
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.avatarClickAllClothes = function() {
	var av = this;

	for(var i=av.buildlist.length-1;i>=0;i--) {
		if(av.buildlist[i]) {
			av.hangupItem(av.buildlist[i]);
		}
	}

	if(av.autoSave) {
		av.save();
	}

	return;
}

//////////////////////////////////////////////////////////

Avatar.prototype.hitTest = function(xpos, ypos) {
	var marginTop = Math.floor(parseFloat(this.div.style.marginTop.replace('px','')));
	var marginLeft = Math.floor(parseFloat(this.div.style.marginLeft.replace('px','')));
	xpos = xpos - this.div.offsetLeft + marginLeft;
	ypos = ypos - this.div.offsetTop + marginTop;

	ypos /= this.scale;
	xpos /= this.scale;

	for(var i=this.buildlist.length-1;i>=0;i--) {
		if(this.buildlist[i] && this.buildlist[i].hitTest && this.buildlist[i].hitTest(xpos,ypos)) {
			return true;
		}
	}
	return false;
}

//////////////////////////////////////////////////////////
//created by TJ on 8/2/2012, hit test response from flash component
Avatar.prototype.avatarClickedFromFlash = function(event){
	if(clickarea) {
		var av = clickarea.target.objref;
		if(clickarea.target.objref.allowClickClothes==false) return;
		for(var i=av.buildlist.length-1;i>=0;i--) {
			if(av.buildlist[i] && av.buildlist[i].sku == clickarea.returnid) {
				av.hangupItem(av.buildlist[i]);
				if(av.autoSave) {
					av.save();
				}
				return;
			}
		}
	}
}

//////////////////////////////////////////////////////////

Avatar.prototype.partLoaded = function(event) {
	this.avobj.partstoload--;
	if(this.avobj.partstoload <= 0) {
		this.avobj.div.style.visibility = 'inherit';
		this.avobj.arrangeLayers();
	}
}

//////////////////////////////////////////////////////////

Avatar.prototype.getItem = function(objectid, varid) {
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i].onHanger == false) {
			if(this.items[i].objectId == objectid && (varid == undefined || this.items[i].variant == varid)) return this.items[i];
		}
	}
}

//////////////////////////////////////////////////////////

Avatar.prototype.hasItem = function(objectid, varid) {
	return (this.getItem(objectid, varid) != null);
}

//////////////////////////////////////////////////////////

Avatar.prototype.hasLayer = function(layerid) {
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i].layer == layerid)
			return true;
	}
	return false;
}

//////////////////////////////////////////////////////////

Avatar.prototype.save = function(area) {
	if(this.changeSinceLastSave) {
		// Save the new avatar if not in the store
		if(!this.inStore){
			var list = new Array();
			if(area == undefined)
				area = '';
			for(var i=0;i<this.items.length;i++) {
				//if(this.items[i].tryout) return;
				if(this.items[i].onHanger == 1) continue;
				if(this.items[i].remove) continue;
				list.push(this.items[i].sku);
			}

			var data = new Object();
			data.action = 'save2';
			data.area = area;
			data.skus = list.join(',');
			ajax('/xml/avatar.php?&userid='+this.avuserid, data, this.saveDone.bind(this));
			//this.changeSinceLastSave = false;
		}
		return true;
	}
	return false;
}

Avatar.prototype.saveDone = function(data) {
	this.dispatchEvent('avatar_saved');
}

//////////////////////////////////////////////////////////

Avatar.prototype.getChanged = function() { return this.changes; }
Avatar.prototype.setChanged = function(b) { this.changes = b; }

Avatar.prototype.getUserid = function() { return this.avuserid; }
Avatar.prototype.setUserid = function(b) {
	if(b != this.avuserid)
		this.changes = this.changeSinceLastSave = true;
	this.avuserid = b;
}

Avatar.prototype.getShowAccesories = function() { return this.showacc; }
Avatar.prototype.setShowAccesories = function(b) {
	this.showacc = b;
	this.arrangeLayers();
}

Avatar.prototype.getGender = function() { return this.avgender; }
Avatar.prototype.setGender = function(g) {
	this.avgender = g;
	switch(g){
		case 'F':
			this.defaultshirt.src = '/artmin/items/avatar/shirt/girl_crew_tshirt_s98402.png';
			this.defaultpants.src = '/artmin/items/avatar/pants/short_shorts_s95603.png';
			break;
		default:
			this.defaultshirt.src = '/artmin/items/avatar/shirt/reg_crew_neck_shirt_s93506.png';
			this.defaultpants.src = '/artmin/items/avatar/pants/reg_shorts_s92203.png';
			break;
	}
/*
	if(g == 'F') {
		this.defaultshirt.src = '/artmin/items/avatar/shirt/girl_crew_tshirt_s98402.png';
		this.defaultpants.src = '/artmin/items/avatar/pants/short_shorts_s95603.png';
	}
	else {
		this.defaultshirt.src = '/artmin/items/avatar/shirt/reg_crew_neck_shirt_s93506.png';
		this.defaultpants.src = '/artmin/items/avatar/pants/reg_shorts_s92203.png';
	}
*/
}

//////////////////////////////////////////////////////////

// Added to prevent some layer get removed from avatar. RL 12/18/2013
Avatar.prototype.preventItemGetRemove = function(layerID) {
	var counter = 0;
	for(var i=0; i<this.items.length; i++){
		if(this.items[i].layer == layerID)
			counter++;
	}
	if (counter==1){
		for(var i=0; i<this.items.length; i++){
			if(this.items[i].layer == layerID)
				this.items[i].remove = false;
		}
	} else {
		for(var i=0; i<this.items.length; i++){
			if(this.items[i].layer == layerID){
				this.items[i].remove = true;
				return;
			}
		}
	}
}

Avatar.prototype.arrangeLayers = function(latestlayer) {
	if(latestlayer == undefined) latestlayer = 0;
	var haspants = false;
	var hasshirt = false;
	var incostume = false;
	var indress = false;
	var ingown = false;
	var tryoutlayers = new Array();
	var costume = null;
	//var tryArray = new Array();
	this.buildlist = new Array();
	this.fillhair = false;
	this.usehair = false;

	// abort if not all items are loaded
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i].failed)
			this.items[i].remove = true;
		if(!this.items[i].ready && !this.items[i].remove) { return; }
	}

	// prevent item get remove. RL 12/18/2013
	this.preventItemGetRemove(LayerInfo.SKIN);
	this.preventItemGetRemove(LayerInfo.EYES);
	this.preventItemGetRemove(LayerInfo.MOUTH);
	this.preventItemGetRemove(LayerInfo.NOSE);

	// remove unused elements from list
	this.removeItemsFromItemList();
	//if(!this.inStore){
		for(var i=0; i<this.items.length; i++){
			if(this.items[i].onHanger == 1){
				if (this.items[i].pngimg.parentNode)
					this.div.removeChild(this.items[i].pngimg);
				//this.items.splice(i, 1);
				//i--;
			}
		}
	//}
	// check if there are pants and shirt in list
	for(var i=0;i<this.items.length;i++) {
		if(!this.items[i].ready) continue;
		if(this.items[i].onHanger == 1) continue;
		if(this.items[i].isBlank) continue;
		if(this.items[i].remove) continue; //added by TJ on 8/6/2012

		switch(this.items[i].layer){
			case LayerInfo.PANTS:
				haspants = true;
				break;
			case LayerInfo.LEGGINGS:
				haspants = true;
				break;
			case LayerInfo.SHIRT:
				hasshirt = true;
				break;
			case LayerInfo.COSTUME:
				incostume = true;
				costume = this.items[i];
				break;
			case LayerInfo.DRESS:
				indress = true;
				break;
			case LayerInfo.GOWN:
				ingown = true;
				break;
			default:
				break;
		}

		if (this.items[i].specialhair && this.items[i].specialhair > 0 && incostume) {
			if (this.items[i].specialhair == 1) this.fillhair = true;
			else if (this.items[i].specialhair == 2) this.usehair = true;
		}
		if(this.items[i].tryout) tryoutlayers.push(this.items[i].layer);
	}

	if(ingown) indress = incostume = false;
	if(incostume && LayerInfo.blockCostume(latestlayer)) incostume = false;
	if (latestlayer == LayerInfo.HAIR && (this.usehair || this.fillhair))
		incostume = true;
	else if(incostume)
		indress = false;

	if(latestlayer == LayerInfo.SHIRT || latestlayer == LayerInfo.PANTS) indress = false;
	if(ingown || indress || incostume) hasshirt = haspants = true;

	this.defaultpants.style.visibility = haspants ? 'hidden' : 'inherit';
	this.defaultshirt.style.visibility = hasshirt ? 'hidden' : 'inherit';

	// bits o' logic
	this.items.sort(this.sortByLayer);

	for(var i=0;i<this.items.length;i++) {
		var item = this.items[i];
		var anticostume = (item.layer == LayerInfo.HAIR && costume && costume.properties.specialhair == 2) ? false : LayerInfo.blockCostume(item.layer);
		if(item.layer == LayerInfo.SKIN) {
			if(item.skinline && this.skinline != item.skinline) {
				this.setSkinLine(item.skinline);
				return;
			}
		}
		var tryitem = false;
		for(var j=0;j<tryoutlayers.length;j++) {
			if(tryoutlayers[j] == item.layer)
				tryitem = true;
		}

		// costume hides other clothing layers
		if(incostume && anticostume && !item.onHanger) item.onHanger = 1;
		if(!incostume && item.layer == LayerInfo.COSTUME && !item.onHanger)
		item.onHanger = 1;

		// gown hides other clothes except shoes and socks
		if(ingown && LayerInfo.blockGown(item.layer) && !item.onHanger) item.onHanger = 1;

		// dress hides shirt and pants
		if(indress && (item.layer == LayerInfo.SHIRT || item.layer == LayerInfo.PANTS) && !item.onHanger) item.onHanger = 1;

		// final check to restore items put on hangers
		if(item.onHanger == 1) {
			if(item.tryout) {
				if(incostume) {
					if(!anticostume) {
						item.onHanger = 0;
					}
				} else {  // !incostume
					if(!tryitem) {
						if(anticostume) {
							item.onHanger = 0;
						} else {
							if(item.layer != LayerInfo.COSTUME) item.onHanger = 0;
						}
					}
				}
			} else {  // !tryout
				if(tryitem) {
					item.onHanger = 1;
				} else if(ingown) {
					if(LayerInfo.blockGown(item.layer)) item.onHanger = 1;
					else item.onHanger = 0;
				} else if(incostume) {
					if(anticostume) {
						item.onHanger = 1;
					} else {
						item.onHanger = 0;
					}
				} else {  // !incostume
					if(anticostume) {
						if(indress && item.layer == LayerInfo.SHIRT) item.onHanger = 0;
						else if(indress && item.layer == LayerInfo.PANTS) item.onHanger = 1;
						else if(!indress && item.layer == LayerInfo.DRESS) item.onHanger = 1;
						else item.onHanger = 1;
					} else {
						if(item.layer != LayerInfo.COSTUME && item.layer != LayerInfo.PET) item.onHanger = 0;
						if (!incostume || (costume && costume.properties.specialhair == 2) && item.layer == LayerInfo.HAIR) {
							item.onHanger = 0;
						}
					}
				}
			}
		}

		// mutually exclusive layers
		if(item.onHanger == 0) {
			if(latestlayer == LayerInfo.JACKET && item.layer == LayerInfo.SWEATER) item.onHanger = 1;
			else if(latestlayer == LayerInfo.SWEATER && item.layer == LayerInfo.JACKET) item.onHanger = 1;
			else if(latestlayer == LayerInfo.DRESS && item.layer == LayerInfo.SHIRT) item.onHanger = 1;
			else if(latestlayer == LayerInfo.SHIRT && item.layer == LayerInfo.DRESS) item.onHanger = 1;
			else if(latestlayer == LayerInfo.DRESS && item.layer == LayerInfo.PANTS) item.onHanger = 1;
			else if(latestlayer == LayerInfo.PANTS && item.layer == LayerInfo.DRESS) item.onHanger = 1;
		}

		/*SF-3862
		if (item.layer == LayerInfo.HAIR && (!incostume)) {
			item.onHanger = 0;
			this.usehair = true;
			this.changeSinceLastSave = true;
		}*/
/*
		if (item.layer == LayerInfo.SOCKS && (!incostume)) {
			item.onHanger = 0;
			this.changeSinceLastSave = true;
		}

		if (item.layer == LayerInfo.SHOES && (!incostume)) {
			item.onHanger = 0;
			this.changeSinceLastSave = true;
		}
*/

		item.pngimg.style.visibility = (item.onHanger || item.remove) ? 'hidden' : 'inherit'; //modified by TJ on 8/6/2012, item.remove added on the condition

		if (item.layer == LayerInfo.HAIR && this.fillhair && !item.onHanger) {
			item.pngimg.style.visibility = 'hidden';
		}
		if (item.layer == LayerInfo.HAIR && this.usehair && (!item.onHanger || !item.remove)){
			item.pngimg.style.visibility = 'inherit';
			item.pngimg.style.left = (-31*((item.imageWidth-300)%10)) + 'px';
			item.pngimg.style.top = (-31*((item.imageHeight-580)%10)) + 'px';
			this.buildlist.push(item);
		}

		if(item.onHanger || item.remove) continue; //modified by TJ on 8/6/2012, item.remove added on the condition
		if(item.pngimg) {
			item.pngimg.style.left = (-31*((item.imageWidth-300)%10)) + 'px';
			item.pngimg.style.top = (-31*((item.imageHeight-580)%10)) + 'px';

			if(nohtml5) {
				item.pngimg.style.height = (item.imageHeight * this.scale)+'px';
				item.pngimg.style.width = (item.imageWidth * this.scale)+'px';
			} else {
				item.pngimg.style.height = (item.imageHeight)+'px';
				item.pngimg.style.width = (item.imageWidth)+'px';
			}
			if(item.pngimg.style.visibility == 'inherit'){
				this.buildlist.push(item);
			}
		}
		if(!this.showacc && (item.layer == LayerInfo.SCENE || item.layer == LayerInfo.PET)){
			item.pngimg.style.visibility = 'hidden';
		}
		tryitem = null;
		delete tryitem;
	}
	// Clean up variables
	haspants = null;
	delete haspants;
	hasshirt = null;
	delete hasshirt;
	indress = null;
	delete indress;
	ingown = null;
	delete ingown;
	incostume = null;
	delete incostume;
	for(var i=0; i<tryoutlayers.length; i++) {
		tryoutlayers[i] = null;
		tryoutlayers.splice(i, 1);
		delete tryoutlayers[i];
	}
	tryoutlayers = [];
	delete tryoutlayers;

/*
	for(p=0;p< this.buildlist.length;p++){
		tryArray.push(this.buildlist[p].info.objectid);
	}
*/
	//modified by TJ on 8/3/2012, default shirt and pants have fixed width (300) and height (580) with default offset (0,0)
	var added = false;
	if(this.defaultpants.style.visibility == 'inherit' && !nohtml5) {
		this.defaultpants.style.left = '0px';
		this.defaultpants.style.top = '0px';
		this.defaultpants.style.width = (300)+'px';
		this.defaultpants.style.height = (580)+'px';

		for(var i = 0; i < this.buildlist.length; i++) {
			if(this.buildlist[i].layer != undefined && this.buildlist[i].layer >= LayerInfo.PANTS) {
				this.buildlist.splice(i, 0, this.defaultpants);
				added = true;
				break;
			}
		}

		if(added == false)
			this.buildlist.push(this.defaultpants);
	}
	if(this.defaultshirt.style.visibility == 'inherit' && !nohtml5) {
		added = false;
		this.defaultshirt.style.left = '0px';
		this.defaultshirt.style.top = '0px';
		this.defaultshirt.style.width = (300)+'px';
		this.defaultshirt.style.height = (580)+'px';

		for(var i = 0; i < this.buildlist.length; i++) {
			if(this.buildlist[i].layer != undefined && this.buildlist[i].layer >= LayerInfo.SHIRT) {
				this.buildlist.splice(i, 0, this.defaultshirt);
				added = true;
				break;
			}
		}

		if(added == false)
			this.buildlist.push(this.defaultshirt);
	}
	added = null;
	delete added;

	// convert stack of canvas elements into png
	// some browsers have trouble with these canvases
	if(this.buildlist.length) {

		// This block may not being used by anything. commended out on 3/5/2014 - RL
		/*
		var top, left, width, height;
		for(var i=0;i<this.buildlist.length;i++) {
			if(this.buildlist[i].pngimg) {
				var t1 = Math.floor(parseFloat(this.buildlist[i].pngimg.style.top.replace('px','')));
				var l1 = Math.floor(parseFloat(this.buildlist[i].pngimg.style.left.replace('px','')));
				var w1 = Math.ceil(parseFloat(this.buildlist[i].pngimg.style.width.replace('px','')));
				var h1 = Math.ceil(parseFloat(this.buildlist[i].pngimg.style.height.replace('px','')));

				top = (top == undefined) ? t1 : Math.min(top, t1);
				left = (left == undefined) ? l1 : Math.min(left, l1);
				width = (width == undefined) ? w1 : Math.max(width, w1);
				height = (height == undefined) ? h1 : Math.max(height, h1);
			}
		}
		*/
		for(var i=0;i<this.buildlist.length;i++) {
			if(this.buildlist[i].pngimg) {
				this.buildlist[i].pngimg.style.position = 'absolute';
				if((this.buildlist[i].layer < LayerInfo.PANTS) && (this.buildlist[i].type != 'glasses'))
					//This checks if defaultpants exists. Seems to only cause an error in IE. DAG 5.15.14
					if(document.getElementById(this.defaultpants.id)){
						this.div.insertBefore(this.buildlist[i].pngimg, this.defaultpants);
					}else{
						this.div.appendChild(this.buildlist[i].pngimg);
					}
				else
					this.div.appendChild(this.buildlist[i].pngimg);
			} else {
				this.div.appendChild(this.buildlist[i]);
			}
			if(this.showPet == true && this.buildlist[i].layer == LayerInfo.PET){
				this.buildlist[i].pngimg.style.visibility = 'inherit';
				this.div.style.width = item.pngimg.offsetWidth + 'px';
			}

			// The following can only apply to MyRoom when it start. RL 12/27/2013
			// Can also be fixed by just changing the opacity of avatar div in myroom instead of doing this
			if (this.myRoomStart){
				if(this.showAvatar == false && this.buildlist[i].pngimg && (!USINGAPP || MOBILE=='iphone' || MOBILE=='ipad') ){
					this.buildlist[i].pngimg.style.visibility = 'hidden';
					this.div.style.width = item.pngimg.offsetWidth + 'px';
					this.defaultpants.style.visibility = 'hidden';
					this.defaultshirt.style.visibility = 'hidden';
				}
			}
			if (this.buildlist[i].layer == LayerInfo.COSTUME){
				this.costumeIsOnAvatar = true;
			}
		}
		//this.myRoomStart = false;
		this.dispatchEvent('change');
	}
	if (this.removeItemsDirty) { //items removed, run again - this prevents multiple calls
		this.removeItemsDirty = false;
		this.arrangeLayers();
	}

	this.dispatchEvent('arrange_done');
}

//////////////////////////////////////////////////////////
Avatar.prototype.removeItemsFromItemList = function() {
	for(var i=0; i<this.items.length; i++){
		if(this.items[i].remove){
			if (this.items[i].pngimg.parentNode)
				this.div.removeChild(this.items[i].pngimg);
			this.items.splice(i, 1);
			i--;
		}
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.drawCanvas = function(ctx, xpos, ypos) {
	// Loop through the buildlist image to look for the minimum left and minimum top
	var t1, l1, w1, h1, top, left;
	for(var i=0;i<this.buildlist.length;i++) {
		if(this.buildlist[i].pngimg) {
			t1 = Math.floor(this.scale*parseFloat(this.buildlist[i].pngimg.style.top.replace('px','')));
			l1 = Math.floor(this.scale*parseFloat(this.buildlist[i].pngimg.style.left.replace('px','')));

			top = (top == undefined) ? t1 : Math.min(top, t1);
			left = (left == undefined) ? l1 : Math.min(left, l1);
		}
	}

	for(var i=0;i<this.buildlist.length;i++) {
		if(this.buildlist[i].pngimg) {
			t1 = Math.floor(this.scale*parseFloat(this.buildlist[i].pngimg.style.top.replace('px','')));
			l1 = Math.floor(this.scale*parseFloat(this.buildlist[i].pngimg.style.left.replace('px','')));
			w1 = Math.ceil(this.scale*parseFloat(this.buildlist[i].pngimg.style.width.replace('px','')));
			h1 = Math.ceil(this.scale*parseFloat(this.buildlist[i].pngimg.style.height.replace('px','')));
			ctx.drawImage(this.buildlist[i].pngimg, xpos + l1-left, ypos + t1-top, w1, h1);
		}

		else if((this.defaultshirt.style.visibility == 'inherit' && this.buildlist[i] == this.defaultshirt) ||
				(this.defaultpants.style.visibility == 'inherit' && this.buildlist[i] == this.defaultpants)) {
			t1 = Math.floor(this.scale*parseFloat(this.buildlist[i].style.top.replace('px','')));
			l1 = Math.floor(this.scale*parseFloat(this.buildlist[i].style.left.replace('px','')));
			w1 = Math.ceil(this.scale*parseFloat(this.buildlist[i].style.width.replace('px','')));
			h1 = Math.ceil(this.scale*parseFloat(this.buildlist[i].style.height.replace('px','')));
			ctx.drawImage(this.buildlist[i], xpos + l1-left, ypos + t1-top, w1, h1);
		}
	}
	t1 = null;
	delete t1;
	l1 = null;
	delete l1;
	w1 = null;
	delete w1;
	h1 = null;
	delete h1;
	top = null;
	delete top;
	left = null;
	delete left;
}

//////////////////////////////////////////////////////////

Avatar.prototype.sortByLayer = function(a, b) {
	return (a.layer - b.layer);
}

//////////////////////////////////////////////////////////
Avatar.prototype.hangupAllItems = function(){
	var item;
	for (var i=0; i<this.items.length; i++){
		item = this.items[i];
		this.hangupItem(item);
	}
	if(this.autoSave) {
		this.save();
	}
	item = null;
	delete item;
	this.dispatchEvent('hangupFinished');
}

//////////////////////////////////////////////////////////
Avatar.prototype.hangup = function(layerid) {
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i].layer == layerid) {
			if(this.items[i].tryout) {
				this.items[i].remove = true;
			}
			if(this.items[i].onHanger == 0 && !this.items[i].tryout) this.items[i].onHanger = 1;
		}
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.hangupThis = function(e) {
	if(this.initializing)
		this.removeItem(e.currentTarget);
	else
		this.hangupItem(e.currentTarget);

	if(this.autoSave && e.currentTarget.tryout) {
		this.save();
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.hangupItem = function(item) {
	if(!this.showacc && (item.layer == LayerInfo.SCENE)) return;
	if(LayerInfo.canRemove(item.layer)) {
		if(item.tryout)
			item.remove = true;
		item.onHanger = 1;
		// If is in the Avatar Builder, whenever user click on the avatar to remove cloth, also need to update the avatarpicker. RL 1/21/2014
		//if(currentHash == 'abc/avatarpicker'){
		if(this.inAvatarPicker){
			removeClothing(item);
		}
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.getItemOnLayer = function(layerid, temponly) {
	if(temponly == undefined)
		temponly = false;
	var item;
	for(var i=0;i<this.items.length;i++) {
		item = this.items[i];
		if(item.layer == layerid && (!temponly || item.tryout)) {
			return item;
		}
	}
	item = null;
	delete item;
}

//////////////////////////////////////////////////////////
Avatar.prototype.removeAllLayer = function() {
	var item;
	for (var i=0; i<this.items.length; i++){
		item = this.items[i];
		if(LayerInfo.canRemove(item.layer))
			this.removeItem(item);
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.removeItem = function(item) {
	item.remove = true;
	this.changeSinceLastSave = true;
	this.removeItemsDirty = true;
}

//////////////////////////////////////////////////////////
Avatar.prototype.removeLayer = function(layerid, temponly) {
	if(temponly == undefined)
		temponly = false;
	var item;
	for(var i=0;i<this.items.length;i++) {
		item = this.items[i];
		if(item.layer == layerid && (!temponly || item.tryout)) {
			item.remove = true;
		}
		if(item.layer == 0)
			item.remove = true;
	}
	item = null;
	delete item;
	return;
}

//////////////////////////////////////////////////////////
Avatar.prototype.tryItem = function(newitem) {

	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].onHanger && this.items[i].sku == newitem.sku) {
			this.items[i].onHanger = false;
			this.arrangeLayers();
			this.unTryItem(this.items[i].layer);
			return true;
		}
	}

	newitem.tryout = true;
	this.addItem(newitem,false);
	return false;

}

//////////////////////////////////////////////////////////
Avatar.prototype.untrythis = function(e) {
	this.unTryItem(e.currentTarget.layer);
}

//////////////////////////////////////////////////////////
Avatar.prototype.boughtItem = function(sku) {
	var item;
	for(var i=0;i<this.items.length;i++) {
		item = this.items[i];
		if(item.sku == sku && item.tryout) {
			item.tryout = true;
			this.changes = this.changeSinceLastSave = true;
			for(var j=0;j<this.items.length;j++) {
				if(item.layer == this.items[j].layer && item != this.items[j]) {
					this.items[j].remove = true;
				}
			}
			if(this.autoSave) {
				this.save();
			}
			return item.info;
		}
	}
	item = null;
	delete item;
	return;
}

//////////////////////////////////////////////////////////
Avatar.prototype.unTryItem = function(layerid) {
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].tryout && this.items[i].layer == layerid) {
			this.items[i].remove = true;
		}
	}
	this.arrangeLayers();
}

//////////////////////////////////////////////////////////
Avatar.prototype.getCartList = function() {

	var list = new Array();

	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].tryout && !this.items[i].remove &&this.items[i].info.canbuy) {
			list.push(this.items[i].info);
		}

	}
	return list;
}

//////////////////////////////////////////////////////////
Avatar.prototype.getTryList = function() {

	var list = new Array();

	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].tryout && !this.items[i].remove &&this.items[i].info.canbuy) {
			list.push(this.items[i].info);
		}
	}
	return list;
}

//////////////////////////////////////////////////////////
Avatar.prototype.getFullItemList = function() {

	var list = new Array();
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].tryout) {
			list.push(this.items[i]);
		}
	}
	return list;
}

//////////////////////////////////////////////////////////
Avatar.prototype.getItemList = function() {

	var list = new Array();
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].tryout) {
			list.push(this.items[i].info);
		}
	}
	return list;
}

//////////////////////////////////////////////////////////
Avatar.prototype.getRemoveList = function() {
	var list = new Array();
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && (this.items[i].remove && this.items[i].tryout)) {
			list.push(this.items[i].info);
		}
	}
	return list;
}

//////////////////////////////////////////////////////////
Avatar.prototype.getHungList = function() {

	var list = new Array();
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].onHanger && (!this.items[i].remove && !this.items[i].tryout) ) {
			list.push(this.items[i]);
		}
	}
	return list;
}

//////////////////////////////////////////////////////////
Avatar.prototype.removeTempItems = function() {
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i]) {
			if(this.items[i].tryout) {
				this.items[i].remove = true;
			} else {
				if(this.items[i].onHanger == 1)
					this.items[i].onHanger = 0;
			}
		}
	}

	this.arrangeLayers();
	if(this.autoSave) {
		this.save();
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.setItemOnly = function(item) {
//	if(!dontRemoveItemsOnClick)
//		item.addEventListener(SiteItem.CLICK, hangupThis);
	this.changes = this.changeSinceLastSave = true;
	this.addItem(item);
	return this.getItemList();
}

//////////////////////////////////////////////////////////
Avatar.prototype.setItem = function(item) {
//	if(!dontRemoveItemsOnClick)
//		item.addEventListener(SiteItem.CLICK, hangupThis);
	this.changes = this.changeSinceLastSave = true;

	// Check if there is any layer conflict, if yes, take off the old layer.
	// This also prevent duplicate layer of the same item
	switch(item.layer){
		case LayerInfo.SCENE:
			this.removeLayer(LayerInfo.SCENE);
			break;
		case LayerInfo.SKIN:
			this.removeLayer(LayerInfo.SKIN);
			break;
		case LayerInfo.EYES:
			this.removeLayer(LayerInfo.EYES);
			break;
		case LayerInfo.MOUTH:
			this.removeLayer(LayerInfo.MOUTH);
			break;
		case LayerInfo.NOSE:
			this.removeLayer(LayerInfo.NOSE);
			break;
		case LayerInfo.SWEATER:
			this.removeLayer(LayerInfo.JACKET);
			this.removeLayer(LayerInfo.SWEATER);
			this.removeLayer(LayerInfo.COSTUME);
			break;
		case LayerInfo.JACKET:
			this.removeLayer(LayerInfo.JACKET);
			this.removeLayer(LayerInfo.SWEATER);
			this.removeLayer(LayerInfo.COSTUME);
			break;
		case LayerInfo.PANTS:
			this.removeLayer(LayerInfo.PANTS);
			this.removeLayer(LayerInfo.DRESS);
			this.removeLayer(LayerInfo.COSTUME);
			break;
		case LayerInfo.SHIRT:
			this.removeLayer(LayerInfo.SHIRT);
			this.removeLayer(LayerInfo.DRESS);
			this.removeLayer(LayerInfo.COSTUME);
			break;
		case LayerInfo.DRESS:
			this.removeLayer(LayerInfo.DRESS);
			this.removeLayer(LayerInfo.SHIRT);
			this.removeLayer(LayerInfo.PANTS);
			this.removeLayer(LayerInfo.COSTUME);
			break;
		case LayerInfo.GLASSES:
			this.removeLayer(LayerInfo.GLASSES);
			break;
		case LayerInfo.LEGGINGS:
			this.removeLayer(LayerInfo.LEGGINGS);
			break;
		case LayerInfo.SOCKS:
			this.removeLayer(LayerInfo.SOCKS);
			break;
		case LayerInfo.SHOES:
			this.removeLayer(LayerInfo.SHOES);
			break;
		case LayerInfo.COSTUME:
			this.removeLayer(LayerInfo.DRESS);
			this.removeLayer(LayerInfo.SHIRT);
			this.removeLayer(LayerInfo.PANTS);
			this.removeLayer(LayerInfo.JACKET);
			this.removeLayer(LayerInfo.SWEATER);
			this.removeLayer(LayerInfo.COSTUME);
			this.removeLayer(LayerInfo.GLASSES);
			this.removeLayer(LayerInfo.LEGGINGS);
			//this.removeLayer(LayerInfo.SOCKS);
			//this.removeLayer(LayerInfo.SHOES);
			break;
		case LayerInfo.PET:
			this.removeLayer(LayerInfo.PET);
			break;
		default:
			break;
	}

	//this.removeLayer(item.layer);
	this.addItem(item);
	return this.getItemList();
}

//////////////////////////////////////////////////////////
Avatar.prototype.setVariant = function(objid, varid) {
	for(var i=0;i<this.items.length;i++) {
		if(this.items[i] && this.items[i].objectId == objid) {
			this.items[i].variant = varid;
		}
	}
}

//////////////////////////////////////////////////////////
Avatar.prototype.addItem = function(item, savenow) {

	//if(item == null || !item.ready || item.layer == 0 || isNaN(item.layer)) return false;
	if(savenow == undefined) savenow = true;
	if(item.isBlank) {
		//this.removeLayer(item.layer);
	} else if(!item.tryout) {
		this.removeLayer(item.layer);
		if(LayerInfo.blockCostume(item.layer)){
			if(!(item.layer == LayerInfo.HAIR && (this.usehair || this.fillhair))){
				this.removeLayer(LayerInfo.COSTUME);
			}
		}
		switch(item.layer){
			case LayerInfo.SWEATER:
				this.removeLayer(LayerInfo.JACKET);
				break;
			case LayerInfo.JACKET:
				this.removeLayer(LayerInfo.SWEATER);
				break;
			case LayerInfo.SHIRT:
				this.removeLayer(LayerInfo.DRESS);
				break;
			case LayerInfo.DRESS:
				this.removeLayer(LayerInfo.SHIRT);
				this.removeLayer(LayerInfo.PANTS);
				break;
			default:
				break;
		}
	} else {
		//this.removeLayer(item.layer, true);
		this.hangup(item.layer);
		if(LayerInfo.blockCostume(item.layer)){
			if(!(item.layer == LayerInfo.HAIR && (this.usehair || this.fillhair))){
				this.hangup(LayerInfo.COSTUME);
			}
		}
		switch(item.layer){
			case LayerInfo.SWEATER:
				this.removeLayer(LayerInfo.JACKET);
				break;
			case LayerInfo.JACKET:
				this.removeLayer(LayerInfo.SWEATER);
				break;
			case LayerInfo.SHIRT:
				this.removeLayer(LayerInfo.DRESS);
				break;
			case LayerInfo.DRESS:
				this.removeLayer(LayerInfo.SHIRT);
				this.removeLayer(LayerInfo.PANTS);
				break;
			case LayerInfo.COSTUME:
				this.removeLayer(LayerInfo.DRESS);
				this.removeLayer(LayerInfo.SHIRT);
				this.removeLayer(LayerInfo.PANTS);
				this.removeLayer(LayerInfo.JACKET);
				this.removeLayer(LayerInfo.SWEATER);
				this.removeLayer(LayerInfo.COSTUME);
				this.removeLayer(LayerInfo.GLASSES);
				this.removeLayer(LayerInfo.LEGGINGS);
				break;
			default:
				break;
		}
	}

	//added by TJ on 8/6/2012
	//if(nohtml5)
	//{
		//check if the item is loaded already, if not, load it
		var found = false;
		for(var i = 0; i < this.items.length; i++) {
			//RL 12/27/2013
			//Using "savenow" to check if the user is in the store or inside "MyAvatar".
			//If inside store it will not save and not allow take off cloth by click on the item, only allow take off by click on avatar.
			//If inside "MyAvatar" allow click on avatar or the inventory to remove cloths
			if ((this.items[i].sku == item.sku) && savenow) {
				this.items[i].remove = true;
				this.items[i].onHanger = 0;
				this.items[i].tryout = true;
				found = true;
			}
			/*
			//remove any same type hung item
			else if(this.items[i].type == item.type)
			{
				this.items[i].remove = true;
				this.items[i].onHanger = 0;
			}
			*/
		}

		if(found) {
			item.remove = false;
			item.onHanger = 0;
			//this.arrangeLayers();
		} else {
			itemobj = new AvatarItem(item);
			item.tryout = true;
			itemobj.tryout = item.tryout;
			itemobj.avobj = this;
			this.items.push(itemobj);

			//Added by MS 2013-04-12, needed for IE8 the "loaded" event was firing before we could add the listener
			if(itemobj.ready) {
				this.itemLoaded.call(itemobj);
			} else {
				addListener(itemobj, 'loaded', this.itemLoaded);
			}
		}
		found = null;
		delete found;
/*
		var info = new Object();
		if(item.info)
			info = item.info;
		else
			info = item;
*/
		//if(clickarea) clickarea.addImage(info);

	if(savenow && this.autoSave) {
		this.save();
	}

	return true;
}

Avatar.prototype.itemLoaded = function(event) {
	this.ready = true;
	this.avobj.arrangeLayers(this.layer);
}

//////////////////////////////////////////////////////////

Avatar.prototype.getSkinLine = function() { return this.skinline; }

Avatar.prototype.setSkinLine = function(c) {
	this.skinline = c;
	for(var i=0;i<this.items.length;i++){
		if(this.items[i].type == 'nose' || this.items[i].type == 'mouth')
			this.items[i].setOutline(this.skinline);
	}
}

//////////////////////////////////////////////////////////

Avatar.prototype.getSkinTone = function() { return this.skintone; }

Avatar.prototype.setSkinTone = function(c) {
	this.skintone = c;
	for(var i=0;i<this.items.length;i++)
		if(this.items[i])
			this.items[i].setSkintone(this.skintone);
}

//////////////////////////////////////////////////////////
Avatar.prototype.setPremades = function(premadelist){

	this.avatarBusy = true;
	if(premadelist == undefined)
		return;
	for(var j=0;j<this.items.length;j++){
		this.items[j].remove = true;
	}
	this.removeItemsFromItemList();
	this.items = [];
	if(premadelist && premadelist.length > 0) {
		this.partstoload = premadelist.length;
		var item;
		for(var i=0; i<premadelist.length; i++) {
			item = new AvatarItem(premadelist[i]);
			item.avobj = this;
			item.tryout = true;
			this.items.push(item);

			//Added by MS 2013-04-12, needed for IE8 the "loaded" event was firing before we could add the listener
			if(item.ready) {
				this.partLoaded.call(item);
			} else {
				addListener(item, 'loaded', this.partLoaded);
			}
		}
		this.arrangeLayers();
	}
	if(this.items.length == 0){
		this.defaultpants.style.visibility = 'inherit';
		this.defaultshirt.style.visibility = 'inherit';
		this.defaultskintone.style.visibility = 'inherit';
	}

}

// [Caigoy,101315,SF-8888] hide or show pet image
Avatar.prototype.setPetDisplay = function (bool) {
	var petImg = [].filter.call(document.querySelectorAll('#tm_avatar img'), function (a) {
			return /\/pets\//gi.test(a.src);
		})[0],
		bool = !!bool;
	if (!!petImg) petImg.style.display = bool ? 'inherit' : 'none';
	return bool;
};

//////////////////////////////////////////////////////////

enableEventHandling(Avatar);

////////////////////////////////////////////////////////////////////////////////


/* TOGGLE LOGGING */
var tmDebugFlag = /\.test\.|\.qtest\./.test(location.href) || 0;

var ticketMachine = ticketMachine || {},
    tmEventHandlers = tmEventHandlers || {},
    text_language = text_language || '';

function tmInstantiate (options) {
    tmDebugFlag && console.log('tmInstantiate', 'options:', options); //***
    ticketMachine = new TicketMachine(options);
    ticketMachine.tmOptions.language = text_language || 'en';
    ticketMachine.tmData.avatarData = [{"objectid":"906","variant":"2","userid":"2379564311","area":"0","xpos":"0","ypos":"0","zpos":"0","state":{},"useditemid":"4812086862","containerid":"-1","price":"0","purchased":"1482752275","source":"3","id":"906","name":"Basic Skin Tones","longname":"","image":"\/artwork\/items\/avatar\/skin\/basic_skintone_s90602.png","sound":"snd\/items\/906_sound_basicskintones.mp3","description":"","descsound":"","active":"1","cost":"10","flags":"2816","type":"skin","shop":"avatar","seq":"1","properties":{},"store":"3","released":"0","sync_lists":"0","layer":150,"sku":90602,"storeimage":"\/artwork\/items\/avatar\/skin\/basic_skintone.store_s90602.png","skinline":"8219199"},{"objectid":"901","variant":"1","userid":"2379564311","area":"0","xpos":"0","ypos":"0","zpos":"0","state":{},"useditemid":"4812086912","containerid":"-1","price":"0","purchased":"1482752275","source":"3","id":"901","name":"Almond Eyes with Lashes","longname":"","image":"\/artwork\/items\/avatar\/eyes\/basic_eyes_4_s90101.png","sound":"snd\/items\/901_sound_almondeyeswithlashes.mp3","description":"","descsound":"","active":"1","cost":"10","flags":"2560","type":"eyes","shop":"avatar","seq":"4","properties":{},"store":"2","released":"0","sync_lists":"0","layer":200,"sku":90101,"storeimage":"\/artwork\/items\/avatar\/eyes\/basic_eyes_4.store_s90101.png"},{"objectid":"1018","variant":"2","userid":"2379564311","area":"0","xpos":"0","ypos":"0","zpos":"0","state":{},"useditemid":"4812086962","containerid":"-1","price":"0","purchased":"1482752275","source":"3","id":"1018","name":"Mouth ","longname":"","image":"\/artwork\/items\/avatar\/mouth\/full_lips_open_s101802.png","sound":"snd\/items\/1018_sound_mouth.mp3","description":"","descsound":"","active":"1","cost":"10","flags":"768","type":"mouth","shop":"avatar","seq":"6","properties":{"allowedfeatures":"3"},"store":"3","released":"0","sync_lists":"0","layer":250,"sku":101802,"storeimage":"\/artwork\/items\/avatar\/mouth\/full_lips_open.store_s101802.png"},{"objectid":"307","variant":"0","userid":"2379564311","area":"0","xpos":"0","ypos":"0","zpos":"0","state":{},"useditemid":"4812087012","containerid":"-1","price":"0","purchased":"1482752275","source":"3","id":"307","name":"Nose ","longname":"","image":"\/artwork\/items\/avatar\/nose\/basic_nose1_s30700.png","sound":"snd\/items\/307_sound_nose.mp3","description":"","descsound":"","active":"1","cost":"10","flags":"2881","type":"nose","shop":"avatar","seq":"4","properties":{},"store":"3","released":"0","sync_lists":"0","layer":300,"sku":30700,"storeimage":"\/artwork\/items\/avatar\/nose\/basic_nose1.store_s30700.png"},{"objectid":"914","variant":"5","userid":"2379564311","area":"0","xpos":"0","ypos":"0","zpos":"0","state":{},"useditemid":"4812087062","containerid":"-1","price":"0","purchased":"1482752275","source":"3","id":"914","name":"Pigtails","longname":"","image":"\/artwork\/items\/avatar\/hair\/girl_pigtails_s91405.png","sound":"snd\/items\/914_sound_pigtails.mp3","description":"","descsound":"","active":"1","cost":"10","flags":"2560","type":"hair","shop":"avatar","seq":"3","properties":{},"store":"2","released":"0","sync_lists":"0","layer":350,"sku":91405,"storeimage":"\/artwork\/items\/avatar\/hair\/girl_pigtails.store_s91405.png"},{"objectid":"1006","variant":"2","userid":"2379564311","area":"0","xpos":"0","ypos":"0","zpos":"0","state":{},"useditemid":"4812087112","containerid":"-1","price":"0","purchased":"1482752275","source":"3","id":"1006","name":"Designer Glasses","longname":"","image":"\/artwork\/items\/avatar\/glasses\/glasses_designer_s100602.png","sound":"snd\/items\/1006_sound_designerglasses.mp3","description":"","descsound":"","active":"1","cost":"50","flags":"768","type":"glasses","shop":"avatar","seq":"4","properties":{"allowedfeatures":"3"},"store":"3","released":"0","sync_lists":"0","layer":400,"sku":100602,"storeimage":"\/artwork\/items\/avatar\/glasses\/glasses_designer.store_s100602.png"},{"objectid":"955","variant":"4","userid":"2379564311","area":"0","xpos":"0","ypos":"0","zpos":"0","state":{},"useditemid":"4812087162","containerid":"-1","price":"0","purchased":"1482752275","source":"3","id":"955","name":"Ankle Socks","longname":"","image":"\/artwork\/items\/avatar\/socks\/girl_ankle_socks_s95504.png","sound":"snd\/items\/955_sound_anklesocks.mp3","description":"","descsound":"","active":"1","cost":"5","flags":"18944","type":"socks","shop":"avatar","seq":"1","properties":{},"store":"2","released":"0","sync_lists":"0","layer":550,"sku":95504,"storeimage":"\/artwork\/items\/avatar\/socks\/girl_ankle_socks.store_s95504.png"},{"objectid":"1025","variant":"0","userid":"2379564311","area":"0","xpos":"0","ypos":"0","zpos":"0","state":{},"useditemid":"4812607812","containerid":"-1","price":"100","purchased":"1483316633","source":"3","id":"1025","name":"White Bunny","longname":"Bunny","image":"\/artwork\/items\/avatar\/pets\/bunny_5_s102500.png","sound":"snd\/items\/1025_sound_whitebunny.mp3","description":"","descsound":"","active":"1","cost":"100","flags":"768","type":"housepet","shop":"pet","seq":"15","properties":{"allowedfeatures":"3","foodType":"lettuceHead","boxSize":"smallMedium","foodAnim_Front":"petpark\/feedinganim\/lettuce.swf","cleanAnim_Front":"petpark\/cleaninganim\/bubbles_bunny_front.swf","cleanAnim_Back":"petpark\/cleaninganim\/bubbles_bunny_back.swf","waterAnim_Front":"petpark\/wateringanim\/water_bowl.swf","heartAnim":"petpark\/small_heart.swf","sfx":"snd\/petpark\/bunny_snd.mp3","cleanSound":"snd\/petpark\/cleaning_bunny.mp3"},"store":"4","released":"20120114","sync_lists":"0","layer":850,"sku":102500,"storeimage":"\/artwork\/items\/avatar\/pets\/bunny_5.store_s102500.png"},{"objectid":"3281","variant":"2","userid":"2379564311","area":"0","xpos":"0","ypos":"0","zpos":"0","state":{},"useditemid":"4813064612","containerid":"-1","price":"70","purchased":"1483751130","source":"3","id":"3281","name":"Fancy Dress with Hearts","longname":"","image":"\/artwork\/items\/avatar\/dress\/fancy_dress_hearts_s328102.png","sound":"snd\/items\/3281_fancydresswithhearts.mp3","description":"","descsound":"","active":"1","cost":"70","flags":"0","type":"dress","shop":"avatar","seq":"0","properties":{},"store":"2","released":"20170206","sync_lists":"22","layer":725,"sku":328102,"storeimage":"\/artwork\/items\/avatar\/dress\/fancy_dress_hearts.store_s328102.png"},{"objectid":"1406","variant":"4","userid":"2379564311","area":"0","xpos":"0","ypos":"0","zpos":"0","state":{},"useditemid":"4813128512","containerid":"-1","price":"30","purchased":"1483784404","source":"3","id":"1406","name":"Ballet Slippers with Bows","longname":"","image":"\/artwork\/items\/avatar\/shoes\/girl_ballet_shoes_bows_s140604.png","sound":"snd\/items\/1406_sound_balletslipperswithbows.mp3","description":"","descsound":"","active":"1","cost":"30","flags":"16896","type":"shoes","shop":"avatar","seq":"7","properties":{"allowedfeatures":"1"},"store":"2","released":"0","sync_lists":"0","layer":600,"sku":140604,"storeimage":"\/artwork\/items\/avatar\/shoes\/girl_ballet_shoes_bows.store_s140604.png"}];
    ticketMachine.tmData.spID = 'ticketmachine';
    ticketMachine.tmStrings.navMoreLabels = {
        1: 'More Books',
        2: 'More Songs',
        3: 'More Games', // default
        4: 'More Art',
        5: 'More Puzzles',
    };
    ticketMachine.tmStrings.continueLabel = 'Continue';
    ticketMachine.tmStrings.msgTicketsText = {
        0:  'No Tickets Earned!', //0
        1:  '1 Ticket Earned!',   //1
        2:  '2 Tickets Earned!',  //2
        3:  '3 Tickets Earned!',  //3
        4:  '4 Tickets Earned!',  //4
        5:  '5 Tickets Earned!',  //5
        6:  '6 Tickets Earned!',  //6
        7:  '7 Tickets Earned!',  //7
        8:  '8 Tickets Earned!',  //8
        9:  '9 Tickets Earned!',  //9
        10: '10 Tickets Earned!', //10
        11: '11 Tickets Earned!', //11
        12: '12 Tickets Earned!', //12
        13: '13 Tickets Earned!', //13
        14: '14 Tickets Earned!', //14
        15: '15 Tickets Earned!', //15+
    };
    ticketMachine.init();

    }

/* workaround: $sidepanel->events_callback defined before tm instance */
tmEventHandlers = {
    ticketMachineisOpening: function () {
        ticketMachine.onOpenStart();
    },
    ticketMachineisOpened: function () {
        ticketMachine.onOpenEnd();
    },
    ticketMachineisClosing: function () {
        ticketMachine.onCloseStart();
    },
    ticketMachineisClosed: function () {
        ticketMachine.onCloseEnd();
    },
};

/**
 * Workaround: This handles dependency on RequireJS for GraphicManager
 * Legacy doesn't use RequireJS, so this will add it
 * For newer activities that use it, the loaded lib will be used
 */
(function () {
    /* for activities that already use requirejs: use existing require instance */
    if (typeof require !== 'undefined') {
        tmDebugFlag && console.log('require already loaded'); //***
        configRequire();
    }
    /* for activities that don't use requirejs: load it for ticketmachine */
    else {
        tmDebugFlag && console.log('try to load require'); //***
        /* try to load require */
        var tmreq = document.createElement("script");
        tmreq.setAttribute('type', 'text/javascript');
        tmreq.src = '/artwork/core_client_library/js/requirejs/2.1.16/require.js';
        document.body.appendChild(tmreq);
        /* wait for load event on require.js */
        addListener(tmreq, 'load', function fn(e) {
            configRequire();
            removeListener(tmreq, 'load', fn);
        });
    };
    function configRequire() {
        tmDebugFlag && console.log('configRequire'); //***

        /* moved require.config to ticketmachine_config.js to resolve order of operations issue with inline usage */
        /* http://requirejs.org/docs/api.html#data-main */
        require(['/artwork/js/html5/sidepanels/ticketmachine_config.js'], function () {
            require(['graphicManager',
                    'ticketmachine_imgdata',
                    'graphicPlayer',
                    'graphicSprite',
                    'graphicAudio',
                    'ticketmachineanimations',
                    'promise_polyfill',
                ],
                function (graphicManager, ticketmachine_imgdata) {
                    tmInstantiate({ /* pass loaded dependencies to TM instance */
                        GraphicManager: graphicManager,
                        tmBgImgData: ticketmachine_imgdata, /* data-uri strings for tmSwapBackgrounds */
                    });
                });
        });
    }
})();

(function(){
    if (isUnity) {
        document.getElementById('tm_avatar_wrap').style.height = '136px';
    }
})();
/////////////////////////////////////////////////////////////////////

			//[Caigoy,011216,SF-8888] added global js reference for new sp
			////var sp = ticketmachine = new SidePanel("ticketmachine", "right", false, 1, 250); // [Caigoy,SF-8888,121715]
////			addListener(document.getElementById("sidepanel_wrapper_ticketmachine"), "onSidePanelShow", tmEventHandlers.ticketMachineisOpening);
////addListener(document.getElementById("sidepanel_wrapper_ticketmachine"), "onSidePanelShown", tmEventHandlers.ticketMachineisOpened);
////addListener(document.getElementById("sidepanel_wrapper_ticketmachine"), "onSidePanelHide", tmEventHandlers.ticketMachineisClosing);
////addListener(document.getElementById("sidepanel_wrapper_ticketmachine"), "onSidePanelHidden", tmEventHandlers.ticketMachineisClosed);
			////sp.init();

/////////////////////////////////////////////////////////////////////////////////
    //<!-- LEGAL LINKS -->
    var getPageSection = function() {
        var pageSection = (digitalData && digitalData.page && digitalData.page.pageInfo && digitalData.page.pageInfo.pageSection) ?
            digitalData.page.pageInfo.pageSection : '';
        var arr = pageSection.split('::');
        return arr.length > 0 ? arr[arr.length - 1] : pageSection;
    }
    if (window.location.href.search('redeem') > -1) {
        addListener(document.getElementById('abc-logo'), 'click', function() {
            window.location.href = '/';
        })
    }
	
////////////////////////////////////////////////////////////////////////////
var isFirefox = typeof InstallTrigger !== 'undefined';
if (isFirefox) {
	document.getElementById('small_screen').style.left = '105px';
	document.getElementById('maindiv').style.width = '1005px';
}
addListener(window, 'load', bodyOnLoad1);
function bodyOnLoad1() {
	addListener(document, 'contextmenu',
	function(evt) {
		evt.preventDefault();
	});
	////var aboutme = SoundControl.buttonRollover('btn-aboutme', 'http://localhost/photobook/public_html/bookPlayer/artmin/snd/nav/buttons/aboutme/aboutme.mp3');
	////var home = SoundControl.buttonRollover('btn-home', 'http://localhost/photobook/public_html/bookPlayer/artmin/snd/nav/buttons/home/home.mp3');
	////var langToggleBtn = SoundControl.buttonRollover('btn-language', 'http://localhost/photobook/public_html/bookPlayer/artmin/snd/nav/buttons/changelanguage/changelanguage.mp3');
	////var back = SoundControl.buttonRollover('btn-back', 'http://localhost/photobook/public_html/bookPlayer/artmin/snd/nav/buttons/back/back1.mp3');
	////var volume = SoundControl.buttonRollover('btn-volume', 'http://localhost/photobook/public_html/bookPlayer/artmin/snd/nav/buttons/volume/volume1.mp3');
	////var volumeOptionBtn = SoundControl.buttonRollover('option-btn-volume', 'http://localhost/photobook/public_html/bookPlayer/artmin/snd/nav/buttons/volume/volume1.mp3');
	////var search = SoundControl.buttonRollover('btn-search', 'http://localhost/photobook/public_html/bookPlayer/artmin/snd/nav/buttons/search/search.mp3');
	////var changeuser = SoundControl.buttonRollover('option-btn-change', 'http://localhost/photobook/public_html/bookPlayer/artmin/snd/nav/femaleguide/changeuser.mp3');
	////var settings = SoundControl.buttonRollover('btn-settings', 'http://localhost/photobook/public_html/bookPlayer/artmin/snd/nav/femaleguide/settings.mp3');
	////var search = SoundControl.buttonRollover('btn-printables', 'http://localhost/photobook/public_html/bookPlayer/artmin/snd/nav/buttons/printables/printables1.mp3');
	////var parentsection = SoundControl.buttonRollover('btn-parents', 'http://localhost/photobook/public_html/bookPlayer/artmin/snd/nav/femaleguide/parentsection.mp3');
	////var gotoshopping = SoundControl.buttonRollover('btn-tickets', 'http://localhost/photobook/public_html/bookPlayer/artmin/html5/abc/student_homepage/bt/snd/goshopping.mp3');
	window.authenticator = new Authenticator();
	window.userIsParent = false;
	window.yesnopopup = new YesNoPopup();
	assessmentNotification.init();
	Analytics.init({
		"user": {
			"profile": {
				"userId": "2379564311",
				"parentId": "2379564261",
				"memberId": "2379564261",
				"regSource": "1",
				"sGender": "F",
				"sAge": 6,
				"productId": "460",
				"subscriptionType": "SUBSCRIPTION_TYPE_ANNUAL",
				"subscribeDate": "2016-12-25",
				"isSubscribed": true,
				"assessmentCenter": "FALSE",
				"accountType": "ACCOUNT_TYPE_PARENT",
				"": "CN Site: 04-04-16: Test: International School",
				"path_convert": "some value",
				"insiteVersion2": "CN SHP 2.1.3: 10-06-16: Control: Student Homepage with Things-to-Do Button"
			}
		},
		"page": {
			"pageInfo": {
				"language": "zhs",
				"environment": "html5 desktop",
				"pageDetail": "",
				"domain": "localhost:8811",
				"ip": "45.78.34.24",
				"referrer": "http:\/\/localhost:8811\/html5",
				"pathId": "115",
				"learningMode": "free play",
				"url": "http:\/\/localhost:8811\/html5\/bookplayer",
				"urlPath": "html5\/bookplayer",
				"pageWall": "html5 member",
				"pageCategory": "html5 member::activities",
				"pageSection": "html5 member::activities::books"
			},
			"media": []
		},
		"valid": true,
		"transaction": []
	});;
	popup_timer = new TIMER(2379564311, '{"timers":{"site_timer":{"mstid":"16457862","userid":"2379564311","timelimit":"60","active":"1","timeused":"60","extended":"0","date_added":"1497081728","extended_timelimit":"","endrange":"","extended_added":""}},"current_timers":1,"active_timers":"1"}', '["bookplayer"]');

	TIMER_CANVAS = new CanvasA('timer_settings_canvas');;
	setupVolumes();
	Analytics.start();;
	if (decodeURIComponent(getCookie('hashHistory')).split(',').length > 0) hashHistory = decodeURIComponent(getCookie('hashHistory')).split(',');
}

//});