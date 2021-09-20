const { explainRect } = require('./getRect.explain');
const { explainRound } = require('./getRound.expain');

function explainPageCreaterRect() {
    console.log('inside explain page of rectangle');
    let explainRoot = {};
    explainRoot = explainRect.getRootRect();
    return explainRoot;
}

function explainPageCreaterRound() {
    console.log('inside explain page of round');
    let explainRoot = {};
    explainRoot = explainRound.getRoundExplainRoot();
    return explainRoot;
}
exports.explainPage = {
    explainPageCreaterRect,
    explainPageCreaterRound,
};
