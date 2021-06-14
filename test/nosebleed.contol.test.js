const { waitForDebugger } = require('ask-sdk-controls');

const { describe, test } = require('mocha');

const { RootManager } = require('../src/index');

const speakText = require('../src/common/content/constants.json');

const { testIntentRequest, testLaunchRequest } = require('./util.js');

const { introText, noseBleedingText } = speakText;

waitForDebugger();

describe('nose bleed path', () => {
    test('nose bleed', async () => {
        await testLaunchRequest(RootManager, introText);

        await testIntentRequest(
            RootManager,
            'noseIntent',
            'How do I stop a Nose Bleed?',
            noseBleedingText
        );
    });
});
