const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const { configData, assets, sendResponse } = require('../../common/utils/util');

const dehydrationImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images.dehydrationControl
}`;

const dehydrationData = require('../../common/content/dehydration.content.json');

const { speakText, title, primaryText, secondaryText, tertiaryText, shortText } = dehydrationData;

class DehydrationRequestAct extends RequestValueAct {
    constructor(control, payload) {
        super(control, payload);
        this.speakText = speakText;
    }

    render(input, responseBuilder) {
        responseBuilder = sendResponse(
            input,
            responseBuilder,
            this.speakText,
            dehydrationImage,
            title,
            primaryText + secondaryText + tertiaryText,
            shortText
        );
    }
}

class Dehydration extends Control {
    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        return (
            InputUtil.isIntent(input, 'dehydrationIntent') ||
            (InputUtil.isAPLUserEventWithArgs(input) &&
                input.request.source.id === 'dehydrationControl') ||
            (InputUtil.isAPLUserEventWithArgs(input) &&
                input.request.arguments[2] === 'dehydrationControl')
        );
    }

    handle(input, resultBuilder) {
        resultBuilder.addAct(new DehydrationRequestAct(this, {}));
    }

    canTakeInitiative() {
        return false;
    }
}
module.exports = Dehydration;
