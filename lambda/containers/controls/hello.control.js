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

const { introText } = speakText;

const helloImage = imageCatalog['hello.control'];

class HelloControl extends Control {

    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        return InputUtil.isLaunchRequest(input) || InputUtil.isIntent(input, 'HelloIntent');
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
            responseBuilder.addPromptFragment(introText);
            responseBuilder.addRepromptFragment(repeatText);
            if ((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']) {
                const dataTemplate = prepareScreenContent('Welcome', 'You can ask like warning signs of a heart attack', helloImage);
                responseBuilder.addDirective({
                    type: displayDirective,
                    document: displayTemplate,
                    datasources: dataTemplate

                });
            }
        }
    }

}
module.exports = HelloControl;
