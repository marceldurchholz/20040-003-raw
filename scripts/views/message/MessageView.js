define(['jquery', 'underscore', 'Backbone', 'text!views/template/MessagesView.html'],
    function ($, _, Backbone, videosTemplate) {
        var MessagesViewVar = Backbone.View.extend({

			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			
			initialize:function(options) {
				_this = this;
				_this.options = options || new Object();
				$(_this.el).undelegate('a', 'click');
				_this.options.streamData = _this.options.streamData || new Object();
				_this.options.streamData.userArray = _this.options.streamData.userArray || new Array();
				_this.options.streamData.messageArray = _this.options.streamData.messageArray || new Array();
				_this.options.query_vars = _this.options.query_vars || new Object();
				window.me = window.me || new Object();
				_this.options.query_vars.messageid = _this.options.query_vars.messageid || "";
				_this.options.query_vars.userid = _this.options.query_vars.userid || window.me.id  || "";
			},
			
			fetchData:function(options) {
				var d = $.Deferred();
				var _this = this;
				_this.options = options;
				if (_this.options.query_vars.userid!=undefined && _this.options.query_vars.userid!="") {
					$.when(collectUserData(_this.options.query_vars.userid) , collectmessageArray(_this.options.query_vars.userid)).done(
					// $.when(collectmessageArray(_this.options.query_vars.userid)).done(
						function(userArray,messageArray) {
							_this.options.streamData.userArray = new Array(userArray);
							_this.options.streamData.messageArray = messageArray;
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
				$.when(_self.fetchData(_self.options)).done(
					function(_this) {
						_this.options.dynContent = _.template(_this.options.sidemenuModel.get('dynContent'),{page_vars:_this.options}) || "";
						require([_this.options.sidemenuModel.get('templateUrl')], function(_foundTemplateContent) {
							try {
								var _finalContent = _.template(_foundTemplateContent,{page_vars:_this.options}).replace('	','').replace(/\n|\r|\t/g, "");
								_this.$el.html(_finalContent);
								$(_this.$el).trigger('create');
								d.resolve(_this);
							} catch (e) {
								require(['text!views/template/MessagesView.html'], function(_foundTemplateContent) {
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
        return MessagesViewVar;
    });