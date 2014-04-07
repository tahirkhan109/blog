var isSortingWidgetList = false;

/**
 * Bootstrap functionality for the App Majik application
 *
 * @author Suffocate <jallen@2moro.com.au>
 * @version 1.0 (2011-06-06)
 */
//$('document').ready(function() {
//
//	initWidgetMenu();
//	$(".sortable").sortable();
//	removeBlocks('.remove-holder', '.btn-close', true);
//	removeBlocks('.sortable>li', '.btn-delete');
//	$("img").error(function() {
//		$(this).hide();
//	});

//	try {
//		$("span select").msDropDown();
//	} catch (e) {
//		alert(e.message);
//	}

//	if ($('#ScheduleDateTime').length > 0) {
//		$('#ScheduleDateTime').datetimepicker({
//			changeYear : false,
//			changeMonth : false,
//			dateFormat : 'yyyy/mm/dd HH:MM',
//			timeFormat : 'hh:mm',
//			showButtonPanel : true
//		});
//	}

//});

/**
 * Initialises the Widget Menu (if it exists) for drag'n'drop.
 *
 * @author Suffocate <jallen@2moro.com.au>
 * @version 1.0 (2011-06-06)
 */
function initWidgetMenu() {
    var widgetMenu = $('#widget-list');
    // Only attempt this if the menu actually exists on the page
    if (widgetMenu.length > 0) {
        var widgetMenuListItems = widgetMenu.find('li');
        // Bind custom events to the li elements
        toggleEditBarBindings(widgetMenuListItems, true);

        widgetMenu.sortable({
            revert:false,
            axis:"y",
            items:"li:not(.ui-state-disabled)",
            update:updateWidgetOrder,
            start:toggleEditBarBindings(widgetMenuListItems, false),
            stop:toggleEditBarBindings(widgetMenuListItems, true)
        });

        $("ul, li").disableSelection();

    }

}

/**
 * Iterates through the Widget Menu li elements and binds the
 * mouseenter/mouseleave function so that the edit/del icons appear as the user
 * rolls over each li element.
 *
 * @param listItems
 *            array of DOM elements (li)
 * @param bindOn
 *            boolean flag indicating whether to bind (true) or unbind (false)
 */
function toggleEditBarBindings(listItems, bindOn) {

    // For each list item
    for (var i = 0; i < listItems.length; i++) {

        if (bindOn) {
            // Bind the mouseenter and mouseleave function
            $(listItems[i]).bind("mouseenter", showEditBar);
            $(listItems[i]).bind("mouseleave", hideEditBar);
        } else {
            // Bind the mouseenter and mouseleave function
            $(listItems[i]).unbind("mouseenter");
            $(listItems[i]).unbind("mouseleave");
        }

    }

}

function showEditBar() {

    // Get an array of edit bar divs
    var p = $(this).find('.widget-menu-edit-bar');
    if (p.length > 0) {
        if (!$(this).hasClass("active")) {
            $(p).fadeIn('fast');
        }
    }

}

function hideEditBar() {

    // Get an array of edit bar divs
    var p = $(this).find('.widget-menu-edit-bar');
    if (p.length > 0) {
        if (!$(this).hasClass("active")) {
            $(p).fadeOut('fast');
        }
    }

}

/**
 * Fires off an AJAX request to update the widget order in the database.
 *
 * NOTE: there is no response handling at this time. The view probably deserves
 * its own flash div eventually to handle ajax update errors.
 *
 * @param event
 * @param ui
 */

function include(arr, obj) {
    for(var i=0; i<arr.length; i++) {
        if (arr[i] == obj) return true;
    }
}

