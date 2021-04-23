const Alexa = require('ask-sdk-core');

const {
    InputUtil,
    Control,
    RequestValueAct
    } = require('ask-sdk-controls');

const {repeatText, bleedText, bleedYesText, bleedNoText, bleedNoSecondText,bleedYesSecondText} = require('../constants.js'); 

let dummyData = require('../data.json');
const displayTemplate = require('../commonAPL.json');


let bleedImage = 'https://s3.amazonaws.com/ahaalexa/forechoshow/Dressing_Gauze_Pad_3_Adult.jpg';

class BleedControl extends Control {
    constructor() {
        super();
        this.state = 'unknown';
    }


    canHandle(input) {
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
            if (InputUtil.isIntent(input, 'bleedIntent')) {
                BleedControl.state = 'first';
                let resp = bleedText;
                responseBuilder.addPromptFragment(resp);
                responseBuilder.addRepromptFragment(repeatText);
                dummyData.content.primaryText = 'I cut myself';
                dummyData.content.bodyText = resp;
                dummyData.content.mainImage = bleedImage;
                responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    document: displayTemplate,
                    datasources: dummyData

                });
            } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
                let resp = bleedYesText;
                console.log('YesIntent state is', BleedControl.state);
                if (BleedControl.state === 'second') {
                    resp = bleedYesSecondText;
                }
                BleedControl.state = 'unknown';
                responseBuilder.addPromptFragment(resp);
                responseBuilder.addRepromptFragment(repeatText);
                dummyData.content.primaryText = 'I cut myself';
                dummyData.content.bodyText = resp;
                dummyData.content.mainImage = bleedImage;
                responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    document: displayTemplate,
                    datasources: dummyData

                });


            } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
                let resp = bleedNoText;
                if (BleedControl.state === 'first') {
                    BleedControl.state = 'second';

                } else if (BleedControl.state === 'second') {
                    BleedControl.state = 'unknown';
                    resp = bleedNoSecondText;
                }
                responseBuilder.addPromptFragment(resp);
                responseBuilder.addRepromptFragment(repeatText);
                dummyData.content.primaryText = 'I cut myself';
                dummyData.content.bodyText = resp;
                dummyData.content.mainImage = bleedImage;
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
