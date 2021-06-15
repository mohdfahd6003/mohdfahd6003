const { waitForDebugger } = require('ask-sdk-controls');

const { describe, test } = require('mocha');

const { testIntentRequest, testLaunchRequest } = require('./util.js');

const { introText } = require('../src/common/content/constants.json');

const { speakText } = require('../src/common/content/strokes.content.json');

waitForDebugger();

describe('stroke path', () => {
    test('stroke', async () => {
        await testLaunchRequest(introText);

        await testIntentRequest('strokeIntent', 'warning signs of stroke', speakText);
    });
});
