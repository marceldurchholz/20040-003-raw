// require this script before your document is done loading
;(function () {
  
  // if (window.heavyDebug) console.log('bbb');

  // var isDroid = navigator.userAgent.match(/Android/);
  // var isiOS = navigator.userAgent.match(/(iPhone|iPod|iPad)/);
  var isNativeDevice = ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1) );
  /*
  var droidScripts = [
    "script/cordova-android.js",
    "script/android-utils.js",
    "script/cdv-plugin-childbrowser-android.js",
    "script/cdv-plugin-datepicker.js",
    "script/cdv-plugin-statusbarnotification.js",
    "script/cdv-plugin-gcm.js"
  ]
  */
  var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
  
  var nativeScripts = [
    "phonegap.js"
  ]
  var nativeCss = [
    "css/style_firefox.css"
  ]
  touchCss = [
    "css/style_touch.css"
  ]
  var desktopScripts = [
    "http://debug.build.phonegap.com/target/target-script-min.js#2a3d5f18-f7b2-11e3-af79-12313d16b935"
  ]
  // if (isDroid) droidScripts.forEach(loadScript)
  // alert('isNativeDevice: '+isNativeDevice);
  if (isNativeDevice==true) {
    // alert('device-loader >> loading scripts via: if (isNativeDevice==true) {...');
	nativeScripts.forEach(loadScript)
	nativeCss.forEach(loadCss)
  }
  if (isNativeDevice==false) {
    // alert('device-loader.js >> loading scripts via: if (isNativeDevice==false) {...');
	// desktopScripts.forEach(loadScript)
  }
  if (isTouch==true) {
	touchCss.forEach(loadCss)
  }
 
  function loadScript(src) {
    var line = '<script type="text/javascript" src="'+src+'"></script>';
    document.writeln(line);
  }
  function loadCss(src) {
	var line = '<link rel="stylesheet" href="'+src+'" />';
    document.writeln(line);
  }

})();