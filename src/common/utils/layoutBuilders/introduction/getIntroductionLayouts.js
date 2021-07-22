const rectIntroductionBox = require('../../../display/layouts/introduction/box.introduction.json');
const rectIntroductionBackground = require('../../../display/layouts/introduction/background.introduction.json');
const rectIntroductionRoot = require('../../../display/layouts/introduction/rootLayout.introduction.json');
const rectIntroductionImageBody = require('../../../display/layouts/introduction/imageBody.introduction.json');

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
};
