const { getRectCardResource } = require('./resources/rect/card.resource.rect');
const { getRectResolutionResource } = require('./resources/rect/resolution.resource.rect');
const { getRectIntroductionResource } = require('./resources/rect/introduction.resource.rect');
const { getRectWelcomeResource } = require('./resources/rect/welcome.resource.rect');
const { getRectExplainResource } = require('./resources/rect/explain.resource.rect');

function getRectResources() {
    const allResource = [];
    return allResource
        .concat(getRectResolutionResource())
        .concat(getRectWelcomeResource())
        .concat(getRectIntroductionResource())
        .concat(getRectCardResource())
        .concat(getRectExplainResource());
}
function getRoundResources() {
    const allResource = [];
    return allResource
        .concat(getRectResolutionResource())
        .concat(getRectWelcomeResource())
        .concat(getRectIntroductionResource())
        .concat(getRectCardResource())
        .concat(getRectExplainResource());
}

module.exports = { getRectResources, getRoundResources };
