const {
    getWelcomeBackground,
    getWelcomeHeader,
    getWelcomeMain,
    getWelcomeFooter,
    getWelcomeRoot,
} = require('./welcomeLayouts');

const { explain } = require('./explainLayouts');
const { catalogue } = require('./catalogueLayouts');
const pager = require('../../display/layouts/pager.json');

function commonPagerCreator() {
    const commonPagerContainer = { ...pager };
    commonPagerContainer.items = [];
    commonPagerContainer.items.push(welcomePageCreater());
    commonPagerContainer.items.push(explainPageCreater());
    return commonPagerContainer;
}

function welcomePageCreater() {
    let welcomeRootContainer = {};
    welcomeRootContainer = getWelcomeRoot();
    welcomeRootContainer.items = [];
    welcomeRootContainer.items.push(getWelcomeBackground());
    welcomeRootContainer.items.push(getWelcomeHeader());
    welcomeRootContainer.items.push(getWelcomeMain());
    welcomeRootContainer.items.push(getWelcomeFooter());
    return welcomeRootContainer;
}
function explainTextImageCreator() {
    const explainTextImage = explain.getTextImage();
    explainTextImage.items = [];
    explainTextImage.items.push(explain.getMainText());
    explainTextImage.items.push(explain.getMainImage());
    return explainTextImage;
}

function explainBodyCoreCreator() {
    const explainBodyCore = explain.getBodyCore();
    explainBodyCore.items = [];
    explainBodyCore.items.push(explain.getTitle());
    explainBodyCore.items.push(explainTextImageCreator());
    return explainBodyCore;
}
function explainBodyWrapCreater() {
    const explainBodyWrap = explain.getBodyWrap();
    explainBodyWrap.items = [];
    explainBodyWrap.items.push(explainBodyCoreCreator());
    return explainBodyWrap;
}

function explainPageCreater() {
    let explainRoot = {};
    explainRoot = explain.getRoot();
    explainRoot.items = [];
    explainRoot.items.push(explain.getBackground());
    explainRoot.items.push(explain.getHeader());
    explainRoot.items.push(explain.getDividerUp());
    explainRoot.items.push(explainBodyWrapCreater());
    explainRoot.items.push(explain.getDividerDown());
    explainRoot.items.push(explain.getFooter());
    return explainRoot;
}

function getRectangleLayout(isWelcome) {
    const rectMainLayout = [];
    if (isWelcome) {
        rectMainLayout.push(commonPagerCreator());
    } else {
        rectMainLayout.push(explainPageCreater());
    }
    return rectMainLayout;
}

module.exports = {
    getRectangleLayout,
};
