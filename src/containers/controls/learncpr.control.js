const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const { configData, assets, sendResponse } = require('../../common/utils/util');

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
        responseBuilder = sendResponse(
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
        return (
            InputUtil.isIntent(input, 'learnCPRIntent') ||
            (InputUtil.isAPLUserEventWithArgs(input) && input.request.source.id === 'cprId')
        );
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
