const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const {
    prepareScreenContent,
    configData,
    assets,
    speakText,
    renderGeneralFunction,
} = require('../../common/utils/util');

const helloImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images['hello.control']
}`;

const { introText } = speakText;

const { logger } = require('../../logging/logger');

class WelcomeAct extends RequestValueAct {
    render(input, responseBuilder) {
        responseBuilder = renderGeneralFunction(
            input,
            responseBuilder,
            introText,
            helloImage,
            'welcome',
            'What can I help you with?',
            true
        );
    }
}
class HelloControl extends Control {
    constructor(props) {
        super(props.id);
    }

    canHandle(input) {
        if (InputUtil.isLaunchRequest(input)) {
            logger.log({
                level: 'info',
                message: 'Inside launch',
                requestId: input.request.requestId,
                intentType: input.request.type,
                intentName: 'None',
                locale: input.request.locale,
                timestamp: input.request.timestamp,
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
