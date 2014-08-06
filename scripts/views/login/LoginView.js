define(['underscore', 'Backbone', 'text!views/template/LoginView.html'],
    function (_, Backbone, LoginViewTemplate) {

        var LoginView = Backbone.View.extend({

			template: _.template(LoginViewTemplate),
			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			
			initialize:function() {
				$(this.el).undelegate('a', 'click');
				alert('LoginView.js initialize');
			},
			
			parseFunctions: function() {
				alert('parseFunctions: function() {...');
			},
			
            render:function() {
				this.$el.html(this.template(this.options));
				alert('LoginView.js render');
				return this;
            }

        });

        return LoginView;
    });