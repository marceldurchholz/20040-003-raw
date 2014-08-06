define(['collections/sidemenusCollection', 'selfies/navigation/PanelrightView', 'selfies/navigation/PanelfunctionsView', 'selfies/navigation/TestView', 'views/template/TemplateView', 'views/noaccess/NoaccessView'
			, 'views/users/UsersView', 'views/userdetails/UserdetailsView', 'views/videos/VideosView', 'views/cards/CardsView', 'parser/simpletext/simpletextView', 'views/restore/RestoreView', 'views/learningstream/LearningstreamView', 'views/messages/MessagesView'
			, 'views/message/MessageView'
			, 'jqm'],

    function(sidemenusCollection, panelrightView, panelfunctionsView, testView, templateView, noaccessView
			, usersView, userdetailsView, videosView, cardsView, simpletextView, restoreView, learningstreamView, messagesView
			, messageView
			) {

		var MobileRouter = Backbone.Router.extend({
			
			/***** TODOs *****/
			//  http://demoinfinite.appspot.com/
			//      Responsive Infinite Scroll (DEMO SITE)
			//  https://github.com/spacenick/backbone-deployd/blob/master/backbone-deployd.js
			//      Simple Backbone.sync override to use dpd JavaScript SDK; so you don't have to care about your API url (dpd.js resolves it by itself) and the query syntax is improved.
			//  http://prinzhorn.github.io/skrollr/
			//       parallax scrolling for the masses
			//  https://github.com/yckart/Transe.js
			//      jQuery Element Animations / Transformable scroll elements
			
			collection: new sidemenusCollection(),
			
			initialize: function() {
				forceLogin();
				if (window.heavyDebug) console.log('MobileRouter.js >> initialize: function() {...');
				// if (window.heavyDebug) console.log('initialize MobileRouter.js');
				var _this = this;
				_this.simpletextView = simpletextView;
				_this.query_vars = new Object();
				_this.ghostView = new Object();
				_this.bindEvents();
				_this.route("*path", "url_query_string", _this.initRouter);
				_this.route("*path?:url_query_string", "url_query_string", _this.initRouter);
				_this.route("*path/:url_query_string", "url_query_string", _this.initRouter);
				
				// $.when(_this.getSidemenuCollection()).done(
				// 	function(sidemenuCollection) {

				// _this.route("support/:id", "id", _this.dynamicRouter);
				// _this.route("videos/details/view/:id", "id", _this.videodetailsRouter);
				// _this.route("user/:id", "id", _this.userRouter);
				// _this.route("userinterests/:id", "id", _this.userinterestsRouter);
				// _this.route("userinformations/:id", "id", _this.userinformationsRouter);
				Backbone.history.start({
				});
			},
			
			initRouter: function(url_hash_route,url_query_string) {
				_this = this;
				// if (window.heavyDebug) console.log(url_hash_route);
				// if (window.heavyDebug) console.log(url_query_string);
				/* START: HADNLE HASH /OR LINK-TRANSMITTED ROUTE */
				if (_this.query_vars.hash_route) _this.query_vars.open_route = _this.query_vars.hash_route;
				else _this.query_vars.open_route = window.location.hash;
				// delete(_this.query_vars.hash_route);
				if (_this.query_vars.open_route=='') _this.query_vars.open_route=system.app.options.firstpage;
				_this.gotoRoute(_this.query_vars.open_route);
			},
			
			/*
			dynamicRouter: function(url_hash_route,url_query_string) {
				if (window.heavyDebug) console.log('dynamicRouter');
				if (window.heavyDebug) console.log(url_hash_route);
				if (window.heavyDebug) console.log(url_query_string);
			},
			
			/*
			convertSidemenusIntoRoutes: function(sidemenuCollection) {
				// _this.route("support/:id", "id", _this.supportRouter);
				if (window.heavyDebug) console.log();
			},
			*/
			
			getSidemenuCollection: function() {
				var d = $.Deferred();
				var _this = this;
				if (window.heavyDebug) console.log('now fetching the sidemenuCollection');
				_this.collection.fetch({ 
					// async: false, // by default it is true
					// url:"blafoourl",
					error: function () {
						if (window.heavyDebug) console.log("error!!"); 
					},
					success: function(sidemenuCollection){
						if (window.heavyDebug) console.log('success: function(sidemenuCollection){...');
						// $.when(_this.recreateRoutes(sidemenuCollection), _this.convertSidemenusIntoRoutes(sidemenuCollection)).done(
						$.when(_this.recreateRoutes(sidemenuCollection)).done(
							// function(sidemenuCollection, routeConverterResponse) {
							function(sidemenuCollection) {
								if (window.heavyDebug) console.log('$.when(_this.recreateRoutes(sidemenuCollection)).done(... >> d.resolve(sidemenuCollection)');
								if (window.heavyDebug) console.log(sidemenuCollection);
								// if (window.heavyDebug) console.log(JSON.stringify(sidemenuCollection));
								d.resolve(sidemenuCollection);
							}
						);
					}
				});
				return d.promise();
			},
			
			recreateRoutes: function(sidemenuCollection) {
				if (window.heavyDebug) console.log('recreateRoutes: function(sidemenuCollection) {...');
				var d = $.Deferred();
				var _this = this;
				_this.routes = [];
				// _this.route("*path", "vars", _this.initRouter);
				sidemenuCollection.each(function(row) {
					var _row = row;
					var userfriendly = _row.get('urloffline');
					// if (window.heavyDebug) console.log('creating route for urloffline: '+_row.get('urloffline'));
					_this.routes[userfriendly] = userfriendly+'Router';
					// _this.route(userfriendly+"/:id", "id", _this.dynamicRouter);
				});
				d.resolve(sidemenuCollection);
				// _this.route("videos/details/view/:id", "id", _this.videodetailsRouter);
				// _this.route("user/:id", "id", _this.userRouter);
				// _this.route("userinterests/:id", "id", _this.userinterestsRouter);
				// _this.route("userinformations/:id", "id", _this.userinformationsRouter);
				return d.promise();
			},

            routes: {
			},
			
			/*
			videodetailsRouter: function(id) {
				_this = this;
				// if (window.heavyDebug) console.log('doing.... '+id);
				_this.query_vars = new Object();
				_this.query_vars.hash_route = '#videodetails';
				_this.query_vars.userid = id;
				_this.initRouter();
			},
			userRouter: function(id) {
				_this = this;
				// if (window.heavyDebug) console.log('doing.... '+id);
				_this.query_vars = new Object();
				_this.query_vars.hash_route = '#user';
				_this.query_vars.userid = id;
				// if (window.heavyDebug) console.log(_this.query_vars.userid);
				_this.initRouter();
			},
			userinterestsRouter: function(id) {
				_this = this;
				_this.query_vars = new Object();
				_this.query_vars.hash_route = '#userinterests';
				_this.query_vars.userid = id;
				_this.initRouter();
			},
			userinformationsRouter: function(id) {
				_this = this;
				_this.query_vars = new Object();
				_this.query_vars.hash_route = '#userinformations';
				_this.query_vars.userid = id;
				_this.initRouter();
			},
			*/
			
			bindEvents: function() {
				var _this = this;
				// if (window.heavyDebug) console.log('bindEvents for sidemenu collection');
				/*
				this.collection.on("all", function(action,collection_view,backbone_collection,index) {
					if (window.heavyDebug) console.log(action);
				}, this);
				*/
				_this.collection.on("sync sync_offline", function(collection) {
					if (window.heavyDebug) console.log('sync called');
					if (window.heavyDebug) console.log(collection);
					new testView({el:'#panel_left',collection:collection}).render();
					// var xbla = new panelrightView({me:window.me,collection:sidemenuCollection});
					// new panelrightView({me:window.me,collection:sidemenuCollection});
					if (checkRole("user")==false) new panelrightView({el:'#panel_right',collection:collection}).render();
					if (checkRole("user")!=false) new panelfunctionsView({el:'#panel_right',collection:collection}).render();
				}, _this);
				/*
				_this.collection.on("sync_offline", function(collection) {
					if (window.heavyDebug) console.log('sync_offline called');
					if (window.heavyDebug) console.log(collection);
					new testView({el:'#panel_left',collection:collection}).render();
				}, _this);
				*/
			},
			/*
			checkLink: function(e) {
				// if (window.heavyDebug) console.log('checkLink');
				var _this = this;
				var href = $(e.currentTarget).attr('href');
				var data_href = $(e.currentTarget).attr('href');
				var is_ajax = $(e.currentTarget).attr('data-ajax');
				if (is_ajax=='true') {
					// if (window.heavyDebug) console.log(href+' has >> data-ajax=true');
					if (e.preventDefault) e.preventDefault();
					return(false);
				}
				else if (href!='#' && href!='undefined' && href!='' && href!=undefined) {
					if (e.preventDefault) e.preventDefault();
					_this.gotoRoute(href);
					return(false);
				}
				else {
					if (e.preventDefault) e.preventDefault();
					// if (window.heavyDebug) console.log('Wahrscheinlich ein link, der durch eine globale function in myfunctions.js definiert sein sollte/ist...');
					return(false);
				}
			},
			*/
			gotoRoute: function(open_route) {
				var _this = this;
				if (window.heavyDebug) console.log('*********************************************************** gotoRoute('+open_route+') ***********************************************************');
				window.ajaxLoader = 1;
				// if (window.heavyDebug) console.log('gotoRoute: '+open_route);
				$.when(_this.getSidemenuCollection()).done(
					function(sidemenuCollection) {
						if (window.heavyDebug) console.log('$.when(_this.getSidemenuCollection()).done(... >> if (window.heavyDebug) console.log(sidemenuCollection);');
						if (window.heavyDebug) console.log(sidemenuCollection);
						// _this.recreateRoutes();
						// if (window.heavyDebug) console.log(ybla);
						// var xbla = new panelrightView({me:window.me,collection:sidemenuCollection});
						// var zbla = new panelfunctionsView({me:window.me,collection:sidemenuCollection});

						// if (window.heavyDebug) console.log(sidemenuCollection);
						var checkroute = open_route.substring(1);
						var query_vars = $.parseParams(checkroute);
						// console.log(query_vars);
						var queryPointer = checkroute.indexOf('?');
						if (queryPointer>-1) {
							checkroute = checkroute.slice(0, queryPointer);
							open_route = '#'+checkroute;
						}
						else {
							var queryPointer = checkroute.indexOf('/');
							if (queryPointer>-1) {
								checkroute = checkroute.slice(0, queryPointer);
								open_route = '#'+checkroute;
							}
						}
						if (open_route!='' && open_route!='#') {
							// if (window.heavyDebug) console.log(_this.routes);
							var routerFunction = _this.routes[open_route.substring(1)];
							if (routerFunction!=undefined) {
								// if (window.heavyDebug) console.log('routerFunction!=undefined: ' + _this.routes[open_route.substring(1)]);
								// if (window.heavyDebug) console.log(open_route);
								var sidemenuModel = sidemenuCollection.find(function(sidemenuModel) { return (sidemenuModel.get('urloffline')).toLowerCase() == checkroute; });
								// if (window.heavyDebug) console.log(sidemenuModel);
								if (!sidemenuModel) {
									// if (window.heavyDebug) console.log('requested sidemenu.model for '+checkroute+' NOT EXISTING (navmobile != true???)');
									// _this.noaccessRouter();
									$.mobile.jqmNavigator.pushView(new noaccessView());
									// return(false);							
								}
								// if (window.heavyDebug) console.log('requested sidemenu.model for '+checkroute+' EXISTS >> ',sidemenuModel);
								// if (window.heavyDebug) console.log(sidemenuModel);
								var show = checkRoles(sidemenuModel.get('roles'));
								// if (window.heavyDebug) console.log('checking roles for '+checkroute+' sidemenu.model: '+show);
								if (show==true) {
									// if (window.heavyDebug) console.log('role for '+checkroute+' sidemenu.model == true');
									// if (window.heavyDebug) console.log('-----------------------');
									// if (window.heavyDebug) console.log('resolving viewToPush via _this.getViewByRouteForPush(open_route,$.parseParams(checkroute),sidemenuModel)');
									// if (window.heavyDebug) console.log(open_route);
									// if (window.heavyDebug) console.log($.parseParams(checkroute));
									// if (window.heavyDebug) console.log(sidemenuModel);									
									// if (window.heavyDebug) console.log('-----------------------');
									var options = new Object({
										'header_vars':new Object({title:sidemenuModel.get('userfriendly')}, {subtitle:sidemenuModel.get('slogan')})
										, 'footer_vars':new Object({copyright:sidemenuModel.get('companyname')}, {kdnr:sidemenuModel.get('kdnr')})
										, 'sidemenuModel':sidemenuModel
										, 'query_vars':query_vars
									}, {variable:'page_vars'});
									$.when(_this.getViewByRouteForPush(open_route.substring(1)+'View',options)).done(
										function(viewToPush){
											// d.resolve(result);
											// if (window.heavyDebug) console.log(viewToPush.options.streamData.userArray[0].companyname);
											// if (window.heavyDebug) console.log('viewToPush:');
											if (window.heavyDebug) console.log(viewToPush);
											if (window.heavyDebug) console.log('try to push view with title: '+viewToPush.options.header_vars.title);
											// if (!$.mobile) if (window.heavyDebug) console.log('!$.mobile !!! *in* MobileRouter.js');
											// if (!$.mobile.jqmNavigator) if (window.heavyDebug) console.log('!$.mobile.jqmNavigator !!! *in* MobileRouter.js');
											try {
												$.mobile.jqmNavigator.pushView(viewToPush);
												if (window.heavyDebug) console.log('$.mobile.jqmNavigator.pushView(viewToPush);');
												// if (window.heavyDebug) console.log('$.mobile.jqmNavigator.pushView(viewToPush);');
											} catch(err) {
												if (window.heavyDebug) console.log("ERROR AT: $.mobile.jqmNavigator.pushView(viewToPush);");
												if (window.heavyDebug) console.log(err);
											}
											if (window.heavyDebug) console.log('*********************** $.mobile.jqmNavigator.pushView(viewToPush); ***********************');
											if (window.heavyDebug) console.log('PLDR_createJqmPage();');
											PLDR_createJqmPage();
										}
									);
								}
								else {
									// if (window.heavyDebug) console.log('role for '+checkroute+' sidemenu.model != true, pushing noaccessView');
									$.mobile.jqmNavigator.pushView(new noaccessView()); // _this.noaccessRouter();
								}
							}
							else {
								if (window.heavyDebug) console.log('routerFunction '+routerFunction+' is undefined / hash '+checkroute+' / eventually not navmobile=true << not dynamically created/existing');
								$.mobile.jqmNavigator.pushView(new noaccessView());
							}
						}
						else {
						}
					}
				);
			},
			
			getViewByRouteForPush: function(viewName,options) {
				var d = $.Deferred();
				var _this = this;
				if (window.heavyDebug) console.log('view via getViewByRouteForPush:');
				if (window.heavyDebug) console.log(viewName);
				if (window.heavyDebug) console.log('options via getViewByRouteForPush:');
				if (window.heavyDebug) console.log(options);
				// if (window.heavyDebug) console.log('getViewByRouteForPush: ' + viewName);				
				try {
					if (window.heavyDebug) console.log('***********************      $.when((new (eval(viewName))(options)).parseData()).done( ***********************');
					if (window.heavyDebug) console.log(viewName);
					if (window.heavyDebug) console.log(options);
					console.log('TRY DOING: (new (eval('+viewName+'))(',options,'))');
					$.when((new (eval(viewName))(options)).parseData()).done(
						function(viewToPush){
							console.log('1. GIVING BACK VIA RESOLVE FROM getViewByRouteForPush: viewToPush');
							console.log(viewToPush);
							console.log(viewToPush.options.streamData);
							d.resolve(viewToPush);
						}					
					);
				} catch (e) {
					console.log('ERROR DOING: (new (eval('+viewName+'))(',options,'))');
					console.log('NOW DOING: (new (eval(templateView))(',options,'))');
					$.when((new (templateView)(options)).parseData()).done(
						function(viewToPush){
							console.log('2. GIVING BACK VIA RESOLVE FROM getViewByRouteForPush: viewToPush');
							console.log(viewToPush);
							console.log(viewToPush.options.streamData);
							d.resolve(viewToPush);
						}					
					);
				} finally {	
				}
				if (window.heavyDebug) console.log('***********************  ^^  $.when((new (eval(viewName))(options)).parseData()).done( ***********************');
				return d.promise();
			},

			PLDR_getModule: function(el) {
				var _this = this;
				var d = $.Deferred();
				/*
				betroffener viewName = options.sidemenuModel.attributes.urloffline >> user
				*/
				var options = new Object();
				// options.query_vars = new Object();
				if ($.mobile.jqmNavigator._getPageContainerViews().views.length>1) {
					options = $.mobile.jqmNavigator._getPageContainerViews().views[$.mobile.jqmNavigator._getPageContainerViews().views.length-1].options;
				} else {
					options = $.mobile.jqmNavigator._getPageContainerViews().views[0].options;
				}
				
				/*
				if (window.heavyDebug) console.log(options.sidemenuModel.attributes.urloffline);
				if (window.heavyDebug) console.log('options A:');
				if (window.heavyDebug) console.log(options);
				var options = options || new Object();
				alert('$.when(collectUserData('+options.query_vars.userid+')).done(');
				$.when(collectUserData(options.query_vars.userid)).done(
					function(userArray) {
						if (window.heavyDebug) console.log('userArray.fullname');
						if (window.heavyDebug) console.log(userArray.fullname);
						options.streamData.userArray = new Array(userArray);
						if (window.heavyDebug) console.log('options B:');
						if (window.heavyDebug) console.log(options);
						// d.resolve(_this);
					}
				);
				*/
						
				// alert(options.sidemenuModel.attributes.urloffline);
				// var sidemenuModel = sidemenuCollection.find(function(sidemenuModel) { return (sidemenuModel.get('urloffline')).toLowerCase() == checkroute; });
				options.pastloadModule = $(el).attr('data-pastload-module');
				options.pastLoadField = $(el).attr('data-pastload-field');
				if (window.heavyDebug) console.log("$(el).attr('data-pastload-field'): "+$(el).attr('data-pastload-field'));
				// if (window.heavyDebug) console.log('options.pastLoadField: '+options.pastLoadField);
				options.pastLoadTag = $(el).attr('data-pastload-tag');
				// if (window.heavyDebug) console.log('options:');
				// if (window.heavyDebug) console.log(options);
				if (window.heavyDebug) console.log("$.when((new (eval("+options.pastloadModule+"+'View'))("+options+")).parseData()).done(");
				$.when((new (eval(options.pastloadModule+'View'))(options)).parseData()).done(
					function(_that){
						d.resolve(_that);
					}
				);
				return d.promise();


				// var getView = _this.getViewByRouteForPush();
				// options.sidemenuModel.attributes.urloffline+
				/*
				$.when(_this.getViewByRouteForPush('templateView',options)).done(
					function(getView){
						if (window.heavyDebug) console.log('getView');
						if (window.heavyDebug) console.log(getView);
						alert('getView');
					}
				);
				*/
				// if (window.heavyDebug) console.log('ERROR DOING: (new (eval('+viewName+'))(',options,'))');
				// if (window.heavyDebug) console.log('NOW DOING: (new (eval(templateView))(',options,'))');
				
				/*
				if (window.heavyDebug) console.log(options);
				$.when(_this.getPastLoadOptions(options.sidemenuModel.attributes.urloffline,options)).done(
					function(viewToPush){
						if (window.heavyDebug) console.log('3. GIVING BACK VIA RESOLVE FROM getViewByRouteForPush: viewToPush');
						if (window.heavyDebug) console.log(viewToPush);
						if (window.heavyDebug) console.log(viewToPush.options.streamData);
						// d.resolve(viewToPush);
					}					
				);
				*/
				// window.pagechange_timestamp = dateYmdHis();
				/*
				var viewName = options.sidemenuModel.attributes.urloffline+'View';
				try {
					if (window.heavyDebug) console.log('***********************      $.when((new (eval(viewName))(options)).parseData()).done( ***********************');
					if (window.heavyDebug) console.log(viewName);
					if (window.heavyDebug) console.log(options);
					if (window.heavyDebug) console.log('TRY DOING: (new (eval('+viewName+'))(',options,'))');
					$.when((new (eval(options.sidemenuModel.attributes.urloffline+'View'))(options)).initialize().fetch()).done(
						function(viewToPush){
							if (window.heavyDebug) console.log('3. GIVING BACK VIA RESOLVE FROM getPastLoadOptions (viewToPush)');
							if (window.heavyDebug) console.log(viewToPush);
							if (window.heavyDebug) console.log(viewToPush.options.streamData);
							// d.resolve(viewToPush);
							if (window.heavyDebug) console.log(viewToPush);
							
							var options = options || new Object();
							options.streamData = viewToPush.options.streamData;
							options.pastloadModule = $(el).attr('data-pastload-module');
							options.pastLoadField = $(el).attr('data-pastload-field');
							if (window.heavyDebug) console.log("$(el).attr('data-pastload-field'): "+$(el).attr('data-pastload-field'));
							// if (window.heavyDebug) console.log('options.pastLoadField: '+options.pastLoadField);
							options.pastLoadTag = $(el).attr('data-pastload-tag');
							if (window.heavyDebug) console.log('options:');
							if (window.heavyDebug) console.log(options);
							$.when((new (eval(options.pastloadModule+'View'))(options)).parseData()).done(
								function(_that){
									d.resolve(_that);
								}
							);
							
						}
					);
				} catch (e) {
					if (window.heavyDebug) console.log('ERROR DOING: (new (eval('+viewName+'))(',options,'))');
					if (window.heavyDebug) console.log('NOW DOING: (new (eval(templateView))(',options,'))');
					$.when((new (templateView)(options)).fetch(options)).done(
						function(viewToPush){
							if (window.heavyDebug) console.log('4. GIVING BACK VIA RESOLVE FROM getPastLoadOptions (viewToPush)');
							if (window.heavyDebug) console.log(viewToPush);
							if (window.heavyDebug) console.log(viewToPush.options.streamData);
							// d.resolve(viewToPush);
							if (window.heavyDebug) console.log(viewToPush);
							
							var options = options || new Object();
							options.streamData = viewToPush.options.streamData;
							options.pastloadModule = $(el).attr('data-pastload-module');
							options.pastLoadField = $(el).attr('data-pastload-field');
							if (window.heavyDebug) console.log("$(el).attr('data-pastload-field'): "+$(el).attr('data-pastload-field'));
							// if (window.heavyDebug) console.log('options.pastLoadField: '+options.pastLoadField);
							options.pastLoadTag = $(el).attr('data-pastload-tag');
							if (window.heavyDebug) console.log('options:');
							if (window.heavyDebug) console.log(options);
							$.when((new (eval(options.pastloadModule+'View'))(options)).parseData()).done(
								function(_that){
									d.resolve(_that);
								}
							);
							
						}					
					);
				} finally {	
				}
				*/
				
			}
						
        });
		
		return MobileRouter;

    }

);
