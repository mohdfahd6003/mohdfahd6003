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

function flushPrevComponents(rootComponent) {
    rootComponent.items.length = 0;
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
        let rectExplainRoot = {};
        rectExplainRoot = getRectRoot();
        rectExplainRoot.items = [];
        console.log('starting');
        console.log(rectExplainRoot);
        rectExplainRoot.items.push(getRectBackground());
        console.log('added background');
        console.log(rectExplainRoot);
        rectExplainRoot.items.push(getRectHeader());
        console.log('added header');
        console.log(rectExplainRoot);
        rectExplainRoot.items.push(rectExplainBodyWrap);
        console.log('added body wrap');
        console.log(rectExplainRoot);
        rectExplainRoot.items.push(getRectFooter());
        console.log('added footer');
        console.log(rectExplainRoot);
        rectMainLayout.push(rectExplainRoot);
    }
    return rectMainLayout;
}

module.exports = {
    getRectangleLayout,
};
