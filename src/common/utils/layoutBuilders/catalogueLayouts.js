const catalogueHeader = require('../../display/layouts/catalogue/header.catalogue.json');
const catalogueTitle = require('../../display/layouts/catalogue/title.catalogue.json');
const catalogueImage = require('../../display/layouts/catalogue/image.catalogue.json');
const catalogueMainText = require('../../display/layouts/catalogue/mainText.catalogue.json');
const catalogueBackground = require('../../display/layouts/catalogue/background.catalogue.json');
const catalogueFooter = require('../../display/layouts/catalogue/footer.catalogue.json');
const catalogueRoot = require('../../display/layouts/catalogue/rootLayout.catalogue.json');
const catalogueTextImage = require('../../display/layouts/catalogue/textImageContainer.catalogue.json');
const catalogueBodyCore = require('../../display/layouts/catalogue/bodyCore.catalogue.json');
const catalogueBodyWrap = require('../../display/layouts/catalogue/bodyWrap.catalogue.json');

function getHeader() {
    return catalogueHeader;
}

function getTitle() {
    return catalogueTitle;
}
function getMainImage() {
    return catalogueImage;
}

function getMainText() {
    return catalogueMainText;
}

function getBackground() {
    return catalogueBackground;
}

function getFooter() {
    return catalogueFooter;
}

function getRoot() {
    return catalogueRoot;
}

function getTextImage() {
    return catalogueTextImage;
}

function getBodyCore() {
    return catalogueBodyCore;
}

function getBodyWrap() {
    return catalogueBodyWrap;
}

exports.catalogue = {
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
