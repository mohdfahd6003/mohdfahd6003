const { getCardResource } = require('./resources/card.resource');
const { getResolutionResource } = require('./resources/resolution.resource');
const { getIntroductionResource } = require('./resources/introduction.resource');

function getResources() {
    const allResource = [];
    return allResource
        .concat(getResolutionResource())
        .concat(getIntroductionResource())
        .concat(getCardResource());
}

exports.getResources = getResources;
