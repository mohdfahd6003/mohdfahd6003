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

function getRectHeader() {
    return rectHeader;
}

function getRectTitle() {
    return rectTitle;
}
function getRectMainImage() {
    return rectImage;
}

function getRectMainText() {
    return rectMainText;
}

function getRectBackground() {
    return rectBackground;
}

function getRectFooter() {
    return rectFooter;
}

function getRectRoot() {
    return rectRoot;
}

function getRectTextImage() {
    return rectTextImage;
}

function getRectBodyCore() {
    return rectBodyCore;
}

function getRectBodyWrap() {
    return rectBodyWrap;
}

module.exports = {
    getRectHeader,
    getRectTitle,
    getRectMainImage,
    getRectMainText,
    getRectBackground,
    getRectFooter,
    getRectRoot,
    getRectTextImage,
    getRectBodyCore,
    getRectBodyWrap,
};
