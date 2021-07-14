const Alexa = require('ask-sdk-core');

const { InputUtil, Control, RequestValueAct } = require('ask-sdk-controls');

const { configData, assets, sendResponse } = require('../../common/utils/util');

const welcomeImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
    assets.Images['welcome.background']
}`;

const launchData = require('../../common/content/launch.content.json');

const { title, primaryText, secondaryText, tertiaryText, speakText } = launchData;

const { logger } = require('../../logging/logger');

class WelcomeAct extends RequestValueAct {
    render(input, responseBuilder) {
        responseBuilder = sendResponse(
            input,
            responseBuilder,
            speakText,
            welcomeImage,
            title,
            primaryText + secondaryText + tertiaryText,
            true
        );
    }
}
class WelcomeControl extends Control {
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
module.exports = WelcomeControl;
