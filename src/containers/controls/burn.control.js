const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const { configData, assets, speakText, renderGeneralFunction } = require('../../common/util');

const burnImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images['burn.control']
}`;

const { burnText } = speakText;
const { burnYesText } = speakText;
const { burnNoText } = speakText;

class BurnActMain extends RequestValueAct {
    constructor(control, payload) {
        super(control, payload);
        this.burnText = burnText;
    }

    render(input, resultBuilder) {
        resultBuilder = renderGeneralFunction(
            input,
            resultBuilder,
            this.burnText,
            burnImage,
            'burning',
            this.burnText
        );
    }
}

const BurnControlState = {
    value: undefined,
};

class BurnControl extends Control {
    constructor(props) {
        super(props.id);
        this.state = BurnControlState;
    }

    canHandle(input) {
        if (InputUtil.isIntent(input, 'burnIntent')) {
            return true;
        } else if (this.state.value && InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            if (this.state.value === 'burn') return true;
        } else if (this.state.value && InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            if (this.state.value === 'burn') return true;
        }
        return false;
    }

    handle(input, resultBuilder) {
        const burnAct = new BurnActMain(this, {});
        if (InputUtil.isIntent(input, 'burnIntent')) {
            this.state.value = 'burn';
        } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            this.state.value = undefined;
            this.burnText = burnYesText;
        } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            this.state.value = undefined;
            this.burnText = burnNoText;
        }
        resultBuilder.addAct(burnAct);
    }

    canTakeInitiative() {
        return false;
    }
}

module.exports = BurnControl;
