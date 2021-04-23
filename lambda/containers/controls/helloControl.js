const Alexa = require('ask-sdk-core');

const {
    InputUtil,
    Control,
    RequestValueAct
    } = require('ask-sdk-controls');

const {repeatText, introText} = require('../constants.js'); 

let dummyData = require('../data.json');
const displayTemplate = require('../commonAPL.json');

class HelloControl extends Control {
    canHandle(input) {
        return InputUtil.isLaunchRequest(input) || InputUtil.isIntent(input, 'HelloIntent');
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
            responseBuilder.addPromptFragment(introText);
            responseBuilder.addRepromptFragment(repeatText);
            dummyData.content.primaryText = 'Welcome';
            dummyData.content.bodyText = 'You can ask like warning signs of a heart attack';
            dummyData.content.mainImage = 'https://s3.amazonaws.com/ahaalexa/forechoshow/AHA_ASA_Masterbrand.jpg';
            responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: displayTemplate,
                datasources: dummyData

            });
        }
    }

}
module.exports = HelloControl;