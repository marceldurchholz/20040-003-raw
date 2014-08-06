define(['underscore', 'Backbone', 'text!selfies/navigation/PanelfunctionsView.html'],
    function (_, Backbone, PanelfunctionsViewTemplate) {

        var PanelfunctionsViewVar = Backbone.View.extend({

			// el: "#panel_functions",
			template: _.template(PanelfunctionsViewTemplate),
			
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
            render: function () {
				var _this = this;
				var $el = $(_this.el);
				$el.panel();
				/*
				var _this = this;
				var $el = $(this.el);
				$el.panel();
				$el.html(this.template({}));
				$el.trigger("create");
				*/
				$el.html(this.template({}));
				$el.trigger("create");
				return this;
            }

        });

        return PanelfunctionsViewVar;
    });