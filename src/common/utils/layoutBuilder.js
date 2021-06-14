const roundHeader = require('../display/layouts/round/header.round.json');
const roundTitle = require('../display/layouts/round/title.round.json');
const roundImage = require('../display/layouts/round/image.round.json');
const roundMainText = require('../display/layouts/round/mainText.round.json');
const roundFooter = require('../display/layouts/round/footer.round.json');

const rectHeader = require('../display/layouts/rectangle/header.rectangle.json');
const rectTitle = require('../display/layouts/rectangle/title.rectangle.json');
const rectImage = require('../display/layouts/rectangle/image.rectangle.json');
const rectMainText = require('../display/layouts/rectangle/mainText.rectangle.json');
const rectBackground = require('../display/layouts/rectangle/background.rectangle.json');
const rectFooter = require('../display/layouts/rectangle/footer.rectangle.json');

function getRoundHeader() {
    return roundHeader;
}

function getRoundTitle() {
    return roundTitle;
}
function getRoundMainImage() {
    return roundImage;
}

function getRoundMainText() {
    return roundMainText;
}

function getRoundFooter() {
    return roundFooter;
}

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

function getRectangleLayout() {
    const rectMainLayout = [];
    rectMainLayout.push(getRectBackground());
    rectMainLayout.push(getRectMainImage());
    rectMainLayout.push(getRectHeader());
    rectMainLayout.push(getRectTitle());
    rectMainLayout.push(getRectMainText());
    rectMainLayout.push(getRectFooter());
    return rectMainLayout;
}

function getRoundLayout() {
    const roundMainLayout = [];
    roundMainLayout.push(getRoundMainImage());
    roundMainLayout.push(getRoundHeader());
    roundMainLayout.push(getRoundTitle());
    roundMainLayout.push(getRoundMainText());
    roundMainLayout.push(getRoundFooter());
    return roundMainLayout;
}
module.exports = {
    getRectangleLayout,
    getRoundLayout,
};
