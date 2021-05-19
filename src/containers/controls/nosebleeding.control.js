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

const nosebleedImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images['nosebleeding.control']
}`;

const noseBleedText = speakText.noseBleedingText;

class NoseBleeding extends Control {
    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        return InputUtil.isIntent(input, 'noseIntent');
    }

    handle(input, resultBuilder) {
        resultBuilder.addAct(new RequestValueAct(this, {}));
    }

    canTakeInitiative() {
        return false;
    }

    renderAct(act, input, responseBuilder) {
        if (act instanceof RequestValueAct) {
            responseBuilder.addPromptFragment(noseBleedText);
            responseBuilder.addRepromptFragment(repeatText);
            if (
                Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope)[
                    'Alexa.Presentation.APL'
                ]
            ) {
                const dataTemplate = prepareScreenContent(
                    'nose bleeds',
                    noseBleedText,
                    nosebleedImage
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
module.exports = NoseBleeding;
