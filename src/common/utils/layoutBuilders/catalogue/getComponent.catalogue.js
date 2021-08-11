const catalogueRoot = require('../../../display/layouts/catalogue/rootLayout.catalogue.json');
const catalogueHeader = require('../../../display/layouts/catalogue/header.catalogue.json');
const catalogueBackground = require('../../../display/layouts/catalogue/background.catalogue.json');
const catalogueFooter = require('../../../display/layouts/catalogue/footer.catalogue.json');
const catalogueGrid = require('../../../display/layouts/catalogue/grid.catalogue.json');

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

exports.catalogue = {
    getRoot,
    getHeader,
    getFooter,
    getBackground,
    getGrid,
};
