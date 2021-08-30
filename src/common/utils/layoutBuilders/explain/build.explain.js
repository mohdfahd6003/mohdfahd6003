const { explain } = require('./getComponent.explain');

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

function explainPageCreaterRect() {
    console.log('inside explain page of rectangle');
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

function explainPageCreaterRound() {
    console.log('inside explain page of round');
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
exports.explainPage = {
    explainPageCreaterRect,
    explainPageCreaterRound,
};
