/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
const Alexa = require('ask-sdk-core');
const {
    ControlHandler,
    ControlManager,
    ContainerControl,
    LiteralContentAct,
    InputUtil,
    NonUnderstandingAct,
} = require('ask-sdk-controls');

const SinglePathContainer = require('./containers/singlepath.container');
const MultiPathContainer = require('./containers/multipath.container');

const { assets, configData, sendResponse, fetchIntentForLogging } = require('./common/utils/util');

const stopData = require('./common/content/stop.content.json');

const helpData = require('./common/content/help.content.json');

const { logger } = require('./logging/logger');

class RootContainer extends ContainerControl {
    constructor(props) {
        super(props);
        this.addChild(new SinglePathContainer({ id: 'singlepath' }));
        this.addChild(new MultiPathContainer({ id: 'multipath' }));
        this.handleFunc = undefined;
    }

    async canHandle(input) {
        if (await this.canHandleByChild(input)) {
            this.handleFunc = this.handleByChild;
            return true;
        }
        if (InputUtil.isSessionEndedRequest(input)) {
            this.handleFunc = this.handleSessionEndedRequest;
            return true;
        } else if (InputUtil.isFallbackIntent(input)) {
            this.handleFunc = this.handleFallbackIntent;
            return true;
        } else if (
            (input.request.type === 'IntentRequest' &&
                input.request.intent.name === 'AMAZON.CancelIntent') ||
            (input.request.type === 'IntentRequest' &&
                input.request.intent.name === 'AMAZON.StopIntent')
        ) {
            this.handleFunc = this.handleStopIntent;
            return true;
        } else if (
            input.request.type === 'IntentRequest' &&
            input.request.intent.name === 'AMAZON.HelpIntent'
        ) {
            this.handleFunc = this.handleHelpIntent;
            return true;
        } else if (input.request.type === 'Alexa.Presentation.APL.UserEvent') {
            this.handleFunc = this.handleTouchEvent;
            return true;
        } else {
            console.log('something went wrong');
            this.handleFunc = this.handleInvalidInput;
            return true;
        }
    }

    async handle(input, resultBuilder) {
        const intentReq = fetchIntentForLogging(input);
        logger.log({
            level: 'info',
            message: 'request from Alexa',
            requestId: input.request.requestId,
            intentType: input.request.type,
            intentName: intentReq,
            locale: input.request.locale,
            timestamp: input.request.timestamp,
        });
        await this.handleFunc(input, resultBuilder);
    }

    async handleTouchEvent(input, resultBuilder) {
        console.log(input);
        resultBuilder.addAct(
            new LiteralContentAct(this, {
                promptFragment: `Sorry. I could not understand you request. Say help to get more information. `,
            })
        );
    }

    async handleInvalidInput(input, resultBuilder) {
        resultBuilder.addAct(
            new LiteralContentAct(this, {
                promptFragment:
                    'Sorry, I could not understand your request. Can you please repeat ?',
            })
        );
    }

    async handleSessionEndedRequest(input, resultBuilder) {
        resultBuilder.addAct(
            new LiteralContentAct(this, {
                promptFragment: 'Thank you. See you soon',
            })
        );
        resultBuilder.endSession();
    }

    async handleCancelIntent(input, resultBuilder) {
        resultBuilder.endSession();
    }

    async handleStopIntent(input, resultBuilder) {
        const stopText =
            stopData.stopTextList[Math.floor(Math.random() * stopData.stopTextList.length)];

        class StopContentAct extends LiteralContentAct {
            render(inputData, responseBuilder) {
                responseBuilder.addPromptFragment(stopText);
                responseBuilder.withSimpleCard(stopData.stopTitle, stopData.stopBody);
            }
        }
        resultBuilder.addAct(new StopContentAct(this, {}));
        resultBuilder.endSession();
    }

    async handleHelpIntent(input, resultBuilder) {
        const helpImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
            assets.Images['hello.control']
        }`;

        class HelpContentAct extends LiteralContentAct {
            render(inputData, responseBuilder) {
                responseBuilder = sendResponse(
                    input,
                    responseBuilder,
                    helpData.speakText,
                    helpImage,
                    helpData.title,
                    helpData.speakText
                );
            }
        }
        resultBuilder.addAct(new HelpContentAct(this, {}));
    }

    async handleFallbackIntent(input, resultBuilder) {
        resultBuilder.addAct(new NonUnderstandingAct(this));
    }
}

class RootManager extends ControlManager {
    createControlTree() {
        const root = new RootContainer({ id: 'root' });
        return root;
    }

    handleInternalError(input, error) {
        console.log(`Internal error occurred. Error stack:${error.stack}`);
    }
}

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;
        return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
    },
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(new ControlHandler(new RootManager()))
    .addErrorHandlers(ErrorHandler)
    .lambda();

// Exported for building interaction model
exports.RootManager = RootManager;
