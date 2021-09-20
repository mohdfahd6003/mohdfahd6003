const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const { configData, assets, sendResponse } = require('../../common/utils/util');

const strokeImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images.strokeControl
}`;

const StrokeData = require('../../common/content/strokes.content.json');

const { speakText, title, primaryText, secondaryText, tertiaryText, shortText } = StrokeData;

class StrokeRequestAct extends RequestValueAct {
    constructor(control, payload) {
        super(control, payload);
        this.speakText = speakText;
    }

    render(input, responseBuilder) {
        responseBuilder = sendResponse(
            input,
            responseBuilder,
            this.speakText,
            strokeImage,
            title,
            primaryText + secondaryText + tertiaryText,
            shortText
        );
    }
}

class StrokeControl extends Control {
    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        return (
            InputUtil.isIntent(input, 'strokeIntent') ||
            (InputUtil.isAPLUserEventWithArgs(input) &&
                input.request.source.id === 'strokeControl') ||
            (InputUtil.isAPLUserEventWithArgs(input) &&
                input.request.arguments[2] === 'strokeControl')
        );
    }

    handle(input, resultBuilder) {
        resultBuilder.addAct(new StrokeRequestAct(this, {}));
    }

    canTakeInitiative() {
        return false;
    }
}
module.exports = StrokeControl;
