
/***** START ALL CONTENT AS AN AMD JQUERY PLUGIN *****/

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
}(this, function ($) {

	$(document).on( "mobileinit", function( event ) {
		activateNativeSpinnerPlugin = {
			initialize: function() {
				if (window.heavyDebug) console.log('jqmNativeSpinnerPlugin.js');
				if (window.spinnerplugin) {
					$.extend($.mobile, {
						loading: function() {
							if (window.heavyDebug) console.log('using jqmNativeSpinnerPlugin.js while ajax loading');
							// Show/hide spinner
							var arg = arguments ? arguments[0] : '';
							if (arg == 'show') spinnerplugin.show({'overlay':true,'timeout':10,'fullscreen':true});
							else if (arg == 'hide' || arg == undefined) spinnerplugin.hide();
							// Compatibility with jQM 1.4
							return { loader: function() { } }
						}
					}); 
				} else {
					$.extend($.mobile, {
						loading: function() {
							if (window.heavyDebug) console.log('using jqmNativeSpinnerPlugin.js while ajax loading');
							// Show/hide spinner
							var arg = arguments ? arguments[0] : '';
							if (arg == 'show') console.log('show'); // spinnerplugin.show({'overlay':true,'timeout':10,'fullscreen':true});
							// else if (arg == 'hide') console.log('hide'); // spinnerplugin.hide();
							else if (arg == 'hide' || arg == undefined) console.log('hide'); // spinnerplugin.hide();
							// Compatibility with jQM 1.4
							return { loader: function() { } }
						}
					});				
				}
			}
		}
	// activateNativeSpinnerPlugin.initialize();
	});
	
}));