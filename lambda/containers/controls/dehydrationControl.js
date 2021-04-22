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
        // only warning signs of a heart attack matches here
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
            // speak content
            responseBuilder.addPromptFragment(dehydrationText);
            responseBuilder.addRepromptFragment(repeatText);
            console.log('works till asking address');
            // filling the data
            dummyData.content.primaryText = 'dehydration ';
            dummyData.content.bodyText = dehydrationText;
            dummyData.content.mainImage = 'https://s3.amazonaws.com/ahaalexa/forechoshow/Dehydration_Water.jpg';
            // passing data to visual directive, APL
            responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: displayTemplate,
                datasources: dummyData

            });

        }
    }
}
module.exports = Dehydration;