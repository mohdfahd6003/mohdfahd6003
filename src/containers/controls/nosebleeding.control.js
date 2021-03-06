const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const { configData, assets, sendResponse } = require('../../common/utils/util');

const nosebleedImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images.nosebleedingControl
}`;

const noseBleedData = require('../../common/content/nosebleed.content.json');

const { speakText, title, primaryText, secondaryText, tertiaryText, shortText } = noseBleedData;

class NosebleedingRequestAct extends RequestValueAct {
    constructor(control, payload) {
        super(control, payload);
        this.speakText = speakText;
    }

    render(input, responseBuilder) {
        responseBuilder = sendResponse(
            input,
            responseBuilder,
            this.speakText,
            nosebleedImage,
            title,
            primaryText + secondaryText + tertiaryText,
            shortText
        );
    }
}

class NoseBleeding extends Control {
    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        return (
            InputUtil.isIntent(input, 'noseIntent') ||
            (InputUtil.isAPLUserEventWithArgs(input) &&
                input.request.source.id === 'nosebleedingControl') ||
            (InputUtil.isAPLUserEventWithArgs(input) &&
                input.request.arguments[2] === 'nosebleedingControl')
        );
    }

    handle(input, resultBuilder) {
        resultBuilder.addAct(new NosebleedingRequestAct(this, {}));
    }

    canTakeInitiative() {
        return false;
    }
}
module.exports = NoseBleeding;
