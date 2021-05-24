const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const { configData, assets, renderGeneralFunction } = require('../../common/util');

const { strokeText } = speakText;
const strokeImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images['stroke.control']
}`;

const StrokeData = require('../../common/content/strokes.content.json');

const { speakText, title, primaryText, secondaryText, tertiaryText } = StrokeData;

class StrokeRequestAct extends RequestValueAct {
    constructor(control, payload) {
        super(control, payload);
        this.speakText = speakText;
    }

    render(input, responseBuilder) {
        responseBuilder = renderGeneralFunction(
            input,
            responseBuilder,
            this.speakText,
            strokeImage,
            title,
            primaryText + secondaryText + tertiaryText
        );
    }
}

class StrokeControl extends Control {
    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        return InputUtil.isIntent(input, 'strokeIntent');
    }

    handle(input, resultBuilder) {
        resultBuilder.addAct(new StrokeRequestAct(this, {}));
    }

    canTakeInitiative() {
        return false;
    }
}
module.exports = StrokeControl;
