const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const { configData, assets, renderGeneralFunction } = require('../../common/util');

const heartData = require('../../common/content/heart.content.json');

const { speakText, title, primaryText, secondaryText, tertiaryText } = heartData;

const heartImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images['heart.control']
}`;

class HeartRequestAct extends RequestValueAct {
    constructor(control, payload) {
        super(control, payload);
        this.speakText = speakText;
    }

    render(input, responseBuilder) {
        responseBuilder = renderGeneralFunction(
            input,
            responseBuilder,
            this.speakText,
            heartImage,
            title,
            primaryText + secondaryText + tertiaryText
        );
    }
}

class HeartControl extends Control {
    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        return InputUtil.isIntent(input, 'heartWarningSignsIntent');
    }

    handle(input, resultBuilder) {
        resultBuilder.addAct(new HeartRequestAct(this, {}));
    }

    canTakeInitiative() {
        return false;
    }
}
module.exports = HeartControl;
