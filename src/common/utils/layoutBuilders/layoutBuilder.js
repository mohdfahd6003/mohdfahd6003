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
        rectMainLayout.push(rectExplainRoot);
    }
    return rectMainLayout;
}

module.exports = {
    getRectangleLayout,
};
