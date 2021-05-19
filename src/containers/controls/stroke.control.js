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

const { strokeText } = speakText;
const strokeImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images['stroke.control']
}`;

class StrokeControl extends Control {
    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        return InputUtil.isIntent(input, 'strokeIntent');
    }

    handle(input, resultBuilder) {
        resultBuilder.addAct(new RequestValueAct(this, {}));
    }

    canTakeInitiative() {
        return false;
    }

    renderAct(act, input, responseBuilder) {
        if (act instanceof RequestValueAct) {
            responseBuilder.addPromptFragment(strokeText);
            responseBuilder.addRepromptFragment(repeatText);
            if (
                Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope)[
                    'Alexa.Presentation.APL'
                ]
            ) {
                const dataTemplate = prepareScreenContent('strokes', strokeText, strokeImage);
                responseBuilder.addDirective({
                    type: displayDirective,
                    document: displayTemplate,
                    datasources: dataTemplate,
                });
            }
        }
    }
}
module.exports = StrokeControl;
