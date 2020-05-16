/**
 * Specify
 * =================================
 * Version: 2.0.0
 * https://github.com/adamdehaven/Specify
 *
 * Adam DeHaven
 * https://adamdehaven.com
 * @adamdehaven
 *
 * ====================
 */

// Import colorPicker
var colorPickerPath = Folder($.fileName).parent.fsName;
$.evalFile(new File(colorPickerPath + "/vendor/colorPicker.js"));

//
// Show dialog
// ===========================
function specifyObjects() {
    try {
        if (app.documents.length > 0) {

            // Document
            var doc = activeDocument;
            // Count selected items
            var selectedItems = parseInt(doc.selection.length, 10) || 0;

            //
            // Defaults
            // ===========================
            // Scale
            var setScale = 0;
            var defaultScale = $.getenv("Specify_defaultScale") ? $.getenv("Specify_defaultScale") : setScale;
            // Units
            var setUnits = true;
            var defaultUnits = $.getenv("Specify_defaultUnits") ? convertToBoolean($.getenv("Specify_defaultUnits")) : setUnits;
            // Use Custom Units
            var setUseCustomUnits = false;
            var defaultUseCustomUnits = $.getenv("Specify_defaultUseCustomUnits") ? convertToBoolean($.getenv("Specify_defaultUseCustomUnits")) : setUseCustomUnits;
            // Custom Units
            var setCustomUnits = getRulerUnits();
            var defaultCustomUnits = $.getenv("Specify_defaultCustomUnits") ? $.getenv("Specify_defaultCustomUnits") : setCustomUnits;
            // Decimals
            var setDecimals = 2;
            var defaultDecimals = $.getenv("Specify_defaultDecimals") ? $.getenv("Specify_defaultDecimals") : setDecimals;
            // Font Size
            var setFontSize = 8;
            var defaultFontSize = $.getenv("Specify_defaultFontSize") ? convertToUnits($.getenv("Specify_defaultFontSize")).toFixed(3) : setFontSize;
            // Colors
            var setRed = 36;
            var defaultColorRed = $.getenv("Specify_defaultColorRed") ? $.getenv("Specify_defaultColorRed") : setRed;
            var setGreen = 151;
            var defaultColorGreen = $.getenv("Specify_defaultColorGreen") ? $.getenv("Specify_defaultColorGreen") : setGreen;
            var setBlue = 227;
            var defaultColorBlue = $.getenv("Specify_defaultColorBlue") ? $.getenv("Specify_defaultColorBlue") : setBlue;

            // Gap
            var setGap = 4;
            var defaultGap = $.getenv("Specify_defaultGap") ? $.getenv("Specify_defaultGap") : setGap;
            // Stroke width
            var setStrokeWidth = 0.5;
            var defaultStrokeWidth = $.getenv("Specify_defaultStrokeWidth") ? $.getenv("Specify_defaultStrokeWidth") : setStrokeWidth;
            // Head Tail Size
            var setHeadTailSize = 6;
            var defaultHeadTailSize = $.getenv("Specify_defaultHeadTailSize") ? $.getenv("Specify_defaultHeadTailSize") : setHeadTailSize;

            // =========================================================================================== //
            // Create Dialog
            // =========================================================================================== //

            // SPECIFYDIALOGBOX
            var specifyDialogBox = new Window("dialog");
            specifyDialogBox.text = "Specify";
            specifyDialogBox.orientation = "row";
            specifyDialogBox.alignChildren = ["left", "top"];
            specifyDialogBox.spacing = 10;
            specifyDialogBox.margins = 16;

            // DIALOGMAINGROUP
            // ===============
            var dialogMainGroup = specifyDialogBox.add("group", undefined, { name: "dialogMainGroup" });
            dialogMainGroup.orientation = "column";
            dialogMainGroup.alignChildren = ["left", "center"];
            dialogMainGroup.spacing = 10;
            dialogMainGroup.margins = 0;

            // HORIZONTALTABBEDPANEL
            // ===================
            var horizontalTabbedPanel = dialogMainGroup.add("tabbedpanel", undefined, undefined, { name: "horizontalTabbedPanel" });
            horizontalTabbedPanel.alignChildren = "fill";
            horizontalTabbedPanel.preferredSize.width = 363.047;
            horizontalTabbedPanel.margins = 0;
            horizontalTabbedPanel.alignment = ["fill", "center"];

            // TABOPTIONS
            // ==========
            var tabOptions = horizontalTabbedPanel.add("tab", undefined, undefined, { name: "tabOptions" });
            tabOptions.text = "OPTIONS";
            tabOptions.orientation = "row";
            tabOptions.alignChildren = ["fill", "fill"];
            tabOptions.spacing = 10;
            tabOptions.margins = 10;

            // OPTIONSMAINGROUP
            // ================
            var optionsMainGroup = tabOptions.add("group", undefined, { name: "optionsMainGroup" });
            optionsMainGroup.orientation = "column";
            optionsMainGroup.alignChildren = ["fill", "top"];
            optionsMainGroup.spacing = 15;
            optionsMainGroup.margins = 0;

            // DIMENSIONPANEL
            // ==============
            var dimensionPanel = optionsMainGroup.add("panel", undefined, undefined, { name: "dimensionPanel" });
            dimensionPanel.text = "Select Dimensions(s) to Specify";
            dimensionPanel.orientation = "column";
            dimensionPanel.alignChildren = ["left", "top"];
            dimensionPanel.spacing = 10;
            dimensionPanel.margins = 20;

            var topCheckbox = dimensionPanel.add("checkbox", undefined, undefined, { name: "topCheckbox" });
            topCheckbox.helpTip = "Dimension the top side of the object(s).";
            topCheckbox.text = "Top";
            topCheckbox.alignment = ["center", "top"];
            topCheckbox.value = false;
            topCheckbox.onClick = function () {
                topCheckbox.active = true;
                topCheckbox.active = false;

                if (!topCheckbox.value) {
                    selectAllCheckbox.value = false;
                }

                activateSpecifyButton();
            };

            // DIMENSIONGROUP
            // ==============
            var dimensionGroup = dimensionPanel.add("group", undefined, { name: "dimensionGroup" });
            dimensionGroup.orientation = "row";
            dimensionGroup.alignChildren = ["center", "top"];
            dimensionGroup.spacing = 60;
            dimensionGroup.margins = 10;
            dimensionGroup.alignment = ["center", "top"];

            var leftCheckbox = dimensionGroup.add("checkbox", undefined, undefined, { name: "leftCheckbox" });
            leftCheckbox.helpTip = "Dimension the left side of the object(s).";
            leftCheckbox.text = "Left";
            leftCheckbox.value = false;
            leftCheckbox.onClick = function () {
                leftCheckbox.active = true;
                leftCheckbox.active = false;

                if (!leftCheckbox.value) {
                    selectAllCheckbox.value = false;
                }

                activateSpecifyButton();
            };

            var rightCheckbox = dimensionGroup.add("checkbox", undefined, undefined, { name: "rightCheckbox" });
            rightCheckbox.helpTip = "Dimension the right side of the object(s).";
            rightCheckbox.text = "Right";
            rightCheckbox.value = false;
            rightCheckbox.onClick = function () {
                rightCheckbox.active = true;
                rightCheckbox.active = false;

                if (!rightCheckbox.value) {
                    selectAllCheckbox.value = false;
                }

                activateSpecifyButton();
            };

            // DIMENSIONPANEL
            // ==============
            var bottomCheckbox = dimensionPanel.add("checkbox", undefined, undefined, { name: "bottomCheckbox" });
            bottomCheckbox.helpTip = "Dimension the bottom side of the object(s).";
            bottomCheckbox.text = "Bottom";
            bottomCheckbox.alignment = ["center", "top"];
            bottomCheckbox.value = false;
            bottomCheckbox.onClick = function () {
                bottomCheckbox.active = true;
                bottomCheckbox.active = false;

                if (!bottomCheckbox.value) {
                    selectAllCheckbox.value = false;
                }

                activateSpecifyButton();
            };

            var dimensionsDivider = dimensionPanel.add("panel", undefined, undefined, { name: "dimensionsDivider" });
            dimensionsDivider.alignment = "fill";

            var selectAllCheckbox = dimensionPanel.add("checkbox", undefined, undefined, { name: "selectAllCheckbox" });
            selectAllCheckbox.helpTip = "Dimension all sides of the object(s).";
            selectAllCheckbox.text = "All Sides";
            selectAllCheckbox.alignment = ["center", "top"];
            selectAllCheckbox.value = false;
            selectAllCheckbox.onClick = function () {
                selectAllCheckbox.active = true;
                selectAllCheckbox.active = false;

                if (selectAllCheckbox.value) {
                    // Select All is checked
                    topCheckbox.value = true;

                    rightCheckbox.value = true;

                    bottomCheckbox.value = true;

                    leftCheckbox.value = true;
                } else {
                    // Select All is unchecked
                    topCheckbox.value = false;

                    rightCheckbox.value = false;

                    bottomCheckbox.value = false;

                    leftCheckbox.value = false;
                }

                activateSpecifyButton();
            };

            // MULTIPLEOBJECTSPANEL
            // ====================
            var multipleObjectsPanel;
            var betweenCheckbox;

            // If exactly 2 objects are selected, give user option to dimension BETWEEN them
            if (selectedItems == 2) {
                multipleObjectsPanel = optionsMainGroup.add("panel", undefined, undefined, { name: "multipleObjectsPanel" });
                multipleObjectsPanel.text = "Multiple Objects Selected";
                multipleObjectsPanel.preferredSize.height = 65;
                multipleObjectsPanel.orientation = "column";
                multipleObjectsPanel.alignChildren = ["left", "top"];
                multipleObjectsPanel.spacing = 10;
                multipleObjectsPanel.margins = 20;

                betweenCheckbox = multipleObjectsPanel.add("checkbox", undefined, undefined, { name: "betweenCheckbox" });
                betweenCheckbox.helpTip = "When checked, dimensions the distance between\nthe 2 objects for the selected dimensions.";
                betweenCheckbox.text = "Dimension between selected objects";
                betweenCheckbox.value = false;
                betweenCheckbox.onClick = function () {
                    betweenCheckbox.active = true;
                    betweenCheckbox.active = false;
                };
            }


            // SCALEPANEL
            // ==========
            var scalePanel = optionsMainGroup.add("panel", undefined, undefined, { name: "scalePanel" });
            scalePanel.text = "Scale";
            scalePanel.orientation = "column";
            scalePanel.alignChildren = ["left", "top"];
            scalePanel.spacing = 10;
            scalePanel.margins = 20;

            var customScaleInfo = scalePanel.add("statictext", undefined, undefined, { name: "customScaleInfo" });
            customScaleInfo.text = "Define the scale of the artwork/document.";

            // CUSTOMSCALEGROUP
            // ================
            var customScaleGroup = scalePanel.add("group", undefined, { name: "customScaleGroup" });
            customScaleGroup.orientation = "row";
            customScaleGroup.alignChildren = ["left", "center"];
            customScaleGroup.spacing = 10;
            customScaleGroup.margins = 0;

            var customScaleLabel = customScaleGroup.add("statictext", undefined, undefined, { name: "customScaleLabel" });
            customScaleLabel.text = "Scale:";

            var customScaleDropdown_array = [];
            for (var n = 1; n <= 30; n++) {
                if (n == 1) {
                    customScaleDropdown_array.push("1/" + n + "    (Default)");
                    customScaleDropdown_array.push("-");
                } else {
                    customScaleDropdown_array.push("1/" + n);
                }
            }

            var customScaleDropdown = customScaleGroup.add("dropdownlist", undefined, undefined, { name: "customScaleDropdown", items: customScaleDropdown_array });
            customScaleDropdown.helpTip = "Choose the scale of the artwork/document.\n\nExample: Choosing '1/4' will indicate the artwork is drawn at\none-fourth scale, resulting in dimension values that are 4x their\ndrawn dimensions.";
            customScaleDropdown.selection = defaultScale;
            customScaleDropdown.onChange = function () {
                restoreDefaultsButton.enabled = true;
            };

            // SCALEPANEL
            // ==========
            var scaleDivider = scalePanel.add("panel", undefined, undefined, { name: "scaleDivider" });
            scaleDivider.alignment = "fill";

            var customScaleExample = scalePanel.add("statictext", undefined, undefined, { name: "customScaleExample" });
            customScaleExample.text = "Example: 250 units at 1/4 scale displays as 1000";

            // TABSTYLES
            // =========
            var tabStyles = horizontalTabbedPanel.add("tab", undefined, undefined, { name: "tabStyles" });
            tabStyles.text = "STYLES";
            tabStyles.orientation = "column";
            tabStyles.alignChildren = ["fill", "fill"];
            tabStyles.spacing = 10;
            tabStyles.margins = 10;

            // LABELSTYLESPANEL
            // ============
            var labelStylesPanel = tabStyles.add("panel", undefined, undefined, { name: "labelStylesPanel" });
            labelStylesPanel.text = "Label Styles";
            labelStylesPanel.orientation = "column";
            labelStylesPanel.alignChildren = ["fill", "top"];
            labelStylesPanel.spacing = 10;
            labelStylesPanel.margins = 20;

            var units = labelStylesPanel.add("checkbox", undefined, undefined, { name: "units" });
            units.helpTip = "When checked, inserts the units in the label alongside\nthe dimension measurement.\nExample: 220 px";
            units.text = "Include units in label";
            units.value = defaultUnits;
            units.onClick = function () {
                restoreDefaultsButton.enabled = true;

                units.active = true;
                units.active = false;

                if (units.value == false) {
                    useCustomUnits.value = false;
                    useCustomUnits.enabled = false;
                    customUnitsInput.text = getRulerUnits();
                    customUnitsInput.enabled = false;
                } else {
                    useCustomUnits.enabled = true;
                }
            };

            // CUSTOMIZEUNITSGROUP
            // ===================
            var customizeUnitsGroup = labelStylesPanel.add("group", undefined, { name: "customizeUnitsGroup" });
            customizeUnitsGroup.orientation = "row";
            customizeUnitsGroup.alignChildren = ["left", "center"];
            customizeUnitsGroup.spacing = 10;
            customizeUnitsGroup.margins = 0;

            var useCustomUnits = customizeUnitsGroup.add("checkbox", undefined, undefined, { name: "useCustomUnits" });
            useCustomUnits.helpTip = "When checked, allows user to customize\nthe text of the units label.\nExample: ft";
            useCustomUnits.text = "Customize units text";
            useCustomUnits.value = defaultUseCustomUnits;
            if (units.value == false) {
                useCustomUnits.value = false;
                useCustomUnits.enabled = false;
            } else {
                useCustomUnits.enabled = true;
            }
            useCustomUnits.onClick = function () {
                restoreDefaultsButton.enabled = true;
                useCustomUnits.active = true;
                useCustomUnits.active = false;

                if (useCustomUnits.value == true) {
                    customUnitsInput.enabled = true;
                } else {
                    customUnitsInput.text = getRulerUnits();
                    customUnitsInput.enabled = false;
                }
            };

            var customUnitsInput = customizeUnitsGroup.add('edittext {properties: {name: "customUnitsInput"}}');
            customUnitsInput.helpTip = "Enter the string to display after the dimension\nnumber when using a custom scale.";
            customUnitsInput.text = defaultCustomUnits;
            customUnitsInput.enabled = defaultUseCustomUnits;
            customUnitsInput.characters = 20;
            customUnitsInput.preferredSize.width = 120;
            if (useCustomUnits.value == true) {
                customUnitsInput.enabled = true;
            } else {
                customUnitsInput.enabled = false;
            }
            customUnitsInput.onChanging = function () {
                restoreDefaultsButton.enabled = true;
            };
            customUnitsInput.onDeactivate = function () {
                customUnitsInput.text = customUnitsInput.text.replace(/\s+/g, ''); // trim input text
                customUnitsInput.text = customUnitsInput.text.replace(/[^ a-zA-Z]/g, "");
            };


            // DECIMALPLACESGROUP
            // ==================
            var decimalPlacesGroup = labelStylesPanel.add("group", undefined, { name: "decimalPlacesGroup" });
            decimalPlacesGroup.orientation = "row";
            decimalPlacesGroup.alignChildren = ["left", "center"];
            decimalPlacesGroup.spacing = 2;
            decimalPlacesGroup.margins = 0;

            var decimalPlacesLabel = decimalPlacesGroup.add("statictext", undefined, undefined, { name: "decimalPlacesLabel" });
            decimalPlacesLabel.text = "Decimals:";

            var decimalPlacesInput = decimalPlacesGroup.add('edittext {justify: "right", properties: {name: "decimalPlacesInput"}}');
            decimalPlacesInput.helpTip = "Enter the desired number of decimal places to\ndisplay in the label dimensions.";
            decimalPlacesInput.characters = 1;
            decimalPlacesInput.preferredSize.width = 40;
            decimalPlacesInput.text = defaultDecimals;
            decimalPlacesInput.onChanging = function () {
                restoreDefaultsButton.enabled = true;
                decimalPlacesInput.text = decimalPlacesInput.text.replace(/[^0-9]/g, "");
            };

            // FONTGROUP
            // =========
            var fontGroup = labelStylesPanel.add("group", undefined, { name: "fontGroup" });
            fontGroup.orientation = "row";
            fontGroup.alignChildren = ["left", "center"];
            fontGroup.spacing = 2;
            fontGroup.margins = 0;

            var fontLabel = fontGroup.add("statictext", undefined, undefined, { name: "fontLabel" });
            fontLabel.text = "Font size:";

            var fontSizeInput = fontGroup.add('edittext {justify: "right", properties: {name: "fontSizeInput"}}');
            fontSizeInput.helpTip = "Enter the desired font size for the dimension label(s).\nIf value is less than one (e.g. 0.25) you must include a\nleading zero before the decimal point.";
            fontSizeInput.text = defaultFontSize;
            fontSizeInput.characters = 5;
            fontSizeInput.preferredSize.width = 60;
            fontSizeInput.onChanging = function () {
                restoreDefaultsButton.enabled = true;
            }
            fontSizeInput.onDeactivate = function () {
                fontSizeInput.text = fontSizeInput.text.replace(/\s+/g, ''); // trim input text
                // If first character is decimal point, don't error, but instead add leading zero to string.
                if (fontSizeInput.text.charAt(0) == ".") {
                    fontSizeInput.text = "0" + fontSizeInput.text;
                    fontSizeInput.active = true;
                }
            }

            var fontUnitsLabelText = fontGroup.add("statictext", undefined, undefined, { name: "fontUnitsLabelText" });
            fontUnitsLabelText.text = getRulerUnits();

            // LABELCOLORGROUP
            // ===============
            var labelColorGroup = labelStylesPanel.add("group", undefined, { name: "labelColorGroup" });
            labelColorGroup.orientation = "row";
            labelColorGroup.alignChildren = ["left", "center"];
            labelColorGroup.spacing = 10;
            labelColorGroup.margins = 0;

            var colorLabel = labelColorGroup.add("statictext", undefined, undefined, { name: "colorLabel" });
            colorLabel.text = "Color:";

            // Measurement line and text color in RGB
            var color = new RGBColor;
            color.red = defaultColorRed;
            color.green = defaultColorGreen;
            color.blue = defaultColorBlue;

            /**
             * START COLOR PICKER
             * =================================
             */
            function customDraw() {
                with (this) {
                    graphics.drawOSControl();
                    graphics.rectPath(0, 0, size[0], size[1]);
                    graphics.fillPath(fillBrush);
                    if (text) graphics.drawString(text, textPen, (size[0] - graphics.measureString(text, graphics.font, size[0])[0]) / 2, 3, graphics.font);
                }
            }

            var colorPickerButton = labelColorGroup.add('iconbutton', undefined, undefined, { name: 'colorPickerButton', style: 'toolbutton' });
            colorPickerButton.size = [135, 20];
            colorPickerButton.fillBrush = colorPickerButton.graphics.newBrush(colorPickerButton.graphics.BrushType.SOLID_COLOR, [(parseInt(defaultColorRed) / 255), (parseInt(defaultColorGreen) / 255), (parseInt(defaultColorBlue) / 255)], 1);
            colorPickerButton.text = "Click to choose color";
            colorPickerButton.textPen = colorPickerButton.graphics.newPen(colorPickerButton.graphics.PenType.SOLID_COLOR, getColorPickerButtonTextColor(color.red, color.green, color.blue), 1);
            colorPickerButton.onDraw = customDraw;
            colorPickerButton.helpTip = "Select the color for the dimension label(s).";

            var resultColor = [(parseInt(defaultColorRed) / 255), (parseInt(defaultColorGreen) / 255), (parseInt(defaultColorBlue) / 255)];
            colorPickerButton.onClick = function () {
                resultColor = colorPicker([color.red, color.green, color.blue], { name: 'Specify: Choose label color', version: '' });
                // Color has been picked
                color.red = parseInt(Math.round(resultColor[0] * 255));
                color.green = parseInt(Math.round(resultColor[1] * 255));
                color.blue = parseInt(Math.round(resultColor[2] * 255));
                $.setenv("Specify_defaultColorRed", color.red);
                $.setenv("Specify_defaultColorGreen", color.green);
                $.setenv("Specify_defaultColorBlue", color.blue);
                // Update colorPickerButton
                colorPickerButton.fillBrush = colorPickerButton.graphics.newBrush(colorPickerButton.graphics.BrushType.SOLID_COLOR, resultColor);
                colorPickerButton.textPen = colorPickerButton.graphics.newPen(colorPickerButton.graphics.PenType.SOLID_COLOR, getColorPickerButtonTextColor(color.red, color.green, color.blue), 1);
                colorPickerButton.onDraw = customDraw;
                updatePanel(specifyDialogBox);
                restoreDefaultsButton.enabled = true;
            }

            /**
             * END COLOR PICKER
             * =================================
             */

            // LINESTYLESPANEL
            // ============
            var lineStylesPanel = tabStyles.add("panel", undefined, undefined, { name: "lineStylesPanel" });
            lineStylesPanel.text = "Line Styles";
            lineStylesPanel.orientation = "column";
            lineStylesPanel.alignChildren = ["fill", "top"];
            lineStylesPanel.spacing = 10;
            lineStylesPanel.margins = 20;

            // GAPGROUP
            // ========
            var gapGroup = lineStylesPanel.add("group", undefined, { name: "gapGroup" });
            gapGroup.orientation = "row";
            gapGroup.alignChildren = ["left", "center"];
            gapGroup.spacing = 2;
            gapGroup.margins = 0;

            var gapLabel = gapGroup.add("statictext", undefined, undefined, { name: "gapLabel" });
            gapLabel.text = "Gap between label and object:";

            var gapInput = gapGroup.add('edittext {justify: "right", properties: {name: "gapInput"}}');
            gapInput.helpTip = "Enter the size of the desired gap between the dimension label(s) and the object.";
            gapInput.characters = 6;
            gapInput.preferredSize.width = 60;
            gapInput.text = defaultGap;
            gapInput.onChanging = function () {
                restoreDefaultsButton.enabled = true;
            };
            gapInput.onDeactivate = function () {
                gapInput.text = gapInput.text.replace(/\s+/g, ''); // trim input text
                gapInput.text = gapInput.text.replace(/[^0-9\.]/g, "");
                // If first character is decimal point, don't error, but instead add leading zero to string.
                if (gapInput.text.charAt(0) == ".") {
                    gapInput.text = "0" + gapInput.text;
                }
            }

            var gapUnitsLabelText = gapGroup.add("statictext", undefined, undefined, { name: "gapUnitsLabelText" });
            gapUnitsLabelText.text = getRulerUnits();

            // STROKEWIDTHGROUP
            // ========
            var strokeWidthGroup = lineStylesPanel.add("group", undefined, { name: "strokeWidthGroup" });
            strokeWidthGroup.orientation = "row";
            strokeWidthGroup.alignChildren = ["left", "center"];
            strokeWidthGroup.spacing = 2;
            strokeWidthGroup.margins = 0;

            var strokeWidthLabel = strokeWidthGroup.add("statictext", undefined, undefined, { name: "strokeWidthLabel" });
            strokeWidthLabel.text = "Stroke width:";

            var strokeWidthInput = strokeWidthGroup.add('edittext {justify: "right", properties: {name: "strokeWidthInput"}}');
            strokeWidthInput.helpTip = "Enter the desired stroke width of the dimension line.";
            strokeWidthInput.characters = 6;
            strokeWidthInput.preferredSize.width = 60;
            strokeWidthInput.text = defaultStrokeWidth;
            strokeWidthInput.onChanging = function () {
                restoreDefaultsButton.enabled = true;
            };
            strokeWidthInput.onDeactivate = function () {
                strokeWidthInput.text = strokeWidthInput.text.replace(/\s+/g, ''); // trim input text
                strokeWidthInput.text = strokeWidthInput.text.replace(/[^0-9\.]/g, "");
                // If first character is decimal point, don't error, but instead add leading zero to string.
                if (strokeWidthInput.text.charAt(0) == ".") {
                    strokeWidthInput.text = "0" + strokeWidthInput.text;
                }
            }

            var strokeWidthUnitsLabelText = strokeWidthGroup.add("statictext", undefined, undefined, { name: "strokeWidthUnitsLabelText" });
            strokeWidthUnitsLabelText.text = getRulerUnits();

            // HEADTAILSIZEGROUP
            // ========
            var headTailSizeGroup = lineStylesPanel.add("group", undefined, { name: "headTailSizeGroup" });
            headTailSizeGroup.orientation = "row";
            headTailSizeGroup.alignChildren = ["left", "center"];
            headTailSizeGroup.spacing = 2;
            headTailSizeGroup.margins = 0;

            var headTailSizeLabel = headTailSizeGroup.add("statictext", undefined, undefined, { name: "headTailSizeLabel" });
            headTailSizeLabel.text = "Head & tail length:";

            var headTailSizeInput = headTailSizeGroup.add('edittext {justify: "right", properties: {name: "headTailSizeInput"}}');
            headTailSizeInput.helpTip = "Enter the desired length of the line at both ends of the dimension line.";
            headTailSizeInput.characters = 6;
            headTailSizeInput.preferredSize.width = 60;
            headTailSizeInput.text = defaultHeadTailSize;
            headTailSizeInput.onChanging = function () {
                restoreDefaultsButton.enabled = true;
            };
            headTailSizeInput.onDeactivate = function () {
                headTailSizeInput.text = headTailSizeInput.text.replace(/\s+/g, ''); // trim input text
                headTailSizeInput.text = headTailSizeInput.text.replace(/[^0-9\.]/g, "");
                // If first character is decimal point, don't error, but instead add leading zero to string.
                if (headTailSizeInput.text.charAt(0) == ".") {
                    headTailSizeInput.text = "0" + headTailSizeInput.text;
                }
            }

            var headTailSizeUnitsLabelText = headTailSizeGroup.add("statictext", undefined, undefined, { name: "headTailSizeUnitsLabelText" });
            headTailSizeUnitsLabelText.text = getRulerUnits();

            // TABUPDATES
            // ==========
            var tabUpdates = horizontalTabbedPanel.add("tab", undefined, undefined, { name: "tabUpdates" });
            tabUpdates.text = "UPDATES";
            tabUpdates.orientation = "column";
            tabUpdates.alignChildren = ["center", "fill"];
            tabUpdates.spacing = 20;
            tabUpdates.margins = 10;

            // UPDATESGROUP
            // ============
            var updatesGroup = tabUpdates.add("group", undefined, { name: "updatesGroup" });
            updatesGroup.orientation = "column";
            updatesGroup.alignChildren = ["center", "center"];
            updatesGroup.spacing = 10;
            updatesGroup.margins = [0, 0, 0, 20];
            updatesGroup.alignment = ["center", "center"];

            var specifyUpdatesText = updatesGroup.add("statictext", undefined, undefined, { name: "specifyUpdatesText" });
            specifyUpdatesText.text = "Click below for updates & more info:";
            specifyUpdatesText.alignment = ["center", "center"];

            var urlButton = updatesGroup.add("button", undefined, undefined, { name: "urlButton" });
            urlButton.text = "github.com/adamdehaven/Specify";
            urlButton.alignment = ["center", "center"];
            urlButton.onClick = function () {
                openURL("https://github.com/adamdehaven/Specify");

                urlButton.active = true;
                urlButton.active = false;
            };

            // TABUPDATES
            // ==========
            var divider1 = tabUpdates.add("panel", undefined, undefined, { name: "divider1" });
            divider1.alignment = "fill";

            // ABOUTGROUP
            // ==========
            var aboutGroup = tabUpdates.add("group", undefined, { name: "aboutGroup" });
            aboutGroup.orientation = "column";
            aboutGroup.alignChildren = ["center", "top"];
            aboutGroup.spacing = 10;
            aboutGroup.margins = [0, 20, 0, 0];
            aboutGroup.alignment = ["fill", "center"];

            var aboutText = aboutGroup.add("statictext", undefined, undefined, { name: "aboutText" });
            aboutText.text = "Created & maintained by @adamdehaven";
            aboutText.justify = "center";
            aboutText.alignment = ["center", "top"];

            var authorHomepageButton = aboutGroup.add("button", undefined, undefined, { name: "authorHomepageButton" });
            authorHomepageButton.text = "adamdehaven.com";
            authorHomepageButton.alignment = ["center", "top"];
            authorHomepageButton.onClick = function () {
                openURL("https://adamdehaven.com/");

                authorHomepageButton.active = true;
                authorHomepageButton.active = false;
            };

            // HORIZONTALTABBEDPANEL
            // =====================
            horizontalTabbedPanel.selection = tabOptions; // Activate Options tab

            // FOOTERGROUP
            // ===========
            var footerGroup = dialogMainGroup.add("group", undefined, { name: "footerGroup" });
            footerGroup.orientation = "column";
            footerGroup.alignChildren = ["left", "bottom"];
            footerGroup.spacing = 5;
            footerGroup.margins = 0;

            // INNERFOOTERGROUP
            // ===========
            var innerFooterGroup = footerGroup.add("group", undefined, { name: "innerFooterGroup" });
            innerFooterGroup.orientation = "row";
            innerFooterGroup.alignChildren = ["left", "bottom"];
            innerFooterGroup.spacing = 20;
            innerFooterGroup.margins = 0;

            // RESTOREDEFAULTSGROUP
            // ====================
            var restoreDefaultsGroup = innerFooterGroup.add("group", undefined, { name: "restoreDefaultsGroup" });
            restoreDefaultsGroup.orientation = "column";
            restoreDefaultsGroup.alignChildren = ["left", "bottom"];
            restoreDefaultsGroup.spacing = 10;
            restoreDefaultsGroup.margins = 0;
            restoreDefaultsGroup.alignment = ["left", "bottom"];

            var restoreDefaultsButton = restoreDefaultsGroup.add("button", undefined, undefined, { name: "restoreDefaultsButton" });
            restoreDefaultsButton.text = "Reset";
            restoreDefaultsButton.helpTip = "Reset all options and styles.";
            restoreDefaultsButton.alignment = ["center", "center"];
            restoreDefaultsButton.justify = "left";
            restoreDefaultsButton.enabled = (setFontSize != defaultFontSize || setRed != defaultColorRed || setGreen != defaultColorGreen || setBlue != defaultColorBlue || setDecimals != defaultDecimals || setGap != defaultGap || setStrokeWidth != defaultStrokeWidth || setHeadTailSize != defaultHeadTailSize || setScale != defaultScale || setCustomUnits != defaultCustomUnits ? true : false);
            restoreDefaultsButton.onClick = function () {
                restoreDefaults();
            };

            // BUTTONGROUP
            // ===========
            var buttonGroup = innerFooterGroup.add("group", undefined, { name: "buttonGroup" });
            buttonGroup.orientation = "row";
            buttonGroup.alignChildren = ["right", "bottom"];
            buttonGroup.spacing = 10;
            buttonGroup.margins = [87, 0, 0, 0];
            buttonGroup.alignment = ["left", "bottom"];

            var cancelButton = buttonGroup.add("button", undefined, undefined, { name: "cancelButton" });
            cancelButton.text = "Cancel";
            cancelButton.alignment = ["right", "bottom"];
            cancelButton.onClick = function () {
                specifyDialogBox.close();
            };

            var specifyButton = buttonGroup.add("button", undefined, undefined, { name: "specifyButton" });
            specifyButton.text = "Specify Object(s)";
            activateSpecifyButton();
            specifyButton.onClick = function () {
                startSpec();
            };

            // =========================================================================================== //
            // END: Create Dialog
            // =========================================================================================== //

            //
            // SPEC Layer
            // ===========================
            try {
                var specsLayer = doc.layers["SPECS"];
            } catch (err) {
                var specsLayer = doc.layers.add();
                specsLayer.name = "SPECS";
            }

            // Declare global decimals var
            var decimals;

            // Declare global scale var
            var scale;

            // Gap between measurement lines and object
            var gap;

            // Width of line stroke
            var strokeWidth;

            // Length of perpendicular measurement lines
            var headTailSize;

            //
            // Start the Spec
            // ===========================
            function startSpec() {

                // Add all selected objects to array
                var objectsToSpec = new Array();
                for (var index = doc.selection.length - 1; index >= 0; index--) {
                    objectsToSpec[index] = doc.selection[index];
                }

                // Fetch desired dimensions
                var top = topCheckbox.value;
                var left = leftCheckbox.value;
                var right = rightCheckbox.value;
                var bottom = bottomCheckbox.value;
                // Take focus away from fontSizeInput to validate (numeric)
                fontSizeInput.active = false;

                // Set bool for numeric vars
                var validFontSize = /^[0-9]{1,3}(\.[0-9]{1,3})?$/.test(fontSizeInput.text);

                var validRedColor = /^[0-9]{1,3}$/.test(color.red) && parseInt(color.red) > -1 && parseInt(color.red) < 256;
                var validGreenColor = /^[0-9]{1,3}$/.test(color.green) && parseInt(color.green) > -1 && parseInt(color.green) < 256;
                var validBlueColor = /^[0-9]{1,3}$/.test(color.blue) && parseInt(color.blue) > -1 && parseInt(color.blue) < 256;

                var validDecimalPlaces = /^[0-4]{1}$/.test(decimalPlacesInput.text);
                if (validDecimalPlaces) {
                    // Number of decimal places in measurement
                    decimals = decimalPlacesInput.text;
                    // Set environmental variable
                    $.setenv("Specify_defaultDecimals", decimals);
                }

                var validGap = /^(0|[1-9]\d*)(\.\d+)?$/.test(gapInput.text); // Allows for decimals/integers
                if (validGap) {
                    // Gap size
                    gap = parseFloat(gapInput.text);
                    // Set environmental variable
                    $.setenv("Specify_defaultGap", gap);
                }

                var validStrokeWidth = /^(0|[1-9]\d*)(\.\d+)?$/.test(strokeWidthInput.text); // Allows for decimals/integers
                if (validStrokeWidth) {
                    // Stroke Width
                    strokeWidth = parseFloat(strokeWidthInput.text);
                    // Set environmental variable
                    $.setenv("Specify_defaultStrokeWidth", strokeWidth);
                }

                var validHeadTailSize = /^(0|[1-9]\d*)(\.\d+)?$/.test(headTailSizeInput.text); // Allows for decimals/integers
                if (validHeadTailSize) {
                    // Head Tail Size
                    headTailSize = parseFloat(headTailSizeInput.text);
                    // Set environmental variable
                    $.setenv("Specify_defaultHeadTailSize", headTailSize);
                }

                var theScale = parseInt(customScaleDropdown.selection.toString().replace(/1\//g, "").replace(/[^0-9]/g, ""));
                scale = theScale;
                // Set environmental variable
                $.setenv("Specify_defaultScale", customScaleDropdown.selection.index);

                if (selectedItems < 1) {
                    beep();
                    alert("Please select at least 1 object and try again.");
                    // Close dialog
                    specifyDialogBox.close();
                } else if (!top && !left && !right && !bottom) {
                    horizontalTabbedPanel.selection = tabOptions; // Activate Options tab
                    beep();
                    alert("Please select at least 1 dimension to draw.");
                } else if (!validFontSize) {
                    horizontalTabbedPanel.selection = tabStyles; // Activate Styles tab
                    // If fontSizeInput.text does not match regex
                    beep();
                    alert("Please enter a valid font size. \n0.002 - 999.999");
                    fontSizeInput.active = true;
                    fontSizeInput.text = setFontSize;
                } else if (parseFloat(fontSizeInput.text, 10) <= 0.001) {
                    horizontalTabbedPanel.selection = tabStyles; // Activate Styles tab
                    beep();
                    alert("Font size must be greater than 0.001.");
                    fontSizeInput.active = true;
                } else if (!validRedColor || !validGreenColor || !validBlueColor) {
                    horizontalTabbedPanel.selection = tabStyles; // Activate Styles tab
                    // If RGB inputs are not numeric
                    beep();
                    alert("Please enter a valid RGB color.");
                    color.red = defaultColorRed;
                    color.green = defaultColorGreen;
                    color.blue = defaultColorBlue;
                } else if (!validDecimalPlaces) {
                    horizontalTabbedPanel.selection = tabStyles; // Activate Styles tab
                    // If decimalPlacesInput.text is not numeric
                    beep();
                    alert("Decimal places must range from 0 - 4.");
                    decimalPlacesInput.active = true;
                    decimalPlacesInput.text = setDecimals;
                } else if (!validGap) {
                    horizontalTabbedPanel.selection = tabStyles; // Activate Styles tab
                    // If gapInput.text does not match regex decimals/integers
                    beep();
                    alert("Gap size must be a whole number (e.g. 22), or a number with decimals (e.g. 18.4)");
                    gapInput.active = true;
                    gapInput.text = setGap;
                } else if (!validStrokeWidth) {
                    horizontalTabbedPanel.selection = tabStyles; // Activate Styles tab
                    // If strokeWidthInput.text does not match regex decimals/integers
                    beep();
                    alert("Stroke width must be a whole number (e.g. 22), or a number with decimals (e.g. 18.4)");
                    headTailSizeInput.active = true;
                    headTailSizeInput.text = setHeadTailSize;
                } else if (!validHeadTailSize) {
                    horizontalTabbedPanel.selection = tabStyles; // Activate Styles tab
                    // If headTailSizeInput.text does not match regex decimals/integers
                    beep();
                    alert("Head & tail size must be a whole number (e.g. 22), or a number with decimals (e.g. 18.4)");
                    headTailSizeInput.active = true;
                    headTailSizeInput.text = setHeadTailSize;
                } else if (selectedItems == 2 && betweenCheckbox.value) {
                    if (top) specDouble(objectsToSpec[0], objectsToSpec[1], "Top");
                    if (left) specDouble(objectsToSpec[0], objectsToSpec[1], "Left");
                    if (right) specDouble(objectsToSpec[0], objectsToSpec[1], "Right");
                    if (bottom) specDouble(objectsToSpec[0], objectsToSpec[1], "Bottom");
                    // Close dialog when finished
                    specifyDialogBox.close();
                } else {
                    // Iterate over each selected object, creating individual dimensions as you go
                    for (var objIndex = objectsToSpec.length - 1; objIndex >= 0; objIndex--) {
                        if (top) specSingle(objectsToSpec[objIndex].geometricBounds, "Top");
                        if (left) specSingle(objectsToSpec[objIndex].geometricBounds, "Left");
                        if (right) specSingle(objectsToSpec[objIndex].geometricBounds, "Right");
                        if (bottom) specSingle(objectsToSpec[objIndex].geometricBounds, "Bottom");
                    }
                    // Close dialog when finished
                    specifyDialogBox.close();
                }
            };

            //
            // Spec a single object
            // ===========================
            function specSingle(bound, where) {
                // unlock SPECS layer
                specsLayer.locked = false;

                // width and height
                var w = bound[2] - bound[0];
                var h = bound[1] - bound[3];

                // a & b are the horizontal or vertical positions that change
                // c is the horizontal or vertical position that doesn't change
                var a = bound[0];
                var b = bound[2];
                var c = bound[1];

                // xy='x' (horizontal measurement), xy='y' (vertical measurement)
                var xy = "x";

                // a direction flag for placing the measurement lines.
                var dir = 1;

                switch (where) {
                    case "Top":
                        a = bound[0];
                        b = bound[2];
                        c = bound[1];
                        xy = "x";
                        dir = 1;
                        break;
                    case "Right":
                        a = bound[1];
                        b = bound[3];
                        c = bound[2];
                        xy = "y";
                        dir = 1;
                        break;
                    case "Bottom":
                        a = bound[0];
                        b = bound[2];
                        c = bound[3];
                        xy = "x";
                        dir = -1;
                        break;
                    case "Left":
                        a = bound[1];
                        b = bound[3];
                        c = bound[0];
                        xy = "y";
                        dir = -1;
                        break;
                }

                // Create the measurement lines
                var lines = new Array();

                // horizontal measurement
                if (xy == "x") {

                    // 2 vertical lines
                    lines[0] = new Array(new Array(a, c + (gap) * dir));
                    lines[0].push(new Array(a, c + (gap + headTailSize) * dir));
                    lines[1] = new Array(new Array(b, c + (gap) * dir));
                    lines[1].push(new Array(b, c + (gap + headTailSize) * dir));

                    // 1 horizontal line
                    lines[2] = new Array(new Array(a, c + (gap + headTailSize / 2) * dir));
                    lines[2].push(new Array(b, c + (gap + headTailSize / 2) * dir));

                    // Create text label
                    if (where == "Top") {
                        var t = specLabel(w, (a + b) / 2, lines[0][1][1], color);
                        t.top += t.height;
                    } else {
                        var t = specLabel(w, (a + b) / 2, lines[0][0][1], color);
                        t.top -= headTailSize;
                    }
                    t.left -= t.width / 2;

                } else {
                    // Vertical measurement

                    // 2 horizontal lines
                    lines[0] = new Array(new Array(c + (gap) * dir, a));
                    lines[0].push(new Array(c + (gap + headTailSize) * dir, a));
                    lines[1] = new Array(new Array(c + (gap) * dir, b));
                    lines[1].push(new Array(c + (gap + headTailSize) * dir, b));

                    //1 vertical line
                    lines[2] = new Array(new Array(c + (gap + headTailSize / 2) * dir, a));
                    lines[2].push(new Array(c + (gap + headTailSize / 2) * dir, b));

                    // Create text label
                    if (where == "Left") {
                        var t = specLabel(h, lines[0][1][0], (a + b) / 2, color);
                        t.left -= t.width;
                        t.rotate(90, true, false, false, false, Transformation.BOTTOMRIGHT);
                        t.top += t.width;
                        t.top += t.height / 2;
                    } else {
                        var t = specLabel(h, lines[0][1][0], (a + b) / 2, color);
                        t.rotate(-90, true, false, false, false, Transformation.BOTTOMLEFT);
                        t.top += t.width;
                        t.top += t.height / 2;
                    }
                }

                // Draw lines
                var specgroup = new Array(t);

                for (var i = 0; i < lines.length; i++) {
                    var p = doc.pathItems.add();
                    p.setEntirePath(lines[i]);
                    p.strokeDashes = []; // Prevent dashed SPEC lines
                    setLineStyle(p, color, parseFloat(strokeWidth));
                    specgroup.push(p);
                }

                group(specsLayer, specgroup);

                // re-lock SPECS layer
                specsLayer.locked = true;

            };

            //
            // Spec the gap between 2 elements
            // ===========================
            function specDouble(item1, item2, where) {

                var bound = new Array(0, 0, 0, 0);

                var a = item1.geometricBounds;
                var b = item2.geometricBounds;

                if (where == "Top" || where == "Bottom") {

                    if (b[0] > a[0]) { // item 2 on right,

                        if (b[0] > a[2]) { // no overlap
                            bound[0] = a[2];
                            bound[2] = b[0];
                        } else { // overlap
                            bound[0] = b[0];
                            bound[2] = a[2];
                        }
                    } else if (a[0] >= b[0]) { // item 1 on right

                        if (a[0] > b[2]) { // no overlap
                            bound[0] = b[2];
                            bound[2] = a[0];
                        } else { // overlap
                            bound[0] = a[0];
                            bound[2] = b[2];
                        }
                    }

                    bound[1] = Math.max(a[1], b[1]);
                    bound[3] = Math.min(a[3], b[3]);

                } else {

                    if (b[3] > a[3]) { // item 2 on top
                        if (b[3] > a[1]) { // no overlap
                            bound[3] = a[1];
                            bound[1] = b[3];
                        } else { // overlap
                            bound[3] = b[3];
                            bound[1] = a[1];
                        }
                    } else if (a[3] >= b[3]) { // item 1 on top

                        if (a[3] > b[1]) { // no overlap
                            bound[3] = b[1];
                            bound[1] = a[3];
                        } else { // overlap
                            bound[3] = a[3];
                            bound[1] = b[1];
                        }
                    }

                    bound[0] = Math.min(a[0], b[0]);
                    bound[2] = Math.max(a[2], b[2]);
                }
                specSingle(bound, where);
            };

            //
            // Create a text label that specify the dimension
            // ===========================
            function specLabel(val, x, y, color) {

                var t = doc.textFrames.add();
                // Get font size from specifyDialogBox.fontSizeInput
                var labelFontSize;
                if (parseFloat(fontSizeInput.text) > 0) {
                    labelFontSize = parseFloat(fontSizeInput.text);
                } else {
                    labelFontSize = defaultFontSize;
                }

                // Convert font size to RulerUnits
                var labelFontInUnits = convertToPoints(labelFontSize);

                // Set environmental variable
                $.setenv("Specify_defaultFontSize", labelFontInUnits);

                t.textRange.characterAttributes.size = labelFontInUnits;
                t.textRange.characterAttributes.alignment = StyleRunAlignmentType.center;
                t.textRange.characterAttributes.fillColor = color;

                // Conversions : http://wwwimages.adobe.com/content/dam/Adobe/en/devnet/illustrator/sdk/CC2014/Illustrator%20Scripting%20Guide.pdf
                // UnitValue object (page 230): http://wwwimages.adobe.com/content/dam/Adobe/en/devnet/scripting/pdfs/javascript_tools_guide.pdf

                var displayUnitsLabel = units.value;
                // Set environmental variable
                $.setenv("Specify_defaultUnits", displayUnitsLabel);

                var v = val * scale;
                var unitsLabel = "";

                switch (doc.rulerUnits) {
                    case RulerUnits.Picas:
                        v = new UnitValue(v, "pt").as("pc");
                        var vd = v - Math.floor(v);
                        vd = 12 * vd;
                        v = Math.floor(v) + "p" + vd.toFixed(decimals);
                        break;
                    case RulerUnits.Inches:
                        v = new UnitValue(v, "pt").as("in");
                        v = v.toFixed(decimals);
                        unitsLabel = " in"; // add abbreviation
                        break;
                    case RulerUnits.Millimeters:
                        v = new UnitValue(v, "pt").as("mm");
                        v = v.toFixed(decimals);
                        unitsLabel = " mm"; // add abbreviation
                        break;
                    case RulerUnits.Centimeters:
                        v = new UnitValue(v, "pt").as("cm");
                        v = v.toFixed(decimals);
                        unitsLabel = " cm"; // add abbreviation
                        break;
                    case RulerUnits.Pixels:
                        v = new UnitValue(v, "pt").as("px");
                        v = v.toFixed(decimals);
                        unitsLabel = " px"; // add abbreviation
                        break;
                    default:
                        v = new UnitValue(v, "pt").as("pt");
                        v = v.toFixed(decimals);
                        unitsLabel = " pt"; // add abbreviation
                }

                // If custom scale and units label is set
                if (useCustomUnits.value == true && customUnitsInput.enabled && customUnitsInput.text != getRulerUnits()) {
                    unitsLabel = customUnitsInput.text;
                    $.setenv("Specify_defaultUseCustomUnits", true);
                    $.setenv("Specify_defaultCustomUnits", unitsLabel);
                }

                if (displayUnitsLabel) {
                    t.contents = v + " " + unitsLabel;
                } else {
                    t.contents = v;
                }
                t.top = y;
                t.left = x;

                return t;
            };

            function convertToBoolean(string) {
                switch (string.toLowerCase()) {
                    case "true":
                        return true;
                        break;
                    case "false":
                        return false;
                        break;
                }
            };

            function setLineStyle(path, color, labelStylesStrokeWidth) {
                path.filled = false;
                path.stroked = true;
                path.strokeColor = color;
                path.strokeWidth = parseFloat(labelStylesStrokeWidth);
                return path;
            };

            // Group items in a layer
            function group(layer, items, isDuplicate) {

                // Create new group
                var gg = layer.groupItems.add();

                // Add to group
                // Reverse count, because items length is reduced as items are moved to new group
                for (var i = items.length - 1; i >= 0; i--) {

                    if (items[i] != gg) { // don't group the group itself
                        if (isDuplicate) {
                            newItem = items[i].duplicate(gg, ElementPlacement.PLACEATBEGINNING);
                        } else {
                            items[i].move(gg, ElementPlacement.PLACEATBEGINNING);
                        }
                    }
                }
                return gg;
            };

            function convertToPoints(value) {
                switch (doc.rulerUnits) {
                    case RulerUnits.Picas:
                        value = new UnitValue(value, "pc").as("pt");
                        break;
                    case RulerUnits.Inches:
                        value = new UnitValue(value, "in").as("pt");
                        break;
                    case RulerUnits.Millimeters:
                        value = new UnitValue(value, "mm").as("pt");
                        break;
                    case RulerUnits.Centimeters:
                        value = new UnitValue(value, "cm").as("pt");
                        break;
                    case RulerUnits.Pixels:
                        value = new UnitValue(value, "px").as("pt");
                        break;
                    default:
                        value = new UnitValue(value, "pt").as("pt");
                }
                return value;
            };

            function convertToUnits(value) {
                switch (doc.rulerUnits) {
                    case RulerUnits.Picas:
                        value = new UnitValue(value, "pt").as("pc");
                        break;
                    case RulerUnits.Inches:
                        value = new UnitValue(value, "pt").as("in");
                        break;
                    case RulerUnits.Millimeters:
                        value = new UnitValue(value, "pt").as("mm");
                        break;
                    case RulerUnits.Centimeters:
                        value = new UnitValue(value, "pt").as("cm");
                        break;
                    case RulerUnits.Pixels:
                        value = new UnitValue(value, "pt").as("px");
                        break;
                    default:
                        value = new UnitValue(value, "pt").as("pt");
                }
                return value;
            };

            function getRulerUnits() {
                var rulerUnits;
                switch (doc.rulerUnits) {
                    case RulerUnits.Picas:
                        rulerUnits = "pc";
                        break;
                    case RulerUnits.Inches:
                        rulerUnits = "in";
                        break;
                    case RulerUnits.Millimeters:
                        rulerUnits = "mm";
                        break;
                    case RulerUnits.Centimeters:
                        rulerUnits = "cm";
                        break;
                    case RulerUnits.Pixels:
                        rulerUnits = "px";
                        break;
                    default:
                        rulerUnits = "pt";
                }
                return rulerUnits;
            };

            function activateSpecifyButton() {
                // Update helpTip
                specifyButton.helpTip = (topCheckbox.value || rightCheckbox.value || bottomCheckbox.value || leftCheckbox.value || selectAllCheckbox.value ? "" : "Select at least 1 dimension in the Options tab");
            };

            function openURL(url) {
                if (!url) {
                    return
                }

                try {
                    if (app.version > 6) {
                        if (File.fs == "Macintosh") {
                            var body = 'tell application "Finder"\ropen location "' + url + '"\rend tell';
                            app.doScript(body, ScriptLanguage.APPLESCRIPT_LANGUAGE);
                        } else {
                            var body = 'dim objShell\rset objShell = CreateObject("Shell.Application")\rstr = "' + url + '"\robjShell.ShellExecute str, "", "", "open", 1 '
                            app.doScript(body, ScriptLanguage.VISUAL_BASIC);
                        }
                    } else {
                        linkJumper = File(Folder.temp.absoluteURI + "/link.html");
                        linkJumper.open("w");
                        var linkBody = '<html><head><META HTTP-EQUIV=Refresh CONTENT="0; URL=' + url + '"></head><body> <p></body></html>'
                        linkJumper.write(linkBody);
                        linkJumper.close();
                        linkJumper.execute();
                    }
                } catch (e) {
                    beep();
                    prompt("Open your browser and visit the URL below for more information", url);
                }
            };

            function restoreDefaults() {
                topCheckbox.value = false;
                rightCheckbox.value = false;
                bottomCheckbox.value = false;
                leftCheckbox.value = false;
                selectAllCheckbox.value = false;
                if (selectedItems == 2) {
                    betweenCheckbox.value = false;
                }
                customScaleDropdown.selection = setScale;
                units.value = setUnits;
                useCustomUnits.value = setUseCustomUnits;
                useCustomUnits.enabled = true;
                customUnitsInput.text = setCustomUnits;
                customUnitsInput.enabled = false;
                decimalPlacesInput.text = setDecimals;
                fontSizeInput.text = setFontSize;
                color.red = setRed;
                color.green = setGreen;
                color.blue = setBlue;
                gapInput.text = setGap;
                strokeWidthInput.text = setStrokeWidth;
                headTailSizeInput.text = setHeadTailSize;

                // Unset environmental variables
                $.setenv("Specify_defaultUnits", "");
                $.setenv("Specify_defaultFontSize", "");
                $.setenv("Specify_defaultColorRed", "");
                $.setenv("Specify_defaultColorGreen", "");
                $.setenv("Specify_defaultColorBlue", "");
                $.setenv("Specify_defaultDecimals", "");
                $.setenv("Specify_defaultGap", "");
                $.setenv("Specify_defaultStrokeWidth", "");
                $.setenv("Specify_defaultHeadTailSize", "");
                $.setenv("Specify_defaultScale", "");
                $.setenv("Specify_defaultUseCustomUnits", "");
                $.setenv("Specify_defaultCustomUnits", "");

                // Reset colorPickerButton
                colorPickerButton.fillBrush = colorPickerButton.graphics.newBrush(colorPickerButton.graphics.BrushType.SOLID_COLOR, [(parseInt(setRed) / 255), (parseInt(setGreen) / 255), (parseInt(setBlue) / 255)], 1);
                colorPickerButton.textPen = colorPickerButton.graphics.newPen(colorPickerButton.graphics.PenType.SOLID_COLOR, getColorPickerButtonTextColor(color.red, color.green, color.blue), 1);
                colorPickerButton.onDraw = customDraw;
                updatePanel(specifyDialogBox);

                beep();
                alert('The default options and styles have been restored.');

                restoreDefaultsButton.active = false;
                restoreDefaultsButton.enabled = false;
            };

            function updatePanel(win) {
                specifyDialogBox.layout.layout(true);
            };

            function getColorPickerButtonTextColor(red, green, blue) {
                var rgb = [parseInt(red), parseInt(green), parseInt(blue)];

                var hsp = Math.sqrt(
                    0.299 * (rgb[0] * rgb[0]) +
                    0.587 * (rgb[1] * rgb[1]) +
                    0.114 * (rgb[2] * rgb[2])
                );

                // Using the HSP value, determine whether the color is light or dark
                if (hsp > 127.5) {
                    // return black
                    return [(0 / 255), (0 / 255), (0 / 255)];
                } else {
                    // return white
                    return [(255 / 255), (255 / 255), (255 / 255)];
                }
            };

            switch (selectedItems) {
                case 0:
                    beep();
                    alert("Please select at least 1 object and try again.");
                    break;
                default:
                    specifyDialogBox.show();
                    break;
            }
        } else { // No active document
            alert("There are no objects to Specify. \nPlease open a document to continue.")
        }
    } catch (e) {
        alert("Error: " + e)
    }
}

specifyObjects();