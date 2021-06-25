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
    let rectWelcomeRootContainer = {};
    rectWelcomeRootContainer = getWelcomeRectRoot();
    rectWelcomeRootContainer.items = [];
    rectWelcomeRootContainer.items.push(getWelcomeRectBackground());
    rectWelcomeRootContainer.items.push(getWelcomeRectHeader());
    rectWelcomeRootContainer.items.push(getWelcomeRectMain());
    rectWelcomeRootContainer.items.push(getWelcomeRectFooter());
    return rectWelcomeRootContainer;
}

function explainPageCreater() {
    const rectExplainTextImage = getRectTextImage();
    rectExplainTextImage.items.push(getRectMainText());
    rectExplainTextImage.items.push(getRectMainImage());
    const rectExplainBodyCore = getRectBodyCore();
    rectExplainBodyCore.items.push(getRectTitle());
    rectExplainBodyCore.items.push(rectExplainTextImage);
    const rectExplainBodyWrap = getRectBodyWrap();
    rectExplainBodyWrap.items.push(rectExplainBodyCore);
    let rectExplainRoot = {};
    rectExplainRoot = getRectRoot();
    rectExplainRoot.items = [];
    rectExplainRoot.items.push(getRectBackground());
    rectExplainRoot.items.push(getRectHeader());
    rectExplainRoot.items.push(rectExplainBodyWrap);
    rectExplainRoot.items.push(getRectFooter());
    return rectExplainRoot;
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
