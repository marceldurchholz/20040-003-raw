if (window.heavyDebug) console.log('myfunctions.js');

function global_a_clickHandler(e) {
	closeJqmPanels();
	checkLink(e);
}
function global_button_clickHandler(event) {
	checkLink(event);
}

function checkLink(e) {
	// if (window.heavyDebug) console.log('checkLink');
	var open_route = $(e.currentTarget).attr('href');
	// var data_href = $(e.currentTarget).attr('href');
	var is_ajax = $(e.currentTarget).attr('data-ajax');
	var data_rel = $(e.currentTarget).attr('data-rel');
	if (data_rel=="dialog" || data_rel=="popup") {
		// ...
	}
	else if (is_ajax=='true') {
		// if (window.heavyDebug) console.log(open_route+' has >> data-ajax=true');
		return(false);
	}
	else if (open_route!='#' && open_route!='undefined' && open_route!='' && open_route!=undefined) {
		if (e.preventDefault) e.preventDefault();
		window.MobileApp.myrouter.gotoRoute(open_route);
		return(false);
	}
	else {
		if (e.preventDefault) e.preventDefault();
		// if (window.heavyDebug) console.log('Wahrscheinlich ein link, der durch eine globale function in myfunctions.js definiert sein sollte/ist...');
		return(false);
	}
}

function PLDR_createJqmPage() {
	// var unpreparedlisLength = 0;
	// var listsFound = false;
	/*
	$.mobile.activePage.find("span").each(function() {
		if ($(this).find("ul").length>0) {
			$( this ).css('width','100%');
		}
	});
	*/
	$.mobile.activePage.find("ul").each(function() {
		// $( this ).css('width','100%');
		if ($(this).attr("data-pastload-sort")=="true") {
			$(this).listview({
			  autodividers: true,
			  hideDividers: true,
			  autodividersSelector: function ( li ) {
				var rowTopic = li.attr( "data-devider-topic" );
				var out = rowTopic;
				return out;
			  }
			}).listview("refresh").listview({ hideDividers: true });
		}
		else {
			$(this).listview({
				autodividers: false
			}).listview().listview("refresh").listview({ hideDividers: true });
		}
		$(this).listview({ hideDividers: true });
	});
	
	// alert(parseInt($(window).width()),0);
	if (parseInt($(window).width())<=48000) {
		var shrinkVal = true;
		var shrinkClass = 'ui-mini';
	} else {
		var shrinkVal = false;
		var shrinkClass = 'ui-mini';
	}
	$.mobile.activePage.find('input[type="text"],input[type="password"],input[type="textarea"],a[data-role="button"],input[type="checkbox"]').each(function(o,e) {
		var typ = e.type || $(e).attr('data-role') || $(e).attr('role');
		if (e.type=="checkbox") $(e).parent('fieldset').addClass(shrinkClass);
		else if (e.type=="text" || e.type=="password") $(e).addClass(shrinkClass);
		else $(this).buttonMarkup({ mini: shrinkVal });
		// console.log(e);
		// alert(typ);
	});
	$('#panel_right').find('input[type="text"],input[type="password"],input[type="textarea"],a[data-role="button"],input[type="checkbox"]').each(function(o,e) {
	// $('#panel_right').find('input[type="text"],input[type="password"],input[type="textarea"]').each(function() {
		// $(this).removeClass('ui-mini');
		var typ = e.type || $(e).attr('data-role') || $(e).attr('role');
		if (e.type=="checkbox") $(e).parent('fieldset').removeClass(shrinkClass);
		else if (e.type=="text" || e.type=="password") $(e).removeClass(shrinkClass);
		else $(this).buttonMarkup({ mini: shrinkVal });
	});
	
	fontResize();

	/*
	$.mobile.activePage.find(".age").each(function() {
		$(this).age();
	});
	*/
	$('.age').age({
		interval: 10000,
		units: ["years", "weeks", "days", "hours", "minutes"],
		prefixes: {
			past: "vor",
			future: "in",
		},
		suffixes: {
			past: "",
			future: "",
		},
		formats: {
			now: "gerade eben...",
			singular: {
				seconds: "einer Sekunde",
				minutes: "einer Minute",
				hours: "einer Stunde",
				days: "einem Tag",
				weeks: "einer Woche",
				months: "einem Monat",
				years: "einem Jahr",
			},
			plural: {
				seconds: "{{amount}} Sekunden",
				minutes: "{{amount}} Minuten",
				hours: "{{amount}} Stunden",
				days: "{{amount}} tagen",
				weeks: "{{amount}} Wochen",
				months: "{{amount}} Monaten",
				years: "{{amount}} jahren",
			},
		},
	});
	
	$('ul.sendMessage').each(function() {
		var ul = $(this);
		var ul_width = ul.width();
		var li = ul.find('li');
		var li_height = li.height();
		var sendLink = ul.find('a[name="sendLink"]');
		var sendLink_width = sendLink.width();
		var message = ul.find('textarea[name="message"]');
		var message_width = parseInt(ul.width(),0) - parseInt(sendLink_width,0) - 96;
		message.css('width',message_width);
		message.css('max-height','200px !important');
		
		// $($.mobile.activePage).find('.ui-content').scrollTo( $('.learningstreamSubheading[data-learningstreamid='+query_vars.id+']').prev().prev(), 200 );
		
		var active_page_content_height = $($.mobile.activePage).find('.ui-content').height();
		var messages_area_height = ul.parent().height();
		var li_top = parseInt(active_page_content_height,0) - parseInt(messages_area_height,0);
		// var win_height = $(window).height();
		// var li_pos_y = li.css('top');
		if (li_top<0) li_top=0;
		li.css('top',li_top+'px');
		li.attr('data-beforeheight',li_height+'px');
		li.attr('data-beforetop',li_top+'px');
		li.attr('data-basetop',li_top+'px');
		// alert(ul_width);
		// alert(sendLink_width);
		// alert(message_width);
		// message.width(parseInt(ul_width,0) - parseInt(new_width,0));
		$('.ui-page-active > .ui-content').scrollTo( $('#myMsgBox'), 1000 );
		$('#myMsgBox').autosize();
	});
	
	$.mobile.activePage.trigger("create");

	// $('.ui-page-active > .ui-content').scrollTo(1000000);
			
}

function getQueryVarsFromElement(el) {
	var href = $(el).attr('href');
	var query_vars = $.parseParams(href.substring(1));
	return(query_vars);
}

function likeToogleupdatDB(e) {
	var d = $.Deferred();
	// e.preventDefault();
	var el = $(e.currentTarget);
	var query_vars = getQueryVarsFromElement($(e.currentTarget));
	var query = {"userid":window.me.id,"objectid":query_vars.id};
	dpd.likes.get(query, function (result) {
		// console.log('result');
		// console.log(result);
		if (result && result != undefined && result.length>0) {
			// console.log('result.length: '+result.length);
			// dpd.users.put(userid, {"interests": {$pull:label}} );
			dpd.likes.del(result[0].id, function (err) {
				// if(err) console.log(err);
				if(err) d.reject(err); // return console.log(err);
				else {
					result[0].action="del";
					d.resolve(result[0]);
				}
			});
		}
		else {
			// console.log('result.length: '+result.length);
			// dpd.likes.put(userid, {"interests": {$push:label}} );
			dpd.likes.post({"userid":window.me.id,"objectid":query_vars.id}, function(result, err) {
				if(err) d.reject(err); // return console.log(err);
				// console.log(result, result.id);
				else {
					result.action="post";
					d.resolve(result);
				}
			});
		}
	});	
	// return(false);
	return d.promise();
}
function likeToogle(e) {
	e.preventDefault();
	var el = $(e.currentTarget);
	var query_vars = getQueryVarsFromElement($(e.currentTarget));
	// update database with my like...
	$.when( likeToogleupdatDB(e) ) .done(function(response){
		var changeValueBy = 0;
		if (response.action=="del") changeValueBy=-1;
		if (response.action=="post") changeValueBy=+1;
		el.toggleClass('likeLink');
		el.toggleClass('likeLinkActive');
		if (el.hasClass("likeLinkActive")) el.html('Empfohlen');
		else el.html('Empfehlen');
	}).fail(function(err) {
		doAlert( "Fehler: "+err, "Entschuldigung..." );
	}).always(function() {
		// nothing...
	});

	return(false);
}

function updateLikeCountFields(id,by) {
	var beforeCount = $('.linkCountLength[data-learningstreamid="'+id+'"]').html();
	var nowCount = parseInt(beforeCount)+(by);
	$('.linkCountLength[data-learningstreamid="'+id+'"]').html(nowCount);
	if (nowCount==0) $('.linkCountLength[data-learningstreamid="'+id+'"]').parent().parent().addClass('hidden');
	else if (nowCount>0) $('.linkCountLength[data-learningstreamid="'+id+'"]').parent().parent().removeClass('hidden');
}

function switchUserinterestInputClick(e) {
	e.preventDefault();
	if (window.heavyDebug) console.log("$(document).off('change','.switchUserinterestInput').on('change','.switchUserinterestInput',function(e){...");
	var status = e.currentTarget.checked;
	if (window.heavyDebug) console.log("status: "+status);
	var userid = e.currentTarget.getAttribute('data-userid');
	if (window.heavyDebug) console.log("userid: "+userid);
	var label = $.trim($("label[for='"+ e.currentTarget.id +"']").text());
	if (window.heavyDebug) console.log("label: "+label);
	dpd('users').get(userid, function(user, err) {
		var exists = $.inArray( label, user.interests );
		if (window.heavyDebug) console.log("exists: "+exists);
		if (status==true && exists==-1) dpd.users.put(userid, {"interests": {$push:label}} );
		else dpd.users.put(userid, {"interests": {$pull:label}} );
	});
	return(false);
}

function commentAreaToogle(e) {
	e.preventDefault();
	// $('.learningstreamCommentArea[data-learningstreamid="'+getQueryVarsFromElement($(e.currentTarget)).id+'"]').toggleClass('hidden');
	$('.learningstreamCommentArea[data-learningstreamid="'+getQueryVarsFromElement($(e.currentTarget)).id+'"]').toggleClass('hidden');
	return(false);	
}

function messageLinkClick(e) {
	var query_vars = getQueryVarsFromElement($(e.currentTarget));
	try {
		$($.mobile.activePage).find('.ui-content').scrollTo( $('.learningstreamSubheading[data-learningstreamid='+query_vars.id+']').prev().prev(), 200 );
	} catch(e) {
		// console.log(e);
		try {
			$($.mobile.activePage).find('.ui-content').scrollTo( $('.learningstreamSubheading[data-learningstreamid='+query_vars.id+']').prev(), 200 );
		} catch(e) {
			// console.log(e);
		}
	}	
	// $.mobile.activePage.find("a[data-role='button']").each(function() {
	setTimeout(function() {
		// only if commentArea is hidden
		// if ($('.learningstreamCommentArea[data-learningstreamid="'+getQueryVarsFromElement($(e.currentTarget)).id+'"]').toggle()) commentAreaToogle(e);
		if ($('.learningstreamCommentArea[data-learningstreamid="'+getQueryVarsFromElement($(e.currentTarget)).id+'"]').hasClass('hidden')) commentAreaToogle(e);
		$('.commentInput[data-learningstreamid="'+query_vars.id+'"]').focus();
	}, 500);

	// $($.mobile.activePage).find('.ui-content').scrollTo( '200px', 300 );
}

function loadDesktopSpecific() {
	fb_desktop_init();
}
function loadNativeSpecific() {
	try {
		// hide splash screen when app is loaded
		hideCordovaSplashScreen();
		preventScreenSleep();
		
		/*
		Keyboard.shrinkView(false);
		Keyboard.hideFormAccessoryBar(true);
		Keyboard.disableScrollingInShrinkView(true);
		Keyboard.onshowing = function () {
			// Describe your logic which will be run each time keyboard is shown.
			// console.log('showing keyboard');
		}
		*/
		
		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		cordova.plugins.Keyboard.disableScroll(true);
		
		// fb_mobile_init();
		fb_desktop_init();
		// FB.getLoginStatus(handleStatusChange);
		// authUser();
		// updateAuthElements();

		// currently disabled!!!
		// add a statusbar gap to the body header
		// only when apple mobile device detected
		// alert(window.hideStatusbar);
		if (window.iosShowStatusBar==true) iosModifyStatusBar();
		if (window.iosShowLoadingSpinner==true) activateNativeSpinnerPlugin.initialize();
		// Phonegap native loading spinner plugin
		// activateNativeSpinnerPlugin();
	} catch(e) {
		alert('could nor execute loadNativeSpecific: function()');
	}
}

function fb_desktop_init() {
	/*
	FB.init({
	  appId      : '294239994088506',
	  channelUrl : 'http://rneitzel.appinaut.de:8080/channel.php',
	  status	 : false, 
	  cookie	 : true,
	  oauth      : true,
	  xfbml 	 : true
	});
	*/
	 // Defaults to sessionStorage for storing the Facebook token
	// openFB.init({appId: '294239994088506'});
	//  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
	// openFB.init({appId: 'YOUR_FB_APP_ID', tokenStore: window.localStorage});
	openFB.init({appId:'294239994088506', tokenStore: window.localStorage});
	// openFB.init({appId: '294239994088506'});
	// OpenFB.init('294239994088506', 'http://rneitzel.appinaut.de/login_success.html', window.localStorage).
}
function sendFbLogin(e) {
	try {
		openFB.login(
		function(response) {
			if(response.status === 'connected') {
				// doAlert('Facebook login succeeded, got access token: ' + response.authResponse.token,'Information');
				/*
				email	"ulli.dude@hotmail.de"
				first_name	"Ulli"
				gender	"male"
				id	"679518902124099"
				last_name	"Dude"
				link	"https://www.facebook.com...ser_id/679518902124099/"
				locale	"de_DE"
				name	"Ulli Dude"
				timezone	2
				updated_time	"2014-07-13T22:44:55+0000"
				verified	true
				*/
				try {
					openFB.api({
						path: '/me',
						success: function(userData_facebook) {
							// console.log(JSON.stringify(userData_facebook));
							// console.log(userData_facebook);
							var randomId = getRandomID();
							if (randomId<=0) {
								doAlert('Error on getting random password...','Entschuldigung');
								return(false);
							}
							$.mobile.activePage.find('#username').val('fb_'+userData_facebook.id);
							$.mobile.activePage.find('#password').val(randomId);
							$.when( sendRegister(e) ) .done(function(response){
								if (window.heavyDebug) console.log('$.when( sendRegister(e) ) .done(function(){... >> ');
								if (window.heavyDebug) console.log(response);
								sendLoginClicked(e);
							}).fail(function(err) {
								doAlert( "Fehler: "+err, "Entschuldigung..." );
							}).always(function() {
							});
						},
						error: errorHandler
					});
				} catch(e) {
					console.log('could not get userdata via openFB.api({...');
					console.log(e);
				}
			}
		}, {scope: 'email'});
		// }, {scope: 'email,read_stream,publish_stream'});
	} catch(e) {
	// console.log(e);
	}
}

function collectUserArray_facebook(fb_userid) {
	var d = $.Deferred();
	openFB.api({
		path: '/'+fb_userid,
		success: function(data) {
			// document.getElementById("userName").innerHTML = data.name;
			// document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
			$.when( lao.save_local('user',data), dao.save_local('user',data) ).done(
				function( lao_result, dao_result ) {
					d.resolve(data);
					// d.resolve(_this.cardsArray);
					// if (window.heavyDebug) console.log('end deleteFlowClicked');
				}
			);
		},
		error: errorHandler
	});
	d.promise();
}

function populateUserData(fb_userid) {
	openFB.api({
		path: '/'+fb_userid,
		success: function(data) {
			// console.log(JSON.stringify(data));
			document.getElementById("userName").innerHTML = data.name;
			document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
		},
		error: errorHandler
	});
}

function share() {
	openFB.api({
		method: 'POST',
		path: '/me/feed',
		params: {
			message: document.getElementById('Message').value || 'Testing Facebook APIs'
		},
		success: function() {
			doAlert('the item was posted on Facebook','Information');
		},
		error: errorHandler
	});
}

function revokePermissions_facebook() {
	try {
		openFB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				// console.log('you are logged in...');
				openFB.revokePermissions(
					function() {
						doAlert('Permissions revoked','Information');
					},
					errorHandler
				);
			}
			else {
				doAlert('You are not logged in at Facebook','Information');
				/*
				openFB.login(
				function(response) {
					if(response.status === 'connected') {
					}
				});

				/*
				// FB.login();
				FB.login(function(){
					FB.api('/me/feed', 'post', {message: 'Hell yeah! I just started to use the APPinaut...'});
				}, {scope: 'email'});
				FB.login(
					 function(response) {
						 if (response.session) {
							alert('you are now logged in with session: '+response.session);
						 } else {
							alert('you are not logged in');
						 }
					 },
					 { scope: "email" }
				);
				*/
			}
		});
	} catch(e) {
		// not possible - probably not fb logged in...
	}
	/*
	try {
		openFB.revokePermissions(
			function() {
				doAlert('Permissions revoked','Information');
			},
			errorHandler
		);
	} catch(e) {
		// not possible - probably not fb logged in...
	}
	*/
}

function logout() {
	openFB.logout(
		function() {
			doAlert('Logout successful','Information');
		},
		errorHandler
	);
}

function errorHandler(error) {
	doAlert(error.message,'Entschuldigung');
}



/*
function fb_mobile_init() {
	FB.init({
		appId: '294239994088506',
		nativeInterface: CDV.FB,
		useCachedDialogs: false
	});
}

function promptLogin() {
	if(isNativeAppMode()) {
		FB.login(
		 function(response) {
			// console.log(response);
			 if (response.session) {
				alert('you are now logged in with session: '+response.session);
			 } else {
				alert('you are not logged in');
			 }
		});
	} else {
		document.location.href = "https://www.facebook.com/dialog/oauth?client_id=294239994088506&redirect_uri="+encodeURIComponent("http://rneitzel.appinaut.de/");
	}
	// FB.login(facebook_login, { scope: 'email' });
}


function facebook_login(response) {
	// console.log(response);
	alert(response);
    if (response.status === 'connected') {
        console.log('connected');
    }
    else if (response.status === 'not_authorized'  || response.status=='unknown') {
        // FB.login(facebook_login, { scope: 'email' });
    }
    else {
        // the user isn't logged in to Facebook.
        // FB.login(facebook_login, { scope: 'email' });
    }
}

function promptLogin_xxx() {
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			alert('you are already logged in...');
		}
		else {
			// FB.login();
			FB.login(function(){
				FB.api('/me/feed', 'post', {message: 'Hell yeah! I just started to use the APPinaut...'});
			}, {scope: 'email'});
			FB.login(
				 function(response) {
					 if (response.session) {
						alert('you are now logged in with session: '+response.session);
					 } else {
						alert('you are not logged in');
					 }
				 },
				 { scope: "email" }
			);
		}
	});
}
*/


function preventScreenSleep() {
	if (window.plugins.insomnia) {
		window.plugins.insomnia.keepAwake();
	}
}

function iosModifyStatusBar(){
	// if (window.device.version) alert('>> '+window.device.version);
	if (window.heavyDebug) console.log(isMobile.Apple());
	if (window.heavyDebug) console.log(isNativeAppMode());
	if (window.heavyDebug) console.log(window.device.version);
	if (window.heavyDebug) console.log(parseFloat(window.device.version));
	try {
		if (isMobile.Apple() && isNativeAppMode() && window.device.version && parseFloat(window.device.version) >= 6.0) {
			if (window.heavyDebug) console.log('adding iosModifyStatusBar() StatusBar Gap');
			correctPageFitIntoWindow();
			StatusBar.show();
			StatusBar.styleLightContent();
			// StatusBar.styleDefault();
			StatusBar.overlaysWebView(false);
			// StatusBar.backgroundColorByName("black");
			// StatusBar.backgroundColorByHexString("#3e8fd9");
			// window.plugin.statusbarOverlay.show();
		}
	} catch(e){ 
		catchError('iosModifyStatusBar()',e); 
	}
}

function correctPageFitIntoWindow() {
	$('#container').addClass('bodygapclass');
	$('#panel_left').addClass('bodygapclass');
	$('#panel_right').addClass('bodygapclass');
	// $('#body').css('width',$(window).width());
	// $('#container').css('width',$(window).width());
	// $('#body').css('width',$(window).width());
}

function forceLogin() {
	if (window.forceLoginId!=undefined && window.forceLoginId!="") {
		// if (window.heavyDebug) console.log('*********** FORCING LOGIN START ***********');
		var requestUrl = dpd_server+"users?active=true&deleted=false&id="+window.forceLoginId;
		alert('ATTENTION!!! Login hardcoded forced via: '+requestUrl);
		$.ajax({
			url: requestUrl,
			async: false
		}).done(function(userData) {
			// if (window.heavyDebug) console.log('log in forced via MobileRouter.js >> username '+userData.username);
			// if (window.heavyDebug) console.log(userData);
			$.when( lao.save_local('user',userData), dao.save_local('user',userData) ).done(
				function( lao_result, dao_result ) {
					window.me = userData;
					// d.resolve(data);
					// d.resolve(_this.cardsArray);
					// if (window.heavyDebug) console.log('end deleteFlowClicked');
				}
			);
		// if (window.heavyDebug) console.log('*********** FORCING LOGIN END ***********');
		}).fail(function(err) {
			doAlert(err,'Warning');
		});
	}
}

function filterCollection(filter,collection, attribute, value) {
	if (filter=='>') {
		var models = collection.select(function (model) {
			return model.get(attribute) > value;
		});
	}
	if (filter=='<') {
		var models = collection.select(function (model) {
			return model.get(attribute) < value;
		});
	}
	if (filter=='==') {
		var models = collection.select(function (model) {
			return model.get(attribute) == value;
		});
	}
	if (filter=='!=') {
		var models = collection.select(function (model) {
			return model.get(attribute) != value;
		});
	}
	if (filter=='has_role') {
		var models = collection.select(function (model) {
			return ($.inArray(value, model.get(attribute))=='-1' ? false : true);
		});
	}
	if (filter=='has_not_role') {
		var models = collection.select(function (model) {
			return ($.inArray(value, model.get(attribute))=='-1' ? true : false);
		});
	}
	return new collection.constructor(models);
}

