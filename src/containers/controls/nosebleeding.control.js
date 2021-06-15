const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const { configData, assets, sendResponse } = require('../../common/utils/util');

const nosebleedImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images['nosebleeding.control']
}`;

const noseBleedData = require('../../common/content/nosebleed.content.json');

const { speakText, title, primaryText, secondaryText, tertiaryText } = noseBleedData;

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
            primaryText + secondaryText + tertiaryText
        );
    }
}

class NoseBleeding extends Control {
    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        return InputUtil.isIntent(input, 'noseIntent');
    }

    handle(input, resultBuilder) {
        resultBuilder.addAct(new NosebleedingRequestAct(this, {}));
    }

    canTakeInitiative() {
        return false;
    }
}
module.exports = NoseBleeding;
