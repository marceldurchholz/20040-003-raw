require.config({
	baseUrl: 'scripts/',
    paths:{
		defvalues:'libs/basic/defvalues',
		foreach:'libs/jquery.mobile/foreach',
		accounting:'libs/basic/accounting',
		fastclick:'libs/jquery.mobile/fastclick',
		dpd: "libs/deployd/dpd",
		// dpd: "http://s15944029.onlinehome-server.info:5000/dpd",
		jquery:'libs/jquery/jquery-2.1.1',
        // jquerymigrate:'libs/jquery/jquery-migrate-1.2.1',
		jqm:'libs/jquery.mobile/jquery.mobile-1.4.3',
		// transit:'libs/jquery.mobile/transit',
		// touchwipe:'libs/jquery.mobile/touchwipe/touchwipe',
		javascript:'libs/basic/javascript',
		jEditable:'libs/jquery.mobile/jEditable',
		jScrollTo:'libs/jquery.mobile/jquery.scrollTo',
		documentready:'libs/basic/documentready',
		onpageevents:'libs/basic/onpageevents',
		jquerysetup:'libs/basic/jquerysetup',
		// storageadapters:'libs/basic/storageadapters',
		myfunctions:'libs/jquery.mobile/myfunctions',
		jqparseparams:'libs/basic/jqparseparams',
		putcursoratend:'libs/basic/putcursoratend',
		jqmNavigator:'libs/jquery.mobile/jqmNavigator',
		jqmNativeSpinnerPlugin:'libs/jquery/plugins/jqmNativeSpinnerPlugin',
		jqueryhotkeys:'libs/jquery/plugins/jquery.hotkeys',
		jqueryautosize:'libs/jquery/plugins/jquery.autosize',
		jqueryage:'libs/jquery/plugins/jquery.age',
		// jLoading:'libs/jquery.mobile/jquery.loading',
		// deployd: dpd_server+"dpd",
		// deploydloader: 'libs/basic/deployd-loader'
        text:'libs/require/text',
        domReady:'libs/require/domReady',
        underscore:'libs/underscore/underscore',
		Backbone:'libs/backbone/backbone.1.1.2',
		MobileRouter: "routers/MobileRouter",
		openfb: "libs/openfb/openfb",
		app: "app"
		// facebook: '//connect.facebook.net/en_US/all'
    },
    shim:{
		/*
		facebook:{
			exports: 'FB'
		},
        */
		Backbone:{
            deps:['underscore'],
            exports:'Backbone'
        },
        underscore:{
            exports:'_'
        },
		domReady:{
			deps:['dpd','foreach','javascript','fastclick','jquery','jqm','jquerysetup','jqparseparams','accounting','jqueryhotkeys','jqueryautosize','jqueryage','jEditable','jScrollTo','openfb','myfunctions','documentready','putcursoratend','onpageevents']
		}
    }
});



define(['app'],
    function (app) {

		
    }
);
