const ahaStyle = require('../display/styles/ahaStyle.json');

const layouts = require('./layoutBuilders/layoutBuilder');

const { getResources } = require('./resourceBuilder');

function generateDocument(isWelcome) {
    let document = {};
    document = {
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

function getLayouts(isWelcome) {
    const itemArray = [];
    const layout = {};
    layout.type = 'Container';
    layout.item = [];
    layout.item = layouts.getRectangleLayout(isWelcome);
    itemArray.push(layout);
    return itemArray;
}
function getMainTemplate(isWelcome) {
    let mainTemplate = {};
    mainTemplate = {
        parameters: ['payload'],
        items: getLayouts(isWelcome),
    };
    return mainTemplate;
}

exports.generateDocument = generateDocument;
