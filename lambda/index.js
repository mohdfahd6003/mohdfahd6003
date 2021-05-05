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
} = require('ask-sdk-controls');

const SinglePathContainer = require('./containers/singlepath.container');
const MultiPathContainer = require('./containers/multipath.container');

class RootContainer extends ContainerControl {
    constructor(props) {
        super(props);
        this.addChild(new SinglePathContainer({ id: 'single' }));
        this.addChild(new MultiPathContainer({ id: 'second' }));
        this.isChild = false;
    }

    async canHandle(input) {
        if (await this.canHandleByChild(input)) {
            this.handleFunc = this.handleByChild;
            this.isChild = true;
        }
        return true;
    }

    async handle(input, resultBuilder) {
        if (this.isChild) {
            await this.handleFunc(input, resultBuilder);
        } else {
            resultBuilder.addAct(
                new LiteralContentAct(this, {
                    promptFragment: 'Invalid input. Can you please repeat ?',
                })
            );
        }
    }
}

class AhaManager extends ControlManager {
    createControlTree() {
        const root = new RootContainer({ id: 'root' });
        return root;
    }
}

// stanard Alexa code

/* *
 * Mandatory Intent as per Amazon guidelines
 * Content of the help can be revised
 * */

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'
        );
    },
    handle(handlerInput) {
        const speakOutput = ' Ok. Say something like warning signs of a heart attack';

        return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
    },
};
/* *
 * Stop the sklill on user's demand.
 * Cancel also works in the same way
 * */

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' ||
                Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent')
        );
    },
    handle(handlerInput) {
        const speakOutput = 'See you soon. Bye';

        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    },
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent'
        );
    },
    handle(handlerInput) {
        const speakOutput = 'Oops. I didnot get that. Can you please repeat ?';

        return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
    },
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents
 * by defining them above, then also adding them to the request handler chain below
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `you have triggered ${intentName}`;

        return (
            handlerInput.responseBuilder
                .speak(speakOutput)
                // .reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse()
        );
    },
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'There was an error';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
    },
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        new ControlHandler(new AhaManager()),
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        IntentReflectorHandler
    )
    .lambda();

// Exported for building interaction model
exports.AhaManager = AhaManager;
