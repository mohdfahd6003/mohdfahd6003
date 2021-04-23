const Alexa = require('ask-sdk-core');

const {
    InputUtil,
    Control,
    RequestValueAct
} = require('ask-sdk-controls');

const { repeatText, strokeText } = require('../constants.js');

let dummyData = require('../data.json');
const displayTemplate = require('../commonAPL.json');


class StrokeControl extends Control {

    canHandle(input) {
        return InputUtil.isIntent(input, 'strokeIntent');

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
            responseBuilder.addPromptFragment(strokeText);
            responseBuilder.addRepromptFragment(repeatText);
            dummyData.content.primaryText = 'warning signs of a stroke';
            dummyData.content.bodyText = strokeText;
            dummyData.content.mainImage = 'https://s3.amazonaws.com/ahaalexa/forechoshow/ASA_FAST_Warning_Signs.jpg';
            responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: displayTemplate,
                datasources: dummyData

            });

        }
    }
}
module.exports = StrokeControl;