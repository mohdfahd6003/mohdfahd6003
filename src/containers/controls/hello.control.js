const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

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

const mylogger = require('../../logging/logger');

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
        if (InputUtil.isLaunchRequest(input) || InputUtil.isIntent(input, 'HelloIntent')) {
            mylogger.logger.log({
                level: 'info',
                message: 'What time is the testing at?',
            });
            return true;
        }
        return false;
    }

    handle(input, resultBuilder) {
        resultBuilder.addAct(new WelcomeAct(this, {}));
    }

    canTakeInitiative() {
        return false;
    }
}
module.exports = HelloControl;
