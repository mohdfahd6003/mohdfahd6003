const { Introduction } = require('./getIntroductionLayouts');

function boxContainerCreator() {
    let boxContainer = {};
    boxContainer = Introduction.getIntroductionBoxContainer();
    boxContainer.items = [];
    boxContainer.items.push(Introduction.getIntroductionLogo());
    boxContainer.items.push(Introduction.getIntroductionText());
    boxContainer.items.push(Introduction.getIntroductionLine());
    return boxContainer;
}

function boxWrapper() {
    let boxWrap = {};
    boxWrap = Introduction.getIntroductionBoxWrapFrame();
    boxWrap.items = [];
    boxWrap.items.push(boxContainerCreator());
    return boxWrap;
}

function boxCreator() {
    let box = {};
    box = Introduction.getIntroductionBox();
    box.items = [];
    box.items.push(boxWrapper());
    return box;
}

function IntroductionPageCreater() {
    let IntroductionRootContainer = {};
    IntroductionRootContainer = Introduction.getIntroductionRoot();
    IntroductionRootContainer.items = [];
    IntroductionRootContainer.items.push(Introduction.getIntroductionBackground());
    IntroductionRootContainer.items.push(Introduction.getIntroductionImageBody());
    IntroductionRootContainer.items.push(boxCreator());
    return IntroductionRootContainer;
}

exports.IntroductionPage = {
    IntroductionPageCreater,
};
