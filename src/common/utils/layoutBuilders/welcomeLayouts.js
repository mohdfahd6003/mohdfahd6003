const rectWelcomeBody = require('../../display/layouts/welcome/body.welcome.json');
const rectWelcomeBackground = require('../../display/layouts/welcome/background.welcome.json');
const rectWelcomeFooter = require('../../display/layouts/welcome/footer.welcome.json');
const rectWelcomeMain = require('../../display/layouts/welcome/main.welcome.json');
const rectWelcomeRoot = require('../../display/layouts/welcome/rootLayout.welcome.json');

function getWelcomeBackground() {
    return rectWelcomeBackground;
}

function getWelcomeBody() {
    return rectWelcomeBody;
}

function getWelcomeMain() {
    return rectWelcomeMain;
}

function getWelcomeFooter() {
    return rectWelcomeFooter;
}

function getWelcomeRoot() {
    return rectWelcomeRoot;
}

module.exports = {
    getWelcomeBackground,
    getWelcomeBody,
    getWelcomeMain,
    getWelcomeFooter,
    getWelcomeRoot,
};
