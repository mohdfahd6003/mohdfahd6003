const { welcomeRect } = require('./getWelcomeRectComponent');
const { welcomeRound } = require('./getWelcomeRoundComponent');

function boxContainerCreator() {
    let boxContainer = {};
    boxContainer = welcomeRect.getWelcomeBoxContainer();
    boxContainer.items = [];
    boxContainer.items.push(welcomeRect.getWelcomeLogo());
    boxContainer.items.push(welcomeRect.getWelcomeText());
    boxContainer.items.push(welcomeRect.getWelcomeLine());
    return boxContainer;
}

function boxWrapper() {
    let boxWrap = {};
    boxWrap = welcomeRect.getWelcomeBoxWrapFrame();
    boxWrap.items = [];
    boxWrap.items.push(boxContainerCreator());
    return boxWrap;
}

function boxCreator() {
    let box = {};
    box = welcomeRect.getWelcomeBox();
    box.items = [];
    box.items.push(boxWrapper());
    return box;
}

function welcomePageCreaterRect() {
    console.log('inside rectangle welcome page');
    let welcomeRootContainer = {};
    welcomeRootContainer = welcomeRect.getWelcomeRoot();
    welcomeRootContainer.items = [];
    welcomeRootContainer.items.push(welcomeRect.getWelcomeBackground());
    welcomeRootContainer.items.push(welcomeRect.getWelcomeImageBody());
    welcomeRootContainer.items.push(boxCreator());
    return welcomeRootContainer;
}

function welcomePageCreaterRound() {
    console.log('inside round welcome page');
    let welcomeRootContainer = {};
    welcomeRootContainer = welcomeRound.getRoundWelcomeRoot();
    welcomeRootContainer.items = [];
    welcomeRootContainer.items.push(welcomeRound.getRoundWelcomeBackground());
    welcomeRootContainer.items.push(welcomeRound.getRoundWelcomeText());
}
exports.welcomePage = {
    welcomePageCreaterRect,
    welcomePageCreaterRound,
};
