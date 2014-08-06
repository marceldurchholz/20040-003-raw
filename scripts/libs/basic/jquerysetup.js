
/***** START ALL CONTENT AS AN AMD JQUERY PLUGIN *****/

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
}(this, function ($) {

	try {
		if (window.heavyDebug) console.log('jquerysetup.js');
		$.ajaxSetup({
			// timeout: 10000, // Microseconds, for the laughs.  Guaranteed timeout.
			error: function(request, status, maybe_an_exception_object) {
				if(status == 'timeout') {
					doAlert("Internet connection timed out - probably you have a slow network connection!","Information");
				}
				else {
					doAlert("Unknown Error occured!","Information");
				}
			}
		});
	} catch(e) {
		console.log('error while loading jquerysetup.js');
		console.log(e);
	}
		
}));