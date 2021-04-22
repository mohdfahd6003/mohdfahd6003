const Alexa = require('ask-sdk-core');

const {
    InputUtil,
    Control,
    RequestValueAct
} = require('ask-sdk-controls');

const { repeatText, burnText, burnYesText, burnNoText } = require('../constants.js');

let dummyData = require('../data.json');
const displayTemplate = require('../commonAPL.json');

let burnImage = 'https://s3.amazonaws.com/ahaalexa/forechoshow/Burn_under_Running_Water_AdultSink.jpg';

class BurnControl extends Control {
    constructor() {
        super();
        //Intial state is unknown
        this.state = 'unknown';
    }


    canHandle(input) {
        // Which intent to respond to based on the state
        console.log('Inside burn control');
        console.log('state is ', BurnControl.state);
        if (InputUtil.isIntent(input, 'burnIntent')) {
            return true;
        } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            if (BurnControl.state === 'burn') {
                return true;
            }


        } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            if (BurnControl.state === 'burn') {
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
            if (InputUtil.isIntent(input, 'burnIntent')) {
                BurnControl.state = 'burn';
                responseBuilder.addPromptFragment(burnText);
                responseBuilder.addRepromptFragment(repeatText);
                //APL content
                dummyData.content.primaryText = 'burning';
                dummyData.content.bodyText = burnText;
                dummyData.content.mainImage = burnImage;
                responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    document: displayTemplate,
                    datasources: dummyData

                });
            } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
                BurnControl.state = 'unknown';
                //Adding voice
                responseBuilder.addPromptFragment(burnYesText);
                responseBuilder.addRepromptFragment(repeatText);
                // Adding APL
                dummyData.content.primaryText = 'burning';
                dummyData.content.bodyText = burnYesText;
                dummyData.content.mainImage = burnImage;
                // Using custom tempalte and passing the data
                responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    document: displayTemplate,
                    datasources: dummyData

                });


            } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
                BurnControl.state = 'unknown';
                responseBuilder.addPromptFragment(burnNoText);
                responseBuilder.addRepromptFragment(repeatText);
                // APL contents
                dummyData.content.primaryText = 'burning';
                dummyData.content.bodyText = burnNoText;
                dummyData.content.mainImage = burnImage;
                // Loding the templete and passing the data
                responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    document: displayTemplate,
                    datasources: dummyData

                });
            }
        }

    }
}

module.exports = BurnControl;