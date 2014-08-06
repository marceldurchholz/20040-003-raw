define(['underscore', 'Backbone', 'selfies/navigation/TestViewHref', 'text!selfies/navigation/TestViewHref.html'],
    function (_, Backbone, TestViewHref, TestViewHrefTemplate) {

		var TestViewLiVar = Backbone.View.extend({

			// el: "",
			tagName: 'ul',
			className: 'NO_UL_CLASS',
			template: _.template(TestViewHrefTemplate),
			
			
			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			initialize: function() {
				$(this.el).undelegate('a', 'click');
				// this.collection.on("reset", this.render, this);
			},
			fetch: function() {
				// console.log('fetching UL');
			},
			
			render: function() {
				
				var _this = this;
				var $el = $(this.el);
				
				this.collection = filterCollection('!=',this.collection, 'navmobileshow', false);
				if (window.me.id && window.me.id!='') this.collection = filterCollection('has_not_role',this.collection, 'roles', 'public');
				else this.collection = filterCollection('has_role',this.collection, 'roles', 'public');
				this.collection.each(function(row) {				
					var _row = row;
					$el.data('listId', _row.get('id'));
					var contentObject = new Object({
						item: {
							'liHTML':(new TestViewHref({model:_row}).render().el).outerHTML
						}
					},{variable: 'item'});
					$el.append(contentObject.item.liHTML);
				});
				/*
				if (checkRole('user')==true) {
					if (window.me.fullname && window.me.fullname!="") var profileImageRightTextA = '<p><span style="width:100%;" data-pastload-module="simpletext" data-pastload-field="fullname"></span><p>';
					if (window.me.username && window.me.username!="") var profileImageRightTextB = '<p><span style="width:100%;" data-pastload-module="simpletext" data-pastload-field="username"></span><p>';
					$el.prepend('<li data-mini="true" data-icon="arrow-l" style="height:70px !important;"><a style="height:70px !important;" class="ui-btn" data-rel="close" href="#myprofile"><img data-pastload-module="simpletext" data-pastload-field="pictureurl" data-pastload-tag="src" src="images/avatar.jpg" style="padding:10px;padding-right:0px;height:50px !important;width:50px !important;left:1px !important;">'+profileImageRightTextA+''+profileImageRightTextB+'</a></li>');
					// $el.prepend('<li data-mini="true" data-icon="arrow-l" style="height:70px !important;"><a style="height:70px !important;" class="ui-btn" data-rel="close" href="#myprofile"><img data-pastload-module="simpletext" data-pastload-field="pictureurl" data-pastload-tag="src" src="images/avatar.jpg" style="padding:10px;padding-right:0px;height:50px !important;width:50px !important;"> <br> </a></li>');
				}
				*/
				$el.prepend('<li data-mini="true" data-icon="arrow-l"><a data-ajax="true" class="ui-btn ui-btn-icon-left ui-icon-carat-l" data-rel="close">Menü schließen</a></li>');
				// $el.attr('data-theme','d').listview().listview("refresh");
				$el.attr('data-role','listview').listview().listview("refresh");
				return this;
			}
		});

        return TestViewLiVar;

    }

);