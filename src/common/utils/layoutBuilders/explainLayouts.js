const explainHeader = require('../../display/layouts/explain/header.explain.json');
const explainTitle = require('../../display/layouts/explain/title.explain.json');
const explainImage = require('../../display/layouts/explain/image.explain.json');
const explainMainText = require('../../display/layouts/explain/mainText.explain.json');
const explainBackground = require('../../display/layouts/explain/background.explain.json');
const explainFooter = require('../../display/layouts/explain/footer.explain.json');
const explainRoot = require('../../display/layouts/explain/rootLayout.explain.json');
const explainTextImage = require('../../display/layouts/explain/textImageContainer.explain.json');
const explainBodyCore = require('../../display/layouts/explain/bodyCore.explain.json');
const explainBodyWrap = require('../../display/layouts/explain/bodyWrap.explain.json');

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
};
