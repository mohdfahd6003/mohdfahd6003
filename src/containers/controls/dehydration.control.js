const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const {
    prepareScreenContent,
    configData,
    assets,
    speakText,
    renderGeneralFunction,
} = require('../../common/util');

const dehydrationImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images['dehydration.control']
}`;

const { dehydrationText } = speakText;

class DehydrationRequestAct extends RequestValueAct {
    constructor(control, payload) {
        super(control, payload);
        this.speakText = dehydrationText;
    }

    render(input, responseBuilder) {
        responseBuilder = renderGeneralFunction(
            input,
            responseBuilder,
            this.speakText,
            dehydrationImage,
            'dehydration',
            this.speakText
        );
    }
}

class Dehydration extends Control {
    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        return InputUtil.isIntent(input, 'dehydrationIntent');
    }

    handle(input, resultBuilder) {
        resultBuilder.addAct(new DehydrationRequestAct(this, {}));
    }

    canTakeInitiative() {
        return false;
    }
}
module.exports = Dehydration;
