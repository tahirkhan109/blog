var Sud = function () {
    return {
        init:function () {
            jQuery('.widget .tools .icon-chevron-down, .widget .tools .icon-chevron-up').click(function () {
                var el = jQuery(this).parents(".widget").children(".widget-body");
                if (jQuery(this).hasClass("icon-chevron-down")) {
                    jQuery(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
                    el.slideUp(200);
                } else {
                    jQuery(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
                    el.slideDown(200);
                }
            });
        }
    };

}();