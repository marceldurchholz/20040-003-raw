define(['jquery', 'underscore', 'Backbone', 'text!views/template/CardsView.html'],
	function ($, _, Backbone, cardsTemplate) {
		var CardsViewVar = Backbone.View.extend({

			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			
			initialize:function(options) {
				console.log('initialize CardsView.js');
				// alert('initialize CardsView.js');
				_this = this;
				_this.options = options || new Object();
				$(_this.el).undelegate('a', 'click');
				_this.options.streamData = _this.options.streamData || new Object();
				_this.options.streamData.userArray = _this.options.streamData.userArray || new Array();
				_this.options.streamData.cardsArray = _this.options.streamData.cardsArray || new Array();
				_this.options.query_vars = _this.options.query_vars || new Object();
				window.me = window.me || new Object();
				_this.options.query_vars.userid = _this.options.query_vars.userid || window.me.id  || "";
			},
			
			fetchData:function(options) {
				var d = $.Deferred();
				var _this = this;
				_this.options = options;
				console.log('fetch: CardsView.js');
				if (_this.options.query_vars.userid!=undefined && _this.options.query_vars.userid!="") {
					console.log('collecting carddata with userid '+_this.options.query_vars.userid);
					$.when(collectUserData(_this.options.query_vars.userid) , collectCardsArray(_this.options.query_vars.userid)).done(
					// $.when(collectCardsArray(_this.options.query_vars.userid)).done(
						function(userArray,cardsArray) {
							// console.log(cardsArray);
							// alert('cardsArray');
							_this.options.streamData.userArray = new Array(userArray);
							_this.options.streamData.cardsArray = cardsArray;
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
						console.log(_this);
						_this.options.dynContent = _.template(_this.options.sidemenuModel.get('dynContent'),{page_vars:_this.options}) || "";
						require([_this.options.sidemenuModel.get('templateUrl')], function(_foundTemplateContent) {
							try {
								var _finalContent = _.template(_foundTemplateContent,{page_vars:_this.options}).replace('	','').replace(/\n|\r|\t/g, "");
								_this.$el.html(_finalContent);
								$(_this.$el).trigger('create');
								d.resolve(_this);
							} catch (e) {
								require(['text!views/template/CardsView.html'], function(_foundTemplateContent) {
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
        return CardsViewVar;
    });