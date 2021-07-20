const rectWelcomeBackground = require('../../../display/layouts/welcome/background.welcome.json');
const rectWelcomeRoot = require('../../../display/layouts/welcome/rootLayout.welcome.json');
const rectWelcomeBox = require('../../../display/layouts/welcome/box.welcome.json');
const rectWelcomeImageBody = require('../../../display/layouts/welcome/imageBody.welcome.json');
const rectWelcomeBoxWrapFrame = require('../../../display/layouts/welcome/boxWrapFrame.welcome.json');
const rectWelcomeBoxContainer = require('../../../display/layouts/welcome/boxContainer.json');

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
};
