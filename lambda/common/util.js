const displayDirective = 'Alexa.Presentation.APL.RenderDocument';
const displayTemplate = require('./content/commonAPL.json');
const speakText = require('./content/constants.json');

const { repeatText } = speakText;
const imageCatalog = require('./content/assets.json');
const dataTemplate = require('./content/dataTemplate.json');

function prepareScreenContent(primaryText, bodyText, mainImage) {
    dataTemplate.content.primaryText = primaryText;
    dataTemplate.content.bodyText = bodyText;
    dataTemplate.content.mainImage = mainImage;
    return dataTemplate;
}

module.exports = {
    prepareScreenContent,
    displayDirective,
    displayTemplate,
    speakText,
    repeatText,
    imageCatalog,
};
