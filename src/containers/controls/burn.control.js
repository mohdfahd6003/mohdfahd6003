const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const {
    prepareScreenContent,
    imageCatalog,
    displayTemplate,
    displayDirective,
    repeatText,
    speakText,
    renderGeneralFunction,
} = require('../../common/util');

const { burnText } = speakText;
const { burnYesText } = speakText;
const { burnNoText } = speakText;
const burnImage = imageCatalog['burn.control'];

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
        } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            return true;
        } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            return true;
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
