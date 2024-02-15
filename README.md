# EditableOnDoubleClick jQuery Plugin

EditableOnDoubleClick is a lightweight jQuery plugin that allows users to edit HTML elements by double-clicking on them.

## Installation

You can install the EditableOnDoubleClick plugin via npm:

```bash
npm install editable-on-double-click
```

Alternatively, you can include the script directly in your HTML:

```html
<script src="editableOnDoubleClick.js"></script>
```

## Usage

To enable double-click editing on HTML elements, simply call the `editableOnDoubleClick()` method on the desired elements:

```javascript
$(document).ready(function() {
    $('.editable-element').editableOnDoubleClick({
        onSave: function(newValue) {
            console.log('Saved new value: ' + newValue);
        },
        onCancel: function() {
            console.log('Edit cancelled');
        }
    });
});
```

## Options

- `onSave(newValue)`: A callback function triggered when changes are saved.
- `onCancel()`: A callback function triggered when editing is cancelled.

## License

EditableOnDoubleClick is licensed under the [MIT License](LICENSE).
