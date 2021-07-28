const catalogueRoot = require('../../../display/layouts/catalogue/rootLayout.catalogue.json');
const catalogueHeader = require('../../../display/layouts/catalogue/header.catalogue.json');
const catalogueBackground = require('../../../display/layouts/catalogue/background.catalogue.json');
const catalogueFooter = require('../../../display/layouts/catalogue/footer.catalogue.json');
const catalogueGrid = require('../../../display/layouts/catalogue/grid.catalogue.json');
const catalogueDividerUp = require('../../../display/layouts/catalogue/dividerUp.catalogue.json');
const catalogueDividerDown = require('../../../display/layouts/catalogue/dividerDown.catalogue.json');

function getRoot() {
    return catalogueRoot;
}

function getHeader() {
    return catalogueHeader;
}

function getBackground() {
    return catalogueBackground;
}

function getFooter() {
    return catalogueFooter;
}

function getGrid() {
    return catalogueGrid;
}

function getDividerUp() {
    return catalogueDividerUp;
}

function getDividerDown() {
    return catalogueDividerDown;
}

exports.catalogue = {
    getRoot,
    getHeader,
    getFooter,
    getBackground,
    getGrid,
    getDividerDown,
    getDividerUp,
};
