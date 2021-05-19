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

const learncprImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images['learncpr.control']
}`;

const { learnCPRText } = speakText;

class learnCPRControl extends Control {
    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        return InputUtil.isIntent(input, 'learnCPRIntent');
    }

    handle(input, resultBuilder) {
        resultBuilder.addAct(new RequestValueAct(this, {}));
    }

    canTakeInitiative() {
        return false;
    }

    renderAct(act, input, responseBuilder) {
        if (act instanceof RequestValueAct) {
            responseBuilder.addPromptFragment(learnCPRText);
            responseBuilder.addRepromptFragment(repeatText);
            if (
                Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope)[
                    'Alexa.Presentation.APL'
                ]
            ) {
                const dataTemplate = prepareScreenContent('learn CPR', learnCPRText, learncprImage);
                responseBuilder.addDirective({
                    type: displayDirective,
                    document: displayTemplate,
                    datasources: dataTemplate,
                });
            }
        }
    }
}

module.exports = learnCPRControl;