function getCoinsFromProductId(productId) {
	var addcredits = "0";
	switch (productId) {
	  case "com.digitalverve.APPinaut.250APP359T4":
		addcredits = "250";
		break;
	  case "com.digitalverve.APPinaut.750APP799T9":
		addcredits = "750";
		break;
	  case "com.digitalverve.APPinaut.2500APP2499T28":
		addcredits = "2500";
		break;
	  case "com.digitalverve.APPinaut.6500APP4999T51":
		addcredits = "6500";
		break;
	  case "com.digitalverve.APPinaut.16000APP9999T60":
		addcredits = "16000";
		break;
	  case "com.digitalverve.APPinaut.25000APP17999T72":
		addcredits = "25000";
		break;
	  case "com.digitalverve.APPinaut.UPGPROVAPP269T3":
		addcredits = "0";
		break;
	  case "com.digitalverve.APPinaut.UPGPROVAPP1999T22":
		addcredits = "0";
		break;
	  default:
		break;
	}
	return(addcredits);
}

function updateCoins(productId) {
	// showModal();
	$.ajax(dpd_server+'users/?id='+window.me.id,{type:"GET",async:false}).done(function(me) {
		var newcredits = "0";
		var addcredits = "0";
		switch (productId) {
		  case "com.digitalverve.APPinaut.250APP359T4":
			addcredits = "250";
			// alert("Sie sind sehr bescheiden");
			break;
		  case "com.digitalverve.APPinaut.750APP799T9":
			addcredits = "750";
			// alert("Sie sind ein aufrichtiger Zweibeiner");
			break;
		  case "com.digitalverve.APPinaut.2500APP2499T28":
			addcredits = "2500";
			// alert("Sie haben ein Dreirad gewonnen");
			break;
		  case "com.digitalverve.APPinaut.6500APP4999T51":
			addcredits = "6500";
			// alert("Gehen Sie auf allen Vieren und werden Sie bescheidener");
			break;
		  case "com.digitalverve.APPinaut.16000APP9999T60":
			addcredits = "16000";
			// alert("Gehen Sie auf allen Vieren und werden Sie bescheidener");
			break;
		  case "com.digitalverve.APPinaut.25000APP17999T72":
			addcredits = "25000";
			// alert("Gehen Sie auf allen Vieren und werden Sie bescheidener");
			break;
		  case "com.digitalverve.APPinaut.UPGPROVAPP269T3":
			addcredits = "0";
			// alert("Gehen Sie auf allen Vieren und werden Sie bescheidener");
			break;
		  case "com.digitalverve.APPinaut.UPGPROVAPP1999T22":
			addcredits = "0";
			// alert("Gehen Sie auf allen Vieren und werden Sie bescheidener");
			break;
		  default:
			// doAlert("Der In-App Kauf konnte leiner nicht zugeordnet werden. Bitte wenden Sie sich an den Support.","Unbekannter Fehler");
			break;
		}
		if (parseInt(addcredits,0)>0) {
			newcredits = parseInt(me.credits,0) + parseInt(addcredits,0);
			// alert(addcredits);
			// if (window.heavyDebug) console.log(newcredits);
			// alert(newcredits);
			dpd.users.put(me.id, {"credits":""+newcredits}, function(result, err) {
				if(err) {
					hideModal();
					return console.log(err);
				}
				// if (window.heavyDebug) console.log(result, result.id);
				hideModal();
				doAlert('Vielen Dank. Sie haben nun ' + newcredits + ' APPinaut Coins.','Kauf erfolgreich');
				// window.location.reload();
				window._thisViewUserNested.initialize();
			});
			_me = me;
		}
		else {
			var newroles = ["user","provider","seeker"];
			// if (productId=="com.digitalverve.APPinaut.UPGPROVAPP269T3") {
			// }
			// else if {
			dpd.users.put(me.id, {roles: newroles}, function(result, err) { 
				if(err) {
					hideModal();
					return console.log(err);
				}
				// if (window.heavyDebug) console.log(result, result.id);
				window._thisViewUserNested.initialize();
				hideModal();
				doAlert('Sie sind nun APPinaut Anbieter und können allen Wissensdurstigen Ihr Material zur Verfügung stellen. Viel Erfolg!','Upgrade erfolgreich');
				// window.location.reload();
			});
			_me = me;
		}
	}).fail(function() {
		hideModal();
		doAlert( "Es ist leider ein Fehler passiert, der nicht passieren sollte.", "Entschuldigung..." );
	}).always(function() {
		// doAlert('You just purchased: ' + productId);
	});
}

function initStore() {
	window.storekit.init({
		debug: true, /* Because we like to see logs on the console */
		noAutoFinish: true,
		purchase: function (transactionId, productId) {
			showModal();
			// alert('start purchasing');
			storekit.finish(transactionId);
			storekit.loadReceipts(function (receipts) {
				// if (window.heavyDebug) console.log('Receipt for appStore = ' + receipts.appStoreReceipt);
				// if (window.heavyDebug) console.log('Receipt for ' + productId + ' = ' + receipts.forProduct(productId));
			});
			// if (window.heavyDebug) console.log('purchased: ' + productId);
			updateCoins(productId);
		},
		finish: function (transactionId, productId) {
			// alert('Finished transaction for ' + productId + ' : ' + transactionId);
			// alert('Finished transaction for ' + productId + ' : ' + transactionId);
		},
		restore: function (transactionId, productId) {
			// if (window.heavyDebug) console.log('restored: ' + productId);
			// alert('restored: ' + productId);
		},
		restoreCompleted: function () {
		   // if (window.heavyDebug) console.log('all restore complete');
		   // alert('all restore complete');
		},
		restoreFailed: function (errCode) {
			// if (window.heavyDebug) console.log('restore failed: ' + errCode);
			// alert('restore failed: ' + errCode);
		},
		error: function (errno, errtext) {
			// alert('Failed: ' + errtext);
			hideModal();
			// alert('Failed: ' + errtext);
		},
		ready: function () {
			var productIds = [
				"com.digitalverve.APPinaut.2500APP2499T28", 
				"com.digitalverve.APPinaut.250APP359T4", 
				"com.digitalverve.APPinaut.750APP799T9", 
				"com.digitalverve.APPinaut.6500APP4999T51", 
				"com.digitalverve.APPinaut.16000APP9999T60",
				"com.digitalverve.APPinaut.25000APP17999T72"
			];
			window.storekit.load(productIds, function(validProducts, invalidProductIds) {
				$.each(validProducts, function (i, val) {
					if (window.heavyDebug) console.log("id: " + val.id + " title: " + val.title + " val: " + val.description + " price: " + val.price);
				});
				if(invalidProductIds.length) {
					if (window.heavyDebug) console.log("Invalid Product IDs: " + JSON.stringify(invalidProductIds));
				}
			});			
			// Also check the receipts
			storekit.loadReceipts(function (receipts) {
				if (window.heavyDebug) console.log('appStoreReceipt:' + receipts.appStoreReceipt);
			});
		}
	});
}

function checkFileExists(fileName){
	// fileName = 'file:///cordova/frameworks/backbone/scripts/views/support/supportView.html';
	var http = new XMLHttpRequest();
	http.open('HEAD', fileName, false);
	http.send(null);
	return (http.status != 404);
}

function old_checkFileExists(fileUrl) {
	var xmlHttpReq = false;
	var self = this;
	// Mozilla/Safari
	if (window.XMLHttpRequest) {
		self.xmlHttpReq = new XMLHttpRequest();
	}
	// IE
	else if (window.ActiveXObject) {
		self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	}

	self.xmlHttpReq.open('HEAD', fileUrl, true);
	alert(fileUrl);
	self.xmlHttpReq.onreadystatechange = function() {
		if (self.xmlHttpReq.readyState == 4) {
			alert(self.xmlHttpReq.status);
			/*
			if (self.xmlHttpReq.status == 200) {
				// alert('the file exists');
			} else if (self.xmlHttpReq.status == 404) {
				// alert('the file does not exist');
			}
			*/
		}
	}
	self.xmlHttpReq.send();
}

function doAlert(message, title){
	try{
		var alertText = message;
		var alertTitle = title;
		if(isEmpty(alertTitle)==true) title = 'Default Native Message';
		if(isNativeAppMode()){
			navigator.notification.alert(
			alertText,  // message
			alertNativeError,         // callback
			alertTitle,            // title
			'OK'                  // buttonName
			);		
		}else{
			alert(alertTitle + "\n\n" + alertText);
		}
		report('VERBOSE','doAlert() --> [' + alertTitle + ' | ' + alertText);
		return false;		
	}catch(ex){
		catchError('doAlert()',ex);
	}	
	
}
function alertNativeError(e){
	return false;
}

function networkConnectionSwitched(conn) {
	alert('network connection toggled to: '+conn.type);
}

function isConnectedToInternet(){
	/*
	// not yet implemented, but a good idea for future developments...
	// simulate offline with querystring ?OFFLINE=1
	if(getURLParameter("OFFLINE") != ""){
		return "No network connection";	
	}else{
		return "wifi";	
	}
	*/
	if(isNativeAppMode()) return isConnectedToInternetNativeDevice();
	else return isConnectedToInternetDesktopDevice();
}
function isConnectedToInternetNativeDevice() {
	var connectionType = getConnectionType();
	// alert('connectionType: '+connectionType);
	// if (connectionType==undefined) return false
	if (window.heavyDebug) console.log('checking network connection for NATIVE');
	return (connectionType!=undefined && ((connectionType.toUpperCase().indexOf("NO NETWORK",0) == -1) && (connectionType.toUpperCase().indexOf("UNKNOWN",0) == -1)));
}
function isConnectedToInternetDesktopDevice() {
	if (window.heavyDebug) console.log('checking network connection for DESKTOP');
	return navigator.onLine;
}

function getConnectionType() {
	var networkState = navigator.connection.type; //navigator.network.connection.type;
	// alert('navigator.connection.type: '+networkState);
	var states = {};
	// states[Connection.cellular]  = 'Cellular connection (probably flight mode)';
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WIFI connection';
	states[Connection.wifi]     = 'wifi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.NONE]     = 'No network connection';
	if (navigator.connection.type=='CELLULAR' || navigator.connection.type=='cellular') var ret = 'CELLULAR connection';
	else var ret = states[networkState];
	return ret;
}


// NOTE: callback button index must be 1 (the first one)
function doConfirm(confirmText, confirmTitle, confirmCallback, confirmButtonLabels){
	try{
		if(typeof(confirmButtonLabels) == 'undefined') confirmButtonLabels = ('Ja,Nein').split(",");
		report('doConfirm() [confirmText:' + confirmText + ', confirmCallback:' + confirmCallback + ']');
		if(isNativeAppMode()){
		  //fadePageContentOutBeforePopup();
		   navigator.notification.confirm(
				confirmText,
				confirmCallback,
				confirmTitle,
				confirmButtonLabels          
			);	
			//fadePageContentInAfterPopup();
		}else{
			var confirmDecisionIndex = 2; // represents "false"
			if(confirm(confirmText)) confirmDecisionIndex = 1;
			confirmCallback(confirmDecisionIndex);
		}		
	}catch(ex){
		catchError('doConfirm()',ex);
	}	
}

function isIOSSimulatorMode(){
	var _isIOSSimulatorMode = false;; 
	try{
		if(!isMobile.any()) return false;
		var _platform = getDeviceType().toUpperCase();// device.name
		_isIOSSimulatorMode =(_platform.indexOf('SIMULATOR',0) > -1);		
	}catch(ex){
		catchError('isIOSSimulatorMode()',ex);
	}
	//if (window.heavyDebug) console.log('isIOSSimulatorMode(' + _isIOSSimulatorMode + ') platform:' +  device.name);
	return _isIOSSimulatorMode;	
}

function getDeviceID(){
	try{
		if(isNativeAppMode()==false){			
			// _id = device.uuid; uuid deprecated...
			
			// this only works if SecureDeviceIdentifier plugin is loaded into xcode/app
			var secureDeviceIdentifier = window.plugins.secureDeviceIdentifier;            
			/* DEBUG */ // doAlert('getDeviceID() [secureDeviceIdentifier:' + secureDeviceIdentifier + ']');
			
			secureDeviceIdentifier.get({
				domain: SDID_DOMAIN,
				key: SDID_KEY
			}, function(udid) {                
				/* DEBUG */ //   navigator.notification.alert("SecureUDID=" + udid);
				deviceSDID = udid;
				// navigator.notification.alert("SecureUDID=" + udid);
				// report('TEST','CORDOVA: DEVICE ID:' + deviceSDID);
				/* DEBUG */ //  alert(deviceSDID);
				return deviceSDID;
			})                        
			// report('TEST',"*** plugins.uniqueDeviceId.secureDeviceIdentifier() ID?:" + _id + "***");            	
			// report('TEST','WEB: DEVICE ID:' + deviceSDID);
		}else{
			deviceSDID = "UNKNOWN (" + getDeviceType() + ")";
		}
	}
	catch(e){
		report('ERROR','ERROR with getDeviceID() [' + e.message + ']');
	}
}

function getDeviceType(){
	var type;
	try{
		if(isNativeAppMode()==false){
			type = device.model; // "name" deprecated after CDV 2.3 name;  // iPhone, iPad, iPod Touch
		}else{
			 type = "WebBrowser";
		}
	}
	catch(e){
		report('VERBOSE','ERROR','ERROR with getDeviceType() [' + e.message + ']');
	}
	return type;
}

function getOSVersionFromUserAgent(){
	report('TEST','--> getOSVersionFromUserAgent()..');	
	try{
		var _parts1 = navigator.userAgent.split("(");
		var _parts2 = _parts1[1].split(";");

		return _parts2[0];												
	}catch(e){ catchError('getOSVersionFromUserAgent()',e); }			
}

function getOS(){
	var OSName="Unknown OS";
	if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
	if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
	if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
	if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";	
	if((navigator.appVersion.indexOf("Mobile")!=-1)) OSName += " Mobile";
	if(isNativeAppMode()==false){
		OSName = device.platform;
	}
	return OSName;	
}

function getDeviceVersion(){
	var version;
	// notworking?
	try{
		if(isNativeAppMode()==false){
			version = getOS() + ' ' + device.version; // "name" deprecated after CDV 2.3 name;  // iPhone, iPad, iPod Touch
		}else{
			 version = getOSVersionFromUserAgent();		 	 
		}
	}
	catch(e){
		report('VERBOSE','ERROR','ERROR with getDeviceVersion() [' + e.message + ']');
	}
			
	return version;
}

function getDeviceModel(){
	var model;
	try{
		if(isNativeAppMode()==false){
			model = device.model; // iPad 2,5			
		}else{
			model = getOS();
		}
	}
	catch(e){
		report('VERBOSE','ERROR','ERROR with getDeviceModel() [' + e.message + ']');
	}
	report('VERBOSE','DEVICE NAME:' + model);	
	return model; 
}

function getDevicePlatform(){
	var platform;
	try{
		if(isNativeAppMode()==false){
			if(isIOSSimulatorMode()){
				platform = "iOS Simulator";
			}else{
				platform = device.platform; // iPad, iPhone	
			}
			
		}else{
			platform = getDeviceType(); // WebBrowser likely
		}
	}
	catch(e){
		report('VERBOSE','ERROR','ERROR with getDevicePlatform() [' + e.message + ']');
	}
	report('VERBOSE','DEVICE NAME:' + platform);	
	return platform; 
}

function openExternalURL(url) {
	// openExternal(url, usePhoneGap);
	try {
		// window.plugins.ChildBrowser.openExternal(url);
		cordova.exec(nothing, nothing, "OpenUrl", "openUrl", url);
		// openExternal('http://www.google.com');
		// window.plugins.childBrowser.openExternal('http://www.google.com');
	} catch (e) {
		alert(e);
	}    
}

function openExternalURL_save1(strURL) {	
	if (!isMobile.any()) {
		doAlert('You are not mobile at the moment...','Ohh');
		return(false);
	}
	// https://itunes.apple.com/us/app/isitlead/id637464156?ls=1&mt=8
	try{
		if(!isConnectedToInternet()){
			doGenericConnectionAlert();
			return false;
		}
		// doAlert('openExternalURL(' + strURL + ')... MODE (TBD)...');
		// window.open(strURL, '_system'); //, 'location=yes');	
		if(
			((isIOSSimulatorMode()) || (!isMobile.any())) &&
			(strURL.toUpperCase().indexOf('ITUNES.APPLE.COM',0)>-1)
			){
			alert('App Store links do not work in web browsers or device simulators. Please try this feature on a mobile device to confirm it is working properly.','App Store Link');
			return false;
		}
		// inAppBrowser method --> window.open(strURL, '_system'); //, 'location=yes');
		 // ChildBrowser Method // /*cb = child browser cordova plugin*/
		 if(cb != null)
		 {
			if (window.heavyDebug) console.log('openExternalURL(' + strURL + ') [CORDOVA mode]..');
			 cb.onLocationChange = function(loc){ root.locChanged(loc); };
			 cb.onClose = function(){root.onCloseBrowser()};
			 cb.onOpenExternal = function(){root.onOpenExternal();};		
			 //if (window.heavyDebug) console.log(strURL);
			 // cb.showWebPage(strURL);
			 // window.plugins.childBrowser.showWebPage(strURL);
			 window.open(strURL,'_blank','location=no'); 
		 }else{
			 // if(            	
			 // 	(!isNativeAppMode()) && 
			 // 	(isMobile.any())
			 // 	){
			if (window.heavyDebug) console.log('openExternalURL(' + strURL + ') [TEST/BROWSER mode].. {isNativeAppMode:' + isNativeAppMode() + '| isMobile.any():' + isMobile.any() + '}');
			 if(confirm('HTML5 External URLs are not fully functional when viewing on the iOS Simulator - do you want to view the URL anyway?')){
				 document.location.href = strURL;
				 /* 20130716: window.open not working in CHrome??? */ // window.open(strURL,'_blank'); 
			 }else{
				return false;			
			 }		
			 //}                                   
		 }
	}catch(e){
		catchError('openExternalURL()...',e);
	}	
} 


/* ------------------------------------ */
function onCloseBrowser()
{    
	if (window.heavyDebug) console.log('onCloseBrowser()...');
	if(iTunesUpdateURLLoaded) iTunesUpdateURLLoaded = false;
}

/* ------------------------------------ */
function locChanged(loc) { if (window.heavyDebug) console.log('locChanged()...');   }
function onOpenExternal(){ if (window.heavyDebug) console.log('onOpenExternal()...'); }    

function clearTimeoutVar(tVar){
	try{
		if(typeof(tVar) != 'undefined'){
			window.clearTimeout(tVar);
		}											
	}catch(e){ catchError('clearTimeoutVar()',e); }					
}

function clearIntervalVar(iVar){
	try{
		if(typeof(iVar) != 'undefined'){
			window.clearInterval(iVar);
		}											
	}catch(e){ catchError('clearIntervalVar()',e); }					
}

/* ----------------------------------------------------------- /
	isDisabled(element)	
/ ----------------------------------------------------------- */
function isDisabled(element){
	report('VERBOSE','--> isDisabled()..');	
	try{
		return ($(element).hasClass('disabled'));
												
	}catch(e){ catchError('isDisabled()',e); }			
}

function hideKeyboard(){
	document.activeElement.blur();
	$("input").blur();
	$("body").focus();
};

function doGenericConnectionAlert(){
	doAlert('This feature requires an internet connection. Please connect this device to a WiFi or a 3G/4G network and try again.','Internet Connection Required');
}	




String.prototype.replaceAll = function(str1, str2, ignore){
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}


function sendEmail(strTo,strSubject,strBody){
	if(isEmpty(strTo)) return;
	if(isEmpty(strSubject)) strSubject = '';
	if(isEmpty(strBody)) strBody = '';
	//strBody += '------------------------' + getEncodedLineBreakChar(); // + '---- contacts ----' + getEncodedLineBreakChar() + emailContactsList;	
	if(emailComposerConfiguredInApp && isNativeAppMode()==false){
		var emailArgs = {
			toRecipients:strTo,
			subject:strSubject,
			body:strBody,
			isHTML:false
		};
		cordova.exec(null, null, "EmailComposer", "showEmailComposer", [emailArgs]);
	}else{
		document.location = "mailto:" + strTo + "?Subject=" + strSubject + "&Body=" + strBody;
	}
}

/***** Cordova Plugin: Prevent Auto Lock *****/
// PWpreventAutoLock
function PWpreventAutoLock(){
	if(isNativeAppMode()==false) report('TEST','--> PWpreventAutoLock()..'); 
	try{
		if(isNativeAppMode()==false) cordova.require('cordova/plugin/powermanagement').acquire( powerMgmtSuccess, powerMgmtError );                                                
	}catch(e){ catchError('PWpreventAutoLock()',e); }           
}
// PWpreventAutoLockButAllowDim
function PWpreventAutoLockButAllowDim(){
	if(isNativeAppMode()==false) report('TEST','--> PWpreventAutoLockButAllowDim()..');  
	try{
		if(isNativeAppMode()==false) cordova.require('cordova/plugin/powermanagement').dim( powerMgmtSuccess, powerMgmtError ); 
	}catch(e){ catchError('PWpreventAutoLockButAllowDim()',e); }            
}       
// PWreenableAutoLock
function PWreenableAutoLock(){
	if(isNativeAppMode()==false) report('TEST','--> PWreenableAutoLock()..');    
	try{
		if(isNativeAppMode()==false) cordova.require('cordova/plugin/powermanagement').release( powerMgmtSuccess, powerMgmtError ); 
	}catch(e){ catchError('PWreenableAutoLock()',e); }          
}      
function powerMgmtError(error){ report('ERROR','powerMgmtError() [error(' + error + ')]'); }
function powerMgmtSuccess(success){ report('TEST','powerMgmtSuccess() success: ' + powerMgmtSuccess + '...');}

function catchError(f,e){
	// report('ERROR','ERROR in (' + f + ')[Error Message: ' + e.message + ']');
	doAlert('ERROR','ERROR in (' + f + ')[Error Message: ' + e.message + ']');
}

/***** Cordova Function: hide splash screen *****/
function hideCordovaSplashScreen() {
	cordova.exec(null, null, 'SplashScreen', 'hide', []);
}

