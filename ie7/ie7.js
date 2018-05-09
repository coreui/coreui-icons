/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'CoreUI-Icons-Linear\'">' + entity + '</span>' + html;
	}
	var icons = {
		'cui-basket-loaded': '&#xe900;',
		'cui-bell': '&#xe901;',
		'cui-calculator': '&#xe902;',
		'cui-calendar': '&#xe903;',
		'cui-camera': '&#xe904;',
		'cui-chart': '&#xe905;',
		'cui-cloud-download': '&#xe906;',
		'cui-cursor': '&#xe907;',
		'cui-cursor-move': '&#xe908;',
		'cui-drop': '&#xe909;',
		'cui-energy': '&#xe90a;',
		'cui-envelope-letter': '&#xe90b;',
		'cui-equalizer': '&#xe90c;',
		'cui-globe': '&#xe90d;',
		'cui-graph': '&#xe90e;',
		'cui-home': '&#xe90f;',
		'cui-layers': '&#xe910;',
		'cui-list': '&#xe911;',
		'cui-location-pin': '&#xe912;',
		'cui-map': '&#xe913;',
		'cui-note': '&#xe914;',
		'cui-options': '&#xe915;',
		'cui-pencil': '&#xe916;',
		'cui-people': '&#xe917;',
		'cui-pie-chart': '&#xe918;',
		'cui-puzzle': '&#xe919;',
		'cui-screen-desktop': '&#xe91a;',
		'cui-screen-smartphone': '&#xe91b;',
		'cui-settings': '&#xe91c;',
		'cui-social-facebook': '&#xe91d;',
		'cui-social-skype': '&#xe91e;',
		'cui-social-twitter': '&#xe91f;',
		'cui-speech': '&#xe920;',
		'cui-speedometer': '&#xe921;',
		'cui-star': '&#xe922;',
		'cui-user': '&#xe923;',
		'cui-user-female': '&#xe924;',
		'cui-user-follow': '&#xe925;',
		'cui-user-unfollow': '&#xe926;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/cui-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
