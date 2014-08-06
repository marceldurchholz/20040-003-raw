define(['underscore', 'Backbone', 'text!selfies/navigation/PanelrightView.html'],
    function (_, Backbone, PanelrightViewTemplate) {

        var PanelrightViewVar = Backbone.View.extend({

			// el: "#panel_right",
			template: _.template(PanelrightViewTemplate),
			
			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			initialize: function(options) {
				var _this = this;
				_this.options = options;
				if (window.heavyDebug) console.log(_this.options);
				$(_this.el).undelegate('a', 'click');
				this.collection.on("reset", this.render, this);
			},
			fetch: function(a,b) {
                // this.render();
			},
            render: function () {
				var _this = this;
				var $el = $(_this.el);
				$el.panel();
				/*
				var sidebarHTML = (new TestViewUl({collection:_this.collection}).render().el).outerHTML;
				var contentObject = new Object({
					item: {
						'sidebarHTML':sidebarHTML
					}
				},{variable: 'item'});
				$el.html(_this.template(contentObject));
				*/
				$el.html(this.template({}));
				$el.trigger("create");
				return _this;
            }

        });

        return PanelrightViewVar;
    });