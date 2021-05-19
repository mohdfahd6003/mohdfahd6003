const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const {
    prepareScreenContent,
    configData,
    assets,
    speakText,
    displayDirective,
    displayTemplate,
    repeatText,
    renderGeneralFunction,
} = require('../../common/util');

const poisonImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images['poison.control']
}`;

const { poisonText } = speakText;

class PoisonControl extends Control {
    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        return InputUtil.isIntent(input, 'poisonIntent');
    }

    handle(input, resultBuilder) {
        resultBuilder.addAct(new RequestValueAct(this, {}));
    }

    canTakeInitiative() {
        return false;
    }

    renderAct(act, input, responseBuilder) {
        if (act instanceof RequestValueAct) {
            responseBuilder.addPromptFragment(poisonText);
            responseBuilder.addRepromptFragment(repeatText);
            if (
                Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope)[
                    'Alexa.Presentation.APL'
                ]
            ) {
                const dataTemplate = prepareScreenContent('poisoning', poisonText, poisonImage);
                responseBuilder.addDirective({
                    type: displayDirective,
                    document: displayTemplate,
                    datasources: dataTemplate,
                });
            }
        }
    }
}
module.exports = PoisonControl;
