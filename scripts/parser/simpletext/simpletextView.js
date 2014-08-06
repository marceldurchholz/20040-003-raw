define(['underscore', 'Backbone', 'text!parser/simpletext/simpletext.html'],
    function (_, Backbone, simpletextTemplate) {

        var simpletextViewVar = Backbone.View.extend({

			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			initialize:function(options) {
				// console.log('initializing simpletextView.js  w/  window.ajaxLoader: '+window.ajaxLoader);
				_this = this;
				_this.options = options;
				$(_this.el).undelegate('a', 'click');
				_this.options.streamData = _this.options.streamData || new Object();
				_this.options.query_vars = _this.options.query_vars || new Object();
				_this.options.pastLoadField = _this.options.pastLoadField || "";
				window.me = window.me || new Object();
				_this.options.query_vars.userid = _this.options.query_vars.userid || window.me.id  || "";
			},
			parseData:function() {
				var d = $.Deferred();
				var _this = this;
				require(['text!parser/templates/'+_this.options.pastLoadField+'.html'], function(_foundTemplateContent) {
					$.when(window.MobileApp.myrouter.getViewByRouteForPush(_this.options.sidemenuModel.attributes.urloffline+'View',_this.options)).done(
						function(viewToPush) {
							_this.options.streamData = viewToPush.options.streamData;
							try {
								_this.$el.html(_.template(_foundTemplateContent,{page_vars:_this.options}).replace('	','').replace(/\n|\r|\t/g, ""));
								$(_this.$el).trigger('create');
								d.resolve(_this);
							} catch (e) {
								console.log('Error during simpletext module parsing:');
								console.log(e);
								_this.$el.html(_.template(simpletextTemplate,{page_vars:_this.options}).replace('	','').replace(/\n|\r|\t/g, ""));
								$(_this.$el).trigger('create');
								d.resolve(_this);
							} finally {	
							}
						}
					);
				});

				return d.promise();
				
			},
            render:function () {
				_this = this;
            }

        });

        return simpletextViewVar;
    });