const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const { configData, assets, renderGeneralFunction } = require('../../common/util');

const poisonImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images['poison.control']
}`;

const noseBleedData = require('../../common/content/poison.content.json');

const { speakText, title, primaryText, secondaryText, tertiaryText } = noseBleedData;

class PoisoningRequestAct extends RequestValueAct {
    constructor(control, payload) {
        super(control, payload);
        this.speakText = speakText;
    }

    render(input, responseBuilder) {
        responseBuilder = renderGeneralFunction(
            input,
            responseBuilder,
            this.speakText,
            poisonImage,
            title,
            primaryText + secondaryText + tertiaryText
        );
    }
}

class PoisonControl extends Control {
    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        return InputUtil.isIntent(input, 'poisonIntent');
    }

    handle(input, resultBuilder) {
        resultBuilder.addAct(new PoisoningRequestAct(this, {}));
    }

    canTakeInitiative() {
        return false;
    }
}
module.exports = PoisonControl;
