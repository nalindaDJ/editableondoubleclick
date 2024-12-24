/*
 * jQuery Editable On Double Click Plugin - Enhanced
 * Version: 1.1.0
 *
 * This plugin allows users to edit text content on double-click, with added accessibility,
 * validation, and usability enhancements.
 *
 * @author: Damith Nalinda Jayasinghe
 * @license: MIT
 * @repository: https://github.com/nalindaDJ/editableondoubleclick
 */
(function ($) {
    $.fn.editableOnDoubleClick = function (options) {
        const settings = $.extend({
            onSave: function (newValue) {},
            onCancel: function () {},
            validate: function (newValue) { return true; }, // Default to always valid
            enableMultiline: true, // Toggle multiline support
            shortcuts: {
                save: 'Enter',
                cancel: 'Escape',
                newline: 'Shift+Enter'
            },
            editingClass: 'editing'
        }, options);

        return this.each(function () {
            let $this = $(this);
            let oldValue;

            // Make the element focusable for better accessibility
            $this.attr('tabindex', 0).attr('role', 'textbox').attr('aria-live', 'polite');

            $this.dblclick(function () {
                oldValue = $this.text();
                $this.addClass(settings.editingClass).attr('contenteditable', true).focus();
            });

            $this.on('keydown', function (event) {
                if (settings.enableMultiline && event.shiftKey && event.key === settings.shortcuts.newline.split('+')[1]) {
                    event.preventDefault();
                    document.execCommand('insertLineBreak');
                } else if (event.key === settings.shortcuts.save) {
                    event.preventDefault();
                    exitEditing(true);
                } else if (event.key === settings.shortcuts.cancel) {
                    event.preventDefault();
                    exitEditing(false);
                }
            });

            $this.on('blur', function () {
                exitEditing(true);
            });

            function exitEditing(save) {
                $this.removeClass(settings.editingClass).removeAttr('contenteditable');
                let newValue = $this.text().trim();

                if (save) {
                    if (settings.validate(newValue)) {
                        if (newValue !== oldValue) {
                            settings.onSave(newValue);
                        } else {
                            settings.onCancel();
                        }
                    } else {
                        alert('Validation failed! Please correct your input.');
                        $this.text(oldValue).focus();
                    }
                } else {
                    $this.text(oldValue);
                    settings.onCancel();
                }
            }

            // Accessibility: Reset aria-live to polite when editing is complete
            $this.on('focusout', function () {
                $this.attr('aria-live', 'polite');
            });
        });
    };
}(jQuery));
