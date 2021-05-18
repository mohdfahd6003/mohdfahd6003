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

const { bleedText } = speakText;
const { bleedYesText } = speakText;
const { bleedNoText } = speakText;
const { bleedNoSecondText } = speakText;
const { bleedYesSecondText } = speakText;

const bleedImage = imageCatalog['cut.control'];

class BleedRequestAct extends RequestValueAct {
    constructor(control, payload) {
        super(control, payload);
        this.bleedText = bleedText;
    }

    render(input, responseBuilder) {
        responseBuilder = renderGeneralFunction(
            input,
            responseBuilder,
            this.bleedText,
            bleedImage,
            'bleeding',
            this.bleedText
        );
    }
}
const BleedControlState = {
    value: undefined,
};

class BleedControl extends Control {
    constructor(props) {
        super(props.id);
        this.state = BleedControlState;
    }

    canHandle(input) {
        if (InputUtil.isIntent(input, 'bleedIntent')) {
            return true;
        }
        if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            return true;
        }
        if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            return true;
        }
        return false;
    }

    handle(input, resultBuilder) {
        const bleedAct = new BleedRequestAct(this, {});
        if (InputUtil.isIntent(input, 'bleedIntent')) {
            this.state.value = 'first';
            bleedAct.bleedText = bleedText;
        } else if (InputUtil.isIntent(input, 'AMAZON.YesIntent')) {
            bleedAct.bleedText = bleedYesText;
            if (this.state.value === 'second') {
                bleedAct.bleedText = bleedYesSecondText;
            }
            this.state.value = undefined;
        } else if (InputUtil.isIntent(input, 'AMAZON.NoIntent')) {
            if (this.state.value === 'first') {
                bleedAct.bleedText = bleedNoText;
                this.state.value = 'second';
            } else if (this.state.value === 'second') {
                this.state.value = undefined;
                bleedAct.bleedText = bleedNoSecondText;
            }
        }
        resultBuilder.addAct(bleedAct);
    }

    canTakeInitiative() {
        return false;
    }
}

module.exports = BleedControl;
