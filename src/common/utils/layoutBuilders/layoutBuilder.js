const {
    getWelcomeBackground,
    getWelcomeBody,
    getWelcomeFooter,
    getWelcomeRoot,
} = require('./welcomeLayouts');

const { catalogue } = require('./catalogueLayouts');
const pager = require('../../display/layouts/pager.json');
const { explainPage } = require('./explain/build.explain');

function commonPagerCreator() {
    const commonPagerContainer = { ...pager };
    commonPagerContainer.items = [];
    commonPagerContainer.items.push(welcomePageCreater());
    // to be replaced with catalogue page
    commonPagerContainer.items.push(explainPage.explainPageCreater());
    // replace the page with actual catalogue page
    return commonPagerContainer;
}

function welcomePageCreater() {
    let welcomeRootContainer = {};
    welcomeRootContainer = getWelcomeRoot();
    welcomeRootContainer.items = [];
    welcomeRootContainer.items.push(getWelcomeBackground());
    welcomeRootContainer.items.push(getWelcomeBody());
    welcomeRootContainer.items.push(getWelcomeFooter());
    return welcomeRootContainer;
}

function getRectangleLayout(isWelcome) {
    const rectMainLayout = [];
    if (isWelcome) {
        rectMainLayout.push(commonPagerCreator());
    } else {
        rectMainLayout.push(explainPage.explainPageCreater());
    }
    return rectMainLayout;
}

module.exports = {
    getRectangleLayout,
};