/***** CAMERA AND VIDEO FUNCTIONS *****/

function clearStatus() {
	document.getElementById('camera_status').innerHTML = '';
	document.getElementById('camera_image').src = 'about:blank';
	var canvas = document.getElementById('canvas');
	canvas.width = canvas.height = 1;
	pictureUrl = null;
	fileObj = null;
	fileEntry = null;
}

function log(value) {
	// if (window.heavyDebug) console.log(value + '\n');
	document.getElementById('camera_status').textContent += (new Date() - pageStartTime) / 1000 + ': ' + value + '\n';
}

function setPicture(url, callback) {
	try {
		window.atob(url);
		// if we got here it is a base64 string (DATA_URL)
		url = "data:image/jpeg;base64," + url;
	} catch (e) {
		// not DATA_URL
		log('URL: ' + url.slice(0, 100));
	}    

	pictureUrl = url;
	var img = document.getElementById('camera_image');
	var startTime = new Date();
	img.src = url;
	
	alert(url);
	
	/*
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
		alert("Root = " + fs.root.fullPath);
		log("Root = " + fs.root.fullPath);
		var directoryReader = fs.root.createReader();
		directoryReader.readEntries(function(entries) {
			var i;
			for (i=0; i<entries.length; i++) {
				log(entries[i].name);
			}
		}, function (error) {
			alert(error.code);
		})
	}, function (error) {
	alert(error.code);
	});
	*/

	if (isMobile.any()) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
			  imagePath = fs.root.fullPath + "/photoshot.jpg"; // full file path
			  var fileTransfer = new FileTransfer();
			  fileTransfer.download(url, imagePath, function (entry) {
				// alert(imagePath);
				alert(entry.fullPath); // entry is fileEntry object
				document.getElementById('camera_image_b').src = entry.fullPath;
			  }, function (error) {
				alert("Some error");
			  });
		});
	}

	img.onloadend = function() {
		log('Image tag load time: ' + (new Date() - startTime));
		callback && callback();
	};
}

function onGetPictureError(e) {
	log('Error getting picture: ' + e.code);
}

function getPicture() {
	// clearStatus();
	var options = extractOptions();
	log('Getting picture with options: ' + JSON.stringify(options));
	var popoverHandle = navigator.camera.getPicture(getPictureWin, onGetPictureError, options);

	// Reposition the popover if the orientation changes.
	window.onorientationchange = function() {
		var newPopoverOptions = new CameraPopoverOptions(0, 0, 100, 100, 0);
		popoverHandle.setPosition(newPopoverOptions);
	}
}

function getPictureWin(data) {
	setPicture(data);
	// TODO: Fix resolveLocalFileSystemURI to work with native-uri.
	if (pictureUrl.indexOf('file:') == 0) {
		resolveLocalFileSystemURI(data, function(e) {
			fileEntry = e;
			logCallback('resolveLocalFileSystemURI()', true)(e);
		}, logCallback('resolveLocalFileSystemURI()', false));
	} else if (pictureUrl.indexOf('data:image/jpeg;base64' == 0)) {
		// do nothing
	} else {
		var path = pictureUrl.replace(/^file:\/\/(localhost)?/, '').replace(/%20/g, ' ');
		fileEntry = new FileEntry('image_name.png', path);
	}
}

function mediaOnSuccess(data) {
	// nothing yet
}

function mediaOnError(error) {
	// $("#playMediaProperties").empty();
	// $("#playMediaProperties").append("ERROR: Cannot play audio. Code: " + error.code + " Message: " + error.message + "<br/>");
	// clearInterval(mediaTimer);
	// mediaTimer = null;        
	// my_media.release();
	// my_media = null;
	// if (window.heavyDebug) console.log("Error playbacking media");
}

function captureVideoRecord() {
	var options = { limit: 1, duration: 600, quality: 10 };
	// nur audio aufnehmen: navigator.device.capture.captureAudio
	var popoverHandle = navigator.device.capture.captureVideo(getVideoWin, onGetVideoError, options);
	window.onorientationchange = function() {
		var newPopoverOptions = new CameraPopoverOptions(0, 0, 100, 100, 0);
		popoverHandle.setPosition(newPopoverOptions);
	}
}

function purchaseVideoConfirm(me,videoData) {
	this._me = me;
	this._videoData = videoData;
	if (this._videoData.price>0) doConfirm('Möchten Sie dieses Video für ' + this._videoData.price + ' APPinaut Coins ansehen?', 'Video ansehen', function (event) { 
		if (event=="1") {
			purchaseVideoStart(me,videoData);
		}
	}, undefined);
	else purchaseVideoStart(me,videoData);
}

function purchaseVideoStart(me,videoData) {
	var creditsAfterPurchase = parseFloat(me.credits) - parseFloat(videoData.price);
	this._videoData = videoData;
	this._creditsAfterPurchase = creditsAfterPurchase;
	var data = new Object();
	data.credits = ''+creditsAfterPurchase;
	data.purchases = me.purchases;
	this._newData = data;
	this._me = me;
	$.ajax(dpd_server+'users/?id='+me.id,{type:"GET",async:false}).done(function(me) {
		_me = me;
		if (_me.purchases==undefined) _me.purchases = new Array();
	}).fail(function() {
		doAlert( "Es ist leider ein Fehler passiert, der nicht passieren sollte.", "Entschuldigung..." ); 
	}).always(function() {
	});
	if ($.inArray(videoData.id, _me.purchases) > -1) {
		doAlert('Sie haben dieses Video bereits gekauft.','Information');
	} else {
		if (_me.purchases==undefined) _me.purchases = new Array();
		me.purchases.push(videoData.id);
		$.ajax(dpd_server+'users/?id='+me.id,{
			type:"POST",
			contentType: "application/json",
			async: false,
			data: JSON.stringify({purchases:_newData.purchases,credits:creditsAfterPurchase})
		}).done(function(uploaderdata) {
			var alertmsg = 'Sie können das Video nun vollständig ansehen.';
			if (_videoData.price>0) alertmsg += ' Für weitere Käufe sind noch '+creditsAfterPurchase+' Credits verfügbar.';
			doAlert(alertmsg,'Information');
			addFollower(me, _videoData.uploader);
			addOrder(me,_videoData.id,_videoData.uploader,_videoData.price);
		}).fail(function() {
			// if (window.heavyDebug) console.log( "Es ist leider ein Fehler passiert, der nicht passieren sollte.", "Entschuldigung..." );
		}).always(function() {
			window.me.purchases = _newData.purchases;
			window._thisViewVideoDetails.render();
		});
	}
}

function addFollower(me, toid) {
	var query = { followers: {$in: [me.id]}, id:toid };
	dpd.users.get(query, function (result,err) {
		if(err) dpd.users.put(toid, {"followers": {$push:$.trim(me.id)}} );
	});
	var query = { following: {$in: [toid]}, id:me.id };
	dpd.users.get(query, function (result,err) {
		if(err) dpd.users.put(me.id, {"following": {$push:$.trim(toid)}} );
	});
}

function addVideoReport(me, videoid) {
	var query = { reportedby: {$in: [me.id]}, id:videoid };
	dpd.videos.get(query, function (result,err) {
		if(err) dpd.videos.put(videoid, {"reportedby": {$push:$.trim(me.id)}} );
	});
}

function addOrder(me,videoid,creatorid,price) {
	var cdate = dateYmdHis();
	dpd.orders.post({"userid":""+me.id,"videoid":""+videoid,"cdate":""+cdate,"creatorid":""+creatorid,"price":""+price}, function(result, err) {
		if(err) return console.log(err);
	});
}

function onGetVideoError(e) {
	// log('Error getting picture: ' + e.code);
	// alert('bla3');
	// if (window.heavyDebug) console.log('Video capture failed');
}

function getVideoWin(mediaFiles) {
	// if (window.heavyDebug) console.log('captureVideoRecord');
	// if (window.heavyDebug) console.log(mediaFiles);
	try {
		var i, path, len;
		for (i = 0, len = mediaFiles.length; i < len; i += 1) {
			// name: The name of the file, without path information. (DOMString)
			// fullPath: The full path of the file, including the name. (DOMString)
			// type: The file's mime type (DOMString)
			// lastModifiedDate: The date and time when the file was last modified. (Date)
			// size: The size of the file, in bytes. (Number)
			// mediaFiles[0].getFormatData(function(data) {
				// if(data.duration > 30) {
					// Tell the user the video is too long
				// } else {
					// Video is less than the max duration...all good
				// }
			// });
			// do something interesting with the file
			// captureVideoUpload(mediaFiles[i]);
			// log('video will now be played');
			// my_media = new Media(path, mediaOnSuccess, mediaOnError);
			// my_media.play();
			// var blax = JSON.stringify(mediaFiles);
			// alert(path);
			// doAlert('Klicken Sie zum Fortsetzen auf weiter.','Aufnahme erfolgreich');
			// doAlert(mediaFiles[i].fullPath,'DEBUG FULLPATH');
			mediaFiles[i].getFormatData(function(data) {
				// alert(data.duration);
				window.system.videolength = Math.ceil(data.duration);
				// alert(window.system.videolength);
			});
			
			attachVideoToPlayer(mediaFiles[i].fullPath);
			// _thisViewRecordVideoNested.switchPage();
			// alert('Bitte klicken Sie auf hochladen.');
		}
	} catch (e) {
		// not DATA_URL
		// log('mediaFiles: ' + mediaFiles.slice(0, 100));
	}    
	// if (window.heavyDebug) console.log('set video function end');
}

// TODO: File Transfer onProgress DOWNload
// http://www.raymondcamden.com/index.cfm/2013/5/1/Using-the-Progress-event-in-PhoneGap-file-transfers

function sendLocalStorageToElements(videoRecordLocalStorage) {
	// if (window.heavyDebug) console.log('************');
	var models = videoRecordLocalStorage;
	var keys = new Array();
	for(var key in models) {
	   keys[keys.length] = key;
	   var modelsattribute = models[key].attributes;
		for(var modelkey in modelsattribute) {
			if($('#'+modelkey).is("textarea")) {
				$('#'+modelkey).html(modelsattribute[modelkey]);
				// if (window.heavyDebug) console.log(modelkey+' >> '+modelsattribute[modelkey]);
			}
			else if($('#'+modelkey).is("select")) {
			/*
				// alert(modelkey + ' is a select');
				if (modelkey=='interest') {
					// $('#'+modelkey).val(modelsattribute[modelkey]);
					// if (window.heavyDebug) console.log(modelkey+' >> '+modelsattribute[modelkey]);
				}
				else {
					// $('#'+modelkey).val(modelsattribute[modelkey]);
					// if (window.heavyDebug) console.log(modelkey+' >> '+modelsattribute[modelkey]);
				}
			*/
			}
			else {
				$('#'+modelkey).val(modelsattribute[modelkey]);
				// if (window.heavyDebug) console.log(modelkey+' >> '+modelsattribute[modelkey]);
			}
		}
	}
	// if (window.heavyDebug) console.log('************');
}


function attachVideoToPlayer(mediaFilePath) {
	// var path = mediaFile.fullPath;
	// var path = mediaFilePath;
	// if (window.heavyDebug) console.log('attachVideoToPlayer: '+mediaFilePath);
	// alert('attachVideoToPlayer: '+mediaFilePath);
	var video_player = $('#video_player');
	// $("#video_player").attr("src", "file:///D:/cordova/Backbone-Require-Boilerplate-master/public_VIDEOS/testvideo.mp4").get(0).play();
	if (mediaFilePath==undefined) {
		// if (window.heavyDebug) console.log('hide');
		// $('#videobox').hide();
		return(false);
	}
	else {
		// if (window.heavyDebug) console.log('attaching to video player: ' + mediaFilePath);
		// alert('attaching to video player: ' + mediaFilePath);
		$('#camera_file').val(mediaFilePath);
	}
	if (mediaFilePath!='') {
		// if (window.heavyDebug) console.log('setting video player src');
		var startTime = new Date();
		// video_player.src = mediaFilePath;
		// video_player.attr("src", "file:///D:/cordova/Backbone-Require-Boilerplate-master/public_VIDEOS/testvideo.mp4").get(0).pause();
		video_player.attr("src", mediaFilePath).get(0).pause();
		video_player.onloadend = function() {
			// if (window.heavyDebug) console.log('Video load time: ' + (new Date() - startTime));
			// alert('Video load time: ' + (new Date() - startTime));
		};
	}
	/*
	if (mediaFilePath=='') {
		// if (window.heavyDebug) console.log('mediaFilePath empty','DEBUG');
		// $('#captureVideoUploadButton').button('disable');
		// $('#submitbutton').button('disable');
	}
	*/
}

// Upload files to server
function captureVideoUpload(videoRecordLocalStorage) {
	var _this = this;
	// alert('captureVideoUpload');
	// if (window.heavyDebug) console.log('^^');
	// if (window.heavyDebug) console.log(videoRecordLocalStorage);
	// if (window.heavyDebug) console.log('^^');
	// if (window.heavyDebug) console.log('^^^^^^^^^^^^');
	var models = videoRecordLocalStorage.models;
	var formValues = new Array();
	for(var key in models) {
	   // formValues[formValues.length] = key;
	   var modelsattribute = models[key].attributes;
	   // if (window.heavyDebug) console.log(modelsattribute);
		for(var modelkey in modelsattribute) {
			// if (window.heavyDebug) console.log(modelkey+' >> '+modelsattribute[modelkey]);
			formValues[modelkey] = modelsattribute[modelkey];
		}
	}
	var flipactivate = false;
	if (formValues.flipactivate=="on") flipactivate=true;
	var flippublic = false;
	if (formValues.flippublic=="on") flippublic=true;
	// alert("active"+flipactivate);
	// alert("public"+flippublic);
	// alert({"vsize":Math.ceil(r.bytesSent).toString(),"vlength":window.system.videolength.toString(),"uploader":""+_this._thisViewRecordVideoNested.me.id,"videourl":""+options.fileName,"active":flipactivate,"public":flippublic,"cdate":""+dateYmdHis(),"topic":""+formValues.interest,"title":""+formValues.title,"subtitle":""+formValues.subtitle,"description":""+formValues.description,"price":formValues.sliderprice});
	var mediaFile = formValues.camera_file;
	try {
		showModal();
		var ft = new FileTransfer();
		ft.onprogress = function(progressEvent) {
			// $('#uploadstatusbar').html(round((progressEvent.loaded/progressEvent.total)*10000)+' % (' + progressEvent.loaded + ' / ' + progressEvent.total + ')');
			// $('#uploadstatusbar').html(progressEvent.loaded + " / " + progressEvent.total);
			// $('#modaltxt').html( (Math.round((progressEvent.loaded / progressEvent.total) * 100)) + " %" );
			$('#modaltxt').html( progressEvent.loaded + " / " + progressEvent.total );
		};
		var options = new FileUploadOptions();
		// options.fileName = new Date().getTime();
		options.fileName = getRandomID();
		options.mimeType = "video/mp4";
		options.chunkedMode = false;
		ft.upload(mediaFile,
			// "http://management-consulting.marcel-durchholz.de/secure/upload.php",
			"http://prelaunch002.appinaut.de/secure/upload.php",
			function(r) {
				// if (window.heavyDebug) console.log("Code = " + r.responseCode);
				// if (window.heavyDebug) console.log("Response = " + r.response);
				// if (window.heavyDebug) console.log("Sent = " + r.bytesSent);
				// alert(r.bytesSent);
				// dpd.videos.post({"vsize":Math.ceil(r.bytesSent).toString(),"vlength":window.system.videolength.toString(),"uploader":""+_this._thisViewRecordVideoNested.me.id,"videourl":""+options.fileName,"active":true,"cdate":""+dateYmdHis(),"topic":""+formValues.interest,"title":""+formValues.title,"subtitle":""+formValues.subtitle,"description":""+formValues.description,"price":formValues.sliderprice}, function(result, err) {
				dpd.videos.post({"vsize":Math.ceil(r.bytesSent).toString(),"vlength":window.system.videolength.toString(),"uploader":""+_this._thisViewRecordVideoNested.me.id,"videourl":""+options.fileName,"active":formValues.flipactivate,"public":formValues.flippublic,"cdate":""+dateYmdHis(),"topic":""+formValues.interest,"title":""+formValues.title,"subtitle":""+formValues.subtitle,"description":""+formValues.description,"price":formValues.sliderprice}, function(result, err) {
					if(err) {
						hideModal();
						// doAlert('Es ist ein Fehler passiert, der nicht passieren sollte. Bitte versuchen Sie Ihre Aktion erneut oder wenden Sie sich direkt an das APPinaut Support Team.','Ups! Fehler beim Upload!');
						return console.log(err);
					}
					hideModal();
					// window.location.href = '#learningstreamview';
					window.location.href = '#videos/details/view/'+result.id;
				});
			},
			function(error) {
				// $.mobile.loading('hide');
				hideModal();
				// alert("An error has occurred: Code = " = error.code);
				// if (window.heavyDebug) console.log('Error uploading file ' + mediaFile + ': ' + error.code);
			},
			options
		);
	} catch (e) {
		// not DATA_URL
		// if (window.heavyDebug) console.log('class new FileTransfer not possible');
	}
	// if (window.heavyDebug) console.log('class captureVideoUpload ended');
}




function uploadImage() {
	var ft = new FileTransfer(),
	uploadcomplete=0,
	progress = 0,
	options = new FileUploadOptions();
	options.fileKey="photo";
	options.fileName='test.jpg';
	options.mimeType="image/jpeg";
	ft.onprogress = function(progressEvent) {
		log('progress: ' + progressEvent.loaded + ' of ' + progressEvent.total);
	};
	var server = "aaaaaaaaaaaahttp://cordova-filetransfer.jitsu.com";

	ft.upload(pictureUrl, server + '/upload', win, fail, options);
	function win(information_back){
		log('upload complete');
	}
	function fail(message) {
		log('upload failed: ' + JSON.stringify(message));
	}
}

function logCallback(apiName, success) {
	return function() {
		log('Call to ' + apiName + (success ? ' success: ' : ' failed: ') + JSON.stringify([].slice.call(arguments)));
	};
}

// Select image from library using a NATIVE_URI destination type
// This calls FileEntry.getMetadata, FileEntry.setMetadata, FileEntry.getParent, FileEntry.file, and FileReader.readAsDataURL.
function readFile() {
	function onFileReadAsDataURL(evt) {
		var img = document.getElementById('camera_image');
		img.style.visibility = "visible";
		img.style.display = "block";
		img.src = evt.target.result;
		log("FileReader.readAsDataURL success");
	};

	function onFileReceived(file) {
		log('Got file: ' + JSON.stringify(file));
		fileObj = file;

		var reader = new FileReader();
		reader.onload = function() {
			log('FileReader.readAsDataURL() - length = ' + reader.result.length);
		};
		reader.onerror = logCallback('FileReader.readAsDataURL', false);
		reader.readAsDataURL(file);
	};
	// Test out onFileReceived when the file object was set via a native <input> elements.
	if (fileObj) {
		onFileReceived(fileObj);
	} else {
		fileEntry.file(onFileReceived, logCallback('FileEntry.file', false));
	}
}
function getFileInfo() {
	// Test FileEntry API here.
	fileEntry.getMetadata(logCallback('FileEntry.getMetadata', true), logCallback('FileEntry.getMetadata', false));
	fileEntry.setMetadata(logCallback('FileEntry.setMetadata', true), logCallback('FileEntry.setMetadata', false), { "com.apple.MobileBackup": 1 });
	fileEntry.getParent(logCallback('FileEntry.getParent', true), logCallback('FileEntry.getParent', false));
	fileEntry.getParent(logCallback('FileEntry.getParent', true), logCallback('FileEntry.getParent', false));
};

// Copy image from library using a NATIVE_URI destination type
// This calls FileEntry.copyTo and FileEntry.moveTo.
function copyImage() {
	var onFileSystemReceived = function(fileSystem) {
		var destDirEntry = fileSystem.root;

		// Test FileEntry API here.
		fileEntry.copyTo(destDirEntry, 'copied_file.png', logCallback('FileEntry.copyTo', true), logCallback('FileEntry.copyTo', false));
		fileEntry.moveTo(destDirEntry, 'moved_file.png', logCallback('FileEntry.moveTo', true), logCallback('FileEntry.moveTo', false));
	};

	if (isMobile.any()) {
		window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, onFileSystemReceived, null);
	}
};

function extractOptions() {
	var els = document.querySelectorAll('#image-options select');
	var ret = {};
	for (var i = 0, el; el = els[i]; ++i) {
		var value = el.value;
		if (value === '') continue;
		if (el.isBool) {
			ret[el.keyName] = !!value;
		} else {
			ret[el.keyName] = +value;
		}
	}
	return ret;
}

function createOptionsEl(name, values, selectionDefault) {
	var container = document.createElement('div');
	container.style.display = 'inline-block';
	container.appendChild(document.createTextNode(name + ': '));
	var select = document.createElement('select');
	select.keyName = name;
	container.appendChild(select);
	
	// if we didn't get a default value, insert the blank <default> entry
	if (selectionDefault == undefined) {
		var opt = document.createElement('option');
		opt.value = '';
		opt.text = '<default>';
		select.appendChild(opt);
	}
	
	select.isBool = typeof values == 'boolean';
	if (select.isBool) {
		values = {'true': 1, 'false': 0};
	}
	
	for (var k in values) {
		var opt = document.createElement('option');
		opt.value = values[k];
		opt.textContent = k;
		if (selectionDefault) {
			if (selectionDefault[0] == k) {
				opt.selected = true;
			}
		}
		select.appendChild(opt);
	}
	var optionsDiv = document.getElementById('image-options');
	/*
	if (typeof (optionsDiv) != undefined && typeof (optionsDiv) != null && typeof (optionsDiv) != 'undefined') {
		// if (window.heavyDebug) console.log('optionsDiv exists');
	}
	else {
		//  create a new option div
		var optionsDivCreate = document.createElement('div');
		optionsDivCreate.id = 'image-options';
		document.body.appendChild(optionsDivCreate);
		// container.appendChild(optionsDivCreate);
		// if (window.heavyDebug) console.log('optionsDiv NOT exists');
	}
	*/
	optionsDiv.appendChild(container);
}

