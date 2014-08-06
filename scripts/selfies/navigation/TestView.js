define(['underscore', 'Backbone', 'selfies/navigation/TestViewUl', 'text!selfies/navigation/TestView.html'],
    function (_, Backbone, TestViewUl, TestViewTemplate) {

        var TestViewVar = Backbone.View.extend({

			// el: "#panel_left",
			// tagName: '',
			// className: '',
			template: _.template(TestViewTemplate),
			// collection: new sidemenusCollection(),
			
			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			initialize: function(options) {
				var _this = this;
				_this.options = options;
				if (window.heavyDebug) console.log(_this.options);
				$(_this.el).undelegate('a', 'click');
				// this.collection.fetch();
				// this.collection.on("add", this.sidemenusAll, this);
				// this.collection.on("remove", this.sidemenusAll, this);
				// this.collection.on("wow", this.bla, this);
				// this.collection.trigger("reset");
				// this.collection.on("reset", this.render, this);
			},
			fetch: function(a,b) {
                // this.render();
			},
            render: function () {
				// alert('rendering '+this.el);
				var _this = this;
				var $el = $(_this.el);
				$el.panel();
				var sidebarHTML = (new TestViewUl({collection:_this.collection}).render().el).outerHTML;
				var contentObject = new Object({
					item: {
						'sidebarHTML':sidebarHTML
					}
				},{variable: 'item'});
				$el.html(_this.template(contentObject));
				$el.trigger("create");
				return _this;
            }

        });

        return TestViewVar;
    });