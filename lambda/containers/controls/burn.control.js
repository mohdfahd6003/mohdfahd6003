const Alexa = require('ask-sdk-core');

const {
    InputUtil,
    Control,
    RequestValueAct
} = require('ask-sdk-controls');

const {repeatText, speakText} = require('../../util'); 
const burnText = speakText['burnText'];
const burnYesText = speakText['burnYesText'];
const burnNoText = speakText['burnNoText'];

let dummyData = require('../../content/data.json');
const displayTemplate = require('../../content/commonAPL.json');

const imageCatalog = require('../../content/assets.json');

const burnImage = imageCatalog['burn.control'];

const BurnControlState = {
    'value': undefined
};

class BurnControl extends Control {
    constructor(props) {
        super(props);
        this.state = BurnControlState;
    }


    canHandle(input) {

        if (InputUtil.isIntent(input, 'burnIntent')) {
            return true;
        } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            if (this.state.value === 'burn') {
                return true;
            }


        } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            if (this.state.value === 'burn') {
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
            if (InputUtil.isIntent(input, 'burnIntent')) {
                this.state.value = 'burn';
                responseBuilder.addPromptFragment(burnText);
                responseBuilder.addRepromptFragment(repeatText);
                if((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']){
                    dummyData.content.primaryText = 'burning';
                    dummyData.content.bodyText = burnText;
                    dummyData.content.mainImage = burnImage;
                    responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        document: displayTemplate,
                        datasources: dummyData

                    });
                }
            } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
                this.state.value = 'unknown';
                responseBuilder.addPromptFragment(burnYesText);
                responseBuilder.addRepromptFragment(repeatText);
                if((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']){
                    dummyData.content.primaryText = 'burning';
                    dummyData.content.bodyText = burnYesText;
                    dummyData.content.mainImage = burnImage;
                    responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        document: displayTemplate,
                        datasources: dummyData

                    });
                }

            } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
                this.state.value = 'unknown';
                responseBuilder.addPromptFragment(burnNoText);
                responseBuilder.addRepromptFragment(repeatText);
                if((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']){    
                    dummyData.content.primaryText = 'burning';
                    dummyData.content.bodyText = burnNoText;
                    dummyData.content.mainImage = burnImage;
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

module.exports = BurnControl;