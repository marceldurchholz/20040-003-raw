define(['defvalues','domReady', 'jqmNavigator','jqmNativeSpinnerPlugin','MobileRouter'],
    function (undefined, domReady, undefined, undefined, MobileRouter) {

		if (window.heavyDebug) console.log('main.js >> function (domReady, MobileRouter) {...');
		
		var MobileApp = {
		
			start: function(){
				var _this = this;
				if (window.heavyDebug) console.log('main.js >> window.MobileApp.start: function(){...');
				if(isNativeAppMode()){
					if (window.heavyDebug) console.log('!!!!!!!!!!!!!!!!!!! main.js >> You are using a Native Device');
					document.addEventListener('deviceready', function() {
						//enable cross site script
						$.support.cors = true;
						window.runningInCordova = true;
						if (window.heavyDebug) console.log('MOBILE DEVICE is ready !!!');
						$.when( _this.deviceSpecificActions(false) ).done(
							function( result ) {
								if (window.heavyDebug) console.log('$.when( _this.deviceSpecificActions(false) ).done(... :' + result);
								_this.myrouter = new MobileRouter();
								// _this.setMobileRouter(); // new MobileRouter();
							}
						);
					}, false);
				} else {
					if (window.heavyDebug) console.log('!!!!!!!!!!!!!!!!!!! main.js >> You are using a Desktop PC << simulating the waiting for the signal from the universe...');
					// setTimeout(function() {
						if (window.heavyDebug) console.log('DESKTOP PC is ready !!!');
						$.when( _this.deviceSpecificActions(true) ).done(
							function( result ) {
								if (window.heavyDebug) console.log('$.when( _this.deviceSpecificActions(false) ).done(... :' + result);
								_this.myrouter = new MobileRouter();
								// _this.setMobileRouter(); // new MobileRouter();
							}
						);
					// }, 0);
				}
			},

			deviceSpecificActions: function(desktopdevice) {
				var _this = this;
				var d = $.Deferred();
				if (window.heavyDebug) console.log('main.js >> deviceSpecificActions: function(desktopdevice) {...');
				if (desktopdevice == true) loadDesktopSpecific();
				else loadNativeSpecific();
				document.addEventListener("online", networkConnectionSwitched, false);
				document.addEventListener("offline", networkConnectionSwitched, false);
				$.when( _this.checkInitApp() ).done(
					function( response ) {
						// if (response==true) _this.setMobileRouter(); // new MobileRouter();
						// else alert('new MobileRouter(); not executed');
						d.resolve(response);
					}
				);
				return d.promise();
			},

			checkInitApp: function() {
				var _this = this;
				var d = $.Deferred();
				if (window.heavyDebug) console.log('doing checkInitApp()');
				// if (appInited==false) {
					if (window.heavyDebug) console.log('appInited==false - window not yet inited with: new MobileRouter();');
					$.when( _this.initApp() ).done(
						function( result ) {
							if (window.heavyDebug) console.log('initApp().done(): '+result);
							if (result==true) {
								appInited = true;
								if (window.heavyDebug) console.log('************************************** wohoooooo!!! now creating the MobileRouter() ************************************************');
							}
							d.resolve(result);
						}
					);			
				// }
				return d.promise();
			},
			
			initApp: function() {
				var _this = this;
				var d = $.Deferred();
				if (window.heavyDebug) console.log('main.js >> doing initApp() with '+window.system.owner.kdnr);
				$.when( getOwnerData(window.system.owner.kdnr) ).done(
					function( ownerByKdnr ) {
						if (window.heavyDebug) console.log('$.when( getOwnerData('+window.system.owner.kdnr+') ).done() {...');
						if (window.heavyDebug) console.log(ownerByKdnr);
						if (ownerByKdnr==undefined && isConnectedToInternet()!=true && isDesktop==true) {
							/***** START: SIMULATED STATIC DESKTOP VARS MODE *****/
							if (window.heavyDebug) console.log('simulated desktop offline mode via static vars setted');
							var ownerJsonString = '[{"active":true,"appviews":["cards","wall","videos","messages","users"],"city":"Ahlerstedt","companyname":"Superfirma AG","credits":0,"deleted":false,"followers":[],"following":[],"fullname":"aRoswitha Neitzel","interests":["Gedächtnistraining","Kundengewinnung"],"kdnr":"20040","lastModified":"20140707175616","logincount":0,"master":false,"messageble":true,"perstext":"","purchases":[],"registered":"20140620090350","roles":["user","seeker","provider"],"show":false,"slogan":"Mein Slogan!!!","sponsor":"042cb1572ffbea5d","street":"Pappelallee 1234","usergroups":[],"username":"rneitzel","zip":"55555","id":"8d1ed958fe65c8ff"}]';
							var ownerByKdnr = JSON.parse(ownerJsonString);
							/***** ENDE: SIMULATED STATIC DESKTOP VARS MODE *****/
						}
						if (ownerByKdnr==undefined) {
							if (window.heavyDebug) console.log('unknown error in main.js - absolutely no owner found: sorry - could not get any app setup informations...');
							d.resolve(false);
						}
						if (window.heavyDebug) console.log('we got an app owner!!! fullname is: '+ownerByKdnr.fullname);
						window.system.owner = ownerByKdnr;
						d.resolve(true);
					}
				).fail(
					function(err) {
						if (err.statusText=="timeout") {
							doAlert('Es besteht wahrscheintlich keine Verbindung zum Server.','Ohh nohh...');
						} else {
							doAlert('Es ist ein unbekannter Fehler aufgetreten.','Entschuldigung...');
						}
					}
				);
				return d.promise();
			}

			/*
			setMobileRouter: function() {
				var _this = this;
				$(function(){
					_this.myrouter = new MobileRouter();
				});
			},
			*/
			
		}
		
		window.MobileApp = MobileApp;
		window.MobileApp.start();
		
    }
);