/**
 * parses and returns URI query parameters 
 * 
 * @param {string} param parm
 * @param {bool?} asArray if true, returns an array instead of a scalar 
 * @returns {Object|Array} 
 */
function getURIParameter(param, asArray) {
	return document.location.search.substring(1).split('&').reduce(function(p,c) {
		var parts = c.split('=', 2).map(function(param) { return decodeURIComponent(param); });
		if(parts.length == 0 || parts[0] != param) return (p instanceof Array) && !asArray ? null : p;
		return asArray ? p.concat(parts.concat(true)[1]) : parts.concat(true)[1];
	}, []);
}

function getTokens(val){
	var tokens = [];
	var query = "";
	var a = new Array();
	a = val.split("?");
	if (a[1]!=undefined) {
		query = a[1].split('&');
		$.each(query, function(i,value){    
			var token = value.split('=');   
			var key = decodeURIComponent(token[0]);     
			var data = decodeURIComponent(token[1]);
			tokens[key] = data;
		});
	}
	return tokens;
}
function checkYoutubeUrl(val) {
	var rval = new Object();
	rval.isyoutube = false;
	var tokens = getTokens(val);
	// if (window.heavyDebug) console.log(tokens);
	if (tokens.v!=undefined && tokens.v!="") {
		rval.isyoutube = true;
		rval.youtubeid = tokens.v;
	}
	else {
		rval = checkYoutubeEmbedUrl(val);
	}
	return rval;
}
function checkYoutubeEmbedUrl(val) {
	var rval = new Object();
	rval.isyoutube = false;
	var folders = val.split('/');
	var youtubeid = "";
	// if (window.heavyDebug) console.log('folders');
	// if (window.heavyDebug) console.log(folders);
	$.each(folders, function(i,value){
		value = value.split("?")[0];
		if (value=="embed" && folders[i+1].split("?")[0]!=undefined) {
			youtubeid = folders[i+1].split("?")[0];
			// alert(youtubeid);
			rval.isyoutube = true;
			rval.youtubeid = youtubeid;
			return(rval);
		}
		// var token = value.split('=');   
		// var key = decodeURIComponent(token[0]);     
		// var data = decodeURIComponent(token[1]);
		// tokens[key] = data;
		// if (window.heavyDebug) console.log(value);
	});
	/*
	if (tokens.v!=undefined && tokens.v!="") {
		rval.isyoutube = true;
		rval.youtubeid = tokens.v;
	}
	else {
		//  und nu... nix...
	}
	*/
	return rval;
}

function getQueryParams(qs) {
	qs = qs.split("+").join(" ");
	var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
	while (tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	}
	return params;
}

function resizeWideScreen(elementid) {
	// var elwidth = $(elementid).width();
	var elwidth = $(window).width();
	var elheight = elwidth/10*16;
	var maxheight = $(window).height() / 3;
	// var newheightwfactor = (window_width)*elfactor;
	if (elheight>maxheight) elheight = maxheight;
	$(elementid).css("width", elwidth);
	$(elementid).css("height", elheight);
}

function resizeElement(elementid) {
	// if (window.heavyDebug) console.log('resizeElement: '+elementid);
	// var thumbnail_width = this.$el.outerWidth();
	var elwidth = $(elementid).width();
	// if (window.heavyDebug) console.log(elwidth);
	var elheight = $(elementid).height();
	var elfactor = (elheight/elwidth);
	// if (window.heavyDebug) console.log(elfactor);
	var window_width = $(window).width();
	var window_height = $(window).height();
	var maxheight = $(window).height() / 5*2;
	// if (window.heavyDebug) console.log(window_width);
	// var remaining = window_width - Math.floor(window_width / 128)  * 128;
	var newwidthwborder = window_width;
	var newheightwfactor = (window_width)*elfactor;
	if (newheightwfactor>maxheight) newheightwfactor = maxheight;
	// if (window.heavyDebug) console.log(elfactor);
	// this.$el.css('right', remaining / 2);
	// if (window.heavyDebug) console.log('newwidthwborder '+newwidthwborder);
	$(elementid).css("width", newwidthwborder);
	$(elementid).css("height", newheightwfactor);
	// alert('jup');
};

function createVideoPreview(videoObj,videoId,videoUrl,showVideoLength) {
	_thisVideoId = videoId;
	// if (window.heavyDebug) console.log(videoId);
	// alert(videoUrl);
	_thisVideoUrl = videoUrl;
	// if (window.heavyDebug) console.log(videoUrl);
	for( vid in _V_.players ){ 
		// if (window.heavyDebug) console.log('>>> '+vid.toString()); 
		if(vid.toString() == "video_player_1") {
		   deleteJsObject(_V_.players[vid]);
		   // if (window.heavyDebug) console.log('deteleted');
		} 
	}
	var myvideoJS = videojs("video_player_1", { "controls": true, "autoplay": false, "preload": "off" }, function(){});
	var myPlayer = _V_("video_player_1");
	_V_("video_player_1").ready(function(){
		if (_thisVideoUrl.length <= 50) {
			myPlayer.src([
				{ type: "video/mp4", src: "http://prelaunch002.appinaut.de/secure/index.php?showvideo="+_thisVideoUrl+".mp4" },
				{ type: "video/webm", src: "http://prelaunch002.appinaut.de/secure/index.php?showvideo="+_thisVideoUrl+".webm" },
				{ type: "video/ogg", src: "http://prelaunch002.appinaut.de/secure/index.php?showvideo="+_thisVideoUrl+".ogv" }
			]);
		}
		else {
			myPlayer.src([
				{ type: "video/mp4", src: _thisVideoUrl },
				{ type: "video/webm", src: _thisVideoUrl },
				{ type: "video/ogg", src: _thisVideoUrl }
			]);
		}
		// if (window.heavyDebug) console.log(myPlayer);
		myPlayer.controlBar.hide();  
		myPlayer.bigPlayButton.hide();
		myPlayer.on('timeupdate', function() {
			if (myPlayer.currentTime() > showVideoLength) {
				if (showVideoLength!=0) {
					myPlayer.posterImage.hide();  
					myPlayer.currentTime(0);  
					myPlayer.pause();
					doAlert('Wenn Sie dieses Video kaufen, können Sie mehr als diese Vorschau sehen.','Sie finden das interesant?');
				}
			}
		});
		
	resizeElement('#video_player_1');
	});	
}

function clearIntervals() {
	if (window._thisViewCardStart) {
		_thisViewCardStart.answerCountdownLoopStop();
		_thisViewCardStart.answerCountdownButtonDelayStop();
	}
}

function sendAnonymRegister(e) {
	var randomId = getRandomID();
	if (randomId<=0) {
		return(false);
	}
	$.mobile.activePage.find('#username').val(randomId);
	$.mobile.activePage.find('#password').val(randomId);
	$.when( sendRegister(e) ) .done(function(response){
		if (window.heavyDebug) console.log('$.when( sendRegister(e) ) .done(function(){... >> ');
		if (window.heavyDebug) console.log(response);
		sendLoginClicked(e);
	}).fail(function(err) {
		doAlert( "Fehler: "+err, "Entschuldigung..." );
	}).always(function() {
		// window.me.purchases = _newData.purchases;
		// window._thisViewVideoDetails.render();
		// alert('always');
	});
}

function sendLoginClicked(e) {
	$.when( sendLogin(e) ) .done(function(userData){
		// if (window.heavyDebug) console.log('$.when( sendRegister(e) ) .done(function(){... >> ');
		$.when( lao.save_local('user',userData), dao.save_local('user',userData) ).done(
			function( lao_result, dao_result ) {
				window.me = userData;
				if (window.heavyDebug) console.log('******************************************** TEST ********************************************');
				if (window.heavyDebug) console.log(userData);
				if (window.heavyDebug) console.log(window);
				if (window.heavyDebug) console.log(window.me);
				if (window.heavyDebug) console.log('******************************************** TEST ********************************************');
				// window.system.uid = userData.uid;
				$.mobile.defaultPageTransition = window.loginPageTransition;
				window.MobileApp.myrouter.gotoRoute("#dashboard");
				// d.resolve(data);
				// d.resolve(_this.cardsArray);
				// if (window.heavyDebug) console.log('end deleteFlowClicked');
			}
		);
	}).fail(function(err) {
		doAlert(err,'Warning');
	});
}

function sendRegisterClicked(e) {
	$.when( sendRegister(e) ) .done(function(response){
		if (window.heavyDebug) console.log('$.when( sendRegister(e) ) .done(function(){... >> ');
		if (window.heavyDebug) console.log(response);
		sendLoginClicked(e);
	}).fail(function(err) {
		doAlert( "Fehler: "+err, "Entschuldigung..." );
	}).always(function() {
	});
}

function sendRegister(e) {
	var d = $.Deferred();
	var username = $.mobile.activePage.find('#username').val().toLowerCase();
	var password = $.mobile.activePage.find('#password').val();
	var sponsor = window.system.owner.id;
	var roles = ["user","seeker","wall","videos","cards"];
	if (username=='' || password=='') d.reject('Registrierung unvollständig! Bitte geben Sie zur Registrierung einen gültigen Benutzernamen / E-Mail-Adresse und Ihr gewünschtes Passwort ein.');
	if (checkString(username)!=true) d.reject('Ungültiger Benutzername! Bitte geben Sie einen gültigen Benutzernamen / E-Mail-Adresse ein.');
	/*
	var giftcode = $.mobile.activePage.find('#giftcodeInput').val().toLowerCase();
	giftcode = giftcode.replace('-','').toLowerCase();
	if (giftcode!='') {
		$.ajax({
			url: dpd_server+'users/?kdnr='+giftcode,
			async: false,
			success: function(sponsorObject, textStatus, XMLHttpRequest){
				sponsor = sponsorObject.id;
			},
			error:function (xhr, ajaxOptions, thrownError) { }
		});
	}
	*/
	if (isConnectedToInternet()==true) {
		dpd.users.post({username: username, password: password, fullname: 'anonym_'+username, active: true, messageble: true, sponsor: sponsor, roles: roles, registered: dateYmdHis(), credits: "0", interests:[], usergroups: [], purchases:[], followers:[], following:[], logincount:"0"}, function(user, err) {
			if (user==null || err) {
				// doAlert(err);
				d.reject('Fehler beim Senden der Registrierungsanfrage. Benutzername eventuell bereits vorhanden.');
			}
			else d.resolve(e);
		});
	} else {
		d.reject("Keine Internetverbindung! Die Registrierungsanfrage konnte nicht erfolgreich durchgeführt werden.");
	}
	return d.promise();
}

function sendLogin(e) {
	var d = $.Deferred();
	// if (window.heavyDebug) console.log(e);
	if (e.currentTarget.id=="sendLoginBtn_panel_right") {
		var username = $('#loginform_panel_right').find('#username').val().toLowerCase();
		var password = $('#loginform_panel_right').find('#password').val();
	} else {
		var username = $.mobile.activePage.find('#username').val().toLowerCase();
		var password = $.mobile.activePage.find('#password').val();
	}
	if (checkString(username)!=true || password=='') {
		$( "#panel_right" ).panel().panel( "close" );
		doAlert('Bitte überprüfen Sie die eingegebenen Daten.','Eingaben unvollständig oder nicht korrekt!');
		return(false);
	}
	
	$.when( do_login({username: username, password: password}) ) .done(function(loginResolvedObject){
		// if (window.heavyDebug) console.log('loginResolvedObject RESOLVED !!! <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
		// if (window.heavyDebug) console.log(loginResolvedObject);
		// PLDR_recursion(el);
		// implement forwarding HERE !!!
		// doAlert('do_login().done(...','yupp');
		$.when( getUserDataByLoginResolvedObject(loginResolvedObject) ) .done(function(userData){
			if (window.heavyDebug) console.log('$.when( getUserDataByLoginResolvedObject(loginResolvedObject) ) .done(function(userData){');
			d.resolve(userData);
		}).fail(function(err) {
			doAlert(err,'Warning');
		});
	}).fail(function(err) {
		doAlert(err,'Warning');
	});
	return d.promise();
}
	
function getUserDataByLoginResolvedObject(loginResolvedObject) {
	var d = $.Deferred();
	var query = { id: loginResolvedObject.uid };
	// dpd.users.me(function(me) {
	dpd.users.get(query, function (me,err) {
		if (err) d.reject(err);
		else d.resolve(me);
	});

	return d.promise();
}

function do_login(loginData) {
	var d = $.Deferred();
	// alert('isConnectedToInternet(): '+isConnectedToInternet());
	if (isConnectedToInternet()==true) {
		dpd.users.login(loginData, function(loginResolvedObject, loginResolvedError) {
			if (loginResolvedError) {
				$( "#panel_right" ).panel().panel( "close" );
				// doAlert('INNER: Eine Anmeldung mit diesen Zugangsdaten konnte nicht durchgeführt werden. Zur Registrierung klicken Sie auf "Neuen Zugang anlegen".','Fehler bei der Anmeldung!');
				d.reject('Fehler bei der Anmeldung! Eine Anmeldung mit diesen Zugangsdaten konnte nicht durchgeführt werden. Zur Registrierung klicken Sie auf "Neuen Zugang anlegen".');
			} else {
				if (loginResolvedObject==null) { 
					$( "#panel_right" ).panel().panel( "close" );
					// doAlert('INNER: Bitte versuchen Sie es erneut.','Fehler bei der Anmeldung!');
					d.reject('Fehler bei der Anmeldung! Bitte versuchen Sie es erneut.');
					// return(false);
				}
				else {
					/***** START: RAISE LOGINCOUNT *****/
					var query = { id: loginResolvedObject.uid };
					dpd.users.get(query, function (me,err) {
//					dpd.users.me(function(me) {
						// if (window.me.logincount==undefined) logincount=0;
						// var logincount = window.me.logincount+1;
						var logincount = me.logincount+1 || 1;
						dpd.users.put(me.id, {"logincount":logincount}, function(result, err) { 
							if (err) {
								if (window.heavyDebug) console.log('could not raise logincount by +1:');
								// if (window.heavyDebug) console.log(err);
							}
							else {
								if (window.heavyDebug) console.log('logincount raised by +1:');
								// if (window.heavyDebug) console.log(result);
							}								
						});
					});
					/***** ENDE: RAISE LOGINCOUNT *****/
					if (window.heavyDebug) console.log('resolving loginResolvedObject from do_login(loginData) >> ');
					// if (window.heavyDebug) console.log(loginResolvedObject);
					d.resolve(loginResolvedObject);
				}
			}
		});
	}
	else {
		d.reject('you do not have an internet connection :-/');
	}
	return d.promise();
}

function sendLogout(e) {
	dpd.users.logout(function(err) {
		if(err) console.log(err);
		window.me = new Object();
		$.mobile.defaultPageTransition = window.loginPageTransition;
		var href = "#login";
		window.MobileApp.myrouter.gotoRoute(href);
	});
}

$( document ).ajaxStart(function() {
	if (window.ajaxLoader==1) {
		$.mobile.loading('show');
	}
});
$( document ).ajaxStop(function() {
	// setTimeout(function() {
	// if (window.ajaxLoader==1) {
		$.mobile.loading( 'hide' );
	// }
		// Do something after 5 seconds
	// }, 1000);
});

function closeJqmPanels() {
	if ($( "#panel_left" )) $( "#panel_left" ).panel().panel( "close" );
	if ($( "#panel_right" )) $( "#panel_right" ).panel().panel( "close" );
}

function edit() {
	var elwidth = $("p").css('width')
	$("p:first").replaceWith("<textarea class='edit'>" + $("p:first").text() + "</textarea>")
	$(".edit").css("width", elwidth)
}

function saveUserValue(postObj) {
	// if (window.heavyDebug) console.log(postObj);
	var submitData = new Object();
	submitData[postObj.settings.postfield] = postObj.value;
	submitData['lastModified'] = dateYmdHis();
	var submitData = JSON.stringify(submitData);
	$.ajax(postObj.settings.posturl,{
		type:"POST",
		contentType: "application/json",
		async: false,
		data: submitData
	}).done(function(uploaderdata) {
	}).fail(function() {
		doAlert( "Es ist leider ein Fehler passiert, der nicht passieren sollte. Eventuell besteht gerade keine Internetverbindung.", "Entschuldigung..." );
	}).always(function() {
	});
}

function collectCardsArrayAjax(userid,owner) {
	var d = $.Deferred();
	var query = dpd_server+"cards?active=true&deleted=false&include=all";
	if (window.me.master==false && window.system.owner.master==false) query = query + "&uploader="+owner.id;
	// console.log(query);	
	$.ajax({url: query, async: false }).done(function(cardData) {
		d.resolve(cardData);
	});
	return d.promise();
}
function collectCardsArrayDpd(userid,owner) {
	var d = $.Deferred();
	var query = {active:true,deleted:false,include:['all']};
	if (window.me.master==false && window.system.owner.master==false) query.uploader = owner.id;
	// console.log(query);
	dpd.cards.get(query, function (cardData) {
		d.resolve(cardData);
	});
	return d.promise();
}
function collectCardsArray(userid) {
	var _this = this;
	var d = $.Deferred();
	_this.cardsArray = new Array();
	var cards = lao.get_local('cards');
	if (cards!=undefined) {
		_this.cardsArray = cards;
		d.resolve(_this.cardsArray);
	} else {
	
		$.when( getOwnerData(window.system.owner.kdnr) ).done(
			function( owner ) {

				/*
				var requestUrl = dpd_server+"cards?active=true&deleted=false&include=likes";
				if (window.me.master==false && window.system.owner.master==false) requestUrl = requestUrl + "&uploader="+owner.id;
				// console.log(requestUrl);
				// alert(requestUrl);
				$.ajax({
					url: requestUrl,
					async: false
				}).done(function(cardData) {
				*/
				// $.when( collectCardsArrayDpd(userid,owner) ).done( function( videoData ) {
				$.when( collectCardsArrayAjax(userid,owner) ).done( function( cardData ) {
					_this.cardsArray = cardData;
					
					/*
					_this.uploaderArray = new Array();
					_.each(cardData, function(value, index, list) {
						// var exists = $.inArray( value.topic, window.me.interests );
						// if (window.me.interests.length==0) exists=1;
						// if (value.cardgroups == undefined) value.cardgroups = new Array();
						// if (window.me.cardgroups == undefined) window.me.cardgroups = new Array();
						// if (value.cardgroups.length>0) {
							// exists=0;
							// $.each( value.cardgroups, function( key, role ) {
								// $.each( window.me.cardgroups, function( keyme, valueme ) {
									// if (role==valueme) {
										// exists=1;
										// return(false);
									// }
								// });
							// });
						// }
						
						var exists = 1;
						// alert(value.uploader+'=?='+window.me.id);
						// if (value.uploader == window.me.id) exists=1;
						if (exists>0) if (value.uploader == undefined || value.uploader == "") exists=0;
						if (exists>0) {
							value.ccat = 'card';
							value.icon = 'images/icon-cards-60.png';
							value.href = '#admin/cards/details/'+value.id;					
							var uploader = value.uploader;
							var queryurl = dpd_server+'users/?id='+uploader;
							// console.log(queryurl);
							if (_this.uploaderArray[uploader]==undefined) {
								$.ajax({
									url: queryurl,
									async: false,
									success: function(data, textStatus, XMLHttpRequest) {
										value.uploaderdata = data;
										// console.log(value.uploaderdata);
										_this.uploaderArray[data.id] = new Object();
										_this.uploaderArray[data.id] = data;
									},
									error:function (xhr, ajaxOptions, thrownError) {
										// console.log(xhr.responseText);
									}
								});
							}
							else {
								value.uploaderdata = _this.uploaderArray[uploader];
							}
							if ((window.system.master==true && value['public']==true) || window.system.master==false) { 
								_this.cardsArray.push(value);
							}
						}
							
					});
					*/
					// first sort by title
					_this.cardsArray.sort(function(a, b){
					 var nameA=a.title.toLowerCase(), nameB=b.title.toLowerCase()
					 if (nameA < nameB) //sort string ascending
					  return -1 
					 if (nameA > nameB)
					  return 1
					 return 0 
					});
					// then sort by topic
					_this.cardsArray.sort(function(a, b){
					 var nameA=a.topic.toLowerCase(), nameB=b.topic.toLowerCase()
					 if (nameA < nameB) //sort string ascending
					  return -1 
					 if (nameA > nameB)
					  return 1
					 return 0
					});
					$.when( lao.save_local('cards',_this.cardsArray), dao.save_local('cards',_this.cardsArray) ).done(
						function( lao_result, dao_result ) {
							d.resolve(_this.cardsArray);
							// if (window.heavyDebug) console.log('end deleteFlowClicked');
						}
					);
				});
			}
		);
	}
	// return(_this.cardsArray);
	return d.promise();
}

