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
  
  const strokeText = speakText['strokeText'];
  const strokeImage = imageCatalog['stroke.control'] ;

class StrokeControl extends Control {

    constructor(props){
        super(props);
    }

    canHandle(input) {
        return InputUtil.isIntent(input, 'strokeIntent');

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
            responseBuilder.addPromptFragment(strokeText);
            responseBuilder.addRepromptFragment(repeatText);
            if((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']){
                let dataTemplate = prepareScreenContent('strokeing', strokeText, strokeImage);
                responseBuilder.addDirective({
                type: displayDirective,
                document: displayTemplate,
                datasources: dataTemplate

                });
            }
        }
    }
}
module.exports = StrokeControl;