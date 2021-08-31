const rectWelcomeBackground = require('../../../display/layouts/rect/welcome/background.welcome.json');
const rectWelcomeRoot = require('../../../display/layouts/rect/welcome/rootLayout.welcome.json');
const rectWelcomeBox = require('../../../display/layouts/rect/welcome/box.welcome.json');
const rectWelcomeImageBody = require('../../../display/layouts/rect/welcome/imageBody.welcome.json');
const rectWelcomeBoxWrapFrame = require('../../../display/layouts/rect/welcome/boxWrapFrame.welcome.json');
const rectWelcomeBoxContainer = require('../../../display/layouts/rect/welcome/boxContainer.welcome..json');
const rectWelcomeBoxText = require('../../../display/layouts/rect/welcome/text.welcome.json');
const rectWelcomeBoxLine = require('../../../display/layouts/rect/welcome/line.welcome.json');
const rectWelcomeBoxLogo = require('../../../display/layouts/rect/welcome/logo.welcome.json');

function getWelcomeLine() {
    return rectWelcomeBoxLine;
}

function getWelcomeText() {
    return rectWelcomeBoxText;
}

function getWelcomeLogo() {
    return rectWelcomeBoxLogo;
}

function getWelcomeBackground() {
    return rectWelcomeBackground;
}

function getWelcomeRoot() {
    return rectWelcomeRoot;
}

function getWelcomeBox() {
    return rectWelcomeBox;
}

function getWelcomeImageBody() {
    return rectWelcomeImageBody;
}

function getWelcomeBoxWrapFrame() {
    return rectWelcomeBoxWrapFrame;
}

function getWelcomeBoxContainer() {
    return rectWelcomeBoxContainer;
}

exports.welcome = {
    getWelcomeBackground,
    getWelcomeRoot,
    getWelcomeBox,
    getWelcomeImageBody,
    getWelcomeBoxWrapFrame,
    getWelcomeBoxContainer,
    getWelcomeLine,
    getWelcomeLogo,
    getWelcomeText,
};