function collectVideosArrayAjax(userid,owner) {
	var d = $.Deferred();
	var query = dpd_server+"videos?active=true&deleted=false&include=all";
	if (window.me.master==false && window.system.owner.master==false) query = query + "&uploader="+owner.id;
	// console.log(query);	
	$.ajax({url: query, async: false }).done(function(videoData) {
		d.resolve(videoData);
	});
	return d.promise();
}
function collectVideosArrayDpd(userid,owner) {
	var d = $.Deferred();
	var query = {active:true,deleted:false,include:['all']};
	if (window.me.master==false && window.system.owner.master==false) query.uploader = owner.id;
	// console.log(query);
	dpd.videos.get(query, function (videoData) {
		d.resolve(videoData);
	});
	return d.promise();
}
function collectVideosArray(userid) {
	var _this = this;
	var d = $.Deferred();
	_this.videosArray = new Array();
	var videos = lao.get_local('videos');
	if (videos!=undefined) {
		_this.videosArray = videos;
		d.resolve(_this.videosArray);
	} else {
	
		$.when( getOwnerData(window.system.owner.kdnr) ).done(
			function( owner ) {

				// $.when( collectVideosArrayDpd(userid,owner) ).done( function( videoData ) {
				$.when( collectVideosArrayAjax(userid,owner) ).done( function( videoData ) {
					_this.videosArray = videoData;
					/*
					_this.uploaderArray = new Array();
					_.each(videoData, function(value, index, list) {
						// var exists = $.inArray( value.topic, window.me.interests );
						// if (window.me.interests.length==0) exists=1;
						// if (value.videogroups == undefined) value.videogroups = new Array();
						// if (window.me.videogroups == undefined) window.me.videogroups = new Array();
						// if (value.videogroups.length>0) {
							// exists=0;
							// $.each( value.videogroups, function( key, role ) {
								// $.each( window.me.videogroups, function( keyme, valueme ) {
									// if (role==valueme) {
										// exists=1;
										// return(false);
									// }
								// });
							// });
						// }
						
						var exists = 1;
						// alert(value.uploader+'=?='+window.me.id);
						// if (value.uploader == window.me.id) exists=1;
						if (exists>0) if (value.uploader == undefined || value.uploader == "" || value.uploaderdata == undefined) exists=0;
						if (exists>0) {
							value.ccat = 'video';
							value.icon = 'images/icon-multimedia-60.png';
							value.href = '#admin/videos/details/'+value.id;
							var uploader = value.uploader;
							var queryurl = dpd_server+'users/?id='+uploader;
							// console.log(queryurl);
							if (_this.uploaderArray[uploader]==undefined) {
								$.ajax({
									url: queryurl,
									async: false,
									success: function(data, textStatus, XMLHttpRequest) {
										value.uploaderdata = data;
										// console.log(value.uploaderdata);
										_this.uploaderArray[data.id] = new Object();
										_this.uploaderArray[data.id] = data;
									},
									error:function (xhr, ajaxOptions, thrownError) {
										// console.log(xhr.responseText);
									}
								});
							}
							else {
								value.uploaderdata = _this.uploaderArray[uploader];
							}
							if ((window.system.master==true && value['public']==true) || window.system.master==false) { 
								_this.videosArray.push(value);
							}
						}						
						
					});
					*/
					// first sort by title
					_this.videosArray.sort(function(a, b){
					 var nameA=a.title.toLowerCase(), nameB=b.title.toLowerCase()
					 if (nameA < nameB) //sort string ascending
					  return -1 
					 if (nameA > nameB)
					  return 1
					 return 0 
					});
					// then sort by topic
					_this.videosArray.sort(function(a, b){
					 var nameA=a.topic.toLowerCase(), nameB=b.topic.toLowerCase()
					 if (nameA < nameB) //sort string ascending
					  return -1 
					 if (nameA > nameB)
					  return 1
					 return 0
					});
					$.when( lao.save_local('videos',_this.videosArray), dao.save_local('videos',_this.videosArray) ).done(
						function( lao_result, dao_result ) {
							d.resolve(_this.videosArray);
							// if (window.heavyDebug) console.log('end deleteFlowClicked');
						}
					);
				});
			}
		);
	}
	// return(_this.videosArray);
	return d.promise();
}

function collectMessagesArrayAjax(userid) {
	var d = $.Deferred();
	var query = dpd_server+"messages?active=true&deleted=false&include=all";
	// console.log(query);	
	$.ajax({url: query, async: false }).done(function(messageData) {
		d.resolve(messageData);
	});
	return d.promise();
}
function collectMessagesArrayDpd(userid) {
	var d = $.Deferred();
	var query = { $sort : { cdate : -1 } , $or:[ {"sender":userid} , {"receiver":userid} ] , deleted:false , includeall:true , me:window.me };
	dpd.messages.get(query, function (messageData) {
		d.resolve(messageData);
	});
	return d.promise();
}
function collectMessagesArray(userid) {
	var _this = this;
	var d = $.Deferred();
	_this.messagesArray = new Array();
	var messages = lao.get_local('messages');
	if (messages!=undefined) {
		_this.messagesArray = messages;
		d.resolve(_this.messagesArray);
	} else {
		// $.when( collectMessagesArrayAjax(userid) ).done( function( messageData ) {
		$.when( collectMessagesArrayDpd(userid) ).done( function( messageData ) {
			_this.messagesArray = messageData;
			// sort by arrayhash
			_this.messagesArray.sort(function(a, b){
			 var nameA=a.cdate, nameB=b.cdate
			 if (nameA > nameB) //sort cdate descending
			  return -1 
			 if (nameA < nameB)
			  return 1
			 return 0 
			});
			_this.messagesArray = _.groupBy(_this.messagesArray, function(currentObject) {
				return currentObject.arrayhash;
			});
			// console.log('B');
			// console.log(_this.messagesArray);
			$.when( lao.save_local('messages',_this.messagesArray), dao.save_local('messages',_this.messagesArray) ).done(
				function( lao_result, dao_result ) {
					// console.log('C');
					// console.log(_this.messagesArray);
					d.resolve(_this.messagesArray);
					// if (window.heavyDebug) console.log('end deleteFlowClicked');
				}
			);
		});
	}
	return d.promise();
}

function collectMessageArrayAjax(messageid) {
	/*
	var d = $.Deferred();
	var query = dpd_server+"messages?active=true&deleted=false&include=all";
	if (window.me.master==false && window.system.owner.master==false) query = query + "&uploader="+owner.id;
	// console.log(query);	
	$.ajax({url: query, async: false }).done(function(messageData) {
		d.resolve(messageData);
	});
	return d.promise();
	*/
}
function collectMessageArrayDpd(messageid) {
	var d = $.Deferred();
	// var query = { $sort : { cdate : -1 } , $or:[ {"sender":messageid} , {"receiver":messageid} ] , deleted:false , include:['all'] , $limit:10 };
	// var query = { $sort : { cdate : -1 } , $or:[ {"sender":userid} , {"receiver":userid} ] , deleted:false , includeall:true };
	// console.log('collecting now for '+messageid);
	// var query = { id:messageid , $sort : { cdate : 1 } , deleted:false , includeall:true , $limitRecursion: 99999};
	// var query = {id:messageid,$or:[{"sender":messageid},{"receiver":messageid}],deleted:false};
	// console.log(query);
	dpd.messages.get( {id:messageid,messageflow:true,deleted:false,includeall:true,markreadby:true,me:window.me} , function (messageData) {
		// console.log('messageData');
		// console.log(messageData);
		d.resolve(messageData);
	});
	return d.promise();
}
function collectMessageArray(messageid) {
	var _this = this;
	var d = $.Deferred();
	_this.messageArray = new Array();
	var message = lao.get_local('message');
	if (message!=undefined) {
		_this.messageArray = message;
		d.resolve(_this.messageArray);
	} else {
		// $.when( collectMessageArrayAjax(messageid) ).done( function( messageData ) {
		$.when( collectMessageArrayDpd(messageid) ).done( function( messageData ) {
			_this.messageArray = [messageData];
			var collectArray = [];
			var checkObj = _this.messageArray[0];
			do {
				var childrenFound = false;
				if (checkObj) {
					collectArray.push(checkObj);
					if (checkObj.messageArray && checkObj.messageArray.length) {
						checkObj = checkObj.messageArray[0];
						var childrenFound = true;
					}
				}
			} while ( childrenFound==true );
			_this.messageArray = collectArray.reverse();
			
			// sort by cdate
			_this.messageArray.sort(function(a, b){
			 var nameA=a.cdate, nameB=b.cdate
			 if (nameA < nameB) //sort cdate ascending
			  return -1 
			 if (nameA > nameB)
			  return 1
			 return 0 
			});
			$.when( lao.save_local('message',_this.messageArray), dao.save_local('message',_this.messageArray) ).done(
				function( lao_result, dao_result ) {
					d.resolve(_this.messageArray);
					// if (window.heavyDebug) console.log('end deleteFlowClicked');
				}
			);
		});
	}
	return d.promise();
}

function collectLearningstreamArray(userid) {
	var _this = this;
	var d = $.Deferred();
	_this.learningstreamArray = new Array();
	var learningstream = lao.get_local('learningstream');
	if (learningstream!=undefined) {
		_this.learningstreamArray = learningstream;
		d.resolve(_this.learningstreamArray);
	} else {
		$.when( collectVideosArray(window.system.owner.kdnr) , collectCardsArray(window.system.owner.kdnr) ).done(
			function( videosArray, cardsArray ) {
				_this.learningstreamArray = $.merge( $.merge( [], videosArray ), cardsArray );
				// sort by cdate
				_this.learningstreamArray.sort(function(a, b){
				 var nameA=a.cdate, nameB=b.cdate
				 if (nameA > nameB) //sort string descending
				  return -1 
				 if (nameA < nameB)
				  return 1
				 return 0 
				});
				$.when( lao.save_local('learningstream',_this.learningstreamArray), dao.save_local('learningstream',_this.learningstreamArray) ).done(
					function( lao_result, dao_result ) {
						d.resolve(_this.learningstreamArray);
					}
				);
			}
		);
	}
	return d.promise();
}





function checkMyId(element){
	// console.log(element.userid);
	// console.log(window.me.id);
	// console.log(element.userid == window.me.id);
	return element.userid == window.me.id;
}

function collectUsersArray(userid) {
	var _this = this;
	// var _el = el;
	var d = $.Deferred();
	_this.usersArray = new Array();
	var users = lao.get_local('users');
	if (users!=undefined) {
		_this.usersArray = users;
		d.resolve(_this.usersArray);
	} else {
		// var user_id = $(_el).attr('data-userid');
		var requestUrl = dpd_server+"users?active=true&deleted=false";
		if (window.me.master!=true) requestUrl = requestUrl + "&sponsor="+userid;
		// if (window.heavyDebug) console.log(requestUrl);
		$.ajax({
			url: requestUrl,
			async: false
		}).done(function(userData) {
			// if (window.heavyDebug) console.log(userData);
			_this.sponsorArray = new Array();
			_.each(userData, function(value, index, list) {
				/*
				var exists = $.inArray( value.topic, window.me.interests );
				if (window.me.interests.length==0) exists=1;
				if (value.usergroups == undefined) value.usergroups = new Array();
				if (window.me.usergroups == undefined) window.me.usergroups = new Array();
				if (value.usergroups.length>0) {
					exists=0;
					$.each( value.usergroups, function( key, role ) {
						$.each( window.me.usergroups, function( keyme, valueme ) {
							if (role==valueme) {
								exists=1;
								return(false);
							}
						});
					});
				}
				*/
				var exists = 1;
				// alert(value.sponsor+'=?='+window.me.id);
				// if (value.sponsor == window.me.id) exists=1;
				if (exists>0) {
					if (value.sponsor == undefined || value.sponsor == "") exists=0;
				}
				
				if (exists>0) {
					value.ccat = 'user';
					value.icon = 'images/icon-multimedia-60.png';
					value.href = '#admin/users/details/'+value.id;					
					var sponsor = value.sponsor;
					var queryurl = dpd_server+'users/?id='+sponsor;
					if (_this.sponsorArray[sponsor]==undefined) {
						$.ajax({
							url: queryurl,
							async: false,
							success: function(data, textStatus, XMLHttpRequest) {
								value.sponsordata = data;
								_this.sponsorArray[data.id] = new Object();
								_this.sponsorArray[data.id] = data;
							},
							error:function (xhr, ajaxOptions, thrownError) {
								// if (window.heavyDebug) console.log(xhr.responseText);
							}
						});
					}
					else {
						value.sponsordata = _this.sponsorArray[sponsor];
					}
					if ((window.system.master==true && value['public']==true) || window.system.master==false) { 
						_this.usersArray.push(value);
					}
				}
			});
			_this.usersArray.sort(function(a, b){
			 var nameA=a.fullname.toLowerCase(), nameB=b.fullname.toLowerCase()
			 if (nameA < nameB) //sort string ascending
			  return -1 
			 if (nameA > nameB)
			  return 1
			 return 0 //default return value (no sorting)
			});
			$.when( lao.save_local('users',_this.usersArray), dao.save_local('users',_this.usersArray) ).done(
				function( lao_result, dao_result ) {
					d.resolve(_this.usersArray);
					// if (window.heavyDebug) console.log('end deleteFlowClicked');
				}
			);
		});
	}
	// return(_this.usersArray);
	return d.promise();
}

function collectUserData(userid) {
	var _this = this;
	var d = $.Deferred();
	_this.interestsArray = new Array();
	// alert('collectUserData('+userid+')');
	$.when( collectInterestsData() ).done(
		function( interests ) {
			// alert('$.when( collectInterestsData() ).done(...');
			if (interests == undefined) interests=[];
			_this.interestsArray = interests;
			// if (window.heavyDebug) console.log('_this.interestsArray');
			// if (window.heavyDebug) console.log(_this.interestsArray);
			// d.resolve(_this.userArray);
			// if (window.heavyDebug) console.log('end deleteFlowClicked');
			_this.userArray = new Array();
			var user = lao.get_local('user');
			if (user!=undefined) {
				_this.userArray = user;
				d.resolve(_this.userArray);
			}
			else {
				var requestUrl = dpd_server+"users?deleted=false&id="+userid;
				// if (window.system.master!=true && window.me.id!=window.system.owner.id && window.me.master != true) requestUrl = requestUrl + "&sponsor="+window.system.owner.id;
				if (window.heavyDebug) console.log('requestUrl: '+requestUrl);
				/*
				//// if (window.system.master!=true && window.me.id!=window.system.owner.id) requestUrl = requestUrl + "&sponsor="+window.system.owner.id;
				// if (window.me.id!=window.system.owner.id || window.me.master!=true) requestUrl = requestUrl + "&sponsor="+window.system.owner.id;
				alert('window.me.id: '+window.me.id);
				alert('window.me.master: '+window.me.master);
				alert('window.system.master: '+window.system.master);
				*/
				$.ajax({
					url: requestUrl,
					async: false
				}).done(function(result) {
					var userData = new Object();
					userData.mydata = result;
					_.each(userData, function(user, index, list) {
						var comparedInterests = new Array();
						var isel = 0;
						$.each( _this.interestsArray, function( key, obj ) {
							var isel = $.inArray( obj.name, user.interests );
							if (isel>-1) obj.sel = true;
							_this.interestsArray[key] = obj;
						});
						var exists = 1;
						if (exists>-1 || user.sponsor == window.me.id) {
							user.ccat = 'user';
							user.icon = 'images/icon-multimedia-60.png';
							user.href = '#users/details/view/'+user.id;
							var sponsor = user.sponsor;
							$.ajax({
								url: dpd_server+'users/?id='+sponsor,
								async: true,
								success: function(data) {
									user.sponsordata = data;
									user.compared_interests = _this.interestsArray;
									_this.userArray = user;
									/*
									$.when( lao.save_local('user',_this.userArray) ).done(
										function( lao_result ) {
											d.resolve(_this.userArray);
											// if (window.heavyDebug) console.log('end deleteFlowClicked');
										}
									);
									*/
									$.when( lao.save_local('user',_this.userArray), dao.save_local('user',_this.userArray) ).done(
										function( lao_result, dao_result ) {
											if (window.heavyDebug) console.log('user cached in local.storage and evtl. saved offline offline db');
											d.resolve(_this.userArray);
										}
									);
								},
								error:function (xhr, ajaxOptions, thrownError) {
									if (window.heavyDebug) console.log(xhr.responseText);
								}
							});
						}
					});
				});
			}
			
		}
	);
	return d.promise();
}

function collectUserdetailsData(userid) {
	var _this = this;
	var d = $.Deferred();
	_this.interestsArray = new Array();
	$.when( collectInterestsData() ).done(
		function( interests ) {
			// alert('$.when( collectInterestsData() ).done(...');
			if (interests == undefined) interests=[];
			_this.interestsArray = interests;
			// if (window.heavyDebug) console.log('_this.interestsArray');
			// if (window.heavyDebug) console.log(_this.interestsArray);
			// d.resolve(_this.userArray);
			// if (window.heavyDebug) console.log('end deleteFlowClicked');
			_this.userdetailsArray = new Array();
			var userdetails = lao.get_local('userdetails');
			if (userdetails!=undefined) {
				_this.userdetailsArray = userdetails;
				d.resolve(_this.userdetailsArray);
			}
			else {
				var requestUrl = dpd_server+"users?deleted=false&id="+userid;
				// if (window.system.master!=true && window.me.id!=window.system.owner.id && window.me.master != true) requestUrl = requestUrl + "&sponsor="+window.system.owner.id;
				if (window.heavyDebug) console.log('requestUrl: '+requestUrl);
				/*
				//// if (window.system.master!=true && window.me.id!=window.system.owner.id) requestUrl = requestUrl + "&sponsor="+window.system.owner.id;
				// if (window.me.id!=window.system.owner.id || window.me.master!=true) requestUrl = requestUrl + "&sponsor="+window.system.owner.id;
				alert('window.me.id: '+window.me.id);
				alert('window.me.master: '+window.me.master);
				alert('window.system.master: '+window.system.master);
				*/
				$.ajax({
					url: requestUrl,
					async: false
				}).done(function(result) {
					var userdetailsData = new Object();
					userdetailsData.mydata = result;
					_.each(userdetailsData, function(userdetails, index, list) {
						var comparedInterests = new Array();
						var isel = 0;
						$.each( _this.interestsArray, function( key, obj ) {
							var isel = $.inArray( obj.name, userdetails.interests );
							if (isel>-1) obj.sel = true;
							_this.interestsArray[key] = obj;
						});
						var exists = 1;
						if (exists>-1 || userdetails.sponsor == window.me.id) {
							userdetails.ccat = 'user';
							userdetails.icon = 'images/icon-multimedia-60.png';
							userdetails.href = '#users/details/view/'+userdetails.id;
							var sponsor = userdetails.sponsor;
							$.ajax({
								url: dpd_server+'users/?id='+sponsor,
								async: true,
								success: function(data) {
									userdetails.sponsordata = data;
									userdetails.compared_interests = _this.interestsArray;
									_this.userArray = userdetails;
									/*
									$.when( lao.save_local('user',_this.userArray) ).done(
										function( lao_result ) {
											d.resolve(_this.userArray);
											// if (window.heavyDebug) console.log('end deleteFlowClicked');
										}
									);
									*/
									$.when( lao.save_local('userdetails',_this.userArray), dao.save_local('userdetails',_this.userArray) ).done(
										function( lao_result, dao_result ) {
											if (window.heavyDebug) console.log('userdetails cached in local.storage and evtl. saved offline offline db');
											d.resolve(_this.userArray);
										}
									);
								},
								error:function (xhr, ajaxOptions, thrownError) {
									if (window.heavyDebug) console.log(xhr.responseText);
								}
							});
						}
					});
				});
			}
			
		}
	);
	return d.promise();
}

function getOwnerData(kdnr) {
	var d = $.Deferred();
	// get owner data and roles
	var owner = lao.get_local('owner');
	if (owner==undefined) {
		// console.log('ok... owner==undefined (no or not actual window.localStorage cache), now checking for network connection...');
		if (isConnectedToInternet()==true) {
			// console.log('isConnectedToInternet()==true');
			var requestUrl = dpd_server+'users/?kdnr='+kdnr;
			// alert(requestUrl);
			$.ajax(requestUrl,{
				type:"GET",
				timeout: 30000,
				async:true})
			.done(function(result) {
				var owner = result[0];
				$.when( lao.save_local('owner',owner) ).done(
					function( lao_result ) {
						// console.log('owner cached in local.storage and evtl. saved offline offline db');
						d.resolve(owner);
						// or?!? :     d.resolve(lao.get_local('owner'));
					}
				);
			})
			.fail(function(err) {
				alert( "error: internet connection timed out during getOwnerData() - resolving data from window.localStorage" );
				alert(err);
				d.reject(err);
			}).always(function() {
			});
		} else {
			/*
			// console.log('getOwnerData('+kdnr+') >> isConnectedToInternet()!=true >> no web connection >> cannot pull data from server! >> using local database - but only when is native mobile devices...');
			$.when( dao.get_local('owner') ).done(
				function( owner ) {
					// console.log("getOwnerData(kdnr) >> $.when( dao.get_local('owner') ).done() >> d.resolve(owner)");
					// console.log("result of last hardcoded way to get owner via kdnr: "+owner);
					d.resolve(owner);
				}
			);
			*/
		}
	} else {
		// console.log('lao: owner already cached in lao - resolving from lao.get_local("owner");');
		// _this.owner = owner;
		// alert(window.pagechange_timestamp);
		// console.log(owner);
		d.resolve(owner);
	}
	return d.promise();
}

function collectInterestsData() {
	var _this = this;
	var d = $.Deferred();
	var interests = lao.get_local('interests');
	// if (window.heavyDebug) console.log(interests);
	if (interests!=undefined) {
		_this.interestsArray = interests;
		d.resolve(_this.interestsArray);
	}
	else {		
		var requestUrl = dpd_server+"interests";
		$.ajax({
			url: requestUrl,
			async: true
		}).done(function(interests) {
			interests.sort(function(a, b){
			 var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
			 if (nameA < nameB) //sort string ascending
			  return -1 
			 if (nameA > nameB)
			  return 1
			 return 0 //default return value (no sorting)
			});
			_this.interestsArray = interests;
			// if (window.heavyDebug) console.log(_this.interestsArray);
			$.when( lao.save_local('interests',_this.interestsArray), dao.save_local('interests',_this.interestsArray) ).done(
				function( lao_result, dao_result ) {
					if (window.heavyDebug) console.log('interests cached in local.storage and evtl. saved offline offline db');
					// d.resolve(_this.usersArray);
					// return(_this.interestsArray);
					// if (window.heavyDebug) console.log('end deleteFlowClicked');
					d.resolve(_this.interestsArray);
				}
			);
		});
		// lao.save_local('interests',_this.interestsArray);
	}
	return d.promise();
}

function checkRole(role) {
	var show = false;
	// if ($.inArray('user', window.me.roles) > -1) show = true;
	// if (role=='provider' || role=='seeker') show = true;
	// else 
	// else 
	if (role=='' || role==undefined || role=='public') show = true;
	else if (window.me.roles!=undefined) {
		$.each( window.me.roles, function( key, value ) {
			if (role==value) {
				show = true;
				return(show);
			}
		});
	}
	return(show);
}
function checkRoles(smroles) {
	var show = false;
	$.each( smroles, function( keysm, rolesm ) {
		if (checkRole(rolesm)==true) {
			show = true;
			return(show);
		}
	});
	return(show);
}

