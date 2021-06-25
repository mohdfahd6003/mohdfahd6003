const {
    getWelcomeRectBackground,
    getWelcomeRectHeader,
    getWelcomeRectMain,
    getWelcomeRectFooter,
    getWelcomeRectRoot,
} = require('./welcomeLayouts');

const {
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
} = require('./explainLayouts');

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
    const explainTextImage = getRectTextImage();
    explainTextImage.items.push(getRectMainText());
    explainTextImage.items.push(getRectMainImage());
    return explainTextImage;
}

function explainBodyCoreCreator() {
    const explainBodyCore = getRectBodyCore();
    explainBodyCore.items.push(getRectTitle());
    explainBodyCore.items.push(explainTextImageCreator());
    return explainBodyCore;
}
function explainBodyWrapCreater() {
    const explainBodyWrap = getRectBodyWrap();
    explainBodyWrap.items.push(explainBodyCoreCreator());
    return explainBodyWrap;
}

function explainPageCreater() {
    let explainRoot = {};
    explainRoot = getRectRoot();
    explainRoot.items = [];
    explainRoot.items.push(getRectBackground());
    explainRoot.items.push(getRectHeader());
    explainRoot.items.push(explainBodyWrapCreater());
    explainRoot.items.push(getRectFooter());
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
