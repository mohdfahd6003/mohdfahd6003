const { waitForDebugger, AmazonIntent } = require('ask-sdk-controls');

const { describe, test } = require('mocha');
const { testIntentRequest, testLaunchRequest } = require('./util.js');

const speakText = require('../src/common/content/constants.json');

const { introText, burnText, burnNoText, burnYesText } = speakText;

waitForDebugger();

describe('burn path', () => {
    test('burn path yes', async () => {
        await testLaunchRequest(introText);

        await testIntentRequest('burnIntent', 'burning', burnText);

        await testIntentRequest(AmazonIntent.YesIntent, 'burning', burnYesText);
    });
    test('burn path no', async () => {
        await testLaunchRequest(introText);

        await testIntentRequest('burnIntent', 'burning', burnText);

        await testIntentRequest(AmazonIntent.NoIntent, 'burning', burnNoText);
    });
});