function checkAppConfig(role) {
	var show = false;
	// if (window.heavyDebug) console.log(role);
	// if (role=='') alert('empty'); // show = true;
	// else alert(role);
	if (role=='') show = true;
	else if (role=='user') show = true;
	else if (window.system.owner.appviews!=undefined) {
		// if (window.heavyDebug) console.log(window.system.owner.appviews);
		$.each( window.system.owner.appviews, function( key, value ) {
			if (role==value) {
				// if (window.heavyDebug) console.log(role+' ?= '+value);
				show = true;
				return(show);
			}
		});
	}
	return(show);
}
function checkAppConfigs(roles) {
	var show = false;
	if (window.system.owner.appviews!=undefined) {
		$.each( roles, function( key, role ) {
			if (checkAppConfig(role)==true) {
				show = true;
				return(show);
			}
		});
	}
	return(show);
}

function showModal() {
	// if ($('.modalWindow')) return(false);
	// if (window.heavyDebug) console.log('showModal');
	window.system.modaltimeout = 15000;
	window.clearInterval(window.modaltimeoutvar);
	window.modaltimeoutvar = window.setInterval(function() {
		// if (window.heavyDebug) console.log(window.system.modaltimeout);
		window.system.modaltimeout = window.system.modaltimeout - 1000;
		if (window.system.modaltimeout<=0) {
			var breaktoDashboardText = '<br>Die Aktion<br>dauert ungewöhnlich lange.<br><br><u style="cursor:pointer;">ausblenden</u>';
			$('#breaktoDashboard').html(breaktoDashboardText);
			$('#breaktoDashboard').show();
			window.clearInterval(window.modaltimeoutvar);
			window.system.modaltimeout = 15000;
		}
	},1000);
	$("#body").append('<div class="modalWindow"/>');
	var breakLoading = '';
	// if (window.system.contentHelper==1) breakLoading = 'ausblenden';
	breakLoading = 'ausblenden';
	$.mobile.loading( 'show', { theme: 'b', textVisible: true, textonly: true, html: '<div class="blink_me" style="text-align:center;float:none;clear:both;">APPinaut lädt...</div><div id="modaltxt" style="text-align:center;float:none;clear:both;"></div><div id="modaltxt" style="text-align:center;float:none;clear:both;color:#909090;"><a class="breaktoDashboard" id="breaktoDashboard" style="display:none;">'+breakLoading+'</a></div>' });
	$(".breaktoDashboard").off('click').on('click',function(event){
		// alert('bla');
		hideModal();
		// window.location.href = '#dashboard';
	});
	// $('#sidebarListViewDiv').on("vclick", "#menuelement a.contentLink", function (event) {
	// $('#sidebarListViewDiv').on("vclick", "#menuelement a.contentLink", function (event) {
	// setTimeout('hideModal()', 60000);
}

function hideModal() {
	window.clearInterval(window.modaltimeoutvar);
	window.system.modaltimeout = 0;
	$(".modalWindow").remove();
	$.mobile.loading( 'hide' );
}

function showPageOptions() {
	// alert('roles');
	// alert(roles);
	
	$( "#pageOptions" ).toggle( "fast", function() {
		// $( "#page-content" ).toggle();
		// $( "#showPageOptionsIcon" ).rotate({animateTo:360});
		// rotatePageOptionsIcon();
		// Animation complete.
		// alert('done!');
	});
	/*
	1000,function() {
		$(this).css("border", "2px red inset")
		.filter(".middle")
		.css("background", "yellow")
		.focus();
		$("div").css("visibility", "hidden");
	});
	*/
}

function elementResizeByScreenHeight() {
	var screenheight = $(window).height();
	$('.elementResizeByScreenHeight').each(function( index, bla ) {
		var percentheight = $(this).attr('data-percentheight');
		$(this).css("height", (screenheight*percentheight/100)+"px");
	});
}

function fontResize() {
	var height = $(window).height();
	var width = $(window).width();
	var font = 10;
	var fullpixel = width*height;
	var factor = (fullpixel/180000);
	if (factor<0.8) factor = 0.8;
	if (factor>1.4) factor = 1.4;
	var newFont = font * factor;
	$.mobile.activePage.find('.resizetext').each(function( index, bla ) {
		// alert($(this).html());
		var font = $(this).css('font-size').substr($( this ).css('font-size').len-2,2);
		newFont = font*factor;
		if (newFont<12) newFont = 12;
		if (newFont>17) newFont = 17;
		// alert(newFont);
		$(this).css("font-size", newFont+"px");
	});
};

var dao = {
	// syncURL: "../api/employees",
	// syncURL: "http://coenraets.org/offline-sync/api/employees?modifiedSince=2010-03-01%2010:20:56",
	// syncURL: "http://mobile002.appinaut.de/api/employees/",

	test: function(bla) {
		alert(bla);
	},
	initialize: function() {
		var _this = this;
		var d = $.Deferred();
		// alert('trying dao.initialize() for db: '+window.local_db_setup.name);
		if (isNativeAppMode()) {
			if (window.heavyDebug) console.log('initializing local_db_setup: '+window.local_db_setup.name);
			// if (window.heavyDebug) console.log(window.local_db_setup);
			var db = window.openDatabase(window.local_db_setup.name, window.local_db_setup.version, window.local_db_setup.description, local_db_setup.size);
			// alert('local db opened into var db');
			/*
			this.db.transaction (
				function(tx) {
					tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='videos'", this.txErrorHandler,
						function(tx, results) {
							if (results.rows.length != 1) self.createTables();
						}
					);
					// self.sync(renderList);
				}
			)
			*/
			db.transaction(_this.createTablesSQL, 
			function(tx, err) {
				// error
				alert("ERROR on processing SQL _this.createTablesSQL: "+err);
				d.resolve(false);
			}, 
			function(tx) {
				// success
				// alert('SUCCESS on _this.createTablesSQL');
				// alert(tx);
				// alert("Returned rows = " + results_createTablesSQL.rows.length);
				d.resolve(true);
			});				
		}
		else {
			if (window.heavyDebug) console.log('dao.initialize() not possible - no phonegap - todo: implement here a persistent alternative for tx.executeSql, for desktop devices ot similar');
			d.resolve(false);
		}
		return d.promise();		
	},
	createTablesSQL: function(tx) {
		// tx.executeSql('DROP TABLE IF EXISTS owner');
		tx.executeSql('CREATE TABLE IF NOT EXISTS owner (id unique, data)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS sidemenu (id unique, data)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS me (id unique, data)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS learningstream (id unique, data)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS interests (id unique, data)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS user (id unique, data)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS users (id unique, data)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS video (id unique, data)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS videos (id unique, data)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS card (id unique, data)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS cards (id unique, data)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS messages (id unique, data)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS message (id unique, data)');
		// tx.executeSql('INSERT INTO owner (id, data) VALUES (1, "First row")');
		// tx.executeSql('INSERT INTO owner (id, data) VALUES (2, "Second row")');
	},

	errorCB: function(tx, err) {
		alert("Error processing SQL: "+err);
	},

	get_local: function(db_table) {
		var _this = this;
		var d = $.Deferred();
		// alert('doing dao.get_local('+db_table+')');
		$.when(_this.initialize()) .done(function(result){
			if (result==true) {
				// alert('local db initialize() done');
				var db = window.openDatabase(window.local_db_setup.name, window.local_db_setup.version, window.local_db_setup.description, local_db_setup.size);
				try {
				db.transaction(function(tx) {
					var sqlquery = "SELECT data FROM "+db_table;
					if (window.heavyDebug) console.log(sqlquery);
					tx.executeSql(sqlquery, [], 
					function (tx, results) {
						var len = results.rows.length;
						var resultDataObject = new Object;
						var i = 0;
						for (i=0; i < len; i = i + 1) {
							resultDataObject[i] = results.rows.item(i);
						}
						// if (window.heavyDebug) console.log(len + ' rows found >> putted into resultDataObject[...]');
						// if (window.heavyDebug) console.log('city of found owner (kdnr: '+JSON.parse(resultDataObject[0].data).db_data.kdnr+') is: '+JSON.parse(resultDataObject[0].data).db_data.city);
						/*
						$.each(resultDataObject[0], function (i, val) {
							// if (window.heavyDebug) console.log("id: " + val.id + " title: " + val.title + " val: " + val.description + " price: " + val.price);
							alert(i); // = data
							alert(val); // = {"timestamp":"6546788789","db_table":"owner","db_data":{"active":true,"appviews":["cards","wall"],"city":"Ahlerstedt","id":"34567898765"}}
							alert(val[i]); // undefined
						});
						*/
						d.resolve(JSON.parse(resultDataObject[0].data).db_data);
						/*
						// for update statement(?): this will be true since it was a select statement and so rowsAffected was 0
						if (!results.rowsAffected) {
							alert('No rows affected!');
							d.resolve();
						}
						// for an insert statement, this property will return the ID of the last inserted row
						// if (window.heavyDebug) console.log("Last inserted row ID = " + results.insertId);
						*/
					}, 
					function(tx, err) {
						alert("Error processing SQL A: "+err);
						d.resolve();
					});
				}, function(tx, err) {
					alert("Error processing SQL B: "+err);
					d.resolve();
				});
				} catch(e) {
					alert('myfunctions.js >> ERROR AT db.transaction(function(tx) {...');
					alert(e);
				}
			} else {
				if (window.heavyDebug) alert('get_local('+db_table+') >> dao.initialize().done() NOT SUCCESSFUL >> could not create database tables via tx.executeSql >> result='+result);
				d.resolve();
			}
		});
		return d.promise();		
	},
	save_local: function(db_table,db_data) {
		var _this = this;
		var d = $.Deferred();
		if (window.heavyDebug) console.log('doing dao.save_local('+db_table+',db_data)');

		// decode: var offline_object = JSON.parse(window.localStorage.getItem(db_table));
		// encode: var db_string = JSON.stringify(offline_object)
		var offline_object = new Object();
		offline_object['timestamp'] = window.pagechange_timestamp;
		offline_object['db_table'] = db_table;
		offline_object['db_data'] = db_data;
		
		// alert('db_data.city: '+db_data.city);
		$.when(_this.initialize())
		.done(function(result) {
			if (result==true) {
				// alert('local db initialize() done');
				var db = window.openDatabase(window.local_db_setup.name, window.local_db_setup.version, window.local_db_setup.description, local_db_setup.size);
				db.transaction(
					function(tx) {
						// var sql = "INSERT OR REPLACE INTO "+db_table+" (data) VALUES ('"+db_data.city+"')";
						var sql = "INSERT OR REPLACE INTO "+db_table+" (id, data) VALUES ('1', '"+JSON.stringify(offline_object)+"')";
						// if (window.heavyDebug) console.log(sql);
						tx.executeSql(sql);
					},
					function() {
						alert('ERROR INSERT OR REPLACE: '+sql);
						d.resolve();
					},
					function(results) {
						if (window.heavyDebug) console.log('SUCCESS INSERT OR REPLACE - now pushing back db_data via d.resolve(db_data);');
						// alert(results);
						// for an insert statement, this property will return the ID of the last inserted row
						// alert("Last inserted row ID = " + results.insertId);
						// d.resolve(dao.get_local(db_table));
						d.resolve(db_data);
					}
				);
			} else {
				if (window.heavyDebug) console.log('dao.initialize() not successful: result='+result);
				d.resolve();
			}
		});
		return d.promise();		
	},
	/*
	querySuccess: function(tx, results) {
		alert("Returned rows = " + results.rows.length);
		// this will be true since it was a select statement and so rowsAffected was 0
		if (!results.rowsAffected) {
			alert('No rows affected!');
			return false;
		}
		// for an insert statement, this property will return the ID of the last inserted row
		alert("Last inserted row ID = " + results.insertId);
	},
	successCB: function() {
		alert('successDB');
	},
	*/
	xxx_initialize: function() {
		var deferred = $.Deferred();
		// alert('window.dao initialize');
		// alert('bbb');
		var self = this;
		// renderList();
		if (isNativeAppMode()) {
			this.db = window.openDatabase("syncdemodb", "1.0", "Sync Demo DB", 200000);
			/*
			this.db.transaction(
				function(tx) {
					// tx.executeSql('DROP TABLE IF EXISTS videos');
					tx.executeSql('DROP TABLE IF EXISTS users');
				},
				this.txErrorHandler,
				function() {
					// alert('Tables successfully DROPPED in local SQLite database');
					// callback();
				}
			);
			
			// Testing if the table exists is not needed and is here for logging purpose only. We can invoke createTable
			// no matter what. The 'IF NOT EXISTS' clause will make sure the CREATE statement is issued only if the table
			// does not already exist.
			*/
			this.db.transaction (
				function(tx) {
					tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='videos'", this.txErrorHandler,
						function(tx, results) {
							if (results.rows.length != 1) self.createTables();
						}
					);
					// self.sync(renderList);
				}
			)
		}
		// else websqlReady.resolve("initialize done");
	},
		
	zzz_findVideoById: function(id) {
		var deferred = $.Deferred();
		if (isNativeAppMode()) {
			this.db.transaction(
				function (tx) {
					var sql = "SELECT v.videoid, v.videourl FROM videos v WHERE v.videoid=:id";
					tx.executeSql(sql, [id], function (tx, results) {
						deferred.resolve(results.rows.length === 1 ? results.rows.item(0) : null);
					});
				},
				function (error) {
					deferred.reject("Transaction Error: " + error.message);
				}
			);
		}
		else {
			deferred.resolve();
		}
		return deferred.promise();
	},
	
	zzz_createTables: function() {
		this.db.transaction(
			function(tx) { 
				tx.executeSql("CREATE TABLE IF NOT EXISTS videos ( " + "id INTEGER PRIMARY KEY AUTOINCREMENT, " + "videoid VARCHAR(255), " + "videourl VARCHAR(255))");
			},
			function(error) { 
				// alert('ERROR ON Tables CREATE local SQLite database'); 
				// alert(error);
			},
			function() { 
				window.system.showtutorial = true;
				// alert('SUCCESS Tables CREATE local SQLite database'); 
				// websqlReady.resolve("initialize done"); 
			}
		);
		this.db.transaction(
			function(tx) { 
				tx.executeSql("CREATE TABLE IF NOT EXISTS metbl ( " + "id INTEGER PRIMARY KEY, " + "username VARCHAR(255), " + "password VARCHAR(255), " + "autologin VARCHAR(255))");
			},
			function(error) { 
				alert('ERROR ON Tables CREATE local SQLite database'); 
				alert(error);
			},
			function() { 
				window.system.showtutorial = true;
				// alert('SUCCESS Tables CREATE local SQLite database'); 
				// websqlReady.resolve("initialize done"); 
			}
		);
	},
	zzz_rememberUserDataDeleteAutologin: function(callback) {
		// alert('rememberUserDataDeleteAutologin');
		// alert(window.system.owner.kdnr);
		var _thisFunction = this;
		if (isNativeAppMode()) {
			this.db.transaction(
				function (tx) {
					var id = window.system.owner.kdnr;
					// var sql = "DELETE FROM metbl WHERE id=:id";
					var sql = "UPDATE metbl SET autologin = '0' WHERE id=:id";
					tx.executeSql(sql, [id], function (tx, results) {
						callback();
					});
				},
				function (error) {
					alert('error');
					alert(error.message);
					// deferred.reject("Transaction Error: " + error.message);
					callback();
				}
			);
		}
		else {
			callback();
		}
	},
	zzz_rememberUserDataDelete: function(callback) {
		// callback();
		// alert('rememberUserDataDelete: '+window.system.owner.kdnr);
		if (isNativeAppMode()) {
			this.db.transaction(
				function (tx) {
					var id = window.system.owner.kdnr;
					// alert(id);
					// var sql = "DELETE FROM metbl WHERE id=:id";
					var sql = "DELETE FROM metbl WHERE id=:id";
					// var sql = "UPDATE metbl SET autologin = '0' WHERE id=:id";
					// alert(sql);
					tx.executeSql(sql, [id], function (tx, results) {
						callback();
					});
				},
				function (error) {
					// alert('error');
					// alert(error.message);
					// deferred.reject("Transaction Error: " + error.message);
					callback();
				}
			);
		}
		else {
			// alert(callback)
			callback();
		}
	},
	zzz_rememberUserDataGet: function(callback) {
		// var deferred = $.Deferred();
		var userdata = new Object();
		userdata.username = "";
		userdata.password = "";
		if (isNativeAppMode()) {
			this.db.transaction(
				function (tx) {
					var id = window.system.owner.kdnr;
					// alert(id);
					var sql = "SELECT m.username, m.password, m.autologin FROM metbl m WHERE m.id=:id";
					// alert(sql);
					tx.executeSql(sql, [id], function (tx, results) {
						// alert('found');
						// alert(results.username);
						// alert(results[0].username);
						// alert('length '+results.rows.length);
						// alert('results.row... '+results.rows.item(0).username);
						// deferred.resolve(results.rows.length === 1 ? results.rows.item(0) : null);
						// alert(results.rows.item(0).username);
						// alert(results.rows.item(0).password);
						// alert(results.rows.item(0).autologin);
						callback(results.rows.item(0));
					});
				},
				function (error) {
					// alert('error');
					// alert(error.message);
					// deferred.reject("Transaction Error: " + error.message);
					callback(userdata);
				}
			);
		}
		else {
			callback(userdata);
		}
		// return deferred.promise();
		// callback();
	},
	zzz_rememberUserData: function(username, password, autologin) {
		if (isNativeAppMode()) {
			this.db.transaction(
				function(tx) {
					// alert('filling table INSERT START');
					var sql3 = "INSERT OR REPLACE INTO metbl (id, username, password, autologin) VALUES ("+window.system.owner.kdnr+", '"+username+"', '"+password+"', '"+autologin+"')";
					// alert(sql3);
					tx.executeSql(sql3);
					// alert('filling table INSERT END');
				},
				function() {
					// alert('ERROR ON Table metbl FILLING WITH SAMPLES in local SQLite database');
				},
				function() {
					// alert('Table metbl successfully FILLED WITH SAMPLES in local SQLite database');
					// callback();
				}
			);
		}
		// if (!isNativeAppMode()) websqlReady.resolve("initialize done");
	},
	/*
	fillTable: function() {
		// alert('filling table');
		if (isNativeAppMode()) {
			this.db.transaction(
				function(tx) {
					// sample data 
					alert('filling table INSERT START');
					tx.executeSql("INSERT INTO videos (id, fullname,pictureurl,device,credits,deleted,lastModified) VALUES (2, 'Gary Donovan','','555','100',1,'2013-11-09 22:14:19')");
					tx.executeSql("INSERT INTO videos (id, fullname,pictureurl,device,credits,deleted,lastModified) VALUES (1, 'Lisa Wong','','999','20',0,'2013-11-09 22:14:19')");
					alert('filling table INSERT END');
				},
				function() {
					// alert('ERROR ON Table videos successfully FILLED WITH SAMPLES in local SQLite database');
				},
				function() {
					// alert('Table videos successfully FILLED WITH SAMPLES in local SQLite database');
					// callback();
				}
			);
		}
		if (!isNativeAppMode()) websqlReady.resolve("initialize done");
	},
	
	xxxy_sync: function() {
		var self = this;
		alert('Starting synchronization...');
		
	},
	
	xyz_getChanges: function(syncURL, modifiedSince, callback) {
		alert('getChanges');
		$.ajax({
			url: syncURL,
			data: {modifiedSince: modifiedSince},
			dataType:"json",
			success:function (data) {
				// if (window.heavyDebug) console.log("The server returned " + data.length + " changes that occurred after " + modifiedSince);
				callback(data);
			},
			error: function(model, response) {
				// if (window.heavyDebug) console.log(response.responseText);
			}
		});

	},

	bbb_sync: function(callback) {
		var self = this;
		alert('Starting synchronization...');
		this.getLastSync(function(lastSync){
			alert('lastSync' + lastSync);
			alert('this.getLastSync(function(lastSync)');
			self.getChanges(self.syncURL, lastSync,
				function (changes) {
					if (changes.length > 0) {
						self.applyChanges(changes, callback);
						alert('Something to synchronize');
					} else {
						alert('Nothing to synchronize');
						callback();
					}
				}
			);
		});

	},
	bbb_getChanges: function(syncURL, modifiedSince, callback) {
		alert('getChanges');
		$.ajax({
			url: syncURL,
			data: {modifiedSince: modifiedSince},
			dataType:"json",
			success:function (data) {
				// if (window.heavyDebug) console.log("The server returned " + data.length + " changes that occurred after " + modifiedSince);
				callback(data);
			},
			error: function(model, response) {
				// if (window.heavyDebug) console.log(response.responseText);
			}
		});

	},

	fillTable: function(callback) {
		this.db.transaction(
			function(tx) {
				// sample data 
				// tx.executeSql("INSERT INTO employee (id,firstName,lastName,title,officePhone,deleted,lastmodified) VALUES (5,'Steven','Wells','Software Architect','617-000-0012','false','2013-11-09 22:14:19')");
				// tx.executeSql("INSERT INTO employee (id,firstName,lastName,title,officePhone,deleted,lastmodified) VALUES (4,'Amy','Jones','Sales Representative','617-000-0011','false','2013-11-09 22:14:19')");
				// tx.executeSql("INSERT INTO employee (id,firstName,lastName,title,officePhone,deleted,lastmodified) VALUES (3,'Kathleen','Byrne','Sales Representative','617-000-0010','false','2013-11-09 22:14:19')");
				tx.executeSql("INSERT INTO employee (id,firstName,lastName,title,officePhone,deleted,lastmodified) VALUES (2,'Gary','Donovan','Marketing','617-000-0009','1','2013-11-09 22:14:19')");
				tx.executeSql("INSERT INTO employee (id,firstName,lastName,title,officePhone,deleted,lastmodified) VALUES (1,'Lisa','Wong','Marketing Manager','617-000-0008','0','2013-11-09 22:14:19')");
			},
			this.txErrorHandler,
			function() {
				// if (window.heavyDebug) console.log('Table employee successfully FILLED in local SQLite database');
				callback();
			}
		);
	},

	dropTable: function(callback) {
		this.db.transaction(
			function(tx) {
				tx.executeSql('DROP TABLE IF EXISTS employee');
			},
			this.txErrorHandler,
			function() {
				// if (window.heavyDebug) console.log('Table employee successfully DROPPED in local SQLite database');
				callback();
			}
		);
	},

	bbb_getLastSync: function(callback) {
		alert('getLastSync');
		this.db.transaction(
			function(tx) {
				var sql = "SELECT MAX(lastModified) as lastSync FROM employee";
				tx.executeSql(sql, this.txErrorHandler,
					function(tx, results) {
						var lastSync = results.rows.item(0).lastSync;
						// if (window.heavyDebug) console.log('Last local timestamp is ' + lastSync);
						callback(lastSync);
					}
				);
			}
		);
	},

	bbb_applyChanges: function(employees, callback) {
		alert('applyChanges');
		this.db.transaction(
			function(tx) {
				var l = employees.length;
				var sql =
					"INSERT OR REPLACE INTO employee (id, firstName, lastName, title, officePhone, deleted, lastModified) " +
					"VALUES (?, ?, ?, ?, ?, ?, ?)";
				// if (window.heavyDebug) console.log('Inserting or Updating in local database:');
				var e;
				for (var i = 0; i < l; i++) {
					e = employees[i];
					// if (window.heavyDebug) console.log(e.id + ' ' + e.firstName + ' ' + e.lastName + ' ' + e.title + ' ' + e.officePhone + ' ' + e.deleted + ' ' + e.lastModified);
					var params = [e.id, e.firstName, e.lastName, e.title, e.officePhone, e.deleted, e.lastModified];
					tx.executeSql(sql, params);
				}
				// if (window.heavyDebug) console.log('Synchronization complete (' + l + ' items synchronized)');
			},
			this.txErrorHandler,
			function(tx) {
				callback();
			}
		);
	},
	
	bbb_findAll: function(callback) {
		alert('findAll');
		this.db.transaction(
			function(tx) {
				var sql = "SELECT * FROM employee";
				alert('Local SQLite database: "SELECT * FROM employee"');
				tx.executeSql(sql, this.txErrorHandler,
					function(tx, results) {
						alert('getting len');
						var len = results.rows.length,
							employees = [],
							i = 0;
						// for (; i < len; i = i + 1) {
						for (i=0; i < len; i = i + 1) {
							employees[i] = results.rows.item(i);
						}
						alert(len + ' rows found');
						// alert(employees);
						// alert(employees.toJSON);
						
						// for (var i = 0; i < l; i++) {
						// e = employees[i];

						callback(employees);
					}
				);
			}
		);
	},
	*/
	txErrorHandler: function(tx) {
		alert(tx.message);
	}
};

