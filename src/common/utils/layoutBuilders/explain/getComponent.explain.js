const explainHeader = require('../../../display/layouts/rect/explain/header.explain.json');
const explainTitle = require('../../../display/layouts/rect/explain/body/title.explain.json');
const explainImage = require('../../../display/layouts/rect/explain/body/image.explain.json');
const explainMainText = require('../../../display/layouts/rect/explain/body/mainText.explain.json');
const explainBackground = require('../../../display/layouts/rect/explain/background.explain.json');
const explainFooter = require('../../../display/layouts/rect/explain/footer.explain.json');
const explainRoot = require('../../../display/layouts/rect/explain/rootLayout.explain.json');
const explainTextImage = require('../../../display/layouts/rect/explain/body/textImageContainer.explain.json');
const explainBodyCore = require('../../../display/layouts/rect/explain/body/bodyCore.explain.json');
const explainBodyWrap = require('../../../display/layouts/rect/explain/body/bodyWrap.explain.json');
const explainDividerUp = require('../../../display/layouts/rect/explain/dividerUp.explain.json');
const explainDividerDown = require('../../../display/layouts/rect/explain/dividerDown.explain.json');

function getHeader() {
    return explainHeader;
}

function getTitle() {
    return explainTitle;
}
function getMainImage() {
    return explainImage;
}

function getMainText() {
    return explainMainText;
}

function getBackground() {
    return explainBackground;
}

function getFooter() {
    return explainFooter;
}

function getRoot() {
    return explainRoot;
}

function getTextImage() {
    return explainTextImage;
}

function getBodyCore() {
    return explainBodyCore;
}

function getBodyWrap() {
    return explainBodyWrap;
}

function getDividerUp() {
    return explainDividerUp;
}

function getDividerDown() {
    return explainDividerDown;
}

exports.explain = {
    getHeader,
    getTitle,
    getMainImage,
    getMainText,
    getBackground,
    getFooter,
    getRoot,
    getTextImage,
    getBodyCore,
    getBodyWrap,
    getDividerUp,
    getDividerDown,
};
