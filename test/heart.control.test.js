const { waitForDebugger } = require('ask-sdk-controls');

const { describe, test } = require('mocha');

const { testIntentRequest, testLaunchRequest } = require('./util.js');

const speakText = require('../src/common/content/constants.json');

const { introText, heartAttackText } = speakText;

waitForDebugger();

describe('warning signs of heart attack path', () => {
    test('heart attack', async () => {
        await testLaunchRequest(introText);

        await testIntentRequest(
            'heartWarningSignsIntent',
            'warning sings of a heart attack',
            heartAttackText
        );
    });
});
