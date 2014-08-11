$(document).ready(function() {

	if (window.heavyDebug) console.log('documentready.js');

	FastClick.attach(document.body);
	// $('body').append("<div class='ui-loader-background'></div>");
	
	// console.log('document ready');
	// closeJqmPanels();
	
	// EFFECTS INFOS:
	// http://www.w3schools.com/jquerymobile/jquerymobile_transitions.asp
	
	$(document).bind('keydown', 'Shift+left', function(bla) {
		if ($(document).find('#panel_left').hasClass('ui-panel-open')) $( "#panel_left" ).panel( "close" );
		else if ($(document).find('#panel_left').hasClass('ui-panel-closed')) $( "#panel_right" ).panel( "open" );
	});
	$(document).bind('keydown', 'Shift+right', function(bla) {
		if ($(document).find('#panel_right').hasClass('ui-panel-open')) $( "#panel_right" ).panel( "close" );
		else if ($(document).find('#panel_left').hasClass('ui-panel-closed')) $( "#panel_left" ).panel( "open" );
	});
	
	$(document).off('click','.showVideoDetailsLink').on('click','.showVideoDetailsLink',function(event){
		event.preventDefault();
		// console.log(event);
		// alert('clicked');
		var link = event.currentTarget.getAttribute('data-href');
		Backbone.history.navigate(link, {trigger: true, replace:true});
		// Backbone.history.navigate('videos/details/view/1234567890', {trigger:true});
		// return(false);
	});
	
	$(document).off('click','.switchUserinterestInput').on('click','.switchUserinterestInput',function(e){
		e.preventDefault();
		return(false);
	});
	$(document).off('change','.switchUserinterestInput').on('change','.switchUserinterestInput',function(e){
		e.preventDefault();
		switchUserinterestInputChange(e);
		return(false);
	});
	
	$(document).off('click','.likeLink').on('click','.likeLink',function(e){
		e.preventDefault();
		likeToggle(e);
		return(false);
	});
	$(document).off('click','.likeLinkActive').on('click','.likeLinkActive',function(e){
		e.preventDefault();
		likeToggle(e);
		return(false);
	});
	
	$(document).off('click','.likeCountLink').on('click','.likeCountLink',function(e){
		e.preventDefault();
		commentAreaToggle(e);
		$('.ui-page-active > .ui-content').scrollTo( $(e.currentTarget) , 1000, {offset: {top:-250, left:0}} );
		// if (!isMobile.any()) $('.ui-page-active > .ui-content').scrollTo( $(e.target) , 1000, {offset: {top:-250, left:0}} );
		return(false);
	});
		
	$(document).off('submit','.commentForm').on('submit','.commentForm',function(e){
		e.preventDefault();
		alert('submitting commentForm...');
		return(false);
	});

	$(document).off('click','.messageLink').on('click','.messageLink',function(e){
		e.preventDefault();
		messageLinkClick(e);
		return(false);
	});
	
	$(document).off('click','.editUserinformationsText').on('click','.editUserinformationsText',function(event){
		event.preventDefault();
		var el = $(event.currentTarget);
		el.find('p').replaceWith("<textarea style='white-space:normal;height:300px !important;'>" + el.text().replace(/[\n\r](\s*)/g," ").trim() + "</textarea>")
		el.parent().find('textarea').textinput().trigger('change').putCursorAtEnd();
		el.parent().find('textarea').css({ "height": '100px' });
		el.toggleClass('editUserinformationsText');
		el.toggleClass('editUserinformationsTextarea');
	});
	$(document).off('blur','.editUserinformationsTextarea').on('blur','.editUserinformationsTextarea',function(event){
		event.preventDefault();
		var el = $(event.currentTarget);
		var userid = el.attr('data-userid');
		var perstext = el.find('textarea').val();			
		
		dpd.users.put(userid, {"perstext":perstext}, function(result, err) {
			if(err) return console.log(err);
			// console.log(result, result.id);
		});

		el.find('textarea').replaceWith("<p style='white-space:normal;'>" + perstext.replace(/[\n\r](\s*)/g," ").trim() + "</p>")
		el.toggleClass('editUserinformationsText');
		el.toggleClass('editUserinformationsTextarea');
	});
	
	$(document).off('click','.editUserFullnameText').on('click','.editUserFullnameText',function(event){
		event.preventDefault();
		var el = $(event.currentTarget);
		el.find('span').replaceWith("<input value='" + el.text().replace(/[\n\r](\s*)/g," ").trim() + "'>")
		el.parent().find('input').textinput().trigger('change').putCursorAtEnd();
		el.toggleClass('editUserFullnameText');
		el.toggleClass('editUserFullnameInput');
	});
	
	$(document).off('click','.editUserSloganText').on('click','.editUserSloganText',function(event){
		event.preventDefault();
		var el = $(event.currentTarget);
		el.find('span').replaceWith("<input value='" + el.text().replace(/[\n\r](\s*)/g," ").trim() + "'>")
		el.find('input').textinput().trigger('change').putCursorAtEnd();
		el.toggleClass('editUserSloganText');
		el.toggleClass('editUserSloganInput');
	});
	$(document).off('blur','.editUserSloganInput').on('blur','.editUserSloganInput',function(event){
		event.preventDefault();
		var el = $(event.currentTarget);
		var slogan = el.find('input').val();
		alert(slogan);
		dpd.users.put(el.attr('data-userid'), {"slogan":slogan}, function(result, err) {
			if(err) return console.log(err);
			// console.log(result, result.id);
		});

		el.replaceWith("<span>" + slogan.replace(/[\n\r](\s*)/g," ").trim() + "</span>")
		el.toggleClass('editUserSloganText');
		el.toggleClass('editUserSloganInput');
	});
	
	$(document).off( "click", "#sendAnonymRegisterBtn").on( "click", "#sendAnonymRegisterBtn", function( e ) {
		e.preventDefault();
		sendAnonymRegister(e);
	});
	$(document).off( "click", "#sendRegisterBtn").on( "click", "#sendRegisterBtn", function( e ) {
		e.preventDefault();
		sendRegisterClicked(e);
	});
	$(document).off( "click", "#sendFbLoginBtn").on( "click", "#sendFbLoginBtn", function( e ) {
		e.preventDefault();
		console.log('doing sendFbLogin(e)');
		sendFbLogin(e);
	});

	$(document).off( "click", "#revokePermissions_facebookBtn").on( "click", "#revokePermissions_facebookBtn", function( e ) {
		e.preventDefault();
		console.log('doing revokePermissions_facebook(e)');
		revokePermissions_facebook(e);
	});
	
	$(document).off( "click", "#sendLoginBtn").on( "click", "#sendLoginBtn", function( e ) {
		e.preventDefault();
		sendLoginClicked(e);
	});
	$(document).off( "click", "#sendLoginBtn_panel_right").on( "click", "#sendLoginBtn_panel_right", function( e ) {
		e.preventDefault();
		sendLogin(e);
	});
	
	$(document).off( "click", "#sendLogoutBtn").on( "click", "#sendLogoutBtn", function( e ) {
		e.preventDefault();
		sendLogout(e);
	});
	
	$(document).off( "click", 'a[name="sendLink"]').on( "click", 'a[name="sendLink"]', function( e ) {
		e.preventDefault();
		$(e.currentTarget).parents('form').submit();
	});
	
	$(document).off( "keyup", "#myMsgBox").on( "keyup", "#myMsgBox", function( e ) {
	// $('textarea').keyup(function(){
		e.preventDefault();
		
		var keycode = (e.keyCode ? e.keyCode : e.which);
		if (e.keyCode == 13 && !e.shiftKey) {
			// alert('You pressed a "enter" key in somewhere');
			$(e.currentTarget).parents('form').submit();
			return(false);
			// form.submit();
		}
		
		// $(e.currentTarget).scrollTop(9999);
		$('.ui-page-active > .ui-content').scrollTo( $(e.currentTarget), 100 );
		var ul = $('ul.sendMessage');
		var li = ul.find('li');
		var base_top = parseInt(li.attr('data-basetop'),0);
		var li_beforeheight = parseInt(li.attr('data-beforeheight'),0);
		// var li_beforetop = parseInt(li.attr('data-beforetop'),0);
		// if (li_beforetop<base_top) li_beforetop=0;
		var li_height = parseInt(li.height(),0) || 0;
		// var li_top = parseInt(li.css('top'),0) || 0;
		// var active_page_content_height = $($.mobile.activePage).find('.ui-content').height();
		// var messages_area_height = ul.parent().height();
		// var base_top = parseInt(active_page_content_height,0) - parseInt(messages_area_height,0);
		// var font_size = li.find('textarea').css('font-size');
		var diff_height = li_height - li_beforeheight;
		var new_top = parseInt(li.css('top'),0)-diff_height || 0;
		if (new_top>base_top) new_top=base_top;
		if (new_top<0) new_top=0;
		li.css('top',new_top+'px');
		if (new_top) li.attr('data-beforetop',new_top+'px');
		li.attr('data-beforeheight',li_height+'px');
		// console.log('HEIGHT CHANGED...');
		// console.log('font_size: '+font_size);
		// console.log('li_beforeheight: '+li_beforeheight);
		// console.log('li_height: '+li_height);
		// console.log('li_beforetop: '+li_beforetop);
		// console.log('li_top: '+li_top);
		// console.log('new_top: '+new_top);
	});
	
	$(document).off('submit','.messageForm').on('submit','.messageForm',function(e){
		e.preventDefault();
		alert('submitting messageForm...');
		// if (!isMobile.any()) $('.ui-page-active > .ui-content').scrollTo( $(e.target) , 0, {offset: {top:-250, left:0}} );
		hideKeyboard();
		return(false);
	});

	// viewport meta fix for ios - could cause some issues on android 
	// http://nerd.vasilis.nl/prevent-ios-from-zooming-onfocus/	
	/*
	// $('input, select, textarea').bind('focus blur', function(e) {
	// $('input, select, textarea').bind('focus blur', function(e) {
	$(document).off('blur','input, select, textarea').on('blur','input, select, textarea',function(e) {
		console.log("$('input, select, textarea').bind('focus blur', function(e) {");
		console.log(e);
	});
	*/
	
	/*
	$(document).on('focus', 'textarea', function(e) {
	  len = e.target.value.length
	  e.target.setSelectionRange(len, len)
	});
	*/

	$(document).off('focus focusinmanual blur','input[type="text"], input[type="password"], select, textarea').on('focus focusinmanual blur','input[type="text"], input[type="password"], select, textarea',function(e) {
		console.log("$('input, select, textarea').bind('focus blur', function(e) {");
		console.log(e);
		// var scrolltoonfocus = $(e.currentTarget).attr('scrolltoonfocus');
		// if (!scrolltoonfocus || scrolltoonfocus!="true") return(false);
		var $viewportMeta = $('meta[name="viewport"]');
		// console.log(e.type);
		// if (e.type=="blur") alert('blurred!!!');
		$viewportMeta.attr('content','user-scalable=no,width=device-width,height=device-height,initial-scale=1,maximum-scale=' + ((e.type == 'blur' || e.type == 'focusout') ? 10 : 1) + ',target-densitydpi=device-dpi');
		if (e.type=="focusinmanual") {
			// if (!isMobile.any()) $('.ui-page-active > .ui-content').scrollTo( $(e.target) , 0, {offset: {top:-250, left:0}} );
			/*
			if (isMobile.any()) {
				len = e.target.value.length;
				e.target.setSelectionRange(len, len);
			}
			*/
		}
		else if (e.type=="focusin") {
			
			// if attr('preventScrollOnFocus'==true) {}
			// else {...
			// setTimeout(function() {
				// if (!isMobile.any()) $('.ui-page-active > .ui-content').scrollTo( $(e.target) , 1000, {offset: {top:-250, left:0}} );
				if (isMobile.any()) {
					cordova.plugins.Keyboard.disableScroll(false);
				}
				$('.ui-page-active > .ui-content').scrollTo( $(e.target) , {offset: {top:-250, left:0} , onAfter:function(){
					if (isMobile.any()) {
						cordova.plugins.Keyboard.disableScroll(true);
					}
				}});
				
			// }, 1000);

			// len = e.target.value.length;
			// e.target.setSelectionRange(len, len);
			/*
			if (isMobile.any()) {
				len = e.target.value.length;
				e.target.setSelectionRange(len, len);
			}
			*/

			// $('.ui-page-active > .ui-content').scrollTo( '-=100px' , {duration:100} );
			/*
			console.log($(e.currentTarget));
			console.log($(e.currentTarget).position());
			var offset = $(e.currentTarget).offset();
			var goto_offset_y = parseInt(offset.top,0);
			$('.ui-page-active > .ui-content').scrollTo( {top:goto_offset_y+'', left:'0px'} , 100 );
			*/
			/*
			var offset = $(e.currentTarget).position();
			var goto_offset_y = parseInt(offset.top,0) - 100;
			if (goto_offset_y<0) goto_offset_y=0;
			console.log('goto_offset_y: '+goto_offset_y);
			$('.ui-page-active > .ui-content').scrollTo( {top:goto_offset_y+'px', left:'0px'} , 100 );
			*/
		}
	});
	
	function closeKeyboardIfOpenedAndMobile() {
		if (isMobile.any()) {
			// console.log('window.keyboardvisible: '+window.keyboardvisible);
			// console.log('cordova.plugins.Keyboard.isVisible: '+cordova.plugins.Keyboard.isVisible);
			if (window.keyboardvisible==true) {
				console.log('Uhhhhh.. TOUCHMOVED DURING Damn Keyboard Interaction!!!');
				// console.log(e);
				// cordova.plugins.Keyboard.close();
				// hideKeyboard();
				cordova.plugins.Keyboard.close();
			}
		}
	}
	$('body').off('touchmove','.ui-page-active > .ui-content').on('touchmove','.ui-page-active > .ui-content',function(e) {
		closeKeyboardIfOpenedAndMobile();
	});
	
	/*
	$(document).off('swipedown','.ui-page-active > .ui-content').on('swipedown','.ui-page-active > .ui-content',function(e) {
		if (isMobile.any()) {
			console.log('window.keyboardvisible: '+window.keyboardvisible);
			console.log('cordova.plugins.Keyboard.isVisible: '+cordova.plugins.Keyboard.isVisible);
			if (cordova.plugins.Keyboard.isVisible || window.keyboardvisible==true) {
				console.log('Uhhhhh.. SWIPEDOWN DURING Damn Keyboard Interaction!!!');
				console.log(e);
			}
		}
	});
	*/
	
	// $(document).off('dblclick','.ui-page-active > .ui-content').on('dblclick','.ui-page-active > .ui-content',function(e) {
	
	// document.getElementById('.ui-page-active').addEventListener('touchmove', function(ep) {
	// document.getElementById('.ui-content').addEventListener('click', function(ep) {
	// document.getElementByClass('ui-content').addEventListener('click', function(ep) {
	/*
	document.getElementById('.ui-content').addEventListener('touchmove', function(e) {
		if (window.keyboardvisible==true) e.preventDefault();
	});
	// $(document).bind('touchmove', 'Shift+right', function(bla) {
	document.getElementById('.ui-content').addEventListener('touchmove', function(e) {
		if (window.keyboardvisible==true) e.preventDefault();
	});
	*/
	/*
	$(".ui-page-active > .ui-content").css('overflow-y','hidden');
	$(".ui-page-active > .ui-content").css('overflow-y','auto');
	*/

	/*
	$(document).off('dblclick','.ui-page-active > .ui-content').on('dblclick','.ui-page-active > .ui-content',function(e) {
		if (window.keyboardvisible==true) {
			e.preventDefault();
			console.log('.ui-content dblclicked');
		}
	});
	*/
	

	// Deploydkit realtime actions
	dpd.likes.on('post', function(post) {
	  // Do something
	  console.log(post);
	  updateLikeCountFields(post.objectid,1);
	});
	dpd.likes.on('delete', function(post) {
	  // Do something
	  console.log(post);
	  updateLikeCountFields(post.objectid,-1);
	});

});