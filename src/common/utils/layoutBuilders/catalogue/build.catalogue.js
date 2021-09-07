const { catalogue } = require('./getComponent.catalogue');
const { roundCatalogue } = require('./getRoundTextList.catalogue');

function cataloguePageCreaterRect() {
    let catalogueRoot = {};
    catalogueRoot = catalogue.getRoot();
    catalogueRoot.items = [];
    catalogueRoot.items.push(catalogue.getBackground());
    catalogueRoot.items.push(catalogue.getHeader());
    catalogueRoot.items.push(catalogue.getGrid());
    catalogueRoot.items.push(catalogue.getFooter());
    return catalogueRoot;
}

function cataloguePageCreaterRound() {
    let roundCatalogueRoot = {};
    roundCatalogueRoot = roundCatalogue.getRoundCatalogueRoot();
    return roundCatalogueRoot;
}
exports.cataloguePage = {
    cataloguePageCreaterRect,
    cataloguePageCreaterRound,
};
