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
						console.log(window.innerHeight);
						$(document.body).height(window.innerHeight);
						console.log($(document.body).height());
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
					).fail(function(err) {
						alert('error');
					});
				// }
				return d.promise();
			},
			
			initApp: function() {
				var _this = this;
				var d = $.Deferred();
				if (window.heavyDebug) console.log('main.js >> doing initApp() with '+window.system.owner.kdnr);
				// alert('ownerByKdnr');
				$.when( getOwnerData(window.system.owner.kdnr) ).done(
					function( ownerByKdnr ) {
						handle_getOwnerData(d,ownerByKdnr);
					}
				).fail(
					function(err) {
						if (err.statusText=="timeout") {
							doAlert('Der Verbindungsaufbau zum Server dauerte wahrscheintlich zu lange...','Ohh nohh...');
						} else {
							// eventuell ist der server down...
							doAlert('Es ist ein unbekannter Fehler aufgetreten.','Entschuldigung...');
							if (window.heavyDebug) console.log('simulated desktop offline mode via static vars setted');
							var ownerJsonString = '[{"active":true,"appviews":["cards","wall","videos","messages","users"],"city":"Ahlerstedt","companyname":"Superfirma AG","credits":0,"deleted":false,"followers":[],"following":[],"fullname":"OfflineRoswitha OfflineNeitzel","interests":["Gedächtnistraining","Kundengewinnung"],"kdnr":"20040","lastModified":"20140707175616","logincount":0,"master":false,"messageble":true,"perstext":"","purchases":[],"registered":"20140620090350","roles":["user","seeker","provider"],"show":false,"slogan":"Mein Slogan!!!","sponsor":"042cb1572ffbea5d","street":"Pappelallee 1234","usergroups":[],"username":"rneitzel","zip":"55555","id":"8d1ed958fe65c8ff"}]';
							var ownerByKdnr = JSON.parse(ownerJsonString);
							handle_getOwnerData(d,ownerByKdnr);
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
