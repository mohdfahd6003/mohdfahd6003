const Alexa = require('ask-sdk-core');

const {
    InputUtil,
    Control,
    RequestValueAct
} = require('ask-sdk-controls');

const { repeatText, learnCPRText } = require('../constants.js');

let dummyData = require('../data.json');
const displayTemplate = require('../commonAPL.json');

class learnCPRControl extends Control {

    canHandle(input) {
        return InputUtil.isIntent(input, 'learnCPRIntent');

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
            responseBuilder.addPromptFragment(learnCPRText + repeatText);
            responseBuilder.addRepromptFragment(repeatText);
            dummyData.content.primaryText = 'learn CPR';
            dummyData.content.bodyText = learnCPRText;
            dummyData.content.mainImage = 'https://s3.amazonaws.com/ahaalexa/forechoshow/Fainting_Man.jpg';
            responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: displayTemplate,
                datasources: dummyData

            });

        }
    }
}

module.exports = learnCPRControl;