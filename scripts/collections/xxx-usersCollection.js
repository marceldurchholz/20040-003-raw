define(["jquery", "underscore", "Backbone"],
  function($, _, Backbone) {
	var usersModel = Backbone.Model.extend({
		defaults: {
		  // urloffline: "nothing",
		  // userfriendly: "no text in here"
		}
	});
	var usersCollectionVar = Backbone.Collection.extend({
		url: dpd_server+'users/?{"deleted":false,"$sort":"fullname"}',
		model: usersModel,
		initialize: function() {
		},
		fetch: function(options) {
			var usersResponseObject = Backbone.Collection.prototype.fetch.call(this, options);
			return usersResponseObject;
		},
		sync: function(method, model, options) {
			Backbone.sync.call(model, method, model, options);
		},
		parse: function(response, xhr) {
			for (n = 0; n < response.length; ++n) {
				var model = response[n];
				var access = 1;
				// if (checkAppConfigs(model.roles)==true) access = 1;
				//// if (access==0) if (checkRoles(model.roles)==true) access = 1;
				// console.log(model.userfriendly+' > '+access);
				//// if (access==1) if (checkAppConfigs(model.roles)==true) access = 1;
				// console.log(model.roles.toString());
				// console.log(this);
				if (access>0) this.add(new usersModel(model));
				else this.remove(new usersModel(model));
			}
			return(this.models);
		}
	});
    return usersCollectionVar;
  }
);