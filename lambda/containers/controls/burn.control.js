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

const { burnText } = speakText;
const { burnYesText } = speakText;
const { burnNoText } = speakText;
const burnImage = imageCatalog['burn.control'];

const BurnControlState = {
    value: undefined
};

class BurnControl extends Control {
    constructor(props) {
        super(props.id);
        this.state = BurnControlState;
    }

    canHandle(input) {

        if (InputUtil.isIntent(input, 'burnIntent')) {
            return true;
        } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            if (this.state.value === 'burn') {
                return true;
            }

        } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            if (this.state.value === 'burn') {
                return true;
            }

        }
        return false;

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
            if (InputUtil.isIntent(input, 'burnIntent')) {
                this.state.value = 'burn';
                responseBuilder.addPromptFragment(burnText);
                responseBuilder.addRepromptFragment(repeatText);
                if ((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']) {
                    const dataTemplate = prepareScreenContent('burning', burnText, burnImage);
                    responseBuilder.addDirective({
                        type: displayDirective,
                        document: displayTemplate,
                        datasources: dataTemplate

                    });
                }
            } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
                this.state.value = 'unknown';
                responseBuilder.addPromptFragment(burnYesText);
                responseBuilder.addRepromptFragment(repeatText);
                if ((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']) {
                    const dataTemplate = prepareScreenContent('burning', burnYesText, burnImage);
                    responseBuilder.addDirective({
                        type: displayDirective,
                        document: displayTemplate,
                        datasources: dataTemplate

                    });
                }

            } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
                this.state.value = 'unknown';
                responseBuilder.addPromptFragment(burnNoText);
                responseBuilder.addRepromptFragment(repeatText);
                if ((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']) {
                    const dataTemplate = prepareScreenContent('burning', burnNoText, burnImage);
                    responseBuilder.addDirective({
                        type: displayDirective,
                        document: displayTemplate,
                        datasources: dataTemplate

                    });
                }
            }
        }

    }
}

module.exports = BurnControl;
