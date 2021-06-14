const ahaStyle = require('../display/styles/ahaStyle.json');

const layouts = require('./layoutBuilder');

const { getResources } = require('./resourceBuilder');

function generateDocument() {
    const document = {
        type: 'APL',
        version: '1.6',
        description: 'AHA alexa skill',
        import: getImports(),
        mainTemplate: getMainTemplate(),
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
            name: 'alexa-styles',
            version: '1.2.0',
        },
    ];
}
function getStyles() {
    return ahaStyle;
}
function getMainTemplate() {
    const mainTemplate = {
        parameters: ['payload'],
        items: [
            {
                type: 'Container',
                when: "${viewport.shape == 'rectangle'}",
                item: layouts.getRectangleContainer(),
            },
            {
                type: 'Container',
                when: "${viewport.shape == 'round'}",
                item: layouts.getRoundContainer(),
            },
        ],
    };
    return mainTemplate;
}

exports.generateDocument = generateDocument;
