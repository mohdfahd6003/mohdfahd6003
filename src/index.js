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

const { assets, configData, renderGeneralFunction } = require('./common/util');

class RootContainer extends ContainerControl {
    constructor(props) {
        super(props);
        this.addChild(new SinglePathContainer({ id: 'singlepath' }));
        this.addChild(new MultiPathContainer({ id: 'multipath' }));
        this.isChild = false;
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
        }
        return false;
    }

    async handle(input, resultBuilder) {
        if (this.handleFunc !== undefined) {
            await this.handleFunc(input, resultBuilder);
        } else {
            resultBuilder.addAct(
                new LiteralContentAct(this, {
                    promptFragment: 'Invalid input. Can you please repeat ?',
                })
            );
        }
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
        const stopTextList = [
            'Thank you.  If you would like to make a donation, please say - Alexa donate to the American Heart Association',
            'Goodbye',
            'Thank you.  If you would like to learn more, please visit heart.org',
        ];
        const stopText = stopTextList[Math.floor(Math.random() * stopTextList.length)];
        const stopTitle = 'American Heart Association';
        const stopBody = 'For More information, please visit http://www.heart.org';

        class StopContentAct extends LiteralContentAct {
            render(inputData, responseBuilder) {
                responseBuilder.addPromptFragment(stopText);
                responseBuilder.withSimpleCard(stopTitle, stopBody);
            }
        }
        resultBuilder.addAct(new StopContentAct(this, {}));
        resultBuilder.endSession();
    }

    async handleHelpIntent(input, resultBuilder) {
        const speakText =
            'You can say things like, How do I do CPR?, What are the Warning Signs of a Heart Attack, or I have a nose bleed. Now, what can I help you with?!';
        const title = 'help';
        const helpImage = `https://${configData[process.env.ENVIRONMENT].cloudfront}/${
            assets.Images['hello.control']
        }`;

        class HelpContentAct extends LiteralContentAct {
            render(inputData, responseBuilder) {
                responseBuilder = renderGeneralFunction(
                    input,
                    responseBuilder,
                    speakText,
                    helpImage,
                    title,
                    speakText
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
}

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(new ControlHandler(new RootManager()))
    .lambda();

// Exported for building interaction model
exports.RootManager = RootManager;
