function onLoaded() {
    /* Create an instance of CSInterface. */
    var csInterface = new CSInterface();

    var specifyButton = document.getElementById('specify-button');
    if (specifyButton) {
        specifyButton.addEventListener('click', runSpecifyScript);
    }

    function runSpecifyScript() {
        csInterface.evalScript("specifyObjects()");
    }

    //  -------------------------------------- //

    updateThemeWithAppSkinInfo(csInterface.hostEnvironment.appSkinInfo);
    // Update the color of the panel when the theme color of the product changed.
    csInterface.addEventListener(csInterface.THEME_COLOR_CHANGED_EVENT, onAppThemeColorChanged);
}

/**
 * Update the theme with the AppSkinInfo retrieved from the host product.
 */
function updateThemeWithAppSkinInfo(appSkinInfo) {

    //Update the background color of the panel
    var panelBackgroundColor = appSkinInfo.panelBackgroundColor.color;
    document.body.bgColor = toHex(panelBackgroundColor);

    var styleId = "ppstyle";

    var csInterface = new CSInterface();
    var appName = csInterface.hostEnvironment.appName;


    var isPanelThemeLight = panelBackgroundColor.red > 127;
    var fontColor, disabledFontColor;
    var borderColor;
    var backgroundColor;
    if (isPanelThemeLight) {
        fontColor = "#000000;";
        disabledFontColor = "color:" + toHex(panelBackgroundColor, -70) + ";";
        borderColor = "border-color: " + toHex(panelBackgroundColor, -90) + ";";
        backgroundColor = toHex(panelBackgroundColor, 54) + ";";
    } else {
        fontColor = "#ffffff;";
        disabledFontColor = "color:" + toHex(panelBackgroundColor, 100) + ";";
        borderColor = "border-color: " + toHex(panelBackgroundColor, -45) + ";";
        backgroundColor = toHex(panelBackgroundColor, -20) + ";";
    }

    // For AI, ID and FL use old implementation
    addRule(styleId, ".default", "font-size:" + appSkinInfo.baseFontSize + "px" + "; color:" + reverseColor(panelBackgroundColor) + "; background-color:" + toHex(panelBackgroundColor, 20));
    addRule(styleId, "button, .button", "border-color: " + toHex(panelBgColor, -50));
    // Potential styles
    addRule(styleId, "button, .button", borderColor);
    addRule(styleId, "button, .button", backgroundColor);
}

function addRule(stylesheetId, selector, rule) {
    var stylesheet = document.getElementById(stylesheetId);

    if (stylesheet) {
        stylesheet = stylesheet.sheet;
        if (stylesheet.addRule) {
            stylesheet.addRule(selector, rule);
        } else if (stylesheet.insertRule) {
            stylesheet.insertRule(selector + ' { ' + rule + ' }', stylesheet.cssRules.length);
        }
    }
}

function reverseColor(color, delta) {
    return toHex({ red: Math.abs(255 - color.red), green: Math.abs(255 - color.green), blue: Math.abs(255 - color.blue) }, delta);
}

/**
 * Convert the Color object to string in hexadecimal format;
 */
function toHex(color, delta) {
    function computeValue(value, delta) {
        var computedValue = !isNaN(delta) ? value + delta : value;
        if (computedValue < 0) {
            computedValue = 0;
        } else if (computedValue > 255) {
            computedValue = 255;
        }

        computedValue = Math.round(computedValue).toString(16);
        return computedValue.length == 1 ? "0" + computedValue : computedValue;
    }

    var hex = "";
    if (color) {
        with (color) {
            hex = computeValue(red, delta) + computeValue(green, delta) + computeValue(blue, delta);
        };
    }
    return "#" + hex;
}

function onAppThemeColorChanged(event) {
    // Should get a latest HostEnvironment object from application.
    var skinInfo = JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo;
    // Gets the style information such as color info from the skinInfo,
    // and redraw all UI controls of your extension according to the style info.
    updateThemeWithAppSkinInfo(skinInfo);
}