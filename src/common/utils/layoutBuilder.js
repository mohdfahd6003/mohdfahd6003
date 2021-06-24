const rectHeader = require('../display/layouts/rectangle/explain/header.rectangle.json');
const rectTitle = require('../display/layouts/rectangle/explain/title.rectangle.json');
const rectImage = require('../display/layouts/rectangle/explain/image.rectangle.json');
const rectMainText = require('../display/layouts/rectangle/explain/mainText.rectangle.json');
const rectBackground = require('../display/layouts/rectangle/explain/background.rectangle.json');
const rectFooter = require('../display/layouts/rectangle/explain/footer.rectangle.json');
const rectRoot = require('../display/layouts/rectangle/explain/rootLayout.rectangle.json');
const rectTextImage = require('../display/layouts/rectangle/explain/textImageContainer.rectangle.json');
const rectBodyCore = require('../display/layouts/rectangle/explain/bodyCore.rectangle.json');
const rectBodyWrap = require('../display/layouts/rectangle/explain/bodyWrap.rectangle.json');

const rectWelcomeHeader = require('../display/layouts/rectangle/welcome/header.welcome.json');
const rectWelcomeBackground = require('../display/layouts/rectangle/welcome/background.welcome.json');
const rectWelcomeFooter = require('../display/layouts/rectangle/welcome/footer.welcome.json');
const rectWelcomeMain = require('../display/layouts/rectangle/welcome/main.welcome.json');
const rectWelcomeRoot = require('../display/layouts/rectangle/welcome/rootLayout.welcome.json');

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

function getWelcomeRectBackground() {
    return rectWelcomeBackground;
}

function getWelcomeRectHeader() {
    return rectWelcomeHeader;
}

function getWelcomeRectMain() {
    return rectWelcomeMain;
}

function getWelcomeRectFooter() {
    return rectWelcomeFooter;
}

function getWelcomeRectRoot() {
    return rectWelcomeRoot;
}

function getRectangleLayout(isWelcome) {
    const rectMainLayout = [];
    if (isWelcome) {
        const rectWelcomeRootContainer = getWelcomeRectRoot();
        rectWelcomeRootContainer.items.push(getWelcomeRectBackground());
        rectWelcomeRootContainer.items.push(getWelcomeRectHeader());
        rectWelcomeRootContainer.items.push(getWelcomeRectMain());
        rectWelcomeRootContainer.items.push(getWelcomeRectFooter());
        rectMainLayout.push(rectWelcomeRootContainer);
    } else {
        const rectExplainTextImage = getRectTextImage();
        rectExplainTextImage.items.push(getRectMainText());
        rectExplainTextImage.items.push(getRectMainImage());
        const rectExplainBodyCore = getRectBodyCore();
        rectExplainBodyCore.items.push(getRectTitle());
        rectExplainBodyCore.items.push(rectExplainTextImage);
        const rectExplainBodyWrap = getRectBodyWrap();
        rectExplainBodyWrap.items.push(rectExplainBodyCore);
        const rectExplainRoot = getRectRoot(rectExplainBodyWrap);
        rectExplainRoot.items.push(getRectBackground());
        rectExplainRoot.items.push(getRectHeader());
        rectExplainRoot.items.push(rectExplainBodyWrap);
        rectExplainRoot.items.push(getRectFooter());
        console.log(rectExplainRoot);
        rectMainLayout.push(rectExplainRoot);
    }
    return rectMainLayout;
}

module.exports = {
    getRectangleLayout,
};
