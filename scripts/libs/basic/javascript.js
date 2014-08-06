function deleteJsObject(el) {
	delete el;
}

function switchTrueFalse(inval) {
	if (inval==true) return false;
	else return true;
}

function dateYmdHis() {
	var date = new Date();
	var s = date.getSeconds();
	var i = date.getMinutes();
	var H = date.getHours();
	var d = date.getDate();
	var m = date.getMonth() + 1;
	var y = date.getFullYear();
	var val = '' + y + '' + (m<=9 ? '0' + m : m) + '' + (d <= 9 ? '0' + d : d) + '' + (H<=9 ? '0' + H : H)  + '' + (i<=9 ? '0' + i : i)  + '' + (s<=9 ? '0' + s : s);
	return(val);
}

function dateYmdHisToTimestamp(date) {
	// input: 20100101120000
	// target = 2010-01-01T12:00:00Z
	if (date==undefined) date = "??????????????";
	var y = (undefined ? "" : date.substr(0,4));
	var m = (undefined ? "" : date.substr(4,2));
	var d = (undefined ? "" : date.substr(6,2));
	var H = (undefined ? "" : date.substr(8,2));
	var i = (undefined ? "" : date.substr(10,2));
	var s = (undefined ? "" : date.substr(12,2));
	// var val = '' + y + '' + (m<=9 ? '0' + m : m) + '' + (d <= 9 ? '0' + d : d) + '' + (H<=9 ? '0' + H : H)  + '' + (i<=9 ? '0' + i : i)  + '' + (s<=9 ? '0' + s : s);
	var val = '' + y + '-' + m + '-' + d + 'T' + H + ':' + i + ':' + s + 'Z';
	return(val);
}

function dateYmdHisToGerman(date) {
	if (date==undefined) date = "??????????????";
	var y = (undefined ? "" : date.substr(0,4));
	var m = (undefined ? "" : date.substr(4,2));
	var d = (undefined ? "" : date.substr(6,2));
	var H = (undefined ? "" : date.substr(8,2));
	var i = (undefined ? "" : date.substr(10,2));
	var s = (undefined ? "" : date.substr(12,2));
	// var val = '' + y + '' + (m<=9 ? '0' + m : m) + '' + (d <= 9 ? '0' + d : d) + '' + (H<=9 ? '0' + H : H)  + '' + (i<=9 ? '0' + i : i)  + '' + (s<=9 ? '0' + s : s);
	var val = '' + d + '.' + m + '.' + y;
	return(val);
}

function are_arrs_equal(arr1, arr2){
	return arr1.sort().toString() === arr2.sort().toString()
}

function checkEmail(email){
  // var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var regex = /^[a-zA-Z0-9]+$/;
  // /^\w+$/;
  return regex.test(email);
}

function checkString(str){
  // var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var regex = /^[a-zA-Z0-9_.+-\@]+$/;
  // /^\w+$/;
  return regex.test(str);
}

// var showPageOptionsIconDeg = 0;
function rotatePageOptionsIcon() {
	// window.showPageOptionsIconDeg += 180;
	// $("#showPageOptionsIcon").css({'transform': 'rotate('+window.showPageOptionsIconDeg+'deg)'});
}

/**
 * Tests two data structures for equality
 * @param {object} x
 * @param {object} y
 * @returns {boolean}
 */
var equal = function(x, y) {
	if (typeof x !== typeof y) return false;
	if (x instanceof Array && y instanceof Array && x.length !== y.length) return false;
	if (typeof x === 'object') {
		for (var p in x) if (x.hasOwnProperty(p)) {
			if (typeof x[p] === 'function' && typeof y[p] === 'function') continue;
			if (x[p] instanceof Array && y[p] instanceof Array && x[p].length !== y[p].length) return false;
			if (typeof x[p] !== typeof y[p]) return false;
			if (typeof x[p] === 'object' && typeof y[p] === 'object') { if (!equal(x[p], y[p])) return false; } else
			if (x[p] !== y[p]) return false;
		}
	} else return x === y;
	return true;
};

function getURLParameter(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
	return "";
  else
	return results[1];
}

