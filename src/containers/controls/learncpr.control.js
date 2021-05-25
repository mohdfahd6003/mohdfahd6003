const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const { configData, assets, renderGeneralFunction } = require('../../common/util');

const learncprImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images['learncpr.control']
}`;

const learncprData = require('../../common/content/learncpr.content.json');

const {
    title,
    primaryText,
    secondaryText,
    tertiaryText,
    speakTextOne,
    speakTextTwo,
} = learncprData;

class LearncprRequestAct extends RequestValueAct {
    constructor(control, payload) {
        super(control, payload);
        this.speakText = undefined;
    }

    render(input, responseBuilder) {
        responseBuilder = renderGeneralFunction(
            input,
            responseBuilder,
            this.speakText,
            learncprImage,
            title,
            primaryText + secondaryText + tertiaryText
        );
    }
}

class learnCPRControl extends Control {
    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        return InputUtil.isIntent(input, 'learnCPRIntent');
    }

    handle(input, resultBuilder) {
        const learncprReq = new LearncprRequestAct(this, {});
        const combinedSpeech = `${speakTextOne} <audio src="https://${
            configData[process.env.ENVIRONMENT].cloudfront
        }/${assets.Audio['learncpr.control']}"/> ${speakTextTwo}`;
        learncprReq.speakText = combinedSpeech;
        resultBuilder.addAct(learncprReq);
    }

    canTakeInitiative() {
        return false;
    }
}

module.exports = learnCPRControl;
