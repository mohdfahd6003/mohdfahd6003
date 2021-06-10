const roundHeader = require('../display/templates/round/header.round.json');
const roundTitle = require('../display/templates/round/title.round.json');
const roundImage = require('../display/templates/round/image.round.json');
const roundMainText = require('../display/templates/round/mainText.round.json');

const rectHeader = require('../display/templates/rectangle/header.rectangle.json');
const rectTitle = require('../display/templates/rectangle/title.rectangle.json');
const rectImage = require('../display/templates/rectangle/image.rectangle.json');
const rectMainText = require('../display/templates/rectangle/mainText.rectangle.json');

const rectStyle = require('../display/styles/rectangle.json');

function generateDocument() {
    const document = {
        type: 'APL',
        version: '1.6',
        description: 'AHA alexa skill',
        import: getImports(),
        mainTemplate: getMainTemplate(),
        settings: getAplConfig(),
        styles: getStyles(),
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
    return rectStyle; /* {
        rectangleWelcomeStyles: {
            description: 'Basic styling for rectangle welcome screens',
            values: [
                {
                    color: 'blue',
                },
            ],
        },
    }; */
}
function getMainTemplate() {
    const mainTemplate = {
        parameters: ['payload'],
        items: [
            {
                type: 'Container',
                when: "${viewport.shape == 'rectangle'}",
                item: getRectangleContainer(),
            },
            {
                type: 'Container',
                when: "${viewport.shape == 'round'}",
                item: getRoundContainer(),
            },
        ],
    };
    return mainTemplate;
}

function getRectangleContainer() {
    const rectContainer = [];
    rectContainer.push(getRectMainImage());
    rectContainer.push(getRectHeader());
    rectContainer.push(getRectTitle());
    rectContainer.push(getRectMainText());

    return rectContainer;
}

function getRoundContainer() {
    const roundContainer = [];
    roundContainer.push(getRoundMainImage());
    roundContainer.push(getRoundHeader());
    roundContainer.push(getRoundTitle());
    roundContainer.push(getRoundMainText());
    return roundContainer;
}

function getRoundHeader() {
    return roundHeader;
}

function getRoundTitle() {
    return roundTitle;
}
function getRoundMainImage() {
    return roundImage;
}

function getRoundMainText() {
    return roundMainText;
}

function getRectHeader() {
    return rectHeader;
}

function getRectTitle() {
    return rectTitle;
}
function getRectMainImage() {
    return rectImage;
}

function getRectMainText() {
    return rectMainText;
}
exports.generateDocument = generateDocument;
