const Alexa = require('ask-sdk-core');

const {
    InputUtil,
    Control,
    RequestValueAct,
    } = require('ask-sdk-controls');

    const {
        prepareScreenContent,
        imageCatalog,
        displayTemplate,
        displayDirective,
        repeatText,
        speakText
    } = require('../../util'); 

const bleedText = speakText['bleedText'];
const bleedYesText = speakText['bleedYesText'];
const bleedNoText = speakText['bleedNoText']; 
const bleedNoSecondText = speakText['bleedNoSecondText'];
const bleedYesSecondText = speakText['leedYesSecondText'];


const bleedImage = imageCatalog['cut.control'] ;

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
                    let dataTemplate = prepareScreenContent('I cut myself', resp, bleedImage);
                    responseBuilder.addDirective({
                        type: displayDirective,
                        document: displayTemplate,
                        datasources: dataTemplate

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
                    let dataTemplate = prepareScreenContent('I cut myself', resp, bleedImage);
                    responseBuilder.addDirective({
                        type: displayDirective,
                        document: displayTemplate,
                        datasources: dataTemplate

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
                    let dataTemplate = prepareScreenContent('I cut myself', resp, bleedImage);
                    responseBuilder.addDirective({
                        type: displayDirective,
                        document: displayTemplate,
                        datasources: dataTemplate

                    });
                }
            }

        }
    }
}

module.exports = BleedControl;