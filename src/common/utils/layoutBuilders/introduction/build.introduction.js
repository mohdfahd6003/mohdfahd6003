const { introduction } = require('./getIntroductionLayouts');

function boxContainerCreator() {
    let boxContainer = {};
    boxContainer = introduction.getIntroductionBoxContainer();
    boxContainer.items = [];
    boxContainer.items.push(introduction.getIntroductionLogo());
    boxContainer.items.push(introduction.getIntroductionText());
    boxContainer.items.push(introduction.getIntroductionLine());
    return boxContainer;
}

function boxWrapper() {
    let boxWrap = {};
    boxWrap = introduction.getIntroductionBoxWrapFrame();
    boxWrap.items = [];
    boxWrap.items.push(boxContainerCreator());
    return boxWrap;
}

function boxCreator() {
    let box = {};
    box = introduction.getIntroductionBox();
    box.items = [];
    box.items.push(boxWrapper());
    return box;
}

function introductionPageCreater() {
    let introductionRootContainer = {};
    introductionRootContainer = introduction.getIntroductionRoot();
    introductionRootContainer.items = [];
    introductionRootContainer.items.push(introduction.getIntroductionBackground());
    introductionRootContainer.items.push(introduction.getIntroductionImageBody());
    introductionRootContainer.items.push(boxCreator());
    return introductionRootContainer;
}

exports.introductionPage = {
    introductionPageCreater,
};
