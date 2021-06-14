const { waitForDebugger } = require('ask-sdk-controls');

const { describe, test } = require('mocha');

const { RootManager } = require('../src/index');

const { testIntentRequest, testLaunchRequest } = require('./util.js');

const speakText = require('../src/common/content/constants.json');

const { introText, dehydrationText } = speakText;

waitForDebugger();

describe('dehydration  path', () => {
    test('dehydration', async () => {
        await testLaunchRequest(RootManager, introText);

        await testIntentRequest(RootManager, 'dehydrationIntent', 'dehydration', dehydrationText);
    });
});
