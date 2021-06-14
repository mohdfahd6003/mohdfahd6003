const { AmazonIntent, waitForDebugger } = require('ask-sdk-controls');
const { describe, test } = require('mocha');

const { RootManager } = require('../src/index');

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
        await testLaunchRequest(RootManager, introText);

        await testIntentRequest(RootManager, 'bleedIntent', 'I cut myself', bleedText);

        await testIntentRequest(RootManager, AmazonIntent.YesIntent, 'yes', bleedYesText);
    });
    test('cut path no yes', async () => {
        await testLaunchRequest(RootManager, introText);

        await testIntentRequest(RootManager, 'bleedIntent', 'I cut myself', bleedText);

        await testIntentRequest(RootManager, AmazonIntent.NoIntent, 'no', bleedNoText);

        await testIntentRequest(RootManager, AmazonIntent.YesIntent, 'yes', bleedYesSecondText);
    });
    test('cut path no no', async () => {
        await testLaunchRequest(RootManager, introText);

        await testIntentRequest(RootManager, 'bleedIntent', 'I cut myself', bleedText);

        await testIntentRequest(RootManager, AmazonIntent.NoIntent, 'no', bleedNoText);

        await testIntentRequest(RootManager, AmazonIntent.NoIntent, 'no', bleedNoSecondText);
    });
});
