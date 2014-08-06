//////////////////////////////////////////////////////////////////////////////////////
//	START OF jqmNavigator Script
//////////////////////////////////////////////////////////////////////////////////////
//
//	Copyright 2012 Piotr Walczyszyn (http://outof.me | @pwalczyszyn)
//
//	Licensed under the Apache License, Version 2.0 (the "License");
//	you may not use this file except in compliance with the License.
//	You may obtain a copy of the License at
//
//		http://www.apache.org/licenses/LICENSE-2.0
//
//	Unless required by applicable law or agreed to in writing, software
//	distributed under the License is distributed on an "AS IS" BASIS,
//	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//	See the License for the specific language governing permissions and
//	limitations under the License.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
}(this, function ($) {

    // $(document).bind("mobileinit", function () {
	$(document).off( "mobileinit" ).on( "mobileinit", function( event ) {
		$(document).off( "click", "#btnBack").on( "click", "#btnBack", function( e ) {
			e.preventDefault();
			window.btnBackClicked=1;
			$.mobile.jqmNavigator.popView();
		});
		$(document).off( "swipeleft swiperight", $.mobile.activePage ).on( "swipeleft swiperight", $.mobile.activePage, function( e ) {
			if ($(document).find('#panel_left').hasClass('ui-panel-closed') && e.type === "swipeleft") $( "#panel_right" ).panel( "open" );
			if ($(document).find('#panel_right').hasClass('ui-panel-closed') &&  e.type === "swiperight") $( "#panel_left" ).panel( "open" );           
		});

		if (window.heavyDebug) console.log('jqmNavigator.js >> $(document).bind("mobileinit", function () {...');

		$.mobile.pageContainer = $('#container');
		// Setting jQM pageContainer to #container div, this solves some jQM flickers & jumps
		// I covered it here: http://outof.me/fixing-flickers-jumps-of-jquery-mobile-transitions-in-phonegap-apps/
		$.mobile.defaultPageTransition = window.defaultPageTransition;
		$.mobile.defaultDialogTransition = window.defaultDialogTransition
		$.mobile.ajaxEnabled = true;
		$.mobile.linkBindingEnabled = true;
		$.mobile.hashListeningEnabled = false;
		$.mobile.pushStateEnabled = true;
		$.mobile.autoInitializePage = false;		
		$.mobile.allowCrossDomainPages = true;
		$.support.cors = true;
		$.mobile.page.prototype.options.domCache = true;
		$.extend($.mobile, {
			jqmNavigator:{

				VERSION:'1.0.1 modified',

				/**
				 * Map of containers and views
				 */
				_containers:[],

				/**
				 * If this is not set, jqmNavigator will use body tag as default container
				 */
				defaultPageContainer:null,

				/**
				 * Pushes view to the stack.
				 *
				 * @param view {Backbone.View}
				 * @param options {*} Transition parameters can be passed like: transition, reverse, showLoadMsg or loadMsgDelay
				 */
				pushView:function jqmNavigator_pushView(view, options) {
					var containerViews = this._getPageContainerViews(options);

					// Pushing the view to the stack
					containerViews.views.push(view);
					// Appending the view to the DOM
					containerViews.pageContainer.append(view.el);
					// Rendering the view
					// console.log(view);
					// console.log('********************************************************************** RENDERING ACTIVE VIEW **********************************************************************');
					view.render();

					if (!$.mobile.firstPage) {
						// Adding data-role with page value
						view.$el.attr('data-role', 'page');
						// First time initialization
						if (!$.mobile.autoInitializePage) $.mobile.initializePage();
					} else {
						// Changing page
						// view.$el.trigger("create");
						// console.log(view.$el);
						// console.log('view.$el');
						// console.log(view.$el);
						// console.log(containerViews.pageContainer);
						// if (options==undefined) options = new Object();
						// if (options.role==undefined) options.role="page";
						// alert(options.role);
						
						/*
						var fromView = containerViews.views.pop();
						fromView.$el.one('pagehide', function (event) {
							// Detaching view from DOM
							fromView.$el.remove();
						});
						*/
						$.mobile.changePage(view.$el, $.extend({
							role:'page',
							changeHash:false,
							pageContainer:containerViews.pageContainer
						}, options));
						
						// alert($.mobile.activePage.html());
						// alert(bla);
						// .trigger('create');
						// setTimeout(function() {
							// $('#container').trigger('create');
							// alert($('#body').html());
							// if ( $.mobile.activePage.trigger('create'));
							// alert('now refreshed');
						// },5000);
					}
				},

				/**
				 * Pops view from the stack.
				 *
				 * @param options {*} Transition parameters can be passed like: transition, reverse, showLoadMsg or loadMsgDelay
				 */
				popView:function jqmNavigator_popView(options) {
					var containerViews = this._getPageContainerViews(options);
					if (window.heavyDebug) console.log(containerViews.views.length);
					if (containerViews.views.length > 1) {
						var fromView = containerViews.views.pop();
						toView = containerViews.views[containerViews.views.length - 1];
						fromView.$el.one('pagehide', function (event) {
							// Detaching view from DOM
							fromView.$el.detach();
						});
						// Changing to view below current one
						$.mobile.changePage(toView.$el, $.extend({
							role:'page',
							reverse:true,
							changeHash:false,
							pageContainer:containerViews.pageContainer
						}, options));

					} else {
						console.log('Can\'t pop first view, you can replace it instead!');
					}
				},
				
				deleteView:function jqmNavigator_deleteView(options) {
					var containerViews = this._getPageContainerViews(options);
					if (containerViews.views.length > 1) {
						// From view ref
						var fromView = containerViews.views.pop();
						fromView.$el.detach();
						// To view ref
						// toView = containerViews.views[containerViews.views.length - 1];

						/*
						fromView.$el.one('pagehide', function (event) {
							// Detaching view from DOM
							fromView.$el.detach();
						});
						*/

						/*
						// Changing to view below current one
						$.mobile.changePage(toView.$el, $.extend({
							role:'page',
							reverse:true,
							changeHash:false,
							pageContainer:containerViews.pageContainer
						}, options));
						*/

					} else {
						// console.log('Can\'t pop first view, you can replace it instead!');
					}
				},

				/**
				 * Pops views from a stack up to the first one.
				 *
				 * @param options {*} Transition parameters can be passed like: transition, reverse, showLoadMsg or loadMsgDelay
				 */
				popToFirst:function jqmNavigator_popToFirst(options) {
					var containerViews = this._getPageContainerViews(options);
					if (containerViews.views.length > 1) {
						// From view ref
						var fromView = containerViews.views[containerViews.views.length - 1],
						// To view ref
							toView = containerViews.views[0],
						// Removed views
							removedViews = containerViews.views.splice(1, containerViews.views.length - 1);

						fromView.$el.one('pagehide', function (event) {
							removedViews.forEach(function (item) {
								item.$el.detach();
							}, this);
						});

						// Changing to view below current one
						$.mobile.changePage(toView.$el, $.extend({
							role:'page',
							reverse:true,
							changeHash:false,
							pageContainer:containerViews.pageContainer
						}, options));

					} else {
						// console.log('Can\'t pop first view, you can replace it instead!');
					}
				},

				/**
				 * Replaces current view on the stack.
				 *
				 * @param options {*} Transition parameters can be passed like: transition, reverse, showLoadMsg or loadMsgDelay
				 */
				replaceView:function jqmNavigator_replaceView(view, options) {
					var containerViews = this._getPageContainerViews(options);
					if (containerViews.views.length >= 1) {
						// From view ref
						var fromView = containerViews.views.pop();
						fromView.$el.one('pagehide', function (event) {
							// Detaching view from DOM
							fromView.$el.detach();
						});

						// Pushing the view to the stack
						containerViews.views.push(view);
						// Appending the view to the DOM
						containerViews.pageContainer.append(view.el);
						// Rendering the view
						// console.log('********************************************************************** RENDERING ACTIVE VIEW **********************************************************************');
						view.render();

						// Changing page
						$.mobile.changePage(view.$el, $.extend({
							role:'page',
							changeHash:false,
							pageContainer:containerViews.pageContainer
						}, options));
					}
				},

				/**
				 * Replaces all views on the stack.
				 *
				 * @param options {*} Transition parameters can be passed like: transition, reverse, showLoadMsg or loadMsgDelay
				 */
				replaceAll:function jqmNavigator_replaceAll(view, options) {
					var containerViews = this._getPageContainerViews(options);
					if (containerViews.views.length >= 1) {
						// From view ref
						var fromView = containerViews.views[containerViews.views.length - 1],
						// Removed views
							removedViews = containerViews.views.splice(0, containerViews.views.length);

						fromView.$el.one('pagehide', function (event) {
							removedViews.forEach(function (item) {
								item.$el.detach();
							}, this);
						});

						// Pushing the view to the stack
						containerViews.views.push(view);
						// Appending the view to the DOM
						containerViews.pageContainer.append(view.el);
						// Rendering the view
						// console.log('********************************************************************** RENDERING ACTIVE VIEW **********************************************************************');
						view.render();

						// Changing page
						$.mobile.changePage(view.$el, $.extend({
							role:'page',
							changeHash:false,
							pageContainer:containerViews.pageContainer
						}, options));

					}
				},

				_getPageContainerViews:function (options) {
					var pageContainer = options && options.pageContainer ? options.pageContainer :
							$.mobile.pageContainer || this.defaultPageContainer || $('body'),
						result;

					this._containers.some(function (item) {
						if (item.pageContainer[0] === pageContainer[0]) {
							result = item;
							return true;
						}
					}, this);

					if (!result) this._containers.push(result = {pageContainer:pageContainer, views:[]});

					return result;
				},

				/**
				 * Returns an array of views for specified pageContainer. If pageContainer param is omitted it tries to
				 * return views of default container.
				 *
				 * @param pageContainer
				 * @return {*}
				 */
				getViews:function jqmNavigator_getViews(pageContainer) {
					var views,
						pc = pageContainer ? pageContainer[0] : ($.mobile.pageContainer ? $.mobile.pageContainer[0] : null);
					this._containers.some(function (item) {
						if (item.pageContainer[0] === pc) {
							views = item.views;
							return true;
						}
					}, this);
					return views;
				}
			}
		});
		//////////////////////////////////////////////////////////////////////////////////////
		//	END OF jqmNavigator Script
		//////////////////////////////////////////////////////////////////////////////////////
		
    });
	
}));