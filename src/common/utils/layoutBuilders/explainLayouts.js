const rectHeader = require('../../display/layouts/explain/header.explain.json');
const rectTitle = require('../../display/layouts/explain/title.explain.json');
const rectImage = require('../../display/layouts/explain/image.explain.json');
const rectMainText = require('../../display/layouts/explain/mainText.explain.json');
const rectBackground = require('../../display/layouts/explain/background.explain.json');
const rectFooter = require('../../display/layouts/explain/footer.explain.json');
const rectRoot = require('../../display/layouts/explain/rootLayout.explain.json');
const rectTextImage = require('../../display/layouts/explain/textImageContainer.explain.json');
const rectBodyCore = require('../../display/layouts/explain/bodyCore.explain.json');
const rectBodyWrap = require('../../display/layouts/explain/bodyWrap.explain.json');

function getHeader() {
    return rectHeader;
}

function getTitle() {
    return rectTitle;
}
function getMainImage() {
    return rectImage;
}

function getMainText() {
    return rectMainText;
}

function getBackground() {
    return rectBackground;
}

function getFooter() {
    return rectFooter;
}

function getRoot() {
    return rectRoot;
}

function getTextImage() {
    return rectTextImage;
}

function getBodyCore() {
    return rectBodyCore;
}

function getBodyWrap() {
    return rectBodyWrap;
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
