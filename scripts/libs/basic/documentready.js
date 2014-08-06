$(document).ready(function() {

	if (window.heavyDebug) console.log('documentready.js');

	FastClick.attach(document.body);
	$('body').append("<div class='ui-loader-background'></div>");
	
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
	
	$(document).off('change','.switchUserinterestInput').on('change','.switchUserinterestInput',function(e){
		e.preventDefault();
		switchUserinterestInputClick(e);
		return(false);
	});
	
	$(document).off('click','.likeLink').on('click','.likeLink',function(e){
		e.preventDefault();
		likeToogle(e);
		return(false);
	});
	$(document).off('click','.likeLinkActive').on('click','.likeLinkActive',function(e){
		e.preventDefault();
		likeToogle(e);
		return(false);
	});
	
	$(document).off('click','.likeCountLink').on('click','.likeCountLink',function(e){
		e.preventDefault();
		commentAreaToogle(e);
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
		$('.ui-page-active > .ui-content').scrollTo( $(e.currentTarget), 1 );
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
		return(false);
	});

	// viewport meta fix for ios - could cause some issues on android 
	// http://nerd.vasilis.nl/prevent-ios-from-zooming-onfocus/	
	var $viewportMeta = $('meta[name="viewport"]');
	$('input, select, textarea').bind('focus blur', function(e) {
		$viewportMeta.attr('content', 'width=device-width,initial-scale=1,maximum-scale=' + (e.type == 'blur' ? 10 : 1));
		$('.ui-page-active > .ui-content').scrollTo( $(e.currentTarget), 100 );
	});
	
	function keyboardShowHandler(e){
		console.log('Keyboard height is: ' + e.keyboardHeight);
	}
	window.addEventListener('native.keyboardshow', keyboardShowHandler);

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