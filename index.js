function onLoaded() {
    /* Create an instance of CSInterface. */
    var csInterface = new CSInterface();

    // Set the initial panel colors
    updateThemeWithAppSkinInfo(csInterface.hostEnvironment.appSkinInfo);

    // Bind event for extension panel window visiblilty change
    csInterface.addEventListener("com.adobe.csxs.events.WindowVisibilityChanged", function (e) {
        // Update the color of the panel when the theme color of the product changed.
        onAppThemeColorChanged();
    });

    function runSpecifyScript() {
        csInterface.evalScript("specifyObjects()");
    }

    var specifyButton = document.getElementById('specify-button');
    if (specifyButton) {
        // Run script on click if button is not disabled
        specifyButton.addEventListener('click', function (e) {
            if (specifyButton.disabled == true) {
                alert('disabled');
                return
            }
            runSpecifyScript();
        });
    }

    // Respond to custom event of dialog toggled open or close
    csInterface.addEventListener("com.adamdehaven.specify.dialogToggled", function (e) {
        // Enable/disable extension panel button
        if (specifyButton) {
            if (e.data === 'open') {
                specifyButton.disabled = true;
            } else if (e.data === 'close') {
                specifyButton.disabled = false;
            }
        }

    });

}
/**
 * Update the theme with the AppSkinInfo retrieved from the host product.
 */
function updateThemeWithAppSkinInfo(appSkinInfo) {

    //Update the background color of the panel
    var panelBackgroundColor = appSkinInfo.panelBackgroundColor.color;
    document.body.bgColor = toHex(panelBackgroundColor);

    var styleId = "specify-extension-styles";

    var csInterface = new CSInterface();

    var isPanelThemeLight = panelBackgroundColor.red > 127;
    var buttonColor;
    var buttonBorderColor;
    var buttonBackgroundColor;

    if (isPanelThemeLight) {
        buttonColor = "#000000 !important;";
        buttonBorderColor = toHex(panelBackgroundColor, -90) + " !important;";
        buttonBackgroundColor = toHex(panelBackgroundColor, 54) + " !important;";
    } else {
        buttonColor = "#ffffff !important;";
        buttonBorderColor = toHex(panelBackgroundColor, -45) + " !important;";
        buttonBackgroundColor = toHex(panelBackgroundColor, -20) + " !important;";
    }

    addRule(styleId, ".specify-extension-panel, .default", "font-size:" + appSkinInfo.baseFontSize + "px" + "; color:" + reverseColor(panelBackgroundColor) + "; background-color:" + toHex(panelBackgroundColor, 1));

    addRule(styleId, "#specify-button", "border-color: " + buttonBorderColor);
    addRule(styleId, "#specify-button", "background-color: " + buttonBackgroundColor);
    addRule(styleId, "#specify-button", "color: " + buttonColor);

}

function addRule(stylesheetId, selector, rule) {
    var stylesheet = document.getElementById(stylesheetId);

    if (!stylesheet) {
        stylesheet = document.createElement('style');
        stylesheet.id = stylesheetId;
        document.head.appendChild(stylesheet)
    }

    try {
        stylesheet = stylesheet.sheet;
        if (stylesheet.addRule) {
            stylesheet.addRule(selector, rule);
        } else if (stylesheet.insertRule) {
            stylesheet.insertRule(selector + ' { ' + rule + ' }', stylesheet.cssRules.length);
        }
    } catch (e) {

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