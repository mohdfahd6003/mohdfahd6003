const catalogueRoot = require('../../display/layouts/catalogue/rootLayout.catalogue.json');
const catalogueCard = require('../../display/layouts/catalogue/cardLayouts.catalogue.json');

function getRoot() {
    return catalogueRoot;
}

function getcatalogueCard() {
    return catalogueCard;
}
/* function getHeader() {
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
}; */

exports.catalogue = {
    getRoot,
    getcatalogueCard,
};
