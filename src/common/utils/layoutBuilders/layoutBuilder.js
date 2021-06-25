const {
    getWelcomeRectBackground,
    getWelcomeRectHeader,
    getWelcomeRectMain,
    getWelcomeRectFooter,
    getWelcomeRectRoot,
} = require('./welcomeLayouts');

const { explain } = require('./explainLayouts');

function welcomePageCreater() {
    let welcomeRootContainer = {};
    welcomeRootContainer = getWelcomeRectRoot();
    welcomeRootContainer.items = [];
    welcomeRootContainer.items.push(getWelcomeRectBackground());
    welcomeRootContainer.items.push(getWelcomeRectHeader());
    welcomeRootContainer.items.push(getWelcomeRectMain());
    welcomeRootContainer.items.push(getWelcomeRectFooter());
    return welcomeRootContainer;
}
function explainTextImageCreator() {
    const explainTextImage = explain.getTextImage();
    explainTextImage.items.push(explain.getMainText());
    explainTextImage.items.push(explain.getMainImage());
    return explainTextImage;
}

function explainBodyCoreCreator() {
    const explainBodyCore = explain.getBodyCore();
    explainBodyCore.items.push(explain.getTitle());
    explainBodyCore.items.push(explainTextImageCreator());
    return explainBodyCore;
}
function explainBodyWrapCreater() {
    const explainBodyWrap = explain.getBodyWrap();
    explainBodyWrap.items.push(explainBodyCoreCreator());
    return explainBodyWrap;
}

function explainPageCreater() {
    let explainRoot = {};
    explainRoot = explain.getRoot();
    explainRoot.items = [];
    explainRoot.items.push(explain.getBackground());
    explainRoot.items.push(explain.getHeader());
    explainRoot.items.push(explainBodyWrapCreater());
    explainRoot.items.push(explain.getFooter());
    return explainRoot;
}

function getRectangleLayout(isWelcome) {
    const rectMainLayout = [];
    if (isWelcome) {
        rectMainLayout.push(welcomePageCreater());
    } else {
        rectMainLayout.push(explainPageCreater());
    }
    return rectMainLayout;
}

module.exports = {
    getRectangleLayout,
};
