const { ControlHandler, TestInput, SkillTester } = require('ask-sdk-controls');

const { expect } = require('chai');

const { RootManager } = require('../src/index.js');

/**
 *
 * @param {String} speakText expected alexa response
 */
async function testLaunchRequest(speakText) {
    const tester = new SkillTester(new ControlHandler(new RootManager()));

    const launchResponse = await tester.testTurn(
        'U: __',
        TestInput.launchRequest(),
        `A: ${speakText}`.trim()
    );
    expect(launchResponse.response.shouldEndSession).equals(false);
}

/**
 *
 * @param {String/Built-in Intent name } intentName name of the intent
 * @param {String} inputText input text to trigger intent
 * @param {String} speakText expected alexa response
 */
async function testIntentRequest(intentName, inputText, speakText) {
    const tester = new SkillTester(new ControlHandler(new RootManager()));

    const intentResponse = await tester.testTurn(
        `U: ${inputText}`,
        TestInput.intent(intentName),
        `A:${speakText}`.trim()
    );
    expect(intentResponse.response.shouldEndSession).equals(false);
}

module.exports = {
    testLaunchRequest,
    testIntentRequest,
};
