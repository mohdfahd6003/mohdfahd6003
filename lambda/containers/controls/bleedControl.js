const Alexa = require('ask-sdk-core');

const {
    InputUtil,
    Control,
    RequestValueAct
    } = require('ask-sdk-controls');

const {repeatText, bleedText, bleedYesText, bleedNoText, bleedNoSecondText,bleedYesSecondText} = require('../constants.js'); 

let dummyData = require('../data.json');
const displayTemplate = require('../commonAPL.json');

class BleedControl extends Control {
    constructor() {
        super();
        //Intial state is unknown
        this.state = 'unknown';
    }


    canHandle(input) {
        // Which intent to respond to based on the state
        console.log('Inside bleed control');
        if (InputUtil.isIntent(input, 'bleedIntent')) {
            return true;
        } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            if ((BleedControl.state === 'first') || (BleedControl.state === 'second')) {
                return true;
            }


        } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            if ((BleedControl.state === 'first') || (BleedControl.state === 'second')) {
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
            if (InputUtil.isIntent(input, 'bleedIntent')) {
                BleedControl.state = 'first';
                console.log('state is', BleedControl.state);
                let resp = bleedText;
                responseBuilder.addPromptFragment(resp);
                responseBuilder.addRepromptFragment(repeatText);
                //APL content
                let bleedImage = 'https://s3.amazonaws.com/ahaalexa/forechoshow/Dressing_Gauze_Pad_3_Adult.jpg';
                dummyData.content.primaryText = 'I cut myself';
                dummyData.content.bodyText = resp;
                dummyData.content.mainImage = bleedImage;
                responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    document: displayTemplate,
                    datasources: dummyData

                });
            } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
                // First yes path
                let resp = bleedYesText;
                console.log('YesIntent state is', BleedControl.state);
                // Second yes path
                if (BleedControl.state === 'second') {
                    resp = bleedYesSecondText;
                }
                // Not to continue after yes
                BleedControl.state = 'unknown';
                //Adding voice
                responseBuilder.addPromptFragment(resp);
                responseBuilder.addRepromptFragment(repeatText);
                // Adding APL
                let bleedImage = 'https://s3.amazonaws.com/ahaalexa/forechoshow/Dressing_Gauze_Pad_3_Adult.jpg' ;
                dummyData.content.primaryText = 'I cut myself';
                dummyData.content.bodyText = resp;
                dummyData.content.mainImage = bleedImage;
                // Using custom tempalte and passing the data
                responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    document: displayTemplate,
                    datasources: dummyData

                });


            } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
                let resp = bleedNoText;
                // First no path
                if (BleedControl.state === 'first') {
                    BleedControl.state = 'second';

                } else if (BleedControl.state === 'second') {
                    // Second no path
                    BleedControl.state = 'unknown';
                    resp = bleedNoSecondText;
                }
                // voice outputs
                responseBuilder.addPromptFragment(resp);
                responseBuilder.addRepromptFragment(repeatText);
                // APL contents
                let bleedImage = 'https://s3.amazonaws.com/ahaalexa/forechoshow/Dressing_Gauze_Pad_3_Adult.jpg';
                dummyData.content.primaryText = 'I cut myself';
                dummyData.content.bodyText = resp;
                dummyData.content.mainImage = bleedImage;
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

module.exports = BleedControl;