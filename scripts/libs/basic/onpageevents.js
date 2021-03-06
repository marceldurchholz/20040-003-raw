if (window.heavyDebug) console.log('onpageevents.js documentready');

/********************** START: Top Loading Bar **********************/
function createLoadingBar() {
	var selector = $.mobile.activePage;
	var hasChildren = selector.children("[data-pastload-loadingbar]").length;
	// var loadingVisualElement = '<img src="scripts/libs/jquery.mobile/images/ajax-loader.gif" style="height:100%;">';
	// if (window.heavyDebug) console.log($(window).width()/2-30));
	var loadingVisualElement = '<div class="loader" style="min-height:34px;padding-left:'+(($(window).width()/2)-30)+'px"><div class="bar"></div><div class="bar"></div><div class="bar"></div></div>';
	if (hasChildren==0) {
		selector.prepend('<div id="pastloadloadingbar" data-pastload-loadingbar="true"><ul id="pastloadloadingbarul" data-role="listview" data-theme="a" data-inline="false" data-corners="false" data-shadow="false" data-divider-theme="h"><li id="pastloadloadingbarli" data-role="list-divider" style="text-align:center;">'+loadingVisualElement+'</li></ul></div>').trigger("create");
		selector.children("[data-pastload-loadingbar]")
		.find("ul").css("padding-top","0px").css("padding-bottom","21px").css("margin-top","-16px").css("margin-bottom","0px").hide().end()
		.find("li").css("padding-top","22px").css("padding-bottom","12px").css("margin-top","0px").css("margin-bottom","0px").end();
	}
}
function slideDownLoadingBar() {
	var d = $.Deferred();
	$.mobile.activePage.children("[data-pastload-loadingbar]").find("ul").slideDown(0, function() {
		d.resolve();
	}).end();
	return d.promise();
}
function slideUpLoadingBar() {
	if (window.pagecreated==1 || window.btnBackClicked==1) {
		//setTimeout(function() {
			$.mobile.activePage.children("[data-pastload-loadingbar]").find("ul").slideUp(0, function() {
				// if (window.heavyDebug) console.log('bar slided');
			}).end();
		// },1);
	}
}
/********************** END: Top Loading Bar **********************/

function startBuildVideos(selector) {
	selector.find('[data-pastload-javascript]').each(function() {
		var __this = $(this);
		var _this = $(this).children(":first");
		// console.log(_this);
		// var placeholder = $(_this).attr('data-placeholder');
		// if(placeholder==undefined) placeholder="";
		// $(__this).attr('data-postedittype')
		// var val = (m<=9 ? '0' + m : m);
		var postedittype = ($(__this).attr('data-postedittype')!=undefined ? $(__this).attr('data-postedittype') : "text");
		// if (window.heavyDebug) console.log(postedittype);
		$(_this).editable(function(value, settings) { 
			 // console.log(this);
			 // console.log(value);
			 // console.log(settings);
			 var postObj = new Object();
			 postObj.value = value;
			 postObj.settings = settings;
			 // postObj.settings.posturl = $(this).attr('data-posturl');
			 // postObj.settings.postfield = $(this).attr('data-postfield');
			 saveUserValue(postObj);
			 return(value);
		  }, { 
			 type:postedittype,
			 // id:'users.slogan.userid',
			 // posturl:$(this), // dpd_server+'users/?id='+me.id,
			 width:'100%',
			 // height:'100px',
			 // style: 'max-height: 100px',
			 // name: 'slogan',
			 // style: "inherit",
			 pastloadfield: $(_this).attr('data-pastload-field'),
			 placeholder: $(__this).attr('data-placeholder'),
			 posturl: $(__this).attr('data-posturl'),
			 postfield: $(__this).attr('data-postfield'),
			 onblur: "submit",
			 // onblur: function() { }, // "submit",
			 onerror: function (settings, original, xhr) {
				original.reset();
				//do whatever you want with the error msg here
				// if (window.heavyDebug) console.log(xhr.responseText);
			 }  
		});
	});
}

