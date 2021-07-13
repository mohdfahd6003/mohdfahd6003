const { welcome } = require('./getWelcomeLayouts');

function welcomeLogoLineTextContainerCreator() {
    let welcomeLogoLineTextContainer = {};
    welcomeLogoLineTextContainer = welcome.getWelcomeLogoLineTextContainer();
    welcomeLogoLineTextContainer.items = [];
    welcomeLogoLineTextContainer.items.push(welcome.getWelcomeLogo());
    welcomeLogoLineTextContainer.items.push(welcome.getWelcomeText());
    welcomeLogoLineTextContainer.items.push(welcome.getWelcomeLine());
    return welcomeLogoLineTextContainer;
}

function welcomeTextWrapFrameCreator() {
    let welcomeTextWrap = {};
    welcomeTextWrap = welcome.getWelcomeTextWrapFrame();
    welcomeTextWrap.items = [];
    welcomeTextWrap.items.push(welcomeLogoLineTextContainerCreator());
    return welcomeTextWrap;
}

function welcomeBodyWindowCoreCreator() {
    let welcomeBodyWindowCore = {};
    welcomeBodyWindowCore = welcome.getWelcomeBodyWindowCore();
    welcomeBodyWindowCore.items = [];
    welcomeBodyWindowCore.items.push(welcomeTextWrapFrameCreator());
    return welcomeBodyWindowCore;
}

function welcomeBodyWindowCreator() {
    let welcomeBodyWindowWrap = {};
    welcomeBodyWindowWrap = welcome.getWelcomeBodyWindowWrap();
    welcomeBodyWindowWrap.items = [];
    welcomeBodyWindowWrap.items.push(welcomeBodyWindowCoreCreator());
    return welcomeBodyWindowWrap;
}

function welcomeBodyCreater() {
    let welcomeBody = {};
    welcomeBody = welcome.getWelcomeBody();
    welcomeBody.items = [];
    welcomeBody.items.push(welcome.getWelcomeBodyImage());
    welcomeBody.items.push(welcomeBodyWindowCreator());
    return welcomeBody;
}

function welcomePageCreater() {
    let welcomeRootContainer = {};
    welcomeRootContainer = welcome.getWelcomeRoot();
    welcomeRootContainer.items = [];
    welcomeRootContainer.items.push(welcome.getWelcomeBackground());
    welcomeRootContainer.items.push(welcomeBodyCreater());
    welcomeRootContainer.items.push(welcome.getWelcomeFooter());
    return welcomeRootContainer;
}

exports.welcomePage = {
    welcomePageCreater,
};
