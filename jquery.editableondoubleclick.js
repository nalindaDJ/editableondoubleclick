/*
 * jQuery Editable On Double Click Plugin
 * Version: 1.0.0
 *
 * The editableOnDoubleClick jQuery plugin presented here enhances the interactivity of HTML elements
 * by allowing users to edit their content upon double-clicking. This plugin extends jQuery's functionality
 * to provide a seamless editing experience, enabling users to update text content directly within the browser window.
 *
 * @author: Damith Nalinda Jayasinghe
 * @license: MIT
 * @repository: https://github.com/nalindaDJ/editableondoubleclick
 */
(function ($) {
    $.fn.editableOnDoubleClick = function (options) {
        const settings = $.extend({
            onSave: function (newValue) {},
            onCancel: function () {}
        }, options);

        return this.each(function () {
            let $this = $(this);
            let oldValue;

            $this.dblclick(function () {
                oldValue = $this.text();
                $this.addClass('editing').attr('contenteditable', true).focus();
            });

            $this.on('keydown', function (event) {
                if (event.shiftKey && event.keyCode === 13) { // Shift+Enter keys
					event.preventDefault();
                    let selection = window.getSelection();
                    let range = selection.getRangeAt(0);
                    let br = document.createElement("br");
                    range.deleteContents();
                    range.insertNode(br);
                    range.setStartAfter(br);
                    range.setEndAfter(br);
                    selection.removeAllRanges();
                    selection.addRange(range);
                } else if (event.keyCode === 13) { // Enter key
                    event.preventDefault();
                    exitEditing();
                } else if (event.keyCode === 27) { // Escape key
                    $this.text(oldValue);
                    exitEditing();
                }
            });

            // Save and exit editing mode when focus leaves the element
            $this.on('blur', function() {
                exitEditing();
            });

            function exitEditing() {
                $this.removeClass('editing').removeAttr('contenteditable');
                let newValue = $this.text().trim(); // Trim whitespace
                if (newValue !== oldValue) {
                    settings.onSave(newValue);
                } else {
                    settings.onCancel();
                }
            }
        });
    };
}(jQuery));
