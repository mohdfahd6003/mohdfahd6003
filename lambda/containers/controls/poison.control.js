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
  
  const poisonText = speakText['poisonText'];
  const poisonImage = imageCatalog['poison.control'] ;

class PoisonControl extends Control {
   
    constructor(props){
        super(props);
    }
    canHandle(input) {
        console.log('Inside stroke control');
        return InputUtil.isIntent(input, 'poisonIntent');

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
            responseBuilder.addPromptFragment(poisonText);
            responseBuilder.addRepromptFragment(repeatText);
            if((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']){
                let dataTemplate = prepareScreenContent('poisoning', poisonText, poisonImage);
                responseBuilder.addDirective({
                type: displayDirective,
                document: displayTemplate,
                datasources: dataTemplate

                });
            }
        }
    }
}
module.exports = PoisonControl;