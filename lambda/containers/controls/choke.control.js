const Alexa = require('ask-sdk-core');

const {
    InputUtil,
    Control,
    RequestValueAct
} = require('ask-sdk-controls');

const chokeData = require('../../content/choke.content.json');

let dummyData = require('../../content/data.json');
const displayTemplate = require('../../content/commonAPL.json');


const {repeatText, speakText} = require('../../util'); 
const chokeMainText = speakText['chokeMainText'];
const ChokeControlState = {
    'value': undefined
};

class ChokeControl extends Control {
    constructor(props) {
        super(props);
        this.state = ChokeControlState;
    }
    canHandle(input) {
        if (InputUtil.isIntent(input, 'chokeIntent')) {
            return true;
        } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            /*if (this.state && this.state.includes('choking')) {
                return true;
            } */
            return true;
        } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            /*if (this.state && this.state.includes('choking')) {
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
        if (act instanceof RequestValueAct) {
            if (InputUtil.isIntent(input, 'chokeIntent')) {
                this.state = 'chokingInfo';
                let resp = chokeMainText;
                responseBuilder.addPromptFragment(resp);
                responseBuilder.addRepromptFragment(repeatText);
                if((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']){
                    let chokeImage = 'https://s3.amazonaws.com/ahaalexa/forechoshow/Chest_Thrust_AdultFloor.jpg';
                    dummyData.content.primaryText = 'Choking person';
                    dummyData.content.bodyText = resp;
                    dummyData.content.mainImage = chokeImage;
                    responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        document: displayTemplate,
                        datasources: dummyData

                    });
                }
            } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
                let topic = this.state;
                let speechText = chokeData[topic].yes.speechText;
                let primaryText = chokeData[topic].yes.primaryText;
                let secondaryText = chokeData[topic].yes.secondaryText;
                let imageUrl = chokeData[topic].yes.imageUrl;
                let topicnext = chokeData[topic].yes.continue;
                if (topicnext == false) {
                    this.state = 'unknown';
                }
                else {
                    this.state = topicnext;
                }
                responseBuilder.addPromptFragment(speechText);
                responseBuilder.addRepromptFragment(repeatText);
                if((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']){
                    dummyData.content.primaryText = primaryText;
                    dummyData.content.bodyText = secondaryText;
                    dummyData.content.mainImage = imageUrl;
                    responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        document: displayTemplate,
                        datasources: dummyData

                    });
                }


            } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
                let topic = this.state;
                let speechText = chokeData[topic].no.speechText;
                let primaryText = chokeData[topic].no.primaryText;
                let secondaryText = chokeData[topic].no.secondaryText;
                let imageUrl = chokeData[topic].no.imageUrl;
                let topicnext = chokeData[topic].no.continue;
                if (topicnext == false) {
                    this.state = 'unknown';
                }
                else {
                    this.state = topicnext;
                }
                responseBuilder.addPromptFragment(speechText);
                responseBuilder.addRepromptFragment(repeatText);
                if((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']){
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

}
module.exports = ChokeControl;