var lao = {
	initialize: function() {
		// if (window.heavyDebug) console.log('lao: initialize');
		var d = $.Deferred();
		d.resolve();
		return d.promise();
	},
	save_local: function(db_table,db_data) {
		var _this = this;
		var d = $.Deferred();
		if (window.heavyDebug) console.log('lao.save_local('+db_table+',db_data)');
		var offline_object = new Object();
		offline_object['timestamp'] = window.pagechange_timestamp; //  || dateYmdHis()
		offline_object['db_table'] = db_table;
		offline_object['db_data'] = db_data;
		// if (window.heavyDebug) console.log('lao: save_local >> '+db_table , offline_object['timestamp']);
		// timestamp: $(this).text(), sortBy: $("#sortBy").val()};
		// if (window.heavyDebug) console.log(offline_object);
		// if (window.heavyDebug) console.log(JSON.stringify(offline_object));
		// if (window.heavyDebug) console.log(window.localStorage);
		try {
			window.localStorage.setItem(db_table, JSON.stringify(offline_object));
		} catch(e) {
			if (window.heavyDebug) console.log('could not use window.localStorage');
		}
		// window.localStorage.setItem("employees", this.records.join(","));
		d.resolve(_this.get_local(db_table));
		return d.promise();
	},
	get_local: function(db_table) {
		// if (window.heavyDebug) console.log('lao: get_local >> '+db_table);
		// var offline_object = new Object();
		// window.localStorage.setItem(db_table, JSON.stringify(offline_object));
		try {
			var offline_object = JSON.parse(window.localStorage.getItem(db_table));
			// console.log(offline_object);
			offline_object['timestamp'] = offline_object.timestamp;
			offline_object['db_table'] = offline_object.db_table;
			offline_object['db_data'] = offline_object.db_data;
			// if (window.heavyDebug) console.log(offline_object);
			// if (window.heavyDebug) console.log(offline_object);
			if (pagechange_timestamp!=undefined && (window.pagechange_timestamp == offline_object['timestamp'])) {
				if (window.heavyDebug) console.log(window.pagechange_timestamp+' == ' +offline_object['timestamp']+' >> returning (cached data) offline_object["db_data"] via get_local (table '+db_table+')');
				// if (window.heavyDebug) console.log(db_table);
				// if (window.heavyDebug) console.log(window.pagechange_timestamp , offline_object['db_data']);
				// if (window.heavyDebug) console.log(offline_object['db_data']);
				// console.log(offline_object['db_data']);
				return(offline_object['db_data']);
			}
		} catch(e) {
			// not yet existing offline...
			if (window.heavyDebug) console.log('window.localStorage (for '+db_table+') PROBABLY NOT AVAILABLE or NOT YET SETTED or NOT ACTUAL');
		}
	}
}


function deleteAnonymousData() {
	doConfirm('Wollen Sie wirklich alle anonymen Daten löschen?', 'Warnung', function(e) {
		if (e==1) deleteAnonymousDataAction();
		else doAlert('Vorgang wurde abgebrochen.','Information');
	});
}

function deleteAnonymousDataAction() {
	var query = { deleted: false };
	dpd.users.get(query, function (result,err) {
		if(err) alert('error');
		// if (window.heavyDebug) console.log(result);
		else {
			$.each(result, function (el, val) {
				// if (window.heavyDebug) console.log("id: " + val.id + " username: " + val.username + " deleted: " + val.deleted + " fullname: " + val.fullname);
				if (Math.ceil(val.username)>0) {
					// if (window.heavyDebug) console.log('delete it ('+val.id+') now');
					dpd.users.del(val.id, function (err) {
						if(err) return console.log(err); 
					});
				}
			});
		}
	});
	dpd.likes.get(function (result, err) {
		if(err) return console.log(err);
		else {
			// console.log(result);
			$.each(result, function (el, val) {
				// if (window.heavyDebug) console.log("id: " + val.id + " username: " + val.username + " deleted: " + val.deleted + " fullname: " + val.fullname);
				// if (window.heavyDebug) console.log('delete it ('+val.id+') now');
				dpd.likes.del(val.id, function (err) {
					if(err) return console.log(err); 
				});
			});
		}
	});
}





/*
function handleGhostViews() {
	// alert('handleGhostViews');
	if (window.MobileApp.myrouter.ghostView) {
		// if (window.heavyDebug) console.log('ghostView');
		// if (window.heavyDebug) console.log(window.MobileApp.myrouter.ghostView);
		if (window.MobileApp.myrouter.ghostView.cid) {
			// window.MobileApp.myrouter.ghostView.$el.detach();
			window.MobileApp.myrouter.ghostView.unbind();
			// window.MobileApp.myrouter.ghostView.remove();
		}
		window.MobileApp.myrouter.ghostView = window.MobileApp.myrouter.newView;
		// if (window.heavyDebug) console.log('newView:');
		// if (window.heavyDebug) console.log(window.MobileApp.myrouter.newView);
	}
}

var dynao = {
	initialize: function() {
		// if (window.heavyDebug) console.log('lao: initialize');
		var d = $.Deferred();
		d.resolve();
		return d.promise();
	},
	get_local: function(db_table) {
		try {
			lao.get_local(db_table);
			var offline_object = JSON.parse(window.localStorage.getItem(db_table));
			offline_object['timestamp'] = offline_object.timestamp;
			offline_object['db_table'] = offline_object.db_table;
			offline_object['data'] = offline_object.data;
			// if (window.heavyDebug) console.log(offline_object);
			// if (window.heavyDebug) console.log(window.pagechange_timestamp , offline_object);
			// if (window.pagechange_timestamp == offline_object['timestamp']) {
			return(offline_object['data']);
			// }
		} catch(e) {
			// not yet existing offline...
		}
	}
}

var app = {
	initialize: function() {
		
		_thisApp = this;
		$.when( _thisApp.fetchMe() ).then(
			  function( deviceisready ) {
				// if(isMobile.any()) {
				$('#body').show();
				showModal();
				if(isNativeAppMode()) {
					initStore();
					window.plugins.insomnia.keepAwake();
				}
				else {
					window.system.showtutorial = true;
				}
				$("body").css("-webkit-user-select","none");
				$("body").css("-moz-user-select","none");
				$("body").css("-ms-user-select","none");
				$("body").css("-o-user-select","none");
				$("body").css("user-select","none");
				window.dao.initialize();
				// new window.MobileRouter();
			  },
			  function( status ) {
				// if (window.heavyDebug) console.log( "you fail this time" );
			  },
			  function( status ) {
				// if (window.heavyDebug) console.log('still fetchWorking app');
			  }
		);
	},
	onResume: function() {
		// dpd('users').get(window.system.uid, function(me, err) {
		// 	if (user) { }
		// 	else {
		// 		// if (window.heavyDebug) console.log('You are not logged in!');
		// 		window.location.href = "#noaccess";
		// 	}
		// });
	},
	fetchWorking: function() {
		var setTimeoutWatcher = setTimeout(function foo() {
			if ( _thisApp.dfd.state() === "pending" ) {
				// _thisApp.dfd.notify( "working... " );
				setTimeout( _thisApp.fetchWorking, 1000 );
			}
		}, 1 );
	},
	fetchMe: function() {
		_thisApp = this;
		// if (window.heavyDebug) console.log('fetchMe app');
		_thisApp.dfd = new $.Deferred();
		_thisApp.fetchWorking();
		if(!isMobile.any()) {
			window.setTimeout(function blay() {
				// alert('resolve');
				_thisApp.dfd.resolve(true);
			}, 1000);
		}
		else {
			// document.addEventListener('load', this.onDeviceReady, false);
			// document.addEventListener('offline', this.onDeviceReady, false);
			// document.addEventListener('online', this.onDeviceReady, false);
			if (top.location != self.location) {
				// alert("breaking frame B");
				top.location.replace(self.location);
				// alert('bla');
			}
			else {
				// alert('mobile and in parent frame');
				if ( isNativeAppMode() ) {
					// alert("Running on PhoneGap!");
					document.addEventListener('deviceready', this.receivedEvent, false);
				} else {
					// alert("Not running on PhoneGap!");
					window.setTimeout(function blaz() {
						// alert('resolve on ios');
						_thisApp.dfd.resolve(true);
					}, 1000);
					// this.receivedEvent();
				}
			}
		}
		return this.dfd.promise();
	},
	fetch: function() {	
		_thisApp = this;
		// if (window.heavyDebug) console.log('fetching _thisApp.js');
	},
	receivedEvent: function(event) {
		// alert('deviceready');
		// var foox = window.setTimeout(function blax() {
		_thisApp.dfd.resolve(true);
		// }, 1000);
		// _thisApp.dfd.resolve(true);		
	}
};

function scrollToTop(obj) {
	// alternative:
	// http://flesler.blogspot.de/2009/05/jqueryscrollto-142-released.html
	// demo: http://demos.flesler.com/jquery/scrollTo/
	// info from: http://dcarrith.github.io/jquery.mobile.smooth.scrollTo/
	obj.scrollTop(0); // .scrollTop( 300 );
}

function scrollBottom() {
	// $('#page-content').stop().animate({
	setTimeout(function() {
		$('#page-content').animate({
			scrollTop: $("#page-content")[0].scrollHeight
		}, "fast", function() {
			// animation done
			$('#page-content').focus();
		});
	}, 1000);
}

function resizeDynFont() {
	$( ".dynsizetext" ).each(function(index, value) {
		// var nowheight = $(this).height();
		// alert(nowheight);
		var settedpercentheight = $(this).attr('data-percentheight');
		if (settedpercentheight==undefined) settedpercentheight=1;
		var newheight = Math.ceil($(window).height()*(settedpercentheight/100));
		var settedpercentwidth = $(this).attr('data-percentwidth');
		if (settedpercentwidth==undefined) settedpercentwidth=1;
		var newwidth= Math.ceil($(window).width()*(settedpercentwidth/100));
		$(this).css('height',newheight);
	});
}

function resizeDynSpaces() {
	$( ".dynspace_small" ).each(function(index, value) {
		// var nowheight = $(this).height();
		// alert(nowheight);
		var settedpercentheight = $(this).attr('data-percentheight');
		if (settedpercentheight==undefined) settedpercentheight=1;
		var newheight = Math.ceil($(window).height()*(settedpercentheight/100));
		var settedpercentwidth = $(this).attr('data-percentwidth');
		if (settedpercentwidth==undefined) settedpercentwidth=1;
		var newwidth= Math.ceil($(window).width()*(settedpercentwidth/100));
		$(this).css('height',newheight);
	});
}

var showDeleteBar = function(status) {
	var deleteBarDeferred = $.Deferred();
	var deleteBarDeferredWatcher = deleteBarDeferred.then(function( value ) {
		return status;
	});
	deleteBarDeferred.resolve();
	deleteBarDeferredWatcher.done(function( value ) {
		if (value==true) {
			$('#deleteBar').show();
			$('.ui-listview-filter').hide();
			// alert(value);
		}
		else {
			$('#deleteBar').hide();
			$('.ui-listview-filter').show();
		}
		// if (window.heavyDebug) console.log(value);
	});
};

// var websqlReady = $.Deferred();
// var sampleDataReady = $.Deferred();
var myLocalStorageAdapter = {
	testOutput: function() {
		return('testoutputtext');
	},
	initialize: function() {
		// if (window.heavyDebug) console.log('now inner window.LocalStorageAdapter: initialize');
		var deferred = $.Deferred();
		// Store sample data in Local Storage
		// window.localStorage.setItem("employees", JSON.stringify(
		// 	[
		// 		{"id": 1, "fullname": "offline James King", "device": 0, "credits": "100", "pictureurl": ""},
		// 		{"id": 2, "fullname": "offline Julie Taylor", "device": 1, "credits": "355", "pictureurl": ""}
		// 	]
		// ));
		deferred.resolve();
		return deferred.promise();
	},
	// Save the current state of the **Store** to *localStorage*.
	save: function() {
		window.localStorage.setItem("employees", this.records.join(","));
	},
	create: function(model) {
		// if (window.heavyDebug) console.log('create: function(model) {');
		if (!model.id) {
		  model.id = guid();
		  model.set(model.idAttribute, model.id);
		  alert('model.id inserted');
		}
		// return(model);
		// if (window.heavyDebug) console.log("employees"+"-"+model.id);
		window.localStorage.setItem("employees"+"-"+model.id, JSON.stringify(model));
		// if (window.heavyDebug) console.log(window.localStorage.getItem("employees"+"-"+model.id, JSON.stringify(model));
		this.push(model.id.toString());
		this.save();
		return this.findById(model.id);
	},
	findAll: function () {
		var employees = JSON.parse(window.localStorage.getItem("employees"));
		// var employees = window.localStorage.getItem("employees");
		// if (window.heavyDebug) console.log(employees);
		return employees;
	},
	findById: function (id) {
		// if (window.heavyDebug) console.log('findById: function (id) {');
		// if (window.heavyDebug) console.log(id);
		var deferred = $.Deferred(),
			employees = JSON.parse(window.localStorage.getItem("employees")),
			employee = null;
			l = employees.length;

		for (var i = 0; i < l; i++) {
			if (employees[i].id === id) {
				employee = employees[i];
				break;
			}
		}
		// if (window.heavyDebug) console.log('employee');
		// if (window.heavyDebug) console.log(employee);
		deferred.resolve(employee);
		return deferred.promise();
	},
	findByName: function (searchKey) {
		var deferred = $.Deferred(),
			employees = JSON.parse(window.localStorage.getItem("employees")),
			results = employees.filter(function (element) {
				var fullName = element.firstName + " " + element.lastName;
				return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
			});
		deferred.resolve(results);
		return deferred.promise();
	}
}

function test_InAppBrowser_WithOptions(){
	report('TEST','--> test_InAppBrowser()..');
	try{
		if(isNativeAppMode()==false) {
			doAlert('Please Note: The [InAppBrowser] plugin\'s dimension and position parameters only work on an actual device.','Plugin Note');
		}
		var windowHeight, windowWidth, viewX, viewY;
		var iab;
		viewX = 200;
		viewY = 0;
		windowHeight = window.innerHeight;
		windowWidth = window.innerWidth-200;
		iab = window.open('http://www.ign.com','_blank',
							  'enableviewportscale=yes,' +
							  'location=yes,' +
							  'vw=' + windowWidth + ',' +
							  'vh=' + windowHeight + ',' +
							  'vx=' + viewX + ',' +
							  'vy=' + viewY);
		iab.addEventListener('loadstart', function(){ $('body').addClass('inappbrowser_windowed_mode'); });
		iab.addEventListener('exit', function(){ $('body').removeClass('inappbrowser_windowed_mode'); });
	} catch(e) { 
		catchError('test_InAppBrowser()',e); 
	}
}

function test_InAppBrowser_NoOptions(){
	report('TEST','--> test_InAppBrowser_NoOptions()..');
	try{
		//doAlert('Website will now be opened via InAppBrowser [window.open]','cordova-inappbrowser');
		window.open('http://www.ign.com','_blank','fullscreenbuttonenabled=no');
	}catch(e){ catchError('test_InAppBrowser_NoOptions()',e); }
}


function test_PDFBrowser(){
	report('TEST','--> test_PDFBrowser()..');
	try{

		var pdfView;
		var windowHeight, windowWidth, viewX, viewY;
		viewX = 0;
		viewY = 0;
		windowHeight = window.innerHeight;
		windowWidth = window.innerWidth;

		pdfView = window.open('pdf/example.pdf','_blank',
							  'enableviewportscale=yes,fullscreenbuttonenabled=no,' +
							  'location=no,' +
							  'vw=' + windowWidth + ',' +
							  'vh=' + windowHeight + ',' +
							  'vx=' + viewX + ',' +
							  'vy=' + viewY);
	
		//pdfView.addEventListener('loadstart', function(){ setBodyPDFClass(); });
		//pdfView.addEventListener('exit', function(){ pdfView.close(); clearBodyPDFClass(); });


	}catch(e){ catchError('test_PDFBrowser()',e); }
}

function test_PDFBrowser_Form(){
	report('TEST','--> test_PDFBrowser_Form()..');
	try{
		if(isNativeAppMode()==false){
			doAlert('Please Note: The [InAppBrowser] plugin\'s dimension and position parameters only work on an actual device.','Plugin Note');
		}
		window.open('pdf/example.pdf','_blank','enableviewportscale=yes,presentationstyle=formsheet');
		
	}catch(e){ catchError('test_PDFBrowser_Form()',e); }
}

function test_PDFBrowser_Vertical(){
	report('TEST','--> test_PDFBrowser_Vertical()..');
	try{

		var pdfView;
		var windowHeight, windowWidth, viewX, viewY;
		viewX = 0;
		viewY = (window.innerHeight*.35)/2;                    
		windowHeight = window.innerHeight*.65;        
		windowWidth = window.innerWidth;
		
		pdfView = window.open('pdf/example.pdf','_blank',
							  'enableviewportscale=yes,' +
							  'location=no,' +
							  'vw=' + windowWidth + ',' +
							  'vh=' + windowHeight + ',' +
							  'vx=' + viewX + ',' +
							  'vy=' + viewY);            

	}catch(e){ catchError('test_PDFBrowser_Vertical()',e); }
}

function test_PDF_Windowed(){
	report('TEST','--> test_PDF_Windowed()..');
	try{
		
		if(isNativeAppMode()==false){
			doAlert('Please Note: The [InAppBrowser] plugin\'s dimension and position parameters only work on an actual device.','Plugin Note');
		}
		
		var windowHeight, windowWidth;
		var viewX = window.innerWidth*.05;
		var viewY = 0;
		windowHeight = window.innerHeight;
		windowWidth = window.innerWidth*.90;
		
		var pdfView = window.open('pdf/example.pdf','_blank',
							  'enableviewportscale=yes,' +
							  'location=no,' +
							  'vw=' + windowWidth + ',' +
							  'vh=' + windowHeight + ',' +
							  'vx=' + viewX + ',' +
							  'vy=' + viewY);     
		pdfView.addEventListener('loadstart', function(){ $('body').addClass('inappbrowser_windowed_mode'); });
		pdfView.addEventListener('exit', function(){ $('body').removeClass('inappbrowser_windowed_mode'); });
		
	}catch(e){ catchError('test_PDF_Windowed()',e); }
}

function test_SDID(){
	report('TEST','--> test_SDID()..');
	try{
		if(isNativeAppMode()==false){
			doAlert('Sorry: The [SecureDeviceIdentifier] plugin only works on an actual device.','Plugin Error');
			return false;
		}
		getDeviceID();
		var id = window.setTimeout(function(){
								   report('TEST','deviceSDID: ' + deviceSDID + '...');
								   $('#device_id').html(deviceSDID);
								   },1000);
		doAlert('Unique Device ID will be retrieved momentarily - please wait.','cordova-securedeviceidentifier');
		
		
	}catch(e){ catchError('test_SDID()',e); }
}

function test_PowerManagement(){
	report('TEST','--> test_PowerManagement()..');
	try{
		
		if(isNativeAppMode()==false){
			doAlert('Sorry: The [PowerManagement] plugin only works on an actual device.','Plugin Error');
			return false;
		}
		
		
		if(!autoLockIsDisabled){
			PWpreventAutoLock();
			autoLockIsDisabled = true;
			$('#powermgmt_status').html('AUTO DIM/LOCK: <b>DISABLED</b>');
			doAlert('App will now PREVENT auto lock/auto dim. Please wait a 30-60 seconds to confirm.','cordova-powermanagement');
		}else{
			PWreenableAutoLock();
			autoLockIsDisabled = false;
			$('#powermgmt_status').html('AUTO DIM/LOCK: <b>ENABLED</b>');
			doAlert('App will now ALLOW auto lock/auto dim as normal. Please wait a 30-60 seconds to confirm.','cordova-powermanagement');
		}
		
	}catch(e){ catchError('test_PowerManagement()',e); }
}

function test_Badge(){
	
	try{
		
		if(isNativeAppMode()==false){
			doAlert('Sorry: The [Badge] plugin only works on an actual device.','Plugin Error');
			return false;
		}
		
		cdvBadge = window.plugins.badge;
		
		report('TEST','--> test_Badge().. [cdvBadge:' + cdvBadge + '?]');
		
		if(badgeToggledOn){
			if(cdvBadge != undefined){
				cdvBadge.set(0);
				cdvBadge.clear();
			}
			doAlert('App Icon Badge Removed!\n\nExit app to confirm.','cordova-badge');
			badgeToggledOn = false;
			
		}else{
			if(cdvBadge != undefined) cdvBadge.set(1);
			doAlert('App Icon Badge Added!\n\nExit app to confirm.','cordova-badge');
			badgeToggledOn = true;
		}
		
	}catch(e){ catchError('test_Badge()',e); }
}

$(window).bind('hashchange', function(){
	showModal();
	if (navigator.userAgent.match(/(iPad|iPhone)/)) {
		iosModifyStatusBar();
	}
	checkTopNaviAppConfig();
	// checkTopNaviRoles();
	bindSwipeBack();
	clearIntervals();
	showDeleteBar(false);
	$("#flexiblecontent").animate({
		marginLeft: "0px",
	}, 500, function () {
		menuStatus = false;
		menuSwitched(false);
	});
});

function bindSwipeBack() {
	$('#body').off( "swiperight", "#page-content").on( "swiperight", "#page-content", function( e ) {
		e.preventDefault();
		alert('swiped on body');
		history.back();
		return(false);
	});
}
bindSwipeBack();

function NewbindSwipeBack() {
	$('#body').off( "swiperight", "#container").on( "swiperight", "#container", function( e ) {
		alert('aaa');
	});
}
NewbindSwipeBack();
*/

