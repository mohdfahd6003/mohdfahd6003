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

const BleedControlState = {
    'value': undefined
};


class BleedControl extends Control {
    constructor(props) {
        super(props.id);
        this.state = BleedControlState;
    }
   
    canHandle(input) {
        if (InputUtil.isIntent(input, 'bleedIntent')) {
            return true;
        } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            /*if ((this.state.value === 'first') || (this.state.value === 'second')) {
                return true;
            }  */
            return true;


        } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            /*if ((this.state.value === 'first') || (this.state.value === 'second')) {
                return true;
            } */
            return true;

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
        let resp = bleedText;
        
        if (act instanceof RequestValueAct) {
            if (InputUtil.isIntent(input, 'bleedIntent')) {
                
                this.state.value = 'first';
                responseBuilder.addPromptFragment(resp);
                responseBuilder.addRepromptFragment(repeatText);
                if((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']){
                    dummyData.content.primaryText = 'I cut myself';
                    dummyData.content.bodyText = resp;
                    dummyData.content.mainImage = bleedImage;
                    responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        document: displayTemplate,
                        datasources: dummyData

                });
                }
                
            } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
                let resp = bleedYesText;
                if (this.state.value === 'second') {
                    resp = bleedYesSecondText;
                }
                this.state.value = undefined;
                responseBuilder.addPromptFragment(resp);
                responseBuilder.addRepromptFragment(repeatText);
                if((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']){
                    dummyData.content.primaryText = 'I cut myself';
                    dummyData.content.bodyText = resp;
                    dummyData.content.mainImage = bleedImage;
                    responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        document: displayTemplate,
                        datasources: dummyData

                    });
               }


            } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
                let resp = '';
                if (this.state.value === 'first') {
                    resp = bleedNoText;
                    this.state.value = 'second';

                } else if (this.state.value === 'second') {
                    this.state.value = undefined;
                    resp = bleedNoSecondText;
                }
                responseBuilder.addPromptFragment(resp);
                responseBuilder.addRepromptFragment(repeatText);
                if((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']){
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
}

module.exports = BleedControl;