const rectWelcomeBackground = require('../../../display/layouts/welcome/background.welcome.json');
const rectWelcomeRoot = require('../../../display/layouts/welcome/rootLayout.welcome.json');
const rectWelcomeBox = require('../../../display/layouts/welcome/box.welcome.json');
const rectWelcomeImageBody = require('../../../display/layouts/welcome/imageBody.welcome.json');
const rectWelcomeBoxWrapFrame = require('../../../display/layouts/welcome/boxWrapFrame.welcome.json');
const rectWelcomeBoxContainer = require('../../../display/layouts/welcome/boxContainer.welcome..json');
const rectWelcomeBoxText = require('../../../display/layouts/welcome/text.welcome.json');
const rectWelcomeBoxLine = require('../../../display/layouts/welcome/line.welcome.json');
const rectWelcomeBoxLogo = require('../../../display/layouts/welcome/logo.welcome.json');

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
