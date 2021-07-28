const { welcomePage } = require('./welcome/build.welcome');
const { catalogue } = require('./catalogueLayouts');
const pager = require('../../display/layouts/pager.json');
const { explainPage } = require('./explain/build.explain');
const { introductionPage } = require('./introduction/build.introduction');

function commonPagerCreator() {
    const commonPagerContainer = { ...pager };
    commonPagerContainer.items = [];
    commonPagerContainer.items.push(welcomePage.welcomePageCreater());
    commonPagerContainer.items.push(introductionPage.introductionPageCreater());
    commonPagerContainer.items.push(catalogue.getRoot());
    return commonPagerContainer;
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
