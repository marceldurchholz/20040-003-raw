define(['jquery', 'underscore', 'Backbone', 	'text!views/template/TemplateView.html', 'text!views/template/VideodetailsView.html', 'text!views/template/BlueTemplateView.html', 'text!views/template/HomeView.html', 
												'text!views/template/BlankView.html', 'text!views/template/SupportView.html', 'text!views/template/DashboardView.html', 'text!views/template/UsersView.html', 'text!views/template/VideosView.html', 
												'text!views/template/MediaView.html', 'text!views/template/RestoreView.html', 'text!views/template/UserView.html', 'text!views/template/UserinterestsView.html', 
												'text!views/template/UserinformationsView.html', 'text!views/template/UserphotoView.html', 'text!views/template/UsercontactView.html', 'text!views/template/LearningstreamView.html',
												'text!views/template/LoginView.html', 'text!views/template/PreferencesView.html'],
    function ($, _, Backbone, 					standardTemplate, videodetailsTemplate, bluestandardTemplate, homeTemplate, 
												blankTemplate, supportTemplate, dashboardTemplate, usersTemplate, videosTemplate, 
												mediaTemplate, restoreTemplate, userTemplate, userinterestsTemplate, 
												userinformationsTemplate, userphotoTemplate, usercontactTemplate, learningstreamTemplate,
												loginTemplate, preferencesTemplate) {
        var TemplateViewVar = Backbone.View.extend({

			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			
			initialize:function(options) {
				// console.log('initialize TemplateView.js');
				// alert('initialize TemplateView.js');
				_this = this;
				_this.options = options || new Object();
				$(_this.el).undelegate('a', 'click');
				_this.options.streamData = _this.options.streamData || new Object();
				_this.options.streamData.userArray = _this.options.streamData.userArray || new Array();
				_this.options.query_vars = _this.options.query_vars || new Object();
				window.me = window.me || new Object();
				_this.options.query_vars.userid = _this.options.query_vars.userid || window.me.id  || "";
			},
			
			fetch:function(options) {
				var d = $.Deferred();
				var _this = this;
				_this.options = options;
				if (window.heavyDebug) console.log('fetch: TemplateView.js');
				if (_this.options.query_vars.userid!=undefined && _this.options.query_vars.userid!="") {
					if (window.heavyDebug) console.log('collecting userdata with userid '+_this.options.query_vars.userid);
					// alert('collecting userdata with userid '+_this.options.query_vars.userid);
					$.when(collectUserData(_this.options.query_vars.userid)).done(
						function(userArray) {
							// if (window.heavyDebug) console.log('userArray.fullname');
							// if (window.heavyDebug) console.log(userArray.fullname);
							_this.options.streamData.userArray = new Array(userArray);
							d.resolve(_this);
						}
					);
				}
				else d.resolve(_this);
				return d.promise();
			},

			parseData:function() {
				var d = $.Deferred();
				_self = this;
				$.when(_self.fetch(_self.options)).done(
					function(_this) {
						_this.options.dynContent = _.template(_this.options.sidemenuModel.get('dynContent'),{page_vars:_this.options}) || "";
						require([_this.options.sidemenuModel.get('templateUrl')], function(_foundTemplateContent) {
							try {
								var _finalContent = _.template(_foundTemplateContent,{page_vars:_this.options}).replace('	','').replace(/\n|\r|\t/g, "");
								_this.$el.html(_finalContent);
								$(_this.$el).trigger('create');
								d.resolve(_this);
							} catch (e) {
								console.log('Error during template parsing:');
								console.log(e);
								require(['text!views/template/TemplateView.html'], function(_foundTemplateContent) {
									var _finalContent = _.template(_foundTemplateContent,{page_vars:_this.options}).replace('	','').replace(/\n|\r|\t/g, "");
									_this.$el.html(_finalContent);
									$(_this.$el).trigger('create');
									d.resolve(_this);
								});
							} finally {	
								// if (window.heavyDebug) console.log('template generated, content is:');
							}
						});
					}
				);
				return d.promise();
			},
			
            render:function () {
				_this = this;
			}

        });
        return TemplateViewVar;
    });