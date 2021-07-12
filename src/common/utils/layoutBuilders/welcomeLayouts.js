const rectWelcomeBody = require('../../display/layouts/welcome/body.welcome.json');
const rectWelcomeBackground = require('../../display/layouts/welcome/background.welcome.json');
const rectWelcomeFooter = require('../../display/layouts/welcome/footer.welcome.json');
const rectWelcomeMain = require('../../display/layouts/welcome/main.welcome.json');
const rectWelcomeRoot = require('../../display/layouts/welcome/rootLayout.welcome.json');
const rectWelcomeBodyImage = require('../../display/layouts/welcome/bodyImage.welcome.json');
const rectWelcomeBodyWindowWrap = require('../../display/layouts/welcome/bodyWindowWrap.welcome.json');
const rectWelcomeBodyWindowCore = require('../../display/layouts/welcome/bodyWindowCore.welcome.json');
const rectWelcomeTextWrapFrame = require('../../display/layouts/welcome/textWrapFrame.welcome.json');
const rectWelcomeLogoLineTextContainer = require('../../display/layouts/welcome/logoLineTextContainer.welcome.json');
const rectWelcomeLine = require('../../display/layouts/welcome/line.welcome.json');
const rectWelcomeLogo = require('../../display/layouts/welcome/logo.welcome.json');
const rectWelcomeText = require('../../display/layouts/welcome/text.welcome.json');

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

function getWelcomeBodyImage() {
    return rectWelcomeBodyImage;
}

function getWelcomeBodyWindowWrap() {
    return rectWelcomeBodyWindowWrap;
}

function getWelcomeBodyWindowCore() {
    return rectWelcomeBodyWindowCore;
}

function getWelcomeTextWrapFrame() {
    return rectWelcomeTextWrapFrame;
}

function getWelcomeLogoLineTextContainer() {
    return rectWelcomeLogoLineTextContainer;
}

function getWelcomeText() {
    return rectWelcomeText;
}

function getWelcomeLogo() {
    return rectWelcomeLogo;
}

function getWelcomeLine() {
    return rectWelcomeLine;
}

exports.welcomePage = {
    getWelcomeBackground,
    getWelcomeBody,
    getWelcomeMain,
    getWelcomeFooter,
    getWelcomeRoot,
    getWelcomeBodyImage,
    getWelcomeBodyWindowWrap,
    getWelcomeBodyWindowCore,
    getWelcomeTextWrapFrame,
    getWelcomeLogoLineTextContainer,
    getWelcomeLogo,
    getWelcomeText,
    getWelcomeLine,
};
