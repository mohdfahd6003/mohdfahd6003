const rectHeader = require('../../display/layouts/explain/header.rectangle.json');
const rectTitle = require('../../display/layouts/explain/title.rectangle.json');
const rectImage = require('../../display/layouts/explain/image.rectangle.json');
const rectMainText = require('../../display/layouts/explain/mainText.rectangle.json');
const rectBackground = require('../../display/layouts/explain/background.rectangle.json');
const rectFooter = require('../../display/layouts/explain/footer.rectangle.json');
const rectRoot = require('../../display/layouts/explain/rootLayout.rectangle.json');
const rectTextImage = require('../../display/layouts/explain/textImageContainer.rectangle.json');
const rectBodyCore = require('../../display/layouts/explain/bodyCore.rectangle.json');
const rectBodyWrap = require('../../display/layouts/explain/bodyWrap.rectangle.json');

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
