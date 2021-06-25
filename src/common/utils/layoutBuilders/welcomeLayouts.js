const rectWelcomeHeader = require('../../display/layouts/welcome/header.welcome.json');
const rectWelcomeBackground = require('../../display/layouts/welcome/background.welcome.json');
const rectWelcomeFooter = require('../../display/layouts/welcome/footer.welcome.json');
const rectWelcomeMain = require('../../display/layouts/welcome/main.welcome.json');
const rectWelcomeRoot = require('../../display/layouts/welcome/rootLayout.welcome.json');

function getWelcomeRectBackground() {
    // console.log('welcome background called');
    return rectWelcomeBackground;
}

function getWelcomeRectHeader() {
    return rectWelcomeHeader;
}

function getWelcomeRectMain() {
    return rectWelcomeMain;
}

function getWelcomeRectFooter() {
    return rectWelcomeFooter;
}

function getWelcomeRectRoot() {
    return rectWelcomeRoot;
}

module.exports = {
    getWelcomeRectBackground,
    getWelcomeRectHeader,
    getWelcomeRectMain,
    getWelcomeRectFooter,
    getWelcomeRectRoot,
};
