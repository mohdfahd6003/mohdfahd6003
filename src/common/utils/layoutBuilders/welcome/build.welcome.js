const { welcome } = require('./getWelcomeLayouts');

function boxContainerCreator() {
    let boxContainer = {};
    boxContainer = welcome.getWelcomeBoxContainer();
    return boxContainer;
}

function boxWrapper() {
    let boxWrap = {};
    boxWrap = welcome.getWelcomeBoxWrapFrame();
    boxWrap.items = [];
    boxWrap.items.push(boxContainerCreator());
    return boxWrap;
}

function boxCreator() {
    let box = {};
    box = welcome.getWelcomeBox();
    box.items = [];
    box.items.push(boxWrapper());
    return box;
}

function welcomePageCreater() {
    let welcomeRootContainer = {};
    welcomeRootContainer = welcome.getWelcomeRoot();
    welcomeRootContainer.items = [];
    welcomeRootContainer.items.push(welcome.getWelcomeBackground());
    welcomeRootContainer.items.push(welcome.getWelcomeImageBody());
    welcomeRootContainer.items.push(boxCreator());
    return welcomeRootContainer;
}

exports.welcomePage = {
    welcomePageCreater,
};
