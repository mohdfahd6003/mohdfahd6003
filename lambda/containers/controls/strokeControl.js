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
        console.log('Inside stroke control');
        // only warning signs of a heart attack matches here
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
            // speak content
            responseBuilder.addPromptFragment(strokeText);
            responseBuilder.addRepromptFragment(repeatText);
            console.log('works till asking address');
            // filling the data
            dummyData.content.primaryText = 'warning signs of a stroke';
            dummyData.content.bodyText = strokeText;
            dummyData.content.mainImage = 'https://s3.amazonaws.com/ahaalexa/forechoshow/ASA_FAST_Warning_Signs.jpg';
            // passing data to visual directive, APL
            responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: displayTemplate,
                datasources: dummyData

            });

        }
    }
}
module.exports = StrokeControl;