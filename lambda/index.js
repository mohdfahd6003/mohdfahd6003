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

// eslint-disable-next-line import/no-extraneous-dependencies
const { createLogger, format, transports, level, info } = require('winston');

const { combine, timestamp, label, printf } = format;

// eslint-disable-next-line no-shadow
const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(timestamp({ format: 'YYYY:MM:DD HH:mm:ss.SSS' }), myFormat),
    transports: [new transports.Console()],
});

logger.log({
    level: 'info',
    message: 'What time is the testing at?',
});

const SinglePathContainer = require('./containers/singlepath.container');
const MultiPathContainer = require('./containers/multipath.container');

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
            input.request.type === 'IntentRequest' &&
            input.request.intent.name === 'AMAZON.CancelIntent'
        ) {
            this.handleFunc = this.handleCancelIntent;
            return true;
        } else if (
            input.request.type === 'IntentRequest' &&
            input.request.intent.name === 'AMAZON.StopIntent'
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
        console.log('WARN: Nothing wants this input. A new clause may be required.');
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
        resultBuilder.addAct(
            new LiteralContentAct(this, {
                promptFragment: 'Thank you. See you soon',
            })
        );
        resultBuilder.endSession();
    }

    async handleHelpIntent(input, resultBuilder) {
        resultBuilder.addAct(
            new LiteralContentAct(this, {
                promptFragment:
                    ' I can help you with warning signs of heart attack, learn CPR and others. What can I help you with?',
            })
        );
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
