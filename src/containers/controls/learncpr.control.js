const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const {
    prepareScreenContent,
    configData,
    assets,
    speakText,
    displayDirective,
    displayTemplate,
    repeatText,
    renderGeneralFunction,
} = require('../../common/util');

const learncprImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images['learncpr.control']
}`;

const { learnCPRTextOne, learnCPRTextTwo } = speakText;

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
            'Learn c.p.r',
            this.speakText
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
        const combinedSpeech = `${learnCPRTextOne}https://${
            configData[process.env.ENVIRONMENT].cloudfront
        }/${assets.Audio['learncpr.control']}${learnCPRTextTwo}`;
        learncprReq.speakText = combinedSpeech;
        resultBuilder.addAct(learncprReq);
    }

    canTakeInitiative() {
        return false;
    }
}

module.exports = learnCPRControl;