function startBuildEditables(selector) {
	selector.find('[data-posteditable]').each(function() {
		var __this = $(this);
		var _this = $(this).children(":first");
		// console.log(_this);
		// var placeholder = $(_this).attr('data-placeholder');
		// if(placeholder==undefined) placeholder="";
		// $(__this).attr('data-postedittype')
		// var val = (m<=9 ? '0' + m : m);
		var postedittype = ($(__this).attr('data-postedittype')!=undefined ? $(__this).attr('data-postedittype') : "text");
		// if (window.heavyDebug) console.log(postedittype);
		$(_this).editable(function(value, settings) { 
			 // console.log(this);
			 // console.log(value);
			 // console.log(settings);
			 var postObj = new Object();
			 postObj.value = value;
			 postObj.settings = settings;
			 // postObj.settings.posturl = $(this).attr('data-posturl');
			 // postObj.settings.postfield = $(this).attr('data-postfield');
			 saveUserValue(postObj);
			 return(value);
		  }, { 
			 type:postedittype,
			 // id:'users.slogan.userid',
			 // posturl:$(this), // dpd_server+'users/?id='+me.id,
			 width:'100%',
			 // height:'100px',
			 // style: 'max-height: 100px',
			 // name: 'slogan',
			 // style: "inherit",
			 pastloadfield: $(_this).attr('data-pastload-field'),
			 placeholder: $(__this).attr('data-placeholder'),
			 posturl: $(__this).attr('data-posturl'),
			 postfield: $(__this).attr('data-postfield'),
			 onblur: "submit",
			 // onblur: function() { }, // "submit",
			 onerror: function (settings, original, xhr) {
				original.reset();
				//do whatever you want with the error msg here
				// if (window.heavyDebug) console.log(xhr.responseText);
			 }  
		});
	});
}


$(document).off( "pageinit" ).on( "pageinit", function( event ) {
	if (window.heavyDebug) console.log('onpageevents.js >> $(document).off( "pageinit" ).on( "pageinit", function( event ) {...');
});
$(document).off( "pagebeforeshow" ).on( "pagebeforeshow", function( event ) {
	if (window.heavyDebug) console.log('onpageevents.js >> $(document).off( "pagebeforeshow" ).on( "pagebeforeshow", function( event ) {...');
});
$(document).off( "pagebeforehide" ).on( "pagebeforehide", function( event ) {	
	if (window.heavyDebug) console.log('onpageevents.js >> $(document).off( "pagebeforeinit" ).on( "pagebeforeinit", function( event ) {...');
});
$(document).off( "pagehide" ).on( "pagehide", function( event ) {	
	if (window.heavyDebug) console.log('onpageevents.js >> $(document).off( "pagehide" ).on( "pagehide", function( event ) {...');
	if (window.heavyDebug) console.log($.mobile.activePage);
});
$(document).off( "pagebeforecreate" ).on( "pagebeforecreate", function( event ) {
	if (window.heavyDebug) console.log('onpageevents.js >> $(document).off( "pagebeforecreate" ).on( "pagebeforecreate", function( event ) {...');
	// $(document).find('.ui-page').show();
	// handleGhostViews();
});
$(document).off( "pagecreate" ).on( "pagecreate", function( event ) {
	// $(document).find('.ui-page').show();
	if (window.heavyDebug) console.log('onpageevents.js >> $(document).off( "pagecreate" ).on( "pagecreate", function( event ) {...');
	/*
	// console.log('pagecreate | setting window.pagecreated = 1');
	$.mobile.activePage.find('div[data-role="header"]').each(function(e) {
		e.preventDefault();
		$(this).attr('data-tap-toggle','false');
		return(false);
	});
	*/
	window.pagecreated = 1;
	
});

