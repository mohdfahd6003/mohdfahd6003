const { welcomePage } = require('./welcome/build.welcome');
const { cataloguePage } = require('./catalogue/build.catalogue');
const rectPager = require('../../display/layouts/rect/pager.rect.json');
const roundPager = require('../../display/layouts/round/pager.round.json');
const { explainPage } = require('./explain/build.explain');
const { introductionPage } = require('./introduction/build.introduction');

function rectCommonPagerCreator() {
    const commonPagerContainer = { ...rectPager };
    commonPagerContainer.items = [];
    commonPagerContainer.items.push(welcomePage.welcomePageCreaterRect());
    commonPagerContainer.items.push(introductionPage.introductionPageCreater());
    commonPagerContainer.items.push(cataloguePage.cataloguePageCreaterRect());
    return commonPagerContainer;
}
function roundCommonPagerCreator() {
    const commonPagerContainer = { ...roundPager };
    commonPagerContainer.items = [];
    commonPagerContainer.items.push(welcomePage.welcomePageCreaterRound());
    commonPagerContainer.items.push(cataloguePage.cataloguePageCreaterRound());
    return commonPagerContainer;
}
function getRectangleLayout(isWelcome) {
    const rectMainLayout = [];
    if (isWelcome) {
        rectMainLayout.push(rectCommonPagerCreator());
    } else {
        rectMainLayout.push(explainPage.explainPageCreaterRect());
    }
    return rectMainLayout;
}

function getRoundLayout(isWelcome) {
    const roundMainLayout = [];
    if (isWelcome) {
        roundMainLayout.push(roundCommonPagerCreator());
    } else {
        roundMainLayout.push(explainPage.explainPageCreaterRound());
    }
    return roundMainLayout;
}

module.exports = {
    getRectangleLayout,
    getRoundLayout,
};
