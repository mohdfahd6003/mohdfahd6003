const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const { configData, assets, renderGeneralFunction } = require('../../common/util');

const burnImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images['burn.control']
}`;

const burnData = require('../../common/content/burn.content.json');

class BurnActMain extends RequestValueAct {
    constructor(control, payload) {
        super(control, payload);
        this.speakText = undefined;
        this.primaryText = undefined;
        this.secondaryText = undefined;
        this.tertiaryText = undefined;
        this.title = undefined;
    }

    render(input, resultBuilder) {
        resultBuilder = renderGeneralFunction(
            input,
            resultBuilder,
            this.speakText,
            burnImage,
            this.title,
            this.primaryText + this.secondaryText + this.tertiaryText
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
            burnAct.speakText = burnData.main.speakText;
            burnAct.primaryText = burnData.main.primaryText;
            burnAct.secondaryText = burnData.main.secondaryText;
            burnAct.tertiaryText = burnData.main.tertiaryText;
        } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            this.state.value = undefined;
            burnAct.speakText = burnData.yes.speakText;
            burnAct.primaryText = burnData.yes.primaryText;
            burnAct.secondaryText = burnData.yes.secondaryText;
            burnAct.tertiaryText = burnData.yes.tertiaryText;
        } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            this.state.value = undefined;
            burnAct.speakText = burnData.no.speakText;
            burnAct.primaryText = burnData.no.primaryText;
            burnAct.secondaryText = burnData.no.secondaryText;
            burnAct.tertiaryText = burnData.no.tertiaryText;
        }
        resultBuilder.addAct(burnAct);
    }

    canTakeInitiative() {
        return false;
    }
}

module.exports = BurnControl;