/*
window.addEventListener('load', function () {
	$('a').click(function(e){
		alert('Click!');
		e.preventDefault();
	});
}, false);

$('body').off('click','#captureVideoLinkButton').on('click','#captureVideoLinkButton',function(e) { 
	e.preventDefault();
	// $('#linkVideoUrl').val('bla');
	var videoLink = $('#linkVideoUrl').val();
	var popupid = 'popupBasic';
	// var el = $( "#"+popupid );
	var activepage = $('#popupBasic-popup');
	var el = activepage.find('#popupBasic');
	// if (window.heavyDebug) console.log(el);
	el.popup( "close" );
	$('#body').find('#popupBasic').each(function() {
		// if (window.heavyDebug) console.log($(this));
		$(this).remove();
	});
	// $('#popupBasic').remove();
});

$('body').off('click','#closewelcomepopupbtn').on('click','#closewelcomepopupbtn',function(e) { 
	e.preventDefault();
	setTimeout(function() {
		$( "#welcomepopup" ).popup( "close" );
	},1);
});

// $( "#tutorialpopup" ).popup( "open", {transition: 'fade'} );
$( "#welcomepopup" ).bind({
	popupafterclose: function(event, ui) { 
		$( "#tutorialpopup" ).popup( "open", {transition: 'fade'} );
	}
});

$('body').off('click','#closepopupbtn').on('click','#closepopupbtn',function(e) { 
	e.preventDefault();
	setTimeout(function() {
		$( "#tutorialpopup" ).popup( "close" );
		window.system.showtutorial = false;
	},1);
});

$('body').off('click','#showPageOptionsLink').on('click','#showPageOptionsLink',function(e) { 
	e.preventDefault();
	// alert('bla');
	showPageOptions();
	// checkTopNaviRoles();
	checkTopNaviAppConfig();
});

$('body').off( "swipeleft", ".swipeToDeleteHover").on( "swipeleft", ".swipeToDeleteHover", function( e ) {
// $('body').off( "click", ".swipeToDeleteHover").on( "click", ".swipeToDeleteHover", function( e ) {
	e.preventDefault();
	// alert('swiped on element to hover');
	var delbarid = $(this).attr('data-delbarid');
	// alert(delbarid);
	var delbar = $('#'+delbarid);
	var w = $(window).width()-30-15;
	delbar.css("width",w+"px"); // .css("z-index","auto");
	delbar.css("opacity","1.0"); // .css("z-index","auto");
	$(this).removeClass( 'swipeToDeleteHover' );
	$(this).addClass( 'swipeToDeleteHoverActive' );
	// $(this).find('input:text, input:checkbox').each(function() {
});
$('body').off( "swipeleft", ".swipeToDeleteHover").on( "swipeleft", ".swipeToDeleteHover", function( e ) {
// $('body').off( "click", ".swipeToDeleteHoverActive").on( "click", ".swipeToDeleteHoverActive", function( e ) {
	e.preventDefault();
	// alert('swiped on element to hover deactivate');
	var delbarid = $(this).attr('data-delbarid');
	// alert(delbarid);
	var delbar = $('#'+delbarid);
	delbar.css("width","45px"); // .css("z-index","auto");
	delbar.css("opacity","0.5"); // .css("z-index","auto");
	$(this).removeClass( 'swipeToDeleteHoverActive' );
	$(this).addClass( 'swipeToDeleteHover' );
});

$('body').off( "click", ".navigateButton").on( "click", ".navigateButton", function( e ) {
	e.preventDefault();
	var href = $(this).attr('href');
	// alert(cardpageid);
	window.location.href = href;
	return(false);
	// window.location.href = e.currentTarget.hash;
});

$('body').off( "click", ".showDelBarBtn").on( "click", ".showDelBarBtn", function( e ) {
	e.preventDefault();
	// alert('swiped on element to hover activate');
	var delbarid = $(this).attr('data-delbarid');
	// alert(delbarid);
	var delbar = $('#'+delbarid);
	var w = $(window).width()-30-15;
	delbar.css("width",w+"px"); // .css("z-index","auto");
	delbar.css("opacity","1.0"); // .css("z-index","auto");
	$(this).removeClass( 'showDelBarBtn' );
	$(this).addClass( 'hideDelBarBtn' );
});
$('body').off( "click", ".hideDelBarBtn").on( "click", ".hideDelBarBtn", function( e ) {
	e.preventDefault();
	// alert('swiped on element to hover deactivate');
	var delbarid = $(this).attr('data-delbarid');
	// alert(delbarid);
	var delbar = $('#'+delbarid);
	delbar.css("width","45px"); // .css("z-index","auto");
	delbar.css("opacity","0.5"); // .css("z-index","auto");
	$(this).removeClass( 'hideDelBarBtn' );
	$(this).addClass( 'showDelBarBtn' );
});


$('body').off( "swipeleft", ".swipeToDelete").on( "swipeleft", ".swipeToDelete", function( e ) {
// $('body').off( "click", ".swipeToDelete").on( "click", ".swipeToDelete", function( e ) {
	e.preventDefault();
	// alert('swiped on element');
	var listitem = $(this);
	deleteElementSwitch(listitem);
});

function deleteElementSwitch(el) {
	var listitem = el;
	el.toggleClass( 'ui-btn-up-d' );
	var selected = 0;
	$('.swipeToDelete').each(function () {
		if ($(this).hasClass( "ui-btn-up-d" )) {
			selected = selected + 1;
		}
	});
	if (selected>0) showDeleteBar(true);
	else showDeleteBar(false);
}

$('body').off( "click", ".deleteBarLink").on( "click", ".deleteBarLink", function( e ) {
	e.preventDefault();
	// alert('swiped on element');
	doConfirm('Der Eintrag kann nicht wiederhergestellt werden!', 'Wirklich löschen?', function (clickevent) { 
		if (clickevent=="1") {
			$.when( deleteFlowClicked() ).done(
				function( result ) {
					// if (window.heavyDebug) console.log('end deleteFlowClicked');
				}
			);
		}
	}, "Ja,Nein");
});

function deleteFlowClicked() {
	deleteMessageFlow();
}

function deleteMessageFlow() {
	showModal();
	var count = 0;
	// if (window.heavyDebug) console.log($('.swipeToDelete').find('li .ui-btn-up-d'));
	$('.swipeToDelete').each(function () {
		var this_cat = $(this).attr('data-cat');
		if ($(this).hasClass( "ui-btn-up-d" )) {
			$(this).remove();
			if (this_cat=='messages') {
				var this_id = $(this).attr('data-id');
				dpd.messages.get(this_id, function (result) {
					var query = { $or:[{"sender":result.receiver,"receiver":result.sender}  ,  {"sender":result.sender,"receiver":result.receiver}] };
					dpd.messages.get(query, function (messages) {
						for(key = 0; key < messages.length; key++) {
							var message = messages[key];
							dpd.messages.put(message.id, {"deleted":true}, function(result, err) {
								count++;
								if (count==messages.length) {
									window._thisMessagesViewNested.fetch();
									deleteFlowDone();
								}
							});
						}
					});
				});
			}
			if (this_cat=='cardpages') {
				var this_id = $(this).attr('data-cardpageid');
				// if (window.heavyDebug) console.log(this_id);
				dpd.cardpages.put(this_id, {"deleted":true}, function(result, err) {
					if(err) {
						return console.log(err);
						hideModal();
					}
					// if (window.heavyDebug) console.log(result);
					hideModal();
				});
				window._thisViewCardEditNested.initialize();
				deleteFlowDone();
			}
		}
	});
}

function deleteFlowDone() {
	// if (window.heavyDebug) console.log('done');
	hideModal();
	showDeleteBar(false);
}

$('body').off( "click", ".messagesendbutton").on( "click", ".messagesendbutton", function( e ) {
	e.preventDefault();
	$("#newmessageform").submit();
});

$('body').off( "submit", ".newmessageform").on( "submit", ".newmessageform", function( e ) {
	e.preventDefault();
	if($('#messagetextarea').val().length==0) return(false);
	var sender = window.me.id;
	var receiver = $('#receiver').val();
	if (receiver=='') {
		doAlert('Es ist kein Empfänger definiert...','Ups. Entschuldigung!');
		return(false);
	}
	var content = $('#messagetextarea').val();
	$('.newmessageform').css({'opacity':'0.6'});
	$('#messagesendbutton').addClass( 'ui-disabled' );
	$('#messagetextarea').addClass( 'ui-disabled' );
	var postvals = {sender: sender, receiver: receiver, content: content, cdate: system.timestamp};
	dpd.messages.post(postvals, function(result, err) {
		if(err) {
			$('#messagesendbutton').removeClass( 'ui-disabled' );
			$('#messagetextarea').removeClass( 'ui-disabled' );
			$('.newmessageform').css({'opacity':'0.7'});
			alert(err.message);
			return console.log(err);
		}
		$('.newmessageform').css({'opacity':'0.7'});
		$('#messagesendbutton').removeClass( 'ui-disabled' );
		$('#messagetextarea').removeClass( 'ui-disabled' );
		$('#messagetextarea').val( '' );
		$('#messagesendbutton').css({'color':'#707070'});
		$('#messagetextarea').css({'max-height':'40px'});
		// if (window.heavyDebug) console.log(result, result.id);
	});
	return(false);
});

$('#body').off('change','.activecb').on('change','.activecb',function(e) { 
	e.preventDefault();
	var id = $(this).attr('data-id');
	// alert(id);
	var status = e.currentTarget.checked;
	var dbtype = $(this).attr('data-dbtype');
	if (dbtype=="video") dpd.videos.put(id, {"active":status});
	else if (dbtype=="card") dpd.cards.put(id, {"active":status});
	return(false);
});

	$('#body').off('slidestop','#sliderprice').on('slidestop','#sliderprice',function(event){
		var id = $('#sliderprice').attr('data-id');
		if (id!=undefined) {
			showModal();
			var priceincoins = $('#sliderprice').val();
			$('#priceincoins').html(priceincoins);
			var dbtable = "";
			var dbtype = $('#sliderprice').attr('data-dbtype');
			// if (window.heavyDebug) console.log(dbtype);
			// return(false);
			if(dbtype=="video") dbtable="videos";
			if(dbtype=="card") dbtable="cards";
			$.ajax(dpd_server+''+dbtable+'/?id='+id,{
				type:"POST",
				contentType: "application/json",
				async: false,
				data: JSON.stringify({price: priceincoins}),
			}).done(function(result) {
				var priceineuro = ((Math.ceil(priceincoins*0.0055*100))/100).toString().replace(".", ",");
				if (priceineuro.split(",")[1]==undefined) priceineuro = priceineuro + ",00";
				else if (priceineuro.split(",")[1].length==0) priceineuro = priceineuro + "00";
				else if (priceineuro.split(",")[1].length==1) priceineuro = priceineuro + "0";
				$('#priceineuro').html(priceineuro);
			}).fail(function() {
				// if (window.heavyDebug) console.log( "Es ist leider ein Fehler passiert, der nicht passieren sollte.", "Entschuldigung..." );
				return(false);
			}).always(function() {
				hideModal();
			});
		}
	});

	$('#body').off('change','#sliderprice').on('change','#sliderprice',function(event){
		// if (window.heavyDebug) console.log(event);
		var id = $('#sliderprice').attr('data-id');
		var priceincoins = $('#sliderprice').val();
		$('#priceincoins').html(priceincoins);
		var priceineuro = ((Math.ceil(priceincoins*0.0055*100))/100).toString().replace(".", ",");
		if (priceineuro.split(",")[1]==undefined) priceineuro = priceineuro + ",00";
		else if (priceineuro.split(",")[1].length==0) priceineuro = priceineuro + "00";
		else if (priceineuro.split(",")[1].length==1) priceineuro = priceineuro + "0";
		$('#priceineuro').html(priceineuro);
	});

$('#body').off('change','.publiccb').on('change','.publiccb',function(e) { 
	e.preventDefault();
	var id = $(this).attr('data-id');
	var status = e.currentTarget.checked;
	var dbtype = $(this).attr('data-dbtype');
	if (dbtype=="video") dpd.videos.put(id, {"public":status});
	else if (dbtype=="card") dpd.cards.put(id, {"public":status});
	return(false);
});

$('#body').off( "keyup", "#messagetextarea").on( "keyup", "#messagetextarea", function( e ) {
	e.preventDefault();
	$('.newmessageform').css({'opacity':'0.9'});
	var txt = $('#messagetextarea').val();
	$('#messagetextarea').val(txt.replace(/[\n\r]+/g, ""));
	$('#newmessageform').css({'bottom':'0px'});
	$('#page-content').stop().animate({
	  scrollTop: $("#page-content")[0].scrollHeight
	}, 1000);
	checkTextareaValue();
});

$('#body').off( "focus", "#messagetextarea").on( "focus", "#messagetextarea", function( e ) {
	e.preventDefault();
	$('.newmessageform').css({'opacity':'0.9'});
	$('#messagetextarea').css({'max-height':'80px'});
	checkTextareaValue();
	$('#page-content').stop().animate({
	  scrollTop: $("#page-content")[0].scrollHeight
	}, 1000);
});
$('#body').off( "blur", "#messagetextarea").on( "blur", "#messagetextarea", function( e ) {
	e.preventDefault();
	$('.newmessageform').css({'opacity':'0.7'});
	checkTextareaValue();
});

function checkTextareaValue() {
	// if (window.heavyDebug) console.log($('#messagetextarea').val().length);
	if ($('#messagetextarea').val() && $('#messagetextarea').val().length > 0) {
		// if (window.heavyDebug) console.log('b');
		$('#messagesendbutton').css({'color':'#0645AD'});
		// $('#messagesendbutton').removeClass( 'ui-disabled' );
	}
	else {
		// if (window.heavyDebug) console.log('c');
		$('#messagesendbutton').css({'color':'#707070'});
		// $('#messagesendbutton').addClass( 'ui-disabled' );
	}
}

$(document).on('click', ".external", function (e) {
	e.preventDefault();
	var targetURL = $(this).attr("href");
	window.open(targetURL, "_system");
});

function checkTopNaviRoles() {
	 try {
		$( "#pageOptions li" ).each(function(index, value) {
			var lirole = $(this).attr('data-roles');
			if (lirole == 'public') { 
				$(this).css('visibility','visible');
				$(this).css('display','block');
			}
			else {
				if (lirole != undefined) {
					if (checkRole(lirole)==true) {
						$(this).css('visibility','visible');
						$(this).css('display','block');
					}
					else {
						$(this).css('visibility','hidden');
						$(this).css('display','none');
					}
				}
			}
		});
	} catch (e) {
	}
}

function checkTopNaviAppConfig() {
	 try {
		// alert('checkTopNaviAppConfig');
		$( "#pageOptions li" ).each(function(index, value) {
			var liconfig = $(this).attr('data-appconfig');
			// if (window.heavyDebug) console.log('is '+liconfig+' enabled: '+checkAppConfig(liconfig));
			if (checkAppConfig(liconfig)==true) {
			// if (liconfig == '' || liconfig == 'public' || liconfig == undefined) { 
				var lirole = $(this).attr('data-role');
				// if (window.heavyDebug) console.log('do i have access to '+lirole+': '+checkRole(lirole));
				if (checkRole(lirole)) {
					$(this).css('visibility','visible');
					$(this).css('display','block');
				}
				else {
					$(this).css('visibility','hidden');
					$(this).css('display','none');
				}
			}
			else {
				$(this).css('visibility','hidden');
				$(this).css('display','none');
			}
			
		});
	} catch (e) {
	}
}

$('#footervideolink').on("vclick", function (e) {
	// report('footer clicked');
	if (footervideoStatus != true) {
		$("#footer").animate({
			height: "40%",
		}, 500, function () {
			footervideoStatus = true;
		});
	}
	else {
		$("#footer").animate({
			height: "20px",
		}, 500, function () {
			footervideoStatus = false;
		});
	}
	return false;
});

$('#showMenu').on("click", function (e) {
	e.preventDefault();
	if (menuStatus != true) {
		$("#flexiblecontent").animate({
			marginLeft: "220px",
		}, 500, function () {
			menuStatus = true;
			menuSwitched(true);
		});
	} else {
		$("#flexiblecontent").animate({
			marginLeft: "0px",
		}, 500, function () {
			menuStatus = false;
			menuSwitched(false);
		});
	}
	return false;
});
$('#sidebarListViewDiv').on("vclick", "#menuelement a.contentLink", function (event) {
	event.preventDefault();
	$("#flexiblecontent").animate({
		marginLeft: "0px",
	}, 500, function () {
		menuStatus = false;
		menuSwitched(false);
		// if (window.heavyDebug) console.log(event.target.hash);
		// if (window.heavyDebug) console.log(event);
		// if (window.heavyDebug) console.log(event.target.getAttribute('data-href'));
		var tgt = event.target.getAttribute('data-href');
		var type = event.target.getAttribute('data-type');
		// alert(tgt);
		// if (window.heavyDebug) console.log(tgt);
		// .getAttribute('data-fruit');
		// window.location.href = event.target.hash;
		if (type=="popup") {
			$( ""+tgt ).popup().trigger('create').css("height","auto").css("width","auto");
			$( ""+tgt ).popup().trigger('create').css("max-height","300").css("max-width","auto");
			$( ""+tgt ).popup( "open", {transition: 'fade'} );
		}
		else window.location.href = tgt;
		// alert('getURLParameter(window.location.href): ' + getURLParameter(window.location.href));
		// $.mobile.changePage( "#aboutus", { transition: "slideup", changeHash: true });
		// $.mobile.changePage( "#aboutus" , { reverse: false, changeHash: false } );
	});
});

var menuSwitched = function(status) {
	var menuSwitchedDeferred = $.Deferred();
	var menuSwitchedDeferredWatcher = menuSwitchedDeferred.then(function( value ) {
		return status;
	});
	menuSwitchedDeferred.resolve();
	menuSwitchedDeferredWatcher.done(function( value ) {
		// alert(value);
		// if (window.heavyDebug) console.log(value);
	});
};

function getAppModules() {
	// get app data and roles
	$.ajax(dpd_server+'appoptions/',{
		type:"GET",
		async: false,
	}).done(function(result) {
		window.system.app.options.modules = result[0];
	});
}
getAppModules();

function checkLogin() {
	// get owner data and roles
	$.ajax(dpd_server+'users/?kdnr='+window.system.owner.kdnr,{
		type:"GET",
		async: false,
	}).done(function(result) {
		var owner = result[0];
		window.system.owner = owner;
		// window.system.master = owner.master;
	});
}

// alert(system.contentHelper);
$("#body > *").off('click').on('click',function(event){
	// event.preventDefault();
	// window.location.href = event.currentTarget.hash;
	// if (window.heavyDebug) console.log(event);
	// if (window.heavyDebug) console.log(event.currentTarget.attributes);
	alert(event.currentTarget.id);
	alert(event.currentTarget);
});

function handleOpenURL(url) {
  setTimeout(function() {
	// alert("received url: " + url);
	alert("received url");
  }, 0);
}

function renderList(employees) {
	// alert('Rendering list using local SQLite data...');
	dao.findAll(function(employees) {
		$('#list').empty();
		var l = employees.length;
		for (var i = 0; i < l; i++) {
			var employee = employees[i];
			$('#list').append('<tr>' +
				'<td>' + employee.id + '</td>' +
				'<td>' +employee.firstName + '</td>' +
				'<td>' + employee.lastName + '</td>' +
				'<td>' + employee.title + '</td>' +
				'<td>' + employee.officePhone + '</td>' +
				'<td>' + employee.deleted + '</td>' +
				'<td>' + employee.lastModified + '</td></tr>');
		}
	});
}

function getCustomer(userid){
	var d = $.Deferred();
	var requestUrl = dpd_server+"users?deleted=false&id="+userid;
	$.ajax({
		async: true,
		url: requestUrl
	}).done(function(p){
		d.resolve(p);
	}).fail(d.reject); 
	return d.promise();
}

function mySuccessFunction(result) {
	// if (window.heavyDebug) console.log('mySuccessFunction');
	// if (window.heavyDebug) console.log(result);
	var requestUrl = dpd_server+"users?deleted=false&sponsor="+result.sponsor;
	var promise = $.ajax({
		async: true,
		url: requestUrl
	});
	promise.then(secondSuccessFunction, myErrorFunction);
}
function secondSuccessFunction(resultFull) {
	// if (window.heavyDebug) console.log('secondSuccessFunction');
	// if (window.heavyDebug) console.log(resultFull);
}
function myErrorFunction() {
	// if (window.heavyDebug) console.log('myErrorFunction');
}
*/
