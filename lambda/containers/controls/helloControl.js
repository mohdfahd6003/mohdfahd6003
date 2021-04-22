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
        // Intents the control should listen to
        return InputUtil.isLaunchRequest(input) || InputUtil.isIntent(input, 'HelloIntent');
    }
    handle(input, resultBuilder) {
        // response of the skill
        resultBuilder.addAct(
            new RequestValueAct(this, {

            })

        );
    }
    canTakeInitiative() {
        return false;
    }
    renderAct(act, input, responseBuilder) {
        // how to present the response
        if (act instanceof RequestValueAct) {
            // voice response
            responseBuilder.addPromptFragment(introText);
            responseBuilder.addRepromptFragment(repeatText);
            // Filling the data
            dummyData.content.primaryText = 'Welcome';
            dummyData.content.bodyText = 'You can ask like warning signs of a heart attack';
            dummyData.content.mainImage = 'https://s3.amazonaws.com/ahaalexa/forechoshow/AHA_ASA_Masterbrand.jpg';
            // Pushing the content into APL
            responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: displayTemplate,
                datasources: dummyData

            });
        }
    }

}
module.exports = HelloControl;