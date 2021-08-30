const { welcomePage } = require('./welcome/build.welcome');
const { cataloguePage } = require('./catalogue/build.catalogue');
const pager = require('../../display/layouts/rect/pager.json');
const { explainPage } = require('./explain/build.explain');
const { introductionPage } = require('./introduction/build.introduction');

function commonPagerCreator() {
    const commonPagerContainer = { ...pager };
    commonPagerContainer.items = [];
    commonPagerContainer.items.push(welcomePage.welcomePageCreater());
    commonPagerContainer.items.push(introductionPage.introductionPageCreater());
    commonPagerContainer.items.push(cataloguePage.cataloguePageCreater());
    return commonPagerContainer;
}

function getRectangleLayout(isWelcome) {
    const rectMainLayout = [];
    console.log('creating rectangle layout');
    if (isWelcome) {
        rectMainLayout.push(commonPagerCreator());
    } else {
        rectMainLayout.push(explainPage.explainPageCreater());
    }
    return rectMainLayout;
}

function getRoundLayout(isWelcome) {
    console.log('creating round layout');
    const roundMainLayout = [];
    if (isWelcome) {
        roundMainLayout.push(commonPagerCreator());
    } else {
        roundMainLayout.push(explainPage.explainPageCreater());
    }
    return roundMainLayout;
}

module.exports = {
    getRectangleLayout,
    getRoundLayout,
};
