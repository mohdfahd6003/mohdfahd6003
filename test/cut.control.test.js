const { AmazonIntent, waitForDebugger } = require('ask-sdk-controls');
const { describe, test } = require('mocha');

const { testIntentRequest, testLaunchRequest } = require('./util.js');

const speakText = require('../src/common/content/constants.json');

const {
    introText,
    bleedText,
    bleedYesText,
    bleedNoText,
    bleedNoSecondText,
    bleedYesSecondText,
} = speakText;

waitForDebugger();

describe('cutmyself path', () => {
    test('cut path yes', async () => {
        await testLaunchRequest(introText);

        await testIntentRequest('bleedIntent', 'I cut myself', bleedText);

        await testIntentRequest(AmazonIntent.YesIntent, 'yes', bleedYesText);
    });
    test('cut path no yes', async () => {
        await testLaunchRequest(introText);

        await testIntentRequest('bleedIntent', 'I cut myself', bleedText);

        await testIntentRequest(AmazonIntent.NoIntent, 'no', bleedNoText);

        await testIntentRequest(AmazonIntent.YesIntent, 'yes', bleedYesSecondText);
    });
    test('cut path no no', async () => {
        await testLaunchRequest(introText);

        await testIntentRequest('bleedIntent', 'I cut myself', bleedText);

        await testIntentRequest(AmazonIntent.NoIntent, 'no', bleedNoText);

        await testIntentRequest(AmazonIntent.NoIntent, 'no', bleedNoSecondText);
    });
});
