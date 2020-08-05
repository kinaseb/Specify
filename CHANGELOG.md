# Specify Changelog

## 2.0.4

### Fixes

- Adjusting default stroke with to 1 unit (instead of 0.5)
- Updated internal build process

## 2.0.2

### New Features

- **New Dialog UI and Adobe Extension**: Completely updates the Specify dialog UI, and adds a version packaged as [Free Extension available via Adobe Exchange](https://exchange.adobe.com/creativecloud.details.104123.specify.html) for Illustrator CC users.

## 1.3.1

### Fixes

- Automatically adds a leading zero to the font size field if user enters a value such as `.25` instead of `0.25`. For reference, font sizes require a leading zero on input.

## 1.3.0

### New Features

- **User-defined custom scale for dimensions and labels**: Allows the user to specify a working scale along with allowing for customizable unit labels. This release enables the user to specify a working scale along with allowing for customizable unit labels.

## 1.2.2

### Fixes

- Prevents the script from generating a dashed line when specifying the dimensions of an object with dashed paths.

## 1.2.1

### Fixes

- The font size input in the options panel now allows the user to specify the size of the label text in the same units as the document ruler. 
- Fixes a bug with the help text that appears when hovering over an input field in the Specify dialog box. Help text was showing the current settings as Defaults rather than the script's default values.

## 1.2.0

### New Features

- Implemented environmental variables to persist settings (to persist options between running the script multiple times, even between multiple documents) until application is closed.
- Added a 'Restore Defaults' button to roll back to initial settings.

### Fixes

- Removed 'Advanced Options' toggle and section; moved all items into 'Options' panel.

## 1.1.0

### New Features

- Now possible to specify multiple objects simultaneously. 
- Added 'Select All' option to easily select all dimensions to specify.
- Added 'Advanced Options' panel:
  - Easily change font size.
  - Easily change RGB color of dimension lines and labels.
  - Easily change number of decimal places for dimension labels.
- Added help tips (hover over options in dialog).

### Fixes

- Updated 'Specify' button and added 'Cancel' button.
- Improved error handling.
- Fixed issue with label spacing.
- Improved UI of dialog box and options.

## 1.0.0

Initial release.
