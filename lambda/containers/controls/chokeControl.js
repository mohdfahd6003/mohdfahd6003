const Alexa = require('ask-sdk-core');

const {
    InputUtil,
    Control,
    RequestValueAct
} = require('ask-sdk-controls');

const chokeData = require('../chokeFinal.json');

let dummyData = require('../data.json');
const displayTemplate = require('../commonAPL.json');


const { repeatText, chokeMainText } = require('../constants.js');
class chokeControl extends Control {
    constructor() {
        super();
        //Intial state is unknown
        this.state = 'unknown';
    }
    canHandle(input) {
        // Which intent to respond to based on the state
        console.log('Inside choke control');
        if (InputUtil.isIntent(input, 'chokeIntent')) {
            return true;
        } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            if (chokeControl.state && chokeControl.state.includes('choking')) {
                return true;
            }
        } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            if (chokeControl.state && chokeControl.state.includes('choking')) {
                return true;
            }
        }
        return false;

    }
    handle(input, resultBuilder) {
        // Things to do if it matches intents and states
        resultBuilder.addAct(
            new RequestValueAct(this, {
            })
        );
    }
    canTakeInitiative() {
        // Used mostly for built in ListContol types
        return false;
    }
    renderAct(act, input, responseBuilder) {
        // Rendering will push the content into the device
        if (act instanceof RequestValueAct) {
            //checking for each path
            if (InputUtil.isIntent(input, 'chokeIntent')) {
                chokeControl.state = 'chokingInfo';
                let resp = chokeMainText;
                responseBuilder.addPromptFragment(resp);
                responseBuilder.addRepromptFragment(repeatText);
                //APL content
                let chokeImage = 'https://s3.amazonaws.com/ahaalexa/forechoshow/Chest_Thrust_AdultFloor.jpg';
                dummyData.content.primaryText = 'Choking person';
                dummyData.content.bodyText = resp;
                dummyData.content.mainImage = chokeImage;
                responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    document: displayTemplate,
                    datasources: dummyData

                });
            } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
                // fetching data from the json
                let topic = chokeControl.state;
                let speechText = chokeData[topic].yes.speechText;
                let primaryText = chokeData[topic].yes.primaryText;
                let secondaryText = chokeData[topic].yes.secondaryText;
                let imageUrl = chokeData[topic].yes.imageUrl;
                let topicnext = chokeData[topic].yes.continue;
                // next turn state setup
                if (topicnext == false) {
                    chokeControl.state = 'unknown';
                }
                else {
                    chokeControl.state = topicnext;
                }

                //creating the response
                responseBuilder.addPromptFragment(speechText);
                responseBuilder.addRepromptFragment(repeatText);
                // APL
                dummyData.content.primaryText = primaryText;
                dummyData.content.bodyText = secondaryText;
                dummyData.content.mainImage = imageUrl;
                responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    document: displayTemplate,
                    datasources: dummyData

                });


            } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {

                // fetching data from the json
                let topic = chokeControl.state;
                let speechText = chokeData[topic].no.speechText;
                let primaryText = chokeData[topic].no.primaryText;
                let secondaryText = chokeData[topic].no.secondaryText;
                let imageUrl = chokeData[topic].no.imageUrl;
                let topicnext = chokeData[topic].no.continue;

                // next turn state setup
                if (topicnext == false) {
                    chokeControl.state = 'unknown';
                }
                else {
                    chokeControl.state = topicnext;
                }

                //creating the response
                responseBuilder.addPromptFragment(speechText);
                responseBuilder.addRepromptFragment(repeatText);
                // APL
                dummyData.content.primaryText = primaryText;
                dummyData.content.bodyText = secondaryText;
                dummyData.content.mainImage = imageUrl;
                responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    document: displayTemplate,
                    datasources: dummyData

                });
            }
        }
    }

}

module.exports = chokeControl;