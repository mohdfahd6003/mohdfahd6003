const Alexa = require('ask-sdk-core');

const {
    InputUtil,
    Control,
    RequestValueAct
} = require('ask-sdk-controls');

const {
    prepareScreenContent,
    imageCatalog,
    displayTemplate,
    displayDirective,
    repeatText,
    speakText
} = require('../../util');

class HeartControl extends Control {
    
    constructor(props){
        super(props);
    }
    canHandle(input) {
        return InputUtil.isIntent(input, 'heartWarningSignsIntent');

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
        const heartAttackImage = imageCatalog['heart.control'];
        const primaryText = 'warning signs of a heart attack';
        const heartAttackText = speakText['heartAttackText'];
        
        if (act instanceof RequestValueAct) {
            responseBuilder.addPromptFragment(heartAttackText);
            responseBuilder.addRepromptFragment(repeatText);
            if((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']){ 
                let dataTemplate = prepareScreenContent(primaryText, heartAttackText, heartAttackImage);
                responseBuilder.addDirective({
                    type: displayDirective,
                    document: displayTemplate,
                    datasources: dataTemplate

                });
            }
        }
    }
}
module.exports = HeartControl;