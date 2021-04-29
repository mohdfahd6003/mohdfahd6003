const Alexa = require('ask-sdk-core');

const {
    InputUtil,
    Control,
    RequestValueAct
} = require('ask-sdk-controls');

const {
    prepareScreenContent,
    imageCatalog,
    displayTemplate,
    displayDirective,
    repeatText,
    speakText
} = require('../../common/util');

const { poisonText } = speakText;
const poisonImage = imageCatalog['poison.control'];

class PoisonControl extends Control {

    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        return InputUtil.isIntent(input, 'poisonIntent');

    }

    handle(input, resultBuilder) {
        resultBuilder.addAct(
            new RequestValueAct(this, {
            })
        );

    }

    canTakeInitiative() {
        return false;
    }

    renderAct(act, input, responseBuilder) {
        if (act instanceof RequestValueAct) {
            responseBuilder.addPromptFragment(poisonText);
            responseBuilder.addRepromptFragment(repeatText);
            if ((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']) {
                const dataTemplate = prepareScreenContent('poisoning', poisonText, poisonImage);
                responseBuilder.addDirective({
                    type: displayDirective,
                    document: displayTemplate,
                    datasources: dataTemplate

                });
            }
        }
    }
}
module.exports = PoisonControl;
