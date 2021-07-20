const rectWelcomeBackground = require('../../../display/layouts/welcome/background.welcome.json');
const rectWelcomeRoot = require('../../../display/layouts/welcome/rootLayout.welcome.json');
const rectWelcomeTextBox = require('../../../display/layouts/welcome/textBox.welcome.json');
const rectWelcomeImageBox = require('../../../display/layouts/welcome/imageBox.welcome.json');

function getWelcomeBackground() {
    return rectWelcomeBackground;
}

function getWelcomeRoot() {
    return rectWelcomeRoot;
}

function getWelcomeTextBox() {
    return rectWelcomeTextBox;
}

function getWelcomeImageBox() {
    return rectWelcomeImageBox;
}

exports.welcome = {
    getWelcomeBackground,
    getWelcomeRoot,
    getWelcomeTextBox,
    getWelcomeImageBox,
};
