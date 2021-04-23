const Alexa = require('ask-sdk-core');

const {
    InputUtil,
    Control,
    RequestValueAct
} = require('ask-sdk-controls');

const { repeatText, dehydrationText } = require('../constants.js');

let dummyData = require('../data.json');
const displayTemplate = require('../commonAPL.json');


class Dehydration extends Control {

    canHandle(input) {
        console.log('Inside dehydration control');
        return InputUtil.isIntent(input, 'dehydrationIntent');

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
            responseBuilder.addPromptFragment(dehydrationText);
            responseBuilder.addRepromptFragment(repeatText);
            console.log('works till asking address');
            dummyData.content.primaryText = 'dehydration ';
            dummyData.content.bodyText = dehydrationText;
            dummyData.content.mainImage = 'https://s3.amazonaws.com/ahaalexa/forechoshow/Dehydration_Water.jpg';
            responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: displayTemplate,
                datasources: dummyData

            });

        }
    }
}
module.exports = Dehydration;