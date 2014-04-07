// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require conquer/js/jquery-1.8.3.min.js
//= require conquer/jquery-slimscroll/jquery-ui-1.9.2.custom.min.js
//= require conquer/jquery-slimscroll/jquery.slimscroll.min.js
//= require conquer/fullcalendar/fullcalendar/fullcalendar.min.js
//= require conquer/bootstrap/js/bootstrap.min.js
//= require conquer/js/jquery.blockui.js
//= require conquer/js/jquery.cookie.js
//= require conquer/js/excanvas.js
//= require conquer/js/respond.js
//= require conquer/jqvmap/jqvmap/jquery.vmap.js
//= require conquer/jqvmap/jqvmap/maps/jquery.vmap.russia.js
//= require conquer/jqvmap/jqvmap/maps/jquery.vmap.world.js
//= require conquer/jqvmap/jqvmap/maps/jquery.vmap.europe.js
//= require conquer/jqvmap/jqvmap/maps/jquery.vmap.germany.js
//= require conquer/jqvmap/jqvmap/maps/jquery.vmap.usa.js
//= require conquer/jqvmap/jqvmap/data/jquery.vmap.sampledata.js
//= require conquer/jquery-knob/js/jquery.knob.js
//= require conquer/jquery-knob/js/jquery.sparkline.min.js
//= require conquer/jquery-knob/js/justgage.1.0.1.min.js
//= require conquer/jquery-knob/js/raphael.2.1.0.min.js
//= require conquer/js/jquery.peity.min.js
//= require conquer/gritter/js/jquery.gritter.js
//= require conquer/uniform/jquery.uniform.min.js
//= require conquer/js/jquery.pulsate.min.js
//= require conquer/bootstrap-daterangepicker/date.js
//= require conquer/bootstrap-daterangepicker/daterangepicker.js
//= require conquer/bootstrap-daterangepicker/daterangepicker.js
//= require conquer/clockface/js/clockface.js
//= require conquer/fancybox/source/jquery.fancybox.pack.js
//= require conquer/bootstrap-wizard/jquery.bootstrap.wizard.min
//= require conquer/js/app.js
//= require  conquer/data-tables/jquery.dataTables
//= require  conquer/data-tables/DT_bootstrap.js
//= require_self
//= require  conquer/bootstrap-datepicker/js/bootstrap-datepicker.js
//= require  conquer/bootstrap-daterangepicker/date.js
//= require  conquer/bootstrap-daterangepicker/daterangepicker.js
//= require  conquer/bootstrap-timepicker/js/bootstrap-timepicker.js
//= require_tree .
jQuery(document).ready(function () {
    // initiate layout and plugins
    App.setMainPage(true);
    App.init();

});
//var _gaq = _gaq || [];
//_gaq.push(['_setAccount', 'UA-37564768-1']);
//_gaq.push(['_setDomainName', 'keenthemes.com']);
//_gaq.push(['_setAllowLinker', true]);
//_gaq.push(['_trackPageview']);
//(function () {
//    var ga = document.createElement('script');
//    ga.type = 'text/javascript';
//    ga.async = true;
//    ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
//    var s = document.getElementsByTagName('script')[0];
//    s.parentNode.insertBefore(ga, s);
//})();
// ********************************************Listing JavaScript**************************************************************************

setTimeout("$('#flash_notices').html(' ');", 10000);

function hudMsg(type, message, timeOut) {

    $('.hudmsg').remove();

    if (!timeOut) {
        timeOut = 3000;
    }

    var timeId = new Date().getTime();

    if (type != '' && message != '') {

        $('<div class="hudmsg ' + type + '" id="msg_' + timeId + '"><img src="/assets/msg_' + type + '.png" alt="" />' + message + '</div>').hide().appendTo('body').fadeIn();

        var timer = setTimeout(
            function () {
                $('.hudmsg#msg_' + timeId + '').fadeOut('slow', function () {
                    $(this).remove();
                });
            }, timeOut
        );
    }
}
