/*
                              _       __  _     
   ____ ___  ____ ___________(_)___ _/ / (_)____
  / __ `__ \/ __ `/ ___/ ___/ / __ `/ / / / ___/
 / / / / / / /_/ / /  / /__/ / /_/ / / / (__  ) 
/_/ /_/ /_/\__,_/_/   \___/_/\__,_/_(_)_/____/  

jQuery Plugins
Author: Michael Marcialis, michael@marcial.is
*/


/*********************************************************************************************************
**********************************************************************************************************
***
***  HTML5 BOILERPLATE DEFAULTS
***
**********************************************************************************************************
*********************************************************************************************************/


// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());