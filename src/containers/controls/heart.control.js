const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const {
    prepareScreenContent,
    imageCatalog,
    displayTemplate,
    displayDirective,
    repeatText,
    speakText,
    configData,
    assets,
    renderGeneralFunction,
} = require('../../common/util');

const { heartAttackText } = speakText;

const heartImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images['heart.control']
}`;

class HeartRequestAct extends RequestValueAct {
    constructor(control, payload) {
        super(control, payload);
        this.speakText = heartAttackText;
    }

    render(input, responseBuilder) {
        responseBuilder = renderGeneralFunction(
            input,
            responseBuilder,
            this.speakText,
            heartImage,
            'warning signs of a heart attack',
            this.speakText
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
