const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const { speakText, sendResponse, assets, configData } = require('../../common/utils/util');

const chokeData = require('../../common/content/choke.content.json');

const { chokeMainText } = speakText;

const ChokeControlState = {
    value: undefined,
};

class ChokeActMain extends RequestValueAct {
    constructor(control, payload) {
        super(control, payload);
        this.speechText = undefined;
        this.imageUrl = undefined;
        this.primaryText = undefined;
        this.secondaryText = undefined;
        this.tertiaryText = undefined;
        this.title = undefined;
    }

    render(input, resultBuilder) {
        resultBuilder = sendResponse(
            input,
            resultBuilder,
            this.speechText,
            this.imageUrl,
            this.title,
            this.primaryText + this.secondaryText + this.tertiaryText
        );
    }
}

class ChokeControl extends Control {
    constructor(props) {
        super(props.id);
        this.state = ChokeControlState;
    }

    canHandle(input) {
        if (
            InputUtil.isIntent(input, 'chokeIntent') ||
            (InputUtil.isAPLUserEventWithArgs(input) && input.request.source.id === 'chokeId')
        ) {
            return true;
        } else if (this.state && InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            if (String(this.state.value).startsWith('choking')) return true;
        } else if (this.state && InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            if (String(this.state.value).startsWith('choking')) return true;
        }
        return false;
    }

    handle(input, resultBuilder) {
        const chokeValueAct = new ChokeActMain(this, {});
        if (
            InputUtil.isIntent(input, 'chokeIntent') ||
            (InputUtil.isAPLUserEventWithArgs(input) && input.request.source.id === 'chokeId')
        ) {
            this.state.value = 'chokingInfo';
            chokeValueAct.speechText = chokeMainText;
            chokeValueAct.imageUrl = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
                assets.Images['choke.control.main']
            }`;
            chokeValueAct.title = 'choking';
            chokeValueAct.primaryText = 'Is the person pregnant? ';
            chokeValueAct.secondaryText = '';
            chokeValueAct.tertiaryText = '';
        } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            const topic = this.state.value;
            const topicnext = chokeData[topic].yes.continue;
            if (topicnext === false) {
                this.state.value = undefined;
            } else {
                this.state.value = topicnext;
            }
            chokeValueAct.speechText = chokeData[topic].yes.speechText;
            chokeValueAct.imageUrl = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
                chokeData[topic].yes.imageUrl
            }`;
            chokeValueAct.title = chokeData[topic].yes.title;
            chokeValueAct.primaryText = chokeData[topic].yes.primaryText;
            chokeValueAct.secondaryText = chokeData[topic].yes.secondaryText;
            chokeValueAct.tertiaryText = chokeData[topic].yes.tertiaryText;
            if (topic === 'chokingInfo.startCPR') {
                const combinedSpeech = `${chokeValueAct.speechText} <audio src="https://${
                    configData[process.env.ENVIRONMENT].cloudfront
                }/${assets.Audio['learncpr.control']}"/> ${chokeData[topic].yes.speechTextTwo}`;
                chokeValueAct.speechText = combinedSpeech;
            }
        } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            const topic = this.state.value;
            const topicnext = chokeData[topic].no.continue;
            if (topicnext === false) {
                this.state.value = undefined;
            } else {
                this.state.value = topicnext;
            }
            chokeValueAct.speechText = chokeData[topic].no.speechText;
            chokeValueAct.imageUrl = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
                chokeData[topic].no.imageUrl
            }`;
            chokeValueAct.title = chokeData[topic].no.title;
            chokeValueAct.primaryText = chokeData[topic].no.primaryText;
            chokeValueAct.secondaryText = chokeData[topic].no.secondaryText;
            chokeValueAct.tertiaryText = chokeData[topic].no.tertiaryText;
        }
        resultBuilder.addAct(chokeValueAct);
    }

    canTakeInitiative() {
        return false;
    }
}
module.exports = ChokeControl;
