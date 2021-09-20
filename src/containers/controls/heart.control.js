const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const { configData, assets, sendResponse } = require('../../common/utils/util');

const heartData = require('../../common/content/heart.content.json');

const { speakText, title, primaryText, secondaryText, tertiaryText, shortText } = heartData;

const heartImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images.heartControl
}`;

const { logger } = require('../../logging/logger');

class HeartRequestAct extends RequestValueAct {
    constructor(control, payload) {
        super(control, payload);
        this.speakText = speakText;
    }

    render(input, responseBuilder) {
        responseBuilder = sendResponse(
            input,
            responseBuilder,
            this.speakText,
            heartImage,
            title,
            primaryText + secondaryText + tertiaryText,
            shortText
        );
    }
}

class HeartControl extends Control {
    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        return (
            InputUtil.isIntent(input, 'heartWarningSignsIntent') ||
            (InputUtil.isAPLUserEventWithArgs(input) &&
                input.request.source.id === 'heartControl') ||
            (InputUtil.isAPLUserEventWithArgs(input) &&
                input.request.arguments[2] === 'heartControl')
        );
    }

    handle(input, resultBuilder) {
        /* logger.log({
            level: 'info',
            message: 'Inside heart',
            requestId: input.request.requestId,
            intentType: input.request.type,
            intentName: input.request.intent.name,
            locale: input.request.locale,
            timestamp: input.request.timestamp,
        }); */
        resultBuilder.addAct(new HeartRequestAct(this, {}));
    }

    canTakeInitiative() {
        return false;
    }
}
module.exports = HeartControl;
