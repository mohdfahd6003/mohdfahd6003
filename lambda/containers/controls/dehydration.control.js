const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const {
    prepareScreenContent,
    imageCatalog,
    displayTemplate,
    displayDirective,
    repeatText,
    speakText,
} = require('../../common/util');

const { dehydrationText } = speakText;
const dehydrationImage = imageCatalog['dehydration.control'];
class Dehydration extends Control {
    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        console.log('Inside dehydration control');
        return InputUtil.isIntent(input, 'dehydrationIntent');
    }

    handle(input, resultBuilder) {
        resultBuilder.addAct(new RequestValueAct(this, {}));
    }

    canTakeInitiative() {
        return false;
    }

    renderAct(act, input, responseBuilder) {
        if (act instanceof RequestValueAct) {
            responseBuilder.addPromptFragment(dehydrationText);
            responseBuilder.addRepromptFragment(repeatText);
            if (
                Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope)[
                    'Alexa.Presentation.APL'
                ]
            ) {
                const dataTemplate = prepareScreenContent(
                    'dehydration',
                    dehydrationText,
                    dehydrationImage
                );
                responseBuilder.addDirective({
                    type: displayDirective,
                    document: displayTemplate,
                    datasources: dataTemplate,
                });
            }
        }
    }
}
module.exports = Dehydration;
