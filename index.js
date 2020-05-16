/* Create an instance of CSInterface. */
var csInterface = new CSInterface();

var specifyButton = document.getElementById('specify-button');
if (specifyButton) {
    specifyButton.addEventListener('click', openDialog);
}

function openDialog() {
    csInterface.evalScript("specifyObjects()");
}
