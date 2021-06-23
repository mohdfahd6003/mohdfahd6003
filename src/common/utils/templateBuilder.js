const ahaStyle = require('../display/styles/ahaStyle.json');

const layouts = require('./layoutBuilder');

const { getResources } = require('./resourceBuilder');

function generateDocument(isWelcome) {
    const document = {
        type: 'APL',
        version: '1.6',
        description: 'AHA alexa skill',
        import: getImports(),
        mainTemplate: getMainTemplate(isWelcome),
        settings: getAplConfig(),
        styles: getStyles(),
        resources: getResources(),
    };
    return document;
}

function getAplConfig() {
    const settings = { supportsResizing: true };
    return settings;
}
function getImports() {
    return [
        {
            name: 'alexa-layouts',
            version: '1.3.0',
        },
        {
            name: 'alexa-styles',
            version: '1.2.0',
        },
        {
            name: 'alexa-viewport-profiles',
            version: '1.2.0',
        },
    ];
}
function getStyles() {
    return ahaStyle;
}
function getMainTemplate(isWelcome) {
    const mainTemplate = {
        parameters: ['payload'],
        items: [
            {
                type: 'Container',
                when: "${viewport.shape == 'rectangle'}",
                item: layouts.getRectangleLayout(isWelcome),
            },
            {
                type: 'Container',
                when: "${viewport.shape == 'round'}",
                item: layouts.getRoundLayout(isWelcome),
            },
        ],
    };
    return mainTemplate;
}

exports.generateDocument = generateDocument;