function updateWidgetOrder(event, ui) {
    // Grab all of the sortable widgets
    var widgetChildren = $('#widget-list').children(
        'li:not(.ui-state-disabled)');

    var sortOrder = new Array();
    var popArray = new Array();
    var finalArray = new Array();
    if (ter_select_new.length > 1) {
        for (var i = 0; i < ter_select_new.length; i++) {
            sortOrder.push(ter_select_new[i]);
        }
    }

    $('.out-route-gray-table').removeClass('out-route-gray-table');
    $('.out-route-light-gray-table').removeClass('out-route-light-gray-table');
    for (var i = 0; i < widgetChildren.length; i++) {
        if (i % 2 == 0) {
            $("#" + widgetChildren[i].id).addClass('out-route-gray-table');
        } else {
            $("#" + widgetChildren[i].id).addClass('out-route-light-gray-table');
        }
        if (ter_select_new.length > 1) {
            already = include(sortOrder, widgetChildren[i].id);
            if (already == undefined) {
               sortOrder.push(widgetChildren[i].id);
            }

        } else {
            sortOrder.push(widgetChildren[i].id);
        }

    }

    $('#widget-list').sortable("option", "disabled", true);
    var country_id = $('#country_routing').val();
    var rpid = $('#route_plan').val()
    // toggleWidgetListAjaxIcons();
    if (ter_select_new.length > 1) {
        $('.shadow').show();
        $('.ajax_loader').show();
        var rgid = $("#rgid").val();
        var div_index = $("#div_index").val();
        var id_setter = $("#id_setter").val();
        var rate = $("#rate").val();
        var container = $("#terminator_routing_div");
        $.ajax({
            url:'/routings/update_order?sortOrder=' + sortOrder + '&rpid=' + rpid + '&country_id=' + country_id + '&multiple_value=true' + '&rgid=' + rgid + '&div_index=' + div_index + '&id_setter=' + id_setter + '&rate=' + rate,
            processData:false,
            success:function (data) {
                container.html(data.html);
                $('.shadow').hide();
                $('.ajax_loader').hide();
            },
            error:function (data) {
                window.location.reload();
            }
        });
    } else {
        $.post("/routings/update_order", {
            'sortOrder':sortOrder,
            'rpid':rpid,
            'country_id':country_id,
            'multiple_value':"false"
        }, updateWidgetOrderCallback);
    }

}

function toggleWidgetListAjaxIcons() {
    var draggableIcons = $('#widget-list').find('.widget-menu-draggable-icon');

    var ajaxLoaderIcons = $('#widget-list').find('.widget-menu-draggable-ajax');

    for (var i = 0; i < draggableIcons.length; i++) {
        $(draggableIcons[i]).toggle();
    }

    for (var i = 0; i < ajaxLoaderIcons.length; i++) {
        $(ajaxLoaderIcons[i]).toggle();
    }
}

/**
 * Hide the ajax loader icons and display the draggable icons again. Renable
 * sorting.
 *
 * @param response
 * @return
 */
function updateWidgetOrderCallback(response) {

    // TODO handle errors

    toggleWidgetListAjaxIcons();
    $('#widget-list').sortable("option", "disabled", false);

}

function removeBlocks(_holder, _closer, _effect) {
    var holder = $(_holder);
    var slideDuration = 500;
    holder.each(function () {
        var _this = $(this);
        var closer = _this.find(_closer);
        closer.click(function () {
            if (_effect) {
                _this.css('opacity', 0).slideUp(slideDuration, function () {
                    $(this).remove();
                });
            } else
                _this.remove();
            return false;
        });
    });
}

function onAppSelectChange(value, controller) {
    window.location.replace('/dashboard/app_redirect?app_id=' + value
        + '&controller=' + controller);
}

/**
 * For use in the import pages for schedule widgets
 */
function onFileTypeClick(fileSelectId, dateSelectId) {

    if ($('#' + fileSelectId).val() == 'ics') {
        $('#' + dateSelectId).val(4);
    } else {
        $('#' + dateSelectId).val(0);
    }

}

/**
 * Disables an A element and displays a message if the
 * user clicks it.
 *
 * @param linkId
 * @param alertText
 */
function disableLink(linkId, alertText) {
    var link = $('#' + linkId);
    link.addClass('disabled');
    link.unbind();
    link.removeAttr('href');
    link.removeAttr('onclick');
    link.click(function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        alert(alertText);
        return false;
    });
}