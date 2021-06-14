const { waitForDebugger } = require('ask-sdk-controls');

const { describe, test } = require('mocha');

const { RootManager } = require('../src/index');

const speakText = require('../src/common/content/constants.json');

const { testIntentRequest, testLaunchRequest } = require('./util.js');

const { introText, poisonText } = speakText;

waitForDebugger();

describe('poisons path', () => {
    test('poisons attack', async () => {
        await testLaunchRequest(RootManager, introText);

        await testIntentRequest(
            RootManager,
            'poisonIntent',
            'warning sings of a poisons',
            poisonText
        );
    });
});
