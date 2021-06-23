const rectHeader = require('../display/layouts/rectangle/header.rectangle.json');
const rectTitle = require('../display/layouts/rectangle/title.rectangle.json');
const rectImage = require('../display/layouts/rectangle/image.rectangle.json');
const rectMainText = require('../display/layouts/rectangle/mainText.rectangle.json');
const rectBackground = require('../display/layouts/rectangle/background.rectangle.json');
const rectFooter = require('../display/layouts/rectangle/footer.rectangle.json');

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
    isWelcome = true;
    if (isWelcome) {
        const rectRoot = getWelcomeRectRoot();
        rectRoot.items.push(getWelcomeRectBackground());
        rectRoot.items.push(getWelcomeRectHeader());
        rectRoot.items.push(getWelcomeRectMain());
        rectRoot.items.push(getWelcomeRectFooter());
        rectMainLayout.push(rectRoot);
    } else {
        rectMainLayout.push(getRectBackground());
        rectMainLayout.push(getRectMainImage());
        rectMainLayout.push(getRectHeader());
        rectMainLayout.push(getRectTitle());
        rectMainLayout.push(getRectMainText());
        rectMainLayout.push(getRectFooter());
    }
    return rectMainLayout;
}

module.exports = {
    getRectangleLayout,
};
