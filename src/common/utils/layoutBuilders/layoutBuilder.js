const { welcomePage } = require('./welcomeLayouts');

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

function welcomePageBodyCreater() {
    let welcomeBody = {};
    welcomeBody = welcomePage.getWelcomeBody();
    welcomeBody.items = [];
    welcomeBody.items.push(welcomePage.getWelcomeBodyImage());
    welcomeBody.items.push(welcomePage.getWelcomeBodyWindow());
    return welcomeBody;
}

function welcomePageCreater() {
    let welcomeRootContainer = {};
    welcomeRootContainer = welcomePage.getWelcomeRoot();
    welcomeRootContainer.items = [];
    welcomeRootContainer.items.push(welcomePage.getWelcomeBackground());
    welcomeRootContainer.items.push(welcomePageBodyCreater());
    welcomeRootContainer.items.push(welcomePage.getWelcomeFooter());
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