$(document).off( "pagechange" ).on( "pagechange", function( event ) {
	if (window.heavyDebug) console.log('onpageevents.js >> $(document).off( "pagechange" ).on( "pagechange", function( event ) {...');
	/*
	try {
		// alert('trying...');
		$('#container').find('.footer[data-moved="true"]').remove();
		$('.footer[data-moved="true"]').remove();
		$('.footer').attr('data-moved','true')
		$('.footer').appendTo('#container');
	} catch(e) {
		alert(e);
	}
	try {
		// alert('trying...');
		$('#container').find('.ui-content[data-moved="true"]').remove();
		$('.ui-content[data-moved="true"]').remove();
		$('.ui-content').attr('data-moved','true')
		$('.ui-content').appendTo('#container');
	} catch(e) {
		alert(e);
	}
	*/
	$.mobile.defaultPageTransition = window.defaultPageTransition;
	createLoadingBar();
	window.ajaxLoader = 0;
	window.modules_to_parse = 0;
	// if (window.btnBackClicked==1) {
	if (window.pagecreated!=1 && window.btnBackClicked==1) {
		window.pagechange_timestamp = dateYmdHis();
		// alert('setting window.pagechange_timestamp to : ' + window.pagechange_timestamp);
		// window.pagechange_timestamp = dateYmdHis();
		// PLDR_resetCreated($.mobile.activePage);
	}
	PLDR_begin($.mobile.activePage);
	PLDR_begin($('#panel_left'));
	PLDR_begin($('#panel_right'));
	correctPageSize();
});

$(document).off( "pageshow" ).on( "pageshow", function( event ) {
	console.log('onpageevents.js >> $(document).off( "pageshow" ).on( "pageshow", function( event ) {...');
	correctPageSize();
	/*
	setTimeout(function() {
		correctPageSize();
	},2000);
	*/
	// alert($('#container').height());
	// alert($('#container').first().height());
	
	/*
	// create an object named "prefetchapp" which we can define methods on
	var prefetchapp = {
		// returns an array of each url to prefetch
		prefetchLinks: function(){
			// returns an array of each a.prefetch link's href
			// var hrefs = $("a.prefetch").map(function(index, domElement){
			// var hrefs = $("a").not("[prefetched='true']").map(function(index, domElement){
			var hrefs = $.mobile.activePage.find("a[href]").not("[prefetched='true']").map(function(index, domElement){
				$(this).attr('prefetched','true');
				return $(this).attr("href");
			});
			// returns the array of hrefs without duplicates
			return $.unique(hrefs);
		},

		// adds a link tag to the document head for each of prefetchLinks()
		addPrefetchTags: function(){
			// for each prefetchLinks() ...
			this.prefetchLinks().each(function(index,Element){
				// create a link element...
				// alert('index');
				$("<link />", {
					// with rel=prefetch and href=Element...
					rel: "prefetch", href: Element
					// and append it to the end of the document head
				}).appendTo("head");            
			});
		},
	}
	// when the document is ready...
	// $(function(){
		// alert('call the method we defined above.');
		prefetchapp.addPrefetchTags();
	// });
	*/
	
});

