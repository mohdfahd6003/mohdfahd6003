const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

// eslint-disable-next-line import/no-extraneous-dependencies
const { createLogger, format, transports, level, info } = require('winston');

const { combine, timestamp, label, printf } = format;

// eslint-disable-next-line no-shadow
const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const {
    prepareScreenContent,
    configData,
    assets,
    speakText,
    renderGeneralFunction,
} = require('../../common/util');

const helloImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images['hello.control']
}`;

const { introText } = speakText;

class WelcomeAct extends RequestValueAct {
    render(input, responseBuilder) {
        responseBuilder = renderGeneralFunction(
            input,
            responseBuilder,
            introText,
            helloImage,
            'welcome',
            'What can I help you with?'
        );
    }
}
class HelloControl extends Control {
    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        return InputUtil.isLaunchRequest(input) || InputUtil.isIntent(input, 'HelloIntent');
    }

    handle(input, resultBuilder) {
        resultBuilder.addAct(new WelcomeAct(this, {}));
    }

    canTakeInitiative() {
        return false;
    }
}
module.exports = HelloControl;
