const { ControlHandler, waitForDebugger, TestInput, SkillTester } = require('ask-sdk-controls');

const { describe, test } = require('mocha');
const { expect } = require('chai');

const { RootManager } = require('../src/index');
const { configData, assets } = require('../src/common/utils/util');

const { introText } = require('../src/common/content/constants.json');
const { speakTextOne, speakTextTwo } = require('../src/common/content/learncpr.content.json');

waitForDebugger();

describe('learn CPR  path', () => {
    test('learn CPR', async () => {
        const tester = new SkillTester(new ControlHandler(new RootManager()));

        const launchResponse = await tester.testTurn(
            'U: __',
            TestInput.launchRequest(),
            `A:${introText}`
        );
        expect(launchResponse.response.shouldEndSession).equals(false);

        const cprResponse = await tester.testTurn(
            'U: How do I do CPR?',
            TestInput.intent('learnCPRIntent'),
            `A:${speakTextOne} <audio src="https://${
                configData[process.env.ENVIRONMENT].cloudfront
            }/${assets.Audio['learncpr.control']}"/> ${speakTextTwo}`
        );
        expect(cprResponse.response.shouldEndSession).equals(false);
    });
});
