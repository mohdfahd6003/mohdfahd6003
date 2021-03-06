const Alexa = require('ask-sdk-core');

const { InputUtil, Control, LiteralContentAct } = require('ask-sdk-controls');

const { repeatText } = require('../../common/content/constants.json');

const moreOptionsData = require('../../common/content/moreoptions.content.json');

const { speakText } = moreOptionsData;

const { logger } = require('../../logging/logger');

class MoreOptionsControl extends Control {
    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        return InputUtil.isIntent(input, 'moreOptionsIntent');
    }

    handle(input, resultBuilder) {
        resultBuilder.addAct(
            new LiteralContentAct(this, { promptFragment: speakText, repromptFragment: repeatText })
        );
    }

    canTakeInitiative() {
        return false;
    }
}
module.exports = MoreOptionsControl;
