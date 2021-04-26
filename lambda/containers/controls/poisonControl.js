const Alexa = require('ask-sdk-core');

const {
    InputUtil,
    Control,
    RequestValueAct
} = require('ask-sdk-controls');

const { repeatText, poisonText } = require('../constants.js');

let dummyData = require('../data.json');
const displayTemplate = require('../commonAPL.json');


class PoisonControl extends Control {
   
    constructor(props){
        super(props);
    }
    canHandle(input) {
        console.log('Inside stroke control');
        return InputUtil.isIntent(input, 'poisonIntent');

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
            responseBuilder.addPromptFragment(poisonText);
            responseBuilder.addRepromptFragment(repeatText);
            if((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']){
                dummyData.content.primaryText = 'poisoning';
                dummyData.content.bodyText = poisonText;
                dummyData.content.mainImage = 'https://s3.amazonaws.com/ahaalexa/forechoshow/Warning_Signs.jpg';
                responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    document: displayTemplate,
                    datasources: dummyData

                });
            }
        }
    }
}
module.exports = PoisonControl;