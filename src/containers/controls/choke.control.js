const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const { speakText, renderGeneralFunction, assets, configData } = require('../../common/util');

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
    }

    render(input, resultBuilder) {
        resultBuilder = renderGeneralFunction(
            input,
            resultBuilder,
            this.speechText,
            this.imageUrl,
            this.primaryText,
            this.secondaryText
        );
    }
}

class ChokeControl extends Control {
    constructor(props) {
        super(props.id);
        this.state = ChokeControlState;
    }

    canHandle(input) {
        if (InputUtil.isIntent(input, 'chokeIntent')) {
            return true;
        } else if (this.state && InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            if (String(this.state).startsWith('choking')) return true;
        } else if (this.state && InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            if (String(this.state).startsWith('choking')) return true;
        }
        return false;
    }

    handle(input, resultBuilder) {
        const chokeValueAct = new ChokeActMain(this, {});
        if (InputUtil.isIntent(input, 'chokeIntent')) {
            this.state = 'chokingInfo';

            chokeValueAct.speechText = chokeMainText;
            chokeValueAct.imageUrl = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
                assets.Images['choke.control.main']
            }`;
            chokeValueAct.primaryText = 'Is the person pregnant? ';
            chokeValueAct.secondaryText = '';
        } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            const topic = this.state;
            const topicnext = chokeData[topic].yes.continue;
            if (topicnext === false) {
                this.state = undefined;
            } else {
                this.state = topicnext;
            }
            chokeValueAct.speechText = chokeData[topic].yes.speechText;
            chokeValueAct.imageUrl = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
                chokeData[topic].yes.imageUrl
            }`;
            chokeValueAct.primaryText = chokeData[topic].yes.primaryText;
            chokeValueAct.secondaryText = chokeData[topic].yes.secondaryText;
            if (topic === 'chokingInfo.startCPR') {
                chokeValueAct.speechText.replace(
                    'https://s3.amazonaws.com/ahaalexa/110-BPM-Metronome-short.mp3',
                    `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
                        assets.Audio['learncpr.control']
                    }`
                );
            }
        } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            const topic = this.state;
            const topicnext = chokeData[topic].no.continue;
            if (topicnext === false) {
                this.state = undefined;
            } else {
                this.state = topicnext;
            }
            chokeValueAct.speechText = chokeData[topic].no.speechText;
            chokeValueAct.imageUrl = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
                chokeData[topic].no.imageUrl
            }`;
            chokeValueAct.primaryText = chokeData[topic].no.primaryText;
            chokeValueAct.secondaryText = chokeData[topic].no.secondaryText;
        }
        resultBuilder.addAct(chokeValueAct);
    }

    canTakeInitiative() {
        return false;
    }
}
module.exports = ChokeControl;
