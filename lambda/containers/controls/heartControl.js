const Alexa = require('ask-sdk-core');

const {
    InputUtil,
    Control,
    RequestValueAct
} = require('ask-sdk-controls');

const { repeatText, heartAttackText } = require('../constants.js');

let dummyData = require('../data.json');
const displayTemplate = require('../commonAPL.json');

class HeartControl extends Control {

    canHandle(input) {
        console.log('Inside heart control');
        // only warning signs of a heart attack matches here
        return InputUtil.isIntent(input, 'heartWarningSignsIntent');

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
            responseBuilder.addPromptFragment(heartAttackText);
            responseBuilder.addRepromptFragment(repeatText);
            console.log('works till asking address');
            // filling the data
            dummyData.content.primaryText = 'warning signs of a heart attack';
            dummyData.content.bodyText = heartAttackText;
            dummyData.content.mainImage = 'https://s3.amazonaws.com/ahaalexa/forechoshow/During_a_Heart_Attack.jpg';
            // passing data to visual directive, APL
            responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: displayTemplate,
                datasources: dummyData

            });

        }
    }
}
module.exports = HeartControl;