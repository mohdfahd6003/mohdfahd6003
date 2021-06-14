const { waitForDebugger, AmazonIntent } = require('ask-sdk-controls');

const { describe, test } = require('mocha');
const { testIntentRequest, testLaunchRequest } = require('./util.js');

const { RootManager } = require('../src/index');
const speakText = require('../src/common/content/constants.json');

const { introText, burnText, burnNoText, burnYesText } = speakText;

waitForDebugger();

describe('burn path', () => {
    test('burn path yes', async () => {
        await testLaunchRequest(RootManager, introText);

        await testIntentRequest(RootManager, 'burnIntent', 'burning', burnText);

        await testIntentRequest(RootManager, AmazonIntent.YesIntent, 'burning', burnYesText);
    });
    test('burn path no', async () => {
        await testLaunchRequest(RootManager, introText);

        await testIntentRequest(RootManager, 'burnIntent', 'burning', burnText);

        await testIntentRequest(RootManager, AmazonIntent.NoIntent, 'burning', burnNoText);
    });
});
