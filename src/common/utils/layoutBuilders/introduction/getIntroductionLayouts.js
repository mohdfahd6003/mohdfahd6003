const rectIntroductionBox = require('../../../display/layouts/introduction/box.introduction.json');
const rectIntroductionBackground = require('../../../display/layouts/introduction/background.introduction.json');
const rectIntroductionRoot = require('../../../display/layouts/introduction/rootLayout.introduction.json');
const rectIntroductionImageBody = require('../../../display/layouts/introduction/imageBody.introduction.json');
const rectIntroductionBoxWrapFrame = require('../../../display/layouts/introduction/boxWrapFrame.introduction.json');
const rectIntroductionBoxContainer = require('../../../display/layouts/introduction/boxContainer.introduction.json');
const rectIntroductionBoxText = require('../../../display/layouts/introduction/boxText.introduction.json');
const rectIntroductionBoxLine = require('../../../display/layouts/introduction/boxLine.introduction.json');
const rectIntroductionBoxLogo = require('../../../display/layouts/introduction/boxLogo.introduction.json');

function getIntroductionBoxLine() {
    return rectIntroductionBoxLine;
}

function getIntroductionBoxLogo() {
    return rectIntroductionBoxLogo;
}

function getIntroductionBoxText() {
    return rectIntroductionBoxText;
}

function getIntroductionBoxWrapFrame() {
    return rectIntroductionBoxWrapFrame;
}

function getIntroductionBoxContainer() {
    return rectIntroductionBoxContainer;
}

function getIntroductionBackground() {
    return rectIntroductionBackground;
}

function getIntroductionRoot() {
    return rectIntroductionRoot;
}

function getIntroductionBox() {
    return rectIntroductionBox;
}

function getIntroductionImageBody() {
    return rectIntroductionImageBody;
}

exports.introduction = {
    getIntroductionBackground,
    getIntroductionRoot,
    getIntroductionBox,
    getIntroductionImageBody,
    getIntroductionBoxContainer,
    getIntroductionBoxWrapFrame,
    getIntroductionBoxText,
    getIntroductionBoxLine,
    getIntroductionBoxLogo,
};
