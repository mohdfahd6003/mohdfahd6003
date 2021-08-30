const cardTouch = require('../../../display/layouts/rect/catalogue/cards/touch.card.json');
const cardFrame = require('../../../display/layouts/rect/catalogue/cards/frame.card.json');
const cardCombineContainer = require('../../../display/layouts/rect/catalogue/cards/combineContainer.card.json');
const cardText = require('../../../display/layouts/rect/catalogue/cards/text.card.json');
const cardImage = require('../../../display/layouts/rect/catalogue/cards/image.card.json');
const cardLine = require('../../../display/layouts/rect/catalogue/cards/line.card.json');
const cardRoot = require('../../../display/layouts/rect/catalogue/cards/root.card.json');

function getCardTouch() {
    return cardTouch;
}

function getCardFrame() {
    return cardFrame;
}

function getCardCombineContainer() {
    return cardCombineContainer;
}

function getCardText() {
    return cardText;
}

function getCardImage() {
    return cardImage;
}

function getCardLine() {
    return cardLine;
}

function getcatalogueCard() {
    return createRoot();
}

function getCardRoot() {
    return cardRoot;
}

function createCombineContainer() {
    let combine = {};
    combine = getCardCombineContainer();
    combine.items = [];
    combine.items.push(getCardImage());
    combine.items.push(getCardText());
    combine.items.push(getCardLine());
    return combine;
}

function createFrame() {
    let gridFrame = {};
    gridFrame = getCardFrame();
    gridFrame.item = [];
    gridFrame.item.push(createCombineContainer());
    return gridFrame;
}

function createCard() {
    let touchWrap = {};
    touchWrap = getCardTouch();
    touchWrap.item = [];
    touchWrap.item.push(createFrame());
    return touchWrap;
}

function createRoot() {
    let gridCard = {};
    gridCard = getCardRoot();
    gridCard.Card.item = [];
    gridCard.Card.item.push(createCard());
    return gridCard;
}

exports.catalogueCard = {
    getcatalogueCard,
};