/*
function usingMobileDevice(){
	var _isMobile = isMobile.any();
	// var userAgent = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
	return _isMobile;
}

/*

function nothing() {
	// empty callback function
}

function removeNonAlphaNumericChars(str){	
	str = str.replace(/[ ]+/g,'_');
	str = str.replace(/[^a-zA-Z0-9_-]+/g,'');
	return str;	
}

function removeProtectedDelimeters(str){		
	str = str.replace(/[,;|]+/g,'');
	return str;	
}

// DEVICE DETECTION: Device API mode
function isAppleMobile(){
	return (
		//Detect iPad
		(navigator.platform.indexOf("iPad") != -1) ||
		//Detect iPhone
		(navigator.platform.indexOf("iPhone") != -1) ||
		//Detect iPod
		(navigator.platform.indexOf("iPod") != -1)
	);
}

// DEVICE DETECTION: Device API mode
function isiPhone(){
	return (
		//Detect iPhone
		(navigator.platform.indexOf("iPhone") != -1) ||
		//Detect iPod
		(navigator.platform.indexOf("iPod") != -1)
	);
}

function nullClickEvent(e) { 
	e.stopPropagation(); 
}

// window.pagechange_timestamp = dateYmdHis();

function randomInt(min,max) {
	return Math.floor(Math.random()*(max-(min+1))+(min+1))*1000;
	// alert('a');
}

function printObject(o) {
  var out = '';
  for (var p in o) {
	out += p + ': ' + o[p] + '\n';
  }
  alert(out);
}

function getUniqueIDString(){
	var time = new Date();
	return String(time.getMilliseconds() + time.getSeconds() + time.getDate());
}

function validateEmail(email){
	var re = /\S+@\S+\.\S+/;
	return re.test(email);
}

function secondsBetweenTwoDates(date1, date2){	
	var difference = (date2 - date1) / 1000;
	return difference;
}

// getBasicTimeString
// example: 5:23 PM
function getBasicTimeString(h,m,excludeSuffix){
	try{
		var _hour = h;
		var _min = m;
		var _ampm = "AM";
		if(_hour > 11){ _ampm = "PM";}		
		if(_hour > 12){ _hour -= 12;}		
		// integrate [excludeSuffix] later
		if(_min < 10) _min = "0" + m.toString();
		_timeString = _hour + ":" + _min + " " + _ampm;		
		report('TEST','--> getBasicTimeString(h:' + h + ',m:' + m + ',excludeSuffix:' + excludeSuffix + ').. [' + _timeString + ']');	
		return _timeString;
	}catch(e){ catchError('getBasicTimeString()',e); }			
}

function isLocalHost(){ 
	return (document.location.href.indexOf('localhost',0) > -1); 
}

*/

function getRandomID() {
	var dateNow = new Date();
	return String(dateNow * Number(dateNow.getMilliseconds() * dateNow.getSeconds()));
}

function getTimestamp() {
	alert(system.timestamp);
}

function agetTimestamp() {
	navigator.geolocation.getCurrentPosition(TSonSuccess, TSonError);
}
var TSonSuccess = function(position) {
	/*
	alert('Latitude: '          + position.coords.latitude          + '\n' +
		  'Longitude: '         + position.coords.longitude         + '\n' +
		  'Altitude: '          + position.coords.altitude          + '\n' +
		  'Accuracy: '          + position.coords.accuracy          + '\n' +
		  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
		  'Heading: '           + position.coords.heading           + '\n' +
		  'Speed: '             + position.coords.speed             + '\n' +
		  'Timestamp: '         + new Date(position.timestamp)      + '\n');
	alert(position.timestamp);
	*/
	return(position.timestamp);
};
function TSonError(error) {
	alert('code: '    + error.code    + '\n' +
		  'message: ' + error.message + '\n');
}

/***** report helper function instead of or to extend console.log() *****/
function report(logtype,msg){
	try{
		// alert(logtype + ': ' + msg);
		console.log(logtype + ': ' + msg);
	} catch(e){ 
		// give up
	}            
}

/***** check if a string is really existing and not empty *****/
function isEmpty(str){
	if(
		(typeof(str) != 'undefined') &&
		(str != '') &&
		(str != undefined) &&
		(str != null) &&
		(str != 'undefined')
	){
		return true;
	}else{
		return false;
	}
}
