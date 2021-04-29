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
} = require('../../common/util');

const chokeData = require('../../common/content/choke.content.json');
const dataTemplate = require('../../common/content/dataTemplate.json');

const { chokeMainText } = speakText;

const ChokeControlState = {
    value: undefined
};

class ChokeControl extends Control {
    constructor(props) {
        super(props.id);
        this.state = ChokeControlState;
    }

    canHandle(input) {
        if (InputUtil.isIntent(input, 'chokeIntent')) {
            return true;
        } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            /* if (this.state && this.state.includes('choking')) {
                return true;
            } */
            return true;
        } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            /* if (this.state && this.state.includes('choking')) {
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
                const resp = chokeMainText;
                responseBuilder.addPromptFragment(resp);
                responseBuilder.addRepromptFragment(repeatText);
                if ((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']) {
                    const chokeImage = 'https://s3.amazonaws.com/ahaalexa/forechoshow/Chest_Thrust_AdultFloor.jpg';
                    dataTemplate.content.primaryText = 'Choking person';
                    dataTemplate.content.bodyText = resp;
                    dataTemplate.content.mainImage = chokeImage;
                    responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        document: displayTemplate,
                        datasources: dataTemplate

                    });
                }
            } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
                const topic = this.state;
                const { speechText } = chokeData[topic].yes;
                const { primaryText } = chokeData[topic].yes;
                const { secondaryText } = chokeData[topic].yes;
                const { imageUrl } = chokeData[topic].yes;
                const topicnext = chokeData[topic].yes.continue;
                if (topicnext === false) {
                    this.state = 'unknown';
                }
                else {
                    this.state = topicnext;
                }
                responseBuilder.addPromptFragment(speechText);
                responseBuilder.addRepromptFragment(repeatText);
                if ((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']) {
                    dataTemplate.content.primaryText = primaryText;
                    dataTemplate.content.bodyText = secondaryText;
                    dataTemplate.content.mainImage = imageUrl;
                    responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        document: displayTemplate,
                        datasources: dataTemplate

                    });
                }

            } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
                const topic = this.state;
                const { speechText } = chokeData[topic].no;
                const { primaryText } = chokeData[topic].no;
                const { secondaryText } = chokeData[topic].no;
                const { imageUrl } = chokeData[topic].no;
                const topicnext = chokeData[topic].no.continue;
                if (topicnext === false) {
                    this.state = 'unknown';
                }
                else {
                    this.state = topicnext;
                }
                responseBuilder.addPromptFragment(speechText);
                responseBuilder.addRepromptFragment(repeatText);
                if ((Alexa.getSupportedInterfaces(input.handlerInput.requestEnvelope))['Alexa.Presentation.APL']) {
                    dataTemplate.content.primaryText = primaryText;
                    dataTemplate.content.bodyText = secondaryText;
                    dataTemplate.content.mainImage = imageUrl;
                    responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        document: displayTemplate,
                        datasources: dataTemplate

                    });
                }
            }
        }
    }

}
module.exports = ChokeControl;
