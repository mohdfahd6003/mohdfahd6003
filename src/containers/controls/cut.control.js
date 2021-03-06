const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const { configData, assets, sendResponse } = require('../../common/utils/util');

const cutImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images.cutControl
}`;
const cutData = require('../../common/content/cut.content.json');

class CutRequestAct extends RequestValueAct {
    constructor(control, payload) {
        super(control, payload);
        this.speakText = undefined;
        this.primaryText = undefined;
        this.secondaryText = undefined;
        this.tertiaryText = undefined;
        this.title = undefined;
        this.shortText = undefined;
    }

    render(input, responseBuilder) {
        responseBuilder = sendResponse(
            input,
            responseBuilder,
            this.speakText,
            cutImage,
            this.title,
            this.primaryText + this.secondaryText + this.tertiaryText,
            this.shortText
        );
    }
}
const CutControlState = {
    value: undefined,
};

class CutControl extends Control {
    constructor(props) {
        super(props.id);
        this.state = CutControlState;
    }

    canHandle(input) {
        if (
            InputUtil.isIntent(input, 'bleedIntent') ||
            (InputUtil.isAPLUserEventWithArgs(input) && input.request.source.id === 'cutControl') ||
            (InputUtil.isAPLUserEventWithArgs(input) && input.request.arguments[2] === 'cutControl')
        ) {
            return true;
        }
        if (this.state.value && InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            if (this.state.value === 'first' || this.state.value === 'second') return true;
        }
        if (this.state.value && InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            if (this.state.value === 'first' || this.state.value === 'second') return true;
        }
        return false;
    }

    handle(input, resultBuilder) {
        const cutAct = new CutRequestAct(this, {});
        if (
            InputUtil.isIntent(input, 'bleedIntent') ||
            (InputUtil.isAPLUserEventWithArgs(input) && input.request.source.id === 'cutControl') ||
            (InputUtil.isAPLUserEventWithArgs(input) && input.request.arguments[2] === 'cutControl')
        ) {
            this.state.value = 'first';
            cutAct.speakText = cutData.main.speakText;
            cutAct.primaryText = cutData.main.primaryText;
            cutAct.secondaryText = cutData.main.secondaryText;
            cutAct.tertiaryText = cutData.main.tertiaryText;
            cutAct.title = cutData.main.title;
            cutAct.shortText = cutData.main.shortText;
        } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            let turnNum = 'turn1';
            if (this.state.value === 'second') {
                turnNum = 'turn2';
            }
            cutAct.speakText = cutData[turnNum].yes.speakText;
            cutAct.primaryText = cutData[turnNum].yes.primaryText;
            cutAct.secondaryText = cutData[turnNum].yes.secondaryText;
            cutAct.tertiaryText = cutData[turnNum].yes.tertiaryText;
            cutAct.title = cutData[turnNum].yes.title;
            cutAct.shortText = cutData[turnNum].yes.shortText;
            this.state.value = undefined;
        } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            let turnNum;
            if (this.state.value === 'first') {
                this.state.value = 'second';
                turnNum = 'turn1';
            } else if (this.state.value === 'second') {
                this.state.value = undefined;
                turnNum = 'turn2';
            }
            cutAct.speakText = cutData[turnNum].no.speakText;
            cutAct.primaryText = cutData[turnNum].no.primaryText;
            cutAct.secondaryText = cutData[turnNum].no.secondaryText;
            cutAct.tertiaryText = cutData[turnNum].no.tertiaryText;
            cutAct.title = cutData[turnNum].no.title;
            cutAct.shortText = cutData[turnNum].no.shortText;
        }
        resultBuilder.addAct(cutAct);
    }

    canTakeInitiative() {
        return false;
    }
}

module.exports = CutControl;