/********************** START: PLDR - Past Load Dynamic Recursion **********************/
function PLDR_resetCreated(selector) {
	// if (window.heavyDebug) console.log('PLDR_resetCreated starting');
	// if (window.heavyDebug) console.log('resetting data-pastload-created');
	selector.find('[data-pastload-created]').each(function() {
		// if ($(this).attr('')) { is this is not a li oder a ul
			// if (window.heavyDebug) console.log($(this));
			$(this).removeAttr('data-pastload-created');
		// }
		// $(this).attr('data-pastload-resetted','true');
	});
	// if (window.heavyDebug) console.log('PLDR_resetCreated done');
}
function PLDR_begin(el) {
	// if (window.heavyDebug) console.log('doing PLDR_begin');
	// if (window.heavyDebug) console.log('PLDR_getArray($.mobile.activePage).length: '+PLDR_getArray($.mobile.activePage).length);
	if (PLDR_getArray(el).length>0) {
		$.when(slideDownLoadingBar()).done(function(){
		setTimeout(function() {
			PLDR_recursion(el);
		},0);
		}).fail(function() {
		}).always(function() {
		});
	}
}
function PLDR_recursion(el) {
	// if (window.heavyDebug) console.log('doing PLDR_recursion');
	var PLDR_array = PLDR_getArray(el);
	if (PLDR_array.length>0) {
		foreach_async(PLDR_array,PLDR_foreach,PLDR_arraywalkDone);
	} else {
		var PLDR_modules_to_parse = $.mobile.activePage.find('[data-pastload-module]').not("[data-pastload-created]").length;
		var PLDR_modules_to_parse_b = $('#panel_left').find('[data-pastload-module]').not("[data-pastload-created]").length;
		var PLDR_modules_to_parse_c = $('#panel_right').find('[data-pastload-module]').not("[data-pastload-created]").length;
		// if (window.heavyDebug) console.log('PLDR_modules_to_parse: '+ PLDR_modules_to_parse);
		if (PLDR_modules_to_parse + PLDR_modules_to_parse_b + PLDR_modules_to_parse_c == 0) {
			PLDR_finalAction();
		}
	}
}
function PLDR_foreach(el) {
	// if (window.heavyDebug) console.log('doing PLDR_foreach');
	// $( el ).hide( 0 , function() { });
	$.when(window.MobileApp.myrouter.PLDR_getModule(el)).done(function(_that){
		PLDR_paste(el,_that);
		PLDR_checkWork();
		PLDR_recursion($(el));
	});
}
function PLDR_paste(el,_that) {
	var pastLoadTag = $(el).attr('data-pastload-tag');
	if (pastLoadTag!=undefined && pastLoadTag!='') $(el).attr(pastLoadTag,_that.$el.html());
	else $(el).html(_that.$el.html());
	// console.log('_that.$el.html()');
	// console.log(_that.$el.html());
	$(el).attr('data-pastload-created',window.pagechange_timestamp);
	// if (window.pagecreated==1 && window.btnBackClicked!=1) {
		// if ($(el).find("ul").length>0) $( el ).css('width','100%');
		// $( el ).css('width','100%');
		// setTimeout(function() {
			/*
			$(el).fadeIn( "slow", function() {
				// console.log('Animation complete');
			});
			*/
		// },0);
	// }
}
function PLDR_checkWork() {
}
function PLDR_arraywalkDone(notAborted, arr) {
	// if (window.heavyDebug) console.log('PLDR_arraywalkDone:');
	/*
	// console.log(arr);
	// PLDR_createJqmPage();
	// console.log('länge: '+arr.length);
	*/
}
function PLDR_getArray(selector) {
	var PLDR_array = new Array();
	selector.find('[data-pastload-module]').not("[data-pastload-created]").each(function(){
		var el = this;
		var hasParent = $(el).parents("[data-pastload-module]").not("[data-pastload-created]").length;
		if (hasParent==0) {
			if (!$(el).attr('data-pastload-created')) {
				PLDR_array.push(el);
			}
		}
	});
	return(PLDR_array);
}
function foreach_async(PLDR_array,PLDR_foreach,PLDR_arraywalkDone) {
	forEach(PLDR_array, function(el, index, arr) {
		// if (window.heavyDebug) console.log(el);
		// setTimeout(function() {
			PLDR_foreach(el);
		// },0);
		var done = this.async();
		setTimeout(function() {
		// $(function() {
			done();
			// PLDR_createJqmPage();
		// });
		},0);
	}, PLDR_arraywalkDone);
}

function PLDR_finalAction() {
	// if (window.heavyDebug) console.log('doing PLDR_finalAction');
	slideUpLoadingBar();
	window.ajaxLoader = 1;
	/*
	if (window.pagecreated==1) {
		scrollDownOrUp(1000,300);
		// $.mobile.silentScroll(9999999);
		if ($.mobile.activePage.find('.scrollDownTo').length) {
			setTimeout(function() {
				$.mobile.activePage.find('.ui-content').scrollTo( $('.scrollDownTo') , duration );
			} , delaytime);
		}
	}
	*/
	window.pagecreated = 0;
	window.btnBackClicked = 0;
	PLDR_createJqmPage();
	startBuildEditables($.mobile.activePage);
	startBuildVideos($.mobile.activePage);
	PLDR_resetCreated($.mobile.activePage);
	scrollDownOrUp(1000,300);
	// if (window.pagecreated==1 || window.btnBackClicked==1) {
	// $.mobile.activePage.scrollTo( '0px', 1000 );
	// $.mobile.activePage.scrollTo( $('ul').get(2).childNodes[20], 800 );
}
/********************** END: PLDR - Past Load Dynamic Recursion **********************/

