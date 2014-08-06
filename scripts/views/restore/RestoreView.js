define(['jquery', 'underscore', 'Backbone', 'text!views/template/RestoreView.html'],
	function ($, _, Backbone, RestoreViewTemplate) {
		var RestoreViewVar = Backbone.View.extend({

			template: _.template(RestoreViewTemplate),
			
			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			
			initialize:function(options) {
				console.log('initialize RestoreView.js');
				$(this.el).undelegate('a', 'click');
				// alert('bla');
				deleteAnonymousData();
			},
			
			fetchData:function(options) {
				var d = $.Deferred();
				d.resolve(_this);
				return d.promise();
			},

			parseData:function() {
				var d = $.Deferred();
				d.resolve(this);
				return d.promise();
			},
			
            render:function () {
				// _this = this;
				this.$el.html(this.template(this.options));
				return this;
			}

        });
        return RestoreViewVar;
    });
