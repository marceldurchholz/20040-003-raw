var isMobile = {
	Android: function() {
		// return navigator.userAgent.match(/Android/i) ? true : false;
		return navigator.userAgent.match(/Android/i) ? false : false;
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i) ? true : false;
	},
	Apple: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
		// return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? false : false;
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i) ? true : false;
	},
	WebOS: function() {
		return navigator.userAgent.match(/webOS/i) ? true : false;
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.Apple() || isMobile.Windows() || isMobile.WebOS());
	}
};

function isNativeAppMode() {
	var isNative;
	// var isSafari = navigator.userAgent.match(/Safari/i) != null;
	if((document.location.href.toUpperCase().indexOf('FILE://',0) > -1) && (isMobile.any())) isNative = true;
	else isNative = false;
	return isNative;
}

/***** Configurable Variables... *****/
// console.log all debugging stuff
function debug(val) { console.log(val); }
window.heavyDebug = true;
if (window.heavyDebug) console.log('defvalues.js');	
// hide splash screen when app is loaded
window.iosShowStatusBar = true;
// show native LoadingSpinner insteaf of jQuery Mobile Ajax loading when iOS
window.iosShowLoadingSpinner = true;
// forced login uid at startup
// window.forceLoginId = "8d1ed958fe65c8ff";
/*****
// 042cb1572ffbea5d = 20040 = info@digitalvervede
// 3a499b457111f803 = welcome@robert-spengler.de / RS97356
// 6b7210be92e32ac1 = menschengewinner / mg2014
// 1ddee46a6fadb82a = wdurchholz / wd123
// 47a73afc841ce83f = j.auer@joachimauer.de / JA5734
*****/
// Deploydkit Server
var dpd_server = "http://s15944029.onlinehome-server.info:5000/";
// Local DB Setup
window.local_db_setup = new Object();
window.local_db_setup.name = "appinaut_db_001";
window.local_db_setup.version = "1.0";
window.local_db_setup.description = "APPinaut Local Database v001";
window.local_db_setup.size = 200000;
// jQuery Mobile Transitions
window.defaultPageTransition = 'none';
window.defaultDialogTransition = 'pop';
window.loginPageTransition = 'none';
// App System Data
var system = {
	owner: new Object({
		kdnr:"20040"
	}),
	master:false,
	app: new Object({
		options: new Object({
			firstpage:"#login",
			title:"Mobile Training and Infotainment",
			calltoaction:"Registrieren oder Einloggen um zu entdecken",
			modules:new Array()
		})
	}),
	currency: 'Coins',
	showtutorial:false,
	contentHelper:0,
	timestamp:0,
	modaltimeout:0,
	videolength:0
}

/***** App Used Variables... *****/
var isDesktop = false;
var appInited = false;
window.me = new Object();
window.btnBackClicked = 0;
window.ajaxLoader = 0;
window.pagecreated = 1;

/***** Additional Variables *****/
// f.e. used by pdfbrowser and childbrowser
var root = this; 
var rootURL = "";
// used by getDeviceID() and test_SDID()
var deviceSDID;
var deviceSDID = "???";
// used by getDeviceID()
var SDID_DOMAIN = 'phonegap.appinaut.de';  
var SDID_KEY = '633241';
// Media and File Options
var my_media;
var platformId = null;
var CameraPopoverOptions = null;
var pictureUrl = null;
var fileObj = null;
var fileEntry = null;
var pageStartTime = +new Date();
//default camera options
var camQualityDefault = ['quality value', 50];
var camDestinationTypeDefault = ['FILE_URI', 1];
var camPictureSourceTypeDefault = ['CAMERA', 1];
var camAllowEditDefault = ['allowEdit', false];
var camEncodingTypeDefault = ['JPEG', 0];
var camMediaTypeDefault = ['mediaType', 0];
var camCorrectOrientationDefault = ['correctOrientation', false];
var camSaveToPhotoAlbumDefault = ['saveToPhotoAlbum', true];
// var badgeToggledOn = false;
// var autoLockIsDisabled = false;
// var cdvBadge = null;
// var currentHash = window.location.hash;
// var imagePath = '';
// var menuStatus = false;
// var footervideoStatus = false;